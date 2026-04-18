import { getRuntimeConfig } from './runtime-config.js';

const runtimeConfig = getRuntimeConfig();
const stripeCheckoutEnabled = runtimeConfig.featureFlags.stripeCheckout;

const indexFeatureCards = [
  {
    title: 'Write tests in C#, not JavaScript',
    description: 'Pre and post-request scripting with the full .NET runtime. Import any NuGet package (Pro). Strongly-typed request/response handling - assertions in the language your team actually ships.',
    iconClass: 'bg-red-500/10 text-apired',
    iconPath: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    bulletColorClass: 'bg-apired',
    bullets: [
      'NuGet package imports in Pro',
      'Postman-compatible JS engine included',
      'Full test &amp; assertion framework'
    ]
  },
  {
    title: 'Test that your API actually wrote to the DB',
    description: 'Built-in drivers for SQL Server, Postgres, MySQL, and SQLite. Assert database state after any request, and see a before/after diff of DB changes around each call.',
    iconClass: 'bg-amber-500/10 text-amber-400',
    iconPath: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
    bulletColorClass: 'bg-amber-400',
    bullets: [
      'SQL Server, Postgres, MySQL, SQLite',
      'Before/after query diff view',
      'Because 200 OK doesn\u2019t mean the data saved'
    ],
    badgeText: 'Coming in 1.0',
    badgeClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    cardClass: 'relative'
  },
  {
    title: 'Smart Mock Gateway - mock, proxy, or both',
    description: 'Hybrid routing with priority path matching: exact → pattern → wildcard → proxy fallback. YAML-defined collections, scripted dynamic mocks, and three modes for contract and integration tests.',
    iconClass: 'bg-purple-500/10 text-purple-400',
    iconPath: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
    bulletColorClass: 'bg-purple-400',
    bullets: [
      'Mock-only, hybrid, or proxy-only modes',
      'Scripted dynamic mocks with C# or JS',
      'Stand up a contract test env in minutes'
    ],
    badgeText: 'Coming in 1.0',
    badgeClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    cardClass: 'relative'
  },
  {
    title: 'Git-native, YAML-stored, offline-forever',
    description: 'Collections, environments, and schemas all live as plain YAML next to your code. Commit, diff, branch, and review like real source. There is no cloud - and never will be.',
    iconClass: 'bg-emerald-500/10 text-emerald-400',
    iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    bulletColorClass: 'bg-emerald-400',
    bullets: [
      'Clean YAML diffs in pull requests',
      'Branch-aware UI shows current context',
      '100% offline - secrets never leave your machine'
    ]
  },
  {
    title: 'Perpetual fallback - no rug-pulls',
    description: 'JetBrains-style licensing: after 12 consecutive paid months, every Pro feature you\u2019ve licensed keeps working on your machine, forever. Cancel anytime, keep what you\u2019ve paid for.',
    iconClass: 'bg-sky-500/10 text-sky-400',
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    bulletColorClass: 'bg-sky-400',
    bullets: [
      'Local capabilities version-lock on your machine',
      'No remote kill switches, no surprise bills',
      'Cancel anytime, keep everything you\u2019ve paid for'
    ]
  },
  {
    title: 'Native .NET desktop performance',
    description: 'Built with .NET MAUI + Blazor Hybrid. Native desktop performance without Electron bloat, fast startup, low memory, smooth UI. The tool feels like the stack it\u2019s built for.',
    iconClass: 'bg-indigo-500/10 text-indigo-400',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    bulletColorClass: 'bg-indigo-400',
    bullets: [
      'Native .NET performance, not Electron',
      'Low resource usage',
      'Windows now, macOS in beta, Linux planned'
    ]
  }
];

function renderIndexCard(card) {
  const cardClass = card.cardClass ? ` ${card.cardClass}` : '';
  const badge = card.badgeText
    ? `
      <div class="absolute -top-3 -right-3 rounded-full ${card.badgeClass} px-3 py-1 text-[10px] font-bold uppercase tracking-wide shadow-lg">
        ${card.badgeText}
      </div>
    `
    : '';

  const bullets = card.bullets
    .map(
      (bullet) => `
        <li class="flex items-center gap-2">
          <span class="h-1 w-1 rounded-full ${card.bulletColorClass}"></span>
          ${bullet}
        </li>
      `
    )
    .join('');

  return `
    <div class="glass feature-card group rounded-2xl p-6 border border-slate-700/50${cardClass}">
      ${badge}
      <div class="inline-flex items-center justify-center h-12 w-12 rounded-xl ${card.iconClass} mb-4">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${card.iconPath}" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-slate-50 mb-3">${card.title}</h3>
      <p class="text-sm text-slate-300 leading-relaxed mb-4">
        ${card.description}
      </p>
      <ul class="space-y-2 text-xs text-slate-400">
        ${bullets}
      </ul>
    </div>
  `;
}

const container = document.getElementById('index-feature-cards');
if (container) {
  container.innerHTML = indexFeatureCards.map((card) => renderIndexCard(card)).join('');
}

const featureComparison = {
  headers: ['Feature', 'ApiCourier', 'Postman', 'Bruno', 'Insomnia'],
  rows: [
    {
      label: 'Git-native file storage',
      cells: [
        { type: 'check' },
        { type: 'cross' },
        { type: 'check' },
        { type: 'text', text: 'Partial', textClass: 'text-slate-500' }
      ]
    },
    {
      label: '100% offline capable',
      cells: [
        { type: 'check' },
        { type: 'text', text: 'Limited', textClass: 'text-slate-500' },
        { type: 'check' },
        { type: 'check' }
      ]
    },
    {
      label: 'C# scripting with NuGet imports',
      rowClass: 'bg-emerald-500/[0.04]',
      labelClass: 'font-semibold text-slate-100',
      cells: [
        { type: 'check' },
        { type: 'cross' },
        { type: 'cross' },
        { type: 'cross' }
      ]
    },
    {
      label: 'Database assertions (SQL Server, Postgres, MySQL, SQLite)',
      rowClass: 'bg-emerald-500/[0.04]',
      labelClass: 'font-semibold text-slate-100',
      cells: [
        { type: 'text', text: '1.0', textClass: 'font-semibold text-amber-300' },
        { type: 'text', text: 'Script only', textClass: 'text-slate-500' },
        { type: 'cross' },
        { type: 'text', text: 'Plugins', textClass: 'text-slate-500' }
      ]
    },
    {
      label: 'Smart Mock Gateway (hybrid proxy/mock)',
      rowClass: 'bg-emerald-500/[0.04]',
      labelClass: 'font-semibold text-slate-100',
      cells: [
        { type: 'text', text: '1.0', textClass: 'font-semibold text-amber-300' },
        { type: 'text', text: 'Cloud-only, capped', textClass: 'text-slate-500' },
        { type: 'cross' },
        { type: 'cross' }
      ]
    },
    {
      label: 'API ↔ DB correlation with diff',
      rowClass: 'bg-emerald-500/[0.04]',
      labelClass: 'font-semibold text-slate-100',
      cells: [
        { type: 'text', text: '1.0', textClass: 'font-semibold text-amber-300' },
        { type: 'cross' },
        { type: 'cross' },
        { type: 'cross' }
      ]
    },
    {
      label: 'GraphQL, WebSocket, gRPC',
      cells: [
        { type: 'check' },
        { type: 'check' },
        { type: 'cross' },
        { type: 'text', text: 'Partial', textClass: 'text-slate-500' }
      ]
    },
    {
      label: 'Native desktop performance',
      cells: [
        { type: 'check' },
        { type: 'text', text: 'Electron', textClass: 'text-slate-500' },
        { type: 'text', text: 'Electron', textClass: 'text-slate-500' },
        { type: 'text', text: 'Electron', textClass: 'text-slate-500' }
      ]
    },
    {
      label: 'Perpetual fallback license',
      cells: [
        { type: 'check' },
        { type: 'cross' },
        { type: 'cross' },
        { type: 'cross' }
      ]
    },
    {
      label: 'Starting price (Pro)',
      rowClass: 'bg-apired/5',
      labelClass: 'font-semibold',
      cells: [
        { type: 'text', text: '$5/mo', textClass: 'font-bold text-emerald-400' },
        { type: 'text', text: '$19/user/mo', textClass: 'text-slate-400' },
        { type: 'text', text: '$6/user/mo', textClass: 'text-slate-400' },
        { type: 'text', text: '$12/user/mo', textClass: 'text-slate-400' }
      ]
    }
  ]
};

function renderCheck() {
  return `
    <span class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  `;
}

function renderCross() {
  return `
    <svg class="h-4 w-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  `;
}

function renderTextCell(cell) {
  const textClass = cell.textClass ? ` ${cell.textClass}` : '';
  return `<span class="${textClass.trim()}">${cell.text}</span>`;
}

function renderCell(cell) {
  if (cell.type === 'check') {
    return renderCheck();
  }
  if (cell.type === 'cross') {
    return renderCross();
  }
  return renderTextCell(cell);
}

function renderFeatureTableRow(row) {
  const rowClass = row.rowClass ? ` ${row.rowClass}` : '';
  const labelClass = row.labelClass ? ` ${row.labelClass}` : '';
  const cells = row.cells
    .map((cell) => `<td class="px-6 py-4 text-center">${renderCell(cell)}</td>`)
    .join('');

  return `
    <tr class="hover:bg-slate-900/30 transition-colors${rowClass}">
      <td class="px-6 py-4 text-slate-300${labelClass}">${row.label}</td>
      ${cells}
    </tr>
  `;
}

function renderFeatureTable() {
  const headCells = featureComparison.headers
    .map((header, index) => {
      const isFirst = index === 0;
      const alignClass = isFirst ? 'text-left' : 'text-center';
      const toneClass = isFirst ? 'text-slate-200' : index === 1 ? 'text-slate-200' : 'text-slate-400';
      return `<th class="px-6 py-4 ${alignClass} font-semibold ${toneClass}">${header}</th>`;
    })
    .join('');

  const rows = featureComparison.rows.map((row) => renderFeatureTableRow(row)).join('');

  return `
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-slate-900/60 border-b border-slate-700/50">
          <tr>${headCells}</tr>
        </thead>
        <tbody class="divide-y divide-slate-800/50">
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

const tableContainer = document.getElementById('index-feature-table');
if (tableContainer) {
  tableContainer.innerHTML = renderFeatureTable();
}

const workflowSteps = [
  {
    number: '1',
    title: 'Import OpenAPI',
    description: 'Drop your OpenAPI 3.x spec (or Postman collection) into ApiCourier. Auto-generates collections, auth, and folder structure.',
    borderClass: 'border-emerald-500/30',
    badgeClass: 'bg-emerald-500',
    codeClass: 'text-emerald-300',
    screenshotPath: 'images/screenshots/OpenApiImport1.png',
    screenshotAlt: 'OpenAPI import screen in ApiCourier with generated collection preview.',
    codeLines: [
      { text: '# Instant import', className: 'text-slate-500' },
      { text: '&#10003; 15 endpoints detected' },
      { text: '&#10003; Bearer auth configured' },
      { text: '&#10003; Collections created' }
    ]
  },
  {
    number: '2',
    title: 'Write tests in C#',
    description: 'Send requests, add strongly-typed assertions, configure environments. Pre and post-request scripting with the full .NET runtime - no more JavaScript tax.',
    borderClass: 'border-sky-500/30',
    badgeClass: 'bg-sky-500',
    codeClass: 'text-sky-300',
    screenshotPath: 'images/screenshots/CSharpTests2.png',
    screenshotAlt: 'ApiCourier request runner view with a C# post-request assertion.',
    codeLines: [
      { text: '// Post-request script', className: 'text-slate-500' },
      { text: 'var user = ac.Response.Json();' },
      { text: 'ac.Expect(user.id).To.Equal(123);' },
      { text: 'ac.Environment.Set(\"userId\", user.id);' },
      { text: '&#10003; assertion passed', className: 'text-emerald-300' }
    ]
  },
  {
    number: '3',
    title: 'Commit & Share',
    description: 'Collections are YAML files in your repo. Commit, review diffs, and share via Git like any other code.',
    borderClass: 'border-purple-500/30',
    badgeClass: 'bg-purple-500',
    codeClass: 'text-purple-300',
    screenshotPath: 'images/screenshots/GitCommit3.png',
    screenshotAlt: 'ApiCourier Git integration panel showing changed collection files ready to commit.',
    codeLines: [
      { text: '# Git workflow', className: 'text-slate-500' },
      { text: 'git add collections/' },
      { text: 'git commit -m \"Add user endpoints\"' },
      { text: '&#10003; Pushed to remote', className: 'text-emerald-300' }
    ]
  }
];

const pricingPlans = [
  {
    name: 'Free',
    description: 'The full API client, no strings attached',
    price: '$0',
    priceNote: 'Forever - No credit card',
    cardClass: 'glass rounded-2xl p-8 border border-slate-700/50',
    features: [
      { text: 'Unlimited workspaces, collections & environments', icon: 'check' },
      { text: 'HTTP/HTTPS, GraphQL, gRPC', icon: 'check' },
      { text: 'JavaScript & C# scripting (sandboxed)', icon: 'check' },
      { text: 'OAuth 2.0, client certs, custom CA bundles', icon: 'check' },
      { text: 'Static mocks + local echo server', icon: 'check' },
      { text: 'Basic flows (sequential, up to 10 steps)', icon: 'check' },
      { text: 'Postman, Bruno, cURL & OpenAPI import', icon: 'check' },
      { text: 'CLI with JUnit XML output for CI/CD', icon: 'check' }
    ],
    button: {
      text: 'Get Started Free',
      href: '#waitlist',
      className: 'block w-full rounded-full border border-slate-600 bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-slate-200 hover:border-slate-400 hover:bg-slate-800 transition-all'
    }
  },
  {
    name: 'Pro',
    description: 'The power-user layer, still local, still offline-first',
    price: '$5',
    cadence: '/month',
    priceNote: 'or $50/year (save 17%)',
    cardClass: 'glass rounded-2xl p-8 border-2 border-apired/60 shadow-2xl shadow-apired/20 relative',
    badge: 'Most Popular',
    features: [
      { text: '<strong>Everything in Free, plus:</strong>', icon: 'check' },
      { text: '<strong>NuGet &amp; NPM package imports</strong> in scripts', icon: 'check' },
      { text: '<strong>Database assertions</strong> - SQL Server, Postgres, MySQL, SQLite <span class="ml-1 rounded bg-amber-500/15 text-amber-300 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 align-middle">1.0</span>', icon: 'check' },
      { text: '<strong>Smart Mock Gateway</strong> - hybrid proxy/mock routing <span class="ml-1 rounded bg-amber-500/15 text-amber-300 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 align-middle">1.0</span>', icon: 'check' },
      { text: 'API ↔ DB correlation with before/after diff <span class="ml-1 rounded bg-amber-500/15 text-amber-300 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 align-middle">1.0</span>', icon: 'check' },
      { text: 'Schema registry (JSON schemas reusable across requests)', icon: 'check' },
      { text: 'Advanced flows - branching, retry, scheduling, CSV/JSON runs', icon: 'check' },
      { text: 'Visual Git UI - diff, stage, commit, branch management', icon: 'check' },
      { text: 'Perpetual fallback license (after 12 consecutive months)', icon: 'check' }
    ],
    button: {
      text: stripeCheckoutEnabled ? 'Purchase Pro' : 'Join Insider Waitlist',
      href: stripeCheckoutEnabled ? '#purchase' : '#waitlist',
      className: 'block w-full rounded-full bg-gradient-to-r from-apired to-red-600 px-6 py-3 text-center text-sm font-bold text-white hover:shadow-lg hover:shadow-apired/40 transition-all glow-red'
    }
  },
  {
    name: 'Team',
    description: 'Your team\u2019s shared infrastructure',
    price: '$15',
    cadence: '/user/month',
    priceNote: 'Monthly or annual billing',
    cardClass: 'glass rounded-2xl p-8 border border-slate-700/50',
    features: [
      { text: '<strong>Everything in Pro, plus:</strong>', icon: 'check' },
      { text: 'Shared environments with secret access control', icon: 'check' },
      { text: 'Shared schema registry - one source of truth', icon: 'check' },
      { text: 'Self-hostable Mock Gateway for the whole team', icon: 'check' },
      { text: 'Shared flow runs + team-wide result dashboard', icon: 'check' },
      { text: 'Real-time activity feed (SignalR-backed)', icon: 'check' },
      { text: 'Admin console - seat management &amp; offboarding', icon: 'check' },
      { text: 'Per-request comments &amp; flow-step annotations', icon: 'check' }
    ],
    button: {
      text: 'Contact for Teams',
      href: '#waitlist',
      className: 'block w-full rounded-full border border-slate-600 bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-slate-200 hover:border-slate-400 hover:bg-slate-800 transition-all'
    }
  },
  {
    name: 'Enterprise',
    description: 'Team at scale, with governance and compliance',
    price: '$35',
    cadence: '/user/month',
    priceNote: 'Billed annually',
    cardClass: 'glass rounded-2xl p-8 border border-slate-700/50',
    features: [
      { text: '<strong>Everything in Team, plus:</strong>', icon: 'check' },
      { text: 'SSO (SAML, Azure AD, Okta) + SCIM provisioning', icon: 'check' },
      { text: 'Secret vault integrations (AWS, GCP, Vault, Azure Key Vault)', icon: 'check' },
      { text: 'Audit logging, RBAC, compliance templates', icon: 'check' },
      { text: 'Self-hosted Team infrastructure option', icon: 'check' },
      { text: 'Workspace/environment DB snapshots', icon: 'check' },
      { text: 'SLAs, dedicated account manager, custom ToS/DPA', icon: 'check' }
    ],
    button: {
      text: 'Contact Sales',
      href: 'contact.html',
      className: 'block w-full rounded-full border border-slate-600 bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-slate-200 hover:border-slate-400 hover:bg-slate-800 transition-all'
    }
  }
];

const faqItems = [
  {
    question: 'Why C# scripting?',
    answer: 'Because .NET teams already write C# everywhere else and we think your API test should speak the language your team ships. ApiCourier runs pre and post-request scripts on the full .NET runtime via Roslyn, with strongly-typed request/response handling, LINQ, and modern C# features like records and pattern matching. No more awkward JavaScript translation tax on a .NET codebase.'
  },
  {
    question: 'Do I have to write in C#?',
    answer: 'Not at all. ApiCourier ships with a Postman-compatible JavaScript engine too, your existing Postman scripts and assertions work as-is. C# is the wedge, but JavaScript is a first-class citizen. Mix and match per request.'
  },
  {
    question: 'Can I migrate from Postman?',
    answer: 'Yes. ApiCourier imports Postman collections (v2.0 and v2.1), Bruno, cURL, and OpenAPI specs, and converts them into Git-native YAML. Your existing JavaScript scripts run on our Postman-compatible engine, so most migrations are a drag-and-drop.'
  },
  {
    question: 'What\u2019s shipping in v1.0?',
    answer: 'The 1.0 badges mark features in the v1.0 release - database assertions (SQL Server, Postgres, MySQL, SQLite), the Smart Mock Gateway with hybrid proxy/mock routing, API ↔ DB correlation with before/after diffs, and NuGet/NPM imports for Pro scripts. Insiders get these as builds roll out ahead of general availability.'
  },
  {
    question: 'What if I stop paying?',
    answer: 'JetBrains-style perpetual fallback. After 12 consecutive paid months of Pro, you keep a perpetual license to every Pro feature in the version covered by your fallback cutoff date locally, on your machine, forever. Cancelling means you keep what you\u2019ve paid for; only newer releases require an active subscription.'
  },
  {
    question: 'What platforms are supported?',
    answer: 'Windows 10/11 is fully supported and stable today. macOS support is in active beta with builds shipping now. Linux is on the roadmap, and a web version is planned for after 1.0.'
  }
];

function renderWorkflowStep(step) {
  const lines = step.codeLines
    .map((line) => {
      const className = line.className ? ` ${line.className}` : '';
      return `<div class="${className.trim()}">${line.text}</div>`;
    })
    .join('');

  return `
    <button type="button" class="workflow-step-card relative w-full text-left" data-workflow-step="${step.number}">
      <div class="glass rounded-xl p-6 ${step.borderClass}">
        <div class="absolute -top-4 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full ${step.badgeClass} text-white font-bold text-sm shadow-lg workflow-step-badge">
          ${step.number}
        </div>
        <h3 class="text-lg font-bold text-slate-50 mt-2 mb-3">${step.title}</h3>
        <p class="text-sm text-slate-300 mb-4">
          ${step.description}
        </p>
        <div class="terminal code-block text-xs p-3 ${step.codeClass} workflow-step-terminal">
          ${lines}
        </div>
      </div>
    </button>
  `;
}

function renderWorkflowDemo(step) {
  const media = step.demoVideoPath
    ? `
      <video class="workflow-demo-media" autoplay muted loop playsinline preload="metadata" poster="${step.screenshotPath}">
        <source src="${step.demoVideoPath}" type="video/webm" />
      </video>
    `
    : `
      <img src="${step.screenshotPath}" alt="${step.screenshotAlt}" class="workflow-demo-media" loading="lazy" decoding="async" />
    `;

  return `
    <div class="workflow-demo-shell">
      <div class="workflow-demo-head">
        <div class="workflow-demo-dots" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <p class="workflow-demo-label">Step ${step.number}: ${step.title}</p>
      </div>
      <div class="workflow-demo-frame">
        ${media}
      </div>
    </div>
  `;
}

function renderWorkflowCta() {
  return `
    <a href="#waitlist"
       class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-apired to-red-600 px-8 py-3 text-sm font-bold text-white shadow-xl hover:shadow-apired/40 transition-all glow-red">
      Join the Insider Waitlist
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </a>
  `;
}

function renderCheckIcon() {
  return `
    <svg class="h-5 w-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
    </svg>
  `;
}

function renderClockIcon(iconClass) {
  const className = iconClass || 'text-slate-600';
  return `
    <svg class="h-5 w-5 ${className} flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  `;
}

function renderPricingFeature(feature) {
  const icon = feature.icon === 'clock' ? renderClockIcon(feature.iconClass) : renderCheckIcon();
  const itemClass = feature.itemClass ? ` ${feature.itemClass}` : '';
  return `
    <li class="flex items-start gap-2${itemClass}">
      ${icon}
      ${feature.text}
    </li>
  `;
}

function renderPricingCard(plan) {
  const badge = plan.badge
    ? `
      <div class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-apired to-red-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
        ${plan.badge}
      </div>
    `
    : '';

  const priceBlock = plan.cadence
    ? `
      <div class="flex items-baseline gap-2">
        <div class="text-4xl font-black text-slate-50">${plan.price}</div>
        <div class="text-sm text-slate-400">${plan.cadence}</div>
      </div>
    `
    : `<div class="text-4xl font-black text-slate-50">${plan.price}</div>`;

  const priceNote = plan.priceNote
    ? `<div class="text-xs text-slate-500 mt-1">${plan.priceNote}</div>`
    : '';

  const features = plan.features.map((feature) => renderPricingFeature(feature)).join('');

  return `
    <div class="${plan.cardClass} pricing-card" data-pricing-card="true">
      ${badge}
      <div class="mb-6">
        <h3 class="text-2xl font-bold text-slate-50">${plan.name}</h3>
        <p class="mt-2 text-sm text-slate-400">${plan.description}</p>
      </div>
      <div class="mb-6">
        ${priceBlock}
        ${priceNote}
      </div>
      <ul class="space-y-3 mb-8 text-sm text-slate-300 pricing-card-features">
        ${features}
      </ul>
      <a href="${plan.button.href}" class="${plan.button.className} pricing-card-cta">
        ${plan.button.text}
      </a>
    </div>
  `;
}

function renderFaqCard(item) {
  return `
    <div class="glass rounded-xl p-6 border border-slate-700/50">
      <h3 class="text-sm font-bold uppercase tracking-wide text-apired mb-3">${item.question}</h3>
      <p class="text-sm text-slate-300 leading-relaxed">
        ${item.answer}
      </p>
    </div>
  `;
}

const workflowStepsContainer = document.getElementById('index-workflow-steps');
const workflowDemoContainer = document.getElementById('index-workflow-demo');
if (workflowStepsContainer && workflowDemoContainer) {
  workflowStepsContainer.innerHTML = workflowSteps.map((step) => renderWorkflowStep(step)).join('');

  const setActiveWorkflowStep = (stepNumber) => {
    const activeStep = workflowSteps.find((step) => step.number === stepNumber) || workflowSteps[0];
    workflowDemoContainer.innerHTML = renderWorkflowDemo(activeStep);

    workflowStepsContainer.querySelectorAll('[data-workflow-step]').forEach((button) => {
      const isActive = button.getAttribute('data-workflow-step') === activeStep.number;
      button.classList.toggle('is-active', isActive);
    });
  };

  setActiveWorkflowStep(workflowSteps[0].number);

  workflowStepsContainer.addEventListener('click', (event) => {
    const stepButton = event.target.closest('[data-workflow-step]');
    if (!stepButton) {
      return;
    }
    setActiveWorkflowStep(stepButton.getAttribute('data-workflow-step'));
  });
}

const workflowCtaContainer = document.getElementById('index-workflow-cta');
if (workflowCtaContainer) {
  workflowCtaContainer.innerHTML = renderWorkflowCta();
}

const pricingContainer = document.getElementById('index-pricing-cards');
if (pricingContainer) {
  pricingContainer.innerHTML = pricingPlans.map((plan) => renderPricingCard(plan)).join('');

  const syncPricingCardHeights = () => {
    const cards = pricingContainer.querySelectorAll('[data-pricing-card="true"]');
    if (!cards.length) {
      return;
    }

    cards.forEach((card) => {
      card.style.minHeight = '';
    });

    if (!window.matchMedia('(min-width: 1024px)').matches) {
      return;
    }

    let maxHeight = 0;
    cards.forEach((card) => {
      maxHeight = Math.max(maxHeight, card.offsetHeight);
    });

    if (maxHeight > 0) {
      cards.forEach((card) => {
        card.style.minHeight = `${maxHeight}px`;
      });
    }
  };

  syncPricingCardHeights();
  window.addEventListener('resize', syncPricingCardHeights);
}

const faqContainer = document.getElementById('index-faq-cards');
if (faqContainer) {
  faqContainer.innerHTML = faqItems.map((item) => renderFaqCard(item)).join('');
}
