/*
https:// easings.net/ko
*/

export function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}
