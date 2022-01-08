export function debounce<ARGS extends any[]>(func: (...args: ARGS) => void, timeout: number) {
  let lastCall: number | null = null;
  let timer: number | null = null;
  return function(...args: ARGS) {
    let prevCall = lastCall;
    lastCall = Date.now();
    if (prevCall != null && lastCall - prevCall <= timeout && timer != null) {
      window.clearTimeout(timer);
    }
    // `window.setTimeout` has proper return type (number)
    // while `setTimeout` has `NodeJS.Timeout`
    timer = window.setTimeout(() => {
      func(...args);
      timer = null;
    }, timeout);
  }
}
