import { vec2D } from "/static/js/Vector.js";

const stemRatio = 0.01;
const branch2stem = 0.35;
const branchCount = 80;
const branchStart = 7;
const branchStartJitter = 0.02;
const branchAngle = Math.PI / 3;
const branchAngleJitter = Math.PI / 60;
const recurseLevel = 2;
const animateTime = 5000;

function myRand() {
  return (Math.random() - 0.5) * 2;
}

function scaler(val) {
  let threshold = 0.4;
  let power = 0.3;
  return val < threshold ? val : val ** power - threshold ** power + threshold;
}

export default class Tree {
  constructor(createTime, start, height) {
    this.createTime = Date.now() + createTime;
    this.start = start;
    this.direction = new vec2D(0, -height);
    this.branches = this.genBranches(0, this.start, this.direction, 0);
  }

  genBranches(startTime, start, direction, level) {
    let genBranchesLR = (i, LR) => {
      let ratio = i / (branchCount + 3);
      let newStartTime = startTime + (animateTime - startTime) * ratio;
      let newStart = start.add(direction.multiply(ratio + branchStartJitter * myRand()));
      let newDir = direction
        .rotate(LR * branchAngle + myRand() * branchAngleJitter)
        .unit()
        .multiply(branch2stem * scaler(1 - ratio) * direction.length());
      return this.genBranches(newStartTime, newStart, newDir, level + 1);
    };

    let branches = [new Branch(startTime, animateTime, start, direction)];
    if (level < recurseLevel) {
      for (let i = branchStart; i < branchCount + 3; i++) {
        branches = branches.concat(genBranchesLR(i, +1));
        branches = branches.concat(genBranchesLR(i, -1));
      }
    }
    return branches;
  }

  redraw(ctx) {
    let currentTime = Date.now() - this.createTime;
    if (currentTime < 0) {
      return;
    }
    this.branches.forEach((branch) => {
      branch.redraw(ctx, currentTime);
    });
  }
}

class Branch {
  constructor(startTime, endTime, start, direction) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.start = start;
    this.direction = direction;
  }

  redraw(ctx, currentTime) {
    let progress = (currentTime - this.startTime) / (this.endTime - this.startTime);
    if (progress < 0) return;
    progress = Math.min(progress, 1.0);

    let vert = new vec2D(this.direction.y, -this.direction.x);
    vert = vert.multiply(stemRatio * progress);

    let bot0 = this.start.subtract(vert);
    let bot1 = this.start.add(vert);
    let top = this.start.add(this.direction.multiply(progress));

    // ctx.beginPath();
    // ctx.moveTo(this.start.x, this.start.y);
    // ctx.lineTo(top.x, top.y);
    // ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bot0.x, bot0.y);
    ctx.lineTo(bot1.x, bot1.y);
    ctx.lineTo(top.x, top.y);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fill();
  }
}
