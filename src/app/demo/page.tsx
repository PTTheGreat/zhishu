'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useT } from '@/i18n/context';

interface FormErrors {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
}

export default function DemoPage() {
  const t = useT();

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [needs, setNeeds] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sizeOptions = t.demo.companySizeOptions as unknown as string[];

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!companyName.trim()) errs.companyName = t.demo.requiredField;
    if (!contactName.trim()) errs.contactName = t.demo.requiredField;
    if (!email.trim()) {
      errs.email = t.demo.requiredField;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = t.demo.invalidEmail;
    }
    if (!phone.trim()) {
      errs.phone = t.demo.requiredField;
    } else if (!/^[\d\s\-+()]{7,20}$/.test(phone)) {
      errs.phone = t.demo.invalidPhone;
    }
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    // Simulate API call (replace with real endpoint later)
    await new Promise((r) => setTimeout(r, 1200));

    setSubmitting(false);
    setSubmitted(true);
  };

  /* ─── Success state ──────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          padding: '120px 24px 80px',
          textAlign: 'center',
        }}
      >
        {/* Success icon */}
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#e6f4ea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22863a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1
          className="font-title"
          style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-strong)', lineHeight: 1.3 }}
        >
          {t.demo.successTitle}
        </h1>
        <p
          className="section-desc"
          style={{ marginTop: '16px', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {t.demo.successDesc}
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            marginTop: '32px',
            padding: '10px 28px',
            borderRadius: '10px',
            background: 'var(--highlight)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
        >
          {t.demo.backToHome}
        </Link>
      </div>
    );
  }

  /* ─── Form state ─────────────────────────────────────────────────── */
  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    borderRadius: '10px',
    border: `1px solid ${hasError ? '#e53e3e' : 'var(--border-divider)'}`,
    padding: '10px 14px',
    fontSize: '14px',
    outline: 'none',
    color: 'var(--text-regular)',
    background: '#fff',
    transition: 'border-color 0.2s',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
  };

  const errorStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#e53e3e',
    marginTop: '4px',
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '64px 24px 80px',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1
          className="font-title"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--text-strong)',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
          }}
        >
          {t.demo.pageTitle}
        </h1>
        <p className="section-desc" style={{ marginTop: '14px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
          {t.demo.pageDesc}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Company Name */}
          <div>
            <label style={labelStyle}>{t.demo.companyName} *</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={t.demo.companyNamePlaceholder}
              style={inputStyle(!!errors.companyName)}
            />
            {errors.companyName && <div style={errorStyle}>{errors.companyName}</div>}
          </div>

          {/* Contact Name */}
          <div>
            <label style={labelStyle}>{t.demo.contactName} *</label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder={t.demo.contactNamePlaceholder}
              style={inputStyle(!!errors.contactName)}
            />
            {errors.contactName && <div style={errorStyle}>{errors.contactName}</div>}
          </div>

          {/* Email + Phone row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>{t.demo.email} *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.demo.emailPlaceholder}
                style={inputStyle(!!errors.email)}
              />
              {errors.email && <div style={errorStyle}>{errors.email}</div>}
            </div>
            <div>
              <label style={labelStyle}>{t.demo.phone} *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.demo.phonePlaceholder}
                style={inputStyle(!!errors.phone)}
              />
              {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
            </div>
          </div>

          {/* Company Size */}
          <div>
            <label style={labelStyle}>{t.demo.companySize}</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {sizeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCompanySize(opt)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: companySize === opt
                      ? '1.5px solid var(--highlight)'
                      : '1px solid var(--border-divider)',
                    background: companySize === opt ? 'var(--highlight-light)' : '#fff',
                    color: companySize === opt ? 'var(--highlight)' : 'var(--text-secondary)',
                    fontSize: '13px',
                    fontWeight: companySize === opt ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Needs */}
          <div>
            <label style={labelStyle}>{t.demo.needs}</label>
            <textarea
              value={needs}
              onChange={(e) => setNeeds(e.target.value)}
              placeholder={t.demo.needsPlaceholder}
              rows={4}
              style={{
                ...inputStyle(false),
                resize: 'vertical',
                fontFamily: 'inherit',
                lineHeight: 1.6,
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              background: 'var(--highlight)',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 600,
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.65 : 1,
              transition: 'opacity 0.2s',
              marginTop: '8px',
            }}
          >
            {submitting ? t.demo.submitting : t.demo.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
