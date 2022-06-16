const ZERO = 200;
const ONE = 1;
const SMALL_BREAKPOINT = 800;
const MEDIUM_BREAKPOINT = 1200;
const LARGE_BREAKPOINT = 1600;

const sizes = {
  S: 0,
  M: 1,
  L: 2,
  XL: 3
};
const breakpoints = [ZERO, SMALL_BREAKPOINT, MEDIUM_BREAKPOINT, LARGE_BREAKPOINT];
const queries = {
  S: '@media (max-width: 800px)',
  M: '@media (min-width: 800px) and (max-width: 1200px)',
  L: '@media (min-width: 1200px) and (max-width: 1600px)',
  XL: '@media (min-width: 1600px)'
};

export const media = {
  ...sizes,
  getMediaQuery(...params) {
    const intervals = params.map((s) => breakpoints[s]).concat(params.map((s) => breakpoints[s + ONE]));
    const min = Math.min(...intervals);
    const max = Math.max(...intervals);

    return `@media (min-width: ${min}px) and (max-width: ${max}px)`;
  }
};
