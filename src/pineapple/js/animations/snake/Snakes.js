import { AppleSnakes as AS, AppleSnakesLeaf as ASL } from "../../Data.js";
import Snake from "./Snake.js";
import * as Colors from "../../Colors.js";

export default class Snakes {
  constructor(frames) {
    this.frames = frames;
    this.snakes = [
      new Snake(
        frames,
        0,
        AS.slice(0, 28),
        [80, 15, 80, 10, 1, 12, 81],
        [Colors.ORANGE, Colors.RED, Colors.PURPLE, Colors.BLUE, Colors.LIGHTGREEN],
        // rotation AS.slice(28).concat(AS.slice(0, 28))
      ),
      new Snake(
        frames,
        0.5,
        AS.slice(29).concat(AS.slice(0, 1)).reverse(),
        [3, 1, 4],
        [Colors.ORANGE, Colors.YELLOW, Colors.LIGHTGREEN]
        // rotation AS.slice(28).concat(AS.slice(0, 28))
      ),
      new Snake(
        frames,
        0.5,
        AS.slice(29).concat(AS.slice(0, 1)).reverse(),
        [3, 1, 4],
        [Colors.ORANGE, Colors.YELLOW, Colors.LIGHTGREEN]
      ),
      new Snake(frames, 0.75, ASL.lower, [1, 0], [Colors.LIGHTGREEN, Colors.YELLOW]),
      new Snake(frames, 0.5, ASL.lower.concat(ASL.upper), [1, 1], [Colors.BLUE, Colors.LIGHTGREEN]),
    ];
  }

  getFrames() {
    return this.frames;
  }

  redraw(ctx, frame) {
    this.snakes.forEach((snake) => snake.redraw(ctx, frame));
  }
}
