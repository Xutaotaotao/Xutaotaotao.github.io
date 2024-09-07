import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-ULBN3QDT.js";

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len5 = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len5) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len5 - 1); i < len5; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length5 = listeners.length, j;
        for (i = 0; i < length5; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len5) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len5 - 1); j < len5; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length5 = listeners.length; i < length5; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter2;
    }
  }
});

// node_modules/tslib/tslib.es6.mjs
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step2(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step2(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step2(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step2((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step2([n, v]);
    };
  }
  function step2(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_2 = 0)), _2) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _2.label++;
          return { value: op[1], done: false };
        case 5:
          _2.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _2.ops.pop();
          _2.trys.pop();
          continue;
        default:
          if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _2 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _2.label = op[1];
            break;
          }
          if (op[0] === 6 && _2.label < t[1]) {
            _2.label = t[1];
            t = op;
            break;
          }
          if (t && _2.label < t[2]) {
            _2.label = t[2];
            _2.ops.push(op);
            break;
          }
          if (t[2]) _2.ops.pop();
          _2.trys.pop();
          continue;
      }
      op = body.call(thisArg, _2);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

// node_modules/eventemitter3/index.mjs
var import_index = __toESM(require_eventemitter3(), 1);
var eventemitter3_default = import_index.default;

// node_modules/gl-matrix/esm/common.js
var EPSILON = 1e-6;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
var RANDOM = Math.random;
var degree = Math.PI / 180;
if (!Math.hypot) Math.hypot = function() {
  var y = 0, i = arguments.length;
  while (i--) {
    y += arguments[i] * arguments[i];
  }
  return Math.sqrt(y);
};

// node_modules/gl-matrix/esm/mat3.js
var mat3_exports = {};
__export(mat3_exports, {
  add: () => add,
  adjoint: () => adjoint,
  clone: () => clone,
  copy: () => copy,
  create: () => create,
  determinant: () => determinant,
  equals: () => equals,
  exactEquals: () => exactEquals,
  frob: () => frob,
  fromMat2d: () => fromMat2d,
  fromMat4: () => fromMat4,
  fromQuat: () => fromQuat,
  fromRotation: () => fromRotation,
  fromScaling: () => fromScaling,
  fromTranslation: () => fromTranslation,
  fromValues: () => fromValues,
  identity: () => identity,
  invert: () => invert,
  mul: () => mul,
  multiply: () => multiply,
  multiplyScalar: () => multiplyScalar,
  multiplyScalarAndAdd: () => multiplyScalarAndAdd,
  normalFromMat4: () => normalFromMat4,
  projection: () => projection,
  rotate: () => rotate,
  scale: () => scale,
  set: () => set,
  str: () => str,
  sub: () => sub,
  subtract: () => subtract,
  translate: () => translate,
  transpose: () => transpose
});
function create() {
  var out = new ARRAY_TYPE(9);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }
  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
function clone(a) {
  var out = new ARRAY_TYPE(9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new ARRAY_TYPE(9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function transpose(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }
  return out;
}
function invert(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20;
  var det = a00 * b01 + a01 * b11 + a02 * b21;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
function adjoint(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}
function determinant(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
function multiply(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  var b00 = b[0], b01 = b[1], b02 = b[2];
  var b10 = b[3], b11 = b[4], b12 = b[5];
  var b20 = b[6], b21 = b[7], b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
function translate(out, a, v) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
function rotate(out, a, rad) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
function scale(out, a, v) {
  var x = v[0], y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}
function fromRotation(out, rad) {
  var s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = -s;
  out[4] = c;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;
  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;
  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}
function fromQuat(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
function normalFromMat4(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
function str(a) {
  return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
}
function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
function multiplyScalarAndAdd(out, a, b, scale7) {
  out[0] = a[0] + b[0] * scale7;
  out[1] = a[1] + b[1] * scale7;
  out[2] = a[2] + b[2] * scale7;
  out[3] = a[3] + b[3] * scale7;
  out[4] = a[4] + b[4] * scale7;
  out[5] = a[5] + b[5] * scale7;
  out[6] = a[6] + b[6] * scale7;
  out[7] = a[7] + b[7] * scale7;
  out[8] = a[8] + b[8] * scale7;
  return out;
}
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}
function equals(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
}
var mul = multiply;
var sub = subtract;

// node_modules/gl-matrix/esm/mat4.js
var mat4_exports = {};
__export(mat4_exports, {
  add: () => add2,
  adjoint: () => adjoint2,
  clone: () => clone2,
  copy: () => copy2,
  create: () => create2,
  determinant: () => determinant2,
  equals: () => equals2,
  exactEquals: () => exactEquals2,
  frob: () => frob2,
  fromQuat: () => fromQuat3,
  fromQuat2: () => fromQuat2,
  fromRotation: () => fromRotation2,
  fromRotationTranslation: () => fromRotationTranslation,
  fromRotationTranslationScale: () => fromRotationTranslationScale,
  fromRotationTranslationScaleOrigin: () => fromRotationTranslationScaleOrigin,
  fromScaling: () => fromScaling2,
  fromTranslation: () => fromTranslation2,
  fromValues: () => fromValues2,
  fromXRotation: () => fromXRotation,
  fromYRotation: () => fromYRotation,
  fromZRotation: () => fromZRotation,
  frustum: () => frustum,
  getRotation: () => getRotation,
  getScaling: () => getScaling,
  getTranslation: () => getTranslation,
  identity: () => identity2,
  invert: () => invert2,
  lookAt: () => lookAt,
  mul: () => mul2,
  multiply: () => multiply2,
  multiplyScalar: () => multiplyScalar2,
  multiplyScalarAndAdd: () => multiplyScalarAndAdd2,
  ortho: () => ortho,
  orthoNO: () => orthoNO,
  orthoZO: () => orthoZO,
  perspective: () => perspective,
  perspectiveFromFieldOfView: () => perspectiveFromFieldOfView,
  perspectiveNO: () => perspectiveNO,
  perspectiveZO: () => perspectiveZO,
  rotate: () => rotate2,
  rotateX: () => rotateX,
  rotateY: () => rotateY,
  rotateZ: () => rotateZ,
  scale: () => scale2,
  set: () => set2,
  str: () => str2,
  sub: () => sub2,
  subtract: () => subtract2,
  targetTo: () => targetTo,
  translate: () => translate2,
  transpose: () => transpose2
});
function create2() {
  var out = new ARRAY_TYPE(16);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
function clone2(a) {
  var out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function copy2(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function fromValues2(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function set2(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function identity2(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function transpose2(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a03 = a[3];
    var a12 = a[6], a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }
  return out;
}
function invert2(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
function adjoint2(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
function determinant2(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
function multiply2(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
function translate2(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }
  return out;
}
function scale2(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function rotate2(out, a, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len5 = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;
  if (len5 < EPSILON) {
    return null;
  }
  len5 = 1 / len5;
  x *= len5;
  y *= len5;
  z *= len5;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11];
  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c;
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;
  if (a !== out) {
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}
function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  if (a !== out) {
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
function fromTranslation2(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromScaling2(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotation2(out, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len5 = Math.hypot(x, y, z);
  var s, c, t;
  if (len5 < EPSILON) {
    return null;
  }
  len5 = 1 / len5;
  x *= len5;
  y *= len5;
  z *= len5;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotationTranslation(out, q, v) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromQuat2(out, a) {
  var translation = new ARRAY_TYPE(3);
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw;
  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }
  fromRotationTranslation(out, a, translation);
  return out;
}
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
function getRotation(out, mat) {
  var scaling = new ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;
  if (trace > 0) {
    S = Math.sqrt(trace + 1) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }
  return out;
}
function fromRotationTranslationScale(out, q, v, s) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
function fromQuat3(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
function perspectiveNO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}
var perspective = perspectiveNO;
function perspectiveZO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = far * nf;
    out[14] = far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -near;
  }
  return out;
}
function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
  var xScale = 2 / (leftTan + rightTan);
  var yScale = 2 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = yScale;
  out[6] = 0;
  out[7] = 0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near / (near - far);
  out[15] = 0;
  return out;
}
function orthoNO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
var ortho = orthoNO;
function orthoZO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = near * nf;
  out[15] = 1;
  return out;
}
function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len5;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];
  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity2(out);
  }
  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len5 = 1 / Math.hypot(z0, z1, z2);
  z0 *= len5;
  z1 *= len5;
  z2 *= len5;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len5 = Math.hypot(x0, x1, x2);
  if (!len5) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len5 = 1 / len5;
    x0 *= len5;
    x1 *= len5;
    x2 *= len5;
  }
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len5 = Math.hypot(y0, y1, y2);
  if (!len5) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len5 = 1 / len5;
    y0 *= len5;
    y1 *= len5;
    y2 *= len5;
  }
  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
function targetTo(out, eye, target, up) {
  var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
  var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
  var len5 = z0 * z0 + z1 * z1 + z2 * z2;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
    z0 *= len5;
    z1 *= len5;
    z2 *= len5;
  }
  var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
  len5 = x0 * x0 + x1 * x1 + x2 * x2;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
    x0 *= len5;
    x1 *= len5;
    x2 *= len5;
  }
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
function str2(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
function frob2(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
function add2(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
function subtract2(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
function multiplyScalar2(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
function multiplyScalarAndAdd2(out, a, b, scale7) {
  out[0] = a[0] + b[0] * scale7;
  out[1] = a[1] + b[1] * scale7;
  out[2] = a[2] + b[2] * scale7;
  out[3] = a[3] + b[3] * scale7;
  out[4] = a[4] + b[4] * scale7;
  out[5] = a[5] + b[5] * scale7;
  out[6] = a[6] + b[6] * scale7;
  out[7] = a[7] + b[7] * scale7;
  out[8] = a[8] + b[8] * scale7;
  out[9] = a[9] + b[9] * scale7;
  out[10] = a[10] + b[10] * scale7;
  out[11] = a[11] + b[11] * scale7;
  out[12] = a[12] + b[12] * scale7;
  out[13] = a[13] + b[13] * scale7;
  out[14] = a[14] + b[14] * scale7;
  out[15] = a[15] + b[15] * scale7;
  return out;
}
function exactEquals2(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
function equals2(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
  var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
  var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
  var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
  var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
}
var mul2 = multiply2;
var sub2 = subtract2;

// node_modules/gl-matrix/esm/quat.js
var quat_exports = {};
__export(quat_exports, {
  add: () => add5,
  calculateW: () => calculateW,
  clone: () => clone5,
  conjugate: () => conjugate,
  copy: () => copy5,
  create: () => create5,
  dot: () => dot3,
  equals: () => equals5,
  exactEquals: () => exactEquals5,
  exp: () => exp,
  fromEuler: () => fromEuler,
  fromMat3: () => fromMat3,
  fromValues: () => fromValues5,
  getAngle: () => getAngle,
  getAxisAngle: () => getAxisAngle,
  identity: () => identity3,
  invert: () => invert3,
  len: () => len3,
  length: () => length3,
  lerp: () => lerp3,
  ln: () => ln,
  mul: () => mul5,
  multiply: () => multiply5,
  normalize: () => normalize3,
  pow: () => pow,
  random: () => random3,
  rotateX: () => rotateX3,
  rotateY: () => rotateY3,
  rotateZ: () => rotateZ3,
  rotationTo: () => rotationTo,
  scale: () => scale5,
  set: () => set5,
  setAxes: () => setAxes,
  setAxisAngle: () => setAxisAngle,
  slerp: () => slerp,
  sqlerp: () => sqlerp,
  sqrLen: () => sqrLen3,
  squaredLength: () => squaredLength3,
  str: () => str5
});

// node_modules/gl-matrix/esm/vec3.js
var vec3_exports = {};
__export(vec3_exports, {
  add: () => add3,
  angle: () => angle,
  bezier: () => bezier,
  ceil: () => ceil,
  clone: () => clone3,
  copy: () => copy3,
  create: () => create3,
  cross: () => cross,
  dist: () => dist,
  distance: () => distance,
  div: () => div,
  divide: () => divide,
  dot: () => dot,
  equals: () => equals3,
  exactEquals: () => exactEquals3,
  floor: () => floor,
  forEach: () => forEach,
  fromValues: () => fromValues3,
  hermite: () => hermite,
  inverse: () => inverse,
  len: () => len,
  length: () => length,
  lerp: () => lerp,
  max: () => max,
  min: () => min,
  mul: () => mul3,
  multiply: () => multiply3,
  negate: () => negate,
  normalize: () => normalize,
  random: () => random,
  rotateX: () => rotateX2,
  rotateY: () => rotateY2,
  rotateZ: () => rotateZ2,
  round: () => round,
  scale: () => scale3,
  scaleAndAdd: () => scaleAndAdd,
  set: () => set3,
  sqrDist: () => sqrDist,
  sqrLen: () => sqrLen,
  squaredDistance: () => squaredDistance,
  squaredLength: () => squaredLength,
  str: () => str3,
  sub: () => sub3,
  subtract: () => subtract3,
  transformMat3: () => transformMat3,
  transformMat4: () => transformMat4,
  transformQuat: () => transformQuat,
  zero: () => zero
});
function create3() {
  var out = new ARRAY_TYPE(3);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}
function clone3(a) {
  var out = new ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
function fromValues3(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function copy3(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function set3(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function add3(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
function subtract3(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
function multiply3(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
function scale3(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
function scaleAndAdd(out, a, b, scale7) {
  out[0] = a[0] + b[0] * scale7;
  out[1] = a[1] + b[1] * scale7;
  out[2] = a[2] + b[2] * scale7;
  return out;
}
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
function inverse(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  return out;
}
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len5 = x * x + y * y + z * z;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
  }
  out[0] = a[0] * len5;
  out[1] = a[1] * len5;
  out[2] = a[2] * len5;
  return out;
}
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cross(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2];
  var bx = b[0], by = b[1], bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function random(out, scale7) {
  scale7 = scale7 || 1;
  var r = RANDOM() * 2 * Math.PI;
  var z = RANDOM() * 2 - 1;
  var zScale = Math.sqrt(1 - z * z) * scale7;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale7;
  return out;
}
function transformMat4(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
function transformMat3(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
function transformQuat(out, a, q) {
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var x = a[0], y = a[1], z = a[2];
  var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
  var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
function rotateX2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateY2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateZ2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2];
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function angle(a, b) {
  var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}
function str3(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
function exactEquals3(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
function equals3(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2];
  var b0 = b[0], b1 = b[1], b2 = b[2];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
}
var sub3 = subtract3;
var mul3 = multiply3;
var div = divide;
var dist = distance;
var sqrDist = squaredDistance;
var len = length;
var sqrLen = squaredLength;
var forEach = function() {
  var vec = create3();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 3;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }
    return a;
  };
}();

// node_modules/gl-matrix/esm/vec4.js
var vec4_exports = {};
__export(vec4_exports, {
  add: () => add4,
  ceil: () => ceil2,
  clone: () => clone4,
  copy: () => copy4,
  create: () => create4,
  cross: () => cross2,
  dist: () => dist2,
  distance: () => distance2,
  div: () => div2,
  divide: () => divide2,
  dot: () => dot2,
  equals: () => equals4,
  exactEquals: () => exactEquals4,
  floor: () => floor2,
  forEach: () => forEach2,
  fromValues: () => fromValues4,
  inverse: () => inverse2,
  len: () => len2,
  length: () => length2,
  lerp: () => lerp2,
  max: () => max2,
  min: () => min2,
  mul: () => mul4,
  multiply: () => multiply4,
  negate: () => negate2,
  normalize: () => normalize2,
  random: () => random2,
  round: () => round2,
  scale: () => scale4,
  scaleAndAdd: () => scaleAndAdd2,
  set: () => set4,
  sqrDist: () => sqrDist2,
  sqrLen: () => sqrLen2,
  squaredDistance: () => squaredDistance2,
  squaredLength: () => squaredLength2,
  str: () => str4,
  sub: () => sub4,
  subtract: () => subtract4,
  transformMat4: () => transformMat42,
  transformQuat: () => transformQuat2,
  zero: () => zero2
});
function create4() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }
  return out;
}
function clone4(a) {
  var out = new ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function fromValues4(x, y, z, w) {
  var out = new ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function copy4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function set4(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function add4(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
function subtract4(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
function multiply4(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
function divide2(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
function ceil2(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
function floor2(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
function min2(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
function max2(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
function round2(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
function scale4(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
function scaleAndAdd2(out, a, b, scale7) {
  out[0] = a[0] + b[0] * scale7;
  out[1] = a[1] + b[1] * scale7;
  out[2] = a[2] + b[2] * scale7;
  out[3] = a[3] + b[3] * scale7;
  return out;
}
function distance2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
function squaredDistance2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
function length2(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
function squaredLength2(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
function negate2(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
function inverse2(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  out[3] = 1 / a[3];
  return out;
}
function normalize2(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len5 = x * x + y * y + z * z + w * w;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
  }
  out[0] = x * len5;
  out[1] = y * len5;
  out[2] = z * len5;
  out[3] = w * len5;
  return out;
}
function dot2(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
function cross2(out, u, v, w) {
  var A3 = v[0] * w[1] - v[1] * w[0], B3 = v[0] * w[2] - v[2] * w[0], C3 = v[0] * w[3] - v[3] * w[0], D2 = v[1] * w[2] - v[2] * w[1], E2 = v[1] * w[3] - v[3] * w[1], F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E2 + J * D2;
  out[1] = -(G * F) + I * C3 - J * B3;
  out[2] = G * E2 - H * C3 + J * A3;
  out[3] = -(G * D2) + H * B3 - I * A3;
  return out;
}
function lerp2(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
function random2(out, scale7) {
  scale7 = scale7 || 1;
  var v1, v2, v3, v4;
  var s1, s2;
  do {
    v1 = RANDOM() * 2 - 1;
    v2 = RANDOM() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);
  do {
    v3 = RANDOM() * 2 - 1;
    v4 = RANDOM() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);
  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale7 * v1;
  out[1] = scale7 * v2;
  out[2] = scale7 * v3 * d;
  out[3] = scale7 * v4 * d;
  return out;
}
function transformMat42(out, a, m) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
function transformQuat2(out, a, q) {
  var x = a[0], y = a[1], z = a[2];
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z;
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
function zero2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  return out;
}
function str4(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
function exactEquals4(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function equals4(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
}
var sub4 = subtract4;
var mul4 = multiply4;
var div2 = divide2;
var dist2 = distance2;
var sqrDist2 = squaredDistance2;
var len2 = length2;
var sqrLen2 = squaredLength2;
var forEach2 = function() {
  var vec = create4();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 4;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }
    return a;
  };
}();

// node_modules/gl-matrix/esm/quat.js
function create5() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  out[3] = 1;
  return out;
}
function identity3(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2;
  var s = Math.sin(rad / 2);
  if (s > EPSILON) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
}
function getAngle(a, b) {
  var dotproduct = dot3(a, b);
  return Math.acos(2 * dotproduct * dotproduct - 1);
}
function multiply5(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = b[0], by = b[1], bz = b[2], bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
function rotateX3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
function rotateY3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var by = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
function rotateZ3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bz = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
function calculateW(out, a) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
  return out;
}
function exp(out, a) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var et = Math.exp(w);
  var s = r > 0 ? et * Math.sin(r) / r : 0;
  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);
  return out;
}
function ln(out, a) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var t = r > 0 ? Math.atan2(r, w) / r : 0;
  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
  return out;
}
function pow(out, a, b) {
  ln(out, a);
  scale5(out, out, b);
  exp(out, out);
  return out;
}
function slerp(out, a, b, t) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = b[0], by = b[1], bz = b[2], bw = b[3];
  var omega, cosom, sinom, scale0, scale1;
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  if (cosom < 0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  if (1 - cosom > EPSILON) {
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    scale0 = 1 - t;
    scale1 = t;
  }
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
function random3(out) {
  var u1 = RANDOM();
  var u2 = RANDOM();
  var u3 = RANDOM();
  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
  return out;
}
function invert3(out, a) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var dot6 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot6 ? 1 / dot6 : 0;
  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
function fromMat3(out, m) {
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;
  if (fTrace > 0) {
    fRoot = Math.sqrt(fTrace + 1);
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }
  return out;
}
function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;
  return out;
}
function str5(a) {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
var clone5 = clone4;
var fromValues5 = fromValues4;
var copy5 = copy4;
var set5 = set4;
var add5 = add4;
var mul5 = multiply5;
var scale5 = scale4;
var dot3 = dot2;
var lerp3 = lerp2;
var length3 = length2;
var len3 = length3;
var squaredLength3 = squaredLength2;
var sqrLen3 = squaredLength3;
var normalize3 = normalize2;
var exactEquals5 = exactEquals4;
var equals5 = equals4;
var rotationTo = function() {
  var tmpvec3 = create3();
  var xUnitVec3 = fromValues3(1, 0, 0);
  var yUnitVec3 = fromValues3(0, 1, 0);
  return function(out, a, b) {
    var dot6 = dot(a, b);
    if (dot6 < -0.999999) {
      cross(tmpvec3, xUnitVec3, a);
      if (len(tmpvec3) < 1e-6) cross(tmpvec3, yUnitVec3, a);
      normalize(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot6 > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot6;
      return normalize3(out, out);
    }
  };
}();
var sqlerp = function() {
  var temp1 = create5();
  var temp2 = create5();
  return function(out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
var setAxes = function() {
  var matr = create();
  return function(out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize3(out, fromMat3(out, matr));
  };
}();

// node_modules/gl-matrix/esm/vec2.js
var vec2_exports = {};
__export(vec2_exports, {
  add: () => add6,
  angle: () => angle2,
  ceil: () => ceil3,
  clone: () => clone6,
  copy: () => copy6,
  create: () => create6,
  cross: () => cross3,
  dist: () => dist3,
  distance: () => distance3,
  div: () => div3,
  divide: () => divide3,
  dot: () => dot4,
  equals: () => equals6,
  exactEquals: () => exactEquals6,
  floor: () => floor3,
  forEach: () => forEach3,
  fromValues: () => fromValues6,
  inverse: () => inverse3,
  len: () => len4,
  length: () => length4,
  lerp: () => lerp4,
  max: () => max3,
  min: () => min3,
  mul: () => mul6,
  multiply: () => multiply6,
  negate: () => negate3,
  normalize: () => normalize4,
  random: () => random4,
  rotate: () => rotate3,
  round: () => round3,
  scale: () => scale6,
  scaleAndAdd: () => scaleAndAdd3,
  set: () => set6,
  sqrDist: () => sqrDist3,
  sqrLen: () => sqrLen4,
  squaredDistance: () => squaredDistance3,
  squaredLength: () => squaredLength4,
  str: () => str6,
  sub: () => sub5,
  subtract: () => subtract5,
  transformMat2: () => transformMat2,
  transformMat2d: () => transformMat2d,
  transformMat3: () => transformMat32,
  transformMat4: () => transformMat43,
  zero: () => zero3
});
function create6() {
  var out = new ARRAY_TYPE(2);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}
function clone6(a) {
  var out = new ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function fromValues6(x, y) {
  var out = new ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
function copy6(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function set6(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
function add6(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
function subtract5(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
function multiply6(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
function divide3(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
function ceil3(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
function floor3(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
function min3(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
function max3(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
function round3(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
function scale6(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
function scaleAndAdd3(out, a, b, scale7) {
  out[0] = a[0] + b[0] * scale7;
  out[1] = a[1] + b[1] * scale7;
  return out;
}
function distance3(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return Math.hypot(x, y);
}
function squaredDistance3(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return x * x + y * y;
}
function length4(a) {
  var x = a[0], y = a[1];
  return Math.hypot(x, y);
}
function squaredLength4(a) {
  var x = a[0], y = a[1];
  return x * x + y * y;
}
function negate3(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
function inverse3(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  return out;
}
function normalize4(out, a) {
  var x = a[0], y = a[1];
  var len5 = x * x + y * y;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
  }
  out[0] = a[0] * len5;
  out[1] = a[1] * len5;
  return out;
}
function dot4(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
function cross3(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
function lerp4(out, a, b, t) {
  var ax = a[0], ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
function random4(out, scale7) {
  scale7 = scale7 || 1;
  var r = RANDOM() * 2 * Math.PI;
  out[0] = Math.cos(r) * scale7;
  out[1] = Math.sin(r) * scale7;
  return out;
}
function transformMat2(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
function transformMat2d(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
function transformMat32(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
function transformMat43(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
function rotate3(out, a, b, rad) {
  var p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(rad), cosC = Math.cos(rad);
  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
function angle2(a, b) {
  var x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1], mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2), cosine = mag && (x1 * x2 + y1 * y2) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero3(out) {
  out[0] = 0;
  out[1] = 0;
  return out;
}
function str6(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
function exactEquals6(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
function equals6(a, b) {
  var a0 = a[0], a1 = a[1];
  var b0 = b[0], b1 = b[1];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
}
var len4 = length4;
var sub5 = subtract5;
var mul6 = multiply6;
var div3 = divide3;
var dist3 = distance3;
var sqrDist3 = squaredDistance3;
var sqrLen4 = squaredLength4;
var forEach3 = function() {
  var vec = create6();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 2;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }
    return a;
  };
}();

// node_modules/@antv/util/esm/color/arr2rgb.js
function toHex(value) {
  var x16Value = Math.round(value).toString(16);
  return x16Value.length === 1 ? "0" + x16Value : x16Value;
}
function arr2rgb(arr) {
  return "#" + toHex(arr[0]) + toHex(arr[1]) + toHex(arr[2]);
}

// node_modules/@antv/util/esm/lodash/is-array-like.js
var isArrayLike = function(value) {
  return value !== null && typeof value !== "function" && isFinite(value.length);
};
var is_array_like_default = isArrayLike;

// node_modules/@antv/util/esm/lodash/contains.js
var contains = function(arr, value) {
  if (!is_array_like_default(arr)) {
    return false;
  }
  return arr.indexOf(value) > -1;
};
var contains_default = contains;

// node_modules/@antv/util/esm/lodash/filter.js
var filter = function(arr, func) {
  if (!is_array_like_default(arr)) {
    return arr;
  }
  var result = [];
  for (var index = 0; index < arr.length; index++) {
    var value = arr[index];
    if (func(value, index)) {
      result.push(value);
    }
  }
  return result;
};
var filter_default = filter;

// node_modules/@antv/util/esm/lodash/difference.js
var difference = function(arr, values) {
  if (values === void 0) {
    values = [];
  }
  return filter_default(arr, function(value) {
    return !contains_default(values, value);
  });
};
var difference_default = difference;

// node_modules/@antv/util/esm/lodash/is-function.js
var is_function_default = function(value) {
  return typeof value === "function";
};

// node_modules/@antv/util/esm/lodash/is-nil.js
var isNil = function(value) {
  return value === null || value === void 0;
};
var is_nil_default = isNil;

// node_modules/@antv/util/esm/lodash/is-type.js
var toString = {}.toString;
var isType = function(value, type) {
  return toString.call(value) === "[object " + type + "]";
};
var is_type_default = isType;

// node_modules/@antv/util/esm/lodash/is-array.js
var is_array_default = function(value) {
  return Array.isArray ? Array.isArray(value) : is_type_default(value, "Array");
};

// node_modules/@antv/util/esm/lodash/is-object.js
var is_object_default = function(value) {
  var type = typeof value;
  return value !== null && type === "object" || type === "function";
};

// node_modules/@antv/util/esm/lodash/each.js
function each(elements, func) {
  if (!elements) {
    return;
  }
  var rst;
  if (is_array_default(elements)) {
    for (var i = 0, len5 = elements.length; i < len5; i++) {
      rst = func(elements[i], i);
      if (rst === false) {
        break;
      }
    }
  } else if (is_object_default(elements)) {
    for (var k in elements) {
      if (elements.hasOwnProperty(k)) {
        rst = func(elements[k], k);
        if (rst === false) {
          break;
        }
      }
    }
  }
}
var each_default = each;

// node_modules/@antv/util/esm/lodash/is-object-like.js
var isObjectLike = function(value) {
  return typeof value === "object" && value !== null;
};
var is_object_like_default = isObjectLike;

// node_modules/@antv/util/esm/lodash/is-plain-object.js
var isPlainObject = function(value) {
  if (!is_object_like_default(value) || !is_type_default(value, "Object")) {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  var proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
};
var is_plain_object_default = isPlainObject;

// node_modules/@antv/util/esm/lodash/max.js
var max_default = function(arr) {
  if (!is_array_default(arr)) {
    return void 0;
  }
  return arr.reduce(function(prev, curr) {
    return Math.max(prev, curr);
  }, arr[0]);
};

// node_modules/@antv/util/esm/lodash/min.js
var min_default = function(arr) {
  if (!is_array_default(arr)) {
    return void 0;
  }
  return arr.reduce(function(prev, curr) {
    return Math.min(prev, curr);
  }, arr[0]);
};

// node_modules/@antv/util/esm/lodash/pull.js
var arrPrototype = Array.prototype;
var splice = arrPrototype.splice;
var indexOf = arrPrototype.indexOf;

// node_modules/@antv/util/esm/lodash/pull-at.js
var splice2 = Array.prototype.splice;

// node_modules/@antv/util/esm/lodash/reduce.js
var reduce = function(arr, fn, init) {
  if (!is_array_default(arr) && !is_plain_object_default(arr)) {
    return arr;
  }
  var result = init;
  each_default(arr, function(data2, i) {
    result = fn(result, data2, i);
  });
  return result;
};
var reduce_default = reduce;

// node_modules/@antv/util/esm/lodash/is-string.js
var is_string_default = function(str7) {
  return is_type_default(str7, "String");
};

// node_modules/@antv/util/esm/lodash/uniq.js
function uniq(arr, cache) {
  if (cache === void 0) {
    cache = /* @__PURE__ */ new Map();
  }
  var r = [];
  if (Array.isArray(arr)) {
    for (var i = 0, len5 = arr.length; i < len5; i++) {
      var item = arr[i];
      if (!cache.has(item)) {
        r.push(item);
        cache.set(item, true);
      }
    }
  }
  return r;
}

// node_modules/@antv/util/esm/lodash/group-by.js
var hasOwnProperty = Object.prototype.hasOwnProperty;
function groupBy(data2, condition) {
  if (!condition || !is_array_default(data2)) {
    return {};
  }
  var result = {};
  var predicate = is_function_default(condition) ? condition : function(item2) {
    return item2[condition];
  };
  var key;
  for (var i = 0; i < data2.length; i++) {
    var item = data2[i];
    key = predicate(item);
    if (hasOwnProperty.call(result, key)) {
      result[key].push(item);
    } else {
      result[key] = [item];
    }
  }
  return result;
}
var group_by_default = groupBy;

// node_modules/@antv/util/esm/lodash/clamp.js
var clamp = function(a, min4, max4) {
  if (a < min4) {
    return min4;
  } else if (a > max4) {
    return max4;
  }
  return a;
};
var clamp_default = clamp;

// node_modules/@antv/util/esm/lodash/is-number.js
var isNumber = function(value) {
  return is_type_default(value, "Number");
};
var is_number_default = isNumber;

// node_modules/@antv/util/esm/lodash/is-integer.js
var isInteger = Number.isInteger ? Number.isInteger : function(num) {
  return is_number_default(num) && num % 1 === 0;
};

// node_modules/@antv/util/esm/lodash/is-number-equal.js
var PRECISION = 1e-5;
function isNumberEqual(a, b, precision) {
  if (precision === void 0) {
    precision = PRECISION;
  }
  return Math.abs(a - b) < precision;
}

// node_modules/@antv/util/esm/lodash/max-by.js
var max_by_default = function(arr, fn) {
  if (!is_array_default(arr)) {
    return void 0;
  }
  var maxItem;
  var max4 = -Infinity;
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    var v = is_function_default(fn) ? fn(item) : item[fn];
    if (v > max4) {
      maxItem = item;
      max4 = v;
    }
  }
  return maxItem;
};

// node_modules/@antv/util/esm/lodash/min-by.js
var min_by_default = function(arr, fn) {
  if (!is_array_default(arr)) {
    return void 0;
  }
  var minItem;
  var min4 = Infinity;
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    var v = is_function_default(fn) ? fn(item) : item[fn];
    if (v < min4) {
      minItem = item;
      min4 = v;
    }
  }
  return minItem;
};

// node_modules/@antv/util/esm/lodash/mod.js
var mod = function(n, m) {
  return (n % m + m) % m;
};
var mod_default = mod;

// node_modules/@antv/util/esm/lodash/to-degree.js
var DEGREE = 180 / Math.PI;

// node_modules/@antv/util/esm/lodash/to-radian.js
var RADIAN = Math.PI / 180;

// node_modules/@antv/util/esm/lodash/to-string.js
var to_string_default = function(value) {
  if (is_nil_default(value))
    return "";
  return value.toString();
};

// node_modules/@antv/util/esm/lodash/lower-first.js
var lowerFirst = function(value) {
  var str7 = to_string_default(value);
  return str7.charAt(0).toLowerCase() + str7.substring(1);
};
var lower_first_default = lowerFirst;

// node_modules/@antv/util/esm/lodash/substitute.js
function substitute(str7, o) {
  if (!str7 || !o) {
    return str7;
  }
  return str7.replace(/\\?\{([^{}]+)\}/g, function(match, name) {
    if (match.charAt(0) === "\\") {
      return match.slice(1);
    }
    return o[name] === void 0 ? "" : o[name];
  });
}
var substitute_default = substitute;

// node_modules/@antv/util/esm/lodash/upper-first.js
var upperFirst = function(value) {
  var str7 = to_string_default(value);
  return str7.charAt(0).toUpperCase() + str7.substring(1);
};
var upper_first_default = upperFirst;

// node_modules/@antv/util/esm/lodash/get-type.js
var toString2 = {}.toString;
var getType = function(value) {
  return toString2.call(value).replace(/^\[object /, "").replace(/]$/, "");
};
var get_type_default = getType;

// node_modules/@antv/util/esm/lodash/is-boolean.js
var isBoolean = function(value) {
  return is_type_default(value, "Boolean");
};
var is_boolean_default = isBoolean;

// node_modules/@antv/util/esm/lodash/is-date.js
var isDate = function(value) {
  return is_type_default(value, "Date");
};
var is_date_default = isDate;

// node_modules/@antv/util/esm/lodash/is-null.js
var isNull = function(value) {
  return value === null;
};
var is_null_default = isNull;

// node_modules/@antv/util/esm/lodash/is-prototype.js
var objectProto = Object.prototype;
var isPrototype = function(value) {
  var Ctor = value && value.constructor;
  var proto = typeof Ctor === "function" && Ctor.prototype || objectProto;
  return value === proto;
};
var is_prototype_default = isPrototype;

// node_modules/@antv/util/esm/lodash/is-undefined.js
var isUndefined = function(value) {
  return value === void 0;
};
var is_undefined_default = isUndefined;

// node_modules/@antv/util/esm/lodash/is-element.js
var isElement = function(o) {
  return o instanceof Element || o instanceof Document;
};
var is_element_default = isElement;

// node_modules/@antv/util/esm/lodash/mix.js
function _mix(dist4, obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && key !== "constructor" && obj[key] !== void 0) {
      dist4[key] = obj[key];
    }
  }
}
function mix(dist4, src1, src2, src3) {
  if (src1)
    _mix(dist4, src1);
  if (src2)
    _mix(dist4, src2);
  if (src3)
    _mix(dist4, src3);
  return dist4;
}

// node_modules/@antv/util/esm/lodash/clone.js
var clone7 = function(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  var rst;
  if (is_array_default(obj)) {
    rst = [];
    for (var i = 0, l = obj.length; i < l; i++) {
      if (typeof obj[i] === "object" && obj[i] != null) {
        rst[i] = clone7(obj[i]);
      } else {
        rst[i] = obj[i];
      }
    }
  } else {
    rst = {};
    for (var k in obj) {
      if (typeof obj[k] === "object" && obj[k] != null) {
        rst[k] = clone7(obj[k]);
      } else {
        rst[k] = obj[k];
      }
    }
  }
  return rst;
};
var clone_default = clone7;

// node_modules/@antv/util/esm/lodash/debounce.js
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}
var debounce_default = debounce;

// node_modules/@antv/util/esm/lodash/memoize.js
function flru(max4) {
  var num, curr, prev;
  var limit = max4 || 1;
  function keep(key, value) {
    if (++num > limit) {
      prev = curr;
      reset(1);
      ++num;
    }
    curr[key] = value;
  }
  function reset(isPartial) {
    num = 0;
    curr = /* @__PURE__ */ Object.create(null);
    isPartial || (prev = /* @__PURE__ */ Object.create(null));
  }
  reset();
  return {
    clear: reset,
    has: function(key) {
      return curr[key] !== void 0 || prev[key] !== void 0;
    },
    get: function(key) {
      var val = curr[key];
      if (val !== void 0)
        return val;
      if ((val = prev[key]) !== void 0) {
        keep(key, val);
        return val;
      }
    },
    set: function(key, value) {
      if (curr[key] !== void 0) {
        curr[key] = value;
      } else {
        keep(key, value);
      }
    }
  };
}
var memoize_default = function(f, resolver, maxSize) {
  if (maxSize === void 0) {
    maxSize = 128;
  }
  if (!is_function_default(f)) {
    throw new TypeError("Expected a function");
  }
  var memoized = function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var key = resolver ? resolver.apply(this, args) : args[0];
    var cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = f.apply(this, args);
    cache.set(key, result);
    return result;
  };
  memoized.cache = flru(maxSize);
  return memoized;
};

// node_modules/@antv/util/esm/lodash/deep-mix.js
var MAX_MIX_LEVEL = 5;
function hasOwn(object, property) {
  if (Object.hasOwn) {
    return Object.hasOwn(object, property);
  }
  if (object == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  return Object.prototype.hasOwnProperty.call(Object(object), property);
}
function _deepMix(dist4, src, level, maxLevel) {
  level = level || 0;
  maxLevel = maxLevel || MAX_MIX_LEVEL;
  for (var key in src) {
    if (hasOwn(src, key)) {
      var value = src[key];
      if (value !== null && is_plain_object_default(value)) {
        if (!is_plain_object_default(dist4[key])) {
          dist4[key] = {};
        }
        if (level < maxLevel) {
          _deepMix(dist4[key], value, level + 1, maxLevel);
        } else {
          dist4[key] = src[key];
        }
      } else if (is_array_default(value)) {
        dist4[key] = [];
        dist4[key] = dist4[key].concat(value);
      } else if (value !== void 0) {
        dist4[key] = value;
      }
    }
  }
}
var deepMix = function(rst) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  for (var i = 0; i < args.length; i += 1) {
    _deepMix(rst, args[i]);
  }
  return rst;
};
var deep_mix_default = deepMix;

// node_modules/@antv/util/esm/lodash/is-empty.js
var hasOwnProperty2 = Object.prototype.hasOwnProperty;
function isEmpty(value) {
  if (is_nil_default(value)) {
    return true;
  }
  if (is_array_like_default(value)) {
    return !value.length;
  }
  var type = get_type_default(value);
  if (type === "Map" || type === "Set") {
    return !value.size;
  }
  if (is_prototype_default(value)) {
    return !Object.keys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty2.call(value, key)) {
      return false;
    }
  }
  return true;
}
var is_empty_default = isEmpty;

// node_modules/@antv/util/esm/lodash/is-equal.js
var isEqual = function(value, other) {
  if (value === other) {
    return true;
  }
  if (!value || !other) {
    return false;
  }
  if (is_string_default(value) || is_string_default(other)) {
    return false;
  }
  if (is_array_like_default(value) || is_array_like_default(other)) {
    if (value.length !== other.length) {
      return false;
    }
    var rst = true;
    for (var i = 0; i < value.length; i++) {
      rst = isEqual(value[i], other[i]);
      if (!rst) {
        break;
      }
    }
    return rst;
  }
  if (is_object_like_default(value) || is_object_like_default(other)) {
    var valueKeys = Object.keys(value);
    var otherKeys = Object.keys(other);
    if (valueKeys.length !== otherKeys.length) {
      return false;
    }
    var rst = true;
    for (var i = 0; i < valueKeys.length; i++) {
      rst = isEqual(value[valueKeys[i]], other[valueKeys[i]]);
      if (!rst) {
        break;
      }
    }
    return rst;
  }
  return false;
};
var is_equal_default = isEqual;

// node_modules/@antv/util/esm/lodash/get.js
var get_default = function(obj, key, defaultValue) {
  var p = 0;
  var keyArr = is_string_default(key) ? key.split(".") : key;
  while (obj && p < keyArr.length) {
    obj = obj[keyArr[p++]];
  }
  return obj === void 0 || p < keyArr.length ? defaultValue : obj;
};

// node_modules/@antv/util/esm/lodash/set.js
var set_default = function(obj, path, value) {
  var o = obj;
  var keyArr = is_string_default(path) ? path.split(".") : path;
  keyArr.forEach(function(key, idx) {
    if (idx < keyArr.length - 1) {
      if (!is_object_default(o[key])) {
        o[key] = is_number_default(keyArr[idx + 1]) ? [] : {};
      }
      o = o[key];
    } else {
      o[key] = value;
    }
  });
  return obj;
};

// node_modules/@antv/util/esm/lodash/pick.js
var hasOwnProperty3 = Object.prototype.hasOwnProperty;
var pick_default = function(object, keys) {
  if (object === null || !is_plain_object_default(object)) {
    return {};
  }
  var result = {};
  each_default(keys, function(key) {
    if (hasOwnProperty3.call(object, key)) {
      result[key] = object[key];
    }
  });
  return result;
};

// node_modules/@antv/util/esm/lodash/omit.js
var omit_default = function(obj, keys) {
  return reduce_default(obj, function(r, curr, key) {
    if (!keys.includes(key)) {
      r[key] = curr;
    }
    return r;
  }, {});
};

// node_modules/@antv/util/esm/lodash/throttle.js
var throttle_default = function(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options)
    options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout)
      context = args = null;
  };
  var throttled = function() {
    var now = Date.now();
    if (!previous && options.leading === false)
      previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout)
        context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };
  return throttled;
};

// node_modules/@antv/util/esm/lodash/unique-id.js
var map = {};
var unique_id_default = function(prefix) {
  prefix = prefix || "g";
  if (!map[prefix]) {
    map[prefix] = 1;
  } else {
    map[prefix] += 1;
  }
  return prefix + map[prefix];
};

// node_modules/@antv/util/esm/lodash/noop.js
var noop_default = function() {
};

// node_modules/@antv/util/esm/lodash/identity.js
var identity_default = function(v) {
  return v;
};

// node_modules/@antv/util/esm/lodash/cache.js
var default_1 = (
  /** @class */
  function() {
    function default_12() {
      this.map = {};
    }
    default_12.prototype.has = function(key) {
      return this.map[key] !== void 0;
    };
    default_12.prototype.get = function(key, def) {
      var v = this.map[key];
      return v === void 0 ? def : v;
    };
    default_12.prototype.set = function(key, value) {
      this.map[key] = value;
    };
    default_12.prototype.clear = function() {
      this.map = {};
    };
    default_12.prototype.delete = function(key) {
      delete this.map[key];
    };
    default_12.prototype.size = function() {
      return Object.keys(this.map).length;
    };
    return default_12;
  }()
);

// node_modules/@antv/util/esm/color/torgb.js
var RGB_REG = /rgba?\(([\s.,0-9]+)\)/;
function getTmp() {
  var i = document.getElementById("antv-web-colour-picker");
  if (i) {
    return i;
  }
  i = document.createElement("i");
  i.id = "antv-web-colour-picker";
  i.title = "Web Colour Picker";
  i.style.display = "none";
  document.body.appendChild(i);
  return i;
}
function toRGBString(color2) {
  if (color2[0] === "#" && color2.length === 7) {
    return color2;
  }
  var iEl = getTmp();
  iEl.style.color = color2;
  var rst = document.defaultView.getComputedStyle(iEl, "").getPropertyValue("color");
  var matches = RGB_REG.exec(rst);
  var cArray = matches[1].split(/\s*,\s*/).map(function(s) {
    return Number(s);
  });
  rst = arr2rgb(cArray);
  return rst;
}
var toRGB = memoize_default(toRGBString, function(color2) {
  return color2;
}, 256);

// node_modules/@antv/util/esm/path/parser/params-parser.js
var paramsParser = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  x: 0,
  y: 0,
  qx: null,
  qy: null
};

// node_modules/@antv/util/esm/path/process/fix-arc.js
function fixArc(pathArray, allPathCommands, i) {
  if (pathArray[i].length > 7) {
    pathArray[i].shift();
    var pi = pathArray[i];
    var ni = i;
    while (pi.length) {
      allPathCommands[i] = "A";
      pathArray.splice(ni += 1, 0, ["C"].concat(pi.splice(0, 6)));
    }
    pathArray.splice(i, 1);
  }
}

// node_modules/@antv/util/esm/path/parser/params-count.js
var paramsCount = {
  a: 7,
  c: 6,
  h: 1,
  l: 2,
  m: 2,
  r: 4,
  q: 4,
  s: 4,
  t: 2,
  v: 1,
  z: 0
};

// node_modules/@antv/util/esm/path/util/is-path-array.js
function isPathArray(path) {
  return Array.isArray(path) && path.every(function(seg) {
    var lk = seg[0].toLowerCase();
    return paramsCount[lk] === seg.length - 1 && "achlmqstvz".includes(lk);
  });
}

// node_modules/@antv/util/esm/path/util/is-absolute-array.js
function isAbsoluteArray(path) {
  return isPathArray(path) && // @ts-ignore -- `isPathArray` also checks if it's `Array`
  path.every(function(_a) {
    var x = _a[0];
    return x === x.toUpperCase();
  });
}

// node_modules/@antv/util/esm/path/util/is-normalized-array.js
function isNormalizedArray(path) {
  return isAbsoluteArray(path) && path.every(function(_a) {
    var pc = _a[0];
    return "ACLMQZ".includes(pc);
  });
}

// node_modules/@antv/util/esm/path/parser/finalize-segment.js
function finalizeSegment(path) {
  var pathCommand = path.pathValue[path.segmentStart];
  var LK = pathCommand.toLowerCase();
  var data2 = path.data;
  while (data2.length >= paramsCount[LK]) {
    if (LK === "m" && data2.length > 2) {
      path.segments.push([pathCommand].concat(data2.splice(0, 2)));
      LK = "l";
      pathCommand = pathCommand === "m" ? "l" : "L";
    } else {
      path.segments.push([pathCommand].concat(data2.splice(0, paramsCount[LK])));
    }
    if (!paramsCount[LK]) {
      break;
    }
  }
}

// node_modules/@antv/util/esm/path/parser/scan-flag.js
function scanFlag(path) {
  var index = path.index, pathValue = path.pathValue;
  var code = pathValue.charCodeAt(index);
  if (code === 48) {
    path.param = 0;
    path.index += 1;
    return;
  }
  if (code === 49) {
    path.param = 1;
    path.index += 1;
    return;
  }
  path.err = '[path-util]: invalid Arc flag "' + pathValue[index] + '", expecting 0 or 1 at index ' + index;
}

// node_modules/@antv/util/esm/path/parser/is-digit-start.js
function isDigitStart(code) {
  return code >= 48 && code <= 57 || code === 43 || code === 45 || code === 46;
}
function isDigit(code) {
  return code >= 48 && code <= 57;
}

// node_modules/@antv/util/esm/path/parser/scan-param.js
function scanParam(path) {
  var max4 = path.max, pathValue = path.pathValue, start = path.index;
  var index = start;
  var zeroFirst = false;
  var hasCeiling = false;
  var hasDecimal = false;
  var hasDot = false;
  var ch;
  if (index >= max4) {
    path.err = "[path-util]: Invalid path value at index " + index + ', "pathValue" is missing param';
    return;
  }
  ch = pathValue.charCodeAt(index);
  if (ch === 43 || ch === 45) {
    index += 1;
    ch = pathValue.charCodeAt(index);
  }
  if (!isDigit(ch) && ch !== 46) {
    path.err = "[path-util]: Invalid path value at index " + index + ', "' + pathValue[index] + '" is not a number';
    return;
  }
  if (ch !== 46) {
    zeroFirst = ch === 48;
    index += 1;
    ch = pathValue.charCodeAt(index);
    if (zeroFirst && index < max4) {
      if (ch && isDigit(ch)) {
        path.err = "[path-util]: Invalid path value at index " + start + ', "' + pathValue[start] + '" illegal number';
        return;
      }
    }
    while (index < max4 && isDigit(pathValue.charCodeAt(index))) {
      index += 1;
      hasCeiling = true;
    }
    ch = pathValue.charCodeAt(index);
  }
  if (ch === 46) {
    hasDot = true;
    index += 1;
    while (isDigit(pathValue.charCodeAt(index))) {
      index += 1;
      hasDecimal = true;
    }
    ch = pathValue.charCodeAt(index);
  }
  if (ch === 101 || ch === 69) {
    if (hasDot && !hasCeiling && !hasDecimal) {
      path.err = "[path-util]: Invalid path value at index " + index + ', "' + pathValue[index] + '" invalid float exponent';
      return;
    }
    index += 1;
    ch = pathValue.charCodeAt(index);
    if (ch === 43 || ch === 45) {
      index += 1;
    }
    if (index < max4 && isDigit(pathValue.charCodeAt(index))) {
      while (index < max4 && isDigit(pathValue.charCodeAt(index))) {
        index += 1;
      }
    } else {
      path.err = "[path-util]: Invalid path value at index " + index + ', "' + pathValue[index] + '" invalid integer exponent';
      return;
    }
  }
  path.index = index;
  path.param = +path.pathValue.slice(start, index);
}

// node_modules/@antv/util/esm/path/parser/is-space.js
function isSpace(ch) {
  var specialSpaces = [
    5760,
    6158,
    8192,
    8193,
    8194,
    8195,
    8196,
    8197,
    8198,
    8199,
    8200,
    8201,
    8202,
    8239,
    8287,
    12288,
    65279
  ];
  return ch === 10 || ch === 13 || ch === 8232 || ch === 8233 || // Line terminators
  // White spaces
  ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch >= 5760 && specialSpaces.includes(ch);
}

// node_modules/@antv/util/esm/path/parser/skip-spaces.js
function skipSpaces(path) {
  var pathValue = path.pathValue, max4 = path.max;
  while (path.index < max4 && isSpace(pathValue.charCodeAt(path.index))) {
    path.index += 1;
  }
}

// node_modules/@antv/util/esm/path/parser/is-path-command.js
function isPathCommand(code) {
  switch (code | 32) {
    case 109:
    case 122:
    case 108:
    case 104:
    case 118:
    case 99:
    case 115:
    case 113:
    case 116:
    case 97:
      return true;
    default:
      return false;
  }
}

// node_modules/@antv/util/esm/path/parser/is-arc-command.js
function isArcCommand(code) {
  return (code | 32) === 97;
}

// node_modules/@antv/util/esm/path/parser/scan-segment.js
function scanSegment(path) {
  var max4 = path.max, pathValue = path.pathValue, index = path.index;
  var cmdCode = pathValue.charCodeAt(index);
  var reqParams = paramsCount[pathValue[index].toLowerCase()];
  path.segmentStart = index;
  if (!isPathCommand(cmdCode)) {
    path.err = '[path-util]: Invalid path value "' + pathValue[index] + '" is not a path command';
    return;
  }
  path.index += 1;
  skipSpaces(path);
  path.data = [];
  if (!reqParams) {
    finalizeSegment(path);
    return;
  }
  for (; ; ) {
    for (var i = reqParams; i > 0; i -= 1) {
      if (isArcCommand(cmdCode) && (i === 3 || i === 4))
        scanFlag(path);
      else
        scanParam(path);
      if (path.err.length) {
        return;
      }
      path.data.push(path.param);
      skipSpaces(path);
      if (path.index < max4 && pathValue.charCodeAt(path.index) === 44) {
        path.index += 1;
        skipSpaces(path);
      }
    }
    if (path.index >= path.max) {
      break;
    }
    if (!isDigitStart(pathValue.charCodeAt(path.index))) {
      break;
    }
  }
  finalizeSegment(path);
}

// node_modules/@antv/util/esm/path/parser/path-parser.js
var PathParser = (
  /** @class */
  /* @__PURE__ */ function() {
    function PathParser2(pathString) {
      this.pathValue = pathString;
      this.segments = [];
      this.max = pathString.length;
      this.index = 0;
      this.param = 0;
      this.segmentStart = 0;
      this.data = [];
      this.err = "";
    }
    return PathParser2;
  }()
);

// node_modules/@antv/util/esm/path/parser/parse-path-string.js
function parsePathString(pathInput) {
  if (isPathArray(pathInput)) {
    return [].concat(pathInput);
  }
  var path = new PathParser(pathInput);
  skipSpaces(path);
  while (path.index < path.max && !path.err.length) {
    scanSegment(path);
  }
  return path.err ? path.err : path.segments;
}

// node_modules/@antv/util/esm/path/convert/path-2-absolute.js
function path2Absolute(pathInput) {
  if (isAbsoluteArray(pathInput)) {
    return [].concat(pathInput);
  }
  var path = parsePathString(pathInput);
  var x = 0;
  var y = 0;
  var mx = 0;
  var my = 0;
  return path.map(function(segment) {
    var values = segment.slice(1).map(Number);
    var pathCommand = segment[0];
    var absCommand = pathCommand.toUpperCase();
    if (pathCommand === "M") {
      x = values[0], y = values[1];
      mx = x;
      my = y;
      return ["M", x, y];
    }
    var absoluteSegment;
    if (pathCommand !== absCommand) {
      switch (absCommand) {
        case "A":
          absoluteSegment = [
            absCommand,
            values[0],
            values[1],
            values[2],
            values[3],
            values[4],
            values[5] + x,
            values[6] + y
          ];
          break;
        case "V":
          absoluteSegment = [absCommand, values[0] + y];
          break;
        case "H":
          absoluteSegment = [absCommand, values[0] + x];
          break;
        default: {
          var absValues = values.map(function(n, j) {
            return n + (j % 2 ? y : x);
          });
          absoluteSegment = [absCommand].concat(absValues);
        }
      }
    } else {
      absoluteSegment = [absCommand].concat(values);
    }
    var segLength = absoluteSegment.length;
    switch (absCommand) {
      case "Z":
        x = mx;
        y = my;
        break;
      case "H":
        x = absoluteSegment[1];
        break;
      case "V":
        y = absoluteSegment[1];
        break;
      default:
        x = absoluteSegment[segLength - 2];
        y = absoluteSegment[segLength - 1];
        if (absCommand === "M") {
          mx = x;
          my = y;
        }
    }
    return absoluteSegment;
  });
}

// node_modules/@antv/util/esm/path/process/normalize-segment.js
function normalizeSegment(segment, params) {
  var pathCommand = segment[0];
  var px1 = params.x1, py1 = params.y1, px2 = params.x2, py2 = params.y2;
  var values = segment.slice(1).map(Number);
  var result = segment;
  if (!"TQ".includes(pathCommand)) {
    params.qx = null;
    params.qy = null;
  }
  if (pathCommand === "H") {
    result = ["L", segment[1], py1];
  } else if (pathCommand === "V") {
    result = ["L", px1, segment[1]];
  } else if (pathCommand === "S") {
    var x1 = px1 * 2 - px2;
    var y1 = py1 * 2 - py2;
    params.x1 = x1;
    params.y1 = y1;
    result = ["C", x1, y1].concat(values);
  } else if (pathCommand === "T") {
    var qx = px1 * 2 - params.qx;
    var qy = py1 * 2 - params.qy;
    params.qx = qx;
    params.qy = qy;
    result = ["Q", qx, qy].concat(values);
  } else if (pathCommand === "Q") {
    var nqx = values[0], nqy = values[1];
    params.qx = nqx;
    params.qy = nqy;
  }
  return result;
}

// node_modules/@antv/util/esm/path/process/normalize-path.js
function normalizePath(pathInput) {
  if (isNormalizedArray(pathInput)) {
    return [].concat(pathInput);
  }
  var path = path2Absolute(pathInput);
  var params = __assign({}, paramsParser);
  for (var i = 0; i < path.length; i += 1) {
    path[i] = normalizeSegment(path[i], params);
    var segment = path[i];
    var seglen = segment.length;
    params.x1 = +segment[seglen - 2];
    params.y1 = +segment[seglen - 1];
    params.x2 = +segment[seglen - 4] || params.x1;
    params.y2 = +segment[seglen - 3] || params.y1;
  }
  return path;
}

// node_modules/@antv/util/esm/path/util/is-curve-array.js
function isCurveArray(path) {
  return isNormalizedArray(path) && path.every(function(_a) {
    var pc = _a[0];
    return "MC".includes(pc);
  });
}

// node_modules/@antv/util/esm/path/util/rotate-vector.js
function rotateVector(x, y, rad) {
  var X = x * Math.cos(rad) - y * Math.sin(rad);
  var Y = x * Math.sin(rad) + y * Math.cos(rad);
  return { x: X, y: Y };
}

// node_modules/@antv/util/esm/path/process/arc-2-cubic.js
function arcToCubic(X1, Y1, RX, RY, angle3, LAF, SF, X2, Y2, recursive) {
  var x1 = X1;
  var y1 = Y1;
  var rx = RX;
  var ry = RY;
  var x2 = X2;
  var y2 = Y2;
  var d120 = Math.PI * 120 / 180;
  var rad = Math.PI / 180 * (+angle3 || 0);
  var res = [];
  var xy;
  var f1;
  var f2;
  var cx;
  var cy;
  if (!recursive) {
    xy = rotateVector(x1, y1, -rad);
    x1 = xy.x;
    y1 = xy.y;
    xy = rotateVector(x2, y2, -rad);
    x2 = xy.x;
    y2 = xy.y;
    var x = (x1 - x2) / 2;
    var y = (y1 - y2) / 2;
    var h = x * x / (rx * rx) + y * y / (ry * ry);
    if (h > 1) {
      h = Math.sqrt(h);
      rx *= h;
      ry *= h;
    }
    var rx2 = rx * rx;
    var ry2 = ry * ry;
    var k = (LAF === SF ? -1 : 1) * Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));
    cx = k * rx * y / ry + (x1 + x2) / 2;
    cy = k * -ry * x / rx + (y1 + y2) / 2;
    f1 = Math.asin(((y1 - cy) / ry * Math.pow(10, 9) >> 0) / Math.pow(10, 9));
    f2 = Math.asin(((y2 - cy) / ry * Math.pow(10, 9) >> 0) / Math.pow(10, 9));
    f1 = x1 < cx ? Math.PI - f1 : f1;
    f2 = x2 < cx ? Math.PI - f2 : f2;
    if (f1 < 0)
      f1 = Math.PI * 2 + f1;
    if (f2 < 0)
      f2 = Math.PI * 2 + f2;
    if (SF && f1 > f2) {
      f1 -= Math.PI * 2;
    }
    if (!SF && f2 > f1) {
      f2 -= Math.PI * 2;
    }
  } else {
    f1 = recursive[0], f2 = recursive[1], cx = recursive[2], cy = recursive[3];
  }
  var df = f2 - f1;
  if (Math.abs(df) > d120) {
    var f2old = f2;
    var x2old = x2;
    var y2old = y2;
    f2 = f1 + d120 * (SF && f2 > f1 ? 1 : -1);
    x2 = cx + rx * Math.cos(f2);
    y2 = cy + ry * Math.sin(f2);
    res = arcToCubic(x2, y2, rx, ry, angle3, 0, SF, x2old, y2old, [f2, f2old, cx, cy]);
  }
  df = f2 - f1;
  var c1 = Math.cos(f1);
  var s1 = Math.sin(f1);
  var c2 = Math.cos(f2);
  var s2 = Math.sin(f2);
  var t = Math.tan(df / 4);
  var hx = 4 / 3 * rx * t;
  var hy = 4 / 3 * ry * t;
  var m1 = [x1, y1];
  var m2 = [x1 + hx * s1, y1 - hy * c1];
  var m3 = [x2 + hx * s2, y2 - hy * c2];
  var m4 = [x2, y2];
  m2[0] = 2 * m1[0] - m2[0];
  m2[1] = 2 * m1[1] - m2[1];
  if (recursive) {
    return m2.concat(m3, m4, res);
  }
  res = m2.concat(m3, m4, res);
  var newres = [];
  for (var i = 0, ii = res.length; i < ii; i += 1) {
    newres[i] = i % 2 ? rotateVector(res[i - 1], res[i], rad).y : rotateVector(res[i], res[i + 1], rad).x;
  }
  return newres;
}

// node_modules/@antv/util/esm/path/process/quad-2-cubic.js
function quadToCubic(x1, y1, qx, qy, x2, y2) {
  var r13 = 1 / 3;
  var r23 = 2 / 3;
  return [
    r13 * x1 + r23 * qx,
    r13 * y1 + r23 * qy,
    r13 * x2 + r23 * qx,
    r13 * y2 + r23 * qy,
    x2,
    y2
    // x,y
  ];
}

// node_modules/@antv/util/esm/path/util/mid-point.js
function midPoint(a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var bx = b[0];
  var by = b[1];
  return [ax + (bx - ax) * t, ay + (by - ay) * t];
}

// node_modules/@antv/util/esm/path/process/line-2-cubic.js
var lineToCubic = function(x1, y1, x2, y2) {
  var t = 0.5;
  var mid = midPoint([x1, y1], [x2, y2], t);
  return __spreadArray(__spreadArray([], mid, true), [x2, y2, x2, y2], false);
};

// node_modules/@antv/util/esm/path/process/segment-2-cubic.js
function segmentToCubic(segment, params) {
  var pathCommand = segment[0];
  var values = segment.slice(1).map(Number);
  var x = values[0], y = values[1];
  var args;
  var px1 = params.x1, py1 = params.y1, px = params.x, py = params.y;
  if (!"TQ".includes(pathCommand)) {
    params.qx = null;
    params.qy = null;
  }
  switch (pathCommand) {
    case "M":
      params.x = x;
      params.y = y;
      return segment;
    case "A":
      args = [px1, py1].concat(values);
      return ["C"].concat(arcToCubic(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]));
    case "Q":
      params.qx = x;
      params.qy = y;
      args = [px1, py1].concat(values);
      return ["C"].concat(quadToCubic(args[0], args[1], args[2], args[3], args[4], args[5]));
    case "L":
      return ["C"].concat(lineToCubic(px1, py1, x, y));
    case "Z":
      if (px1 === px && py1 === py) {
        return ["C", px1, py1, px, py, px, py];
      }
      return ["C"].concat(lineToCubic(px1, py1, px, py));
    default:
  }
  return segment;
}

// node_modules/@antv/util/esm/path/convert/path-2-curve.js
function path2Curve(pathInput, needZCommandIndexes) {
  if (needZCommandIndexes === void 0) {
    needZCommandIndexes = false;
  }
  if (isCurveArray(pathInput)) {
    var cloned = [].concat(pathInput);
    if (needZCommandIndexes) {
      return [cloned, []];
    } else {
      return cloned;
    }
  }
  var path = normalizePath(pathInput);
  var params = __assign({}, paramsParser);
  var allPathCommands = [];
  var pathCommand = "";
  var ii = path.length;
  var segment;
  var seglen;
  var zCommandIndexes = [];
  for (var i = 0; i < ii; i += 1) {
    if (path[i])
      pathCommand = path[i][0];
    allPathCommands[i] = pathCommand;
    var curveSegment = segmentToCubic(path[i], params);
    path[i] = curveSegment;
    fixArc(path, allPathCommands, i);
    ii = path.length;
    if (pathCommand === "Z") {
      zCommandIndexes.push(i);
    }
    segment = path[i];
    seglen = segment.length;
    params.x1 = +segment[seglen - 2];
    params.y1 = +segment[seglen - 1];
    params.x2 = +segment[seglen - 4] || params.x1;
    params.y2 = +segment[seglen - 3] || params.y1;
  }
  if (needZCommandIndexes) {
    return [path, zCommandIndexes];
  } else {
    return path;
  }
}

// node_modules/@antv/util/esm/path/process/clone-path.js
function clonePath(path) {
  return path.map(function(x) {
    return Array.isArray(x) ? [].concat(x) : x;
  });
}

// node_modules/@antv/util/esm/path/process/reverse-curve.js
function reverseCurve(pathArray) {
  var rotatedCurve = pathArray.slice(1).map(function(x, i, curveOnly) {
    return !i ? pathArray[0].slice(1).concat(x.slice(1)) : curveOnly[i - 1].slice(-2).concat(x.slice(1));
  }).map(function(x) {
    return x.map(function(y, i) {
      return x[x.length - i - 2 * (1 - i % 2)];
    });
  }).reverse();
  return [["M"].concat(rotatedCurve[0].slice(0, 2))].concat(rotatedCurve.map(function(x) {
    return ["C"].concat(x.slice(2));
  }));
}

// node_modules/@antv/util/esm/path/util/distance-square-root.js
function distanceSquareRoot(a, b) {
  return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
}

// node_modules/@antv/util/esm/path/util/segment-line-factory.js
function segmentLineFactory(x1, y1, x2, y2, distance5) {
  var length5 = distanceSquareRoot([x1, y1], [x2, y2]);
  var point = { x: 0, y: 0 };
  if (typeof distance5 === "number") {
    if (distance5 <= 0) {
      point = { x: x1, y: y1 };
    } else if (distance5 >= length5) {
      point = { x: x2, y: y2 };
    } else {
      var _a = midPoint([x1, y1], [x2, y2], distance5 / length5), x = _a[0], y = _a[1];
      point = { x, y };
    }
  }
  return {
    length: length5,
    point,
    min: {
      x: Math.min(x1, x2),
      y: Math.min(y1, y2)
    },
    max: {
      x: Math.max(x1, x2),
      y: Math.max(y1, y2)
    }
  };
}

// node_modules/@antv/util/esm/path/util/segment-arc-factory.js
function angleBetween(v0, v1) {
  var v0x = v0.x, v0y = v0.y;
  var v1x = v1.x, v1y = v1.y;
  var p = v0x * v1x + v0y * v1y;
  var n = Math.sqrt((Math.pow(v0x, 2) + Math.pow(v0y, 2)) * (Math.pow(v1x, 2) + Math.pow(v1y, 2)));
  var sign = v0x * v1y - v0y * v1x < 0 ? -1 : 1;
  var angle3 = sign * Math.acos(p / n);
  return angle3;
}
function getPointAtArcSegmentLength(x1, y1, RX, RY, angle3, LAF, SF, x, y, t) {
  var abs = Math.abs, sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, PI = Math.PI;
  var rx = abs(RX);
  var ry = abs(RY);
  var xRot = (angle3 % 360 + 360) % 360;
  var xRotRad = xRot * (PI / 180);
  if (x1 === x && y1 === y) {
    return { x: x1, y: y1 };
  }
  if (rx === 0 || ry === 0) {
    return segmentLineFactory(x1, y1, x, y, t).point;
  }
  var dx = (x1 - x) / 2;
  var dy = (y1 - y) / 2;
  var transformedPoint = {
    x: cos(xRotRad) * dx + sin(xRotRad) * dy,
    y: -sin(xRotRad) * dx + cos(xRotRad) * dy
  };
  var radiiCheck = Math.pow(transformedPoint.x, 2) / Math.pow(rx, 2) + Math.pow(transformedPoint.y, 2) / Math.pow(ry, 2);
  if (radiiCheck > 1) {
    rx *= sqrt(radiiCheck);
    ry *= sqrt(radiiCheck);
  }
  var cSquareNumerator = Math.pow(rx, 2) * Math.pow(ry, 2) - Math.pow(rx, 2) * Math.pow(transformedPoint.y, 2) - Math.pow(ry, 2) * Math.pow(transformedPoint.x, 2);
  var cSquareRootDenom = Math.pow(rx, 2) * Math.pow(transformedPoint.y, 2) + Math.pow(ry, 2) * Math.pow(transformedPoint.x, 2);
  var cRadicand = cSquareNumerator / cSquareRootDenom;
  cRadicand = cRadicand < 0 ? 0 : cRadicand;
  var cCoef = (LAF !== SF ? 1 : -1) * sqrt(cRadicand);
  var transformedCenter = {
    x: cCoef * (rx * transformedPoint.y / ry),
    y: cCoef * (-(ry * transformedPoint.x) / rx)
  };
  var center = {
    x: cos(xRotRad) * transformedCenter.x - sin(xRotRad) * transformedCenter.y + (x1 + x) / 2,
    y: sin(xRotRad) * transformedCenter.x + cos(xRotRad) * transformedCenter.y + (y1 + y) / 2
  };
  var startVector = {
    x: (transformedPoint.x - transformedCenter.x) / rx,
    y: (transformedPoint.y - transformedCenter.y) / ry
  };
  var startAngle = angleBetween({ x: 1, y: 0 }, startVector);
  var endVector = {
    x: (-transformedPoint.x - transformedCenter.x) / rx,
    y: (-transformedPoint.y - transformedCenter.y) / ry
  };
  var sweepAngle = angleBetween(startVector, endVector);
  if (!SF && sweepAngle > 0) {
    sweepAngle -= 2 * PI;
  } else if (SF && sweepAngle < 0) {
    sweepAngle += 2 * PI;
  }
  sweepAngle %= 2 * PI;
  var alpha = startAngle + sweepAngle * t;
  var ellipseComponentX = rx * cos(alpha);
  var ellipseComponentY = ry * sin(alpha);
  var point = {
    x: cos(xRotRad) * ellipseComponentX - sin(xRotRad) * ellipseComponentY + center.x,
    y: sin(xRotRad) * ellipseComponentX + cos(xRotRad) * ellipseComponentY + center.y
  };
  return point;
}
function segmentArcFactory(X1, Y1, RX, RY, angle3, LAF, SF, X2, Y2, distance5, options) {
  var _a;
  var _b = options.bbox, bbox = _b === void 0 ? true : _b, _c = options.length, length5 = _c === void 0 ? true : _c, _d = options.sampleSize, sampleSize = _d === void 0 ? 30 : _d;
  var distanceIsNumber = typeof distance5 === "number";
  var x = X1;
  var y = Y1;
  var LENGTH = 0;
  var prev = [x, y, LENGTH];
  var cur = [x, y];
  var t = 0;
  var POINT = { x: 0, y: 0 };
  var POINTS = [{ x, y }];
  if (distanceIsNumber && distance5 <= 0) {
    POINT = { x, y };
  }
  for (var j = 0; j <= sampleSize; j += 1) {
    t = j / sampleSize;
    _a = getPointAtArcSegmentLength(X1, Y1, RX, RY, angle3, LAF, SF, X2, Y2, t), x = _a.x, y = _a.y;
    if (bbox) {
      POINTS.push({ x, y });
    }
    if (length5) {
      LENGTH += distanceSquareRoot(cur, [x, y]);
    }
    cur = [x, y];
    if (distanceIsNumber && LENGTH >= distance5 && distance5 > prev[2]) {
      var dv = (LENGTH - distance5) / (LENGTH - prev[2]);
      POINT = {
        x: cur[0] * (1 - dv) + prev[0] * dv,
        y: cur[1] * (1 - dv) + prev[1] * dv
      };
    }
    prev = [x, y, LENGTH];
  }
  if (distanceIsNumber && distance5 >= LENGTH) {
    POINT = { x: X2, y: Y2 };
  }
  return {
    length: LENGTH,
    point: POINT,
    min: {
      x: Math.min.apply(null, POINTS.map(function(n) {
        return n.x;
      })),
      y: Math.min.apply(null, POINTS.map(function(n) {
        return n.y;
      }))
    },
    max: {
      x: Math.max.apply(null, POINTS.map(function(n) {
        return n.x;
      })),
      y: Math.max.apply(null, POINTS.map(function(n) {
        return n.y;
      }))
    }
  };
}

// node_modules/@antv/util/esm/path/util/segment-cubic-factory.js
function getPointAtCubicSegmentLength(x1, y1, c1x, c1y, c2x, c2y, x2, y2, t) {
  var t12 = 1 - t;
  return {
    x: Math.pow(t12, 3) * x1 + 3 * Math.pow(t12, 2) * t * c1x + 3 * t12 * Math.pow(t, 2) * c2x + Math.pow(t, 3) * x2,
    y: Math.pow(t12, 3) * y1 + 3 * Math.pow(t12, 2) * t * c1y + 3 * t12 * Math.pow(t, 2) * c2y + Math.pow(t, 3) * y2
  };
}
function segmentCubicFactory(x1, y1, c1x, c1y, c2x, c2y, x2, y2, distance5, options) {
  var _a;
  var _b = options.bbox, bbox = _b === void 0 ? true : _b, _c = options.length, length5 = _c === void 0 ? true : _c, _d = options.sampleSize, sampleSize = _d === void 0 ? 10 : _d;
  var distanceIsNumber = typeof distance5 === "number";
  var x = x1;
  var y = y1;
  var LENGTH = 0;
  var prev = [x, y, LENGTH];
  var cur = [x, y];
  var t = 0;
  var POINT = { x: 0, y: 0 };
  var POINTS = [{ x, y }];
  if (distanceIsNumber && distance5 <= 0) {
    POINT = { x, y };
  }
  for (var j = 0; j <= sampleSize; j += 1) {
    t = j / sampleSize;
    _a = getPointAtCubicSegmentLength(x1, y1, c1x, c1y, c2x, c2y, x2, y2, t), x = _a.x, y = _a.y;
    if (bbox) {
      POINTS.push({ x, y });
    }
    if (length5) {
      LENGTH += distanceSquareRoot(cur, [x, y]);
    }
    cur = [x, y];
    if (distanceIsNumber && LENGTH >= distance5 && distance5 > prev[2]) {
      var dv = (LENGTH - distance5) / (LENGTH - prev[2]);
      POINT = {
        x: cur[0] * (1 - dv) + prev[0] * dv,
        y: cur[1] * (1 - dv) + prev[1] * dv
      };
    }
    prev = [x, y, LENGTH];
  }
  if (distanceIsNumber && distance5 >= LENGTH) {
    POINT = { x: x2, y: y2 };
  }
  return {
    length: LENGTH,
    point: POINT,
    min: {
      x: Math.min.apply(null, POINTS.map(function(n) {
        return n.x;
      })),
      y: Math.min.apply(null, POINTS.map(function(n) {
        return n.y;
      }))
    },
    max: {
      x: Math.max.apply(null, POINTS.map(function(n) {
        return n.x;
      })),
      y: Math.max.apply(null, POINTS.map(function(n) {
        return n.y;
      }))
    }
  };
}

// node_modules/@antv/util/esm/path/util/segment-quad-factory.js
function getPointAtQuadSegmentLength(x1, y1, cx, cy, x2, y2, t) {
  var t12 = 1 - t;
  return {
    x: Math.pow(t12, 2) * x1 + 2 * t12 * t * cx + Math.pow(t, 2) * x2,
    y: Math.pow(t12, 2) * y1 + 2 * t12 * t * cy + Math.pow(t, 2) * y2
  };
}
function segmentQuadFactory(x1, y1, qx, qy, x2, y2, distance5, options) {
  var _a;
  var _b = options.bbox, bbox = _b === void 0 ? true : _b, _c = options.length, length5 = _c === void 0 ? true : _c, _d = options.sampleSize, sampleSize = _d === void 0 ? 10 : _d;
  var distanceIsNumber = typeof distance5 === "number";
  var x = x1;
  var y = y1;
  var LENGTH = 0;
  var prev = [x, y, LENGTH];
  var cur = [x, y];
  var t = 0;
  var POINT = { x: 0, y: 0 };
  var POINTS = [{ x, y }];
  if (distanceIsNumber && distance5 <= 0) {
    POINT = { x, y };
  }
  for (var j = 0; j <= sampleSize; j += 1) {
    t = j / sampleSize;
    _a = getPointAtQuadSegmentLength(x1, y1, qx, qy, x2, y2, t), x = _a.x, y = _a.y;
    if (bbox) {
      POINTS.push({ x, y });
    }
    if (length5) {
      LENGTH += distanceSquareRoot(cur, [x, y]);
    }
    cur = [x, y];
    if (distanceIsNumber && LENGTH >= distance5 && distance5 > prev[2]) {
      var dv = (LENGTH - distance5) / (LENGTH - prev[2]);
      POINT = {
        x: cur[0] * (1 - dv) + prev[0] * dv,
        y: cur[1] * (1 - dv) + prev[1] * dv
      };
    }
    prev = [x, y, LENGTH];
  }
  if (distanceIsNumber && distance5 >= LENGTH) {
    POINT = { x: x2, y: y2 };
  }
  return {
    length: LENGTH,
    point: POINT,
    min: {
      x: Math.min.apply(null, POINTS.map(function(n) {
        return n.x;
      })),
      y: Math.min.apply(null, POINTS.map(function(n) {
        return n.y;
      }))
    },
    max: {
      x: Math.max.apply(null, POINTS.map(function(n) {
        return n.x;
      })),
      y: Math.max.apply(null, POINTS.map(function(n) {
        return n.y;
      }))
    }
  };
}

// node_modules/@antv/util/esm/path/util/path-length-factory.js
function pathLengthFactory(pathInput, distance5, options) {
  var _a, _b, _c, _d, _e, _f;
  var path = normalizePath(pathInput);
  var distanceIsNumber = typeof distance5 === "number";
  var isM;
  var data2 = [];
  var pathCommand;
  var x = 0;
  var y = 0;
  var mx = 0;
  var my = 0;
  var seg;
  var MIN = [];
  var MAX = [];
  var length5 = 0;
  var min4 = { x: 0, y: 0 };
  var max4 = min4;
  var point = min4;
  var POINT = min4;
  var LENGTH = 0;
  for (var i = 0, ll = path.length; i < ll; i += 1) {
    seg = path[i];
    pathCommand = seg[0];
    isM = pathCommand === "M";
    data2 = !isM ? [x, y].concat(seg.slice(1)) : data2;
    if (isM) {
      mx = seg[1], my = seg[2];
      min4 = { x: mx, y: my };
      max4 = min4;
      length5 = 0;
      if (distanceIsNumber && distance5 < 1e-3) {
        POINT = min4;
      }
    } else if (pathCommand === "L") {
      _a = segmentLineFactory(data2[0], data2[1], data2[2], data2[3], (distance5 || 0) - LENGTH), length5 = _a.length, min4 = _a.min, max4 = _a.max, point = _a.point;
    } else if (pathCommand === "A") {
      _b = segmentArcFactory(data2[0], data2[1], data2[2], data2[3], data2[4], data2[5], data2[6], data2[7], data2[8], (distance5 || 0) - LENGTH, options || {}), length5 = _b.length, min4 = _b.min, max4 = _b.max, point = _b.point;
    } else if (pathCommand === "C") {
      _c = segmentCubicFactory(data2[0], data2[1], data2[2], data2[3], data2[4], data2[5], data2[6], data2[7], (distance5 || 0) - LENGTH, options || {}), length5 = _c.length, min4 = _c.min, max4 = _c.max, point = _c.point;
    } else if (pathCommand === "Q") {
      _d = segmentQuadFactory(data2[0], data2[1], data2[2], data2[3], data2[4], data2[5], (distance5 || 0) - LENGTH, options || {}), length5 = _d.length, min4 = _d.min, max4 = _d.max, point = _d.point;
    } else if (pathCommand === "Z") {
      data2 = [x, y, mx, my];
      _e = segmentLineFactory(data2[0], data2[1], data2[2], data2[3], (distance5 || 0) - LENGTH), length5 = _e.length, min4 = _e.min, max4 = _e.max, point = _e.point;
    }
    if (distanceIsNumber && LENGTH < distance5 && LENGTH + length5 >= distance5) {
      POINT = point;
    }
    MAX.push(max4);
    MIN.push(min4);
    LENGTH += length5;
    _f = pathCommand !== "Z" ? seg.slice(-2) : [mx, my], x = _f[0], y = _f[1];
  }
  if (distanceIsNumber && distance5 >= LENGTH) {
    POINT = { x, y };
  }
  return {
    length: LENGTH,
    point: POINT,
    min: {
      x: Math.min.apply(null, MIN.map(function(n) {
        return n.x;
      })),
      y: Math.min.apply(null, MIN.map(function(n) {
        return n.y;
      }))
    },
    max: {
      x: Math.max.apply(null, MAX.map(function(n) {
        return n.x;
      })),
      y: Math.max.apply(null, MAX.map(function(n) {
        return n.y;
      }))
    }
  };
}

// node_modules/@antv/util/esm/path/util/get-total-length.js
function getTotalLength(pathInput, options) {
  return pathLengthFactory(pathInput, void 0, __assign(__assign({}, options), { bbox: false, length: true })).length;
}

// node_modules/@antv/util/esm/path/util/get-rotated-curve.js
function getRotations(a) {
  var segCount = a.length;
  var pointCount = segCount - 1;
  return a.map(function(f, idx) {
    return a.map(function(p, i) {
      var oldSegIdx = idx + i;
      var seg;
      if (i === 0 || a[oldSegIdx] && a[oldSegIdx][0] === "M") {
        seg = a[oldSegIdx];
        return ["M"].concat(seg.slice(-2));
      }
      if (oldSegIdx >= segCount)
        oldSegIdx -= pointCount;
      return a[oldSegIdx];
    });
  });
}
function getRotatedCurve(a, b) {
  var segCount = a.length - 1;
  var lineLengths = [];
  var computedIndex = 0;
  var sumLensSqrd = 0;
  var rotations = getRotations(a);
  rotations.forEach(function(r, i) {
    a.slice(1).forEach(function(s, j) {
      sumLensSqrd += distanceSquareRoot(a[(i + j) % segCount].slice(-2), b[j % segCount].slice(-2));
    });
    lineLengths[i] = sumLensSqrd;
    sumLensSqrd = 0;
  });
  computedIndex = lineLengths.indexOf(Math.min.apply(null, lineLengths));
  return rotations[computedIndex];
}

// node_modules/@antv/util/esm/path/util/get-path-area.js
function getCubicSegArea(x1, y1, c1x, c1y, c2x, c2y, x2, y2) {
  return 3 * ((y2 - y1) * (c1x + c2x) - (x2 - x1) * (c1y + c2y) + c1y * (x1 - c2x) - c1x * (y1 - c2y) + y2 * (c2x + x1 / 3) - x2 * (c2y + y1 / 3)) / 20;
}
function getPathArea(path) {
  var x = 0;
  var y = 0;
  var len5 = 0;
  return path2Curve(path).map(function(seg) {
    var _a;
    switch (seg[0]) {
      case "M":
        x = seg[1], y = seg[2];
        return 0;
      default:
        var _b = seg.slice(1), c1x = _b[0], c1y = _b[1], c2x = _b[2], c2y = _b[3], x2 = _b[4], y2 = _b[5];
        len5 = getCubicSegArea(x, y, c1x, c1y, c2x, c2y, x2, y2);
        _a = seg.slice(-2), x = _a[0], y = _a[1];
        return len5;
    }
  }).reduce(function(a, b) {
    return a + b;
  }, 0);
}

// node_modules/@antv/util/esm/path/util/get-draw-direction.js
function getDrawDirection(pathArray) {
  return getPathArea(pathArray) >= 0;
}

// node_modules/@antv/util/esm/path/util/get-point-at-length.js
function getPointAtLength(pathInput, distance5, options) {
  return pathLengthFactory(pathInput, distance5, __assign(__assign({}, options), { bbox: false, length: true })).point;
}

// node_modules/@antv/util/esm/path/util/equalize-segments.js
function splitCubic(pts, t) {
  if (t === void 0) {
    t = 0.5;
  }
  var p0 = pts.slice(0, 2);
  var p1 = pts.slice(2, 4);
  var p2 = pts.slice(4, 6);
  var p3 = pts.slice(6, 8);
  var p4 = midPoint(p0, p1, t);
  var p5 = midPoint(p1, p2, t);
  var p6 = midPoint(p2, p3, t);
  var p7 = midPoint(p4, p5, t);
  var p8 = midPoint(p5, p6, t);
  var p9 = midPoint(p7, p8, t);
  return [
    // @ts-ignore
    ["C"].concat(p4, p7, p9),
    // @ts-ignore
    ["C"].concat(p8, p6, p3)
  ];
}
function getCurveArray(segments) {
  return segments.map(function(segment, i, pathArray) {
    var segmentData = i && pathArray[i - 1].slice(-2).concat(segment.slice(1));
    var curveLength = i ? segmentCubicFactory(segmentData[0], segmentData[1], segmentData[2], segmentData[3], segmentData[4], segmentData[5], segmentData[6], segmentData[7], segmentData[8], { bbox: false }).length : 0;
    var subsegs;
    if (i) {
      subsegs = curveLength ? splitCubic(segmentData) : [segment, segment];
    } else {
      subsegs = [segment];
    }
    return {
      s: segment,
      ss: subsegs,
      l: curveLength
    };
  });
}
function equalizeSegments(path1, path2, TL) {
  var c1 = getCurveArray(path1);
  var c2 = getCurveArray(path2);
  var L1 = c1.length;
  var L2 = c2.length;
  var l1 = c1.filter(function(x) {
    return x.l;
  }).length;
  var l2 = c2.filter(function(x) {
    return x.l;
  }).length;
  var m1 = c1.filter(function(x) {
    return x.l;
  }).reduce(function(a, _a) {
    var l = _a.l;
    return a + l;
  }, 0) / l1 || 0;
  var m2 = c2.filter(function(x) {
    return x.l;
  }).reduce(function(a, _a) {
    var l = _a.l;
    return a + l;
  }, 0) / l2 || 0;
  var tl = TL || Math.max(L1, L2);
  var mm = [m1, m2];
  var dif = [tl - L1, tl - L2];
  var canSplit = 0;
  var result = [c1, c2].map(function(x, i) {
    return x.l === tl ? x.map(function(y) {
      return y.s;
    }) : x.map(function(y, j) {
      canSplit = j && dif[i] && y.l >= mm[i];
      dif[i] -= canSplit ? 1 : 0;
      return canSplit ? y.ss : [y.s];
    }).flat();
  });
  return result[0].length === result[1].length ? result : equalizeSegments(result[0], result[1], tl);
}

// node_modules/@antv/util/esm/dom/create-dom.js
function createDOM(str7) {
  var container = document.createElement("div");
  container.innerHTML = str7;
  var dom = container.childNodes[0];
  if (dom && container.contains(dom)) {
    container.removeChild(dom);
  }
  return dom;
}

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min4 = Math.min(r, g, b), max4 = Math.max(r, g, b), h = NaN, s = max4 - min4, l = (max4 + min4) / 2;
  if (s) {
    if (r === max4) h = (g - b) / s + (g < b) * 6;
    else if (g === max4) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max4 + min4 : 2 - max4 - min4;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-color/src/math.js
var radians = Math.PI / 180;
var degrees = 180 / Math.PI;

// node_modules/d3-color/src/lab.js
var K = 18;
var Xn = 0.96422;
var Yn = 1;
var Zn = 0.82521;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;
function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b) x = z = y;
  else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}
function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}
function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Lab, lab, extend(Color, {
  brighter(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb() {
    var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new Rgb(
      lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.033454 * z),
      lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
      this.opacity
    );
  }
}));
function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}
function lrgb2rgb(x) {
  return 255 * (x <= 31308e-7 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * degrees;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}
function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * radians;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
define_default(Hcl, hcl, extend(Color, {
  brighter(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb() {
    return hcl2lab(this).rgb();
  }
}));

// node_modules/d3-color/src/cubehelix.js
var A = -0.14861;
var B = 1.78277;
var C = -0.29227;
var D = -0.90649;
var E = 1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Cubehelix, cubehelix, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));

// node_modules/@antv/g-math/dist/index.esm.js
function distance4(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}
function getBBoxByArray(xArr, yArr) {
  var minX = Math.min.apply(Math, __spreadArray([], __read(xArr), false));
  var minY = Math.min.apply(Math, __spreadArray([], __read(yArr), false));
  var maxX = Math.max.apply(Math, __spreadArray([], __read(xArr), false));
  var maxY = Math.max.apply(Math, __spreadArray([], __read(yArr), false));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function xExtrema(rx, ry, xRotation) {
  return Math.atan(-ry / rx * Math.tan(xRotation));
}
function yExtrema(rx, ry, xRotation) {
  return Math.atan(ry / (rx * Math.tan(xRotation)));
}
function xAt(cx, cy, rx, ry, xRotation, angle3) {
  return rx * Math.cos(xRotation) * Math.cos(angle3) - ry * Math.sin(xRotation) * Math.sin(angle3) + cx;
}
function yAt(cx, cy, rx, ry, xRotation, angle3) {
  return rx * Math.sin(xRotation) * Math.cos(angle3) + ry * Math.cos(xRotation) * Math.sin(angle3) + cy;
}
function box$5(cx, cy, rx, ry, xRotation, startAngle, endAngle) {
  var xDim = xExtrema(rx, ry, xRotation);
  var minX = Infinity;
  var maxX = -Infinity;
  var xs = [startAngle, endAngle];
  for (var i = -Math.PI * 2; i <= Math.PI * 2; i += Math.PI) {
    var xAngle = xDim + i;
    if (startAngle < endAngle) {
      if (startAngle < xAngle && xAngle < endAngle) {
        xs.push(xAngle);
      }
    } else {
      if (endAngle < xAngle && xAngle < startAngle) {
        xs.push(xAngle);
      }
    }
  }
  for (var i = 0; i < xs.length; i++) {
    var x = xAt(cx, cy, rx, ry, xRotation, xs[i]);
    if (x < minX) {
      minX = x;
    }
    if (x > maxX) {
      maxX = x;
    }
  }
  var yDim = yExtrema(rx, ry, xRotation);
  var minY = Infinity;
  var maxY = -Infinity;
  var ys = [startAngle, endAngle];
  for (var i = -Math.PI * 2; i <= Math.PI * 2; i += Math.PI) {
    var yAngle = yDim + i;
    if (startAngle < endAngle) {
      if (startAngle < yAngle && yAngle < endAngle) {
        ys.push(yAngle);
      }
    } else {
      if (endAngle < yAngle && yAngle < startAngle) {
        ys.push(yAngle);
      }
    }
  }
  for (var i = 0; i < ys.length; i++) {
    var y = yAt(cx, cy, rx, ry, xRotation, ys[i]);
    if (y < minY) {
      minY = y;
    }
    if (y > maxY) {
      maxY = y;
    }
  }
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
var EPSILON2 = 1e-4;
function nearestPoint$2(xArr, yArr, x, y, tCallback, length5) {
  var t = -1;
  var d = Infinity;
  var v0 = [x, y];
  var segNum = 20;
  if (length5 && length5 > 200) {
    segNum = length5 / 10;
  }
  var increaseRate = 1 / segNum;
  var interval = increaseRate / 10;
  for (var i = 0; i <= segNum; i++) {
    var _t = i * increaseRate;
    var v1 = [
      tCallback.apply(void 0, __spreadArray([], __read(xArr.concat([_t])), false)),
      tCallback.apply(void 0, __spreadArray([], __read(yArr.concat([_t])), false))
    ];
    var d1 = distance4(v0[0], v0[1], v1[0], v1[1]);
    if (d1 < d) {
      t = _t;
      d = d1;
    }
  }
  if (t === 0) {
    return {
      x: xArr[0],
      y: yArr[0]
    };
  }
  if (t === 1) {
    var count = xArr.length;
    return {
      x: xArr[count - 1],
      y: yArr[count - 1]
    };
  }
  d = Infinity;
  for (var i = 0; i < 32; i++) {
    if (interval < EPSILON2) {
      break;
    }
    var prev = t - interval;
    var next = t + interval;
    var v1 = [
      tCallback.apply(void 0, __spreadArray([], __read(xArr.concat([prev])), false)),
      tCallback.apply(void 0, __spreadArray([], __read(yArr.concat([prev])), false))
    ];
    var d1 = distance4(v0[0], v0[1], v1[0], v1[1]);
    if (prev >= 0 && d1 < d) {
      t = prev;
      d = d1;
    } else {
      var v2 = [
        tCallback.apply(void 0, __spreadArray([], __read(xArr.concat([next])), false)),
        tCallback.apply(void 0, __spreadArray([], __read(yArr.concat([next])), false))
      ];
      var d2 = distance4(v0[0], v0[1], v2[0], v2[1]);
      if (next <= 1 && d2 < d) {
        t = next;
        d = d2;
      } else {
        interval *= 0.5;
      }
    }
  }
  return {
    x: tCallback.apply(void 0, __spreadArray([], __read(xArr.concat([t])), false)),
    y: tCallback.apply(void 0, __spreadArray([], __read(yArr.concat([t])), false))
  };
}
function length$4(x1, y1, x2, y2) {
  return distance4(x1, y1, x2, y2);
}
function pointAt$3(x1, y1, x2, y2, t) {
  return {
    x: (1 - t) * x1 + t * x2,
    y: (1 - t) * y1 + t * y2
  };
}
function pointToLine(x1, y1, x2, y2, x, y) {
  var d = [x2 - x1, y2 - y1];
  if (vec2_exports.exactEquals(d, [0, 0])) {
    return Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
  }
  var u = [-d[1], d[0]];
  vec2_exports.normalize(u, u);
  var a = [x - x1, y - y1];
  return Math.abs(vec2_exports.dot(a, u));
}
function cubicAt(p0, p1, p2, p3, t) {
  var onet = 1 - t;
  return onet * onet * onet * p0 + 3 * p1 * t * onet * onet + 3 * p2 * t * t * onet + p3 * t * t * t;
}
function extrema$1(p0, p1, p2, p3) {
  var a = -3 * p0 + 9 * p1 - 9 * p2 + 3 * p3;
  var b = 6 * p0 - 12 * p1 + 6 * p2;
  var c = 3 * p1 - 3 * p0;
  var extremas = [];
  var t12;
  var t22;
  var discSqrt;
  if (isNumberEqual(a, 0)) {
    if (!isNumberEqual(b, 0)) {
      t12 = -c / b;
      if (t12 >= 0 && t12 <= 1) {
        extremas.push(t12);
      }
    }
  } else {
    var disc = b * b - 4 * a * c;
    if (isNumberEqual(disc, 0)) {
      extremas.push(-b / (2 * a));
    } else if (disc > 0) {
      discSqrt = Math.sqrt(disc);
      t12 = (-b + discSqrt) / (2 * a);
      t22 = (-b - discSqrt) / (2 * a);
      if (t12 >= 0 && t12 <= 1) {
        extremas.push(t12);
      }
      if (t22 >= 0 && t22 <= 1) {
        extremas.push(t22);
      }
    }
  }
  return extremas;
}
function box$3(x1, y1, x2, y2, x3, y3, x4, y4) {
  var xArr = [x1, x4];
  var yArr = [y1, y4];
  var xExtrema2 = extrema$1(x1, x2, x3, x4);
  var yExtrema2 = extrema$1(y1, y2, y3, y4);
  for (var i = 0; i < xExtrema2.length; i++) {
    xArr.push(cubicAt(x1, x2, x3, x4, xExtrema2[i]));
  }
  for (var i = 0; i < yExtrema2.length; i++) {
    yArr.push(cubicAt(y1, y2, y3, y4, yExtrema2[i]));
  }
  return getBBoxByArray(xArr, yArr);
}
function nearestPoint$1(x1, y1, x2, y2, x3, y3, x4, y4, x0, y0, length5) {
  return nearestPoint$2([x1, x2, x3, x4], [y1, y2, y3, y4], x0, y0, cubicAt, length5);
}
function pointDistance$3(x1, y1, x2, y2, x3, y3, x4, y4, x0, y0, length5) {
  var point = nearestPoint$1(x1, y1, x2, y2, x3, y3, x4, y4, x0, y0, length5);
  return distance4(point.x, point.y, x0, y0);
}
function lengthOfSegment(points) {
  if (points.length < 2) {
    return 0;
  }
  var totalLength = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var from = points[i];
    var to = points[i + 1];
    totalLength += distance4(from[0], from[1], to[0], to[1]);
  }
  return totalLength;
}
function length$2(points) {
  return lengthOfSegment(points);
}
function quadraticAt(p0, p1, p2, t) {
  var onet = 1 - t;
  return onet * onet * p0 + 2 * t * onet * p1 + t * t * p2;
}
function extrema(p0, p1, p2) {
  var a = p0 + p2 - 2 * p1;
  if (isNumberEqual(a, 0)) {
    return [0.5];
  }
  var rst = (p0 - p1) / a;
  if (rst <= 1 && rst >= 0) {
    return [rst];
  }
  return [];
}
function box(x1, y1, x2, y2, x3, y3) {
  var xExtrema2 = extrema(x1, x2, x3)[0];
  var yExtrema2 = extrema(y1, y2, y3)[0];
  var xArr = [x1, x3];
  var yArr = [y1, y3];
  if (xExtrema2 !== void 0) {
    xArr.push(quadraticAt(x1, x2, x3, xExtrema2));
  }
  if (yExtrema2 !== void 0) {
    yArr.push(quadraticAt(y1, y2, y3, yExtrema2));
  }
  return getBBoxByArray(xArr, yArr);
}
function nearestPoint(x1, y1, x2, y2, x3, y3, x0, y0) {
  return nearestPoint$2([x1, x2, x3], [y1, y2, y3], x0, y0, quadraticAt);
}
function pointDistance(x1, y1, x2, y2, x3, y3, x0, y0) {
  var point = nearestPoint(x1, y1, x2, y2, x3, y3, x0, y0);
  return distance4(point.x, point.y, x0, y0);
}

// node_modules/@antv/g-lite/dist/index.esm.js
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var rbush = { exports: {} };
(function(module, exports) {
  (function(global2, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    function quickselect(arr, k, left, right, compare) {
      quickselectStep(arr, k, left || 0, right || arr.length - 1, compare || defaultCompare);
    }
    function quickselectStep(arr, k, left, right, compare) {
      while (right > left) {
        if (right - left > 600) {
          var n = right - left + 1;
          var m = k - left + 1;
          var z = Math.log(n);
          var s = 0.5 * Math.exp(2 * z / 3);
          var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
          var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
          var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
          quickselectStep(arr, k, newLeft, newRight, compare);
        }
        var t = arr[k];
        var i = left;
        var j = right;
        swap(arr, left, k);
        if (compare(arr[right], t) > 0) {
          swap(arr, left, right);
        }
        while (i < j) {
          swap(arr, i, j);
          i++;
          j--;
          while (compare(arr[i], t) < 0) {
            i++;
          }
          while (compare(arr[j], t) > 0) {
            j--;
          }
        }
        if (compare(arr[left], t) === 0) {
          swap(arr, left, j);
        } else {
          j++;
          swap(arr, j, right);
        }
        if (j <= k) {
          left = j + 1;
        }
        if (k <= j) {
          right = j - 1;
        }
      }
    }
    function swap(arr, i, j) {
      var tmp2 = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp2;
    }
    function defaultCompare(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    var RBush2 = function RBush3(maxEntries) {
      if (maxEntries === void 0) maxEntries = 9;
      this._maxEntries = Math.max(4, maxEntries);
      this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));
      this.clear();
    };
    RBush2.prototype.all = function all() {
      return this._all(this.data, []);
    };
    RBush2.prototype.search = function search(bbox) {
      var node = this.data;
      var result = [];
      if (!intersects(bbox, node)) {
        return result;
      }
      var toBBox = this.toBBox;
      var nodesToSearch = [];
      while (node) {
        for (var i = 0; i < node.children.length; i++) {
          var child = node.children[i];
          var childBBox = node.leaf ? toBBox(child) : child;
          if (intersects(bbox, childBBox)) {
            if (node.leaf) {
              result.push(child);
            } else if (contains2(bbox, childBBox)) {
              this._all(child, result);
            } else {
              nodesToSearch.push(child);
            }
          }
        }
        node = nodesToSearch.pop();
      }
      return result;
    };
    RBush2.prototype.collides = function collides(bbox) {
      var node = this.data;
      if (!intersects(bbox, node)) {
        return false;
      }
      var nodesToSearch = [];
      while (node) {
        for (var i = 0; i < node.children.length; i++) {
          var child = node.children[i];
          var childBBox = node.leaf ? this.toBBox(child) : child;
          if (intersects(bbox, childBBox)) {
            if (node.leaf || contains2(bbox, childBBox)) {
              return true;
            }
            nodesToSearch.push(child);
          }
        }
        node = nodesToSearch.pop();
      }
      return false;
    };
    RBush2.prototype.load = function load(data2) {
      if (!(data2 && data2.length)) {
        return this;
      }
      if (data2.length < this._minEntries) {
        for (var i = 0; i < data2.length; i++) {
          this.insert(data2[i]);
        }
        return this;
      }
      var node = this._build(data2.slice(), 0, data2.length - 1, 0);
      if (!this.data.children.length) {
        this.data = node;
      } else if (this.data.height === node.height) {
        this._splitRoot(this.data, node);
      } else {
        if (this.data.height < node.height) {
          var tmpNode = this.data;
          this.data = node;
          node = tmpNode;
        }
        this._insert(node, this.data.height - node.height - 1, true);
      }
      return this;
    };
    RBush2.prototype.insert = function insert(item) {
      if (item) {
        this._insert(item, this.data.height - 1);
      }
      return this;
    };
    RBush2.prototype.clear = function clear() {
      this.data = createNode([]);
      return this;
    };
    RBush2.prototype.remove = function remove(item, equalsFn) {
      if (!item) {
        return this;
      }
      var node = this.data;
      var bbox = this.toBBox(item);
      var path = [];
      var indexes = [];
      var i, parent, goingUp;
      while (node || path.length) {
        if (!node) {
          node = path.pop();
          parent = path[path.length - 1];
          i = indexes.pop();
          goingUp = true;
        }
        if (node.leaf) {
          var index = findItem(item, node.children, equalsFn);
          if (index !== -1) {
            node.children.splice(index, 1);
            path.push(node);
            this._condense(path);
            return this;
          }
        }
        if (!goingUp && !node.leaf && contains2(node, bbox)) {
          path.push(node);
          indexes.push(i);
          i = 0;
          parent = node;
          node = node.children[0];
        } else if (parent) {
          i++;
          node = parent.children[i];
          goingUp = false;
        } else {
          node = null;
        }
      }
      return this;
    };
    RBush2.prototype.toBBox = function toBBox(item) {
      return item;
    };
    RBush2.prototype.compareMinX = function compareMinX(a, b) {
      return a.minX - b.minX;
    };
    RBush2.prototype.compareMinY = function compareMinY(a, b) {
      return a.minY - b.minY;
    };
    RBush2.prototype.toJSON = function toJSON() {
      return this.data;
    };
    RBush2.prototype.fromJSON = function fromJSON(data2) {
      this.data = data2;
      return this;
    };
    RBush2.prototype._all = function _all(node, result) {
      var nodesToSearch = [];
      while (node) {
        if (node.leaf) {
          result.push.apply(result, node.children);
        } else {
          nodesToSearch.push.apply(nodesToSearch, node.children);
        }
        node = nodesToSearch.pop();
      }
      return result;
    };
    RBush2.prototype._build = function _build(items, left, right, height) {
      var N = right - left + 1;
      var M = this._maxEntries;
      var node;
      if (N <= M) {
        node = createNode(items.slice(left, right + 1));
        calcBBox(node, this.toBBox);
        return node;
      }
      if (!height) {
        height = Math.ceil(Math.log(N) / Math.log(M));
        M = Math.ceil(N / Math.pow(M, height - 1));
      }
      node = createNode([]);
      node.leaf = false;
      node.height = height;
      var N2 = Math.ceil(N / M);
      var N1 = N2 * Math.ceil(Math.sqrt(M));
      multiSelect(items, left, right, N1, this.compareMinX);
      for (var i = left; i <= right; i += N1) {
        var right2 = Math.min(i + N1 - 1, right);
        multiSelect(items, i, right2, N2, this.compareMinY);
        for (var j = i; j <= right2; j += N2) {
          var right3 = Math.min(j + N2 - 1, right2);
          node.children.push(this._build(items, j, right3, height - 1));
        }
      }
      calcBBox(node, this.toBBox);
      return node;
    };
    RBush2.prototype._chooseSubtree = function _chooseSubtree(bbox, node, level, path) {
      while (true) {
        path.push(node);
        if (node.leaf || path.length - 1 === level) {
          break;
        }
        var minArea = Infinity;
        var minEnlargement = Infinity;
        var targetNode = void 0;
        for (var i = 0; i < node.children.length; i++) {
          var child = node.children[i];
          var area = bboxArea(child);
          var enlargement = enlargedArea(bbox, child) - area;
          if (enlargement < minEnlargement) {
            minEnlargement = enlargement;
            minArea = area < minArea ? area : minArea;
            targetNode = child;
          } else if (enlargement === minEnlargement) {
            if (area < minArea) {
              minArea = area;
              targetNode = child;
            }
          }
        }
        node = targetNode || node.children[0];
      }
      return node;
    };
    RBush2.prototype._insert = function _insert(item, level, isNode) {
      var bbox = isNode ? item : this.toBBox(item);
      var insertPath = [];
      var node = this._chooseSubtree(bbox, this.data, level, insertPath);
      node.children.push(item);
      extend2(node, bbox);
      while (level >= 0) {
        if (insertPath[level].children.length > this._maxEntries) {
          this._split(insertPath, level);
          level--;
        } else {
          break;
        }
      }
      this._adjustParentBBoxes(bbox, insertPath, level);
    };
    RBush2.prototype._split = function _split(insertPath, level) {
      var node = insertPath[level];
      var M = node.children.length;
      var m = this._minEntries;
      this._chooseSplitAxis(node, m, M);
      var splitIndex = this._chooseSplitIndex(node, m, M);
      var newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
      newNode.height = node.height;
      newNode.leaf = node.leaf;
      calcBBox(node, this.toBBox);
      calcBBox(newNode, this.toBBox);
      if (level) {
        insertPath[level - 1].children.push(newNode);
      } else {
        this._splitRoot(node, newNode);
      }
    };
    RBush2.prototype._splitRoot = function _splitRoot(node, newNode) {
      this.data = createNode([node, newNode]);
      this.data.height = node.height + 1;
      this.data.leaf = false;
      calcBBox(this.data, this.toBBox);
    };
    RBush2.prototype._chooseSplitIndex = function _chooseSplitIndex(node, m, M) {
      var index;
      var minOverlap = Infinity;
      var minArea = Infinity;
      for (var i = m; i <= M - m; i++) {
        var bbox1 = distBBox(node, 0, i, this.toBBox);
        var bbox2 = distBBox(node, i, M, this.toBBox);
        var overlap = intersectionArea(bbox1, bbox2);
        var area = bboxArea(bbox1) + bboxArea(bbox2);
        if (overlap < minOverlap) {
          minOverlap = overlap;
          index = i;
          minArea = area < minArea ? area : minArea;
        } else if (overlap === minOverlap) {
          if (area < minArea) {
            minArea = area;
            index = i;
          }
        }
      }
      return index || M - m;
    };
    RBush2.prototype._chooseSplitAxis = function _chooseSplitAxis(node, m, M) {
      var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX;
      var compareMinY = node.leaf ? this.compareMinY : compareNodeMinY;
      var xMargin = this._allDistMargin(node, m, M, compareMinX);
      var yMargin = this._allDistMargin(node, m, M, compareMinY);
      if (xMargin < yMargin) {
        node.children.sort(compareMinX);
      }
    };
    RBush2.prototype._allDistMargin = function _allDistMargin(node, m, M, compare) {
      node.children.sort(compare);
      var toBBox = this.toBBox;
      var leftBBox = distBBox(node, 0, m, toBBox);
      var rightBBox = distBBox(node, M - m, M, toBBox);
      var margin = bboxMargin(leftBBox) + bboxMargin(rightBBox);
      for (var i = m; i < M - m; i++) {
        var child = node.children[i];
        extend2(leftBBox, node.leaf ? toBBox(child) : child);
        margin += bboxMargin(leftBBox);
      }
      for (var i$1 = M - m - 1; i$1 >= m; i$1--) {
        var child$1 = node.children[i$1];
        extend2(rightBBox, node.leaf ? toBBox(child$1) : child$1);
        margin += bboxMargin(rightBBox);
      }
      return margin;
    };
    RBush2.prototype._adjustParentBBoxes = function _adjustParentBBoxes(bbox, path, level) {
      for (var i = level; i >= 0; i--) {
        extend2(path[i], bbox);
      }
    };
    RBush2.prototype._condense = function _condense(path) {
      for (var i = path.length - 1, siblings = void 0; i >= 0; i--) {
        if (path[i].children.length === 0) {
          if (i > 0) {
            siblings = path[i - 1].children;
            siblings.splice(siblings.indexOf(path[i]), 1);
          } else {
            this.clear();
          }
        } else {
          calcBBox(path[i], this.toBBox);
        }
      }
    };
    function findItem(item, items, equalsFn) {
      if (!equalsFn) {
        return items.indexOf(item);
      }
      for (var i = 0; i < items.length; i++) {
        if (equalsFn(item, items[i])) {
          return i;
        }
      }
      return -1;
    }
    function calcBBox(node, toBBox) {
      distBBox(node, 0, node.children.length, toBBox, node);
    }
    function distBBox(node, k, p, toBBox, destNode) {
      if (!destNode) {
        destNode = createNode(null);
      }
      destNode.minX = Infinity;
      destNode.minY = Infinity;
      destNode.maxX = -Infinity;
      destNode.maxY = -Infinity;
      for (var i = k; i < p; i++) {
        var child = node.children[i];
        extend2(destNode, node.leaf ? toBBox(child) : child);
      }
      return destNode;
    }
    function extend2(a, b) {
      a.minX = Math.min(a.minX, b.minX);
      a.minY = Math.min(a.minY, b.minY);
      a.maxX = Math.max(a.maxX, b.maxX);
      a.maxY = Math.max(a.maxY, b.maxY);
      return a;
    }
    function compareNodeMinX(a, b) {
      return a.minX - b.minX;
    }
    function compareNodeMinY(a, b) {
      return a.minY - b.minY;
    }
    function bboxArea(a) {
      return (a.maxX - a.minX) * (a.maxY - a.minY);
    }
    function bboxMargin(a) {
      return a.maxX - a.minX + (a.maxY - a.minY);
    }
    function enlargedArea(a, b) {
      return (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) * (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY));
    }
    function intersectionArea(a, b) {
      var minX = Math.max(a.minX, b.minX);
      var minY = Math.max(a.minY, b.minY);
      var maxX = Math.min(a.maxX, b.maxX);
      var maxY = Math.min(a.maxY, b.maxY);
      return Math.max(0, maxX - minX) * Math.max(0, maxY - minY);
    }
    function contains2(a, b) {
      return a.minX <= b.minX && a.minY <= b.minY && b.maxX <= a.maxX && b.maxY <= a.maxY;
    }
    function intersects(a, b) {
      return b.minX <= a.maxX && b.minY <= a.maxY && b.maxX >= a.minX && b.maxY >= a.minY;
    }
    function createNode(children) {
      return {
        children,
        height: 1,
        leaf: true,
        minX: Infinity,
        minY: Infinity,
        maxX: -Infinity,
        maxY: -Infinity
      };
    }
    function multiSelect(arr, left, right, n, compare) {
      var stack = [left, right];
      while (stack.length) {
        right = stack.pop();
        left = stack.pop();
        if (right - left <= n) {
          continue;
        }
        var mid = left + Math.ceil((right - left) / n / 2) * n;
        quickselect(arr, mid, left, right, compare);
        stack.push(left, mid, mid, right);
      }
    }
    return RBush2;
  });
})(rbush);
var RBush = rbush.exports;
var Shape;
(function(Shape2) {
  Shape2["GROUP"] = "g";
  Shape2["CIRCLE"] = "circle";
  Shape2["ELLIPSE"] = "ellipse";
  Shape2["IMAGE"] = "image";
  Shape2["RECT"] = "rect";
  Shape2["LINE"] = "line";
  Shape2["POLYLINE"] = "polyline";
  Shape2["POLYGON"] = "polygon";
  Shape2["TEXT"] = "text";
  Shape2["PATH"] = "path";
  Shape2["HTML"] = "html";
  Shape2["MESH"] = "mesh";
})(Shape || (Shape = {}));
var ClipSpaceNearZ;
(function(ClipSpaceNearZ2) {
  ClipSpaceNearZ2[ClipSpaceNearZ2["ZERO"] = 0] = "ZERO";
  ClipSpaceNearZ2[ClipSpaceNearZ2["NEGATIVE_ONE"] = 1] = "NEGATIVE_ONE";
})(ClipSpaceNearZ || (ClipSpaceNearZ = {}));
var AbstractRendererPlugin = (
  /** @class */
  function() {
    function AbstractRendererPlugin2() {
      this.plugins = [];
    }
    AbstractRendererPlugin2.prototype.addRenderingPlugin = function(plugin) {
      this.plugins.push(plugin);
      this.context.renderingPlugins.push(plugin);
    };
    AbstractRendererPlugin2.prototype.removeAllRenderingPlugins = function() {
      var _this = this;
      this.plugins.forEach(function(plugin) {
        var index = _this.context.renderingPlugins.indexOf(plugin);
        if (index >= 0) {
          _this.context.renderingPlugins.splice(index, 1);
        }
      });
    };
    return AbstractRendererPlugin2;
  }()
);
var AbstractRenderer = (
  /** @class */
  function() {
    function AbstractRenderer2(config) {
      this.clipSpaceNearZ = ClipSpaceNearZ.NEGATIVE_ONE;
      this.plugins = [];
      this.config = __assign({
        /**
         * only dirty object will cause re-render
         */
        enableDirtyCheck: true,
        enableCulling: false,
        /**
         * enable auto rendering by default
         */
        enableAutoRendering: true,
        /**
         * enable dirty rectangle rendering by default
         */
        enableDirtyRectangleRendering: true,
        enableDirtyRectangleRenderingDebug: false,
        enableSizeAttenuation: true
      }, config);
    }
    AbstractRenderer2.prototype.registerPlugin = function(plugin) {
      var index = this.plugins.findIndex(function(p) {
        return p === plugin;
      });
      if (index === -1) {
        this.plugins.push(plugin);
      }
    };
    AbstractRenderer2.prototype.unregisterPlugin = function(plugin) {
      var index = this.plugins.findIndex(function(p) {
        return p === plugin;
      });
      if (index > -1) {
        this.plugins.splice(index, 1);
      }
    };
    AbstractRenderer2.prototype.getPlugins = function() {
      return this.plugins;
    };
    AbstractRenderer2.prototype.getPlugin = function(name) {
      return this.plugins.find(function(plugin) {
        return plugin.name === name;
      });
    };
    AbstractRenderer2.prototype.getConfig = function() {
      return this.config;
    };
    AbstractRenderer2.prototype.setConfig = function(config) {
      Object.assign(this.config, config);
    };
    return AbstractRenderer2;
  }()
);
function copyVec3(a, b) {
  a[0] = b[0];
  a[1] = b[1];
  a[2] = b[2];
  return a;
}
function subVec3(o, a, b) {
  o[0] = a[0] - b[0];
  o[1] = a[1] - b[1];
  o[2] = a[2] - b[2];
  return o;
}
function addVec3(o, a, b) {
  o[0] = a[0] + b[0];
  o[1] = a[1] + b[1];
  o[2] = a[2] + b[2];
  return o;
}
function scaleVec3(o, a, b) {
  o[0] = a[0] * b;
  o[1] = a[1] * b;
  o[2] = a[2] * b;
  return o;
}
function maxVec3(o, a, b) {
  o[0] = Math.max(a[0], b[0]);
  o[1] = Math.max(a[1], b[1]);
  o[2] = Math.max(a[2], b[2]);
  return o;
}
function minVec3(o, a, b) {
  o[0] = Math.min(a[0], b[0]);
  o[1] = Math.min(a[1], b[1]);
  o[2] = Math.min(a[2], b[2]);
  return o;
}
function getAngle2(angle3) {
  if (angle3 === void 0) {
    return 0;
  } else if (angle3 > 360 || angle3 < -360) {
    return angle3 % 360;
  }
  return angle3;
}
function createVec3(x, y, z) {
  if (y === void 0) {
    y = 0;
  }
  if (z === void 0) {
    z = 0;
  }
  if (Array.isArray(x) && x.length === 3) {
    return vec3_exports.clone(x);
  }
  if (is_number_default(x)) {
    return vec3_exports.fromValues(x, y, z);
  }
  return vec3_exports.fromValues(x[0], x[1] || y, x[2] || z);
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
function rad2deg(rad) {
  return rad * (180 / Math.PI);
}
function grad2deg(grads) {
  grads = grads % 400;
  if (grads < 0) {
    grads += 400;
  }
  return grads / 400 * 360;
}
function deg2turn(deg) {
  return deg / 360;
}
function turn2deg(turn) {
  return 360 * turn;
}
function getEulerFromQuat(out, quat2) {
  var x = quat2[0];
  var y = quat2[1];
  var z = quat2[2];
  var w = quat2[3];
  var x2 = x * x;
  var y2 = y * y;
  var z2 = z * z;
  var w2 = w * w;
  var unit = x2 + y2 + z2 + w2;
  var test = x * w - y * z;
  if (test > 0.499995 * unit) {
    out[0] = Math.PI / 2;
    out[1] = 2 * Math.atan2(y, x);
    out[2] = 0;
  } else if (test < -0.499995 * unit) {
    out[0] = -Math.PI / 2;
    out[1] = 2 * Math.atan2(y, x);
    out[2] = 0;
  } else {
    out[0] = Math.asin(2 * (x * z - w * y));
    out[1] = Math.atan2(2 * (x * w + y * z), 1 - 2 * (z2 + w2));
    out[2] = Math.atan2(2 * (x * y + z * w), 1 - 2 * (y2 + z2));
  }
  return out;
}
function getEulerFromMat4(out, m) {
  var x;
  var z;
  var halfPi = Math.PI * 0.5;
  var _a = __read(mat4_exports.getScaling(vec3_exports.create(), m), 3), sx = _a[0], sy = _a[1], sz = _a[2];
  var y = Math.asin(-m[2] / sx);
  if (y < halfPi) {
    if (y > -halfPi) {
      x = Math.atan2(m[6] / sy, m[10] / sz);
      z = Math.atan2(m[1] / sx, m[0] / sx);
    } else {
      z = 0;
      x = -Math.atan2(m[4] / sy, m[5] / sy);
    }
  } else {
    z = 0;
    x = Math.atan2(m[4] / sy, m[5] / sy);
  }
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function getEuler(out, quat2) {
  if (quat2.length === 16) {
    return getEulerFromMat4(out, quat2);
  } else {
    return getEulerFromQuat(out, quat2);
  }
}
function fromRotationTranslationScale2(rotation, x, y, scaleX, scaleY) {
  var cos = Math.cos(rotation);
  var sin = Math.sin(rotation);
  return mat3_exports.fromValues(scaleX * cos, scaleY * sin, 0, -scaleX * sin, scaleY * cos, 0, x, y, 1);
}
function makePerspective(out, left, right, top, bottom, near, far, zero4) {
  if (zero4 === void 0) {
    zero4 = false;
  }
  var x = 2 * near / (right - left);
  var y = 2 * near / (top - bottom);
  var a = (right + left) / (right - left);
  var b = (top + bottom) / (top - bottom);
  var c;
  var d;
  if (zero4) {
    c = -far / (far - near);
    d = -far * near / (far - near);
  } else {
    c = -(far + near) / (far - near);
    d = -2 * far * near / (far - near);
  }
  out[0] = x;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = y;
  out[6] = 0;
  out[7] = 0;
  out[8] = a;
  out[9] = b;
  out[10] = c;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = d;
  out[15] = 0;
  return out;
}
function decompose(mat) {
  var row0x = mat[0];
  var row0y = mat[1];
  var row1x = mat[3];
  var row1y = mat[4];
  var scalingX = Math.sqrt(row0x * row0x + row0y * row0y);
  var scalingY = Math.sqrt(row1x * row1x + row1y * row1y);
  var determinant3 = row0x * row1y - row0y * row1x;
  if (determinant3 < 0) {
    if (row0x < row1y) {
      scalingX = -scalingX;
    } else {
      scalingY = -scalingY;
    }
  }
  if (scalingX) {
    row0x *= 1 / scalingX;
    row0y *= 1 / scalingX;
  }
  if (scalingY) {
    row1x *= 1 / scalingY;
    row1y *= 1 / scalingY;
  }
  var rotation = Math.atan2(row0y, row0x);
  var angle3 = rad2deg(rotation);
  return [mat[6], mat[7], scalingX, scalingY, angle3];
}
var tmp = mat4_exports.create();
var perspectiveMatrix = mat4_exports.create();
var tmpVec4 = vec4_exports.create();
var row = [vec3_exports.create(), vec3_exports.create(), vec3_exports.create()];
var pdum3 = vec3_exports.create();
function decomposeMat4(matrix, translation, scale7, skew, perspective2, quaternion) {
  if (!normalize5(tmp, matrix))
    return false;
  mat4_exports.copy(perspectiveMatrix, tmp);
  perspectiveMatrix[3] = 0;
  perspectiveMatrix[7] = 0;
  perspectiveMatrix[11] = 0;
  perspectiveMatrix[15] = 1;
  if (Math.abs(mat4_exports.determinant(perspectiveMatrix)) < 1e-8)
    return false;
  var a03 = tmp[3], a13 = tmp[7], a23 = tmp[11], a30 = tmp[12], a31 = tmp[13], a32 = tmp[14], a33 = tmp[15];
  if (a03 !== 0 || a13 !== 0 || a23 !== 0) {
    tmpVec4[0] = a03;
    tmpVec4[1] = a13;
    tmpVec4[2] = a23;
    tmpVec4[3] = a33;
    var ret = mat4_exports.invert(perspectiveMatrix, perspectiveMatrix);
    if (!ret)
      return false;
    mat4_exports.transpose(perspectiveMatrix, perspectiveMatrix);
    vec4_exports.transformMat4(perspective2, tmpVec4, perspectiveMatrix);
  } else {
    perspective2[0] = perspective2[1] = perspective2[2] = 0;
    perspective2[3] = 1;
  }
  translation[0] = a30;
  translation[1] = a31;
  translation[2] = a32;
  mat3from4(row, tmp);
  scale7[0] = vec3_exports.length(row[0]);
  vec3_exports.normalize(row[0], row[0]);
  skew[0] = vec3_exports.dot(row[0], row[1]);
  combine(row[1], row[1], row[0], 1, -skew[0]);
  scale7[1] = vec3_exports.length(row[1]);
  vec3_exports.normalize(row[1], row[1]);
  skew[0] /= scale7[1];
  skew[1] = vec3_exports.dot(row[0], row[2]);
  combine(row[2], row[2], row[0], 1, -skew[1]);
  skew[2] = vec3_exports.dot(row[1], row[2]);
  combine(row[2], row[2], row[1], 1, -skew[2]);
  scale7[2] = vec3_exports.length(row[2]);
  vec3_exports.normalize(row[2], row[2]);
  skew[1] /= scale7[2];
  skew[2] /= scale7[2];
  vec3_exports.cross(pdum3, row[1], row[2]);
  if (vec3_exports.dot(row[0], pdum3) < 0) {
    for (var i = 0; i < 3; i++) {
      scale7[i] *= -1;
      row[i][0] *= -1;
      row[i][1] *= -1;
      row[i][2] *= -1;
    }
  }
  quaternion[0] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] - row[1][1] - row[2][2], 0));
  quaternion[1] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] + row[1][1] - row[2][2], 0));
  quaternion[2] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] - row[1][1] + row[2][2], 0));
  quaternion[3] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] + row[1][1] + row[2][2], 0));
  if (row[2][1] > row[1][2])
    quaternion[0] = -quaternion[0];
  if (row[0][2] > row[2][0])
    quaternion[1] = -quaternion[1];
  if (row[1][0] > row[0][1])
    quaternion[2] = -quaternion[2];
  return true;
}
function normalize5(out, mat) {
  var m44 = mat[15];
  if (m44 === 0)
    return false;
  var scale7 = 1 / m44;
  for (var i = 0; i < 16; i++)
    out[i] = mat[i] * scale7;
  return true;
}
function mat3from4(out, mat4x4) {
  out[0][0] = mat4x4[0];
  out[0][1] = mat4x4[1];
  out[0][2] = mat4x4[2];
  out[1][0] = mat4x4[4];
  out[1][1] = mat4x4[5];
  out[1][2] = mat4x4[6];
  out[2][0] = mat4x4[8];
  out[2][1] = mat4x4[9];
  out[2][2] = mat4x4[10];
}
function combine(out, a, b, scale1, scale22) {
  out[0] = a[0] * scale1 + b[0] * scale22;
  out[1] = a[1] * scale1 + b[1] * scale22;
  out[2] = a[2] * scale1 + b[2] * scale22;
}
var AABB = (
  /** @class */
  function() {
    function AABB2() {
      this.center = [0, 0, 0];
      this.halfExtents = [0, 0, 0];
      this.min = [0, 0, 0];
      this.max = [0, 0, 0];
    }
    AABB2.isEmpty = function(aabb) {
      return !aabb || aabb.halfExtents[0] === 0 && aabb.halfExtents[1] === 0 && aabb.halfExtents[2] === 0;
    };
    AABB2.prototype.update = function(center, halfExtents) {
      copyVec3(this.center, center);
      copyVec3(this.halfExtents, halfExtents);
      subVec3(this.min, this.center, this.halfExtents);
      addVec3(this.max, this.center, this.halfExtents);
    };
    AABB2.prototype.setMinMax = function(min4, max4) {
      addVec3(this.center, max4, min4);
      scaleVec3(this.center, this.center, 0.5);
      subVec3(this.halfExtents, max4, min4);
      scaleVec3(this.halfExtents, this.halfExtents, 0.5);
      copyVec3(this.min, min4);
      copyVec3(this.max, max4);
    };
    AABB2.prototype.getMin = function() {
      return this.min;
    };
    AABB2.prototype.getMax = function() {
      return this.max;
    };
    AABB2.prototype.add = function(aabb) {
      if (AABB2.isEmpty(aabb)) {
        return;
      }
      if (AABB2.isEmpty(this)) {
        this.setMinMax(aabb.getMin(), aabb.getMax());
        return;
      }
      var tc = this.center;
      var tcx = tc[0];
      var tcy = tc[1];
      var tcz = tc[2];
      var th = this.halfExtents;
      var thx = th[0];
      var thy = th[1];
      var thz = th[2];
      var tminx = tcx - thx;
      var tmaxx = tcx + thx;
      var tminy = tcy - thy;
      var tmaxy = tcy + thy;
      var tminz = tcz - thz;
      var tmaxz = tcz + thz;
      var oc = aabb.center;
      var ocx = oc[0];
      var ocy = oc[1];
      var ocz = oc[2];
      var oh = aabb.halfExtents;
      var ohx = oh[0];
      var ohy = oh[1];
      var ohz = oh[2];
      var ominx = ocx - ohx;
      var omaxx = ocx + ohx;
      var ominy = ocy - ohy;
      var omaxy = ocy + ohy;
      var ominz = ocz - ohz;
      var omaxz = ocz + ohz;
      if (ominx < tminx) {
        tminx = ominx;
      }
      if (omaxx > tmaxx) {
        tmaxx = omaxx;
      }
      if (ominy < tminy) {
        tminy = ominy;
      }
      if (omaxy > tmaxy) {
        tmaxy = omaxy;
      }
      if (ominz < tminz) {
        tminz = ominz;
      }
      if (omaxz > tmaxz) {
        tmaxz = omaxz;
      }
      tc[0] = (tminx + tmaxx) * 0.5;
      tc[1] = (tminy + tmaxy) * 0.5;
      tc[2] = (tminz + tmaxz) * 0.5;
      th[0] = (tmaxx - tminx) * 0.5;
      th[1] = (tmaxy - tminy) * 0.5;
      th[2] = (tmaxz - tminz) * 0.5;
      this.min[0] = tminx;
      this.min[1] = tminy;
      this.min[2] = tminz;
      this.max[0] = tmaxx;
      this.max[1] = tmaxy;
      this.max[2] = tmaxz;
    };
    AABB2.prototype.setFromTransformedAABB = function(aabb, m) {
      var bc = this.center;
      var br = this.halfExtents;
      var ac = aabb.center;
      var ar = aabb.halfExtents;
      var mx0 = m[0];
      var mx1 = m[4];
      var mx2 = m[8];
      var my0 = m[1];
      var my1 = m[5];
      var my2 = m[9];
      var mz0 = m[2];
      var mz1 = m[6];
      var mz2 = m[10];
      var mx0a = Math.abs(mx0);
      var mx1a = Math.abs(mx1);
      var mx2a = Math.abs(mx2);
      var my0a = Math.abs(my0);
      var my1a = Math.abs(my1);
      var my2a = Math.abs(my2);
      var mz0a = Math.abs(mz0);
      var mz1a = Math.abs(mz1);
      var mz2a = Math.abs(mz2);
      bc[0] = m[12] + mx0 * ac[0] + mx1 * ac[1] + mx2 * ac[2];
      bc[1] = m[13] + my0 * ac[0] + my1 * ac[1] + my2 * ac[2];
      bc[2] = m[14] + mz0 * ac[0] + mz1 * ac[1] + mz2 * ac[2];
      br[0] = mx0a * ar[0] + mx1a * ar[1] + mx2a * ar[2];
      br[1] = my0a * ar[0] + my1a * ar[1] + my2a * ar[2];
      br[2] = mz0a * ar[0] + mz1a * ar[1] + mz2a * ar[2];
      subVec3(this.min, bc, br);
      addVec3(this.max, bc, br);
    };
    AABB2.prototype.intersects = function(aabb) {
      var aMax = this.getMax();
      var aMin = this.getMin();
      var bMax = aabb.getMax();
      var bMin = aabb.getMin();
      return aMin[0] <= bMax[0] && aMax[0] >= bMin[0] && aMin[1] <= bMax[1] && aMax[1] >= bMin[1] && aMin[2] <= bMax[2] && aMax[2] >= bMin[2];
    };
    AABB2.prototype.intersection = function(aabb) {
      if (!this.intersects(aabb)) {
        return null;
      }
      var intersection = new AABB2();
      var min4 = maxVec3([0, 0, 0], this.getMin(), aabb.getMin());
      var max4 = minVec3([0, 0, 0], this.getMax(), aabb.getMax());
      intersection.setMinMax(min4, max4);
      return intersection;
    };
    AABB2.prototype.getNegativeFarPoint = function(plane) {
      if (plane.pnVertexFlag === 273) {
        return copyVec3([0, 0, 0], this.min);
      } else if (plane.pnVertexFlag === 272) {
        return [this.min[0], this.min[1], this.max[2]];
      } else if (plane.pnVertexFlag === 257) {
        return [this.min[0], this.max[1], this.min[2]];
      } else if (plane.pnVertexFlag === 256) {
        return [this.min[0], this.max[1], this.max[2]];
      } else if (plane.pnVertexFlag === 17) {
        return [this.max[0], this.min[1], this.min[2]];
      } else if (plane.pnVertexFlag === 16) {
        return [this.max[0], this.min[1], this.max[2]];
      } else if (plane.pnVertexFlag === 1) {
        return [this.max[0], this.max[1], this.min[2]];
      } else {
        return [this.max[0], this.max[1], this.max[2]];
      }
    };
    AABB2.prototype.getPositiveFarPoint = function(plane) {
      if (plane.pnVertexFlag === 273) {
        return copyVec3([0, 0, 0], this.max);
      } else if (plane.pnVertexFlag === 272) {
        return [this.max[0], this.max[1], this.min[2]];
      } else if (plane.pnVertexFlag === 257) {
        return [this.max[0], this.min[1], this.max[2]];
      } else if (plane.pnVertexFlag === 256) {
        return [this.max[0], this.min[1], this.min[2]];
      } else if (plane.pnVertexFlag === 17) {
        return [this.min[0], this.max[1], this.max[2]];
      } else if (plane.pnVertexFlag === 16) {
        return [this.min[0], this.max[1], this.min[2]];
      } else if (plane.pnVertexFlag === 1) {
        return [this.min[0], this.min[1], this.max[2]];
      } else {
        return [this.min[0], this.min[1], this.min[2]];
      }
    };
    return AABB2;
  }()
);
var Plane = (
  /** @class */
  function() {
    function Plane2(distance5, normal) {
      this.distance = distance5 || 0;
      this.normal = normal || vec3_exports.fromValues(0, 1, 0);
      this.updatePNVertexFlag();
    }
    Plane2.prototype.updatePNVertexFlag = function() {
      this.pnVertexFlag = (Number(this.normal[0] >= 0) << 8) + (Number(this.normal[1] >= 0) << 4) + Number(this.normal[2] >= 0);
    };
    Plane2.prototype.distanceToPoint = function(point) {
      return vec3_exports.dot(point, this.normal) - this.distance;
    };
    Plane2.prototype.normalize = function() {
      var invLen = 1 / vec3_exports.len(this.normal);
      vec3_exports.scale(this.normal, this.normal, invLen);
      this.distance *= invLen;
    };
    Plane2.prototype.intersectsLine = function(start, end, point) {
      var d0 = this.distanceToPoint(start);
      var d1 = this.distanceToPoint(end);
      var t = d0 / (d0 - d1);
      var intersects = t >= 0 && t <= 1;
      if (intersects && point) {
        vec3_exports.lerp(point, start, end, t);
      }
      return intersects;
    };
    return Plane2;
  }()
);
var Mask;
(function(Mask2) {
  Mask2[Mask2["OUTSIDE"] = 4294967295] = "OUTSIDE";
  Mask2[Mask2["INSIDE"] = 0] = "INSIDE";
  Mask2[Mask2["INDETERMINATE"] = 2147483647] = "INDETERMINATE";
})(Mask || (Mask = {}));
var Frustum = (
  /** @class */
  function() {
    function Frustum2(planes) {
      this.planes = [];
      if (planes) {
        this.planes = planes;
      } else {
        for (var i = 0; i < 6; i++) {
          this.planes.push(new Plane());
        }
      }
    }
    Frustum2.prototype.extractFromVPMatrix = function(projectionMatrix) {
      var _a = __read(projectionMatrix, 16), m0 = _a[0], m1 = _a[1], m2 = _a[2], m3 = _a[3], m4 = _a[4], m5 = _a[5], m6 = _a[6], m7 = _a[7], m8 = _a[8], m9 = _a[9], m10 = _a[10], m11 = _a[11], m12 = _a[12], m13 = _a[13], m14 = _a[14], m15 = _a[15];
      vec3_exports.set(this.planes[0].normal, m3 - m0, m7 - m4, m11 - m8);
      this.planes[0].distance = m15 - m12;
      vec3_exports.set(this.planes[1].normal, m3 + m0, m7 + m4, m11 + m8);
      this.planes[1].distance = m15 + m12;
      vec3_exports.set(this.planes[2].normal, m3 + m1, m7 + m5, m11 + m9);
      this.planes[2].distance = m15 + m13;
      vec3_exports.set(this.planes[3].normal, m3 - m1, m7 - m5, m11 - m9);
      this.planes[3].distance = m15 - m13;
      vec3_exports.set(this.planes[4].normal, m3 - m2, m7 - m6, m11 - m10);
      this.planes[4].distance = m15 - m14;
      vec3_exports.set(this.planes[5].normal, m3 + m2, m7 + m6, m11 + m10);
      this.planes[5].distance = m15 + m14;
      this.planes.forEach(function(plane) {
        plane.normalize();
        plane.updatePNVertexFlag();
      });
    };
    return Frustum2;
  }()
);
var Point = (
  /** @class */
  function() {
    function Point2(x, y) {
      if (x === void 0) {
        x = 0;
      }
      if (y === void 0) {
        y = 0;
      }
      this.x = 0;
      this.y = 0;
      this.x = x;
      this.y = y;
    }
    Point2.prototype.clone = function() {
      return new Point2(this.x, this.y);
    };
    Point2.prototype.copyFrom = function(p) {
      this.x = p.x;
      this.y = p.y;
    };
    return Point2;
  }()
);
var Rectangle = (
  /** @class */
  function() {
    function Rectangle2(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.left = x;
      this.right = x + width;
      this.top = y;
      this.bottom = y + height;
    }
    Rectangle2.fromRect = function(rect) {
      return new Rectangle2(rect.x, rect.y, rect.width, rect.height);
    };
    Rectangle2.applyTransform = function(rect, matrix) {
      var topLeft = vec4_exports.fromValues(rect.x, rect.y, 0, 1);
      var topRight = vec4_exports.fromValues(rect.x + rect.width, rect.y, 0, 1);
      var bottomLeft = vec4_exports.fromValues(rect.x, rect.y + rect.height, 0, 1);
      var bottomRight = vec4_exports.fromValues(rect.x + rect.width, rect.y + rect.height, 0, 1);
      var transformedTopLeft = vec4_exports.create();
      var transformedTopRight = vec4_exports.create();
      var transformedBottomLeft = vec4_exports.create();
      var transformedBottomRight = vec4_exports.create();
      vec4_exports.transformMat4(transformedTopLeft, topLeft, matrix);
      vec4_exports.transformMat4(transformedTopRight, topRight, matrix);
      vec4_exports.transformMat4(transformedBottomLeft, bottomLeft, matrix);
      vec4_exports.transformMat4(transformedBottomRight, bottomRight, matrix);
      var minX = Math.min(transformedTopLeft[0], transformedTopRight[0], transformedBottomLeft[0], transformedBottomRight[0]);
      var minY = Math.min(transformedTopLeft[1], transformedTopRight[1], transformedBottomLeft[1], transformedBottomRight[1]);
      var maxX = Math.max(transformedTopLeft[0], transformedTopRight[0], transformedBottomLeft[0], transformedBottomRight[0]);
      var maxY = Math.max(transformedTopLeft[1], transformedTopRight[1], transformedBottomLeft[1], transformedBottomRight[1]);
      return Rectangle2.fromRect({
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      });
    };
    Rectangle2.prototype.toJSON = function() {
    };
    return Rectangle2;
  }()
);
var ERROR_MSG_METHOD_NOT_IMPLEMENTED = "Method not implemented.";
var ERROR_MSG_USE_DOCUMENT_ELEMENT = "Use document.documentElement instead.";
var ERROR_MSG_APPEND_DESTROYED_ELEMENT = "Cannot append a destroyed element.";
var CameraType;
(function(CameraType2) {
  CameraType2[CameraType2["ORBITING"] = 0] = "ORBITING";
  CameraType2[CameraType2["EXPLORING"] = 1] = "EXPLORING";
  CameraType2[CameraType2["TRACKING"] = 2] = "TRACKING";
})(CameraType || (CameraType = {}));
var CameraTrackingMode;
(function(CameraTrackingMode2) {
  CameraTrackingMode2[CameraTrackingMode2["DEFAULT"] = 0] = "DEFAULT";
  CameraTrackingMode2[CameraTrackingMode2["ROTATIONAL"] = 1] = "ROTATIONAL";
  CameraTrackingMode2[CameraTrackingMode2["TRANSLATIONAL"] = 2] = "TRANSLATIONAL";
  CameraTrackingMode2[CameraTrackingMode2["CINEMATIC"] = 3] = "CINEMATIC";
})(CameraTrackingMode || (CameraTrackingMode = {}));
var CameraProjectionMode;
(function(CameraProjectionMode2) {
  CameraProjectionMode2[CameraProjectionMode2["ORTHOGRAPHIC"] = 0] = "ORTHOGRAPHIC";
  CameraProjectionMode2[CameraProjectionMode2["PERSPECTIVE"] = 1] = "PERSPECTIVE";
})(CameraProjectionMode || (CameraProjectionMode = {}));
var CameraEvent = {
  UPDATED: "updated"
};
var MIN_DISTANCE = 2e-4;
var Camera = (
  /** @class */
  function() {
    function Camera2() {
      this.clipSpaceNearZ = ClipSpaceNearZ.NEGATIVE_ONE;
      this.eventEmitter = new eventemitter3_default();
      this.matrix = mat4_exports.create();
      this.right = vec3_exports.fromValues(1, 0, 0);
      this.up = vec3_exports.fromValues(0, 1, 0);
      this.forward = vec3_exports.fromValues(0, 0, 1);
      this.position = vec3_exports.fromValues(0, 0, 1);
      this.focalPoint = vec3_exports.fromValues(0, 0, 0);
      this.distanceVector = vec3_exports.fromValues(0, 0, -1);
      this.distance = 1;
      this.azimuth = 0;
      this.elevation = 0;
      this.roll = 0;
      this.relAzimuth = 0;
      this.relElevation = 0;
      this.relRoll = 0;
      this.dollyingStep = 0;
      this.maxDistance = Infinity;
      this.minDistance = -Infinity;
      this.zoom = 1;
      this.rotateWorld = false;
      this.fov = 30;
      this.near = 0.1;
      this.far = 1e3;
      this.aspect = 1;
      this.projectionMatrix = mat4_exports.create();
      this.projectionMatrixInverse = mat4_exports.create();
      this.jitteredProjectionMatrix = void 0;
      this.enableUpdate = true;
      this.type = CameraType.EXPLORING;
      this.trackingMode = CameraTrackingMode.DEFAULT;
      this.projectionMode = CameraProjectionMode.PERSPECTIVE;
      this.frustum = new Frustum();
      this.orthoMatrix = mat4_exports.create();
    }
    Camera2.prototype.isOrtho = function() {
      return this.projectionMode === CameraProjectionMode.ORTHOGRAPHIC;
    };
    Camera2.prototype.getProjectionMode = function() {
      return this.projectionMode;
    };
    Camera2.prototype.getPerspective = function() {
      return this.jitteredProjectionMatrix || this.projectionMatrix;
    };
    Camera2.prototype.getPerspectiveInverse = function() {
      return this.projectionMatrixInverse;
    };
    Camera2.prototype.getFrustum = function() {
      return this.frustum;
    };
    Camera2.prototype.getPosition = function() {
      return this.position;
    };
    Camera2.prototype.getFocalPoint = function() {
      return this.focalPoint;
    };
    Camera2.prototype.getDollyingStep = function() {
      return this.dollyingStep;
    };
    Camera2.prototype.getNear = function() {
      return this.near;
    };
    Camera2.prototype.getFar = function() {
      return this.far;
    };
    Camera2.prototype.getZoom = function() {
      return this.zoom;
    };
    Camera2.prototype.getOrthoMatrix = function() {
      return this.orthoMatrix;
    };
    Camera2.prototype.getView = function() {
      return this.view;
    };
    Camera2.prototype.setEnableUpdate = function(enabled) {
      this.enableUpdate = enabled;
    };
    Camera2.prototype.setType = function(type, trackingMode) {
      this.type = type;
      if (this.type === CameraType.EXPLORING) {
        this.setWorldRotation(true);
      } else {
        this.setWorldRotation(false);
      }
      this._getAngles();
      if (this.type === CameraType.TRACKING && trackingMode !== void 0) {
        this.setTrackingMode(trackingMode);
      }
      return this;
    };
    Camera2.prototype.setProjectionMode = function(projectionMode) {
      this.projectionMode = projectionMode;
      return this;
    };
    Camera2.prototype.setTrackingMode = function(trackingMode) {
      if (this.type !== CameraType.TRACKING) {
        throw new Error("Impossible to set a tracking mode if the camera is not of tracking type");
      }
      this.trackingMode = trackingMode;
      return this;
    };
    Camera2.prototype.setWorldRotation = function(flag) {
      this.rotateWorld = flag;
      this._getAngles();
      return this;
    };
    Camera2.prototype.getViewTransform = function() {
      return mat4_exports.invert(mat4_exports.create(), this.matrix);
    };
    Camera2.prototype.getWorldTransform = function() {
      return this.matrix;
    };
    Camera2.prototype.jitterProjectionMatrix = function(x, y) {
      var translation = mat4_exports.fromTranslation(mat4_exports.create(), [x, y, 0]);
      this.jitteredProjectionMatrix = mat4_exports.multiply(mat4_exports.create(), translation, this.projectionMatrix);
    };
    Camera2.prototype.clearJitterProjectionMatrix = function() {
      this.jitteredProjectionMatrix = void 0;
    };
    Camera2.prototype.setMatrix = function(matrix) {
      this.matrix = matrix;
      this._update();
      return this;
    };
    Camera2.prototype.setProjectionMatrix = function(matrix) {
      this.projectionMatrix = matrix;
    };
    Camera2.prototype.setFov = function(fov) {
      this.setPerspective(this.near, this.far, fov, this.aspect);
      return this;
    };
    Camera2.prototype.setAspect = function(aspect) {
      this.setPerspective(this.near, this.far, this.fov, aspect);
      return this;
    };
    Camera2.prototype.setNear = function(near) {
      if (this.projectionMode === CameraProjectionMode.PERSPECTIVE) {
        this.setPerspective(near, this.far, this.fov, this.aspect);
      } else {
        this.setOrthographic(this.left, this.rright, this.top, this.bottom, near, this.far);
      }
      return this;
    };
    Camera2.prototype.setFar = function(far) {
      if (this.projectionMode === CameraProjectionMode.PERSPECTIVE) {
        this.setPerspective(this.near, far, this.fov, this.aspect);
      } else {
        this.setOrthographic(this.left, this.rright, this.top, this.bottom, this.near, far);
      }
      return this;
    };
    Camera2.prototype.setViewOffset = function(fullWidth, fullHeight, x, y, width, height) {
      this.aspect = fullWidth / fullHeight;
      if (this.view === void 0) {
        this.view = {
          enabled: true,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1
        };
      }
      this.view.enabled = true;
      this.view.fullWidth = fullWidth;
      this.view.fullHeight = fullHeight;
      this.view.offsetX = x;
      this.view.offsetY = y;
      this.view.width = width;
      this.view.height = height;
      if (this.projectionMode === CameraProjectionMode.PERSPECTIVE) {
        this.setPerspective(this.near, this.far, this.fov, this.aspect);
      } else {
        this.setOrthographic(this.left, this.rright, this.top, this.bottom, this.near, this.far);
      }
      return this;
    };
    Camera2.prototype.clearViewOffset = function() {
      if (this.view !== void 0) {
        this.view.enabled = false;
      }
      if (this.projectionMode === CameraProjectionMode.PERSPECTIVE) {
        this.setPerspective(this.near, this.far, this.fov, this.aspect);
      } else {
        this.setOrthographic(this.left, this.rright, this.top, this.bottom, this.near, this.far);
      }
      return this;
    };
    Camera2.prototype.setZoom = function(zoom) {
      this.zoom = zoom;
      if (this.projectionMode === CameraProjectionMode.ORTHOGRAPHIC) {
        this.setOrthographic(this.left, this.rright, this.top, this.bottom, this.near, this.far);
      } else if (this.projectionMode === CameraProjectionMode.PERSPECTIVE) {
        this.setPerspective(this.near, this.far, this.fov, this.aspect);
      }
      return this;
    };
    Camera2.prototype.setZoomByViewportPoint = function(zoom, viewportPoint) {
      var _a = this.canvas.viewport2Canvas({
        x: viewportPoint[0],
        y: viewportPoint[1]
      }), ox = _a.x, oy = _a.y;
      var roll = this.roll;
      this.rotate(0, 0, -roll);
      this.setPosition(ox, oy);
      this.setFocalPoint(ox, oy);
      this.setZoom(zoom);
      this.rotate(0, 0, roll);
      var _b = this.canvas.viewport2Canvas({
        x: viewportPoint[0],
        y: viewportPoint[1]
      }), cx = _b.x, cy = _b.y;
      var dvec = vec3_exports.fromValues(cx - ox, cy - oy, 0);
      var dx = vec3_exports.dot(dvec, this.right) / vec3_exports.length(this.right);
      var dy = vec3_exports.dot(dvec, this.up) / vec3_exports.length(this.up);
      var _c = __read(this.getPosition(), 2), px = _c[0], py = _c[1];
      var _d = __read(this.getFocalPoint(), 2), fx = _d[0], fy = _d[1];
      this.setPosition(px - dx, py - dy);
      this.setFocalPoint(fx - dx, fy - dy);
      return this;
    };
    Camera2.prototype.setPerspective = function(near, far, fov, aspect) {
      var _a;
      this.projectionMode = CameraProjectionMode.PERSPECTIVE;
      this.fov = fov;
      this.near = near;
      this.far = far;
      this.aspect = aspect;
      var top = this.near * Math.tan(deg2rad(0.5 * this.fov)) / this.zoom;
      var height = 2 * top;
      var width = this.aspect * height;
      var left = -0.5 * width;
      if ((_a = this.view) === null || _a === void 0 ? void 0 : _a.enabled) {
        var fullWidth = this.view.fullWidth;
        var fullHeight = this.view.fullHeight;
        left += this.view.offsetX * width / fullWidth;
        top -= this.view.offsetY * height / fullHeight;
        width *= this.view.width / fullWidth;
        height *= this.view.height / fullHeight;
      }
      makePerspective(this.projectionMatrix, left, left + width, top - height, top, near, this.far, this.clipSpaceNearZ === ClipSpaceNearZ.ZERO);
      mat4_exports.invert(this.projectionMatrixInverse, this.projectionMatrix);
      this.triggerUpdate();
      return this;
    };
    Camera2.prototype.setOrthographic = function(l, r, t, b, near, far) {
      var _a;
      this.projectionMode = CameraProjectionMode.ORTHOGRAPHIC;
      this.rright = r;
      this.left = l;
      this.top = t;
      this.bottom = b;
      this.near = near;
      this.far = far;
      var dx = (this.rright - this.left) / (2 * this.zoom);
      var dy = (this.top - this.bottom) / (2 * this.zoom);
      var cx = (this.rright + this.left) / 2;
      var cy = (this.top + this.bottom) / 2;
      var left = cx - dx;
      var right = cx + dx;
      var top = cy + dy;
      var bottom = cy - dy;
      if ((_a = this.view) === null || _a === void 0 ? void 0 : _a.enabled) {
        var scaleW = (this.rright - this.left) / this.view.fullWidth / this.zoom;
        var scaleH = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
        left += scaleW * this.view.offsetX;
        right = left + scaleW * this.view.width;
        top -= scaleH * this.view.offsetY;
        bottom = top - scaleH * this.view.height;
      }
      if (this.clipSpaceNearZ === ClipSpaceNearZ.NEGATIVE_ONE) {
        mat4_exports.ortho(this.projectionMatrix, left, right, top, bottom, near, far);
      } else {
        mat4_exports.orthoZO(this.projectionMatrix, left, right, top, bottom, near, far);
      }
      mat4_exports.invert(this.projectionMatrixInverse, this.projectionMatrix);
      this._getOrthoMatrix();
      this.triggerUpdate();
      return this;
    };
    Camera2.prototype.setPosition = function(x, y, z) {
      if (y === void 0) {
        y = this.position[1];
      }
      if (z === void 0) {
        z = this.position[2];
      }
      var position = createVec3(x, y, z);
      this._setPosition(position);
      this.setFocalPoint(this.focalPoint);
      this.triggerUpdate();
      return this;
    };
    Camera2.prototype.setFocalPoint = function(x, y, z) {
      if (y === void 0) {
        y = this.focalPoint[1];
      }
      if (z === void 0) {
        z = this.focalPoint[2];
      }
      var up = vec3_exports.fromValues(0, 1, 0);
      this.focalPoint = createVec3(x, y, z);
      if (this.trackingMode === CameraTrackingMode.CINEMATIC) {
        var d = vec3_exports.subtract(vec3_exports.create(), this.focalPoint, this.position);
        x = d[0];
        y = d[1];
        z = d[2];
        var r = vec3_exports.length(d);
        var el = rad2deg(Math.asin(y / r));
        var az = 90 + rad2deg(Math.atan2(z, x));
        var m = mat4_exports.create();
        mat4_exports.rotateY(m, m, deg2rad(az));
        mat4_exports.rotateX(m, m, deg2rad(el));
        up = vec3_exports.transformMat4(vec3_exports.create(), [0, 1, 0], m);
      }
      mat4_exports.invert(this.matrix, mat4_exports.lookAt(mat4_exports.create(), this.position, this.focalPoint, up));
      this._getAxes();
      this._getDistance();
      this._getAngles();
      this.triggerUpdate();
      return this;
    };
    Camera2.prototype.getDistance = function() {
      return this.distance;
    };
    Camera2.prototype.getDistanceVector = function() {
      return this.distanceVector;
    };
    Camera2.prototype.setDistance = function(d) {
      if (this.distance === d || d < 0) {
        return this;
      }
      this.distance = d;
      if (this.distance < MIN_DISTANCE) {
        this.distance = MIN_DISTANCE;
      }
      this.dollyingStep = this.distance / 100;
      var pos = vec3_exports.create();
      d = this.distance;
      var n = this.forward;
      var f = this.focalPoint;
      pos[0] = d * n[0] + f[0];
      pos[1] = d * n[1] + f[1];
      pos[2] = d * n[2] + f[2];
      this._setPosition(pos);
      this.triggerUpdate();
      return this;
    };
    Camera2.prototype.setMaxDistance = function(d) {
      this.maxDistance = d;
      return this;
    };
    Camera2.prototype.setMinDistance = function(d) {
      this.minDistance = d;
      return this;
    };
    Camera2.prototype.setAzimuth = function(az) {
      this.azimuth = getAngle2(az);
      this.computeMatrix();
      this._getAxes();
      if (this.type === CameraType.ORBITING || this.type === CameraType.EXPLORING) {
        this._getPosition();
      } else if (this.type === CameraType.TRACKING) {
        this._getFocalPoint();
      }
      this.triggerUpdate();
      return this;
    };
    Camera2.prototype.getAzimuth = function() {
      return this.azimuth;
    };
    Camera2.prototype.setElevation = function(el) {
      this.elevation = getAngle2(el);
      this.computeMatrix();
      this._getAxes();
      if (this.type === CameraType.ORBITING || this.type === CameraType.EXPLORING) {
        this._getPosition();
      } else if (this.type === CameraType.TRACKING) {
        this._getFocalPoint();
      }
      this.triggerUpdate();
      return this;
    };
    Camera2.prototype.getElevation = function() {
      return this.elevation;
    };
    Camera2.prototype.setRoll = function(angle3) {
      this.roll = getAngle2(angle3);
      this.computeMatrix();
      this._getAxes();
      if (this.type === CameraType.ORBITING || this.type === CameraType.EXPLORING) {
        this._getPosition();
      } else if (this.type === CameraType.TRACKING) {
        this._getFocalPoint();
      }
      this.triggerUpdate();
      return this;
    };
    Camera2.prototype.getRoll = function() {
      return this.roll;
    };
    Camera2.prototype._update = function() {
      this._getAxes();
      this._getPosition();
      this._getDistance();
      this._getAngles();
      this._getOrthoMatrix();
      this.triggerUpdate();
    };
    Camera2.prototype.computeMatrix = function() {
      var rotZ = quat_exports.setAxisAngle(quat_exports.create(), [0, 0, 1], deg2rad(this.roll));
      mat4_exports.identity(this.matrix);
      var rotX = quat_exports.setAxisAngle(quat_exports.create(), [1, 0, 0], deg2rad((this.rotateWorld && this.type !== CameraType.TRACKING || this.type === CameraType.TRACKING ? 1 : -1) * this.elevation));
      var rotY = quat_exports.setAxisAngle(quat_exports.create(), [0, 1, 0], deg2rad((this.rotateWorld && this.type !== CameraType.TRACKING || this.type === CameraType.TRACKING ? 1 : -1) * this.azimuth));
      var rotQ = quat_exports.multiply(quat_exports.create(), rotY, rotX);
      rotQ = quat_exports.multiply(quat_exports.create(), rotQ, rotZ);
      var rotMatrix = mat4_exports.fromQuat(mat4_exports.create(), rotQ);
      if (this.type === CameraType.ORBITING || this.type === CameraType.EXPLORING) {
        mat4_exports.translate(this.matrix, this.matrix, this.focalPoint);
        mat4_exports.multiply(this.matrix, this.matrix, rotMatrix);
        mat4_exports.translate(this.matrix, this.matrix, [0, 0, this.distance]);
      } else if (this.type === CameraType.TRACKING) {
        mat4_exports.translate(this.matrix, this.matrix, this.position);
        mat4_exports.multiply(this.matrix, this.matrix, rotMatrix);
      }
    };
    Camera2.prototype._setPosition = function(x, y, z) {
      this.position = createVec3(x, y, z);
      var m = this.matrix;
      m[12] = this.position[0];
      m[13] = this.position[1];
      m[14] = this.position[2];
      m[15] = 1;
      this._getOrthoMatrix();
    };
    Camera2.prototype._getAxes = function() {
      vec3_exports.copy(this.right, createVec3(vec4_exports.transformMat4(vec4_exports.create(), [1, 0, 0, 0], this.matrix)));
      vec3_exports.copy(this.up, createVec3(vec4_exports.transformMat4(vec4_exports.create(), [0, 1, 0, 0], this.matrix)));
      vec3_exports.copy(this.forward, createVec3(vec4_exports.transformMat4(vec4_exports.create(), [0, 0, 1, 0], this.matrix)));
      vec3_exports.normalize(this.right, this.right);
      vec3_exports.normalize(this.up, this.up);
      vec3_exports.normalize(this.forward, this.forward);
    };
    Camera2.prototype._getAngles = function() {
      var x = this.distanceVector[0];
      var y = this.distanceVector[1];
      var z = this.distanceVector[2];
      var r = vec3_exports.length(this.distanceVector);
      if (r === 0) {
        this.elevation = 0;
        this.azimuth = 0;
        return;
      }
      if (this.type === CameraType.TRACKING) {
        this.elevation = rad2deg(Math.asin(y / r));
        this.azimuth = rad2deg(Math.atan2(-x, -z));
      } else {
        if (this.rotateWorld) {
          this.elevation = rad2deg(Math.asin(y / r));
          this.azimuth = rad2deg(Math.atan2(-x, -z));
        } else {
          this.elevation = -rad2deg(Math.asin(y / r));
          this.azimuth = -rad2deg(Math.atan2(-x, -z));
        }
      }
    };
    Camera2.prototype._getPosition = function() {
      vec3_exports.copy(this.position, createVec3(vec4_exports.transformMat4(vec4_exports.create(), [0, 0, 0, 1], this.matrix)));
      this._getDistance();
    };
    Camera2.prototype._getFocalPoint = function() {
      vec3_exports.transformMat3(this.distanceVector, [0, 0, -this.distance], mat3_exports.fromMat4(mat3_exports.create(), this.matrix));
      vec3_exports.add(this.focalPoint, this.position, this.distanceVector);
      this._getDistance();
    };
    Camera2.prototype._getDistance = function() {
      this.distanceVector = vec3_exports.subtract(vec3_exports.create(), this.focalPoint, this.position);
      this.distance = vec3_exports.length(this.distanceVector);
      this.dollyingStep = this.distance / 100;
    };
    Camera2.prototype._getOrthoMatrix = function() {
      if (this.projectionMode !== CameraProjectionMode.ORTHOGRAPHIC) {
        return;
      }
      var position = this.position;
      var rotZ = quat_exports.setAxisAngle(quat_exports.create(), [0, 0, 1], -this.roll * Math.PI / 180);
      mat4_exports.fromRotationTranslationScaleOrigin(this.orthoMatrix, rotZ, vec3_exports.fromValues((this.rright - this.left) / 2 - position[0], (this.top - this.bottom) / 2 - position[1], 0), vec3_exports.fromValues(this.zoom, this.zoom, 1), position);
    };
    Camera2.prototype.triggerUpdate = function() {
      if (this.enableUpdate) {
        var viewMatrix = this.getViewTransform();
        var vpMatrix = mat4_exports.multiply(mat4_exports.create(), this.getPerspective(), viewMatrix);
        this.getFrustum().extractFromVPMatrix(vpMatrix);
        this.eventEmitter.emit(CameraEvent.UPDATED);
      }
    };
    Camera2.prototype.rotate = function(azimuth, elevation, roll) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Camera2.prototype.pan = function(tx, ty) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Camera2.prototype.dolly = function(value) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Camera2.prototype.createLandmark = function(name, params) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Camera2.prototype.gotoLandmark = function(name, options) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Camera2.prototype.cancelLandmarkAnimation = function() {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    return Camera2;
  }()
);
function memoize(func, resolver) {
  if (typeof func !== "function" || resolver != null && typeof resolver !== "function") {
    throw new TypeError("Expected a function");
  }
  var memoized = function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var key = resolver ? resolver.apply(this, args) : args[0];
    var cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || Map)();
  return memoized;
}
memoize.Cache = Map;
var UnitType;
(function(UnitType2) {
  UnitType2[UnitType2["kUnknown"] = 0] = "kUnknown";
  UnitType2[UnitType2["kNumber"] = 1] = "kNumber";
  UnitType2[UnitType2["kPercentage"] = 2] = "kPercentage";
  UnitType2[UnitType2["kEms"] = 3] = "kEms";
  UnitType2[UnitType2["kPixels"] = 4] = "kPixels";
  UnitType2[UnitType2["kRems"] = 5] = "kRems";
  UnitType2[UnitType2["kDegrees"] = 6] = "kDegrees";
  UnitType2[UnitType2["kRadians"] = 7] = "kRadians";
  UnitType2[UnitType2["kGradians"] = 8] = "kGradians";
  UnitType2[UnitType2["kTurns"] = 9] = "kTurns";
  UnitType2[UnitType2["kMilliseconds"] = 10] = "kMilliseconds";
  UnitType2[UnitType2["kSeconds"] = 11] = "kSeconds";
  UnitType2[UnitType2["kInteger"] = 12] = "kInteger";
})(UnitType || (UnitType = {}));
var UnitCategory;
(function(UnitCategory2) {
  UnitCategory2[UnitCategory2["kUNumber"] = 0] = "kUNumber";
  UnitCategory2[UnitCategory2["kUPercent"] = 1] = "kUPercent";
  UnitCategory2[UnitCategory2["kULength"] = 2] = "kULength";
  UnitCategory2[UnitCategory2["kUAngle"] = 3] = "kUAngle";
  UnitCategory2[UnitCategory2["kUTime"] = 4] = "kUTime";
  UnitCategory2[UnitCategory2["kUOther"] = 5] = "kUOther";
})(UnitCategory || (UnitCategory = {}));
var ValueRange;
(function(ValueRange2) {
  ValueRange2[ValueRange2["kAll"] = 0] = "kAll";
  ValueRange2[ValueRange2["kNonNegative"] = 1] = "kNonNegative";
  ValueRange2[ValueRange2["kInteger"] = 2] = "kInteger";
  ValueRange2[ValueRange2["kNonNegativeInteger"] = 3] = "kNonNegativeInteger";
  ValueRange2[ValueRange2["kPositiveInteger"] = 4] = "kPositiveInteger";
})(ValueRange || (ValueRange = {}));
var Nested;
(function(Nested2) {
  Nested2[Nested2["kYes"] = 0] = "kYes";
  Nested2[Nested2["kNo"] = 1] = "kNo";
})(Nested || (Nested = {}));
var ParenLess;
(function(ParenLess2) {
  ParenLess2[ParenLess2["kYes"] = 0] = "kYes";
  ParenLess2[ParenLess2["kNo"] = 1] = "kNo";
})(ParenLess || (ParenLess = {}));
var data = [
  {
    name: "em",
    unit_type: UnitType.kEms
  },
  // {
  //   name: 'ex',
  //   unit_type: UnitType.kExs,
  // },
  {
    name: "px",
    unit_type: UnitType.kPixels
  },
  // {
  //   name: "cm",
  //   unit_type: UnitType.kCentimeters,
  // },
  // {
  //   name: "mm",
  //   unit_type: UnitType.kMillimeters,
  // },
  // {
  //   name: "q",
  //   unit_type: UnitType.kQuarterMillimeters,
  // },
  // {
  //   name: "in",
  //   unit_type: UnitType.kInches,
  // },
  // {
  //   name: "pt",
  //   unit_type: UnitType.kPoints,
  // },
  // {
  //   name: "pc",
  //   unit_type: UnitType.kPicas,
  // },
  {
    name: "deg",
    unit_type: UnitType.kDegrees
  },
  {
    name: "rad",
    unit_type: UnitType.kRadians
  },
  {
    name: "grad",
    unit_type: UnitType.kGradians
  },
  {
    name: "ms",
    unit_type: UnitType.kMilliseconds
  },
  {
    name: "s",
    unit_type: UnitType.kSeconds
  },
  // {
  //   name: "hz",
  //   unit_type: UnitType.kHertz,
  // },
  // {
  //   name: "khz",
  //   unit_type: UnitType.kKilohertz,
  // },
  // {
  //   name: "dpi",
  //   unit_type: "kDotsPerInch",
  // },
  // {
  //   name: "dpcm",
  //   unit_type: "kDotsPerCentimeter",
  // },
  // {
  //   name: "dppx",
  //   unit_type: "kDotsPerPixel",
  // },
  // {
  //   name: "x",
  //   unit_type: "kDotsPerPixel",
  // },
  // {
  //   name: "vw",
  //   unit_type: "kViewportWidth",
  // },
  // {
  //   name: "vh",
  //   unit_type: "kViewportHeight",
  // },
  // {
  //   name: "vi",
  //   unit_type: "kViewportInlineSize",
  // },
  // {
  //   name: "vb",
  //   unit_type: "kViewportBlockSize",
  // },
  // {
  //   name: "vmin",
  //   unit_type: UnitType.kViewportMin,
  // },
  // {
  //   name: "vmax",
  //   unit_type: UnitType.kViewportMax,
  // },
  // {
  //   name: "svw",
  //   unit_type: "kSmallViewportWidth",
  // },
  // {
  //   name: "svh",
  //   unit_type: "kSmallViewportHeight",
  // },
  // {
  //   name: "svi",
  //   unit_type: "kSmallViewportInlineSize",
  // },
  // {
  //   name: "svb",
  //   unit_type: "kSmallViewportBlockSize",
  // },
  // {
  //   name: "svmin",
  //   unit_type: "kSmallViewportMin",
  // },
  // {
  //   name: "svmax",
  //   unit_type: "kSmallViewportMax",
  // },
  // {
  //   name: "lvw",
  //   unit_type: "kLargeViewportWidth",
  // },
  // {
  //   name: "lvh",
  //   unit_type: "kLargeViewportHeight",
  // },
  // {
  //   name: "lvi",
  //   unit_type: "kLargeViewportInlineSize",
  // },
  // {
  //   name: "lvb",
  //   unit_type: "kLargeViewportBlockSize",
  // },
  // {
  //   name: "lvmin",
  //   unit_type: UnitType.kLargeViewportMin,
  // },
  // {
  //   name: "lvmax",
  //   unit_type: UnitType.kLargeViewportMax,
  // },
  // {
  //   name: "dvw",
  //   unit_type: UnitType.kDynamicViewportWidth,
  // },
  // {
  //   name: "dvh",
  //   unit_type: UnitType.kDynamicViewportHeight,
  // },
  // {
  //   name: "dvi",
  //   unit_type: UnitType.kDynamicViewportInlineSize,
  // },
  // {
  //   name: "dvb",
  //   unit_type: UnitType.kDynamicViewportBlockSize,
  // },
  // {
  //   name: "dvmin",
  //   unit_type: UnitType.kDynamicViewportMin,
  // },
  // {
  //   name: "dvmax",
  //   unit_type: UnitType.kDynamicViewportMax,
  // },
  // {
  //   name: "cqw",
  //   unit_type: UnitType.kContainerWidth,
  // },
  // {
  //   name: "cqh",
  //   unit_type: UnitType.kContainerHeight,
  // },
  // {
  //   name: "cqi",
  //   unit_type: UnitType.kContainerInlineSize,
  // },
  // {
  //   name: "cqb",
  //   unit_type: UnitType.kContainerBlockSize,
  // },
  // {
  //   name: "cqmin",
  //   unit_type: UnitType.kContainerMin,
  // },
  // {
  //   name: "cqmax",
  //   unit_type: UnitType.kContainerMax,
  // },
  {
    name: "rem",
    unit_type: UnitType.kRems
  },
  // {
  //   name: 'fr',
  //   unit_type: UnitType.kFraction,
  // },
  {
    name: "turn",
    unit_type: UnitType.kTurns
  }
  // {
  //   name: 'ch',
  //   unit_type: UnitType.kChs,
  // },
  // {
  //   name: '__qem',
  //   unit_type: UnitType.kQuirkyEms,
  // },
];
var CSSStyleValueType;
(function(CSSStyleValueType2) {
  CSSStyleValueType2[CSSStyleValueType2["kUnknownType"] = 0] = "kUnknownType";
  CSSStyleValueType2[CSSStyleValueType2["kUnparsedType"] = 1] = "kUnparsedType";
  CSSStyleValueType2[CSSStyleValueType2["kKeywordType"] = 2] = "kKeywordType";
  CSSStyleValueType2[CSSStyleValueType2["kUnitType"] = 3] = "kUnitType";
  CSSStyleValueType2[CSSStyleValueType2["kSumType"] = 4] = "kSumType";
  CSSStyleValueType2[CSSStyleValueType2["kProductType"] = 5] = "kProductType";
  CSSStyleValueType2[CSSStyleValueType2["kNegateType"] = 6] = "kNegateType";
  CSSStyleValueType2[CSSStyleValueType2["kInvertType"] = 7] = "kInvertType";
  CSSStyleValueType2[CSSStyleValueType2["kMinType"] = 8] = "kMinType";
  CSSStyleValueType2[CSSStyleValueType2["kMaxType"] = 9] = "kMaxType";
  CSSStyleValueType2[CSSStyleValueType2["kClampType"] = 10] = "kClampType";
  CSSStyleValueType2[CSSStyleValueType2["kTransformType"] = 11] = "kTransformType";
  CSSStyleValueType2[CSSStyleValueType2["kPositionType"] = 12] = "kPositionType";
  CSSStyleValueType2[CSSStyleValueType2["kURLImageType"] = 13] = "kURLImageType";
  CSSStyleValueType2[CSSStyleValueType2["kColorType"] = 14] = "kColorType";
  CSSStyleValueType2[CSSStyleValueType2["kUnsupportedColorType"] = 15] = "kUnsupportedColorType";
})(CSSStyleValueType || (CSSStyleValueType = {}));
var stringToUnitType = function(name) {
  return data.find(function(item) {
    return item.name === name;
  }).unit_type;
};
var unitFromName = function(name) {
  if (!name) {
    return UnitType.kUnknown;
  }
  if (name === "number") {
    return UnitType.kNumber;
  }
  if (name === "percent" || name === "%") {
    return UnitType.kPercentage;
  }
  return stringToUnitType(name);
};
var unitTypeToUnitCategory = function(type) {
  switch (type) {
    case UnitType.kNumber:
    case UnitType.kInteger:
      return UnitCategory.kUNumber;
    case UnitType.kPercentage:
      return UnitCategory.kUPercent;
    case UnitType.kPixels:
      return UnitCategory.kULength;
    case UnitType.kMilliseconds:
    case UnitType.kSeconds:
      return UnitCategory.kUTime;
    case UnitType.kDegrees:
    case UnitType.kRadians:
    case UnitType.kGradians:
    case UnitType.kTurns:
      return UnitCategory.kUAngle;
    default:
      return UnitCategory.kUOther;
  }
};
var canonicalUnitTypeForCategory = function(category) {
  switch (category) {
    case UnitCategory.kUNumber:
      return UnitType.kNumber;
    case UnitCategory.kULength:
      return UnitType.kPixels;
    case UnitCategory.kUPercent:
      return UnitType.kPercentage;
    case UnitCategory.kUTime:
      return UnitType.kSeconds;
    case UnitCategory.kUAngle:
      return UnitType.kDegrees;
    default:
      return UnitType.kUnknown;
  }
};
var conversionToCanonicalUnitsScaleFactor = function(unit_type) {
  var factor = 1;
  switch (unit_type) {
    case UnitType.kPixels:
    case UnitType.kDegrees:
    case UnitType.kSeconds:
      break;
    case UnitType.kMilliseconds:
      factor = 1e-3;
      break;
    case UnitType.kRadians:
      factor = 180 / Math.PI;
      break;
    case UnitType.kGradians:
      factor = 0.9;
      break;
    case UnitType.kTurns:
      factor = 360;
      break;
  }
  return factor;
};
var unitTypeToString = function(type) {
  switch (type) {
    case UnitType.kNumber:
    case UnitType.kInteger:
      return "";
    case UnitType.kPercentage:
      return "%";
    case UnitType.kEms:
      return "em";
    case UnitType.kRems:
      return "rem";
    case UnitType.kPixels:
      return "px";
    case UnitType.kDegrees:
      return "deg";
    case UnitType.kRadians:
      return "rad";
    case UnitType.kGradians:
      return "grad";
    case UnitType.kMilliseconds:
      return "ms";
    case UnitType.kSeconds:
      return "s";
    case UnitType.kTurns:
      return "turn";
  }
  return "";
};
var CSSStyleValue = (
  /** @class */
  function() {
    function CSSStyleValue2() {
    }
    CSSStyleValue2.isAngle = function(unit) {
      return unit === UnitType.kDegrees || unit === UnitType.kRadians || unit === UnitType.kGradians || unit === UnitType.kTurns;
    };
    CSSStyleValue2.isLength = function(type) {
      return type >= UnitType.kEms && type < UnitType.kDegrees;
    };
    CSSStyleValue2.isRelativeUnit = function(type) {
      return type === UnitType.kPercentage || type === UnitType.kEms || // type === UnitType.kExs ||
      type === UnitType.kRems;
    };
    CSSStyleValue2.isTime = function(unit) {
      return unit === UnitType.kSeconds || unit === UnitType.kMilliseconds;
    };
    CSSStyleValue2.prototype.toString = function() {
      return this.buildCSSText(Nested.kNo, ParenLess.kNo, "");
    };
    CSSStyleValue2.prototype.isNumericValue = function() {
      return this.getType() >= CSSStyleValueType.kUnitType && this.getType() <= CSSStyleValueType.kClampType;
    };
    return CSSStyleValue2;
  }()
);
var CSSColorValue = (
  /** @class */
  function(_super) {
    __extends(CSSColorValue2, _super);
    function CSSColorValue2(colorSpace) {
      var _this = _super.call(this) || this;
      _this.colorSpace = colorSpace;
      return _this;
    }
    CSSColorValue2.prototype.getType = function() {
      return CSSStyleValueType.kColorType;
    };
    CSSColorValue2.prototype.to = function(colorSpace) {
      return this;
    };
    return CSSColorValue2;
  }(CSSStyleValue)
);
var GradientType;
(function(GradientType2) {
  GradientType2[GradientType2["Constant"] = 0] = "Constant";
  GradientType2[GradientType2["LinearGradient"] = 1] = "LinearGradient";
  GradientType2[GradientType2["RadialGradient"] = 2] = "RadialGradient";
})(GradientType || (GradientType = {}));
var CSSGradientValue = (
  /** @class */
  function(_super) {
    __extends(CSSGradientValue2, _super);
    function CSSGradientValue2(type, value) {
      var _this = _super.call(this) || this;
      _this.type = type;
      _this.value = value;
      return _this;
    }
    CSSGradientValue2.prototype.clone = function() {
      return new CSSGradientValue2(this.type, this.value);
    };
    CSSGradientValue2.prototype.buildCSSText = function(n, p, result) {
      return result;
    };
    CSSGradientValue2.prototype.getType = function() {
      return CSSStyleValueType.kColorType;
    };
    return CSSGradientValue2;
  }(CSSStyleValue)
);
var CSSKeywordValue = (
  /** @class */
  function(_super) {
    __extends(CSSKeywordValue2, _super);
    function CSSKeywordValue2(value) {
      var _this = _super.call(this) || this;
      _this.value = value;
      return _this;
    }
    CSSKeywordValue2.prototype.clone = function() {
      return new CSSKeywordValue2(this.value);
    };
    CSSKeywordValue2.prototype.getType = function() {
      return CSSStyleValueType.kKeywordType;
    };
    CSSKeywordValue2.prototype.buildCSSText = function(n, p, result) {
      return result + this.value;
    };
    return CSSKeywordValue2;
  }(CSSStyleValue)
);
var camelCase = memoize(function(str7) {
  if (str7 === void 0) {
    str7 = "";
  }
  return str7.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });
});
var kebabize = function(str7) {
  return str7.split("").map(function(letter, idx) {
    return letter.toUpperCase() === letter ? "".concat(idx !== 0 ? "-" : "").concat(letter.toLowerCase()) : letter;
  }).join("");
};
function DCHECK(bool) {
  if (!bool) {
    throw new Error();
  }
}
function isFunction(func) {
  return typeof func === "function";
}
function isSymbol(value) {
  return typeof value === "symbol";
}
var definedProps = function(obj) {
  return Object.fromEntries(Object.entries(obj).filter(function(_a) {
    var _b = __read(_a, 2), v = _b[1];
    return v !== void 0;
  }));
};
var FORMAT_ATTR_MAP = {
  d: {
    alias: "path"
  },
  strokeDasharray: {
    alias: "lineDash"
  },
  strokeWidth: {
    alias: "lineWidth"
  },
  textAnchor: {
    alias: "textAlign"
  },
  src: {
    alias: "img"
  }
};
var formatAttributeName = memoize(function(name) {
  var attributeName = camelCase(name);
  var map2 = FORMAT_ATTR_MAP[attributeName];
  attributeName = (map2 === null || map2 === void 0 ? void 0 : map2.alias) || attributeName;
  return attributeName;
});
var formatInfinityOrNaN = function(number, suffix) {
  if (suffix === void 0) {
    suffix = "";
  }
  var result = "";
  if (!Number.isFinite(number)) {
    if (number > 0)
      result = "infinity";
    else
      result = "-infinity";
  } else {
    DCHECK(Number.isNaN(number));
    result = "NaN";
  }
  return result += suffix;
};
var toCanonicalUnit = function(unit) {
  return canonicalUnitTypeForCategory(unitTypeToUnitCategory(unit));
};
var CSSUnitValue = (
  /** @class */
  function(_super) {
    __extends(CSSUnitValue2, _super);
    function CSSUnitValue2(value, unitOrName) {
      if (unitOrName === void 0) {
        unitOrName = UnitType.kNumber;
      }
      var _this = _super.call(this) || this;
      var unit;
      if (typeof unitOrName === "string") {
        unit = unitFromName(unitOrName);
      } else {
        unit = unitOrName;
      }
      _this.unit = unit;
      _this.value = value;
      return _this;
    }
    CSSUnitValue2.prototype.clone = function() {
      return new CSSUnitValue2(this.value, this.unit);
    };
    CSSUnitValue2.prototype.equals = function(other) {
      var other_unit_value = other;
      return this.value === other_unit_value.value && this.unit === other_unit_value.unit;
    };
    CSSUnitValue2.prototype.getType = function() {
      return CSSStyleValueType.kUnitType;
    };
    CSSUnitValue2.prototype.convertTo = function(target_unit) {
      if (this.unit === target_unit) {
        return new CSSUnitValue2(this.value, this.unit);
      }
      var canonical_unit = toCanonicalUnit(this.unit);
      if (canonical_unit !== toCanonicalUnit(target_unit) || canonical_unit === UnitType.kUnknown) {
        return null;
      }
      var scale_factor = conversionToCanonicalUnitsScaleFactor(this.unit) / conversionToCanonicalUnitsScaleFactor(target_unit);
      return new CSSUnitValue2(this.value * scale_factor, target_unit);
    };
    CSSUnitValue2.prototype.buildCSSText = function(n, p, result) {
      var text;
      switch (this.unit) {
        case UnitType.kUnknown:
          break;
        case UnitType.kInteger:
          text = Number(this.value).toFixed(0);
          break;
        case UnitType.kNumber:
        case UnitType.kPercentage:
        case UnitType.kEms:
        case UnitType.kRems:
        case UnitType.kPixels:
        case UnitType.kDegrees:
        case UnitType.kRadians:
        case UnitType.kGradians:
        case UnitType.kMilliseconds:
        case UnitType.kSeconds:
        case UnitType.kTurns: {
          var kMinInteger = -999999;
          var kMaxInteger = 999999;
          var value = this.value;
          var unit = unitTypeToString(this.unit);
          if (value < kMinInteger || value > kMaxInteger) {
            var unit_1 = unitTypeToString(this.unit);
            if (!Number.isFinite(value) || Number.isNaN(value)) {
              text = formatInfinityOrNaN(value, unit_1);
            } else {
              text = value + (unit_1 || "");
            }
          } else {
            text = "".concat(value).concat(unit);
          }
        }
      }
      result += text;
      return result;
    };
    return CSSUnitValue2;
  }(CSSStyleValue)
);
var Opx = new CSSUnitValue(0, "px");
new CSSUnitValue(1, "px");
var Odeg = new CSSUnitValue(0, "deg");
var CSSRGB = (
  /** @class */
  function(_super) {
    __extends(CSSRGB2, _super);
    function CSSRGB2(r, g, b, alpha, isNone) {
      if (alpha === void 0) {
        alpha = 1;
      }
      if (isNone === void 0) {
        isNone = false;
      }
      var _this = _super.call(this, "rgb") || this;
      _this.r = r;
      _this.g = g;
      _this.b = b;
      _this.alpha = alpha;
      _this.isNone = isNone;
      return _this;
    }
    CSSRGB2.prototype.clone = function() {
      return new CSSRGB2(this.r, this.g, this.b, this.alpha);
    };
    CSSRGB2.prototype.buildCSSText = function(n, p, result) {
      return result + "rgba(".concat(this.r, ",").concat(this.g, ",").concat(this.b, ",").concat(this.alpha, ")");
    };
    return CSSRGB2;
  }(CSSColorValue)
);
var unsetKeywordValue = new CSSKeywordValue("unset");
var initialKeywordValue = new CSSKeywordValue("initial");
var inheritKeywordValue = new CSSKeywordValue("inherit");
var keywordCache = {
  "": unsetKeywordValue,
  unset: unsetKeywordValue,
  initial: initialKeywordValue,
  inherit: inheritKeywordValue
};
var getOrCreateKeyword = function(name) {
  if (!keywordCache[name]) {
    keywordCache[name] = new CSSKeywordValue(name);
  }
  return keywordCache[name];
};
var noneColor = new CSSRGB(0, 0, 0, 0, true);
var transparentColor = new CSSRGB(0, 0, 0, 0);
var getOrCreateRGBA = memoize(function(r, g, b, a) {
  return new CSSRGB(r, g, b, a);
}, function(r, g, b, a) {
  return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")");
});
var getOrCreateUnitValue = function(value, unitOrName) {
  if (unitOrName === void 0) {
    unitOrName = UnitType.kNumber;
  }
  return new CSSUnitValue(value, unitOrName);
};
new CSSUnitValue(50, "%");
var Strategy;
(function(Strategy2) {
  Strategy2[Strategy2["Standard"] = 0] = "Standard";
})(Strategy || (Strategy = {}));
var SortReason;
(function(SortReason2) {
  SortReason2[SortReason2["ADDED"] = 0] = "ADDED";
  SortReason2[SortReason2["REMOVED"] = 1] = "REMOVED";
  SortReason2[SortReason2["Z_INDEX_CHANGED"] = 2] = "Z_INDEX_CHANGED";
})(SortReason || (SortReason = {}));
var EMPTY_PARSED_PATH = {
  absolutePath: [],
  hasArc: false,
  segments: [],
  polygons: [],
  polylines: [],
  curve: null,
  totalLength: 0,
  rect: new Rectangle(0, 0, 0, 0)
};
var PropertySyntax;
(function(PropertySyntax2) {
  PropertySyntax2["COORDINATE"] = "<coordinate>";
  PropertySyntax2["COLOR"] = "<color>";
  PropertySyntax2["PAINT"] = "<paint>";
  PropertySyntax2["NUMBER"] = "<number>";
  PropertySyntax2["ANGLE"] = "<angle>";
  PropertySyntax2["OPACITY_VALUE"] = "<opacity-value>";
  PropertySyntax2["SHADOW_BLUR"] = "<shadow-blur>";
  PropertySyntax2["LENGTH"] = "<length>";
  PropertySyntax2["PERCENTAGE"] = "<percentage>";
  PropertySyntax2["LENGTH_PERCENTAGE"] = "<length> | <percentage>";
  PropertySyntax2["LENGTH_PERCENTAGE_12"] = "[<length> | <percentage>]{1,2}";
  PropertySyntax2["LENGTH_PERCENTAGE_14"] = "[<length> | <percentage>]{1,4}";
  PropertySyntax2["LIST_OF_POINTS"] = "<list-of-points>";
  PropertySyntax2["PATH"] = "<path>";
  PropertySyntax2["FILTER"] = "<filter>";
  PropertySyntax2["Z_INDEX"] = "<z-index>";
  PropertySyntax2["OFFSET_DISTANCE"] = "<offset-distance>";
  PropertySyntax2["DEFINED_PATH"] = "<defined-path>";
  PropertySyntax2["MARKER"] = "<marker>";
  PropertySyntax2["TRANSFORM"] = "<transform>";
  PropertySyntax2["TRANSFORM_ORIGIN"] = "<transform-origin>";
  PropertySyntax2["TEXT"] = "<text>";
  PropertySyntax2["TEXT_TRANSFORM"] = "<text-transform>";
})(PropertySyntax || (PropertySyntax = {}));
function colorStopToString(colorStop) {
  var type = colorStop.type, value = colorStop.value;
  if (type === "hex") {
    return "#".concat(value);
  } else if (type === "literal") {
    return value;
  } else if (type === "rgb") {
    return "rgb(".concat(value.join(","), ")");
  } else {
    return "rgba(".concat(value.join(","), ")");
  }
}
var parseGradient$1 = /* @__PURE__ */ function() {
  var tokens = {
    linearGradient: /^(linear\-gradient)/i,
    repeatingLinearGradient: /^(repeating\-linear\-gradient)/i,
    radialGradient: /^(radial\-gradient)/i,
    repeatingRadialGradient: /^(repeating\-radial\-gradient)/i,
    /**
     * @see https://projects.verou.me/conic-gradient/
     */
    conicGradient: /^(conic\-gradient)/i,
    sideOrCorner: /^to (left (top|bottom)|right (top|bottom)|top (left|right)|bottom (left|right)|left|right|top|bottom)/i,
    extentKeywords: /^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/,
    positionKeywords: /^(left|center|right|top|bottom)/i,
    pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,
    percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/,
    emValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,
    angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,
    startCall: /^\(/,
    endCall: /^\)/,
    comma: /^,/,
    hexColor: /^\#([0-9a-fA-F]+)/,
    literalColor: /^([a-zA-Z]+)/,
    rgbColor: /^rgb/i,
    rgbaColor: /^rgba/i,
    number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/
  };
  var input = "";
  function error(msg) {
    throw new Error(input + ": " + msg);
  }
  function getAST() {
    var ast = matchListDefinitions();
    if (input.length > 0) {
      error("Invalid input not EOF");
    }
    return ast;
  }
  function matchListDefinitions() {
    return matchListing(matchDefinition);
  }
  function matchDefinition() {
    return matchGradient("linear-gradient", tokens.linearGradient, matchLinearOrientation) || matchGradient("repeating-linear-gradient", tokens.repeatingLinearGradient, matchLinearOrientation) || matchGradient("radial-gradient", tokens.radialGradient, matchListRadialOrientations) || matchGradient("repeating-radial-gradient", tokens.repeatingRadialGradient, matchListRadialOrientations) || matchGradient("conic-gradient", tokens.conicGradient, matchListRadialOrientations);
  }
  function matchGradient(gradientType, pattern, orientationMatcher) {
    return matchCall(pattern, function(captures) {
      var orientation = orientationMatcher();
      if (orientation) {
        if (!scan(tokens.comma)) {
          error("Missing comma before color stops");
        }
      }
      return {
        type: gradientType,
        orientation,
        colorStops: matchListing(matchColorStop)
      };
    });
  }
  function matchCall(pattern, callback) {
    var captures = scan(pattern);
    if (captures) {
      if (!scan(tokens.startCall)) {
        error("Missing (");
      }
      var result = callback(captures);
      if (!scan(tokens.endCall)) {
        error("Missing )");
      }
      return result;
    }
  }
  function matchLinearOrientation() {
    return matchSideOrCorner() || matchAngle();
  }
  function matchSideOrCorner() {
    return match("directional", tokens.sideOrCorner, 1);
  }
  function matchAngle() {
    return match("angular", tokens.angleValue, 1);
  }
  function matchListRadialOrientations() {
    var radialOrientations, radialOrientation = matchRadialOrientation(), lookaheadCache;
    if (radialOrientation) {
      radialOrientations = [];
      radialOrientations.push(radialOrientation);
      lookaheadCache = input;
      if (scan(tokens.comma)) {
        radialOrientation = matchRadialOrientation();
        if (radialOrientation) {
          radialOrientations.push(radialOrientation);
        } else {
          input = lookaheadCache;
        }
      }
    }
    return radialOrientations;
  }
  function matchRadialOrientation() {
    var radialType = matchCircle() || matchEllipse();
    if (radialType) {
      radialType.at = matchAtPosition();
    } else {
      var extent = matchExtentKeyword();
      if (extent) {
        radialType = extent;
        var positionAt = matchAtPosition();
        if (positionAt) {
          radialType.at = positionAt;
        }
      } else {
        var defaultPosition = matchPositioning();
        if (defaultPosition) {
          radialType = {
            type: "default-radial",
            // @ts-ignore
            at: defaultPosition
          };
        }
      }
    }
    return radialType;
  }
  function matchCircle() {
    var circle = match("shape", /^(circle)/i, 0);
    if (circle) {
      circle.style = matchLength() || matchExtentKeyword();
    }
    return circle;
  }
  function matchEllipse() {
    var ellipse = match("shape", /^(ellipse)/i, 0);
    if (ellipse) {
      ellipse.style = matchDistance() || matchExtentKeyword();
    }
    return ellipse;
  }
  function matchExtentKeyword() {
    return match("extent-keyword", tokens.extentKeywords, 1);
  }
  function matchAtPosition() {
    if (match("position", /^at/, 0)) {
      var positioning = matchPositioning();
      if (!positioning) {
        error("Missing positioning value");
      }
      return positioning;
    }
  }
  function matchPositioning() {
    var location = matchCoordinates();
    if (location.x || location.y) {
      return {
        type: "position",
        value: location
      };
    }
  }
  function matchCoordinates() {
    return {
      x: matchDistance(),
      y: matchDistance()
    };
  }
  function matchListing(matcher) {
    var captures = matcher();
    var result = [];
    if (captures) {
      result.push(captures);
      while (scan(tokens.comma)) {
        captures = matcher();
        if (captures) {
          result.push(captures);
        } else {
          error("One extra comma");
        }
      }
    }
    return result;
  }
  function matchColorStop() {
    var color2 = matchColor();
    if (!color2) {
      error("Expected color definition");
    }
    color2.length = matchDistance();
    return color2;
  }
  function matchColor() {
    return matchHexColor() || matchRGBAColor() || matchRGBColor() || matchLiteralColor();
  }
  function matchLiteralColor() {
    return match("literal", tokens.literalColor, 0);
  }
  function matchHexColor() {
    return match("hex", tokens.hexColor, 1);
  }
  function matchRGBColor() {
    return matchCall(tokens.rgbColor, function() {
      return {
        type: "rgb",
        value: matchListing(matchNumber)
      };
    });
  }
  function matchRGBAColor() {
    return matchCall(tokens.rgbaColor, function() {
      return {
        type: "rgba",
        value: matchListing(matchNumber)
      };
    });
  }
  function matchNumber() {
    return scan(tokens.number)[1];
  }
  function matchDistance() {
    return match("%", tokens.percentageValue, 1) || matchPositionKeyword() || matchLength();
  }
  function matchPositionKeyword() {
    return match("position-keyword", tokens.positionKeywords, 1);
  }
  function matchLength() {
    return match("px", tokens.pixelValue, 1) || match("em", tokens.emValue, 1);
  }
  function match(type, pattern, captureIndex) {
    var captures = scan(pattern);
    if (captures) {
      return {
        type,
        value: captures[captureIndex]
      };
    }
  }
  function scan(regexp) {
    var blankCaptures = /^[\n\r\t\s]+/.exec(input);
    if (blankCaptures) {
      consume(blankCaptures[0].length);
    }
    var captures = regexp.exec(input);
    if (captures) {
      consume(captures[0].length);
    }
    return captures;
  }
  function consume(size2) {
    input = input.substring(size2);
  }
  return function(code) {
    input = code;
    return getAST();
  };
}();
function computeLinearGradient(min4, width, height, angle3) {
  var rad = deg2rad(angle3.value);
  var rx = 0;
  var ry = 0;
  var rcx = rx + width / 2;
  var rcy = ry + height / 2;
  var length5 = Math.abs(width * Math.cos(rad)) + Math.abs(height * Math.sin(rad));
  var x1 = min4[0] + rcx - Math.cos(rad) * length5 / 2;
  var y1 = min4[1] + rcy - Math.sin(rad) * length5 / 2;
  var x2 = min4[0] + rcx + Math.cos(rad) * length5 / 2;
  var y2 = min4[1] + rcy + Math.sin(rad) * length5 / 2;
  return { x1, y1, x2, y2 };
}
function computeRadialGradient(min4, width, height, cx, cy, size2) {
  var x = cx.value;
  var y = cy.value;
  if (cx.unit === UnitType.kPercentage) {
    x = cx.value / 100 * width;
  }
  if (cy.unit === UnitType.kPercentage) {
    y = cy.value / 100 * height;
  }
  var r = Math.max(distanceSquareRoot([0, 0], [x, y]), distanceSquareRoot([0, height], [x, y]), distanceSquareRoot([width, height], [x, y]), distanceSquareRoot([width, 0], [x, y]));
  if (size2) {
    if (size2 instanceof CSSUnitValue) {
      r = size2.value;
    } else if (size2 instanceof CSSKeywordValue) {
      if (size2.value === "closest-side") {
        r = Math.min(x, width - x, y, height - y);
      } else if (size2.value === "farthest-side") {
        r = Math.max(x, width - x, y, height - y);
      } else if (size2.value === "closest-corner") {
        r = Math.min(distanceSquareRoot([0, 0], [x, y]), distanceSquareRoot([0, height], [x, y]), distanceSquareRoot([width, height], [x, y]), distanceSquareRoot([width, 0], [x, y]));
      }
    }
  }
  return { x: x + min4[0], y: y + min4[1], r };
}
var regexLG = /^l\s*\(\s*([\d.]+)\s*\)\s*(.*)/i;
var regexRG = /^r\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)\s*(.*)/i;
var regexPR = /^p\s*\(\s*([axyn])\s*\)\s*(.*)/i;
var regexColorStop = /[\d.]+:(#[^\s]+|[^\)]+\))/gi;
function spaceColorStops(colorStops) {
  var _a, _b, _c;
  var length5 = colorStops.length;
  colorStops[length5 - 1].length = (_a = colorStops[length5 - 1].length) !== null && _a !== void 0 ? _a : {
    type: "%",
    value: "100"
  };
  if (length5 > 1) {
    colorStops[0].length = (_b = colorStops[0].length) !== null && _b !== void 0 ? _b : {
      type: "%",
      value: "0"
    };
  }
  var previousIndex = 0;
  var previousOffset = Number(colorStops[0].length.value);
  for (var i = 1; i < length5; i++) {
    var offset = (_c = colorStops[i].length) === null || _c === void 0 ? void 0 : _c.value;
    if (!is_nil_default(offset) && !is_nil_default(previousOffset)) {
      for (var j = 1; j < i - previousIndex; j++)
        colorStops[previousIndex + j].length = {
          type: "%",
          value: "".concat(previousOffset + (Number(offset) - previousOffset) * j / (i - previousIndex))
        };
      previousIndex = i;
      previousOffset = Number(offset);
    }
  }
}
var SideOrCornerToDegMap = {
  left: 270 - 90,
  top: 0 - 90,
  bottom: 180 - 90,
  right: 90 - 90,
  "left top": 315 - 90,
  "top left": 315 - 90,
  "left bottom": 225 - 90,
  "bottom left": 225 - 90,
  "right top": 45 - 90,
  "top right": 45 - 90,
  "right bottom": 135 - 90,
  "bottom right": 135 - 90
};
var angleToDeg = memoize(function(orientation) {
  var angle3;
  if (orientation.type === "angular") {
    angle3 = Number(orientation.value);
  } else {
    angle3 = SideOrCornerToDegMap[orientation.value] || 0;
  }
  return getOrCreateUnitValue(angle3, "deg");
});
var positonToCSSUnitValue = memoize(function(position) {
  var cx = 50;
  var cy = 50;
  var unitX = "%";
  var unitY = "%";
  if ((position === null || position === void 0 ? void 0 : position.type) === "position") {
    var _a = position.value, x = _a.x, y = _a.y;
    if ((x === null || x === void 0 ? void 0 : x.type) === "position-keyword") {
      if (x.value === "left") {
        cx = 0;
      } else if (x.value === "center") {
        cx = 50;
      } else if (x.value === "right") {
        cx = 100;
      } else if (x.value === "top") {
        cy = 0;
      } else if (x.value === "bottom") {
        cy = 100;
      }
    }
    if ((y === null || y === void 0 ? void 0 : y.type) === "position-keyword") {
      if (y.value === "left") {
        cx = 0;
      } else if (y.value === "center") {
        cy = 50;
      } else if (y.value === "right") {
        cx = 100;
      } else if (y.value === "top") {
        cy = 0;
      } else if (y.value === "bottom") {
        cy = 100;
      }
    }
    if ((x === null || x === void 0 ? void 0 : x.type) === "px" || (x === null || x === void 0 ? void 0 : x.type) === "%" || (x === null || x === void 0 ? void 0 : x.type) === "em") {
      unitX = x === null || x === void 0 ? void 0 : x.type;
      cx = Number(x.value);
    }
    if ((y === null || y === void 0 ? void 0 : y.type) === "px" || (y === null || y === void 0 ? void 0 : y.type) === "%" || (y === null || y === void 0 ? void 0 : y.type) === "em") {
      unitY = y === null || y === void 0 ? void 0 : y.type;
      cy = Number(y.value);
    }
  }
  return {
    cx: getOrCreateUnitValue(cx, unitX),
    cy: getOrCreateUnitValue(cy, unitY)
  };
});
var parseGradient = memoize(function(colorStr) {
  var _a;
  if (colorStr.indexOf("linear") > -1 || colorStr.indexOf("radial") > -1) {
    var ast = parseGradient$1(colorStr);
    return ast.map(function(_a2) {
      var type2 = _a2.type, orientation = _a2.orientation, colorStops = _a2.colorStops;
      spaceColorStops(colorStops);
      var steps2 = colorStops.map(function(colorStop) {
        return {
          offset: getOrCreateUnitValue(Number(colorStop.length.value), "%"),
          color: colorStopToString(colorStop)
        };
      });
      if (type2 === "linear-gradient") {
        return new CSSGradientValue(GradientType.LinearGradient, {
          angle: orientation ? angleToDeg(orientation) : Odeg,
          steps: steps2
        });
      } else if (type2 === "radial-gradient") {
        if (!orientation) {
          orientation = [
            {
              type: "shape",
              value: "circle"
            }
          ];
        }
        if (orientation[0].type === "shape" && orientation[0].value === "circle") {
          var _b = positonToCSSUnitValue(orientation[0].at), cx = _b.cx, cy = _b.cy;
          var size2 = void 0;
          if (orientation[0].style) {
            var _c = orientation[0].style, type_1 = _c.type, value = _c.value;
            if (type_1 === "extent-keyword") {
              size2 = getOrCreateKeyword(value);
            } else {
              size2 = getOrCreateUnitValue(value, type_1);
            }
          }
          return new CSSGradientValue(GradientType.RadialGradient, {
            cx,
            cy,
            size: size2,
            steps: steps2
          });
        }
      }
    });
  }
  var type = colorStr[0];
  if (colorStr[1] === "(" || colorStr[2] === "(") {
    if (type === "l") {
      var arr = regexLG.exec(colorStr);
      if (arr) {
        var steps = ((_a = arr[2].match(regexColorStop)) === null || _a === void 0 ? void 0 : _a.map(function(stop) {
          return stop.split(":");
        })) || [];
        return [
          new CSSGradientValue(GradientType.LinearGradient, {
            angle: getOrCreateUnitValue(parseFloat(arr[1]), "deg"),
            steps: steps.map(function(_a2) {
              var _b = __read(_a2, 2), offset = _b[0], color2 = _b[1];
              return {
                offset: getOrCreateUnitValue(Number(offset) * 100, "%"),
                color: color2
              };
            })
          })
        ];
      }
    } else if (type === "r") {
      var parsedRadialGradient = parseRadialGradient(colorStr);
      if (parsedRadialGradient) {
        if (is_string_default(parsedRadialGradient)) {
          colorStr = parsedRadialGradient;
        } else {
          return [
            new CSSGradientValue(GradientType.RadialGradient, parsedRadialGradient)
          ];
        }
      }
    } else if (type === "p") {
      return parsePattern(colorStr);
    }
  }
});
function parseRadialGradient(gradientStr) {
  var _a;
  var arr = regexRG.exec(gradientStr);
  if (arr) {
    var steps = ((_a = arr[4].match(regexColorStop)) === null || _a === void 0 ? void 0 : _a.map(function(stop) {
      return stop.split(":");
    })) || [];
    return {
      cx: getOrCreateUnitValue(50, "%"),
      cy: getOrCreateUnitValue(50, "%"),
      steps: steps.map(function(_a2) {
        var _b = __read(_a2, 2), offset = _b[0], color2 = _b[1];
        return {
          offset: getOrCreateUnitValue(Number(offset) * 100, "%"),
          color: color2
        };
      })
    };
  }
  return null;
}
function parsePattern(patternStr) {
  var arr = regexPR.exec(patternStr);
  if (arr) {
    var repetition = arr[1];
    var src = arr[2];
    switch (repetition) {
      case "a":
        repetition = "repeat";
        break;
      case "x":
        repetition = "repeat-x";
        break;
      case "y":
        repetition = "repeat-y";
        break;
      case "n":
        repetition = "no-repeat";
        break;
      default:
        repetition = "no-repeat";
    }
    return {
      image: src,
      // @ts-ignore
      repetition
    };
  }
  return null;
}
function isCSSGradientValue(object) {
  return !!object.type && !!object.value;
}
function isPattern(object) {
  return object && !!object.image;
}
function isCSSRGB(object) {
  return object && !is_nil_default(object.r) && !is_nil_default(object.g) && !is_nil_default(object.b);
}
var parseColor = memoize(function(colorStr) {
  if (isPattern(colorStr)) {
    return __assign({ repetition: "repeat" }, colorStr);
  }
  if (is_nil_default(colorStr)) {
    colorStr = "";
  }
  if (colorStr === "transparent") {
    return transparentColor;
  } else if (colorStr === "currentColor") {
    colorStr = "black";
  } else if (colorStr === "none") {
    return noneColor;
  }
  var g = parseGradient(colorStr);
  if (g) {
    return g;
  }
  var color2 = color(colorStr);
  var rgba2 = [0, 0, 0, 0];
  if (color2 !== null) {
    rgba2[0] = color2.r || 0;
    rgba2[1] = color2.g || 0;
    rgba2[2] = color2.b || 0;
    rgba2[3] = color2.opacity;
  }
  return getOrCreateRGBA.apply(void 0, __spreadArray([], __read(rgba2), false));
});
function mergeColors(left, right) {
  if (!isCSSRGB(left) || !isCSSRGB(right)) {
    return;
  }
  return [
    [Number(left.r), Number(left.g), Number(left.b), Number(left.alpha)],
    [Number(right.r), Number(right.g), Number(right.b), Number(right.alpha)],
    function(color2) {
      var rgba2 = color2.slice();
      if (rgba2[3]) {
        for (var i = 0; i < 3; i++)
          rgba2[i] = Math.round(clamp_default(rgba2[i], 0, 255));
      }
      rgba2[3] = clamp_default(rgba2[3], 0, 1);
      return "rgba(".concat(rgba2.join(","), ")");
    }
  ];
}
function parseDimension(unitRegExp, string) {
  if (is_nil_default(string)) {
    return getOrCreateUnitValue(0, "px");
  }
  string = "".concat(string).trim().toLowerCase();
  if (isFinite(Number(string))) {
    if ("px".search(unitRegExp) >= 0) {
      return getOrCreateUnitValue(Number(string), "px");
    } else if ("deg".search(unitRegExp) >= 0) {
      return getOrCreateUnitValue(Number(string), "deg");
    }
  }
  var matchedUnits = [];
  string = string.replace(unitRegExp, function(match) {
    matchedUnits.push(match);
    return "U" + match;
  });
  var taggedUnitRegExp = "U(" + unitRegExp.source + ")";
  return matchedUnits.map(function(unit) {
    return getOrCreateUnitValue(Number(string.replace(new RegExp("U" + unit, "g"), "").replace(new RegExp(taggedUnitRegExp, "g"), "*0")), unit);
  })[0];
}
var parseLengthUnmemoize = function(css) {
  return parseDimension(new RegExp("px", "g"), css);
};
var parseLength = memoize(parseLengthUnmemoize);
var parserPercentageUnmemoize = function(css) {
  return parseDimension(new RegExp("%", "g"), css);
};
memoize(parserPercentageUnmemoize);
var parseLengthOrPercentageUnmemoize = function(css) {
  if (is_number_default(css) || isFinite(Number(css))) {
    return getOrCreateUnitValue(Number(css) || 0, "px");
  }
  return parseDimension(new RegExp("px|%|em|rem", "g"), css);
};
var parseLengthOrPercentage = memoize(parseLengthOrPercentageUnmemoize);
var parseAngleUnmemoize = function(css) {
  return parseDimension(new RegExp("deg|rad|grad|turn", "g"), css);
};
var parseAngle = memoize(parseAngleUnmemoize);
function mergeDimensions(left, right, target, nonNegative, index) {
  if (index === void 0) {
    index = 0;
  }
  var unit = "";
  var leftValue = left.value || 0;
  var rightValue = right.value || 0;
  var canonicalUnit = toCanonicalUnit(left.unit);
  var leftCanonicalUnitValue = left.convertTo(canonicalUnit);
  var rightCanonicalUnitValue = right.convertTo(canonicalUnit);
  if (leftCanonicalUnitValue && rightCanonicalUnitValue) {
    leftValue = leftCanonicalUnitValue.value;
    rightValue = rightCanonicalUnitValue.value;
    unit = unitTypeToString(left.unit);
  } else {
    if (CSSUnitValue.isLength(left.unit) || CSSUnitValue.isLength(right.unit)) {
      leftValue = convertPercentUnit(left, index, target);
      rightValue = convertPercentUnit(right, index, target);
      unit = "px";
    }
  }
  return [
    leftValue,
    rightValue,
    function(value) {
      if (nonNegative) {
        value = Math.max(value, 0);
      }
      return value + unit;
    }
  ];
}
function convertAngleUnit(value) {
  var deg = 0;
  if (value.unit === UnitType.kDegrees) {
    deg = value.value;
  } else if (value.unit === UnitType.kRadians) {
    deg = rad2deg(Number(value.value));
  } else if (value.unit === UnitType.kTurns) {
    deg = turn2deg(Number(value.value));
  }
  return deg;
}
function parseDimensionArrayFormat(string, size2) {
  var parsed;
  if (Array.isArray(string)) {
    parsed = string.map(function(segment) {
      return Number(segment);
    });
  } else if (is_string_default(string)) {
    parsed = string.split(" ").map(function(segment) {
      return Number(segment);
    });
  } else if (is_number_default(string)) {
    parsed = [string];
  }
  if (size2 === 2) {
    if (parsed.length === 1) {
      return [parsed[0], parsed[0]];
    } else {
      return [parsed[0], parsed[1]];
    }
  } else {
    if (parsed.length === 1) {
      return [parsed[0], parsed[0], parsed[0], parsed[0]];
    } else if (parsed.length === 2) {
      return [parsed[0], parsed[1], parsed[0], parsed[1]];
    } else if (parsed.length === 3) {
      return [parsed[0], parsed[1], parsed[2], parsed[1]];
    } else {
      return [parsed[0], parsed[1], parsed[2], parsed[3]];
    }
  }
}
function parseDimensionArray(string) {
  if (is_string_default(string)) {
    return string.split(" ").map(function(segment) {
      return parseLengthOrPercentage(segment);
    });
  } else {
    return string.map(function(segment) {
      return parseLengthOrPercentage(segment.toString());
    });
  }
}
function convertPercentUnit(valueWithUnit, vec3Index, target, useMin) {
  if (useMin === void 0) {
    useMin = false;
  }
  if (valueWithUnit.unit === UnitType.kPixels) {
    return Number(valueWithUnit.value);
  } else if (valueWithUnit.unit === UnitType.kPercentage && target) {
    var bounds = target.nodeName === Shape.GROUP ? target.getLocalBounds() : target.getGeometryBounds();
    return (useMin ? bounds.min[vec3Index] : 0) + valueWithUnit.value / 100 * bounds.halfExtents[vec3Index] * 2;
  }
  return 0;
}
var parseParam = function(css) {
  return parseDimension(/deg|rad|grad|turn|px|%/g, css);
};
var supportedFilters = [
  "blur",
  "brightness",
  "drop-shadow",
  "contrast",
  "grayscale",
  "sepia",
  "saturate",
  "hue-rotate",
  "invert"
];
function parseFilter(filterStr) {
  if (filterStr === void 0) {
    filterStr = "";
  }
  filterStr = filterStr.toLowerCase().trim();
  if (filterStr === "none") {
    return [];
  }
  var filterRegExp = /\s*([\w-]+)\(([^)]*)\)/g;
  var result = [];
  var match;
  var prevLastIndex = 0;
  while (match = filterRegExp.exec(filterStr)) {
    if (match.index !== prevLastIndex) {
      return [];
    }
    prevLastIndex = match.index + match[0].length;
    if (supportedFilters.indexOf(match[1]) > -1) {
      result.push({
        name: match[1],
        params: match[2].split(" ").map(function(p) {
          return parseParam(p) || parseColor(p);
        })
      });
    }
    if (filterRegExp.lastIndex === filterStr.length) {
      return result;
    }
  }
  return [];
}
function numberToString(x) {
  return x.toString();
}
var parseNumberUnmemoize = function(string) {
  if (typeof string === "number") {
    return getOrCreateUnitValue(string);
  }
  if (/^\s*[-+]?(\d*\.)?\d+\s*$/.test(string)) {
    return getOrCreateUnitValue(Number(string));
  } else {
    return getOrCreateUnitValue(0);
  }
};
var parseNumber = memoize(parseNumberUnmemoize);
memoize(function(string) {
  if (is_string_default(string)) {
    return string.split(" ").map(parseNumber);
  } else {
    return string.map(parseNumber);
  }
});
function mergeNumbers(left, right) {
  return [left, right, numberToString];
}
function clampedMergeNumbers(min4, max4) {
  return function(left, right) {
    return [
      left,
      right,
      function(x) {
        return numberToString(clamp_default(x, min4, max4));
      }
    ];
  };
}
function mergeNumberLists(left, right) {
  if (left.length !== right.length) {
    return;
  }
  return [
    left,
    right,
    function(numberList) {
      return numberList;
    }
  ];
}
function getOrCalculatePathTotalLength(path) {
  if (path.parsedStyle.d.totalLength === 0) {
    path.parsedStyle.d.totalLength = getTotalLength(path.parsedStyle.d.absolutePath);
  }
  return path.parsedStyle.d.totalLength;
}
function getOrCalculatePolylineTotalLength(polyline) {
  if (polyline.parsedStyle.points.totalLength === 0) {
    polyline.parsedStyle.points.totalLength = length$2(polyline.parsedStyle.points.points);
  }
  return polyline.parsedStyle.points.totalLength;
}
function removeRedundantMCommand(path) {
  for (var i = 0; i < path.length; i++) {
    var prevSegment = path[i - 1];
    var segment = path[i];
    var cmd = segment[0];
    if (cmd === "M") {
      if (prevSegment) {
        var prevCmd = prevSegment[0];
        var srcPoint = [segment[1], segment[2]];
        var destPoint = void 0;
        if (prevCmd === "L" || prevCmd === "M") {
          destPoint = [prevSegment[1], prevSegment[2]];
        } else if (prevCmd === "C" || prevCmd === "A" || prevCmd === "Q") {
          destPoint = [
            prevSegment[prevSegment.length - 2],
            prevSegment[prevSegment.length - 1]
          ];
        }
        if (destPoint && isSamePoint(srcPoint, destPoint)) {
          path.splice(i, 1);
          i--;
        }
      }
    }
  }
}
function hasArcOrBezier(path) {
  var hasArc = false;
  var count = path.length;
  for (var i = 0; i < count; i++) {
    var params = path[i];
    var cmd = params[0];
    if (cmd === "C" || cmd === "A" || cmd === "Q") {
      hasArc = true;
      break;
    }
  }
  return hasArc;
}
function extractPolygons(pathArray) {
  var polygons = [];
  var polylines = [];
  var points = [];
  for (var i = 0; i < pathArray.length; i++) {
    var params = pathArray[i];
    var cmd = params[0];
    if (cmd === "M") {
      if (points.length) {
        polylines.push(points);
        points = [];
      }
      points.push([params[1], params[2]]);
    } else if (cmd === "Z") {
      if (points.length) {
        polygons.push(points);
        points = [];
      }
    } else {
      points.push([params[1], params[2]]);
    }
  }
  if (points.length > 0) {
    polylines.push(points);
  }
  return {
    polygons,
    polylines
  };
}
function isSamePoint(point1, point2) {
  return point1[0] === point2[0] && point1[1] === point2[1];
}
function getPathBBox2(segments, lineWidth) {
  var xArr = [];
  var yArr = [];
  var segmentsWithAngle = [];
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    var currentPoint = segment.currentPoint, params = segment.params, prePoint = segment.prePoint;
    var box2 = void 0;
    switch (segment.command) {
      case "Q":
        box2 = box(prePoint[0], prePoint[1], params[1], params[2], params[3], params[4]);
        break;
      case "C":
        box2 = box$3(prePoint[0], prePoint[1], params[1], params[2], params[3], params[4], params[5], params[6]);
        break;
      case "A":
        var arcParams = segment.arcParams;
        box2 = box$5(arcParams.cx, arcParams.cy, arcParams.rx, arcParams.ry, arcParams.xRotation, arcParams.startAngle, arcParams.endAngle);
        break;
      default:
        xArr.push(currentPoint[0]);
        yArr.push(currentPoint[1]);
        break;
    }
    if (box2) {
      segment.box = box2;
      xArr.push(box2.x, box2.x + box2.width);
      yArr.push(box2.y, box2.y + box2.height);
    }
    if (lineWidth && (segment.command === "L" || segment.command === "M") && segment.prePoint && segment.nextPoint) {
      segmentsWithAngle.push(segment);
    }
  }
  xArr = xArr.filter(function(item) {
    return !Number.isNaN(item) && item !== Infinity && item !== -Infinity;
  });
  yArr = yArr.filter(function(item) {
    return !Number.isNaN(item) && item !== Infinity && item !== -Infinity;
  });
  var minX = min_default(xArr);
  var minY = min_default(yArr);
  var maxX = max_default(xArr);
  var maxY = max_default(yArr);
  if (segmentsWithAngle.length === 0) {
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
  for (var i = 0; i < segmentsWithAngle.length; i++) {
    var segment = segmentsWithAngle[i];
    var currentPoint = segment.currentPoint;
    var extra = void 0;
    if (currentPoint[0] === minX) {
      extra = getExtraFromSegmentWithAngle(segment, lineWidth);
      minX = minX - extra.xExtra;
    } else if (currentPoint[0] === maxX) {
      extra = getExtraFromSegmentWithAngle(segment, lineWidth);
      maxX = maxX + extra.xExtra;
    }
    if (currentPoint[1] === minY) {
      extra = getExtraFromSegmentWithAngle(segment, lineWidth);
      minY = minY - extra.yExtra;
    } else if (currentPoint[1] === maxY) {
      extra = getExtraFromSegmentWithAngle(segment, lineWidth);
      maxY = maxY + extra.yExtra;
    }
  }
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getExtraFromSegmentWithAngle(segment, lineWidth) {
  var prePoint = segment.prePoint, currentPoint = segment.currentPoint, nextPoint = segment.nextPoint;
  var currentAndPre = Math.pow(currentPoint[0] - prePoint[0], 2) + Math.pow(currentPoint[1] - prePoint[1], 2);
  var currentAndNext = Math.pow(currentPoint[0] - nextPoint[0], 2) + Math.pow(currentPoint[1] - nextPoint[1], 2);
  var preAndNext = Math.pow(prePoint[0] - nextPoint[0], 2) + Math.pow(prePoint[1] - nextPoint[1], 2);
  var currentAngle = Math.acos((currentAndPre + currentAndNext - preAndNext) / (2 * Math.sqrt(currentAndPre) * Math.sqrt(currentAndNext)));
  if (!currentAngle || Math.sin(currentAngle) === 0 || isNumberEqual(currentAngle, 0)) {
    return {
      xExtra: 0,
      yExtra: 0
    };
  }
  var xAngle = Math.abs(Math.atan2(nextPoint[1] - currentPoint[1], nextPoint[0] - currentPoint[0]));
  var yAngle = Math.abs(Math.atan2(nextPoint[0] - currentPoint[0], nextPoint[1] - currentPoint[1]));
  xAngle = xAngle > Math.PI / 2 ? Math.PI - xAngle : xAngle;
  yAngle = yAngle > Math.PI / 2 ? Math.PI - yAngle : yAngle;
  var extra = {
    // 水平方向投影
    xExtra: Math.cos(currentAngle / 2 - xAngle) * (lineWidth / 2 * (1 / Math.sin(currentAngle / 2))) - lineWidth / 2 || 0,
    // 垂直方向投影
    yExtra: Math.cos(yAngle - currentAngle / 2) * (lineWidth / 2 * (1 / Math.sin(currentAngle / 2))) - lineWidth / 2 || 0
  };
  return extra;
}
function toSymmetry(point, center) {
  return [
    center[0] + (center[0] - point[0]),
    center[1] + (center[1] - point[1])
  ];
}
var angleBetween2 = function(v0, v1) {
  var p = v0.x * v1.x + v0.y * v1.y;
  var n = Math.sqrt((Math.pow(v0.x, 2) + Math.pow(v0.y, 2)) * (Math.pow(v1.x, 2) + Math.pow(v1.y, 2)));
  var sign = v0.x * v1.y - v0.y * v1.x < 0 ? -1 : 1;
  var angle3 = sign * Math.acos(p / n);
  return angle3;
};
var pointOnEllipticalArc = function(p0, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, p1, t) {
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  xAxisRotation = mod_default(xAxisRotation, 360);
  var xAxisRotationRadians = deg2rad(xAxisRotation);
  if (p0.x === p1.x && p0.y === p1.y) {
    return { x: p0.x, y: p0.y, ellipticalArcAngle: 0 };
  }
  if (rx === 0 || ry === 0) {
    return { x: 0, y: 0, ellipticalArcAngle: 0 };
  }
  var dx = (p0.x - p1.x) / 2;
  var dy = (p0.y - p1.y) / 2;
  var transformedPoint = {
    x: Math.cos(xAxisRotationRadians) * dx + Math.sin(xAxisRotationRadians) * dy,
    y: -Math.sin(xAxisRotationRadians) * dx + Math.cos(xAxisRotationRadians) * dy
  };
  var radiiCheck = Math.pow(transformedPoint.x, 2) / Math.pow(rx, 2) + Math.pow(transformedPoint.y, 2) / Math.pow(ry, 2);
  if (radiiCheck > 1) {
    rx = Math.sqrt(radiiCheck) * rx;
    ry = Math.sqrt(radiiCheck) * ry;
  }
  var cSquareNumerator = Math.pow(rx, 2) * Math.pow(ry, 2) - Math.pow(rx, 2) * Math.pow(transformedPoint.y, 2) - Math.pow(ry, 2) * Math.pow(transformedPoint.x, 2);
  var cSquareRootDenom = Math.pow(rx, 2) * Math.pow(transformedPoint.y, 2) + Math.pow(ry, 2) * Math.pow(transformedPoint.x, 2);
  var cRadicand = cSquareNumerator / cSquareRootDenom;
  cRadicand = cRadicand < 0 ? 0 : cRadicand;
  var cCoef = (largeArcFlag !== sweepFlag ? 1 : -1) * Math.sqrt(cRadicand);
  var transformedCenter = {
    x: cCoef * (rx * transformedPoint.y / ry),
    y: cCoef * (-(ry * transformedPoint.x) / rx)
  };
  var center = {
    x: Math.cos(xAxisRotationRadians) * transformedCenter.x - Math.sin(xAxisRotationRadians) * transformedCenter.y + (p0.x + p1.x) / 2,
    y: Math.sin(xAxisRotationRadians) * transformedCenter.x + Math.cos(xAxisRotationRadians) * transformedCenter.y + (p0.y + p1.y) / 2
  };
  var startVector = {
    x: (transformedPoint.x - transformedCenter.x) / rx,
    y: (transformedPoint.y - transformedCenter.y) / ry
  };
  var startAngle = angleBetween2({
    x: 1,
    y: 0
  }, startVector);
  var endVector = {
    x: (-transformedPoint.x - transformedCenter.x) / rx,
    y: (-transformedPoint.y - transformedCenter.y) / ry
  };
  var sweepAngle = angleBetween2(startVector, endVector);
  if (!sweepFlag && sweepAngle > 0) {
    sweepAngle -= 2 * Math.PI;
  } else if (sweepFlag && sweepAngle < 0) {
    sweepAngle += 2 * Math.PI;
  }
  sweepAngle %= 2 * Math.PI;
  var angle3 = startAngle + sweepAngle * t;
  var ellipseComponentX = rx * Math.cos(angle3);
  var ellipseComponentY = ry * Math.sin(angle3);
  var point = {
    x: Math.cos(xAxisRotationRadians) * ellipseComponentX - Math.sin(xAxisRotationRadians) * ellipseComponentY + center.x,
    y: Math.sin(xAxisRotationRadians) * ellipseComponentX + Math.cos(xAxisRotationRadians) * ellipseComponentY + center.y,
    ellipticalArcStartAngle: startAngle,
    ellipticalArcEndAngle: startAngle + sweepAngle,
    ellipticalArcAngle: angle3,
    ellipticalArcCenter: center,
    resultantRx: rx,
    resultantRy: ry
  };
  return point;
};
function path2Segments(path) {
  var segments = [];
  var currentPoint = null;
  var nextParams = null;
  var startMovePoint = null;
  var lastStartMovePointIndex = 0;
  var count = path.length;
  for (var i = 0; i < count; i++) {
    var params = path[i];
    nextParams = path[i + 1];
    var command = params[0];
    var segment = {
      command,
      prePoint: currentPoint,
      params,
      startTangent: null,
      endTangent: null,
      currentPoint: null,
      nextPoint: null,
      arcParams: null,
      box: null,
      cubicParams: null
    };
    switch (command) {
      case "M":
        startMovePoint = [params[1], params[2]];
        lastStartMovePointIndex = i;
        break;
      case "A":
        var arcParams = getArcParams(currentPoint, params);
        segment.arcParams = arcParams;
        break;
    }
    if (command === "Z") {
      currentPoint = startMovePoint;
      nextParams = path[lastStartMovePointIndex + 1];
    } else {
      var len5 = params.length;
      currentPoint = [params[len5 - 2], params[len5 - 1]];
    }
    if (nextParams && nextParams[0] === "Z") {
      nextParams = path[lastStartMovePointIndex];
      if (segments[lastStartMovePointIndex]) {
        segments[lastStartMovePointIndex].prePoint = currentPoint;
      }
    }
    segment.currentPoint = currentPoint;
    if (segments[lastStartMovePointIndex] && isSamePoint(currentPoint, segments[lastStartMovePointIndex].currentPoint)) {
      segments[lastStartMovePointIndex].prePoint = segment.prePoint;
    }
    var nextPoint = nextParams ? [nextParams[nextParams.length - 2], nextParams[nextParams.length - 1]] : null;
    segment.nextPoint = nextPoint;
    var prePoint = segment.prePoint;
    if (["L", "H", "V"].includes(command)) {
      segment.startTangent = [
        prePoint[0] - currentPoint[0],
        prePoint[1] - currentPoint[1]
      ];
      segment.endTangent = [
        currentPoint[0] - prePoint[0],
        currentPoint[1] - prePoint[1]
      ];
    } else if (command === "Q") {
      var cp = [params[1], params[2]];
      segment.startTangent = [prePoint[0] - cp[0], prePoint[1] - cp[1]];
      segment.endTangent = [currentPoint[0] - cp[0], currentPoint[1] - cp[1]];
    } else if (command === "T") {
      var preSegment = segments[i - 1];
      var cp = toSymmetry(preSegment.currentPoint, prePoint);
      if (preSegment.command === "Q") {
        segment.command = "Q";
        segment.startTangent = [prePoint[0] - cp[0], prePoint[1] - cp[1]];
        segment.endTangent = [currentPoint[0] - cp[0], currentPoint[1] - cp[1]];
      } else {
        segment.command = "TL";
        segment.startTangent = [
          prePoint[0] - currentPoint[0],
          prePoint[1] - currentPoint[1]
        ];
        segment.endTangent = [
          currentPoint[0] - prePoint[0],
          currentPoint[1] - prePoint[1]
        ];
      }
    } else if (command === "C") {
      var cp1 = [params[1], params[2]];
      var cp2 = [params[3], params[4]];
      segment.startTangent = [prePoint[0] - cp1[0], prePoint[1] - cp1[1]];
      segment.endTangent = [currentPoint[0] - cp2[0], currentPoint[1] - cp2[1]];
      if (segment.startTangent[0] === 0 && segment.startTangent[1] === 0) {
        segment.startTangent = [cp1[0] - cp2[0], cp1[1] - cp2[1]];
      }
      if (segment.endTangent[0] === 0 && segment.endTangent[1] === 0) {
        segment.endTangent = [cp2[0] - cp1[0], cp2[1] - cp1[1]];
      }
    } else if (command === "S") {
      var preSegment = segments[i - 1];
      var cp1 = toSymmetry(preSegment.currentPoint, prePoint);
      var cp2 = [params[1], params[2]];
      if (preSegment.command === "C") {
        segment.command = "C";
        segment.startTangent = [prePoint[0] - cp1[0], prePoint[1] - cp1[1]];
        segment.endTangent = [
          currentPoint[0] - cp2[0],
          currentPoint[1] - cp2[1]
        ];
      } else {
        segment.command = "SQ";
        segment.startTangent = [prePoint[0] - cp2[0], prePoint[1] - cp2[1]];
        segment.endTangent = [
          currentPoint[0] - cp2[0],
          currentPoint[1] - cp2[1]
        ];
      }
    } else if (command === "A") {
      var _a = getTangentAtRatio(segment, 0), dx1 = _a.x, dy1 = _a.y;
      var _b = getTangentAtRatio(segment, 1, false), dx2 = _b.x, dy2 = _b.y;
      segment.startTangent = [dx1, dy1];
      segment.endTangent = [dx2, dy2];
    }
    segments.push(segment);
  }
  return segments;
}
function getTangentAtRatio(segment, ratio, sign) {
  if (sign === void 0) {
    sign = true;
  }
  var _a = segment.arcParams, _b = _a.rx, rx = _b === void 0 ? 0 : _b, _c = _a.ry, ry = _c === void 0 ? 0 : _c, xRotation = _a.xRotation, arcFlag = _a.arcFlag, sweepFlag = _a.sweepFlag;
  var p1 = pointOnEllipticalArc({ x: segment.prePoint[0], y: segment.prePoint[1] }, rx, ry, xRotation, !!arcFlag, !!sweepFlag, { x: segment.currentPoint[0], y: segment.currentPoint[1] }, ratio);
  var p2 = pointOnEllipticalArc({ x: segment.prePoint[0], y: segment.prePoint[1] }, rx, ry, xRotation, !!arcFlag, !!sweepFlag, { x: segment.currentPoint[0], y: segment.currentPoint[1] }, sign ? ratio + 5e-3 : ratio - 5e-3);
  var xDist = p2.x - p1.x;
  var yDist = p2.y - p1.y;
  var dist4 = Math.sqrt(xDist * xDist + yDist * yDist);
  return { x: -xDist / dist4, y: -yDist / dist4 };
}
function vMag(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}
function vRatio(u, v) {
  return vMag(u) * vMag(v) ? (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v)) : 1;
}
function vAngle(u, v) {
  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
}
function getArcParams(startPoint, params) {
  var rx = params[1];
  var ry = params[2];
  var xRotation = mod_default(deg2rad(params[3]), Math.PI * 2);
  var arcFlag = params[4];
  var sweepFlag = params[5];
  var x1 = startPoint[0];
  var y1 = startPoint[1];
  var x2 = params[6];
  var y2 = params[7];
  var xp = Math.cos(xRotation) * (x1 - x2) / 2 + Math.sin(xRotation) * (y1 - y2) / 2;
  var yp = -1 * Math.sin(xRotation) * (x1 - x2) / 2 + Math.cos(xRotation) * (y1 - y2) / 2;
  var lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }
  var diff = rx * rx * (yp * yp) + ry * ry * (xp * xp);
  var f = diff ? Math.sqrt((rx * rx * (ry * ry) - diff) / diff) : 1;
  if (arcFlag === sweepFlag) {
    f *= -1;
  }
  if (isNaN(f)) {
    f = 0;
  }
  var cxp = ry ? f * rx * yp / ry : 0;
  var cyp = rx ? f * -ry * xp / rx : 0;
  var cx = (x1 + x2) / 2 + Math.cos(xRotation) * cxp - Math.sin(xRotation) * cyp;
  var cy = (y1 + y2) / 2 + Math.sin(xRotation) * cxp + Math.cos(xRotation) * cyp;
  var u = [(xp - cxp) / rx, (yp - cyp) / ry];
  var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
  var theta = vAngle([1, 0], u);
  var dTheta = vAngle(u, v);
  if (vRatio(u, v) <= -1) {
    dTheta = Math.PI;
  }
  if (vRatio(u, v) >= 1) {
    dTheta = 0;
  }
  if (sweepFlag === 0 && dTheta > 0) {
    dTheta = dTheta - 2 * Math.PI;
  }
  if (sweepFlag === 1 && dTheta < 0) {
    dTheta = dTheta + 2 * Math.PI;
  }
  return {
    cx,
    cy,
    // 弧形的起点和终点相同时，长轴和短轴的长度按 0 处理
    rx: isSamePoint(startPoint, [x2, y2]) ? 0 : rx,
    ry: isSamePoint(startPoint, [x2, y2]) ? 0 : ry,
    startAngle: theta,
    endAngle: theta + dTheta,
    xRotation,
    arcFlag,
    sweepFlag
  };
}
function commandsToPathString(commands, object, transform2) {
  return commands.reduce(function(prev, cur) {
    var path = "";
    if (cur[0] === "M" || cur[0] === "L") {
      var p = vec3_exports.fromValues(cur[1], cur[2], 0);
      if (transform2) {
        vec3_exports.transformMat4(p, p, transform2);
      }
      path = "".concat(cur[0]).concat(p[0], ",").concat(p[1]);
    } else if (cur[0] === "Z") {
      path = cur[0];
    } else if (cur[0] === "C") {
      var p1 = vec3_exports.fromValues(cur[1], cur[2], 0);
      var p2 = vec3_exports.fromValues(cur[3], cur[4], 0);
      var p3 = vec3_exports.fromValues(cur[5], cur[6], 0);
      if (transform2) {
        vec3_exports.transformMat4(p1, p1, transform2);
        vec3_exports.transformMat4(p2, p2, transform2);
        vec3_exports.transformMat4(p3, p3, transform2);
      }
      path = "".concat(cur[0]).concat(p1[0], ",").concat(p1[1], ",").concat(p2[0], ",").concat(p2[1], ",").concat(p3[0], ",").concat(p3[1]);
    } else if (cur[0] === "A") {
      var c = vec3_exports.fromValues(cur[6], cur[7], 0);
      if (transform2) {
        vec3_exports.transformMat4(c, c, transform2);
      }
      path = "".concat(cur[0]).concat(cur[1], ",").concat(cur[2], ",").concat(cur[3], ",").concat(cur[4], ",").concat(cur[5], ",").concat(c[0], ",").concat(c[1]);
    } else if (cur[0] === "Q") {
      var p1 = vec3_exports.fromValues(cur[1], cur[2], 0);
      var p2 = vec3_exports.fromValues(cur[3], cur[4], 0);
      if (transform2) {
        vec3_exports.transformMat4(p1, p1, transform2);
        vec3_exports.transformMat4(p2, p2, transform2);
      }
      path = "".concat(cur[0]).concat(cur[1], ",").concat(cur[2], ",").concat(cur[3], ",").concat(cur[4], "}");
    }
    return prev += path;
  }, "");
}
function lineToCommands(x1, y1, x2, y2) {
  return [
    ["M", x1, y1],
    ["L", x2, y2]
  ];
}
function ellipseToCommands(rx, ry, cx, cy) {
  var factor = (-1 + Math.sqrt(2)) / 3 * 4;
  var dx = rx * factor;
  var dy = ry * factor;
  var left = cx - rx;
  var right = cx + rx;
  var top = cy - ry;
  var bottom = cy + ry;
  return [
    ["M", left, cy],
    ["C", left, cy - dy, cx - dx, top, cx, top],
    ["C", cx + dx, top, right, cy - dy, right, cy],
    ["C", right, cy + dy, cx + dx, bottom, cx, bottom],
    ["C", cx - dx, bottom, left, cy + dy, left, cy],
    ["Z"]
  ];
}
function polygonToCommands(points, closed) {
  var result = points.map(function(point, i) {
    return [i === 0 ? "M" : "L", point[0], point[1]];
  });
  if (closed) {
    result.push(["Z"]);
  }
  return result;
}
function rectToCommands(width, height, x, y, radius) {
  if (radius) {
    var _a = __read(radius, 4), tlr = _a[0], trr = _a[1], brr = _a[2], blr = _a[3];
    var signX = width > 0 ? 1 : -1;
    var signY = height > 0 ? 1 : -1;
    var sweepFlag = signX + signY !== 0 ? 1 : 0;
    return [
      ["M", signX * tlr + x, y],
      ["L", width - signX * trr + x, y],
      trr ? ["A", trr, trr, 0, 0, sweepFlag, width + x, signY * trr + y] : null,
      ["L", width + x, height - signY * brr + y],
      brr ? ["A", brr, brr, 0, 0, sweepFlag, width + x - signX * brr, height + y] : null,
      ["L", x + signX * blr, height + y],
      blr ? ["A", blr, blr, 0, 0, sweepFlag, x, height + y - signY * blr] : null,
      ["L", x, signY * tlr + y],
      tlr ? ["A", tlr, tlr, 0, 0, sweepFlag, signX * tlr + x, y] : null,
      ["Z"]
    ].filter(function(command) {
      return command;
    });
  }
  return [
    ["M", x, y],
    ["L", x + width, y],
    ["L", x + width, y + height],
    ["L", x, y + height],
    ["Z"]
  ];
}
function convertToPath(object, transform2) {
  if (transform2 === void 0) {
    transform2 = object.getLocalTransform();
  }
  var commands = [];
  switch (object.nodeName) {
    case Shape.LINE:
      var _a = object.parsedStyle, _b = _a.x1, x1 = _b === void 0 ? 0 : _b, _c = _a.y1, y1 = _c === void 0 ? 0 : _c, _d = _a.x2, x2 = _d === void 0 ? 0 : _d, _e = _a.y2, y2 = _e === void 0 ? 0 : _e;
      commands = lineToCommands(x1, y1, x2, y2);
      break;
    case Shape.CIRCLE: {
      var _f = object.parsedStyle, _g = _f.r, r = _g === void 0 ? 0 : _g, _h = _f.cx, cx = _h === void 0 ? 0 : _h, _j = _f.cy, cy = _j === void 0 ? 0 : _j;
      commands = ellipseToCommands(r, r, cx, cy);
      break;
    }
    case Shape.ELLIPSE: {
      var _k = object.parsedStyle, _l = _k.rx, rx = _l === void 0 ? 0 : _l, _m = _k.ry, ry = _m === void 0 ? 0 : _m, _o = _k.cx, cx = _o === void 0 ? 0 : _o, _p = _k.cy, cy = _p === void 0 ? 0 : _p;
      commands = ellipseToCommands(rx, ry, cx, cy);
      break;
    }
    case Shape.POLYLINE:
    case Shape.POLYGON:
      var points = object.parsedStyle.points;
      commands = polygonToCommands(points.points, object.nodeName === Shape.POLYGON);
      break;
    case Shape.RECT:
      var _q = object.parsedStyle, _r = _q.width, width_1 = _r === void 0 ? 0 : _r, _s = _q.height, height_1 = _s === void 0 ? 0 : _s, _t = _q.x, x = _t === void 0 ? 0 : _t, _u = _q.y, y = _u === void 0 ? 0 : _u, radius = _q.radius;
      var hasRadius = radius && radius.some(function(r2) {
        return r2 !== 0;
      });
      commands = rectToCommands(width_1, height_1, x, y, hasRadius && radius.map(function(r2) {
        return clamp_default(r2, 0, Math.min(Math.abs(width_1) / 2, Math.abs(height_1) / 2));
      }));
      break;
    case Shape.PATH:
      var absolutePath = object.parsedStyle.d.absolutePath;
      commands = __spreadArray([], __read(absolutePath), false);
      break;
  }
  if (commands.length) {
    return commandsToPathString(commands, object, transform2);
  }
}
function translatePathToString(absolutePath, startOffsetX, startOffsetY, endOffsetX, endOffsetY) {
  if (startOffsetX === void 0) {
    startOffsetX = 0;
  }
  if (startOffsetY === void 0) {
    startOffsetY = 0;
  }
  if (endOffsetX === void 0) {
    endOffsetX = 0;
  }
  if (endOffsetY === void 0) {
    endOffsetY = 0;
  }
  var newValue = absolutePath.map(function(params, i) {
    var command = params[0];
    var nextSegment = absolutePath[i + 1];
    var useStartOffset = i === 0 && (startOffsetX !== 0 || startOffsetY !== 0);
    var useEndOffset = (i === absolutePath.length - 1 || nextSegment && (nextSegment[0] === "M" || nextSegment[0] === "Z")) && endOffsetX !== 0 && endOffsetY !== 0;
    switch (command) {
      case "M":
        if (useStartOffset) {
          return "M ".concat(params[1] + startOffsetX, ",").concat(params[2] + startOffsetY, " L ").concat(params[1], ",").concat(params[2]);
        } else {
          return "M ".concat(params[1], ",").concat(params[2]);
        }
      case "L":
        return "L ".concat(params[1] + (useEndOffset ? endOffsetX : 0), ",").concat(params[2] + (useEndOffset ? endOffsetY : 0));
      case "Q":
        return "Q ".concat(params[1], " ").concat(params[2], ",").concat(params[3], " ").concat(params[4]) + (useEndOffset ? " L ".concat(params[3] + endOffsetX, ",").concat(params[4] + endOffsetY) : "");
      case "C":
        return "C ".concat(params[1], " ").concat(params[2], ",").concat(params[3], " ").concat(params[4], ",").concat(params[5], " ").concat(params[6]) + (useEndOffset ? " L ".concat(params[5] + endOffsetX, ",").concat(params[6] + endOffsetY) : "");
      case "A":
        return "A ".concat(params[1], " ").concat(params[2], " ").concat(params[3], " ").concat(params[4], " ").concat(params[5], " ").concat(params[6], " ").concat(params[7]) + (useEndOffset ? " L ".concat(params[6] + endOffsetX, ",").concat(params[7] + endOffsetY) : "");
      case "Z":
        return "Z";
    }
  }).join(" ");
  if (~newValue.indexOf("NaN")) {
    return "";
  }
  return newValue;
}
var internalParsePath = function(path) {
  if (path === "" || Array.isArray(path) && path.length === 0) {
    return {
      absolutePath: [],
      hasArc: false,
      segments: [],
      polygons: [],
      polylines: [],
      curve: null,
      totalLength: 0,
      rect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    };
  }
  var absolutePath;
  try {
    absolutePath = normalizePath(path);
  } catch (e) {
    absolutePath = normalizePath("");
    console.error("[g]: Invalid SVG Path definition: ".concat(path));
  }
  removeRedundantMCommand(absolutePath);
  var hasArc = hasArcOrBezier(absolutePath);
  var _a = extractPolygons(absolutePath), polygons = _a.polygons, polylines = _a.polylines;
  var segments = path2Segments(absolutePath);
  var _b = getPathBBox2(segments, 0), x = _b.x, y = _b.y, width = _b.width, height = _b.height;
  return {
    absolutePath,
    hasArc,
    segments,
    polygons,
    polylines,
    // curve,
    // Delay the calculation of length.
    totalLength: 0,
    rect: {
      x: Number.isFinite(x) ? x : 0,
      y: Number.isFinite(y) ? y : 0,
      width: Number.isFinite(width) ? width : 0,
      height: Number.isFinite(height) ? height : 0
    }
  };
};
var memoizedParsePath = memoize(internalParsePath);
function parsePath(path) {
  return is_string_default(path) ? memoizedParsePath(path) : internalParsePath(path);
}
function mergePaths(left, right, object) {
  var curve1 = left.curve;
  var curve2 = right.curve;
  if (!curve1 || curve1.length === 0) {
    curve1 = path2Curve(left.absolutePath, false);
    left.curve = curve1;
  }
  if (!curve2 || curve2.length === 0) {
    curve2 = path2Curve(right.absolutePath, false);
    right.curve = curve2;
  }
  var curves = [curve1, curve2];
  if (curve1.length !== curve2.length) {
    curves = equalizeSegments(curve1, curve2);
  }
  var curve0 = getDrawDirection(curves[0]) !== getDrawDirection(curves[1]) ? reverseCurve(curves[0]) : clonePath(curves[0]);
  return [
    curve0,
    getRotatedCurve(curves[1], curve0),
    function(pathArray) {
      return pathArray;
    }
  ];
}
function parsePoints(pointsOrStr, object) {
  var points;
  if (is_string_default(pointsOrStr)) {
    points = pointsOrStr.split(" ").map(function(pointStr) {
      var _a = __read(pointStr.split(","), 2), x = _a[0], y = _a[1];
      return [Number(x), Number(y)];
    });
  } else {
    points = pointsOrStr;
  }
  return {
    points,
    totalLength: 0,
    segments: []
  };
}
function mergePoints(left, right) {
  return [
    left.points,
    right.points,
    function(points) {
      return points;
    }
  ];
}
var _ = null;
function cast(pattern) {
  return function(contents) {
    var i = 0;
    return pattern.map(function(x) {
      return x === _ ? contents[i++] : x;
    });
  };
}
function id(x) {
  return x;
}
var transformFunctions = {
  // @ts-ignore
  matrix: ["NNNNNN", [_, _, 0, 0, _, _, 0, 0, 0, 0, 1, 0, _, _, 0, 1], id],
  matrix3d: ["NNNNNNNNNNNNNNNN", id],
  rotate: ["A"],
  rotatex: ["A"],
  rotatey: ["A"],
  rotatez: ["A"],
  rotate3d: ["NNNA"],
  perspective: ["L"],
  scale: ["Nn", cast([_, _, new CSSUnitValue(1)]), id],
  scalex: [
    "N",
    cast([_, new CSSUnitValue(1), new CSSUnitValue(1)]),
    cast([_, new CSSUnitValue(1)])
  ],
  scaley: [
    "N",
    cast([new CSSUnitValue(1), _, new CSSUnitValue(1)]),
    cast([new CSSUnitValue(1), _])
  ],
  scalez: ["N", cast([new CSSUnitValue(1), new CSSUnitValue(1), _])],
  scale3d: ["NNN", id],
  skew: ["Aa", null, id],
  skewx: ["A", null, cast([_, Odeg])],
  skewy: ["A", null, cast([Odeg, _])],
  translate: ["Tt", cast([_, _, Opx]), id],
  translatex: ["T", cast([_, Opx, Opx]), cast([_, Opx])],
  translatey: ["T", cast([Opx, _, Opx]), cast([Opx, _])],
  translatez: ["L", cast([Opx, Opx, _])],
  translate3d: ["TTL", id]
};
function parseTransform(string) {
  string = (string || "none").toLowerCase().trim();
  if (string === "none") {
    return [];
  }
  var transformRegExp = /\s*(\w+)\(([^)]*)\)/g;
  var result = [];
  var match;
  var prevLastIndex = 0;
  while (match = transformRegExp.exec(string)) {
    if (match.index !== prevLastIndex) {
      return [];
    }
    prevLastIndex = match.index + match[0].length;
    var functionName = match[1];
    var functionData = transformFunctions[functionName];
    if (!functionData) {
      return [];
    }
    var args = match[2].split(",");
    var argTypes = functionData[0];
    if (argTypes.length < args.length) {
      return [];
    }
    var parsedArgs = [];
    for (var i = 0; i < argTypes.length; i++) {
      var arg = args[i];
      var type = argTypes[i];
      var parsedArg = void 0;
      if (!arg) {
        parsedArg = {
          a: Odeg,
          n: parsedArgs[0],
          t: Opx
        }[type];
      } else {
        parsedArg = {
          A: function(s) {
            return s.trim() === "0" ? Odeg : parseAngle(s);
          },
          N: parseNumber,
          T: parseLengthOrPercentage,
          L: parseLength
        }[type.toUpperCase()](arg);
      }
      if (parsedArg === void 0) {
        return [];
      }
      parsedArgs.push(parsedArg);
    }
    result.push({ t: functionName, d: parsedArgs });
    if (transformRegExp.lastIndex === string.length) {
      return result;
    }
  }
  return [];
}
function parseTransformUnmemoize(string) {
  string = (string || "none").toLowerCase().trim();
  if (string === "none") {
    return [];
  }
  var transformRegExp = /\s*(\w+)\(([^)]*)\)/g;
  var result = [];
  var match;
  var prevLastIndex = 0;
  while (match = transformRegExp.exec(string)) {
    if (match.index !== prevLastIndex) {
      return [];
    }
    prevLastIndex = match.index + match[0].length;
    var functionName = match[1];
    var functionData = transformFunctions[functionName];
    if (!functionData) {
      return [];
    }
    var args = match[2].split(",");
    var argTypes = functionData[0];
    if (argTypes.length < args.length) {
      return [];
    }
    var parsedArgs = [];
    for (var i = 0; i < argTypes.length; i++) {
      var arg = args[i];
      var type = argTypes[i];
      var parsedArg = void 0;
      if (!arg) {
        parsedArg = {
          a: Odeg,
          n: parsedArgs[0],
          t: Opx
        }[type];
      } else {
        parsedArg = {
          A: function(s) {
            return s.trim() === "0" ? Odeg : parseAngleUnmemoize(s);
          },
          N: parseNumberUnmemoize,
          T: parseLengthOrPercentageUnmemoize,
          L: parseLengthUnmemoize
        }[type.toUpperCase()](arg);
      }
      if (parsedArg === void 0) {
        return [];
      }
      parsedArgs.push(parsedArg);
    }
    result.push({ t: functionName, d: parsedArgs });
    if (transformRegExp.lastIndex === string.length) {
      return result;
    }
  }
  return [];
}
function convertItemToMatrix(item) {
  var x;
  var y;
  var z;
  var angle3;
  switch (item.t) {
    case "rotatex":
      angle3 = deg2rad(convertAngleUnit(item.d[0]));
      return [
        1,
        0,
        0,
        0,
        0,
        Math.cos(angle3),
        Math.sin(angle3),
        0,
        0,
        -Math.sin(angle3),
        Math.cos(angle3),
        0,
        0,
        0,
        0,
        1
      ];
    case "rotatey":
      angle3 = deg2rad(convertAngleUnit(item.d[0]));
      return [
        Math.cos(angle3),
        0,
        -Math.sin(angle3),
        0,
        0,
        1,
        0,
        0,
        Math.sin(angle3),
        0,
        Math.cos(angle3),
        0,
        0,
        0,
        0,
        1
      ];
    case "rotate":
    case "rotatez":
      angle3 = deg2rad(convertAngleUnit(item.d[0]));
      return [
        Math.cos(angle3),
        Math.sin(angle3),
        0,
        0,
        -Math.sin(angle3),
        Math.cos(angle3),
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ];
    case "rotate3d":
      x = item.d[0].value;
      y = item.d[1].value;
      z = item.d[2].value;
      angle3 = deg2rad(convertAngleUnit(item.d[3]));
      var sqrLength = x * x + y * y + z * z;
      if (sqrLength === 0) {
        x = 1;
        y = 0;
        z = 0;
      } else if (sqrLength !== 1) {
        var length_1 = Math.sqrt(sqrLength);
        x /= length_1;
        y /= length_1;
        z /= length_1;
      }
      var s = Math.sin(angle3 / 2);
      var sc = s * Math.cos(angle3 / 2);
      var sq = s * s;
      return [
        1 - 2 * (y * y + z * z) * sq,
        2 * (x * y * sq + z * sc),
        2 * (x * z * sq - y * sc),
        0,
        2 * (x * y * sq - z * sc),
        1 - 2 * (x * x + z * z) * sq,
        2 * (y * z * sq + x * sc),
        0,
        2 * (x * z * sq + y * sc),
        2 * (y * z * sq - x * sc),
        1 - 2 * (x * x + y * y) * sq,
        0,
        0,
        0,
        0,
        1
      ];
    case "scale":
      return [
        item.d[0].value,
        0,
        0,
        0,
        0,
        item.d[1].value,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ];
    case "scalex":
      return [item.d[0].value, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case "scaley":
      return [1, 0, 0, 0, 0, item.d[0].value, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case "scalez":
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, item.d[0].value, 0, 0, 0, 0, 1];
    case "scale3d":
      return [
        item.d[0].value,
        0,
        0,
        0,
        0,
        item.d[1].value,
        0,
        0,
        0,
        0,
        item.d[2].value,
        0,
        0,
        0,
        0,
        1
      ];
    case "skew":
      var xAngle = deg2rad(convertAngleUnit(item.d[0]));
      var yAngle = deg2rad(convertAngleUnit(item.d[1]));
      return [
        1,
        Math.tan(yAngle),
        0,
        0,
        Math.tan(xAngle),
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ];
    case "skewx":
      angle3 = deg2rad(convertAngleUnit(item.d[0]));
      return [1, 0, 0, 0, Math.tan(angle3), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case "skewy":
      angle3 = deg2rad(convertAngleUnit(item.d[0]));
      return [1, Math.tan(angle3), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case "translate":
      x = convertPercentUnit(item.d[0], 0, null) || 0;
      y = convertPercentUnit(item.d[1], 0, null) || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, 0, 1];
    case "translatex":
      x = convertPercentUnit(item.d[0], 0, null) || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, 0, 0, 1];
    case "translatey":
      y = convertPercentUnit(item.d[0], 0, null) || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, y, 0, 1];
    case "translatez":
      z = convertPercentUnit(item.d[0], 0, null) || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, z, 1];
    case "translate3d":
      x = convertPercentUnit(item.d[0], 0, null) || 0;
      y = convertPercentUnit(item.d[1], 0, null) || 0;
      z = convertPercentUnit(item.d[2], 0, null) || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
    case "perspective":
      var t = convertPercentUnit(item.d[0], 0, null) || 0;
      var p = t ? -1 / t : 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, p, 0, 0, 0, 1];
    case "matrix":
      return [
        item.d[0].value,
        item.d[1].value,
        0,
        0,
        item.d[2].value,
        item.d[3].value,
        0,
        0,
        0,
        0,
        1,
        0,
        item.d[4].value,
        item.d[5].value,
        0,
        1
      ];
    case "matrix3d":
      return item.d.map(function(d) {
        return d.value;
      });
  }
}
function multiplyMatrices(a, b) {
  return [
    a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
    a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
    a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
    a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
    a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
    a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
    a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
    a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
    a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
    a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
    a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
    a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
    a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
    a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
    a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
    a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
  ];
}
function convertToMatrix(transformList) {
  if (transformList.length === 0) {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }
  return transformList.map(convertItemToMatrix).reduce(multiplyMatrices);
}
function makeMatrixDecomposition(transformList) {
  var translate3 = [0, 0, 0];
  var scale7 = [1, 1, 1];
  var skew = [0, 0, 0];
  var perspective2 = [0, 0, 0, 1];
  var quaternion = [0, 0, 0, 1];
  decomposeMat4(
    // @ts-ignore
    convertToMatrix(transformList),
    translate3,
    scale7,
    skew,
    perspective2,
    quaternion
  );
  return [[translate3, scale7, skew, quaternion, perspective2]];
}
var composeMatrix = /* @__PURE__ */ function() {
  function multiply7(a, b) {
    var result = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        for (var k = 0; k < 4; k++) {
          result[i][j] += b[i][k] * a[k][j];
        }
      }
    }
    return result;
  }
  function is2D(m) {
    return m[0][2] == 0 && m[0][3] == 0 && m[1][2] == 0 && m[1][3] == 0 && m[2][0] == 0 && m[2][1] == 0 && m[2][2] == 1 && m[2][3] == 0 && m[3][2] == 0 && m[3][3] == 1;
  }
  function composeMatrix2(translate3, scale7, skew, quat2, perspective2) {
    var matrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    for (var i = 0; i < 4; i++) {
      matrix[i][3] = perspective2[i];
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        matrix[3][i] += translate3[j] * matrix[j][i];
      }
    }
    var x = quat2[0], y = quat2[1], z = quat2[2], w = quat2[3];
    var rotMatrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    rotMatrix[0][0] = 1 - 2 * (y * y + z * z);
    rotMatrix[0][1] = 2 * (x * y - z * w);
    rotMatrix[0][2] = 2 * (x * z + y * w);
    rotMatrix[1][0] = 2 * (x * y + z * w);
    rotMatrix[1][1] = 1 - 2 * (x * x + z * z);
    rotMatrix[1][2] = 2 * (y * z - x * w);
    rotMatrix[2][0] = 2 * (x * z - y * w);
    rotMatrix[2][1] = 2 * (y * z + x * w);
    rotMatrix[2][2] = 1 - 2 * (x * x + y * y);
    matrix = multiply7(matrix, rotMatrix);
    var temp = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    if (skew[2]) {
      temp[2][1] = skew[2];
      matrix = multiply7(matrix, temp);
    }
    if (skew[1]) {
      temp[2][1] = 0;
      temp[2][0] = skew[0];
      matrix = multiply7(matrix, temp);
    }
    if (skew[0]) {
      temp[2][0] = 0;
      temp[1][0] = skew[0];
      matrix = multiply7(matrix, temp);
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        matrix[i][j] *= scale7[i];
      }
    }
    if (is2D(matrix)) {
      return [
        matrix[0][0],
        matrix[0][1],
        matrix[1][0],
        matrix[1][1],
        matrix[3][0],
        matrix[3][1]
      ];
    }
    return matrix[0].concat(matrix[1], matrix[2], matrix[3]);
  }
  return composeMatrix2;
}();
function numberToLongString(x) {
  return x.toFixed(6).replace(".000000", "");
}
function mergeMatrices(left, right) {
  var leftArgs;
  var rightArgs;
  if (left.decompositionPair !== right) {
    left.decompositionPair = right;
    leftArgs = makeMatrixDecomposition(left);
  }
  if (right.decompositionPair !== left) {
    right.decompositionPair = left;
    rightArgs = makeMatrixDecomposition(right);
  }
  if (leftArgs[0] === null || rightArgs[0] === null)
    return [
      // @ts-ignore
      [false],
      // @ts-ignore
      [true],
      // @ts-ignore
      function(x) {
        return x ? right[0].d : left[0].d;
      }
    ];
  leftArgs[0].push(0);
  rightArgs[0].push(1);
  return [
    leftArgs,
    rightArgs,
    // @ts-ignore
    function(list) {
      var q = quat(leftArgs[0][3], rightArgs[0][3], list[5]);
      var mat = composeMatrix(list[0], list[1], list[2], q, list[4]);
      var stringifiedArgs = mat.map(numberToLongString).join(",");
      return stringifiedArgs;
    }
  ];
}
function dot5(v1, v2) {
  var result = 0;
  for (var i = 0; i < v1.length; i++) {
    result += v1[i] * v2[i];
  }
  return result;
}
function quat(fromQ, toQ, f) {
  var product = dot5(fromQ, toQ);
  product = clamp_default(product, -1, 1);
  var quat2 = [];
  if (product === 1) {
    quat2 = fromQ;
  } else {
    var theta = Math.acos(product);
    var w = Math.sin(f * theta) * 1 / Math.sqrt(1 - product * product);
    for (var i = 0; i < 4; i++) {
      quat2.push(fromQ[i] * (Math.cos(f * theta) - product * w) + toQ[i] * w);
    }
  }
  return quat2;
}
function typeTo2D(type) {
  return type.replace(/[xy]/, "");
}
function typeTo3D(type) {
  return type.replace(/(x|y|z|3d)?$/, "3d");
}
var isMatrixOrPerspective = function(lt, rt) {
  return lt === "perspective" && rt === "perspective" || (lt === "matrix" || lt === "matrix3d") && (rt === "matrix" || rt === "matrix3d");
};
function mergeTransforms(left, right, target) {
  var flipResults = false;
  if (!left.length || !right.length) {
    if (!left.length) {
      flipResults = true;
      left = right;
      right = [];
    }
    var _loop_1 = function(i2) {
      var _a = left[i2], type2 = _a.t, args = _a.d;
      var defaultValue = type2.substring(0, 5) === "scale" ? 1 : 0;
      right.push({
        t: type2,
        d: args.map(function(arg) {
          if (typeof arg === "number") {
            return getOrCreateUnitValue(defaultValue);
          }
          return getOrCreateUnitValue(defaultValue, arg.unit);
        })
      });
    };
    for (var i = 0; i < left.length; i++) {
      _loop_1(i);
    }
  }
  var leftResult = [];
  var rightResult = [];
  var types = [];
  if (left.length !== right.length) {
    var merged = mergeMatrices(left, right);
    leftResult = [merged[0]];
    rightResult = [merged[1]];
    types = [["matrix", [merged[2]]]];
  } else {
    for (var i = 0; i < left.length; i++) {
      var leftType = left[i].t;
      var rightType = right[i].t;
      var leftArgs = left[i].d;
      var rightArgs = right[i].d;
      var leftFunctionData = transformFunctions[leftType];
      var rightFunctionData = transformFunctions[rightType];
      var type = void 0;
      if (isMatrixOrPerspective(leftType, rightType)) {
        var merged = mergeMatrices([left[i]], [right[i]]);
        leftResult.push(merged[0]);
        rightResult.push(merged[1]);
        types.push(["matrix", [merged[2]]]);
        continue;
      } else if (leftType === rightType) {
        type = leftType;
      } else if (leftFunctionData[2] && rightFunctionData[2] && typeTo2D(leftType) === typeTo2D(rightType)) {
        type = typeTo2D(leftType);
        leftArgs = leftFunctionData[2](leftArgs);
        rightArgs = rightFunctionData[2](rightArgs);
      } else if (leftFunctionData[1] && rightFunctionData[1] && typeTo3D(leftType) === typeTo3D(rightType)) {
        type = typeTo3D(leftType);
        leftArgs = leftFunctionData[1](leftArgs);
        rightArgs = rightFunctionData[1](rightArgs);
      } else {
        var merged = mergeMatrices(left, right);
        leftResult = [merged[0]];
        rightResult = [merged[1]];
        types = [["matrix", [merged[2]]]];
        break;
      }
      var leftArgsCopy = [];
      var rightArgsCopy = [];
      var stringConversions = [];
      for (var j = 0; j < leftArgs.length; j++) {
        var merged = mergeDimensions(leftArgs[j], rightArgs[j], target, false, j);
        leftArgsCopy[j] = merged[0];
        rightArgsCopy[j] = merged[1];
        stringConversions.push(merged[2]);
      }
      leftResult.push(leftArgsCopy);
      rightResult.push(rightArgsCopy);
      types.push([type, stringConversions]);
    }
  }
  if (flipResults) {
    var tmp2 = leftResult;
    leftResult = rightResult;
    rightResult = tmp2;
  }
  return [
    leftResult,
    rightResult,
    function(list) {
      return list.map(function(args, i2) {
        var stringifiedArgs = args.map(function(arg, j2) {
          return types[i2][1][j2](arg);
        }).join(",");
        if (types[i2][0] === "matrix" && stringifiedArgs.split(",").length === 16) {
          types[i2][0] = "matrix3d";
        }
        if (types[i2][0] === "matrix3d" && stringifiedArgs.split(",").length === 6) {
          types[i2][0] = "matrix";
        }
        return types[i2][0] + "(" + stringifiedArgs + ")";
      }).join(" ");
    }
  ];
}
var parseTransformOrigin = memoize(function(value) {
  if (is_string_default(value)) {
    if (value === "text-anchor") {
      return [getOrCreateUnitValue(0, "px"), getOrCreateUnitValue(0, "px")];
    }
    var values = value.split(" ");
    if (values.length === 1) {
      if (values[0] === "top" || values[0] === "bottom") {
        values[1] = values[0];
        values[0] = "center";
      } else {
        values[1] = "center";
      }
    }
    if (values.length !== 2) {
      return null;
    }
    return [
      parseLengthOrPercentage(convertKeyword2Percent(values[0])),
      parseLengthOrPercentage(convertKeyword2Percent(values[1]))
    ];
  } else {
    return [
      getOrCreateUnitValue(value[0] || 0, "px"),
      getOrCreateUnitValue(value[1] || 0, "px")
    ];
  }
});
var parseTransformOriginUnmemoize = function(value) {
  if (is_string_default(value)) {
    if (value === "text-anchor") {
      return [getOrCreateUnitValue(0, "px"), getOrCreateUnitValue(0, "px")];
    }
    var values = value.split(" ");
    if (values.length === 1) {
      if (values[0] === "top" || values[0] === "bottom") {
        values[1] = values[0];
        values[0] = "center";
      } else {
        values[1] = "center";
      }
    }
    if (values.length !== 2) {
      return null;
    }
    return [
      parseLengthOrPercentageUnmemoize(convertKeyword2Percent(values[0])),
      parseLengthOrPercentageUnmemoize(convertKeyword2Percent(values[1]))
    ];
  } else {
    return [
      getOrCreateUnitValue(value[0] || 0, "px"),
      getOrCreateUnitValue(value[1] || 0, "px")
    ];
  }
};
function convertKeyword2Percent(keyword) {
  if (keyword === "center") {
    return "50%";
  } else if (keyword === "left" || keyword === "top") {
    return "0%";
  } else if (keyword === "right" || keyword === "bottom") {
    return "100%";
  }
  return keyword;
}
var BUILT_IN_PROPERTIES = [
  {
    /**
     * used in CSS Layout API
     * eg. `display: 'flex'`
     */
    n: "display",
    k: ["none"]
  },
  {
    /**
     * range [0.0, 1.0]
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/opacity
     */
    n: "opacity",
    int: true,
    inh: true,
    d: "1",
    syntax: PropertySyntax.OPACITY_VALUE
  },
  {
    /**
     * inheritable, range [0.0, 1.0]
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-opacity
     * @see https://svgwg.org/svg2-draft/painting.html#FillOpacity
     */
    n: "fillOpacity",
    int: true,
    inh: true,
    d: "1",
    syntax: PropertySyntax.OPACITY_VALUE
  },
  {
    /**
     * inheritable, range [0.0, 1.0]
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-opacity
     * @see https://svgwg.org/svg2-draft/painting.html#StrokeOpacity
     */
    n: "strokeOpacity",
    int: true,
    inh: true,
    d: "1",
    syntax: PropertySyntax.OPACITY_VALUE
  },
  {
    /**
     * background-color is not inheritable
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes
     */
    n: "fill",
    int: true,
    k: ["none"],
    d: "none",
    syntax: PropertySyntax.PAINT
  },
  {
    n: "fillRule",
    k: ["nonzero", "evenodd"],
    d: "nonzero"
  },
  /**
   * default to none
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke#usage_notes
   */
  {
    n: "stroke",
    int: true,
    k: ["none"],
    d: "none",
    syntax: PropertySyntax.PAINT,
    /**
     * Stroke 'none' won't affect geometry but others will.
     */
    l: true
  },
  {
    n: "shadowType",
    k: ["inner", "outer", "both"],
    d: "outer",
    l: true
  },
  {
    n: "shadowColor",
    int: true,
    syntax: PropertySyntax.COLOR
  },
  {
    n: "shadowOffsetX",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  {
    n: "shadowOffsetY",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  {
    n: "shadowBlur",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.SHADOW_BLUR
  },
  {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width
     */
    n: "lineWidth",
    int: true,
    inh: true,
    d: "1",
    l: true,
    a: ["strokeWidth"],
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  {
    n: "increasedLineWidthForHitTesting",
    inh: true,
    d: "0",
    l: true,
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  {
    n: "lineJoin",
    inh: true,
    l: true,
    a: ["strokeLinejoin"],
    k: ["miter", "bevel", "round"],
    d: "miter"
  },
  {
    n: "lineCap",
    inh: true,
    l: true,
    a: ["strokeLinecap"],
    k: ["butt", "round", "square"],
    d: "butt"
  },
  {
    n: "lineDash",
    int: true,
    inh: true,
    k: ["none"],
    a: ["strokeDasharray"],
    syntax: PropertySyntax.LENGTH_PERCENTAGE_12
  },
  {
    n: "lineDashOffset",
    int: true,
    inh: true,
    d: "0",
    a: ["strokeDashoffset"],
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  {
    n: "offsetPath",
    syntax: PropertySyntax.DEFINED_PATH
  },
  {
    n: "offsetDistance",
    int: true,
    syntax: PropertySyntax.OFFSET_DISTANCE
  },
  {
    n: "dx",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  {
    n: "dy",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  {
    n: "zIndex",
    ind: true,
    int: true,
    d: "0",
    k: ["auto"],
    syntax: PropertySyntax.Z_INDEX
  },
  {
    n: "visibility",
    k: ["visible", "hidden"],
    ind: true,
    inh: true,
    /**
     * support interpolation
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/visibility#interpolation
     */
    int: true,
    d: "visible"
  },
  {
    n: "pointerEvents",
    inh: true,
    k: [
      "none",
      "auto",
      "stroke",
      "fill",
      "painted",
      "visible",
      "visiblestroke",
      "visiblefill",
      "visiblepainted",
      // 'bounding-box',
      "all"
    ],
    d: "auto"
  },
  {
    n: "filter",
    ind: true,
    l: true,
    k: ["none"],
    d: "none",
    syntax: PropertySyntax.FILTER
  },
  {
    n: "clipPath",
    syntax: PropertySyntax.DEFINED_PATH
  },
  {
    n: "textPath",
    syntax: PropertySyntax.DEFINED_PATH
  },
  {
    n: "textPathSide",
    k: ["left", "right"],
    d: "left"
  },
  {
    n: "textPathStartOffset",
    l: true,
    d: "0",
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  {
    n: "transform",
    p: 100,
    int: true,
    k: ["none"],
    d: "none",
    syntax: PropertySyntax.TRANSFORM
  },
  {
    n: "transformOrigin",
    p: 100,
    d: "0 0",
    // // int: true,
    // d: (nodeName: string) => {
    //   if (nodeName === Shape.CIRCLE || nodeName === Shape.ELLIPSE) {
    //     return 'center';
    //   }
    //   if (nodeName === Shape.TEXT) {
    //     return 'text-anchor';
    //   }
    //   return 'left top';
    // },
    l: true,
    syntax: PropertySyntax.TRANSFORM_ORIGIN
  },
  {
    n: "cx",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.COORDINATE
  },
  {
    n: "cy",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.COORDINATE
  },
  {
    n: "cz",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.COORDINATE
  },
  {
    n: "r",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  {
    n: "rx",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  {
    n: "ry",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  // Rect Image Group
  {
    // x in local space
    n: "x",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.COORDINATE
  },
  {
    // y in local space
    n: "y",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.COORDINATE
  },
  {
    // z in local space
    n: "z",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.COORDINATE
  },
  {
    n: "width",
    int: true,
    l: true,
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/width
     */
    k: ["auto", "fit-content", "min-content", "max-content"],
    d: "0",
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  {
    n: "height",
    int: true,
    l: true,
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/height
     */
    k: ["auto", "fit-content", "min-content", "max-content"],
    d: "0",
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  {
    n: "radius",
    int: true,
    l: true,
    d: "0",
    syntax: PropertySyntax.LENGTH_PERCENTAGE_14
  },
  // Line
  {
    n: "x1",
    int: true,
    l: true,
    syntax: PropertySyntax.COORDINATE
  },
  {
    n: "y1",
    int: true,
    l: true,
    syntax: PropertySyntax.COORDINATE
  },
  {
    n: "z1",
    int: true,
    l: true,
    syntax: PropertySyntax.COORDINATE
  },
  {
    n: "x2",
    int: true,
    l: true,
    syntax: PropertySyntax.COORDINATE
  },
  {
    n: "y2",
    int: true,
    l: true,
    syntax: PropertySyntax.COORDINATE
  },
  {
    n: "z2",
    int: true,
    l: true,
    syntax: PropertySyntax.COORDINATE
  },
  // Path
  {
    n: "d",
    int: true,
    l: true,
    d: "",
    syntax: PropertySyntax.PATH,
    p: 50
  },
  // Polyline & Polygon
  {
    n: "points",
    /**
     * support interpolation
     */
    int: true,
    l: true,
    syntax: PropertySyntax.LIST_OF_POINTS,
    p: 50
  },
  // Text
  {
    n: "text",
    l: true,
    d: "",
    syntax: PropertySyntax.TEXT,
    p: 50
  },
  {
    n: "textTransform",
    l: true,
    inh: true,
    k: ["capitalize", "uppercase", "lowercase", "none"],
    d: "none",
    syntax: PropertySyntax.TEXT_TRANSFORM,
    p: 51
    // it must get parsed after text
  },
  {
    n: "font",
    l: true
  },
  {
    n: "fontSize",
    int: true,
    inh: true,
    /**
     * @see https://www.w3schools.com/css/css_font_size.asp
     */
    d: "16px",
    l: true,
    syntax: PropertySyntax.LENGTH_PERCENTAGE
  },
  {
    n: "fontFamily",
    l: true,
    inh: true,
    d: "sans-serif"
  },
  {
    n: "fontStyle",
    l: true,
    inh: true,
    k: ["normal", "italic", "oblique"],
    d: "normal"
  },
  {
    n: "fontWeight",
    l: true,
    inh: true,
    k: ["normal", "bold", "bolder", "lighter"],
    d: "normal"
  },
  {
    n: "fontVariant",
    l: true,
    inh: true,
    k: ["normal", "small-caps"],
    d: "normal"
  },
  {
    n: "lineHeight",
    l: true,
    syntax: PropertySyntax.LENGTH,
    int: true,
    d: "0"
  },
  {
    n: "letterSpacing",
    l: true,
    syntax: PropertySyntax.LENGTH,
    int: true,
    d: "0"
  },
  {
    n: "miterLimit",
    l: true,
    syntax: PropertySyntax.NUMBER,
    d: function(nodeName) {
      if (nodeName === Shape.PATH || nodeName === Shape.POLYGON || nodeName === Shape.POLYLINE) {
        return "4";
      }
      return "10";
    }
  },
  {
    n: "wordWrap",
    l: true
  },
  {
    n: "wordWrapWidth",
    l: true
  },
  {
    n: "maxLines",
    l: true
  },
  {
    n: "textOverflow",
    l: true,
    d: "clip"
  },
  {
    n: "leading",
    l: true
  },
  {
    n: "textBaseline",
    l: true,
    inh: true,
    k: ["top", "hanging", "middle", "alphabetic", "ideographic", "bottom"],
    d: "alphabetic"
  },
  {
    n: "textAlign",
    l: true,
    inh: true,
    k: ["start", "center", "middle", "end", "left", "right"],
    d: "start"
  },
  // {
  //   n: 'whiteSpace',
  //   l: true,
  // },
  {
    n: "markerStart",
    syntax: PropertySyntax.MARKER
  },
  {
    n: "markerEnd",
    syntax: PropertySyntax.MARKER
  },
  {
    n: "markerMid",
    syntax: PropertySyntax.MARKER
  },
  {
    n: "markerStartOffset",
    syntax: PropertySyntax.LENGTH,
    l: true,
    int: true,
    d: "0"
  },
  {
    n: "markerEndOffset",
    syntax: PropertySyntax.LENGTH,
    l: true,
    int: true,
    d: "0"
  }
];
var GEOMETRY_ATTRIBUTE_NAMES = BUILT_IN_PROPERTIES.filter(function(n) {
  return !!n.l;
}).map(function(n) {
  return n.n;
});
var propertyMetadataCache = {};
var unresolvedProperties = /* @__PURE__ */ new WeakMap();
var isPropertyResolved = function(object, name) {
  var properties = unresolvedProperties.get(object);
  if (!properties || properties.length === 0) {
    return true;
  }
  return properties.includes(name);
};
var DefaultStyleValueRegistry = (
  /** @class */
  function() {
    function DefaultStyleValueRegistry2(runtime2) {
      var _this = this;
      this.runtime = runtime2;
      BUILT_IN_PROPERTIES.forEach(function(property) {
        _this.registerMetadata(property);
      });
    }
    DefaultStyleValueRegistry2.prototype.registerMetadata = function(metadata) {
      __spreadArray([metadata.n], __read(metadata.a || []), false).forEach(function(name) {
        propertyMetadataCache[name] = metadata;
      });
    };
    DefaultStyleValueRegistry2.prototype.unregisterMetadata = function(name) {
      delete propertyMetadataCache[name];
    };
    DefaultStyleValueRegistry2.prototype.getPropertySyntax = function(syntax) {
      return this.runtime.CSSPropertySyntaxFactory[syntax];
    };
    DefaultStyleValueRegistry2.prototype.processProperties = function(object, attributes, options) {
      var _this = this;
      if (options === void 0) {
        options = {
          skipUpdateAttribute: false,
          skipParse: false,
          forceUpdateGeometry: false,
          usedAttributes: [],
          memoize: true
        };
      }
      if (!this.runtime.enableCSSParsing) {
        Object.assign(object.attributes, attributes);
        var attributeNames = Object.keys(attributes);
        var oldClipPath = object.parsedStyle.clipPath;
        var oldOffsetPath = object.parsedStyle.offsetPath;
        object.parsedStyle = Object.assign(object.parsedStyle, attributes);
        var needUpdateGeometry = !!options.forceUpdateGeometry;
        if (!needUpdateGeometry) {
          for (var i = 0; i < GEOMETRY_ATTRIBUTE_NAMES.length; i++) {
            if (GEOMETRY_ATTRIBUTE_NAMES[i] in attributes) {
              needUpdateGeometry = true;
              break;
            }
          }
        }
        if (attributes.fill) {
          object.parsedStyle.fill = parseColor(attributes.fill);
        }
        if (attributes.stroke) {
          object.parsedStyle.stroke = parseColor(attributes.stroke);
        }
        if (attributes.shadowColor) {
          object.parsedStyle.shadowColor = parseColor(attributes.shadowColor);
        }
        if (attributes.filter) {
          object.parsedStyle.filter = parseFilter(attributes.filter);
        }
        if (!is_nil_default(attributes.radius)) {
          object.parsedStyle.radius = parseDimensionArrayFormat(
            // @ts-ignore
            attributes.radius,
            4
          );
        }
        if (!is_nil_default(attributes.lineDash)) {
          object.parsedStyle.lineDash = parseDimensionArrayFormat(attributes.lineDash, 2);
        }
        if (attributes.points) {
          object.parsedStyle.points = parsePoints(attributes.points);
        }
        if (attributes.d === "") {
          object.parsedStyle.d = __assign({}, EMPTY_PARSED_PATH);
        }
        if (attributes.d) {
          object.parsedStyle.d = parsePath(
            // @ts-ignore
            attributes.d
          );
        }
        if (attributes.textTransform) {
          this.runtime.CSSPropertySyntaxFactory["<text-transform>"].calculator(null, null, { value: attributes.textTransform }, object, null);
        }
        if (!is_undefined_default(attributes.clipPath)) {
          this.runtime.CSSPropertySyntaxFactory["<defined-path>"].calculator("clipPath", oldClipPath, attributes.clipPath, object, this.runtime);
        }
        if (attributes.offsetPath) {
          this.runtime.CSSPropertySyntaxFactory["<defined-path>"].calculator("offsetPath", oldOffsetPath, attributes.offsetPath, object, this.runtime);
        }
        if (attributes.transform) {
          object.parsedStyle.transform = parseTransform(attributes.transform);
        }
        if (attributes.transformOrigin) {
          object.parsedStyle.transformOrigin = parseTransformOrigin(attributes.transformOrigin);
        }
        if (attributes.markerStart) {
          object.parsedStyle.markerStart = this.runtime.CSSPropertySyntaxFactory["<marker>"].calculator(
            null,
            // @ts-ignore
            attributes.markerStart,
            // @ts-ignore
            attributes.markerStart,
            null,
            null
          );
        }
        if (attributes.markerEnd) {
          object.parsedStyle.markerEnd = this.runtime.CSSPropertySyntaxFactory["<marker>"].calculator(
            null,
            // @ts-ignore
            attributes.markerEnd,
            // @ts-ignore
            attributes.markerEnd,
            null,
            null
          );
        }
        if (attributes.markerMid) {
          object.parsedStyle.markerMid = this.runtime.CSSPropertySyntaxFactory["<marker>"].calculator(
            "",
            // @ts-ignore
            attributes.markerMid,
            // @ts-ignore
            attributes.markerMid,
            null,
            null
          );
        }
        if (!is_nil_default(attributes.zIndex)) {
          this.runtime.CSSPropertySyntaxFactory["<z-index>"].postProcessor(object, attributeNames);
        }
        if (!is_nil_default(attributes.offsetDistance)) {
          this.runtime.CSSPropertySyntaxFactory["<offset-distance>"].postProcessor(object, attributeNames);
        }
        if (attributes.transform) {
          this.runtime.CSSPropertySyntaxFactory["<transform>"].postProcessor(object, attributeNames);
        }
        if (attributes.transformOrigin) {
          this.runtime.CSSPropertySyntaxFactory["<transform-origin>"].postProcessor(object, attributeNames);
        }
        if (needUpdateGeometry) {
          object.geometry.dirty = true;
          object.renderable.boundsDirty = true;
          object.renderable.renderBoundsDirty = true;
          if (!options.forceUpdateGeometry) {
            this.runtime.sceneGraphService.dirtifyToRoot(object);
          }
        }
      } else {
        var skipUpdateAttribute_1 = options.skipUpdateAttribute, skipParse = options.skipParse, forceUpdateGeometry = options.forceUpdateGeometry, usedAttributes = options.usedAttributes, memoize_1 = options.memoize;
        var needUpdateGeometry_1 = forceUpdateGeometry;
        var attributeNames_1 = Object.keys(attributes);
        attributeNames_1.forEach(function(attributeName) {
          var _a;
          if (!skipUpdateAttribute_1) {
            object.attributes[attributeName] = attributes[attributeName];
          }
          if (!needUpdateGeometry_1 && ((_a = propertyMetadataCache[attributeName]) === null || _a === void 0 ? void 0 : _a.l)) {
            needUpdateGeometry_1 = true;
          }
        });
        if (!skipParse) {
          attributeNames_1.forEach(function(name) {
            object.computedStyle[name] = _this.parseProperty(name, object.attributes[name], object, memoize_1);
          });
        }
        if (usedAttributes === null || usedAttributes === void 0 ? void 0 : usedAttributes.length) {
          attributeNames_1 = Array.from(new Set(attributeNames_1.concat(usedAttributes)));
        }
        attributeNames_1.forEach(function(name) {
          if (name in object.computedStyle) {
            object.parsedStyle[name] = _this.computeProperty(name, object.computedStyle[name], object, memoize_1);
          }
        });
        if (needUpdateGeometry_1) {
          object.geometry.dirty = true;
          object.renderable.boundsDirty = true;
          object.renderable.renderBoundsDirty = true;
          if (!options.forceUpdateGeometry) {
            this.runtime.sceneGraphService.dirtifyToRoot(object);
          }
        }
        attributeNames_1.forEach(function(name) {
          if (name in object.parsedStyle) {
            _this.postProcessProperty(name, object, attributeNames_1);
          }
        });
        if (this.runtime.enableCSSParsing && object.children.length) {
          attributeNames_1.forEach(function(name) {
            if (name in object.parsedStyle && _this.isPropertyInheritable(name)) {
              object.children.forEach(function(child) {
                child.internalSetAttribute(name, null, {
                  skipUpdateAttribute: true,
                  skipParse: true
                });
              });
            }
          });
        }
      }
    };
    DefaultStyleValueRegistry2.prototype.parseProperty = function(name, value, object, memoized) {
      var metadata = propertyMetadataCache[name];
      var computed = value;
      if (value === "" || is_nil_default(value)) {
        value = "unset";
      }
      if (value === "unset" || value === "initial" || value === "inherit") {
        computed = getOrCreateKeyword(value);
      } else {
        if (metadata) {
          var keywords = metadata.k, syntax = metadata.syntax;
          var handler = syntax && this.getPropertySyntax(syntax);
          if (keywords && keywords.indexOf(value) > -1) {
            computed = getOrCreateKeyword(value);
          } else if (handler) {
            if (!memoized && handler.parserUnmemoize) {
              computed = handler.parserUnmemoize(value, object);
            } else if (handler.parser) {
              computed = handler.parser(value, object);
            }
          }
        }
      }
      return computed;
    };
    DefaultStyleValueRegistry2.prototype.computeProperty = function(name, computed, object, memoized) {
      var metadata = propertyMetadataCache[name];
      var isDocumentElement = object.id === "g-root";
      var used = computed;
      if (metadata) {
        var syntax = metadata.syntax, inherited = metadata.inh, defaultValue = metadata.d;
        if (computed instanceof CSSKeywordValue) {
          var value = computed.value;
          if (value === "unset") {
            if (inherited && !isDocumentElement) {
              value = "inherit";
            } else {
              value = "initial";
            }
          }
          if (value === "initial") {
            if (!is_nil_default(defaultValue)) {
              computed = this.parseProperty(name, isFunction(defaultValue) ? defaultValue(object.nodeName) : defaultValue, object, memoized);
            }
          } else if (value === "inherit") {
            var resolved = this.tryToResolveProperty(object, name, {
              inherited: true
            });
            if (!is_nil_default(resolved)) {
              return resolved;
            } else {
              this.addUnresolveProperty(object, name);
              return;
            }
          }
        }
        var handler = syntax && this.getPropertySyntax(syntax);
        if (handler && handler.calculator) {
          var oldParsedValue = object.parsedStyle[name];
          used = handler.calculator(name, oldParsedValue, computed, object, this.runtime);
        } else if (computed instanceof CSSKeywordValue) {
          used = computed.value;
        } else {
          used = computed;
        }
      }
      return used;
    };
    DefaultStyleValueRegistry2.prototype.postProcessProperty = function(name, object, attributes) {
      var metadata = propertyMetadataCache[name];
      if (metadata && metadata.syntax) {
        var handler = metadata.syntax && this.getPropertySyntax(metadata.syntax);
        var propertyHandler = handler;
        if (propertyHandler && propertyHandler.postProcessor) {
          propertyHandler.postProcessor(object, attributes);
        }
      }
    };
    DefaultStyleValueRegistry2.prototype.addUnresolveProperty = function(object, name) {
      var properties = unresolvedProperties.get(object);
      if (!properties) {
        unresolvedProperties.set(object, []);
        properties = unresolvedProperties.get(object);
      }
      if (properties.indexOf(name) === -1) {
        properties.push(name);
      }
    };
    DefaultStyleValueRegistry2.prototype.tryToResolveProperty = function(object, name, options) {
      if (options === void 0) {
        options = {};
      }
      var inherited = options.inherited;
      if (inherited) {
        if (object.parentElement && isPropertyResolved(object.parentElement, name)) {
          var usedValue = object.parentElement.parsedStyle[name];
          if (
            // usedValue instanceof CSSKeywordValue &&
            usedValue === "unset" || usedValue === "initial" || usedValue === "inherit"
          ) {
            return;
          }
          return usedValue;
        }
      }
      return;
    };
    DefaultStyleValueRegistry2.prototype.recalc = function(object) {
      var properties = unresolvedProperties.get(object);
      if (properties && properties.length) {
        var attributes_1 = {};
        properties.forEach(function(property) {
          attributes_1[property] = object.attributes[property];
        });
        this.processProperties(object, attributes_1);
        unresolvedProperties.delete(object);
      }
    };
    DefaultStyleValueRegistry2.prototype.updateGeometry = function(object) {
      var nodeName = object.nodeName;
      var geometryUpdater = this.runtime.geometryUpdaterFactory[nodeName];
      if (geometryUpdater) {
        var geometry_1 = object.geometry;
        if (!geometry_1.contentBounds) {
          geometry_1.contentBounds = new AABB();
        }
        if (!geometry_1.renderBounds) {
          geometry_1.renderBounds = new AABB();
        }
        var parsedStyle = object.parsedStyle;
        var _a = geometryUpdater.update(parsedStyle, object), _b = _a.cx, cx = _b === void 0 ? 0 : _b, _c = _a.cy, cy = _c === void 0 ? 0 : _c, _d = _a.cz, cz = _d === void 0 ? 0 : _d, _e = _a.hwidth, hwidth = _e === void 0 ? 0 : _e, _f = _a.hheight, hheight = _f === void 0 ? 0 : _f, _g = _a.hdepth, hdepth = _g === void 0 ? 0 : _g;
        var halfExtents = [
          Math.abs(hwidth),
          Math.abs(hheight),
          hdepth
        ];
        var _h = parsedStyle, stroke = _h.stroke, _j = _h.lineWidth, lineWidth = _j === void 0 ? 1 : _j, _k = _h.increasedLineWidthForHitTesting, increasedLineWidthForHitTesting = _k === void 0 ? 0 : _k, _l = _h.shadowType, shadowType = _l === void 0 ? "outer" : _l, shadowColor = _h.shadowColor, _m = _h.filter, filter2 = _m === void 0 ? [] : _m, transformOrigin = _h.transformOrigin;
        var center = [cx, cy, cz];
        geometry_1.contentBounds.update(center, halfExtents);
        var expansion = nodeName === Shape.POLYLINE || nodeName === Shape.POLYGON || nodeName === Shape.PATH ? Math.SQRT2 : 0.5;
        var hasStroke = stroke && !stroke.isNone;
        if (hasStroke) {
          var halfLineWidth = ((lineWidth || 0) + (increasedLineWidthForHitTesting || 0)) * expansion;
          halfExtents[0] += halfLineWidth;
          halfExtents[1] += halfLineWidth;
        }
        geometry_1.renderBounds.update(center, halfExtents);
        if (shadowColor && shadowType && shadowType !== "inner") {
          var _o = geometry_1.renderBounds, min4 = _o.min, max4 = _o.max;
          var _p = parsedStyle, shadowBlur = _p.shadowBlur, shadowOffsetX = _p.shadowOffsetX, shadowOffsetY = _p.shadowOffsetY;
          var shadowBlurInPixels = shadowBlur || 0;
          var shadowOffsetXInPixels = shadowOffsetX || 0;
          var shadowOffsetYInPixels = shadowOffsetY || 0;
          var shadowLeft = min4[0] - shadowBlurInPixels + shadowOffsetXInPixels;
          var shadowRight = max4[0] + shadowBlurInPixels + shadowOffsetXInPixels;
          var shadowTop = min4[1] - shadowBlurInPixels + shadowOffsetYInPixels;
          var shadowBottom = max4[1] + shadowBlurInPixels + shadowOffsetYInPixels;
          min4[0] = Math.min(min4[0], shadowLeft);
          max4[0] = Math.max(max4[0], shadowRight);
          min4[1] = Math.min(min4[1], shadowTop);
          max4[1] = Math.max(max4[1], shadowBottom);
          geometry_1.renderBounds.setMinMax(min4, max4);
        }
        filter2.forEach(function(_a2) {
          var name = _a2.name, params = _a2.params;
          if (name === "blur") {
            var blurRadius = params[0].value;
            geometry_1.renderBounds.update(geometry_1.renderBounds.center, addVec3(geometry_1.renderBounds.halfExtents, geometry_1.renderBounds.halfExtents, [blurRadius, blurRadius, 0]));
          } else if (name === "drop-shadow") {
            var shadowOffsetX2 = params[0].value;
            var shadowOffsetY2 = params[1].value;
            var shadowBlur2 = params[2].value;
            var _b2 = geometry_1.renderBounds, min5 = _b2.min, max5 = _b2.max;
            var shadowLeft2 = min5[0] - shadowBlur2 + shadowOffsetX2;
            var shadowRight2 = max5[0] + shadowBlur2 + shadowOffsetX2;
            var shadowTop2 = min5[1] - shadowBlur2 + shadowOffsetY2;
            var shadowBottom2 = max5[1] + shadowBlur2 + shadowOffsetY2;
            min5[0] = Math.min(min5[0], shadowLeft2);
            max5[0] = Math.max(max5[0], shadowRight2);
            min5[1] = Math.min(min5[1], shadowTop2);
            max5[1] = Math.max(max5[1], shadowBottom2);
            geometry_1.renderBounds.setMinMax(min5, max5);
          }
        });
        object.geometry.dirty = false;
        var flipY = hwidth < 0;
        var flipX = hheight < 0;
        var usedOriginXValue = (flipY ? -1 : 1) * (transformOrigin ? convertPercentUnit(transformOrigin[0], 0, object, true) : 0);
        var usedOriginYValue = (flipX ? -1 : 1) * (transformOrigin ? convertPercentUnit(transformOrigin[1], 1, object, true) : 0);
        if (usedOriginXValue || usedOriginYValue) {
          object.setOrigin(usedOriginXValue, usedOriginYValue);
        }
      }
    };
    DefaultStyleValueRegistry2.prototype.updateSizeAttenuation = function(node, zoom) {
      if (node.style.isSizeAttenuation) {
        if (!node.style.rawLineWidth) {
          node.style.rawLineWidth = node.style.lineWidth;
        }
        node.style.lineWidth = (node.style.rawLineWidth || 1) / zoom;
        if (node.nodeName === Shape.CIRCLE) {
          if (!node.style.rawR) {
            node.style.rawR = node.style.r;
          }
          node.style.r = (node.style.rawR || 1) / zoom;
        }
      } else {
        if (node.style.rawLineWidth) {
          node.style.lineWidth = node.style.rawLineWidth;
          delete node.style.rawLineWidth;
        }
        if (node.nodeName === Shape.CIRCLE) {
          if (node.style.rawR) {
            node.style.r = node.style.rawR;
            delete node.style.rawR;
          }
        }
      }
    };
    DefaultStyleValueRegistry2.prototype.isPropertyInheritable = function(name) {
      var metadata = propertyMetadataCache[name];
      if (!metadata) {
        return false;
      }
      return metadata.inh;
    };
    return DefaultStyleValueRegistry2;
  }()
);
var CSSPropertyAngle = (
  /** @class */
  function() {
    function CSSPropertyAngle2() {
      this.parser = parseAngle;
      this.parserUnmemoize = parseAngleUnmemoize;
      this.parserWithCSSDisabled = null;
      this.mixer = mergeNumbers;
    }
    CSSPropertyAngle2.prototype.calculator = function(name, oldParsed, parsed, object) {
      return convertAngleUnit(parsed);
    };
    return CSSPropertyAngle2;
  }()
);
var CSSPropertyClipPath = (
  /** @class */
  function() {
    function CSSPropertyClipPath2() {
    }
    CSSPropertyClipPath2.prototype.calculator = function(name, oldPath, newPath, object, runtime2) {
      if (newPath instanceof CSSKeywordValue) {
        newPath = null;
      }
      runtime2.sceneGraphService.updateDisplayObjectDependency(name, oldPath, newPath, object);
      if (name === "clipPath") {
        object.forEach(function(leaf) {
          if (leaf.childNodes.length === 0) {
            runtime2.sceneGraphService.dirtifyToRoot(leaf);
          }
        });
      }
      return newPath;
    };
    return CSSPropertyClipPath2;
  }()
);
var CSSPropertyColor = (
  /** @class */
  function() {
    function CSSPropertyColor2() {
      this.parser = parseColor;
      this.parserWithCSSDisabled = parseColor;
      this.mixer = mergeColors;
    }
    CSSPropertyColor2.prototype.calculator = function(name, oldParsed, parsed, object) {
      if (parsed instanceof CSSKeywordValue) {
        return parsed.value === "none" ? noneColor : transparentColor;
      }
      return parsed;
    };
    return CSSPropertyColor2;
  }()
);
var CSSPropertyFilter = (
  /** @class */
  function() {
    function CSSPropertyFilter2() {
      this.parser = parseFilter;
    }
    CSSPropertyFilter2.prototype.calculator = function(name, oldParsed, parsed) {
      if (parsed instanceof CSSKeywordValue) {
        return [];
      }
      return parsed;
    };
    return CSSPropertyFilter2;
  }()
);
function getFontSize(object) {
  var fontSize = object.parsedStyle.fontSize;
  return is_nil_default(fontSize) ? null : fontSize;
}
var CSSPropertyLengthOrPercentage = (
  /** @class */
  function() {
    function CSSPropertyLengthOrPercentage2() {
      this.parser = parseLengthOrPercentage;
      this.parserUnmemoize = parseLengthOrPercentageUnmemoize;
      this.parserWithCSSDisabled = null;
      this.mixer = mergeNumbers;
    }
    CSSPropertyLengthOrPercentage2.prototype.calculator = function(name, oldParsed, computed, object, runtime2) {
      var _a;
      if (is_number_default(computed)) {
        return computed;
      }
      if (CSSUnitValue.isRelativeUnit(computed.unit)) {
        var registry = runtime2.styleValueRegistry;
        if (computed.unit === UnitType.kPercentage) {
          return 0;
        } else if (computed.unit === UnitType.kEms) {
          if (object.parentNode) {
            var fontSize = getFontSize(object.parentNode);
            if (fontSize) {
              fontSize *= computed.value;
              return fontSize;
            } else {
              registry.addUnresolveProperty(object, name);
            }
          } else {
            registry.addUnresolveProperty(object, name);
          }
          return 0;
        } else if (computed.unit === UnitType.kRems) {
          if ((_a = object === null || object === void 0 ? void 0 : object.ownerDocument) === null || _a === void 0 ? void 0 : _a.documentElement) {
            var fontSize = getFontSize(object.ownerDocument.documentElement);
            if (fontSize) {
              fontSize *= computed.value;
              return fontSize;
            } else {
              registry.addUnresolveProperty(object, name);
            }
          } else {
            registry.addUnresolveProperty(object, name);
          }
          return 0;
        }
      } else {
        return computed.value;
      }
    };
    return CSSPropertyLengthOrPercentage2;
  }()
);
var CSSPropertyLengthOrPercentage12 = (
  /** @class */
  function() {
    function CSSPropertyLengthOrPercentage122() {
      this.mixer = mergeNumberLists;
    }
    CSSPropertyLengthOrPercentage122.prototype.parser = function(radius) {
      var parsed = parseDimensionArray(is_number_default(radius) ? [radius] : radius);
      var formatted;
      if (parsed.length === 1) {
        formatted = [parsed[0], parsed[0]];
      } else {
        formatted = [parsed[0], parsed[1]];
      }
      return formatted;
    };
    CSSPropertyLengthOrPercentage122.prototype.calculator = function(name, oldParsed, computed) {
      return computed.map(function(c) {
        return c.value;
      });
    };
    return CSSPropertyLengthOrPercentage122;
  }()
);
var CSSPropertyLengthOrPercentage14 = (
  /** @class */
  function() {
    function CSSPropertyLengthOrPercentage142() {
      this.mixer = mergeNumberLists;
    }
    CSSPropertyLengthOrPercentage142.prototype.parser = function(radius) {
      var parsed = parseDimensionArray(is_number_default(radius) ? [radius] : radius);
      var formatted;
      if (parsed.length === 1) {
        formatted = [parsed[0], parsed[0], parsed[0], parsed[0]];
      } else if (parsed.length === 2) {
        formatted = [parsed[0], parsed[1], parsed[0], parsed[1]];
      } else if (parsed.length === 3) {
        formatted = [parsed[0], parsed[1], parsed[2], parsed[1]];
      } else {
        formatted = [parsed[0], parsed[1], parsed[2], parsed[3]];
      }
      return formatted;
    };
    CSSPropertyLengthOrPercentage142.prototype.calculator = function(name, oldParsed, computed) {
      return computed.map(function(c) {
        return c.value;
      });
    };
    return CSSPropertyLengthOrPercentage142;
  }()
);
var CSSPropertyMarker = (
  /** @class */
  function() {
    function CSSPropertyMarker2() {
    }
    CSSPropertyMarker2.prototype.calculator = function(name, oldMarker, newMarker, object) {
      if (newMarker instanceof CSSKeywordValue) {
        newMarker = null;
      }
      var cloned = newMarker === null || newMarker === void 0 ? void 0 : newMarker.cloneNode(true);
      if (cloned) {
        cloned.style.isMarker = true;
      }
      return cloned;
    };
    return CSSPropertyMarker2;
  }()
);
var CSSPropertyNumber = (
  /** @class */
  function() {
    function CSSPropertyNumber2() {
      this.mixer = mergeNumbers;
      this.parser = parseNumber;
      this.parserUnmemoize = parseNumberUnmemoize;
      this.parserWithCSSDisabled = null;
    }
    CSSPropertyNumber2.prototype.calculator = function(name, oldParsed, computed) {
      return computed.value;
    };
    return CSSPropertyNumber2;
  }()
);
var CSSPropertyOffsetDistance = (
  /** @class */
  function() {
    function CSSPropertyOffsetDistance2() {
      this.parser = parseNumber;
      this.parserUnmemoize = parseNumberUnmemoize;
      this.parserWithCSSDisabled = null;
      this.mixer = clampedMergeNumbers(0, 1);
    }
    CSSPropertyOffsetDistance2.prototype.calculator = function(name, oldParsed, computed) {
      return computed.value;
    };
    CSSPropertyOffsetDistance2.prototype.postProcessor = function(object) {
      var _a = object.parsedStyle, offsetPath = _a.offsetPath, offsetDistance = _a.offsetDistance;
      if (!offsetPath) {
        return;
      }
      var nodeName = offsetPath.nodeName;
      if (nodeName === Shape.LINE || nodeName === Shape.PATH || nodeName === Shape.POLYLINE) {
        var point = offsetPath.getPoint(offsetDistance);
        if (point) {
          object.setLocalPosition(point.x, point.y);
        }
      }
    };
    return CSSPropertyOffsetDistance2;
  }()
);
var CSSPropertyOpacity = (
  /** @class */
  function() {
    function CSSPropertyOpacity2() {
      this.parser = parseNumber;
      this.parserUnmemoize = parseNumberUnmemoize;
      this.parserWithCSSDisabled = null;
      this.mixer = clampedMergeNumbers(0, 1);
    }
    CSSPropertyOpacity2.prototype.calculator = function(name, oldParsed, computed) {
      return computed.value;
    };
    return CSSPropertyOpacity2;
  }()
);
var CSSPropertyPath = (
  /** @class */
  function() {
    function CSSPropertyPath2() {
      this.parser = parsePath;
      this.parserWithCSSDisabled = parsePath;
      this.mixer = mergePaths;
    }
    CSSPropertyPath2.prototype.calculator = function(name, oldParsed, parsed) {
      if (parsed instanceof CSSKeywordValue && parsed.value === "unset") {
        return {
          absolutePath: [],
          hasArc: false,
          segments: [],
          polygons: [],
          polylines: [],
          curve: null,
          totalLength: 0,
          rect: new Rectangle(0, 0, 0, 0)
        };
      }
      return parsed;
    };
    return CSSPropertyPath2;
  }()
);
var CSSPropertyPoints = (
  /** @class */
  /* @__PURE__ */ function() {
    function CSSPropertyPoints2() {
      this.parser = parsePoints;
      this.mixer = mergePoints;
    }
    return CSSPropertyPoints2;
  }()
);
var CSSPropertyShadowBlur = (
  /** @class */
  function(_super) {
    __extends(CSSPropertyShadowBlur2, _super);
    function CSSPropertyShadowBlur2() {
      var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
      _this.mixer = clampedMergeNumbers(0, Infinity);
      return _this;
    }
    return CSSPropertyShadowBlur2;
  }(CSSPropertyLengthOrPercentage)
);
var CSSPropertyText = (
  /** @class */
  function() {
    function CSSPropertyText2() {
    }
    CSSPropertyText2.prototype.calculator = function(name, oldParsed, parsed, object) {
      if (parsed instanceof CSSKeywordValue) {
        if (parsed.value === "unset") {
          return "";
        } else {
          return parsed.value;
        }
      }
      return "".concat(parsed);
    };
    CSSPropertyText2.prototype.postProcessor = function(object) {
      object.nodeValue = "".concat(object.parsedStyle.text) || "";
    };
    return CSSPropertyText2;
  }()
);
var CSSPropertyTextTransform = (
  /** @class */
  function() {
    function CSSPropertyTextTransform2() {
    }
    CSSPropertyTextTransform2.prototype.calculator = function(name, oldParsed, parsed, object) {
      var rawText = object.getAttribute("text");
      if (rawText) {
        var transformedText = rawText;
        if (parsed.value === "capitalize") {
          transformedText = rawText.charAt(0).toUpperCase() + rawText.slice(1);
        } else if (parsed.value === "lowercase") {
          transformedText = rawText.toLowerCase();
        } else if (parsed.value === "uppercase") {
          transformedText = rawText.toUpperCase();
        }
        object.parsedStyle.text = transformedText;
      }
      return parsed.value;
    };
    return CSSPropertyTextTransform2;
  }()
);
var canvasMap = {};
var defaultCanvasIdCounter = 0;
function cleanExistedCanvas(container, canvas) {
  if (container) {
    var id2 = typeof container === "string" ? container : container.id || defaultCanvasIdCounter++;
    if (canvasMap[id2]) {
      canvasMap[id2].destroy();
    }
    canvasMap[id2] = canvas;
  }
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
function isElement2(target) {
  return !!target.getAttribute;
}
function sortedIndex(array, value) {
  var low = 0;
  var high = array.length;
  while (low < high) {
    var mid = low + high >>> 1;
    if (sortByZIndex(array[mid], value) < 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
function sortByZIndex(o1, o2) {
  var zIndex1 = Number(o1.parsedStyle.zIndex || 0);
  var zIndex2 = Number(o2.parsedStyle.zIndex || 0);
  if (zIndex1 === zIndex2) {
    var parent_1 = o1.parentNode;
    if (parent_1) {
      var children = parent_1.childNodes || [];
      return children.indexOf(o1) - children.indexOf(o2);
    }
  }
  return zIndex1 - zIndex2;
}
function findClosestClipPathTarget(object) {
  var _a;
  var el = object;
  do {
    var clipPath = (_a = el.parsedStyle) === null || _a === void 0 ? void 0 : _a.clipPath;
    if (clipPath)
      return el;
    el = el.parentElement;
  } while (el !== null);
  return null;
}
var PX_SUFFIX = "px";
function setDOMSize($el, width, height) {
  if (isBrowser && $el.style) {
    $el.style.width = width + PX_SUFFIX;
    $el.style.height = height + PX_SUFFIX;
  }
}
function getStyle($el, property) {
  if (isBrowser) {
    return document.defaultView.getComputedStyle($el, null).getPropertyValue(property);
  }
}
function getWidth($el) {
  var width = getStyle($el, "width");
  if (width === "auto") {
    return $el.offsetWidth;
  }
  return parseFloat(width);
}
function getHeight($el) {
  var height = getStyle($el, "height");
  if (height === "auto") {
    return $el.offsetHeight;
  }
  return parseFloat(height);
}
var MOUSE_POINTER_ID = 1;
var TOUCH_TO_POINTER = {
  touchstart: "pointerdown",
  touchend: "pointerup",
  touchendoutside: "pointerupoutside",
  touchmove: "pointermove",
  touchcancel: "pointercancel"
};
var clock = typeof performance === "object" && performance.now ? performance : Date;
function isFillOrStrokeAffected(pointerEvents, fill, stroke) {
  if (pointerEvents === void 0) {
    pointerEvents = "auto";
  }
  var hasFill = false;
  var hasStroke = false;
  var isFillOtherThanNone = !!fill && !fill.isNone;
  var isStrokeOtherThanNone = !!stroke && !stroke.isNone;
  if (pointerEvents === "visiblepainted" || pointerEvents === "painted" || pointerEvents === "auto") {
    hasFill = isFillOtherThanNone;
    hasStroke = isStrokeOtherThanNone;
  } else if (pointerEvents === "visiblefill" || pointerEvents === "fill") {
    hasFill = true;
  } else if (pointerEvents === "visiblestroke" || pointerEvents === "stroke") {
    hasStroke = true;
  } else if (pointerEvents === "visible" || pointerEvents === "all") {
    hasFill = true;
    hasStroke = true;
  }
  return [hasFill, hasStroke];
}
var uId = 1;
var uniqueId = function() {
  return uId++;
};
var root = typeof self === "object" && self.self == self ? self : (
  // @ts-ignore
  typeof global === "object" && global.global == global ? (
    // @ts-ignore
    global
  ) : {}
);
var nowOffset = Date.now();
var pnow = function() {
  if (root.performance && typeof root.performance.now === "function") {
    return root.performance.now();
  }
  return Date.now() - nowOffset;
};
var reservedCBs = {};
var lastTime = Date.now();
var polyfillRaf = function(callback) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  var currentTime = Date.now();
  var gap = currentTime - lastTime;
  var delay = gap > 16 ? 0 : 16 - gap;
  var id2 = uniqueId();
  reservedCBs[id2] = callback;
  if (Object.keys(reservedCBs).length > 1)
    return id2;
  setTimeout(function() {
    lastTime = currentTime;
    var copied = reservedCBs;
    reservedCBs = {};
    Object.keys(copied).forEach(function(key) {
      return copied[key](pnow());
    });
  }, delay);
  return id2;
};
var polyfillCaf = function(id2) {
  delete reservedCBs[id2];
};
var vendorPrefixes = ["", "webkit", "moz", "ms", "o"];
var getRequestAnimationFrame = function(vp2) {
  if (typeof vp2 !== "string")
    return polyfillRaf;
  if (vp2 === "")
    return root["requestAnimationFrame"];
  return root[vp2 + "RequestAnimationFrame"];
};
var getCancelAnimationFrame = function(vp2) {
  if (typeof vp2 !== "string")
    return polyfillCaf;
  if (vp2 === "")
    return root["cancelAnimationFrame"];
  return root[vp2 + "CancelAnimationFrame"] || root[vp2 + "CancelRequestAnimationFrame"];
};
var find = function(arr, predicate) {
  var i = 0;
  while (arr[i] !== void 0) {
    if (predicate(arr[i]))
      return arr[i];
    i = i + 1;
  }
};
var vp = find(vendorPrefixes, function(vp2) {
  return !!getRequestAnimationFrame(vp2);
});
var raf = getRequestAnimationFrame(vp);
var caf = getCancelAnimationFrame(vp);
root.requestAnimationFrame = raf;
root.cancelAnimationFrame = caf;
var AsyncParallelHook = (
  /** @class */
  function() {
    function AsyncParallelHook2() {
      this.callbacks = [];
    }
    AsyncParallelHook2.prototype.getCallbacksNum = function() {
      return this.callbacks.length;
    };
    AsyncParallelHook2.prototype.tapPromise = function(options, fn) {
      this.callbacks.push(fn);
    };
    AsyncParallelHook2.prototype.promise = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return Promise.all(this.callbacks.map(function(callback) {
        return callback.apply(void 0, __spreadArray([], __read(args), false));
      }));
    };
    return AsyncParallelHook2;
  }()
);
var AsyncSeriesWaterfallHook = (
  /** @class */
  function() {
    function AsyncSeriesWaterfallHook2() {
      this.callbacks = [];
    }
    AsyncSeriesWaterfallHook2.prototype.tapPromise = function(options, fn) {
      this.callbacks.push(fn);
    };
    AsyncSeriesWaterfallHook2.prototype.promise = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return __awaiter(this, void 0, void 0, function() {
        var result, i, callback;
        var _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              if (!this.callbacks.length) return [3, 6];
              return [4, (_a = this.callbacks)[0].apply(_a, __spreadArray([], __read(args), false))];
            case 1:
              result = _b.sent();
              i = 0;
              _b.label = 2;
            case 2:
              if (!(i < this.callbacks.length - 1)) return [3, 5];
              callback = this.callbacks[i];
              return [4, callback(result)];
            case 3:
              result = _b.sent();
              _b.label = 4;
            case 4:
              i++;
              return [3, 2];
            case 5:
              return [2, result];
            case 6:
              return [2, null];
          }
        });
      });
    };
    return AsyncSeriesWaterfallHook2;
  }()
);
var SyncHook = (
  /** @class */
  function() {
    function SyncHook2() {
      this.callbacks = [];
    }
    SyncHook2.prototype.tap = function(options, fn) {
      this.callbacks.push(fn);
    };
    SyncHook2.prototype.call = function() {
      var argsArr = arguments;
      this.callbacks.forEach(function(callback) {
        callback.apply(void 0, argsArr);
      });
    };
    return SyncHook2;
  }()
);
var SyncWaterfallHook = (
  /** @class */
  function() {
    function SyncWaterfallHook2() {
      this.callbacks = [];
    }
    SyncWaterfallHook2.prototype.tap = function(options, fn) {
      this.callbacks.push(fn);
    };
    SyncWaterfallHook2.prototype.call = function() {
      if (this.callbacks.length) {
        var argsArr = arguments;
        var result = this.callbacks[0].apply(void 0, argsArr);
        for (var i = 0; i < this.callbacks.length - 1; i++) {
          var callback = this.callbacks[i];
          result = callback(result);
        }
        return result;
      }
      return null;
    };
    return SyncWaterfallHook2;
  }()
);
var genericFontFamilies = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
];
var stringRegExp = /([\"\'])[^\'\"]+\1/;
function toFontString(attributes) {
  var _a = attributes.fontSize, fontSize = _a === void 0 ? 16 : _a, _b = attributes.fontFamily, fontFamily = _b === void 0 ? "sans-serif" : _b, _c = attributes.fontStyle, fontStyle = _c === void 0 ? "normal" : _c, _d = attributes.fontVariant, fontVariant = _d === void 0 ? "normal" : _d, _e = attributes.fontWeight, fontWeight = _e === void 0 ? "normal" : _e;
  var fontSizeString = is_number_default(fontSize) && "".concat(fontSize, "px") || "16px";
  var fontFamilies = fontFamily.split(",");
  for (var i = fontFamilies.length - 1; i >= 0; i--) {
    var fontFamily_1 = fontFamilies[i].trim();
    if (!stringRegExp.test(fontFamily_1) && genericFontFamilies.indexOf(fontFamily_1) < 0) {
      fontFamily_1 = '"'.concat(fontFamily_1, '"');
    }
    fontFamilies[i] = fontFamily_1;
  }
  return "".concat(fontStyle, " ").concat(fontVariant, " ").concat(fontWeight, " ").concat(fontSizeString, " ").concat(fontFamilies.join(","));
}
function createSkewMatrix(skewMatrix, skewX, skewY) {
  mat4_exports.identity(skewMatrix);
  skewMatrix[4] = Math.tan(skewX);
  skewMatrix[1] = Math.tan(skewY);
  return skewMatrix;
}
var SCALE_EPSILON = 1e-5;
var tmpMat1 = mat4_exports.create();
var tmpMat2 = mat4_exports.create();
function parsedTransformToMat4(transform2, object) {
  if (transform2.length) {
    var m_1 = mat4_exports.identity(tmpMat1);
    transform2.forEach(function(parsed) {
      var t = parsed.t, d = parsed.d;
      if (t === "scale") {
        var newScale = (d === null || d === void 0 ? void 0 : d.map(function(s) {
          return Math.max(s.value, SCALE_EPSILON);
        })) || [
          1,
          1
        ];
        mat4_exports.fromScaling(tmpMat2, [newScale[0], newScale[1], 1]);
      } else if (t === "scalex") {
        var newScale = (d === null || d === void 0 ? void 0 : d.map(function(s) {
          return Math.max(s.value, SCALE_EPSILON);
        })) || [1];
        mat4_exports.fromScaling(tmpMat2, [newScale[0], 1, 1]);
      } else if (t === "scaley") {
        var newScale = (d === null || d === void 0 ? void 0 : d.map(function(s) {
          return Math.max(s.value, SCALE_EPSILON);
        })) || [1];
        mat4_exports.fromScaling(tmpMat2, [1, newScale[0], 1]);
      } else if (t === "scalez") {
        var newScale = (d === null || d === void 0 ? void 0 : d.map(function(s) {
          return Math.max(s.value, SCALE_EPSILON);
        })) || [1];
        mat4_exports.fromScaling(tmpMat2, [1, 1, newScale[0]]);
      } else if (t === "scale3d") {
        var newScale = (d === null || d === void 0 ? void 0 : d.map(function(s) {
          return Math.max(s.value, SCALE_EPSILON);
        })) || [
          1,
          1,
          1
        ];
        mat4_exports.fromScaling(tmpMat2, [newScale[0], newScale[1], newScale[2]]);
      } else if (t === "translate") {
        var newTranslation = d || [Opx, Opx];
        mat4_exports.fromTranslation(tmpMat2, [
          newTranslation[0].value,
          newTranslation[1].value,
          0
        ]);
      } else if (t === "translatex") {
        var newTranslation = d || [Opx];
        mat4_exports.fromTranslation(tmpMat2, [newTranslation[0].value, 0, 0]);
      } else if (t === "translatey") {
        var newTranslation = d || [Opx];
        mat4_exports.fromTranslation(tmpMat2, [0, newTranslation[0].value, 0]);
      } else if (t === "translatez") {
        var newTranslation = d || [Opx];
        mat4_exports.fromTranslation(tmpMat2, [0, 0, newTranslation[0].value]);
      } else if (t === "translate3d") {
        var newTranslation = d || [Opx, Opx, Opx];
        mat4_exports.fromTranslation(tmpMat2, [
          newTranslation[0].value,
          newTranslation[1].value,
          newTranslation[2].value
        ]);
      } else if (t === "rotate") {
        var newAngles = d || [Odeg];
        mat4_exports.fromZRotation(tmpMat2, deg2rad(convertAngleUnit(newAngles[0])));
      } else if (t === "rotatex") {
        var newAngles = d || [Odeg];
        mat4_exports.fromXRotation(tmpMat2, deg2rad(convertAngleUnit(newAngles[0])));
      } else if (t === "rotatey") {
        var newAngles = d || [Odeg];
        mat4_exports.fromYRotation(tmpMat2, deg2rad(convertAngleUnit(newAngles[0])));
      } else if (t === "rotatez") {
        var newAngles = d || [Odeg];
        mat4_exports.fromZRotation(tmpMat2, deg2rad(convertAngleUnit(newAngles[0])));
      } else if (t === "rotate3d") {
        var newAngles = d || [Opx, Opx, Opx, Odeg];
        mat4_exports.fromRotation(tmpMat2, deg2rad(convertAngleUnit(newAngles[3])), [
          newAngles[0].value,
          newAngles[1].value,
          newAngles[2].value
        ]);
      } else if (t === "skew") {
        var newSkew = (d === null || d === void 0 ? void 0 : d.map(function(s) {
          return s.value;
        })) || [0, 0];
        createSkewMatrix(tmpMat2, deg2rad(newSkew[0]), deg2rad(newSkew[1]));
      } else if (t === "skewx") {
        var newSkew = (d === null || d === void 0 ? void 0 : d.map(function(s) {
          return s.value;
        })) || [0];
        createSkewMatrix(tmpMat2, deg2rad(newSkew[0]), 0);
      } else if (t === "skewy") {
        var newSkew = (d === null || d === void 0 ? void 0 : d.map(function(s) {
          return s.value;
        })) || [0];
        createSkewMatrix(tmpMat2, 0, deg2rad(newSkew[0]));
      } else if (t === "matrix") {
        var _a = __read(d.map(function(s) {
          return s.value;
        }), 6), a = _a[0], b = _a[1], c = _a[2], dd = _a[3], tx = _a[4], ty = _a[5];
        mat4_exports.set(tmpMat2, a, b, 0, 0, c, dd, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1);
      } else if (t === "matrix3d") {
        mat4_exports.set.apply(mat4_exports, __spreadArray([tmpMat2], __read(d.map(function(s) {
          return s.value;
        })), false));
      }
      mat4_exports.mul(m_1, m_1, tmpMat2);
    });
    object.setLocalTransform(m_1);
  } else {
    object.resetLocalTransform();
  }
  return object.getLocalTransform();
}
var CSSPropertyTransform = (
  /** @class */
  function() {
    function CSSPropertyTransform2() {
      this.parser = parseTransform;
      this.parserUnmemoize = parseTransformUnmemoize;
      this.parserWithCSSDisabled = parseTransformUnmemoize;
      this.mixer = mergeTransforms;
    }
    CSSPropertyTransform2.prototype.calculator = function(name, oldParsed, parsed, object) {
      if (parsed instanceof CSSKeywordValue) {
        return [];
      }
      return parsed;
    };
    CSSPropertyTransform2.prototype.postProcessor = function(object) {
      var transform2 = object.parsedStyle.transform;
      parsedTransformToMat4(transform2, object);
    };
    return CSSPropertyTransform2;
  }()
);
var CSSPropertyTransformOrigin = (
  /** @class */
  function() {
    function CSSPropertyTransformOrigin2() {
      this.parser = parseTransformOrigin;
      this.parserUnmemoize = parseTransformOriginUnmemoize;
    }
    CSSPropertyTransformOrigin2.prototype.postProcessor = function(object) {
      var transformOrigin = object.parsedStyle.transformOrigin;
      if (transformOrigin[0].unit === UnitType.kPixels && transformOrigin[1].unit === UnitType.kPixels) {
        object.setOrigin(transformOrigin[0].value, transformOrigin[1].value);
      } else {
        object.getGeometryBounds();
      }
    };
    return CSSPropertyTransformOrigin2;
  }()
);
var CSSPropertyZIndex = (
  /** @class */
  function() {
    function CSSPropertyZIndex2() {
      this.parser = parseNumber;
      this.parserUnmemoize = parseNumberUnmemoize;
    }
    CSSPropertyZIndex2.prototype.calculator = function(name, oldParsed, computed, object) {
      return computed.value;
    };
    CSSPropertyZIndex2.prototype.postProcessor = function(object) {
      if (object.parentNode) {
        var parentEntity = object.parentNode;
        var parentRenderable = parentEntity.renderable;
        var parentSortable = parentEntity.sortable;
        if (parentRenderable) {
          parentRenderable.dirty = true;
        }
        if (parentSortable) {
          parentSortable.dirty = true;
          parentSortable.dirtyReason = SortReason.Z_INDEX_CHANGED;
        }
      }
    };
    return CSSPropertyZIndex2;
  }()
);
var CircleUpdater = (
  /** @class */
  function() {
    function CircleUpdater2() {
    }
    CircleUpdater2.prototype.update = function(parsedStyle, object) {
      var _a = parsedStyle.cx, cx = _a === void 0 ? 0 : _a, _b = parsedStyle.cy, cy = _b === void 0 ? 0 : _b, _c = parsedStyle.r, r = _c === void 0 ? 0 : _c;
      return {
        cx,
        cy,
        hwidth: r,
        hheight: r
      };
    };
    return CircleUpdater2;
  }()
);
var EllipseUpdater = (
  /** @class */
  function() {
    function EllipseUpdater2() {
    }
    EllipseUpdater2.prototype.update = function(parsedStyle, object) {
      var _a = parsedStyle.cx, cx = _a === void 0 ? 0 : _a, _b = parsedStyle.cy, cy = _b === void 0 ? 0 : _b, _c = parsedStyle.rx, rx = _c === void 0 ? 0 : _c, _d = parsedStyle.ry, ry = _d === void 0 ? 0 : _d;
      return {
        cx,
        cy,
        hwidth: rx,
        hheight: ry
      };
    };
    return EllipseUpdater2;
  }()
);
var LineUpdater = (
  /** @class */
  function() {
    function LineUpdater2() {
    }
    LineUpdater2.prototype.update = function(parsedStyle) {
      var x1 = parsedStyle.x1, y1 = parsedStyle.y1, x2 = parsedStyle.x2, y2 = parsedStyle.y2;
      var minX = Math.min(x1, x2);
      var maxX = Math.max(x1, x2);
      var minY = Math.min(y1, y2);
      var maxY = Math.max(y1, y2);
      var width = maxX - minX;
      var height = maxY - minY;
      var hwidth = width / 2;
      var hheight = height / 2;
      return {
        cx: minX + hwidth,
        cy: minY + hheight,
        hwidth,
        hheight
      };
    };
    return LineUpdater2;
  }()
);
var PathUpdater = (
  /** @class */
  function() {
    function PathUpdater2() {
    }
    PathUpdater2.prototype.update = function(parsedStyle) {
      var d = parsedStyle.d;
      var _a = d.rect, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
      var hwidth = width / 2;
      var hheight = height / 2;
      return {
        cx: x + hwidth,
        cy: y + hheight,
        hwidth,
        hheight
      };
    };
    return PathUpdater2;
  }()
);
var PolylineUpdater = (
  /** @class */
  function() {
    function PolylineUpdater2() {
    }
    PolylineUpdater2.prototype.update = function(parsedStyle) {
      if (parsedStyle.points && is_array_default(parsedStyle.points.points)) {
        var points = parsedStyle.points.points;
        var minX = Math.min.apply(Math, __spreadArray([], __read(points.map(function(point) {
          return point[0];
        })), false));
        var maxX = Math.max.apply(Math, __spreadArray([], __read(points.map(function(point) {
          return point[0];
        })), false));
        var minY = Math.min.apply(Math, __spreadArray([], __read(points.map(function(point) {
          return point[1];
        })), false));
        var maxY = Math.max.apply(Math, __spreadArray([], __read(points.map(function(point) {
          return point[1];
        })), false));
        var width = maxX - minX;
        var height = maxY - minY;
        var hwidth = width / 2;
        var hheight = height / 2;
        return {
          cx: minX + hwidth,
          cy: minY + hheight,
          hwidth,
          hheight
        };
      }
      return {
        cx: 0,
        cy: 0,
        hwidth: 0,
        hheight: 0
      };
    };
    return PolylineUpdater2;
  }()
);
var RectUpdater = (
  /** @class */
  function() {
    function RectUpdater2() {
    }
    RectUpdater2.prototype.update = function(parsedStyle, object) {
      var _a = parsedStyle.x, x = _a === void 0 ? 0 : _a, _b = parsedStyle.y, y = _b === void 0 ? 0 : _b, src = parsedStyle.src, _c = parsedStyle.width, width = _c === void 0 ? 0 : _c, _d = parsedStyle.height, height = _d === void 0 ? 0 : _d;
      var contentWidth = width;
      var contentHeight = height;
      if (src && !is_string_default(src)) {
        if (!contentWidth) {
          contentWidth = src.width;
          parsedStyle.width = contentWidth;
        }
        if (!contentHeight) {
          contentHeight = src.height;
          parsedStyle.height = contentHeight;
        }
      }
      return {
        cx: x + contentWidth / 2,
        cy: y + contentHeight / 2,
        hwidth: contentWidth / 2,
        hheight: contentHeight / 2
      };
    };
    return RectUpdater2;
  }()
);
var TextUpdater = (
  /** @class */
  function() {
    function TextUpdater2(globalRuntime) {
      this.globalRuntime = globalRuntime;
    }
    TextUpdater2.prototype.isReadyToMeasure = function(parsedStyle, object) {
      var text = parsedStyle.text, textAlign = parsedStyle.textAlign, textBaseline = parsedStyle.textBaseline, fontSize = parsedStyle.fontSize, fontStyle = parsedStyle.fontStyle, fontWeight = parsedStyle.fontWeight, fontVariant = parsedStyle.fontVariant, lineWidth = parsedStyle.lineWidth;
      return runtime.enableCSSParsing ? text && fontSize && fontStyle && fontWeight && fontVariant && textAlign && textBaseline && !is_nil_default(lineWidth) : text;
    };
    TextUpdater2.prototype.update = function(parsedStyle, object) {
      var _a, _b;
      var text = parsedStyle.text, _c = parsedStyle.textAlign, textAlign = _c === void 0 ? "start" : _c, _d = parsedStyle.lineWidth, lineWidth = _d === void 0 ? 1 : _d, _e = parsedStyle.textBaseline, textBaseline = _e === void 0 ? "alphabetic" : _e, _f = parsedStyle.dx, dx = _f === void 0 ? 0 : _f, _g = parsedStyle.dy, dy = _g === void 0 ? 0 : _g, _h = parsedStyle.x, x = _h === void 0 ? 0 : _h, _j = parsedStyle.y, y = _j === void 0 ? 0 : _j;
      if (!this.isReadyToMeasure(parsedStyle, object)) {
        parsedStyle.metrics = {
          font: "",
          width: 0,
          height: 0,
          lines: [],
          lineWidths: [],
          lineHeight: 0,
          maxLineWidth: 0,
          fontProperties: {
            ascent: 0,
            descent: 0,
            fontSize: 0
          },
          lineMetrics: []
        };
        return {
          hwidth: 0,
          hheight: 0,
          cx: 0,
          cy: 0
        };
      }
      var offscreenCanvas = (((_b = (_a = object === null || object === void 0 ? void 0 : object.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) === null || _b === void 0 ? void 0 : _b.getConfig()) || {}).offscreenCanvas;
      var metrics = this.globalRuntime.textService.measureText(text, parsedStyle, offscreenCanvas);
      parsedStyle.metrics = metrics;
      var width = metrics.width, height = metrics.height, lineHeight = metrics.lineHeight, fontProperties = metrics.fontProperties;
      var hwidth = width / 2;
      var hheight = height / 2;
      var lineXOffset = x + hwidth;
      if (textAlign === "center" || textAlign === "middle") {
        lineXOffset += lineWidth / 2 - hwidth;
      } else if (textAlign === "right" || textAlign === "end") {
        lineXOffset += lineWidth - hwidth * 2;
      }
      var lineYOffset = y - hheight;
      if (textBaseline === "middle") {
        lineYOffset += hheight;
      } else if (textBaseline === "top" || textBaseline === "hanging") {
        lineYOffset += hheight * 2;
      } else if (textBaseline === "alphabetic") {
        lineYOffset += this.globalRuntime.enableCSSParsing ? lineHeight - fontProperties.ascent : 0;
      } else if (textBaseline === "bottom" || textBaseline === "ideographic") {
        lineYOffset += 0;
      }
      if (dx) {
        lineXOffset += dx;
      }
      if (dy) {
        lineYOffset += dy;
      }
      return {
        cx: lineXOffset,
        cy: lineYOffset,
        hwidth,
        hheight
      };
    };
    return TextUpdater2;
  }()
);
var GroupUpdater = (
  /** @class */
  function() {
    function GroupUpdater2() {
    }
    GroupUpdater2.prototype.update = function(parsedStyle, object) {
      return {
        cx: 0,
        cy: 0,
        hwidth: 0,
        hheight: 0
      };
    };
    return GroupUpdater2;
  }()
);
var HTMLUpdater = (
  /** @class */
  function() {
    function HTMLUpdater2() {
    }
    HTMLUpdater2.prototype.update = function(parsedStyle, object) {
      var _a = parsedStyle.x, x = _a === void 0 ? 0 : _a, _b = parsedStyle.y, y = _b === void 0 ? 0 : _b, _c = parsedStyle.width, width = _c === void 0 ? 0 : _c, _d = parsedStyle.height, height = _d === void 0 ? 0 : _d;
      return {
        cx: x + width / 2,
        cy: y + height / 2,
        hwidth: width / 2,
        hheight: height / 2
      };
    };
    return HTMLUpdater2;
  }()
);
function isFederatedEvent(value) {
  return !!value.type;
}
var FederatedEvent = (
  /** @class */
  function() {
    function FederatedEvent2(manager) {
      this.eventPhase = FederatedEvent2.prototype.NONE;
      this.bubbles = true;
      this.cancelBubble = true;
      this.cancelable = false;
      this.defaultPrevented = false;
      this.propagationStopped = false;
      this.propagationImmediatelyStopped = false;
      this.layer = new Point();
      this.page = new Point();
      this.canvas = new Point();
      this.viewport = new Point();
      this.composed = false;
      this.NONE = 0;
      this.CAPTURING_PHASE = 1;
      this.AT_TARGET = 2;
      this.BUBBLING_PHASE = 3;
      this.manager = manager;
    }
    Object.defineProperty(FederatedEvent2.prototype, "name", {
      /**
       * @deprecated
       */
      get: function() {
        return this.type;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedEvent2.prototype, "layerX", {
      get: function() {
        return this.layer.x;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedEvent2.prototype, "layerY", {
      get: function() {
        return this.layer.y;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedEvent2.prototype, "pageX", {
      get: function() {
        return this.page.x;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedEvent2.prototype, "pageY", {
      get: function() {
        return this.page.y;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedEvent2.prototype, "x", {
      get: function() {
        return this.canvas.x;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedEvent2.prototype, "y", {
      get: function() {
        return this.canvas.y;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedEvent2.prototype, "canvasX", {
      get: function() {
        return this.canvas.x;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedEvent2.prototype, "canvasY", {
      get: function() {
        return this.canvas.y;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedEvent2.prototype, "viewportX", {
      get: function() {
        return this.viewport.x;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedEvent2.prototype, "viewportY", {
      get: function() {
        return this.viewport.y;
      },
      enumerable: false,
      configurable: true
    });
    FederatedEvent2.prototype.composedPath = function() {
      if (this.manager && (!this.path || this.path[0] !== this.target)) {
        this.path = this.target ? this.manager.propagationPath(this.target) : [];
      }
      return this.path;
    };
    Object.defineProperty(FederatedEvent2.prototype, "propagationPath", {
      /**
       * @deprecated
       */
      get: function() {
        return this.composedPath();
      },
      enumerable: false,
      configurable: true
    });
    FederatedEvent2.prototype.preventDefault = function() {
      if (this.nativeEvent instanceof Event && this.nativeEvent.cancelable) {
        this.nativeEvent.preventDefault();
      }
      this.defaultPrevented = true;
    };
    FederatedEvent2.prototype.stopImmediatePropagation = function() {
      this.propagationImmediatelyStopped = true;
    };
    FederatedEvent2.prototype.stopPropagation = function() {
      this.propagationStopped = true;
    };
    FederatedEvent2.prototype.initEvent = function() {
    };
    FederatedEvent2.prototype.initUIEvent = function() {
    };
    FederatedEvent2.prototype.clone = function() {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    return FederatedEvent2;
  }()
);
var FederatedMouseEvent = (
  /** @class */
  function(_super) {
    __extends(FederatedMouseEvent2, _super);
    function FederatedMouseEvent2() {
      var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
      _this.client = new Point();
      _this.movement = new Point();
      _this.offset = new Point();
      _this.global = new Point();
      _this.screen = new Point();
      return _this;
    }
    Object.defineProperty(FederatedMouseEvent2.prototype, "clientX", {
      get: function() {
        return this.client.x;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedMouseEvent2.prototype, "clientY", {
      get: function() {
        return this.client.y;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedMouseEvent2.prototype, "movementX", {
      get: function() {
        return this.movement.x;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedMouseEvent2.prototype, "movementY", {
      get: function() {
        return this.movement.y;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedMouseEvent2.prototype, "offsetX", {
      get: function() {
        return this.offset.x;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedMouseEvent2.prototype, "offsetY", {
      get: function() {
        return this.offset.y;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedMouseEvent2.prototype, "globalX", {
      get: function() {
        return this.global.x;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedMouseEvent2.prototype, "globalY", {
      get: function() {
        return this.global.y;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedMouseEvent2.prototype, "screenX", {
      get: function() {
        return this.screen.x;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(FederatedMouseEvent2.prototype, "screenY", {
      get: function() {
        return this.screen.y;
      },
      enumerable: false,
      configurable: true
    });
    FederatedMouseEvent2.prototype.getModifierState = function(key) {
      return "getModifierState" in this.nativeEvent && this.nativeEvent.getModifierState(key);
    };
    FederatedMouseEvent2.prototype.initMouseEvent = function() {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    return FederatedMouseEvent2;
  }(FederatedEvent)
);
var FederatedPointerEvent = (
  /** @class */
  function(_super) {
    __extends(FederatedPointerEvent2, _super);
    function FederatedPointerEvent2() {
      var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
      _this.width = 0;
      _this.height = 0;
      _this.isPrimary = false;
      return _this;
    }
    FederatedPointerEvent2.prototype.getCoalescedEvents = function() {
      if (this.type === "pointermove" || this.type === "mousemove" || this.type === "touchmove") {
        return [this];
      }
      return [];
    };
    FederatedPointerEvent2.prototype.getPredictedEvents = function() {
      throw new Error("getPredictedEvents is not supported!");
    };
    FederatedPointerEvent2.prototype.clone = function() {
      return this.manager.clonePointerEvent(this);
    };
    return FederatedPointerEvent2;
  }(FederatedMouseEvent)
);
var FederatedWheelEvent = (
  /** @class */
  function(_super) {
    __extends(FederatedWheelEvent2, _super);
    function FederatedWheelEvent2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    FederatedWheelEvent2.prototype.clone = function() {
      return this.manager.cloneWheelEvent(this);
    };
    return FederatedWheelEvent2;
  }(FederatedMouseEvent)
);
var CustomEvent = (
  /** @class */
  function(_super) {
    __extends(CustomEvent2, _super);
    function CustomEvent2(eventName, object) {
      var _this = _super.call(this, null) || this;
      _this.type = eventName;
      _this.detail = object;
      Object.assign(_this, object);
      return _this;
    }
    return CustomEvent2;
  }(FederatedEvent)
);
var DELEGATION_SPLITTER = ":";
var EventTarget = (
  /** @class */
  function() {
    function EventTarget2() {
      this.emitter = new eventemitter3_default();
    }
    EventTarget2.prototype.on = function(type, listener, options) {
      this.addEventListener(type, listener, options);
      return this;
    };
    EventTarget2.prototype.addEventListener = function(type, listener, options) {
      var capture = is_boolean_default(options) && options || is_object_default(options) && options.capture;
      var once = is_object_default(options) && options.once;
      var context = isFunction(listener) ? void 0 : listener;
      var useDelegatedName = false;
      var delegatedName = "";
      if (type.indexOf(DELEGATION_SPLITTER) > -1) {
        var _a = __read(type.split(DELEGATION_SPLITTER), 2), name_1 = _a[0], eventType = _a[1];
        type = eventType;
        delegatedName = name_1;
        useDelegatedName = true;
      }
      type = capture ? "".concat(type, "capture") : type;
      listener = isFunction(listener) ? listener : listener.handleEvent;
      if (useDelegatedName) {
        var originListener_1 = listener;
        listener = function() {
          var _a2;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          if (((_a2 = args[0].target) === null || _a2 === void 0 ? void 0 : _a2.name) !== delegatedName) {
            return;
          }
          originListener_1.apply(void 0, __spreadArray([], __read(args), false));
        };
      }
      if (once) {
        this.emitter.once(type, listener, context);
      } else {
        this.emitter.on(type, listener, context);
      }
      return this;
    };
    EventTarget2.prototype.off = function(type, listener, options) {
      if (type) {
        this.removeEventListener(type, listener, options);
      } else {
        this.removeAllEventListeners();
      }
      return this;
    };
    EventTarget2.prototype.removeAllEventListeners = function() {
      this.emitter.removeAllListeners();
    };
    EventTarget2.prototype.removeEventListener = function(type, listener, options) {
      var capture = is_boolean_default(options) && options || is_object_default(options) && options.capture;
      var context = isFunction(listener) ? void 0 : listener;
      type = capture ? "".concat(type, "capture") : type;
      listener = isFunction(listener) ? listener : listener === null || listener === void 0 ? void 0 : listener.handleEvent;
      this.emitter.off(type, listener, context);
      return this;
    };
    EventTarget2.prototype.emit = function(eventName, object) {
      this.dispatchEvent(new CustomEvent(eventName, object));
    };
    EventTarget2.prototype.dispatchEvent = function(e, skipPropagate) {
      var _a, _b;
      if (skipPropagate === void 0) {
        skipPropagate = false;
      }
      if (!isFederatedEvent(e)) {
        throw new Error("DisplayObject cannot propagate events outside of the Federated Events API");
      }
      var canvas;
      if (this.document) {
        canvas = this;
      } else if (this.defaultView) {
        canvas = this.defaultView;
      } else {
        canvas = (_a = this.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView;
      }
      if (canvas) {
        e.manager = canvas.getEventService() || null;
        if (!e.manager) {
          return false;
        }
        e.defaultPrevented = false;
        e.path = [];
        if (!skipPropagate) {
          e.target = this;
        }
        (_b = e.manager) === null || _b === void 0 ? void 0 : _b.dispatchEvent(e, e.type, skipPropagate);
      }
      return !e.defaultPrevented;
    };
    return EventTarget2;
  }()
);
var Node = (
  /** @class */
  function(_super) {
    __extends(Node2, _super);
    function Node2() {
      var _this = _super.call(this) || this;
      _this.shadow = false;
      _this.ownerDocument = null;
      _this.isConnected = false;
      _this.baseURI = "";
      _this.childNodes = [];
      _this.nodeType = 0;
      _this.nodeName = "";
      _this.nodeValue = null;
      _this.parentNode = null;
      return _this;
    }
    Node2.isNode = function(target) {
      return !!target.childNodes;
    };
    Object.defineProperty(Node2.prototype, "textContent", {
      /**
       * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent
       */
      get: function() {
        var e_1, _a;
        var out = "";
        if (this.nodeName === Shape.TEXT) {
          out += this.style.text;
        }
        try {
          for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
            var child = _c.value;
            if (child.nodeName === Shape.TEXT) {
              out += child.nodeValue;
            } else {
              out += child.textContent;
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        return out;
      },
      set: function(content) {
        var _this = this;
        this.childNodes.slice().forEach(function(child) {
          _this.removeChild(child);
        });
        if (this.nodeName === Shape.TEXT) {
          this.style.text = "".concat(content);
        }
      },
      enumerable: false,
      configurable: true
    });
    Node2.prototype.getRootNode = function(opts) {
      if (opts === void 0) {
        opts = {};
      }
      if (this.parentNode) {
        return this.parentNode.getRootNode(opts);
      }
      if (opts.composed && this.host) {
        return this.host.getRootNode(opts);
      }
      return this;
    };
    Node2.prototype.hasChildNodes = function() {
      return this.childNodes.length > 0;
    };
    Node2.prototype.isDefaultNamespace = function(namespace) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Node2.prototype.lookupNamespaceURI = function(prefix) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Node2.prototype.lookupPrefix = function(namespace) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Node2.prototype.normalize = function() {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Node2.prototype.isEqualNode = function(otherNode) {
      return this === otherNode;
    };
    Node2.prototype.isSameNode = function(otherNode) {
      return this.isEqualNode(otherNode);
    };
    Object.defineProperty(Node2.prototype, "parent", {
      /**
       * @deprecated
       * @alias parentNode
       */
      get: function() {
        return this.parentNode;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Node2.prototype, "parentElement", {
      get: function() {
        return null;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Node2.prototype, "nextSibling", {
      get: function() {
        return null;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Node2.prototype, "previousSibling", {
      get: function() {
        return null;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Node2.prototype, "firstChild", {
      get: function() {
        return this.childNodes.length > 0 ? this.childNodes[0] : null;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Node2.prototype, "lastChild", {
      get: function() {
        return this.childNodes.length > 0 ? this.childNodes[this.childNodes.length - 1] : null;
      },
      enumerable: false,
      configurable: true
    });
    Node2.prototype.compareDocumentPosition = function(other) {
      var _a;
      if (other === this) {
        return 0;
      }
      var node1Root = other;
      var node2Root = this;
      var node1Hierarchy = [node1Root];
      var node2Hierarchy = [node2Root];
      while ((_a = node1Root.parentNode) !== null && _a !== void 0 ? _a : node2Root.parentNode) {
        node1Root = node1Root.parentNode ? (node1Hierarchy.push(node1Root.parentNode), node1Root.parentNode) : node1Root;
        node2Root = node2Root.parentNode ? (node2Hierarchy.push(node2Root.parentNode), node2Root.parentNode) : node2Root;
      }
      if (node1Root !== node2Root) {
        return Node2.DOCUMENT_POSITION_DISCONNECTED | Node2.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | Node2.DOCUMENT_POSITION_PRECEDING;
      }
      var longerHierarchy = node1Hierarchy.length > node2Hierarchy.length ? node1Hierarchy : node2Hierarchy;
      var shorterHierarchy = longerHierarchy === node1Hierarchy ? node2Hierarchy : node1Hierarchy;
      if (longerHierarchy[longerHierarchy.length - shorterHierarchy.length] === shorterHierarchy[0]) {
        return longerHierarchy === node1Hierarchy ? (
          // other is a child of this
          Node2.DOCUMENT_POSITION_CONTAINED_BY | Node2.DOCUMENT_POSITION_FOLLOWING
        ) : (
          // this is a child of other
          Node2.DOCUMENT_POSITION_CONTAINS | Node2.DOCUMENT_POSITION_PRECEDING
        );
      }
      var longerStart = longerHierarchy.length - shorterHierarchy.length;
      for (var i = shorterHierarchy.length - 1; i >= 0; i--) {
        var shorterHierarchyNode = shorterHierarchy[i];
        var longerHierarchyNode = longerHierarchy[longerStart + i];
        if (longerHierarchyNode !== shorterHierarchyNode) {
          var siblings = shorterHierarchyNode.parentNode.childNodes;
          if (siblings.indexOf(shorterHierarchyNode) < siblings.indexOf(longerHierarchyNode)) {
            if (shorterHierarchy === node1Hierarchy) {
              return Node2.DOCUMENT_POSITION_PRECEDING;
            } else {
              return Node2.DOCUMENT_POSITION_FOLLOWING;
            }
          } else {
            if (longerHierarchy === node1Hierarchy) {
              return Node2.DOCUMENT_POSITION_PRECEDING;
            } else {
              return Node2.DOCUMENT_POSITION_FOLLOWING;
            }
          }
        }
      }
      return Node2.DOCUMENT_POSITION_FOLLOWING;
    };
    Node2.prototype.contain = function(other) {
      return this.contains(other);
    };
    Node2.prototype.contains = function(other) {
      var tmp2 = other;
      while (tmp2 && this !== tmp2) {
        tmp2 = tmp2.parentNode;
      }
      return !!tmp2;
    };
    Node2.prototype.getAncestor = function(n) {
      var temp = this;
      while (n > 0 && temp) {
        temp = temp.parentNode;
        n--;
      }
      return temp;
    };
    Node2.prototype.forEach = function(callback, assigned) {
      if (assigned === void 0) {
        assigned = false;
      }
      if (!callback(this)) {
        (assigned ? this.childNodes.slice() : this.childNodes).forEach(function(child) {
          child.forEach(callback);
        });
      }
    };
    Node2.DOCUMENT_POSITION_DISCONNECTED = 1;
    Node2.DOCUMENT_POSITION_PRECEDING = 2;
    Node2.DOCUMENT_POSITION_FOLLOWING = 4;
    Node2.DOCUMENT_POSITION_CONTAINS = 8;
    Node2.DOCUMENT_POSITION_CONTAINED_BY = 16;
    Node2.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
    return Node2;
  }(EventTarget)
);
var PROPAGATION_LIMIT = 2048;
var EventService = (
  /** @class */
  function() {
    function EventService2(globalRuntime, context) {
      var _this = this;
      this.globalRuntime = globalRuntime;
      this.context = context;
      this.emitter = new eventemitter3_default();
      this.nativeHTMLMap = /* @__PURE__ */ new WeakMap();
      this.cursor = "default";
      this.mappingTable = {};
      this.mappingState = {
        trackingData: {}
      };
      this.eventPool = /* @__PURE__ */ new Map();
      this.tmpMatrix = mat4_exports.create();
      this.tmpVec3 = vec3_exports.create();
      this.onPointerDown = function(from) {
        var e = _this.createPointerEvent(from);
        _this.dispatchEvent(e, "pointerdown");
        if (e.pointerType === "touch") {
          _this.dispatchEvent(e, "touchstart");
        } else if (e.pointerType === "mouse" || e.pointerType === "pen") {
          var isRightButton = e.button === 2;
          _this.dispatchEvent(e, isRightButton ? "rightdown" : "mousedown");
        }
        var trackingData = _this.trackingData(from.pointerId);
        trackingData.pressTargetsByButton[from.button] = e.composedPath();
        _this.freeEvent(e);
      };
      this.onPointerUp = function(from) {
        var _a;
        var now = clock.now();
        var e = _this.createPointerEvent(from, void 0, void 0, _this.context.config.alwaysTriggerPointerEventOnCanvas ? _this.rootTarget : void 0);
        _this.dispatchEvent(e, "pointerup");
        if (e.pointerType === "touch") {
          _this.dispatchEvent(e, "touchend");
        } else if (e.pointerType === "mouse" || e.pointerType === "pen") {
          var isRightButton = e.button === 2;
          _this.dispatchEvent(e, isRightButton ? "rightup" : "mouseup");
        }
        var trackingData = _this.trackingData(from.pointerId);
        var pressTarget = _this.findMountedTarget(trackingData.pressTargetsByButton[from.button]);
        var clickTarget = pressTarget;
        if (pressTarget && !e.composedPath().includes(pressTarget)) {
          var currentTarget = pressTarget;
          while (currentTarget && !e.composedPath().includes(currentTarget)) {
            e.currentTarget = currentTarget;
            _this.notifyTarget(e, "pointerupoutside");
            if (e.pointerType === "touch") {
              _this.notifyTarget(e, "touchendoutside");
            } else if (e.pointerType === "mouse" || e.pointerType === "pen") {
              var isRightButton = e.button === 2;
              _this.notifyTarget(e, isRightButton ? "rightupoutside" : "mouseupoutside");
            }
            if (Node.isNode(currentTarget)) {
              currentTarget = currentTarget.parentNode;
            }
          }
          delete trackingData.pressTargetsByButton[from.button];
          clickTarget = currentTarget;
        }
        if (clickTarget) {
          var clickEvent = _this.clonePointerEvent(e, "click");
          clickEvent.target = clickTarget;
          clickEvent.path = [];
          if (!trackingData.clicksByButton[from.button]) {
            trackingData.clicksByButton[from.button] = {
              clickCount: 0,
              target: clickEvent.target,
              timeStamp: now
            };
          }
          var canvas = _this.context.renderingContext.root.ownerDocument.defaultView;
          var clickHistory = trackingData.clicksByButton[from.button];
          if (clickHistory.target === clickEvent.target && now - clickHistory.timeStamp < canvas.dblClickSpeed) {
            ++clickHistory.clickCount;
          } else {
            clickHistory.clickCount = 1;
          }
          clickHistory.target = clickEvent.target;
          clickHistory.timeStamp = now;
          clickEvent.detail = clickHistory.clickCount;
          if (!((_a = e.detail) === null || _a === void 0 ? void 0 : _a.preventClick)) {
            if (!_this.context.config.useNativeClickEvent && (clickEvent.pointerType === "mouse" || clickEvent.pointerType === "touch")) {
              _this.dispatchEvent(clickEvent, "click");
            }
            _this.dispatchEvent(clickEvent, "pointertap");
          }
          _this.freeEvent(clickEvent);
        }
        _this.freeEvent(e);
      };
      this.onPointerMove = function(from) {
        var e = _this.createPointerEvent(from, void 0, void 0, _this.context.config.alwaysTriggerPointerEventOnCanvas ? _this.rootTarget : void 0);
        var isMouse = e.pointerType === "mouse" || e.pointerType === "pen";
        var trackingData = _this.trackingData(from.pointerId);
        var outTarget = _this.findMountedTarget(trackingData.overTargets);
        if (trackingData.overTargets && outTarget !== e.target) {
          var outType = from.type === "mousemove" ? "mouseout" : "pointerout";
          var outEvent = _this.createPointerEvent(from, outType, outTarget || void 0);
          _this.dispatchEvent(outEvent, "pointerout");
          if (isMouse)
            _this.dispatchEvent(outEvent, "mouseout");
          if (!e.composedPath().includes(outTarget)) {
            var leaveEvent = _this.createPointerEvent(from, "pointerleave", outTarget || void 0);
            leaveEvent.eventPhase = leaveEvent.AT_TARGET;
            while (leaveEvent.target && !e.composedPath().includes(leaveEvent.target)) {
              leaveEvent.currentTarget = leaveEvent.target;
              _this.notifyTarget(leaveEvent);
              if (isMouse) {
                _this.notifyTarget(leaveEvent, "mouseleave");
              }
              if (Node.isNode(leaveEvent.target)) {
                leaveEvent.target = leaveEvent.target.parentNode;
              }
            }
            _this.freeEvent(leaveEvent);
          }
          _this.freeEvent(outEvent);
        }
        if (outTarget !== e.target) {
          var overType = from.type === "mousemove" ? "mouseover" : "pointerover";
          var overEvent = _this.clonePointerEvent(e, overType);
          _this.dispatchEvent(overEvent, "pointerover");
          if (isMouse)
            _this.dispatchEvent(overEvent, "mouseover");
          var overTargetAncestor = outTarget && Node.isNode(outTarget) && outTarget.parentNode;
          while (overTargetAncestor && overTargetAncestor !== (Node.isNode(_this.rootTarget) && _this.rootTarget.parentNode)) {
            if (overTargetAncestor === e.target)
              break;
            overTargetAncestor = overTargetAncestor.parentNode;
          }
          var didPointerEnter = !overTargetAncestor || overTargetAncestor === (Node.isNode(_this.rootTarget) && _this.rootTarget.parentNode);
          if (didPointerEnter) {
            var enterEvent = _this.clonePointerEvent(e, "pointerenter");
            enterEvent.eventPhase = enterEvent.AT_TARGET;
            while (enterEvent.target && enterEvent.target !== outTarget && enterEvent.target !== (Node.isNode(_this.rootTarget) && _this.rootTarget.parentNode)) {
              enterEvent.currentTarget = enterEvent.target;
              _this.notifyTarget(enterEvent);
              if (isMouse)
                _this.notifyTarget(enterEvent, "mouseenter");
              if (Node.isNode(enterEvent.target)) {
                enterEvent.target = enterEvent.target.parentNode;
              }
            }
            _this.freeEvent(enterEvent);
          }
          _this.freeEvent(overEvent);
        }
        _this.dispatchEvent(e, "pointermove");
        if (e.pointerType === "touch")
          _this.dispatchEvent(e, "touchmove");
        if (isMouse) {
          _this.dispatchEvent(e, "mousemove");
          _this.cursor = _this.getCursor(e.target);
        }
        trackingData.overTargets = e.composedPath();
        _this.freeEvent(e);
      };
      this.onPointerOut = function(from) {
        var trackingData = _this.trackingData(from.pointerId);
        if (trackingData.overTargets) {
          var isMouse = from.pointerType === "mouse" || from.pointerType === "pen";
          var outTarget = _this.findMountedTarget(trackingData.overTargets);
          var outEvent = _this.createPointerEvent(from, "pointerout", outTarget || void 0);
          _this.dispatchEvent(outEvent);
          if (isMouse)
            _this.dispatchEvent(outEvent, "mouseout");
          var leaveEvent = _this.createPointerEvent(from, "pointerleave", outTarget || void 0);
          leaveEvent.eventPhase = leaveEvent.AT_TARGET;
          while (leaveEvent.target && leaveEvent.target !== (Node.isNode(_this.rootTarget) && _this.rootTarget.parentNode)) {
            leaveEvent.currentTarget = leaveEvent.target;
            _this.notifyTarget(leaveEvent);
            if (isMouse) {
              _this.notifyTarget(leaveEvent, "mouseleave");
            }
            if (Node.isNode(leaveEvent.target)) {
              leaveEvent.target = leaveEvent.target.parentNode;
            }
          }
          trackingData.overTargets = null;
          _this.freeEvent(outEvent);
          _this.freeEvent(leaveEvent);
        }
        _this.cursor = null;
      };
      this.onPointerOver = function(from) {
        var trackingData = _this.trackingData(from.pointerId);
        var e = _this.createPointerEvent(from);
        var isMouse = e.pointerType === "mouse" || e.pointerType === "pen";
        _this.dispatchEvent(e, "pointerover");
        if (isMouse)
          _this.dispatchEvent(e, "mouseover");
        if (e.pointerType === "mouse")
          _this.cursor = _this.getCursor(e.target);
        var enterEvent = _this.clonePointerEvent(e, "pointerenter");
        enterEvent.eventPhase = enterEvent.AT_TARGET;
        while (enterEvent.target && enterEvent.target !== (Node.isNode(_this.rootTarget) && _this.rootTarget.parentNode)) {
          enterEvent.currentTarget = enterEvent.target;
          _this.notifyTarget(enterEvent);
          if (isMouse) {
            _this.notifyTarget(enterEvent, "mouseenter");
          }
          if (Node.isNode(enterEvent.target)) {
            enterEvent.target = enterEvent.target.parentNode;
          }
        }
        trackingData.overTargets = e.composedPath();
        _this.freeEvent(e);
        _this.freeEvent(enterEvent);
      };
      this.onPointerUpOutside = function(from) {
        var trackingData = _this.trackingData(from.pointerId);
        var pressTarget = _this.findMountedTarget(trackingData.pressTargetsByButton[from.button]);
        var e = _this.createPointerEvent(from);
        if (pressTarget) {
          var currentTarget = pressTarget;
          while (currentTarget) {
            e.currentTarget = currentTarget;
            _this.notifyTarget(e, "pointerupoutside");
            if (e.pointerType === "touch") ;
            else if (e.pointerType === "mouse" || e.pointerType === "pen") {
              _this.notifyTarget(e, e.button === 2 ? "rightupoutside" : "mouseupoutside");
            }
            if (Node.isNode(currentTarget)) {
              currentTarget = currentTarget.parentNode;
            }
          }
          delete trackingData.pressTargetsByButton[from.button];
        }
        _this.freeEvent(e);
      };
      this.onWheel = function(from) {
        var wheelEvent = _this.createWheelEvent(from);
        _this.dispatchEvent(wheelEvent);
        _this.freeEvent(wheelEvent);
      };
      this.onClick = function(from) {
        if (_this.context.config.useNativeClickEvent) {
          var e = _this.createPointerEvent(from);
          _this.dispatchEvent(e);
          _this.freeEvent(e);
        }
      };
      this.onPointerCancel = function(from) {
        var e = _this.createPointerEvent(from, void 0, void 0, _this.context.config.alwaysTriggerPointerEventOnCanvas ? _this.rootTarget : void 0);
        _this.dispatchEvent(e);
        _this.freeEvent(e);
      };
    }
    EventService2.prototype.init = function() {
      this.rootTarget = this.context.renderingContext.root.parentNode;
      this.addEventMapping("pointerdown", this.onPointerDown);
      this.addEventMapping("pointerup", this.onPointerUp);
      this.addEventMapping("pointermove", this.onPointerMove);
      this.addEventMapping("pointerout", this.onPointerOut);
      this.addEventMapping("pointerleave", this.onPointerOut);
      this.addEventMapping("pointercancel", this.onPointerCancel);
      this.addEventMapping("pointerover", this.onPointerOver);
      this.addEventMapping("pointerupoutside", this.onPointerUpOutside);
      this.addEventMapping("wheel", this.onWheel);
      this.addEventMapping("click", this.onClick);
    };
    EventService2.prototype.destroy = function() {
      this.emitter.removeAllListeners();
      this.mappingTable = {};
      this.mappingState = {};
      this.eventPool.clear();
    };
    EventService2.prototype.getScale = function() {
      var bbox = this.context.contextService.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1;
      var $el = this.context.contextService.getDomElement();
      if ($el && bbox) {
        var offsetWidth = $el.offsetWidth, offsetHeight = $el.offsetHeight;
        if (offsetWidth && offsetHeight) {
          scaleX = bbox.width / offsetWidth;
          scaleY = bbox.height / offsetHeight;
        }
      }
      return {
        scaleX,
        scaleY,
        bbox
      };
    };
    EventService2.prototype.client2Viewport = function(client) {
      var _a = this.getScale(), scaleX = _a.scaleX, scaleY = _a.scaleY, bbox = _a.bbox;
      return new Point((client.x - ((bbox === null || bbox === void 0 ? void 0 : bbox.left) || 0)) / scaleX, (client.y - ((bbox === null || bbox === void 0 ? void 0 : bbox.top) || 0)) / scaleY);
    };
    EventService2.prototype.viewport2Client = function(canvas) {
      var _a = this.getScale(), scaleX = _a.scaleX, scaleY = _a.scaleY, bbox = _a.bbox;
      return new Point((canvas.x + ((bbox === null || bbox === void 0 ? void 0 : bbox.left) || 0)) * scaleX, (canvas.y + ((bbox === null || bbox === void 0 ? void 0 : bbox.top) || 0)) * scaleY);
    };
    EventService2.prototype.viewport2Canvas = function(_a) {
      var x = _a.x, y = _a.y;
      var canvas = this.rootTarget.defaultView;
      var camera = canvas.getCamera();
      var _b = this.context.config, width = _b.width, height = _b.height;
      var projectionMatrixInverse = camera.getPerspectiveInverse();
      var worldMatrix = camera.getWorldTransform();
      var vpMatrix = mat4_exports.multiply(this.tmpMatrix, worldMatrix, projectionMatrixInverse);
      var viewport = vec3_exports.set(this.tmpVec3, x / width * 2 - 1, (1 - y / height) * 2 - 1, 0);
      vec3_exports.transformMat4(viewport, viewport, vpMatrix);
      return new Point(viewport[0], viewport[1]);
    };
    EventService2.prototype.canvas2Viewport = function(canvasP) {
      var canvas = this.rootTarget.defaultView;
      var camera = canvas.getCamera();
      var projectionMatrix = camera.getPerspective();
      var viewMatrix = camera.getViewTransform();
      var vpMatrix = mat4_exports.multiply(this.tmpMatrix, projectionMatrix, viewMatrix);
      var clip = vec3_exports.set(this.tmpVec3, canvasP.x, canvasP.y, 0);
      vec3_exports.transformMat4(this.tmpVec3, this.tmpVec3, vpMatrix);
      var _a = this.context.config, width = _a.width, height = _a.height;
      return new Point((clip[0] + 1) / 2 * width, (1 - (clip[1] + 1) / 2) * height);
    };
    EventService2.prototype.setPickHandler = function(pickHandler) {
      this.pickHandler = pickHandler;
    };
    EventService2.prototype.addEventMapping = function(type, fn) {
      if (!this.mappingTable[type]) {
        this.mappingTable[type] = [];
      }
      this.mappingTable[type].push({
        fn,
        priority: 0
      });
      this.mappingTable[type].sort(function(a, b) {
        return a.priority - b.priority;
      });
    };
    EventService2.prototype.mapEvent = function(e) {
      if (!this.rootTarget) {
        return;
      }
      var mappers = this.mappingTable[e.type];
      if (mappers) {
        for (var i = 0, j = mappers.length; i < j; i++) {
          mappers[i].fn(e);
        }
      } else {
        console.warn("[EventService]: Event mapping not defined for ".concat(e.type));
      }
    };
    EventService2.prototype.dispatchEvent = function(e, type, skipPropagate) {
      if (!skipPropagate) {
        e.propagationStopped = false;
        e.propagationImmediatelyStopped = false;
        this.propagate(e, type);
      } else {
        e.eventPhase = e.AT_TARGET;
        var canvas = this.rootTarget.defaultView || null;
        e.currentTarget = canvas;
        this.notifyListeners(e, type);
      }
      this.emitter.emit(type || e.type, e);
    };
    EventService2.prototype.propagate = function(e, type) {
      if (!e.target) {
        return;
      }
      var composedPath = e.composedPath();
      e.eventPhase = e.CAPTURING_PHASE;
      for (var i = composedPath.length - 1; i >= 1; i--) {
        e.currentTarget = composedPath[i];
        this.notifyTarget(e, type);
        if (e.propagationStopped || e.propagationImmediatelyStopped)
          return;
      }
      e.eventPhase = e.AT_TARGET;
      e.currentTarget = e.target;
      this.notifyTarget(e, type);
      if (e.propagationStopped || e.propagationImmediatelyStopped)
        return;
      var index = composedPath.indexOf(e.currentTarget);
      e.eventPhase = e.BUBBLING_PHASE;
      for (var i = index + 1; i < composedPath.length; i++) {
        e.currentTarget = composedPath[i];
        this.notifyTarget(e, type);
        if (e.propagationStopped || e.propagationImmediatelyStopped)
          return;
      }
    };
    EventService2.prototype.propagationPath = function(target) {
      var propagationPath = [target];
      var canvas = this.rootTarget.defaultView || null;
      if (canvas && canvas === target) {
        propagationPath.unshift(canvas.document);
        return propagationPath;
      }
      for (var i = 0; i < PROPAGATION_LIMIT && target !== this.rootTarget; i++) {
        if (Node.isNode(target) && target.parentNode) {
          propagationPath.push(target.parentNode);
          target = target.parentNode;
        }
      }
      if (canvas) {
        propagationPath.push(canvas);
      }
      return propagationPath;
    };
    EventService2.prototype.hitTest = function(position) {
      var viewportX = position.viewportX, viewportY = position.viewportY;
      var _a = this.context.config, width = _a.width, height = _a.height, disableHitTesting = _a.disableHitTesting;
      if (viewportX < 0 || viewportY < 0 || viewportX > width || viewportY > height) {
        return null;
      }
      return !disableHitTesting && this.pickHandler(position) || this.rootTarget || // return Document
      null;
    };
    EventService2.prototype.isNativeEventFromCanvas = function($el, nativeEvent) {
      var target = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.target;
      if (target === null || target === void 0 ? void 0 : target.shadowRoot) {
        target = nativeEvent.composedPath()[0];
      }
      if (target) {
        if (target === $el) {
          return true;
        }
        if ($el && $el.contains) {
          return $el.contains(target);
        }
      }
      if (nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.composedPath) {
        return nativeEvent.composedPath().indexOf($el) > -1;
      }
      return false;
    };
    EventService2.prototype.getExistedHTML = function(event) {
      var e_1, _a;
      if (event.nativeEvent.composedPath) {
        try {
          for (var _b = __values(event.nativeEvent.composedPath()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var eventTarget = _c.value;
            var existed = this.nativeHTMLMap.get(eventTarget);
            if (existed) {
              return existed;
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }
      return null;
    };
    EventService2.prototype.pickTarget = function(event) {
      return this.hitTest({
        clientX: event.clientX,
        clientY: event.clientY,
        viewportX: event.viewportX,
        viewportY: event.viewportY,
        x: event.canvasX,
        y: event.canvasY
      });
    };
    EventService2.prototype.createPointerEvent = function(from, type, target, fallbackTarget) {
      var event = this.allocateEvent(FederatedPointerEvent);
      this.copyPointerData(from, event);
      this.copyMouseData(from, event);
      this.copyData(from, event);
      event.nativeEvent = from.nativeEvent;
      event.originalEvent = from;
      var existedHTML = this.getExistedHTML(event);
      var $el = this.context.contextService.getDomElement();
      event.target = target !== null && target !== void 0 ? target : existedHTML || this.isNativeEventFromCanvas($el, event.nativeEvent) && this.pickTarget(event) || fallbackTarget;
      if (typeof type === "string") {
        event.type = type;
      }
      return event;
    };
    EventService2.prototype.createWheelEvent = function(from) {
      var event = this.allocateEvent(FederatedWheelEvent);
      this.copyWheelData(from, event);
      this.copyMouseData(from, event);
      this.copyData(from, event);
      event.nativeEvent = from.nativeEvent;
      event.originalEvent = from;
      var existedHTML = this.getExistedHTML(event);
      var $el = this.context.contextService.getDomElement();
      event.target = existedHTML || this.isNativeEventFromCanvas($el, event.nativeEvent) && this.pickTarget(event);
      return event;
    };
    EventService2.prototype.trackingData = function(id2) {
      if (!this.mappingState.trackingData[id2]) {
        this.mappingState.trackingData[id2] = {
          pressTargetsByButton: {},
          clicksByButton: {},
          overTarget: null
        };
      }
      return this.mappingState.trackingData[id2];
    };
    EventService2.prototype.cloneWheelEvent = function(from) {
      var event = this.allocateEvent(FederatedWheelEvent);
      event.nativeEvent = from.nativeEvent;
      event.originalEvent = from.originalEvent;
      this.copyWheelData(from, event);
      this.copyMouseData(from, event);
      this.copyData(from, event);
      event.target = from.target;
      event.path = from.composedPath().slice();
      event.type = from.type;
      return event;
    };
    EventService2.prototype.clonePointerEvent = function(from, type) {
      var event = this.allocateEvent(FederatedPointerEvent);
      event.nativeEvent = from.nativeEvent;
      event.originalEvent = from.originalEvent;
      this.copyPointerData(from, event);
      this.copyMouseData(from, event);
      this.copyData(from, event);
      event.target = from.target;
      event.path = from.composedPath().slice();
      event.type = type !== null && type !== void 0 ? type : event.type;
      return event;
    };
    EventService2.prototype.copyPointerData = function(from, to) {
      to.pointerId = from.pointerId;
      to.width = from.width;
      to.height = from.height;
      to.isPrimary = from.isPrimary;
      to.pointerType = from.pointerType;
      to.pressure = from.pressure;
      to.tangentialPressure = from.tangentialPressure;
      to.tiltX = from.tiltX;
      to.tiltY = from.tiltY;
      to.twist = from.twist;
    };
    EventService2.prototype.copyMouseData = function(from, to) {
      to.altKey = from.altKey;
      to.button = from.button;
      to.buttons = from.buttons;
      to.ctrlKey = from.ctrlKey;
      to.metaKey = from.metaKey;
      to.shiftKey = from.shiftKey;
      to.client.copyFrom(from.client);
      to.movement.copyFrom(from.movement);
      to.canvas.copyFrom(from.canvas);
      to.screen.copyFrom(from.screen);
      to.global.copyFrom(from.global);
      to.offset.copyFrom(from.offset);
    };
    EventService2.prototype.copyWheelData = function(from, to) {
      to.deltaMode = from.deltaMode;
      to.deltaX = from.deltaX;
      to.deltaY = from.deltaY;
      to.deltaZ = from.deltaZ;
    };
    EventService2.prototype.copyData = function(from, to) {
      to.isTrusted = from.isTrusted;
      to.timeStamp = clock.now();
      to.type = from.type;
      to.detail = from.detail;
      to.view = from.view;
      to.page.copyFrom(from.page);
      to.viewport.copyFrom(from.viewport);
    };
    EventService2.prototype.allocateEvent = function(constructor) {
      if (!this.eventPool.has(constructor)) {
        this.eventPool.set(constructor, []);
      }
      var event = this.eventPool.get(constructor).pop() || new constructor(this);
      event.eventPhase = event.NONE;
      event.currentTarget = null;
      event.path = [];
      event.target = null;
      return event;
    };
    EventService2.prototype.freeEvent = function(event) {
      if (event.manager !== this)
        throw new Error("It is illegal to free an event not managed by this EventBoundary!");
      var constructor = event.constructor;
      if (!this.eventPool.has(constructor)) {
        this.eventPool.set(constructor, []);
      }
      this.eventPool.get(constructor).push(event);
    };
    EventService2.prototype.notifyTarget = function(e, type) {
      type = type !== null && type !== void 0 ? type : e.type;
      var key = e.eventPhase === e.CAPTURING_PHASE || e.eventPhase === e.AT_TARGET ? "".concat(type, "capture") : type;
      this.notifyListeners(e, key);
      if (e.eventPhase === e.AT_TARGET) {
        this.notifyListeners(e, type);
      }
    };
    EventService2.prototype.notifyListeners = function(e, type) {
      var emitter = e.currentTarget.emitter;
      var listeners = emitter._events[type];
      if (!listeners)
        return;
      if ("fn" in listeners) {
        if (listeners.once) {
          emitter.removeListener(type, listeners.fn, void 0, true);
        }
        listeners.fn.call(e.currentTarget || listeners.context, e);
      } else {
        for (var i = 0; i < listeners.length && !e.propagationImmediatelyStopped; i++) {
          if (listeners[i].once) {
            emitter.removeListener(type, listeners[i].fn, void 0, true);
          }
          listeners[i].fn.call(e.currentTarget || listeners[i].context, e);
        }
      }
    };
    EventService2.prototype.findMountedTarget = function(propagationPath) {
      if (!propagationPath) {
        return null;
      }
      var currentTarget = propagationPath[propagationPath.length - 1];
      for (var i = propagationPath.length - 2; i >= 0; i--) {
        var target = propagationPath[i];
        if (target === this.rootTarget || Node.isNode(target) && target.parentNode === currentTarget) {
          currentTarget = propagationPath[i];
        } else {
          break;
        }
      }
      return currentTarget;
    };
    EventService2.prototype.getCursor = function(target) {
      var tmp2 = target;
      while (tmp2) {
        var cursor = isElement2(tmp2) && tmp2.getAttribute("cursor");
        if (cursor) {
          return cursor;
        }
        tmp2 = Node.isNode(tmp2) && tmp2.parentNode;
      }
    };
    return EventService2;
  }()
);
var OffscreenCanvasCreator = (
  /** @class */
  function() {
    function OffscreenCanvasCreator2() {
    }
    OffscreenCanvasCreator2.prototype.getOrCreateCanvas = function(offscreenCanvas, contextAttributes) {
      if (this.canvas) {
        return this.canvas;
      }
      if (offscreenCanvas || runtime.offscreenCanvas) {
        this.canvas = offscreenCanvas || runtime.offscreenCanvas;
        this.context = this.canvas.getContext("2d", __assign({ willReadFrequently: true }, contextAttributes));
      } else {
        try {
          this.canvas = new window.OffscreenCanvas(0, 0);
          this.context = this.canvas.getContext("2d", __assign({ willReadFrequently: true }, contextAttributes));
          if (!this.context || !this.context.measureText) {
            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext("2d");
          }
        } catch (ex) {
          this.canvas = document.createElement("canvas");
          this.context = this.canvas.getContext("2d", __assign({ willReadFrequently: true }, contextAttributes));
        }
      }
      this.canvas.width = 10;
      this.canvas.height = 10;
      return this.canvas;
    };
    OffscreenCanvasCreator2.prototype.getOrCreateContext = function(offscreenCanvas, contextAttributes) {
      if (this.context) {
        return this.context;
      }
      this.getOrCreateCanvas(offscreenCanvas, contextAttributes);
      return this.context;
    };
    return OffscreenCanvasCreator2;
  }()
);
var RenderReason;
(function(RenderReason2) {
  RenderReason2[RenderReason2["CAMERA_CHANGED"] = 0] = "CAMERA_CHANGED";
  RenderReason2[RenderReason2["DISPLAY_OBJECT_CHANGED"] = 1] = "DISPLAY_OBJECT_CHANGED";
  RenderReason2[RenderReason2["NONE"] = 2] = "NONE";
})(RenderReason || (RenderReason = {}));
var RenderingService = (
  /** @class */
  function() {
    function RenderingService2(globalRuntime, context) {
      this.globalRuntime = globalRuntime;
      this.context = context;
      this.inited = false;
      this.stats = {
        /**
         * total display objects in scenegraph
         */
        total: 0,
        /**
         * number of display objects need to render in current frame
         */
        rendered: 0
      };
      this.zIndexCounter = 0;
      this.hooks = {
        /**
         * called before any frame rendered
         */
        init: new SyncHook(),
        initAsync: new AsyncParallelHook(),
        /**
         * only dirty object which has sth changed will be rendered
         */
        dirtycheck: new SyncWaterfallHook(),
        /**
         * do culling
         */
        cull: new SyncWaterfallHook(),
        /**
         * called at beginning of each frame, won't get called if nothing to re-render
         */
        beginFrame: new SyncHook(),
        /**
         * called before every dirty object get rendered
         */
        beforeRender: new SyncHook(),
        /**
         * called when every dirty object rendering even it's culled
         */
        render: new SyncHook(),
        /**
         * called after every dirty object get rendered
         */
        afterRender: new SyncHook(),
        endFrame: new SyncHook(),
        destroy: new SyncHook(),
        /**
         * use async but faster method such as GPU-based picking in `g-plugin-device-renderer`
         */
        pick: new AsyncSeriesWaterfallHook(),
        /**
         * Unsafe but sync version of pick.
         */
        pickSync: new SyncWaterfallHook(),
        /**
         * used in event system
         */
        pointerDown: new SyncHook(),
        pointerUp: new SyncHook(),
        pointerMove: new SyncHook(),
        pointerOut: new SyncHook(),
        pointerOver: new SyncHook(),
        pointerWheel: new SyncHook(),
        pointerCancel: new SyncHook(),
        click: new SyncHook()
      };
    }
    RenderingService2.prototype.init = function(callback) {
      var _this = this;
      var context = __assign(__assign({}, this.globalRuntime), this.context);
      this.context.renderingPlugins.forEach(function(plugin) {
        plugin.apply(context, _this.globalRuntime);
      });
      this.hooks.init.call();
      if (this.hooks.initAsync.getCallbacksNum() === 0) {
        this.inited = true;
        callback();
      } else {
        this.hooks.initAsync.promise().then(function() {
          _this.inited = true;
          callback();
        });
      }
    };
    RenderingService2.prototype.getStats = function() {
      return this.stats;
    };
    RenderingService2.prototype.disableDirtyRectangleRendering = function() {
      var renderer = this.context.config.renderer;
      var enableDirtyRectangleRendering = renderer.getConfig().enableDirtyRectangleRendering;
      return !enableDirtyRectangleRendering || this.context.renderingContext.renderReasons.has(RenderReason.CAMERA_CHANGED);
    };
    RenderingService2.prototype.render = function(canvasConfig, frame, rerenderCallback) {
      var _this = this;
      this.stats.total = 0;
      this.stats.rendered = 0;
      this.zIndexCounter = 0;
      var renderingContext = this.context.renderingContext;
      this.globalRuntime.sceneGraphService.syncHierarchy(renderingContext.root);
      this.globalRuntime.sceneGraphService.triggerPendingEvents();
      if (renderingContext.renderReasons.size && this.inited) {
        renderingContext.dirtyRectangleRenderingDisabled = this.disableDirtyRectangleRendering();
        var onlyCameraChanged = renderingContext.renderReasons.size === 1 && renderingContext.renderReasons.has(RenderReason.CAMERA_CHANGED);
        var shouldTriggerRenderHooks = !canvasConfig.disableRenderHooks || !(canvasConfig.disableRenderHooks && onlyCameraChanged);
        if (shouldTriggerRenderHooks) {
          this.renderDisplayObject(renderingContext.root, canvasConfig, renderingContext);
        }
        this.hooks.beginFrame.call(frame);
        if (shouldTriggerRenderHooks) {
          renderingContext.renderListCurrentFrame.forEach(function(object) {
            _this.hooks.beforeRender.call(object);
            _this.hooks.render.call(object);
            _this.hooks.afterRender.call(object);
          });
        }
        this.hooks.endFrame.call(frame);
        renderingContext.renderListCurrentFrame = [];
        renderingContext.renderReasons.clear();
        rerenderCallback();
      }
    };
    RenderingService2.prototype.renderDisplayObject = function(displayObject, canvasConfig, renderingContext) {
      var _this = this;
      var _a = canvasConfig.renderer.getConfig(), enableDirtyCheck = _a.enableDirtyCheck, enableCulling = _a.enableCulling;
      if (this.globalRuntime.enableCSSParsing) {
        this.globalRuntime.styleValueRegistry.recalc(displayObject);
      }
      var renderable = displayObject.renderable;
      var objectChanged = enableDirtyCheck ? (
        // @ts-ignore
        renderable.dirty || renderingContext.dirtyRectangleRenderingDisabled ? displayObject : null
      ) : displayObject;
      if (objectChanged) {
        var objectToRender = enableCulling ? this.hooks.cull.call(objectChanged, this.context.camera) : objectChanged;
        if (objectToRender) {
          this.stats.rendered++;
          renderingContext.renderListCurrentFrame.push(objectToRender);
        }
      }
      displayObject.renderable.dirty = false;
      displayObject.sortable.renderOrder = this.zIndexCounter++;
      this.stats.total++;
      var sortable = displayObject.sortable;
      if (sortable.dirty) {
        this.sort(displayObject, sortable);
        sortable.dirty = false;
        sortable.dirtyChildren = [];
        sortable.dirtyReason = void 0;
      }
      (sortable.sorted || displayObject.childNodes).forEach(function(child) {
        _this.renderDisplayObject(child, canvasConfig, renderingContext);
      });
    };
    RenderingService2.prototype.sort = function(displayObject, sortable) {
      if (sortable.sorted && sortable.dirtyReason !== SortReason.Z_INDEX_CHANGED) {
        sortable.dirtyChildren.forEach(function(child) {
          var index = displayObject.childNodes.indexOf(child);
          if (index === -1) {
            var index_1 = sortable.sorted.indexOf(child);
            if (index_1 >= 0) {
              sortable.sorted.splice(index_1, 1);
            }
          } else {
            if (sortable.sorted.length === 0) {
              sortable.sorted.push(child);
            } else {
              var index_2 = sortedIndex(sortable.sorted, child);
              sortable.sorted.splice(index_2, 0, child);
            }
          }
        });
      } else {
        sortable.sorted = displayObject.childNodes.slice().sort(sortByZIndex);
      }
    };
    RenderingService2.prototype.destroy = function() {
      this.inited = false;
      this.hooks.destroy.call();
      this.globalRuntime.sceneGraphService.clearPendingEvents();
    };
    RenderingService2.prototype.dirtify = function() {
      this.context.renderingContext.renderReasons.add(RenderReason.DISPLAY_OBJECT_CHANGED);
    };
    return RenderingService2;
  }()
);
var ATTRIBUTE_REGEXP = /\[\s*(.*)=(.*)\s*\]/;
var DefaultSceneGraphSelector = (
  /** @class */
  function() {
    function DefaultSceneGraphSelector2() {
    }
    DefaultSceneGraphSelector2.prototype.selectOne = function(query, root2) {
      var _this = this;
      if (query.startsWith(".")) {
        return root2.find(function(node) {
          return ((node === null || node === void 0 ? void 0 : node.classList) || []).indexOf(_this.getIdOrClassname(query)) > -1;
        });
      } else if (query.startsWith("#")) {
        return root2.find(function(node) {
          return node.id === _this.getIdOrClassname(query);
        });
      } else if (query.startsWith("[")) {
        var _a = this.getAttribute(query), name_1 = _a.name, value_1 = _a.value;
        if (name_1) {
          return root2.find(function(node) {
            return root2 !== node && (name_1 === "name" ? node.name === value_1 : _this.attributeToString(node, name_1) === value_1);
          });
        } else {
          return null;
        }
      } else {
        return root2.find(function(node) {
          return root2 !== node && node.nodeName === query;
        });
      }
    };
    DefaultSceneGraphSelector2.prototype.selectAll = function(query, root2) {
      var _this = this;
      if (query.startsWith(".")) {
        return root2.findAll(function(node) {
          return root2 !== node && ((node === null || node === void 0 ? void 0 : node.classList) || []).indexOf(_this.getIdOrClassname(query)) > -1;
        });
      } else if (query.startsWith("#")) {
        return root2.findAll(function(node) {
          return root2 !== node && node.id === _this.getIdOrClassname(query);
        });
      } else if (query.startsWith("[")) {
        var _a = this.getAttribute(query), name_2 = _a.name, value_2 = _a.value;
        if (name_2) {
          return root2.findAll(function(node) {
            return root2 !== node && (name_2 === "name" ? node.name === value_2 : _this.attributeToString(node, name_2) === value_2);
          });
        } else {
          return [];
        }
      } else {
        return root2.findAll(function(node) {
          return root2 !== node && node.nodeName === query;
        });
      }
    };
    DefaultSceneGraphSelector2.prototype.is = function(query, node) {
      if (query.startsWith(".")) {
        return node.className === this.getIdOrClassname(query);
      } else if (query.startsWith("#")) {
        return node.id === this.getIdOrClassname(query);
      } else if (query.startsWith("[")) {
        var _a = this.getAttribute(query), name_3 = _a.name, value = _a.value;
        return name_3 === "name" ? node.name === value : this.attributeToString(node, name_3) === value;
      } else {
        return node.nodeName === query;
      }
    };
    DefaultSceneGraphSelector2.prototype.getIdOrClassname = function(query) {
      return query.substring(1);
    };
    DefaultSceneGraphSelector2.prototype.getAttribute = function(query) {
      var matches = query.match(ATTRIBUTE_REGEXP);
      var name = "";
      var value = "";
      if (matches && matches.length > 2) {
        name = matches[1].replace(/"/g, "");
        value = matches[2].replace(/"/g, "");
      }
      return { name, value };
    };
    DefaultSceneGraphSelector2.prototype.attributeToString = function(node, name) {
      if (!node.getAttribute) {
        return "";
      }
      var value = node.getAttribute(name);
      if (is_nil_default(value)) {
        return "";
      }
      if (value.toString) {
        return value.toString();
      }
      return "";
    };
    return DefaultSceneGraphSelector2;
  }()
);
var MutationEvent = (
  /** @class */
  function(_super) {
    __extends(MutationEvent2, _super);
    function MutationEvent2(typeArg, relatedNode, prevValue, newValue, attrName, attrChange, prevParsedValue, newParsedValue) {
      var _this = _super.call(this, null) || this;
      _this.relatedNode = relatedNode;
      _this.prevValue = prevValue;
      _this.newValue = newValue;
      _this.attrName = attrName;
      _this.attrChange = attrChange;
      _this.prevParsedValue = prevParsedValue;
      _this.newParsedValue = newParsedValue;
      _this.type = typeArg;
      return _this;
    }
    MutationEvent2.ADDITION = 2;
    MutationEvent2.MODIFICATION = 1;
    MutationEvent2.REMOVAL = 3;
    return MutationEvent2;
  }(FederatedEvent)
);
var ElementEvent;
(function(ElementEvent2) {
  ElementEvent2["REPARENT"] = "reparent";
  ElementEvent2["DESTROY"] = "destroy";
  ElementEvent2["ATTR_MODIFIED"] = "DOMAttrModified";
  ElementEvent2["INSERTED"] = "DOMNodeInserted";
  ElementEvent2["REMOVED"] = "removed";
  ElementEvent2["MOUNTED"] = "DOMNodeInsertedIntoDocument";
  ElementEvent2["UNMOUNTED"] = "DOMNodeRemovedFromDocument";
  ElementEvent2["BOUNDS_CHANGED"] = "bounds-changed";
  ElementEvent2["CULLED"] = "culled";
})(ElementEvent || (ElementEvent = {}));
function markRenderableDirty(e) {
  var renderable = e.renderable;
  if (renderable) {
    renderable.renderBoundsDirty = true;
    renderable.boundsDirty = true;
  }
}
var reparentEvent = new MutationEvent(ElementEvent.REPARENT, null, "", "", "", 0, "", "");
var DefaultSceneGraphService = (
  /** @class */
  function() {
    function DefaultSceneGraphService2(runtime2) {
      var _this = this;
      this.runtime = runtime2;
      this.pendingEvents = [];
      this.boundsChangedEvent = new CustomEvent(ElementEvent.BOUNDS_CHANGED);
      this.rotate = function() {
        var parentInvertRotation = quat_exports.create();
        return function(element, degrees2, y, z, dirtify) {
          if (y === void 0) {
            y = 0;
          }
          if (z === void 0) {
            z = 0;
          }
          if (dirtify === void 0) {
            dirtify = true;
          }
          if (typeof degrees2 === "number") {
            degrees2 = vec3_exports.fromValues(degrees2, y, z);
          }
          var transform2 = element.transformable;
          if (element.parentNode === null || !element.parentNode.transformable) {
            _this.rotateLocal(element, degrees2);
          } else {
            var rotation = quat_exports.create();
            quat_exports.fromEuler(rotation, degrees2[0], degrees2[1], degrees2[2]);
            var rot = _this.getRotation(element);
            var parentRot = _this.getRotation(element.parentNode);
            quat_exports.copy(parentInvertRotation, parentRot);
            quat_exports.invert(parentInvertRotation, parentInvertRotation);
            quat_exports.multiply(rotation, parentInvertRotation, rotation);
            quat_exports.multiply(transform2.localRotation, rotation, rot);
            quat_exports.normalize(transform2.localRotation, transform2.localRotation);
            if (dirtify) {
              _this.dirtifyLocal(element, transform2);
            }
          }
        };
      }();
      this.rotateLocal = function() {
        var rotation = quat_exports.create();
        return function(element, degrees2, y, z, dirtify) {
          if (y === void 0) {
            y = 0;
          }
          if (z === void 0) {
            z = 0;
          }
          if (dirtify === void 0) {
            dirtify = true;
          }
          if (typeof degrees2 === "number") {
            degrees2 = vec3_exports.fromValues(degrees2, y, z);
          }
          var transform2 = element.transformable;
          quat_exports.fromEuler(rotation, degrees2[0], degrees2[1], degrees2[2]);
          quat_exports.mul(transform2.localRotation, transform2.localRotation, rotation);
          if (dirtify) {
            _this.dirtifyLocal(element, transform2);
          }
        };
      }();
      this.setEulerAngles = function() {
        var invParentRot = quat_exports.create();
        return function(element, degrees2, y, z, dirtify) {
          if (y === void 0) {
            y = 0;
          }
          if (z === void 0) {
            z = 0;
          }
          if (dirtify === void 0) {
            dirtify = true;
          }
          if (typeof degrees2 === "number") {
            degrees2 = vec3_exports.fromValues(degrees2, y, z);
          }
          var transform2 = element.transformable;
          if (element.parentNode === null || !element.parentNode.transformable) {
            _this.setLocalEulerAngles(element, degrees2);
          } else {
            quat_exports.fromEuler(transform2.localRotation, degrees2[0], degrees2[1], degrees2[2]);
            var parentRotation = _this.getRotation(element.parentNode);
            quat_exports.copy(invParentRot, quat_exports.invert(quat_exports.create(), parentRotation));
            quat_exports.mul(transform2.localRotation, transform2.localRotation, invParentRot);
            if (dirtify) {
              _this.dirtifyLocal(element, transform2);
            }
          }
        };
      }();
      this.translateLocal = /* @__PURE__ */ function() {
        return function(element, translation, y, z, dirtify) {
          if (y === void 0) {
            y = 0;
          }
          if (z === void 0) {
            z = 0;
          }
          if (dirtify === void 0) {
            dirtify = true;
          }
          if (typeof translation === "number") {
            translation = vec3_exports.fromValues(translation, y, z);
          }
          var transform2 = element.transformable;
          if (vec3_exports.equals(translation, vec3_exports.create())) {
            return;
          }
          vec3_exports.transformQuat(translation, translation, transform2.localRotation);
          vec3_exports.add(transform2.localPosition, transform2.localPosition, translation);
          if (dirtify) {
            _this.dirtifyLocal(element, transform2);
          }
        };
      }();
      this.setPosition = function() {
        var parentInvertMatrix = mat4_exports.create();
        var tmpPosition = vec3_exports.create();
        return function(element, position, dirtify) {
          if (dirtify === void 0) {
            dirtify = true;
          }
          var transform2 = element.transformable;
          tmpPosition[0] = position[0];
          tmpPosition[1] = position[1];
          tmpPosition[2] = position[2] || 0;
          if (vec3_exports.equals(_this.getPosition(element), tmpPosition)) {
            return;
          }
          vec3_exports.copy(transform2.position, tmpPosition);
          if (element.parentNode === null || !element.parentNode.transformable) {
            vec3_exports.copy(transform2.localPosition, tmpPosition);
          } else {
            var parentTransform = element.parentNode.transformable;
            mat4_exports.copy(parentInvertMatrix, parentTransform.worldTransform);
            mat4_exports.invert(parentInvertMatrix, parentInvertMatrix);
            vec3_exports.transformMat4(transform2.localPosition, tmpPosition, parentInvertMatrix);
          }
          if (dirtify) {
            _this.dirtifyLocal(element, transform2);
          }
        };
      }();
      this.setLocalPosition = function() {
        var tmpPosition = vec3_exports.create();
        return function(element, position, dirtify) {
          if (dirtify === void 0) {
            dirtify = true;
          }
          var transform2 = element.transformable;
          tmpPosition[0] = position[0];
          tmpPosition[1] = position[1];
          tmpPosition[2] = position[2] || 0;
          if (vec3_exports.equals(transform2.localPosition, tmpPosition)) {
            return;
          }
          vec3_exports.copy(transform2.localPosition, tmpPosition);
          if (dirtify) {
            _this.dirtifyLocal(element, transform2);
          }
        };
      }();
      this.translate = function() {
        var zeroVec3 = vec3_exports.create();
        var tmpVec3 = vec3_exports.create();
        var tr = vec3_exports.create();
        return function(element, translation, y, z, dirtify) {
          if (y === void 0) {
            y = 0;
          }
          if (z === void 0) {
            z = 0;
          }
          if (dirtify === void 0) {
            dirtify = true;
          }
          if (typeof translation === "number") {
            translation = vec3_exports.set(tmpVec3, translation, y, z);
          }
          if (vec3_exports.equals(translation, zeroVec3)) {
            return;
          }
          vec3_exports.add(tr, _this.getPosition(element), translation);
          _this.setPosition(element, tr, dirtify);
        };
      }();
      this.setRotation = function() {
        var parentInvertRotation = quat_exports.create();
        return function(element, rotation, y, z, w, dirtify) {
          if (dirtify === void 0) {
            dirtify = true;
          }
          var transform2 = element.transformable;
          if (typeof rotation === "number") {
            rotation = quat_exports.fromValues(rotation, y, z, w);
          }
          if (element.parentNode === null || !element.parentNode.transformable) {
            _this.setLocalRotation(element, rotation);
          } else {
            var parentRot = _this.getRotation(element.parentNode);
            quat_exports.copy(parentInvertRotation, parentRot);
            quat_exports.invert(parentInvertRotation, parentInvertRotation);
            quat_exports.multiply(transform2.localRotation, parentInvertRotation, rotation);
            quat_exports.normalize(transform2.localRotation, transform2.localRotation);
            if (dirtify) {
              _this.dirtifyLocal(element, transform2);
            }
          }
        };
      };
      this.displayObjectDependencyMap = /* @__PURE__ */ new WeakMap();
      this.calcLocalTransform = function() {
        var tmpMat = mat4_exports.create();
        var tmpPosition = vec3_exports.create();
        var tmpQuat = quat_exports.fromValues(0, 0, 0, 1);
        return function(transform2) {
          var hasSkew = transform2.localSkew[0] !== 0 || transform2.localSkew[1] !== 0;
          if (hasSkew) {
            mat4_exports.fromRotationTranslationScaleOrigin(transform2.localTransform, transform2.localRotation, transform2.localPosition, vec3_exports.fromValues(1, 1, 1), transform2.origin);
            if (transform2.localSkew[0] !== 0 || transform2.localSkew[1] !== 0) {
              var tmpMat4 = mat4_exports.identity(tmpMat);
              tmpMat4[4] = Math.tan(transform2.localSkew[0]);
              tmpMat4[1] = Math.tan(transform2.localSkew[1]);
              mat4_exports.multiply(transform2.localTransform, transform2.localTransform, tmpMat4);
            }
            var scaling = mat4_exports.fromRotationTranslationScaleOrigin(tmpMat, tmpQuat, tmpPosition, transform2.localScale, transform2.origin);
            mat4_exports.multiply(transform2.localTransform, transform2.localTransform, scaling);
          } else {
            mat4_exports.fromRotationTranslationScaleOrigin(transform2.localTransform, transform2.localRotation, transform2.localPosition, transform2.localScale, transform2.origin);
          }
        };
      }();
    }
    DefaultSceneGraphService2.prototype.matches = function(query, root2) {
      return this.runtime.sceneGraphSelector.is(query, root2);
    };
    DefaultSceneGraphService2.prototype.querySelector = function(query, root2) {
      return this.runtime.sceneGraphSelector.selectOne(query, root2);
    };
    DefaultSceneGraphService2.prototype.querySelectorAll = function(query, root2) {
      return this.runtime.sceneGraphSelector.selectAll(query, root2);
    };
    DefaultSceneGraphService2.prototype.attach = function(child, parent, index) {
      var _a;
      var detached = false;
      if (child.parentNode) {
        detached = child.parentNode !== parent;
        this.detach(child);
      }
      child.parentNode = parent;
      if (!is_nil_default(index)) {
        child.parentNode.childNodes.splice(index, 0, child);
      } else {
        child.parentNode.childNodes.push(child);
      }
      var sortable = parent.sortable;
      if (((_a = sortable === null || sortable === void 0 ? void 0 : sortable.sorted) === null || _a === void 0 ? void 0 : _a.length) || child.parsedStyle.zIndex) {
        if (sortable.dirtyChildren.indexOf(child) === -1) {
          sortable.dirtyChildren.push(child);
        }
        sortable.dirty = true;
        sortable.dirtyReason = SortReason.ADDED;
      }
      var transform2 = child.transformable;
      if (transform2) {
        this.dirtifyWorld(child, transform2);
      }
      if (transform2.frozen) {
        this.unfreezeParentToRoot(child);
      }
      if (detached) {
        child.dispatchEvent(reparentEvent);
      }
    };
    DefaultSceneGraphService2.prototype.detach = function(child) {
      var _a, _b;
      if (child.parentNode) {
        var transform2 = child.transformable;
        var sortable = child.parentNode.sortable;
        if (((_a = sortable === null || sortable === void 0 ? void 0 : sortable.sorted) === null || _a === void 0 ? void 0 : _a.length) || ((_b = child.style) === null || _b === void 0 ? void 0 : _b.zIndex)) {
          if (sortable.dirtyChildren.indexOf(child) === -1) {
            sortable.dirtyChildren.push(child);
          }
          sortable.dirty = true;
          sortable.dirtyReason = SortReason.REMOVED;
        }
        var index = child.parentNode.childNodes.indexOf(child);
        if (index > -1) {
          child.parentNode.childNodes.splice(index, 1);
        }
        if (transform2) {
          this.dirtifyWorld(child, transform2);
        }
        child.parentNode = null;
      }
    };
    DefaultSceneGraphService2.prototype.getOrigin = function(element) {
      element.getGeometryBounds();
      return element.transformable.origin;
    };
    DefaultSceneGraphService2.prototype.setOrigin = function(element, origin, y, z) {
      if (y === void 0) {
        y = 0;
      }
      if (z === void 0) {
        z = 0;
      }
      if (typeof origin === "number") {
        origin = [origin, y, z];
      }
      var transform2 = element.transformable;
      if (origin[0] === transform2.origin[0] && origin[1] === transform2.origin[1] && origin[2] === transform2.origin[2]) {
        return;
      }
      var originVec = transform2.origin;
      originVec[0] = origin[0];
      originVec[1] = origin[1];
      originVec[2] = origin[2] || 0;
      this.dirtifyLocal(element, transform2);
    };
    DefaultSceneGraphService2.prototype.setLocalEulerAngles = function(element, degrees2, y, z, dirtify) {
      if (y === void 0) {
        y = 0;
      }
      if (z === void 0) {
        z = 0;
      }
      if (dirtify === void 0) {
        dirtify = true;
      }
      if (typeof degrees2 === "number") {
        degrees2 = vec3_exports.fromValues(degrees2, y, z);
      }
      var transform2 = element.transformable;
      quat_exports.fromEuler(transform2.localRotation, degrees2[0], degrees2[1], degrees2[2]);
      if (dirtify) {
        this.dirtifyLocal(element, transform2);
      }
    };
    DefaultSceneGraphService2.prototype.scaleLocal = function(element, scaling, dirtify) {
      if (dirtify === void 0) {
        dirtify = true;
      }
      var transform2 = element.transformable;
      vec3_exports.multiply(transform2.localScale, transform2.localScale, vec3_exports.fromValues(scaling[0], scaling[1], scaling[2] || 1));
      if (dirtify) {
        this.dirtifyLocal(element, transform2);
      }
    };
    DefaultSceneGraphService2.prototype.setLocalScale = function(element, scaling, dirtify) {
      if (dirtify === void 0) {
        dirtify = true;
      }
      var transform2 = element.transformable;
      var updatedScaling = vec3_exports.fromValues(scaling[0], scaling[1], scaling[2] || transform2.localScale[2]);
      if (vec3_exports.equals(updatedScaling, transform2.localScale)) {
        return;
      }
      vec3_exports.copy(transform2.localScale, updatedScaling);
      if (dirtify) {
        this.dirtifyLocal(element, transform2);
      }
    };
    DefaultSceneGraphService2.prototype.setLocalRotation = function(element, rotation, y, z, w, dirtify) {
      if (dirtify === void 0) {
        dirtify = true;
      }
      if (typeof rotation === "number") {
        rotation = quat_exports.fromValues(rotation, y, z, w);
      }
      var transform2 = element.transformable;
      quat_exports.copy(transform2.localRotation, rotation);
      if (dirtify) {
        this.dirtifyLocal(element, transform2);
      }
    };
    DefaultSceneGraphService2.prototype.setLocalSkew = function(element, skew, y) {
      if (typeof skew === "number") {
        skew = vec2_exports.fromValues(skew, y);
      }
      var transform2 = element.transformable;
      vec2_exports.copy(transform2.localSkew, skew);
      this.dirtifyLocal(element, transform2);
    };
    DefaultSceneGraphService2.prototype.dirtifyLocal = function(element, transform2) {
      if (!transform2.localDirtyFlag) {
        transform2.localDirtyFlag = true;
        if (!transform2.dirtyFlag) {
          this.dirtifyWorld(element, transform2);
        }
      }
    };
    DefaultSceneGraphService2.prototype.dirtifyWorld = function(element, transform2) {
      if (!transform2.dirtyFlag) {
        this.unfreezeParentToRoot(element);
      }
      this.dirtifyWorldInternal(element, transform2);
      this.dirtifyToRoot(element, true);
    };
    DefaultSceneGraphService2.prototype.triggerPendingEvents = function() {
      var _this = this;
      var set7 = /* @__PURE__ */ new Set();
      var trigger = function(element, detail) {
        if (element.isConnected && !set7.has(element.entity)) {
          _this.boundsChangedEvent.detail = detail;
          _this.boundsChangedEvent.target = element;
          if (element.isMutationObserved) {
            element.dispatchEvent(_this.boundsChangedEvent);
          } else {
            element.ownerDocument.defaultView.dispatchEvent(_this.boundsChangedEvent, true);
          }
          set7.add(element.entity);
        }
      };
      this.pendingEvents.forEach(function(_a) {
        var _b = __read(_a, 2), element = _b[0], detail = _b[1];
        if (detail.affectChildren) {
          element.forEach(function(e) {
            trigger(e, detail);
          });
        } else {
          trigger(element, detail);
        }
      });
      this.clearPendingEvents();
      set7.clear();
    };
    DefaultSceneGraphService2.prototype.clearPendingEvents = function() {
      this.pendingEvents = [];
    };
    DefaultSceneGraphService2.prototype.dirtifyToRoot = function(element, affectChildren) {
      if (affectChildren === void 0) {
        affectChildren = false;
      }
      var p = element;
      if (p.renderable) {
        p.renderable.dirty = true;
      }
      while (p) {
        markRenderableDirty(p);
        p = p.parentNode;
      }
      if (affectChildren) {
        element.forEach(function(e) {
          markRenderableDirty(e);
        });
      }
      this.informDependentDisplayObjects(element);
      this.pendingEvents.push([element, { affectChildren }]);
    };
    DefaultSceneGraphService2.prototype.updateDisplayObjectDependency = function(name, oldPath, newPath, object) {
      if (oldPath && oldPath !== newPath) {
        var oldDependencyMap = this.displayObjectDependencyMap.get(oldPath);
        if (oldDependencyMap && oldDependencyMap[name]) {
          var index = oldDependencyMap[name].indexOf(object);
          oldDependencyMap[name].splice(index, 1);
        }
      }
      if (newPath) {
        var newDependencyMap = this.displayObjectDependencyMap.get(newPath);
        if (!newDependencyMap) {
          this.displayObjectDependencyMap.set(newPath, {});
          newDependencyMap = this.displayObjectDependencyMap.get(newPath);
        }
        if (!newDependencyMap[name]) {
          newDependencyMap[name] = [];
        }
        newDependencyMap[name].push(object);
      }
    };
    DefaultSceneGraphService2.prototype.informDependentDisplayObjects = function(object) {
      var _this = this;
      var dependencyMap = this.displayObjectDependencyMap.get(object);
      if (dependencyMap) {
        Object.keys(dependencyMap).forEach(function(name) {
          dependencyMap[name].forEach(function(target) {
            _this.dirtifyToRoot(target, true);
            target.dispatchEvent(new MutationEvent(ElementEvent.ATTR_MODIFIED, target, _this, _this, name, MutationEvent.MODIFICATION, _this, _this));
            if (target.isCustomElement && target.isConnected) {
              if (target.attributeChangedCallback) {
                target.attributeChangedCallback(name, _this, _this);
              }
            }
          });
        });
      }
    };
    DefaultSceneGraphService2.prototype.getPosition = function(element) {
      var transform2 = element.transformable;
      return mat4_exports.getTranslation(transform2.position, this.getWorldTransform(element, transform2));
    };
    DefaultSceneGraphService2.prototype.getRotation = function(element) {
      var transform2 = element.transformable;
      return mat4_exports.getRotation(transform2.rotation, this.getWorldTransform(element, transform2));
    };
    DefaultSceneGraphService2.prototype.getScale = function(element) {
      var transform2 = element.transformable;
      return mat4_exports.getScaling(transform2.scaling, this.getWorldTransform(element, transform2));
    };
    DefaultSceneGraphService2.prototype.getWorldTransform = function(element, transform2) {
      if (transform2 === void 0) {
        transform2 = element.transformable;
      }
      if (!transform2.localDirtyFlag && !transform2.dirtyFlag) {
        return transform2.worldTransform;
      }
      if (element.parentNode && element.parentNode.transformable) {
        this.getWorldTransform(element.parentNode);
      }
      this.sync(element, transform2);
      return transform2.worldTransform;
    };
    DefaultSceneGraphService2.prototype.getLocalPosition = function(element) {
      return element.transformable.localPosition;
    };
    DefaultSceneGraphService2.prototype.getLocalRotation = function(element) {
      return element.transformable.localRotation;
    };
    DefaultSceneGraphService2.prototype.getLocalScale = function(element) {
      return element.transformable.localScale;
    };
    DefaultSceneGraphService2.prototype.getLocalSkew = function(element) {
      return element.transformable.localSkew;
    };
    DefaultSceneGraphService2.prototype.getLocalTransform = function(element) {
      var transform2 = element.transformable;
      if (transform2.localDirtyFlag) {
        this.calcLocalTransform(transform2);
        transform2.localDirtyFlag = false;
      }
      return transform2.localTransform;
    };
    DefaultSceneGraphService2.prototype.setLocalTransform = function(element, transform2) {
      var t = mat4_exports.getTranslation(vec3_exports.create(), transform2);
      var r = mat4_exports.getRotation(quat_exports.create(), transform2);
      var s = mat4_exports.getScaling(vec3_exports.create(), transform2);
      this.setLocalScale(element, s, false);
      this.setLocalPosition(element, t, false);
      this.setLocalRotation(element, r, void 0, void 0, void 0, false);
      this.dirtifyLocal(element, element.transformable);
    };
    DefaultSceneGraphService2.prototype.resetLocalTransform = function(element) {
      this.setLocalScale(element, [1, 1, 1]);
      this.setLocalPosition(element, [0, 0, 0]);
      this.setLocalEulerAngles(element, [0, 0, 0]);
      this.setLocalSkew(element, [0, 0]);
    };
    DefaultSceneGraphService2.prototype.getTransformedGeometryBounds = function(element, render, existedAABB) {
      if (render === void 0) {
        render = false;
      }
      var bounds = this.getGeometryBounds(element, render);
      if (!AABB.isEmpty(bounds)) {
        var aabb = existedAABB || new AABB();
        aabb.setFromTransformedAABB(bounds, this.getWorldTransform(element));
        return aabb;
      } else {
        return null;
      }
    };
    DefaultSceneGraphService2.prototype.getGeometryBounds = function(element, render) {
      if (render === void 0) {
        render = false;
      }
      var geometry = element.geometry;
      if (geometry.dirty) {
        runtime.styleValueRegistry.updateGeometry(element);
      }
      var bounds = render ? geometry.renderBounds : geometry.contentBounds || null;
      return bounds || new AABB();
    };
    DefaultSceneGraphService2.prototype.getBounds = function(element, render) {
      var _this = this;
      if (render === void 0) {
        render = false;
      }
      var renderable = element.renderable;
      if (!renderable.boundsDirty && !render && renderable.bounds) {
        return renderable.bounds;
      }
      if (!renderable.renderBoundsDirty && render && renderable.renderBounds) {
        return renderable.renderBounds;
      }
      var existedAABB = render ? renderable.renderBounds : renderable.bounds;
      var aabb = this.getTransformedGeometryBounds(element, render, existedAABB);
      var children = element.childNodes;
      children.forEach(function(child) {
        var childBounds = _this.getBounds(child, render);
        if (childBounds) {
          if (!aabb) {
            aabb = existedAABB || new AABB();
            aabb.update(childBounds.center, childBounds.halfExtents);
          } else {
            aabb.add(childBounds);
          }
        }
      });
      if (!aabb) {
        aabb = new AABB();
      }
      if (render) {
        var clipped = findClosestClipPathTarget(element);
        if (clipped) {
          var clipPathBounds = clipped.parsedStyle.clipPath.getBounds(render);
          if (!aabb) {
            aabb.update(clipPathBounds.center, clipPathBounds.halfExtents);
          } else if (clipPathBounds) {
            aabb = clipPathBounds.intersection(aabb);
          }
        }
      }
      if (render) {
        renderable.renderBounds = aabb;
        renderable.renderBoundsDirty = false;
      } else {
        renderable.bounds = aabb;
        renderable.boundsDirty = false;
      }
      return aabb;
    };
    DefaultSceneGraphService2.prototype.getLocalBounds = function(element) {
      if (element.parentNode) {
        var parentInvert = mat4_exports.create();
        if (element.parentNode.transformable) {
          parentInvert = mat4_exports.invert(mat4_exports.create(), this.getWorldTransform(element.parentNode));
        }
        var bounds = this.getBounds(element);
        if (!AABB.isEmpty(bounds)) {
          var localBounds = new AABB();
          localBounds.setFromTransformedAABB(bounds, parentInvert);
          return localBounds;
        }
      }
      return this.getBounds(element);
    };
    DefaultSceneGraphService2.prototype.getBoundingClientRect = function(element) {
      var _a, _b;
      var aabb;
      var bounds = this.getGeometryBounds(element);
      if (!AABB.isEmpty(bounds)) {
        aabb = new AABB();
        aabb.setFromTransformedAABB(bounds, this.getWorldTransform(element));
      }
      var bbox = (_b = (_a = element.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) === null || _b === void 0 ? void 0 : _b.getContextService().getBoundingClientRect();
      if (aabb) {
        var _c = __read(aabb.getMin(), 2), left = _c[0], top_1 = _c[1];
        var _d = __read(aabb.getMax(), 2), right = _d[0], bottom = _d[1];
        return new Rectangle(left + ((bbox === null || bbox === void 0 ? void 0 : bbox.left) || 0), top_1 + ((bbox === null || bbox === void 0 ? void 0 : bbox.top) || 0), right - left, bottom - top_1);
      }
      return new Rectangle((bbox === null || bbox === void 0 ? void 0 : bbox.left) || 0, (bbox === null || bbox === void 0 ? void 0 : bbox.top) || 0, 0, 0);
    };
    DefaultSceneGraphService2.prototype.dirtifyWorldInternal = function(element, transform2) {
      var _this = this;
      if (!transform2.dirtyFlag) {
        transform2.dirtyFlag = true;
        transform2.frozen = false;
        element.childNodes.forEach(function(child) {
          var childTransform = child.transformable;
          if (!childTransform.dirtyFlag) {
            _this.dirtifyWorldInternal(child, childTransform);
          }
        });
        var renderable = element.renderable;
        if (renderable) {
          renderable.renderBoundsDirty = true;
          renderable.boundsDirty = true;
          renderable.dirty = true;
        }
      }
    };
    DefaultSceneGraphService2.prototype.syncHierarchy = function(element) {
      var transform2 = element.transformable;
      if (transform2.frozen) {
        return;
      }
      transform2.frozen = true;
      if (transform2.localDirtyFlag || transform2.dirtyFlag) {
        this.sync(element, transform2);
      }
      var children = element.childNodes;
      for (var i = 0; i < children.length; i++) {
        this.syncHierarchy(children[i]);
      }
    };
    DefaultSceneGraphService2.prototype.sync = function(element, transform2) {
      if (transform2.localDirtyFlag) {
        this.calcLocalTransform(transform2);
        transform2.localDirtyFlag = false;
      }
      if (transform2.dirtyFlag) {
        var parent_1 = element.parentNode;
        var parentTransform = parent_1 && parent_1.transformable;
        if (parent_1 === null || !parentTransform) {
          mat4_exports.copy(transform2.worldTransform, transform2.localTransform);
        } else {
          mat4_exports.multiply(transform2.worldTransform, parentTransform.worldTransform, transform2.localTransform);
        }
        transform2.dirtyFlag = false;
      }
    };
    DefaultSceneGraphService2.prototype.unfreezeParentToRoot = function(child) {
      var p = child.parentNode;
      while (p) {
        var transform2 = p.transformable;
        if (transform2) {
          transform2.frozen = false;
        }
        p = p.parentNode;
      }
    };
    return DefaultSceneGraphService2;
  }()
);
var TEXT_METRICS = {
  MetricsString: "|ÉqÅ",
  BaselineSymbol: "M",
  BaselineMultiplier: 1.4,
  HeightMultiplier: 2,
  Newlines: [
    10,
    // line feed
    13
    // carriage return
  ],
  BreakingSpaces: [
    9,
    // character tabulation
    32,
    // space
    8192,
    // en quad
    8193,
    // em quad
    8194,
    // en space
    8195,
    // em space
    8196,
    // three-per-em space
    8197,
    // four-per-em space
    8198,
    // six-per-em space
    8200,
    // punctuation space
    8201,
    // thin space
    8202,
    // hair space
    8287,
    // medium mathematical space
    12288
    // ideographic space
  ]
};
var LATIN_REGEX = /[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff!"#$%&'()*+,-./:;]/;
var regexCannotStartZhCn = /[!%),.:;?\]}¢°·'""†‡›℃∶、。〃〆〕〗〞﹚﹜！＂％＇），．：；？！］｝～]/;
var regexCannotEndZhCn = /[$(£¥·'"〈《「『【〔〖〝﹙﹛＄（．［｛￡￥]/;
var regexCannotStartZhTw = /[!),.:;?\]}¢·–—'"•"、。〆〞〕〉》」︰︱︲︳﹐﹑﹒﹓﹔﹕﹖﹘﹚﹜！），．：；？︶︸︺︼︾﹀﹂﹗］｜｝､]/;
var regexCannotEndZhTw = /[([{£¥'"‵〈《「『〔〝︴﹙﹛（｛︵︷︹︻︽︿﹁﹃﹏]/;
var regexCannotStartJaJp = /[)\]｝〕〉》」』】〙〗〟'"｠»ヽヾーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ々〻‐゠–〜?!‼⁇⁈⁉・、:;,。.]/;
var regexCannotEndJaJp = /[([｛〔〈《「『【〘〖〝'"｟«—...‥〳〴〵]/;
var regexCannotStartKoKr = /[!%),.:;?\]}¢°'"†‡℃〆〈《「『〕！％），．：；？］｝]/;
var regexCannotEndKoKr = /[$([{£¥'"々〇〉》」〔＄（［｛｠￥￦#]/;
var regexCannotStart = new RegExp("".concat(regexCannotStartZhCn.source, "|").concat(regexCannotStartZhTw.source, "|").concat(regexCannotStartJaJp.source, "|").concat(regexCannotStartKoKr.source));
var regexCannotEnd = new RegExp("".concat(regexCannotEndZhCn.source, "|").concat(regexCannotEndZhTw.source, "|").concat(regexCannotEndJaJp.source, "|").concat(regexCannotEndKoKr.source));
var TextService = (
  /** @class */
  function() {
    function TextService2(runtime2) {
      var _this = this;
      this.runtime = runtime2;
      this.fontMetricsCache = {};
      this.shouldBreakByKinsokuShorui = function(char, nextChar) {
        if (_this.isBreakingSpace(nextChar))
          return false;
        if (char) {
          if (regexCannotEnd.exec(nextChar) || regexCannotStart.exec(char)) {
            return true;
          }
        }
        return false;
      };
      this.trimByKinsokuShorui = function(prev) {
        var next = __spreadArray([], __read(prev), false);
        var prevLine = next[next.length - 2];
        if (!prevLine) {
          return prev;
        }
        var lastChar = prevLine[prevLine.length - 1];
        next[next.length - 2] = prevLine.slice(0, -1);
        next[next.length - 1] = lastChar + next[next.length - 1];
        return next;
      };
    }
    TextService2.prototype.measureFont = function(font, offscreenCanvas) {
      if (this.fontMetricsCache[font]) {
        return this.fontMetricsCache[font];
      }
      var properties = {
        ascent: 0,
        descent: 0,
        fontSize: 0
      };
      var canvas = this.runtime.offscreenCanvasCreator.getOrCreateCanvas(offscreenCanvas);
      var context = this.runtime.offscreenCanvasCreator.getOrCreateContext(offscreenCanvas, {
        willReadFrequently: true
      });
      context.font = font;
      var metricsString = TEXT_METRICS.MetricsString + TEXT_METRICS.BaselineSymbol;
      var width = Math.ceil(context.measureText(metricsString).width);
      var baseline = Math.ceil(context.measureText(TEXT_METRICS.BaselineSymbol).width);
      var height = TEXT_METRICS.HeightMultiplier * baseline;
      baseline = baseline * TEXT_METRICS.BaselineMultiplier | 0;
      canvas.width = width;
      canvas.height = height;
      context.fillStyle = "#f00";
      context.fillRect(0, 0, width, height);
      context.font = font;
      context.textBaseline = "alphabetic";
      context.fillStyle = "#000";
      context.fillText(metricsString, 0, baseline);
      var imagedata = context.getImageData(0, 0, width || 1, height || 1).data;
      var pixels = imagedata.length;
      var line = width * 4;
      var i = 0;
      var idx = 0;
      var stop = false;
      for (i = 0; i < baseline; ++i) {
        for (var j = 0; j < line; j += 4) {
          if (imagedata[idx + j] !== 255) {
            stop = true;
            break;
          }
        }
        if (!stop) {
          idx += line;
        } else {
          break;
        }
      }
      properties.ascent = baseline - i;
      idx = pixels - line;
      stop = false;
      for (i = height; i > baseline; --i) {
        for (var j = 0; j < line; j += 4) {
          if (imagedata[idx + j] !== 255) {
            stop = true;
            break;
          }
        }
        if (!stop) {
          idx -= line;
        } else {
          break;
        }
      }
      properties.descent = i - baseline;
      properties.fontSize = properties.ascent + properties.descent;
      this.fontMetricsCache[font] = properties;
      return properties;
    };
    TextService2.prototype.measureText = function(text, parsedStyle, offscreenCanvas) {
      var _a = parsedStyle.fontSize, fontSize = _a === void 0 ? 16 : _a, _b = parsedStyle.wordWrap, wordWrap = _b === void 0 ? false : _b, strokeHeight = parsedStyle.lineHeight, _c = parsedStyle.lineWidth, lineWidth = _c === void 0 ? 1 : _c, _d = parsedStyle.textBaseline, textBaseline = _d === void 0 ? "alphabetic" : _d, _e = parsedStyle.textAlign, textAlign = _e === void 0 ? "start" : _e, _f = parsedStyle.letterSpacing, letterSpacing = _f === void 0 ? 0 : _f, textPath = parsedStyle.textPath;
      parsedStyle.textPathSide;
      parsedStyle.textPathStartOffset;
      var _g = parsedStyle.leading, leading = _g === void 0 ? 0 : _g;
      var font = toFontString(parsedStyle);
      var fontProperties = this.measureFont(font, offscreenCanvas);
      if (fontProperties.fontSize === 0) {
        fontProperties.fontSize = fontSize;
        fontProperties.ascent = fontSize;
      }
      var context = this.runtime.offscreenCanvasCreator.getOrCreateContext(offscreenCanvas);
      context.font = font;
      parsedStyle.isOverflowing = false;
      var outputText = wordWrap ? this.wordWrap(text, parsedStyle, offscreenCanvas) : text;
      var lines = outputText.split(/(?:\r\n|\r|\n)/);
      var lineWidths = new Array(lines.length);
      var maxLineWidth = 0;
      if (textPath) {
        textPath.getTotalLength();
        for (var i = 0; i < lines.length; i++) {
          var width = context.measureText(lines[i]).width + (lines[i].length - 1) * letterSpacing;
        }
      } else {
        for (var i = 0; i < lines.length; i++) {
          var lineWidth_1 = context.measureText(lines[i]).width + (lines[i].length - 1) * letterSpacing;
          lineWidths[i] = lineWidth_1;
          maxLineWidth = Math.max(maxLineWidth, lineWidth_1);
        }
        var width = maxLineWidth + lineWidth;
        var lineHeight_1 = strokeHeight || fontProperties.fontSize + lineWidth;
        var height = Math.max(lineHeight_1, fontProperties.fontSize + lineWidth) + (lines.length - 1) * (lineHeight_1 + leading);
        lineHeight_1 += leading;
        var offsetY_1 = 0;
        if (textBaseline === "middle") {
          offsetY_1 = -height / 2;
        } else if (textBaseline === "bottom" || textBaseline === "alphabetic" || textBaseline === "ideographic") {
          offsetY_1 = -height;
        } else if (textBaseline === "top" || textBaseline === "hanging") {
          offsetY_1 = 0;
        }
        return {
          font,
          width,
          height,
          lines,
          lineWidths,
          lineHeight: lineHeight_1,
          maxLineWidth,
          fontProperties,
          lineMetrics: lineWidths.map(function(width2, i2) {
            var offsetX = 0;
            if (textAlign === "center" || textAlign === "middle") {
              offsetX -= width2 / 2;
            } else if (textAlign === "right" || textAlign === "end") {
              offsetX -= width2;
            }
            return new Rectangle(offsetX - lineWidth / 2, offsetY_1 + i2 * lineHeight_1, width2 + lineWidth, lineHeight_1);
          })
        };
      }
    };
    TextService2.prototype.setGraphemeOnPath = function() {
    };
    TextService2.prototype.wordWrap = function(text, parsedStyle, offscreenCanvas) {
      var _this = this;
      var _a = parsedStyle.wordWrapWidth, wordWrapWidth = _a === void 0 ? 0 : _a, _b = parsedStyle.letterSpacing, letterSpacing = _b === void 0 ? 0 : _b, _c = parsedStyle.maxLines, maxLines = _c === void 0 ? Infinity : _c, textOverflow = parsedStyle.textOverflow;
      var context = this.runtime.offscreenCanvasCreator.getOrCreateContext(offscreenCanvas);
      var maxWidth = wordWrapWidth + letterSpacing;
      var ellipsis = "";
      if (textOverflow === "ellipsis") {
        ellipsis = "...";
      } else if (textOverflow && textOverflow !== "clip") {
        ellipsis = textOverflow;
      }
      var lines = [];
      var currentIndex = 0;
      var currentWidth = 0;
      var cache = {};
      var calcWidth = function(char2) {
        return _this.getFromCache(char2, letterSpacing, cache, context);
      };
      var ellipsisWidth = Array.from(ellipsis).reduce(function(prev, cur) {
        return prev + calcWidth(cur);
      }, 0);
      var chars = Array.from(text);
      for (var i = 0; i < chars.length; i++) {
        var char = chars[i];
        var prevChar = text[i - 1];
        var nextChar = text[i + 1];
        var charWidth = calcWidth(char);
        if (this.isNewline(char)) {
          currentIndex++;
          if (currentIndex >= maxLines) {
            parsedStyle.isOverflowing = true;
            break;
          }
          currentWidth = 0;
          lines[currentIndex] = "";
          continue;
        }
        if (currentWidth > 0 && currentWidth + charWidth > maxWidth) {
          if (currentIndex + 1 >= maxLines) {
            parsedStyle.isOverflowing = true;
            if (ellipsisWidth > 0 && ellipsisWidth <= maxWidth) {
              var currentLineLength = lines[currentIndex].length;
              var lastLineWidth = 0;
              var lastLineIndex = currentLineLength;
              for (var i_1 = 0; i_1 < currentLineLength; i_1++) {
                var width = calcWidth(lines[currentIndex][i_1]);
                if (lastLineWidth + width + ellipsisWidth > maxWidth) {
                  lastLineIndex = i_1;
                  break;
                }
                lastLineWidth += width;
              }
              lines[currentIndex] = (lines[currentIndex] || "").slice(0, lastLineIndex) + ellipsis;
            }
            break;
          }
          currentIndex++;
          currentWidth = 0;
          lines[currentIndex] = "";
          if (this.isBreakingSpace(char)) {
            continue;
          }
          if (!this.canBreakInLastChar(char)) {
            lines = this.trimToBreakable(lines);
            currentWidth = this.sumTextWidthByCache(lines[currentIndex] || "", cache);
          }
          if (this.shouldBreakByKinsokuShorui(char, nextChar)) {
            lines = this.trimByKinsokuShorui(lines);
            currentWidth += calcWidth(prevChar || "");
          }
        }
        currentWidth += charWidth;
        lines[currentIndex] = (lines[currentIndex] || "") + char;
      }
      return lines.join("\n");
    };
    TextService2.prototype.isBreakingSpace = function(char) {
      if (typeof char !== "string") {
        return false;
      }
      return TEXT_METRICS.BreakingSpaces.indexOf(char.charCodeAt(0)) >= 0;
    };
    TextService2.prototype.isNewline = function(char) {
      if (typeof char !== "string") {
        return false;
      }
      return TEXT_METRICS.Newlines.indexOf(char.charCodeAt(0)) >= 0;
    };
    TextService2.prototype.trimToBreakable = function(prev) {
      var next = __spreadArray([], __read(prev), false);
      var prevLine = next[next.length - 2];
      var index = this.findBreakableIndex(prevLine);
      if (index === -1 || !prevLine)
        return next;
      var trimmedChar = prevLine.slice(index, index + 1);
      var isTrimmedWithSpace = this.isBreakingSpace(trimmedChar);
      var trimFrom = index + 1;
      var trimTo = index + (isTrimmedWithSpace ? 0 : 1);
      next[next.length - 1] += prevLine.slice(trimFrom, prevLine.length);
      next[next.length - 2] = prevLine.slice(0, trimTo);
      return next;
    };
    TextService2.prototype.canBreakInLastChar = function(char) {
      if (char && LATIN_REGEX.test(char))
        return false;
      return true;
    };
    TextService2.prototype.sumTextWidthByCache = function(text, cache) {
      return text.split("").reduce(function(sum, c) {
        if (!cache[c])
          throw Error("cannot count the word without cache");
        return sum + cache[c];
      }, 0);
    };
    TextService2.prototype.findBreakableIndex = function(line) {
      for (var i = line.length - 1; i >= 0; i--) {
        if (!LATIN_REGEX.test(line[i]))
          return i;
      }
      return -1;
    };
    TextService2.prototype.getFromCache = function(key, letterSpacing, cache, context) {
      var width = cache[key];
      if (typeof width !== "number") {
        var spacing = key.length * letterSpacing;
        width = context.measureText(key).width + spacing;
        cache[key] = width;
      }
      return width;
    };
    return TextService2;
  }()
);
var runtime = {};
var geometryUpdaterFactory = function() {
  var _a;
  var rectUpdater = new RectUpdater();
  var polylineUpdater = new PolylineUpdater();
  return _a = {}, _a[Shape.CIRCLE] = new CircleUpdater(), _a[Shape.ELLIPSE] = new EllipseUpdater(), _a[Shape.RECT] = rectUpdater, _a[Shape.IMAGE] = rectUpdater, _a[Shape.GROUP] = new GroupUpdater(), _a[Shape.LINE] = new LineUpdater(), _a[Shape.TEXT] = new TextUpdater(runtime), _a[Shape.POLYLINE] = polylineUpdater, _a[Shape.POLYGON] = polylineUpdater, _a[Shape.PATH] = new PathUpdater(), _a[Shape.HTML] = new HTMLUpdater(), _a[Shape.MESH] = null, _a;
}();
var CSSPropertySyntaxFactory = function() {
  var _a;
  var color2 = new CSSPropertyColor();
  var length5 = new CSSPropertyLengthOrPercentage();
  return _a = {}, _a[PropertySyntax.PERCENTAGE] = null, _a[PropertySyntax.NUMBER] = new CSSPropertyNumber(), _a[PropertySyntax.ANGLE] = new CSSPropertyAngle(), _a[PropertySyntax.DEFINED_PATH] = new CSSPropertyClipPath(), _a[PropertySyntax.PAINT] = color2, _a[PropertySyntax.COLOR] = color2, _a[PropertySyntax.FILTER] = new CSSPropertyFilter(), _a[PropertySyntax.LENGTH] = length5, _a[PropertySyntax.LENGTH_PERCENTAGE] = length5, _a[PropertySyntax.LENGTH_PERCENTAGE_12] = new CSSPropertyLengthOrPercentage12(), _a[PropertySyntax.LENGTH_PERCENTAGE_14] = new CSSPropertyLengthOrPercentage14(), _a[PropertySyntax.COORDINATE] = new CSSPropertyLengthOrPercentage(), _a[PropertySyntax.OFFSET_DISTANCE] = new CSSPropertyOffsetDistance(), _a[PropertySyntax.OPACITY_VALUE] = new CSSPropertyOpacity(), _a[PropertySyntax.PATH] = new CSSPropertyPath(), _a[PropertySyntax.LIST_OF_POINTS] = new CSSPropertyPoints(), _a[PropertySyntax.SHADOW_BLUR] = new CSSPropertyShadowBlur(), _a[PropertySyntax.TEXT] = new CSSPropertyText(), _a[PropertySyntax.TEXT_TRANSFORM] = new CSSPropertyTextTransform(), _a[PropertySyntax.TRANSFORM] = new CSSPropertyTransform(), _a[PropertySyntax.TRANSFORM_ORIGIN] = new CSSPropertyTransformOrigin(), _a[PropertySyntax.Z_INDEX] = new CSSPropertyZIndex(), _a[PropertySyntax.MARKER] = new CSSPropertyMarker(), _a;
}();
var getGlobalThis = function() {
  if (typeof globalThis !== "undefined")
    return globalThis;
  if (typeof self !== "undefined")
    return self;
  if (typeof window !== "undefined")
    return window;
  if (typeof global !== "undefined")
    return global;
  return {};
};
runtime.CameraContribution = Camera;
runtime.AnimationTimeline = null;
runtime.EasingFunction = null;
runtime.offscreenCanvasCreator = new OffscreenCanvasCreator();
runtime.sceneGraphSelector = new DefaultSceneGraphSelector();
runtime.sceneGraphService = new DefaultSceneGraphService(runtime);
runtime.textService = new TextService(runtime);
runtime.geometryUpdaterFactory = geometryUpdaterFactory;
runtime.CSSPropertySyntaxFactory = CSSPropertySyntaxFactory;
runtime.styleValueRegistry = new DefaultStyleValueRegistry(runtime);
runtime.layoutRegistry = null;
runtime.globalThis = getGlobalThis();
runtime.enableCSSParsing = false;
runtime.enableDataset = false;
runtime.enableStyleSyntax = true;
runtime.enableAttributeDashCased = false;
runtime.enableSizeAttenuation = false;
var entityCounter = 0;
function resetEntityCounter() {
  entityCounter = 0;
}
var insertedEvent = new MutationEvent(ElementEvent.INSERTED, null, "", "", "", 0, "", "");
var removedEvent = new MutationEvent(ElementEvent.REMOVED, null, "", "", "", 0, "", "");
var destroyEvent = new CustomEvent(ElementEvent.DESTROY);
var Element2 = (
  /** @class */
  function(_super) {
    __extends(Element3, _super);
    function Element3() {
      var _this = _super.call(this) || this;
      _this.entity = entityCounter++;
      _this.renderable = {
        bounds: void 0,
        boundsDirty: true,
        renderBounds: void 0,
        renderBoundsDirty: true,
        dirtyRenderBounds: void 0,
        dirty: false
      };
      _this.cullable = {
        strategy: Strategy.Standard,
        visibilityPlaneMask: -1,
        visible: true,
        enable: true
      };
      _this.transformable = {
        dirtyFlag: false,
        localDirtyFlag: false,
        frozen: false,
        localPosition: [0, 0, 0],
        localRotation: [0, 0, 0, 1],
        localScale: [1, 1, 1],
        localTransform: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        localSkew: [0, 0],
        position: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        scaling: [1, 1, 1],
        worldTransform: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        origin: [0, 0, 0]
      };
      _this.sortable = {
        dirty: false,
        sorted: void 0,
        renderOrder: 0,
        dirtyChildren: [],
        dirtyReason: void 0
      };
      _this.geometry = {
        contentBounds: void 0,
        renderBounds: void 0,
        dirty: true
      };
      _this.rBushNode = {
        aabb: void 0
      };
      _this.namespaceURI = "g";
      _this.scrollLeft = 0;
      _this.scrollTop = 0;
      _this.clientTop = 0;
      _this.clientLeft = 0;
      _this.destroyed = false;
      _this.style = {};
      _this.computedStyle = runtime.enableCSSParsing ? {
        opacity: unsetKeywordValue,
        fillOpacity: unsetKeywordValue,
        strokeOpacity: unsetKeywordValue,
        fill: unsetKeywordValue,
        stroke: unsetKeywordValue,
        transform: unsetKeywordValue,
        transformOrigin: unsetKeywordValue,
        visibility: unsetKeywordValue,
        pointerEvents: unsetKeywordValue,
        lineWidth: unsetKeywordValue,
        lineCap: unsetKeywordValue,
        lineJoin: unsetKeywordValue,
        increasedLineWidthForHitTesting: unsetKeywordValue,
        fontSize: unsetKeywordValue,
        fontFamily: unsetKeywordValue,
        fontStyle: unsetKeywordValue,
        fontWeight: unsetKeywordValue,
        fontVariant: unsetKeywordValue,
        textAlign: unsetKeywordValue,
        textBaseline: unsetKeywordValue,
        textTransform: unsetKeywordValue,
        zIndex: unsetKeywordValue,
        filter: unsetKeywordValue,
        shadowType: unsetKeywordValue
      } : null;
      _this.parsedStyle = {
        // opacity: '',
        // fillOpacity: '',
        // strokeOpacity: '',
        // transformOrigin: '',
        // visibility: '',
        // pointerEvents: '',
        // lineWidth: '',
        // lineCap: '',
        // lineJoin: '',
        // increasedLineWidthForHitTesting: '',
        // fontSize: '',
        // fontFamily: '',
        // fontStyle: '',
        // fontWeight: '',
        // fontVariant: '',
        // textAlign: '',
        // textBaseline: '',
        // textTransform: '',
      };
      _this.attributes = {};
      return _this;
    }
    Object.defineProperty(Element3.prototype, "className", {
      /**
       * used in `getElementsByClassName`
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
       */
      get: function() {
        return this.getAttribute("class") || "";
      },
      set: function(className) {
        this.setAttribute("class", className);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Element3.prototype, "classList", {
      /**
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
       */
      get: function() {
        return this.className.split(" ").filter(function(c) {
          return c !== "";
        });
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Element3.prototype, "tagName", {
      get: function() {
        return this.nodeName;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Element3.prototype, "children", {
      get: function() {
        return this.childNodes;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Element3.prototype, "childElementCount", {
      get: function() {
        return this.childNodes.length;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Element3.prototype, "firstElementChild", {
      get: function() {
        return this.firstChild;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Element3.prototype, "lastElementChild", {
      get: function() {
        return this.lastChild;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Element3.prototype, "parentElement", {
      get: function() {
        return this.parentNode;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Element3.prototype, "nextSibling", {
      get: function() {
        if (this.parentNode) {
          var index = this.parentNode.childNodes.indexOf(this);
          return this.parentNode.childNodes[index + 1] || null;
        }
        return null;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Element3.prototype, "previousSibling", {
      get: function() {
        if (this.parentNode) {
          var index = this.parentNode.childNodes.indexOf(this);
          return this.parentNode.childNodes[index - 1] || null;
        }
        return null;
      },
      enumerable: false,
      configurable: true
    });
    Element3.prototype.cloneNode = function(deep) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Element3.prototype.appendChild = function(child, index) {
      var _a;
      if (child.destroyed) {
        throw new Error(ERROR_MSG_APPEND_DESTROYED_ELEMENT);
      }
      runtime.sceneGraphService.attach(child, this, index);
      if ((_a = this.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) {
        this.ownerDocument.defaultView.mountChildren(child);
      }
      if (this.isMutationObserved) {
        insertedEvent.relatedNode = this;
        child.dispatchEvent(insertedEvent);
      }
      return child;
    };
    Element3.prototype.insertBefore = function(newChild, refChild) {
      if (!refChild) {
        this.appendChild(newChild);
      } else {
        if (newChild.parentElement) {
          newChild.parentElement.removeChild(newChild);
        }
        var index = this.childNodes.indexOf(refChild);
        if (index === -1) {
          this.appendChild(newChild);
        } else {
          this.appendChild(newChild, index);
        }
      }
      return newChild;
    };
    Element3.prototype.replaceChild = function(newChild, oldChild) {
      var index = this.childNodes.indexOf(oldChild);
      this.removeChild(oldChild);
      this.appendChild(newChild, index);
      return oldChild;
    };
    Element3.prototype.removeChild = function(child) {
      var _a;
      removedEvent.relatedNode = this;
      child.dispatchEvent(removedEvent);
      if ((_a = child.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) {
        child.ownerDocument.defaultView.unmountChildren(child);
      }
      runtime.sceneGraphService.detach(child);
      return child;
    };
    Element3.prototype.removeChildren = function() {
      for (var i = this.childNodes.length - 1; i >= 0; i--) {
        var child = this.childNodes[i];
        this.removeChild(child);
      }
    };
    Element3.prototype.destroyChildren = function() {
      for (var i = this.childNodes.length - 1; i >= 0; i--) {
        var child = this.childNodes[i];
        if (child.childNodes.length) {
          child.destroyChildren();
        }
        child.destroy();
      }
    };
    Element3.prototype.matches = function(selector) {
      return runtime.sceneGraphService.matches(selector, this);
    };
    Element3.prototype.getElementById = function(id2) {
      return runtime.sceneGraphService.querySelector("#".concat(id2), this);
    };
    Element3.prototype.getElementsByName = function(name) {
      return runtime.sceneGraphService.querySelectorAll('[name="'.concat(name, '"]'), this);
    };
    Element3.prototype.getElementsByClassName = function(className) {
      return runtime.sceneGraphService.querySelectorAll(".".concat(className), this);
    };
    Element3.prototype.getElementsByTagName = function(tagName) {
      return runtime.sceneGraphService.querySelectorAll(tagName, this);
    };
    Element3.prototype.querySelector = function(selectors) {
      return runtime.sceneGraphService.querySelector(selectors, this);
    };
    Element3.prototype.querySelectorAll = function(selectors) {
      return runtime.sceneGraphService.querySelectorAll(selectors, this);
    };
    Element3.prototype.closest = function(selectors) {
      var el = this;
      do {
        if (runtime.sceneGraphService.matches(selectors, el))
          return el;
        el = el.parentElement;
      } while (el !== null);
      return null;
    };
    Element3.prototype.find = function(filter2) {
      var _this = this;
      var target = null;
      this.forEach(function(object) {
        if (object !== _this && filter2(object)) {
          target = object;
          return true;
        }
        return false;
      });
      return target;
    };
    Element3.prototype.findAll = function(filter2) {
      var _this = this;
      var objects = [];
      this.forEach(function(object) {
        if (object !== _this && filter2(object)) {
          objects.push(object);
        }
      });
      return objects;
    };
    Element3.prototype.after = function() {
      var _this = this;
      var nodes = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        nodes[_i] = arguments[_i];
      }
      if (this.parentNode) {
        var index_1 = this.parentNode.childNodes.indexOf(this);
        nodes.forEach(function(node, i) {
          var _a;
          return (_a = _this.parentNode) === null || _a === void 0 ? void 0 : _a.appendChild(node, index_1 + i + 1);
        });
      }
    };
    Element3.prototype.before = function() {
      var _a;
      var nodes = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        nodes[_i] = arguments[_i];
      }
      if (this.parentNode) {
        var index = this.parentNode.childNodes.indexOf(this);
        var _b = __read(nodes), first = _b[0], rest = _b.slice(1);
        this.parentNode.appendChild(first, index);
        (_a = first).after.apply(_a, __spreadArray([], __read(rest), false));
      }
    };
    Element3.prototype.replaceWith = function() {
      var nodes = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        nodes[_i] = arguments[_i];
      }
      this.after.apply(this, __spreadArray([], __read(nodes), false));
      this.remove();
    };
    Element3.prototype.append = function() {
      var _this = this;
      var nodes = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        nodes[_i] = arguments[_i];
      }
      nodes.forEach(function(node) {
        return _this.appendChild(node);
      });
    };
    Element3.prototype.prepend = function() {
      var _this = this;
      var nodes = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        nodes[_i] = arguments[_i];
      }
      nodes.forEach(function(node, i) {
        return _this.appendChild(node, i);
      });
    };
    Element3.prototype.replaceChildren = function() {
      var nodes = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        nodes[_i] = arguments[_i];
      }
      while (this.childNodes.length && this.firstChild) {
        this.removeChild(this.firstChild);
      }
      this.append.apply(this, __spreadArray([], __read(nodes), false));
    };
    Element3.prototype.remove = function() {
      if (this.parentNode) {
        return this.parentNode.removeChild(this);
      }
      return this;
    };
    Element3.prototype.destroy = function() {
      this.dispatchEvent(destroyEvent);
      this.remove();
      this.emitter.removeAllListeners();
      this.destroyed = true;
    };
    Element3.prototype.getGeometryBounds = function() {
      return runtime.sceneGraphService.getGeometryBounds(this);
    };
    Element3.prototype.getRenderBounds = function() {
      return runtime.sceneGraphService.getBounds(this, true);
    };
    Element3.prototype.getBounds = function() {
      return runtime.sceneGraphService.getBounds(this);
    };
    Element3.prototype.getLocalBounds = function() {
      return runtime.sceneGraphService.getLocalBounds(this);
    };
    Element3.prototype.getBoundingClientRect = function() {
      return runtime.sceneGraphService.getBoundingClientRect(this);
    };
    Element3.prototype.getClientRects = function() {
      return [this.getBoundingClientRect()];
    };
    Element3.prototype.computedStyleMap = function() {
      return new Map(Object.entries(this.computedStyle));
    };
    Element3.prototype.getAttributeNames = function() {
      return Object.keys(this.attributes);
    };
    Element3.prototype.getAttribute = function(name) {
      if (isSymbol(name)) {
        return runtime.enableCSSParsing ? null : void 0;
      }
      var value = this.attributes[name];
      if (value === void 0) {
        if (runtime.enableAttributeDashCased) {
          var attributeName = formatAttributeName(name);
          value = this.attributes[attributeName];
        }
        return runtime.enableCSSParsing ? is_nil_default(value) ? null : value : value;
      } else {
        return value;
      }
    };
    Element3.prototype.hasAttribute = function(qualifiedName) {
      return this.getAttributeNames().includes(qualifiedName);
    };
    Element3.prototype.hasAttributes = function() {
      return !!this.getAttributeNames().length;
    };
    Element3.prototype.removeAttribute = function(attributeName) {
      this.setAttribute(attributeName, null);
      delete this.attributes[attributeName];
    };
    Element3.prototype.setAttribute = function(attributeName, value, force, memoize2) {
      this.attributes[attributeName] = value;
    };
    Element3.prototype.getAttributeNS = function(namespace, localName) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Element3.prototype.getAttributeNode = function(qualifiedName) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Element3.prototype.getAttributeNodeNS = function(namespace, localName) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Element3.prototype.hasAttributeNS = function(namespace, localName) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Element3.prototype.removeAttributeNS = function(namespace, localName) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Element3.prototype.removeAttributeNode = function(attr) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Element3.prototype.setAttributeNS = function(namespace, qualifiedName, value) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Element3.prototype.setAttributeNode = function(attr) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Element3.prototype.setAttributeNodeNS = function(attr) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Element3.prototype.toggleAttribute = function(qualifiedName, force) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    return Element3;
  }(Node)
);
function isDisplayObject(value) {
  return !!(value === null || value === void 0 ? void 0 : value.nodeName);
}
var Proxy = runtime.globalThis.Proxy ? runtime.globalThis.Proxy : function() {
};
var mutationEvent = new MutationEvent(ElementEvent.ATTR_MODIFIED, null, null, null, null, MutationEvent.MODIFICATION, null, null);
var DEFAULT_STYLE_PROPS = {
  opacity: "",
  fillOpacity: "",
  strokeOpacity: "",
  fill: "",
  stroke: "",
  transform: "",
  transformOrigin: "",
  visibility: "",
  pointerEvents: "",
  lineWidth: "",
  lineCap: "",
  lineJoin: "",
  increasedLineWidthForHitTesting: "",
  fontSize: "",
  fontFamily: "",
  fontStyle: "",
  fontWeight: "",
  fontVariant: "",
  textAlign: "",
  textBaseline: "",
  textTransform: "",
  zIndex: "",
  filter: "",
  shadowType: ""
};
var DEFAULT_PARSED_STYLE_PROPS = {
  fill: noneColor,
  stroke: noneColor,
  transform: [],
  zIndex: 0,
  filter: [],
  shadowType: "outer",
  miterLimit: 10
};
var INHERITABLE_BASE_STYLE_PROPS = [
  "opacity",
  "fillOpacity",
  "strokeOpacity",
  "transformOrigin",
  "visibility",
  "pointerEvents",
  "lineWidth",
  "lineCap",
  "lineJoin",
  "increasedLineWidthForHitTesting"
];
var INHERITABLE_STYLE_PROPS = __spreadArray(__spreadArray([], __read(INHERITABLE_BASE_STYLE_PROPS), false), [
  "fontSize",
  "fontFamily",
  "fontStyle",
  "fontWeight",
  "fontVariant",
  "textAlign",
  "textBaseline",
  "textTransform"
], false);
var DATASET_PREFIX = "data-";
var DisplayObject = (
  /** @class */
  function(_super) {
    __extends(DisplayObject2, _super);
    function DisplayObject2(config) {
      var _this = _super.call(this) || this;
      _this.isCustomElement = false;
      _this.isMutationObserved = false;
      _this.activeAnimations = [];
      _this.config = config;
      _this.id = _this.config.id || "";
      _this.name = _this.config.name || "";
      if (_this.config.className || _this.config.class) {
        _this.className = _this.config.className || _this.config.class;
      }
      _this.nodeName = _this.config.type || Shape.GROUP;
      if (runtime.enableCSSParsing) {
        Object.assign(_this.attributes, DEFAULT_STYLE_PROPS);
        Object.assign(_this.parsedStyle, DEFAULT_PARSED_STYLE_PROPS, _this.config.initialParsedStyle);
      } else if (_this.config.initialParsedStyle) {
        Object.assign(
          _this.parsedStyle,
          // DEFAULT_PARSED_STYLE_PROPS_CSS_DISABLED,
          _this.config.initialParsedStyle
        );
      }
      _this.initAttributes(_this.config.style);
      if (runtime.enableDataset) {
        _this.dataset = new Proxy({}, {
          get: function(target, name) {
            var formattedName = "".concat(DATASET_PREFIX).concat(kebabize(name));
            if (target[formattedName] !== void 0) {
              return target[formattedName];
            }
            return _this.getAttribute(formattedName);
          },
          set: function(_2, prop, value) {
            _this.setAttribute("".concat(DATASET_PREFIX).concat(kebabize(prop)), value);
            return true;
          }
        });
      }
      if (runtime.enableStyleSyntax) {
        _this.style = new Proxy(
          // @ts-ignore
          {
            // ...this.attributes,
            setProperty: function(propertyName, value) {
              _this.setAttribute(propertyName, value);
            },
            getPropertyValue: function(propertyName) {
              return _this.getAttribute(propertyName);
            },
            removeProperty: function(propertyName) {
              _this.removeAttribute(propertyName);
            },
            item: function() {
              return "";
            }
          },
          {
            get: function(target, name) {
              if (target[name] !== void 0) {
                return target[name];
              }
              return _this.getAttribute(name);
            },
            set: function(_2, prop, value) {
              _this.setAttribute(prop, value);
              return true;
            }
          }
        );
      }
      return _this;
    }
    DisplayObject2.prototype.destroy = function() {
      _super.prototype.destroy.call(this);
      this.getAnimations().forEach(function(animation) {
        animation.cancel();
      });
    };
    DisplayObject2.prototype.cloneNode = function(deep, customCloneFunc) {
      var clonedStyle = __assign({}, this.attributes);
      for (var attributeName in clonedStyle) {
        var attribute = clonedStyle[attributeName];
        if (isDisplayObject(attribute) && // share the same clipPath if possible
        attributeName !== "clipPath" && attributeName !== "offsetPath" && attributeName !== "textPath") {
          clonedStyle[attributeName] = attribute.cloneNode(deep);
        }
        if (customCloneFunc) {
          clonedStyle[attributeName] = customCloneFunc(attributeName, attribute);
        }
      }
      var cloned = new this.constructor({
        // copy id & name
        // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode#notes
        id: this.id,
        name: this.name,
        className: this.name,
        interactive: this.interactive,
        style: clonedStyle
      });
      cloned.setLocalTransform(this.getLocalTransform());
      if (deep) {
        this.children.forEach(function(child) {
          if (!child.style.isMarker) {
            var clonedChild = child.cloneNode(deep);
            cloned.appendChild(clonedChild);
          }
        });
      }
      return cloned;
    };
    DisplayObject2.prototype.initAttributes = function(attributes) {
      if (attributes === void 0) {
        attributes = {};
      }
      var renderable = this.renderable;
      var options = {
        forceUpdateGeometry: true
        // usedAttributes:
        //   // only Group / Text should account for text relative props
        //   this.tagName === Shape.GROUP || this.tagName === Shape.TEXT
        //     ? INHERITABLE_STYLE_PROPS
        //     : INHERITABLE_BASE_STYLE_PROPS,
      };
      if (runtime.enableCSSParsing) {
        options.usedAttributes = INHERITABLE_STYLE_PROPS;
      }
      var formattedAttributes = attributes;
      if (runtime.enableAttributeDashCased) {
        formattedAttributes = {};
        for (var name_1 in attributes) {
          var attributeName = formatAttributeName(name_1);
          formattedAttributes[attributeName] = attributes[name_1];
        }
      }
      runtime.styleValueRegistry.processProperties(this, formattedAttributes, options);
      renderable.dirty = true;
    };
    DisplayObject2.prototype.setAttribute = function(name, value, force, memoize2) {
      if (force === void 0) {
        force = false;
      }
      if (memoize2 === void 0) {
        memoize2 = true;
      }
      if (runtime.enableAttributeDashCased) {
        name = formatAttributeName(name);
      }
      if (is_undefined_default(value)) {
        return;
      }
      if (force || value !== this.attributes[name]) {
        this.internalSetAttribute(name, value, { memoize: memoize2 });
        _super.prototype.setAttribute.call(this, name, value);
      }
    };
    DisplayObject2.prototype.internalSetAttribute = function(name, value, parseOptions) {
      var _a;
      if (parseOptions === void 0) {
        parseOptions = {};
      }
      var renderable = this.renderable;
      var oldValue = this.attributes[name];
      var oldParsedValue = this.parsedStyle[name];
      runtime.styleValueRegistry.processProperties(this, (_a = {}, _a[name] = value, _a), parseOptions);
      renderable.dirty = true;
      var newParsedValue = this.parsedStyle[name];
      if (this.isConnected) {
        mutationEvent.relatedNode = this;
        mutationEvent.prevValue = oldValue;
        mutationEvent.newValue = value;
        mutationEvent.attrName = name;
        mutationEvent.prevParsedValue = oldParsedValue;
        mutationEvent.newParsedValue = newParsedValue;
        if (this.isMutationObserved) {
          this.dispatchEvent(mutationEvent);
        } else {
          mutationEvent.target = this;
          this.ownerDocument.defaultView.dispatchEvent(mutationEvent, true);
        }
      }
      if ((this.isCustomElement && this.isConnected || !this.isCustomElement) && this.attributeChangedCallback) {
        this.attributeChangedCallback(name, oldValue, value, oldParsedValue, newParsedValue);
      }
    };
    DisplayObject2.prototype.getBBox = function() {
      var aabb = this.getBounds();
      var _a = __read(aabb.getMin(), 2), left = _a[0], top = _a[1];
      var _b = __read(aabb.getMax(), 2), right = _b[0], bottom = _b[1];
      return new Rectangle(left, top, right - left, bottom - top);
    };
    DisplayObject2.prototype.setOrigin = function(position, y, z) {
      if (y === void 0) {
        y = 0;
      }
      if (z === void 0) {
        z = 0;
      }
      runtime.sceneGraphService.setOrigin(this, createVec3(position, y, z));
      return this;
    };
    DisplayObject2.prototype.getOrigin = function() {
      return runtime.sceneGraphService.getOrigin(this);
    };
    DisplayObject2.prototype.setPosition = function(position, y, z) {
      if (y === void 0) {
        y = 0;
      }
      if (z === void 0) {
        z = 0;
      }
      runtime.sceneGraphService.setPosition(this, createVec3(position, y, z));
      return this;
    };
    DisplayObject2.prototype.setLocalPosition = function(position, y, z) {
      if (y === void 0) {
        y = 0;
      }
      if (z === void 0) {
        z = 0;
      }
      runtime.sceneGraphService.setLocalPosition(this, createVec3(position, y, z));
      return this;
    };
    DisplayObject2.prototype.translate = function(position, y, z) {
      if (y === void 0) {
        y = 0;
      }
      if (z === void 0) {
        z = 0;
      }
      runtime.sceneGraphService.translate(this, createVec3(position, y, z));
      return this;
    };
    DisplayObject2.prototype.translateLocal = function(position, y, z) {
      if (y === void 0) {
        y = 0;
      }
      if (z === void 0) {
        z = 0;
      }
      runtime.sceneGraphService.translateLocal(this, createVec3(position, y, z));
      return this;
    };
    DisplayObject2.prototype.getPosition = function() {
      return runtime.sceneGraphService.getPosition(this);
    };
    DisplayObject2.prototype.getLocalPosition = function() {
      return runtime.sceneGraphService.getLocalPosition(this);
    };
    DisplayObject2.prototype.scale = function(scaling, y, z) {
      return this.scaleLocal(scaling, y, z);
    };
    DisplayObject2.prototype.scaleLocal = function(scaling, y, z) {
      if (typeof scaling === "number") {
        y = y || scaling;
        z = z || scaling;
        scaling = createVec3(scaling, y, z);
      }
      runtime.sceneGraphService.scaleLocal(this, scaling);
      return this;
    };
    DisplayObject2.prototype.setLocalScale = function(scaling, y, z) {
      if (typeof scaling === "number") {
        y = y || scaling;
        z = z || scaling;
        scaling = createVec3(scaling, y, z);
      }
      runtime.sceneGraphService.setLocalScale(this, scaling);
      return this;
    };
    DisplayObject2.prototype.getLocalScale = function() {
      return runtime.sceneGraphService.getLocalScale(this);
    };
    DisplayObject2.prototype.getScale = function() {
      return runtime.sceneGraphService.getScale(this);
    };
    DisplayObject2.prototype.getEulerAngles = function() {
      var _a = __read(getEuler(vec3_exports.create(), runtime.sceneGraphService.getWorldTransform(this)), 3), ez = _a[2];
      return rad2deg(ez);
    };
    DisplayObject2.prototype.getLocalEulerAngles = function() {
      var _a = __read(getEuler(vec3_exports.create(), runtime.sceneGraphService.getLocalRotation(this)), 3), ez = _a[2];
      return rad2deg(ez);
    };
    DisplayObject2.prototype.setEulerAngles = function(z) {
      runtime.sceneGraphService.setEulerAngles(this, 0, 0, z);
      return this;
    };
    DisplayObject2.prototype.setLocalEulerAngles = function(z) {
      runtime.sceneGraphService.setLocalEulerAngles(this, 0, 0, z);
      return this;
    };
    DisplayObject2.prototype.rotateLocal = function(x, y, z) {
      if (is_nil_default(y) && is_nil_default(z)) {
        runtime.sceneGraphService.rotateLocal(this, 0, 0, x);
      } else {
        runtime.sceneGraphService.rotateLocal(this, x, y, z);
      }
      return this;
    };
    DisplayObject2.prototype.rotate = function(x, y, z) {
      if (is_nil_default(y) && is_nil_default(z)) {
        runtime.sceneGraphService.rotate(this, 0, 0, x);
      } else {
        runtime.sceneGraphService.rotate(this, x, y, z);
      }
      return this;
    };
    DisplayObject2.prototype.setRotation = function(rotation, y, z, w) {
      runtime.sceneGraphService.setRotation(this, rotation, y, z, w);
      return this;
    };
    DisplayObject2.prototype.setLocalRotation = function(rotation, y, z, w) {
      runtime.sceneGraphService.setLocalRotation(this, rotation, y, z, w);
      return this;
    };
    DisplayObject2.prototype.setLocalSkew = function(skew, y) {
      runtime.sceneGraphService.setLocalSkew(this, skew, y);
      return this;
    };
    DisplayObject2.prototype.getRotation = function() {
      return runtime.sceneGraphService.getRotation(this);
    };
    DisplayObject2.prototype.getLocalRotation = function() {
      return runtime.sceneGraphService.getLocalRotation(this);
    };
    DisplayObject2.prototype.getLocalSkew = function() {
      return runtime.sceneGraphService.getLocalSkew(this);
    };
    DisplayObject2.prototype.getLocalTransform = function() {
      return runtime.sceneGraphService.getLocalTransform(this);
    };
    DisplayObject2.prototype.getWorldTransform = function() {
      return runtime.sceneGraphService.getWorldTransform(this);
    };
    DisplayObject2.prototype.setLocalTransform = function(transform2) {
      runtime.sceneGraphService.setLocalTransform(this, transform2);
      return this;
    };
    DisplayObject2.prototype.resetLocalTransform = function() {
      runtime.sceneGraphService.resetLocalTransform(this);
    };
    DisplayObject2.prototype.getAnimations = function() {
      return this.activeAnimations;
    };
    DisplayObject2.prototype.animate = function(keyframes, options) {
      var _a;
      var timeline = (_a = this.ownerDocument) === null || _a === void 0 ? void 0 : _a.timeline;
      if (timeline) {
        return timeline.play(this, keyframes, options);
      }
      return null;
    };
    DisplayObject2.prototype.isVisible = function() {
      var _a, _b;
      return runtime.enableCSSParsing ? ((_a = this.parsedStyle) === null || _a === void 0 ? void 0 : _a.visibility) === "visible" : ((_b = this.parsedStyle) === null || _b === void 0 ? void 0 : _b.visibility) !== "hidden";
    };
    Object.defineProperty(DisplayObject2.prototype, "interactive", {
      get: function() {
        return this.isInteractive();
      },
      set: function(b) {
        this.style.pointerEvents = b ? "auto" : "none";
      },
      enumerable: false,
      configurable: true
    });
    DisplayObject2.prototype.isInteractive = function() {
      var _a;
      return ((_a = this.parsedStyle) === null || _a === void 0 ? void 0 : _a.pointerEvents) !== "none";
    };
    DisplayObject2.prototype.isCulled = function() {
      return !!(this.cullable && this.cullable.enable && !this.cullable.visible);
    };
    DisplayObject2.prototype.toFront = function() {
      if (this.parentNode) {
        this.style.zIndex = Math.max.apply(Math, __spreadArray([], __read(this.parentNode.children.map(function(child) {
          return Number(child.style.zIndex);
        })), false)) + 1;
      }
      return this;
    };
    DisplayObject2.prototype.toBack = function() {
      if (this.parentNode) {
        this.style.zIndex = Math.min.apply(Math, __spreadArray([], __read(this.parentNode.children.map(function(child) {
          return Number(child.style.zIndex);
        })), false)) - 1;
      }
      return this;
    };
    DisplayObject2.prototype.getConfig = function() {
      return this.config;
    };
    DisplayObject2.prototype.attr = function() {
      var _this = this;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var _a = __read(args, 2), name = _a[0], value = _a[1];
      if (!name) {
        return this.attributes;
      }
      if (is_object_default(name)) {
        Object.keys(name).forEach(function(key) {
          _this.setAttribute(key, name[key]);
        });
        return this;
      }
      if (args.length === 2) {
        this.setAttribute(name, value);
        return this;
      }
      return this.attributes[name];
    };
    DisplayObject2.prototype.getMatrix = function(transformMat44) {
      var transform2 = transformMat44 || this.getWorldTransform();
      var _a = __read(mat4_exports.getTranslation(vec3_exports.create(), transform2), 2), tx = _a[0], ty = _a[1];
      var _b = __read(mat4_exports.getScaling(vec3_exports.create(), transform2), 2), sx = _b[0], sy = _b[1];
      var rotation = mat4_exports.getRotation(quat_exports.create(), transform2);
      var _c = __read(getEuler(vec3_exports.create(), rotation), 3), eux = _c[0], euz = _c[2];
      return fromRotationTranslationScale2(eux || euz, tx, ty, sx, sy);
    };
    DisplayObject2.prototype.getLocalMatrix = function() {
      return this.getMatrix(this.getLocalTransform());
    };
    DisplayObject2.prototype.setMatrix = function(mat) {
      var _a = __read(decompose(mat), 5), tx = _a[0], ty = _a[1], scalingX = _a[2], scalingY = _a[3], angle3 = _a[4];
      this.setEulerAngles(angle3).setPosition(tx, ty).setLocalScale(scalingX, scalingY);
    };
    DisplayObject2.prototype.setLocalMatrix = function(mat) {
      var _a = __read(decompose(mat), 5), tx = _a[0], ty = _a[1], scalingX = _a[2], scalingY = _a[3], angle3 = _a[4];
      this.setLocalEulerAngles(angle3).setLocalPosition(tx, ty).setLocalScale(scalingX, scalingY);
    };
    DisplayObject2.prototype.show = function() {
      if (runtime.enableCSSParsing) {
        this.style.visibility = "visible";
      } else {
        this.forEach(function(object) {
          object.style.visibility = "visible";
        });
      }
    };
    DisplayObject2.prototype.hide = function() {
      if (runtime.enableCSSParsing) {
        this.style.visibility = "hidden";
      } else {
        this.forEach(function(object) {
          object.style.visibility = "hidden";
        });
      }
    };
    DisplayObject2.prototype.getCount = function() {
      return this.childElementCount;
    };
    DisplayObject2.prototype.getParent = function() {
      return this.parentElement;
    };
    DisplayObject2.prototype.getChildren = function() {
      return this.children;
    };
    DisplayObject2.prototype.getFirst = function() {
      return this.firstElementChild;
    };
    DisplayObject2.prototype.getLast = function() {
      return this.lastElementChild;
    };
    DisplayObject2.prototype.getChildByIndex = function(index) {
      return this.children[index] || null;
    };
    DisplayObject2.prototype.add = function(child, index) {
      return this.appendChild(child, index);
    };
    DisplayObject2.prototype.set = function(name, value) {
      this.config[name] = value;
    };
    DisplayObject2.prototype.get = function(name) {
      return this.config[name];
    };
    DisplayObject2.prototype.moveTo = function(position, y, z) {
      if (y === void 0) {
        y = 0;
      }
      if (z === void 0) {
        z = 0;
      }
      this.setPosition(position, y, z);
      return this;
    };
    DisplayObject2.prototype.move = function(position, y, z) {
      if (y === void 0) {
        y = 0;
      }
      if (z === void 0) {
        z = 0;
      }
      this.setPosition(position, y, z);
      return this;
    };
    DisplayObject2.prototype.setZIndex = function(zIndex) {
      this.style.zIndex = zIndex;
      return this;
    };
    return DisplayObject2;
  }(Element2)
);
var Circle = (
  /** @class */
  function(_super) {
    __extends(Circle2, _super);
    function Circle2(options) {
      if (options === void 0) {
        options = {};
      }
      return _super.call(this, __assign({ type: Shape.CIRCLE }, options)) || this;
    }
    return Circle2;
  }(DisplayObject)
);
var CustomElement = (
  /** @class */
  function(_super) {
    __extends(CustomElement2, _super);
    function CustomElement2(_a) {
      if (_a === void 0) {
        _a = {};
      }
      var _this = this;
      var style = _a.style, rest = __rest(_a, ["style"]);
      _this = _super.call(this, __assign({ style: runtime.enableCSSParsing ? __assign({}, style) : __assign({}, style) }, rest)) || this;
      _this.isCustomElement = true;
      return _this;
    }
    return CustomElement2;
  }(DisplayObject)
);
var Ellipse = (
  /** @class */
  function(_super) {
    __extends(Ellipse2, _super);
    function Ellipse2(options) {
      if (options === void 0) {
        options = {};
      }
      return _super.call(this, __assign({ type: Shape.ELLIPSE }, options)) || this;
    }
    return Ellipse2;
  }(DisplayObject)
);
var Group = (
  /** @class */
  function(_super) {
    __extends(Group2, _super);
    function Group2(options) {
      if (options === void 0) {
        options = {};
      }
      return _super.call(this, __assign({ type: Shape.GROUP }, options)) || this;
    }
    return Group2;
  }(DisplayObject)
);
var HTML = (
  /** @class */
  function(_super) {
    __extends(HTML2, _super);
    function HTML2(_a) {
      if (_a === void 0) {
        _a = {};
      }
      var _this = this;
      var style = _a.style, rest = __rest(_a, ["style"]);
      _this = _super.call(this, __assign({ type: Shape.HTML, style: runtime.enableCSSParsing ? __assign({ x: "", y: "", width: "auto", height: "auto", innerHTML: "" }, style) : __assign({}, style) }, rest)) || this;
      _this.cullable.enable = false;
      return _this;
    }
    HTML2.prototype.getDomElement = function() {
      return this.parsedStyle.$el;
    };
    HTML2.prototype.getClientRects = function() {
      return [this.getBoundingClientRect()];
    };
    HTML2.prototype.getLocalBounds = function() {
      if (this.parentNode) {
        var parentInvert = mat4_exports.invert(mat4_exports.create(), this.parentNode.getWorldTransform());
        var bounds = this.getBounds();
        if (!AABB.isEmpty(bounds)) {
          var localBounds = new AABB();
          localBounds.setFromTransformedAABB(bounds, parentInvert);
          return localBounds;
        }
      }
      return this.getBounds();
    };
    return HTML2;
  }(DisplayObject)
);
var Image = (
  /** @class */
  function(_super) {
    __extends(Image2, _super);
    function Image2(options) {
      if (options === void 0) {
        options = {};
      }
      return _super.call(this, __assign({ type: Shape.IMAGE }, options)) || this;
    }
    return Image2;
  }(DisplayObject)
);
var Line = (
  /** @class */
  function(_super) {
    __extends(Line2, _super);
    function Line2(_a) {
      if (_a === void 0) {
        _a = {};
      }
      var _this = this;
      var style = _a.style, rest = __rest(_a, ["style"]);
      _this = _super.call(this, __assign({ type: Shape.LINE, style: __assign({ x1: 0, y1: 0, x2: 0, y2: 0, z1: 0, z2: 0 }, style) }, rest)) || this;
      _this.markerStartAngle = 0;
      _this.markerEndAngle = 0;
      var _b = _this.parsedStyle, markerStart = _b.markerStart, markerEnd = _b.markerEnd;
      if (markerStart && isDisplayObject(markerStart)) {
        _this.markerStartAngle = markerStart.getLocalEulerAngles();
        _this.appendChild(markerStart);
      }
      if (markerEnd && isDisplayObject(markerEnd)) {
        _this.markerEndAngle = markerEnd.getLocalEulerAngles();
        _this.appendChild(markerEnd);
      }
      _this.transformMarker(true);
      _this.transformMarker(false);
      return _this;
    }
    Line2.prototype.attributeChangedCallback = function(attrName, oldValue, newValue, prevParsedValue, newParsedValue) {
      if (attrName === "x1" || attrName === "y1" || attrName === "x2" || attrName === "y2" || attrName === "markerStartOffset" || attrName === "markerEndOffset") {
        this.transformMarker(true);
        this.transformMarker(false);
      } else if (attrName === "markerStart") {
        if (prevParsedValue && isDisplayObject(prevParsedValue)) {
          this.markerStartAngle = 0;
          prevParsedValue.remove();
        }
        if (newParsedValue && isDisplayObject(newParsedValue)) {
          this.markerStartAngle = newParsedValue.getLocalEulerAngles();
          this.appendChild(newParsedValue);
          this.transformMarker(true);
        }
      } else if (attrName === "markerEnd") {
        if (prevParsedValue && isDisplayObject(prevParsedValue)) {
          this.markerEndAngle = 0;
          prevParsedValue.remove();
        }
        if (newParsedValue && isDisplayObject(newParsedValue)) {
          this.markerEndAngle = newParsedValue.getLocalEulerAngles();
          this.appendChild(newParsedValue);
          this.transformMarker(false);
        }
      }
    };
    Line2.prototype.transformMarker = function(isStart) {
      var _a = this.parsedStyle, markerStart = _a.markerStart, markerEnd = _a.markerEnd, markerStartOffset = _a.markerStartOffset, markerEndOffset = _a.markerEndOffset, x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
      var marker = isStart ? markerStart : markerEnd;
      if (!marker || !isDisplayObject(marker)) {
        return;
      }
      var rad = 0;
      var x;
      var y;
      var ox;
      var oy;
      var offset;
      var originalAngle;
      if (isStart) {
        ox = x1;
        oy = y1;
        x = x2 - x1;
        y = y2 - y1;
        offset = markerStartOffset || 0;
        originalAngle = this.markerStartAngle;
      } else {
        ox = x2;
        oy = y2;
        x = x1 - x2;
        y = y1 - y2;
        offset = markerEndOffset || 0;
        originalAngle = this.markerEndAngle;
      }
      rad = Math.atan2(y, x);
      marker.setLocalEulerAngles(rad * 180 / Math.PI + originalAngle);
      marker.setLocalPosition(ox + Math.cos(rad) * offset, oy + Math.sin(rad) * offset);
    };
    Line2.prototype.getPoint = function(ratio, inWorldSpace) {
      if (inWorldSpace === void 0) {
        inWorldSpace = false;
      }
      var _a = this.parsedStyle, x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2;
      var _b = pointAt$3(x1, y1, x2, y2, ratio), x = _b.x, y = _b.y;
      var transformed = vec3_exports.transformMat4(vec3_exports.create(), vec3_exports.fromValues(x, y, 0), inWorldSpace ? this.getWorldTransform() : this.getLocalTransform());
      return new Point(transformed[0], transformed[1]);
    };
    Line2.prototype.getPointAtLength = function(distance5, inWorldSpace) {
      if (inWorldSpace === void 0) {
        inWorldSpace = false;
      }
      return this.getPoint(distance5 / this.getTotalLength(), inWorldSpace);
    };
    Line2.prototype.getTotalLength = function() {
      var _a = this.parsedStyle, x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2;
      return length$4(x1, y1, x2, y2);
    };
    return Line2;
  }(DisplayObject)
);
var Path = (
  /** @class */
  function(_super) {
    __extends(Path2, _super);
    function Path2(_a) {
      if (_a === void 0) {
        _a = {};
      }
      var _this = this;
      var style = _a.style, rest = __rest(_a, ["style"]);
      _this = _super.call(this, __assign({ type: Shape.PATH, style: runtime.enableCSSParsing ? __assign({ d: "", miterLimit: "" }, style) : __assign({}, style), initialParsedStyle: runtime.enableCSSParsing ? null : {
        miterLimit: 4,
        d: __assign({}, EMPTY_PARSED_PATH)
      } }, rest)) || this;
      _this.markerStartAngle = 0;
      _this.markerEndAngle = 0;
      _this.markerMidList = [];
      var _b = _this.parsedStyle, markerStart = _b.markerStart, markerEnd = _b.markerEnd, markerMid = _b.markerMid;
      if (markerStart && isDisplayObject(markerStart)) {
        _this.markerStartAngle = markerStart.getLocalEulerAngles();
        _this.appendChild(markerStart);
      }
      if (markerMid && isDisplayObject(markerMid)) {
        _this.placeMarkerMid(markerMid);
      }
      if (markerEnd && isDisplayObject(markerEnd)) {
        _this.markerEndAngle = markerEnd.getLocalEulerAngles();
        _this.appendChild(markerEnd);
      }
      _this.transformMarker(true);
      _this.transformMarker(false);
      return _this;
    }
    Path2.prototype.attributeChangedCallback = function(attrName, oldValue, newValue, prevParsedValue, newParsedValue) {
      if (attrName === "d") {
        this.transformMarker(true);
        this.transformMarker(false);
        this.placeMarkerMid(this.parsedStyle.markerMid);
      } else if (attrName === "markerStartOffset" || attrName === "markerEndOffset") {
        this.transformMarker(true);
        this.transformMarker(false);
      } else if (attrName === "markerStart") {
        if (prevParsedValue && isDisplayObject(prevParsedValue)) {
          this.markerStartAngle = 0;
          prevParsedValue.remove();
        }
        if (newParsedValue && isDisplayObject(newParsedValue)) {
          this.markerStartAngle = newParsedValue.getLocalEulerAngles();
          this.appendChild(newParsedValue);
          this.transformMarker(true);
        }
      } else if (attrName === "markerEnd") {
        if (prevParsedValue && isDisplayObject(prevParsedValue)) {
          this.markerEndAngle = 0;
          prevParsedValue.remove();
        }
        if (newParsedValue && isDisplayObject(newParsedValue)) {
          this.markerEndAngle = newParsedValue.getLocalEulerAngles();
          this.appendChild(newParsedValue);
          this.transformMarker(false);
        }
      } else if (attrName === "markerMid") {
        this.placeMarkerMid(newParsedValue);
      }
    };
    Path2.prototype.transformMarker = function(isStart) {
      var _a = this.parsedStyle, markerStart = _a.markerStart, markerEnd = _a.markerEnd, markerStartOffset = _a.markerStartOffset, markerEndOffset = _a.markerEndOffset;
      var marker = isStart ? markerStart : markerEnd;
      if (!marker || !isDisplayObject(marker)) {
        return;
      }
      var rad = 0;
      var x;
      var y;
      var ox;
      var oy;
      var offset;
      var originalAngle;
      if (isStart) {
        var _b = __read(this.getStartTangent(), 2), p1 = _b[0], p2 = _b[1];
        ox = p2[0];
        oy = p2[1];
        x = p1[0] - p2[0];
        y = p1[1] - p2[1];
        offset = markerStartOffset || 0;
        originalAngle = this.markerStartAngle;
      } else {
        var _c = __read(this.getEndTangent(), 2), p1 = _c[0], p2 = _c[1];
        ox = p2[0];
        oy = p2[1];
        x = p1[0] - p2[0];
        y = p1[1] - p2[1];
        offset = markerEndOffset || 0;
        originalAngle = this.markerEndAngle;
      }
      rad = Math.atan2(y, x);
      marker.setLocalEulerAngles(rad * 180 / Math.PI + originalAngle);
      marker.setLocalPosition(ox + Math.cos(rad) * offset, oy + Math.sin(rad) * offset);
    };
    Path2.prototype.placeMarkerMid = function(marker) {
      var segments = this.parsedStyle.d.segments;
      this.markerMidList.forEach(function(marker2) {
        marker2.remove();
      });
      if (marker && isDisplayObject(marker)) {
        for (var i = 1; i < segments.length - 1; i++) {
          var _a = __read(segments[i].currentPoint, 2), ox = _a[0], oy = _a[1];
          var cloned = i === 1 ? marker : marker.cloneNode(true);
          this.markerMidList.push(cloned);
          this.appendChild(cloned);
          cloned.setLocalPosition(ox, oy);
        }
      }
    };
    Path2.prototype.getTotalLength = function() {
      return getOrCalculatePathTotalLength(this);
    };
    Path2.prototype.getPointAtLength = function(distance5, inWorldSpace) {
      if (inWorldSpace === void 0) {
        inWorldSpace = false;
      }
      var absolutePath = this.parsedStyle.d.absolutePath;
      var _a = getPointAtLength(absolutePath, distance5), x = _a.x, y = _a.y;
      var transformed = vec3_exports.transformMat4(vec3_exports.create(), vec3_exports.fromValues(x, y, 0), inWorldSpace ? this.getWorldTransform() : this.getLocalTransform());
      return new Point(transformed[0], transformed[1]);
    };
    Path2.prototype.getPoint = function(ratio, inWorldSpace) {
      if (inWorldSpace === void 0) {
        inWorldSpace = false;
      }
      return this.getPointAtLength(ratio * getOrCalculatePathTotalLength(this), inWorldSpace);
    };
    Path2.prototype.getStartTangent = function() {
      var segments = this.parsedStyle.d.segments;
      var result = [];
      if (segments.length > 1) {
        var startPoint = segments[0].currentPoint;
        var endPoint = segments[1].currentPoint;
        var tangent = segments[1].startTangent;
        result = [];
        if (tangent) {
          result.push([startPoint[0] - tangent[0], startPoint[1] - tangent[1]]);
          result.push([startPoint[0], startPoint[1]]);
        } else {
          result.push([endPoint[0], endPoint[1]]);
          result.push([startPoint[0], startPoint[1]]);
        }
      }
      return result;
    };
    Path2.prototype.getEndTangent = function() {
      var segments = this.parsedStyle.d.segments;
      var length5 = segments.length;
      var result = [];
      if (length5 > 1) {
        var startPoint = segments[length5 - 2].currentPoint;
        var endPoint = segments[length5 - 1].currentPoint;
        var tangent = segments[length5 - 1].endTangent;
        result = [];
        if (tangent) {
          result.push([endPoint[0] - tangent[0], endPoint[1] - tangent[1]]);
          result.push([endPoint[0], endPoint[1]]);
        } else {
          result.push([startPoint[0], startPoint[1]]);
          result.push([endPoint[0], endPoint[1]]);
        }
      }
      return result;
    };
    return Path2;
  }(DisplayObject)
);
var Polygon = (
  /** @class */
  function(_super) {
    __extends(Polygon2, _super);
    function Polygon2(_a) {
      if (_a === void 0) {
        _a = {};
      }
      var _this = this;
      var style = _a.style, rest = __rest(_a, ["style"]);
      _this = _super.call(this, __assign({ type: Shape.POLYGON, style: runtime.enableCSSParsing ? __assign({ points: "", miterLimit: "", isClosed: true }, style) : __assign({}, style), initialParsedStyle: runtime.enableCSSParsing ? null : {
        points: {
          points: [],
          totalLength: 0,
          segments: []
        },
        miterLimit: 4,
        isClosed: true
      } }, rest)) || this;
      _this.markerStartAngle = 0;
      _this.markerEndAngle = 0;
      _this.markerMidList = [];
      var _b = _this.parsedStyle, markerStart = _b.markerStart, markerEnd = _b.markerEnd, markerMid = _b.markerMid;
      if (markerStart && isDisplayObject(markerStart)) {
        _this.markerStartAngle = markerStart.getLocalEulerAngles();
        _this.appendChild(markerStart);
      }
      if (markerMid && isDisplayObject(markerMid)) {
        _this.placeMarkerMid(markerMid);
      }
      if (markerEnd && isDisplayObject(markerEnd)) {
        _this.markerEndAngle = markerEnd.getLocalEulerAngles();
        _this.appendChild(markerEnd);
      }
      _this.transformMarker(true);
      _this.transformMarker(false);
      return _this;
    }
    Polygon2.prototype.attributeChangedCallback = function(attrName, oldValue, newValue, prevParsedValue, newParsedValue) {
      if (attrName === "points") {
        this.transformMarker(true);
        this.transformMarker(false);
        this.placeMarkerMid(this.parsedStyle.markerMid);
      } else if (attrName === "markerStartOffset" || attrName === "markerEndOffset") {
        this.transformMarker(true);
        this.transformMarker(false);
      } else if (attrName === "markerStart") {
        if (prevParsedValue && isDisplayObject(prevParsedValue)) {
          this.markerStartAngle = 0;
          prevParsedValue.remove();
        }
        if (newParsedValue && isDisplayObject(newParsedValue)) {
          this.markerStartAngle = newParsedValue.getLocalEulerAngles();
          this.appendChild(newParsedValue);
          this.transformMarker(true);
        }
      } else if (attrName === "markerEnd") {
        if (prevParsedValue && isDisplayObject(prevParsedValue)) {
          this.markerEndAngle = 0;
          prevParsedValue.remove();
        }
        if (newParsedValue && isDisplayObject(newParsedValue)) {
          this.markerEndAngle = newParsedValue.getLocalEulerAngles();
          this.appendChild(newParsedValue);
          this.transformMarker(false);
        }
      } else if (attrName === "markerMid") {
        this.placeMarkerMid(newParsedValue);
      }
    };
    Polygon2.prototype.transformMarker = function(isStart) {
      var _a = this.parsedStyle, markerStart = _a.markerStart, markerEnd = _a.markerEnd, markerStartOffset = _a.markerStartOffset, markerEndOffset = _a.markerEndOffset, P = _a.points;
      var points = (P || {}).points;
      var marker = isStart ? markerStart : markerEnd;
      if (!marker || !isDisplayObject(marker) || !points) {
        return;
      }
      var rad = 0;
      var x;
      var y;
      var ox;
      var oy;
      var offset;
      var originalAngle;
      ox = points[0][0];
      oy = points[0][1];
      if (isStart) {
        x = points[1][0] - points[0][0];
        y = points[1][1] - points[0][1];
        offset = markerStartOffset || 0;
        originalAngle = this.markerStartAngle;
      } else {
        var length_1 = points.length;
        if (!this.parsedStyle.isClosed) {
          ox = points[length_1 - 1][0];
          oy = points[length_1 - 1][1];
          x = points[length_1 - 2][0] - points[length_1 - 1][0];
          y = points[length_1 - 2][1] - points[length_1 - 1][1];
        } else {
          x = points[length_1 - 1][0] - points[0][0];
          y = points[length_1 - 1][1] - points[0][1];
        }
        offset = markerEndOffset || 0;
        originalAngle = this.markerEndAngle;
      }
      rad = Math.atan2(y, x);
      marker.setLocalEulerAngles(rad * 180 / Math.PI + originalAngle);
      marker.setLocalPosition(ox + Math.cos(rad) * offset, oy + Math.sin(rad) * offset);
    };
    Polygon2.prototype.placeMarkerMid = function(marker) {
      var P = this.parsedStyle.points;
      var points = (P || {}).points;
      this.markerMidList.forEach(function(marker2) {
        marker2.remove();
      });
      this.markerMidList = [];
      if (marker && isDisplayObject(marker) && points) {
        for (var i = 1; i < (this.parsedStyle.isClosed ? points.length : points.length - 1); i++) {
          var ox = points[i][0];
          var oy = points[i][1];
          var cloned = i === 1 ? marker : marker.cloneNode(true);
          this.markerMidList.push(cloned);
          this.appendChild(cloned);
          cloned.setLocalPosition(ox, oy);
        }
      }
    };
    return Polygon2;
  }(DisplayObject)
);
var Polyline = (
  /** @class */
  function(_super) {
    __extends(Polyline2, _super);
    function Polyline2(_a) {
      if (_a === void 0) {
        _a = {};
      }
      var style = _a.style, rest = __rest(_a, ["style"]);
      return _super.call(this, __assign({ type: Shape.POLYLINE, style: runtime.enableCSSParsing ? __assign({ points: "", miterLimit: "", isClosed: false }, style) : __assign({}, style), initialParsedStyle: runtime.enableCSSParsing ? null : {
        points: {
          points: [],
          totalLength: 0,
          segments: []
        },
        miterLimit: 4,
        isClosed: false
      } }, rest)) || this;
    }
    Polyline2.prototype.getTotalLength = function() {
      return getOrCalculatePolylineTotalLength(this);
    };
    Polyline2.prototype.getPointAtLength = function(distance5, inWorldSpace) {
      if (inWorldSpace === void 0) {
        inWorldSpace = false;
      }
      return this.getPoint(distance5 / this.getTotalLength(), inWorldSpace);
    };
    Polyline2.prototype.getPoint = function(ratio, inWorldSpace) {
      if (inWorldSpace === void 0) {
        inWorldSpace = false;
      }
      var points = this.parsedStyle.points.points;
      if (this.parsedStyle.points.segments.length === 0) {
        var segments_1 = [];
        var tempLength_1 = 0;
        var segmentT_1;
        var segmentL_1;
        var totalLength_1 = this.getTotalLength();
        points.forEach(function(p, i) {
          if (points[i + 1]) {
            segmentT_1 = [0, 0];
            segmentT_1[0] = tempLength_1 / totalLength_1;
            segmentL_1 = length$4(p[0], p[1], points[i + 1][0], points[i + 1][1]);
            tempLength_1 += segmentL_1;
            segmentT_1[1] = tempLength_1 / totalLength_1;
            segments_1.push(segmentT_1);
          }
        });
        this.parsedStyle.points.segments = segments_1;
      }
      var subt = 0;
      var index = 0;
      this.parsedStyle.points.segments.forEach(function(v, i) {
        if (ratio >= v[0] && ratio <= v[1]) {
          subt = (ratio - v[0]) / (v[1] - v[0]);
          index = i;
        }
      });
      var _a = pointAt$3(points[index][0], points[index][1], points[index + 1][0], points[index + 1][1], subt), x = _a.x, y = _a.y;
      var transformed = vec3_exports.transformMat4(vec3_exports.create(), vec3_exports.fromValues(x, y, 0), inWorldSpace ? this.getWorldTransform() : this.getLocalTransform());
      return new Point(transformed[0], transformed[1]);
    };
    Polyline2.prototype.getStartTangent = function() {
      var points = this.parsedStyle.points.points;
      var result = [];
      result.push([points[1][0], points[1][1]]);
      result.push([points[0][0], points[0][1]]);
      return result;
    };
    Polyline2.prototype.getEndTangent = function() {
      var points = this.parsedStyle.points.points;
      var l = points.length - 1;
      var result = [];
      result.push([points[l - 1][0], points[l - 1][1]]);
      result.push([points[l][0], points[l][1]]);
      return result;
    };
    return Polyline2;
  }(Polygon)
);
var Rect = (
  /** @class */
  function(_super) {
    __extends(Rect2, _super);
    function Rect2(options) {
      if (options === void 0) {
        options = {};
      }
      return _super.call(this, __assign({ type: Shape.RECT }, options)) || this;
    }
    return Rect2;
  }(DisplayObject)
);
var Text = (
  /** @class */
  function(_super) {
    __extends(Text2, _super);
    function Text2(_a) {
      if (_a === void 0) {
        _a = {};
      }
      var style = _a.style, rest = __rest(_a, ["style"]);
      return _super.call(this, __assign({ type: Shape.TEXT, style: runtime.enableCSSParsing ? __assign({
        x: "",
        y: "",
        text: "",
        fontSize: "",
        fontFamily: "",
        fontStyle: "",
        fontWeight: "",
        fontVariant: "",
        textAlign: "",
        textBaseline: "",
        textTransform: "",
        fill: "black",
        letterSpacing: "",
        lineHeight: "",
        miterLimit: "",
        // whiteSpace: 'pre',
        wordWrap: false,
        wordWrapWidth: 0,
        leading: 0,
        dx: "",
        dy: ""
      }, style) : __assign({ fill: "black" }, style) }, rest)) || this;
    }
    Text2.prototype.getComputedTextLength = function() {
      var _a;
      this.getGeometryBounds();
      return ((_a = this.parsedStyle.metrics) === null || _a === void 0 ? void 0 : _a.maxLineWidth) || 0;
    };
    Text2.prototype.getLineBoundingRects = function() {
      var _a;
      this.getGeometryBounds();
      return ((_a = this.parsedStyle.metrics) === null || _a === void 0 ? void 0 : _a.lineMetrics) || [];
    };
    Text2.prototype.isOverflowing = function() {
      this.getGeometryBounds();
      return !!this.parsedStyle.isOverflowing;
    };
    return Text2;
  }(DisplayObject)
);
var CustomElementRegistry = (
  /** @class */
  function() {
    function CustomElementRegistry2() {
      this.registry = {};
      this.define(Shape.CIRCLE, Circle);
      this.define(Shape.ELLIPSE, Ellipse);
      this.define(Shape.RECT, Rect);
      this.define(Shape.IMAGE, Image);
      this.define(Shape.LINE, Line);
      this.define(Shape.GROUP, Group);
      this.define(Shape.PATH, Path);
      this.define(Shape.POLYGON, Polygon);
      this.define(Shape.POLYLINE, Polyline);
      this.define(Shape.TEXT, Text);
      this.define(Shape.HTML, HTML);
    }
    CustomElementRegistry2.prototype.define = function(name, constructor) {
      this.registry[name] = constructor;
    };
    CustomElementRegistry2.prototype.get = function(name) {
      return this.registry[name];
    };
    return CustomElementRegistry2;
  }()
);
var CSS = {
  /**
   * <number>
   * @see https://drafts.csswg.org/css-values-4/#number-value
   */
  number: function(n) {
    return new CSSUnitValue(n);
  },
  /**
   * <percentage>
   * @see https://drafts.csswg.org/css-values-4/#percentage-value
   */
  percent: function(n) {
    return new CSSUnitValue(n, "%");
  },
  /**
   * <length>
   */
  px: function(n) {
    return new CSSUnitValue(n, "px");
  },
  /**
   * <length>
   */
  em: function(n) {
    return new CSSUnitValue(n, "em");
  },
  rem: function(n) {
    return new CSSUnitValue(n, "rem");
  },
  /**
   * <angle>
   */
  deg: function(n) {
    return new CSSUnitValue(n, "deg");
  },
  /**
   * <angle>
   */
  grad: function(n) {
    return new CSSUnitValue(n, "grad");
  },
  /**
   * <angle>
   */
  rad: function(n) {
    return new CSSUnitValue(n, "rad");
  },
  /**
   * <angle>
   */
  turn: function(n) {
    return new CSSUnitValue(n, "turn");
  },
  /**
   * <time>
   */
  s: function(n) {
    return new CSSUnitValue(n, "s");
  },
  /**
   * <time>
   */
  ms: function(n) {
    return new CSSUnitValue(n, "ms");
  },
  /**
   * CSS Properties & Values API
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API
   * @see https://drafts.css-houdini.org/css-properties-values-api/#registering-custom-properties
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CSS/RegisterProperty
   */
  registerProperty: function(definition) {
    var name = definition.name, inherits = definition.inherits, interpolable = definition.interpolable, initialValue = definition.initialValue, syntax = definition.syntax;
    runtime.styleValueRegistry.registerMetadata({
      n: name,
      inh: inherits,
      int: interpolable,
      d: initialValue,
      syntax
    });
  },
  /**
   * CSS Layout API
   * register layout
   *
   * @see https://github.com/w3c/css-houdini-drafts/blob/main/css-layout-api/EXPLAINER.md
   * @see https://developer.mozilla.org/en-US/docs/Web/Guide/Houdini#css_layout_api
   */
  registerLayout: function(name, clazz) {
    runtime.layoutRegistry.registerLayout(name, clazz);
  }
};
var Document2 = (
  /** @class */
  function(_super) {
    __extends(Document3, _super);
    function Document3() {
      var _this = _super.call(this) || this;
      _this.defaultView = null;
      _this.ownerDocument = null;
      _this.nodeName = "document";
      try {
        _this.timeline = new runtime.AnimationTimeline(_this);
      } catch (e) {
      }
      var initialStyle = {};
      BUILT_IN_PROPERTIES.forEach(function(_a) {
        var n = _a.n, inh = _a.inh, d = _a.d;
        if (inh && d) {
          initialStyle[n] = isFunction(d) ? d(Shape.GROUP) : d;
        }
      });
      _this.documentElement = new Group({
        id: "g-root",
        style: initialStyle
      });
      _this.documentElement.ownerDocument = _this;
      _this.documentElement.parentNode = _this;
      _this.childNodes = [_this.documentElement];
      return _this;
    }
    Object.defineProperty(Document3.prototype, "children", {
      get: function() {
        return this.childNodes;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Document3.prototype, "childElementCount", {
      get: function() {
        return this.childNodes.length;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Document3.prototype, "firstElementChild", {
      get: function() {
        return this.firstChild;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Document3.prototype, "lastElementChild", {
      get: function() {
        return this.lastChild;
      },
      enumerable: false,
      configurable: true
    });
    Document3.prototype.createElement = function(tagName, options) {
      if (tagName === "svg") {
        return this.documentElement;
      }
      var clazz = this.defaultView.customElements.get(tagName);
      if (!clazz) {
        console.warn("Unsupported tagName: ", tagName);
        clazz = tagName === "tspan" ? Text : Group;
      }
      var shape = new clazz(options);
      shape.ownerDocument = this;
      return shape;
    };
    Document3.prototype.createElementNS = function(namespaceURI, tagName, options) {
      return this.createElement(tagName, options);
    };
    Document3.prototype.cloneNode = function(deep) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Document3.prototype.destroy = function() {
      try {
        this.documentElement.destroyChildren();
        this.timeline.destroy();
      } catch (e) {
      }
    };
    Document3.prototype.elementsFromBBox = function(minX, minY, maxX, maxY) {
      var rBush = this.defaultView.context.rBushRoot;
      var rBushNodes = rBush.search({ minX, minY, maxX, maxY });
      var hitTestList = [];
      rBushNodes.forEach(function(_a) {
        var displayObject = _a.displayObject;
        var _b = displayObject.parsedStyle.pointerEvents, pointerEvents = _b === void 0 ? "auto" : _b;
        var isVisibilityAffected = [
          "auto",
          "visiblepainted",
          "visiblefill",
          "visiblestroke",
          "visible"
        ].includes(pointerEvents);
        if ((!isVisibilityAffected || isVisibilityAffected && displayObject.isVisible()) && !displayObject.isCulled() && displayObject.isInteractive()) {
          hitTestList.push(displayObject);
        }
      });
      hitTestList.sort(function(a, b) {
        return b.sortable.renderOrder - a.sortable.renderOrder;
      });
      return hitTestList;
    };
    Document3.prototype.elementFromPointSync = function(x, y) {
      var _a = this.defaultView.canvas2Viewport({
        x,
        y
      }), viewportX = _a.x, viewportY = _a.y;
      var _b = this.defaultView.getConfig(), width = _b.width, height = _b.height;
      if (viewportX < 0 || viewportY < 0 || viewportX > width || viewportY > height) {
        return null;
      }
      var _c = this.defaultView.viewport2Client({
        x: viewportX,
        y: viewportY
      }), clientX = _c.x, clientY = _c.y;
      var picked = this.defaultView.getRenderingService().hooks.pickSync.call({
        topmost: true,
        position: {
          x,
          y,
          viewportX,
          viewportY,
          clientX,
          clientY
        },
        picked: []
      }).picked;
      return picked && picked[0] || this.documentElement;
    };
    Document3.prototype.elementFromPoint = function(x, y) {
      return __awaiter(this, void 0, void 0, function() {
        var _a, viewportX, viewportY, _b, width, height, _c, clientX, clientY, picked;
        return __generator(this, function(_d) {
          switch (_d.label) {
            case 0:
              _a = this.defaultView.canvas2Viewport({
                x,
                y
              }), viewportX = _a.x, viewportY = _a.y;
              _b = this.defaultView.getConfig(), width = _b.width, height = _b.height;
              if (viewportX < 0 || viewportY < 0 || viewportX > width || viewportY > height) {
                return [2, null];
              }
              _c = this.defaultView.viewport2Client({
                x: viewportX,
                y: viewportY
              }), clientX = _c.x, clientY = _c.y;
              return [4, this.defaultView.getRenderingService().hooks.pick.promise({
                topmost: true,
                position: {
                  x,
                  y,
                  viewportX,
                  viewportY,
                  clientX,
                  clientY
                },
                picked: []
              })];
            case 1:
              picked = _d.sent().picked;
              return [2, picked && picked[0] || this.documentElement];
          }
        });
      });
    };
    Document3.prototype.elementsFromPointSync = function(x, y) {
      var _a = this.defaultView.canvas2Viewport({
        x,
        y
      }), viewportX = _a.x, viewportY = _a.y;
      var _b = this.defaultView.getConfig(), width = _b.width, height = _b.height;
      if (viewportX < 0 || viewportY < 0 || viewportX > width || viewportY > height) {
        return [];
      }
      var _c = this.defaultView.viewport2Client({
        x: viewportX,
        y: viewportY
      }), clientX = _c.x, clientY = _c.y;
      var picked = this.defaultView.getRenderingService().hooks.pickSync.call({
        topmost: false,
        position: {
          x,
          y,
          viewportX,
          viewportY,
          clientX,
          clientY
        },
        picked: []
      }).picked;
      if (picked[picked.length - 1] !== this.documentElement) {
        picked.push(this.documentElement);
      }
      return picked;
    };
    Document3.prototype.elementsFromPoint = function(x, y) {
      return __awaiter(this, void 0, void 0, function() {
        var _a, viewportX, viewportY, _b, width, height, _c, clientX, clientY, picked;
        return __generator(this, function(_d) {
          switch (_d.label) {
            case 0:
              _a = this.defaultView.canvas2Viewport({
                x,
                y
              }), viewportX = _a.x, viewportY = _a.y;
              _b = this.defaultView.getConfig(), width = _b.width, height = _b.height;
              if (viewportX < 0 || viewportY < 0 || viewportX > width || viewportY > height) {
                return [2, []];
              }
              _c = this.defaultView.viewport2Client({
                x: viewportX,
                y: viewportY
              }), clientX = _c.x, clientY = _c.y;
              return [4, this.defaultView.getRenderingService().hooks.pick.promise({
                topmost: false,
                position: {
                  x,
                  y,
                  viewportX,
                  viewportY,
                  clientX,
                  clientY
                },
                picked: []
              })];
            case 1:
              picked = _d.sent().picked;
              if (picked[picked.length - 1] !== this.documentElement) {
                picked.push(this.documentElement);
              }
              return [2, picked];
          }
        });
      });
    };
    Document3.prototype.appendChild = function(newChild, index) {
      throw new Error(ERROR_MSG_USE_DOCUMENT_ELEMENT);
    };
    Document3.prototype.insertBefore = function(newChild, refChild) {
      throw new Error(ERROR_MSG_USE_DOCUMENT_ELEMENT);
    };
    Document3.prototype.removeChild = function(oldChild, destroy) {
      throw new Error(ERROR_MSG_USE_DOCUMENT_ELEMENT);
    };
    Document3.prototype.replaceChild = function(newChild, oldChild, destroy) {
      throw new Error(ERROR_MSG_USE_DOCUMENT_ELEMENT);
    };
    Document3.prototype.append = function() {
      throw new Error(ERROR_MSG_USE_DOCUMENT_ELEMENT);
    };
    Document3.prototype.prepend = function() {
      throw new Error(ERROR_MSG_USE_DOCUMENT_ELEMENT);
    };
    Document3.prototype.getElementById = function(id2) {
      return this.documentElement.getElementById(id2);
    };
    Document3.prototype.getElementsByName = function(name) {
      return this.documentElement.getElementsByName(name);
    };
    Document3.prototype.getElementsByTagName = function(tagName) {
      return this.documentElement.getElementsByTagName(tagName);
    };
    Document3.prototype.getElementsByClassName = function(className) {
      return this.documentElement.getElementsByClassName(className);
    };
    Document3.prototype.querySelector = function(selectors) {
      return this.documentElement.querySelector(selectors);
    };
    Document3.prototype.querySelectorAll = function(selectors) {
      return this.documentElement.querySelectorAll(selectors);
    };
    Document3.prototype.find = function(filter2) {
      return this.documentElement.find(filter2);
    };
    Document3.prototype.findAll = function(filter2) {
      return this.documentElement.findAll(filter2);
    };
    return Document3;
  }(Node)
);
var CullingPlugin = (
  /** @class */
  function() {
    function CullingPlugin2(strategies) {
      this.strategies = strategies;
    }
    CullingPlugin2.prototype.apply = function(context) {
      var camera = context.camera, renderingService = context.renderingService, renderingContext = context.renderingContext;
      var strategies = this.strategies;
      renderingService.hooks.cull.tap(CullingPlugin2.tag, function(object) {
        if (object) {
          var cullable = object.cullable;
          if (strategies.length === 0) {
            cullable.visible = renderingContext.unculledEntities.indexOf(object.entity) > -1;
          } else {
            cullable.visible = strategies.every(function(strategy) {
              return strategy.isVisible(camera, object);
            });
          }
          if (!object.isCulled() && object.isVisible()) {
            return object;
          } else {
            object.dispatchEvent(new CustomEvent(ElementEvent.CULLED));
          }
          return null;
        }
        return object;
      });
      renderingService.hooks.afterRender.tap(CullingPlugin2.tag, function(object) {
        object.cullable.visibilityPlaneMask = -1;
      });
    };
    CullingPlugin2.tag = "Culling";
    return CullingPlugin2;
  }()
);
var EventPlugin = (
  /** @class */
  function() {
    function EventPlugin2() {
      var _this = this;
      this.autoPreventDefault = false;
      this.rootPointerEvent = new FederatedPointerEvent(null);
      this.rootWheelEvent = new FederatedWheelEvent(null);
      this.onPointerMove = function(nativeEvent) {
        var e_1, _a;
        var _b, _c;
        var canvas = (_c = (_b = _this.context.renderingContext.root) === null || _b === void 0 ? void 0 : _b.ownerDocument) === null || _c === void 0 ? void 0 : _c.defaultView;
        if (canvas.supportsTouchEvents && nativeEvent.pointerType === "touch")
          return;
        var normalizedEvents = _this.normalizeToPointerEvent(nativeEvent, canvas);
        try {
          for (var normalizedEvents_1 = __values(normalizedEvents), normalizedEvents_1_1 = normalizedEvents_1.next(); !normalizedEvents_1_1.done; normalizedEvents_1_1 = normalizedEvents_1.next()) {
            var normalizedEvent = normalizedEvents_1_1.value;
            var event_1 = _this.bootstrapEvent(_this.rootPointerEvent, normalizedEvent, canvas, nativeEvent);
            _this.context.eventService.mapEvent(event_1);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (normalizedEvents_1_1 && !normalizedEvents_1_1.done && (_a = normalizedEvents_1.return)) _a.call(normalizedEvents_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        _this.setCursor(_this.context.eventService.cursor);
      };
      this.onClick = function(nativeEvent) {
        var e_2, _a;
        var _b, _c;
        var canvas = (_c = (_b = _this.context.renderingContext.root) === null || _b === void 0 ? void 0 : _b.ownerDocument) === null || _c === void 0 ? void 0 : _c.defaultView;
        var normalizedEvents = _this.normalizeToPointerEvent(nativeEvent, canvas);
        try {
          for (var normalizedEvents_2 = __values(normalizedEvents), normalizedEvents_2_1 = normalizedEvents_2.next(); !normalizedEvents_2_1.done; normalizedEvents_2_1 = normalizedEvents_2.next()) {
            var normalizedEvent = normalizedEvents_2_1.value;
            var event_2 = _this.bootstrapEvent(_this.rootPointerEvent, normalizedEvent, canvas, nativeEvent);
            _this.context.eventService.mapEvent(event_2);
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (normalizedEvents_2_1 && !normalizedEvents_2_1.done && (_a = normalizedEvents_2.return)) _a.call(normalizedEvents_2);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
        _this.setCursor(_this.context.eventService.cursor);
      };
    }
    EventPlugin2.prototype.apply = function(context) {
      var _this = this;
      this.context = context;
      var renderingService = context.renderingService;
      var canvas = this.context.renderingContext.root.ownerDocument.defaultView;
      this.context.eventService.setPickHandler(function(position) {
        var picked = _this.context.renderingService.hooks.pickSync.call({
          position,
          picked: [],
          topmost: true
          // we only concern the topmost element
        }).picked;
        return picked[0] || null;
      });
      renderingService.hooks.pointerWheel.tap(EventPlugin2.tag, function(nativeEvent) {
        var wheelEvent = _this.normalizeWheelEvent(nativeEvent);
        _this.context.eventService.mapEvent(wheelEvent);
      });
      renderingService.hooks.pointerDown.tap(EventPlugin2.tag, function(nativeEvent) {
        var e_3, _a;
        if (canvas.supportsTouchEvents && nativeEvent.pointerType === "touch")
          return;
        var events = _this.normalizeToPointerEvent(nativeEvent, canvas);
        if (_this.autoPreventDefault && events[0].isNormalized) {
          var cancelable = nativeEvent.cancelable || !("cancelable" in nativeEvent);
          if (cancelable) {
            nativeEvent.preventDefault();
          }
        }
        try {
          for (var events_1 = __values(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
            var event_3 = events_1_1.value;
            var federatedEvent = _this.bootstrapEvent(_this.rootPointerEvent, event_3, canvas, nativeEvent);
            _this.context.eventService.mapEvent(federatedEvent);
          }
        } catch (e_3_1) {
          e_3 = { error: e_3_1 };
        } finally {
          try {
            if (events_1_1 && !events_1_1.done && (_a = events_1.return)) _a.call(events_1);
          } finally {
            if (e_3) throw e_3.error;
          }
        }
        _this.setCursor(_this.context.eventService.cursor);
      });
      renderingService.hooks.pointerUp.tap(EventPlugin2.tag, function(nativeEvent) {
        var e_4, _a;
        if (canvas.supportsTouchEvents && nativeEvent.pointerType === "touch")
          return;
        var $element = _this.context.contextService.getDomElement();
        var isNativeEventFromCanvas = _this.context.eventService.isNativeEventFromCanvas($element, nativeEvent);
        var outside = !isNativeEventFromCanvas ? "outside" : "";
        var normalizedEvents = _this.normalizeToPointerEvent(nativeEvent, canvas);
        try {
          for (var normalizedEvents_3 = __values(normalizedEvents), normalizedEvents_3_1 = normalizedEvents_3.next(); !normalizedEvents_3_1.done; normalizedEvents_3_1 = normalizedEvents_3.next()) {
            var normalizedEvent = normalizedEvents_3_1.value;
            var event_4 = _this.bootstrapEvent(_this.rootPointerEvent, normalizedEvent, canvas, nativeEvent);
            event_4.type += outside;
            _this.context.eventService.mapEvent(event_4);
          }
        } catch (e_4_1) {
          e_4 = { error: e_4_1 };
        } finally {
          try {
            if (normalizedEvents_3_1 && !normalizedEvents_3_1.done && (_a = normalizedEvents_3.return)) _a.call(normalizedEvents_3);
          } finally {
            if (e_4) throw e_4.error;
          }
        }
        _this.setCursor(_this.context.eventService.cursor);
      });
      renderingService.hooks.pointerMove.tap(EventPlugin2.tag, this.onPointerMove);
      renderingService.hooks.pointerOver.tap(EventPlugin2.tag, this.onPointerMove);
      renderingService.hooks.pointerOut.tap(EventPlugin2.tag, this.onPointerMove);
      renderingService.hooks.click.tap(EventPlugin2.tag, this.onClick);
      renderingService.hooks.pointerCancel.tap(EventPlugin2.tag, function(nativeEvent) {
        var e_5, _a;
        var normalizedEvents = _this.normalizeToPointerEvent(nativeEvent, canvas);
        try {
          for (var normalizedEvents_4 = __values(normalizedEvents), normalizedEvents_4_1 = normalizedEvents_4.next(); !normalizedEvents_4_1.done; normalizedEvents_4_1 = normalizedEvents_4.next()) {
            var normalizedEvent = normalizedEvents_4_1.value;
            var event_5 = _this.bootstrapEvent(_this.rootPointerEvent, normalizedEvent, canvas, nativeEvent);
            _this.context.eventService.mapEvent(event_5);
          }
        } catch (e_5_1) {
          e_5 = { error: e_5_1 };
        } finally {
          try {
            if (normalizedEvents_4_1 && !normalizedEvents_4_1.done && (_a = normalizedEvents_4.return)) _a.call(normalizedEvents_4);
          } finally {
            if (e_5) throw e_5.error;
          }
        }
        _this.setCursor(_this.context.eventService.cursor);
      });
    };
    EventPlugin2.prototype.bootstrapEvent = function(event, normalizedEvent, view, nativeEvent) {
      event.view = view;
      event.originalEvent = null;
      event.nativeEvent = nativeEvent;
      event.pointerId = normalizedEvent.pointerId;
      event.width = normalizedEvent.width;
      event.height = normalizedEvent.height;
      event.isPrimary = normalizedEvent.isPrimary;
      event.pointerType = normalizedEvent.pointerType;
      event.pressure = normalizedEvent.pressure;
      event.tangentialPressure = normalizedEvent.tangentialPressure;
      event.tiltX = normalizedEvent.tiltX;
      event.tiltY = normalizedEvent.tiltY;
      event.twist = normalizedEvent.twist;
      this.transferMouseData(event, normalizedEvent);
      var _a = this.context.eventService.client2Viewport({
        x: normalizedEvent.clientX,
        y: normalizedEvent.clientY
      }), x = _a.x, y = _a.y;
      event.viewport.x = x;
      event.viewport.y = y;
      var _b = this.context.eventService.viewport2Canvas(event.viewport), canvasX = _b.x, canvasY = _b.y;
      event.canvas.x = canvasX;
      event.canvas.y = canvasY;
      event.global.copyFrom(event.canvas);
      event.offset.copyFrom(event.canvas);
      event.isTrusted = nativeEvent.isTrusted;
      if (event.type === "pointerleave") {
        event.type = "pointerout";
      }
      if (event.type.startsWith("mouse")) {
        event.type = event.type.replace("mouse", "pointer");
      }
      if (event.type.startsWith("touch")) {
        event.type = TOUCH_TO_POINTER[event.type] || event.type;
      }
      return event;
    };
    EventPlugin2.prototype.normalizeWheelEvent = function(nativeEvent) {
      var event = this.rootWheelEvent;
      this.transferMouseData(event, nativeEvent);
      event.deltaMode = nativeEvent.deltaMode;
      event.deltaX = nativeEvent.deltaX;
      event.deltaY = nativeEvent.deltaY;
      event.deltaZ = nativeEvent.deltaZ;
      var _a = this.context.eventService.client2Viewport({
        x: nativeEvent.clientX,
        y: nativeEvent.clientY
      }), x = _a.x, y = _a.y;
      event.viewport.x = x;
      event.viewport.y = y;
      var _b = this.context.eventService.viewport2Canvas(event.viewport), canvasX = _b.x, canvasY = _b.y;
      event.canvas.x = canvasX;
      event.canvas.y = canvasY;
      event.global.copyFrom(event.canvas);
      event.offset.copyFrom(event.canvas);
      event.nativeEvent = nativeEvent;
      event.type = nativeEvent.type;
      return event;
    };
    EventPlugin2.prototype.transferMouseData = function(event, nativeEvent) {
      event.isTrusted = nativeEvent.isTrusted;
      event.srcElement = nativeEvent.srcElement;
      event.timeStamp = clock.now();
      event.type = nativeEvent.type;
      event.altKey = nativeEvent.altKey;
      event.metaKey = nativeEvent.metaKey;
      event.shiftKey = nativeEvent.shiftKey;
      event.ctrlKey = nativeEvent.ctrlKey;
      event.button = nativeEvent.button;
      event.buttons = nativeEvent.buttons;
      event.client.x = nativeEvent.clientX;
      event.client.y = nativeEvent.clientY;
      event.movement.x = nativeEvent.movementX;
      event.movement.y = nativeEvent.movementY;
      event.page.x = nativeEvent.pageX;
      event.page.y = nativeEvent.pageY;
      event.screen.x = nativeEvent.screenX;
      event.screen.y = nativeEvent.screenY;
      event.relatedTarget = null;
    };
    EventPlugin2.prototype.setCursor = function(cursor) {
      this.context.contextService.applyCursorStyle(cursor || this.context.config.cursor || "default");
    };
    EventPlugin2.prototype.normalizeToPointerEvent = function(event, canvas) {
      var normalizedEvents = [];
      if (canvas.isTouchEvent(event)) {
        for (var i = 0; i < event.changedTouches.length; i++) {
          var touch = event.changedTouches[i];
          if (is_undefined_default(touch.button))
            touch.button = 0;
          if (is_undefined_default(touch.buttons))
            touch.buttons = 1;
          if (is_undefined_default(touch.isPrimary)) {
            touch.isPrimary = event.touches.length === 1 && event.type === "touchstart";
          }
          if (is_undefined_default(touch.width))
            touch.width = touch.radiusX || 1;
          if (is_undefined_default(touch.height))
            touch.height = touch.radiusY || 1;
          if (is_undefined_default(touch.tiltX))
            touch.tiltX = 0;
          if (is_undefined_default(touch.tiltY))
            touch.tiltY = 0;
          if (is_undefined_default(touch.pointerType))
            touch.pointerType = "touch";
          if (is_undefined_default(touch.pointerId))
            touch.pointerId = touch.identifier || 0;
          if (is_undefined_default(touch.pressure))
            touch.pressure = touch.force || 0.5;
          if (is_undefined_default(touch.twist))
            touch.twist = 0;
          if (is_undefined_default(touch.tangentialPressure))
            touch.tangentialPressure = 0;
          touch.isNormalized = true;
          touch.type = event.type;
          normalizedEvents.push(touch);
        }
      } else if (canvas.isMouseEvent(event)) {
        var tempEvent = event;
        if (is_undefined_default(tempEvent.isPrimary))
          tempEvent.isPrimary = true;
        if (is_undefined_default(tempEvent.width))
          tempEvent.width = 1;
        if (is_undefined_default(tempEvent.height))
          tempEvent.height = 1;
        if (is_undefined_default(tempEvent.tiltX))
          tempEvent.tiltX = 0;
        if (is_undefined_default(tempEvent.tiltY))
          tempEvent.tiltY = 0;
        if (is_undefined_default(tempEvent.pointerType))
          tempEvent.pointerType = "mouse";
        if (is_undefined_default(tempEvent.pointerId))
          tempEvent.pointerId = MOUSE_POINTER_ID;
        if (is_undefined_default(tempEvent.pressure))
          tempEvent.pressure = 0.5;
        if (is_undefined_default(tempEvent.twist))
          tempEvent.twist = 0;
        if (is_undefined_default(tempEvent.tangentialPressure))
          tempEvent.tangentialPressure = 0;
        tempEvent.isNormalized = true;
        normalizedEvents.push(tempEvent);
      } else {
        normalizedEvents.push(event);
      }
      return normalizedEvents;
    };
    EventPlugin2.tag = "Event";
    return EventPlugin2;
  }()
);
var shape2D = [
  Shape.CIRCLE,
  Shape.ELLIPSE,
  Shape.IMAGE,
  Shape.RECT,
  Shape.LINE,
  Shape.POLYLINE,
  Shape.POLYGON,
  Shape.TEXT,
  Shape.PATH,
  Shape.HTML
];
var FrustumCullingStrategy = (
  /** @class */
  function() {
    function FrustumCullingStrategy2() {
    }
    FrustumCullingStrategy2.prototype.isVisible = function(camera, object) {
      var _a, _b;
      var cullable = object.cullable;
      if (!cullable.enable) {
        return true;
      }
      var renderBounds = object.getRenderBounds();
      if (AABB.isEmpty(renderBounds)) {
        return false;
      }
      var frustum2 = camera.getFrustum();
      var parentVisibilityPlaneMask = (_b = (_a = object.parentNode) === null || _a === void 0 ? void 0 : _a.cullable) === null || _b === void 0 ? void 0 : _b.visibilityPlaneMask;
      cullable.visibilityPlaneMask = this.computeVisibilityWithPlaneMask(object, renderBounds, parentVisibilityPlaneMask || Mask.INDETERMINATE, frustum2.planes);
      cullable.visible = cullable.visibilityPlaneMask !== Mask.OUTSIDE;
      return cullable.visible;
    };
    FrustumCullingStrategy2.prototype.computeVisibilityWithPlaneMask = function(object, aabb, parentPlaneMask, planes) {
      if (parentPlaneMask === Mask.OUTSIDE || parentPlaneMask === Mask.INSIDE) {
        return parentPlaneMask;
      }
      var mask = Mask.INSIDE;
      var isShape2D = shape2D.indexOf(object.nodeName) > -1;
      for (var k = 0, len5 = planes.length; k < len5; ++k) {
        var flag = 1 << k;
        if ((parentPlaneMask & flag) === 0) {
          continue;
        }
        if (isShape2D && (k === 4 || k === 5)) {
          continue;
        }
        var _a = planes[k], normal = _a.normal, distance5 = _a.distance;
        if (vec3_exports.dot(normal, aabb.getPositiveFarPoint(planes[k])) + distance5 < 0) {
          return Mask.OUTSIDE;
        }
        if (vec3_exports.dot(normal, aabb.getNegativeFarPoint(planes[k])) + distance5 < 0) {
          mask |= flag;
        }
      }
      return mask;
    };
    return FrustumCullingStrategy2;
  }()
);
var PrepareRendererPlugin = (
  /** @class */
  function() {
    function PrepareRendererPlugin2() {
      this.toSync = /* @__PURE__ */ new Set();
      this.isFirstTimeRendering = true;
      this.syncing = false;
      this.isFirstTimeRenderingFinished = false;
    }
    PrepareRendererPlugin2.prototype.apply = function(context) {
      var _this = this;
      var _a;
      var renderingService = context.renderingService, renderingContext = context.renderingContext, rBushRoot = context.rBushRoot;
      var canvas = renderingContext.root.ownerDocument.defaultView;
      this.rBush = rBushRoot;
      var handleAttributeChanged = function(e) {
        var object = e.target;
        object.renderable.dirty = true;
        renderingService.dirtify();
      };
      var handleBoundsChanged = function(e) {
        var affectChildren = e.detail.affectChildren;
        var object = e.target;
        if (affectChildren) {
          object.forEach(function(node) {
            _this.toSync.add(node);
          });
        }
        var p = object;
        while (p) {
          if (p.renderable) {
            _this.toSync.add(p);
          }
          p = p.parentElement;
        }
        renderingService.dirtify();
      };
      var handleMounted = function(e) {
        var object = e.target;
        if (runtime.enableSizeAttenuation) {
          runtime.styleValueRegistry.updateSizeAttenuation(object, canvas.getCamera().getZoom());
        }
        if (runtime.enableCSSParsing) {
          runtime.styleValueRegistry.recalc(object);
        }
        runtime.sceneGraphService.dirtifyToRoot(object);
        renderingService.dirtify();
      };
      var handleUnmounted = function(e) {
        var object = e.target;
        var rBushNode = object.rBushNode;
        if (rBushNode.aabb) {
          _this.rBush.remove(rBushNode.aabb);
        }
        _this.toSync.delete(object);
        runtime.sceneGraphService.dirtifyToRoot(object);
        renderingService.dirtify();
      };
      renderingService.hooks.init.tap(PrepareRendererPlugin2.tag, function() {
        canvas.addEventListener(ElementEvent.MOUNTED, handleMounted);
        canvas.addEventListener(ElementEvent.UNMOUNTED, handleUnmounted);
        canvas.addEventListener(ElementEvent.ATTR_MODIFIED, handleAttributeChanged);
        canvas.addEventListener(ElementEvent.BOUNDS_CHANGED, handleBoundsChanged);
      });
      renderingService.hooks.destroy.tap(PrepareRendererPlugin2.tag, function() {
        canvas.removeEventListener(ElementEvent.MOUNTED, handleMounted);
        canvas.removeEventListener(ElementEvent.UNMOUNTED, handleUnmounted);
        canvas.removeEventListener(ElementEvent.ATTR_MODIFIED, handleAttributeChanged);
        canvas.removeEventListener(ElementEvent.BOUNDS_CHANGED, handleBoundsChanged);
        _this.toSync.clear();
      });
      var ric = (_a = runtime.globalThis.requestIdleCallback) !== null && _a !== void 0 ? _a : raf.bind(runtime.globalThis);
      renderingService.hooks.endFrame.tap(PrepareRendererPlugin2.tag, function() {
        if (_this.isFirstTimeRendering) {
          _this.isFirstTimeRendering = false;
          _this.syncing = true;
          ric(function() {
            _this.syncRTree(true);
            _this.isFirstTimeRenderingFinished = true;
          });
        } else {
          _this.syncRTree();
        }
      });
    };
    PrepareRendererPlugin2.prototype.syncRTree = function(force) {
      var _this = this;
      if (force === void 0) {
        force = false;
      }
      if (!force && (this.syncing || this.toSync.size === 0)) {
        return;
      }
      this.syncing = true;
      var bulk = [];
      Array.from(this.toSync).filter(function(object) {
        return object.isConnected;
      }).forEach(function(node) {
        var rBushNode = node.rBushNode;
        if (rBushNode && rBushNode.aabb) {
          _this.rBush.remove(rBushNode.aabb);
        }
        var renderBounds = node.getRenderBounds();
        if (renderBounds) {
          var renderable = node.renderable;
          if (force) {
            if (!renderable.dirtyRenderBounds) {
              renderable.dirtyRenderBounds = new AABB();
            }
            renderable.dirtyRenderBounds.update(renderBounds.center, renderBounds.halfExtents);
          }
          var _a = __read(renderBounds.getMin(), 2), minX = _a[0], minY = _a[1];
          var _b = __read(renderBounds.getMax(), 2), maxX = _b[0], maxY = _b[1];
          if (!rBushNode.aabb) {
            rBushNode.aabb = {};
          }
          rBushNode.aabb.displayObject = node;
          rBushNode.aabb.minX = minX;
          rBushNode.aabb.minY = minY;
          rBushNode.aabb.maxX = maxX;
          rBushNode.aabb.maxY = maxY;
        }
        if (rBushNode.aabb) {
          if (!isNaN(rBushNode.aabb.maxX) && !isNaN(rBushNode.aabb.maxX) && !isNaN(rBushNode.aabb.minX) && !isNaN(rBushNode.aabb.minY)) {
            bulk.push(rBushNode.aabb);
          }
        }
      });
      this.rBush.load(bulk);
      bulk.length = 0;
      this.toSync.clear();
      this.syncing = false;
    };
    PrepareRendererPlugin2.tag = "Prepare";
    return PrepareRendererPlugin2;
  }()
);
function isCanvas(value) {
  return !!value.document;
}
var CanvasEvent;
(function(CanvasEvent2) {
  CanvasEvent2["READY"] = "ready";
  CanvasEvent2["BEFORE_RENDER"] = "beforerender";
  CanvasEvent2["RERENDER"] = "rerender";
  CanvasEvent2["AFTER_RENDER"] = "afterrender";
  CanvasEvent2["BEFORE_DESTROY"] = "beforedestroy";
  CanvasEvent2["AFTER_DESTROY"] = "afterdestroy";
  CanvasEvent2["RESIZE"] = "resize";
  CanvasEvent2["DIRTY_RECTANGLE"] = "dirtyrectangle";
  CanvasEvent2["RENDERER_CHANGED"] = "rendererchanged";
})(CanvasEvent || (CanvasEvent = {}));
var DEFAULT_CAMERA_Z = 500;
var DEFAULT_CAMERA_NEAR = 0.1;
var DEFAULT_CAMERA_FAR = 1e3;
var mountedEvent = new CustomEvent(ElementEvent.MOUNTED);
var unmountedEvent = new CustomEvent(ElementEvent.UNMOUNTED);
var beforeRenderEvent = new CustomEvent(CanvasEvent.BEFORE_RENDER);
var rerenderEvent = new CustomEvent(CanvasEvent.RERENDER);
var afterRenderEvent = new CustomEvent(CanvasEvent.AFTER_RENDER);
var Canvas = (
  /** @class */
  function(_super) {
    __extends(Canvas2, _super);
    function Canvas2(config) {
      var _this = _super.call(this) || this;
      _this.Element = DisplayObject;
      _this.inited = false;
      _this.context = {};
      _this.document = new Document2();
      _this.document.defaultView = _this;
      _this.customElements = new CustomElementRegistry();
      var container = config.container, canvas = config.canvas, offscreenCanvas = config.offscreenCanvas, width = config.width, height = config.height, devicePixelRatio = config.devicePixelRatio, renderer = config.renderer, background = config.background, cursor = config.cursor, document2 = config.document, requestAnimationFrame2 = config.requestAnimationFrame, cancelAnimationFrame3 = config.cancelAnimationFrame, createImage = config.createImage, supportsPointerEvents = config.supportsPointerEvents, supportsTouchEvents = config.supportsTouchEvents, supportsCSSTransform = config.supportsCSSTransform, supportsMutipleCanvasesInOneContainer = config.supportsMutipleCanvasesInOneContainer, useNativeClickEvent = config.useNativeClickEvent, alwaysTriggerPointerEventOnCanvas = config.alwaysTriggerPointerEventOnCanvas, isTouchEvent = config.isTouchEvent, isMouseEvent = config.isMouseEvent, dblClickSpeed = config.dblClickSpeed;
      if (!supportsMutipleCanvasesInOneContainer) {
        cleanExistedCanvas(container, _this);
      }
      var canvasWidth = width;
      var canvasHeight = height;
      var dpr = devicePixelRatio;
      if (canvas) {
        dpr = devicePixelRatio || isBrowser && window.devicePixelRatio || 1;
        dpr = dpr >= 1 ? Math.ceil(dpr) : 1;
        canvasWidth = width || getWidth(canvas) || canvas.width / dpr;
        canvasHeight = height || getHeight(canvas) || canvas.height / dpr;
      }
      if (offscreenCanvas) {
        runtime.offscreenCanvas = offscreenCanvas;
      }
      _this.devicePixelRatio = dpr;
      _this.requestAnimationFrame = requestAnimationFrame2 !== null && requestAnimationFrame2 !== void 0 ? requestAnimationFrame2 : raf.bind(runtime.globalThis);
      _this.cancelAnimationFrame = cancelAnimationFrame3 !== null && cancelAnimationFrame3 !== void 0 ? cancelAnimationFrame3 : caf.bind(runtime.globalThis);
      _this.supportsTouchEvents = supportsTouchEvents !== null && supportsTouchEvents !== void 0 ? supportsTouchEvents : "ontouchstart" in runtime.globalThis;
      _this.supportsPointerEvents = supportsPointerEvents !== null && supportsPointerEvents !== void 0 ? supportsPointerEvents : !!runtime.globalThis.PointerEvent;
      _this.isTouchEvent = isTouchEvent !== null && isTouchEvent !== void 0 ? isTouchEvent : function(event) {
        return _this.supportsTouchEvents && event instanceof runtime.globalThis.TouchEvent;
      };
      _this.isMouseEvent = isMouseEvent !== null && isMouseEvent !== void 0 ? isMouseEvent : function(event) {
        return !runtime.globalThis.MouseEvent || event instanceof runtime.globalThis.MouseEvent && (!_this.supportsPointerEvents || !(event instanceof runtime.globalThis.PointerEvent));
      };
      _this.dblClickSpeed = dblClickSpeed !== null && dblClickSpeed !== void 0 ? dblClickSpeed : 200;
      _this.initRenderingContext({
        container,
        canvas,
        width: canvasWidth,
        height: canvasHeight,
        renderer,
        offscreenCanvas,
        devicePixelRatio: dpr,
        cursor: cursor || "default",
        background: background || "transparent",
        createImage,
        document: document2,
        supportsCSSTransform,
        useNativeClickEvent,
        alwaysTriggerPointerEventOnCanvas
      });
      _this.initDefaultCamera(canvasWidth, canvasHeight, renderer.clipSpaceNearZ);
      _this.initRenderer(renderer, true);
      return _this;
    }
    Canvas2.prototype.initRenderingContext = function(mergedConfig) {
      this.context.config = mergedConfig;
      this.context.renderingContext = {
        /**
         * the root node in scene graph
         */
        root: this.document.documentElement,
        renderListCurrentFrame: [],
        unculledEntities: [],
        renderReasons: /* @__PURE__ */ new Set(),
        force: false,
        dirty: false
      };
    };
    Canvas2.prototype.initDefaultCamera = function(width, height, clipSpaceNearZ) {
      var _this = this;
      var camera = new runtime.CameraContribution();
      camera.clipSpaceNearZ = clipSpaceNearZ;
      camera.setType(CameraType.EXPLORING, CameraTrackingMode.DEFAULT).setPosition(width / 2, height / 2, DEFAULT_CAMERA_Z).setFocalPoint(width / 2, height / 2, 0).setOrthographic(width / -2, width / 2, height / 2, height / -2, DEFAULT_CAMERA_NEAR, DEFAULT_CAMERA_FAR);
      camera.canvas = this;
      camera.eventEmitter.on(CameraEvent.UPDATED, function() {
        _this.context.renderingContext.renderReasons.add(RenderReason.CAMERA_CHANGED);
        if (runtime.enableSizeAttenuation && _this.getConfig().renderer.getConfig().enableSizeAttenuation) {
          _this.updateSizeAttenuation();
        }
      });
      this.context.camera = camera;
    };
    Canvas2.prototype.updateSizeAttenuation = function() {
      var zoom = this.getCamera().getZoom();
      this.document.documentElement.forEach(function(node) {
        runtime.styleValueRegistry.updateSizeAttenuation(node, zoom);
      });
    };
    Canvas2.prototype.getConfig = function() {
      return this.context.config;
    };
    Canvas2.prototype.getRoot = function() {
      return this.document.documentElement;
    };
    Canvas2.prototype.getCamera = function() {
      return this.context.camera;
    };
    Canvas2.prototype.getContextService = function() {
      return this.context.contextService;
    };
    Canvas2.prototype.getEventService = function() {
      return this.context.eventService;
    };
    Canvas2.prototype.getRenderingService = function() {
      return this.context.renderingService;
    };
    Canvas2.prototype.getRenderingContext = function() {
      return this.context.renderingContext;
    };
    Canvas2.prototype.getStats = function() {
      return this.getRenderingService().getStats();
    };
    Object.defineProperty(Canvas2.prototype, "ready", {
      // /**
      //  * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
      //  */
      // getComputedStyle(node: DisplayObject) {
      //   return node.computedStyle;
      // }
      get: function() {
        var _this = this;
        if (!this.readyPromise) {
          this.readyPromise = new Promise(function(resolve) {
            _this.resolveReadyPromise = function() {
              resolve(_this);
            };
          });
          if (this.inited) {
            this.resolveReadyPromise();
          }
        }
        return this.readyPromise;
      },
      enumerable: false,
      configurable: true
    });
    Canvas2.prototype.destroy = function(cleanUp, skipTriggerEvent) {
      if (cleanUp === void 0) {
        cleanUp = true;
      }
      if (skipTriggerEvent === void 0) {
        skipTriggerEvent = false;
      }
      if (!skipTriggerEvent) {
        this.dispatchEvent(new CustomEvent(CanvasEvent.BEFORE_DESTROY));
      }
      if (this.frameId) {
        var cancelRAF = this.getConfig().cancelAnimationFrame || cancelAnimationFrame;
        cancelRAF(this.frameId);
      }
      var root2 = this.getRoot();
      this.unmountChildren(root2);
      if (cleanUp) {
        this.document.destroy();
        this.getEventService().destroy();
      }
      this.getRenderingService().destroy();
      this.getContextService().destroy();
      if (cleanUp && this.context.rBushRoot) {
        this.context.rBushRoot.clear();
        this.context.rBushRoot = null;
        this.context.renderingContext.root = null;
      }
      if (!skipTriggerEvent) {
        this.dispatchEvent(new CustomEvent(CanvasEvent.AFTER_DESTROY));
      }
    };
    Canvas2.prototype.changeSize = function(width, height) {
      this.resize(width, height);
    };
    Canvas2.prototype.resize = function(width, height) {
      var canvasConfig = this.context.config;
      canvasConfig.width = width;
      canvasConfig.height = height;
      this.getContextService().resize(width, height);
      var camera = this.context.camera;
      var projectionMode = camera.getProjectionMode();
      camera.setPosition(width / 2, height / 2, DEFAULT_CAMERA_Z).setFocalPoint(width / 2, height / 2, 0);
      if (projectionMode === CameraProjectionMode.ORTHOGRAPHIC) {
        camera.setOrthographic(width / -2, width / 2, height / 2, height / -2, camera.getNear(), camera.getFar());
      } else {
        camera.setAspect(width / height);
      }
      this.dispatchEvent(new CustomEvent(CanvasEvent.RESIZE, { width, height }));
    };
    Canvas2.prototype.appendChild = function(child, index) {
      return this.document.documentElement.appendChild(child, index);
    };
    Canvas2.prototype.insertBefore = function(newChild, refChild) {
      return this.document.documentElement.insertBefore(newChild, refChild);
    };
    Canvas2.prototype.removeChild = function(child) {
      return this.document.documentElement.removeChild(child);
    };
    Canvas2.prototype.removeChildren = function() {
      this.document.documentElement.removeChildren();
    };
    Canvas2.prototype.destroyChildren = function() {
      this.document.documentElement.destroyChildren();
    };
    Canvas2.prototype.render = function(frame) {
      var _this = this;
      if (frame) {
        beforeRenderEvent.detail = frame;
        afterRenderEvent.detail = frame;
      }
      this.dispatchEvent(beforeRenderEvent);
      var renderingService = this.getRenderingService();
      renderingService.render(this.getConfig(), frame, function() {
        _this.dispatchEvent(rerenderEvent);
      });
      this.dispatchEvent(afterRenderEvent);
    };
    Canvas2.prototype.run = function() {
      var _this = this;
      var tick = function(time, frame) {
        _this.render(frame);
        _this.frameId = _this.requestAnimationFrame(tick);
      };
      tick();
    };
    Canvas2.prototype.initRenderer = function(renderer, firstContentfullPaint) {
      var _this = this;
      if (firstContentfullPaint === void 0) {
        firstContentfullPaint = false;
      }
      if (!renderer) {
        throw new Error("Renderer is required.");
      }
      this.inited = false;
      this.readyPromise = void 0;
      this.context.rBushRoot = new RBush();
      this.context.renderingPlugins = [];
      this.context.renderingPlugins.push(
        new EventPlugin(),
        new PrepareRendererPlugin(),
        // new DirtyCheckPlugin(),
        new CullingPlugin([new FrustumCullingStrategy()])
      );
      this.loadRendererContainerModule(renderer);
      this.context.contextService = new this.context.ContextService(__assign(__assign({}, runtime), this.context));
      this.context.renderingService = new RenderingService(runtime, this.context);
      this.context.eventService = new EventService(runtime, this.context);
      this.context.eventService.init();
      if (this.context.contextService.init) {
        this.context.contextService.init();
        this.initRenderingService(renderer, firstContentfullPaint, true);
      } else {
        this.context.contextService.initAsync().then(function() {
          _this.initRenderingService(renderer, firstContentfullPaint);
        });
      }
    };
    Canvas2.prototype.initRenderingService = function(renderer, firstContentfullPaint, async) {
      var _this = this;
      if (firstContentfullPaint === void 0) {
        firstContentfullPaint = false;
      }
      if (async === void 0) {
        async = false;
      }
      this.context.renderingService.init(function() {
        _this.inited = true;
        if (firstContentfullPaint) {
          if (async) {
            _this.requestAnimationFrame(function() {
              _this.dispatchEvent(new CustomEvent(CanvasEvent.READY));
            });
          } else {
            _this.dispatchEvent(new CustomEvent(CanvasEvent.READY));
          }
        } else {
          _this.dispatchEvent(new CustomEvent(CanvasEvent.RENDERER_CHANGED));
        }
        if (_this.readyPromise) {
          _this.resolveReadyPromise();
        }
        if (!firstContentfullPaint) {
          _this.getRoot().forEach(function(node) {
            var renderable = node.renderable;
            if (renderable) {
              renderable.renderBoundsDirty = true;
              renderable.boundsDirty = true;
              renderable.dirty = true;
            }
          });
        }
        _this.mountChildren(_this.getRoot());
        if (renderer.getConfig().enableAutoRendering) {
          _this.run();
        }
      });
    };
    Canvas2.prototype.loadRendererContainerModule = function(renderer) {
      var _this = this;
      var plugins = renderer.getPlugins();
      plugins.forEach(function(plugin) {
        plugin.context = _this.context;
        plugin.init(runtime);
      });
    };
    Canvas2.prototype.setRenderer = function(renderer) {
      var canvasConfig = this.getConfig();
      if (canvasConfig.renderer === renderer) {
        return;
      }
      var oldRenderer = canvasConfig.renderer;
      canvasConfig.renderer = renderer;
      this.destroy(false, true);
      __spreadArray([], __read(oldRenderer === null || oldRenderer === void 0 ? void 0 : oldRenderer.getPlugins()), false).reverse().forEach(function(plugin) {
        plugin.destroy(runtime);
      });
      this.initRenderer(renderer);
    };
    Canvas2.prototype.setCursor = function(cursor) {
      var canvasConfig = this.getConfig();
      canvasConfig.cursor = cursor;
      this.getContextService().applyCursorStyle(cursor);
    };
    Canvas2.prototype.unmountChildren = function(parent) {
      var _this = this;
      parent.childNodes.forEach(function(child) {
        _this.unmountChildren(child);
      });
      if (this.inited) {
        if (parent.isMutationObserved) {
          parent.dispatchEvent(unmountedEvent);
        } else {
          unmountedEvent.target = parent;
          this.dispatchEvent(unmountedEvent, true);
        }
        if (parent !== this.document.documentElement) {
          parent.ownerDocument = null;
        }
        parent.isConnected = false;
      }
      if (parent.isCustomElement) {
        if (parent.disconnectedCallback) {
          parent.disconnectedCallback();
        }
      }
    };
    Canvas2.prototype.mountChildren = function(parent) {
      var _this = this;
      if (this.inited) {
        if (!parent.isConnected) {
          parent.ownerDocument = this.document;
          parent.isConnected = true;
          if (parent.isMutationObserved) {
            parent.dispatchEvent(mountedEvent);
          } else {
            mountedEvent.target = parent;
            this.dispatchEvent(mountedEvent, true);
          }
        }
      } else {
        console.warn("[g]: You are trying to call `canvas.appendChild` before canvas' initialization finished. You can either await `canvas.ready` or listen to `CanvasEvent.READY` manually.", "appended child: ", parent.nodeName);
      }
      parent.childNodes.forEach(function(child) {
        _this.mountChildren(child);
      });
      if (parent.isCustomElement) {
        if (parent.connectedCallback) {
          parent.connectedCallback();
        }
      }
    };
    Canvas2.prototype.client2Viewport = function(client) {
      return this.getEventService().client2Viewport(client);
    };
    Canvas2.prototype.viewport2Client = function(canvas) {
      return this.getEventService().viewport2Client(canvas);
    };
    Canvas2.prototype.viewport2Canvas = function(viewport) {
      return this.getEventService().viewport2Canvas(viewport);
    };
    Canvas2.prototype.canvas2Viewport = function(canvas) {
      return this.getEventService().canvas2Viewport(canvas);
    };
    Canvas2.prototype.getPointByClient = function(clientX, clientY) {
      return this.client2Viewport({ x: clientX, y: clientY });
    };
    Canvas2.prototype.getClientByPoint = function(x, y) {
      return this.viewport2Client({ x, y });
    };
    return Canvas2;
  }(EventTarget)
);

// node_modules/@antv/g-camera-api/dist/index.esm.js
var AdvancedCamera = (
  /** @class */
  function(_super) {
    __extends(AdvancedCamera2, _super);
    function AdvancedCamera2() {
      var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
      _this.landmarks = [];
      return _this;
    }
    AdvancedCamera2.prototype.rotate = function(azimuth, elevation, roll) {
      this.relElevation = getAngle2(elevation);
      this.relAzimuth = getAngle2(azimuth);
      this.relRoll = getAngle2(roll);
      this.elevation += this.relElevation;
      this.azimuth += this.relAzimuth;
      this.roll += this.relRoll;
      if (this.type === CameraType.EXPLORING) {
        var rotX = quat_exports.setAxisAngle(quat_exports.create(), [1, 0, 0], deg2rad((this.rotateWorld ? 1 : -1) * this.relElevation));
        var rotY = quat_exports.setAxisAngle(quat_exports.create(), [0, 1, 0], deg2rad((this.rotateWorld ? 1 : -1) * this.relAzimuth));
        var rotZ = quat_exports.setAxisAngle(quat_exports.create(), [0, 0, 1], deg2rad(this.relRoll));
        var rotQ = quat_exports.multiply(quat_exports.create(), rotY, rotX);
        rotQ = quat_exports.multiply(quat_exports.create(), rotQ, rotZ);
        var rotMatrix = mat4_exports.fromQuat(mat4_exports.create(), rotQ);
        mat4_exports.translate(this.matrix, this.matrix, [0, 0, -this.distance]);
        mat4_exports.multiply(this.matrix, this.matrix, rotMatrix);
        mat4_exports.translate(this.matrix, this.matrix, [0, 0, this.distance]);
      } else {
        if (Math.abs(this.elevation) > 90) {
          return this;
        }
        this.computeMatrix();
      }
      this._getAxes();
      if (this.type === CameraType.ORBITING || this.type === CameraType.EXPLORING) {
        this._getPosition();
      } else if (this.type === CameraType.TRACKING) {
        this._getFocalPoint();
      }
      this._update();
      return this;
    };
    AdvancedCamera2.prototype.pan = function(tx, ty) {
      var coords = createVec3(tx, ty, 0);
      var pos = vec3_exports.clone(this.position);
      vec3_exports.add(pos, pos, vec3_exports.scale(vec3_exports.create(), this.right, coords[0]));
      vec3_exports.add(pos, pos, vec3_exports.scale(vec3_exports.create(), this.up, coords[1]));
      this._setPosition(pos);
      this.triggerUpdate();
      return this;
    };
    AdvancedCamera2.prototype.dolly = function(value) {
      var n = this.forward;
      var pos = vec3_exports.clone(this.position);
      var step2 = value * this.dollyingStep;
      var updatedDistance = this.distance + value * this.dollyingStep;
      step2 = Math.max(Math.min(updatedDistance, this.maxDistance), this.minDistance) - this.distance;
      pos[0] += step2 * n[0];
      pos[1] += step2 * n[1];
      pos[2] += step2 * n[2];
      this._setPosition(pos);
      if (this.type === CameraType.ORBITING || this.type === CameraType.EXPLORING) {
        this._getDistance();
      } else if (this.type === CameraType.TRACKING) {
        vec3_exports.add(this.focalPoint, pos, this.distanceVector);
      }
      this.triggerUpdate();
      return this;
    };
    AdvancedCamera2.prototype.cancelLandmarkAnimation = function() {
      if (this.landmarkAnimationID !== void 0) {
        this.canvas.cancelAnimationFrame(this.landmarkAnimationID);
      }
    };
    AdvancedCamera2.prototype.createLandmark = function(name, params) {
      var _a, _b, _c, _d;
      if (params === void 0) {
        params = {};
      }
      var _e = params.position, position = _e === void 0 ? this.position : _e, _f = params.focalPoint, focalPoint = _f === void 0 ? this.focalPoint : _f, roll = params.roll, zoom = params.zoom;
      var camera = new runtime.CameraContribution();
      camera.setType(this.type, void 0);
      camera.setPosition(position[0], (_a = position[1]) !== null && _a !== void 0 ? _a : this.position[1], (_b = position[2]) !== null && _b !== void 0 ? _b : this.position[2]);
      camera.setFocalPoint(focalPoint[0], (_c = focalPoint[1]) !== null && _c !== void 0 ? _c : this.focalPoint[1], (_d = focalPoint[2]) !== null && _d !== void 0 ? _d : this.focalPoint[2]);
      camera.setRoll(roll !== null && roll !== void 0 ? roll : this.roll);
      camera.setZoom(zoom !== null && zoom !== void 0 ? zoom : this.zoom);
      var landmark = {
        name,
        matrix: mat4_exports.clone(camera.getWorldTransform()),
        right: vec3_exports.clone(camera.right),
        up: vec3_exports.clone(camera.up),
        forward: vec3_exports.clone(camera.forward),
        position: vec3_exports.clone(camera.getPosition()),
        focalPoint: vec3_exports.clone(camera.getFocalPoint()),
        distanceVector: vec3_exports.clone(camera.getDistanceVector()),
        distance: camera.getDistance(),
        dollyingStep: camera.getDollyingStep(),
        azimuth: camera.getAzimuth(),
        elevation: camera.getElevation(),
        roll: camera.getRoll(),
        relAzimuth: camera.relAzimuth,
        relElevation: camera.relElevation,
        relRoll: camera.relRoll,
        zoom: camera.getZoom()
      };
      this.landmarks.push(landmark);
      return landmark;
    };
    AdvancedCamera2.prototype.gotoLandmark = function(name, options) {
      var _this = this;
      if (options === void 0) {
        options = {};
      }
      var landmark = is_string_default(name) ? this.landmarks.find(function(l) {
        return l.name === name;
      }) : name;
      if (landmark) {
        var _a = is_number_default(options) ? { duration: options } : options, _b = _a.easing, easing = _b === void 0 ? "linear" : _b, _c = _a.duration, duration_1 = _c === void 0 ? 100 : _c, _d = _a.easingFunction, easingFunction = _d === void 0 ? void 0 : _d, _e = _a.onfinish, onfinish_1 = _e === void 0 ? void 0 : _e, _f = _a.onframe, onframe_1 = _f === void 0 ? void 0 : _f;
        var epsilon_1 = 0.01;
        this.cancelLandmarkAnimation();
        var destPosition_1 = landmark.position;
        var destFocalPoint_1 = landmark.focalPoint;
        var destZoom_1 = landmark.zoom;
        var destRoll_1 = landmark.roll;
        var easingFunc_1 = easingFunction || runtime.EasingFunction(easing);
        var timeStart_1;
        var end_1 = function() {
          _this.setFocalPoint(destFocalPoint_1);
          _this.setPosition(destPosition_1);
          _this.setRoll(destRoll_1);
          _this.setZoom(destZoom_1);
          _this.computeMatrix();
          _this.triggerUpdate();
          onfinish_1 === null || onfinish_1 === void 0 ? void 0 : onfinish_1();
        };
        if (duration_1 === 0)
          return end_1();
        var animate_1 = function(timestamp) {
          if (timeStart_1 === void 0) {
            timeStart_1 = timestamp;
          }
          var elapsed = timestamp - timeStart_1;
          if (elapsed >= duration_1) {
            end_1();
            return;
          }
          var t = easingFunc_1(elapsed / duration_1);
          var interFocalPoint = vec3_exports.create();
          var interPosition = vec3_exports.create();
          var interZoom = 1;
          var interRoll = 0;
          vec3_exports.lerp(interFocalPoint, _this.focalPoint, destFocalPoint_1, t);
          vec3_exports.lerp(interPosition, _this.position, destPosition_1, t);
          interRoll = _this.roll * (1 - t) + destRoll_1 * t;
          interZoom = _this.zoom * (1 - t) + destZoom_1 * t;
          _this.setFocalPoint(interFocalPoint);
          _this.setPosition(interPosition);
          _this.setRoll(interRoll);
          _this.setZoom(interZoom);
          var dist4 = vec3_exports.dist(interFocalPoint, destFocalPoint_1) + vec3_exports.dist(interPosition, destPosition_1);
          if (dist4 <= epsilon_1 && destZoom_1 == void 0 && destRoll_1 == void 0) {
            return end_1();
          }
          _this.computeMatrix();
          _this.triggerUpdate();
          if (elapsed < duration_1) {
            onframe_1 === null || onframe_1 === void 0 ? void 0 : onframe_1(t);
            _this.landmarkAnimationID = _this.canvas.requestAnimationFrame(animate_1);
          }
        };
        this.canvas.requestAnimationFrame(animate_1);
      }
    };
    return AdvancedCamera2;
  }(Camera)
);
runtime.CameraContribution = AdvancedCamera;

// node_modules/@antv/g-dom-mutation-observer-api/dist/index.esm.js
var MutationRecord = (
  /** @class */
  function() {
    function MutationRecord2(type, target) {
      this.type = type;
      this.target = target;
      this.addedNodes = [];
      this.attributeName = null;
      this.attributeNamespace = null;
      this.nextSibling = null;
      this.oldValue = null;
      this.previousSibling = null;
      this.removedNodes = [];
    }
    MutationRecord2.copy = function(original) {
      var record = new MutationRecord2(original.type, original.target);
      record.addedNodes = original.addedNodes.slice();
      record.removedNodes = original.removedNodes.slice();
      record.previousSibling = original.previousSibling;
      record.nextSibling = original.nextSibling;
      record.attributeName = original.attributeName;
      record.attributeNamespace = original.attributeNamespace;
      record.oldValue = original.oldValue;
      return record;
    };
    return MutationRecord2;
  }()
);
var uidCounter = 0;
var registrationsTable = /* @__PURE__ */ new WeakMap();
var Registration = (
  /** @class */
  function() {
    function Registration2(observer, target, options) {
      this.observer = observer;
      this.target = target;
      this.options = options;
      this.transientObservedNodes = [];
    }
    Registration2.prototype.enqueue = function(record) {
      var records = this.observer.records;
      var length5 = records.length;
      if (records.length > 0) {
        var lastRecord = records[length5 - 1];
        var recordToReplaceLast = selectRecord(lastRecord, record);
        if (recordToReplaceLast) {
          records[length5 - 1] = recordToReplaceLast;
          return;
        }
      } else {
        scheduleCallback(this.observer);
      }
      records[length5] = record;
    };
    Registration2.prototype.addListeners = function() {
      this.addListeners_(this.target);
    };
    Registration2.prototype.addListeners_ = function(node) {
      var options = this.options;
      if (options.attributes)
        node.addEventListener(ElementEvent.ATTR_MODIFIED, this, true);
      if (options.childList)
        node.addEventListener(ElementEvent.INSERTED, this, true);
      if (options.childList || options.subtree)
        node.addEventListener(ElementEvent.REMOVED, this, true);
    };
    Registration2.prototype.removeListeners = function() {
      this.removeListeners_(this.target);
    };
    Registration2.prototype.removeListeners_ = function(node) {
      var options = this.options;
      if (options.attributes)
        node.removeEventListener(ElementEvent.ATTR_MODIFIED, this, true);
      if (options.childList)
        node.removeEventListener(ElementEvent.INSERTED, this, true);
      if (options.childList || options.subtree)
        node.removeEventListener(ElementEvent.REMOVED, this, true);
    };
    Registration2.prototype.removeTransientObservers = function() {
      var transientObservedNodes = this.transientObservedNodes;
      this.transientObservedNodes = [];
      transientObservedNodes.forEach(function(node) {
        this.removeListeners_(node);
        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          if (registrations[i] === this) {
            registrations.splice(i, 1);
            break;
          }
        }
      }, this);
    };
    Registration2.prototype.handleEvent = function(e) {
      e.stopImmediatePropagation();
      var record;
      var target;
      switch (e.type) {
        case ElementEvent.ATTR_MODIFIED:
          var name_1 = e.attrName;
          var namespace_1 = e.relatedNode.namespaceURI;
          target = e.target;
          record = getRecord("attributes", target);
          record.attributeName = name_1;
          record.attributeNamespace = namespace_1;
          var oldValue_1 = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
          forEachAncestorAndObserverEnqueueRecord(target, function(options) {
            if (!options.attributes)
              return;
            if (options.attributeFilter && options.attributeFilter.length && options.attributeFilter.indexOf(name_1) === -1 && options.attributeFilter.indexOf(namespace_1) === -1) {
              return;
            }
            if (options.attributeOldValue)
              return getRecordWithOldValue(oldValue_1);
            return record;
          });
          break;
        case ElementEvent.REMOVED:
        case ElementEvent.INSERTED:
          target = e.relatedNode;
          var changedNode = e.target;
          var addedNodes = void 0;
          var removedNodes = void 0;
          if (e.type === ElementEvent.INSERTED) {
            addedNodes = [changedNode];
            removedNodes = [];
          } else {
            addedNodes = [];
            removedNodes = [changedNode];
          }
          var previousSibling = changedNode.previousSibling;
          var nextSibling = changedNode.nextSibling;
          record = getRecord("childList", target);
          record.addedNodes = addedNodes;
          record.removedNodes = removedNodes;
          record.previousSibling = previousSibling;
          record.nextSibling = nextSibling;
          forEachAncestorAndObserverEnqueueRecord(target, function(options) {
            if (!options.childList)
              return;
            return record;
          });
      }
      clearRecords();
    };
    return Registration2;
  }()
);
var MutationObserver = (
  /** @class */
  function() {
    function MutationObserver2(callback) {
      this.callback = callback;
      this.nodes = [];
      this.records = [];
      this.uid = uidCounter++;
    }
    MutationObserver2.prototype.observe = function(target, options) {
      if (!options.childList && !options.attributes && !options.characterData || // 1.2
      options.attributeOldValue && !options.attributes || // 1.3
      options.attributeFilter && options.attributeFilter.length && !options.attributes || // 1.4
      options.characterDataOldValue && !options.characterData) {
        throw new SyntaxError();
      }
      var registrations = registrationsTable.get(target);
      if (!registrations)
        registrationsTable.set(target, registrations = []);
      var registration;
      for (var i = 0; i < registrations.length; i++) {
        if (registrations[i].observer === this) {
          registration = registrations[i];
          registration.removeListeners();
          registration.options = options;
          break;
        }
      }
      if (!registration) {
        registration = new Registration(this, target, options);
        registrations.push(registration);
        this.nodes.push(target);
      }
      registration.addListeners();
    };
    MutationObserver2.prototype.disconnect = function() {
      var _this = this;
      this.nodes.forEach(function(node) {
        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          var registration = registrations[i];
          if (registration.observer === _this) {
            registration.removeListeners();
            registrations.splice(i, 1);
            break;
          }
        }
      }, this);
      this.records = [];
    };
    MutationObserver2.prototype.takeRecords = function() {
      var copyOfRecords = this.records;
      this.records = [];
      return copyOfRecords;
    };
    return MutationObserver2;
  }()
);
var currentRecord;
var recordWithOldValue;
function getRecord(type, target) {
  return currentRecord = new MutationRecord(type, target);
}
function getRecordWithOldValue(oldValue) {
  if (recordWithOldValue)
    return recordWithOldValue;
  recordWithOldValue = MutationRecord.copy(currentRecord);
  recordWithOldValue.oldValue = oldValue;
  return recordWithOldValue;
}
function clearRecords() {
  currentRecord = recordWithOldValue = void 0;
}
function recordRepresentsCurrentMutation(record) {
  return record === recordWithOldValue || record === currentRecord;
}
function selectRecord(lastRecord, newRecord) {
  if (lastRecord === newRecord)
    return lastRecord;
  if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord))
    return recordWithOldValue;
  return null;
}
function removeTransientObserversFor(observer) {
  observer.nodes.forEach(function(node) {
    var registrations = registrationsTable.get(node);
    if (!registrations)
      return;
    registrations.forEach(function(registration) {
      if (registration.observer === observer)
        registration.removeTransientObservers();
    });
  });
}
function forEachAncestorAndObserverEnqueueRecord(target, callback) {
  for (var node = target; node; node = node.parentNode) {
    var registrations = registrationsTable.get(node);
    if (registrations) {
      for (var j = 0; j < registrations.length; j++) {
        var registration = registrations[j];
        var options = registration.options;
        if (node !== target && !options.subtree)
          continue;
        var record = callback(options);
        if (record)
          registration.enqueue(record);
      }
    }
  }
}
var isScheduled = false;
var scheduledObservers = [];
function scheduleCallback(observer) {
  scheduledObservers.push(observer);
  if (!isScheduled) {
    isScheduled = true;
    if (typeof runtime.globalThis !== "undefined") {
      runtime.globalThis.setTimeout(dispatchCallbacks);
    } else {
      dispatchCallbacks();
    }
  }
}
function dispatchCallbacks() {
  isScheduled = false;
  var observers = scheduledObservers;
  scheduledObservers = [];
  observers.sort(function(o1, o2) {
    return o1.uid - o2.uid;
  });
  var anyNonEmpty = false;
  observers.forEach(function(observer) {
    var queue = observer.takeRecords();
    removeTransientObserversFor(observer);
    if (queue.length) {
      observer.callback(queue, observer);
      anyNonEmpty = true;
    }
  });
  if (anyNonEmpty)
    dispatchCallbacks();
}

// node_modules/@antv/g-web-animations-api/dist/index.esm.js
var AnimationEvent = (
  /** @class */
  function(_super) {
    __extends(AnimationEvent2, _super);
    function AnimationEvent2(manager, target, currentTime, timelineTime) {
      var _this = _super.call(this, manager) || this;
      _this.currentTime = currentTime;
      _this.timelineTime = timelineTime;
      _this.target = target;
      _this.type = "finish";
      _this.bubbles = false;
      _this.currentTarget = target;
      _this.defaultPrevented = false;
      _this.eventPhase = _this.AT_TARGET;
      _this.timeStamp = Date.now();
      _this.currentTime = currentTime;
      _this.timelineTime = timelineTime;
      return _this;
    }
    return AnimationEvent2;
  }(FederatedEvent)
);
var sequenceNumber = 0;
var Animation = (
  /** @class */
  function() {
    function Animation2(effect, timeline) {
      var _a;
      this.currentTimePending = false;
      this._idle = true;
      this._paused = false;
      this._finishedFlag = true;
      this._currentTime = 0;
      this._playbackRate = 1;
      this._inTimeline = true;
      this.effect = effect;
      effect.animation = this;
      this.timeline = timeline;
      this.id = "".concat(sequenceNumber++);
      this._inEffect = !!this.effect.update(0);
      this._totalDuration = Number((_a = this.effect) === null || _a === void 0 ? void 0 : _a.getComputedTiming().endTime);
      this._holdTime = 0;
      this._paused = false;
      this.oldPlayState = "idle";
      this.updatePromises();
    }
    Object.defineProperty(Animation2.prototype, "pending", {
      // animation: InternalAnimation | null;
      /**
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Animation/pending
       */
      get: function() {
        return this._startTime === null && !this._paused && this.playbackRate !== 0 || this.currentTimePending;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Animation2.prototype, "playState", {
      get: function() {
        if (this._idle)
          return "idle";
        if (this._isFinished)
          return "finished";
        if (this._paused)
          return "paused";
        return "running";
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Animation2.prototype, "ready", {
      /**
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Animation/ready
       * @example
        animation.pause();
        animation.ready.then(function() {
          // Displays 'running'
          alert(animation.playState);
        });
        animation.play();
       */
      get: function() {
        var _this = this;
        if (!this.readyPromise) {
          if (this.timeline.animationsWithPromises.indexOf(this) === -1) {
            this.timeline.animationsWithPromises.push(this);
          }
          this.readyPromise = new Promise(function(resolve, reject) {
            _this.resolveReadyPromise = function() {
              resolve(_this);
            };
            _this.rejectReadyPromise = function() {
              reject(new Error());
            };
          });
          if (!this.pending) {
            this.resolveReadyPromise();
          }
        }
        return this.readyPromise;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Animation2.prototype, "finished", {
      /**
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Animation/finished
       * @example
        Promise.all(
          elem.getAnimations().map(
            function(animation) {
              return animation.finished
            }
          )
        ).then(
          function() {
            return elem.remove();
          }
        );
       */
      get: function() {
        var _this = this;
        if (!this.finishedPromise) {
          if (this.timeline.animationsWithPromises.indexOf(this) === -1) {
            this.timeline.animationsWithPromises.push(this);
          }
          this.finishedPromise = new Promise(function(resolve, reject) {
            _this.resolveFinishedPromise = function() {
              resolve(_this);
            };
            _this.rejectFinishedPromise = function() {
              reject(new Error());
            };
          });
          if (this.playState === "finished") {
            this.resolveFinishedPromise();
          }
        }
        return this.finishedPromise;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Animation2.prototype, "currentTime", {
      get: function() {
        this.updatePromises();
        return this._idle || this.currentTimePending ? null : this._currentTime;
      },
      set: function(newTime) {
        var _a;
        newTime = Number(newTime);
        if (isNaN(newTime))
          return;
        this.timeline.restart();
        if (!this._paused && this._startTime !== null) {
          this._startTime = Number((_a = this.timeline) === null || _a === void 0 ? void 0 : _a.currentTime) - newTime / this.playbackRate;
        }
        this.currentTimePending = false;
        if (this._currentTime === newTime) {
          return;
        }
        if (this._idle) {
          this._idle = false;
          this._paused = true;
        }
        this.tickCurrentTime(newTime, true);
        this.timeline.applyDirtiedAnimation(this);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Animation2.prototype, "startTime", {
      get: function() {
        return this._startTime;
      },
      set: function(newTime) {
        if (newTime !== null) {
          this.updatePromises();
          newTime = Number(newTime);
          if (isNaN(newTime))
            return;
          if (this._paused || this._idle)
            return;
          this._startTime = newTime;
          this.tickCurrentTime((Number(this.timeline.currentTime) - this._startTime) * this.playbackRate);
          this.timeline.applyDirtiedAnimation(this);
          this.updatePromises();
        }
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Animation2.prototype, "playbackRate", {
      get: function() {
        return this._playbackRate;
      },
      set: function(value) {
        if (value === this._playbackRate) {
          return;
        }
        this.updatePromises();
        var oldCurrentTime = this.currentTime;
        this._playbackRate = value;
        this.startTime = null;
        if (this.playState !== "paused" && this.playState !== "idle") {
          this._finishedFlag = false;
          this._idle = false;
          this.ensureAlive();
          this.timeline.applyDirtiedAnimation(this);
        }
        if (oldCurrentTime !== null) {
          this.currentTime = oldCurrentTime;
        }
        this.updatePromises();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Animation2.prototype, "_isFinished", {
      get: function() {
        return !this._idle && (this._playbackRate > 0 && Number(this._currentTime) >= this._totalDuration || this._playbackRate < 0 && Number(this._currentTime) <= 0);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Animation2.prototype, "totalDuration", {
      get: function() {
        return this._totalDuration;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Animation2.prototype, "_needsTick", {
      get: function() {
        return this.pending || this.playState === "running" || !this._finishedFlag;
      },
      enumerable: false,
      configurable: true
    });
    Animation2.prototype.updatePromises = function() {
      var oldPlayState = this.oldPlayState;
      var newPlayState = this.pending ? "pending" : this.playState;
      if (this.readyPromise && newPlayState !== oldPlayState) {
        if (newPlayState === "idle") {
          this.rejectReadyPromise();
          this.readyPromise = void 0;
        } else if (oldPlayState === "pending") {
          this.resolveReadyPromise();
        } else if (newPlayState === "pending") {
          this.readyPromise = void 0;
        }
      }
      if (this.finishedPromise && newPlayState !== oldPlayState) {
        if (newPlayState === "idle") {
          this.rejectFinishedPromise();
          this.finishedPromise = void 0;
        } else if (newPlayState === "finished") {
          this.resolveFinishedPromise();
        } else if (oldPlayState === "finished") {
          this.finishedPromise = void 0;
        }
      }
      this.oldPlayState = newPlayState;
      return this.readyPromise || this.finishedPromise;
    };
    Animation2.prototype.play = function() {
      this.updatePromises();
      this._paused = false;
      if (this._isFinished || this._idle) {
        this.rewind();
        this._startTime = null;
      }
      this._finishedFlag = false;
      this._idle = false;
      this.ensureAlive();
      this.timeline.applyDirtiedAnimation(this);
      if (this.timeline.animations.indexOf(this) === -1) {
        this.timeline.animations.push(this);
      }
      this.updatePromises();
    };
    Animation2.prototype.pause = function() {
      this.updatePromises();
      if (this.currentTime) {
        this._holdTime = this.currentTime;
      }
      if (!this._isFinished && !this._paused && !this._idle) {
        this.currentTimePending = true;
      } else if (this._idle) {
        this.rewind();
        this._idle = false;
      }
      this._startTime = null;
      this._paused = true;
      this.updatePromises();
    };
    Animation2.prototype.finish = function() {
      this.updatePromises();
      if (this._idle)
        return;
      this.currentTime = this._playbackRate > 0 ? this._totalDuration : 0;
      this._startTime = this._totalDuration - this.currentTime;
      this.currentTimePending = false;
      this.timeline.applyDirtiedAnimation(this);
      this.updatePromises();
    };
    Animation2.prototype.cancel = function() {
      var _this = this;
      this.updatePromises();
      if (!this._inEffect)
        return;
      this._inEffect = false;
      this._idle = true;
      this._paused = false;
      this._finishedFlag = true;
      this._currentTime = 0;
      this._startTime = null;
      this.effect.update(null);
      this.timeline.applyDirtiedAnimation(this);
      this.updatePromises();
      if (this.oncancel) {
        var event_1 = new AnimationEvent(null, this, this.currentTime, null);
        setTimeout(function() {
          _this.oncancel(event_1);
        });
      }
    };
    Animation2.prototype.reverse = function() {
      this.updatePromises();
      var oldCurrentTime = this.currentTime;
      this.playbackRate *= -1;
      this.play();
      if (oldCurrentTime !== null) {
        this.currentTime = oldCurrentTime;
      }
      this.updatePromises();
    };
    Animation2.prototype.updatePlaybackRate = function(playbackRate) {
      this.playbackRate = playbackRate;
    };
    Animation2.prototype.targetAnimations = function() {
      var _a;
      var target = (_a = this.effect) === null || _a === void 0 ? void 0 : _a.target;
      return target.getAnimations();
    };
    Animation2.prototype.markTarget = function() {
      var animations = this.targetAnimations();
      if (animations.indexOf(this) === -1) {
        animations.push(this);
      }
    };
    Animation2.prototype.unmarkTarget = function() {
      var animations = this.targetAnimations();
      var index = animations.indexOf(this);
      if (index !== -1) {
        animations.splice(index, 1);
      }
    };
    Animation2.prototype.tick = function(timelineTime, isAnimationFrame) {
      if (!this._idle && !this._paused) {
        if (this._startTime === null) {
          if (isAnimationFrame) {
            this.startTime = timelineTime - this._currentTime / this.playbackRate;
          }
        } else if (!this._isFinished) {
          this.tickCurrentTime((timelineTime - this._startTime) * this.playbackRate);
        }
      }
      if (isAnimationFrame) {
        this.currentTimePending = false;
        this.fireEvents(timelineTime);
      }
    };
    Animation2.prototype.rewind = function() {
      if (this.playbackRate >= 0) {
        this.currentTime = 0;
      } else if (this._totalDuration < Infinity) {
        this.currentTime = this._totalDuration;
      } else {
        throw new Error("Unable to rewind negative playback rate animation with infinite duration");
      }
    };
    Animation2.prototype.persist = function() {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Animation2.prototype.addEventListener = function(type, listener, options) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Animation2.prototype.removeEventListener = function(type, listener, options) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Animation2.prototype.dispatchEvent = function(event) {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Animation2.prototype.commitStyles = function() {
      throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
    };
    Animation2.prototype.ensureAlive = function() {
      var _a, _b;
      if (this.playbackRate < 0 && this.currentTime === 0) {
        this._inEffect = !!((_a = this.effect) === null || _a === void 0 ? void 0 : _a.update(-1));
      } else {
        this._inEffect = !!((_b = this.effect) === null || _b === void 0 ? void 0 : _b.update(this.currentTime));
      }
      if (!this._inTimeline && (this._inEffect || !this._finishedFlag)) {
        this._inTimeline = true;
        this.timeline.animations.push(this);
      }
    };
    Animation2.prototype.tickCurrentTime = function(newTime, ignoreLimit) {
      if (newTime !== this._currentTime) {
        this._currentTime = newTime;
        if (this._isFinished && !ignoreLimit) {
          this._currentTime = this._playbackRate > 0 ? this._totalDuration : 0;
        }
        this.ensureAlive();
      }
    };
    Animation2.prototype.fireEvents = function(baseTime) {
      var _this = this;
      if (this._isFinished) {
        if (!this._finishedFlag) {
          if (this.onfinish) {
            var event_2 = new AnimationEvent(null, this, this.currentTime, baseTime);
            setTimeout(function() {
              if (_this.onfinish) {
                _this.onfinish(event_2);
              }
            });
          }
          this._finishedFlag = true;
        }
      } else {
        if (this.onframe && this.playState === "running") {
          var event_3 = new AnimationEvent(null, this, this.currentTime, baseTime);
          this.onframe(event_3);
        }
        this._finishedFlag = false;
      }
    };
    return Animation2;
  }()
);
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 1e-3;
var SUBDIVISION_PRECISION = 1e-7;
var SUBDIVISION_MAX_ITERATIONS = 10;
var kSplineTableSize = 11;
var kSampleStepSize = 1 / (kSplineTableSize - 1);
var float32ArraySupported = typeof Float32Array === "function";
var A2 = function(aA1, aA2) {
  return 1 - 3 * aA2 + 3 * aA1;
};
var B2 = function(aA1, aA2) {
  return 3 * aA2 - 6 * aA1;
};
var C2 = function(aA1) {
  return 3 * aA1;
};
var calcBezier = function(aT, aA1, aA2) {
  return ((A2(aA1, aA2) * aT + B2(aA1, aA2)) * aT + C2(aA1)) * aT;
};
var getSlope = function(aT, aA1, aA2) {
  return 3 * A2(aA1, aA2) * aT * aT + 2 * B2(aA1, aA2) * aT + C2(aA1);
};
var binarySubdivide = function(aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0)
      aB = currentT;
    else
      aA = currentT;
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
};
var newtonRaphsonIterate = function(aX, aGuessT, mX1, mX2) {
  for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
    var currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0)
      return aGuessT;
    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
};
var bezier2 = function(mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1))
    throw new Error("bezier x values must be in [0, 1] range");
  if (mX1 === mY1 && mX2 === mY2)
    return function(t) {
      return t;
    };
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }
  var getTForX = function(aX) {
    var intervalStart = 0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample)
      intervalStart += kSampleStepSize;
    --currentSample;
    var dist4 = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist4 * kSampleStepSize;
    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE)
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    else if (initialSlope === 0)
      return guessForT;
    else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  };
  return function(t) {
    if (t === 0 || t === 1)
      return t;
    return calcBezier(getTForX(t), mY1, mY2);
  };
};
var convertToDash = function(str7) {
  str7 = str7.replace(/([A-Z])/g, function(letter) {
    return "-".concat(letter.toLowerCase());
  });
  return str7.charAt(0) === "-" ? str7.substring(1) : str7;
};
var Quad = function(t) {
  return Math.pow(t, 2);
};
var Cubic = function(t) {
  return Math.pow(t, 3);
};
var Quart = function(t) {
  return Math.pow(t, 4);
};
var Quint = function(t) {
  return Math.pow(t, 5);
};
var Expo = function(t) {
  return Math.pow(t, 6);
};
var Sine = function(t) {
  return 1 - Math.cos(t * Math.PI / 2);
};
var Circ = function(t) {
  return 1 - Math.sqrt(1 - t * t);
};
var Back = function(t) {
  return t * t * (3 * t - 2);
};
var Bounce = function(t) {
  var pow2, b = 4;
  while (t < ((pow2 = Math.pow(2, --b)) - 1) / 11) {
  }
  return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t, 2);
};
var Elastic = function(t, params) {
  if (params === void 0) {
    params = [];
  }
  var _a = __read(params, 2), _b = _a[0], amplitude = _b === void 0 ? 1 : _b, _c = _a[1], period = _c === void 0 ? 0.5 : _c;
  var a = clamp_default(Number(amplitude), 1, 10);
  var p = clamp_default(Number(period), 0.1, 2);
  if (t === 0 || t === 1)
    return t;
  return -a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / (Math.PI * 2) * Math.asin(1 / a)) * (Math.PI * 2) / p);
};
var Spring = function(t, params, duration) {
  if (params === void 0) {
    params = [];
  }
  var _a = __read(params, 4), _b = _a[0], mass = _b === void 0 ? 1 : _b, _c = _a[1], stiffness = _c === void 0 ? 100 : _c, _d = _a[2], damping = _d === void 0 ? 10 : _d, _e = _a[3], velocity = _e === void 0 ? 0 : _e;
  mass = clamp_default(mass, 0.1, 1e3);
  stiffness = clamp_default(stiffness, 0.1, 1e3);
  damping = clamp_default(damping, 0.1, 1e3);
  velocity = clamp_default(velocity, 0.1, 1e3);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a = 1;
  var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
  var progress = duration ? duration * t / 1e3 : t;
  if (zeta < 1) {
    progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
  } else {
    progress = (a + b * progress) * Math.exp(-progress * w0);
  }
  if (t === 0 || t === 1)
    return t;
  return 1 - progress;
};
var Steps = function(t, params) {
  if (params === void 0) {
    params = [];
  }
  var _a = __read(params, 2), _b = _a[0], steps = _b === void 0 ? 10 : _b, type = _a[1];
  var trunc = type == "start" ? Math.ceil : Math.floor;
  return trunc(clamp_default(t, 0, 1) * steps) / steps;
};
var Bezier = function(t, params) {
  if (params === void 0) {
    params = [];
  }
  var _a = __read(params, 4), mX1 = _a[0], mY1 = _a[1], mX2 = _a[2], mY2 = _a[3];
  return bezier2(mX1, mY1, mX2, mY2)(t);
};
var easein = bezier2(0.42, 0, 1, 1);
var EaseOut = function(ease) {
  return function(t, params, duration) {
    if (params === void 0) {
      params = [];
    }
    return 1 - ease(1 - t, params, duration);
  };
};
var EaseInOut = function(ease) {
  return function(t, params, duration) {
    if (params === void 0) {
      params = [];
    }
    return t < 0.5 ? ease(t * 2, params, duration) / 2 : 1 - ease(t * -2 + 2, params, duration) / 2;
  };
};
var EaseOutIn = function(ease) {
  return function(t, params, duration) {
    if (params === void 0) {
      params = [];
    }
    return t < 0.5 ? (1 - ease(1 - t * 2, params, duration)) / 2 : (ease(t * 2 - 1, params, duration) + 1) / 2;
  };
};
var EasingFunctions = {
  steps: Steps,
  "step-start": function(t) {
    return Steps(t, [1, "start"]);
  },
  "step-end": function(t) {
    return Steps(t, [1, "end"]);
  },
  linear: function(t) {
    return t;
  },
  "cubic-bezier": Bezier,
  ease: function(t) {
    return Bezier(t, [0.25, 0.1, 0.25, 1]);
  },
  in: easein,
  out: EaseOut(easein),
  "in-out": EaseInOut(easein),
  "out-in": EaseOutIn(easein),
  "in-quad": Quad,
  "out-quad": EaseOut(Quad),
  "in-out-quad": EaseInOut(Quad),
  "out-in-quad": EaseOutIn(Quad),
  "in-cubic": Cubic,
  "out-cubic": EaseOut(Cubic),
  "in-out-cubic": EaseInOut(Cubic),
  "out-in-cubic": EaseOutIn(Cubic),
  "in-quart": Quart,
  "out-quart": EaseOut(Quart),
  "in-out-quart": EaseInOut(Quart),
  "out-in-quart": EaseOutIn(Quart),
  "in-quint": Quint,
  "out-quint": EaseOut(Quint),
  "in-out-quint": EaseInOut(Quint),
  "out-in-quint": EaseOutIn(Quint),
  "in-expo": Expo,
  "out-expo": EaseOut(Expo),
  "in-out-expo": EaseInOut(Expo),
  "out-in-expo": EaseOutIn(Expo),
  "in-sine": Sine,
  "out-sine": EaseOut(Sine),
  "in-out-sine": EaseInOut(Sine),
  "out-in-sine": EaseOutIn(Sine),
  "in-circ": Circ,
  "out-circ": EaseOut(Circ),
  "in-out-circ": EaseInOut(Circ),
  "out-in-circ": EaseOutIn(Circ),
  "in-back": Back,
  "out-back": EaseOut(Back),
  "in-out-back": EaseInOut(Back),
  "out-in-back": EaseOutIn(Back),
  "in-bounce": Bounce,
  "out-bounce": EaseOut(Bounce),
  "in-out-bounce": EaseInOut(Bounce),
  "out-in-bounce": EaseOutIn(Bounce),
  "in-elastic": Elastic,
  "out-elastic": EaseOut(Elastic),
  "in-out-elastic": EaseInOut(Elastic),
  "out-in-elastic": EaseOutIn(Elastic),
  spring: Spring,
  "spring-in": Spring,
  "spring-out": EaseOut(Spring),
  "spring-in-out": EaseInOut(Spring),
  "spring-out-in": EaseOutIn(Spring)
};
var complexEasingSyntax = function(ease) {
  return convertToDash(ease).replace(/^ease-/, "").replace(/(\(|\s).+/, "").toLowerCase().trim();
};
var getEasingFunction = function(ease) {
  return EasingFunctions[complexEasingSyntax(ease)] || EasingFunctions.linear;
};
var linear = function(x) {
  return x;
};
var Start = 1;
var Middle = 0.5;
var End = 0;
function step(count, pos) {
  return function(x) {
    if (x >= 1) {
      return 1;
    }
    var stepSize = 1 / count;
    x += pos * stepSize;
    return x - x % stepSize;
  };
}
var numberString = "\\s*(-?\\d+\\.?\\d*|-?\\.\\d+)\\s*";
var cubicBezierRe = new RegExp("cubic-bezier\\(" + numberString + "," + numberString + "," + numberString + "," + numberString + "\\)");
var step1Re = /steps\(\s*(\d+)\s*\)/;
var step2Re = /steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/;
function parseEasingFunction(normalizedEasing) {
  var cubicData = cubicBezierRe.exec(normalizedEasing);
  if (cubicData) {
    return bezier2.apply(void 0, __spreadArray([], __read(cubicData.slice(1).map(Number)), false));
  }
  var step1Data = step1Re.exec(normalizedEasing);
  if (step1Data) {
    return step(Number(step1Data[1]), End);
  }
  var step2Data = step2Re.exec(normalizedEasing);
  if (step2Data) {
    return step(Number(step2Data[1]), { start: Start, middle: Middle, end: End }[step2Data[2]]);
  }
  return getEasingFunction(normalizedEasing);
}
function calculateActiveDuration(timing) {
  return Math.abs(repeatedDuration(timing) / (timing.playbackRate || 1));
}
function repeatedDuration(timing) {
  var _a;
  if (timing.duration === 0 || timing.iterations === 0) {
    return 0;
  }
  return (timing.duration === "auto" ? 0 : Number(timing.duration)) * ((_a = timing.iterations) !== null && _a !== void 0 ? _a : 1);
}
var PhaseNone = 0;
var PhaseBefore = 1;
var PhaseAfter = 2;
var PhaseActive = 3;
function calculatePhase(activeDuration, localTime, timing) {
  if (localTime === null) {
    return PhaseNone;
  }
  var endTime = timing.endTime;
  if (localTime < Math.min(timing.delay, endTime)) {
    return PhaseBefore;
  }
  if (localTime >= Math.min(timing.delay + activeDuration + timing.endDelay, endTime)) {
    return PhaseAfter;
  }
  return PhaseActive;
}
function calculateActiveTime(activeDuration, fillMode, localTime, phase, delay) {
  switch (phase) {
    case PhaseBefore:
      if (fillMode === "backwards" || fillMode === "both")
        return 0;
      return null;
    case PhaseActive:
      return localTime - delay;
    case PhaseAfter:
      if (fillMode === "forwards" || fillMode === "both")
        return activeDuration;
      return null;
    case PhaseNone:
      return null;
  }
}
function calculateOverallProgress(iterationDuration, phase, iterations, activeTime, iterationStart) {
  var overallProgress = iterationStart;
  if (iterationDuration === 0) {
    if (phase !== PhaseBefore) {
      overallProgress += iterations;
    }
  } else {
    overallProgress += activeTime / iterationDuration;
  }
  return overallProgress;
}
function calculateSimpleIterationProgress(overallProgress, iterationStart, phase, iterations, activeTime, iterationDuration) {
  var simpleIterationProgress = overallProgress === Infinity ? iterationStart % 1 : overallProgress % 1;
  if (simpleIterationProgress === 0 && phase === PhaseAfter && iterations !== 0 && (activeTime !== 0 || iterationDuration === 0)) {
    simpleIterationProgress = 1;
  }
  return simpleIterationProgress;
}
function calculateCurrentIteration(phase, iterations, simpleIterationProgress, overallProgress) {
  if (phase === PhaseAfter && iterations === Infinity) {
    return Infinity;
  }
  if (simpleIterationProgress === 1) {
    return Math.floor(overallProgress) - 1;
  }
  return Math.floor(overallProgress);
}
function calculateDirectedProgress(playbackDirection, currentIteration, simpleIterationProgress) {
  var currentDirection = playbackDirection;
  if (playbackDirection !== "normal" && playbackDirection !== "reverse") {
    var d = currentIteration;
    if (playbackDirection === "alternate-reverse") {
      d += 1;
    }
    currentDirection = "normal";
    if (d !== Infinity && d % 2 !== 0) {
      currentDirection = "reverse";
    }
  }
  if (currentDirection === "normal") {
    return simpleIterationProgress;
  }
  return 1 - simpleIterationProgress;
}
function calculateIterationProgress(activeDuration, localTime, timing) {
  var phase = calculatePhase(activeDuration, localTime, timing);
  var activeTime = calculateActiveTime(activeDuration, timing.fill, localTime, phase, timing.delay);
  if (activeTime === null)
    return null;
  var duration = timing.duration === "auto" ? 0 : timing.duration;
  var overallProgress = calculateOverallProgress(duration, phase, timing.iterations, activeTime, timing.iterationStart);
  var simpleIterationProgress = calculateSimpleIterationProgress(overallProgress, timing.iterationStart, phase, timing.iterations, activeTime, duration);
  var currentIteration = calculateCurrentIteration(phase, timing.iterations, simpleIterationProgress, overallProgress);
  var directedProgress = calculateDirectedProgress(timing.direction, currentIteration, simpleIterationProgress);
  timing.currentIteration = currentIteration;
  timing.progress = directedProgress;
  return timing.easingFunction(directedProgress);
}
function convertEffectInput(keyframes, timing, target) {
  var propertySpecificKeyframeGroups = makePropertySpecificKeyframeGroups(keyframes, timing);
  var interpolations = makeInterpolations(propertySpecificKeyframeGroups, target);
  return function(target2, fraction) {
    if (fraction !== null) {
      interpolations.filter(function(interpolation) {
        return fraction >= interpolation.applyFrom && fraction < interpolation.applyTo;
      }).forEach(function(interpolation) {
        var offsetFraction = fraction - interpolation.startOffset;
        var localDuration = interpolation.endOffset - interpolation.startOffset;
        var scaledLocalTime = localDuration === 0 ? 0 : offsetFraction / localDuration;
        target2.setAttribute(interpolation.property, interpolation.interpolation(scaledLocalTime), false, false);
      });
    } else {
      for (var property in propertySpecificKeyframeGroups)
        if (isNotReservedWord(property)) {
          target2.setAttribute(property, null);
        }
    }
  };
}
function isNotReservedWord(member) {
  return member !== "offset" && member !== "easing" && member !== "composite" && member !== "computedOffset";
}
function makePropertySpecificKeyframeGroups(keyframes, timing) {
  var propertySpecificKeyframeGroups = {};
  for (var i = 0; i < keyframes.length; i++) {
    for (var member in keyframes[i]) {
      if (isNotReservedWord(member)) {
        var propertySpecificKeyframe = {
          offset: keyframes[i].offset,
          computedOffset: keyframes[i].computedOffset,
          easing: keyframes[i].easing,
          easingFunction: parseEasingFunction(keyframes[i].easing) || timing.easingFunction,
          value: keyframes[i][member]
        };
        propertySpecificKeyframeGroups[member] = propertySpecificKeyframeGroups[member] || [];
        propertySpecificKeyframeGroups[member].push(propertySpecificKeyframe);
      }
    }
  }
  return propertySpecificKeyframeGroups;
}
function makeInterpolations(propertySpecificKeyframeGroups, target) {
  var interpolations = [];
  for (var groupName in propertySpecificKeyframeGroups) {
    var keyframes = propertySpecificKeyframeGroups[groupName];
    for (var i = 0; i < keyframes.length - 1; i++) {
      var startIndex = i;
      var endIndex = i + 1;
      var startOffset = keyframes[startIndex].computedOffset;
      var endOffset = keyframes[endIndex].computedOffset;
      var applyFrom = startOffset;
      var applyTo = endOffset;
      if (i === 0) {
        applyFrom = -Infinity;
        if (endOffset === 0) {
          endIndex = startIndex;
        }
      }
      if (i === keyframes.length - 2) {
        applyTo = Infinity;
        if (startOffset === 1) {
          startIndex = endIndex;
        }
      }
      interpolations.push({
        applyFrom,
        applyTo,
        startOffset: keyframes[startIndex].computedOffset,
        endOffset: keyframes[endIndex].computedOffset,
        easingFunction: keyframes[startIndex].easingFunction,
        property: groupName,
        interpolation: propertyInterpolation(groupName, keyframes[startIndex].value, keyframes[endIndex].value, target)
      });
    }
  }
  interpolations.sort(function(leftInterpolation, rightInterpolation) {
    return leftInterpolation.startOffset - rightInterpolation.startOffset;
  });
  return interpolations;
}
var InterpolationFactory = function(from, to, convertToString) {
  return function(f) {
    var interpolated = interpolate(from, to, f);
    return !runtime.enableCSSParsing && is_number_default(interpolated) ? interpolated : convertToString(interpolated);
  };
};
function propertyInterpolation(property, left, right, target) {
  var metadata = propertyMetadataCache[property];
  if (metadata && metadata.syntax && metadata.int) {
    var propertyHandler = runtime.styleValueRegistry.getPropertySyntax(metadata.syntax);
    if (propertyHandler) {
      var usedLeft = void 0;
      var usedRight = void 0;
      if (runtime.enableCSSParsing) {
        var computedLeft = runtime.styleValueRegistry.parseProperty(property, left, target, false);
        var computedRight = runtime.styleValueRegistry.parseProperty(property, right, target, false);
        usedLeft = runtime.styleValueRegistry.computeProperty(property, computedLeft, target, false);
        usedRight = runtime.styleValueRegistry.computeProperty(property, computedRight, target, false);
      } else {
        var parser = propertyHandler.parserWithCSSDisabled;
        usedLeft = parser ? parser(left, target) : left;
        usedRight = parser ? parser(right, target) : right;
      }
      var interpolationArgs = propertyHandler.mixer(usedLeft, usedRight, target);
      if (interpolationArgs) {
        var interp_1 = InterpolationFactory.apply(void 0, __spreadArray([], __read(interpolationArgs), false));
        return function(t) {
          if (t === 0)
            return left;
          if (t === 1)
            return right;
          return interp_1(t);
        };
      }
    }
  }
  return InterpolationFactory(false, true, function(bool) {
    return bool ? right : left;
  });
}
function interpolate(from, to, f) {
  if (typeof from === "number" && typeof to === "number") {
    return from * (1 - f) + to * f;
  }
  if (typeof from === "boolean" && typeof to === "boolean" || typeof from === "string" && typeof to === "string") {
    return f < 0.5 ? from : to;
  }
  if (Array.isArray(from) && Array.isArray(to)) {
    var fromLength = from.length;
    var toLength = to.length;
    var length_1 = Math.max(fromLength, toLength);
    var r = [];
    for (var i = 0; i < length_1; i++) {
      r.push(interpolate(from[i < fromLength ? i : fromLength - 1], to[i < toLength ? i : toLength - 1], f));
    }
    return r;
  }
  throw new Error("Mismatched interpolation arguments " + from + ":" + to);
}
var AnimationEffectTiming = (
  /** @class */
  function() {
    function AnimationEffectTiming2() {
      this.delay = 0;
      this.direction = "normal";
      this.duration = "auto";
      this._easing = "linear";
      this.easingFunction = linear;
      this.endDelay = 0;
      this.fill = "auto";
      this.iterationStart = 0;
      this.iterations = 1;
      this.currentIteration = null;
      this.progress = null;
    }
    Object.defineProperty(AnimationEffectTiming2.prototype, "easing", {
      get: function() {
        return this._easing;
      },
      set: function(value) {
        this.easingFunction = parseEasingFunction(value);
        this._easing = value;
      },
      enumerable: false,
      configurable: true
    });
    return AnimationEffectTiming2;
  }()
);
function convertToArrayForm(effectInput) {
  var normalizedEffectInput = [];
  for (var property in effectInput) {
    if (property in ["easing", "offset", "composite"]) {
      continue;
    }
    var values = effectInput[property];
    if (!Array.isArray(values)) {
      values = [values];
    }
    var numKeyframes = values.length;
    for (var i = 0; i < numKeyframes; i++) {
      if (!normalizedEffectInput[i]) {
        var keyframe = {};
        if ("offset" in effectInput) {
          keyframe.offset = Number(effectInput.offset);
        }
        if ("easing" in effectInput) {
          keyframe.easing = effectInput.easing;
        }
        if ("composite" in effectInput) {
          keyframe.composite = effectInput.composite;
        }
        normalizedEffectInput[i] = keyframe;
      }
      if (values[i] !== void 0 && values[i] !== null) {
        normalizedEffectInput[i][property] = values[i];
      }
    }
  }
  normalizedEffectInput.sort(function(a, b) {
    return (a.computedOffset || 0) - (b.computedOffset || 0);
  });
  return normalizedEffectInput;
}
function normalizeKeyframes(effectInput, timing) {
  if (effectInput === null) {
    return [];
  }
  if (!Array.isArray(effectInput)) {
    effectInput = convertToArrayForm(effectInput);
  }
  var keyframes = effectInput.map(function(originalKeyframe) {
    var keyframe = {};
    if (timing === null || timing === void 0 ? void 0 : timing.composite) {
      keyframe.composite = "auto";
    }
    for (var member in originalKeyframe) {
      var memberValue = originalKeyframe[member];
      if (member === "offset") {
        if (memberValue !== null) {
          memberValue = Number(memberValue);
          if (!isFinite(memberValue))
            throw new Error("Keyframe offsets must be numbers.");
          if (memberValue < 0 || memberValue > 1)
            throw new Error("Keyframe offsets must be between 0 and 1.");
          keyframe.computedOffset = memberValue;
        }
      } else if (member === "composite") {
        if (["replace", "add", "accumulate", "auto"].indexOf(memberValue) === -1) {
          throw new Error("".concat(memberValue, " compositing is not supported"));
        }
      } else ;
      keyframe[member] = memberValue;
    }
    if (keyframe.offset === void 0) {
      keyframe.offset = null;
    }
    if (keyframe.easing === void 0) {
      keyframe.easing = (timing === null || timing === void 0 ? void 0 : timing.easing) || "linear";
    }
    if (keyframe.composite === void 0) {
      keyframe.composite = "auto";
    }
    return keyframe;
  });
  var everyFrameHasOffset = true;
  var previousOffset = -Infinity;
  for (var i = 0; i < keyframes.length; i++) {
    var offset = keyframes[i].offset;
    if (!is_nil_default(offset)) {
      if (offset < previousOffset) {
        throw new TypeError("Keyframes are not loosely sorted by offset. Sort or specify offsets.");
      }
      previousOffset = offset;
    } else {
      everyFrameHasOffset = false;
    }
  }
  keyframes = keyframes.filter(function(keyframe) {
    return Number(keyframe.offset) >= 0 && Number(keyframe.offset) <= 1;
  });
  function spaceKeyframes() {
    var _a, _b;
    var length5 = keyframes.length;
    keyframes[length5 - 1].computedOffset = Number((_a = keyframes[length5 - 1].offset) !== null && _a !== void 0 ? _a : 1);
    if (length5 > 1) {
      keyframes[0].computedOffset = Number((_b = keyframes[0].offset) !== null && _b !== void 0 ? _b : 0);
    }
    var previousIndex = 0;
    var previousOffset2 = Number(keyframes[0].computedOffset);
    for (var i2 = 1; i2 < length5; i2++) {
      var offset2 = keyframes[i2].computedOffset;
      if (!is_nil_default(offset2) && !is_nil_default(previousOffset2)) {
        for (var j = 1; j < i2 - previousIndex; j++)
          keyframes[previousIndex + j].computedOffset = previousOffset2 + (Number(offset2) - previousOffset2) * j / (i2 - previousIndex);
        previousIndex = i2;
        previousOffset2 = Number(offset2);
      }
    }
  }
  if (!everyFrameHasOffset)
    spaceKeyframes();
  return keyframes;
}
var fills = "backwards|forwards|both|none".split("|");
var directions = "reverse|alternate|alternate-reverse".split("|");
function makeTiming(timingInput, forGroup) {
  var timing = new AnimationEffectTiming();
  if (forGroup) {
    timing.fill = "both";
    timing.duration = "auto";
  }
  if (typeof timingInput === "number" && !isNaN(timingInput)) {
    timing.duration = timingInput;
  } else if (timingInput !== void 0) {
    Object.keys(timingInput).forEach(function(property) {
      if (timingInput[property] !== void 0 && timingInput[property] !== null && timingInput[property] !== "auto") {
        if (typeof timing[property] === "number" || property === "duration") {
          if (typeof timingInput[property] !== "number" || isNaN(timingInput[property])) {
            return;
          }
        }
        if (property === "fill" && fills.indexOf(timingInput[property]) === -1) {
          return;
        }
        if (property === "direction" && directions.indexOf(timingInput[property]) === -1) {
          return;
        }
        timing[property] = timingInput[property];
      }
    });
  }
  return timing;
}
function normalizeTimingInput(timingInput, forGroup) {
  timingInput = numericTimingToObject(timingInput !== null && timingInput !== void 0 ? timingInput : { duration: "auto" });
  return makeTiming(timingInput, forGroup);
}
function numericTimingToObject(timingInput) {
  if (typeof timingInput === "number") {
    if (isNaN(timingInput)) {
      timingInput = { duration: "auto" };
    } else {
      timingInput = { duration: timingInput };
    }
  }
  return timingInput;
}
var KeyframeEffect = (
  /** @class */
  function() {
    function KeyframeEffect2(target, effectInput, timingInput) {
      var _this = this;
      this.composite = "replace";
      this.iterationComposite = "replace";
      this.target = target;
      this.timing = normalizeTimingInput(timingInput, false);
      this.timing.effect = this;
      this.timing.activeDuration = calculateActiveDuration(this.timing);
      this.timing.endTime = Math.max(0, this.timing.delay + this.timing.activeDuration + this.timing.endDelay);
      this.normalizedKeyframes = normalizeKeyframes(effectInput, this.timing);
      this.interpolations = convertEffectInput(this.normalizedKeyframes, this.timing, this.target);
      var Proxy2 = runtime.globalThis.Proxy;
      this.computedTiming = Proxy2 ? new Proxy2(this.timing, {
        get: function(target2, prop) {
          if (prop === "duration") {
            return target2.duration === "auto" ? 0 : target2.duration;
          } else if (prop === "fill") {
            return target2.fill === "auto" ? "none" : target2.fill;
          } else if (prop === "localTime") {
            return _this.animation && _this.animation.currentTime || null;
          } else if (prop === "currentIteration") {
            if (!_this.animation || _this.animation.playState !== "running") {
              return null;
            }
            return target2.currentIteration || 0;
          } else if (prop === "progress") {
            if (!_this.animation || _this.animation.playState !== "running") {
              return null;
            }
            return target2.progress || 0;
          }
          return target2[prop];
        },
        set: function() {
          return true;
        }
      }) : this.timing;
    }
    KeyframeEffect2.prototype.applyInterpolations = function() {
      this.interpolations(this.target, Number(this.timeFraction));
    };
    KeyframeEffect2.prototype.update = function(localTime) {
      if (localTime === null) {
        return false;
      }
      this.timeFraction = calculateIterationProgress(this.timing.activeDuration, localTime, this.timing);
      return this.timeFraction !== null;
    };
    KeyframeEffect2.prototype.getKeyframes = function() {
      return this.normalizedKeyframes;
    };
    KeyframeEffect2.prototype.setKeyframes = function(keyframes) {
      this.normalizedKeyframes = normalizeKeyframes(keyframes);
    };
    KeyframeEffect2.prototype.getComputedTiming = function() {
      return this.computedTiming;
    };
    KeyframeEffect2.prototype.getTiming = function() {
      return this.timing;
    };
    KeyframeEffect2.prototype.updateTiming = function(timing) {
      var _this = this;
      Object.keys(timing || {}).forEach(function(name) {
        _this.timing[name] = timing[name];
      });
    };
    return KeyframeEffect2;
  }()
);
function compareAnimations(leftAnimation, rightAnimation) {
  return Number(leftAnimation.id) - Number(rightAnimation.id);
}
var AnimationTimeline = (
  /** @class */
  function() {
    function AnimationTimeline2(document2) {
      var _this = this;
      this.document = document2;
      this.animations = [];
      this.ticking = false;
      this.timelineTicking = false;
      this.hasRestartedThisFrame = false;
      this.animationsWithPromises = [];
      this.inTick = false;
      this.pendingEffects = [];
      this.currentTime = null;
      this.rafId = 0;
      this.rafCallbacks = [];
      this.webAnimationsNextTick = function(t) {
        _this.currentTime = t;
        _this.discardAnimations();
        if (_this.animations.length === 0) {
          _this.timelineTicking = false;
        } else {
          _this.requestAnimationFrame(_this.webAnimationsNextTick);
        }
      };
      this.processRafCallbacks = function(t) {
        var processing = _this.rafCallbacks;
        _this.rafCallbacks = [];
        if (t < Number(_this.currentTime))
          t = Number(_this.currentTime);
        _this.animations.sort(compareAnimations);
        _this.animations = _this.tick(t, true, _this.animations)[0];
        processing.forEach(function(entry) {
          entry[1](t);
        });
        _this.applyPendingEffects();
      };
    }
    AnimationTimeline2.prototype.getAnimations = function() {
      this.discardAnimations();
      return this.animations.slice();
    };
    AnimationTimeline2.prototype.isTicking = function() {
      return this.inTick;
    };
    AnimationTimeline2.prototype.play = function(target, keyframes, options) {
      var effect = new KeyframeEffect(target, keyframes, options);
      var animation = new Animation(effect, this);
      this.animations.push(animation);
      this.restartWebAnimationsNextTick();
      animation.updatePromises();
      animation.play();
      animation.updatePromises();
      return animation;
    };
    AnimationTimeline2.prototype.applyDirtiedAnimation = function(animation) {
      var _this = this;
      if (this.inTick) {
        return;
      }
      animation.markTarget();
      var animations = animation.targetAnimations();
      animations.sort(compareAnimations);
      var inactiveAnimations = this.tick(Number(this.currentTime), false, animations.slice())[1];
      inactiveAnimations.forEach(function(animation2) {
        var index = _this.animations.indexOf(animation2);
        if (index !== -1) {
          _this.animations.splice(index, 1);
        }
      });
      this.applyPendingEffects();
    };
    AnimationTimeline2.prototype.restart = function() {
      if (!this.ticking) {
        this.ticking = true;
        this.requestAnimationFrame(function() {
        });
        this.hasRestartedThisFrame = true;
      }
      return this.hasRestartedThisFrame;
    };
    AnimationTimeline2.prototype.destroy = function() {
      this.document.defaultView.cancelAnimationFrame(this.frameId);
    };
    AnimationTimeline2.prototype.applyPendingEffects = function() {
      this.pendingEffects.forEach(function(effect) {
        effect === null || effect === void 0 ? void 0 : effect.applyInterpolations();
      });
      this.pendingEffects = [];
    };
    AnimationTimeline2.prototype.updateAnimationsPromises = function() {
      this.animationsWithPromises = this.animationsWithPromises.filter(function(animation) {
        return animation.updatePromises();
      });
    };
    AnimationTimeline2.prototype.discardAnimations = function() {
      this.updateAnimationsPromises();
      this.animations = this.animations.filter(function(animation) {
        return animation.playState !== "finished" && animation.playState !== "idle";
      });
    };
    AnimationTimeline2.prototype.restartWebAnimationsNextTick = function() {
      if (!this.timelineTicking) {
        this.timelineTicking = true;
        this.requestAnimationFrame(this.webAnimationsNextTick);
      }
    };
    AnimationTimeline2.prototype.rAF = function(f) {
      var id2 = this.rafId++;
      if (this.rafCallbacks.length === 0) {
        this.frameId = this.document.defaultView.requestAnimationFrame(this.processRafCallbacks);
      }
      this.rafCallbacks.push([id2, f]);
      return id2;
    };
    AnimationTimeline2.prototype.requestAnimationFrame = function(f) {
      var _this = this;
      return this.rAF(function(x) {
        _this.updateAnimationsPromises();
        f(x);
        _this.updateAnimationsPromises();
      });
    };
    AnimationTimeline2.prototype.tick = function(t, isAnimationFrame, updatingAnimations) {
      var _a, _b;
      var _this = this;
      this.inTick = true;
      this.hasRestartedThisFrame = false;
      this.currentTime = t;
      this.ticking = false;
      var newPendingClears = [];
      var newPendingEffects = [];
      var activeAnimations = [];
      var inactiveAnimations = [];
      updatingAnimations.forEach(function(animation) {
        animation.tick(t, isAnimationFrame);
        if (!animation._inEffect) {
          newPendingClears.push(animation.effect);
          animation.unmarkTarget();
        } else {
          newPendingEffects.push(animation.effect);
          animation.markTarget();
        }
        if (animation._needsTick)
          _this.ticking = true;
        var alive = animation._inEffect || animation._needsTick;
        animation._inTimeline = alive;
        if (alive) {
          activeAnimations.push(animation);
        } else {
          inactiveAnimations.push(animation);
        }
      });
      (_a = this.pendingEffects).push.apply(_a, __spreadArray([], __read(newPendingClears), false));
      (_b = this.pendingEffects).push.apply(_b, __spreadArray([], __read(newPendingEffects), false));
      if (this.ticking)
        this.requestAnimationFrame(function() {
        });
      this.inTick = false;
      return [activeAnimations, inactiveAnimations];
    };
    return AnimationTimeline2;
  }()
);
runtime.EasingFunction = parseEasingFunction;
runtime.AnimationTimeline = AnimationTimeline;

export {
  __extends,
  __assign,
  __rest,
  __awaiter,
  __generator,
  __values,
  __read,
  __spreadArray,
  __classPrivateFieldGet,
  mat4_exports,
  vec3_exports,
  difference_default,
  is_function_default,
  is_nil_default,
  is_array_default,
  is_object_default,
  is_plain_object_default,
  max_default,
  min_default,
  is_string_default,
  uniq,
  group_by_default,
  clamp_default,
  is_number_default,
  max_by_default,
  min_by_default,
  lower_first_default,
  substitute_default,
  upper_first_default,
  is_boolean_default,
  is_date_default,
  is_null_default,
  is_undefined_default,
  is_element_default,
  mix,
  clone_default,
  debounce_default,
  memoize_default,
  deep_mix_default,
  is_empty_default,
  is_equal_default,
  get_default,
  set_default,
  pick_default,
  omit_default,
  throttle_default,
  unique_id_default,
  noop_default,
  identity_default,
  arcToCubic,
  distanceSquareRoot,
  createDOM,
  distance4 as distance,
  pointToLine,
  pointDistance$3,
  pointDistance,
  RBush,
  Shape,
  ClipSpaceNearZ,
  AbstractRendererPlugin,
  AbstractRenderer,
  getAngle2 as getAngle,
  createVec3,
  deg2rad,
  rad2deg,
  grad2deg,
  deg2turn,
  turn2deg,
  getEuler,
  fromRotationTranslationScale2 as fromRotationTranslationScale,
  decompose,
  AABB,
  Plane,
  Mask,
  Frustum,
  Point,
  Rectangle,
  ERROR_MSG_METHOD_NOT_IMPLEMENTED,
  CameraType,
  CameraTrackingMode,
  CameraProjectionMode,
  CameraEvent,
  Camera,
  UnitType,
  CSSStyleValue,
  GradientType,
  CSSGradientValue,
  CSSKeywordValue,
  definedProps,
  CSSUnitValue,
  CSSRGB,
  Strategy,
  SortReason,
  PropertySyntax,
  computeLinearGradient,
  computeRadialGradient,
  isCSSGradientValue,
  isPattern,
  isCSSRGB,
  parseColor,
  mergeColors,
  parseLength,
  getOrCalculatePathTotalLength,
  convertToPath,
  translatePathToString,
  parsePath,
  parseTransform,
  BUILT_IN_PROPERTIES,
  propertyMetadataCache,
  isBrowser,
  findClosestClipPathTarget,
  setDOMSize,
  isFillOrStrokeAffected,
  parsedTransformToMat4,
  CircleUpdater,
  EllipseUpdater,
  LineUpdater,
  PathUpdater,
  PolylineUpdater,
  RectUpdater,
  TextUpdater,
  GroupUpdater,
  HTMLUpdater,
  isFederatedEvent,
  FederatedEvent,
  FederatedMouseEvent,
  FederatedPointerEvent,
  FederatedWheelEvent,
  CustomEvent,
  EventTarget,
  Node,
  EventService,
  OffscreenCanvasCreator,
  RenderReason,
  RenderingService,
  DefaultSceneGraphSelector,
  MutationEvent,
  ElementEvent,
  DefaultSceneGraphService,
  TextService,
  runtime,
  resetEntityCounter,
  Element2 as Element,
  isDisplayObject,
  DisplayObject,
  Circle,
  CustomElement,
  Ellipse,
  Group,
  HTML,
  Image,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Text,
  CustomElementRegistry,
  CSS,
  Document2 as Document,
  isCanvas,
  CanvasEvent,
  Canvas,
  AdvancedCamera,
  MutationRecord,
  Registration,
  MutationObserver,
  AnimationEvent,
  Animation,
  EasingFunctions,
  normalizeKeyframes,
  makeTiming,
  normalizeTimingInput,
  numericTimingToObject,
  KeyframeEffect,
  compareAnimations,
  AnimationTimeline
};
//# sourceMappingURL=chunk-4O3MD7LZ.js.map
