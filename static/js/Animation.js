/*
https://easings.net/ko
*/

export function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

export function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

export function easeInPower(x, p) {
  return x ** p;
}
