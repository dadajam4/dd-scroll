export const HAS_WINDOW = typeof window !== undefined;

export function warn(message: string): void {
  if (typeof console === 'object' && console.warn) {
    console.warn(`[dd-scroller] ${message}`);
  }
}

export function error(message: string): Error {
  return new Error(`[dd-scroller] ${message}`);
}
