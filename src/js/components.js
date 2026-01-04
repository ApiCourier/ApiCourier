const NAV_CONFIG = {
  index: {
    brandHref: '#top',
    items: [
      { key: 'why', label: 'Why ApiCourier', href: '#why-apicourier' },
      { key: 'features', label: 'Features', href: '#features' },
      { key: 'pricing', label: 'Pricing', href: '#pricing' },
      { key: 'faq', label: 'FAQ', href: '#faq' },
      { key: 'roadmap', label: 'Roadmap', href: 'roadmap.html' }
    ],
    ctaHref: '#waitlist'
  },
  contact: {
    brandHref: 'index.html',
    items: [
      { key: 'features', label: 'Features', href: 'index.html#features' },
      { key: 'pricing', label: 'Pricing', href: 'index.html#pricing' },
      { key: 'roadmap', label: 'Roadmap', href: 'roadmap.html' },
      { key: 'contact', label: 'Contact', href: 'contact.html' }
    ],
    ctaHref: 'index.html#waitlist'
  },
  roadmap: {
    brandHref: 'index.html',
    items: [
      { key: 'features', label: 'Features', href: 'index.html#features' },
      { key: 'pricing', label: 'Pricing', href: 'index.html#pricing' },
      { key: 'roadmap', label: 'Roadmap', href: 'roadmap.html' }
    ],
    ctaHref: 'index.html#waitlist'
  }
};

const DEFAULT_PAGE = 'index';
const DEFAULT_DISCORD = 'https://discord.gg/PCAjVpaJGu';

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

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page = this.dataset.page || DEFAULT_PAGE;
    const activeKey = page === 'index' ? '' : page;
    const config = getConfig(page);
    const ctaClass = page === 'index'
      ? 'rounded-full bg-apired px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-red-500 transition-all glow-red whitespace-nowrap'
      : 'rounded-full bg-apired px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-red-500 transition-all whitespace-nowrap';

    this.innerHTML = `
      <header class="sticky top-0 z-50 glass-strong border-b border-slate-800/50">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="${config.brandHref}" class="flex items-center gap-3 group">
            <img src="images/apicourierlogo.svg" alt="ApiCourier Logo" class="h-10 w-10 transition-all duration-300 group-hover:drop-shadow-lg group-hover:drop-shadow-apired/50" />
            <div class="flex flex-col leading-tight">
              <span class="text-base font-bold tracking-wide">ApiCourier</span>
              <span class="text-[10px] text-slate-400 font-medium">Git-Native - Offline-First</span>
            </div>
          </a>

          <nav class="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex">
            ${renderNavItems(config.items, activeKey)}
            <a href="https://github.com/apicourier/apicourier"
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
          <a href="https://github.com/apicourier/apicourier"
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

    const menuToggle = this.querySelector('#mobileMenuToggle');
    const mobileMenu = this.querySelector('#mobileMenu');
    const iconMenu = this.querySelector('#iconMenu');
    const iconClose = this.querySelector('#iconClose');

    menuToggle?.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      iconMenu.classList.toggle('hidden', !isOpen);
      iconClose.classList.toggle('hidden', isOpen);
    });

    mobileMenu?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        iconMenu.classList.remove('hidden');
        iconClose.classList.add('hidden');
      });
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const page = this.dataset.page || DEFAULT_PAGE;
    const activeKey = page === 'index' ? '' : page;
    const discordUrl = this.dataset.discord || DEFAULT_DISCORD;
    const base = page === 'index' ? '' : 'index.html';

    const productLinks = [
      { key: 'features', label: 'Features', href: `${base}#features` },
      { key: 'pricing', label: 'Pricing', href: `${base}#pricing` },
      { key: 'faq', label: 'FAQ', href: `${base}#faq` },
      { key: 'roadmap', label: 'Roadmap', href: 'roadmap.html' },
      { key: 'changelog', label: 'Changelog', href: '#' }
    ];

    const resourceLinks = [
      { key: 'docs', label: 'Documentation', href: '#' },
      { key: 'github', label: 'GitHub', href: 'https://github.com/apicourier/apicourier' },
      { key: 'blog', label: 'Blog', href: '#' },
      { key: 'support', label: 'Support', href: '#' },
      { key: 'contact', label: 'Contact', href: 'contact.html' }
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

    this.innerHTML = `
      <footer class="border-t border-slate-800 bg-slate-950/90 mt-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="grid gap-8 py-12 md:grid-cols-4">
            <div class="md:col-span-2">
              <div class="flex items-center gap-3 mb-4">
                <img src="images/apicourierlogo.svg" alt="ApiCourier Logo" class="h-10 w-10" />
                <div class="flex flex-col leading-tight">
                  <span class="text-base font-bold tracking-wide text-slate-200">ApiCourier</span>
                  <span class="text-[10px] text-slate-500 font-medium">Git-Native - Offline-First</span>
                </div>
              </div>
              <p class="text-sm text-slate-400 max-w-md leading-relaxed">
                The developer-first API client that stores everything in Git-native YAML.
                Build, test, and ship APIs without vendor lock-in.
              </p>
              <div class="flex items-center gap-4 mt-6">
                <a href="https://github.com/apicourier/apicourier"
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
            <p>&copy; <span id="year"></span> ApiCourier. Built by developers, for developers.</p>
            <div class="flex flex-wrap gap-6">
              <a href="#" class="hover:text-slate-300 transition-colors">Privacy Policy</a>
              <a href="#" class="hover:text-slate-300 transition-colors">Terms of Service</a>
              <a href="#" class="hover:text-slate-300 transition-colors">License</a>
            </div>
          </div>
        </div>
      </footer>
    `;

    const year = this.querySelector('#year');
    if (year) {
      year.textContent = new Date().getFullYear();
    }
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

class SiteCta extends HTMLElement {
  connectedCallback() {
    const href = this.dataset.href || '#';
    const text = this.dataset.text || 'Join the Waitlist';
    const variant = this.dataset.variant || 'solid';
    const baseClass = 'group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-xl transition-all';
    const variantClass = variant === 'gradient'
      ? 'bg-gradient-to-r from-apired to-red-600 hover:shadow-apired/50'
      : 'bg-apired hover:bg-red-500 glow-red whitespace-nowrap';

    this.innerHTML = `
      <a href="${href}" class="${baseClass} ${variantClass}">
        ${text}
        <svg class="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    `;
  }
}

customElements.define('site-cta', SiteCta);

class SiteWaitlist extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="glass-strong rounded-2xl p-10 sm:p-16 border-2 border-apired/40 text-center relative overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 bg-apired/20 rounded-full blur-3xl"></div>

        <div class="relative z-10 max-w-3xl mx-auto space-y-8">
          <div>
            <h2 class="text-3xl font-black text-slate-50 sm:text-4xl lg:text-4xl">
              Join the waitlist for early access
            </h2>
            <p class="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Be among the first to experience Git-native API development.
              Early access members get Pro features free during beta.
            </p>
          </div>

          <div class="max-w-xl mx-auto" id="waitlist-embed"></div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400 pt-4">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Early access in 2026</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const embedHost = this.querySelector('#waitlist-embed');
    if (embedHost) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://eomail5.com/form/86b619ea-e99c-11f0-9a7d-4f2173c7dfa7.js';
      script.dataset.form = '86b619ea-e99c-11f0-9a7d-4f2173c7dfa7';
      embedHost.appendChild(script);

    }
  }
}

customElements.define('site-waitlist', SiteWaitlist);

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

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetSelector = anchor.getAttribute('href');
    if (!targetSelector || targetSelector === '#') {
      return;
    }

    const target = document.querySelector(targetSelector);
    if (!target) {
      return;
    }

    event.preventDefault();
    const offset = 80;
    const targetPosition = target.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});
