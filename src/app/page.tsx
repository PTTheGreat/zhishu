'use client';

import Link from 'next/link';
import HeroDemo from '@/components/HeroDemo';

/* ======================================================================
   值数 — 全网内容洞察平台  |  产品官网首页
   ====================================================================== */

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <InsightsSection />
      <CasesSection />
      <CtaSection />
    </div>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '80px 24px 32px',
          textAlign: 'center',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '9999px',
            border: '1px solid var(--border-divider)',
            padding: '6px 16px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            marginBottom: '24px',
          }}
        >
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
          全网数据实时更新中
        </div>

        <h1
          className="font-title hero-title"
          style={{
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--text-strong)',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          全网内容洞察，
          <br />
          让品牌决策有「数」可依
        </h1>

        <p
          className="hero-desc section-desc"
          style={{
            maxWidth: '540px',
            margin: '20px auto 0',
          }}
        >
          值数覆盖小红书、抖音、微博、知乎、B站等 30+ 内容平台，
          通过 AI 实时抓取与分析全网内容，帮助品牌发现趋势、评估达人、监测声量。
        </p>

        {/* CTA buttons */}
        <div className="hero-cta" style={{ marginTop: '40px' }}>
          <Link
            href="#cta"
            style={{
              borderRadius: '12px',
              padding: '12px 32px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#fff',
              background: 'var(--highlight)',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            免费开始使用
          </Link>
          <Link
            href="#features"
            style={{
              borderRadius: '12px',
              padding: '12px 32px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-regular)',
              border: '1px solid var(--border-divider)',
              textDecoration: 'none',
            }}
          >
            查看功能介绍
          </Link>
        </div>

        {/* Dynamic Demo */}
        <div className="hero-demo-wrap" style={{ marginTop: '56px' }}>
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Bar ────────────────────────────────────────────────────────── */

function StatsBar() {
  const stats = [
    { value: '30+', label: '覆盖内容平台' },
    { value: '1亿+', label: '日均抓取内容' },
    { value: '500万+', label: '达人数据库' },
    { value: '2000+', label: '品牌客户' },
  ];

  return (
    <section style={{ borderTop: '1px solid var(--border-divider)', borderBottom: '1px solid var(--border-divider)' }}>
      <div
        className="stats-grid"
        style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '40px 24px',
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              textAlign: 'center',
              borderLeft: i > 0 ? '1px solid var(--border-divider)' : 'none',
            }}
          >
            <div className="font-en" style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>{s.value}</div>
            <div style={{ marginTop: '6px', fontSize: '13px', fontWeight: 400, color: 'var(--text-secondary)' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Features: 数据 / 分析 / 预测 / 处置 ─────────────────────────────── */

/*
 * Illustration style: minimal, cold, geometric line art.
 * Single muted hue per module. Thin strokes (0.75-1). No text inside SVGs.
 * Abstract forms that hint at the concept without being literal.
 */

const MODULES = [
  {
    tag: '数据',
    tagColor: '#2A6496',
    tagBg: '#E4EEF5',
    title: '全网内容采集引擎',
    desc: '覆盖主流内容与社交平台，实时获取海量非结构化数据，为后续分析奠定基础。',
    capabilities: [
      { label: '30+ 平台实时抓取', detail: '小红书、抖音、微博、知乎、B站、快手等全渠道覆盖' },
      { label: '多形态内容采集', detail: '图文、短视频、直播回放、评论区、弹幕一网打尽' },
      { label: '日均 1 亿+ 条', detail: '分布式采集架构，数据延迟低于 5 分钟' },
      { label: '合规采集', detail: '支持 GDPR / 个保法，数据脱敏与授权管理' },
    ],
    /* Data: scattered nodes converging to a central hub via thin lines */
    illustration: (
      <svg viewBox="0 0 200 160" fill="none" width="200" height="160">
        <circle cx="40" cy="36" r="3" fill="#9DB8CE" />
        <circle cx="160" cy="28" r="3" fill="#9DB8CE" />
        <circle cx="32" cy="100" r="3" fill="#9DB8CE" />
        <circle cx="168" cy="108" r="3" fill="#9DB8CE" />
        <circle cx="80" cy="24" r="3" fill="#9DB8CE" />
        <circle cx="56" cy="132" r="2.5" fill="#9DB8CE" />
        <circle cx="148" cy="136" r="2.5" fill="#9DB8CE" />
        <line x1="40" y1="36" x2="100" y2="80" stroke="#B0C4D6" strokeWidth="0.75" />
        <line x1="160" y1="28" x2="100" y2="80" stroke="#B0C4D6" strokeWidth="0.75" />
        <line x1="32" y1="100" x2="100" y2="80" stroke="#B0C4D6" strokeWidth="0.75" />
        <line x1="168" y1="108" x2="100" y2="80" stroke="#B0C4D6" strokeWidth="0.75" />
        <line x1="80" y1="24" x2="100" y2="80" stroke="#B0C4D6" strokeWidth="0.75" />
        <line x1="56" y1="132" x2="100" y2="80" stroke="#B0C4D6" strokeWidth="0.75" />
        <line x1="148" y1="136" x2="100" y2="80" stroke="#B0C4D6" strokeWidth="0.75" />
        <circle cx="100" cy="80" r="14" stroke="#8AABC5" strokeWidth="1" />
        <circle cx="100" cy="80" r="6" fill="#D6E3ED" />
      </svg>
    ),
  },
  {
    tag: '分析',
    tagColor: '#7C6BB5',
    tagBg: '#ECE8F4',
    title: 'AI 语义分析引擎',
    desc: '基于大语言模型的深度内容理解能力，将非结构化数据转化为可量化的洞察维度。',
    capabilities: [
      { label: '情感分析', detail: '正面 / 负面 / 中性三维度 + 细粒度情绪识别' },
      { label: '实体识别', detail: '品牌 / 产品 / 达人 / 竞品自动提取与关联' },
      { label: '话题聚类', detail: '热点话题自动发现、归类与趋势追踪' },
      { label: 'KOL/KOC 评估', detail: '真粉率、互动质量、商业价值多维评分' },
    ],
    /* Analysis: horizontal bars of different lengths + a prism/diamond shape */
    illustration: (
      <svg viewBox="0 0 200 160" fill="none" width="200" height="160">
        <rect x="36" y="44" width="72" height="6" rx="3" fill="#D5CEED" />
        <rect x="36" y="60" width="52" height="6" rx="3" fill="#D5CEED" />
        <rect x="36" y="76" width="40" height="6" rx="3" fill="#D5CEED" />
        <rect x="36" y="92" width="60" height="6" rx="3" fill="#D5CEED" />
        <rect x="36" y="108" width="28" height="6" rx="3" fill="#D5CEED" />
        <polygon points="148,48 172,80 148,112 124,80" stroke="#A99BBD" strokeWidth="1" fill="none" />
        <polygon points="148,60 164,80 148,100 132,80" stroke="#C4B8D6" strokeWidth="0.75" fill="#EDE9F3" />
        <line x1="108" y1="47" x2="124" y2="72" stroke="#C4B8D6" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="88" y1="63" x2="124" y2="78" stroke="#C4B8D6" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="76" y1="95" x2="124" y2="84" stroke="#C4B8D6" strokeWidth="0.75" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    tag: '预测',
    tagColor: '#22863a',
    tagBg: '#e6f4ea',
    title: '趋势预测引擎',
    desc: '运用时序模型与深度学习，在变化发生之前捕捉信号，帮助品牌抢占先机。',
    capabilities: [
      { label: '声量走势预测', detail: '基于时序模型预判未来 7-30 天趋势变化' },
      { label: '爆款内容预判', detail: '识别具备病毒传播潜力的内容特征' },
      { label: '达人增长预测', detail: '粉丝增速、互动衰减曲线建模' },
      { label: '舆情风险预警', detail: '负面传播概率评估，提前 4+ 小时预警' },
    ],
    /* Prediction: ascending curve + dashed projection */
    illustration: (
      <svg viewBox="0 0 200 160" fill="none" width="200" height="160">
        <line x1="32" y1="128" x2="172" y2="128" stroke="#C2D8C7" strokeWidth="0.5" />
        <line x1="32" y1="104" x2="172" y2="104" stroke="#C2D8C7" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="32" y1="80" x2="172" y2="80" stroke="#C2D8C7" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="32" y1="56" x2="172" y2="56" stroke="#C2D8C7" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="32" y1="32" x2="172" y2="32" stroke="#C2D8C7" strokeWidth="0.5" strokeDasharray="2 4" />
        <polyline points="36,120 56,112 72,116 88,100 104,88 120,68 132,52" stroke="#89AB92" strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="132,52 148,44 168,36" stroke="#89AB92" strokeWidth="1.25" strokeDasharray="4 3" fill="none" strokeLinecap="round" />
        <circle cx="132" cy="52" r="3.5" stroke="#89AB92" strokeWidth="1" fill="white" />
        <circle cx="132" cy="52" r="1.5" fill="#89AB92" />
      </svg>
    ),
  },
  {
    tag: '处置',
    tagColor: '#A67C52',
    tagBg: '#F3ECDF',
    title: '智能决策引擎',
    desc: '将数据洞察转化为可执行的策略建议，闭环驱动品牌营销行动。',
    capabilities: [
      { label: '投放策略推荐', detail: '达人组合优化、预算分配建议' },
      { label: '内容策略生成', detail: '基于洞察自动生成内容 brief 与选题方向' },
      { label: '舆情响应方案', detail: '预置应对 SOP，负面事件一键启动' },
      { label: '智能报告输出', detail: 'AI 生成周报 / 月报，一键导出 PPT' },
    ],
    /* Action: stacked card outlines with small check circles */
    illustration: (
      <svg viewBox="0 0 200 160" fill="none" width="200" height="160">
        <rect x="48" y="28" width="108" height="28" rx="6" stroke="#C4B09A" strokeWidth="0.75" />
        <circle cx="66" cy="42" r="5" stroke="#C4B09A" strokeWidth="0.75" />
        <polyline points="63,42 65.5,44.5 69,40" stroke="#B5A08A" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="80" y1="42" x2="140" y2="42" stroke="#D8CBBC" strokeWidth="0.75" />

        <rect x="48" y="66" width="108" height="28" rx="6" stroke="#C4B09A" strokeWidth="0.75" />
        <circle cx="66" cy="80" r="5" stroke="#C4B09A" strokeWidth="0.75" />
        <polyline points="63,80 65.5,82.5 69,78" stroke="#B5A08A" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="80" y1="80" x2="132" y2="80" stroke="#D8CBBC" strokeWidth="0.75" />

        <rect x="48" y="104" width="108" height="28" rx="6" stroke="#C4B09A" strokeWidth="0.75" />
        <circle cx="66" cy="118" r="5" stroke="#C4B09A" strokeWidth="0.75" fill="none" />
        <line x1="80" y1="118" x2="120" y2="118" stroke="#D8CBBC" strokeWidth="0.75" />
      </svg>
    ),
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="section-pad">
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="section-eyebrow">核心能力</div>
          <h2 className="section-heading">
            数据 → 分析 → 预测 → 处置，全链路闭环
          </h2>
          <p className="section-desc" style={{ margin: '14px auto 0', maxWidth: '540px' }}>
            值数以四大引擎为核心，帮助品牌从海量内容中提取洞察，并转化为可落地的营销策略
          </p>
        </div>

        <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', gap: '80px', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
          {MODULES.map((mod, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={mod.tag}
                className={`feature-module ${reversed ? 'is-reversed' : ''}`}
              >
                {/* Illustration */}
                <div
                  className="feature-module-illust"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '20px',
                    background: mod.tagBg,
                    border: '1px solid var(--border-divider)',
                  }}
                >
                  {mod.illustration}
                </div>

                {/* Text */}
                <div className="feature-module-text">
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: mod.tagColor,
                      background: mod.tagBg,
                    }}
                  >
                    {mod.tag}
                  </span>
                  <h3 className="module-heading" style={{ marginTop: '14px' }}>
                    {mod.title}
                  </h3>
                  <p className="section-desc" style={{ marginTop: '10px' }}>
                    {mod.desc}
                  </p>
                  <div className="feature-caps-grid" style={{ marginTop: '20px' }}>
                    {mod.capabilities.map((cap) => (
                      <div key={cap.label}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.4 }}>{cap.label}</div>
                        <div style={{ marginTop: '3px', fontSize: '12px', fontWeight: 400, lineHeight: 1.55, color: 'var(--text-secondary)' }}>{cap.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Workflow: SVG icons for each step ────────────────────────────────── */

function WorkflowIcon({ type, color }: { type: string; color: string }) {
  const muted = color + '40'; // 25% opacity
  if (type === 'data') {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="8" cy="8" r="2" fill={muted} stroke={color} strokeWidth="0.75" />
        <circle cx="20" cy="8" r="2" fill={muted} stroke={color} strokeWidth="0.75" />
        <circle cx="8" cy="20" r="2" fill={muted} stroke={color} strokeWidth="0.75" />
        <circle cx="20" cy="20" r="2" fill={muted} stroke={color} strokeWidth="0.75" />
        <circle cx="14" cy="14" r="3" stroke={color} strokeWidth="1" />
        <line x1="10" y1="9" x2="12" y2="12" stroke={color} strokeWidth="0.5" />
        <line x1="18" y1="9" x2="16" y2="12" stroke={color} strokeWidth="0.5" />
        <line x1="10" y1="19" x2="12" y2="16" stroke={color} strokeWidth="0.5" />
        <line x1="18" y1="19" x2="16" y2="16" stroke={color} strokeWidth="0.5" />
      </svg>
    );
  }
  if (type === 'analysis') {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="6" y="8" width="10" height="2" rx="1" fill={color} opacity="0.5" />
        <rect x="6" y="13" width="7" height="2" rx="1" fill={color} opacity="0.35" />
        <rect x="6" y="18" width="12" height="2" rx="1" fill={color} opacity="0.25" />
        <polygon points="21,8 24,14 21,20 18,14" stroke={color} strokeWidth="0.75" fill="none" />
      </svg>
    );
  }
  if (type === 'predict') {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polyline points="4,22 10,16 14,18 20,10" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="20,10 24,6" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="2 2" />
        <circle cx="20" cy="10" r="2" stroke={color} strokeWidth="0.75" fill="white" />
      </svg>
    );
  }
  // action
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="6" y="6" width="16" height="5" rx="2" stroke={color} strokeWidth="0.75" />
      <rect x="6" y="13.5" width="16" height="5" rx="2" stroke={color} strokeWidth="0.75" />
      <polyline points="9,8 10.5,9.5 12.5,7" stroke={color} strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="9,15.5 10.5,17 12.5,14.5" stroke={color} strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="6" y="21" width="16" height="5" rx="2" stroke={color} strokeWidth="0.75" fill="none" opacity="0.4" />
    </svg>
  );
}

function InsightsSection() {
  const steps = [
    { step: '01', title: '数据采集', desc: '30+ 平台图文、短视频、直播、评论一站式采集', iconType: 'data', color: '#2A6496' },
    { step: '02', title: '智能分析', desc: 'AI 情感分析、实体识别、话题聚类、KOL 评估', iconType: 'analysis', color: '#7C6BB5' },
    { step: '03', title: '趋势预测', desc: '声量预测、爆款预判、风险预警，提前布局', iconType: 'predict', color: '#22863a' },
    { step: '04', title: '策略处置', desc: '投放建议、内容 brief、舆情 SOP、自动报告', iconType: 'action', color: '#A67C52' },
  ];

  return (
    <section id="insights" className="section-pad" style={{ borderTop: '1px solid var(--border-divider)' }}>
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="section-eyebrow">工作流程</div>
          <h2 className="section-heading">四步闭环，从数据到决策</h2>
        </div>

        <div className="workflow-grid" style={{ marginTop: '64px', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
          {steps.map((s, i) => (
            <div key={s.step} style={{ position: 'relative', textAlign: 'center' }}>
              {i < 3 && (
                <div
                  className="workflow-connector"
                  style={{
                    position: 'absolute',
                    top: '32px',
                    right: 0,
                    width: '100%',
                    transform: 'translateX(50%)',
                    borderTop: '1px dashed var(--border-divider)',
                  }}
                />
              )}
              <div
                style={{
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  background: 'white',
                  border: `1.5px solid ${s.color}30`,
                }}
              >
                <WorkflowIcon type={s.iconType} color={s.color} />
              </div>
              <div className="font-en" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-decorative)', letterSpacing: '0.08em', marginBottom: '8px' }}>
                STEP {s.step}
              </div>
              <h3 className="card-title">{s.title}</h3>
              <p style={{ marginTop: '8px', fontSize: '13px', fontWeight: 400, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Use Cases ────────────────────────────────────────────────────────── */

function CasesSection() {
  const cases = [
    { title: '新品上市洞察', desc: '在新品上市前，通过全网内容分析找到目标用户的真实需求、竞品的内容策略空白、以及最具种草力的内容形态。', metrics: ['需求洞察准确率 92%', '上市周期缩短 40%'], color: '#E4EEF5' },
    { title: '达人营销优化', desc: '基于数据筛选达人、评估合作效果、优化投放组合。告别「投了就完」的粗放模式，每一分预算都花在刀刃上。', metrics: ['CPE 降低 35%', '互动增量 2.3 倍'], color: '#F3ECDF' },
    { title: '舆情风险管理', desc: '7×24 小时监测品牌提及，AI 自动判断情感倾向与传播风险等级，在舆情发酵前发出预警，赢得黄金应对时间。', metrics: ['预警提前 4 小时', '处理效率提升 60%'], color: '#ECE8F4' },
  ];

  return (
    <section id="cases" className="section-pad" style={{ borderTop: '1px solid var(--border-divider)' }}>
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="section-eyebrow">使用场景</div>
          <h2 className="section-heading">各行业品牌都在用值数</h2>
        </div>

        <div className="cases-grid" style={{ marginTop: '64px', maxWidth: '1080px', marginLeft: 'auto', marginRight: 'auto' }}>
          {cases.map((c) => (
            <div
              key={c.title}
              style={{ overflow: 'hidden', borderRadius: '16px', border: '1px solid var(--border-divider)', background: 'white' }}
            >
              <div style={{ background: c.color, minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                <div style={{ borderRadius: '12px', background: 'rgba(255,255,255,0.6)', padding: '16px 24px', textAlign: 'center', backdropFilter: 'blur(4px)' }}>
                  <div className="card-title">{c.title}</div>
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{ fontSize: '14px', fontWeight: 400, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                  {c.desc}
                </p>
                <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {c.metrics.map((m) => (
                    <span
                      key={m}
                      style={{ borderRadius: '9999px', border: '1px solid var(--border-divider)', padding: '4px 12px', fontSize: '12px', fontWeight: 500, color: 'var(--text-strong)' }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ──────────────────────────────────────────────────────────────── */

function CtaSection() {
  return (
    <section id="cta" className="section-pad">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <div className="cta-box" style={{ textAlign: 'center', background: 'var(--text-strong)' }}>
          <h2 className="section-heading cta-heading" style={{ color: '#fff' }}>
            开始用数据驱动你的品牌决策
          </h2>
          <p style={{ maxWidth: '420px', margin: '14px auto 0', fontSize: '15px', fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.65)' }}>
            免费试用 14 天，无需信用卡。体验全网内容洞察的力量。
          </p>
          <div className="cta-buttons" style={{ marginTop: '32px' }}>
            <button
              style={{
                borderRadius: '12px',
                padding: '12px 32px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#fff',
                background: 'var(--highlight)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              免费试用
            </button>
            <button
              style={{
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '12px 32px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#fff',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              预约演示
            </button>
          </div>
          <p style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
            已有 2000+ 品牌在使用值数
          </p>
        </div>
      </div>
    </section>
  );
}
