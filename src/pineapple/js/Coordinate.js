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
      if(vec instanceof Array){
        return new vec2D(width / 2 + vec[0] * ratio, height / 2 - vec[1] * ratio);
      } else if( vec instanceof vec2D) {
        return new vec2D(width / 2 + vec.x * ratio, height / 2 - vec.y * ratio);
      }
      return undefined;
    },
  };
})();
