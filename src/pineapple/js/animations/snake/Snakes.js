import { AppleSnakeBody as ASB, AppleSnakeLeaf as ASL } from "../../Data.js";
import Snake from "./Snake.js";
import * as Colors from "../../Colors.js";
import Coord from "../../Coordinate.js";

export default class Snakes {
  constructor(drawFrames, keepFrames, popFrames) {
    this.drawFrames = drawFrames;
    this.keepFrames = keepFrames;
    this.popFrames = popFrames;

    this.snakes = [
      new Snake(
        ASB.map((point) => Coord.getPos(point)), // path
        3, // start point from
        [66, 10, 77, 10, 2, 10, 60], // [218] by real length
        [Colors.ORANGE, Colors.RED, Colors.PURPLE, Colors.BLUE, Colors.LIGHTGREEN]
      ),
      new Snake(
        ASB.map((point) => Coord.getPos(point)), // path
        3, // start point from
        [40, 13, 50], // by real length
        [Colors.ORANGE, Colors.YELLOW, Colors.LIGHTGREEN]
      ),
    ];
    this.snakesDrawStart = [0, parseInt(drawFrames * 0.4)];
    this.snakesDrawSpeed = [1.1, -1.06];
  }

  getFrames() {
    return this.drawFrames + this.keepFrames + this.popFrames;
  }

  redraw(ctx, frame) {
    if (frame == 0) {
      this.snakes.forEach((snake) => snake.init());
    }

    if (frame < this.drawFrames) {
      this.snakes.forEach(
        (snake, idx) => {
          frame >= this.snakesDrawStart[idx] && snake.move(this.snakesDrawSpeed[idx])
        }
      );
      this.snakes.forEach((snake) => snake.redraw(ctx));
    } 
    else if (frame < this.drawFrames + this.keepFrames) {
      this.snakes.forEach((snake) => snake.redraw(ctx, frame));
    } 
    else {
      this.snakes.forEach((snake) => snake.move(0.2));
      this.snakes.forEach((snake) => snake.redraw(ctx, frame));
    }
  }
}
