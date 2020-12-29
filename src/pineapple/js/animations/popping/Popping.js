import { AppleSnakeBody as ASB, AppleSnakeLeaf as ASL } from "../../Data.js";
import Coords from "../../Coordinate.js";
import * as Colors from "../../Colors.js";

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Composites = Matter.Composites;
const Runner = Matter.Runner;

export default class Popping {
  constructor(appear, disappear) {
    this.appear = appear;
    this.disappear = disappear;
    this.convexs = [];
    this.element = document.querySelector("#display");
  }

  getFrames() {
    return this.appear + this.disappear;
  }

  redraw(ctx, frame) {
    if (frame == 0) {
      this.setupWorld();
    } else if (frame === parseInt(this.appear * 0.1)) {
      this.addRandomBalls(this.world, [0.75, 0.94], 6);
      console.log("pop");
    } else if (frame === parseInt(this.appear * 0.2)) {
      this.addRandomBalls(this.world, [1.0, 0.94], 6);
      this.addRandomBalls(this.world, [1.03, 0.78], 2); // leaf
      console.log("pop");
    } else if (frame === parseInt(this.appear * 0.4)) {
      this.addRandomBalls(this.world, [0.875, 0.89], 6);
      this.addRandomBalls(this.world, [1.031, 0.78], 2); // leaf
      console.log("pop");
    } else if (frame === parseInt(this.appear * 0.6)) {
      this.addRandomBalls(this.world, [0.73, 0.89], 6);
      this.addRandomBalls(this.world, [1.033, 0.78], 2); // leaf
      console.log("pop");
    } else if (frame === parseInt(this.appear * 0.7)) {
      this.addRandomBalls(this.world, [1.0, 0.89], 6);
      console.log("pop");
    } else if (frame === this.appear) {
      this.engine.timing.timeScale = 1.0;
      this.convexs.forEach((convex) => Matter.Composite.remove(this.world, convex));

      World.add(this.world, this.meteor);
    }
    if (frame == this.getFrames() - 1) {
      console.log("flush");
      console.log(this.element);
      console.log(this.render.canvas);

      World.clear(this.world);
      Engine.clear(this.engine);
      Render.stop(this.render);
      Runner.stop(this.runner);
      this.element.removeChild(this.render.canvas);
      this.render.canvas.remove();
      this.render.canvas = null;
      this.render.context = null;
    }
  }

  setupWorld() {
    let w = Coords.getWidth();
    let h = Coords.getHeight();

    this.convex = [];
    this.engine = Engine.create();
    this.engine.timing.timeScale = 0.2;
    this.world = this.engine.world;

    this.render = Render.create({
      element: this.element,
      engine: this.engine,
      options: {
        width: Coords.getWidth(),
        height: Coords.getHeight(),
        background: "black",
        wireframeBackground: "black",
        wireframes: false,
      },
    });
    Render.run(this.render);

    this.runner = Runner.create();
    Runner.run(this.runner, this.engine);

    this.addBallBoundary(this.world, ASB);
    this.addBallBoundary(this.world, ASL);
    this.meteor = Bodies.circle(w / 2, h - 10, 30 * h / 800, {
      render: {
        fillStyle: "black",
      },
    });
    Body.setVelocity(this.meteor, { x: 0, y: -15 });
  }

  addRandomBalls(world, pos, count) {
    let c = Coords.getPos([0, 0]);
    let height = Coords.getHeight();
    World.add(
      world,
      Composites.stack(c.x * pos[0], c.y * pos[1], count, count, 0, 0, function (x, y) {
        let color = Colors.getRandomColor();
        let circle = Bodies.circle(x, y, ((5 * Math.random() + 2) * height) / 800, {
          render: {
            fillStyle: color,
            strokeStyle: "black",
            lineWidth: 1,
          },
        });
        let vel = {
          x: 4 * (Math.random() - 0.5),
          y: 4 * (Math.random() - 0.5),
        };
        Body.setVelocity(circle, vel);
        return circle;
      })
    );
  }

  addBallBoundary(world, points) {
    let bodies = points.map((p) => Coords.getPos(p)).reverse();
    let options = {
      isStatic: true,
      render: {
        fillStyle: "black",
        strokeStyle: "black",
        lineWidth: 1,
      },
    };

    bodies
      .slice(1)
      .concat(bodies.slice(0, 1))
      .map((p0, idx) => {
        let thick = 7;
        let p1 = bodies[idx];
        let norm = p1
          .subtract(p0)
          .unit()
          .multiply(thick / 2)
          .rotate(-0.5 * Math.PI);
        let c = p0.multiply(0.5).add(p1.multiply(0.5)).add(norm.multiply(1.5));

        let verts = [
          p1.multiply(1.5).subtract(p0.multiply(0.5)).toJson(),
          p0.multiply(1.5).subtract(p1.multiply(0.5)).toJson(),
          p0.add(norm.multiply(thick / 2)).toJson(),
          p1.add(norm.multiply(thick / 2)).toJson(),
        ];
        let convex = Bodies.fromVertices(c.x, c.y, verts, options);
        this.convexs.push(convex);
        World.add(world, convex);
      });
  }

  convToVert(paths) {
    let center = Coords.getPos(0, 0);
    let vertices = paths.map((p) => Coords.getPos(p));
    return vertices;
  }
}
