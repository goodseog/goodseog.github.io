export default class Mosaic {
  constructor(appear, stay, disappear) {
    this.appear = appear;
    this.stay = stay;
    this.disappear = disappear

    this.pieces = [];
  }

  getFrames() {
    return this.appear + this.stay + this.disappear;
  }

  redraw(ctx, frame) {
    if (frame < this.appear) {
      this.pieces.forEach((piece) => piece.redraw(ctx, frame));
    } else if (frame < this.appear + this.stay) {
      this.pieces.forEach((piece) => piece.redraw(ctx, frame));
    } else {
      this.pieces.forEach((piece) => piece.redraw(ctx, frame));
    }
  }
}
