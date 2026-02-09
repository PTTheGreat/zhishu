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
      {/* Decorative grid background */}
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
          className="font-title"
          style={{
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'var(--text-strong)',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          全网内容洞察，
          <br />
          让品牌决策有「数」可依
        </h1>

        <p
          style={{
            maxWidth: '560px',
            margin: '24px auto 0',
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
          }}
        >
          值数覆盖小红书、抖音、微博、知乎、B站等 30+ 内容平台，
          通过 AI 实时抓取与分析全网内容，帮助品牌发现趋势、评估达人、监测声量。
        </p>

        {/* CTA buttons */}
        <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
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
        <div style={{ marginTop: '56px', padding: '0 24px' }}>
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
        style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
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
            <div className="font-en" style={{ fontSize: '30px', fontWeight: 700, color: 'var(--text-strong)' }}>{s.value}</div>
            <div style={{ marginTop: '4px', fontSize: '14px', fontWeight: 400, color: 'var(--text-secondary)' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Features: 数据 / 分析 / 预测 / 处置 ─────────────────────────────── */

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
    illustration: (
      <svg viewBox="0 0 200 160" fill="none" width="200" height="160">
        <rect x="20" y="20" width="160" height="120" rx="12" stroke="#2A6496" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="60" cy="60" r="16" stroke="#2A6496" strokeWidth="1.5" /><text x="60" y="64" textAnchor="middle" fontSize="10" fill="#2A6496">小红书</text>
        <circle cx="140" cy="60" r="16" stroke="#2A6496" strokeWidth="1.5" /><text x="140" y="64" textAnchor="middle" fontSize="10" fill="#2A6496">抖音</text>
        <circle cx="60" cy="110" r="16" stroke="#2A6496" strokeWidth="1.5" /><text x="60" y="114" textAnchor="middle" fontSize="10" fill="#2A6496">微博</text>
        <circle cx="140" cy="110" r="16" stroke="#2A6496" strokeWidth="1.5" /><text x="140" y="114" textAnchor="middle" fontSize="10" fill="#2A6496">B站</text>
        <circle cx="100" cy="85" r="20" fill="#E4EEF5" stroke="#2A6496" strokeWidth="1.5" /><text x="100" y="89" textAnchor="middle" fontSize="10" fill="#2A6496" fontWeight="bold">值数</text>
        <line x1="76" y1="60" x2="80" y2="78" stroke="#2A6496" strokeWidth="1" /><line x1="124" y1="60" x2="120" y2="78" stroke="#2A6496" strokeWidth="1" />
        <line x1="76" y1="107" x2="82" y2="95" stroke="#2A6496" strokeWidth="1" /><line x1="124" y1="107" x2="118" y2="95" stroke="#2A6496" strokeWidth="1" />
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
    illustration: (
      <svg viewBox="0 0 200 160" fill="none" width="200" height="160">
        <rect x="30" y="25" width="140" height="110" rx="10" stroke="#7C6BB5" strokeWidth="1.5" />
        <rect x="45" y="42" width="50" height="8" rx="4" fill="#ECE8F4" /><text x="48" y="49" fontSize="7" fill="#7C6BB5">正面 68%</text>
        <rect x="45" y="58" width="30" height="8" rx="4" fill="#ECE8F4" /><text x="48" y="65" fontSize="7" fill="#7C6BB5">中性 24%</text>
        <rect x="45" y="74" width="15" height="8" rx="4" fill="#ECE8F4" /><text x="48" y="81" fontSize="7" fill="#7C6BB5">负面 8%</text>
        <circle cx="140" cy="65" r="28" stroke="#7C6BB5" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="140" y="62" textAnchor="middle" fontSize="18" fill="#7C6BB5" fontWeight="bold">AI</text>
        <text x="140" y="74" textAnchor="middle" fontSize="8" fill="#7C6BB5">语义引擎</text>
        <rect x="45" y="100" width="110" height="20" rx="6" stroke="#7C6BB5" strokeWidth="1" strokeDasharray="3 3" />
        <text x="100" y="114" textAnchor="middle" fontSize="8" fill="#7C6BB5">#新色号 #联名款 #平替 #学生党</text>
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
    illustration: (
      <svg viewBox="0 0 200 160" fill="none" width="200" height="160">
        <rect x="25" y="20" width="150" height="120" rx="10" stroke="#22863a" strokeWidth="1.5" />
        <polyline points="40,110 60,95 80,100 100,75 120,60 140,40 160,30" stroke="#22863a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <polyline points="120,60 140,55 160,45" stroke="#22863a" strokeWidth="2" strokeDasharray="4 4" fill="none" strokeLinecap="round" />
        <circle cx="120" cy="60" r="4" fill="#22863a" />
        <text x="122" y="56" fontSize="8" fill="#22863a">今天</text>
        <text x="142" y="38" fontSize="8" fill="#22863a">+18.5%</text>
        <line x1="40" y1="110" x2="160" y2="110" stroke="#22863a" strokeWidth="0.5" strokeDasharray="2 2" />
        <rect x="40" y="120" width="30" height="12" rx="4" fill="#e6f4ea" /><text x="43" y="129" fontSize="7" fill="#22863a">7 天</text>
        <rect x="80" y="120" width="30" height="12" rx="4" fill="#e6f4ea" /><text x="83" y="129" fontSize="7" fill="#22863a">14 天</text>
        <rect x="120" y="120" width="30" height="12" rx="4" fill="#e6f4ea" /><text x="123" y="129" fontSize="7" fill="#22863a">30 天</text>
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
    illustration: (
      <svg viewBox="0 0 200 160" fill="none" width="200" height="160">
        <rect x="25" y="20" width="150" height="120" rx="10" stroke="#A67C52" strokeWidth="1.5" />
        <rect x="40" y="36" width="120" height="24" rx="6" fill="#F3ECDF" stroke="#A67C52" strokeWidth="1" />
        <circle cx="52" cy="48" r="6" fill="#A67C52" /><text x="52" y="51" textAnchor="middle" fontSize="8" fill="#fff">1</text>
        <text x="65" y="51" fontSize="9" fill="#A67C52">投放策略推荐</text>
        <rect x="40" y="68" width="120" height="24" rx="6" fill="#F3ECDF" stroke="#A67C52" strokeWidth="1" />
        <circle cx="52" cy="80" r="6" fill="#A67C52" /><text x="52" y="83" textAnchor="middle" fontSize="8" fill="#fff">2</text>
        <text x="65" y="83" fontSize="9" fill="#A67C52">内容策略生成</text>
        <rect x="40" y="100" width="120" height="24" rx="6" fill="#F3ECDF" stroke="#A67C52" strokeWidth="1" />
        <circle cx="52" cy="112" r="6" fill="#A67C52" /><text x="52" y="115" textAnchor="middle" fontSize="8" fill="#fff">3</text>
        <text x="65" y="115" fontSize="9" fill="#A67C52">智能报告输出</text>
      </svg>
    ),
  },
];

function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '96px 0' }}>
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text-decorative)' }}>
            核心能力
          </div>
          <h2 className="font-title" style={{ fontSize: '30px', fontWeight: 700, color: 'var(--text-strong)' }}>
            数据 → 分析 → 预测 → 处置，全链路闭环
          </h2>
          <p style={{ margin: '16px auto 0', maxWidth: '560px', fontSize: '16px', fontWeight: 400, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            值数以四大引擎为核心，帮助品牌从海量内容中提取洞察，并转化为可落地的营销策略
          </p>
        </div>

        <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {MODULES.map((mod, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={mod.tag}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '64px',
                  flexDirection: reversed ? 'row-reverse' : 'row',
                }}
              >
                {/* Illustration */}
                <div
                  style={{
                    flex: '0 0 auto',
                    width: '380px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px',
                    borderRadius: '20px',
                    background: mod.tagBg,
                    border: '1px solid var(--border-divider)',
                  }}
                >
                  {mod.illustration}
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
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
                  <h3
                    className="font-title"
                    style={{ marginTop: '16px', fontSize: '24px', fontWeight: 700, color: 'var(--text-strong)' }}
                  >
                    {mod.title}
                  </h3>
                  <p style={{ marginTop: '12px', fontSize: '15px', fontWeight: 400, lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '460px' }}>
                    {mod.desc}
                  </p>
                  <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {mod.capabilities.map((cap) => (
                      <div key={cap.label}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-strong)' }}>{cap.label}</div>
                        <div style={{ marginTop: '4px', fontSize: '12px', fontWeight: 400, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{cap.detail}</div>
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

/* ─── Workflow: 数据采集 → 智能分析 → 趋势预测 → 策略处置 ──────────────── */

function InsightsSection() {
  const steps = [
    {
      step: '01',
      title: '数据采集',
      desc: '30+ 平台图文、短视频、直播、评论一站式采集',
      icon: '◉',
      color: '#2A6496',
    },
    {
      step: '02',
      title: '智能分析',
      desc: 'AI 情感分析、实体识别、话题聚类、KOL 评估',
      icon: '◎',
      color: '#7C6BB5',
    },
    {
      step: '03',
      title: '趋势预测',
      desc: '声量预测、爆款预判、风险预警，提前布局',
      icon: '◈',
      color: '#22863a',
    },
    {
      step: '04',
      title: '策略处置',
      desc: '投放建议、内容 brief、舆情 SOP、自动报告',
      icon: '▸',
      color: '#A67C52',
    },
  ];

  return (
    <section
      id="insights"
      style={{ borderTop: '1px solid var(--border-divider)', padding: '96px 0' }}
    >
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text-decorative)' }}>工作流程</div>
          <h2 className="font-title" style={{ fontSize: '30px', fontWeight: 700, color: 'var(--text-strong)' }}>
            四步闭环，从数据到决策
          </h2>
        </div>

        <div style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {steps.map((s, i) => (
            <div key={s.step} style={{ position: 'relative', textAlign: 'center' }}>
              {/* Connector */}
              {i < 3 && (
                <div
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
                  fontSize: '24px',
                  background: 'white',
                  border: `2px solid ${s.color}`,
                  color: s.color,
                }}
              >
                {s.icon}
              </div>
              <div className="font-en" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-decorative)', marginBottom: '8px' }}>
                STEP {s.step}
              </div>
              <h3 className="font-title" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-strong)' }}>
                {s.title}
              </h3>
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
    {
      title: '新品上市洞察',
      desc: '在新品上市前，通过全网内容分析找到目标用户的真实需求、竞品的内容策略空白、以及最具种草力的内容形态。',
      metrics: ['需求洞察准确率 92%', '上市周期缩短 40%'],
      color: '#E4EEF5',
    },
    {
      title: '达人营销优化',
      desc: '基于数据筛选达人、评估合作效果、优化投放组合。告别「投了就完」的粗放模式，每一分预算都花在刀刃上。',
      metrics: ['CPE 降低 35%', '互动增量 2.3 倍'],
      color: '#F3ECDF',
    },
    {
      title: '舆情风险管理',
      desc: '7×24 小时监测品牌提及，AI 自动判断情感倾向与传播风险等级，在舆情发酵前发出预警，赢得黄金应对时间。',
      metrics: ['预警提前 4 小时', '处理效率提升 60%'],
      color: '#ECE8F4',
    },
  ];

  return (
    <section id="cases" style={{ borderTop: '1px solid var(--border-divider)', padding: '96px 0' }}>
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 500, color: 'var(--text-decorative)' }}>使用场景</div>
          <h2 className="font-title" style={{ fontSize: '30px', fontWeight: 700, color: 'var(--text-strong)' }}>
            各行业品牌都在用值数
          </h2>
        </div>

        <div style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {cases.map((c) => (
            <div
              key={c.title}
              style={{ overflow: 'hidden', borderRadius: '16px', border: '1px solid var(--border-divider)', background: 'white', transition: 'transform 0.3s, box-shadow 0.3s' }}
            >
              <div style={{ background: c.color, minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                <div style={{ borderRadius: '12px', background: 'rgba(255,255,255,0.6)', padding: '16px 24px', textAlign: 'center', backdropFilter: 'blur(4px)' }}>
                  <div className="font-title" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-strong)' }}>
                    {c.title}
                  </div>
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
    <section id="cta" style={{ padding: '96px 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            borderRadius: '24px',
            padding: '64px',
            textAlign: 'center',
            background: 'var(--text-strong)',
          }}
        >
          <h2 className="font-title" style={{ fontSize: '30px', fontWeight: 700, color: '#fff' }}>
            开始用数据驱动你的品牌决策
          </h2>
          <p style={{ maxWidth: '420px', margin: '16px auto 0', fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>
            免费试用 14 天，无需信用卡。体验全网内容洞察的力量。
          </p>
          <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
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
                transition: 'opacity 0.2s',
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
