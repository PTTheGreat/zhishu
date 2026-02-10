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
    desc: 'ZhiShu covers Xiaohongshu, Douyin, Weibo, Zhihu, Bilibili and 30+ content platforms, using AI to crawl and analyze content in real-time — helping brands discover trends, evaluate influencers, and monitor brand sentiment.',
    ctaPrimary: 'Get Started Free',
    ctaSecondary: 'Explore Features',
  },

  /* ─── Stats ─────────────────────────────────────────────────────── */
  stats: {
    platforms: 'Content Platforms',
    dailyCrawl: 'Daily Content Crawled',
    kolDb: 'Influencer Database',
    clients: 'Brand Clients',
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
          { label: '30+ Platform Real-Time Crawling', detail: 'Xiaohongshu, Douyin, Weibo, Zhihu, Bilibili, Kuaishou and more' },
          { label: 'Multi-Format Collection', detail: 'Articles, short videos, live replays, comments, and bullet chats — all in one' },
          { label: '100M+ Items Daily', detail: 'Distributed crawling architecture with sub-5-minute data latency' },
          { label: 'Compliant Collection', detail: 'GDPR / PIPL compliant with data anonymization and authorization management' },
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
      { title: 'Data Collection', desc: '30+ platforms — articles, short videos, live streams, comments, all-in-one' },
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
    desc: 'Free 14-day trial, no credit card required. Experience the power of full-spectrum content intelligence.',
    primary: 'Free Trial',
    secondary: 'Book a Demo',
    social: 'Trusted by 2,000+ brands worldwide',
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
        query: 'Analyze "Perfect Diary" 7-day brand volume',
        data: [
          { platform: 'Xiaohongshu', count: '12,847' },
          { platform: 'Douyin', count: '8,392' },
          { platform: 'Weibo', count: '5,621' },
          { platform: 'Bilibili', count: '2,104' },
          { platform: 'Zhihu', count: '1,538' },
        ],
        analysis: [
          'Sentiment: Positive 68.3% · Neutral 24.1% · Negative 7.6%',
          'Hot keywords: #NewShade #Collab #StudentPick #Dupe #HolidayEdition',
          'Brand mention growth: +23.1% vs last week, driven by Douyin short videos',
          'KOL link: Top influencer "Cheng Shi\'an" mention drove 34% volume peak',
        ],
        predictions: [
          { label: '7-Day Volume Forecast', value: '+18.5%', trend: 'up' },
          { label: 'Positive Sentiment Trend', value: '72.1%', trend: 'up' },
          { label: 'Potential PR Risk', value: 'Low', trend: 'down' },
        ],
        actions: [
          'Recommend +15% budget allocation to Douyin — highest ROI channel',
          'Plan UGC campaign around collab product to capitalize on current momentum',
          'Monitor "color mismatch" complaints — recommend product team follow-up',
        ],
      },
      {
        query: 'Evaluate influencer "Beauty Fish" collaboration value',
        data: [
          { platform: 'Followers', count: '3.28M' },
          { platform: 'Last 30 Days Posts', count: '24' },
          { platform: 'Avg. Engagement', count: '8,432' },
          { platform: 'Brand Deals', count: '12' },
          { platform: 'Real Follower Rate', count: '94.2%' },
        ],
        analysis: [
          'Content style: Beauty tutorials 62% · Product recs 28% · Daily Vlogs 10%',
          'Audience: Female 89% | 18-25 age 42% | Tier-1 cities 58%',
          'Engagement quality score: 92/100 (far above peer average of 71)',
          'Ad naturalness: A-grade — high content-ad integration',
        ],
        predictions: [
          { label: 'Estimated CPE', value: '$0.40', trend: 'down' },
          { label: 'Estimated ROI', value: '3.2x', trend: 'up' },
          { label: 'Follower Growth', value: '+5.4%/mo', trend: 'up' },
        ],
        actions: [
          'Recommended format: Product review video + pinned comment',
          'Best posting time: Tue/Thu 7-9 PM',
          'Budget suggestion: $5,000/post, 3-post bundle $12,000',
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
