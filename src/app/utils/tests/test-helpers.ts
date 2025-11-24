// test-helpers.ts
export async function waitForSignal<T>(
  getter: () => T,
  expected: T,
  timeout = 5000,
  interval = 50
): Promise<void> {
  const start = Date.now();
  while (getter() !== expected) {
    if (Date.now() - start > timeout) {
      throw new Error(`Timeout waiting for signal to equal ${expected}`);
    }
    await new Promise(res => setTimeout(res, interval));
  }
}
