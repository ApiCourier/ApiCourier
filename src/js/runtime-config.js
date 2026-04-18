const DEFAULT_RUNTIME_CONFIG = Object.freeze({
  featureFlags: Object.freeze({
    stripeCheckout: false,
    portalTurnstile: false
  }),
  workerBaseUrl: '',
  turnstile: Object.freeze({
    portalSiteKey: ''
  })
});

function coerceFeatureFlags(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return DEFAULT_RUNTIME_CONFIG.featureFlags;
  }

  return Object.freeze({
    stripeCheckout: Boolean(value.stripeCheckout),
    portalTurnstile: Boolean(value.portalTurnstile)
  });
}

function coerceWorkerBaseUrl(value) {
  if (typeof value !== 'string') {
    return DEFAULT_RUNTIME_CONFIG.workerBaseUrl;
  }

  return value.trim();
}

function coerceTurnstile(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return DEFAULT_RUNTIME_CONFIG.turnstile;
  }

  return Object.freeze({
    portalSiteKey: typeof value.portalSiteKey === 'string' ? value.portalSiteKey.trim() : ''
  });
}

export function getRuntimeConfig() {
  const runtimeConfig = window.__APICOURIER_RUNTIME_CONFIG__;
  if (!runtimeConfig || typeof runtimeConfig !== 'object' || Array.isArray(runtimeConfig)) {
    return DEFAULT_RUNTIME_CONFIG;
  }

  return Object.freeze({
    featureFlags: coerceFeatureFlags(runtimeConfig.featureFlags),
    workerBaseUrl: coerceWorkerBaseUrl(runtimeConfig.workerBaseUrl),
    turnstile: coerceTurnstile(runtimeConfig.turnstile)
  });
}
