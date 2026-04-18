export async function onRequest(context) {
	const response = await context.next();

	const contentType = response.headers.get("content-type") || "";
	if (!contentType.includes("text/html")) {
		return response;
	}

	const env = context.env || {};

	const runtimeConfig = {
		workerBaseUrl: typeof env.APICOURIER_WORKER_BASE_URL === "string"
			? env.APICOURIER_WORKER_BASE_URL.trim()
			: "",
		featureFlags: {
			stripeCheckout: env.APICOURIER_FEATURE_STRIPE_CHECKOUT === "true",
			portalTurnstile: env.APICOURIER_FEATURE_PORTAL_TURNSTILE === "true"
		},
		turnstile: {
			portalSiteKey: typeof env.APICOURIER_TURNSTILE_PORTAL_SITE_KEY === "string"
				? env.APICOURIER_TURNSTILE_PORTAL_SITE_KEY.trim()
				: ""
		}
	};

	const serialized = JSON.stringify(runtimeConfig)
		.replace(/</g, "\\u003c")
		.replace(/>/g, "\\u003e")
		.replace(/&/g, "\\u0026")
		.replace(/\u2028/g, "\\u2028")
		.replace(/\u2029/g, "\\u2029");

	const injected = `<script>window.__APICOURIER_RUNTIME_CONFIG__=${serialized};</script>`;

	return new HTMLRewriter()
		.on("head", {
			element(element) {
				element.prepend(injected, { html: true });
			}
		})
		.transform(response);
}
