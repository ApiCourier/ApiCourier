import { getRuntimeConfig } from './runtime-config.js';

const runtimeConfig = getRuntimeConfig();
const form = document.getElementById('billing-portal-form');
const emailInput = document.getElementById('billing-portal-email');
const submitButton = document.getElementById('billing-portal-submit');
const statusNode = document.getElementById('billing-portal-status');
const turnstileHost = document.getElementById('billing-portal-turnstile');

const workerBaseUrl = runtimeConfig.workerBaseUrl;
const portalSessionEndpoint = buildPortalSessionEndpoint(workerBaseUrl);
const portalTurnstileEnabled = runtimeConfig.featureFlags.portalTurnstile;
const portalTurnstileSiteKey = runtimeConfig.turnstile.portalSiteKey;
let portalTurnstileWidgetId = null;

function buildPortalSessionEndpoint(baseUrl) {
  if (!baseUrl) {
    return '';
  }

  try {
    return new URL('/create-portal-session', baseUrl).toString();
  } catch {
    return '';
  }
}

function renderPortalTurnstileWithRetry(renderAttempt = 0) {
  if (!portalTurnstileEnabled || !turnstileHost || !portalTurnstileSiteKey) {
    return null;
  }

  if (window.turnstile) {
    portalTurnstileWidgetId = window.turnstile.render(turnstileHost, {
      sitekey: portalTurnstileSiteKey
    });
    return portalTurnstileWidgetId;
  }

  if (renderAttempt >= 20) {
    console.warn('[billing-portal] Turnstile script was not ready after retries.');
    return null;
  }

  window.setTimeout(() => {
    renderPortalTurnstileWithRetry(renderAttempt + 1);
  }, 250);

  return null;
}

async function createPortalSession(email, turnstileToken) {
  if (!portalSessionEndpoint) {
    throw new Error('Unable to open billing portal. Please try again.');
  }

  const payload = {
    email: email.trim()
  };

  if (turnstileToken) {
    payload.turnstileToken = turnstileToken;
  }

  const response = await fetch(portalSessionEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    mode: 'cors',
    credentials: 'omit',
    body: JSON.stringify(payload)
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    console.warn('[billing-portal] Portal session request failed.', {
      status: response.status,
      statusText: response.statusText,
      hasServerMessage: Boolean(data?.error?.message || data?.message)
    });
    throw new Error(data?.error?.message || data?.message || 'Unable to open billing portal. Please try again.');
  }

  const url = data?.url || data?.portalUrl;
  if (!url) {
    throw new Error('Billing portal URL was not returned by the server.');
  }

  return url;
}

if (form && emailInput && submitButton && statusNode) {
  renderPortalTurnstileWithRetry();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    if (!email) {
      statusNode.textContent = 'Enter the billing email used at checkout.';
      emailInput.focus();
      return;
    }

    if (!emailInput.checkValidity()) {
      statusNode.textContent = 'Enter a valid billing email.';
      emailInput.reportValidity();
      return;
    }

    const turnstileToken = portalTurnstileEnabled && portalTurnstileWidgetId !== null && window.turnstile
      ? window.turnstile.getResponse(portalTurnstileWidgetId)
      : '';
    if (portalTurnstileEnabled && !turnstileToken) {
      statusNode.textContent = 'Please complete the security check before continuing.';
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Opening...';
    statusNode.textContent = 'Creating secure billing portal session...';

    try {
      const portalUrl = await createPortalSession(email, turnstileToken);
      window.location.href = portalUrl;
    } catch (error) {
      console.error('[billing-portal] Failed to create portal session.', {
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      statusNode.textContent = error instanceof Error ? error.message : 'Unable to open billing portal. Please try again.';
      submitButton.disabled = false;
      submitButton.textContent = 'Open Billing Portal';
    }
  });
}
