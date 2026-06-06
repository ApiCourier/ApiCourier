import { getRuntimeConfig } from './runtime-config.js';
import { buildHeaderHTML, buildFooterHTML, DEFAULT_PAGE } from './site-chrome.mjs';

const runtimeConfig = getRuntimeConfig();

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page = this.dataset.page || DEFAULT_PAGE;

    // The build step bakes the header markup into the page for SEO. Only
    // render here when it's missing (local dev on un-built source).
    if (!this.firstElementChild) {
      this.innerHTML = buildHeaderHTML(page);
    }

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
    const discordUrl = this.dataset.discord || undefined;

    // The build step bakes the footer markup into the page for SEO. Only
    // render here when it's missing (local dev on un-built source).
    if (!this.firstElementChild) {
      this.innerHTML = buildFooterHTML(page, { discord: discordUrl });
    }

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
    const stripeCheckoutEnabled = runtimeConfig.featureFlags.stripeCheckout;
    const checkoutModalMarkup = stripeCheckoutEnabled
      ? `
          <div id="purchase"></div>

          <div id="checkout-modal" class="checkout-modal" aria-hidden="true">
            <div class="checkout-modal-card" role="dialog" aria-modal="true" aria-labelledby="checkout-modal-title">
              <div class="checkout-modal-header">
                <h3 id="checkout-modal-title" class="text-xl font-bold text-slate-50">Purchase Pro</h3>
                <button id="checkout-close" type="button" class="checkout-close" aria-label="Close checkout">x</button>
              </div>
              <p class="text-sm text-slate-300">
                Pro is focused on advanced workflows: advanced Git UI, advanced Flow Runner, priority support, and advanced data tooling.
              </p>
              <p class="text-xs text-slate-400 mt-2">
                Enter your email, pick a billing cycle, complete the Turnstile check, and continue to Stripe.
              </p>

              <form id="checkout-form" class="checkout-form mt-4" novalidate>
                <input type="hidden" name="tier" value="Pro" />

                <label class="checkout-label" for="checkout-email">Email</label>
                <input
                  id="checkout-email"
                  class="checkout-input"
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  autocomplete="email"
                  required
                />

                <label class="checkout-label" for="checkout-duration">Billing cycle</label>
                <select id="checkout-duration" class="checkout-input" name="durationDays" required>
                  <option value="365" selected>Annual - $50/year (save 17%)</option>
                  <option value="30">Monthly - $5/month</option>
                </select>

                <div id="checkout-turnstile"></div>

                <button id="checkout-submit" type="submit" class="checkout-submit">
                  Continue Purchase
                </button>

                <p id="checkout-status" class="checkout-status" aria-live="polite"></p>
              </form>
            </div>
          </div>
        `
      : '<div id="purchase"></div>';

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
              Insider members get full access as features ship during beta and are guaranteed 12 months of Pro at 1.0 launch.
            </p>
          </div>

          <div class="max-w-xl mx-auto" id="waitlist-embed"></div>

          ${checkoutModalMarkup}

          <div class="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400 pt-4">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Early access available now</span>
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

    const checkoutModal = this.querySelector('#checkout-modal');
    if (checkoutModal) {
      document.body.appendChild(checkoutModal);
    }

    const checkoutCloseButton = checkoutModal ? checkoutModal.querySelector('#checkout-close') : null;
    const checkoutForm = checkoutModal ? checkoutModal.querySelector('#checkout-form') : null;
    const submitButton = checkoutModal ? checkoutModal.querySelector('#checkout-submit') : null;
    const statusNode = checkoutModal ? checkoutModal.querySelector('#checkout-status') : null;
    const emailInput = checkoutModal ? checkoutModal.querySelector('#checkout-email') : null;
    const durationInput = checkoutModal ? checkoutModal.querySelector('#checkout-duration') : null;
    const turnstileHost = checkoutModal ? checkoutModal.querySelector('#checkout-turnstile') : null;
    const turnstileSiteKey = '0x4AAAAAACYrJjdw3pMmUqbM';
    let turnstileWidgetId = null;

    const isCheckoutModalReady = checkoutModal && checkoutCloseButton && checkoutForm && submitButton && statusNode && emailInput && durationInput && turnstileHost;

    if (isCheckoutModalReady) {
      const ensureTurnstile = () => {
        if (!window.turnstile || turnstileWidgetId !== null) {
          return;
        }
        turnstileWidgetId = window.turnstile.render(turnstileHost, {
          sitekey: turnstileSiteKey
        });
      };

      const openCheckoutModal = () => {
        ensureTurnstile();
        checkoutModal.classList.add('is-open');
        checkoutModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('checkout-modal-open');
        statusNode.textContent = '';
        submitButton.disabled = false;
        submitButton.textContent = 'Continue Purchase';
        emailInput.focus();
        if (window.turnstile && turnstileWidgetId !== null) {
          window.turnstile.reset(turnstileWidgetId);
        }
      };

      const closeCheckoutModal = () => {
        checkoutModal.classList.remove('is-open');
        checkoutModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('checkout-modal-open');
      };

      document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element)) {
          return;
        }
        const link = target.closest('a[href="#purchase"]');
        if (!link) {
          return;
        }
        event.preventDefault();
        openCheckoutModal();
      });
      checkoutCloseButton.addEventListener('click', closeCheckoutModal);
      checkoutModal.addEventListener('click', (event) => {
        if (event.target === checkoutModal) {
          closeCheckoutModal();
        }
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && checkoutModal.classList.contains('is-open')) {
          closeCheckoutModal();
        }
      });

      checkoutForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!emailInput.value.trim()) {
          statusNode.textContent = 'Enter an email address to continue.';
          emailInput.focus();
          return;
        }

        if (!emailInput.checkValidity()) {
          statusNode.textContent = 'Enter a valid email address to continue.';
          emailInput.reportValidity();
          return;
        }

        const token = turnstileWidgetId !== null && window.turnstile
          ? window.turnstile.getResponse(turnstileWidgetId)
          : '';
        if (!token) {
          statusNode.textContent = 'Please complete the security check before purchasing.';
          return;
        }

        const durationDays = Number(durationInput.value);
        if (!Number.isFinite(durationDays) || durationDays <= 0) {
          statusNode.textContent = 'Select a valid billing cycle and try again.';
          return;
        }

        statusNode.textContent = 'Creating secure checkout session...';
        submitButton.disabled = true;
        submitButton.textContent = 'Redirecting...';

        const payload = {
          tier: 'Pro',
          durationDays,
          email: emailInput.value.trim(),
          token,
          turnstileToken: token
        };

        try {
          const response = await fetch('https://stripe.apicourier.dev/create-checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify(payload)
          });

          let data = null;
          try {
            data = await response.json();
          } catch {
            data = null;
          }

          if (!response.ok) {
            throw new Error(data?.error?.message || data?.message || 'Checkout failed. Please try again.');
          }

          const checkoutUrl = data?.url || data?.checkoutUrl;
          if (!checkoutUrl) {
            throw new Error('Checkout session was created but no redirect URL was returned.');
          }

          window.location.href = checkoutUrl;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Checkout failed. Please try again.';
          statusNode.textContent = message;
          submitButton.disabled = false;
          submitButton.textContent = 'Continue Purchase';

          if (window.turnstile && turnstileWidgetId !== null) {
            try {
              window.turnstile.reset(turnstileWidgetId);
            } catch {
              // Ignore reset failures and allow users to retry manually.
            }
          }
        }
      });
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
