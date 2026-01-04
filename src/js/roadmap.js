const roadmapSections = [
  {
    id: 'active',
    title: 'In Active Development',
    subtitle: 'Currently being built and tested',
    headerBadge: {
      text: 'Now',
      className: 'status-badge status-in-progress',
      pulse: true
    },
    gridClass: 'grid gap-5 md:grid-cols-2',
    cardClass: 'glass feature-card rounded-xl p-6 border border-emerald-500/30',
    statusBadge: {
      text: 'In Progress',
      className: 'status-badge status-in-progress',
      pulse: true
    },
    items: [
      {
        title: 'Collection Runner',
        description: 'Run entire collections or folders with configurable iterations, delays, and data sets. Detailed test reports and execution logs.',
        iconClass: 'bg-emerald-500/10 text-emerald-400',
        iconPath: 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4',
        bullets: [
          'Sequential request execution',
          'Test assertion reporting',
          'Iteration and data file support'
        ]
      },
      {
        title: 'Response Viewing Enhancements',
        description: 'Advanced response inspection with search, JSONPath query helpers, and improved formatting options.',
        iconClass: 'bg-sky-500/10 text-sky-400',
        iconPath: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        bullets: [
          'JSONPath expression builder',
          'Full-text search in responses',
          'Enhanced Monaco viewer features'
        ]
      }
    ]
  },
  {
    id: 'planned-near',
    title: 'Planned - High Priority',
    subtitle: 'Committed features coming after MVP launch',
    headerBadge: {
      text: 'Next Up',
      className: 'status-badge status-planned-near',
      pulse: false
    },
    gridClass: 'grid gap-5 md:grid-cols-2 lg:grid-cols-3',
    cardClass: 'glass feature-card rounded-xl p-6 border border-sky-500/30',
    statusBadge: {
      text: 'Planned',
      className: 'status-badge status-planned-near',
      pulse: false
    },
    items: [
      {
        title: 'Database Integration',
        description: 'First-class SQL editor with support for SQL Server, PostgreSQL, MySQL, and SQLite. Connection management and IntelliSense.',
        iconClass: 'bg-amber-500/10 text-amber-400',
        iconPath: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4'
      },
      {
        title: 'Advanced Request Features',
        description: 'GraphQL support, WebSocket testing, gRPC client, and advanced file upload/download handling.',
        iconClass: 'bg-sky-500/10 text-sky-400',
        iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      },
      {
        title: 'Mock Server',
        description: 'Create mock API servers from OpenAPI specs or collections for frontend development and testing.',
        iconClass: 'bg-indigo-500/10 text-indigo-400',
        iconPath: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
      }
    ]
  },
  {
    id: 'planned-future',
    title: 'Planned - Future Vision',
    subtitle: "Features we're committed to building eventually",
    headerBadge: {
      text: 'Later',
      className: 'status-badge status-planned-future',
      pulse: false
    },
    gridClass: 'grid gap-5 md:grid-cols-2 lg:grid-cols-3',
    cardClass: 'glass feature-card rounded-xl p-6 border border-purple-500/30',
    statusBadge: {
      text: 'Future',
      className: 'status-badge status-planned-future',
      pulse: false
    },
    items: [
      {
        title: 'macOS & Linux Support',
        description: 'Cross-platform builds using .NET MAUI for macOS and Linux desktop environments.',
        iconClass: 'bg-slate-500/10 text-slate-400',
        iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
      },
      {
        title: 'Web Version',
        description: 'Browser-based version using Blazor WebAssembly with local file system access for Git workflows.',
        iconClass: 'bg-cyan-500/10 text-cyan-400',
        iconPath: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
      },
      {
        title: 'Team Collaboration Features',
        description: 'Team workspaces, shared environments, real-time collaboration, and activity logs with comments.',
        iconClass: 'bg-emerald-500/10 text-emerald-400',
        iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
      },
      {
        title: 'CLI Tool',
        description: 'Command-line interface for running collections in CI/CD pipelines and automated testing workflows.',
        iconClass: 'bg-orange-500/10 text-orange-400',
        iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
      },
      {
        title: 'Plugin/Extension System',
        description: 'Developer SDK for building custom extensions, importers, auth providers, and integrations.',
        iconClass: 'bg-pink-500/10 text-pink-400',
        iconPath: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z'
      },
      {
        title: 'API + DB Correlation',
        description: 'Before/after query comparison, API request to DB change visualization, and cross-layer debugging tools.',
        iconClass: 'bg-violet-500/10 text-violet-400',
        iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      }
    ]
  },
  {
    id: 'consideration',
    title: 'Under Consideration',
    subtitle: 'Ideas being evaluated for feasibility and fit',
    headerBadge: {
      text: 'Exploring',
      className: 'status-badge status-consideration',
      pulse: false
    },
    gridClass: 'grid gap-5 md:grid-cols-2 lg:grid-cols-3',
    cardClass: 'glass feature-card rounded-xl p-6 border border-slate-600/50',
    statusBadge: {
      text: 'Maybe',
      className: 'status-badge status-consideration',
      pulse: false
    },
    items: [
      {
        title: 'Secrets Management',
        description: 'Encrypted local vault for API keys and tokens. Exploring integration with OS keychains and external vaults.',
        iconClass: 'bg-slate-500/10 text-slate-400',
        iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
      },
      {
        title: 'Performance Testing',
        description: 'Load testing capabilities with concurrent requests, duration-based runs, and performance metrics.',
        iconClass: 'bg-slate-500/10 text-slate-400',
        iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
      },
      {
        title: 'Request History & Replay',
        description: 'Local history of all requests sent with ability to replay, diff responses, and track API changes over time.',
        iconClass: 'bg-slate-500/10 text-slate-400',
        iconPath: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
      },
      {
        title: 'AI-Powered Features',
        description: 'Generate test scripts from examples, suggest assertions based on responses, auto-document endpoints.',
        iconClass: 'bg-slate-500/10 text-slate-400',
        iconPath: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
      },
      {
        title: 'VS Code Extension',
        description: 'Send requests directly from VS Code, inline test results, and tight integration with code workflows.',
        iconClass: 'bg-slate-500/10 text-slate-400',
        iconPath: 'M13 10V3L4 14h7v7l9-11h-7z'
      },
      {
        title: 'API Monitoring & Alerts',
        description: 'Scheduled collection runs with notifications for failures, performance degradation, or contract changes.',
        iconClass: 'bg-slate-500/10 text-slate-400',
        iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      }
    ]
  },
  {
    id: 'completed',
    variant: 'completed',
    title: 'Recently Completed',
    subtitle: 'Latest features that have been completed',
    headerBadgeHtml: '<span class="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-400"><svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>Shipped</span>',
    gridClass: 'grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto',
    cardClass: 'glass rounded-xl p-6 border border-emerald-500/20 opacity-90',
    items: [
      {
        title: 'Core HTTP Client',
        description: 'Full-featured HTTP client with all methods, headers, auth types (Bearer, Basic, API Key), and response handling with YAML storage.',
        iconClass: 'bg-emerald-500/10 text-emerald-400',
        iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      },
      {
        title: 'Git Integration (CLI + UI)',
        description: 'Full Git backend with commit UI, branch context, status panel, and file watching. Auto-commit support with smart message generation.',
        iconClass: 'bg-sky-500/10 text-sky-400',
        iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
      },
      {
        title: 'OpenAPI & Postman Import',
        description: 'Import wizard supporting OpenAPI 3.0/3.1, Swagger 2.0, and Postman collections (v2.0/v2.1) with full metadata extraction.',
        iconClass: 'bg-purple-500/10 text-purple-400',
        iconPath: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
      },
      {
        title: 'JavaScript Scripting',
        description: 'ClearScript V8-powered JavaScript engine with Postman-compatible API, pre-request/post-response scripts, and Chai-style test assertions.',
        iconClass: 'bg-amber-500/10 text-amber-400',
        iconPath: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
      },
      {
        title: 'C# Scripting',
        description: 'Roslyn-based C# scripting with strongly-typed JSON parsing, LINQ support, compile-time type checking, and modern C# features (records, pattern matching).',
        iconClass: 'bg-red-500/10 text-apired',
        iconPath: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
      },
      {
        title: 'Environment & Variables',
        description: 'Full environment management with variable substitution, nested support, circular reference detection, and collection/environment scoping.',
        iconClass: 'bg-indigo-500/10 text-indigo-400',
        iconPath: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
      }
    ]
  }
];

function renderBadge(badge) {
  if (!badge) {
    return '';
  }

  const pulse = badge.pulse
    ? '<span class="pulse-dot bg-emerald-400"></span>'
    : '';
	
  return `<span class="${badge.className}">${pulse}${badge.text}</span>`;
}

function renderStandardCard(section, item) {
  const statusBadge = renderBadge(section.statusBadge);
  const bullets = item.bullets
    ? `<ul class="space-y-1 text-xs text-slate-400">${item.bullets
        .map(
          (bullet) =>
            `<li class="flex items-center gap-2"><span class="h-1 w-1 rounded-full bg-emerald-400"></span>${bullet}</li>`
        )
        .join('')}</ul>`
    : '';

  return `
    <div class="${section.cardClass}">
      <div class="flex items-start justify-between mb-3">
        <div class="inline-flex items-center justify-center h-10 w-10 rounded-lg ${item.iconClass}">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.iconPath}" />
          </svg>
        </div>
        ${statusBadge}
      </div>
      <h3 class="text-lg font-bold text-slate-50 mb-2">${item.title}</h3>
      <p class="text-sm text-slate-300 leading-relaxed${item.bullets ? ' mb-3' : ''}">
        ${item.description}
      </p>
      ${bullets}
    </div>
  `;
}

function renderCompletedCard(section, item) {
  return `
    <div class="${section.cardClass}">
      <div class="flex items-start justify-between mb-3">
        <div class="inline-flex items-center justify-center h-10 w-10 rounded-lg ${item.iconClass}">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.iconPath}" />
          </svg>
        </div>
        <span class="text-xs text-emerald-400 font-semibold">&#10003; Shipped</span>
      </div>
      <h3 class="text-lg font-bold text-slate-50 mb-2">${item.title}</h3>
      <p class="text-sm text-slate-300 leading-relaxed">
        ${item.description}
      </p>
    </div>
  `;
}

function renderSection(section) {
  const headerBadge = section.headerBadgeHtml
    ? section.headerBadgeHtml
    : renderBadge(section.headerBadge);
	
  const cards = section.variant === 'completed'
    ? section.items.map((item) => renderCompletedCard(section, item)).join('')
    : section.items.map((item) => renderStandardCard(section, item)).join('');

  return `
    <section class="fade-in-section space-y-6" id="${section.id}">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-slate-50 sm:text-4xl mb-2">
          <span class="inline-flex items-center gap-3">
            ${section.title}
            ${headerBadge}
          </span>
        </h2>
        <p class="text-slate-400">${section.subtitle}</p>
      </div>

      <div class="${section.gridClass}">
        ${cards}
      </div>
    </section>
  `;
}

function renderReleaseFooter() {
  return `
    <div class="text-center">
      <p class="text-sm text-slate-400">
        See full release history on
        <a href="https://github.com/apicourier/apicourier/releases"
           class="text-apired hover:text-red-400 transition-colors underline"
           target="_blank"
           rel="noopener noreferrer">
          GitHub Releases
        </a>
      </p>
    </div>
  `;
}

function applyFadeInObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-section').forEach((el) => observer.observe(el));
}

const container = document.getElementById('roadmap-sections');

if (container) {
  const markup = roadmapSections
    .map((section) => renderSection(section))
    .join('');

  container.innerHTML = `${markup}${renderReleaseFooter()}`;
  applyFadeInObserver();
}
