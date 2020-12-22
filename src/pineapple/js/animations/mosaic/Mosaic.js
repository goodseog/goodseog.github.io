import RoundLine from "./RoundLine.js";
import Bow from "./Bow.js";
import * as Colors from "../../Colors.js";

export default class Mosaic {
  constructor(appear, stay, disappear) {
    this.appear = appear;
    this.stay = stay;
    this.disappear = disappear;

    this.pieces = [
      new RoundLine(appear, stay, disappear, [0, 0], [0.1, 0.1], 20, Colors.ORANGE),
      new RoundLine(appear, stay, disappear, [-0.2, 0], [0.5, 0.7], 5, Colors.BLUE),
      new RoundLine(appear, stay, disappear, [0.3, 0.3], [0.3, 0.3], 30, Colors.RED),
      new Bow(appear, stay, disappear, [-0.3, 0.3], [0.0, 0.6], 5, Colors.PURPLE),
    ];
  }

  getFrames() {
    return this.appear + this.stay + this.disappear;
  }

  redraw(ctx, frame) {
    this.pieces.forEach((piece) => piece.redraw(ctx, frame));
  }
}
