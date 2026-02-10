'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExt from '@tiptap/extension-image';
import LinkExt from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import HighlightExt from '@tiptap/extension-highlight';
import CharacterCount from '@tiptap/extension-character-count';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useT } from '@/i18n/context';

interface TiptapEditorProps {
  content?: string;
  onChange?: (html: string) => void;
}

/* ─── Slash command definitions ───────────────────────────────────────── */

interface SlashItem {
  label: string;
  desc: string;
  icon: string;
  action: (editor: ReturnType<typeof useEditor>) => void;
}

const SLASH_ICONS = ['H1', 'H2', 'H3', '•', '1.', '☑', '"', '<>', '—', '🖼'];

/* ─── Main Editor Component ───────────────────────────────────────────── */

export default function TiptapEditor({ content = '', onChange }: TiptapEditorProps) {
  const t = useT();
  const [slashOpen, setSlashOpen] = useState(false);
  const [slashFilter, setSlashFilter] = useState('');
  const [slashIdx, setSlashIdx] = useState(0);
  const [slashPos, setSlashPos] = useState<{ top: number; left: number } | null>(null);
  const slashRef = useRef<HTMLDivElement>(null);

  // Floating toolbar state
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPos, setToolbarPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const editorContainerRef = useRef<HTMLDivElement>(null);

  /** Build slash commands from the i18n dictionary. */
  const SLASH_COMMANDS: SlashItem[] = useMemo(() => {
    const slashLabels = t.tiptap.slash as unknown as { label: string; desc: string }[];
    const actions: ((editor: ReturnType<typeof useEditor>) => void)[] = [
      (editor) => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      (editor) => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      (editor) => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      (editor) => editor?.chain().focus().toggleBulletList().run(),
      (editor) => editor?.chain().focus().toggleOrderedList().run(),
      (editor) => editor?.chain().focus().toggleTaskList().run(),
      (editor) => editor?.chain().focus().toggleBlockquote().run(),
      (editor) => editor?.chain().focus().toggleCodeBlock().run(),
      (editor) => editor?.chain().focus().setHorizontalRule().run(),
      (editor) => {
        const url = window.prompt(t.tiptap.imagePrompt);
        if (url) editor?.chain().focus().setImage({ src: url }).run();
      },
    ];
    return slashLabels.map((item, i) => ({
      label: item.label,
      desc: item.desc,
      icon: SLASH_ICONS[i],
      action: actions[i],
    }));
  }, [t]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: {},
      }),
      ImageExt.configure({
        HTMLAttributes: { class: 'rounded-xl max-w-full' },
      }),
      LinkExt.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return `${t.tiptap.headingPlaceholder} ${node.attrs.level}`;
          }
          return t.tiptap.placeholder;
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      HighlightExt.configure({ multicolor: true }),
      CharacterCount,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content,
    onUpdate: ({ editor: ed }) => {
      onChange?.(ed.getHTML());
      handleSlashCheck(ed);
    },
    onSelectionUpdate: ({ editor: ed }) => {
      updateFloatingToolbar(ed);
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
        style: 'min-height: 500px; padding: 0;',
      },
      handleKeyDown: (_view, event) => {
        if (slashOpen) {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSlashIdx((prev) => Math.min(prev + 1, filteredCommands.length - 1));
            return true;
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSlashIdx((prev) => Math.max(prev - 1, 0));
            return true;
          }
          if (event.key === 'Enter') {
            event.preventDefault();
            executeSlashCommand(slashIdx);
            return true;
          }
          if (event.key === 'Escape') {
            closeSlash();
            return true;
          }
        }
        return false;
      },
    },
  });

  const filteredCommands = SLASH_COMMANDS.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(slashFilter.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(slashFilter.toLowerCase())
  );

  /* ─── Floating toolbar logic ────────────────────────────────────── */
  const updateFloatingToolbar = useCallback(
    (ed: ReturnType<typeof useEditor>) => {
      if (!ed || !editorContainerRef.current) return;
      const { from, to, empty } = ed.state.selection;
      if (empty || from === to) {
        setShowToolbar(false);
        return;
      }
      const coords = ed.view.coordsAtPos(from);
      const endCoords = ed.view.coordsAtPos(to);
      const containerRect = editorContainerRef.current.getBoundingClientRect();
      const midX = (coords.left + endCoords.left) / 2 - containerRect.left;
      const top = coords.top - containerRect.top - 48;

      setToolbarPos({ top: Math.max(top, 0), left: Math.max(midX - 120, 0) });
      setShowToolbar(true);
    },
    []
  );

  /* ─── Slash commands logic ──────────────────────────────────────── */
  const handleSlashCheck = useCallback(
    (ed: ReturnType<typeof useEditor>) => {
      if (!ed) return;
      const { state } = ed;
      const { $from } = state.selection;
      const textBefore = $from.parent.textContent.slice(0, $from.parentOffset);

      const slashMatch = textBefore.match(/\/([^\s]*)$/);
      if (slashMatch && $from.parent.type.name === 'paragraph') {
        setSlashFilter(slashMatch[1]);
        setSlashIdx(0);
        setSlashOpen(true);

        const coords = ed.view.coordsAtPos($from.pos);
        const editorRect = ed.view.dom.getBoundingClientRect();
        setSlashPos({
          top: coords.bottom - editorRect.top + 8,
          left: coords.left - editorRect.left,
        });
      } else {
        if (slashOpen) closeSlash();
      }
    },
    [slashOpen]
  );

  const closeSlash = useCallback(() => {
    setSlashOpen(false);
    setSlashFilter('');
    setSlashIdx(0);
    setSlashPos(null);
  }, []);

  const executeSlashCommand = useCallback(
    (idx: number) => {
      if (!editor) return;
      const cmd = filteredCommands[idx];
      if (!cmd) return;

      const { state } = editor;
      const { $from } = state.selection;
      const textBefore = $from.parent.textContent.slice(0, $from.parentOffset);
      const slashMatch = textBefore.match(/\/([^\s]*)$/);
      if (slashMatch) {
        const deleteFrom = $from.pos - slashMatch[0].length;
        editor.chain().focus().deleteRange({ from: deleteFrom, to: $from.pos }).run();
      }

      cmd.action(editor);
      closeSlash();
    },
    [editor, filteredCommands, closeSlash]
  );

  // Close slash menu on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (slashRef.current && !slashRef.current.contains(e.target as Node)) {
        closeSlash();
      }
    };
    if (slashOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [slashOpen, closeSlash]);

  // Hide floating toolbar on click outside
  useEffect(() => {
    const handler = () => {
      setTimeout(() => {
        if (editor && editor.state.selection.empty) {
          setShowToolbar(false);
        }
      }, 100);
    };
    document.addEventListener('mouseup', handler);
    return () => document.removeEventListener('mouseup', handler);
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt(t.tiptap.linkPrompt, previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor, t]);

  if (!editor) return null;

  const chars = editor.storage.characterCount.characters();
  const words = editor.storage.characterCount.words();
  const tooltips = t.tiptap.tooltips;

  return (
    <div className="tiptap-editor" style={{ position: 'relative' }} ref={editorContainerRef}>
      {/* ─── Floating toolbar (on text selection) ──────────────────── */}
      {showToolbar && (
        <div
          className="bubble-menu"
          style={{
            position: 'absolute',
            top: toolbarPos.top,
            left: toolbarPos.left,
            zIndex: 50,
          }}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            title={tooltips.bold}
          >
            <BoldIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            title={tooltips.italic}
          >
            <ItalicIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
            title={tooltips.underline}
          >
            <UnderlineIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
            title={tooltips.strike}
          >
            <StrikeIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
            title={tooltips.code}
          >
            <CodeIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'is-active' : ''}
            title={tooltips.highlight}
          >
            <HighlightIcon />
          </button>
          <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''} title={tooltips.link}>
            <LinkIcon />
          </button>
        </div>
      )}

      {/* ─── Slash command popup ────────────────────────────────────── */}
      {slashOpen && slashPos && filteredCommands.length > 0 && (
        <div
          ref={slashRef}
          className="slash-menu"
          style={{
            position: 'absolute',
            top: slashPos.top,
            left: slashPos.left,
            zIndex: 50,
          }}
        >
          {filteredCommands.map((cmd, i) => (
            <button
              key={cmd.label}
              className={`slash-menu-item ${i === slashIdx ? 'is-selected' : ''}`}
              onClick={() => executeSlashCommand(i)}
              onMouseEnter={() => setSlashIdx(i)}
            >
              <span className="slash-menu-item-icon">{cmd.icon}</span>
              <span>
                <span className="slash-menu-item-text">{cmd.label}</span>
                <br />
                <span className="slash-menu-item-desc">{cmd.desc}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ─── Editor content area ───────────────────────────────────── */}
      <div className="article-content" style={{ padding: '0' }}>
        <EditorContent editor={editor} />
      </div>

      {/* ─── Word count footer ─────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '12px 0',
          borderTop: '1px solid var(--border-divider)',
          marginTop: '24px',
          fontSize: '12px',
          color: 'var(--text-decorative)',
        }}
      >
        <span>{chars} {t.tiptap.charCount}</span>
        <span>{words} {t.tiptap.wordCount}</span>
        <span style={{ marginLeft: 'auto', fontSize: '11px' }}>
          {t.tiptap.footerHint}
        </span>
      </div>
    </div>
  );
}

/* ─── Icon components ─────────────────────────────────────────────────── */

function BoldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  );
}

function ItalicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  );
}

function UnderlineIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" /><line x1="4" y1="21" x2="20" y2="21" />
    </svg>
  );
}

function StrikeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 4H9a3 3 0 0 0 0 6h6" /><path d="M8 14h7a3 3 0 0 1 0 6H7" /><line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function HighlightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 11-6 6v3h9l3-3" /><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
