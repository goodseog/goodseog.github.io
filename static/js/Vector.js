export class vec2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    neg() {
        return new vec2D(-this.x, -this.y);
    }
    add(v) {
        return new vec2D(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new vec2D(this.x - v.x, this.y - v.y);
    }
    mul(a) {
        return new vec2D(this.x * a, this.y * a);
    }
    div(a) {
        return new vec2D(this.x / a, this.y / a);
    }
    equals(v) {
        return this.x == v.x && this.y == v.y;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    ccw(v) {
        return this.cross(v) > 0;
    }
    length() {
        return Math.sqrt(this.dot(this));
    }
    unit() {
        return this.div(this.length());
    }
    angleTo(to) {
        let from = this.unit();
        to = to.unit();
        return Math.acos(from.dot(to));
    }
    toAngle() {
        let angle = Math.asin(this.y / this.length());
        if (this.x >= 0 && this.y >= 0) {
            return angle;
        }
        else if (this.x <= 0 && this.y >= 0) {
            return Math.PI - angle;
        }
        else if (this.x <= 0 && this.y <= 0) {
            return Math.PI - angle;
        }
        else {
            return 2 * Math.PI + angle;
        }
    }
    rotate(angle) {
        let [sin, cos] = [Math.sin(angle), Math.cos(angle)];
        return new vec2D(cos * this.x - sin * this.y, sin * this.x + cos * this.y);
    }
    static angleBetween(v0, v1) {
        return v0.angleTo(v1);
    }
    static random() {
        return new vec2D(Math.random() - 0.5, Math.random() - 0.5).unit();
    }
    toArray() {
        return [this.x, this.y];
    }
    toDict() {
        return { x: this.x, y: this.y };
    }
}
export class vec3D {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    neg() {
        return new vec3D(-this.x, -this.y, -this.z);
    }
    add(v) {
        return new vec3D(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    sub(v) {
        return new vec3D(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    multiply(a) {
        return new vec3D(this.x * a, this.y * a, this.z * a);
    }
    div(a) {
        return new vec3D(this.x / a, this.y / a, this.z / a);
    }
    equals(v) {
        return this.x == v.x && this.y == v.y && this.z == v.z;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    cross(v) {
        return new vec3D(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    }
    length() {
        return Math.sqrt(this.dot(this));
    }
    unit() {
        return this.div(this.length());
    }
    angleTo(to) {
        let from = this.unit();
        to = to.unit();
        return Math.acos(from.dot(to));
    }
    rotate(axis, angle) {
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
    static angleBetween(v0, v1) {
        return v0.angleTo(v1);
    }
    static random() {
        return new vec3D(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).unit();
    }
    toArray() {
        return [this.x, this.y, this.z];
    }
    toDict() {
        return { x: this.x, y: this.y, z: this.z };
    }
}
