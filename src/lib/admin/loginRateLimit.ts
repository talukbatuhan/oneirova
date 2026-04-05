const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 12;

type Entry = { fails: number; windowEnd: number };

const store = new Map<string, Entry>();

function prune(now: number): void {
  for (const [k, e] of store) {
    if (now > e.windowEnd) store.delete(k);
  }
}

export function clientKeyFromHeaders(h: { get(name: string): string | null }): string {
  const xf = h.get("x-forwarded-for");
  if (xf) {
    const first = xf.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip")?.trim() || "unknown";
}

export function isLoginRateLimited(clientKey: string): boolean {
  const now = Date.now();
  prune(now);
  const e = store.get(clientKey);
  if (!e || now > e.windowEnd) return false;
  return e.fails >= MAX_FAILURES;
}

export function registerLoginFailure(clientKey: string): void {
  const now = Date.now();
  prune(now);
  let e = store.get(clientKey);
  if (!e || now > e.windowEnd) {
    e = { fails: 1, windowEnd: now + WINDOW_MS };
  } else {
    e = { fails: e.fails + 1, windowEnd: e.windowEnd };
  }
  store.set(clientKey, e);
}

export function clearLoginFailures(clientKey: string): void {
  store.delete(clientKey);
}
