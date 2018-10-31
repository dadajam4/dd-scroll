export const HAS_WINDOW = typeof window !== undefined;

let windowIsLoaded = false;
HAS_WINDOW &&
  window.addEventListener(
    'load',
    function onload() {
      windowIsLoaded = true;
      window.removeEventListener('load', onload, false);
    },
    false,
  );

export const loadWindow = (): Promise<void> => {
  if (windowIsLoaded) return Promise.resolve();
  return new Promise(resolve => {
    window.addEventListener(
      'load',
      function onload() {
        window.removeEventListener('load', onload, false);
        resolve();
      },
      false,
    );
  });
};

export function warn(message: string): void {
  if (typeof console === 'object' && console.warn) {
    console.warn(`[dd-scroller] ${message}`);
  }
}

export function error(message: string): Error {
  return new Error(`[dd-scroller] ${message}`);
}
