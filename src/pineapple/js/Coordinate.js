export default (function () {
  let width = undefined;
  let height = undefined;
  let ratio = 30;

  return {
    resize: function (stageWidth, stageHeight) {
      width = stageWidth;
      height = stageHeight;
      ratio = width / 2;
    },
    getPos: function (x, y) {
      return [width / 2 + x * ratio, height / 2 - y * ratio];
    },
  };
})();
