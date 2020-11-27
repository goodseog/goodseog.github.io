import Ball from "./Ball.js";
import Wall from "./Wall.js";
import Block from "./Block.js";

const EPSILON = 1;

export default function collision(A, B) {
  if (B instanceof Ball) {
    [A, B] = [B, A];
  }

  if (A instanceof Ball) {
    switch (B.constructor.name) {
      case "Ball":
        return ball2ball(A, B);
      case "Wall":
        return ball2wall(A, B);
      case "Block":
        return ball2block(A, B);
    }
  }
  return false;
}

// https://en.wikipedia.org/wiki/Elastic_collision
function ball2ball(b0, b1) {
  var dist = b0.pos.subtract(b1.pos).length();

  if (dist - b0.r - b1.r <= EPSILON) {
    var v1v2 = b0.vel.subtract(b1.vel);
    var x1x2 = b0.pos.subtract(b1.pos);
    var x1x2sq = x1x2.dot(x1x2);
    var mRatio = (2 * b0.m) / (b0.m + b1.m);
    b0.vel = b0.vel.subtract(x1x2.multiply((mRatio * v1v2.dot(x1x2)) / x1x2sq));
    b0.pos = b0.pos.add(b0.vel);
    var v2v1 = v1v2.negative();
    var x2x1 = x1x2.negative();
    var x2x1sq = x1x2sq;
    mRatio = (2 * b1.m) / (b0.m + b1.m);
    b1.vel = b1.vel.subtract(x2x1.multiply((mRatio * v2v1.dot(x2x1)) / x2x1sq));
    b1.pos = b1.pos.add(b1.vel);

    return true;
  }
  return false;
}

function ball2wall(ball, wall) {
  var dist = wall.distance(ball.pos.x, ball.pos.y);
  var near = ball.pos.subtract(wall.normal.multiply(dist));

  if (ball.pos.subtract(wall.start).length() <= ball.r) {
    var newNormS = ball.pos.subtract(wall.start).unit();
    ball.vel = ball.vel.subtract(newNormS.multiply(2 * newNormS.dot(ball.vel)));
    ball.pos = ball.pos.add(ball.vel);
    return true;
  } else if (ball.pos.subtract(wall.end).length() <= ball.r) {
    var newNormE = ball.pos.subtract(wall.end).unit();
    ball.vel = ball.vel.subtract(newNormE.multiply(2 * newNormE.dot(ball.vel)));
    ball.pos = ball.pos.add(ball.vel);
    return true;
  } else if (
    dist - ball.r <= EPSILON &&
    between(wall.start.x, near.x, wall.end.x) &&
    between(wall.start.y, near.y, wall.end.y)
  ) {
    ball.vel = ball.vel.subtract(
      wall.normal.multiply(2 * wall.normal.dot(ball.vel))
    );
    ball.pos = ball.pos.add(ball.vel);
    return true;
  }
  return false;
}

function ball2block(ball, block) {
  for (let i = 0; i < block.walls.length; i++) {
    let wall = block.walls[i];
    if (ball2wall(ball, wall)) {
      return true;
    }
  }
  return false;
}

function between(a, x, b) {
  return (a <= x && x <= b) || (a >= x && x >= b);
}
