// Runs once per server instance (Node.js and Edge runtimes) before any request
// is handled. Replaces the global `fetch` so every server-side network call fails.
export function register() {
  const blockedFetch: typeof fetch = async (input) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url;
    throw new TypeError(`fetch failed: network access is disabled (${url})`);
  };

  globalThis.fetch = blockedFetch;
}
