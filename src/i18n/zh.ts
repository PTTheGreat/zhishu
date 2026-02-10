/* ─── 中文 UI 字典 ─────────────────────────────────────────────────── */

const zh = {
  /* ─── Common / Brand ────────────────────────────────────────────── */
  common: {
    brand: '值数',
    brandIcon: '值',
    slogan: '全网内容洞察平台',
  },

  /* ─── Meta ──────────────────────────────────────────────────────── */
  meta: {
    title: '值数 — 全网内容洞察平台',
    description: '覆盖 30+ 内容平台，通过 AI 实时分析全网数据，帮助品牌发现趋势、评估达人、监测声量。',
  },

  /* ─── Nav ───────────────────────────────────────────────────────── */
  nav: {
    features: '功能',
    resources: '资源',
    cases: '活动',
    blog: '博客',
    trialCta: '免费试用',
    menu: '菜单',
  },

  /* ─── Hero ──────────────────────────────────────────────────────── */
  hero: {
    badge: '全网数据实时更新中',
    titleLine1: '全网内容洞察，',
    titleLine2: '让品牌决策有「数」可依',
    desc: '值数覆盖小红书、抖音、微博、知乎、B站等 30+ 内容平台，通过 AI 实时抓取与分析全网内容，帮助品牌发现趋势、评估达人、监测声量。',
    ctaPrimary: '免费开始使用',
    ctaSecondary: '查看功能介绍',
  },

  /* ─── Stats ─────────────────────────────────────────────────────── */
  stats: {
    platforms: '覆盖内容平台',
    platformsValue: '30+',
    dailyCrawl: '日均抓取内容',
    dailyCrawlValue: '1亿+',
    kolDb: '达人数据库',
    kolDbValue: '500万+',
    clients: '品牌客户',
    clientsValue: '2000+',
  },

  /* ─── Features ──────────────────────────────────────────────────── */
  features: {
    eyebrow: '核心能力',
    heading: '数据 → 分析 → 预测 → 处置，全链路闭环',
    desc: '值数以四大引擎为核心，帮助品牌从海量内容中提取洞察，并转化为可落地的营销策略',
    modules: [
      {
        tag: '数据',
        title: '全网内容采集引擎',
        desc: '覆盖主流内容与社交平台，实时获取海量非结构化数据，为后续分析奠定基础。',
        capabilities: [
          { label: '30+ 平台实时抓取', detail: '小红书、抖音、微博、知乎、B站、快手等全渠道覆盖' },
          { label: '多形态内容采集', detail: '图文、短视频、直播回放、评论区、弹幕一网打尽' },
          { label: '日均 1 亿+ 条', detail: '分布式采集架构，数据延迟低于 5 分钟' },
          { label: '合规采集', detail: '支持 GDPR / 个保法，数据脱敏与授权管理' },
        ],
      },
      {
        tag: '分析',
        title: 'AI 语义分析引擎',
        desc: '基于大语言模型的深度内容理解能力，将非结构化数据转化为可量化的洞察维度。',
        capabilities: [
          { label: '情感分析', detail: '正面 / 负面 / 中性三维度 + 细粒度情绪识别' },
          { label: '实体识别', detail: '品牌 / 产品 / 达人 / 竞品自动提取与关联' },
          { label: '话题聚类', detail: '热点话题自动发现、归类与趋势追踪' },
          { label: 'KOL/KOC 评估', detail: '真粉率、互动质量、商业价值多维评分' },
        ],
      },
      {
        tag: '预测',
        title: '趋势预测引擎',
        desc: '运用时序模型与深度学习，在变化发生之前捕捉信号，帮助品牌抢占先机。',
        capabilities: [
          { label: '声量走势预测', detail: '基于时序模型预判未来 7-30 天趋势变化' },
          { label: '爆款内容预判', detail: '识别具备病毒传播潜力的内容特征' },
          { label: '达人增长预测', detail: '粉丝增速、互动衰减曲线建模' },
          { label: '舆情风险预警', detail: '负面传播概率评估，提前 4+ 小时预警' },
        ],
      },
      {
        tag: '处置',
        title: '智能决策引擎',
        desc: '将数据洞察转化为可执行的策略建议，闭环驱动品牌营销行动。',
        capabilities: [
          { label: '投放策略推荐', detail: '达人组合优化、预算分配建议' },
          { label: '内容策略生成', detail: '基于洞察自动生成内容 brief 与选题方向' },
          { label: '舆情响应方案', detail: '预置应对 SOP，负面事件一键启动' },
          { label: '智能报告输出', detail: 'AI 生成周报 / 月报，一键导出 PPT' },
        ],
      },
    ],
  },

  /* ─── Workflow ──────────────────────────────────────────────────── */
  workflow: {
    eyebrow: '工作流程',
    heading: '四步闭环，从数据到决策',
    steps: [
      { title: '数据采集', desc: '30+ 平台图文、短视频、直播、评论一站式采集' },
      { title: '智能分析', desc: 'AI 情感分析、实体识别、话题聚类、KOL 评估' },
      { title: '趋势预测', desc: '声量预测、爆款预判、风险预警，提前布局' },
      { title: '策略处置', desc: '投放建议、内容 brief、舆情 SOP、自动报告' },
    ],
  },

  /* ─── Cases ─────────────────────────────────────────────────────── */
  cases: {
    eyebrow: '使用场景',
    heading: '各行业品牌都在用值数',
    items: [
      { title: '新品上市洞察', desc: '在新品上市前，通过全网内容分析找到目标用户的真实需求、竞品的内容策略空白、以及最具种草力的内容形态。', metrics: ['需求洞察准确率 92%', '上市周期缩短 40%'] },
      { title: '达人营销优化', desc: '基于数据筛选达人、评估合作效果、优化投放组合。告别「投了就完」的粗放模式，每一分预算都花在刀刃上。', metrics: ['CPE 降低 35%', '互动增量 2.3 倍'] },
      { title: '舆情风险管理', desc: '7×24 小时监测品牌提及，AI 自动判断情感倾向与传播风险等级，在舆情发酵前发出预警，赢得黄金应对时间。', metrics: ['预警提前 4 小时', '处理效率提升 60%'] },
    ],
  },

  /* ─── CTA ───────────────────────────────────────────────────────── */
  cta: {
    heading: '开始用数据驱动你的品牌决策',
    desc: '体验全网内容洞察的力量，让每一个品牌决策都有据可依。',
    primary: '免费试用',
    secondary: '预约演示',
    social: '已有 2000+ 品牌在使用值数',
  },

  /* ─── Demo / Book a Demo ─────────────────────────────────────────── */
  demo: {
    pageTitle: '预约产品演示',
    pageDesc: '填写以下信息，我们的产品顾问将在 1 个工作日内与您联系，为您安排专属演示。',
    companyName: '公司名称',
    companyNamePlaceholder: '请输入公司全称',
    contactName: '联系人姓名',
    contactNamePlaceholder: '请输入您的姓名',
    email: '工作邮箱',
    emailPlaceholder: '请输入工作邮箱',
    phone: '联系电话',
    phonePlaceholder: '请输入手机号',
    companySize: '公司规模',
    companySizeOptions: ['1-50 人', '51-200 人', '201-1000 人', '1000 人以上'],
    needs: '需求描述',
    needsPlaceholder: '请简要描述您的业务场景和期望了解的功能（选填）',
    submit: '提交预约',
    submitting: '提交中...',
    successTitle: '预约成功！',
    successDesc: '感谢您的预约，我们的产品顾问将在 1 个工作日内通过邮件或电话与您联系。',
    backToHome: '返回首页',
    requiredField: '此项为必填',
    invalidEmail: '请输入有效的邮箱地址',
    invalidPhone: '请输入有效的联系电话',
  },

  /* ─── Footer ────────────────────────────────────────────────────── */
  footer: {
    brandDesc: '全网内容洞察平台。覆盖 30+ 内容平台，通过 AI 实时分析全网数据，帮助品牌发现趋势、评估达人、监测声量，让每一个营销决策都有据可依。',
    product: '产品',
    featuresIntro: '功能介绍',
    useCases: '使用场景',
    resources: '资源',
    copyright: '值数科技（ZhiShu Tech）. All rights reserved.',
  },

  /* ─── Blog ──────────────────────────────────────────────────────── */
  blog: {
    sidebarTagline: '全网洞察营销，\n先行者的思考与实践。',
    writePost: '写文章',
    loading: '加载中...',
    noArticles: '暂无文章',
    subscribeTitle: '订阅值数洞察周刊',
    subscribeDesc: '每周精选全网营销趋势、达人动态、品牌案例，直送你的邮箱。已有 8,000+ 营销人订阅。',
    subscribePlaceholder: '输入你的工作邮箱',
    subscribeBtn: '订阅',
    subscribeDisclaimer: '无垃圾邮件，随时退订。',
    allPosts: '← 所有文章',
    shareThis: '分享此文',
    category: '分类',
    prevPost: '← 上一篇',
    nextPost: '下一篇 →',
    related: '相关推荐',
    translating: '翻译中...',
  },

  /* ─── Categories ────────────────────────────────────────────────── */
  categories: {
    latest: '最新的',
    tech: '技术',
    product: '产品',
    thinking: '思考',
  },

  /* ─── HeroDemo ──────────────────────────────────────────────────── */
  heroDemo: {
    placeholder: '输入品牌、达人或话题...',
    phases: ['数据采集', '智能分析', '趋势预测', '策略处置'],
    trendUp: '↑ 上升趋势',
    trendDown: '↓ 利好',
    scenes: [
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
    ],
  },

  /* ─── Editor ────────────────────────────────────────────────────── */
  editor: {
    backToBlog: '← 返回博客',
    settings: '设置',
    publish: '发布文章',
    publishing: '发布中...',
    published: '已发布 ✓',
    titlePlaceholder: '输入文章标题...',
    articleSettings: '文章设置',
    author: '作者',
    authorPlaceholder: '输入作者名',
    jobTitle: '职位',
    jobTitlePlaceholder: '例：CEO、产品VP',
    categoryLabel: '分类',
    coverImage: '封面图',
    coverImageUrl: '或输入封面图 URL',
    editorTips: '编辑器快捷操作',
    tipSlash: '呼出命令菜单',
    tipSelect: '选中文字出现浮动格式工具栏',
    tipMarkdown: '支持 Markdown 快捷键（## + 空格 = H2）',
    alertTitleRequired: '请输入文章标题',
    alertContentRequired: '请输入文章内容',
    alertNetworkError: '网络错误，请重试',
    coverLabels: ['灯泡·洞察', '喇叭·营销', '图表·数据', '火箭·增长', '大脑·思考', '望远镜·洞察', '靶心·目标', '拼图·策略'],
  },

  /* ─── Tiptap slash commands ─────────────────────────────────────── */
  tiptap: {
    placeholder: '输入 / 呼出命令菜单...',
    headingPlaceholder: '标题',
    charCount: '字符',
    wordCount: '词',
    footerHint: '输入 / 呼出命令菜单 · 选中文字出现格式工具栏',
    slash: [
      { label: '标题 1', desc: '大标题' },
      { label: '标题 2', desc: '中标题' },
      { label: '标题 3', desc: '小标题' },
      { label: '无序列表', desc: '创建项目符号列表' },
      { label: '有序列表', desc: '创建编号列表' },
      { label: '待办列表', desc: '创建任务清单' },
      { label: '引用', desc: '插入引用块' },
      { label: '代码块', desc: '插入代码片段' },
      { label: '分割线', desc: '插入水平线' },
      { label: '图片', desc: '通过 URL 插入图片' },
    ],
    imagePrompt: '输入图片 URL',
    linkPrompt: '输入链接 URL',
    tooltips: { bold: '粗体', italic: '斜体', underline: '下划线', strike: '删除线', code: '行内代码', highlight: '高亮', link: '链接' },
  },
};

/* ─── Deep type that allows any string values ─────────────────────── */
type DeepStringify<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? DeepStringify<U>[]
    : T extends object
      ? { [K in keyof T]: DeepStringify<T[K]> }
      : T;

export type Dict = DeepStringify<typeof zh>;
export default zh as Dict;
