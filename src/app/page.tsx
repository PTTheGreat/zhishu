'use client';

import Link from 'next/link';
import HeroDemo from '@/components/HeroDemo';
import { useT } from '@/i18n/context';

/* ======================================================================
   值数 / ZhiShu — 全网内容洞察平台  |  产品官网首页
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
  const t = useT();

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
          {t.hero.badge}
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
          {t.hero.titleLine1}
          <br />
          {t.hero.titleLine2}
        </h1>

        <p
          className="hero-desc section-desc"
          style={{
            maxWidth: '540px',
            margin: '20px auto 0',
          }}
        >
          {t.hero.desc}
        </p>

        {/* CTA buttons */}
        <div className="hero-cta" style={{ marginTop: '40px' }}>
          <Link
            href="/demo"
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
            {t.hero.ctaPrimary}
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
            {t.hero.ctaSecondary}
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
  const t = useT();

  const stats = [
    { value: t.stats.platformsValue, label: t.stats.platforms },
    { value: t.stats.dailyCrawlValue, label: t.stats.dailyCrawl },
    { value: t.stats.kolDbValue, label: t.stats.kolDb },
    { value: t.stats.clientsValue, label: t.stats.clients },
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

const MODULE_VISUAL = [
  {
    tagColor: '#2A6496',
    tagBg: '#E4EEF5',
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
    tagColor: '#7C6BB5',
    tagBg: '#ECE8F4',
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
    tagColor: '#22863a',
    tagBg: '#e6f4ea',
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
    tagColor: '#A67C52',
    tagBg: '#F3ECDF',
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
  const t = useT();
  const modules = t.features.modules;

  return (
    <section id="features" className="section-pad">
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="section-eyebrow">{t.features.eyebrow}</div>
          <h2 className="section-heading">
            {t.features.heading}
          </h2>
          <p className="section-desc" style={{ margin: '14px auto 0', maxWidth: '540px' }}>
            {t.features.desc}
          </p>
        </div>

        <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', gap: '80px', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
          {modules.map((mod, idx) => {
            const visual = MODULE_VISUAL[idx];
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
                    background: visual.tagBg,
                    border: '1px solid var(--border-divider)',
                  }}
                >
                  {visual.illustration}
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
                      color: visual.tagColor,
                      background: visual.tagBg,
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

const STEP_COLORS = ['#2A6496', '#7C6BB5', '#22863a', '#A67C52'];
const STEP_ICON_TYPES = ['data', 'analysis', 'predict', 'action'];

function WorkflowIcon({ type, color }: { type: string; color: string }) {
  const muted = color + '40';
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
  const t = useT();
  const steps = t.workflow.steps;

  return (
    <section id="insights" className="section-pad" style={{ borderTop: '1px solid var(--border-divider)' }}>
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="section-eyebrow">{t.workflow.eyebrow}</div>
          <h2 className="section-heading">{t.workflow.heading}</h2>
        </div>

        <div className="workflow-grid" style={{ marginTop: '64px', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ position: 'relative', textAlign: 'center' }}>
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
                  border: `1.5px solid ${STEP_COLORS[i]}30`,
                }}
              >
                <WorkflowIcon type={STEP_ICON_TYPES[i]} color={STEP_COLORS[i]} />
              </div>
              <div className="font-en" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-decorative)', letterSpacing: '0.08em', marginBottom: '8px' }}>
                STEP {String(i + 1).padStart(2, '0')}
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

const CASE_COLORS = ['#E4EEF5', '#F3ECDF', '#ECE8F4'];

function CasesSection() {
  const t = useT();
  const items = t.cases.items;

  return (
    <section id="cases" className="section-pad" style={{ borderTop: '1px solid var(--border-divider)' }}>
      <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="section-eyebrow">{t.cases.eyebrow}</div>
          <h2 className="section-heading">{t.cases.heading}</h2>
        </div>

        <div className="cases-grid" style={{ marginTop: '64px', maxWidth: '1080px', marginLeft: 'auto', marginRight: 'auto' }}>
          {items.map((c, i) => (
            <div
              key={c.title}
              style={{ overflow: 'hidden', borderRadius: '16px', border: '1px solid var(--border-divider)', background: 'white' }}
            >
              <div style={{ background: CASE_COLORS[i] || '#F0F0EC', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
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
  const t = useT();

  return (
    <section id="cta" className="section-pad">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <div className="cta-box" style={{ textAlign: 'center', background: 'var(--text-strong)' }}>
          <h2 className="section-heading cta-heading" style={{ color: '#fff' }}>
            {t.cta.heading}
          </h2>
          <p style={{ maxWidth: '420px', margin: '14px auto 0', fontSize: '15px', fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.65)' }}>
            {t.cta.desc}
          </p>
          <div className="cta-buttons" style={{ marginTop: '32px' }}>
            <Link
              href="/demo"
              style={{
                display: 'inline-block',
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
              {t.cta.primary}
            </Link>
            <Link
              href="/demo"
              style={{
                display: 'inline-block',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '12px 32px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#fff',
                background: 'transparent',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              {t.cta.secondary}
            </Link>
          </div>
          <p style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
            {t.cta.social}
          </p>
        </div>
      </div>
    </section>
  );
}
