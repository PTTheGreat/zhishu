/* ─── English UI dictionary ────────────────────────────────────────── */

import type { Dict } from './zh';

const en: Dict = {
  /* ─── Common / Brand ────────────────────────────────────────────── */
  common: {
    brand: 'ZhiShu',
    brandIcon: 'Z',
    slogan: 'Full-Spectrum Content Intelligence Platform',
  },

  /* ─── Meta ──────────────────────────────────────────────────────── */
  meta: {
    title: 'ZhiShu — Full-Spectrum Content Intelligence',
    description: 'Covering 30+ content platforms, ZhiShu uses AI to analyze content in real-time — helping brands discover trends, evaluate influencers, and monitor brand mentions.',
  },

  /* ─── Nav ───────────────────────────────────────────────────────── */
  nav: {
    features: 'Features',
    resources: 'Resources',
    cases: 'Events',
    blog: 'Blog',
    trialCta: 'Free Trial',
    menu: 'Menu',
  },

  /* ─── Hero ──────────────────────────────────────────────────────── */
  hero: {
    badge: 'Real-time data updates across all platforms',
    titleLine1: 'Full-Spectrum Content Intelligence,',
    titleLine2: 'Data-Driven Brand Decisions',
    desc: 'ZhiShu covers Instagram, TikTok, YouTube, X (Twitter), Reddit and 30+ content platforms, using AI to crawl and analyze content in real-time — helping brands discover trends, evaluate influencers, and monitor brand sentiment.',
    ctaPrimary: 'Get Started Free',
    ctaSecondary: 'Explore Features',
  },

  /* ─── Stats ─────────────────────────────────────────────────────── */
  stats: {
    platforms: 'Content Platforms',
    platformsValue: '30+',
    dailyCrawl: 'Daily Content Crawled',
    dailyCrawlValue: '100M+',
    kolDb: 'Influencer Database',
    kolDbValue: '5M+',
    clients: 'Brand Clients',
    clientsValue: '2,000+',
  },

  /* ─── Features ──────────────────────────────────────────────────── */
  features: {
    eyebrow: 'Core Capabilities',
    heading: 'Data → Analysis → Prediction → Action, Full-Loop Closed',
    desc: 'Four powerful engines that help brands extract insights from massive content and turn them into actionable marketing strategies',
    modules: [
      {
        tag: 'Data',
        title: 'Full-Spectrum Content Crawler',
        desc: 'Cover mainstream content and social platforms, capturing massive unstructured data in real-time as the foundation for analysis.',
        capabilities: [
          { label: '30+ Platform Real-Time Crawling', detail: 'Instagram, TikTok, YouTube, X (Twitter), Reddit, LinkedIn and more' },
          { label: 'Multi-Format Collection', detail: 'Articles, short videos, live streams, comments, stories, and threads — all in one' },
          { label: '100M+ Items Daily', detail: 'Distributed crawling architecture with sub-5-minute data latency' },
          { label: 'Compliant Collection', detail: 'GDPR / CCPA compliant with data anonymization and authorization management' },
        ],
      },
      {
        tag: 'Analysis',
        title: 'AI Semantic Analysis Engine',
        desc: 'Powered by large language models for deep content understanding, transforming unstructured data into quantifiable insight dimensions.',
        capabilities: [
          { label: 'Sentiment Analysis', detail: 'Positive / Negative / Neutral + fine-grained emotion recognition' },
          { label: 'Entity Recognition', detail: 'Auto-extraction and linking of brands, products, influencers, and competitors' },
          { label: 'Topic Clustering', detail: 'Automatic trending topic discovery, categorization, and trend tracking' },
          { label: 'KOL/KOC Evaluation', detail: 'Real follower rate, engagement quality, and commercial value multi-dimensional scoring' },
        ],
      },
      {
        tag: 'Prediction',
        title: 'Trend Prediction Engine',
        desc: 'Leveraging time-series models and deep learning to capture signals before changes occur, helping brands stay ahead.',
        capabilities: [
          { label: 'Volume Trend Forecast', detail: 'Predicting 7-30 day trend changes based on time-series models' },
          { label: 'Viral Content Prediction', detail: 'Identifying content characteristics with viral potential' },
          { label: 'Influencer Growth Forecast', detail: 'Follower growth rate and engagement decay curve modeling' },
          { label: 'Crisis Early Warning', detail: 'Negative spread probability assessment, 4+ hour advance alerts' },
        ],
      },
      {
        tag: 'Action',
        title: 'Smart Decision Engine',
        desc: 'Transform data insights into actionable strategy recommendations, driving brand marketing actions in a closed loop.',
        capabilities: [
          { label: 'Campaign Strategy', detail: 'Influencer portfolio optimization and budget allocation recommendations' },
          { label: 'Content Strategy Generation', detail: 'Auto-generate content briefs and topic directions based on insights' },
          { label: 'Crisis Response Plans', detail: 'Pre-set response SOPs, one-click activation for negative events' },
          { label: 'Smart Report Output', detail: 'AI-generated weekly/monthly reports, one-click PPT export' },
        ],
      },
    ],
  },

  /* ─── Workflow ──────────────────────────────────────────────────── */
  workflow: {
    eyebrow: 'Workflow',
    heading: 'Four Steps, From Data to Decision',
    steps: [
      { title: 'Data Collection', desc: '30+ platforms — posts, reels, stories, live streams, comments, all-in-one' },
      { title: 'Smart Analysis', desc: 'AI sentiment analysis, entity recognition, topic clustering, KOL evaluation' },
      { title: 'Trend Prediction', desc: 'Volume forecasting, viral prediction, risk alerts — stay ahead' },
      { title: 'Strategy & Action', desc: 'Campaign suggestions, content briefs, crisis SOPs, auto-reports' },
    ],
  },

  /* ─── Cases ─────────────────────────────────────────────────────── */
  cases: {
    eyebrow: 'Use Cases',
    heading: 'Brands Across Industries Use ZhiShu',
    items: [
      { title: 'New Product Launch Insights', desc: 'Before launch, analyze full-spectrum content to uncover real user needs, competitor strategy gaps, and the most effective content formats.', metrics: ['92% Insight Accuracy', '40% Faster Time-to-Market'] },
      { title: 'Influencer Marketing Optimization', desc: 'Data-driven influencer selection, performance evaluation, and portfolio optimization. Say goodbye to guesswork — every dollar counts.', metrics: ['35% Lower CPE', '2.3x Engagement Lift'] },
      { title: 'Crisis Management', desc: '24/7 brand mention monitoring with AI-powered sentiment and risk assessment. Get early warnings before crises escalate.', metrics: ['4-Hour Early Warning', '60% Faster Resolution'] },
    ],
  },

  /* ─── CTA ───────────────────────────────────────────────────────── */
  cta: {
    heading: 'Start Making Data-Driven Brand Decisions',
    desc: 'Experience the power of full-spectrum content intelligence for smarter brand decisions.',
    primary: 'Free Trial',
    secondary: 'Book a Demo',
    social: 'Trusted by 2,000+ brands worldwide',
  },

  /* ─── Demo / Book a Demo ─────────────────────────────────────────── */
  demo: {
    pageTitle: 'Book a Product Demo',
    pageDesc: 'Fill in the form below and our product specialist will reach out within 1 business day to schedule your personalized demo.',
    companyName: 'Company Name',
    companyNamePlaceholder: 'Enter your company name',
    contactName: 'Contact Name',
    contactNamePlaceholder: 'Enter your full name',
    email: 'Work Email',
    emailPlaceholder: 'Enter your work email',
    phone: 'Phone Number',
    phonePlaceholder: 'Enter your phone number',
    companySize: 'Company Size',
    companySizeOptions: ['1-50', '51-200', '201-1,000', '1,000+'],
    needs: 'Tell Us About Your Needs',
    needsPlaceholder: 'Briefly describe your use case and what you\'d like to learn about (optional)',
    submit: 'Submit Request',
    submitting: 'Submitting...',
    successTitle: 'Request Submitted!',
    successDesc: 'Thank you for your interest. Our product specialist will contact you via email or phone within 1 business day.',
    backToHome: 'Back to Homepage',
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid phone number',
  },

  /* ─── Footer ────────────────────────────────────────────────────── */
  footer: {
    brandDesc: 'Full-spectrum content intelligence platform. Covering 30+ content platforms, using AI to analyze data in real-time — helping brands discover trends, evaluate influencers, and monitor sentiment for smarter marketing decisions.',
    product: 'Product',
    featuresIntro: 'Features',
    useCases: 'Use Cases',
    resources: 'Resources',
    copyright: 'ZhiShu Tech. All rights reserved.',
  },

  /* ─── Blog ──────────────────────────────────────────────────────── */
  blog: {
    sidebarTagline: 'Content marketing insights,\nfrom those who lead.',
    writePost: 'Write Post',
    loading: 'Loading...',
    noArticles: 'No articles yet',
    subscribeTitle: 'Subscribe to ZhiShu Weekly Insights',
    subscribeDesc: 'Weekly curated marketing trends, influencer updates, and brand case studies — delivered to your inbox. Joined by 8,000+ marketers.',
    subscribePlaceholder: 'Enter your work email',
    subscribeBtn: 'Subscribe',
    subscribeDisclaimer: 'No spam. Unsubscribe anytime.',
    allPosts: '← All Posts',
    shareThis: 'Share',
    category: 'Category',
    prevPost: '← Previous',
    nextPost: 'Next →',
    related: 'Related Articles',
    translating: 'Translating...',
  },

  /* ─── Categories ────────────────────────────────────────────────── */
  categories: {
    latest: 'Latest',
    tech: 'Technology',
    product: 'Product',
    thinking: 'Thinking',
  },

  /* ─── HeroDemo ──────────────────────────────────────────────────── */
  heroDemo: {
    placeholder: 'Enter a brand, influencer, or topic...',
    phases: ['Data Collection', 'Smart Analysis', 'Trend Prediction', 'Strategy & Action'],
    trendUp: '↑ Rising',
    trendDown: '↓ Positive',
    scenes: [
      {
        query: 'Analyze "Glossier" 7-day brand volume',
        data: [
          { platform: 'Instagram', count: '18,432' },
          { platform: 'TikTok', count: '12,891' },
          { platform: 'YouTube', count: '6,274' },
          { platform: 'X (Twitter)', count: '3,518' },
          { platform: 'Reddit', count: '1,947' },
        ],
        analysis: [
          'Sentiment: Positive 71.2% · Neutral 21.5% · Negative 7.3%',
          'Hot keywords: #CloudPaint #SkinFirst #CleanBeauty #GlossierYou #GRWM',
          'Brand mention growth: +27.4% vs last week, driven by TikTok Reels',
          'KOL link: Top creator "@skincarebyhyram" mention drove 38% volume peak',
        ],
        predictions: [
          { label: '7-Day Volume Forecast', value: '+22.3%', trend: 'up' },
          { label: 'Positive Sentiment Trend', value: '74.8%', trend: 'up' },
          { label: 'Potential PR Risk', value: 'Low', trend: 'down' },
        ],
        actions: [
          'Recommend +20% budget allocation to TikTok — highest ROI channel',
          'Plan UGC campaign around #GRWM trend to capitalize on current momentum',
          'Monitor "packaging waste" discussion — recommend sustainability team follow-up',
        ],
      },
      {
        query: 'Evaluate influencer "@MakeupByMario" collaboration value',
        data: [
          { platform: 'Followers', count: '4.8M' },
          { platform: 'Last 30 Days Posts', count: '18' },
          { platform: 'Avg. Engagement', count: '12,650' },
          { platform: 'Brand Deals', count: '8' },
          { platform: 'Authentic Audience', count: '96.1%' },
        ],
        analysis: [
          'Content style: Beauty tutorials 58% · Product reviews 30% · Behind-the-scenes 12%',
          'Audience: Female 85% | 18-34 age 61% | US & EU 74%',
          'Engagement quality score: 94/100 (far above peer average of 68)',
          'Ad naturalness: A-grade — high content-ad integration',
        ],
        predictions: [
          { label: 'Estimated CPE', value: '$0.35', trend: 'down' },
          { label: 'Estimated ROI', value: '3.8x', trend: 'up' },
          { label: 'Follower Growth', value: '+6.2%/mo', trend: 'up' },
        ],
        actions: [
          'Recommended format: Tutorial Reel + Instagram Story takeover',
          'Best posting time: Tue/Thu 6-8 PM EST',
          'Budget suggestion: $8,000/post, 3-post bundle $20,000',
        ],
      },
    ],
  },

  /* ─── Editor ────────────────────────────────────────────────────── */
  editor: {
    backToBlog: '← Back to Blog',
    settings: 'Settings',
    publish: 'Publish',
    publishing: 'Publishing...',
    published: 'Published ✓',
    titlePlaceholder: 'Enter article title...',
    articleSettings: 'Article Settings',
    author: 'Author',
    authorPlaceholder: 'Enter author name',
    jobTitle: 'Job Title',
    jobTitlePlaceholder: 'e.g. CEO, VP Product',
    categoryLabel: 'Category',
    coverImage: 'Cover Image',
    coverImageUrl: 'Or enter cover image URL',
    editorTips: 'Editor Shortcuts',
    tipSlash: 'Open command menu',
    tipSelect: 'Select text for floating toolbar',
    tipMarkdown: 'Supports Markdown shortcuts (## + space = H2)',
    alertTitleRequired: 'Please enter an article title',
    alertContentRequired: 'Please enter article content',
    alertNetworkError: 'Network error. Please try again.',
    coverLabels: ['Lightbulb · Insight', 'Megaphone · Marketing', 'Chart · Data', 'Rocket · Growth', 'Brain · Thinking', 'Telescope · Discovery', 'Target · Goals', 'Puzzle · Strategy'],
  },

  /* ─── Tiptap slash commands ─────────────────────────────────────── */
  tiptap: {
    placeholder: 'Type / to open command menu...',
    headingPlaceholder: 'Heading',
    charCount: 'characters',
    wordCount: 'words',
    footerHint: 'Type / for command menu · Select text for formatting toolbar',
    slash: [
      { label: 'Heading 1', desc: 'Large heading' },
      { label: 'Heading 2', desc: 'Medium heading' },
      { label: 'Heading 3', desc: 'Small heading' },
      { label: 'Bullet List', desc: 'Create a bullet list' },
      { label: 'Numbered List', desc: 'Create a numbered list' },
      { label: 'To-do List', desc: 'Create a task checklist' },
      { label: 'Quote', desc: 'Insert a block quote' },
      { label: 'Code Block', desc: 'Insert a code snippet' },
      { label: 'Divider', desc: 'Insert a horizontal rule' },
      { label: 'Image', desc: 'Insert image by URL' },
    ],
    imagePrompt: 'Enter image URL',
    linkPrompt: 'Enter link URL',
    tooltips: { bold: 'Bold', italic: 'Italic', underline: 'Underline', strike: 'Strikethrough', code: 'Inline Code', highlight: 'Highlight', link: 'Link' },
  },
};

export default en as Dict;
