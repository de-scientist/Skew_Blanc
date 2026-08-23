/**
 * Mock API client.
 *
 * The Nursora backend already exists. This client simulates network
 * latency so the UI behaves like a production app. Replace `request` with a
 * real `fetch` call to `process.env.NEXT_PUBLIC_API_URL` when wiring the
 * backend — the service functions below already expose the contract.
 */
/**
 * Artificial latency for the mock backend. It exists purely so loading
 * states (route-level skeletons) are visibly demoable. Tunable without code
 * changes via NEXT_PUBLIC_DEMO_DELAY_MS (milliseconds); defaults to 900ms.
 * Set it to 0 to disable. The real API will have its own network latency, so
 * this block can be removed when wiring the backend.
 */
const parsedDelay = Number(process.env.NEXT_PUBLIC_DEMO_DELAY_MS);
export const DEMO_DELAY_MS = Number.isFinite(parsedDelay) && parsedDelay >= 0 ? parsedDelay : 900;

export async function request<T>(data: T, delayMs = DEMO_DELAY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredCloneSafe(data)), delayMs);
  });
}

export function sleep(ms = DEMO_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function structuredCloneSafe<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
}
