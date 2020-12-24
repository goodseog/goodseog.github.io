import RoundLine from "./RoundLine.js";
import Bow from "./Bow.js";
import * as Colors from "../../Colors.js";
import Complex from "./Complex.js";

export default class Mosaic {
  constructor(appear, stay, disappear) {
    this.appear = appear;
    this.stay = stay;
    this.disappear = disappear;

    this.pieces = [
      new Complex(appear, stay, disappear, [0, -0.1], 0.42, Colors.BLUE),
      new RoundLine(
        appear,
        stay,
        disappear,
        [0.015, 0.256],
        0.115,
        8,
        Colors.BLUE,
        [[0, 0]]
      ),
      new RoundLine(
        appear,
        stay,
        disappear,
        [0.0815, 0.3135],
        0.0,
        15,
        Colors.ORANGE,
        [[0, 0]]
      ),
      new Bow(appear, stay, disappear, [0.02, 0.3], 0.07, 1.5, Colors.PURPLE, [
        [[0, 0]],
      ]),
      new Bow(
        appear,
        stay,
        disappear,
        [0.035, 0.24],
        0.11,
        1.5,
        Colors.PURPLE,
        [[0, 0]],
        false
      ),

      new Bow(
        appear,
        stay,
        disappear,
        [-0.285, +0.065],
        0.105,
        12,
        Colors.YELLOW,
        [[0, 0]]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.24, +0.055],
        0.105,
        24,
        Colors.LIGHTGREEN,
        [[0, 0]]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.05, +0.15],
        0.0,
        16,
        Colors.RED,
        [[0, 0]]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.115, +0.085],
        0.06,
        18,
        Colors.PURPLE,
        [[0, 0]]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.265, -0.065],
        0.05,
        20,
        Colors.PURPLE,
        [[0, 0]]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.05, -0.03],
        0.19,
        14,
        Colors.PURPLE,
        [[0, 0]]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.175, +0.145],
        0.0,
        8,
        Colors.YELLOW,
        [[0, 0]]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.215, -0.225],
        0.08,
        20,
        Colors.PURPLE,
        [[0, 0]]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.26, -0.02],
        0.14,
        20,
        Colors.ORANGE,
        [[0, 0]]
      ),

      new Bow(
        appear,
        stay,
        disappear,
        [-0.175, -0.035],
        0.07,
        7,
        Colors.PURPLE,
        [[0, 0]]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.275, -0.175],
        0.2,
        5,
        Colors.BLUE,
        [[0, 0]]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.0, -0.08],
        0.0,
        20,
        Colors.RED,
        [[0, 0]]
      ),
    ];
  }

  getFrames() {
    return this.appear + this.stay + this.disappear;
  }

  redraw(ctx, frame) {
    this.pieces.forEach((piece) => piece.redraw(ctx, frame));
  }
}
