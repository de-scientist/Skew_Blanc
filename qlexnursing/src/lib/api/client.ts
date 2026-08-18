/**
 * Mock API client.
 *
 * The QLexNursing backend already exists. This client simulates network
 * latency so the UI behaves like a production app. Replace `request` with a
 * real `fetch` call to `process.env.NEXT_PUBLIC_API_URL` when wiring the
 * backend — the service functions below already expose the contract.
 */
export async function request<T>(data: T, delayMs = 250): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredCloneSafe(data)), delayMs);
  });
}

function structuredCloneSafe<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
}
