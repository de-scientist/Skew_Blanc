/**
 * Mock API client.
 *
 * The QLexNursing backend already exists. This client simulates network
 * latency so the UI behaves like a production app. Replace `request` with a
 * real `fetch` call to `process.env.NEXT_PUBLIC_API_URL` when wiring the
 * backend — the service functions below already expose the contract.
 */
/**
 * Artificial latency for the mock backend. It exists purely so loading
 * states (route-level skeletons) are visibly demoable. The real API will
 * have its own network latency, so this can be removed when wiring the
 * backend.
 */
export const DEMO_DELAY_MS = 900;

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
