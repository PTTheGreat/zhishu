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
import { useState, useCallback, useEffect, useRef } from 'react';

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

const SLASH_COMMANDS: SlashItem[] = [
  {
    label: '标题 1',
    desc: '大标题',
    icon: 'H1',
    action: (editor) => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    label: '标题 2',
    desc: '中标题',
    icon: 'H2',
    action: (editor) => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    label: '标题 3',
    desc: '小标题',
    icon: 'H3',
    action: (editor) => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    label: '无序列表',
    desc: '创建项目符号列表',
    icon: '•',
    action: (editor) => editor?.chain().focus().toggleBulletList().run(),
  },
  {
    label: '有序列表',
    desc: '创建编号列表',
    icon: '1.',
    action: (editor) => editor?.chain().focus().toggleOrderedList().run(),
  },
  {
    label: '待办列表',
    desc: '创建任务清单',
    icon: '☑',
    action: (editor) => editor?.chain().focus().toggleTaskList().run(),
  },
  {
    label: '引用',
    desc: '插入引用块',
    icon: '"',
    action: (editor) => editor?.chain().focus().toggleBlockquote().run(),
  },
  {
    label: '代码块',
    desc: '插入代码片段',
    icon: '<>',
    action: (editor) => editor?.chain().focus().toggleCodeBlock().run(),
  },
  {
    label: '分割线',
    desc: '插入水平线',
    icon: '—',
    action: (editor) => editor?.chain().focus().setHorizontalRule().run(),
  },
  {
    label: '图片',
    desc: '通过 URL 插入图片',
    icon: '🖼',
    action: (editor) => {
      const url = window.prompt('输入图片 URL');
      if (url) editor?.chain().focus().setImage({ src: url }).run();
    },
  },
];

/* ─── Main Editor Component ───────────────────────────────────────────── */

export default function TiptapEditor({ content = '', onChange }: TiptapEditorProps) {
  const [slashOpen, setSlashOpen] = useState(false);
  const [slashFilter, setSlashFilter] = useState('');
  const [slashIdx, setSlashIdx] = useState(0);
  const [slashPos, setSlashPos] = useState<{ top: number; left: number } | null>(null);
  const slashRef = useRef<HTMLDivElement>(null);

  // Floating toolbar state
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPos, setToolbarPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const editorContainerRef = useRef<HTMLDivElement>(null);

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
            return `标题 ${node.attrs.level}`;
          }
          return '输入 / 呼出命令菜单...';
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
      // Get selection coords
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
    const url = window.prompt('输入链接 URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const chars = editor.storage.characterCount.characters();
  const words = editor.storage.characterCount.words();

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
            title="粗体"
          >
            <BoldIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            title="斜体"
          >
            <ItalicIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
            title="下划线"
          >
            <UnderlineIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
            title="删除线"
          >
            <StrikeIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
            title="行内代码"
          >
            <CodeIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'is-active' : ''}
            title="高亮"
          >
            <HighlightIcon />
          </button>
          <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''} title="链接">
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
        <span>{chars} 字符</span>
        <span>{words} 词</span>
        <span style={{ marginLeft: 'auto', fontSize: '11px' }}>
          输入 <kbd style={{ padding: '1px 4px', borderRadius: '3px', border: '1px solid var(--border-divider)', fontSize: '11px', fontFamily: 'var(--font-en)' }}>/</kbd> 呼出命令菜单 · 选中文字出现格式工具栏
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
