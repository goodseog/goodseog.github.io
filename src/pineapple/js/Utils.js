export function movingPoint(edges) {
  let frames = 60; // 60 Hz
  let heights = [];
  let curr = 0.0;
  for (let edge = 0; edge < edges; edge++) {
    let next = Math.random() * 0.8 + 0.1;
    for (let i = 0; i < frames; i++) {
      heights.push((curr * (frames - i) + next * i) / frames);
    }
    curr = next;
  }

  for (let i = 0; i <= frames; i++) {
    heights.push((curr * (frames - i)) / frames);
  }

  return heights;
}
