// Provides a simple 3D vec2D class. vec2D operations can be done using member
// functions, which return new vec2Ds, or static functions, which reuse
// existing vec2Ds to avoid generating garbage.
export function vec2D(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

// ### Instance Methods
// The methods `add()`, `subtract()`, `multiply()`, and `divide()` can all
// take either a vec2D or a number as an argument.
vec2D.prototype = {
  negative: function() {
    return new vec2D(-this.x, -this.y);
  },
  add: function(v) {
    if (v instanceof vec2D) return new vec2D(this.x + v.x, this.y + v.y);
    else return new vec2D(this.x + v, this.y + v);
  },
  subtract: function(v) {
    if (v instanceof vec2D) return new vec2D(this.x - v.x, this.y - v.y);
    else return new vec2D(this.x - v, this.y - v);
  },
  multiply: function(v) {
    if (v instanceof vec2D) return new vec2D(this.x * v.x, this.y * v.y);
    else return new vec2D(this.x * v, this.y * v);
  },
  divide: function(v) {
    if (v instanceof vec2D) return new vec2D(this.x / v.x, this.y / v.y);
    else return new vec2D(this.x / v, this.y / v);
  },
  equals: function(v) {
    return this.x == v.x && this.y == v.y;
  },
  dot: function(v) {
    return this.x * v.x + this.y * v.y;
  },
  length: function() {
    return Math.sqrt(this.dot(this));
  },
  unit: function() {
    return this.divide(this.length());
  },
  toAngles: function() {
    return {
      phi: Math.asin(this.y / this.length())
    };
  },
  angleTo: function(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  },
  toArray: function(n) {
    return [this.x, this.y].slice(0, n || 2);
  },
  clone: function() {
    return new vec2D(this.x, this.y);
  },
  init: function(x, y) {
    this.x = x; this.y = y;
    return this;
  }
};

// ### Static Methods
// `vec2D.randomDirection()` returns a vec2D with a length of 1 and a
// statistically uniform direction. `vec2D.lerp()` performs linear
// interpolation between two vec2Ds.
vec2D.negative = function(a, b) {
  b.x = -a.x; b.y = -a.y;
  return b;
};
vec2D.add = function(a, b, c) {
  if (b instanceof vec2D) { c.x = a.x + b.x; c.y = a.y + b.y; }
  else { c.x = a.x + b; c.y = a.y + b; }
  return c;
};
vec2D.subtract = function(a, b, c) {
  if (b instanceof vec2D) { c.x = a.x - b.x; c.y = a.y - b.y;}
  else { c.x = a.x - b; c.y = a.y - b; }
  return c;
};
vec2D.multiply = function(a, b, c) {
  if (b instanceof vec2D) { c.x = a.x * b.x; c.y = a.y * b.y; }
  else { c.x = a.x * b; c.y = a.y * b; }
  return c;
};
vec2D.divide = function(a, b, c) {
  if (b instanceof vec2D) { c.x = a.x / b.x; c.y = a.y / b.y; }
  else { c.x = a.x / b; c.y = a.y / b; }
  return c;
};
vec2D.unit = function(a, b) {
  var length = a.length();
  b.x = a.x / length;
  b.y = a.y / length;
  return b;
};
vec2D.fromAngles = function(theta, phi) {
  return new vec2D(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
};
vec2D.randomDirection = function() {
  return vec2D.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
};
vec2D.lerp = function(a, b, fraction) {
  return b.subtract(a).multiply(fraction).add(a);
};
vec2D.fromArray = function(a) {
  return new vec2D(a[0], a[1], a[2]);
};
vec2D.angleBetween = function(a, b) {
  return a.angleTo(b);
};