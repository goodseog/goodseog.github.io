import { AppleSnakes as AS, AppleSnakesLeaf as ASL } from "../../Data.js";
import Snake from "./Snake.js";
import * as Colors from "../../Colors.js";

export default class Snakes {
  constructor(frames) {
    this.frames = frames;
    this.snakes = [
      //
      new Snake(frames, 0, AS.slice(0, 26), 8, [
        [0.0, Colors.PURPLE],
        [0.2, Colors.RED],
        [1.0, Colors.ORANGE],
      ]),
      // new Snake(ASL.lower),
      // new Snake(ASL.upper),
    ];
  }

  getFrames() {
    return this.frames;
  }

  redraw(ctx, frame) {
    this.snakes.forEach((snake) => snake.redraw(ctx, frame));
  }
}
