export class vec2D {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  neg(): vec2D {
    return new vec2D(-this.x, -this.y);
  }

  add(v: vec2D): vec2D {
    return new vec2D(this.x + v.x, this.y + v.y);
  }

  sub(v: vec2D): vec2D {
    return new vec2D(this.x - v.x, this.y - v.y);
  }

  mul(a: number): vec2D {
    return new vec2D(this.x * a, this.y * a);
  }

  div(a: number): vec2D {
    return new vec2D(this.x / a, this.y / a);
  }

  equals(v: vec2D) {
    return this.x == v.x && this.y == v.y;
  }

  dot(v: vec2D): number {
    return this.x * v.x + this.y * v.y;
  }

  cross(v: vec2D): number {
    return this.x * v.y - this.y * v.x;
  }

  ccw(v: vec2D): boolean {
    return this.cross(v) > 0;
  }

  length(): number {
    return Math.sqrt(this.dot(this));
  }

  unit(): vec2D {
    return this.div(this.length());
  }

  angleTo(to: vec2D): number {
    let from = this.unit();
    to = to.unit();
    return Math.acos(from.dot(to));
  }

  toAngle(): number {
    let angle = Math.asin(this.y / this.length());
    if (this.x >= 0 && this.y >= 0) {
      return angle;
    } else if (this.x <= 0 && this.y >= 0) {
      return Math.PI - angle;
    } else if (this.x <= 0 && this.y <= 0) {
      return Math.PI - angle;
    } else {
      return 2 * Math.PI + angle;
    }
  }

  rotate(angle: number) {
    let [sin, cos] = [Math.sin(angle), Math.cos(angle)];
    return new vec2D(cos * this.x - sin * this.y, sin * this.x + cos * this.y);
  }

  static angleBetween(v0: vec3D, v1: vec3D) {
    return v0.angleTo(v1);
  }

  static random() {
    return new vec2D(Math.random() - 0.5, Math.random() - 0.5).unit();
  }

  toArray(): Array<number> {
    return [this.x, this.y];
  }

  toDict() {
    return { x: this.x, y: this.y };
  }
}

export class vec3D {
  x: number;
  y: number;
  z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  neg(): vec3D {
    return new vec3D(-this.x, -this.y, -this.z);
  }

  add(v: vec3D): vec3D {
    return new vec3D(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  sub(v: vec3D): vec3D {
    return new vec3D(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  multiply(a: number): vec3D {
    return new vec3D(this.x * a, this.y * a, this.z * a);
  }

  div(a: number): vec3D {
    return new vec3D(this.x / a, this.y / a, this.z / a);
  }

  equals(v: vec3D) {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  }

  dot(v: vec3D): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v: vec3D): vec3D {
    return new vec3D(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  length(): number {
    return Math.sqrt(this.dot(this));
  }

  unit(): vec3D {
    return this.div(this.length());
  }

  angleTo(to: vec3D): number {
    let from = this.unit();
    to = to.unit();
    return Math.acos(from.dot(to));
  }

  rotate(axis: vec3D, angle: number) {
    let u = axis.unit();
    let [sin, cos] = [Math.sin(angle), Math.cos(angle)];
    let mcos = 1 - cos;
    const [ux, uy, uz] = [u.x, u.y, u.z];
    const [ux2, uy2, uz2] = [ux * ux, uy * uy, uz * uz];
    const [uxy, uyz, uzx] = [ux * uy, uy * uz, uz * ux];

    let mat = [
      new vec3D(cos + ux2 * mcos, uxy * mcos - uz * sin, uzx * mcos + uy * sin),
      new vec3D(uxy * mcos + uz * sin, cos + uy2 * mcos, uyz * mcos - ux * sin),
      new vec3D(uzx * mcos - uy * sin, uyz * mcos + ux * sin, cos + uz2 * mcos),
    ];

    return new vec3D(mat[0].dot(this), mat[1].dot(this), mat[2].dot(this));
  }

  static angleBetween(v0: vec3D, v1: vec3D) {
    return v0.angleTo(v1);
  }

  static random() {
    return new vec3D(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).unit();
  }

  toArray(): Array<number> {
    return [this.x, this.y, this.z];
  }

  toDict() {
    return { x: this.x, y: this.y, z: this.z };
  }
}
