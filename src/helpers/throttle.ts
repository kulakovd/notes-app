export function throttle<ARGS extends any[]>(func: (...args: ARGS) => void, timeout: number) {
  let timer: number | null = null;
  return function (...args: ARGS) {
    if (timer != null) return;
    // `window.setTimeout` has proper return type (number)
    // while `setTimeout` has `NodeJS.Timeout`
    timer = window.setTimeout(() => {
      func(...args);
      if (timer == null) return;
      window.clearTimeout(timer);
      timer = null;
    }, timeout);
  }
}
