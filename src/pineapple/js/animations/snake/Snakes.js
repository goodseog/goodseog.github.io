import { AppleSnakeBody as ASB, AppleSnakeLeaf as ASL } from "../../Data.js";
import Snake from "./Snake.js";
import * as Colors from "../../Colors.js";
import Coord from "../../Coordinate.js";

export default class Snakes {
  constructor(drawFrames, keepFrames, popFrames) {
    this.drawFrames = drawFrames;
    this.keepFrames = keepFrames;
    this.popFrames = popFrames;

    this.snakesDrawSpeed = [+1, -1, +1, +1];
    this.snakesDrawStart = [
      0,
      parseInt(drawFrames * 0.56),
      parseInt(drawFrames * 0.8),
      parseInt(drawFrames * 0.61),
    ];
    this.snakesDrawLineDash = [
      [60, 10, 67, 10, 3, 10, 70, 0],
      [4, 1, 4],
      [1],
      [1, 1],
    ]
    this.snakesPopSpeed = +0.2;
    // this.snakesDraw
    this.preprocessing();

    this.snakes = [
      new Snake(
        ASB.map((point) => Coord.getPos(point)), // path
        0, // start point from
        this.snakesDrawLineDash[0],
        [Colors.ORANGE, Colors.RED, Colors.PURPLE, Colors.BLUE, Colors.LIGHTGREEN]
      ),
      new Snake(
        ASB.map((point) => Coord.getPos(point)), // path
        0, // start point from
        this.snakesDrawLineDash[1], // by real length
        [Colors.ORANGE, Colors.YELLOW, Colors.LIGHTGREEN]
      ),      
      new Snake(
        ASL.map((point) => Coord.getPos(point)), // path
        0, // start point from
        this.snakesDrawLineDash[2], // by real length
        [Colors.LIGHTGREEN, Colors.YELLOW]
      ),
      new Snake(
        ASL.map((point) => Coord.getPos(point)), // path
        0, // start point from
        this.snakesDrawLineDash[3], // by real length
        [Colors.BLUE, Colors.LIGHTGREEN]
      ),
    ];
  }

  preprocessing(){
    const RATIO = 0.39;
    let height = Coord.getHeight();
    this.snakesDrawSpeed = this.snakesDrawSpeed.map(
      (speed) => (speed * RATIO * height) / this.drawFrames
    );
    this.snakesDrawLineDash = this.snakesDrawLineDash.map((lineDash, idx) => {
      let totalLine = lineDash.reduce((a, b) => a + b);
      return lineDash.map(
        (dash) => (dash / totalLine) * (this.drawFrames - this.snakesDrawStart[idx])
      );
    });
    this.snakesPopSpeed = (this.snakesPopSpeed * RATIO * height) / this.drawFrames;
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
      this.snakes.forEach((snake, idx) => snake.move(this.snakesPopSpeed));
      this.snakes.forEach((snake) => snake.redraw(ctx, frame));
    }
  }
}
