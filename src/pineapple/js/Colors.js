export const LIGHTGREEN = "rgb(115, 185, 68)";
export const YELLOW = "rgb(247, 194, 22)";
export const ORANGE = "rgb(231, 142, 36)";
export const RED = "rgb(204, 51, 56)";
export const PURPLE = "rgb(144, 46, 125)";
export const BLUE = "rgb(14, 151, 211)";

export function gradient(start, end, count){
  start = start.slice(4, -1).split(',').map(str => parseInt(str))
  end = end.slice(4, -1).split(',').map(str => parseInt(str))

  return Array.from(new Array(count).keys()).map(idx => {
    let ratio = idx / count;
    let r = start[0] * (1 - ratio) + end[0] * ratio
    let g = start[1] * (1 - ratio) + end[1] * ratio
    let b = start[2] * (1 - ratio) + end[2] * ratio
    return `rgb(${r}, ${g}, ${b})`
  })
}

export function getColorAt(colors, ratio) {
  let step = 1 / (colors.length - 1);
  let cursor = 0;
  while (!(cursor * step <= ratio && ratio < (cursor + 1) * step)) cursor++;

  let newRatio = (ratio - cursor * step) / step;
  let start = colors[cursor]
    .slice(4, -1)
    .split(",")
    .map((str) => parseInt(str));
  let end = colors[cursor + 1]
    .slice(4, -1)
    .split(",")
    .map((str) => parseInt(str));
  let r = start[0] * (1 - newRatio) + end[0] * newRatio;
  let g = start[1] * (1 - newRatio) + end[1] * newRatio;
  let b = start[2] * (1 - newRatio) + end[2] * newRatio;
  return `rgb(${r}, ${g}, ${b})`;
}