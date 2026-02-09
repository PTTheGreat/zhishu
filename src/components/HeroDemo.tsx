'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Scene data ──────────────────────────────────────────────────────── */

interface Scene {
  query: string;
  data: { platform: string; count: string }[];
  analysis: string[];
  predictions: { label: string; value: string; trend: 'up' | 'down' }[];
  actions: string[];
}

const SCENES: Scene[] = [
  {
    query: '分析「完美日记」近 7 天全网声量',
    data: [
      { platform: '小红书', count: '12,847' },
      { platform: '抖音', count: '8,392' },
      { platform: '微博', count: '5,621' },
      { platform: 'B站', count: '2,104' },
      { platform: '知乎', count: '1,538' },
    ],
    analysis: [
      '情感分布：正面 68.3% · 中性 24.1% · 负面 7.6%',
      '热词提取：#新色号 #联名款 #学生党 #平替 #圣诞限定',
      '品牌提及增量：较上周 +23.1%，主要由抖音短视频驱动',
      'KOL 关联：头部达人「程十安」提及带来 34% 的声量峰值',
    ],
    predictions: [
      { label: '未来 7 日声量预测', value: '+18.5%', trend: 'up' },
      { label: '情感正向率趋势', value: '72.1%', trend: 'up' },
      { label: '潜在舆情风险', value: '低', trend: 'down' },
    ],
    actions: [
      '建议在抖音追加 15% 预算，该渠道 ROI 最高',
      '联名款话题可策划 UGC 活动，借势当前热度',
      '关注负面评论中"色差"问题，建议产品团队跟进',
    ],
  },
  {
    query: '评估达人「美妆小鱼」的合作价值',
    data: [
      { platform: '粉丝量', count: '328 万' },
      { platform: '近 30 日作品', count: '24 篇' },
      { platform: '平均互动', count: '8,432' },
      { platform: '品牌合作', count: '12 次' },
      { platform: '真粉率', count: '94.2%' },
    ],
    analysis: [
      '内容风格：美妆教程 62% · 好物推荐 28% · 日常 Vlog 10%',
      '粉丝画像：女性 89% | 18-25 岁 42% | 一线城市 58%',
      '互动质量评分：92/100（远超同级达人均值 71）',
      '商业内容自然度：A 级 — 广告与内容融合度高',
    ],
    predictions: [
      { label: '预估合作 CPE', value: '¥2.8', trend: 'down' },
      { label: '预估 ROI', value: '3.2x', trend: 'up' },
      { label: '粉丝增长趋势', value: '+5.4%/月', trend: 'up' },
    ],
    actions: [
      '推荐合作形式：好物推荐视频 + 评论区置顶',
      '最佳发布时段：周二/周四 19:00-21:00',
      '预算建议：单条 ¥35,000，3 条打包 ¥90,000',
    ],
  },
];

const PHASE_LABELS = ['数据采集', '智能分析', '趋势预测', '策略处置'];
const PHASE_ICONS = ['◉', '◎', '◈', '▸'];

/* ─── Timings (ms) ────────────────────────────────────────────────────── */
const TYPING_SPEED = 55;
const DATA_CARD_DELAY = 350;
const ANALYSIS_LINE_SPEED = 30;
const ANALYSIS_LINE_DELAY = 400;
const PREDICT_DELAY = 500;
const ACTION_DELAY = 600;
const SCENE_PAUSE = 2500;

/* ─── Component ───────────────────────────────────────────────────────── */

export default function HeroDemo() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [phase, setPhase] = useState(-1); // -1=typing query, 0-3=phases
  const [typedQuery, setTypedQuery] = useState('');
  const [visibleDataCards, setVisibleDataCards] = useState(0);
  const [analysisLines, setAnalysisLines] = useState<string[]>([]);
  const [currentAnalysisText, setCurrentAnalysisText] = useState('');
  const [visiblePredictions, setVisiblePredictions] = useState(0);
  const [visibleActions, setVisibleActions] = useState(0);
  const [fade, setFade] = useState(true);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scene = SCENES[sceneIdx];

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
    return t;
  }, []);

  /* Reset state for new scene */
  const resetState = useCallback(() => {
    setPhase(-1);
    setTypedQuery('');
    setVisibleDataCards(0);
    setAnalysisLines([]);
    setCurrentAnalysisText('');
    setVisiblePredictions(0);
    setVisibleActions(0);
  }, []);

  /* Run a full scene */
  useEffect(() => {
    clearTimers();
    resetState();
    setFade(true);

    const s = SCENES[sceneIdx];
    let elapsed = 300; // initial delay

    /* Phase -1: Type the query */
    const queryChars = s.query.split('');
    queryChars.forEach((_, i) => {
      addTimer(() => {
        setTypedQuery(s.query.slice(0, i + 1));
      }, elapsed + i * TYPING_SPEED);
    });
    elapsed += queryChars.length * TYPING_SPEED + 400;

    /* Phase 0: Data collection */
    addTimer(() => setPhase(0), elapsed);
    elapsed += 200;
    s.data.forEach((_, i) => {
      addTimer(() => setVisibleDataCards(i + 1), elapsed + i * DATA_CARD_DELAY);
    });
    elapsed += s.data.length * DATA_CARD_DELAY + 400;

    /* Phase 1: Analysis — stream each line character by character */
    addTimer(() => setPhase(1), elapsed);
    elapsed += 200;
    s.analysis.forEach((line, lineIdx) => {
      const lineStart = elapsed;
      // Stream each character of this line
      const chars = line.split('');
      chars.forEach((_, charIdx) => {
        addTimer(() => {
          setCurrentAnalysisText(line.slice(0, charIdx + 1));
        }, lineStart + charIdx * ANALYSIS_LINE_SPEED);
      });
      // When line is done, push it to completed lines
      const lineEnd = lineStart + chars.length * ANALYSIS_LINE_SPEED + 100;
      addTimer(() => {
        setAnalysisLines((prev) => [...prev, line]);
        setCurrentAnalysisText('');
      }, lineEnd);
      elapsed = lineEnd + ANALYSIS_LINE_DELAY;
    });

    /* Phase 2: Predictions */
    addTimer(() => setPhase(2), elapsed);
    elapsed += 200;
    s.predictions.forEach((_, i) => {
      addTimer(() => setVisiblePredictions(i + 1), elapsed + i * PREDICT_DELAY);
    });
    elapsed += s.predictions.length * PREDICT_DELAY + 500;

    /* Phase 3: Actions */
    addTimer(() => setPhase(3), elapsed);
    elapsed += 200;
    s.actions.forEach((_, i) => {
      addTimer(() => setVisibleActions(i + 1), elapsed + i * ACTION_DELAY);
    });
    elapsed += s.actions.length * ACTION_DELAY + 600;

    /* Fade out and switch scene */
    addTimer(() => setFade(false), elapsed);
    addTimer(() => {
      setSceneIdx((prev) => (prev + 1) % SCENES.length);
    }, elapsed + SCENE_PAUSE);

    return clearTimers;
  }, [sceneIdx, clearTimers, resetState, addTimer]);

  return (
    <div
      style={{
        maxWidth: '960px',
        margin: '0 auto',
        opacity: fade ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <div
        style={{
          borderRadius: '16px',
          border: '1px solid var(--border-divider)',
          background: 'white',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
        }}
      >
        {/* Window chrome */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid var(--border-divider)',
            padding: '12px 16px',
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
          <div
            style={{
              flex: 1,
              marginLeft: '12px',
              borderRadius: '8px',
              border: '1px solid var(--border-divider)',
              padding: '6px 12px',
              fontSize: '12px',
              color: 'var(--text-decorative)',
              fontFamily: 'var(--font-en)',
            }}
          >
            app.zhishu.io/insights
          </div>
        </div>

        {/* Content area */}
        <div style={{ padding: '24px', minHeight: '420px' }}>
          {/* Query bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              borderRadius: '12px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-divider)',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '16px', opacity: 0.5 }}>⌕</span>
            <span
              style={{
                fontSize: '14px',
                color: typedQuery ? 'var(--text-strong)' : 'var(--text-decorative)',
                fontWeight: 400,
                flex: 1,
              }}
            >
              {typedQuery || '输入品牌、达人或话题...'}
              {phase === -1 && typedQuery && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '16px',
                    background: 'var(--highlight)',
                    marginLeft: '1px',
                    verticalAlign: 'text-bottom',
                    animation: 'blink 0.8s infinite',
                  }}
                />
              )}
            </span>
          </div>

          {/* Phase progress bar */}
          {phase >= 0 && (
            <div
              style={{
                display: 'flex',
                gap: '4px',
                marginBottom: '20px',
                opacity: 1,
                transition: 'opacity 0.3s',
              }}
            >
              {PHASE_LABELS.map((label, i) => (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '8px 0',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: phase === i ? 600 : 400,
                    color: phase >= i ? 'var(--highlight)' : 'var(--text-decorative)',
                    background: phase === i ? 'var(--highlight-light)' : 'transparent',
                    transition: 'all 0.3s',
                  }}
                >
                  <span style={{ marginRight: '4px' }}>{PHASE_ICONS[i]}</span>
                  {label}
                </div>
              ))}
            </div>
          )}

          {/* Phase 0: Data cards */}
          {phase >= 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${scene.data.length}, 1fr)`,
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              {scene.data.map((d, i) => (
                <div
                  key={d.platform}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-divider)',
                    opacity: i < visibleDataCards ? 1 : 0,
                    transform: i < visibleDataCards ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'all 0.35s ease',
                  }}
                >
                  <div style={{ fontSize: '11px', color: 'var(--text-decorative)', fontWeight: 400 }}>
                    {d.platform}
                  </div>
                  <div
                    className="font-en"
                    style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-strong)', marginTop: '4px' }}
                  >
                    {d.count}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Phase 1: Analysis streaming */}
          {phase >= 1 && (
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'var(--bg-primary)',
                marginBottom: '16px',
                fontSize: '13px',
                lineHeight: 1.8,
                color: 'var(--text-regular)',
                fontWeight: 400,
                minHeight: '80px',
              }}
            >
              {analysisLines.map((line, i) => (
                <div key={i} style={{ marginBottom: '4px' }}>
                  <span style={{ color: 'var(--highlight)', marginRight: '6px' }}>▸</span>
                  {line}
                </div>
              ))}
              {currentAnalysisText && (
                <div>
                  <span style={{ color: 'var(--highlight)', marginRight: '6px' }}>▸</span>
                  {currentAnalysisText}
                  <span
                    style={{
                      display: 'inline-block',
                      width: '2px',
                      height: '13px',
                      background: 'var(--highlight)',
                      marginLeft: '1px',
                      verticalAlign: 'text-bottom',
                      animation: 'blink 0.6s infinite',
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Phase 2: Predictions */}
          {phase >= 2 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${scene.predictions.length}, 1fr)`,
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              {scene.predictions.map((p, i) => (
                <div
                  key={p.label}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-divider)',
                    opacity: i < visiblePredictions ? 1 : 0,
                    transform: i < visiblePredictions ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'all 0.4s ease',
                  }}
                >
                  <div style={{ fontSize: '11px', color: 'var(--text-decorative)', fontWeight: 400 }}>
                    {p.label}
                  </div>
                  <div
                    className="font-en"
                    style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      color: p.trend === 'up' ? '#22c55e' : 'var(--highlight)',
                      marginTop: '4px',
                    }}
                  >
                    {p.value}
                  </div>
                  <div style={{ fontSize: '11px', color: p.trend === 'up' ? '#22c55e' : 'var(--highlight)', marginTop: '2px' }}>
                    {p.trend === 'up' ? '↑ 上升趋势' : '↓ 利好'}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Phase 3: Action cards */}
          {phase >= 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {scene.actions.map((action, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-divider)',
                    background: i === 0 ? 'var(--highlight-light)' : 'white',
                    opacity: i < visibleActions ? 1 : 0,
                    transform: i < visibleActions ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'all 0.4s ease',
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: i === 0 ? 'var(--highlight)' : 'var(--border-divider)',
                      color: i === 0 ? '#fff' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 600,
                      flexShrink: 0,
                      marginTop: '1px',
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-regular)', fontWeight: 400, lineHeight: 1.5 }}>
                    {action}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Blink cursor keyframe */}
      <style>{`@keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }`}</style>
    </div>
  );
}
