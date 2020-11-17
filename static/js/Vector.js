export function vec2D(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

export function vec3D(x, y) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

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

vec3D.prototype = {
  negative: function() {
    return new vec3D(-this.x, -this.y, -this.z);
  },
  add: function(v) {
    if (v instanceof vec3D) return new vec3D(this.x + v.x, this.y + v.y, this.z + v.z);
    else return new vec3D(this.x + v, this.y + v, this.z + v);
  },
  subtract: function(v) {
    if (v instanceof vec3D) return new vec3D(this.x - v.x, this.y - v.y, this.z - v.z);
    else return new vec3D(this.x - v, this.y - v, this.z - v);
  },
  multiply: function(v) {
    if (v instanceof vec3D) return new vec3D(this.x * v.x, this.y * v.y, this.z * v.z);
    else return new vec3D(this.x * v, this.y * v, this.z * v);
  },
  divide: function(v) {
    if (v instanceof vec3D) return new vec3D(this.x / v.x, this.y / v.y, this.z / v.z);
    else return new vec3D(this.x / v, this.y / v, this.z / v);
  },
  equals: function(v) {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  },
  dot: function(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },
  cross: function(v) {
    return new vec3D(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  },
  length: function() {
    return Math.sqrt(this.dot(this));
  },
  unit: function() {
    return this.divide(this.length());
  },
  min: function() {
    return Math.min(Math.min(this.x, this.y), this.z);
  },
  max: function() {
    return Math.max(Math.max(this.x, this.y), this.z);
  },
  toAngles: function() {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length())
    };
  },
  angleTo: function(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  },
  toArray: function(n) {
    return [this.x, this.y, this.z].slice(0, n || 3);
  },
  clone: function() {
    return new vec3D(this.x, this.y, this.z);
  },
  init: function(x, y, z) {
    this.x = x; this.y = y; this.z = z;
    return this;
  }
};

vec3D.negative = function(a, b) {
  b.x = -a.x; b.y = -a.y; b.z = -a.z;
  return b;
};
vec3D.add = function(a, b, c) {
  if (b instanceof vec3D) { c.x = a.x + b.x; c.y = a.y + b.y; c.z = a.z + b.z; }
  else { c.x = a.x + b; c.y = a.y + b; c.z = a.z + b; }
  return c;
};
vec3D.subtract = function(a, b, c) {
  if (b instanceof vec3D) { c.x = a.x - b.x; c.y = a.y - b.y; c.z = a.z - b.z; }
  else { c.x = a.x - b; c.y = a.y - b; c.z = a.z - b; }
  return c;
};
vec3D.multiply = function(a, b, c) {
  if (b instanceof vec3D) { c.x = a.x * b.x; c.y = a.y * b.y; c.z = a.z * b.z; }
  else { c.x = a.x * b; c.y = a.y * b; c.z = a.z * b; }
  return c;
};
vec3D.divide = function(a, b, c) {
  if (b instanceof vec3D) { c.x = a.x / b.x; c.y = a.y / b.y; c.z = a.z / b.z; }
  else { c.x = a.x / b; c.y = a.y / b; c.z = a.z / b; }
  return c;
};
vec3D.cross = function(a, b, c) {
  c.x = a.y * b.z - a.z * b.y;
  c.y = a.z * b.x - a.x * b.z;
  c.z = a.x * b.y - a.y * b.x;
  return c;
};
vec3D.unit = function(a, b) {
  var length = a.length();
  b.x = a.x / length;
  b.y = a.y / length;
  b.z = a.z / length;
  return b;
};
vec3D.fromAngles = function(theta, phi) {
  return new vec3D(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
};
vec3D.randomDirection = function() {
  return vec3D.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
};
vec3D.min = function(a, b) {
  return new vec3D(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
};
vec3D.max = function(a, b) {
  return new vec3D(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
};
vec3D.lerp = function(a, b, fraction) {
  return b.subtract(a).multiply(fraction).add(a);
};
vec3D.fromArray = function(a) {
  return new vec3D(a[0], a[1], a[2]);
};
vec3D.angleBetween = function(a, b) {
  return a.angleTo(b);
};