const indexFeatureCards = [
  {
    title: 'Git-Native by Design',
    description: 'Every collection, request, and environment lives as human-readable YAML files. Commit, branch, merge, and review your API definitions exactly like source code.',
    iconClass: 'bg-emerald-500/10 text-emerald-400',
    iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    bulletColorClass: 'bg-emerald-400',
    bullets: [
      'Clean YAML diffs in pull requests',
      'Branch-aware UI shows current context',
      'File watching syncs external changes'
    ]
  },
  {
    title: 'Your Data, Your Control',
    description: '100% offline capable. No forced cloud sync, no vendor lock-in, no remote kill switches. Your collections and secrets stay on your machine and in your repositories.',
    iconClass: 'bg-sky-500/10 text-sky-400',
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    bulletColorClass: 'bg-sky-400',
    bullets: [
      'Works completely offline',
      'No external dependencies',
      'Secrets never leave your machine'
    ]
  },
  {
    title: 'OpenAPI Superpowers',
    description: 'Drop in an OpenAPI 3.x spec and get instant collections with auth, schemas, and examples. Test in ApiCourier, export back to OpenAPI.',
    iconClass: 'bg-purple-500/10 text-purple-400',
    iconPath: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
    bulletColorClass: 'bg-purple-400',
    bullets: [
      'Import specs in under 30 seconds',
      'Schema-aware request validation',
      'Postman collection import too'
    ]
  },
  {
    title: 'APIs + Databases, Together',
    description: 'First-class SQL editor with connection management. Run queries before/after API calls to validate data changes and correlate behavior across layers.',
    iconClass: 'bg-amber-500/10 text-amber-400',
    iconPath: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
    bulletColorClass: 'bg-amber-400',
    bullets: [
      'SQL Server, PostgreSQL, MySQL, SQLite',
      'Before/after query diff view',
      'Schema browser and IntelliSense'
    ],
    cardClass: 'opacity-75 relative',
    badgeText: 'Coming 2026',
    badgeClass: 'bg-slate-600 text-slate-200'
  },
  {
    title: 'JavaScript & C# Scripting',
    description: 'Reuse your Postman JavaScript scripts or unlock C# (via Roslyn) for strongly-typed logic, LINQ queries, and modern C# features like records and pattern matching.',
    iconClass: 'bg-red-500/10 text-apired',
    iconPath: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    bulletColorClass: 'bg-apired',
    bullets: [
      'Postman-compatible JS API',
      'Strongly-typed C# with compile-time checking',
      'Full test assertion framework'
    ]
  },
  {
    title: 'Blazing Fast .NET Desktop',
    description: 'Built with .NET MAUI + Blazor Hybrid. Native desktop performance without Electron bloat. Fast startup, low memory, smooth UI.',
    iconClass: 'bg-indigo-500/10 text-indigo-400',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    bulletColorClass: 'bg-indigo-400',
    bullets: [
      'Native .NET performance',
      'Low resource usage',
      'Windows, macOS, Linux planned'
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
      label: 'Database integration',
      cells: [
        { type: 'text', text: '2026', textClass: 'text-slate-400 text-xs' },
        { type: 'cross' },
        { type: 'cross' },
        { type: 'text', text: 'Plugins', textClass: 'text-slate-500' }
      ]
    },
    {
      label: 'C# scripting support',
      cells: [
        { type: 'check' },
        { type: 'cross' },
        { type: 'cross' },
        { type: 'cross' }
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
    codeLines: [
      { text: '# Instant import', className: 'text-slate-500' },
      { text: '&#10003; 15 endpoints detected' },
      { text: '&#10003; Bearer auth configured' },
      { text: '&#10003; Collections created' }
    ]
  },
  {
    number: '2',
    title: 'Test & Develop',
    description: 'Send requests, add tests, configure environments. Everything auto-exports to YAML in your workspace.',
    borderClass: 'border-sky-500/30',
    badgeClass: 'bg-sky-500',
    codeClass: 'text-sky-300',
    codeLines: [
      { text: '# Send request', className: 'text-slate-500' },
      { text: 'GET /users/123' },
      { text: '200 OK - 143ms', className: 'text-emerald-300' },
      { text: '# Auto-exported to Git', className: 'text-slate-500' }
    ]
  },
  {
    number: '3',
    title: 'Commit & Share',
    description: 'Collections are YAML files in your repo. Commit, review diffs, and share via Git like any other code.',
    borderClass: 'border-purple-500/30',
    badgeClass: 'bg-purple-500',
    codeClass: 'text-purple-300',
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
    description: 'For personal projects and exploration',
    price: '$0',
    priceNote: 'Forever - No credit card',
    cardClass: 'glass rounded-2xl p-8 border border-slate-700/50',
    features: [
      { text: 'Full HTTP client (all methods)', icon: 'check' },
      { text: 'Collections & environments (YAML)', icon: 'check' },
      { text: 'OpenAPI import', icon: 'check' },
      { text: 'Git CLI integration', icon: 'check' },
      { text: 'JavaScript scripting & test assertions', icon: 'check' },
      { text: 'Postman collection import', icon: 'check' }
    ],
    button: {
      text: 'Get Started Free',
      href: '#waitlist',
      className: 'block w-full rounded-full border border-slate-600 bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-slate-200 hover:border-slate-400 hover:bg-slate-800 transition-all'
    }
  },
  {
    name: 'Pro',
    description: 'For serious API development & QA',
    price: '$5',
    cadence: '/month',
    priceNote: 'or $50/year (save 17%)',
    cardClass: 'glass rounded-2xl p-8 border-2 border-apired/60 shadow-2xl shadow-apired/20 relative',
    badge: 'Most Popular',
    features: [
      { text: '<strong>Everything in Free, plus:</strong>', icon: 'check' },
      { text: 'C# scripting with Roslyn (strongly-typed)', icon: 'check' },
      { text: 'Built-in Git UI with commit history', icon: 'check' },
      { text: 'Advanced OpenAPI features', icon: 'check' },
      { text: 'Collection runner & automation', icon: 'check' },
      { text: 'SQL editor with IntelliSense (Q1 2026)', icon: 'clock', itemClass: 'text-slate-400 italic', iconClass: 'text-slate-600' },
      { text: 'API + DB correlation view (Q1 2026)', icon: 'clock', itemClass: 'text-slate-400 italic', iconClass: 'text-slate-600' }
    ],
    button: {
      text: 'Join Pro Waitlist',
      href: '#waitlist',
      className: 'block w-full rounded-full bg-gradient-to-r from-apired to-red-600 px-6 py-3 text-center text-sm font-bold text-white hover:shadow-lg hover:shadow-apired/40 transition-all glow-red'
    }
  },
  {
    name: 'Team',
    description: 'For teams & collaboration',
    price: '$15',
    cadence: '/user/month',
    priceNote: 'Billed annually',
    cardClass: 'glass rounded-2xl p-8 border border-slate-700/50',
    features: [
      { text: '<strong>Everything in Pro, plus:</strong>', icon: 'check' },
      { text: 'Team workspaces', icon: 'check' },
      { text: 'Shared environments', icon: 'check' },
      { text: 'Real-time collaboration', icon: 'check' },
      { text: 'Activity logs & comments', icon: 'check' },
      { text: 'Priority support', icon: 'check' }
    ],
    button: {
      text: 'Contact for Teams',
      href: '#waitlist',
      className: 'block w-full rounded-full border border-slate-600 bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-slate-200 hover:border-slate-400 hover:bg-slate-800 transition-all'
    }
  }
];

const faqItems = [
  {
    question: 'Is ApiCourier cloud-based?',
    answer: 'No. ApiCourier is desktop-first and offline-first. Your collections, environments, and scripts live as files on your machine and in your Git repos. Optional cloud features may arrive later, but local use will always be first-class.'
  },
  {
    question: 'Can I migrate from Postman?',
    answer: 'Yes! ApiCourier can import Postman collections (v2.0, v2.1) and convert them to Git-native YAML. Your existing JavaScript scripts work with our Postman-compatible API, making migration smooth.'
  },
  {
    question: 'What if I stop paying?',
    answer: 'You keep the last version you licensed, forever. No remote kill switches, no disabled features. This is a JetBrains-style license: renewals give you updates, not continued access.'
  },
  {
    question: 'What platforms are supported?',
    answer: 'Windows 10/11 is the initial focus. macOS and Linux support is planned using .NET MAUI. A web version is on the roadmap once the desktop client is stable.'
  },
  {
    question: 'Why Git-native storage?',
    answer: 'Because your API definitions should live in the same repo as your code. Version control, code reviews, branching strategies, all the workflows you already use for code should work for your API collections too.'
  },
  {
    question: 'When will it launch?',
    answer: 'ApiCourier is in active development with the MVP nearing completion. Early access will open to waitlist members in 2026. Join the waitlist below to be first in line.'
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
    <div class="relative">
      <div class="glass rounded-xl p-6 ${step.borderClass}">
        <div class="absolute -top-4 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full ${step.badgeClass} text-white font-bold text-sm shadow-lg">
          ${step.number}
        </div>
        <h3 class="text-lg font-bold text-slate-50 mt-2 mb-3">${step.title}</h3>
        <p class="text-sm text-slate-300 mb-4">
          ${step.description}
        </p>
        <div class="terminal code-block text-xs p-3 ${step.codeClass}">
          ${lines}
        </div>
      </div>
    </div>
  `;
}

function renderWorkflowCta() {
  return `
    <a href="#waitlist"
       class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-apired to-red-600 px-8 py-3 text-sm font-bold text-white shadow-xl hover:shadow-apired/40 transition-all glow-red">
      Start Your Git-Native Workflow
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
    <div class="${plan.cardClass}">
      ${badge}
      <div class="mb-6">
        <h3 class="text-2xl font-bold text-slate-50">${plan.name}</h3>
        <p class="mt-2 text-sm text-slate-400">${plan.description}</p>
      </div>
      <div class="mb-6">
        ${priceBlock}
        ${priceNote}
      </div>
      <ul class="space-y-3 mb-8 text-sm text-slate-300">
        ${features}
      </ul>
      <a href="${plan.button.href}" class="${plan.button.className}">
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
if (workflowStepsContainer) {
  workflowStepsContainer.innerHTML = workflowSteps.map((step) => renderWorkflowStep(step)).join('');
}

const workflowCtaContainer = document.getElementById('index-workflow-cta');
if (workflowCtaContainer) {
  workflowCtaContainer.innerHTML = renderWorkflowCta();
}

const pricingContainer = document.getElementById('index-pricing-cards');
if (pricingContainer) {
  pricingContainer.innerHTML = pricingPlans.map((plan) => renderPricingCard(plan)).join('');
}

const faqContainer = document.getElementById('index-faq-cards');
if (faqContainer) {
  faqContainer.innerHTML = faqItems.map((item) => renderFaqCard(item)).join('');
}
