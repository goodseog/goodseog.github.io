export default (function () {
  let width = undefined;
  let height = undefined;

  return {
    resize: function (stageWidth, stageHeight) {
      width = stageWidth;
      height = stageHeight;
    },
    getPos: function (x, y) {
      return [width / 2 + (width / 18) * x, height / 2 - (height / 32) * y];
    },
  };
})();
