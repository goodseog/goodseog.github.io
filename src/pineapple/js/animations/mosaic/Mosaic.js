import RoundLine from "./RoundLine.js";
import Bow from "./Bow.js";
import Complex from "./Complex.js";
import Background from "./Background.js";
import * as Colors from "../../Colors.js";

export default class Mosaic {
  constructor(appear, stay, disappear) {
    this.appear = appear;
    this.stay = stay;
    this.disappear = disappear;

    this.pieces = [
      new Background(appear, stay, disappear, [0, 0], Colors.YELLOW, 0.0),
      new Complex(
        appear,
        stay,
        disappear,
        [0, -0.1],
        0.42,
        Colors.DEEPBLUE,
        0.2
      ),
      new RoundLine(
        appear,
        stay,
        disappear,
        [0.015, 0.256],
        0.115,
        8,
        Colors.BLUE,
        [0]
      ),
      new RoundLine(
        appear,
        stay,
        disappear,
        [0.0815, 0.3135],
        0.0,
        15,
        Colors.ORANGE,
        [+0.02, -0.02]
      ),
      new Bow(
        appear,
        stay,
        disappear,
        [0.02, 0.3],
        0.07,
        1.5,
        Colors.DARKVIOLET,
        [-0.05, +0.07, -0.03]
      ),
      new Bow(
        appear,
        stay,
        disappear,
        [0.036, 0.24],
        0.1,
        3,
        Colors.DARKVIOLET,
        [0.05, -0.07, 0.03],
        false
      ),
      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.25, +0.03],
        0.115,
        24,
        Colors.LIGHTGREEN,
        [0.02, -0.02]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.02, +0.12],
        0.0,
        12,
        Colors.RED,
        [+0.05, -0.05]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.115, +0.085],
        0.06,
        18,
        Colors.DARKVIOLET,
        [0.05, -0.07, 0.03]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.22, -0.14],
        0.0,
        20,
        Colors.LIGHTGREEN,
        [+0.07, -0.07]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.265, -0.065],
        0.05,
        20,
        Colors.DARKVIOLET,
        [-0.05, +0.04]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.05, -0.03],
        0.19,
        14,
        Colors.DARKVIOLET,
        [0.05, -0.07, 0.03]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.145, +0.08],
        0.02,
        4,
        Colors.ORANGE,
        [+0.04, -0.04]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.215, -0.225],
        0.08,
        20,
        Colors.DARKVIOLET,
        [-0.01, +0.01]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.26, -0.02],
        0.14,
        20,
        Colors.ORANGE,
        [0.01, -0.07, 0.03]
      ),

      new Bow(
        appear,
        stay,
        disappear,
        [-0.19, -0.023],
        0.06,
        3,
        Colors.DARKVIOLET,
        [0.01, -0.02, 0.01]
      ),

      new Bow(
        appear,
        stay,
        disappear,
        [0.14, -0.35],
        0.14,
        4,
        Colors.DARKVIOLET,
        [0.01, -0.03, +0.02],
        false
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.1, -0.325],
        0.14,
        15,
        Colors.ORANGE,
        [+0.08, -0.07]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.135, -0.36],
        0.08,
        8,
        Colors.BLUE,
        [0.03, -0.03]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.286, -0.2],
        0.0,
        7,
        Colors.BLUE,
        [-0.02, +0.02]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.0, -0.33],
        0.08,
        10,
        Colors.DARKVIOLET,
        [-0.03, +0.0]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.185, -0.325],
        0.06,
        10,
        Colors.RED,
        [-0.01, +0.01]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.135, -0.345],
        0.235,
        12,
        Colors.DARKVIOLET,
        [0.0]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [-0.17, -0.26],
        0.06,
        7,
        Colors.LIGHTGREEN,
        [+0.03, -0.04]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.09, -0.21],
        0.0,
        13,
        Colors.YELLOW,
        [-0.03, +0.02, +0.01]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.16, -0.15],
        0.0,
        11,
        Colors.RED,
        [+0.01, -0.02, +0.01]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.06, -0.11],
        0.0,
        16,
        Colors.ORANGE,
        [-0.03, -0.03, +0.06]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.1, -0.17],
        0.05,
        5,
        Colors.ORANGE,
        [0]
      ),

      new Bow(
        appear,
        stay,
        disappear,
        [+0.03, -0.216],
        0.05,
        2.5,
        Colors.BLUE,
        [-0.03, +0.03]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.01, -0.06],
        0.0,
        16,
        Colors.RED,
        [-0.05, +0.01, +0.01]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.18, -0.07],
        0.11,
        10,
        Colors.RED,
        [+0.02, -0.02]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.14, +0.0],
        0.115,
        8,
        Colors.ORANGE,
        [+0.02, -0.02]
      ),

      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.03, -0.08],
        0.12,
        4,
        Colors.LIGHTGREEN,
        [+0.04, -0.01, -0.03]
      ),
      new RoundLine(
        appear,
        stay,
        disappear,
        [+0.25, -0.07],
        0.0,
        20,
        Colors.LIGHTGREEN,
        [-0.03, +0.03]
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
