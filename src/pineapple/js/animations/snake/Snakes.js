import { AppleSnakes as AS, AppleSnakesLeaf as ASL } from "../../Data.js";
import Snake from "./Snake.js";
import * as Colors from "../../Colors.js";

export default class Snakes {
  constructor(frames) {
    this.frames = frames;
    this.snakes = [
      //
      new Snake(
        frames,
        0,
        AS.slice(0, 26),
        [60, 15, 80, 10, 1, 15, 80],
        [Colors.ORANGE, Colors.RED, Colors.PURPLE, Colors.BLUE, Colors.LIGHTGREEN]
      ),
    ];
  }

  getFrames() {
    return this.frames;
  }

  redraw(ctx, frame) {
    this.snakes.forEach((snake) => snake.redraw(ctx, frame));
  }
}
