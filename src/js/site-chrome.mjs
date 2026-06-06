// Isomorphic site chrome (header + footer).
//
// This module is the SINGLE SOURCE OF TRUTH for the navigation header and
// footer markup. It is imported in two places:
//   1. The browser (components.js) - for dev/no-build rendering + enhancement.
//   2. The Node build step (scripts/build.mjs) - to bake the markup directly
//      into each .html file so the internal links exist in the raw HTML that
//      search engines crawl on their first pass (SEO).
//
// Keep this file free of browser globals (window/document/customElements) at
// module scope so it can be imported by Node.

const SECONDARY_NAV = {
  brandHref: '/',
  items: [
    { key: 'features', label: 'Features', href: '/#features' },
    { key: 'pricing', label: 'Pricing', href: '/#pricing' },
    { key: 'download', label: 'Download', href: '/download' },
    { key: 'roadmap', label: 'Roadmap', href: '/roadmap' },
    { key: 'contact', label: 'Contact', href: '/contact' }
  ],
  ctaHref: '/#waitlist'
};

const NAV_CONFIG = {
  index: {
    brandHref: '#top',
    items: [
      { key: 'why', label: 'Why ApiCourier', href: '#why-apicourier' },
      { key: 'features', label: 'Features', href: '#features' },
      { key: 'pricing', label: 'Pricing', href: '#pricing' },
      { key: 'download', label: 'Download', href: '/download' },
      { key: 'faq', label: 'FAQ', href: '#faq' },
      { key: 'roadmap', label: 'Roadmap', href: '/roadmap' }
    ],
    ctaHref: '#waitlist'
  },
  contact: SECONDARY_NAV,
  roadmap: {
    brandHref: '/',
    items: [
      { key: 'features', label: 'Features', href: '/#features' },
      { key: 'pricing', label: 'Pricing', href: '/#pricing' },
      { key: 'download', label: 'Download', href: '/download' },
      { key: 'roadmap', label: 'Roadmap', href: '/roadmap' }
    ],
    ctaHref: '/#waitlist'
  },
  support: SECONDARY_NAV,
  changelog: SECONDARY_NAV,
  download: SECONDARY_NAV,
  privacy: SECONDARY_NAV,
  terms: SECONDARY_NAV,
  license: SECONDARY_NAV,
  'third-party-notices': SECONDARY_NAV
};

export const DEFAULT_PAGE = 'index';
export const DEFAULT_DISCORD = 'https://discord.gg/PCAjVpaJGu';

const GITHUB_URL = 'https://github.com/apicourier/apicourier';

function getConfig(page) {
  return NAV_CONFIG[page] || NAV_CONFIG[DEFAULT_PAGE];
}

function renderNavItems(items, activeKey) {
  return items
    .map((item) => {
      const isActive = activeKey === item.key;
      const className = isActive
        ? 'text-apired'
        : 'hover:text-apired transition-colors';

      return `<a href="${item.href}" class="${className}">${item.label}</a>`;
    })
    .join('');
}

function renderMobileItems(items, activeKey) {
  return items
    .map((item, index) => {
      const isActive = activeKey === item.key;
      const baseClass = isActive
        ? 'block rounded-md px-2 py-2 bg-slate-800 text-apired'
        : 'block rounded-md px-2 py-2 hover:bg-slate-800';
      const spacing = index === 0 ? '' : ' mt-1';

      return `<a href="${item.href}" class="${baseClass}${spacing}">${item.label}</a>`;
    })
    .join('');
}

export function buildHeaderHTML(page = DEFAULT_PAGE) {
  const activeKey = page === 'index' ? '' : page;
  const config = getConfig(page);
  const ctaClass = page === 'index'
    ? 'rounded-full bg-apired px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-red-500 transition-all glow-red whitespace-nowrap'
    : 'rounded-full bg-apired px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-red-500 transition-all whitespace-nowrap';

  return `
      <header class="sticky top-0 z-50 glass-strong border-b border-slate-800/50">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="${config.brandHref}" class="flex items-center gap-3 group">
            <img src="images/apicourierlogo.svg" alt="ApiCourier Logo" class="h-10 w-10 transition-all duration-300 group-hover:drop-shadow-lg group-hover:drop-shadow-apired/50" />
            <div class="flex flex-col leading-tight">
              <span class="text-base font-bold tracking-wide">ApiCourier</span>
              <span class="text-[10px] text-slate-400 font-medium">C# &middot; Git-Native &middot; Offline-First</span>
            </div>
          </a>

          <nav class="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex">
            ${renderNavItems(config.items, activeKey)}
            <a href="${GITHUB_URL}"
               class="inline-flex items-center gap-1 hover:text-apired transition-colors"
               target="_blank"
               rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.088 3.292 9.395 7.865 10.923.575.11.785-.25.785-.556 0-.275-.01-1.007-.015-1.978-3.2.696-3.878-1.543-3.878-1.543-.523-1.33-1.277-1.684-1.277-1.684-1.043-.713.079-.699.079-.699 1.153.081 1.76 1.184 1.76 1.184 1.026 1.758 2.691 1.251 3.347.958.103-.744.402-1.252.732-1.54-2.554-.29-5.236-1.277-5.236-5.683 0-1.255.448-2.28 1.183-3.084-.119-.29-.513-1.459.112-3.04 0 0 .965-.309 3.162 1.178a10.98 10.98 0 0 1 2.879-.387c.977.004 1.962.132 2.88.387 2.196-1.487 3.16-1.178 3.16-1.178.626 1.581.232 2.75.114 3.04.737.804 1.182 1.829 1.182 3.084 0 4.418-2.687 5.389-5.25 5.673.414.357.783 1.06.783 2.137 0 1.543-.014 2.784-.014 3.164 0 .309.207.672.79.556C20.21 21.39 23.5 17.084 23.5 12 23.5 5.648 18.352.5 12 .5Z" />
              </svg>
              GitHub
            </a>
            <a href="${config.ctaHref}"
               class="${ctaClass}">
              Join Waitlist
            </a>
          </nav>

          <button id="mobileMenuToggle"
                  class="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:bg-slate-800 md:hidden"
                  aria-label="Toggle navigation">
            <svg id="iconMenu" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg id="iconClose" xmlns="http://www.w3.org/2000/svg" class="hidden h-6 w-6" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <nav id="mobileMenu" class="glass mx-3 mt-1 hidden rounded-xl px-4 pb-4 pt-2 text-sm md:hidden">
          ${renderMobileItems(config.items, activeKey)}
          <a href="${GITHUB_URL}"
             class="mt-1 block rounded-md px-2 py-2 hover:bg-slate-800"
             target="_blank"
             rel="noopener noreferrer">GitHub</a>
          <a href="${config.ctaHref}"
             class="mt-3 block rounded-full bg-apired px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white">
            Join Waitlist
          </a>
        </nav>
      </header>
    `;
}

export function buildFooterHTML(page = DEFAULT_PAGE, options = {}) {
  const activeKey = page === 'index' ? '' : page;
  const discordUrl = options.discord || DEFAULT_DISCORD;
  const year = options.year || '';
  // Home-page anchors resolve in-page; deep pages link back to the root.
  const home = page === 'index' ? '' : '/';

  const productLinks = [
    { key: 'features', label: 'Features', href: `${home}#features` },
    { key: 'pricing', label: 'Pricing', href: `${home}#pricing` },
    { key: 'download', label: 'Download', href: '/download' },
    { key: 'faq', label: 'FAQ', href: `${home}#faq` },
    { key: 'roadmap', label: 'Roadmap', href: '/roadmap' },
    { key: 'changelog', label: 'Changelog', href: '/changelog' }
  ];

  const resourceLinks = [
    { key: 'docs', label: 'Documentation', href: 'https://docs.apicourier.dev' },
    { key: 'github', label: 'GitHub', href: GITHUB_URL },
    { key: 'support', label: 'Support', href: '/support' },
    { key: 'contact', label: 'Contact', href: '/contact' }
  ];

  const renderFooterLinks = (links, activeKeyValue) =>
    links
      .map((link) => {
        const isActive = activeKeyValue === link.key;
        const className = isActive
          ? 'text-apired hover:text-red-400 transition-colors'
          : 'hover:text-slate-200 transition-colors';
        return `<li><a href="${link.href}" class="${className}">${link.label}</a></li>`;
      })
      .join('');

  return `
      <footer class="border-t border-slate-800 bg-slate-950/90 mt-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid gap-8 py-12 md:grid-cols-4">
            <div class="md:col-span-2">
              <div class="flex items-center gap-3 mb-4">
                <img src="images/apicourierlogo.svg" alt="ApiCourier Logo" class="h-10 w-10" />
                <div class="flex flex-col leading-tight">
                  <span class="text-base font-bold tracking-wide text-slate-200">ApiCourier LLC</span>
                  <span class="text-[10px] text-slate-500 font-medium">C# &middot; Git-Native &middot; Offline-First</span>
                </div>
              </div>
              <p class="text-sm text-slate-400 max-w-md leading-relaxed">
                The API client that speaks C# and tests your database.
                NuGet scripting, DB assertions, and a smart mock gateway. Built for .NET teams.
              </p>
              <div class="flex items-center gap-4 mt-6">
                <a href="${GITHUB_URL}"
                   class="text-slate-400 hover:text-slate-200 transition-colors"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="GitHub">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.088 3.292 9.395 7.865 10.923.575.11.785-.25.785-.556 0-.275-.01-1.007-.015-1.978-3.2.696-3.878-1.543-3.878-1.543-.523-1.33-1.277-1.684-1.277-1.684-1.043-.713.079-.699.079-.699 1.153.081 1.76 1.184 1.76 1.184 1.026 1.758 2.691 1.251 3.347.958.103-.744.402-1.252.732-1.54-2.554-.29-5.236-1.277-5.236-5.683 0-1.255.448-2.28 1.183-3.084-.119-.29-.513-1.459.112-3.04 0 0 .965-.309 3.162 1.178a10.98 10.98 0 0 1 2.879-.387c.977.004 1.962.132 2.88.387 2.196-1.487 3.16-1.178 3.16-1.178.626 1.581.232 2.75.114 3.04.737.804 1.182 1.829 1.182 3.084 0 4.418-2.687 5.389-5.25 5.673.414.357.783 1.06.783 2.137 0 1.543-.014 2.784-.014 3.164 0 .309.207.672.79.556C20.21 21.39 23.5 17.084 23.5 12 23.5 5.648 18.352.5 12 .5Z" />
                  </svg>
                </a>
                <a href="${discordUrl}"
                   class="text-slate-400 hover:text-slate-200 transition-colors"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Discord">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-300 mb-4">Product</h3>
              <ul class="space-y-3 text-sm text-slate-400">
                ${renderFooterLinks(productLinks, activeKey)}
              </ul>
            </div>

            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-300 mb-4">Resources</h3>
              <ul class="space-y-3 text-sm text-slate-400">
                ${renderFooterLinks(resourceLinks, activeKey)}
              </ul>
            </div>
          </div>

          <div class="border-t border-slate-800 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
            <p>&copy; <span id="year">${year}</span> ApiCourier LLC. Built by developers, for developers.</p>
            <div class="flex flex-wrap gap-6">
              <a href="/privacy" class="hover:text-slate-300 transition-colors">Privacy Policy</a>
              <a href="/terms" class="hover:text-slate-300 transition-colors">Terms of Service</a>
              <a href="/license" class="hover:text-slate-300 transition-colors">License</a>
              <a href="/third-party-notices" class="hover:text-slate-300 transition-colors">Third-Party Notices</a>
            </div>
          </div>
        </div>
      </footer>
    `;
}
