import { vec2D } from "/static/js/Vector.js";

export default (function () {
  let width = undefined;
  let height = undefined;
  let ratio = 30;

  return {
    resize: function (stageWidth, stageHeight) {
      width = stageWidth;
      height = stageHeight;
      ratio = stageWidth / 2;
    },
    getPos: function (vec) {
      return new vec2D(width / 2 + vec.x * ratio, height / 2 - vec.y * ratio);
    },
  };
})();
