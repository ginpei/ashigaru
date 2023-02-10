export function tick(timeout = 1): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, timeout);
  });
}
