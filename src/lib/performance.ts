export const debounce = (callback: VoidFunction, delay: number = 150) => {
  let timer: ReturnType<typeof setTimeout>;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
};

export const throttle = (
  func: (...args: unknown[]) => void,
  delay: number = 250
) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: unknown[]) => {
    if (timer) return;

    timer = setTimeout(() => {
      func(...args);
      timer = null;
    }, delay);
  };
};
