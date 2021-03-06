/* */ 
"format cjs";
(function(process) {
  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Ractive = factory();
  }(this, function() {
    'use strict';
    var TEMPLATE_VERSION = 3;
    var defaultOptions = {
      el: void 0,
      append: false,
      template: {
        v: TEMPLATE_VERSION,
        t: []
      },
      preserveWhitespace: false,
      sanitize: false,
      stripComments: true,
      delimiters: ["{{", "}}"],
      tripleDelimiters: ["{{{", "}}}"],
      interpolate: false,
      data: {},
      computed: {},
      magic: false,
      modifyArrays: true,
      adapt: [],
      isolated: false,
      twoway: true,
      lazy: false,
      noIntro: false,
      transitionsEnabled: true,
      complete: void 0,
      css: null,
      noCssTransform: false
    };
    var defaults = defaultOptions;
    var easing__default = {
      linear: function(pos) {
        return pos;
      },
      easeIn: function(pos) {
        return Math.pow(pos, 3);
      },
      easeOut: function(pos) {
        return Math.pow(pos - 1, 3) + 1;
      },
      easeInOut: function(pos) {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 3);
        }
        return 0.5 * (Math.pow(pos - 2, 3) + 2);
      }
    };
    var isClient,
        isJsdom,
        hasConsole,
        environment__magic,
        namespaces,
        svg,
        vendors;
    isClient = typeof document === "object";
    isJsdom = typeof navigator !== "undefined" && /jsDom/.test(navigator.appName);
    hasConsole = typeof console !== "undefined" && typeof console.warn === "function" && typeof console.warn.apply === "function";
    try {
      Object.defineProperty({}, "test", {value: 0});
      environment__magic = true;
    } catch (e) {
      environment__magic = false;
    }
    namespaces = {
      html: "http://www.w3.org/1999/xhtml",
      mathml: "http://www.w3.org/1998/Math/MathML",
      svg: "http://www.w3.org/2000/svg",
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };
    if (typeof document === "undefined") {
      svg = false;
    } else {
      svg = document && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
    }
    vendors = ["o", "ms", "moz", "webkit"];
    var createElement,
        matches,
        dom__div,
        methodNames,
        unprefixed,
        prefixed,
        dom__i,
        j,
        makeFunction;
    if (!svg) {
      createElement = function(type, ns) {
        if (ns && ns !== namespaces.html) {
          throw "This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you're trying to render SVG in an older browser. See http://docs.ractivejs.org/latest/svg-and-older-browsers for more information";
        }
        return document.createElement(type);
      };
    } else {
      createElement = function(type, ns) {
        if (!ns || ns === namespaces.html) {
          return document.createElement(type);
        }
        return document.createElementNS(ns, type);
      };
    }
    function getElement(input) {
      var output;
      if (!input || typeof input === "boolean") {
        return ;
      }
      if (typeof window === "undefined" || !document || !input) {
        return null;
      }
      if (input.nodeType) {
        return input;
      }
      if (typeof input === "string") {
        output = document.getElementById(input);
        if (!output && document.querySelector) {
          output = document.querySelector(input);
        }
        if (output && output.nodeType) {
          return output;
        }
      }
      if (input[0] && input[0].nodeType) {
        return input[0];
      }
      return null;
    }
    if (!isClient) {
      matches = null;
    } else {
      dom__div = createElement("div");
      methodNames = ["matches", "matchesSelector"];
      makeFunction = function(methodName) {
        return function(node, selector) {
          return node[methodName](selector);
        };
      };
      dom__i = methodNames.length;
      while (dom__i-- && !matches) {
        unprefixed = methodNames[dom__i];
        if (dom__div[unprefixed]) {
          matches = makeFunction(unprefixed);
        } else {
          j = vendors.length;
          while (j--) {
            prefixed = vendors[dom__i] + unprefixed.substr(0, 1).toUpperCase() + unprefixed.substring(1);
            if (dom__div[prefixed]) {
              matches = makeFunction(prefixed);
              break;
            }
          }
        }
      }
      if (!matches) {
        matches = function(node, selector) {
          var nodes,
              parentNode,
              i;
          parentNode = node.parentNode;
          if (!parentNode) {
            dom__div.innerHTML = "";
            parentNode = dom__div;
            node = node.cloneNode();
            dom__div.appendChild(node);
          }
          nodes = parentNode.querySelectorAll(selector);
          i = nodes.length;
          while (i--) {
            if (nodes[i] === node) {
              return true;
            }
          }
          return false;
        };
      }
    }
    function detachNode(node) {
      if (node && typeof node.parentNode !== "unknown" && node.parentNode) {
        node.parentNode.removeChild(node);
      }
      return node;
    }
    function safeToStringValue(value) {
      return value == null || !value.toString ? "" : value;
    }
    var create,
        defineProperty,
        defineProperties;
    try {
      Object.defineProperty({}, "test", {value: 0});
      if (isClient) {
        Object.defineProperty(document.createElement("div"), "test", {value: 0});
      }
      defineProperty = Object.defineProperty;
    } catch (err) {
      defineProperty = function(obj, prop, desc) {
        obj[prop] = desc.value;
      };
    }
    try {
      try {
        Object.defineProperties({}, {test: {value: 0}});
      } catch (err) {
        throw err;
      }
      if (isClient) {
        Object.defineProperties(createElement("div"), {test: {value: 0}});
      }
      defineProperties = Object.defineProperties;
    } catch (err) {
      defineProperties = function(obj, props) {
        var prop;
        for (prop in props) {
          if (props.hasOwnProperty(prop)) {
            defineProperty(obj, prop, props[prop]);
          }
        }
      };
    }
    try {
      Object.create(null);
      create = Object.create;
    } catch (err) {
      create = (function() {
        var F = function() {};
        return function(proto, props) {
          var obj;
          if (proto === null) {
            return {};
          }
          F.prototype = proto;
          obj = new F();
          if (props) {
            Object.defineProperties(obj, props);
          }
          return obj;
        };
      })();
    }
    function object__extend(target) {
      for (var _len = arguments.length,
          sources = Array(_len > 1 ? _len - 1 : 0),
          _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
      }
      var prop,
          source;
      while (source = sources.shift()) {
        for (prop in source) {
          if (hasOwn.call(source, prop)) {
            target[prop] = source[prop];
          }
        }
      }
      return target;
    }
    function fillGaps(target) {
      for (var _len = arguments.length,
          sources = Array(_len > 1 ? _len - 1 : 0),
          _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
      }
      sources.forEach(function(s) {
        for (var key in s) {
          if (s.hasOwnProperty(key) && !(key in target)) {
            target[key] = s[key];
          }
        }
      });
      return target;
    }
    var hasOwn = Object.prototype.hasOwnProperty;
    var is__toString = Object.prototype.toString,
        arrayLikePattern = /^\[object (?:Array|FileList)\]$/;
    function isArray(thing) {
      return is__toString.call(thing) === "[object Array]";
    }
    function isArrayLike(obj) {
      return arrayLikePattern.test(is__toString.call(obj));
    }
    function isEqual(a, b) {
      if (a === null && b === null) {
        return true;
      }
      if (typeof a === "object" || typeof b === "object") {
        return false;
      }
      return a === b;
    }
    function is__isNumeric(thing) {
      return !isNaN(parseFloat(thing)) && isFinite(thing);
    }
    function isObject(thing) {
      return thing && is__toString.call(thing) === "[object Object]";
    }
    var noop = function() {};
    var alreadyWarned = {},
        log,
        printWarning,
        welcome;
    if (hasConsole) {
      (function() {
        var welcomeIntro = ["%cRactive.js %c0.7.1 %cin debug mode, %cmore...", "color: rgb(114, 157, 52); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;"];
        var welcomeMessage = "You're running Ractive <@version@> in debug mode - messages will be printed to the console to help you fix problems and optimise your application.\n\nTo disable debug mode, add this line at the start of your app:\n  Ractive.DEBUG = false;\n\nTo disable debug mode when your app is minified, add this snippet:\n  Ractive.DEBUG = /unminified/.test(function(){/*unminified*/});\n\nGet help and support:\n  http://docs.ractivejs.org\n  http://stackoverflow.com/questions/tagged/ractivejs\n  http://groups.google.com/forum/#!forum/ractive-js\n  http://twitter.com/ractivejs\n\nFound a bug? Raise an issue:\n  https://github.com/ractivejs/ractive/issues\n\n";
        welcome = function() {
          var hasGroup = !!console.groupCollapsed;
          console[hasGroup ? "groupCollapsed" : "log"].apply(console, welcomeIntro);
          console.log(welcomeMessage);
          if (hasGroup) {
            console.groupEnd(welcomeIntro);
          }
          welcome = noop;
        };
        printWarning = function(message, args) {
          welcome();
          if (typeof args[args.length - 1] === "object") {
            var options = args.pop();
            var ractive = options.ractive;
            if (ractive) {
              var _name = undefined;
              if (ractive.component && (_name = ractive.component.name)) {
                message = "<" + _name + "> " + message;
              }
              var node = undefined;
              if (node = options.node || ractive.fragment && ractive.fragment.rendered && ractive.find("*")) {
                args.push(node);
              }
            }
          }
          console.warn.apply(console, ["%cRactive.js: %c" + message, "color: rgb(114, 157, 52);", "color: rgb(85, 85, 85);"].concat(args));
        };
        log = function() {
          console.log.apply(console, arguments);
        };
      })();
    } else {
      printWarning = log = welcome = noop;
    }
    function format(message, args) {
      return message.replace(/%s/g, function() {
        return args.shift();
      });
    }
    function fatal(message) {
      for (var _len = arguments.length,
          args = Array(_len > 1 ? _len - 1 : 0),
          _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      message = format(message, args);
      throw new Error(message);
    }
    function logIfDebug() {
      if (Ractive.DEBUG) {
        log.apply(null, arguments);
      }
    }
    function warn(message) {
      for (var _len = arguments.length,
          args = Array(_len > 1 ? _len - 1 : 0),
          _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      message = format(message, args);
      printWarning(message, args);
    }
    function warnOnce(message) {
      for (var _len = arguments.length,
          args = Array(_len > 1 ? _len - 1 : 0),
          _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      message = format(message, args);
      if (alreadyWarned[message]) {
        return ;
      }
      alreadyWarned[message] = true;
      printWarning(message, args);
    }
    function warnIfDebug() {
      if (Ractive.DEBUG) {
        warn.apply(null, arguments);
      }
    }
    function warnOnceIfDebug() {
      if (Ractive.DEBUG) {
        warnOnce.apply(null, arguments);
      }
    }
    var badArguments = "Bad arguments";
    var noRegistryFunctionReturn = "A function was specified for \"%s\" %s, but no %s was returned";
    var missingPlugin = function(name, type) {
      return "Missing \"" + name + "\" " + type + " plugin. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#" + type + "s";
    };
    function findInViewHierarchy(registryName, ractive, name) {
      var instance = findInstance(registryName, ractive, name);
      return instance ? instance[registryName][name] : null;
    }
    function findInstance(registryName, ractive, name) {
      while (ractive) {
        if (name in ractive[registryName]) {
          return ractive;
        }
        if (ractive.isolated) {
          return null;
        }
        ractive = ractive.parent;
      }
    }
    var interpolate = function(from, to, ractive, type) {
      if (from === to) {
        return snap(to);
      }
      if (type) {
        var interpol = findInViewHierarchy("interpolators", ractive, type);
        if (interpol) {
          return interpol(from, to) || snap(to);
        }
        fatal(missingPlugin(type, "interpolator"));
      }
      return interpolators.number(from, to) || interpolators.array(from, to) || interpolators.object(from, to) || snap(to);
    };
    function snap(to) {
      return function() {
        return to;
      };
    }
    var interpolators = {
      number: function(from, to) {
        var delta;
        if (!is__isNumeric(from) || !is__isNumeric(to)) {
          return null;
        }
        from = +from;
        to = +to;
        delta = to - from;
        if (!delta) {
          return function() {
            return from;
          };
        }
        return function(t) {
          return from + t * delta;
        };
      },
      array: function(from, to) {
        var intermediate,
            interpolators,
            len,
            i;
        if (!isArray(from) || !isArray(to)) {
          return null;
        }
        intermediate = [];
        interpolators = [];
        i = len = Math.min(from.length, to.length);
        while (i--) {
          interpolators[i] = interpolate(from[i], to[i]);
        }
        for (i = len; i < from.length; i += 1) {
          intermediate[i] = from[i];
        }
        for (i = len; i < to.length; i += 1) {
          intermediate[i] = to[i];
        }
        return function(t) {
          var i = len;
          while (i--) {
            intermediate[i] = interpolators[i](t);
          }
          return intermediate;
        };
      },
      object: function(from, to) {
        var properties,
            len,
            interpolators,
            intermediate,
            prop;
        if (!isObject(from) || !isObject(to)) {
          return null;
        }
        properties = [];
        intermediate = {};
        interpolators = {};
        for (prop in from) {
          if (hasOwn.call(from, prop)) {
            if (hasOwn.call(to, prop)) {
              properties.push(prop);
              interpolators[prop] = interpolate(from[prop], to[prop]);
            } else {
              intermediate[prop] = from[prop];
            }
          }
        }
        for (prop in to) {
          if (hasOwn.call(to, prop) && !hasOwn.call(from, prop)) {
            intermediate[prop] = to[prop];
          }
        }
        len = properties.length;
        return function(t) {
          var i = len,
              prop;
          while (i--) {
            prop = properties[i];
            intermediate[prop] = interpolators[prop](t);
          }
          return intermediate;
        };
      }
    };
    var starMaps = {};
    function getPotentialWildcardMatches(keypath) {
      var keys,
          starMap,
          mapper,
          i,
          result,
          wildcardKeypath;
      keys = keypath.split(".");
      if (!(starMap = starMaps[keys.length])) {
        starMap = getStarMap(keys.length);
      }
      result = [];
      mapper = function(star, i) {
        return star ? "*" : keys[i];
      };
      i = starMap.length;
      while (i--) {
        wildcardKeypath = starMap[i].map(mapper).join(".");
        if (!result.hasOwnProperty(wildcardKeypath)) {
          result.push(wildcardKeypath);
          result[wildcardKeypath] = true;
        }
      }
      return result;
    }
    function getStarMap(num) {
      var ones = "",
          max,
          binary,
          starMap,
          mapper,
          i;
      if (!starMaps[num]) {
        starMap = [];
        while (ones.length < num) {
          ones += 1;
        }
        max = parseInt(ones, 2);
        mapper = function(digit) {
          return digit === "1";
        };
        for (i = 0; i <= max; i += 1) {
          binary = i.toString(2);
          while (binary.length < num) {
            binary = "0" + binary;
          }
          starMap[i] = Array.prototype.map.call(binary, mapper);
        }
        starMaps[num] = starMap;
      }
      return starMaps[num];
    }
    var refPattern = /\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g;
    var patternPattern = /\*/;
    var keypathCache = {};
    var Keypath = function(str) {
      var keys = str.split(".");
      this.str = str;
      if (str[0] === "@") {
        this.isSpecial = true;
        this.value = decodeKeypath(str);
      }
      this.firstKey = keys[0];
      this.lastKey = keys.pop();
      this.isPattern = patternPattern.test(str);
      this.parent = str === "" ? null : getKeypath(keys.join("."));
      this.isRoot = !str;
    };
    Keypath.prototype = {
      equalsOrStartsWith: function(keypath) {
        return keypath === this || this.startsWith(keypath);
      },
      join: function(str) {
        return getKeypath(this.isRoot ? String(str) : this.str + "." + str);
      },
      replace: function(oldKeypath, newKeypath) {
        if (this === oldKeypath) {
          return newKeypath;
        }
        if (this.startsWith(oldKeypath)) {
          return newKeypath === null ? newKeypath : getKeypath(this.str.replace(oldKeypath.str + ".", newKeypath.str + "."));
        }
      },
      startsWith: function(keypath) {
        if (!keypath) {
          return false;
        }
        return keypath && this.str.substr(0, keypath.str.length + 1) === keypath.str + ".";
      },
      toString: function() {
        throw new Error("Bad coercion");
      },
      valueOf: function() {
        throw new Error("Bad coercion");
      },
      wildcardMatches: function() {
        return this._wildcardMatches || (this._wildcardMatches = getPotentialWildcardMatches(this.str));
      }
    };
    function assignNewKeypath(target, property, oldKeypath, newKeypath) {
      var existingKeypath = target[property];
      if (existingKeypath && (existingKeypath.equalsOrStartsWith(newKeypath) || !existingKeypath.equalsOrStartsWith(oldKeypath))) {
        return ;
      }
      target[property] = existingKeypath ? existingKeypath.replace(oldKeypath, newKeypath) : newKeypath;
      return true;
    }
    function decodeKeypath(keypath) {
      var value = keypath.slice(2);
      if (keypath[1] === "i") {
        return is__isNumeric(value) ? +value : value;
      } else {
        return value;
      }
    }
    function getKeypath(str) {
      if (str == null) {
        return str;
      }
      if (!keypathCache.hasOwnProperty(str)) {
        keypathCache[str] = new Keypath(str);
      }
      return keypathCache[str];
    }
    function getMatchingKeypaths(ractive, keypath) {
      var keys,
          key,
          matchingKeypaths;
      keys = keypath.str.split(".");
      matchingKeypaths = [rootKeypath];
      while (key = keys.shift()) {
        if (key === "*") {
          matchingKeypaths = matchingKeypaths.reduce(expand, []);
        } else {
          if (matchingKeypaths[0] === rootKeypath) {
            matchingKeypaths[0] = getKeypath(key);
          } else {
            matchingKeypaths = matchingKeypaths.map(concatenate(key));
          }
        }
      }
      return matchingKeypaths;
      function expand(matchingKeypaths, keypath) {
        var wrapper,
            value,
            keys;
        if (keypath.isRoot) {
          keys = [].concat(Object.keys(ractive.viewmodel.data), Object.keys(ractive.viewmodel.mappings), Object.keys(ractive.viewmodel.computations));
        } else {
          wrapper = ractive.viewmodel.wrapped[keypath.str];
          value = wrapper ? wrapper.get() : ractive.viewmodel.get(keypath);
          keys = value ? Object.keys(value) : null;
        }
        if (keys) {
          keys.forEach(function(key) {
            if (key !== "_ractive" || !isArray(value)) {
              matchingKeypaths.push(keypath.join(key));
            }
          });
        }
        return matchingKeypaths;
      }
    }
    function concatenate(key) {
      return function(keypath) {
        return keypath.join(key);
      };
    }
    function normalise(ref) {
      return ref ? ref.replace(refPattern, ".$1") : "";
    }
    var rootKeypath = getKeypath("");
    var add__errorMessage = "Cannot add to a non-numeric value";
    function add(root, keypath, d) {
      if (typeof keypath !== "string" || !is__isNumeric(d)) {
        throw new Error("Bad arguments");
      }
      var value = undefined,
          changes = undefined;
      if (/\*/.test(keypath)) {
        changes = {};
        getMatchingKeypaths(root, getKeypath(normalise(keypath))).forEach(function(keypath) {
          var value = root.viewmodel.get(keypath);
          if (!is__isNumeric(value)) {
            throw new Error(add__errorMessage);
          }
          changes[keypath.str] = value + d;
        });
        return root.set(changes);
      }
      value = root.get(keypath);
      if (!is__isNumeric(value)) {
        throw new Error(add__errorMessage);
      }
      return root.set(keypath, +value + d);
    }
    var prototype_add = Ractive$add;
    function Ractive$add(keypath, d) {
      return add(this, keypath, d === undefined ? 1 : +d);
    }
    var requestAnimationFrame;
    if (typeof window === "undefined") {
      requestAnimationFrame = null;
    } else {
      (function(vendors, lastTime, window) {
        var x,
            setTimeout;
        if (window.requestAnimationFrame) {
          return ;
        }
        for (x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
          window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        }
        if (!window.requestAnimationFrame) {
          setTimeout = window.setTimeout;
          window.requestAnimationFrame = function(callback) {
            var currTime,
                timeToCall,
                id;
            currTime = Date.now();
            timeToCall = Math.max(0, 16 - (currTime - lastTime));
            id = setTimeout(function() {
              callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
          };
        }
      })(vendors, 0, window);
      requestAnimationFrame = window.requestAnimationFrame;
    }
    var rAF = requestAnimationFrame;
    var getTime;
    if (typeof window !== "undefined" && window.performance && typeof window.performance.now === "function") {
      getTime = function() {
        return window.performance.now();
      };
    } else {
      getTime = function() {
        return Date.now();
      };
    }
    var deprecations = {
      construct: {
        deprecated: "beforeInit",
        replacement: "onconstruct"
      },
      render: {
        deprecated: "init",
        message: "The \"init\" method has been deprecated " + "and will likely be removed in a future release. " + "You can either use the \"oninit\" method which will fire " + "only once prior to, and regardless of, any eventual ractive " + "instance being rendered, or if you need to access the " + "rendered DOM, use \"onrender\" instead. " + "See http://docs.ractivejs.org/latest/migrating for more information."
      },
      complete: {
        deprecated: "complete",
        replacement: "oncomplete"
      }
    };
    function Hook(event) {
      this.event = event;
      this.method = "on" + event;
      this.deprecate = deprecations[event];
    }
    Hook.prototype.fire = function(ractive, arg) {
      function call(method) {
        if (ractive[method]) {
          arg ? ractive[method](arg) : ractive[method]();
          return true;
        }
      }
      call(this.method);
      if (!ractive[this.method] && this.deprecate && call(this.deprecate.deprecated)) {
        if (this.deprecate.message) {
          warnIfDebug(this.deprecate.message);
        } else {
          warnIfDebug("The method \"%s\" has been deprecated in favor of \"%s\" and will likely be removed in a future release. See http://docs.ractivejs.org/latest/migrating for more information.", this.deprecate.deprecated, this.deprecate.replacement);
        }
      }
      arg ? ractive.fire(this.event, arg) : ractive.fire(this.event);
    };
    function addToArray(array, value) {
      var index = array.indexOf(value);
      if (index === -1) {
        array.push(value);
      }
    }
    function arrayContains(array, value) {
      for (var i = 0,
          c = array.length; i < c; i++) {
        if (array[i] == value) {
          return true;
        }
      }
      return false;
    }
    function arrayContentsMatch(a, b) {
      var i;
      if (!isArray(a) || !isArray(b)) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      i = a.length;
      while (i--) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
    function ensureArray(x) {
      if (typeof x === "string") {
        return [x];
      }
      if (x === undefined) {
        return [];
      }
      return x;
    }
    function lastItem(array) {
      return array[array.length - 1];
    }
    function removeFromArray(array, member) {
      var index = array.indexOf(member);
      if (index !== -1) {
        array.splice(index, 1);
      }
    }
    function toArray(arrayLike) {
      var array = [],
          i = arrayLike.length;
      while (i--) {
        array[i] = arrayLike[i];
      }
      return array;
    }
    var _Promise,
        PENDING = {},
        FULFILLED = {},
        REJECTED = {};
    if (typeof Promise === "function") {
      _Promise = Promise;
    } else {
      _Promise = function(callback) {
        var fulfilledHandlers = [],
            rejectedHandlers = [],
            state = PENDING,
            result,
            dispatchHandlers,
            makeResolver,
            fulfil,
            reject,
            promise;
        makeResolver = function(newState) {
          return function(value) {
            if (state !== PENDING) {
              return ;
            }
            result = value;
            state = newState;
            dispatchHandlers = makeDispatcher(state === FULFILLED ? fulfilledHandlers : rejectedHandlers, result);
            wait(dispatchHandlers);
          };
        };
        fulfil = makeResolver(FULFILLED);
        reject = makeResolver(REJECTED);
        try {
          callback(fulfil, reject);
        } catch (err) {
          reject(err);
        }
        promise = {then: function(onFulfilled, onRejected) {
            var promise2 = new _Promise(function(fulfil, reject) {
              var processResolutionHandler = function(handler, handlers, forward) {
                if (typeof handler === "function") {
                  handlers.push(function(p1result) {
                    var x;
                    try {
                      x = handler(p1result);
                      utils_Promise__resolve(promise2, x, fulfil, reject);
                    } catch (err) {
                      reject(err);
                    }
                  });
                } else {
                  handlers.push(forward);
                }
              };
              processResolutionHandler(onFulfilled, fulfilledHandlers, fulfil);
              processResolutionHandler(onRejected, rejectedHandlers, reject);
              if (state !== PENDING) {
                wait(dispatchHandlers);
              }
            });
            return promise2;
          }};
        promise["catch"] = function(onRejected) {
          return this.then(null, onRejected);
        };
        return promise;
      };
      _Promise.all = function(promises) {
        return new _Promise(function(fulfil, reject) {
          var result = [],
              pending,
              i,
              processPromise;
          if (!promises.length) {
            fulfil(result);
            return ;
          }
          processPromise = function(promise, i) {
            if (promise && typeof promise.then === "function") {
              promise.then(function(value) {
                result[i] = value;
                --pending || fulfil(result);
              }, reject);
            } else {
              result[i] = promise;
              --pending || fulfil(result);
            }
          };
          pending = i = promises.length;
          while (i--) {
            processPromise(promises[i], i);
          }
        });
      };
      _Promise.resolve = function(value) {
        return new _Promise(function(fulfil) {
          fulfil(value);
        });
      };
      _Promise.reject = function(reason) {
        return new _Promise(function(fulfil, reject) {
          reject(reason);
        });
      };
    }
    var utils_Promise = _Promise;
    function wait(callback) {
      setTimeout(callback, 0);
    }
    function makeDispatcher(handlers, result) {
      return function() {
        var handler;
        while (handler = handlers.shift()) {
          handler(result);
        }
      };
    }
    function utils_Promise__resolve(promise, x, fulfil, reject) {
      var then;
      if (x === promise) {
        throw new TypeError("A promise's fulfillment handler cannot return the same promise");
      }
      if (x instanceof _Promise) {
        x.then(fulfil, reject);
      } else if (x && (typeof x === "object" || typeof x === "function")) {
        try {
          then = x.then;
        } catch (e) {
          reject(e);
          return ;
        }
        if (typeof then === "function") {
          var called,
              resolvePromise,
              rejectPromise;
          resolvePromise = function(y) {
            if (called) {
              return ;
            }
            called = true;
            utils_Promise__resolve(promise, y, fulfil, reject);
          };
          rejectPromise = function(r) {
            if (called) {
              return ;
            }
            called = true;
            reject(r);
          };
          try {
            then.call(x, resolvePromise, rejectPromise);
          } catch (e) {
            if (!called) {
              reject(e);
              called = true;
              return ;
            }
          }
        } else {
          fulfil(x);
        }
      } else {
        fulfil(x);
      }
    }
    var getInnerContext = function(fragment) {
      do {
        if (fragment.context !== undefined) {
          return fragment.context;
        }
      } while (fragment = fragment.parent);
      return rootKeypath;
    };
    function resolveRef(ractive, ref, fragment) {
      var keypath;
      ref = normalise(ref);
      if (ref.substr(0, 2) === "~/") {
        keypath = getKeypath(ref.substring(2));
        createMappingIfNecessary(ractive, keypath.firstKey, fragment);
      } else if (ref[0] === ".") {
        keypath = resolveAncestorRef(getInnerContext(fragment), ref);
        if (keypath) {
          createMappingIfNecessary(ractive, keypath.firstKey, fragment);
        }
      } else {
        keypath = resolveAmbiguousReference(ractive, getKeypath(ref), fragment);
      }
      return keypath;
    }
    function resolveAncestorRef(baseContext, ref) {
      var contextKeys;
      if (baseContext != undefined && typeof baseContext !== "string") {
        baseContext = baseContext.str;
      }
      if (ref === ".")
        return getKeypath(baseContext);
      contextKeys = baseContext ? baseContext.split(".") : [];
      if (ref.substr(0, 3) === "../") {
        while (ref.substr(0, 3) === "../") {
          if (!contextKeys.length) {
            throw new Error("Could not resolve reference - too many \"../\" prefixes");
          }
          contextKeys.pop();
          ref = ref.substring(3);
        }
        contextKeys.push(ref);
        return getKeypath(contextKeys.join("."));
      }
      if (!baseContext) {
        return getKeypath(ref.replace(/^\.\/?/, ""));
      }
      return getKeypath(baseContext + ref.replace(/^\.\//, "."));
    }
    function resolveAmbiguousReference(ractive, ref, fragment, isParentLookup) {
      var context,
          key,
          parentValue,
          hasContextChain,
          parentKeypath;
      if (ref.isRoot) {
        return ref;
      }
      key = ref.firstKey;
      while (fragment) {
        context = fragment.context;
        fragment = fragment.parent;
        if (!context) {
          continue;
        }
        hasContextChain = true;
        parentValue = ractive.viewmodel.get(context);
        if (parentValue && (typeof parentValue === "object" || typeof parentValue === "function") && key in parentValue) {
          return context.join(ref.str);
        }
      }
      if (isRootProperty(ractive.viewmodel, key)) {
        return ref;
      }
      if (ractive.parent && !ractive.isolated) {
        hasContextChain = true;
        fragment = ractive.component.parentFragment;
        key = getKeypath(key);
        if (parentKeypath = resolveAmbiguousReference(ractive.parent, key, fragment, true)) {
          ractive.viewmodel.map(key, {
            origin: ractive.parent.viewmodel,
            keypath: parentKeypath
          });
          return ref;
        }
      }
      if (!isParentLookup && !hasContextChain) {
        ractive.viewmodel.set(ref, undefined);
        return ref;
      }
    }
    function createMappingIfNecessary(ractive, key) {
      var parentKeypath;
      if (!ractive.parent || ractive.isolated || isRootProperty(ractive.viewmodel, key)) {
        return ;
      }
      key = getKeypath(key);
      if (parentKeypath = resolveAmbiguousReference(ractive.parent, key, ractive.component.parentFragment, true)) {
        ractive.viewmodel.map(key, {
          origin: ractive.parent.viewmodel,
          keypath: parentKeypath
        });
      }
    }
    function isRootProperty(viewmodel, key) {
      return key === "" || key in viewmodel.data || key in viewmodel.computations || key in viewmodel.mappings;
    }
    function teardown(x) {
      x.teardown();
    }
    function methodCallers__unbind(x) {
      x.unbind();
    }
    function methodCallers__unrender(x) {
      x.unrender();
    }
    var TransitionManager = function(callback, parent) {
      this.callback = callback;
      this.parent = parent;
      this.intros = [];
      this.outros = [];
      this.children = [];
      this.totalChildren = this.outroChildren = 0;
      this.detachQueue = [];
      this.decoratorQueue = [];
      this.outrosComplete = false;
      if (parent) {
        parent.addChild(this);
      }
    };
    TransitionManager.prototype = {
      addChild: function(child) {
        this.children.push(child);
        this.totalChildren += 1;
        this.outroChildren += 1;
      },
      decrementOutros: function() {
        this.outroChildren -= 1;
        check(this);
      },
      decrementTotal: function() {
        this.totalChildren -= 1;
        check(this);
      },
      add: function(transition) {
        var list = transition.isIntro ? this.intros : this.outros;
        list.push(transition);
      },
      addDecorator: function(decorator) {
        this.decoratorQueue.push(decorator);
      },
      remove: function(transition) {
        var list = transition.isIntro ? this.intros : this.outros;
        removeFromArray(list, transition);
        check(this);
      },
      init: function() {
        this.ready = true;
        check(this);
      },
      detachNodes: function() {
        this.decoratorQueue.forEach(teardown);
        this.detachQueue.forEach(detach);
        this.children.forEach(detachNodes);
      }
    };
    function detach(element) {
      element.detach();
    }
    function detachNodes(tm) {
      tm.detachNodes();
    }
    function check(tm) {
      if (!tm.ready || tm.outros.length || tm.outroChildren)
        return ;
      if (!tm.outrosComplete) {
        if (tm.parent) {
          tm.parent.decrementOutros(tm);
        } else {
          tm.detachNodes();
        }
        tm.outrosComplete = true;
      }
      if (!tm.intros.length && !tm.totalChildren) {
        if (typeof tm.callback === "function") {
          tm.callback();
        }
        if (tm.parent) {
          tm.parent.decrementTotal();
        }
      }
    }
    var batch,
        runloop,
        unresolved = [],
        changeHook = new Hook("change");
    runloop = {
      start: function(instance, returnPromise) {
        var promise,
            fulfilPromise;
        if (returnPromise) {
          promise = new utils_Promise(function(f) {
            return fulfilPromise = f;
          });
        }
        batch = {
          previousBatch: batch,
          transitionManager: new TransitionManager(fulfilPromise, batch && batch.transitionManager),
          views: [],
          tasks: [],
          ractives: [],
          instance: instance
        };
        if (instance) {
          batch.ractives.push(instance);
        }
        return promise;
      },
      end: function() {
        flushChanges();
        batch.transitionManager.init();
        if (!batch.previousBatch && !!batch.instance)
          batch.instance.viewmodel.changes = [];
        batch = batch.previousBatch;
      },
      addRactive: function(ractive) {
        if (batch) {
          addToArray(batch.ractives, ractive);
        }
      },
      registerTransition: function(transition) {
        transition._manager = batch.transitionManager;
        batch.transitionManager.add(transition);
      },
      registerDecorator: function(decorator) {
        batch.transitionManager.addDecorator(decorator);
      },
      addView: function(view) {
        batch.views.push(view);
      },
      addUnresolved: function(thing) {
        unresolved.push(thing);
      },
      removeUnresolved: function(thing) {
        removeFromArray(unresolved, thing);
      },
      detachWhenReady: function(thing) {
        batch.transitionManager.detachQueue.push(thing);
      },
      scheduleTask: function(task, postRender) {
        var _batch;
        if (!batch) {
          task();
        } else {
          _batch = batch;
          while (postRender && _batch.previousBatch) {
            _batch = _batch.previousBatch;
          }
          _batch.tasks.push(task);
        }
      }
    };
    function flushChanges() {
      var i,
          thing,
          changeHash;
      while (batch.ractives.length) {
        thing = batch.ractives.pop();
        changeHash = thing.viewmodel.applyChanges();
        if (changeHash) {
          changeHook.fire(thing, changeHash);
        }
      }
      attemptKeypathResolution();
      for (i = 0; i < batch.views.length; i += 1) {
        batch.views[i].update();
      }
      batch.views.length = 0;
      for (i = 0; i < batch.tasks.length; i += 1) {
        batch.tasks[i]();
      }
      batch.tasks.length = 0;
      if (batch.ractives.length)
        return flushChanges();
    }
    function attemptKeypathResolution() {
      var i,
          item,
          keypath,
          resolved;
      i = unresolved.length;
      while (i--) {
        item = unresolved[i];
        if (item.keypath) {
          unresolved.splice(i, 1);
          continue;
        }
        if (keypath = resolveRef(item.root, item.ref, item.parentFragment)) {
          (resolved || (resolved = [])).push({
            item: item,
            keypath: keypath
          });
          unresolved.splice(i, 1);
        }
      }
      if (resolved) {
        resolved.forEach(runloop__resolve);
      }
    }
    function runloop__resolve(resolved) {
      resolved.item.resolve(resolved.keypath);
    }
    var queue = [];
    var animations = {
      tick: function() {
        var i,
            animation,
            now;
        now = getTime();
        runloop.start();
        for (i = 0; i < queue.length; i += 1) {
          animation = queue[i];
          if (!animation.tick(now)) {
            queue.splice(i--, 1);
          }
        }
        runloop.end();
        if (queue.length) {
          rAF(animations.tick);
        } else {
          animations.running = false;
        }
      },
      add: function(animation) {
        queue.push(animation);
        if (!animations.running) {
          animations.running = true;
          rAF(animations.tick);
        }
      },
      abort: function(keypath, root) {
        var i = queue.length,
            animation;
        while (i--) {
          animation = queue[i];
          if (animation.root === root && animation.keypath === keypath) {
            animation.stop();
          }
        }
      }
    };
    var animations__default = animations;
    var Animation = function(options) {
      var key;
      this.startTime = Date.now();
      for (key in options) {
        if (options.hasOwnProperty(key)) {
          this[key] = options[key];
        }
      }
      this.interpolator = interpolate(this.from, this.to, this.root, this.interpolator);
      this.running = true;
      this.tick();
    };
    Animation.prototype = {
      tick: function() {
        var elapsed,
            t,
            value,
            timeNow,
            index,
            keypath;
        keypath = this.keypath;
        if (this.running) {
          timeNow = Date.now();
          elapsed = timeNow - this.startTime;
          if (elapsed >= this.duration) {
            if (keypath !== null) {
              runloop.start(this.root);
              this.root.viewmodel.set(keypath, this.to);
              runloop.end();
            }
            if (this.step) {
              this.step(1, this.to);
            }
            this.complete(this.to);
            index = this.root._animations.indexOf(this);
            if (index === -1) {
              warnIfDebug("Animation was not found");
            }
            this.root._animations.splice(index, 1);
            this.running = false;
            return false;
          }
          t = this.easing ? this.easing(elapsed / this.duration) : elapsed / this.duration;
          if (keypath !== null) {
            value = this.interpolator(t);
            runloop.start(this.root);
            this.root.viewmodel.set(keypath, value);
            runloop.end();
          }
          if (this.step) {
            this.step(t, value);
          }
          return true;
        }
        return false;
      },
      stop: function() {
        var index;
        this.running = false;
        index = this.root._animations.indexOf(this);
        if (index === -1) {
          warnIfDebug("Animation was not found");
        }
        this.root._animations.splice(index, 1);
      }
    };
    var animate__default = Ractive$animate;
    var noAnimation = {stop: noop};
    function Ractive$animate(keypath, to, options) {
      var promise,
          fulfilPromise,
          k,
          animation,
          animations,
          easing,
          duration,
          step,
          complete,
          makeValueCollector,
          currentValues,
          collectValue,
          dummy,
          dummyOptions;
      promise = new utils_Promise(function(fulfil) {
        return fulfilPromise = fulfil;
      });
      if (typeof keypath === "object") {
        options = to || {};
        easing = options.easing;
        duration = options.duration;
        animations = [];
        step = options.step;
        complete = options.complete;
        if (step || complete) {
          currentValues = {};
          options.step = null;
          options.complete = null;
          makeValueCollector = function(keypath) {
            return function(t, value) {
              currentValues[keypath] = value;
            };
          };
        }
        for (k in keypath) {
          if (keypath.hasOwnProperty(k)) {
            if (step || complete) {
              collectValue = makeValueCollector(k);
              options = {
                easing: easing,
                duration: duration
              };
              if (step) {
                options.step = collectValue;
              }
            }
            options.complete = complete ? collectValue : noop;
            animations.push(animate(this, k, keypath[k], options));
          }
        }
        dummyOptions = {
          easing: easing,
          duration: duration
        };
        if (step) {
          dummyOptions.step = function(t) {
            return step(t, currentValues);
          };
        }
        if (complete) {
          promise.then(function(t) {
            return complete(t, currentValues);
          });
        }
        dummyOptions.complete = fulfilPromise;
        dummy = animate(this, null, null, dummyOptions);
        animations.push(dummy);
        promise.stop = function() {
          var animation;
          while (animation = animations.pop()) {
            animation.stop();
          }
          if (dummy) {
            dummy.stop();
          }
        };
        return promise;
      }
      options = options || {};
      if (options.complete) {
        promise.then(options.complete);
      }
      options.complete = fulfilPromise;
      animation = animate(this, keypath, to, options);
      promise.stop = function() {
        return animation.stop();
      };
      return promise;
    }
    function animate(root, keypath, to, options) {
      var easing,
          duration,
          animation,
          from;
      if (keypath) {
        keypath = getKeypath(normalise(keypath));
      }
      if (keypath !== null) {
        from = root.viewmodel.get(keypath);
      }
      animations__default.abort(keypath, root);
      if (isEqual(from, to)) {
        if (options.complete) {
          options.complete(options.to);
        }
        return noAnimation;
      }
      if (options.easing) {
        if (typeof options.easing === "function") {
          easing = options.easing;
        } else {
          easing = root.easing[options.easing];
        }
        if (typeof easing !== "function") {
          easing = null;
        }
      }
      duration = options.duration === undefined ? 400 : options.duration;
      animation = new Animation({
        keypath: keypath,
        from: from,
        to: to,
        root: root,
        duration: duration,
        easing: easing,
        interpolator: options.interpolator,
        step: options.step,
        complete: options.complete
      });
      animations__default.add(animation);
      root._animations.push(animation);
      return animation;
    }
    var prototype_detach = Ractive$detach;
    var prototype_detach__detachHook = new Hook("detach");
    function Ractive$detach() {
      if (this.detached) {
        return this.detached;
      }
      if (this.el) {
        removeFromArray(this.el.__ractive_instances__, this);
      }
      this.detached = this.fragment.detach();
      prototype_detach__detachHook.fire(this);
      return this.detached;
    }
    var prototype_find = Ractive$find;
    function Ractive$find(selector) {
      if (!this.el) {
        return null;
      }
      return this.fragment.find(selector);
    }
    var test = Query$test;
    function Query$test(item, noDirty) {
      var itemMatches;
      if (this._isComponentQuery) {
        itemMatches = !this.selector || item.name === this.selector;
      } else {
        itemMatches = item.node ? matches(item.node, this.selector) : null;
      }
      if (itemMatches) {
        this.push(item.node || item.instance);
        if (!noDirty) {
          this._makeDirty();
        }
        return true;
      }
    }
    var cancel = function() {
      var liveQueries,
          selector,
          index;
      liveQueries = this._root[this._isComponentQuery ? "liveComponentQueries" : "liveQueries"];
      selector = this.selector;
      index = liveQueries.indexOf(selector);
      if (index !== -1) {
        liveQueries.splice(index, 1);
        liveQueries[selector] = null;
      }
    };
    var sortByItemPosition = function(a, b) {
      var ancestryA,
          ancestryB,
          oldestA,
          oldestB,
          mutualAncestor,
          indexA,
          indexB,
          fragments,
          fragmentA,
          fragmentB;
      ancestryA = getAncestry(a.component || a._ractive.proxy);
      ancestryB = getAncestry(b.component || b._ractive.proxy);
      oldestA = lastItem(ancestryA);
      oldestB = lastItem(ancestryB);
      while (oldestA && oldestA === oldestB) {
        ancestryA.pop();
        ancestryB.pop();
        mutualAncestor = oldestA;
        oldestA = lastItem(ancestryA);
        oldestB = lastItem(ancestryB);
      }
      oldestA = oldestA.component || oldestA;
      oldestB = oldestB.component || oldestB;
      fragmentA = oldestA.parentFragment;
      fragmentB = oldestB.parentFragment;
      if (fragmentA === fragmentB) {
        indexA = fragmentA.items.indexOf(oldestA);
        indexB = fragmentB.items.indexOf(oldestB);
        return indexA - indexB || ancestryA.length - ancestryB.length;
      }
      if (fragments = mutualAncestor.fragments) {
        indexA = fragments.indexOf(fragmentA);
        indexB = fragments.indexOf(fragmentB);
        return indexA - indexB || ancestryA.length - ancestryB.length;
      }
      throw new Error("An unexpected condition was met while comparing the position of two components. Please file an issue at https://github.com/RactiveJS/Ractive/issues - thanks!");
    };
    function getParent(item) {
      var parentFragment;
      if (parentFragment = item.parentFragment) {
        return parentFragment.owner;
      }
      if (item.component && (parentFragment = item.component.parentFragment)) {
        return parentFragment.owner;
      }
    }
    function getAncestry(item) {
      var ancestry,
          ancestor;
      ancestry = [item];
      ancestor = getParent(item);
      while (ancestor) {
        ancestry.push(ancestor);
        ancestor = getParent(ancestor);
      }
      return ancestry;
    }
    var sortByDocumentPosition = function(node, otherNode) {
      var bitmask;
      if (node.compareDocumentPosition) {
        bitmask = node.compareDocumentPosition(otherNode);
        return bitmask & 2 ? 1 : -1;
      }
      return sortByItemPosition(node, otherNode);
    };
    var sort = function() {
      this.sort(this._isComponentQuery ? sortByItemPosition : sortByDocumentPosition);
      this._dirty = false;
    };
    var dirty__default = function() {
      var _this = this;
      if (!this._dirty) {
        this._dirty = true;
        runloop.scheduleTask(function() {
          _this._sort();
        });
      }
    };
    var remove = function(nodeOrComponent) {
      var index = this.indexOf(this._isComponentQuery ? nodeOrComponent.instance : nodeOrComponent);
      if (index !== -1) {
        this.splice(index, 1);
      }
    };
    function makeQuery(ractive, selector, live, isComponentQuery) {
      var query = [];
      defineProperties(query, {
        selector: {value: selector},
        live: {value: live},
        _isComponentQuery: {value: isComponentQuery},
        _test: {value: test}
      });
      if (!live) {
        return query;
      }
      defineProperties(query, {
        cancel: {value: cancel},
        _root: {value: ractive},
        _sort: {value: sort},
        _makeDirty: {value: dirty__default},
        _remove: {value: remove},
        _dirty: {
          value: false,
          writable: true
        }
      });
      return query;
    }
    var prototype_findAll = Ractive$findAll;
    function Ractive$findAll(selector, options) {
      var liveQueries,
          query;
      if (!this.el) {
        return [];
      }
      options = options || {};
      liveQueries = this._liveQueries;
      if (query = liveQueries[selector]) {
        return options && options.live ? query : query.slice();
      }
      query = makeQuery(this, selector, !!options.live, false);
      if (query.live) {
        liveQueries.push(selector);
        liveQueries["_" + selector] = query;
      }
      this.fragment.findAll(selector, query);
      return query;
    }
    var prototype_findAllComponents = Ractive$findAllComponents;
    function Ractive$findAllComponents(selector, options) {
      var liveQueries,
          query;
      options = options || {};
      liveQueries = this._liveComponentQueries;
      if (query = liveQueries[selector]) {
        return options && options.live ? query : query.slice();
      }
      query = makeQuery(this, selector, !!options.live, true);
      if (query.live) {
        liveQueries.push(selector);
        liveQueries["_" + selector] = query;
      }
      this.fragment.findAllComponents(selector, query);
      return query;
    }
    var prototype_findComponent = Ractive$findComponent;
    function Ractive$findComponent(selector) {
      return this.fragment.findComponent(selector);
    }
    var findContainer = Ractive$findContainer;
    function Ractive$findContainer(selector) {
      if (this.container) {
        if (this.container.component && this.container.component.name === selector) {
          return this.container;
        } else {
          return this.container.findContainer(selector);
        }
      }
      return null;
    }
    var findParent = Ractive$findParent;
    function Ractive$findParent(selector) {
      if (this.parent) {
        if (this.parent.component && this.parent.component.name === selector) {
          return this.parent;
        } else {
          return this.parent.findParent(selector);
        }
      }
      return null;
    }
    var eventStack = {
      enqueue: function(ractive, event) {
        if (ractive.event) {
          ractive._eventQueue = ractive._eventQueue || [];
          ractive._eventQueue.push(ractive.event);
        }
        ractive.event = event;
      },
      dequeue: function(ractive) {
        if (ractive._eventQueue && ractive._eventQueue.length) {
          ractive.event = ractive._eventQueue.pop();
        } else {
          delete ractive.event;
        }
      }
    };
    function fireEvent(ractive, eventName) {
      var options = arguments[2] === undefined ? {} : arguments[2];
      if (!eventName) {
        return ;
      }
      if (!options.event) {
        options.event = {
          name: eventName,
          _noArg: true
        };
      } else {
        options.event.name = eventName;
      }
      var eventNames = getKeypath(eventName).wildcardMatches();
      fireEventAs(ractive, eventNames, options.event, options.args, true);
    }
    function fireEventAs(ractive, eventNames, event, args) {
      var initialFire = arguments[4] === undefined ? false : arguments[4];
      var subscribers,
          i,
          bubble = true;
      eventStack.enqueue(ractive, event);
      for (i = eventNames.length; i >= 0; i--) {
        subscribers = ractive._subs[eventNames[i]];
        if (subscribers) {
          bubble = notifySubscribers(ractive, subscribers, event, args) && bubble;
        }
      }
      eventStack.dequeue(ractive);
      if (ractive.parent && bubble) {
        if (initialFire && ractive.component) {
          var fullName = ractive.component.name + "." + eventNames[eventNames.length - 1];
          eventNames = getKeypath(fullName).wildcardMatches();
          if (event) {
            event.component = ractive;
          }
        }
        fireEventAs(ractive.parent, eventNames, event, args);
      }
    }
    function notifySubscribers(ractive, subscribers, event, args) {
      var originalEvent = null,
          stopEvent = false;
      if (event && !event._noArg) {
        args = [event].concat(args);
      }
      subscribers = subscribers.slice();
      for (var i = 0,
          len = subscribers.length; i < len; i += 1) {
        if (subscribers[i].apply(ractive, args) === false) {
          stopEvent = true;
        }
      }
      if (event && !event._noArg && stopEvent && (originalEvent = event.original)) {
        originalEvent.preventDefault && originalEvent.preventDefault();
        originalEvent.stopPropagation && originalEvent.stopPropagation();
      }
      return !stopEvent;
    }
    var prototype_fire = Ractive$fire;
    function Ractive$fire(eventName) {
      var options = {args: Array.prototype.slice.call(arguments, 1)};
      fireEvent(this, eventName, options);
    }
    var prototype_get = Ractive$get;
    var options = {
      capture: true,
      noUnwrap: true,
      fullRootGet: true
    };
    function Ractive$get(keypath) {
      var value;
      keypath = getKeypath(normalise(keypath));
      value = this.viewmodel.get(keypath, options);
      if (value === undefined && this.parent && !this.isolated) {
        if (resolveRef(this, keypath.str, this.component.parentFragment)) {
          value = this.viewmodel.get(keypath);
        }
      }
      return value;
    }
    var insert = Ractive$insert;
    var insertHook = new Hook("insert");
    function Ractive$insert(target, anchor) {
      if (!this.fragment.rendered) {
        throw new Error("The API has changed - you must call `ractive.render(target[, anchor])` to render your Ractive instance. Once rendered you can use `ractive.insert()`.");
      }
      target = getElement(target);
      anchor = getElement(anchor) || null;
      if (!target) {
        throw new Error("You must specify a valid target to insert into");
      }
      target.insertBefore(this.detach(), anchor);
      this.el = target;
      (target.__ractive_instances__ || (target.__ractive_instances__ = [])).push(this);
      this.detached = null;
      fireInsertHook(this);
    }
    function fireInsertHook(ractive) {
      insertHook.fire(ractive);
      ractive.findAllComponents("*").forEach(function(child) {
        fireInsertHook(child.instance);
      });
    }
    var prototype_merge = Ractive$merge;
    function Ractive$merge(keypath, array, options) {
      var currentArray,
          promise;
      keypath = getKeypath(normalise(keypath));
      currentArray = this.viewmodel.get(keypath);
      if (!isArray(currentArray) || !isArray(array)) {
        return this.set(keypath, array, options && options.complete);
      }
      promise = runloop.start(this, true);
      this.viewmodel.merge(keypath, currentArray, array, options);
      runloop.end();
      return promise;
    }
    var Observer = function(ractive, keypath, callback, options) {
      this.root = ractive;
      this.keypath = keypath;
      this.callback = callback;
      this.defer = options.defer;
      this.context = options && options.context ? options.context : ractive;
    };
    Observer.prototype = {
      init: function(immediate) {
        this.value = this.root.get(this.keypath.str);
        if (immediate !== false) {
          this.update();
        } else {
          this.oldValue = this.value;
        }
      },
      setValue: function(value) {
        var _this = this;
        if (!isEqual(value, this.value)) {
          this.value = value;
          if (this.defer && this.ready) {
            runloop.scheduleTask(function() {
              return _this.update();
            });
          } else {
            this.update();
          }
        }
      },
      update: function() {
        if (this.updating) {
          return ;
        }
        this.updating = true;
        this.callback.call(this.context, this.value, this.oldValue, this.keypath.str);
        this.oldValue = this.value;
        this.updating = false;
      }
    };
    function getPattern(ractive, pattern) {
      var matchingKeypaths,
          values;
      matchingKeypaths = getMatchingKeypaths(ractive, pattern);
      values = {};
      matchingKeypaths.forEach(function(keypath) {
        values[keypath.str] = ractive.get(keypath.str);
      });
      return values;
    }
    var PatternObserver,
        slice = Array.prototype.slice;
    PatternObserver = function(ractive, keypath, callback, options) {
      this.root = ractive;
      this.callback = callback;
      this.defer = options.defer;
      this.keypath = keypath;
      this.regex = new RegExp("^" + keypath.str.replace(/\./g, "\\.").replace(/\*/g, "([^\\.]+)") + "$");
      this.values = {};
      if (this.defer) {
        this.proxies = [];
      }
      this.context = options && options.context ? options.context : ractive;
    };
    PatternObserver.prototype = {
      init: function(immediate) {
        var values,
            keypath;
        values = getPattern(this.root, this.keypath);
        if (immediate !== false) {
          for (keypath in values) {
            if (values.hasOwnProperty(keypath)) {
              this.update(getKeypath(keypath));
            }
          }
        } else {
          this.values = values;
        }
      },
      update: function(keypath) {
        var _this = this;
        var values;
        if (keypath.isPattern) {
          values = getPattern(this.root, keypath);
          for (keypath in values) {
            if (values.hasOwnProperty(keypath)) {
              this.update(getKeypath(keypath));
            }
          }
          return ;
        }
        if (this.root.viewmodel.implicitChanges[keypath.str]) {
          return ;
        }
        if (this.defer && this.ready) {
          runloop.scheduleTask(function() {
            return _this.getProxy(keypath).update();
          });
          return ;
        }
        this.reallyUpdate(keypath);
      },
      reallyUpdate: function(keypath) {
        var keypathStr,
            value,
            keys,
            args;
        keypathStr = keypath.str;
        value = this.root.viewmodel.get(keypath);
        if (this.updating) {
          this.values[keypathStr] = value;
          return ;
        }
        this.updating = true;
        if (!isEqual(value, this.values[keypathStr]) || !this.ready) {
          keys = slice.call(this.regex.exec(keypathStr), 1);
          args = [value, this.values[keypathStr], keypathStr].concat(keys);
          this.values[keypathStr] = value;
          this.callback.apply(this.context, args);
        }
        this.updating = false;
      },
      getProxy: function(keypath) {
        var _this = this;
        if (!this.proxies[keypath.str]) {
          this.proxies[keypath.str] = {update: function() {
              return _this.reallyUpdate(keypath);
            }};
        }
        return this.proxies[keypath.str];
      }
    };
    var emptyObject = {};
    function getObserverFacade(ractive, keypath, callback, options) {
      var observer,
          isPatternObserver,
          cancelled;
      keypath = getKeypath(normalise(keypath));
      options = options || emptyObject;
      if (keypath.isPattern) {
        observer = new PatternObserver(ractive, keypath, callback, options);
        ractive.viewmodel.patternObservers.push(observer);
        isPatternObserver = true;
      } else {
        observer = new Observer(ractive, keypath, callback, options);
      }
      observer.init(options.init);
      ractive.viewmodel.register(keypath, observer, isPatternObserver ? "patternObservers" : "observers");
      observer.ready = true;
      return {cancel: function() {
          var index;
          if (cancelled) {
            return ;
          }
          if (isPatternObserver) {
            index = ractive.viewmodel.patternObservers.indexOf(observer);
            ractive.viewmodel.patternObservers.splice(index, 1);
            ractive.viewmodel.unregister(keypath, observer, "patternObservers");
          } else {
            ractive.viewmodel.unregister(keypath, observer, "observers");
          }
          cancelled = true;
        }};
    }
    var observe = Ractive$observe;
    function Ractive$observe(keypath, callback, options) {
      var observers,
          map,
          keypaths,
          i;
      if (isObject(keypath)) {
        options = callback;
        map = keypath;
        observers = [];
        for (keypath in map) {
          if (map.hasOwnProperty(keypath)) {
            callback = map[keypath];
            observers.push(this.observe(keypath, callback, options));
          }
        }
        return {cancel: function() {
            while (observers.length) {
              observers.pop().cancel();
            }
          }};
      }
      if (typeof keypath === "function") {
        options = callback;
        callback = keypath;
        keypath = "";
        return getObserverFacade(this, keypath, callback, options);
      }
      keypaths = keypath.split(" ");
      if (keypaths.length === 1) {
        return getObserverFacade(this, keypath, callback, options);
      }
      observers = [];
      i = keypaths.length;
      while (i--) {
        keypath = keypaths[i];
        if (keypath) {
          observers.push(getObserverFacade(this, keypath, callback, options));
        }
      }
      return {cancel: function() {
          while (observers.length) {
            observers.pop().cancel();
          }
        }};
    }
    var observeOnce = Ractive$observeOnce;
    function Ractive$observeOnce(property, callback, options) {
      var observer = this.observe(property, function() {
        callback.apply(this, arguments);
        observer.cancel();
      }, {
        init: false,
        defer: options && options.defer
      });
      return observer;
    }
    var trim__default = function(str) {
      return str.trim();
    };
    var notEmptyString = function(str) {
      return str !== "";
    };
    var off = Ractive$off;
    function Ractive$off(eventName, callback) {
      var _this = this;
      var eventNames;
      if (!eventName) {
        for (eventName in this._subs) {
          delete this._subs[eventName];
        }
      } else {
        eventNames = eventName.split(" ").map(trim__default).filter(notEmptyString);
        eventNames.forEach(function(eventName) {
          var subscribers,
              index;
          if (subscribers = _this._subs[eventName]) {
            if (callback) {
              index = subscribers.indexOf(callback);
              if (index !== -1) {
                subscribers.splice(index, 1);
              }
            } else {
              _this._subs[eventName] = [];
            }
          }
        });
      }
      return this;
    }
    var on = Ractive$on;
    function Ractive$on(eventName, callback) {
      var _this = this;
      var listeners,
          n,
          eventNames;
      if (typeof eventName === "object") {
        listeners = [];
        for (n in eventName) {
          if (eventName.hasOwnProperty(n)) {
            listeners.push(this.on(n, eventName[n]));
          }
        }
        return {cancel: function() {
            var listener;
            while (listener = listeners.pop()) {
              listener.cancel();
            }
          }};
      }
      eventNames = eventName.split(" ").map(trim__default).filter(notEmptyString);
      eventNames.forEach(function(eventName) {
        (_this._subs[eventName] || (_this._subs[eventName] = [])).push(callback);
      });
      return {cancel: function() {
          return _this.off(eventName, callback);
        }};
    }
    var once = Ractive$once;
    function Ractive$once(eventName, handler) {
      var listener = this.on(eventName, function() {
        handler.apply(this, arguments);
        listener.cancel();
      });
      return listener;
    }
    function getNewIndices(array, methodName, args) {
      var spliceArguments,
          len,
          newIndices = [],
          removeStart,
          removeEnd,
          balance,
          i;
      spliceArguments = getSpliceEquivalent(array, methodName, args);
      if (!spliceArguments) {
        return null;
      }
      len = array.length;
      balance = spliceArguments.length - 2 - spliceArguments[1];
      removeStart = Math.min(len, spliceArguments[0]);
      removeEnd = removeStart + spliceArguments[1];
      for (i = 0; i < removeStart; i += 1) {
        newIndices.push(i);
      }
      for (; i < removeEnd; i += 1) {
        newIndices.push(-1);
      }
      for (; i < len; i += 1) {
        newIndices.push(i + balance);
      }
      if (balance !== 0) {
        newIndices.touchedFrom = spliceArguments[0];
      } else {
        newIndices.touchedFrom = array.length;
      }
      return newIndices;
    }
    function getSpliceEquivalent(array, methodName, args) {
      switch (methodName) {
        case "splice":
          if (args[0] !== undefined && args[0] < 0) {
            args[0] = array.length + Math.max(args[0], -array.length);
          }
          while (args.length < 2) {
            args.push(0);
          }
          args[1] = Math.min(args[1], array.length - args[0]);
          return args;
        case "sort":
        case "reverse":
          return null;
        case "pop":
          if (array.length) {
            return [array.length - 1, 1];
          }
          return [0, 0];
        case "push":
          return [array.length, 0].concat(args);
        case "shift":
          return [0, array.length ? 1 : 0];
        case "unshift":
          return [0, 0].concat(args);
      }
    }
    var arrayProto = Array.prototype;
    var makeArrayMethod = function(methodName) {
      return function(keypath) {
        for (var _len = arguments.length,
            args = Array(_len > 1 ? _len - 1 : 0),
            _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        var array,
            newIndices = [],
            len,
            promise,
            result;
        keypath = getKeypath(normalise(keypath));
        array = this.viewmodel.get(keypath);
        len = array.length;
        if (!isArray(array)) {
          throw new Error("Called ractive." + methodName + "('" + keypath.str + "'), but '" + keypath.str + "' does not refer to an array");
        }
        newIndices = getNewIndices(array, methodName, args);
        result = arrayProto[methodName].apply(array, args);
        promise = runloop.start(this, true).then(function() {
          return result;
        });
        if (!!newIndices) {
          this.viewmodel.smartUpdate(keypath, array, newIndices);
        } else {
          this.viewmodel.mark(keypath);
        }
        runloop.end();
        return promise;
      };
    };
    var pop = makeArrayMethod("pop");
    var push = makeArrayMethod("push");
    var css,
        update,
        styleElement,
        head,
        styleSheet,
        inDom,
        css__prefix = "/* Ractive.js component styles */\n",
        styles = [],
        dirty = false;
    if (!isClient) {
      css = null;
    } else {
      styleElement = document.createElement("style");
      styleElement.type = "text/css";
      head = document.getElementsByTagName("head")[0];
      inDom = false;
      styleSheet = styleElement.styleSheet;
      update = function() {
        var css = css__prefix + styles.map(function(s) {
          return "\n/* {" + s.id + "} */\n" + s.styles;
        }).join("\n");
        if (styleSheet) {
          styleSheet.cssText = css;
        } else {
          styleElement.innerHTML = css;
        }
        if (!inDom) {
          head.appendChild(styleElement);
          inDom = true;
        }
      };
      css = {
        add: function(s) {
          styles.push(s);
          dirty = true;
        },
        apply: function() {
          if (dirty) {
            update();
            dirty = false;
          }
        }
      };
    }
    var prototype_render = Ractive$render;
    var renderHook = new Hook("render"),
        completeHook = new Hook("complete");
    function Ractive$render(target, anchor) {
      var _this = this;
      var promise,
          instances,
          transitionsEnabled;
      transitionsEnabled = this.transitionsEnabled;
      if (this.noIntro) {
        this.transitionsEnabled = false;
      }
      promise = runloop.start(this, true);
      runloop.scheduleTask(function() {
        return renderHook.fire(_this);
      }, true);
      if (this.fragment.rendered) {
        throw new Error("You cannot call ractive.render() on an already rendered instance! Call ractive.unrender() first");
      }
      target = getElement(target) || this.el;
      anchor = getElement(anchor) || this.anchor;
      this.el = target;
      this.anchor = anchor;
      if (!this.append && target) {
        var others = target.__ractive_instances__;
        if (others && others.length) {
          removeOtherInstances(others);
        }
        target.innerHTML = "";
      }
      if (this.cssId) {
        css.apply();
      }
      if (target) {
        if (!(instances = target.__ractive_instances__)) {
          target.__ractive_instances__ = [this];
        } else {
          instances.push(this);
        }
        if (anchor) {
          target.insertBefore(this.fragment.render(), anchor);
        } else {
          target.appendChild(this.fragment.render());
        }
      }
      runloop.end();
      this.transitionsEnabled = transitionsEnabled;
      return promise.then(function() {
        return completeHook.fire(_this);
      });
    }
    function removeOtherInstances(others) {
      others.splice(0, others.length).forEach(teardown);
    }
    var adaptConfigurator = {
      extend: function(Parent, proto, options) {
        proto.adapt = adaptConfigurator__combine(proto.adapt, ensureArray(options.adapt));
      },
      init: function() {}
    };
    function adaptConfigurator__combine(a, b) {
      var c = a.slice(),
          i = b.length;
      while (i--) {
        if (!~c.indexOf(b[i])) {
          c.push(b[i]);
        }
      }
      return c;
    }
    var selectorsPattern = /(?:^|\})?\s*([^\{\}]+)\s*\{/g,
        commentsPattern = /\/\*.*?\*\//g,
        selectorUnitPattern = /((?:(?:\[[^\]+]\])|(?:[^\s\+\>\~:]))+)((?::[^\s\+\>\~\(]+(?:\([^\)]+\))?)?\s*[\s\+\>\~]?)\s*/g,
        mediaQueryPattern = /^@media/,
        dataRvcGuidPattern = /\[data-ractive-css~="\{[a-z0-9-]+\}"]/g;
    function transformCss(css, id) {
      var transformed,
          dataAttr,
          addGuid;
      dataAttr = "[data-ractive-css~=\"{" + id + "}\"]";
      addGuid = function(selector) {
        var selectorUnits,
            match,
            unit,
            base,
            prepended,
            appended,
            i,
            transformed = [];
        selectorUnits = [];
        while (match = selectorUnitPattern.exec(selector)) {
          selectorUnits.push({
            str: match[0],
            base: match[1],
            modifiers: match[2]
          });
        }
        base = selectorUnits.map(extractString);
        i = selectorUnits.length;
        while (i--) {
          appended = base.slice();
          unit = selectorUnits[i];
          appended[i] = unit.base + dataAttr + unit.modifiers || "";
          prepended = base.slice();
          prepended[i] = dataAttr + " " + prepended[i];
          transformed.push(appended.join(" "), prepended.join(" "));
        }
        return transformed.join(", ");
      };
      if (dataRvcGuidPattern.test(css)) {
        transformed = css.replace(dataRvcGuidPattern, dataAttr);
      } else {
        transformed = css.replace(commentsPattern, "").replace(selectorsPattern, function(match, $1) {
          var selectors,
              transformed;
          if (mediaQueryPattern.test($1))
            return match;
          selectors = $1.split(",").map(trim);
          transformed = selectors.map(addGuid).join(", ") + " ";
          return match.replace($1, transformed);
        });
      }
      return transformed;
    }
    function trim(str) {
      if (str.trim) {
        return str.trim();
      }
      return str.replace(/^\s+/, "").replace(/\s+$/, "");
    }
    function extractString(unit) {
      return unit.str;
    }
    var cssConfigurator__uid = 1;
    var cssConfigurator = {
      name: "css",
      extend: function(Parent, proto, options) {
        if (options.css) {
          var id = cssConfigurator__uid++;
          var styles = options.noCssTransform ? options.css : transformCss(options.css, id);
          proto.cssId = id;
          css.add({
            id: id,
            styles: styles
          });
        }
      },
      init: function() {}
    };
    function validate(data) {
      if (data && data.constructor !== Object) {
        if (typeof data === "function") {} else if (typeof data !== "object") {
          fatal("data option must be an object or a function, `" + data + "` is not valid");
        } else {
          warnIfDebug("If supplied, options.data should be a plain JavaScript object - using a non-POJO as the root object may work, but is discouraged");
        }
      }
    }
    var dataConfigurator = {
      name: "data",
      extend: function(Parent, proto, options) {
        var key = undefined,
            value = undefined;
        if (options.data && isObject(options.data)) {
          for (key in options.data) {
            value = options.data[key];
            if (value && typeof value === "object") {
              if (isObject(value) || isArray(value)) {
                warnIfDebug("Passing a `data` option with object and array properties to Ractive.extend() is discouraged, as mutating them is likely to cause bugs. Consider using a data function instead:\n\n  // this...\n  data: function () {\n    return {\n      myObject: {}\n    };\n  })\n\n  // instead of this:\n  data: {\n    myObject: {}\n  }");
              }
            }
          }
        }
        proto.data = dataConfigurator__combine(proto.data, options.data);
      },
      init: function(Parent, ractive, options) {
        var result = dataConfigurator__combine(Parent.prototype.data, options.data);
        if (typeof result === "function") {
          result = result.call(ractive);
        }
        return result || {};
      },
      reset: function(ractive) {
        var result = this.init(ractive.constructor, ractive, ractive.viewmodel);
        ractive.viewmodel.reset(result);
        return true;
      }
    };
    function dataConfigurator__combine(parentValue, childValue) {
      validate(childValue);
      var parentIsFn = typeof parentValue === "function";
      var childIsFn = typeof childValue === "function";
      if (!childValue && !parentIsFn) {
        childValue = {};
      }
      if (!parentIsFn && !childIsFn) {
        return fromProperties(childValue, parentValue);
      }
      return function() {
        var child = childIsFn ? callDataFunction(childValue, this) : childValue;
        var parent = parentIsFn ? callDataFunction(parentValue, this) : parentValue;
        return fromProperties(child, parent);
      };
    }
    function callDataFunction(fn, context) {
      var data = fn.call(context);
      if (!data)
        return ;
      if (typeof data !== "object") {
        fatal("Data function must return an object");
      }
      if (data.constructor !== Object) {
        warnOnceIfDebug("Data function returned something other than a plain JavaScript object. This might work, but is strongly discouraged");
      }
      return data;
    }
    function fromProperties(primary, secondary) {
      if (primary && secondary) {
        for (var key in secondary) {
          if (!(key in primary)) {
            primary[key] = secondary[key];
          }
        }
        return primary;
      }
      return primary || secondary;
    }
    var Parser,
        ParseError,
        Parser__leadingWhitespace = /^\s+/;
    ParseError = function(message) {
      this.name = "ParseError";
      this.message = message;
      try {
        throw new Error(message);
      } catch (e) {
        this.stack = e.stack;
      }
    };
    ParseError.prototype = Error.prototype;
    Parser = function(str, options) {
      var items,
          item,
          lineStart = 0;
      this.str = str;
      this.options = options || {};
      this.pos = 0;
      this.lines = this.str.split("\n");
      this.lineEnds = this.lines.map(function(line) {
        var lineEnd = lineStart + line.length + 1;
        lineStart = lineEnd;
        return lineEnd;
      }, 0);
      if (this.init)
        this.init(str, options);
      items = [];
      while (this.pos < this.str.length && (item = this.read())) {
        items.push(item);
      }
      this.leftover = this.remaining();
      this.result = this.postProcess ? this.postProcess(items, options) : items;
    };
    Parser.prototype = {
      read: function(converters) {
        var pos,
            i,
            len,
            item;
        if (!converters)
          converters = this.converters;
        pos = this.pos;
        len = converters.length;
        for (i = 0; i < len; i += 1) {
          this.pos = pos;
          if (item = converters[i](this)) {
            return item;
          }
        }
        return null;
      },
      getLinePos: function(char) {
        var lineNum = 0,
            lineStart = 0,
            columnNum;
        while (char >= this.lineEnds[lineNum]) {
          lineStart = this.lineEnds[lineNum];
          lineNum += 1;
        }
        columnNum = char - lineStart;
        return [lineNum + 1, columnNum + 1, char];
      },
      error: function(message) {
        var pos = this.getLinePos(this.pos);
        var lineNum = pos[0];
        var columnNum = pos[1];
        var line = this.lines[pos[0] - 1];
        var numTabs = 0;
        var annotation = line.replace(/\t/g, function(match, char) {
          if (char < pos[1]) {
            numTabs += 1;
          }
          return "  ";
        }) + "\n" + new Array(pos[1] + numTabs).join(" ") + "^----";
        var error = new ParseError("" + message + " at line " + lineNum + " character " + columnNum + ":\n" + annotation);
        error.line = pos[0];
        error.character = pos[1];
        error.shortMessage = message;
        throw error;
      },
      matchString: function(string) {
        if (this.str.substr(this.pos, string.length) === string) {
          this.pos += string.length;
          return string;
        }
      },
      matchPattern: function(pattern) {
        var match;
        if (match = pattern.exec(this.remaining())) {
          this.pos += match[0].length;
          return match[1] || match[0];
        }
      },
      allowWhitespace: function() {
        this.matchPattern(Parser__leadingWhitespace);
      },
      remaining: function() {
        return this.str.substring(this.pos);
      },
      nextChar: function() {
        return this.str.charAt(this.pos);
      }
    };
    Parser.extend = function(proto) {
      var Parent = this,
          Child,
          key;
      Child = function(str, options) {
        Parser.call(this, str, options);
      };
      Child.prototype = create(Parent.prototype);
      for (key in proto) {
        if (hasOwn.call(proto, key)) {
          Child.prototype[key] = proto[key];
        }
      }
      Child.extend = Parser.extend;
      return Child;
    };
    var TEXT = 1;
    var INTERPOLATOR = 2;
    var TRIPLE = 3;
    var SECTION = 4;
    var INVERTED = 5;
    var CLOSING = 6;
    var ELEMENT = 7;
    var PARTIAL = 8;
    var COMMENT = 9;
    var DELIMCHANGE = 10;
    var ATTRIBUTE = 13;
    var CLOSING_TAG = 14;
    var COMPONENT = 15;
    var YIELDER = 16;
    var INLINE_PARTIAL = 17;
    var DOCTYPE = 18;
    var NUMBER_LITERAL = 20;
    var STRING_LITERAL = 21;
    var ARRAY_LITERAL = 22;
    var OBJECT_LITERAL = 23;
    var BOOLEAN_LITERAL = 24;
    var REGEXP_LITERAL = 25;
    var GLOBAL = 26;
    var KEY_VALUE_PAIR = 27;
    var REFERENCE = 30;
    var REFINEMENT = 31;
    var MEMBER = 32;
    var PREFIX_OPERATOR = 33;
    var BRACKETED = 34;
    var CONDITIONAL = 35;
    var INFIX_OPERATOR = 36;
    var INVOCATION = 40;
    var SECTION_IF = 50;
    var SECTION_UNLESS = 51;
    var SECTION_EACH = 52;
    var SECTION_WITH = 53;
    var SECTION_IF_WITH = 54;
    var ELSE = 60;
    var ELSEIF = 61;
    var delimiterChangePattern = /^[^\s=]+/,
        whitespacePattern = /^\s+/;
    function readDelimiterChange(parser) {
      var start,
          opening,
          closing;
      if (!parser.matchString("=")) {
        return null;
      }
      start = parser.pos;
      parser.allowWhitespace();
      opening = parser.matchPattern(delimiterChangePattern);
      if (!opening) {
        parser.pos = start;
        return null;
      }
      if (!parser.matchPattern(whitespacePattern)) {
        return null;
      }
      closing = parser.matchPattern(delimiterChangePattern);
      if (!closing) {
        parser.pos = start;
        return null;
      }
      parser.allowWhitespace();
      if (!parser.matchString("=")) {
        parser.pos = start;
        return null;
      }
      return [opening, closing];
    }
    var readRegexpLiteral = readRegexpLiteral__readNumberLiteral;
    var regexpPattern = /^(\/(?:[^\n\r\u2028\u2029/\\[]|\\.|\[(?:[^\n\r\u2028\u2029\]\\]|\\.)*])+\/(?:([gimuy])(?![a-z]*\2))*(?![a-zA-Z_$0-9]))/;
    function readRegexpLiteral__readNumberLiteral(parser) {
      var result;
      if (result = parser.matchPattern(regexpPattern)) {
        return {
          t: REGEXP_LITERAL,
          v: result
        };
      }
      return null;
    }
    var delimiterChangeToken = {
      t: DELIMCHANGE,
      exclude: true
    };
    function readMustache(parser) {
      var mustache,
          i;
      if (parser.interpolate[parser.inside] === false) {
        return null;
      }
      for (i = 0; i < parser.tags.length; i += 1) {
        if (mustache = readMustacheOfType(parser, parser.tags[i])) {
          return mustache;
        }
      }
    }
    function readMustacheOfType(parser, tag) {
      var start,
          mustache,
          reader,
          i;
      start = parser.pos;
      if (parser.matchString("\\" + tag.open)) {
        if (start === 0 || parser.str[start - 1] !== "\\") {
          return tag.open;
        }
      } else if (!parser.matchString(tag.open)) {
        return null;
      }
      if (mustache = readDelimiterChange(parser)) {
        if (!parser.matchString(tag.close)) {
          return null;
        }
        tag.open = mustache[0];
        tag.close = mustache[1];
        parser.sortMustacheTags();
        return delimiterChangeToken;
      }
      parser.allowWhitespace();
      if (parser.matchString("/")) {
        parser.pos -= 1;
        var rewind = parser.pos;
        if (!readRegexpLiteral(parser)) {
          parser.pos = rewind - tag.close.length;
          parser.error("Attempted to close a section that wasn't open");
        } else {
          parser.pos = rewind;
        }
      }
      for (i = 0; i < tag.readers.length; i += 1) {
        reader = tag.readers[i];
        if (mustache = reader(parser, tag)) {
          if (tag.isStatic) {
            mustache.s = true;
          }
          if (parser.includeLinePositions) {
            mustache.p = parser.getLinePos(start);
          }
          return mustache;
        }
      }
      parser.pos = start;
      return null;
    }
    var expectedExpression = "Expected a JavaScript expression";
    var expectedParen = "Expected closing paren";
    var readNumberLiteral__default = readNumberLiteral__readNumberLiteral;
    var readNumberLiteral__numberPattern = /^(?:[+-]?)0*(?:(?:(?:[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/;
    function readNumberLiteral__readNumberLiteral(parser) {
      var result;
      if (result = parser.matchPattern(readNumberLiteral__numberPattern)) {
        return {
          t: NUMBER_LITERAL,
          v: result
        };
      }
      return null;
    }
    function readBooleanLiteral(parser) {
      var remaining = parser.remaining();
      if (remaining.substr(0, 4) === "true") {
        parser.pos += 4;
        return {
          t: BOOLEAN_LITERAL,
          v: "true"
        };
      }
      if (remaining.substr(0, 5) === "false") {
        parser.pos += 5;
        return {
          t: BOOLEAN_LITERAL,
          v: "false"
        };
      }
      return null;
    }
    var stringMiddlePattern,
        escapeSequencePattern,
        lineContinuationPattern;
    stringMiddlePattern = /^(?=.)[^"'\\]+?(?:(?!.)|(?=["'\\]))/;
    escapeSequencePattern = /^\\(?:['"\\bfnrt]|0(?![0-9])|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|(?=.)[^ux0-9])/;
    lineContinuationPattern = /^\\(?:\r\n|[\u000A\u000D\u2028\u2029])/;
    var makeQuotedStringMatcher = function(okQuote) {
      return function(parser) {
        var start,
            literal,
            done,
            next;
        start = parser.pos;
        literal = "\"";
        done = false;
        while (!done) {
          next = parser.matchPattern(stringMiddlePattern) || parser.matchPattern(escapeSequencePattern) || parser.matchString(okQuote);
          if (next) {
            if (next === "\"") {
              literal += "\\\"";
            } else if (next === "\\'") {
              literal += "'";
            } else {
              literal += next;
            }
          } else {
            next = parser.matchPattern(lineContinuationPattern);
            if (next) {
              literal += "\\u" + ("000" + next.charCodeAt(1).toString(16)).slice(-4);
            } else {
              done = true;
            }
          }
        }
        literal += "\"";
        return JSON.parse(literal);
      };
    };
    var getSingleQuotedString = makeQuotedStringMatcher("\"");
    var getDoubleQuotedString = makeQuotedStringMatcher("'");
    var readStringLiteral = function(parser) {
      var start,
          string;
      start = parser.pos;
      if (parser.matchString("\"")) {
        string = getDoubleQuotedString(parser);
        if (!parser.matchString("\"")) {
          parser.pos = start;
          return null;
        }
        return {
          t: STRING_LITERAL,
          v: string
        };
      }
      if (parser.matchString("'")) {
        string = getSingleQuotedString(parser);
        if (!parser.matchString("'")) {
          parser.pos = start;
          return null;
        }
        return {
          t: STRING_LITERAL,
          v: string
        };
      }
      return null;
    };
    var patterns__name = /^[a-zA-Z_$][a-zA-Z_$0-9]*/;
    var identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
    function readKey(parser) {
      var token;
      if (token = readStringLiteral(parser)) {
        return identifier.test(token.v) ? token.v : "\"" + token.v.replace(/"/g, "\\\"") + "\"";
      }
      if (token = readNumberLiteral__default(parser)) {
        return token.v;
      }
      if (token = parser.matchPattern(patterns__name)) {
        return token;
      }
    }
    var getKeyValuePair__default = readKeyValuePair;
    function readKeyValuePair(parser) {
      var start,
          key,
          value;
      start = parser.pos;
      parser.allowWhitespace();
      key = readKey(parser);
      if (key === null) {
        parser.pos = start;
        return null;
      }
      parser.allowWhitespace();
      if (!parser.matchString(":")) {
        parser.pos = start;
        return null;
      }
      parser.allowWhitespace();
      value = readExpression(parser);
      if (value === null) {
        parser.pos = start;
        return null;
      }
      return {
        t: KEY_VALUE_PAIR,
        k: key,
        v: value
      };
    }
    function readKeyValuePairs(parser) {
      var start,
          pairs,
          pair,
          keyValuePairs;
      start = parser.pos;
      pair = getKeyValuePair__default(parser);
      if (pair === null) {
        return null;
      }
      pairs = [pair];
      if (parser.matchString(",")) {
        keyValuePairs = readKeyValuePairs(parser);
        if (!keyValuePairs) {
          parser.pos = start;
          return null;
        }
        return pairs.concat(keyValuePairs);
      }
      return pairs;
    }
    var readObjectLiteral = function(parser) {
      var start,
          keyValuePairs;
      start = parser.pos;
      parser.allowWhitespace();
      if (!parser.matchString("{")) {
        parser.pos = start;
        return null;
      }
      keyValuePairs = readKeyValuePairs(parser);
      parser.allowWhitespace();
      if (!parser.matchString("}")) {
        parser.pos = start;
        return null;
      }
      return {
        t: OBJECT_LITERAL,
        m: keyValuePairs
      };
    };
    function readExpressionList(parser) {
      var start,
          expressions,
          expr,
          next;
      start = parser.pos;
      parser.allowWhitespace();
      expr = readExpression(parser);
      if (expr === null) {
        return null;
      }
      expressions = [expr];
      parser.allowWhitespace();
      if (parser.matchString(",")) {
        next = readExpressionList(parser);
        if (next === null) {
          parser.error(expectedExpression);
        }
        next.forEach(append);
      }
      function append(expression) {
        expressions.push(expression);
      }
      return expressions;
    }
    var readArrayLiteral = function(parser) {
      var start,
          expressionList;
      start = parser.pos;
      parser.allowWhitespace();
      if (!parser.matchString("[")) {
        parser.pos = start;
        return null;
      }
      expressionList = readExpressionList(parser);
      if (!parser.matchString("]")) {
        parser.pos = start;
        return null;
      }
      return {
        t: ARRAY_LITERAL,
        m: expressionList
      };
    };
    function readLiteral(parser) {
      return readNumberLiteral__default(parser) || readBooleanLiteral(parser) || readStringLiteral(parser) || readObjectLiteral(parser) || readArrayLiteral(parser) || readRegexpLiteral(parser);
    }
    var prefixPattern = /^(?:~\/|(?:\.\.\/)+|\.\/(?:\.\.\/)*|\.)/,
        globals,
        keywords;
    globals = /^(?:Array|console|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null)\b/;
    keywords = /^(?:break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|var|void|while|with)$/;
    var legalReference = /^[a-zA-Z$_0-9]+(?:(?:\.[a-zA-Z$_0-9]+)|(?:\[[0-9]+\]))*/;
    var relaxedName = /^[a-zA-Z_$][-a-zA-Z_$0-9]*/;
    function readReference(parser) {
      var startPos,
          prefix,
          name,
          global,
          reference,
          lastDotIndex;
      startPos = parser.pos;
      name = parser.matchPattern(/^@(?:keypath|index|key)/);
      if (!name) {
        prefix = parser.matchPattern(prefixPattern) || "";
        name = !prefix && parser.relaxedNames && parser.matchPattern(relaxedName) || parser.matchPattern(legalReference);
        if (!name && prefix === ".") {
          prefix = "";
          name = ".";
        }
      }
      if (!name) {
        return null;
      }
      if (!prefix && !parser.relaxedNames && keywords.test(name)) {
        parser.pos = startPos;
        return null;
      }
      if (!prefix && globals.test(name)) {
        global = globals.exec(name)[0];
        parser.pos = startPos + global.length;
        return {
          t: GLOBAL,
          v: global
        };
      }
      reference = (prefix || "") + normalise(name);
      if (parser.matchString("(")) {
        lastDotIndex = reference.lastIndexOf(".");
        if (lastDotIndex !== -1) {
          reference = reference.substr(0, lastDotIndex);
          parser.pos = startPos + reference.length;
        } else {
          parser.pos -= 1;
        }
      }
      return {
        t: REFERENCE,
        n: reference.replace(/^this\./, "./").replace(/^this$/, ".")
      };
    }
    function readBracketedExpression(parser) {
      var start,
          expr;
      start = parser.pos;
      if (!parser.matchString("(")) {
        return null;
      }
      parser.allowWhitespace();
      expr = readExpression(parser);
      if (!expr) {
        parser.error(expectedExpression);
      }
      parser.allowWhitespace();
      if (!parser.matchString(")")) {
        parser.error(expectedParen);
      }
      return {
        t: BRACKETED,
        x: expr
      };
    }
    var readPrimary = function(parser) {
      return readLiteral(parser) || readReference(parser) || readBracketedExpression(parser);
    };
    function readRefinement(parser) {
      var start,
          name,
          expr;
      start = parser.pos;
      parser.allowWhitespace();
      if (parser.matchString(".")) {
        parser.allowWhitespace();
        if (name = parser.matchPattern(patterns__name)) {
          return {
            t: REFINEMENT,
            n: name
          };
        }
        parser.error("Expected a property name");
      }
      if (parser.matchString("[")) {
        parser.allowWhitespace();
        expr = readExpression(parser);
        if (!expr) {
          parser.error(expectedExpression);
        }
        parser.allowWhitespace();
        if (!parser.matchString("]")) {
          parser.error("Expected ']'");
        }
        return {
          t: REFINEMENT,
          x: expr
        };
      }
      return null;
    }
    var readMemberOrInvocation = function(parser) {
      var current,
          expression,
          refinement,
          expressionList;
      expression = readPrimary(parser);
      if (!expression) {
        return null;
      }
      while (expression) {
        current = parser.pos;
        if (refinement = readRefinement(parser)) {
          expression = {
            t: MEMBER,
            x: expression,
            r: refinement
          };
        } else if (parser.matchString("(")) {
          parser.allowWhitespace();
          expressionList = readExpressionList(parser);
          parser.allowWhitespace();
          if (!parser.matchString(")")) {
            parser.error(expectedParen);
          }
          expression = {
            t: INVOCATION,
            x: expression
          };
          if (expressionList) {
            expression.o = expressionList;
          }
        } else {
          break;
        }
      }
      return expression;
    };
    var readTypeOf,
        makePrefixSequenceMatcher;
    makePrefixSequenceMatcher = function(symbol, fallthrough) {
      return function(parser) {
        var expression;
        if (expression = fallthrough(parser)) {
          return expression;
        }
        if (!parser.matchString(symbol)) {
          return null;
        }
        parser.allowWhitespace();
        expression = readExpression(parser);
        if (!expression) {
          parser.error(expectedExpression);
        }
        return {
          s: symbol,
          o: expression,
          t: PREFIX_OPERATOR
        };
      };
    };
    (function() {
      var i,
          len,
          matcher,
          prefixOperators,
          fallthrough;
      prefixOperators = "! ~ + - typeof".split(" ");
      fallthrough = readMemberOrInvocation;
      for (i = 0, len = prefixOperators.length; i < len; i += 1) {
        matcher = makePrefixSequenceMatcher(prefixOperators[i], fallthrough);
        fallthrough = matcher;
      }
      readTypeOf = fallthrough;
    })();
    var readTypeof = readTypeOf;
    var readLogicalOr,
        makeInfixSequenceMatcher;
    makeInfixSequenceMatcher = function(symbol, fallthrough) {
      return function(parser) {
        var start,
            left,
            right;
        left = fallthrough(parser);
        if (!left) {
          return null;
        }
        while (true) {
          start = parser.pos;
          parser.allowWhitespace();
          if (!parser.matchString(symbol)) {
            parser.pos = start;
            return left;
          }
          if (symbol === "in" && /[a-zA-Z_$0-9]/.test(parser.remaining().charAt(0))) {
            parser.pos = start;
            return left;
          }
          parser.allowWhitespace();
          right = fallthrough(parser);
          if (!right) {
            parser.pos = start;
            return left;
          }
          left = {
            t: INFIX_OPERATOR,
            s: symbol,
            o: [left, right]
          };
        }
      };
    };
    (function() {
      var i,
          len,
          matcher,
          infixOperators,
          fallthrough;
      infixOperators = "* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||".split(" ");
      fallthrough = readTypeof;
      for (i = 0, len = infixOperators.length; i < len; i += 1) {
        matcher = makeInfixSequenceMatcher(infixOperators[i], fallthrough);
        fallthrough = matcher;
      }
      readLogicalOr = fallthrough;
    })();
    var readConditional = getConditional;
    function getConditional(parser) {
      var start,
          expression,
          ifTrue,
          ifFalse;
      expression = readLogicalOr(parser);
      if (!expression) {
        return null;
      }
      start = parser.pos;
      parser.allowWhitespace();
      if (!parser.matchString("?")) {
        parser.pos = start;
        return expression;
      }
      parser.allowWhitespace();
      ifTrue = readExpression(parser);
      if (!ifTrue) {
        parser.error(expectedExpression);
      }
      parser.allowWhitespace();
      if (!parser.matchString(":")) {
        parser.error("Expected \":\"");
      }
      parser.allowWhitespace();
      ifFalse = readExpression(parser);
      if (!ifFalse) {
        parser.error(expectedExpression);
      }
      return {
        t: CONDITIONAL,
        o: [expression, ifTrue, ifFalse]
      };
    }
    function readExpression(parser) {
      return readConditional(parser);
    }
    function flattenExpression(expression) {
      var refs;
      extractRefs(expression, refs = []);
      return {
        r: refs,
        s: stringify(expression)
      };
      function stringify(node) {
        switch (node.t) {
          case BOOLEAN_LITERAL:
          case GLOBAL:
          case NUMBER_LITERAL:
          case REGEXP_LITERAL:
            return node.v;
          case STRING_LITERAL:
            return JSON.stringify(String(node.v));
          case ARRAY_LITERAL:
            return "[" + (node.m ? node.m.map(stringify).join(",") : "") + "]";
          case OBJECT_LITERAL:
            return "{" + (node.m ? node.m.map(stringify).join(",") : "") + "}";
          case KEY_VALUE_PAIR:
            return node.k + ":" + stringify(node.v);
          case PREFIX_OPERATOR:
            return (node.s === "typeof" ? "typeof " : node.s) + stringify(node.o);
          case INFIX_OPERATOR:
            return stringify(node.o[0]) + (node.s.substr(0, 2) === "in" ? " " + node.s + " " : node.s) + stringify(node.o[1]);
          case INVOCATION:
            return stringify(node.x) + "(" + (node.o ? node.o.map(stringify).join(",") : "") + ")";
          case BRACKETED:
            return "(" + stringify(node.x) + ")";
          case MEMBER:
            return stringify(node.x) + stringify(node.r);
          case REFINEMENT:
            return node.n ? "." + node.n : "[" + stringify(node.x) + "]";
          case CONDITIONAL:
            return stringify(node.o[0]) + "?" + stringify(node.o[1]) + ":" + stringify(node.o[2]);
          case REFERENCE:
            return "_" + refs.indexOf(node.n);
          default:
            throw new Error("Expected legal JavaScript");
        }
      }
    }
    function extractRefs(node, refs) {
      var i,
          list;
      if (node.t === REFERENCE) {
        if (refs.indexOf(node.n) === -1) {
          refs.unshift(node.n);
        }
      }
      list = node.o || node.m;
      if (list) {
        if (isObject(list)) {
          extractRefs(list, refs);
        } else {
          i = list.length;
          while (i--) {
            extractRefs(list[i], refs);
          }
        }
      }
      if (node.x) {
        extractRefs(node.x, refs);
      }
      if (node.r) {
        extractRefs(node.r, refs);
      }
      if (node.v) {
        extractRefs(node.v, refs);
      }
    }
    var arrayMemberPattern = /^[0-9][1-9]*$/;
    function refineExpression(expression, mustache) {
      var referenceExpression;
      if (expression) {
        while (expression.t === BRACKETED && expression.x) {
          expression = expression.x;
        }
        if (expression.t === REFERENCE) {
          mustache.r = expression.n;
        } else {
          if (expression.t === NUMBER_LITERAL && arrayMemberPattern.test(expression.v)) {
            mustache.r = expression.v;
          } else if (referenceExpression = getReferenceExpression(expression)) {
            mustache.rx = referenceExpression;
          } else {
            mustache.x = flattenExpression(expression);
          }
        }
        return mustache;
      }
    }
    function getReferenceExpression(expression) {
      var members = [],
          refinement;
      while (expression.t === MEMBER && expression.r.t === REFINEMENT) {
        refinement = expression.r;
        if (refinement.x) {
          if (refinement.x.t === REFERENCE) {
            members.unshift(refinement.x);
          } else {
            members.unshift(flattenExpression(refinement.x));
          }
        } else {
          members.unshift(refinement.n);
        }
        expression = expression.x;
      }
      if (expression.t !== REFERENCE) {
        return null;
      }
      return {
        r: expression.n,
        m: members
      };
    }
    function readTriple(parser, tag) {
      var expression = readExpression(parser),
          triple;
      if (!expression) {
        return null;
      }
      if (!parser.matchString(tag.close)) {
        parser.error("Expected closing delimiter '" + tag.close + "'");
      }
      triple = {t: TRIPLE};
      refineExpression(expression, triple);
      return triple;
    }
    function readUnescaped(parser, tag) {
      var expression,
          triple;
      if (!parser.matchString("&")) {
        return null;
      }
      parser.allowWhitespace();
      expression = readExpression(parser);
      if (!expression) {
        return null;
      }
      if (!parser.matchString(tag.close)) {
        parser.error("Expected closing delimiter '" + tag.close + "'");
      }
      triple = {t: TRIPLE};
      refineExpression(expression, triple);
      return triple;
    }
    function readPartial(parser, tag) {
      var start,
          nameStart,
          expression,
          context,
          partial;
      start = parser.pos;
      if (!parser.matchString(">")) {
        return null;
      }
      parser.allowWhitespace();
      nameStart = parser.pos;
      parser.relaxedNames = true;
      expression = readExpression(parser);
      parser.relaxedNames = false;
      parser.allowWhitespace();
      context = readExpression(parser);
      parser.allowWhitespace();
      if (!expression) {
        return null;
      }
      partial = {t: PARTIAL};
      refineExpression(expression, partial);
      parser.allowWhitespace();
      if (context) {
        partial = {
          t: SECTION,
          n: SECTION_WITH,
          f: [partial]
        };
        refineExpression(context, partial);
      }
      if (!parser.matchString(tag.close)) {
        parser.error("Expected closing delimiter '" + tag.close + "'");
      }
      return partial;
    }
    var readMustacheComment = readComment;
    function readComment(parser, tag) {
      var index;
      if (!parser.matchString("!")) {
        return null;
      }
      index = parser.remaining().indexOf(tag.close);
      if (index !== -1) {
        parser.pos += index + tag.close.length;
        return {t: COMMENT};
      }
    }
    function readExpressionOrReference(parser, expectedFollowers) {
      var start,
          expression,
          i;
      start = parser.pos;
      expression = readExpression(parser);
      if (!expression) {
        return null;
      }
      for (i = 0; i < expectedFollowers.length; i += 1) {
        if (parser.remaining().substr(0, expectedFollowers[i].length) === expectedFollowers[i]) {
          return expression;
        }
      }
      parser.pos = start;
      return readReference(parser);
    }
    function readInterpolator(parser, tag) {
      var start,
          expression,
          interpolator,
          err;
      start = parser.pos;
      try {
        expression = readExpressionOrReference(parser, [tag.close]);
      } catch (e) {
        err = e;
      }
      if (!expression) {
        if (parser.str.charAt(start) === "!") {
          parser.pos = start;
          return null;
        }
        if (err) {
          throw err;
        }
      }
      if (!parser.matchString(tag.close)) {
        parser.error("Expected closing delimiter '" + tag.close + "' after reference");
        if (!expression) {
          if (parser.nextChar() === "!") {
            return null;
          }
          parser.error("Expected expression or legal reference");
        }
      }
      interpolator = {t: INTERPOLATOR};
      refineExpression(expression, interpolator);
      return interpolator;
    }
    var yieldPattern = /^yield\s*/;
    function readYielder(parser, tag) {
      var start,
          name,
          yielder;
      if (!parser.matchPattern(yieldPattern)) {
        return null;
      }
      start = parser.pos;
      name = parser.matchPattern(/^[a-zA-Z_$][a-zA-Z_$0-9\-]*/);
      parser.allowWhitespace();
      if (!parser.matchString(tag.close)) {
        parser.error("expected legal partial name");
      }
      yielder = {t: YIELDER};
      if (name) {
        yielder.n = name;
      }
      return yielder;
    }
    function readClosing(parser, tag) {
      var start,
          remaining,
          index,
          closing;
      start = parser.pos;
      if (!parser.matchString(tag.open)) {
        return null;
      }
      parser.allowWhitespace();
      if (!parser.matchString("/")) {
        parser.pos = start;
        return null;
      }
      parser.allowWhitespace();
      remaining = parser.remaining();
      index = remaining.indexOf(tag.close);
      if (index !== -1) {
        closing = {
          t: CLOSING,
          r: remaining.substr(0, index).split(" ")[0]
        };
        parser.pos += index;
        if (!parser.matchString(tag.close)) {
          parser.error("Expected closing delimiter '" + tag.close + "'");
        }
        return closing;
      }
      parser.pos = start;
      return null;
    }
    var readElse__default = readElse__readElse;
    var readElse__elsePattern = /^\s*else\s*/;
    function readElse__readElse(parser, tag) {
      var start = parser.pos;
      if (!parser.matchString(tag.open)) {
        return null;
      }
      if (!parser.matchPattern(readElse__elsePattern)) {
        parser.pos = start;
        return null;
      }
      if (!parser.matchString(tag.close)) {
        parser.error("Expected closing delimiter '" + tag.close + "'");
      }
      return {t: ELSE};
    }
    var readElseIf = readElseIf__readElse;
    var readElseIf__elsePattern = /^\s*elseif\s+/;
    function readElseIf__readElse(parser, tag) {
      var start = parser.pos,
          expression;
      if (!parser.matchString(tag.open)) {
        return null;
      }
      if (!parser.matchPattern(readElseIf__elsePattern)) {
        parser.pos = start;
        return null;
      }
      expression = readExpression(parser);
      if (!parser.matchString(tag.close)) {
        parser.error("Expected closing delimiter '" + tag.close + "'");
      }
      return {
        t: ELSEIF,
        x: expression
      };
    }
    var handlebarsBlockCodes = {
      each: SECTION_EACH,
      "if": SECTION_IF,
      "if-with": SECTION_IF_WITH,
      "with": SECTION_WITH,
      unless: SECTION_UNLESS
    };
    var indexRefPattern = /^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/,
        keyIndexRefPattern = /^\s*,\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/,
        handlebarsBlockPattern = new RegExp("^(" + Object.keys(handlebarsBlockCodes).join("|") + ")\\b");
    function readSection(parser, tag) {
      var start,
          expression,
          section,
          child,
          children,
          hasElse,
          block,
          unlessBlock,
          conditions,
          closed,
          i,
          expectedClose;
      start = parser.pos;
      if (parser.matchString("^")) {
        section = {
          t: SECTION,
          f: [],
          n: SECTION_UNLESS
        };
      } else if (parser.matchString("#")) {
        section = {
          t: SECTION,
          f: []
        };
        if (parser.matchString("partial")) {
          parser.pos = start - parser.standardDelimiters[0].length;
          parser.error("Partial definitions can only be at the top level of the template, or immediately inside components");
        }
        if (block = parser.matchPattern(handlebarsBlockPattern)) {
          expectedClose = block;
          section.n = handlebarsBlockCodes[block];
        }
      } else {
        return null;
      }
      parser.allowWhitespace();
      expression = readExpression(parser);
      if (!expression) {
        parser.error("Expected expression");
      }
      if (i = parser.matchPattern(indexRefPattern)) {
        var extra = undefined;
        if (extra = parser.matchPattern(keyIndexRefPattern)) {
          section.i = i + "," + extra;
        } else {
          section.i = i;
        }
      }
      parser.allowWhitespace();
      if (!parser.matchString(tag.close)) {
        parser.error("Expected closing delimiter '" + tag.close + "'");
      }
      parser.sectionDepth += 1;
      children = section.f;
      conditions = [];
      do {
        if (child = readClosing(parser, tag)) {
          if (expectedClose && child.r !== expectedClose) {
            parser.error("Expected " + tag.open + "/" + expectedClose + "" + tag.close);
          }
          parser.sectionDepth -= 1;
          closed = true;
        } else if (child = readElseIf(parser, tag)) {
          if (section.n === SECTION_UNLESS) {
            parser.error("{{else}} not allowed in {{#unless}}");
          }
          if (hasElse) {
            parser.error("illegal {{elseif...}} after {{else}}");
          }
          if (!unlessBlock) {
            unlessBlock = createUnlessBlock(expression, section.n);
          }
          unlessBlock.f.push({
            t: SECTION,
            n: SECTION_IF,
            x: flattenExpression(readSection__combine(conditions.concat(child.x))),
            f: children = []
          });
          conditions.push(invert(child.x));
        } else if (child = readElse__default(parser, tag)) {
          if (section.n === SECTION_UNLESS) {
            parser.error("{{else}} not allowed in {{#unless}}");
          }
          if (hasElse) {
            parser.error("there can only be one {{else}} block, at the end of a section");
          }
          hasElse = true;
          if (!unlessBlock) {
            unlessBlock = createUnlessBlock(expression, section.n);
            children = unlessBlock.f;
          } else {
            unlessBlock.f.push({
              t: SECTION,
              n: SECTION_IF,
              x: flattenExpression(readSection__combine(conditions)),
              f: children = []
            });
          }
        } else {
          child = parser.read(READERS);
          if (!child) {
            break;
          }
          children.push(child);
        }
      } while (!closed);
      if (unlessBlock) {
        if (section.n === SECTION_WITH) {
          section.n = SECTION_IF_WITH;
        }
        section.l = unlessBlock;
      }
      refineExpression(expression, section);
      if (!section.f.length) {
        delete section.f;
      }
      return section;
    }
    function createUnlessBlock(expression, sectionType) {
      var unlessBlock;
      if (sectionType === SECTION_WITH) {
        unlessBlock = {
          t: SECTION,
          n: SECTION_IF,
          f: []
        };
        refineExpression(invert(expression), unlessBlock);
      } else {
        unlessBlock = {
          t: SECTION,
          n: SECTION_UNLESS,
          f: []
        };
        refineExpression(expression, unlessBlock);
      }
      return unlessBlock;
    }
    function invert(expression) {
      if (expression.t === PREFIX_OPERATOR && expression.s === "!") {
        return expression.o;
      }
      return {
        t: PREFIX_OPERATOR,
        s: "!",
        o: parensIfNecessary(expression)
      };
    }
    function readSection__combine(expressions) {
      if (expressions.length === 1) {
        return expressions[0];
      }
      return {
        t: INFIX_OPERATOR,
        s: "&&",
        o: [parensIfNecessary(expressions[0]), parensIfNecessary(readSection__combine(expressions.slice(1)))]
      };
    }
    function parensIfNecessary(expression) {
      return {
        t: BRACKETED,
        x: expression
      };
    }
    var OPEN_COMMENT = "<!--",
        CLOSE_COMMENT = "-->";
    function readHtmlComment(parser) {
      var start,
          content,
          remaining,
          endIndex,
          comment;
      start = parser.pos;
      if (!parser.matchString(OPEN_COMMENT)) {
        return null;
      }
      remaining = parser.remaining();
      endIndex = remaining.indexOf(CLOSE_COMMENT);
      if (endIndex === -1) {
        parser.error("Illegal HTML - expected closing comment sequence ('-->')");
      }
      content = remaining.substr(0, endIndex);
      parser.pos += endIndex + 3;
      comment = {
        t: COMMENT,
        c: content
      };
      if (parser.includeLinePositions) {
        comment.p = parser.getLinePos(start);
      }
      return comment;
    }
    var booleanAttributes,
        voidElementNames,
        htmlEntities,
        controlCharacters,
        entityPattern,
        lessThan,
        greaterThan,
        amp;
    booleanAttributes = /^(allowFullscreen|async|autofocus|autoplay|checked|compact|controls|declare|default|defaultChecked|defaultMuted|defaultSelected|defer|disabled|enabled|formNoValidate|hidden|indeterminate|inert|isMap|itemScope|loop|multiple|muted|noHref|noResize|noShade|noValidate|noWrap|open|pauseOnExit|readOnly|required|reversed|scoped|seamless|selected|sortable|translate|trueSpeed|typeMustMatch|visible)$/i;
    voidElementNames = /^(?:area|base|br|col|command|doctype|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
    htmlEntities = {
      quot: 34,
      amp: 38,
      apos: 39,
      lt: 60,
      gt: 62,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      copy: 169,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      reg: 174,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      sup1: 185,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      Agrave: 192,
      Aacute: 193,
      Acirc: 194,
      Atilde: 195,
      Auml: 196,
      Aring: 197,
      AElig: 198,
      Ccedil: 199,
      Egrave: 200,
      Eacute: 201,
      Ecirc: 202,
      Euml: 203,
      Igrave: 204,
      Iacute: 205,
      Icirc: 206,
      Iuml: 207,
      ETH: 208,
      Ntilde: 209,
      Ograve: 210,
      Oacute: 211,
      Ocirc: 212,
      Otilde: 213,
      Ouml: 214,
      times: 215,
      Oslash: 216,
      Ugrave: 217,
      Uacute: 218,
      Ucirc: 219,
      Uuml: 220,
      Yacute: 221,
      THORN: 222,
      szlig: 223,
      agrave: 224,
      aacute: 225,
      acirc: 226,
      atilde: 227,
      auml: 228,
      aring: 229,
      aelig: 230,
      ccedil: 231,
      egrave: 232,
      eacute: 233,
      ecirc: 234,
      euml: 235,
      igrave: 236,
      iacute: 237,
      icirc: 238,
      iuml: 239,
      eth: 240,
      ntilde: 241,
      ograve: 242,
      oacute: 243,
      ocirc: 244,
      otilde: 245,
      ouml: 246,
      divide: 247,
      oslash: 248,
      ugrave: 249,
      uacute: 250,
      ucirc: 251,
      uuml: 252,
      yacute: 253,
      thorn: 254,
      yuml: 255,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    };
    controlCharacters = [8364, 129, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, 141, 381, 143, 144, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250, 339, 157, 382, 376];
    entityPattern = new RegExp("&(#?(?:x[\\w\\d]+|\\d+|" + Object.keys(htmlEntities).join("|") + "));?", "g");
    function decodeCharacterReferences(html) {
      return html.replace(entityPattern, function(match, entity) {
        var code;
        if (entity[0] !== "#") {
          code = htmlEntities[entity];
        } else if (entity[1] === "x") {
          code = parseInt(entity.substring(2), 16);
        } else {
          code = parseInt(entity.substring(1), 10);
        }
        if (!code) {
          return match;
        }
        return String.fromCharCode(validateCode(code));
      });
    }
    function validateCode(code) {
      if (!code) {
        return 65533;
      }
      if (code === 10) {
        return 32;
      }
      if (code < 128) {
        return code;
      }
      if (code <= 159) {
        return controlCharacters[code - 128];
      }
      if (code < 55296) {
        return code;
      }
      if (code <= 57343) {
        return 65533;
      }
      if (code <= 65535) {
        return code;
      }
      return 65533;
    }
    lessThan = /</g;
    greaterThan = />/g;
    amp = /&/g;
    function escapeHtml(str) {
      return str.replace(amp, "&amp;").replace(lessThan, "&lt;").replace(greaterThan, "&gt;");
    }
    var leadingLinebreak = /^\s*\r?\n/,
        trailingLinebreak = /\r?\n\s*$/;
    var stripStandalones = function(items) {
      var i,
          current,
          backOne,
          backTwo,
          lastSectionItem;
      for (i = 1; i < items.length; i += 1) {
        current = items[i];
        backOne = items[i - 1];
        backTwo = items[i - 2];
        if (isString(current) && isComment(backOne) && isString(backTwo)) {
          if (trailingLinebreak.test(backTwo) && leadingLinebreak.test(current)) {
            items[i - 2] = backTwo.replace(trailingLinebreak, "\n");
            items[i] = current.replace(leadingLinebreak, "");
          }
        }
        if (isSection(current) && isString(backOne)) {
          if (trailingLinebreak.test(backOne) && isString(current.f[0]) && leadingLinebreak.test(current.f[0])) {
            items[i - 1] = backOne.replace(trailingLinebreak, "\n");
            current.f[0] = current.f[0].replace(leadingLinebreak, "");
          }
        }
        if (isString(current) && isSection(backOne)) {
          lastSectionItem = lastItem(backOne.f);
          if (isString(lastSectionItem) && trailingLinebreak.test(lastSectionItem) && leadingLinebreak.test(current)) {
            backOne.f[backOne.f.length - 1] = lastSectionItem.replace(trailingLinebreak, "\n");
            items[i] = current.replace(leadingLinebreak, "");
          }
        }
      }
      return items;
    };
    function isString(item) {
      return typeof item === "string";
    }
    function isComment(item) {
      return item.t === COMMENT || item.t === DELIMCHANGE;
    }
    function isSection(item) {
      return (item.t === SECTION || item.t === INVERTED) && item.f;
    }
    var trimWhitespace__leadingWhitespace = /^[ \t\f\r\n]+/,
        trimWhitespace__trailingWhitespace = /[ \t\f\r\n]+$/;
    var trimWhitespace = function(items, leading, trailing) {
      var item;
      if (leading) {
        item = items[0];
        if (typeof item === "string") {
          item = item.replace(trimWhitespace__leadingWhitespace, "");
          if (!item) {
            items.shift();
          } else {
            items[0] = item;
          }
        }
      }
      if (trailing) {
        item = lastItem(items);
        if (typeof item === "string") {
          item = item.replace(trimWhitespace__trailingWhitespace, "");
          if (!item) {
            items.pop();
          } else {
            items[items.length - 1] = item;
          }
        }
      }
    };
    var contiguousWhitespace = /[ \t\f\r\n]+/g;
    var preserveWhitespaceElements = /^(?:pre|script|style|textarea)$/i;
    var cleanup__leadingWhitespace = /^\s+/;
    var cleanup__trailingWhitespace = /\s+$/;
    function cleanup(items, stripComments, preserveWhitespace, removeLeadingWhitespace, removeTrailingWhitespace) {
      var i,
          item,
          previousItem,
          nextItem,
          preserveWhitespaceInsideFragment,
          removeLeadingWhitespaceInsideFragment,
          removeTrailingWhitespaceInsideFragment,
          key;
      stripStandalones(items);
      i = items.length;
      while (i--) {
        item = items[i];
        if (item.exclude) {
          items.splice(i, 1);
        } else if (stripComments && item.t === COMMENT) {
          items.splice(i, 1);
        }
      }
      trimWhitespace(items, removeLeadingWhitespace, removeTrailingWhitespace);
      i = items.length;
      while (i--) {
        item = items[i];
        if (item.f) {
          preserveWhitespaceInsideFragment = preserveWhitespace || item.t === ELEMENT && preserveWhitespaceElements.test(item.e);
          if (!preserveWhitespaceInsideFragment) {
            previousItem = items[i - 1];
            nextItem = items[i + 1];
            if (!previousItem || typeof previousItem === "string" && cleanup__trailingWhitespace.test(previousItem)) {
              removeLeadingWhitespaceInsideFragment = true;
            }
            if (!nextItem || typeof nextItem === "string" && cleanup__leadingWhitespace.test(nextItem)) {
              removeTrailingWhitespaceInsideFragment = true;
            }
          }
          cleanup(item.f, stripComments, preserveWhitespaceInsideFragment, removeLeadingWhitespaceInsideFragment, removeTrailingWhitespaceInsideFragment);
        }
        if (item.l) {
          cleanup(item.l.f, stripComments, preserveWhitespace, removeLeadingWhitespaceInsideFragment, removeTrailingWhitespaceInsideFragment);
          items.splice(i + 1, 0, item.l);
          delete item.l;
        }
        if (item.a) {
          for (key in item.a) {
            if (item.a.hasOwnProperty(key) && typeof item.a[key] !== "string") {
              cleanup(item.a[key], stripComments, preserveWhitespace, removeLeadingWhitespaceInsideFragment, removeTrailingWhitespaceInsideFragment);
            }
          }
        }
        if (item.m) {
          cleanup(item.m, stripComments, preserveWhitespace, removeLeadingWhitespaceInsideFragment, removeTrailingWhitespaceInsideFragment);
        }
        if (item.v) {
          for (key in item.v) {
            if (item.v.hasOwnProperty(key)) {
              if (isArray(item.v[key].n)) {
                cleanup(item.v[key].n, stripComments, preserveWhitespace, removeLeadingWhitespaceInsideFragment, removeTrailingWhitespaceInsideFragment);
              }
              if (isArray(item.v[key].d)) {
                cleanup(item.v[key].d, stripComments, preserveWhitespace, removeLeadingWhitespaceInsideFragment, removeTrailingWhitespaceInsideFragment);
              }
            }
          }
        }
      }
      i = items.length;
      while (i--) {
        if (typeof items[i] === "string") {
          if (typeof items[i + 1] === "string") {
            items[i] = items[i] + items[i + 1];
            items.splice(i + 1, 1);
          }
          if (!preserveWhitespace) {
            items[i] = items[i].replace(contiguousWhitespace, " ");
          }
          if (items[i] === "") {
            items.splice(i, 1);
          }
        }
      }
    }
    var closingTagPattern = /^([a-zA-Z]{1,}:?[a-zA-Z0-9\-]*)\s*\>/;
    function readClosingTag(parser) {
      var start,
          tag;
      start = parser.pos;
      if (!parser.matchString("</")) {
        return null;
      }
      if (tag = parser.matchPattern(closingTagPattern)) {
        if (parser.inside && tag !== parser.inside) {
          parser.pos = start;
          return null;
        }
        return {
          t: CLOSING_TAG,
          e: tag
        };
      }
      parser.pos -= 2;
      parser.error("Illegal closing tag");
    }
    var getLowestIndex = function(haystack, needles) {
      var i,
          index,
          lowest;
      i = needles.length;
      while (i--) {
        index = haystack.indexOf(needles[i]);
        if (!index) {
          return 0;
        }
        if (index === -1) {
          continue;
        }
        if (!lowest || index < lowest) {
          lowest = index;
        }
      }
      return lowest || -1;
    };
    var attributeNamePattern = /^[^\s"'>\/=]+/,
        unquotedAttributeValueTextPattern = /^[^\s"'=<>`]+/;
    function readAttribute(parser) {
      var attr,
          name,
          value;
      parser.allowWhitespace();
      name = parser.matchPattern(attributeNamePattern);
      if (!name) {
        return null;
      }
      attr = {name: name};
      value = readAttributeValue(parser);
      if (value != null) {
        attr.value = value;
      }
      return attr;
    }
    function readAttributeValue(parser) {
      var start,
          valueStart,
          startDepth,
          value;
      start = parser.pos;
      if (!/[=\/>\s]/.test(parser.nextChar())) {
        parser.error("Expected `=`, `/`, `>` or whitespace");
      }
      parser.allowWhitespace();
      if (!parser.matchString("=")) {
        parser.pos = start;
        return null;
      }
      parser.allowWhitespace();
      valueStart = parser.pos;
      startDepth = parser.sectionDepth;
      value = readQuotedAttributeValue(parser, "'") || readQuotedAttributeValue(parser, "\"") || readUnquotedAttributeValue(parser);
      if (value === null) {
        parser.error("Expected valid attribute value");
      }
      if (parser.sectionDepth !== startDepth) {
        parser.pos = valueStart;
        parser.error("An attribute value must contain as many opening section tags as closing section tags");
      }
      if (!value.length) {
        return "";
      }
      if (value.length === 1 && typeof value[0] === "string") {
        return decodeCharacterReferences(value[0]);
      }
      return value;
    }
    function readUnquotedAttributeValueToken(parser) {
      var start,
          text,
          haystack,
          needles,
          index;
      start = parser.pos;
      text = parser.matchPattern(unquotedAttributeValueTextPattern);
      if (!text) {
        return null;
      }
      haystack = text;
      needles = parser.tags.map(function(t) {
        return t.open;
      });
      if ((index = getLowestIndex(haystack, needles)) !== -1) {
        text = text.substr(0, index);
        parser.pos = start + text.length;
      }
      return text;
    }
    function readUnquotedAttributeValue(parser) {
      var tokens,
          token;
      parser.inAttribute = true;
      tokens = [];
      token = readMustache(parser) || readUnquotedAttributeValueToken(parser);
      while (token !== null) {
        tokens.push(token);
        token = readMustache(parser) || readUnquotedAttributeValueToken(parser);
      }
      if (!tokens.length) {
        return null;
      }
      parser.inAttribute = false;
      return tokens;
    }
    function readQuotedAttributeValue(parser, quoteMark) {
      var start,
          tokens,
          token;
      start = parser.pos;
      if (!parser.matchString(quoteMark)) {
        return null;
      }
      parser.inAttribute = quoteMark;
      tokens = [];
      token = readMustache(parser) || readQuotedStringToken(parser, quoteMark);
      while (token !== null) {
        tokens.push(token);
        token = readMustache(parser) || readQuotedStringToken(parser, quoteMark);
      }
      if (!parser.matchString(quoteMark)) {
        parser.pos = start;
        return null;
      }
      parser.inAttribute = false;
      return tokens;
    }
    function readQuotedStringToken(parser, quoteMark) {
      var start,
          index,
          haystack,
          needles;
      start = parser.pos;
      haystack = parser.remaining();
      needles = parser.tags.map(function(t) {
        return t.open;
      });
      needles.push(quoteMark);
      index = getLowestIndex(haystack, needles);
      if (index === -1) {
        parser.error("Quoted attribute value must have a closing quote");
      }
      if (!index) {
        return null;
      }
      parser.pos += index;
      return haystack.substr(0, index);
    }
    var JsonParser,
        specials,
        specialsPattern,
        parseJSON__numberPattern,
        placeholderPattern,
        placeholderAtStartPattern,
        onlyWhitespace;
    specials = {
      "true": true,
      "false": false,
      undefined: undefined,
      "null": null
    };
    specialsPattern = new RegExp("^(?:" + Object.keys(specials).join("|") + ")");
    parseJSON__numberPattern = /^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/;
    placeholderPattern = /\$\{([^\}]+)\}/g;
    placeholderAtStartPattern = /^\$\{([^\}]+)\}/;
    onlyWhitespace = /^\s*$/;
    JsonParser = Parser.extend({
      init: function(str, options) {
        this.values = options.values;
        this.allowWhitespace();
      },
      postProcess: function(result) {
        if (result.length !== 1 || !onlyWhitespace.test(this.leftover)) {
          return null;
        }
        return {value: result[0].v};
      },
      converters: [function getPlaceholder(parser) {
        var placeholder;
        if (!parser.values) {
          return null;
        }
        placeholder = parser.matchPattern(placeholderAtStartPattern);
        if (placeholder && parser.values.hasOwnProperty(placeholder)) {
          return {v: parser.values[placeholder]};
        }
      }, function getSpecial(parser) {
        var special;
        if (special = parser.matchPattern(specialsPattern)) {
          return {v: specials[special]};
        }
      }, function getNumber(parser) {
        var number;
        if (number = parser.matchPattern(parseJSON__numberPattern)) {
          return {v: +number};
        }
      }, function getString(parser) {
        var stringLiteral = readStringLiteral(parser),
            values;
        if (stringLiteral && (values = parser.values)) {
          return {v: stringLiteral.v.replace(placeholderPattern, function(match, $1) {
              return $1 in values ? values[$1] : $1;
            })};
        }
        return stringLiteral;
      }, function getObject(parser) {
        var result,
            pair;
        if (!parser.matchString("{")) {
          return null;
        }
        result = {};
        parser.allowWhitespace();
        if (parser.matchString("}")) {
          return {v: result};
        }
        while (pair = getKeyValuePair(parser)) {
          result[pair.key] = pair.value;
          parser.allowWhitespace();
          if (parser.matchString("}")) {
            return {v: result};
          }
          if (!parser.matchString(",")) {
            return null;
          }
        }
        return null;
      }, function getArray(parser) {
        var result,
            valueToken;
        if (!parser.matchString("[")) {
          return null;
        }
        result = [];
        parser.allowWhitespace();
        if (parser.matchString("]")) {
          return {v: result};
        }
        while (valueToken = parser.read()) {
          result.push(valueToken.v);
          parser.allowWhitespace();
          if (parser.matchString("]")) {
            return {v: result};
          }
          if (!parser.matchString(",")) {
            return null;
          }
          parser.allowWhitespace();
        }
        return null;
      }]
    });
    function getKeyValuePair(parser) {
      var key,
          valueToken,
          pair;
      parser.allowWhitespace();
      key = readKey(parser);
      if (!key) {
        return null;
      }
      pair = {key: key};
      parser.allowWhitespace();
      if (!parser.matchString(":")) {
        return null;
      }
      parser.allowWhitespace();
      valueToken = parser.read();
      if (!valueToken) {
        return null;
      }
      pair.value = valueToken.v;
      return pair;
    }
    var parseJSON = function(str, values) {
      var parser = new JsonParser(str, {values: values});
      return parser.result;
    };
    var methodCallPattern = /^([a-zA-Z_$][a-zA-Z_$0-9]*)\(/,
        methodCallExcessPattern = /\)\s*$/,
        ExpressionParser;
    ExpressionParser = Parser.extend({converters: [readExpression]});
    function processDirective(tokens, parentParser) {
      var result,
          match,
          parser,
          args,
          token,
          colonIndex,
          directiveName,
          directiveArgs,
          parsed;
      if (typeof tokens === "string") {
        if (match = methodCallPattern.exec(tokens)) {
          var end = tokens.lastIndexOf(")");
          if (!methodCallExcessPattern.test(tokens)) {
            parentParser.error("Invalid input after method call expression '" + tokens.slice(end + 1) + "'");
          }
          result = {m: match[1]};
          args = "[" + tokens.slice(result.m.length + 1, end) + "]";
          parser = new ExpressionParser(args);
          result.a = flattenExpression(parser.result[0]);
          return result;
        }
        if (tokens.indexOf(":") === -1) {
          return tokens.trim();
        }
        tokens = [tokens];
      }
      result = {};
      directiveName = [];
      directiveArgs = [];
      if (tokens) {
        while (tokens.length) {
          token = tokens.shift();
          if (typeof token === "string") {
            colonIndex = token.indexOf(":");
            if (colonIndex === -1) {
              directiveName.push(token);
            } else {
              if (colonIndex) {
                directiveName.push(token.substr(0, colonIndex));
              }
              if (token.length > colonIndex + 1) {
                directiveArgs[0] = token.substring(colonIndex + 1);
              }
              break;
            }
          } else {
            directiveName.push(token);
          }
        }
        directiveArgs = directiveArgs.concat(tokens);
      }
      if (!directiveName.length) {
        result = "";
      } else if (directiveArgs.length || typeof directiveName !== "string") {
        result = {n: directiveName.length === 1 && typeof directiveName[0] === "string" ? directiveName[0] : directiveName};
        if (directiveArgs.length === 1 && typeof directiveArgs[0] === "string") {
          parsed = parseJSON("[" + directiveArgs[0] + "]");
          result.a = parsed ? parsed.value : directiveArgs[0].trim();
        } else {
          result.d = directiveArgs;
        }
      } else {
        result = directiveName;
      }
      return result;
    }
    var tagNamePattern = /^[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/,
        validTagNameFollower = /^[\s\n\/>]/,
        onPattern = /^on/,
        proxyEventPattern = /^on-([a-zA-Z\\*\\.$_][a-zA-Z\\*\\.$_0-9\-]+)$/,
        reservedEventNames = /^(?:change|reset|teardown|update|construct|config|init|render|unrender|detach|insert)$/,
        directives = {
          "intro-outro": "t0",
          intro: "t1",
          outro: "t2",
          decorator: "o"
        },
        exclude = {exclude: true},
        disallowedContents;
    disallowedContents = {
      li: ["li"],
      dt: ["dt", "dd"],
      dd: ["dt", "dd"],
      p: "address article aside blockquote div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol p pre section table ul".split(" "),
      rt: ["rt", "rp"],
      rp: ["rt", "rp"],
      optgroup: ["optgroup"],
      option: ["option", "optgroup"],
      thead: ["tbody", "tfoot"],
      tbody: ["tbody", "tfoot"],
      tfoot: ["tbody"],
      tr: ["tr", "tbody"],
      td: ["td", "th", "tr"],
      th: ["td", "th", "tr"]
    };
    function readElement(parser) {
      var start,
          element,
          directiveName,
          match,
          addProxyEvent,
          attribute,
          directive,
          selfClosing,
          children,
          partials,
          hasPartials,
          child,
          closed,
          pos,
          remaining,
          closingTag;
      start = parser.pos;
      if (parser.inside || parser.inAttribute) {
        return null;
      }
      if (!parser.matchString("<")) {
        return null;
      }
      if (parser.nextChar() === "/") {
        return null;
      }
      element = {};
      if (parser.includeLinePositions) {
        element.p = parser.getLinePos(start);
      }
      if (parser.matchString("!")) {
        element.t = DOCTYPE;
        if (!parser.matchPattern(/^doctype/i)) {
          parser.error("Expected DOCTYPE declaration");
        }
        element.a = parser.matchPattern(/^(.+?)>/);
        return element;
      }
      element.t = ELEMENT;
      element.e = parser.matchPattern(tagNamePattern);
      if (!element.e) {
        return null;
      }
      if (!validTagNameFollower.test(parser.nextChar())) {
        parser.error("Illegal tag name");
      }
      addProxyEvent = function(name, directive) {
        var directiveName = directive.n || directive;
        if (reservedEventNames.test(directiveName)) {
          parser.pos -= directiveName.length;
          parser.error("Cannot use reserved event names (change, reset, teardown, update, construct, config, init, render, unrender, detach, insert)");
        }
        element.v[name] = directive;
      };
      parser.allowWhitespace();
      while (attribute = readMustache(parser) || readAttribute(parser)) {
        if (attribute.name) {
          if (directiveName = directives[attribute.name]) {
            element[directiveName] = processDirective(attribute.value, parser);
          } else if (match = proxyEventPattern.exec(attribute.name)) {
            if (!element.v)
              element.v = {};
            directive = processDirective(attribute.value, parser);
            addProxyEvent(match[1], directive);
          } else {
            if (!parser.sanitizeEventAttributes || !onPattern.test(attribute.name)) {
              if (!element.a)
                element.a = {};
              element.a[attribute.name] = attribute.value || (attribute.value === "" ? "" : 0);
            }
          }
        } else {
          if (!element.m)
            element.m = [];
          element.m.push(attribute);
        }
        parser.allowWhitespace();
      }
      parser.allowWhitespace();
      if (parser.matchString("/")) {
        selfClosing = true;
      }
      if (!parser.matchString(">")) {
        return null;
      }
      var lowerCaseName = element.e.toLowerCase();
      var preserveWhitespace = parser.preserveWhitespace;
      if (!selfClosing && !voidElementNames.test(element.e)) {
        parser.elementStack.push(lowerCaseName);
        if (lowerCaseName === "script" || lowerCaseName === "style") {
          parser.inside = lowerCaseName;
        }
        children = [];
        partials = create(null);
        do {
          pos = parser.pos;
          remaining = parser.remaining();
          if (!canContain(lowerCaseName, remaining)) {
            closed = true;
          } else if (closingTag = readClosingTag(parser)) {
            closed = true;
            var closingTagName = closingTag.e.toLowerCase();
            if (closingTagName !== lowerCaseName) {
              parser.pos = pos;
              if (!~parser.elementStack.indexOf(closingTagName)) {
                var errorMessage = "Unexpected closing tag";
                if (voidElementNames.test(closingTagName)) {
                  errorMessage += " (<" + closingTagName + "> is a void element - it cannot contain children)";
                }
                parser.error(errorMessage);
              }
            }
          } else if (child = readClosing(parser, {
            open: parser.standardDelimiters[0],
            close: parser.standardDelimiters[1]
          })) {
            closed = true;
            parser.pos = pos;
          } else {
            if (child = parser.read(PARTIAL_READERS)) {
              if (partials[child.n]) {
                parser.pos = pos;
                parser.error("Duplicate partial definition");
              }
              cleanup(child.f, parser.stripComments, preserveWhitespace, !preserveWhitespace, !preserveWhitespace);
              partials[child.n] = child.f;
              hasPartials = true;
            } else {
              if (child = parser.read(READERS)) {
                children.push(child);
              } else {
                closed = true;
              }
            }
          }
        } while (!closed);
        if (children.length) {
          element.f = children;
        }
        if (hasPartials) {
          element.p = partials;
        }
        parser.elementStack.pop();
      }
      parser.inside = null;
      if (parser.sanitizeElements && parser.sanitizeElements.indexOf(lowerCaseName) !== -1) {
        return exclude;
      }
      return element;
    }
    function canContain(name, remaining) {
      var match,
          disallowed;
      match = /^<([a-zA-Z][a-zA-Z0-9]*)/.exec(remaining);
      disallowed = disallowedContents[name];
      if (!match || !disallowed) {
        return true;
      }
      return !~disallowed.indexOf(match[1].toLowerCase());
    }
    function readText(parser) {
      var index,
          remaining,
          disallowed,
          barrier;
      remaining = parser.remaining();
      barrier = parser.inside ? "</" + parser.inside : "<";
      if (parser.inside && !parser.interpolate[parser.inside]) {
        index = remaining.indexOf(barrier);
      } else {
        disallowed = parser.tags.map(function(t) {
          return t.open;
        });
        disallowed = disallowed.concat(parser.tags.map(function(t) {
          return "\\" + t.open;
        }));
        if (parser.inAttribute === true) {
          disallowed.push("\"", "'", "=", "<", ">", "`");
        } else if (parser.inAttribute) {
          disallowed.push(parser.inAttribute);
        } else {
          disallowed.push(barrier);
        }
        index = getLowestIndex(remaining, disallowed);
      }
      if (!index) {
        return null;
      }
      if (index === -1) {
        index = remaining.length;
      }
      parser.pos += index;
      return parser.inside ? remaining.substr(0, index) : decodeCharacterReferences(remaining.substr(0, index));
    }
    var escapeRegExp__pattern = /[-/\\^$*+?.()|[\]{}]/g;
    function escapeRegExp(str) {
      return str.replace(escapeRegExp__pattern, "\\$&");
    }
    var startPattern = /^<!--\s*/,
        namePattern = /s*>\s*([a-zA-Z_$][-a-zA-Z_$0-9]*)\s*/,
        finishPattern = /\s*-->/,
        child;
    function readPartialDefinitionComment(parser) {
      var firstPos = parser.pos,
          open = parser.standardDelimiters[0],
          close = parser.standardDelimiters[1],
          content = undefined,
          closed = undefined;
      if (!parser.matchPattern(startPattern) || !parser.matchString(open)) {
        parser.pos = firstPos;
        return null;
      }
      var name = parser.matchPattern(namePattern);
      warnOnceIfDebug("Inline partial comments are deprecated.\nUse this...\n  {{#partial " + name + "}} ... {{/partial}}\n\n...instead of this:\n  <!-- {{>" + name + "}} --> ... <!-- {{/" + name + "}} -->'");
      if (!parser.matchString(close) || !parser.matchPattern(finishPattern)) {
        parser.pos = firstPos;
        return null;
      }
      content = [];
      var endPattern = new RegExp("^<!--\\s*" + escapeRegExp(open) + "\\s*\\/\\s*" + name + "\\s*" + escapeRegExp(close) + "\\s*-->");
      do {
        if (parser.matchPattern(endPattern)) {
          closed = true;
        } else {
          child = parser.read(READERS);
          if (!child) {
            parser.error("expected closing comment ('<!-- " + open + "/" + name + "" + close + " -->')");
          }
          content.push(child);
        }
      } while (!closed);
      return {
        t: INLINE_PARTIAL,
        f: content,
        n: name
      };
    }
    var partialDefinitionSectionPattern = /^#\s*partial\s+/;
    function readPartialDefinitionSection(parser) {
      var start,
          name,
          content,
          child,
          closed;
      start = parser.pos;
      var delimiters = parser.standardDelimiters;
      if (!parser.matchString(delimiters[0])) {
        return null;
      }
      if (!parser.matchPattern(partialDefinitionSectionPattern)) {
        parser.pos = start;
        return null;
      }
      name = parser.matchPattern(/^[a-zA-Z_$][a-zA-Z_$0-9\-]*/);
      if (!name) {
        parser.error("expected legal partial name");
      }
      if (!parser.matchString(delimiters[1])) {
        parser.error("Expected closing delimiter '" + delimiters[1] + "'");
      }
      content = [];
      do {
        if (child = readClosing(parser, {
          open: parser.standardDelimiters[0],
          close: parser.standardDelimiters[1]
        })) {
          if (!child.r === "partial") {
            parser.error("Expected " + delimiters[0] + "/partial" + delimiters[1]);
          }
          closed = true;
        } else {
          child = parser.read(READERS);
          if (!child) {
            parser.error("Expected " + delimiters[0] + "/partial" + delimiters[1]);
          }
          content.push(child);
        }
      } while (!closed);
      return {
        t: INLINE_PARTIAL,
        n: name,
        f: content
      };
    }
    function readTemplate(parser) {
      var fragment = [];
      var partials = create(null);
      var hasPartials = false;
      var preserveWhitespace = parser.preserveWhitespace;
      while (parser.pos < parser.str.length) {
        var pos = parser.pos,
            item = undefined,
            partial = undefined;
        if (partial = parser.read(PARTIAL_READERS)) {
          if (partials[partial.n]) {
            parser.pos = pos;
            parser.error("Duplicated partial definition");
          }
          cleanup(partial.f, parser.stripComments, preserveWhitespace, !preserveWhitespace, !preserveWhitespace);
          partials[partial.n] = partial.f;
          hasPartials = true;
        } else if (item = parser.read(READERS)) {
          fragment.push(item);
        } else {
          parser.error("Unexpected template content");
        }
      }
      var result = {
        v: TEMPLATE_VERSION,
        t: fragment
      };
      if (hasPartials) {
        result.p = partials;
      }
      return result;
    }
    var STANDARD_READERS = [readPartial, readUnescaped, readSection, readYielder, readInterpolator, readMustacheComment];
    var TRIPLE_READERS = [readTriple];
    var STATIC_READERS = [readUnescaped, readSection, readInterpolator];
    var StandardParser = undefined;
    function parse(template, options) {
      return new StandardParser(template, options || {}).result;
    }
    var READERS = [readMustache, readHtmlComment, readElement, readText];
    var PARTIAL_READERS = [readPartialDefinitionComment, readPartialDefinitionSection];
    StandardParser = Parser.extend({
      init: function(str, options) {
        var tripleDelimiters = options.tripleDelimiters || ["{{{", "}}}"],
            staticDelimiters = options.staticDelimiters || ["[[", "]]"],
            staticTripleDelimiters = options.staticTripleDelimiters || ["[[[", "]]]"];
        this.standardDelimiters = options.delimiters || ["{{", "}}"];
        this.tags = [{
          isStatic: false,
          isTriple: false,
          open: this.standardDelimiters[0],
          close: this.standardDelimiters[1],
          readers: STANDARD_READERS
        }, {
          isStatic: false,
          isTriple: true,
          open: tripleDelimiters[0],
          close: tripleDelimiters[1],
          readers: TRIPLE_READERS
        }, {
          isStatic: true,
          isTriple: false,
          open: staticDelimiters[0],
          close: staticDelimiters[1],
          readers: STATIC_READERS
        }, {
          isStatic: true,
          isTriple: true,
          open: staticTripleDelimiters[0],
          close: staticTripleDelimiters[1],
          readers: TRIPLE_READERS
        }];
        this.sortMustacheTags();
        this.sectionDepth = 0;
        this.elementStack = [];
        this.interpolate = {
          script: !options.interpolate || options.interpolate.script !== false,
          style: !options.interpolate || options.interpolate.style !== false
        };
        if (options.sanitize === true) {
          options.sanitize = {
            elements: "applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title".split(" "),
            eventAttributes: true
          };
        }
        this.stripComments = options.stripComments !== false;
        this.preserveWhitespace = options.preserveWhitespace;
        this.sanitizeElements = options.sanitize && options.sanitize.elements;
        this.sanitizeEventAttributes = options.sanitize && options.sanitize.eventAttributes;
        this.includeLinePositions = options.includeLinePositions;
      },
      postProcess: function(result) {
        if (!result.length) {
          return {
            t: [],
            v: TEMPLATE_VERSION
          };
        }
        if (this.sectionDepth > 0) {
          this.error("A section was left open");
        }
        cleanup(result[0].t, this.stripComments, this.preserveWhitespace, !this.preserveWhitespace, !this.preserveWhitespace);
        return result[0];
      },
      converters: [readTemplate],
      sortMustacheTags: function() {
        this.tags.sort(function(a, b) {
          return b.open.length - a.open.length;
        });
      }
    });
    var parseOptions = ["preserveWhitespace", "sanitize", "stripComments", "delimiters", "tripleDelimiters", "interpolate"];
    var parser = {
      parse: doParse,
      fromId: fromId,
      isHashedId: isHashedId,
      isParsed: isParsed,
      getParseOptions: getParseOptions,
      createHelper: parser__createHelper
    };
    function parser__createHelper(parseOptions) {
      var helper = create(parser);
      helper.parse = function(template, options) {
        return doParse(template, options || parseOptions);
      };
      return helper;
    }
    function doParse(template, parseOptions) {
      if (!parse) {
        throw new Error("Missing Ractive.parse - cannot parse template. Either preparse or use the version that includes the parser");
      }
      return parse(template, parseOptions || this.options);
    }
    function fromId(id, options) {
      var template;
      if (!isClient) {
        if (options && options.noThrow) {
          return ;
        }
        throw new Error("Cannot retrieve template #" + id + " as Ractive is not running in a browser.");
      }
      if (isHashedId(id)) {
        id = id.substring(1);
      }
      if (!(template = document.getElementById(id))) {
        if (options && options.noThrow) {
          return ;
        }
        throw new Error("Could not find template element with id #" + id);
      }
      if (template.tagName.toUpperCase() !== "SCRIPT") {
        if (options && options.noThrow) {
          return ;
        }
        throw new Error("Template element with id #" + id + ", must be a <script> element");
      }
      return template.textContent;
    }
    function isHashedId(id) {
      return id && id.charAt(0) === "#";
    }
    function isParsed(template) {
      return !(typeof template === "string");
    }
    function getParseOptions(ractive) {
      if (ractive.defaults) {
        ractive = ractive.defaults;
      }
      return parseOptions.reduce(function(val, key) {
        val[key] = ractive[key];
        return val;
      }, {});
    }
    var parser__default = parser;
    var templateConfigurator = {
      name: "template",
      extend: function templateConfigurator__extend(Parent, proto, options) {
        var template;
        if ("template" in options) {
          template = options.template;
          if (typeof template === "function") {
            proto.template = template;
          } else {
            proto.template = parseIfString(template, proto);
          }
        }
      },
      init: function templateConfigurator__init(Parent, ractive, options) {
        var template,
            fn;
        template = "template" in options ? options.template : Parent.prototype.template;
        if (typeof template === "function") {
          fn = template;
          template = getDynamicTemplate(ractive, fn);
          ractive._config.template = {
            fn: fn,
            result: template
          };
        }
        template = parseIfString(template, ractive);
        ractive.template = template.t;
        if (template.p) {
          extendPartials(ractive.partials, template.p);
        }
      },
      reset: function(ractive) {
        var result = resetValue(ractive),
            parsed;
        if (result) {
          parsed = parseIfString(result, ractive);
          ractive.template = parsed.t;
          extendPartials(ractive.partials, parsed.p, true);
          return true;
        }
      }
    };
    function resetValue(ractive) {
      var initial = ractive._config.template,
          result;
      if (!initial || !initial.fn) {
        return ;
      }
      result = getDynamicTemplate(ractive, initial.fn);
      if (result !== initial.result) {
        initial.result = result;
        result = parseIfString(result, ractive);
        return result;
      }
    }
    function getDynamicTemplate(ractive, fn) {
      var helper = templateConfigurator__createHelper(parser__default.getParseOptions(ractive));
      return fn.call(ractive, helper);
    }
    function templateConfigurator__createHelper(parseOptions) {
      var helper = create(parser__default);
      helper.parse = function(template, options) {
        return parser__default.parse(template, options || parseOptions);
      };
      return helper;
    }
    function parseIfString(template, ractive) {
      if (typeof template === "string") {
        if (template[0] === "#") {
          template = parser__default.fromId(template);
        }
        template = parse(template, parser__default.getParseOptions(ractive));
      } else if (typeof template.v !== "number") {
        throw new Error("The template parser was passed a non-string template, but the template doesn't have a version.  Make sure you're passing in the template you think you are.");
      } else if (template.v !== TEMPLATE_VERSION) {
        throw new Error("Mismatched template version (expected " + TEMPLATE_VERSION + ", got " + template.v + ") Please ensure you are using the latest version of Ractive.js in your build process as well as in your app");
      }
      return template;
    }
    function extendPartials(existingPartials, newPartials, overwrite) {
      if (!newPartials)
        return ;
      for (var key in newPartials) {
        if (overwrite || !existingPartials.hasOwnProperty(key)) {
          existingPartials[key] = newPartials[key];
        }
      }
    }
    var registries__registryNames,
        Registry,
        registries;
    registries__registryNames = ["adaptors", "components", "computed", "decorators", "easing", "events", "interpolators", "partials", "transitions"];
    Registry = function(name, useDefaults) {
      this.name = name;
      this.useDefaults = useDefaults;
    };
    Registry.prototype = {
      constructor: Registry,
      extend: function(Parent, proto, options) {
        this.configure(this.useDefaults ? Parent.defaults : Parent, this.useDefaults ? proto : proto.constructor, options);
      },
      init: function() {},
      configure: function(Parent, target, options) {
        var name = this.name,
            option = options[name],
            registry;
        registry = create(Parent[name]);
        for (var key in option) {
          registry[key] = option[key];
        }
        target[name] = registry;
      },
      reset: function(ractive) {
        var registry = ractive[this.name];
        var changed = false;
        Object.keys(registry).forEach(function(key) {
          var item = registry[key];
          if (item._fn) {
            if (item._fn.isOwner) {
              registry[key] = item._fn;
            } else {
              delete registry[key];
            }
            changed = true;
          }
        });
        return changed;
      }
    };
    registries = registries__registryNames.map(function(name) {
      return new Registry(name, name === "computed");
    });
    var wrapPrototype = wrap;
    function wrap(parent, name, method) {
      if (!/_super/.test(method)) {
        return method;
      }
      var wrapper = function wrapSuper() {
        var superMethod = getSuperMethod(wrapper._parent, name),
            hasSuper = ("_super" in this),
            oldSuper = this._super,
            result;
        this._super = superMethod;
        result = method.apply(this, arguments);
        if (hasSuper) {
          this._super = oldSuper;
        } else {
          delete this._super;
        }
        return result;
      };
      wrapper._parent = parent;
      wrapper._method = method;
      return wrapper;
    }
    function getSuperMethod(parent, name) {
      var value,
          method;
      if (name in parent) {
        value = parent[name];
        if (typeof value === "function") {
          method = value;
        } else {
          method = function returnValue() {
            return value;
          };
        }
      } else {
        method = noop;
      }
      return method;
    }
    function getMessage(deprecated, correct, isError) {
      return "options." + deprecated + " has been deprecated in favour of options." + correct + "." + (isError ? " You cannot specify both options, please use options." + correct + "." : "");
    }
    function deprecateOption(options, deprecatedOption, correct) {
      if (deprecatedOption in options) {
        if (!(correct in options)) {
          warnIfDebug(getMessage(deprecatedOption, correct));
          options[correct] = options[deprecatedOption];
        } else {
          throw new Error(getMessage(deprecatedOption, correct, true));
        }
      }
    }
    function deprecate(options) {
      deprecateOption(options, "beforeInit", "onconstruct");
      deprecateOption(options, "init", "onrender");
      deprecateOption(options, "complete", "oncomplete");
      deprecateOption(options, "eventDefinitions", "events");
      if (isArray(options.adaptors)) {
        deprecateOption(options, "adaptors", "adapt");
      }
    }
    var config,
        order,
        defaultKeys,
        custom,
        isBlacklisted,
        isStandardKey;
    custom = {
      adapt: adaptConfigurator,
      css: cssConfigurator,
      data: dataConfigurator,
      template: templateConfigurator
    };
    defaultKeys = Object.keys(defaults);
    isStandardKey = makeObj(defaultKeys.filter(function(key) {
      return !custom[key];
    }));
    isBlacklisted = makeObj(defaultKeys.concat(registries.map(function(r) {
      return r.name;
    })));
    order = [].concat(defaultKeys.filter(function(key) {
      return !registries[key] && !custom[key];
    }), registries, custom.data, custom.template, custom.css);
    config = {
      extend: function(Parent, proto, options) {
        return configure("extend", Parent, proto, options);
      },
      init: function(Parent, ractive, options) {
        return configure("init", Parent, ractive, options);
      },
      reset: function(ractive) {
        return order.filter(function(c) {
          return c.reset && c.reset(ractive);
        }).map(function(c) {
          return c.name;
        });
      },
      order: order
    };
    function configure(method, Parent, target, options) {
      deprecate(options);
      for (var key in options) {
        if (isStandardKey[key]) {
          var value = options[key];
          if (typeof value === "function") {
            value = wrapPrototype(Parent.prototype, key, value);
          }
          target[key] = value;
        }
      }
      registries.forEach(function(registry) {
        registry[method](Parent, target, options);
      });
      adaptConfigurator[method](Parent, target, options);
      templateConfigurator[method](Parent, target, options);
      cssConfigurator[method](Parent, target, options);
      extendOtherMethods(Parent.prototype, target, options);
    }
    function extendOtherMethods(parent, target, options) {
      for (var key in options) {
        if (!isBlacklisted[key] && options.hasOwnProperty(key)) {
          var member = options[key];
          if (typeof member === "function") {
            member = wrapPrototype(parent, key, member);
          }
          target[key] = member;
        }
      }
    }
    function makeObj(array) {
      var obj = {};
      array.forEach(function(x) {
        return obj[x] = true;
      });
      return obj;
    }
    var prototype_bubble = Fragment$bubble;
    function Fragment$bubble() {
      this.dirtyValue = this.dirtyArgs = true;
      if (this.bound && typeof this.owner.bubble === "function") {
        this.owner.bubble();
      }
    }
    var Fragment_prototype_detach = Fragment$detach;
    function Fragment$detach() {
      var docFrag;
      if (this.items.length === 1) {
        return this.items[0].detach();
      }
      docFrag = document.createDocumentFragment();
      this.items.forEach(function(item) {
        var node = item.detach();
        if (node) {
          docFrag.appendChild(node);
        }
      });
      return docFrag;
    }
    var Fragment_prototype_find = Fragment$find;
    function Fragment$find(selector) {
      var i,
          len,
          item,
          queryResult;
      if (this.items) {
        len = this.items.length;
        for (i = 0; i < len; i += 1) {
          item = this.items[i];
          if (item.find && (queryResult = item.find(selector))) {
            return queryResult;
          }
        }
        return null;
      }
    }
    var Fragment_prototype_findAll = Fragment$findAll;
    function Fragment$findAll(selector, query) {
      var i,
          len,
          item;
      if (this.items) {
        len = this.items.length;
        for (i = 0; i < len; i += 1) {
          item = this.items[i];
          if (item.findAll) {
            item.findAll(selector, query);
          }
        }
      }
      return query;
    }
    var Fragment_prototype_findAllComponents = Fragment$findAllComponents;
    function Fragment$findAllComponents(selector, query) {
      var i,
          len,
          item;
      if (this.items) {
        len = this.items.length;
        for (i = 0; i < len; i += 1) {
          item = this.items[i];
          if (item.findAllComponents) {
            item.findAllComponents(selector, query);
          }
        }
      }
      return query;
    }
    var Fragment_prototype_findComponent = Fragment$findComponent;
    function Fragment$findComponent(selector) {
      var len,
          i,
          item,
          queryResult;
      if (this.items) {
        len = this.items.length;
        for (i = 0; i < len; i += 1) {
          item = this.items[i];
          if (item.findComponent && (queryResult = item.findComponent(selector))) {
            return queryResult;
          }
        }
        return null;
      }
    }
    var prototype_findNextNode = Fragment$findNextNode;
    function Fragment$findNextNode(item) {
      var index = item.index,
          node;
      if (this.items[index + 1]) {
        node = this.items[index + 1].firstNode();
      } else if (this.owner === this.root) {
        if (!this.owner.component) {
          node = null;
        } else {
          node = this.owner.component.findNextNode();
        }
      } else {
        node = this.owner.findNextNode(this);
      }
      return node;
    }
    var prototype_firstNode = Fragment$firstNode;
    function Fragment$firstNode() {
      if (this.items && this.items[0]) {
        return this.items[0].firstNode();
      }
      return null;
    }
    function processItems(items, values, guid, counter) {
      counter = counter || 0;
      return items.map(function(item) {
        var placeholderId,
            wrapped,
            value;
        if (item.text) {
          return item.text;
        }
        if (item.fragments) {
          return item.fragments.map(function(fragment) {
            return processItems(fragment.items, values, guid, counter);
          }).join("");
        }
        placeholderId = guid + "-" + counter++;
        if (item.keypath && (wrapped = item.root.viewmodel.wrapped[item.keypath.str])) {
          value = wrapped.value;
        } else {
          value = item.getValue();
        }
        values[placeholderId] = value;
        return "${" + placeholderId + "}";
      }).join("");
    }
    var getArgsList = Fragment$getArgsList;
    function Fragment$getArgsList() {
      var values,
          source,
          parsed,
          result;
      if (this.dirtyArgs) {
        source = processItems(this.items, values = {}, this.root._guid);
        parsed = parseJSON("[" + source + "]", values);
        if (!parsed) {
          result = [this.toString()];
        } else {
          result = parsed.value;
        }
        this.argsList = result;
        this.dirtyArgs = false;
      }
      return this.argsList;
    }
    var getNode = Fragment$getNode;
    function Fragment$getNode() {
      var fragment = this;
      do {
        if (fragment.pElement) {
          return fragment.pElement.node;
        }
      } while (fragment = fragment.parent);
      return this.root.detached || this.root.el;
    }
    var prototype_getValue = Fragment$getValue;
    function Fragment$getValue() {
      var values,
          source,
          parsed,
          result;
      if (this.dirtyValue) {
        source = processItems(this.items, values = {}, this.root._guid);
        parsed = parseJSON(source, values);
        if (!parsed) {
          result = this.toString();
        } else {
          result = parsed.value;
        }
        this.value = result;
        this.dirtyValue = false;
      }
      return this.value;
    }
    var detach__default = function() {
      return detachNode(this.node);
    };
    var Text = function(options) {
      this.type = TEXT;
      this.text = options.template;
    };
    Text.prototype = {
      detach: detach__default,
      firstNode: function() {
        return this.node;
      },
      render: function() {
        if (!this.node) {
          this.node = document.createTextNode(this.text);
        }
        return this.node;
      },
      toString: function(escape) {
        return escape ? escapeHtml(this.text) : this.text;
      },
      unrender: function(shouldDestroy) {
        if (shouldDestroy) {
          return this.detach();
        }
      }
    };
    var unbind__default = unbind__unbind;
    function unbind__unbind() {
      if (this.registered) {
        this.root.viewmodel.unregister(this.keypath, this);
      }
      if (this.resolver) {
        this.resolver.unbind();
      }
    }
    var getValue__default = Mustache$getValue;
    function Mustache$getValue() {
      return this.value;
    }
    var ReferenceResolver = function(owner, ref, callback) {
      var keypath;
      this.ref = ref;
      this.resolved = false;
      this.root = owner.root;
      this.parentFragment = owner.parentFragment;
      this.callback = callback;
      keypath = resolveRef(owner.root, ref, owner.parentFragment);
      if (keypath != undefined) {
        this.resolve(keypath);
      } else {
        runloop.addUnresolved(this);
      }
    };
    ReferenceResolver.prototype = {
      resolve: function(keypath) {
        if (this.keypath && !keypath) {
          runloop.addUnresolved(this);
        }
        this.resolved = true;
        this.keypath = keypath;
        this.callback(keypath);
      },
      forceResolution: function() {
        this.resolve(getKeypath(this.ref));
      },
      rebind: function(oldKeypath, newKeypath) {
        var keypath;
        if (this.keypath != undefined) {
          keypath = this.keypath.replace(oldKeypath, newKeypath);
          if (keypath !== undefined) {
            this.resolve(keypath);
          }
        }
      },
      unbind: function() {
        if (!this.resolved) {
          runloop.removeUnresolved(this);
        }
      }
    };
    var SpecialResolver = function(owner, ref, callback) {
      this.parentFragment = owner.parentFragment;
      this.ref = ref;
      this.callback = callback;
      this.rebind();
    };
    var props = {
      "@keypath": {
        prefix: "c",
        prop: ["context"]
      },
      "@index": {
        prefix: "i",
        prop: ["index"]
      },
      "@key": {
        prefix: "k",
        prop: ["key", "index"]
      }
    };
    function getProp(target, prop) {
      var value;
      for (var i = 0; i < prop.prop.length; i++) {
        if ((value = target[prop.prop[i]]) !== undefined) {
          return value;
        }
      }
    }
    SpecialResolver.prototype = {
      rebind: function() {
        var ref = this.ref,
            fragment = this.parentFragment,
            prop = props[ref],
            value;
        if (!prop) {
          throw new Error("Unknown special reference \"" + ref + "\" - valid references are @index, @key and @keypath");
        }
        if (this.cached) {
          return this.callback(getKeypath("@" + prop.prefix + getProp(this.cached, prop)));
        }
        if (prop.prop.indexOf("index") !== -1 || prop.prop.indexOf("key") !== -1) {
          while (fragment) {
            if (fragment.owner.currentSubtype === SECTION_EACH && (value = getProp(fragment, prop)) !== undefined) {
              this.cached = fragment;
              fragment.registerIndexRef(this);
              return this.callback(getKeypath("@" + prop.prefix + value));
            }
            if (!fragment.parent && fragment.owner && fragment.owner.component && fragment.owner.component.parentFragment && !fragment.owner.component.instance.isolated) {
              fragment = fragment.owner.component.parentFragment;
            } else {
              fragment = fragment.parent;
            }
          }
        } else {
          while (fragment) {
            if ((value = getProp(fragment, prop)) !== undefined) {
              return this.callback(getKeypath("@" + prop.prefix + value.str));
            }
            fragment = fragment.parent;
          }
        }
      },
      unbind: function() {
        if (this.cached) {
          this.cached.unregisterIndexRef(this);
        }
      }
    };
    var IndexResolver = function(owner, ref, callback) {
      this.parentFragment = owner.parentFragment;
      this.ref = ref;
      this.callback = callback;
      ref.ref.fragment.registerIndexRef(this);
      this.rebind();
    };
    IndexResolver.prototype = {
      rebind: function() {
        var index,
            ref = this.ref.ref;
        if (ref.ref.t === "k") {
          index = "k" + ref.fragment.key;
        } else {
          index = "i" + ref.fragment.index;
        }
        if (index !== undefined) {
          this.callback(getKeypath("@" + index));
        }
      },
      unbind: function() {
        this.ref.ref.fragment.unregisterIndexRef(this);
      }
    };
    function findIndexRefs(fragment, refName) {
      var result = {},
          refs,
          fragRefs,
          ref,
          i,
          owner,
          hit = false;
      if (!refName) {
        result.refs = refs = {};
      }
      while (fragment) {
        if ((owner = fragment.owner) && (fragRefs = owner.indexRefs)) {
          if (refName && (ref = owner.getIndexRef(refName))) {
            result.ref = {
              fragment: fragment,
              ref: ref
            };
            return result;
          } else if (!refName) {
            for (i in fragRefs) {
              ref = fragRefs[i];
              if (!refs[ref.n]) {
                hit = true;
                refs[ref.n] = {
                  fragment: fragment,
                  ref: ref
                };
              }
            }
          }
        }
        if (!fragment.parent && fragment.owner && fragment.owner.component && fragment.owner.component.parentFragment && !fragment.owner.component.instance.isolated) {
          result.componentBoundary = true;
          fragment = fragment.owner.component.parentFragment;
        } else {
          fragment = fragment.parent;
        }
      }
      if (!hit) {
        return undefined;
      } else {
        return result;
      }
    }
    findIndexRefs.resolve = function findIndexRefs__resolve(indices) {
      var refs = {},
          k,
          ref;
      for (k in indices.refs) {
        ref = indices.refs[k];
        refs[ref.ref.n] = ref.ref.t === "k" ? ref.fragment.key : ref.fragment.index;
      }
      return refs;
    };
    function createReferenceResolver(owner, ref, callback) {
      var indexRef;
      if (ref.charAt(0) === "@") {
        return new SpecialResolver(owner, ref, callback);
      }
      if (indexRef = findIndexRefs(owner.parentFragment, ref)) {
        return new IndexResolver(owner, indexRef, callback);
      }
      return new ReferenceResolver(owner, ref, callback);
    }
    var cache = {};
    function getFunctionFromString(str, i) {
      var fn,
          args;
      if (cache[str]) {
        return cache[str];
      }
      args = [];
      while (i--) {
        args[i] = "_" + i;
      }
      fn = new Function(args.join(","), "return(" + str + ")");
      cache[str] = fn;
      return fn;
    }
    var ExpressionResolver,
        ExpressionResolver__bind = Function.prototype.bind;
    ExpressionResolver = function(owner, parentFragment, expression, callback) {
      var _this = this;
      var ractive;
      ractive = owner.root;
      this.root = ractive;
      this.parentFragment = parentFragment;
      this.callback = callback;
      this.owner = owner;
      this.str = expression.s;
      this.keypaths = [];
      this.pending = expression.r.length;
      this.refResolvers = expression.r.map(function(ref, i) {
        return createReferenceResolver(_this, ref, function(keypath) {
          _this.resolve(i, keypath);
        });
      });
      this.ready = true;
      this.bubble();
    };
    ExpressionResolver.prototype = {
      bubble: function() {
        if (!this.ready) {
          return ;
        }
        this.uniqueString = getUniqueString(this.str, this.keypaths);
        this.keypath = createExpressionKeypath(this.uniqueString);
        this.createEvaluator();
        this.callback(this.keypath);
      },
      unbind: function() {
        var resolver;
        while (resolver = this.refResolvers.pop()) {
          resolver.unbind();
        }
      },
      resolve: function(index, keypath) {
        this.keypaths[index] = keypath;
        this.bubble();
      },
      createEvaluator: function() {
        var _this = this;
        var computation,
            valueGetters,
            signature,
            keypath,
            fn;
        keypath = this.keypath;
        computation = this.root.viewmodel.computations[keypath.str];
        if (!computation) {
          fn = getFunctionFromString(this.str, this.refResolvers.length);
          valueGetters = this.keypaths.map(function(keypath) {
            var value;
            if (keypath === "undefined") {
              return function() {
                return undefined;
              };
            }
            if (keypath.isSpecial) {
              value = keypath.value;
              return function() {
                return value;
              };
            }
            return function() {
              var value = _this.root.viewmodel.get(keypath, {
                noUnwrap: true,
                fullRootGet: true
              });
              if (typeof value === "function") {
                value = wrapFunction(value, _this.root);
              }
              return value;
            };
          });
          signature = {
            deps: this.keypaths.filter(isValidDependency),
            getter: function() {
              var args = valueGetters.map(call);
              return fn.apply(null, args);
            }
          };
          computation = this.root.viewmodel.compute(keypath, signature);
        } else {
          this.root.viewmodel.mark(keypath);
        }
      },
      rebind: function(oldKeypath, newKeypath) {
        this.refResolvers.forEach(function(r) {
          return r.rebind(oldKeypath, newKeypath);
        });
      }
    };
    function call(value) {
      return value.call();
    }
    function getUniqueString(str, keypaths) {
      return str.replace(/_([0-9]+)/g, function(match, $1) {
        var keypath,
            value;
        if (+$1 >= keypaths.length) {
          return "_" + $1;
        }
        keypath = keypaths[$1];
        if (keypath === undefined) {
          return "undefined";
        }
        if (keypath.isSpecial) {
          value = keypath.value;
          return typeof value === "number" ? value : "\"" + value + "\"";
        }
        return keypath.str;
      });
    }
    function createExpressionKeypath(uniqueString) {
      return getKeypath("${" + uniqueString.replace(/[\.\[\]]/g, "-").replace(/\*/, "#MUL#") + "}");
    }
    function isValidDependency(keypath) {
      return keypath !== undefined && keypath[0] !== "@";
    }
    function wrapFunction(fn, ractive) {
      var wrapped,
          prop,
          key;
      if (fn.__ractive_nowrap) {
        return fn;
      }
      prop = "__ractive_" + ractive._guid;
      wrapped = fn[prop];
      if (wrapped) {
        return wrapped;
      } else if (/this/.test(fn.toString())) {
        defineProperty(fn, prop, {
          value: ExpressionResolver__bind.call(fn, ractive),
          configurable: true
        });
        for (key in fn) {
          if (fn.hasOwnProperty(key)) {
            fn[prop][key] = fn[key];
          }
        }
        ractive._boundFunctions.push({
          fn: fn,
          prop: prop
        });
        return fn[prop];
      }
      defineProperty(fn, "__ractive_nowrap", {value: fn});
      return fn.__ractive_nowrap;
    }
    var MemberResolver = function(template, resolver, parentFragment) {
      var _this = this;
      this.resolver = resolver;
      this.root = resolver.root;
      this.parentFragment = parentFragment;
      this.viewmodel = resolver.root.viewmodel;
      if (typeof template === "string") {
        this.value = template;
      } else if (template.t === REFERENCE) {
        this.refResolver = createReferenceResolver(this, template.n, function(keypath) {
          _this.resolve(keypath);
        });
      } else {
        new ExpressionResolver(resolver, parentFragment, template, function(keypath) {
          _this.resolve(keypath);
        });
      }
    };
    MemberResolver.prototype = {
      resolve: function(keypath) {
        if (this.keypath) {
          this.viewmodel.unregister(this.keypath, this);
        }
        this.keypath = keypath;
        this.value = this.viewmodel.get(keypath);
        this.bind();
        this.resolver.bubble();
      },
      bind: function() {
        this.viewmodel.register(this.keypath, this);
      },
      rebind: function(oldKeypath, newKeypath) {
        if (this.refResolver) {
          this.refResolver.rebind(oldKeypath, newKeypath);
        }
      },
      setValue: function(value) {
        this.value = value;
        this.resolver.bubble();
      },
      unbind: function() {
        if (this.keypath) {
          this.viewmodel.unregister(this.keypath, this);
        }
        if (this.refResolver) {
          this.refResolver.unbind();
        }
      },
      forceResolution: function() {
        if (this.refResolver) {
          this.refResolver.forceResolution();
        }
      }
    };
    var ReferenceExpressionResolver = function(mustache, template, callback) {
      var _this = this;
      var ractive,
          ref,
          keypath,
          parentFragment;
      this.parentFragment = parentFragment = mustache.parentFragment;
      this.root = ractive = mustache.root;
      this.mustache = mustache;
      this.ref = ref = template.r;
      this.callback = callback;
      this.unresolved = [];
      if (keypath = resolveRef(ractive, ref, parentFragment)) {
        this.base = keypath;
      } else {
        this.baseResolver = new ReferenceResolver(this, ref, function(keypath) {
          _this.base = keypath;
          _this.baseResolver = null;
          _this.bubble();
        });
      }
      this.members = template.m.map(function(template) {
        return new MemberResolver(template, _this, parentFragment);
      });
      this.ready = true;
      this.bubble();
    };
    ReferenceExpressionResolver.prototype = {
      getKeypath: function() {
        var values = this.members.map(ReferenceExpressionResolver__getValue);
        if (!values.every(isDefined) || this.baseResolver) {
          return null;
        }
        return this.base.join(values.join("."));
      },
      bubble: function() {
        if (!this.ready || this.baseResolver) {
          return ;
        }
        this.callback(this.getKeypath());
      },
      unbind: function() {
        this.members.forEach(methodCallers__unbind);
      },
      rebind: function(oldKeypath, newKeypath) {
        var changed;
        if (this.base) {
          var newBase = this.base.replace(oldKeypath, newKeypath);
          if (newBase && newBase !== this.base) {
            this.base = newBase;
            changed = true;
          }
        }
        this.members.forEach(function(members) {
          if (members.rebind(oldKeypath, newKeypath)) {
            changed = true;
          }
        });
        if (changed) {
          this.bubble();
        }
      },
      forceResolution: function() {
        if (this.baseResolver) {
          this.base = getKeypath(this.ref);
          this.baseResolver.unbind();
          this.baseResolver = null;
        }
        this.members.forEach(forceResolution);
        this.bubble();
      }
    };
    function ReferenceExpressionResolver__getValue(member) {
      return member.value;
    }
    function isDefined(value) {
      return value != undefined;
    }
    function forceResolution(member) {
      member.forceResolution();
    }
    var init__default = Mustache$init;
    function Mustache$init(mustache, options) {
      var ref,
          parentFragment,
          template;
      parentFragment = options.parentFragment;
      template = options.template;
      mustache.root = parentFragment.root;
      mustache.parentFragment = parentFragment;
      mustache.pElement = parentFragment.pElement;
      mustache.template = options.template;
      mustache.index = options.index || 0;
      mustache.isStatic = options.template.s;
      mustache.type = options.template.t;
      mustache.registered = false;
      if (ref = template.r) {
        mustache.resolver = createReferenceResolver(mustache, ref, resolve);
      }
      if (options.template.x) {
        mustache.resolver = new ExpressionResolver(mustache, parentFragment, options.template.x, resolveAndRebindChildren);
      }
      if (options.template.rx) {
        mustache.resolver = new ReferenceExpressionResolver(mustache, options.template.rx, resolveAndRebindChildren);
      }
      if (mustache.template.n === SECTION_UNLESS && !mustache.hasOwnProperty("value")) {
        mustache.setValue(undefined);
      }
      function resolve(keypath) {
        mustache.resolve(keypath);
      }
      function resolveAndRebindChildren(newKeypath) {
        var oldKeypath = mustache.keypath;
        if (newKeypath != oldKeypath) {
          mustache.resolve(newKeypath);
          if (oldKeypath !== undefined) {
            mustache.fragments && mustache.fragments.forEach(function(f) {
              f.rebind(oldKeypath, newKeypath);
            });
          }
        }
      }
    }
    var resolve__default = Mustache$resolve;
    function Mustache$resolve(keypath) {
      var wasResolved,
          value,
          twowayBinding;
      if (keypath && keypath.isSpecial) {
        this.keypath = keypath;
        this.setValue(keypath.value);
        return ;
      }
      if (this.registered) {
        this.root.viewmodel.unregister(this.keypath, this);
        this.registered = false;
        wasResolved = true;
      }
      this.keypath = keypath;
      if (keypath != undefined) {
        value = this.root.viewmodel.get(keypath);
        this.root.viewmodel.register(keypath, this);
        this.registered = true;
      }
      this.setValue(value);
      if (wasResolved && (twowayBinding = this.twowayBinding)) {
        twowayBinding.rebound();
      }
    }
    var rebind__default = Mustache$rebind;
    function Mustache$rebind(oldKeypath, newKeypath) {
      if (this.fragments) {
        this.fragments.forEach(function(f) {
          return f.rebind(oldKeypath, newKeypath);
        });
      }
      if (this.resolver) {
        this.resolver.rebind(oldKeypath, newKeypath);
      }
    }
    var Mustache = {
      getValue: getValue__default,
      init: init__default,
      resolve: resolve__default,
      rebind: rebind__default
    };
    var Interpolator = function(options) {
      this.type = INTERPOLATOR;
      Mustache.init(this, options);
    };
    Interpolator.prototype = {
      update: function() {
        this.node.data = this.value == undefined ? "" : this.value;
      },
      resolve: Mustache.resolve,
      rebind: Mustache.rebind,
      detach: detach__default,
      unbind: unbind__default,
      render: function() {
        if (!this.node) {
          this.node = document.createTextNode(safeToStringValue(this.value));
        }
        return this.node;
      },
      unrender: function(shouldDestroy) {
        if (shouldDestroy) {
          detachNode(this.node);
        }
      },
      getValue: Mustache.getValue,
      setValue: function(value) {
        var wrapper;
        if (this.keypath && (wrapper = this.root.viewmodel.wrapped[this.keypath.str])) {
          value = wrapper.get();
        }
        if (!isEqual(value, this.value)) {
          this.value = value;
          this.parentFragment.bubble();
          if (this.node) {
            runloop.addView(this);
          }
        }
      },
      firstNode: function() {
        return this.node;
      },
      toString: function(escape) {
        var string = "" + safeToStringValue(this.value);
        return escape ? escapeHtml(string) : string;
      }
    };
    var bubble__default = Section$bubble;
    function Section$bubble() {
      this.parentFragment.bubble();
    }
    var Section_prototype_detach = Section$detach;
    function Section$detach() {
      var docFrag;
      if (this.fragments.length === 1) {
        return this.fragments[0].detach();
      }
      docFrag = document.createDocumentFragment();
      this.fragments.forEach(function(item) {
        docFrag.appendChild(item.detach());
      });
      return docFrag;
    }
    var find = Section$find;
    function Section$find(selector) {
      var i,
          len,
          queryResult;
      len = this.fragments.length;
      for (i = 0; i < len; i += 1) {
        if (queryResult = this.fragments[i].find(selector)) {
          return queryResult;
        }
      }
      return null;
    }
    var findAll = Section$findAll;
    function Section$findAll(selector, query) {
      var i,
          len;
      len = this.fragments.length;
      for (i = 0; i < len; i += 1) {
        this.fragments[i].findAll(selector, query);
      }
    }
    var findAllComponents = Section$findAllComponents;
    function Section$findAllComponents(selector, query) {
      var i,
          len;
      len = this.fragments.length;
      for (i = 0; i < len; i += 1) {
        this.fragments[i].findAllComponents(selector, query);
      }
    }
    var findComponent = Section$findComponent;
    function Section$findComponent(selector) {
      var i,
          len,
          queryResult;
      len = this.fragments.length;
      for (i = 0; i < len; i += 1) {
        if (queryResult = this.fragments[i].findComponent(selector)) {
          return queryResult;
        }
      }
      return null;
    }
    var findNextNode = Section$findNextNode;
    function Section$findNextNode(fragment) {
      if (this.fragments[fragment.index + 1]) {
        return this.fragments[fragment.index + 1].firstNode();
      }
      return this.parentFragment.findNextNode(this);
    }
    var firstNode = Section$firstNode;
    function Section$firstNode() {
      var len,
          i,
          node;
      if (len = this.fragments.length) {
        for (i = 0; i < len; i += 1) {
          if (node = this.fragments[i].firstNode()) {
            return node;
          }
        }
      }
      return this.parentFragment.findNextNode(this);
    }
    var shuffle = Section$shuffle;
    function Section$shuffle(newIndices) {
      var _this = this;
      var parentFragment,
          firstChange,
          i,
          newLength,
          reboundFragments,
          fragmentOptions,
          fragment;
      if (this.shuffling || this.unbound || this.currentSubtype !== SECTION_EACH) {
        return ;
      }
      this.shuffling = true;
      runloop.scheduleTask(function() {
        return _this.shuffling = false;
      });
      parentFragment = this.parentFragment;
      reboundFragments = [];
      newIndices.forEach(function(newIndex, oldIndex) {
        var fragment,
            by,
            oldKeypath,
            newKeypath,
            deps;
        if (newIndex === oldIndex) {
          reboundFragments[newIndex] = _this.fragments[oldIndex];
          return ;
        }
        fragment = _this.fragments[oldIndex];
        if (firstChange === undefined) {
          firstChange = oldIndex;
        }
        if (newIndex === -1) {
          _this.fragmentsToUnrender.push(fragment);
          fragment.unbind();
          return ;
        }
        by = newIndex - oldIndex;
        oldKeypath = _this.keypath.join(oldIndex);
        newKeypath = _this.keypath.join(newIndex);
        fragment.index = newIndex;
        if (deps = fragment.registeredIndexRefs) {
          deps.forEach(shuffle__blindRebind);
        }
        fragment.rebind(oldKeypath, newKeypath);
        reboundFragments[newIndex] = fragment;
      });
      newLength = this.root.viewmodel.get(this.keypath).length;
      if (firstChange === undefined) {
        if (this.length === newLength) {
          return ;
        }
        firstChange = this.length;
      }
      this.length = this.fragments.length = newLength;
      if (this.rendered) {
        runloop.addView(this);
      }
      fragmentOptions = {
        template: this.template.f,
        root: this.root,
        owner: this
      };
      for (i = firstChange; i < newLength; i += 1) {
        fragment = reboundFragments[i];
        if (!fragment) {
          this.fragmentsToCreate.push(i);
        }
        this.fragments[i] = fragment;
      }
    }
    function shuffle__blindRebind(dep) {
      dep.rebind("", "");
    }
    var prototype_rebind = function(oldKeypath, newKeypath) {
      Mustache.rebind.call(this, oldKeypath, newKeypath);
    };
    var render__default = Section$render;
    function Section$render() {
      var _this = this;
      this.docFrag = document.createDocumentFragment();
      this.fragments.forEach(function(f) {
        return _this.docFrag.appendChild(f.render());
      });
      this.renderedFragments = this.fragments.slice();
      this.fragmentsToRender = [];
      this.rendered = true;
      return this.docFrag;
    }
    var setValue = Section$setValue;
    function Section$setValue(value) {
      var _this = this;
      var wrapper,
          fragmentOptions;
      if (this.updating) {
        return ;
      }
      this.updating = true;
      if (this.keypath && (wrapper = this.root.viewmodel.wrapped[this.keypath.str])) {
        value = wrapper.get();
      }
      if (this.fragmentsToCreate.length) {
        fragmentOptions = {
          template: this.template.f || [],
          root: this.root,
          pElement: this.pElement,
          owner: this
        };
        this.fragmentsToCreate.forEach(function(index) {
          var fragment;
          fragmentOptions.context = _this.keypath.join(index);
          fragmentOptions.index = index;
          fragment = new Fragment(fragmentOptions);
          _this.fragmentsToRender.push(_this.fragments[index] = fragment);
        });
        this.fragmentsToCreate.length = 0;
      } else if (reevaluateSection(this, value)) {
        this.bubble();
        if (this.rendered) {
          runloop.addView(this);
        }
      }
      this.value = value;
      this.updating = false;
    }
    function changeCurrentSubtype(section, value, obj) {
      if (value === SECTION_EACH) {
        if (section.indexRefs && section.indexRefs[0]) {
          var ref = section.indexRefs[0];
          if (obj && ref.t === "i" || !obj && ref.t === "k") {
            if (!obj) {
              section.length = 0;
              section.fragmentsToUnrender = section.fragments.slice(0);
              section.fragmentsToUnrender.forEach(function(f) {
                return f.unbind();
              });
            }
          }
          ref.t = obj ? "k" : "i";
        }
      }
      section.currentSubtype = value;
    }
    function reevaluateSection(section, value) {
      var fragmentOptions = {
        template: section.template.f || [],
        root: section.root,
        pElement: section.parentFragment.pElement,
        owner: section
      };
      section.hasContext = true;
      if (section.subtype) {
        switch (section.subtype) {
          case SECTION_IF:
            section.hasContext = false;
            return reevaluateConditionalSection(section, value, false, fragmentOptions);
          case SECTION_UNLESS:
            section.hasContext = false;
            return reevaluateConditionalSection(section, value, true, fragmentOptions);
          case SECTION_WITH:
            return reevaluateContextSection(section, fragmentOptions);
          case SECTION_IF_WITH:
            return reevaluateConditionalContextSection(section, value, fragmentOptions);
          case SECTION_EACH:
            if (isObject(value)) {
              changeCurrentSubtype(section, section.subtype, true);
              return reevaluateListObjectSection(section, value, fragmentOptions);
            }
        }
      }
      section.ordered = !!isArrayLike(value);
      if (section.ordered) {
        changeCurrentSubtype(section, SECTION_EACH, false);
        return reevaluateListSection(section, value, fragmentOptions);
      }
      if (isObject(value) || typeof value === "function") {
        if (section.template.i) {
          changeCurrentSubtype(section, SECTION_EACH, true);
          return reevaluateListObjectSection(section, value, fragmentOptions);
        }
        changeCurrentSubtype(section, SECTION_WITH, false);
        return reevaluateContextSection(section, fragmentOptions);
      }
      changeCurrentSubtype(section, SECTION_IF, false);
      section.hasContext = false;
      return reevaluateConditionalSection(section, value, false, fragmentOptions);
    }
    function reevaluateListSection(section, value, fragmentOptions) {
      var i,
          length,
          fragment;
      length = value.length;
      if (length === section.length) {
        return false;
      }
      if (length < section.length) {
        section.fragmentsToUnrender = section.fragments.splice(length, section.length - length);
        section.fragmentsToUnrender.forEach(methodCallers__unbind);
      } else {
        if (length > section.length) {
          for (i = section.length; i < length; i += 1) {
            fragmentOptions.context = section.keypath.join(i);
            fragmentOptions.index = i;
            fragment = new Fragment(fragmentOptions);
            section.fragmentsToRender.push(section.fragments[i] = fragment);
          }
        }
      }
      section.length = length;
      return true;
    }
    function reevaluateListObjectSection(section, value, fragmentOptions) {
      var id,
          i,
          hasKey,
          fragment,
          changed,
          deps;
      hasKey = section.hasKey || (section.hasKey = {});
      i = section.fragments.length;
      while (i--) {
        fragment = section.fragments[i];
        if (!(fragment.key in value)) {
          changed = true;
          fragment.unbind();
          section.fragmentsToUnrender.push(fragment);
          section.fragments.splice(i, 1);
          hasKey[fragment.key] = false;
        }
      }
      i = section.fragments.length;
      while (i--) {
        fragment = section.fragments[i];
        if (fragment.index !== i) {
          fragment.index = i;
          if (deps = fragment.registeredIndexRefs) {
            deps.forEach(setValue__blindRebind);
          }
        }
      }
      i = section.fragments.length;
      for (id in value) {
        if (!hasKey[id]) {
          changed = true;
          fragmentOptions.context = section.keypath.join(id);
          fragmentOptions.key = id;
          fragmentOptions.index = i++;
          fragment = new Fragment(fragmentOptions);
          section.fragmentsToRender.push(fragment);
          section.fragments.push(fragment);
          hasKey[id] = true;
        }
      }
      section.length = section.fragments.length;
      return changed;
    }
    function reevaluateConditionalContextSection(section, value, fragmentOptions) {
      if (value) {
        return reevaluateContextSection(section, fragmentOptions);
      } else {
        return removeSectionFragments(section);
      }
    }
    function reevaluateContextSection(section, fragmentOptions) {
      var fragment;
      if (!section.length) {
        fragmentOptions.context = section.keypath;
        fragmentOptions.index = 0;
        fragment = new Fragment(fragmentOptions);
        section.fragmentsToRender.push(section.fragments[0] = fragment);
        section.length = 1;
        return true;
      }
    }
    function reevaluateConditionalSection(section, value, inverted, fragmentOptions) {
      var doRender,
          emptyArray,
          emptyObject,
          fragment,
          name;
      emptyArray = isArrayLike(value) && value.length === 0;
      emptyObject = false;
      if (!isArrayLike(value) && isObject(value)) {
        emptyObject = true;
        for (name in value) {
          emptyObject = false;
          break;
        }
      }
      if (inverted) {
        doRender = emptyArray || emptyObject || !value;
      } else {
        doRender = value && !emptyArray && !emptyObject;
      }
      if (doRender) {
        if (!section.length) {
          fragmentOptions.index = 0;
          fragment = new Fragment(fragmentOptions);
          section.fragmentsToRender.push(section.fragments[0] = fragment);
          section.length = 1;
          return true;
        }
        if (section.length > 1) {
          section.fragmentsToUnrender = section.fragments.splice(1);
          section.fragmentsToUnrender.forEach(methodCallers__unbind);
          return true;
        }
      } else {
        return removeSectionFragments(section);
      }
    }
    function removeSectionFragments(section) {
      if (section.length) {
        section.fragmentsToUnrender = section.fragments.splice(0, section.fragments.length).filter(isRendered);
        section.fragmentsToUnrender.forEach(methodCallers__unbind);
        section.length = section.fragmentsToRender.length = 0;
        return true;
      }
    }
    function isRendered(fragment) {
      return fragment.rendered;
    }
    function setValue__blindRebind(dep) {
      dep.rebind("", "");
    }
    var toString__default = Section$toString;
    function Section$toString(escape) {
      var str,
          i,
          len;
      str = "";
      i = 0;
      len = this.length;
      for (i = 0; i < len; i += 1) {
        str += this.fragments[i].toString(escape);
      }
      return str;
    }
    var prototype_unbind = Section$unbind;
    function Section$unbind() {
      var _this = this;
      this.fragments.forEach(methodCallers__unbind);
      this.fragmentsToRender.forEach(function(f) {
        return removeFromArray(_this.fragments, f);
      });
      this.fragmentsToRender = [];
      unbind__default.call(this);
      this.length = 0;
      this.unbound = true;
    }
    var unrender__default = Section$unrender;
    function Section$unrender(shouldDestroy) {
      this.fragments.forEach(shouldDestroy ? unrenderAndDestroy : unrender__unrender);
      this.renderedFragments = [];
      this.rendered = false;
    }
    function unrenderAndDestroy(fragment) {
      fragment.unrender(true);
    }
    function unrender__unrender(fragment) {
      fragment.unrender(false);
    }
    var update__default = Section$update;
    function Section$update() {
      var fragment,
          renderIndex,
          renderedFragments,
          anchor,
          target,
          i,
          len;
      renderedFragments = this.renderedFragments;
      while (fragment = this.fragmentsToUnrender.pop()) {
        fragment.unrender(true);
        renderedFragments.splice(renderedFragments.indexOf(fragment), 1);
      }
      while (fragment = this.fragmentsToRender.shift()) {
        fragment.render();
      }
      if (this.rendered) {
        target = this.parentFragment.getNode();
      }
      len = this.fragments.length;
      for (i = 0; i < len; i += 1) {
        fragment = this.fragments[i];
        renderIndex = renderedFragments.indexOf(fragment, i);
        if (renderIndex === i) {
          if (this.docFrag.childNodes.length) {
            anchor = fragment.firstNode();
            target.insertBefore(this.docFrag, anchor);
          }
          continue;
        }
        this.docFrag.appendChild(fragment.detach());
        if (renderIndex !== -1) {
          renderedFragments.splice(renderIndex, 1);
        }
        renderedFragments.splice(i, 0, fragment);
      }
      if (this.rendered && this.docFrag.childNodes.length) {
        anchor = this.parentFragment.findNextNode(this);
        target.insertBefore(this.docFrag, anchor);
      }
      this.renderedFragments = this.fragments.slice();
    }
    var Section = function(options) {
      this.type = SECTION;
      this.subtype = this.currentSubtype = options.template.n;
      this.inverted = this.subtype === SECTION_UNLESS;
      this.pElement = options.pElement;
      this.fragments = [];
      this.fragmentsToCreate = [];
      this.fragmentsToRender = [];
      this.fragmentsToUnrender = [];
      if (options.template.i) {
        this.indexRefs = options.template.i.split(",").map(function(k, i) {
          return {
            n: k,
            t: i === 0 ? "k" : "i"
          };
        });
      }
      this.renderedFragments = [];
      this.length = 0;
      Mustache.init(this, options);
    };
    Section.prototype = {
      bubble: bubble__default,
      detach: Section_prototype_detach,
      find: find,
      findAll: findAll,
      findAllComponents: findAllComponents,
      findComponent: findComponent,
      findNextNode: findNextNode,
      firstNode: firstNode,
      getIndexRef: function(name) {
        if (this.indexRefs) {
          var i = this.indexRefs.length;
          while (i--) {
            var ref = this.indexRefs[i];
            if (ref.n === name) {
              return ref;
            }
          }
        }
      },
      getValue: Mustache.getValue,
      shuffle: shuffle,
      rebind: prototype_rebind,
      render: render__default,
      resolve: Mustache.resolve,
      setValue: setValue,
      toString: toString__default,
      unbind: prototype_unbind,
      unrender: unrender__default,
      update: update__default
    };
    var Triple_prototype_detach = Triple$detach;
    function Triple$detach() {
      var len,
          i;
      if (this.docFrag) {
        len = this.nodes.length;
        for (i = 0; i < len; i += 1) {
          this.docFrag.appendChild(this.nodes[i]);
        }
        return this.docFrag;
      }
    }
    var Triple_prototype_find = Triple$find;
    function Triple$find(selector) {
      var i,
          len,
          node,
          queryResult;
      len = this.nodes.length;
      for (i = 0; i < len; i += 1) {
        node = this.nodes[i];
        if (node.nodeType !== 1) {
          continue;
        }
        if (matches(node, selector)) {
          return node;
        }
        if (queryResult = node.querySelector(selector)) {
          return queryResult;
        }
      }
      return null;
    }
    var Triple_prototype_findAll = Triple$findAll;
    function Triple$findAll(selector, queryResult) {
      var i,
          len,
          node,
          queryAllResult,
          numNodes,
          j;
      len = this.nodes.length;
      for (i = 0; i < len; i += 1) {
        node = this.nodes[i];
        if (node.nodeType !== 1) {
          continue;
        }
        if (matches(node, selector)) {
          queryResult.push(node);
        }
        if (queryAllResult = node.querySelectorAll(selector)) {
          numNodes = queryAllResult.length;
          for (j = 0; j < numNodes; j += 1) {
            queryResult.push(queryAllResult[j]);
          }
        }
      }
    }
    var Triple_prototype_firstNode = Triple$firstNode;
    function Triple$firstNode() {
      if (this.rendered && this.nodes[0]) {
        return this.nodes[0];
      }
      return this.parentFragment.findNextNode(this);
    }
    var elementCache = {},
        ieBug,
        ieBlacklist;
    try {
      createElement("table").innerHTML = "foo";
    } catch (err) {
      ieBug = true;
      ieBlacklist = {
        TABLE: ["<table class=\"x\">", "</table>"],
        THEAD: ["<table><thead class=\"x\">", "</thead></table>"],
        TBODY: ["<table><tbody class=\"x\">", "</tbody></table>"],
        TR: ["<table><tr class=\"x\">", "</tr></table>"],
        SELECT: ["<select class=\"x\">", "</select>"]
      };
    }
    var insertHtml = function(html, node, docFrag) {
      var container,
          nodes = [],
          wrapper,
          selectedOption,
          child,
          i;
      if (html != null && html !== "") {
        if (ieBug && (wrapper = ieBlacklist[node.tagName])) {
          container = element("DIV");
          container.innerHTML = wrapper[0] + html + wrapper[1];
          container = container.querySelector(".x");
          if (container.tagName === "SELECT") {
            selectedOption = container.options[container.selectedIndex];
          }
        } else if (node.namespaceURI === namespaces.svg) {
          container = element("DIV");
          container.innerHTML = "<svg class=\"x\">" + html + "</svg>";
          container = container.querySelector(".x");
        } else {
          container = element(node.tagName);
          container.innerHTML = html;
          if (container.tagName === "SELECT") {
            selectedOption = container.options[container.selectedIndex];
          }
        }
        while (child = container.firstChild) {
          nodes.push(child);
          docFrag.appendChild(child);
        }
        if (node.tagName === "SELECT") {
          i = nodes.length;
          while (i--) {
            if (nodes[i] !== selectedOption) {
              nodes[i].selected = false;
            }
          }
        }
      }
      return nodes;
    };
    function element(tagName) {
      return elementCache[tagName] || (elementCache[tagName] = createElement(tagName));
    }
    function updateSelect(parentElement) {
      var selectedOptions,
          option,
          value;
      if (!parentElement || parentElement.name !== "select" || !parentElement.binding) {
        return ;
      }
      selectedOptions = toArray(parentElement.node.options).filter(isSelected);
      if (parentElement.getAttribute("multiple")) {
        value = selectedOptions.map(function(o) {
          return o.value;
        });
      } else if (option = selectedOptions[0]) {
        value = option.value;
      }
      if (value !== undefined) {
        parentElement.binding.setValue(value);
      }
      parentElement.bubble();
    }
    function isSelected(option) {
      return option.selected;
    }
    var Triple_prototype_render = Triple$render;
    function Triple$render() {
      if (this.rendered) {
        throw new Error("Attempted to render an item that was already rendered");
      }
      this.docFrag = document.createDocumentFragment();
      this.nodes = insertHtml(this.value, this.parentFragment.getNode(), this.docFrag);
      updateSelect(this.pElement);
      this.rendered = true;
      return this.docFrag;
    }
    var prototype_setValue = Triple$setValue;
    function Triple$setValue(value) {
      var wrapper;
      if (wrapper = this.root.viewmodel.wrapped[this.keypath.str]) {
        value = wrapper.get();
      }
      if (value !== this.value) {
        this.value = value;
        this.parentFragment.bubble();
        if (this.rendered) {
          runloop.addView(this);
        }
      }
    }
    var prototype_toString = Triple$toString;
    function Triple$toString() {
      return this.value != undefined ? decodeCharacterReferences("" + this.value) : "";
    }
    var prototype_unrender = Triple$unrender;
    function Triple$unrender(shouldDestroy) {
      if (this.rendered && shouldDestroy) {
        this.nodes.forEach(detachNode);
        this.rendered = false;
      }
    }
    var prototype_update = Triple$update;
    function Triple$update() {
      var node,
          parentNode;
      if (!this.rendered) {
        return ;
      }
      while (this.nodes && this.nodes.length) {
        node = this.nodes.pop();
        node.parentNode.removeChild(node);
      }
      parentNode = this.parentFragment.getNode();
      this.nodes = insertHtml(this.value, parentNode, this.docFrag);
      parentNode.insertBefore(this.docFrag, this.parentFragment.findNextNode(this));
      updateSelect(this.pElement);
    }
    var Triple = function(options) {
      this.type = TRIPLE;
      Mustache.init(this, options);
    };
    Triple.prototype = {
      detach: Triple_prototype_detach,
      find: Triple_prototype_find,
      findAll: Triple_prototype_findAll,
      firstNode: Triple_prototype_firstNode,
      getValue: Mustache.getValue,
      rebind: Mustache.rebind,
      render: Triple_prototype_render,
      resolve: Mustache.resolve,
      setValue: prototype_setValue,
      toString: prototype_toString,
      unbind: unbind__default,
      unrender: prototype_unrender,
      update: prototype_update
    };
    var Element_prototype_bubble = function() {
      this.parentFragment.bubble();
    };
    var Element_prototype_detach = Element$detach;
    function Element$detach() {
      var node = this.node,
          parentNode;
      if (node) {
        if (parentNode = node.parentNode) {
          parentNode.removeChild(node);
        }
        return node;
      }
    }
    var Element_prototype_find = function(selector) {
      if (!this.node) {
        return null;
      }
      if (matches(this.node, selector)) {
        return this.node;
      }
      if (this.fragment && this.fragment.find) {
        return this.fragment.find(selector);
      }
    };
    var Element_prototype_findAll = function(selector, query) {
      if (query._test(this, true) && query.live) {
        (this.liveQueries || (this.liveQueries = [])).push(query);
      }
      if (this.fragment) {
        this.fragment.findAll(selector, query);
      }
    };
    var Element_prototype_findAllComponents = function(selector, query) {
      if (this.fragment) {
        this.fragment.findAllComponents(selector, query);
      }
    };
    var Element_prototype_findComponent = function(selector) {
      if (this.fragment) {
        return this.fragment.findComponent(selector);
      }
    };
    var Element_prototype_findNextNode = Element$findNextNode;
    function Element$findNextNode() {
      return null;
    }
    var Element_prototype_firstNode = Element$firstNode;
    function Element$firstNode() {
      return this.node;
    }
    var getAttribute = Element$getAttribute;
    function Element$getAttribute(name) {
      if (!this.attributes || !this.attributes[name]) {
        return ;
      }
      return this.attributes[name].value;
    }
    var truthy = /^true|on|yes|1$/i;
    var processBindingAttributes__isNumeric = /^[0-9]+$/;
    var processBindingAttributes = function(element, template) {
      var val,
          attrs,
          attributes;
      attributes = template.a || {};
      attrs = {};
      val = attributes.twoway;
      if (val !== undefined) {
        attrs.twoway = val === 0 || truthy.test(val);
      }
      val = attributes.lazy;
      if (val !== undefined) {
        if (val !== 0 && processBindingAttributes__isNumeric.test(val)) {
          attrs.lazy = parseInt(val);
        } else {
          attrs.lazy = val === 0 || truthy.test(val);
        }
      }
      return attrs;
    };
    var Attribute_prototype_bubble = Attribute$bubble;
    function Attribute$bubble() {
      var value = this.useProperty || !this.rendered ? this.fragment.getValue() : this.fragment.toString();
      if (!isEqual(value, this.value)) {
        if (this.name === "id" && this.value) {
          delete this.root.nodes[this.value];
        }
        this.value = value;
        if (this.name === "value" && this.node) {
          this.node._ractive.value = value;
        }
        if (this.rendered) {
          runloop.addView(this);
        }
      }
    }
    var svgCamelCaseElements,
        svgCamelCaseAttributes,
        createMap,
        map;
    svgCamelCaseElements = "altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath vkern".split(" ");
    svgCamelCaseAttributes = "attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits contentScriptType contentStyleType diffuseConstant edgeMode externalResourcesRequired filterRes filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan".split(" ");
    createMap = function(items) {
      var map = {},
          i = items.length;
      while (i--) {
        map[items[i].toLowerCase()] = items[i];
      }
      return map;
    };
    map = createMap(svgCamelCaseElements.concat(svgCamelCaseAttributes));
    var enforceCase = function(elementName) {
      var lowerCaseElementName = elementName.toLowerCase();
      return map[lowerCaseElementName] || lowerCaseElementName;
    };
    var determineNameAndNamespace = function(attribute, name) {
      var colonIndex,
          namespacePrefix;
      colonIndex = name.indexOf(":");
      if (colonIndex !== -1) {
        namespacePrefix = name.substr(0, colonIndex);
        if (namespacePrefix !== "xmlns") {
          name = name.substring(colonIndex + 1);
          attribute.name = enforceCase(name);
          attribute.namespace = namespaces[namespacePrefix.toLowerCase()];
          attribute.namespacePrefix = namespacePrefix;
          if (!attribute.namespace) {
            throw "Unknown namespace (\"" + namespacePrefix + "\")";
          }
          return ;
        }
      }
      attribute.name = attribute.element.namespace !== namespaces.html ? enforceCase(name) : name;
    };
    function getInterpolator(attribute) {
      var items = attribute.fragment.items;
      if (items.length !== 1) {
        return ;
      }
      if (items[0].type === INTERPOLATOR) {
        return items[0];
      }
    }
    var prototype_init = Attribute$init;
    function Attribute$init(options) {
      this.type = ATTRIBUTE;
      this.element = options.element;
      this.root = options.root;
      determineNameAndNamespace(this, options.name);
      this.isBoolean = booleanAttributes.test(this.name);
      if (!options.value || typeof options.value === "string") {
        this.value = this.isBoolean ? true : options.value || "";
        return ;
      }
      this.parentFragment = this.element.parentFragment;
      this.fragment = new Fragment({
        template: options.value,
        root: this.root,
        owner: this
      });
      this.value = this.fragment.getValue();
      this.interpolator = getInterpolator(this);
      this.isBindable = !!this.interpolator && !this.interpolator.isStatic;
      this.ready = true;
    }
    var Attribute_prototype_rebind = Attribute$rebind;
    function Attribute$rebind(oldKeypath, newKeypath) {
      if (this.fragment) {
        this.fragment.rebind(oldKeypath, newKeypath);
      }
    }
    var Attribute_prototype_render = Attribute$render;
    var propertyNames = {
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      bgcolor: "bgColor",
      "class": "className",
      codebase: "codeBase",
      colspan: "colSpan",
      contenteditable: "contentEditable",
      datetime: "dateTime",
      dirname: "dirName",
      "for": "htmlFor",
      "http-equiv": "httpEquiv",
      ismap: "isMap",
      maxlength: "maxLength",
      novalidate: "noValidate",
      pubdate: "pubDate",
      readonly: "readOnly",
      rowspan: "rowSpan",
      tabindex: "tabIndex",
      usemap: "useMap"
    };
    function Attribute$render(node) {
      var propertyName;
      this.node = node;
      if (!node.namespaceURI || node.namespaceURI === namespaces.html) {
        propertyName = propertyNames[this.name] || this.name;
        if (node[propertyName] !== undefined) {
          this.propertyName = propertyName;
        }
        if (this.isBoolean || this.isTwoway) {
          this.useProperty = true;
        }
        if (propertyName === "value") {
          node._ractive.value = this.value;
        }
      }
      this.rendered = true;
      this.update();
    }
    var Attribute_prototype_toString = Attribute$toString;
    function Attribute$toString() {
      var _ref = this;
      var name = _ref.name;
      var namespacePrefix = _ref.namespacePrefix;
      var value = _ref.value;
      var interpolator = _ref.interpolator;
      var fragment = _ref.fragment;
      if (name === "value" && (this.element.name === "select" || this.element.name === "textarea")) {
        return ;
      }
      if (name === "value" && this.element.getAttribute("contenteditable") !== undefined) {
        return ;
      }
      if (name === "name" && this.element.name === "input" && interpolator) {
        return "name={{" + (interpolator.keypath.str || interpolator.ref) + "}}";
      }
      if (this.isBoolean) {
        return value ? name : "";
      }
      if (fragment) {
        if (fragment.items.length === 1 && fragment.items[0].value == null) {
          return "";
        }
        value = fragment.toString();
      }
      if (namespacePrefix) {
        name = namespacePrefix + ":" + name;
      }
      return value ? name + "=\"" + Attribute_prototype_toString__escape(value) + "\"" : name;
    }
    function Attribute_prototype_toString__escape(value) {
      return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    var Attribute_prototype_unbind = Attribute$unbind;
    function Attribute$unbind() {
      if (this.fragment) {
        this.fragment.unbind();
      }
      if (this.name === "id") {
        delete this.root.nodes[this.value];
      }
    }
    var updateSelectValue = Attribute$updateSelect;
    function Attribute$updateSelect() {
      var value = this.value,
          options,
          option,
          optionValue,
          i;
      if (!this.locked) {
        this.node._ractive.value = value;
        options = this.node.options;
        i = options.length;
        while (i--) {
          option = options[i];
          optionValue = option._ractive ? option._ractive.value : option.value;
          if (optionValue == value) {
            option.selected = true;
            break;
          }
        }
      }
    }
    var updateMultipleSelectValue = Attribute$updateMultipleSelect;
    function Attribute$updateMultipleSelect() {
      var value = this.value,
          options,
          i,
          option,
          optionValue;
      if (!isArray(value)) {
        value = [value];
      }
      options = this.node.options;
      i = options.length;
      while (i--) {
        option = options[i];
        optionValue = option._ractive ? option._ractive.value : option.value;
        option.selected = arrayContains(value, optionValue);
      }
    }
    var updateRadioName = Attribute$updateRadioName;
    function Attribute$updateRadioName() {
      var _ref = this;
      var node = _ref.node;
      var value = _ref.value;
      node.checked = value == node._ractive.value;
    }
    var updateRadioValue = Attribute$updateRadioValue;
    function Attribute$updateRadioValue() {
      var wasChecked,
          node = this.node,
          binding,
          bindings,
          i;
      wasChecked = node.checked;
      node.value = this.element.getAttribute("value");
      node.checked = this.element.getAttribute("value") === this.element.getAttribute("name");
      if (wasChecked && !node.checked && this.element.binding) {
        bindings = this.element.binding.siblings;
        if (i = bindings.length) {
          while (i--) {
            binding = bindings[i];
            if (!binding.element.node) {
              return ;
            }
            if (binding.element.node.checked) {
              runloop.addRactive(binding.root);
              return binding.handleChange();
            }
          }
          this.root.viewmodel.set(binding.keypath, undefined);
        }
      }
    }
    var updateCheckboxName = Attribute$updateCheckboxName;
    function Attribute$updateCheckboxName() {
      var _ref = this;
      var element = _ref.element;
      var node = _ref.node;
      var value = _ref.value;
      var binding = element.binding;
      var valueAttribute;
      var i;
      valueAttribute = element.getAttribute("value");
      if (!isArray(value)) {
        binding.isChecked = node.checked = value == valueAttribute;
      } else {
        i = value.length;
        while (i--) {
          if (valueAttribute == value[i]) {
            binding.isChecked = node.checked = true;
            return ;
          }
        }
        binding.isChecked = node.checked = false;
      }
    }
    var updateClassName = Attribute$updateClassName;
    function Attribute$updateClassName() {
      this.node.className = safeToStringValue(this.value);
    }
    var updateIdAttribute = Attribute$updateIdAttribute;
    function Attribute$updateIdAttribute() {
      var _ref = this;
      var node = _ref.node;
      var value = _ref.value;
      this.root.nodes[value] = node;
      node.id = value;
    }
    var updateIEStyleAttribute = Attribute$updateIEStyleAttribute;
    function Attribute$updateIEStyleAttribute() {
      var node,
          value;
      node = this.node;
      value = this.value;
      if (value === undefined) {
        value = "";
      }
      node.style.setAttribute("cssText", value);
    }
    var updateContentEditableValue = Attribute$updateContentEditableValue;
    function Attribute$updateContentEditableValue() {
      var value = this.value;
      if (value === undefined) {
        value = "";
      }
      if (!this.locked) {
        this.node.innerHTML = value;
      }
    }
    var updateValue = Attribute$updateValue;
    function Attribute$updateValue() {
      var _ref = this;
      var node = _ref.node;
      var value = _ref.value;
      node._ractive.value = value;
      if (!this.locked) {
        node.value = value == undefined ? "" : value;
      }
    }
    var updateBoolean = Attribute$updateBooleanAttribute;
    function Attribute$updateBooleanAttribute() {
      if (!this.locked) {
        this.node[this.propertyName] = this.value;
      }
    }
    var updateEverythingElse = Attribute$updateEverythingElse;
    function Attribute$updateEverythingElse() {
      var _ref = this;
      var node = _ref.node;
      var namespace = _ref.namespace;
      var name = _ref.name;
      var value = _ref.value;
      var fragment = _ref.fragment;
      if (namespace) {
        node.setAttributeNS(namespace, name, (fragment || value).toString());
      } else if (!this.isBoolean) {
        if (value == null) {
          node.removeAttribute(name);
        } else {
          node.setAttribute(name, (fragment || value).toString());
        }
      } else {
        if (value) {
          node.setAttribute(name, "");
        } else {
          node.removeAttribute(name);
        }
      }
    }
    var Attribute_prototype_update = Attribute$update;
    function Attribute$update() {
      var _ref = this;
      var name = _ref.name;
      var element = _ref.element;
      var node = _ref.node;
      var type;
      var updateMethod;
      if (name === "id") {
        updateMethod = updateIdAttribute;
      } else if (name === "value") {
        if (element.name === "select" && name === "value") {
          updateMethod = element.getAttribute("multiple") ? updateMultipleSelectValue : updateSelectValue;
        } else if (element.name === "textarea") {
          updateMethod = updateValue;
        } else if (element.getAttribute("contenteditable") != null) {
          updateMethod = updateContentEditableValue;
        } else if (element.name === "input") {
          type = element.getAttribute("type");
          if (type === "file") {
            updateMethod = noop;
          } else if (type === "radio" && element.binding && element.binding.name === "name") {
            updateMethod = updateRadioValue;
          } else {
            updateMethod = updateValue;
          }
        }
      } else if (this.isTwoway && name === "name") {
        if (node.type === "radio") {
          updateMethod = updateRadioName;
        } else if (node.type === "checkbox") {
          updateMethod = updateCheckboxName;
        }
      } else if (name === "style" && node.style.setAttribute) {
        updateMethod = updateIEStyleAttribute;
      } else if (name === "class" && (!node.namespaceURI || node.namespaceURI === namespaces.html)) {
        updateMethod = updateClassName;
      } else if (this.useProperty) {
        updateMethod = updateBoolean;
      }
      if (!updateMethod) {
        updateMethod = updateEverythingElse;
      }
      this.update = updateMethod;
      this.update();
    }
    var Attribute = function(options) {
      this.init(options);
    };
    Attribute.prototype = {
      bubble: Attribute_prototype_bubble,
      init: prototype_init,
      rebind: Attribute_prototype_rebind,
      render: Attribute_prototype_render,
      toString: Attribute_prototype_toString,
      unbind: Attribute_prototype_unbind,
      update: Attribute_prototype_update
    };
    var createAttributes = function(element, attributes) {
      var name,
          attribute,
          result = [];
      for (name in attributes) {
        if (name === "twoway" || name === "lazy") {
          continue;
        }
        if (attributes.hasOwnProperty(name)) {
          attribute = new Attribute({
            element: element,
            name: name,
            value: attributes[name],
            root: element.root
          });
          result[name] = attribute;
          if (name !== "value") {
            result.push(attribute);
          }
        }
      }
      if (attribute = result.value) {
        result.push(attribute);
      }
      return result;
    };
    var ConditionalAttribute__div;
    if (typeof document !== "undefined") {
      ConditionalAttribute__div = createElement("div");
    }
    var ConditionalAttribute = function(element, template) {
      this.element = element;
      this.root = element.root;
      this.parentFragment = element.parentFragment;
      this.attributes = [];
      this.fragment = new Fragment({
        root: element.root,
        owner: this,
        template: [template]
      });
    };
    ConditionalAttribute.prototype = {
      bubble: function() {
        if (this.node) {
          this.update();
        }
        this.element.bubble();
      },
      rebind: function(oldKeypath, newKeypath) {
        this.fragment.rebind(oldKeypath, newKeypath);
      },
      render: function(node) {
        this.node = node;
        this.isSvg = node.namespaceURI === namespaces.svg;
        this.update();
      },
      unbind: function() {
        this.fragment.unbind();
      },
      update: function() {
        var _this = this;
        var str,
            attrs;
        str = this.fragment.toString();
        attrs = parseAttributes(str, this.isSvg);
        this.attributes.filter(function(a) {
          return notIn(attrs, a);
        }).forEach(function(a) {
          _this.node.removeAttribute(a.name);
        });
        attrs.forEach(function(a) {
          _this.node.setAttribute(a.name, a.value);
        });
        this.attributes = attrs;
      },
      toString: function() {
        return this.fragment.toString();
      }
    };
    function parseAttributes(str, isSvg) {
      var tag = isSvg ? "svg" : "div";
      ConditionalAttribute__div.innerHTML = "<" + tag + " " + str + "></" + tag + ">";
      return toArray(ConditionalAttribute__div.childNodes[0].attributes);
    }
    function notIn(haystack, needle) {
      var i = haystack.length;
      while (i--) {
        if (haystack[i].name === needle.name) {
          return false;
        }
      }
      return true;
    }
    var createConditionalAttributes = function(element, attributes) {
      if (!attributes) {
        return [];
      }
      return attributes.map(function(a) {
        return new ConditionalAttribute(element, a);
      });
    };
    var Binding = function(element) {
      var interpolator,
          keypath,
          value,
          parentForm;
      this.element = element;
      this.root = element.root;
      this.attribute = element.attributes[this.name || "value"];
      interpolator = this.attribute.interpolator;
      interpolator.twowayBinding = this;
      if (keypath = interpolator.keypath) {
        if (keypath.str.slice(-1) === "}") {
          warnOnceIfDebug("Two-way binding does not work with expressions (`%s` on <%s>)", interpolator.resolver.uniqueString, element.name, {ractive: this.root});
          return false;
        }
        if (keypath.isSpecial) {
          warnOnceIfDebug("Two-way binding does not work with %s", interpolator.resolver.ref, {ractive: this.root});
          return false;
        }
      } else {
        var ref = interpolator.template.r ? "'" + interpolator.template.r + "' reference" : "expression";
        warnIfDebug("The %s being used for two-way binding is ambiguous, and may cause unexpected results. Consider initialising your data to eliminate the ambiguity", ref, {ractive: this.root});
        interpolator.resolver.forceResolution();
        keypath = interpolator.keypath;
      }
      this.attribute.isTwoway = true;
      this.keypath = keypath;
      value = this.root.viewmodel.get(keypath);
      if (value === undefined && this.getInitialValue) {
        value = this.getInitialValue();
        if (value !== undefined) {
          this.root.viewmodel.set(keypath, value);
        }
      }
      if (parentForm = findParentForm(element)) {
        this.resetValue = value;
        parentForm.formBindings.push(this);
      }
    };
    Binding.prototype = {
      handleChange: function() {
        var _this = this;
        runloop.start(this.root);
        this.attribute.locked = true;
        this.root.viewmodel.set(this.keypath, this.getValue());
        runloop.scheduleTask(function() {
          return _this.attribute.locked = false;
        });
        runloop.end();
      },
      rebound: function() {
        var bindings,
            oldKeypath,
            newKeypath;
        oldKeypath = this.keypath;
        newKeypath = this.attribute.interpolator.keypath;
        if (oldKeypath === newKeypath) {
          return ;
        }
        removeFromArray(this.root._twowayBindings[oldKeypath.str], this);
        this.keypath = newKeypath;
        bindings = this.root._twowayBindings[newKeypath.str] || (this.root._twowayBindings[newKeypath.str] = []);
        bindings.push(this);
      },
      unbind: function() {}
    };
    Binding.extend = function(properties) {
      var Parent = this,
          SpecialisedBinding;
      SpecialisedBinding = function(element) {
        Binding.call(this, element);
        if (this.init) {
          this.init();
        }
      };
      SpecialisedBinding.prototype = create(Parent.prototype);
      object__extend(SpecialisedBinding.prototype, properties);
      SpecialisedBinding.extend = Binding.extend;
      return SpecialisedBinding;
    };
    var Binding__default = Binding;
    function findParentForm(element) {
      while (element = element.parent) {
        if (element.name === "form") {
          return element;
        }
      }
    }
    var handleDomEvent = handleChange;
    function handleChange() {
      this._ractive.binding.handleChange();
    }
    var ContentEditableBinding = Binding__default.extend({
      getInitialValue: function() {
        return this.element.fragment ? this.element.fragment.toString() : "";
      },
      render: function() {
        var node = this.element.node;
        node.addEventListener("change", handleDomEvent, false);
        if (!this.root.lazy) {
          node.addEventListener("input", handleDomEvent, false);
          if (node.attachEvent) {
            node.addEventListener("keyup", handleDomEvent, false);
          }
        }
      },
      unrender: function() {
        var node = this.element.node;
        node.removeEventListener("change", handleDomEvent, false);
        node.removeEventListener("input", handleDomEvent, false);
        node.removeEventListener("keyup", handleDomEvent, false);
      },
      getValue: function() {
        return this.element.node.innerHTML;
      }
    });
    var sets = {};
    function getSiblings(id, group, keypath) {
      var hash = id + group + keypath;
      return sets[hash] || (sets[hash] = []);
    }
    var RadioBinding = Binding__default.extend({
      name: "checked",
      init: function() {
        this.siblings = getSiblings(this.root._guid, "radio", this.element.getAttribute("name"));
        this.siblings.push(this);
      },
      render: function() {
        var node = this.element.node;
        node.addEventListener("change", handleDomEvent, false);
        if (node.attachEvent) {
          node.addEventListener("click", handleDomEvent, false);
        }
      },
      unrender: function() {
        var node = this.element.node;
        node.removeEventListener("change", handleDomEvent, false);
        node.removeEventListener("click", handleDomEvent, false);
      },
      handleChange: function() {
        runloop.start(this.root);
        this.siblings.forEach(function(binding) {
          binding.root.viewmodel.set(binding.keypath, binding.getValue());
        });
        runloop.end();
      },
      getValue: function() {
        return this.element.node.checked;
      },
      unbind: function() {
        removeFromArray(this.siblings, this);
      }
    });
    var RadioNameBinding = Binding__default.extend({
      name: "name",
      init: function() {
        this.siblings = getSiblings(this.root._guid, "radioname", this.keypath.str);
        this.siblings.push(this);
        this.radioName = true;
      },
      getInitialValue: function() {
        if (this.element.getAttribute("checked")) {
          return this.element.getAttribute("value");
        }
      },
      render: function() {
        var node = this.element.node;
        node.name = "{{" + this.keypath.str + "}}";
        node.checked = this.root.viewmodel.get(this.keypath) == this.element.getAttribute("value");
        node.addEventListener("change", handleDomEvent, false);
        if (node.attachEvent) {
          node.addEventListener("click", handleDomEvent, false);
        }
      },
      unrender: function() {
        var node = this.element.node;
        node.removeEventListener("change", handleDomEvent, false);
        node.removeEventListener("click", handleDomEvent, false);
      },
      getValue: function() {
        var node = this.element.node;
        return node._ractive ? node._ractive.value : node.value;
      },
      handleChange: function() {
        if (this.element.node.checked) {
          Binding__default.prototype.handleChange.call(this);
        }
      },
      rebound: function(oldKeypath, newKeypath) {
        var node;
        Binding__default.prototype.rebound.call(this, oldKeypath, newKeypath);
        if (node = this.element.node) {
          node.name = "{{" + this.keypath.str + "}}";
        }
      },
      unbind: function() {
        removeFromArray(this.siblings, this);
      }
    });
    var CheckboxNameBinding = Binding__default.extend({
      name: "name",
      getInitialValue: function() {
        this.noInitialValue = true;
        return [];
      },
      init: function() {
        var existingValue,
            bindingValue;
        this.checkboxName = true;
        this.siblings = getSiblings(this.root._guid, "checkboxes", this.keypath.str);
        this.siblings.push(this);
        if (this.noInitialValue) {
          this.siblings.noInitialValue = true;
        }
        if (this.siblings.noInitialValue && this.element.getAttribute("checked")) {
          existingValue = this.root.viewmodel.get(this.keypath);
          bindingValue = this.element.getAttribute("value");
          existingValue.push(bindingValue);
        }
      },
      unbind: function() {
        removeFromArray(this.siblings, this);
      },
      render: function() {
        var node = this.element.node,
            existingValue,
            bindingValue;
        existingValue = this.root.viewmodel.get(this.keypath);
        bindingValue = this.element.getAttribute("value");
        if (isArray(existingValue)) {
          this.isChecked = arrayContains(existingValue, bindingValue);
        } else {
          this.isChecked = existingValue == bindingValue;
        }
        node.name = "{{" + this.keypath.str + "}}";
        node.checked = this.isChecked;
        node.addEventListener("change", handleDomEvent, false);
        if (node.attachEvent) {
          node.addEventListener("click", handleDomEvent, false);
        }
      },
      unrender: function() {
        var node = this.element.node;
        node.removeEventListener("change", handleDomEvent, false);
        node.removeEventListener("click", handleDomEvent, false);
      },
      changed: function() {
        var wasChecked = !!this.isChecked;
        this.isChecked = this.element.node.checked;
        return this.isChecked === wasChecked;
      },
      handleChange: function() {
        this.isChecked = this.element.node.checked;
        Binding__default.prototype.handleChange.call(this);
      },
      getValue: function() {
        return this.siblings.filter(isChecked).map(CheckboxNameBinding__getValue);
      }
    });
    function isChecked(binding) {
      return binding.isChecked;
    }
    function CheckboxNameBinding__getValue(binding) {
      return binding.element.getAttribute("value");
    }
    var CheckboxBinding = Binding__default.extend({
      name: "checked",
      render: function() {
        var node = this.element.node;
        node.addEventListener("change", handleDomEvent, false);
        if (node.attachEvent) {
          node.addEventListener("click", handleDomEvent, false);
        }
      },
      unrender: function() {
        var node = this.element.node;
        node.removeEventListener("change", handleDomEvent, false);
        node.removeEventListener("click", handleDomEvent, false);
      },
      getValue: function() {
        return this.element.node.checked;
      }
    });
    var SelectBinding = Binding__default.extend({
      getInitialValue: function() {
        var options = this.element.options,
            len,
            i,
            value,
            optionWasSelected;
        if (this.element.getAttribute("value") !== undefined) {
          return ;
        }
        i = len = options.length;
        if (!len) {
          return ;
        }
        while (i--) {
          if (options[i].getAttribute("selected")) {
            value = options[i].getAttribute("value");
            optionWasSelected = true;
            break;
          }
        }
        if (!optionWasSelected) {
          while (++i < len) {
            if (!options[i].getAttribute("disabled")) {
              value = options[i].getAttribute("value");
              break;
            }
          }
        }
        if (value !== undefined) {
          this.element.attributes.value.value = value;
        }
        return value;
      },
      render: function() {
        this.element.node.addEventListener("change", handleDomEvent, false);
      },
      unrender: function() {
        this.element.node.removeEventListener("change", handleDomEvent, false);
      },
      setValue: function(value) {
        this.root.viewmodel.set(this.keypath, value);
      },
      getValue: function() {
        var options,
            i,
            len,
            option,
            optionValue;
        options = this.element.node.options;
        len = options.length;
        for (i = 0; i < len; i += 1) {
          option = options[i];
          if (options[i].selected) {
            optionValue = option._ractive ? option._ractive.value : option.value;
            return optionValue;
          }
        }
      },
      forceUpdate: function() {
        var _this = this;
        var value = this.getValue();
        if (value !== undefined) {
          this.attribute.locked = true;
          runloop.scheduleTask(function() {
            return _this.attribute.locked = false;
          });
          this.root.viewmodel.set(this.keypath, value);
        }
      }
    });
    var MultipleSelectBinding = SelectBinding.extend({
      getInitialValue: function() {
        return this.element.options.filter(function(option) {
          return option.getAttribute("selected");
        }).map(function(option) {
          return option.getAttribute("value");
        });
      },
      render: function() {
        var valueFromModel;
        this.element.node.addEventListener("change", handleDomEvent, false);
        valueFromModel = this.root.viewmodel.get(this.keypath);
        if (valueFromModel === undefined) {
          this.handleChange();
        }
      },
      unrender: function() {
        this.element.node.removeEventListener("change", handleDomEvent, false);
      },
      setValue: function() {
        throw new Error("TODO not implemented yet");
      },
      getValue: function() {
        var selectedValues,
            options,
            i,
            len,
            option,
            optionValue;
        selectedValues = [];
        options = this.element.node.options;
        len = options.length;
        for (i = 0; i < len; i += 1) {
          option = options[i];
          if (option.selected) {
            optionValue = option._ractive ? option._ractive.value : option.value;
            selectedValues.push(optionValue);
          }
        }
        return selectedValues;
      },
      handleChange: function() {
        var attribute,
            previousValue,
            value;
        attribute = this.attribute;
        previousValue = attribute.value;
        value = this.getValue();
        if (previousValue === undefined || !arrayContentsMatch(value, previousValue)) {
          SelectBinding.prototype.handleChange.call(this);
        }
        return this;
      },
      forceUpdate: function() {
        var _this = this;
        var value = this.getValue();
        if (value !== undefined) {
          this.attribute.locked = true;
          runloop.scheduleTask(function() {
            return _this.attribute.locked = false;
          });
          this.root.viewmodel.set(this.keypath, value);
        }
      },
      updateModel: function() {
        if (this.attribute.value === undefined || !this.attribute.value.length) {
          this.root.viewmodel.set(this.keypath, this.initialValue);
        }
      }
    });
    var FileListBinding = Binding__default.extend({
      render: function() {
        this.element.node.addEventListener("change", handleDomEvent, false);
      },
      unrender: function() {
        this.element.node.removeEventListener("change", handleDomEvent, false);
      },
      getValue: function() {
        return this.element.node.files;
      }
    });
    var GenericBinding;
    GenericBinding = Binding__default.extend({
      getInitialValue: function() {
        return "";
      },
      getValue: function() {
        return this.element.node.value;
      },
      render: function() {
        var node = this.element.node,
            lazy,
            timeout = false;
        this.rendered = true;
        lazy = this.root.lazy;
        if (this.element.lazy === true) {
          lazy = true;
        } else if (this.element.lazy === false) {
          lazy = false;
        } else if (is__isNumeric(this.element.lazy)) {
          lazy = false;
          timeout = +this.element.lazy;
        } else if (is__isNumeric(lazy || "")) {
          timeout = +lazy;
          lazy = false;
          this.element.lazy = timeout;
        }
        this.handler = timeout ? handleDelay : handleDomEvent;
        node.addEventListener("change", handleDomEvent, false);
        if (!lazy) {
          node.addEventListener("input", this.handler, false);
          if (node.attachEvent) {
            node.addEventListener("keyup", this.handler, false);
          }
        }
        node.addEventListener("blur", handleBlur, false);
      },
      unrender: function() {
        var node = this.element.node;
        this.rendered = false;
        node.removeEventListener("change", handleDomEvent, false);
        node.removeEventListener("input", this.handler, false);
        node.removeEventListener("keyup", this.handler, false);
        node.removeEventListener("blur", handleBlur, false);
      }
    });
    function handleBlur() {
      var value;
      handleDomEvent.call(this);
      value = this._ractive.root.viewmodel.get(this._ractive.binding.keypath);
      this.value = value == undefined ? "" : value;
    }
    function handleDelay() {
      var binding = this._ractive.binding,
          el = this;
      if (!!binding._timeout)
        clearTimeout(binding._timeout);
      binding._timeout = setTimeout(function() {
        if (binding.rendered)
          handleDomEvent.call(el);
        binding._timeout = undefined;
      }, binding.element.lazy);
    }
    var NumericBinding = GenericBinding.extend({
      getInitialValue: function() {
        return undefined;
      },
      getValue: function() {
        var value = parseFloat(this.element.node.value);
        return isNaN(value) ? undefined : value;
      }
    });
    function createTwowayBinding(element) {
      var attributes = element.attributes,
          type,
          Binding,
          bindName,
          bindChecked,
          binding;
      if (element.binding) {
        element.binding.teardown();
        element.binding = null;
      }
      if ((element.getAttribute("contenteditable") || !!attributes.contenteditable && isBindable(attributes.contenteditable)) && isBindable(attributes.value)) {
        Binding = ContentEditableBinding;
      } else if (element.name === "input") {
        type = element.getAttribute("type");
        if (type === "radio" || type === "checkbox") {
          bindName = isBindable(attributes.name);
          bindChecked = isBindable(attributes.checked);
          if (bindName && bindChecked) {
            warnIfDebug("A radio input can have two-way binding on its name attribute, or its checked attribute - not both", {ractive: element.root});
          }
          if (bindName) {
            Binding = type === "radio" ? RadioNameBinding : CheckboxNameBinding;
          } else if (bindChecked) {
            Binding = type === "radio" ? RadioBinding : CheckboxBinding;
          }
        } else if (type === "file" && isBindable(attributes.value)) {
          Binding = FileListBinding;
        } else if (isBindable(attributes.value)) {
          Binding = type === "number" || type === "range" ? NumericBinding : GenericBinding;
        }
      } else if (element.name === "select" && isBindable(attributes.value)) {
        Binding = element.getAttribute("multiple") ? MultipleSelectBinding : SelectBinding;
      } else if (element.name === "textarea" && isBindable(attributes.value)) {
        Binding = GenericBinding;
      }
      if (Binding && (binding = new Binding(element)) && binding.keypath) {
        return binding;
      }
    }
    function isBindable(attribute) {
      return attribute && attribute.isBindable;
    }
    var EventHandler_prototype_bubble = EventHandler$bubble;
    function EventHandler$bubble() {
      var hasAction = this.getAction();
      if (hasAction && !this.hasListener) {
        this.listen();
      } else if (!hasAction && this.hasListener) {
        this.unrender();
      }
    }
    var fire__default = EventHandler$fire;
    function EventHandler$fire(event) {
      fireEvent(this.root, this.getAction(), {event: event});
    }
    var getAction = EventHandler$getAction;
    function EventHandler$getAction() {
      return this.action.toString().trim();
    }
    var EventHandler_prototype_init = EventHandler$init;
    var eventPattern = /^event(?:\.(.+))?/;
    function EventHandler$init(element, name, template) {
      var _this = this;
      var action,
          refs,
          ractive;
      this.element = element;
      this.root = element.root;
      this.parentFragment = element.parentFragment;
      this.name = name;
      if (name.indexOf("*") !== -1) {
        fatal("Only component proxy-events may contain \"*\" wildcards, <%s on-%s=\"...\"/> is not valid", element.name, name);
        this.invalid = true;
      }
      if (template.m) {
        refs = template.a.r;
        this.method = template.m;
        this.keypaths = [];
        this.fn = getFunctionFromString(template.a.s, refs.length);
        this.parentFragment = element.parentFragment;
        ractive = this.root;
        this.refResolvers = [];
        refs.forEach(function(ref, i) {
          var match = undefined;
          if (match = eventPattern.exec(ref)) {
            _this.keypaths[i] = {
              eventObject: true,
              refinements: match[1] ? match[1].split(".") : []
            };
          } else {
            _this.refResolvers.push(createReferenceResolver(_this, ref, function(keypath) {
              return _this.resolve(i, keypath);
            }));
          }
        });
        this.fire = fireMethodCall;
      } else {
        action = template.n || template;
        if (typeof action !== "string") {
          action = new Fragment({
            template: action,
            root: this.root,
            owner: this
          });
        }
        this.action = action;
        if (template.d) {
          this.dynamicParams = new Fragment({
            template: template.d,
            root: this.root,
            owner: this.element
          });
          this.fire = fireEventWithDynamicParams;
        } else if (template.a) {
          this.params = template.a;
          this.fire = fireEventWithParams;
        }
      }
    }
    function fireMethodCall(event) {
      var ractive,
          values,
          args;
      ractive = this.root;
      if (typeof ractive[this.method] !== "function") {
        throw new Error("Attempted to call a non-existent method (\"" + this.method + "\")");
      }
      values = this.keypaths.map(function(keypath) {
        var value,
            len,
            i;
        if (keypath === undefined) {
          return undefined;
        }
        if (keypath.eventObject) {
          value = event;
          if (len = keypath.refinements.length) {
            for (i = 0; i < len; i += 1) {
              value = value[keypath.refinements[i]];
            }
          }
        } else {
          value = ractive.viewmodel.get(keypath);
        }
        return value;
      });
      eventStack.enqueue(ractive, event);
      args = this.fn.apply(null, values);
      ractive[this.method].apply(ractive, args);
      eventStack.dequeue(ractive);
    }
    function fireEventWithParams(event) {
      fireEvent(this.root, this.getAction(), {
        event: event,
        args: this.params
      });
    }
    function fireEventWithDynamicParams(event) {
      var args = this.dynamicParams.getArgsList();
      if (typeof args === "string") {
        args = args.substr(1, args.length - 2);
      }
      fireEvent(this.root, this.getAction(), {
        event: event,
        args: args
      });
    }
    function genericHandler(event) {
      var storage,
          handler,
          indices,
          index = {};
      storage = this._ractive;
      handler = storage.events[event.type];
      if (indices = findIndexRefs(handler.element.parentFragment)) {
        index = findIndexRefs.resolve(indices);
      }
      handler.fire({
        node: this,
        original: event,
        index: index,
        keypath: storage.keypath.str,
        context: storage.root.viewmodel.get(storage.keypath)
      });
    }
    var listen = EventHandler$listen;
    var customHandlers = {},
        touchEvents = {
          touchstart: true,
          touchmove: true,
          touchend: true,
          touchcancel: true,
          touchleave: true
        };
    function EventHandler$listen() {
      var definition,
          name = this.name;
      if (this.invalid) {
        return ;
      }
      if (definition = findInViewHierarchy("events", this.root, name)) {
        this.custom = definition(this.node, getCustomHandler(name));
      } else {
        if (!("on" + name in this.node) && !(window && "on" + name in window) && !isJsdom) {
          if (!touchEvents[name]) {
            warnOnceIfDebug(missingPlugin(name, "event"), {node: this.node});
          }
          return ;
        }
        this.node.addEventListener(name, genericHandler, false);
      }
      this.hasListener = true;
    }
    function getCustomHandler(name) {
      if (!customHandlers[name]) {
        customHandlers[name] = function(event) {
          var storage = event.node._ractive;
          event.index = storage.index;
          event.keypath = storage.keypath.str;
          event.context = storage.root.viewmodel.get(storage.keypath);
          storage.events[name].fire(event);
        };
      }
      return customHandlers[name];
    }
    var EventHandler_prototype_rebind = EventHandler$rebind;
    function EventHandler$rebind(oldKeypath, newKeypath) {
      var fragment;
      if (this.method) {
        fragment = this.element.parentFragment;
        this.refResolvers.forEach(rebind);
        return ;
      }
      if (typeof this.action !== "string") {
        rebind(this.action);
      }
      if (this.dynamicParams) {
        rebind(this.dynamicParams);
      }
      function rebind(thing) {
        thing && thing.rebind(oldKeypath, newKeypath);
      }
    }
    var EventHandler_prototype_render = EventHandler$render;
    function EventHandler$render() {
      this.node = this.element.node;
      this.node._ractive.events[this.name] = this;
      if (this.method || this.getAction()) {
        this.listen();
      }
    }
    var prototype_resolve = EventHandler$resolve;
    function EventHandler$resolve(index, keypath) {
      this.keypaths[index] = keypath;
    }
    var EventHandler_prototype_unbind = EventHandler$unbind;
    function EventHandler$unbind() {
      if (this.method) {
        this.refResolvers.forEach(methodCallers__unbind);
        return ;
      }
      if (typeof this.action !== "string") {
        this.action.unbind();
      }
      if (this.dynamicParams) {
        this.dynamicParams.unbind();
      }
    }
    var EventHandler_prototype_unrender = EventHandler$unrender;
    function EventHandler$unrender() {
      if (this.custom) {
        this.custom.teardown();
      } else {
        this.node.removeEventListener(this.name, genericHandler, false);
      }
      this.hasListener = false;
    }
    var EventHandler = function(element, name, template) {
      this.init(element, name, template);
    };
    EventHandler.prototype = {
      bubble: EventHandler_prototype_bubble,
      fire: fire__default,
      getAction: getAction,
      init: EventHandler_prototype_init,
      listen: listen,
      rebind: EventHandler_prototype_rebind,
      render: EventHandler_prototype_render,
      resolve: prototype_resolve,
      unbind: EventHandler_prototype_unbind,
      unrender: EventHandler_prototype_unrender
    };
    var createEventHandlers = function(element, template) {
      var i,
          name,
          names,
          handler,
          result = [];
      for (name in template) {
        if (template.hasOwnProperty(name)) {
          names = name.split("-");
          i = names.length;
          while (i--) {
            handler = new EventHandler(element, names[i], template[name]);
            result.push(handler);
          }
        }
      }
      return result;
    };
    var Decorator = function(element, template) {
      var self = this,
          ractive,
          name,
          fragment;
      this.element = element;
      this.root = ractive = element.root;
      name = template.n || template;
      if (typeof name !== "string") {
        fragment = new Fragment({
          template: name,
          root: ractive,
          owner: element
        });
        name = fragment.toString();
        fragment.unbind();
        if (name === "") {
          return ;
        }
      }
      if (template.a) {
        this.params = template.a;
      } else if (template.d) {
        this.fragment = new Fragment({
          template: template.d,
          root: ractive,
          owner: element
        });
        this.params = this.fragment.getArgsList();
        this.fragment.bubble = function() {
          this.dirtyArgs = this.dirtyValue = true;
          self.params = this.getArgsList();
          if (self.ready) {
            self.update();
          }
        };
      }
      this.fn = findInViewHierarchy("decorators", ractive, name);
      if (!this.fn) {
        fatal(missingPlugin(name, "decorator"));
      }
    };
    Decorator.prototype = {
      init: function() {
        var node,
            result,
            args;
        node = this.element.node;
        if (this.params) {
          args = [node].concat(this.params);
          result = this.fn.apply(this.root, args);
        } else {
          result = this.fn.call(this.root, node);
        }
        if (!result || !result.teardown) {
          throw new Error("Decorator definition must return an object with a teardown method");
        }
        this.actual = result;
        this.ready = true;
      },
      update: function() {
        if (this.actual.update) {
          this.actual.update.apply(this.root, this.params);
        } else {
          this.actual.teardown(true);
          this.init();
        }
      },
      rebind: function(oldKeypath, newKeypath) {
        if (this.fragment) {
          this.fragment.rebind(oldKeypath, newKeypath);
        }
      },
      teardown: function(updating) {
        this.torndown = true;
        if (this.ready) {
          this.actual.teardown();
        }
        if (!updating && this.fragment) {
          this.fragment.unbind();
        }
      }
    };
    function select__bubble() {
      var _this = this;
      if (!this.dirty) {
        this.dirty = true;
        runloop.scheduleTask(function() {
          sync(_this);
          _this.dirty = false;
        });
      }
      this.parentFragment.bubble();
    }
    function sync(selectElement) {
      var selectNode,
          selectValue,
          isMultiple,
          options,
          optionWasSelected;
      selectNode = selectElement.node;
      if (!selectNode) {
        return ;
      }
      options = toArray(selectNode.options);
      selectValue = selectElement.getAttribute("value");
      isMultiple = selectElement.getAttribute("multiple");
      if (selectValue !== undefined) {
        options.forEach(function(o) {
          var optionValue,
              shouldSelect;
          optionValue = o._ractive ? o._ractive.value : o.value;
          shouldSelect = isMultiple ? valueContains(selectValue, optionValue) : selectValue == optionValue;
          if (shouldSelect) {
            optionWasSelected = true;
          }
          o.selected = shouldSelect;
        });
        if (!optionWasSelected) {
          if (options[0]) {
            options[0].selected = true;
          }
          if (selectElement.binding) {
            selectElement.binding.forceUpdate();
          }
        }
      } else if (selectElement.binding) {
        selectElement.binding.forceUpdate();
      }
    }
    function valueContains(selectValue, optionValue) {
      var i = selectValue.length;
      while (i--) {
        if (selectValue[i] == optionValue) {
          return true;
        }
      }
    }
    function option__init(option, template) {
      option.select = findParentSelect(option.parent);
      if (!option.select) {
        return ;
      }
      option.select.options.push(option);
      if (!template.a) {
        template.a = {};
      }
      if (template.a.value === undefined && !template.a.hasOwnProperty("disabled")) {
        template.a.value = template.f;
      }
      if ("selected" in template.a && option.select.getAttribute("value") !== undefined) {
        delete template.a.selected;
      }
    }
    function option__unbind(option) {
      if (option.select) {
        removeFromArray(option.select.options, option);
      }
    }
    function findParentSelect(element) {
      if (!element) {
        return ;
      }
      do {
        if (element.name === "select") {
          return element;
        }
      } while (element = element.parent);
    }
    var Element_prototype_init = Element$init;
    function Element$init(options) {
      var parentFragment,
          template,
          ractive,
          binding,
          bindings,
          twoway,
          bindingAttrs;
      this.type = ELEMENT;
      parentFragment = this.parentFragment = options.parentFragment;
      template = this.template = options.template;
      this.parent = options.pElement || parentFragment.pElement;
      this.root = ractive = parentFragment.root;
      this.index = options.index;
      this.key = options.key;
      this.name = enforceCase(template.e);
      if (this.name === "option") {
        option__init(this, template);
      }
      if (this.name === "select") {
        this.options = [];
        this.bubble = select__bubble;
      }
      if (this.name === "form") {
        this.formBindings = [];
      }
      bindingAttrs = processBindingAttributes(this, template);
      this.attributes = createAttributes(this, template.a);
      this.conditionalAttributes = createConditionalAttributes(this, template.m);
      if (template.f) {
        this.fragment = new Fragment({
          template: template.f,
          root: ractive,
          owner: this,
          pElement: this,
          cssIds: null
        });
      }
      twoway = ractive.twoway;
      if (bindingAttrs.twoway === false)
        twoway = false;
      else if (bindingAttrs.twoway === true)
        twoway = true;
      this.twoway = twoway;
      this.lazy = bindingAttrs.lazy;
      if (twoway && (binding = createTwowayBinding(this, template.a))) {
        this.binding = binding;
        bindings = this.root._twowayBindings[binding.keypath.str] || (this.root._twowayBindings[binding.keypath.str] = []);
        bindings.push(binding);
      }
      if (template.v) {
        this.eventHandlers = createEventHandlers(this, template.v);
      }
      if (template.o) {
        this.decorator = new Decorator(this, template.o);
      }
      this.intro = template.t0 || template.t1;
      this.outro = template.t0 || template.t2;
    }
    var Element_prototype_rebind = Element$rebind;
    function Element$rebind(oldKeypath, newKeypath) {
      var i,
          storage,
          liveQueries,
          ractive;
      if (this.attributes) {
        this.attributes.forEach(rebind);
      }
      if (this.conditionalAttributes) {
        this.conditionalAttributes.forEach(rebind);
      }
      if (this.eventHandlers) {
        this.eventHandlers.forEach(rebind);
      }
      if (this.decorator) {
        rebind(this.decorator);
      }
      if (this.fragment) {
        rebind(this.fragment);
      }
      if (liveQueries = this.liveQueries) {
        ractive = this.root;
        i = liveQueries.length;
        while (i--) {
          liveQueries[i]._makeDirty();
        }
      }
      if (this.node && (storage = this.node._ractive)) {
        assignNewKeypath(storage, "keypath", oldKeypath, newKeypath);
      }
      function rebind(thing) {
        thing.rebind(oldKeypath, newKeypath);
      }
    }
    function img__render(img) {
      var loadHandler;
      if (img.attributes.width || img.attributes.height) {
        img.node.addEventListener("load", loadHandler = function() {
          var width = img.getAttribute("width"),
              height = img.getAttribute("height");
          if (width !== undefined) {
            img.node.setAttribute("width", width);
          }
          if (height !== undefined) {
            img.node.setAttribute("height", height);
          }
          img.node.removeEventListener("load", loadHandler, false);
        }, false);
      }
    }
    function form__render(element) {
      element.node.addEventListener("reset", handleReset, false);
    }
    function form__unrender(element) {
      element.node.removeEventListener("reset", handleReset, false);
    }
    function handleReset() {
      var element = this._ractive.proxy;
      runloop.start();
      element.formBindings.forEach(updateModel);
      runloop.end();
    }
    function updateModel(binding) {
      binding.root.viewmodel.set(binding.keypath, binding.resetValue);
    }
    var Transition_prototype_init = Transition$init;
    function Transition$init(element, template, isIntro) {
      var ractive,
          name,
          fragment;
      this.element = element;
      this.root = ractive = element.root;
      this.isIntro = isIntro;
      name = template.n || template;
      if (typeof name !== "string") {
        fragment = new Fragment({
          template: name,
          root: ractive,
          owner: element
        });
        name = fragment.toString();
        fragment.unbind();
        if (name === "") {
          return ;
        }
      }
      this.name = name;
      if (template.a) {
        this.params = template.a;
      } else if (template.d) {
        fragment = new Fragment({
          template: template.d,
          root: ractive,
          owner: element
        });
        this.params = fragment.getArgsList();
        fragment.unbind();
      }
      this._fn = findInViewHierarchy("transitions", ractive, name);
      if (!this._fn) {
        warnOnceIfDebug(missingPlugin(name, "transition"), {ractive: this.root});
      }
    }
    var camelCase = function(hyphenatedStr) {
      return hyphenatedStr.replace(/-([a-zA-Z])/g, function(match, $1) {
        return $1.toUpperCase();
      });
    };
    var prefix__prefix,
        prefixCache,
        prefix__testStyle;
    if (!isClient) {
      prefix__prefix = null;
    } else {
      prefixCache = {};
      prefix__testStyle = createElement("div").style;
      prefix__prefix = function(prop) {
        var i,
            vendor,
            capped;
        prop = camelCase(prop);
        if (!prefixCache[prop]) {
          if (prefix__testStyle[prop] !== undefined) {
            prefixCache[prop] = prop;
          } else {
            capped = prop.charAt(0).toUpperCase() + prop.substring(1);
            i = vendors.length;
            while (i--) {
              vendor = vendors[i];
              if (prefix__testStyle[vendor + capped] !== undefined) {
                prefixCache[prop] = vendor + capped;
                break;
              }
            }
          }
        }
        return prefixCache[prop];
      };
    }
    var prefix__default = prefix__prefix;
    var getStyle,
        getStyle__getComputedStyle;
    if (!isClient) {
      getStyle = null;
    } else {
      getStyle__getComputedStyle = window.getComputedStyle || legacy.getComputedStyle;
      getStyle = function(props) {
        var computedStyle,
            styles,
            i,
            prop,
            value;
        computedStyle = getStyle__getComputedStyle(this.node);
        if (typeof props === "string") {
          value = computedStyle[prefix__default(props)];
          if (value === "0px") {
            value = 0;
          }
          return value;
        }
        if (!isArray(props)) {
          throw new Error("Transition$getStyle must be passed a string, or an array of strings representing CSS properties");
        }
        styles = {};
        i = props.length;
        while (i--) {
          prop = props[i];
          value = computedStyle[prefix__default(prop)];
          if (value === "0px") {
            value = 0;
          }
          styles[prop] = value;
        }
        return styles;
      };
    }
    var setStyle = function(style, value) {
      var prop;
      if (typeof style === "string") {
        this.node.style[prefix__default(style)] = value;
      } else {
        for (prop in style) {
          if (style.hasOwnProperty(prop)) {
            this.node.style[prefix__default(prop)] = style[prop];
          }
        }
      }
      return this;
    };
    var Ticker = function(options) {
      var easing;
      this.duration = options.duration;
      this.step = options.step;
      this.complete = options.complete;
      if (typeof options.easing === "string") {
        easing = options.root.easing[options.easing];
        if (!easing) {
          warnOnceIfDebug(missingPlugin(options.easing, "easing"));
          easing = linear;
        }
      } else if (typeof options.easing === "function") {
        easing = options.easing;
      } else {
        easing = linear;
      }
      this.easing = easing;
      this.start = getTime();
      this.end = this.start + this.duration;
      this.running = true;
      animations__default.add(this);
    };
    Ticker.prototype = {
      tick: function(now) {
        var elapsed,
            eased;
        if (!this.running) {
          return false;
        }
        if (now > this.end) {
          if (this.step) {
            this.step(1);
          }
          if (this.complete) {
            this.complete(1);
          }
          return false;
        }
        elapsed = now - this.start;
        eased = this.easing(elapsed / this.duration);
        if (this.step) {
          this.step(eased);
        }
        return true;
      },
      stop: function() {
        if (this.abort) {
          this.abort();
        }
        this.running = false;
      }
    };
    function linear(t) {
      return t;
    }
    var unprefixPattern = new RegExp("^-(?:" + vendors.join("|") + ")-");
    var unprefix = function(prop) {
      return prop.replace(unprefixPattern, "");
    };
    var vendorPattern = new RegExp("^(?:" + vendors.join("|") + ")([A-Z])");
    var hyphenate = function(str) {
      var hyphenated;
      if (!str) {
        return "";
      }
      if (vendorPattern.test(str)) {
        str = "-" + str;
      }
      hyphenated = str.replace(/[A-Z]/g, function(match) {
        return "-" + match.toLowerCase();
      });
      return hyphenated;
    };
    var createTransitions,
        createTransitions__testStyle,
        TRANSITION,
        TRANSITIONEND,
        CSS_TRANSITIONS_ENABLED,
        TRANSITION_DURATION,
        TRANSITION_PROPERTY,
        TRANSITION_TIMING_FUNCTION,
        canUseCssTransitions = {},
        cannotUseCssTransitions = {};
    if (!isClient) {
      createTransitions = null;
    } else {
      createTransitions__testStyle = createElement("div").style;
      (function() {
        if (createTransitions__testStyle.transition !== undefined) {
          TRANSITION = "transition";
          TRANSITIONEND = "transitionend";
          CSS_TRANSITIONS_ENABLED = true;
        } else if (createTransitions__testStyle.webkitTransition !== undefined) {
          TRANSITION = "webkitTransition";
          TRANSITIONEND = "webkitTransitionEnd";
          CSS_TRANSITIONS_ENABLED = true;
        } else {
          CSS_TRANSITIONS_ENABLED = false;
        }
      })();
      if (TRANSITION) {
        TRANSITION_DURATION = TRANSITION + "Duration";
        TRANSITION_PROPERTY = TRANSITION + "Property";
        TRANSITION_TIMING_FUNCTION = TRANSITION + "TimingFunction";
      }
      createTransitions = function(t, to, options, changedProperties, resolve) {
        setTimeout(function() {
          var hashPrefix,
              jsTransitionsComplete,
              cssTransitionsComplete,
              checkComplete,
              transitionEndHandler;
          checkComplete = function() {
            if (jsTransitionsComplete && cssTransitionsComplete) {
              t.root.fire(t.name + ":end", t.node, t.isIntro);
              resolve();
            }
          };
          hashPrefix = (t.node.namespaceURI || "") + t.node.tagName;
          t.node.style[TRANSITION_PROPERTY] = changedProperties.map(prefix__default).map(hyphenate).join(",");
          t.node.style[TRANSITION_TIMING_FUNCTION] = hyphenate(options.easing || "linear");
          t.node.style[TRANSITION_DURATION] = options.duration / 1000 + "s";
          transitionEndHandler = function(event) {
            var index;
            index = changedProperties.indexOf(camelCase(unprefix(event.propertyName)));
            if (index !== -1) {
              changedProperties.splice(index, 1);
            }
            if (changedProperties.length) {
              return ;
            }
            t.node.removeEventListener(TRANSITIONEND, transitionEndHandler, false);
            cssTransitionsComplete = true;
            checkComplete();
          };
          t.node.addEventListener(TRANSITIONEND, transitionEndHandler, false);
          setTimeout(function() {
            var i = changedProperties.length,
                hash,
                originalValue,
                index,
                propertiesToTransitionInJs = [],
                prop,
                suffix;
            while (i--) {
              prop = changedProperties[i];
              hash = hashPrefix + prop;
              if (CSS_TRANSITIONS_ENABLED && !cannotUseCssTransitions[hash]) {
                t.node.style[prefix__default(prop)] = to[prop];
                if (!canUseCssTransitions[hash]) {
                  originalValue = t.getStyle(prop);
                  canUseCssTransitions[hash] = t.getStyle(prop) != to[prop];
                  cannotUseCssTransitions[hash] = !canUseCssTransitions[hash];
                  if (cannotUseCssTransitions[hash]) {
                    t.node.style[prefix__default(prop)] = originalValue;
                  }
                }
              }
              if (!CSS_TRANSITIONS_ENABLED || cannotUseCssTransitions[hash]) {
                if (originalValue === undefined) {
                  originalValue = t.getStyle(prop);
                }
                index = changedProperties.indexOf(prop);
                if (index === -1) {
                  warnIfDebug("Something very strange happened with transitions. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!", {node: t.node});
                } else {
                  changedProperties.splice(index, 1);
                }
                suffix = /[^\d]*$/.exec(to[prop])[0];
                propertiesToTransitionInJs.push({
                  name: prefix__default(prop),
                  interpolator: interpolate(parseFloat(originalValue), parseFloat(to[prop])),
                  suffix: suffix
                });
              }
            }
            if (propertiesToTransitionInJs.length) {
              new Ticker({
                root: t.root,
                duration: options.duration,
                easing: camelCase(options.easing || ""),
                step: function(pos) {
                  var prop,
                      i;
                  i = propertiesToTransitionInJs.length;
                  while (i--) {
                    prop = propertiesToTransitionInJs[i];
                    t.node.style[prop.name] = prop.interpolator(pos) + prop.suffix;
                  }
                },
                complete: function() {
                  jsTransitionsComplete = true;
                  checkComplete();
                }
              });
            } else {
              jsTransitionsComplete = true;
            }
            if (!changedProperties.length) {
              t.node.removeEventListener(TRANSITIONEND, transitionEndHandler, false);
              cssTransitionsComplete = true;
              checkComplete();
            }
          }, 0);
        }, options.delay || 0);
      };
    }
    var hidden,
        vendor,
        visibility__prefix,
        visibility__i,
        visibility;
    if (typeof document !== "undefined") {
      hidden = "hidden";
      visibility = {};
      if (hidden in document) {
        visibility__prefix = "";
      } else {
        visibility__i = vendors.length;
        while (visibility__i--) {
          vendor = vendors[visibility__i];
          hidden = vendor + "Hidden";
          if (hidden in document) {
            visibility__prefix = vendor;
          }
        }
      }
      if (visibility__prefix !== undefined) {
        document.addEventListener(visibility__prefix + "visibilitychange", onChange);
        onChange();
      } else {
        if ("onfocusout" in document) {
          document.addEventListener("focusout", onHide);
          document.addEventListener("focusin", onShow);
        } else {
          window.addEventListener("pagehide", onHide);
          window.addEventListener("blur", onHide);
          window.addEventListener("pageshow", onShow);
          window.addEventListener("focus", onShow);
        }
        visibility.hidden = false;
      }
    }
    function onChange() {
      visibility.hidden = document[hidden];
    }
    function onHide() {
      visibility.hidden = true;
    }
    function onShow() {
      visibility.hidden = false;
    }
    var animateStyle,
        animateStyle__getComputedStyle,
        resolved;
    if (!isClient) {
      animateStyle = null;
    } else {
      animateStyle__getComputedStyle = window.getComputedStyle || legacy.getComputedStyle;
      animateStyle = function(style, value, options) {
        var _this = this;
        var to;
        if (arguments.length === 4) {
          throw new Error("t.animateStyle() returns a promise - use .then() instead of passing a callback");
        }
        if (visibility.hidden) {
          this.setStyle(style, value);
          return resolved || (resolved = utils_Promise.resolve());
        }
        if (typeof style === "string") {
          to = {};
          to[style] = value;
        } else {
          to = style;
          options = value;
        }
        if (!options) {
          warnOnceIfDebug("The \"%s\" transition does not supply an options object to `t.animateStyle()`. This will break in a future version of Ractive. For more info see https://github.com/RactiveJS/Ractive/issues/340", this.name);
          options = this;
        }
        var promise = new utils_Promise(function(resolve) {
          var propertyNames,
              changedProperties,
              computedStyle,
              current,
              from,
              i,
              prop;
          if (!options.duration) {
            _this.setStyle(to);
            resolve();
            return ;
          }
          propertyNames = Object.keys(to);
          changedProperties = [];
          computedStyle = animateStyle__getComputedStyle(_this.node);
          from = {};
          i = propertyNames.length;
          while (i--) {
            prop = propertyNames[i];
            current = computedStyle[prefix__default(prop)];
            if (current === "0px") {
              current = 0;
            }
            if (current != to[prop]) {
              changedProperties.push(prop);
              _this.node.style[prefix__default(prop)] = current;
            }
          }
          if (!changedProperties.length) {
            resolve();
            return ;
          }
          createTransitions(_this, to, options, changedProperties, resolve);
        });
        return promise;
      };
    }
    var processParams = function(params, defaults) {
      if (typeof params === "number") {
        params = {duration: params};
      } else if (typeof params === "string") {
        if (params === "slow") {
          params = {duration: 600};
        } else if (params === "fast") {
          params = {duration: 200};
        } else {
          params = {duration: 400};
        }
      } else if (!params) {
        params = {};
      }
      return fillGaps({}, params, defaults);
    };
    var start__default = Transition$start;
    function Transition$start() {
      var _this = this;
      var node,
          originalStyle,
          completed;
      node = this.node = this.element.node;
      originalStyle = node.getAttribute("style");
      this.complete = function(noReset) {
        if (completed) {
          return ;
        }
        if (!noReset && _this.isIntro) {
          resetStyle(node, originalStyle);
        }
        node._ractive.transition = null;
        _this._manager.remove(_this);
        completed = true;
      };
      if (!this._fn) {
        this.complete();
        return ;
      }
      this._fn.apply(this.root, [this].concat(this.params));
    }
    function resetStyle(node, style) {
      if (style) {
        node.setAttribute("style", style);
      } else {
        node.getAttribute("style");
        node.removeAttribute("style");
      }
    }
    var Transition = function(owner, template, isIntro) {
      this.init(owner, template, isIntro);
    };
    Transition.prototype = {
      init: Transition_prototype_init,
      start: start__default,
      getStyle: getStyle,
      setStyle: setStyle,
      animateStyle: animateStyle,
      processParams: processParams
    };
    var Element_prototype_render = Element$render;
    var updateCss,
        updateScript;
    updateCss = function() {
      var node = this.node,
          content = this.fragment.toString(false);
      if (window && window.appearsToBeIELessEqual8) {
        node.type = "text/css";
      }
      if (node.styleSheet) {
        node.styleSheet.cssText = content;
      } else {
        while (node.hasChildNodes()) {
          node.removeChild(node.firstChild);
        }
        node.appendChild(document.createTextNode(content));
      }
    };
    updateScript = function() {
      if (!this.node.type || this.node.type === "text/javascript") {
        warnIfDebug("Script tag was updated. This does not cause the code to be re-evaluated!", {ractive: this.root});
      }
      this.node.text = this.fragment.toString(false);
    };
    function Element$render() {
      var _this = this;
      var root = this.root,
          namespace,
          node,
          transition;
      namespace = getNamespace(this);
      node = this.node = createElement(this.name, namespace);
      if (this.parentFragment.cssIds) {
        this.node.setAttribute("data-ractive-css", this.parentFragment.cssIds.map(function(x) {
          return "{" + x + "}";
        }).join(" "));
      }
      defineProperty(this.node, "_ractive", {value: {
          proxy: this,
          keypath: getInnerContext(this.parentFragment),
          events: create(null),
          root: root
        }});
      this.attributes.forEach(function(a) {
        return a.render(node);
      });
      this.conditionalAttributes.forEach(function(a) {
        return a.render(node);
      });
      if (this.fragment) {
        if (this.name === "script") {
          this.bubble = updateScript;
          this.node.text = this.fragment.toString(false);
          this.fragment.unrender = noop;
        } else if (this.name === "style") {
          this.bubble = updateCss;
          this.bubble();
          this.fragment.unrender = noop;
        } else if (this.binding && this.getAttribute("contenteditable")) {
          this.fragment.unrender = noop;
        } else {
          this.node.appendChild(this.fragment.render());
        }
      }
      if (this.binding) {
        this.binding.render();
        this.node._ractive.binding = this.binding;
      }
      if (this.eventHandlers) {
        this.eventHandlers.forEach(function(h) {
          return h.render();
        });
      }
      if (this.name === "option") {
        processOption(this);
      }
      if (this.name === "img") {
        img__render(this);
      } else if (this.name === "form") {
        form__render(this);
      } else if (this.name === "input" || this.name === "textarea") {
        this.node.defaultValue = this.node.value;
      } else if (this.name === "option") {
        this.node.defaultSelected = this.node.selected;
      }
      if (this.decorator && this.decorator.fn) {
        runloop.scheduleTask(function() {
          if (!_this.decorator.torndown) {
            _this.decorator.init();
          }
        }, true);
      }
      if (root.transitionsEnabled && this.intro) {
        transition = new Transition(this, this.intro, true);
        runloop.registerTransition(transition);
        runloop.scheduleTask(function() {
          return transition.start();
        }, true);
        this.transition = transition;
      }
      if (this.node.autofocus) {
        runloop.scheduleTask(function() {
          return _this.node.focus();
        }, true);
      }
      updateLiveQueries(this);
      return this.node;
    }
    function getNamespace(element) {
      var namespace,
          xmlns,
          parent;
      if (xmlns = element.getAttribute("xmlns")) {
        namespace = xmlns;
      } else if (element.name === "svg") {
        namespace = namespaces.svg;
      } else if (parent = element.parent) {
        if (parent.name === "foreignObject") {
          namespace = namespaces.html;
        } else {
          namespace = parent.node.namespaceURI;
        }
      } else {
        namespace = element.root.el.namespaceURI;
      }
      return namespace;
    }
    function processOption(option) {
      var optionValue,
          selectValue,
          i;
      if (!option.select) {
        return ;
      }
      selectValue = option.select.getAttribute("value");
      if (selectValue === undefined) {
        return ;
      }
      optionValue = option.getAttribute("value");
      if (option.select.node.multiple && isArray(selectValue)) {
        i = selectValue.length;
        while (i--) {
          if (optionValue == selectValue[i]) {
            option.node.selected = true;
            break;
          }
        }
      } else {
        option.node.selected = optionValue == selectValue;
      }
    }
    function updateLiveQueries(element) {
      var instance,
          liveQueries,
          i,
          selector,
          query;
      instance = element.root;
      do {
        liveQueries = instance._liveQueries;
        i = liveQueries.length;
        while (i--) {
          selector = liveQueries[i];
          query = liveQueries["_" + selector];
          if (query._test(element)) {
            (element.liveQueries || (element.liveQueries = [])).push(query);
          }
        }
      } while (instance = instance.parent);
    }
    var Element_prototype_toString = function() {
      var str,
          escape;
      if (this.template.y) {
        return "<!DOCTYPE" + this.template.dd + ">";
      }
      str = "<" + this.template.e;
      str += this.attributes.map(stringifyAttribute).join("") + this.conditionalAttributes.map(stringifyAttribute).join("");
      if (this.name === "option" && optionIsSelected(this)) {
        str += " selected";
      }
      if (this.name === "input" && inputIsCheckedRadio(this)) {
        str += " checked";
      }
      str += ">";
      if (this.name === "textarea" && this.getAttribute("value") !== undefined) {
        str += escapeHtml(this.getAttribute("value"));
      } else if (this.getAttribute("contenteditable") !== undefined) {
        str += this.getAttribute("value") || "";
      }
      if (this.fragment) {
        escape = this.name !== "script" && this.name !== "style";
        str += this.fragment.toString(escape);
      }
      if (!voidElementNames.test(this.template.e)) {
        str += "</" + this.template.e + ">";
      }
      return str;
    };
    function optionIsSelected(element) {
      var optionValue,
          selectValue,
          i;
      optionValue = element.getAttribute("value");
      if (optionValue === undefined || !element.select) {
        return false;
      }
      selectValue = element.select.getAttribute("value");
      if (selectValue == optionValue) {
        return true;
      }
      if (element.select.getAttribute("multiple") && isArray(selectValue)) {
        i = selectValue.length;
        while (i--) {
          if (selectValue[i] == optionValue) {
            return true;
          }
        }
      }
    }
    function inputIsCheckedRadio(element) {
      var attributes,
          typeAttribute,
          valueAttribute,
          nameAttribute;
      attributes = element.attributes;
      typeAttribute = attributes.type;
      valueAttribute = attributes.value;
      nameAttribute = attributes.name;
      if (!typeAttribute || typeAttribute.value !== "radio" || !valueAttribute || !nameAttribute.interpolator) {
        return ;
      }
      if (valueAttribute.value === nameAttribute.interpolator.value) {
        return true;
      }
    }
    function stringifyAttribute(attribute) {
      var str = attribute.toString();
      return str ? " " + str : "";
    }
    var Element_prototype_unbind = Element$unbind;
    function Element$unbind() {
      if (this.fragment) {
        this.fragment.unbind();
      }
      if (this.binding) {
        this.binding.unbind();
      }
      if (this.eventHandlers) {
        this.eventHandlers.forEach(methodCallers__unbind);
      }
      if (this.name === "option") {
        option__unbind(this);
      }
      this.attributes.forEach(methodCallers__unbind);
      this.conditionalAttributes.forEach(methodCallers__unbind);
    }
    var Element_prototype_unrender = Element$unrender;
    function Element$unrender(shouldDestroy) {
      var binding,
          bindings,
          transition;
      if (transition = this.transition) {
        transition.complete();
      }
      if (this.name === "option") {
        this.detach();
      } else if (shouldDestroy) {
        runloop.detachWhenReady(this);
      }
      if (this.fragment) {
        this.fragment.unrender(false);
      }
      if (binding = this.binding) {
        this.binding.unrender();
        this.node._ractive.binding = null;
        bindings = this.root._twowayBindings[binding.keypath.str];
        bindings.splice(bindings.indexOf(binding), 1);
      }
      if (this.eventHandlers) {
        this.eventHandlers.forEach(methodCallers__unrender);
      }
      if (this.decorator) {
        runloop.registerDecorator(this.decorator);
      }
      if (this.root.transitionsEnabled && this.outro) {
        transition = new Transition(this, this.outro, false);
        runloop.registerTransition(transition);
        runloop.scheduleTask(function() {
          return transition.start();
        });
      }
      if (this.liveQueries) {
        removeFromLiveQueries(this);
      }
      if (this.name === "form") {
        form__unrender(this);
      }
    }
    function removeFromLiveQueries(element) {
      var query,
          selector,
          i;
      i = element.liveQueries.length;
      while (i--) {
        query = element.liveQueries[i];
        selector = query.selector;
        query._remove(element.node);
      }
    }
    var Element = function(options) {
      this.init(options);
    };
    Element.prototype = {
      bubble: Element_prototype_bubble,
      detach: Element_prototype_detach,
      find: Element_prototype_find,
      findAll: Element_prototype_findAll,
      findAllComponents: Element_prototype_findAllComponents,
      findComponent: Element_prototype_findComponent,
      findNextNode: Element_prototype_findNextNode,
      firstNode: Element_prototype_firstNode,
      getAttribute: getAttribute,
      init: Element_prototype_init,
      rebind: Element_prototype_rebind,
      render: Element_prototype_render,
      toString: Element_prototype_toString,
      unbind: Element_prototype_unbind,
      unrender: Element_prototype_unrender
    };
    var deIndent__empty = /^\s*$/,
        deIndent__leadingWhitespace = /^\s*/;
    var deIndent = function(str) {
      var lines,
          firstLine,
          lastLine,
          minIndent;
      lines = str.split("\n");
      firstLine = lines[0];
      if (firstLine !== undefined && deIndent__empty.test(firstLine)) {
        lines.shift();
      }
      lastLine = lastItem(lines);
      if (lastLine !== undefined && deIndent__empty.test(lastLine)) {
        lines.pop();
      }
      minIndent = lines.reduce(reducer, null);
      if (minIndent) {
        str = lines.map(function(line) {
          return line.replace(minIndent, "");
        }).join("\n");
      }
      return str;
    };
    function reducer(previous, line) {
      var lineIndent = deIndent__leadingWhitespace.exec(line)[0];
      if (previous === null || lineIndent.length < previous.length) {
        return lineIndent;
      }
      return previous;
    }
    function getPartialTemplate(ractive, name, parentFragment) {
      var partial;
      if (partial = getPartialFromRegistry(ractive, name, parentFragment || {})) {
        return partial;
      }
      partial = parser__default.fromId(name, {noThrow: true});
      if (partial) {
        partial = deIndent(partial);
        var parsed = parser__default.parse(partial, parser__default.getParseOptions(ractive));
        return ractive.partials[name] = parsed.t;
      }
    }
    function getPartialFromRegistry(ractive, name, parentFragment) {
      var fn = undefined,
          partial = findParentPartial(name, parentFragment.owner);
      if (partial)
        return partial;
      var instance = findInstance("partials", ractive, name);
      if (!instance) {
        return ;
      }
      partial = instance.partials[name];
      if (typeof partial === "function") {
        fn = partial.bind(instance);
        fn.isOwner = instance.partials.hasOwnProperty(name);
        partial = fn.call(ractive, parser__default);
      }
      if (!partial && partial !== "") {
        warnIfDebug(noRegistryFunctionReturn, name, "partial", "partial", {ractive: ractive});
        return ;
      }
      if (!parser__default.isParsed(partial)) {
        var parsed = parser__default.parse(partial, parser__default.getParseOptions(instance));
        if (parsed.p) {
          warnIfDebug("Partials ({{>%s}}) cannot contain nested inline partials", name, {ractive: ractive});
        }
        var target = fn ? instance : findOwner(instance, name);
        target.partials[name] = partial = parsed.t;
      }
      if (fn) {
        partial._fn = fn;
      }
      return partial.v ? partial.t : partial;
    }
    function findOwner(ractive, key) {
      return ractive.partials.hasOwnProperty(key) ? ractive : findConstructor(ractive.constructor, key);
    }
    function findConstructor(constructor, key) {
      if (!constructor) {
        return ;
      }
      return constructor.partials.hasOwnProperty(key) ? constructor : findConstructor(constructor._Parent, key);
    }
    function findParentPartial(name, parent) {
      if (parent) {
        if (parent.template && parent.template.p && parent.template.p[name]) {
          return parent.template.p[name];
        } else if (parent.parentFragment && parent.parentFragment.owner) {
          return findParentPartial(name, parent.parentFragment.owner);
        }
      }
    }
    var applyIndent = function(string, indent) {
      var indented;
      if (!indent) {
        return string;
      }
      indented = string.split("\n").map(function(line, notFirstLine) {
        return notFirstLine ? indent + line : line;
      }).join("\n");
      return indented;
    };
    var missingPartialMessage = "Could not find template for partial \"%s\"";
    var Partial = function(options) {
      var parentFragment,
          template;
      parentFragment = this.parentFragment = options.parentFragment;
      this.root = parentFragment.root;
      this.type = PARTIAL;
      this.index = options.index;
      this.name = options.template.r;
      this.rendered = false;
      this.fragment = this.fragmentToRender = this.fragmentToUnrender = null;
      Mustache.init(this, options);
      if (!this.keypath) {
        if (template = getPartialTemplate(this.root, this.name, parentFragment)) {
          unbind__default.call(this);
          this.isNamed = true;
          this.setTemplate(template);
        } else {
          warnOnceIfDebug(missingPartialMessage, this.name);
        }
      }
    };
    Partial.prototype = {
      bubble: function() {
        this.parentFragment.bubble();
      },
      detach: function() {
        return this.fragment.detach();
      },
      find: function(selector) {
        return this.fragment.find(selector);
      },
      findAll: function(selector, query) {
        return this.fragment.findAll(selector, query);
      },
      findComponent: function(selector) {
        return this.fragment.findComponent(selector);
      },
      findAllComponents: function(selector, query) {
        return this.fragment.findAllComponents(selector, query);
      },
      firstNode: function() {
        return this.fragment.firstNode();
      },
      findNextNode: function() {
        return this.parentFragment.findNextNode(this);
      },
      getPartialName: function() {
        if (this.isNamed && this.name)
          return this.name;
        else if (this.value === undefined)
          return this.name;
        else
          return this.value;
      },
      getValue: function() {
        return this.fragment.getValue();
      },
      rebind: function(oldKeypath, newKeypath) {
        if (!this.isNamed) {
          rebind__default.call(this, oldKeypath, newKeypath);
        }
        if (this.fragment) {
          this.fragment.rebind(oldKeypath, newKeypath);
        }
      },
      render: function() {
        this.docFrag = document.createDocumentFragment();
        this.update();
        this.rendered = true;
        return this.docFrag;
      },
      resolve: Mustache.resolve,
      setValue: function(value) {
        var template;
        if (value !== undefined && value === this.value) {
          return ;
        }
        if (value !== undefined) {
          template = getPartialTemplate(this.root, "" + value, this.parentFragment);
        }
        if (!template && this.name && (template = getPartialTemplate(this.root, this.name, this.parentFragment))) {
          unbind__default.call(this);
          this.isNamed = true;
        }
        if (!template) {
          warnOnceIfDebug(missingPartialMessage, this.name, {ractive: this.root});
        }
        this.value = value;
        this.setTemplate(template || []);
        this.bubble();
        if (this.rendered) {
          runloop.addView(this);
        }
      },
      setTemplate: function(template) {
        if (this.fragment) {
          this.fragment.unbind();
          if (this.rendered) {
            this.fragmentToUnrender = this.fragment;
          }
        }
        this.fragment = new Fragment({
          template: template,
          root: this.root,
          owner: this,
          pElement: this.parentFragment.pElement
        });
        this.fragmentToRender = this.fragment;
      },
      toString: function(toString) {
        var string,
            previousItem,
            lastLine,
            match;
        string = this.fragment.toString(toString);
        previousItem = this.parentFragment.items[this.index - 1];
        if (!previousItem || previousItem.type !== TEXT) {
          return string;
        }
        lastLine = previousItem.text.split("\n").pop();
        if (match = /^\s+$/.exec(lastLine)) {
          return applyIndent(string, match[0]);
        }
        return string;
      },
      unbind: function() {
        if (!this.isNamed) {
          unbind__default.call(this);
        }
        if (this.fragment) {
          this.fragment.unbind();
        }
      },
      unrender: function(shouldDestroy) {
        if (this.rendered) {
          if (this.fragment) {
            this.fragment.unrender(shouldDestroy);
          }
          this.rendered = false;
        }
      },
      update: function() {
        var target,
            anchor;
        if (this.fragmentToUnrender) {
          this.fragmentToUnrender.unrender(true);
          this.fragmentToUnrender = null;
        }
        if (this.fragmentToRender) {
          this.docFrag.appendChild(this.fragmentToRender.render());
          this.fragmentToRender = null;
        }
        if (this.rendered) {
          target = this.parentFragment.getNode();
          anchor = this.parentFragment.findNextNode(this);
          target.insertBefore(this.docFrag, anchor);
        }
      }
    };
    function getComponent(ractive, name) {
      var Component,
          instance = findInstance("components", ractive, name);
      if (instance) {
        Component = instance.components[name];
        if (!Component._Parent) {
          var fn = Component.bind(instance);
          fn.isOwner = instance.components.hasOwnProperty(name);
          Component = fn();
          if (!Component) {
            warnIfDebug(noRegistryFunctionReturn, name, "component", "component", {ractive: ractive});
            return ;
          }
          if (typeof Component === "string") {
            Component = getComponent(ractive, Component);
          }
          Component._fn = fn;
          instance.components[name] = Component;
        }
      }
      return Component;
    }
    var Component_prototype_detach = Component$detach;
    var Component_prototype_detach__detachHook = new Hook("detach");
    function Component$detach() {
      var detached = this.instance.fragment.detach();
      Component_prototype_detach__detachHook.fire(this.instance);
      return detached;
    }
    var Component_prototype_find = Component$find;
    function Component$find(selector) {
      return this.instance.fragment.find(selector);
    }
    var Component_prototype_findAll = Component$findAll;
    function Component$findAll(selector, query) {
      return this.instance.fragment.findAll(selector, query);
    }
    var Component_prototype_findAllComponents = Component$findAllComponents;
    function Component$findAllComponents(selector, query) {
      query._test(this, true);
      if (this.instance.fragment) {
        this.instance.fragment.findAllComponents(selector, query);
      }
    }
    var Component_prototype_findComponent = Component$findComponent;
    function Component$findComponent(selector) {
      if (!selector || selector === this.name) {
        return this.instance;
      }
      if (this.instance.fragment) {
        return this.instance.fragment.findComponent(selector);
      }
      return null;
    }
    var Component_prototype_findNextNode = Component$findNextNode;
    function Component$findNextNode() {
      return this.parentFragment.findNextNode(this);
    }
    var Component_prototype_firstNode = Component$firstNode;
    function Component$firstNode() {
      if (this.rendered) {
        return this.instance.fragment.firstNode();
      }
      return null;
    }
    var processWrapper = function(wrapper, array, methodName, newIndices) {
      var root = wrapper.root;
      var keypath = wrapper.keypath;
      if (!!newIndices) {
        root.viewmodel.smartUpdate(keypath, array, newIndices);
      } else {
        root.viewmodel.mark(keypath);
      }
    };
    var patchedArrayProto = [],
        mutatorMethods = ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
        testObj,
        patchArrayMethods,
        unpatchArrayMethods;
    mutatorMethods.forEach(function(methodName) {
      var method = function() {
        for (var _len = arguments.length,
            args = Array(_len),
            _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var newIndices,
            result,
            wrapper,
            i;
        newIndices = getNewIndices(this, methodName, args);
        result = Array.prototype[methodName].apply(this, arguments);
        runloop.start();
        this._ractive.setting = true;
        i = this._ractive.wrappers.length;
        while (i--) {
          wrapper = this._ractive.wrappers[i];
          runloop.addRactive(wrapper.root);
          processWrapper(wrapper, this, methodName, newIndices);
        }
        runloop.end();
        this._ractive.setting = false;
        return result;
      };
      defineProperty(patchedArrayProto, methodName, {value: method});
    });
    testObj = {};
    if (testObj.__proto__) {
      patchArrayMethods = function(array) {
        array.__proto__ = patchedArrayProto;
      };
      unpatchArrayMethods = function(array) {
        array.__proto__ = Array.prototype;
      };
    } else {
      patchArrayMethods = function(array) {
        var i,
            methodName;
        i = mutatorMethods.length;
        while (i--) {
          methodName = mutatorMethods[i];
          defineProperty(array, methodName, {
            value: patchedArrayProto[methodName],
            configurable: true
          });
        }
      };
      unpatchArrayMethods = function(array) {
        var i;
        i = mutatorMethods.length;
        while (i--) {
          delete array[mutatorMethods[i]];
        }
      };
    }
    patchArrayMethods.unpatch = unpatchArrayMethods;
    var patch = patchArrayMethods;
    var arrayAdaptor,
        ArrayWrapper,
        arrayAdaptor__errorMessage;
    arrayAdaptor = {
      filter: function(object) {
        return isArray(object) && (!object._ractive || !object._ractive.setting);
      },
      wrap: function(ractive, array, keypath) {
        return new ArrayWrapper(ractive, array, keypath);
      }
    };
    ArrayWrapper = function(ractive, array, keypath) {
      this.root = ractive;
      this.value = array;
      this.keypath = getKeypath(keypath);
      if (!array._ractive) {
        defineProperty(array, "_ractive", {
          value: {
            wrappers: [],
            instances: [],
            setting: false
          },
          configurable: true
        });
        patch(array);
      }
      if (!array._ractive.instances[ractive._guid]) {
        array._ractive.instances[ractive._guid] = 0;
        array._ractive.instances.push(ractive);
      }
      array._ractive.instances[ractive._guid] += 1;
      array._ractive.wrappers.push(this);
    };
    ArrayWrapper.prototype = {
      get: function() {
        return this.value;
      },
      teardown: function() {
        var array,
            storage,
            wrappers,
            instances,
            index;
        array = this.value;
        storage = array._ractive;
        wrappers = storage.wrappers;
        instances = storage.instances;
        if (storage.setting) {
          return false;
        }
        index = wrappers.indexOf(this);
        if (index === -1) {
          throw new Error(arrayAdaptor__errorMessage);
        }
        wrappers.splice(index, 1);
        if (!wrappers.length) {
          delete array._ractive;
          patch.unpatch(this.value);
        } else {
          instances[this.root._guid] -= 1;
          if (!instances[this.root._guid]) {
            index = instances.indexOf(this.root);
            if (index === -1) {
              throw new Error(arrayAdaptor__errorMessage);
            }
            instances.splice(index, 1);
          }
        }
      }
    };
    arrayAdaptor__errorMessage = "Something went wrong in a rather interesting way";
    var numeric = /^\s*[0-9]+\s*$/;
    var createBranch = function(key) {
      return numeric.test(key) ? [] : {};
    };
    var magicAdaptor,
        MagicWrapper;
    try {
      Object.defineProperty({}, "test", {value: 0});
      magicAdaptor = {
        filter: function(object, keypath, ractive) {
          var parentWrapper,
              parentValue;
          if (!keypath) {
            return false;
          }
          keypath = getKeypath(keypath);
          if ((parentWrapper = ractive.viewmodel.wrapped[keypath.parent.str]) && !parentWrapper.magic) {
            return false;
          }
          parentValue = ractive.viewmodel.get(keypath.parent);
          if (isArray(parentValue) && /^[0-9]+$/.test(keypath.lastKey)) {
            return false;
          }
          return parentValue && (typeof parentValue === "object" || typeof parentValue === "function");
        },
        wrap: function(ractive, property, keypath) {
          return new MagicWrapper(ractive, property, keypath);
        }
      };
      MagicWrapper = function(ractive, value, keypath) {
        var objKeypath,
            template,
            siblings;
        keypath = getKeypath(keypath);
        this.magic = true;
        this.ractive = ractive;
        this.keypath = keypath;
        this.value = value;
        this.prop = keypath.lastKey;
        objKeypath = keypath.parent;
        this.obj = objKeypath.isRoot ? ractive.viewmodel.data : ractive.viewmodel.get(objKeypath);
        template = this.originalDescriptor = Object.getOwnPropertyDescriptor(this.obj, this.prop);
        if (template && template.set && (siblings = template.set._ractiveWrappers)) {
          if (siblings.indexOf(this) === -1) {
            siblings.push(this);
          }
          return ;
        }
        createAccessors(this, value, template);
      };
      MagicWrapper.prototype = {
        get: function() {
          return this.value;
        },
        reset: function(value) {
          if (this.updating) {
            return ;
          }
          this.updating = true;
          this.obj[this.prop] = value;
          runloop.addRactive(this.ractive);
          this.ractive.viewmodel.mark(this.keypath, {keepExistingWrapper: true});
          this.updating = false;
          return true;
        },
        set: function(key, value) {
          if (this.updating) {
            return ;
          }
          if (!this.obj[this.prop]) {
            this.updating = true;
            this.obj[this.prop] = createBranch(key);
            this.updating = false;
          }
          this.obj[this.prop][key] = value;
        },
        teardown: function() {
          var template,
              set,
              value,
              wrappers,
              index;
          if (this.updating) {
            return false;
          }
          template = Object.getOwnPropertyDescriptor(this.obj, this.prop);
          set = template && template.set;
          if (!set) {
            return ;
          }
          wrappers = set._ractiveWrappers;
          index = wrappers.indexOf(this);
          if (index !== -1) {
            wrappers.splice(index, 1);
          }
          if (!wrappers.length) {
            value = this.obj[this.prop];
            Object.defineProperty(this.obj, this.prop, this.originalDescriptor || {
              writable: true,
              enumerable: true,
              configurable: true
            });
            this.obj[this.prop] = value;
          }
        }
      };
    } catch (err) {
      magicAdaptor = false;
    }
    function createAccessors(originalWrapper, value, template) {
      var object,
          property,
          oldGet,
          oldSet,
          get,
          set;
      object = originalWrapper.obj;
      property = originalWrapper.prop;
      if (template && !template.configurable) {
        if (property === "length") {
          return ;
        }
        throw new Error("Cannot use magic mode with property \"" + property + "\" - object is not configurable");
      }
      if (template) {
        oldGet = template.get;
        oldSet = template.set;
      }
      get = oldGet || function() {
        return value;
      };
      set = function(v) {
        if (oldSet) {
          oldSet(v);
        }
        value = oldGet ? oldGet() : v;
        set._ractiveWrappers.forEach(updateWrapper);
      };
      function updateWrapper(wrapper) {
        var keypath,
            ractive;
        wrapper.value = value;
        if (wrapper.updating) {
          return ;
        }
        ractive = wrapper.ractive;
        keypath = wrapper.keypath;
        wrapper.updating = true;
        runloop.start(ractive);
        ractive.viewmodel.mark(keypath);
        runloop.end();
        wrapper.updating = false;
      }
      set._ractiveWrappers = [originalWrapper];
      Object.defineProperty(object, property, {
        get: get,
        set: set,
        enumerable: true,
        configurable: true
      });
    }
    var magicArrayAdaptor,
        MagicArrayWrapper;
    if (magicAdaptor) {
      magicArrayAdaptor = {
        filter: function(object, keypath, ractive) {
          return magicAdaptor.filter(object, keypath, ractive) && arrayAdaptor.filter(object);
        },
        wrap: function(ractive, array, keypath) {
          return new MagicArrayWrapper(ractive, array, keypath);
        }
      };
      MagicArrayWrapper = function(ractive, array, keypath) {
        this.value = array;
        this.magic = true;
        this.magicWrapper = magicAdaptor.wrap(ractive, array, keypath);
        this.arrayWrapper = arrayAdaptor.wrap(ractive, array, keypath);
      };
      MagicArrayWrapper.prototype = {
        get: function() {
          return this.value;
        },
        teardown: function() {
          this.arrayWrapper.teardown();
          this.magicWrapper.teardown();
        },
        reset: function(value) {
          return this.magicWrapper.reset(value);
        }
      };
    }
    var adapt__default = Viewmodel$adapt;
    var prefixers = {};
    function Viewmodel$adapt(keypath, value) {
      var len,
          i,
          adaptor,
          wrapped;
      if (!this.adaptors)
        return ;
      len = this.adaptors.length;
      for (i = 0; i < len; i += 1) {
        adaptor = this.adaptors[i];
        if (adaptor.filter(value, keypath, this.ractive)) {
          wrapped = this.wrapped[keypath] = adaptor.wrap(this.ractive, value, keypath, getPrefixer(keypath));
          wrapped.value = value;
          return ;
        }
      }
    }
    function prefixKeypath(obj, prefix) {
      var prefixed = {},
          key;
      if (!prefix) {
        return obj;
      }
      prefix += ".";
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          prefixed[prefix + key] = obj[key];
        }
      }
      return prefixed;
    }
    function getPrefixer(rootKeypath) {
      var rootDot;
      if (!prefixers[rootKeypath]) {
        rootDot = rootKeypath ? rootKeypath + "." : "";
        prefixers[rootKeypath] = function(relativeKeypath, value) {
          var obj;
          if (typeof relativeKeypath === "string") {
            obj = {};
            obj[rootDot + relativeKeypath] = value;
            return obj;
          }
          if (typeof relativeKeypath === "object") {
            return rootDot ? prefixKeypath(relativeKeypath, rootKeypath) : relativeKeypath;
          }
        };
      }
      return prefixers[rootKeypath];
    }
    function getUpstreamChanges(changes) {
      var upstreamChanges = [rootKeypath],
          i,
          keypath;
      i = changes.length;
      while (i--) {
        keypath = changes[i].parent;
        while (keypath && !keypath.isRoot) {
          if (changes.indexOf(keypath) === -1) {
            addToArray(upstreamChanges, keypath);
          }
          keypath = keypath.parent;
        }
      }
      return upstreamChanges;
    }
    function notifyPatternObservers(viewmodel, keypath, onlyDirect) {
      var potentialWildcardMatches;
      updateMatchingPatternObservers(viewmodel, keypath);
      if (onlyDirect) {
        return ;
      }
      potentialWildcardMatches = keypath.wildcardMatches();
      potentialWildcardMatches.forEach(function(upstreamPattern) {
        cascade(viewmodel, upstreamPattern, keypath);
      });
    }
    function cascade(viewmodel, upstreamPattern, keypath) {
      var group,
          map,
          actualChildKeypath;
      upstreamPattern = upstreamPattern.str || upstreamPattern;
      group = viewmodel.depsMap.patternObservers;
      map = group && group[upstreamPattern];
      if (!map) {
        return ;
      }
      map.forEach(function(childKeypath) {
        actualChildKeypath = keypath.join(childKeypath.lastKey);
        updateMatchingPatternObservers(viewmodel, actualChildKeypath);
        cascade(viewmodel, childKeypath, actualChildKeypath);
      });
    }
    function updateMatchingPatternObservers(viewmodel, keypath) {
      viewmodel.patternObservers.forEach(function(observer) {
        if (observer.regex.test(keypath.str)) {
          observer.update(keypath);
        }
      });
    }
    var applyChanges = Viewmodel$applyChanges;
    function Viewmodel$applyChanges() {
      var _this = this;
      var self = this,
          changes,
          upstreamChanges,
          hash = {},
          bindings;
      changes = this.changes;
      if (!changes.length) {
        return ;
      }
      function invalidateComputation(computation) {
        var key = computation.key;
        if (computation.viewmodel === self) {
          self.clearCache(key.str);
          computation.invalidate();
          changes.push(key);
          cascade(key);
        } else {
          computation.viewmodel.mark(key);
        }
      }
      function cascade(keypath) {
        var map,
            computations;
        if (self.noCascade.hasOwnProperty(keypath.str)) {
          return ;
        }
        if (computations = self.deps.computed[keypath.str]) {
          computations.forEach(invalidateComputation);
        }
        if (map = self.depsMap.computed[keypath.str]) {
          map.forEach(cascade);
        }
      }
      changes.slice().forEach(cascade);
      upstreamChanges = getUpstreamChanges(changes);
      upstreamChanges.forEach(function(keypath) {
        var computations;
        if (changes.indexOf(keypath) === -1 && (computations = self.deps.computed[keypath.str])) {
          computations.forEach(invalidateComputation);
        }
      });
      this.changes = [];
      if (this.patternObservers.length) {
        upstreamChanges.forEach(function(keypath) {
          return notifyPatternObservers(_this, keypath, true);
        });
        changes.forEach(function(keypath) {
          return notifyPatternObservers(_this, keypath);
        });
      }
      if (this.deps.observers) {
        upstreamChanges.forEach(function(keypath) {
          return notifyUpstreamDependants(_this, null, keypath, "observers");
        });
        notifyAllDependants(this, changes, "observers");
      }
      if (this.deps["default"]) {
        bindings = [];
        upstreamChanges.forEach(function(keypath) {
          return notifyUpstreamDependants(_this, bindings, keypath, "default");
        });
        if (bindings.length) {
          notifyBindings(this, bindings, changes);
        }
        notifyAllDependants(this, changes, "default");
      }
      changes.forEach(function(keypath) {
        hash[keypath.str] = _this.get(keypath);
      });
      this.implicitChanges = {};
      this.noCascade = {};
      return hash;
    }
    function notifyUpstreamDependants(viewmodel, bindings, keypath, groupName) {
      var dependants,
          value;
      if (dependants = findDependants(viewmodel, keypath, groupName)) {
        value = viewmodel.get(keypath);
        dependants.forEach(function(d) {
          if (bindings && d.refineValue) {
            bindings.push(d);
          } else {
            d.setValue(value);
          }
        });
      }
    }
    function notifyBindings(viewmodel, bindings, changes) {
      bindings.forEach(function(binding) {
        var useSet = false,
            i = 0,
            length = changes.length,
            refinements = [];
        while (i < length) {
          var keypath = changes[i];
          if (keypath === binding.keypath) {
            useSet = true;
            break;
          }
          if (keypath.slice(0, binding.keypath.length) === binding.keypath) {
            refinements.push(keypath);
          }
          i++;
        }
        if (useSet) {
          binding.setValue(viewmodel.get(binding.keypath));
        }
        if (refinements.length) {
          binding.refineValue(refinements);
        }
      });
    }
    function notifyAllDependants(viewmodel, keypaths, groupName) {
      var queue = [];
      addKeypaths(keypaths);
      queue.forEach(dispatch);
      function addKeypaths(keypaths) {
        keypaths.forEach(addKeypath);
        keypaths.forEach(cascade);
      }
      function addKeypath(keypath) {
        var deps = findDependants(viewmodel, keypath, groupName);
        if (deps) {
          queue.push({
            keypath: keypath,
            deps: deps
          });
        }
      }
      function cascade(keypath) {
        var childDeps;
        if (childDeps = viewmodel.depsMap[groupName][keypath.str]) {
          addKeypaths(childDeps);
        }
      }
      function dispatch(set) {
        var value = viewmodel.get(set.keypath);
        set.deps.forEach(function(d) {
          return d.setValue(value);
        });
      }
    }
    function findDependants(viewmodel, keypath, groupName) {
      var group = viewmodel.deps[groupName];
      return group ? group[keypath.str] : null;
    }
    var capture = Viewmodel$capture;
    function Viewmodel$capture() {
      this.captureGroups.push([]);
    }
    var clearCache = Viewmodel$clearCache;
    function Viewmodel$clearCache(keypath, keepExistingWrapper) {
      var cacheMap,
          wrapper;
      if (!keepExistingWrapper) {
        if (wrapper = this.wrapped[keypath]) {
          if (wrapper.teardown() !== false) {
            this.wrapped[keypath] = null;
          }
        }
      }
      this.cache[keypath] = undefined;
      if (cacheMap = this.cacheMap[keypath]) {
        while (cacheMap.length) {
          this.clearCache(cacheMap.pop());
        }
      }
    }
    var UnresolvedDependency = function(computation, ref) {
      this.computation = computation;
      this.viewmodel = computation.viewmodel;
      this.ref = ref;
      this.root = this.viewmodel.ractive;
      this.parentFragment = this.root.component && this.root.component.parentFragment;
    };
    UnresolvedDependency.prototype = {resolve: function(keypath) {
        this.computation.softDeps.push(keypath);
        this.computation.unresolvedDeps[keypath.str] = null;
        this.viewmodel.register(keypath, this.computation, "computed");
      }};
    var Computation = function(key, signature) {
      this.key = key;
      this.getter = signature.getter;
      this.setter = signature.setter;
      this.hardDeps = signature.deps || [];
      this.softDeps = [];
      this.unresolvedDeps = {};
      this.depValues = {};
      this._dirty = this._firstRun = true;
    };
    Computation.prototype = {
      constructor: Computation,
      init: function(viewmodel) {
        var _this = this;
        var initial;
        this.viewmodel = viewmodel;
        this.bypass = true;
        initial = viewmodel.get(this.key);
        viewmodel.clearCache(this.key.str);
        this.bypass = false;
        if (this.setter && initial !== undefined) {
          this.set(initial);
        }
        if (this.hardDeps) {
          this.hardDeps.forEach(function(d) {
            return viewmodel.register(d, _this, "computed");
          });
        }
      },
      invalidate: function() {
        this._dirty = true;
      },
      get: function() {
        var _this = this;
        var newDeps,
            dependenciesChanged,
            dependencyValuesChanged = false;
        if (this.getting) {
          var msg = "The " + this.key.str + " computation indirectly called itself. This probably indicates a bug in the computation. It is commonly caused by `array.sort(...)` - if that's the case, clone the array first with `array.slice().sort(...)`";
          warnOnce(msg);
          return this.value;
        }
        this.getting = true;
        if (this._dirty) {
          if (this._firstRun || !this.hardDeps.length && !this.softDeps.length) {
            dependencyValuesChanged = true;
          } else {
            [this.hardDeps, this.softDeps].forEach(function(deps) {
              var keypath,
                  value,
                  i;
              if (dependencyValuesChanged) {
                return ;
              }
              i = deps.length;
              while (i--) {
                keypath = deps[i];
                value = _this.viewmodel.get(keypath);
                if (!isEqual(value, _this.depValues[keypath.str])) {
                  _this.depValues[keypath.str] = value;
                  dependencyValuesChanged = true;
                  return ;
                }
              }
            });
          }
          if (dependencyValuesChanged) {
            this.viewmodel.capture();
            try {
              this.value = this.getter();
            } catch (err) {
              warnIfDebug("Failed to compute \"%s\"", this.key.str);
              logIfDebug(err.stack || err);
              this.value = void 0;
            }
            newDeps = this.viewmodel.release();
            dependenciesChanged = this.updateDependencies(newDeps);
            if (dependenciesChanged) {
              [this.hardDeps, this.softDeps].forEach(function(deps) {
                deps.forEach(function(keypath) {
                  _this.depValues[keypath.str] = _this.viewmodel.get(keypath);
                });
              });
            }
          }
          this._dirty = false;
        }
        this.getting = this._firstRun = false;
        return this.value;
      },
      set: function(value) {
        if (this.setting) {
          this.value = value;
          return ;
        }
        if (!this.setter) {
          throw new Error("Computed properties without setters are read-only. (This may change in a future version of Ractive!)");
        }
        this.setter(value);
      },
      updateDependencies: function(newDeps) {
        var i,
            oldDeps,
            keypath,
            dependenciesChanged,
            unresolved;
        oldDeps = this.softDeps;
        i = oldDeps.length;
        while (i--) {
          keypath = oldDeps[i];
          if (newDeps.indexOf(keypath) === -1) {
            dependenciesChanged = true;
            this.viewmodel.unregister(keypath, this, "computed");
          }
        }
        i = newDeps.length;
        while (i--) {
          keypath = newDeps[i];
          if (oldDeps.indexOf(keypath) === -1 && (!this.hardDeps || this.hardDeps.indexOf(keypath) === -1)) {
            dependenciesChanged = true;
            if (isUnresolved(this.viewmodel, keypath) && !this.unresolvedDeps[keypath.str]) {
              unresolved = new UnresolvedDependency(this, keypath.str);
              newDeps.splice(i, 1);
              this.unresolvedDeps[keypath.str] = unresolved;
              runloop.addUnresolved(unresolved);
            } else {
              this.viewmodel.register(keypath, this, "computed");
            }
          }
        }
        if (dependenciesChanged) {
          this.softDeps = newDeps.slice();
        }
        return dependenciesChanged;
      }
    };
    function isUnresolved(viewmodel, keypath) {
      var key = keypath.firstKey;
      return !(key in viewmodel.data) && !(key in viewmodel.computations) && !(key in viewmodel.mappings);
    }
    var compute = Viewmodel$compute;
    function Viewmodel$compute(key, signature) {
      var computation = new Computation(key, signature);
      if (this.ready) {
        computation.init(this);
      }
      return this.computations[key.str] = computation;
    }
    var FAILED_LOOKUP = {FAILED_LOOKUP: true};
    var get__default = Viewmodel$get;
    var get__empty = {};
    function Viewmodel$get(keypath, options) {
      var cache = this.cache,
          value,
          computation,
          wrapped,
          captureGroup,
          keypathStr = keypath.str,
          key;
      options = options || get__empty;
      if (options.capture && (captureGroup = lastItem(this.captureGroups))) {
        if (!~captureGroup.indexOf(keypath)) {
          captureGroup.push(keypath);
        }
      }
      if (hasOwn.call(this.mappings, keypath.firstKey)) {
        return this.mappings[keypath.firstKey].get(keypath, options);
      }
      if (keypath.isSpecial) {
        return keypath.value;
      }
      if (cache[keypathStr] === undefined) {
        if ((computation = this.computations[keypathStr]) && !computation.bypass) {
          value = computation.get();
          this.adapt(keypathStr, value);
        } else if (wrapped = this.wrapped[keypathStr]) {
          value = wrapped.value;
        } else if (keypath.isRoot) {
          this.adapt("", this.data);
          value = this.data;
        } else {
          value = retrieve(this, keypath);
        }
        cache[keypathStr] = value;
      } else {
        value = cache[keypathStr];
      }
      if (!options.noUnwrap && (wrapped = this.wrapped[keypathStr])) {
        value = wrapped.get();
      }
      if (keypath.isRoot && options.fullRootGet) {
        for (key in this.mappings) {
          value[key] = this.mappings[key].getValue();
        }
      }
      return value === FAILED_LOOKUP ? void 0 : value;
    }
    function retrieve(viewmodel, keypath) {
      var parentValue,
          cacheMap,
          value,
          wrapped;
      parentValue = viewmodel.get(keypath.parent);
      if (wrapped = viewmodel.wrapped[keypath.parent.str]) {
        parentValue = wrapped.get();
      }
      if (parentValue === null || parentValue === undefined) {
        return ;
      }
      if (!(cacheMap = viewmodel.cacheMap[keypath.parent.str])) {
        viewmodel.cacheMap[keypath.parent.str] = [keypath.str];
      } else {
        if (cacheMap.indexOf(keypath.str) === -1) {
          cacheMap.push(keypath.str);
        }
      }
      if (typeof parentValue === "object" && !(keypath.lastKey in parentValue)) {
        return viewmodel.cache[keypath.str] = FAILED_LOOKUP;
      }
      value = parentValue[keypath.lastKey];
      viewmodel.adapt(keypath.str, value, false);
      viewmodel.cache[keypath.str] = value;
      return value;
    }
    var viewmodel_prototype_init = Viewmodel$init;
    function Viewmodel$init() {
      var key;
      for (key in this.computations) {
        this.computations[key].init(this);
      }
    }
    var map__default = Viewmodel$map;
    function Viewmodel$map(key, options) {
      var mapping = this.mappings[key.str] = new Mapping(key, options);
      mapping.initViewmodel(this);
      return mapping;
    }
    var Mapping = function(localKey, options) {
      this.localKey = localKey;
      this.keypath = options.keypath;
      this.origin = options.origin;
      this.deps = [];
      this.unresolved = [];
      this.resolved = false;
    };
    Mapping.prototype = {
      forceResolution: function() {
        this.keypath = this.localKey;
        this.setup();
      },
      get: function(keypath, options) {
        if (!this.resolved) {
          return undefined;
        }
        return this.origin.get(this.map(keypath), options);
      },
      getValue: function() {
        if (!this.keypath) {
          return undefined;
        }
        return this.origin.get(this.keypath);
      },
      initViewmodel: function(viewmodel) {
        this.local = viewmodel;
        this.setup();
      },
      map: function(keypath) {
        if (typeof this.keypath === undefined) {
          return this.localKey;
        }
        return keypath.replace(this.localKey, this.keypath);
      },
      register: function(keypath, dependant, group) {
        this.deps.push({
          keypath: keypath,
          dep: dependant,
          group: group
        });
        if (this.resolved) {
          this.origin.register(this.map(keypath), dependant, group);
        }
      },
      resolve: function(keypath) {
        if (this.keypath !== undefined) {
          this.unbind(true);
        }
        this.keypath = keypath;
        this.setup();
      },
      set: function(keypath, value) {
        if (!this.resolved) {
          this.forceResolution();
        }
        this.origin.set(this.map(keypath), value);
      },
      setup: function() {
        var _this = this;
        if (this.keypath === undefined) {
          return ;
        }
        this.resolved = true;
        if (this.deps.length) {
          this.deps.forEach(function(d) {
            var keypath = _this.map(d.keypath);
            _this.origin.register(keypath, d.dep, d.group);
            if (d.dep.setValue) {
              d.dep.setValue(_this.origin.get(keypath));
            } else if (d.dep.invalidate) {
              d.dep.invalidate();
            } else {
              throw new Error("An unexpected error occurred. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!");
            }
          });
          this.origin.mark(this.keypath);
        }
      },
      setValue: function(value) {
        if (!this.keypath) {
          throw new Error("Mapping does not have keypath, cannot set value. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!");
        }
        this.origin.set(this.keypath, value);
      },
      unbind: function(keepLocal) {
        var _this = this;
        if (!keepLocal) {
          delete this.local.mappings[this.localKey];
        }
        if (!this.resolved) {
          return ;
        }
        this.deps.forEach(function(d) {
          _this.origin.unregister(_this.map(d.keypath), d.dep, d.group);
        });
        if (this.tracker) {
          this.origin.unregister(this.keypath, this.tracker);
        }
      },
      unregister: function(keypath, dependant, group) {
        var deps,
            i;
        if (!this.resolved) {
          return ;
        }
        deps = this.deps;
        i = deps.length;
        while (i--) {
          if (deps[i].dep === dependant) {
            deps.splice(i, 1);
            break;
          }
        }
        this.origin.unregister(this.map(keypath), dependant, group);
      }
    };
    var mark = Viewmodel$mark;
    function Viewmodel$mark(keypath, options) {
      var computation,
          keypathStr = keypath.str;
      if (options) {
        if (options.implicit) {
          this.implicitChanges[keypathStr] = true;
        }
        if (options.noCascade) {
          this.noCascade[keypathStr] = true;
        }
      }
      if (computation = this.computations[keypathStr]) {
        computation.invalidate();
      }
      if (this.changes.indexOf(keypath) === -1) {
        this.changes.push(keypath);
      }
      var keepExistingWrapper = options ? options.keepExistingWrapper : false;
      this.clearCache(keypathStr, keepExistingWrapper);
      if (this.ready) {
        this.onchange();
      }
    }
    var mapOldToNewIndex = function(oldArray, newArray) {
      var usedIndices,
          firstUnusedIndex,
          newIndices,
          changed;
      usedIndices = {};
      firstUnusedIndex = 0;
      newIndices = oldArray.map(function(item, i) {
        var index,
            start,
            len;
        start = firstUnusedIndex;
        len = newArray.length;
        do {
          index = newArray.indexOf(item, start);
          if (index === -1) {
            changed = true;
            return -1;
          }
          start = index + 1;
        } while (usedIndices[index] && start < len);
        if (index === firstUnusedIndex) {
          firstUnusedIndex += 1;
        }
        if (index !== i) {
          changed = true;
        }
        usedIndices[index] = true;
        return index;
      });
      return newIndices;
    };
    var merge = Viewmodel$merge;
    var comparators = {};
    function Viewmodel$merge(keypath, currentArray, array, options) {
      var oldArray,
          newArray,
          comparator,
          newIndices;
      this.mark(keypath);
      if (options && options.compare) {
        comparator = getComparatorFunction(options.compare);
        try {
          oldArray = currentArray.map(comparator);
          newArray = array.map(comparator);
        } catch (err) {
          warnIfDebug("merge(): \"%s\" comparison failed. Falling back to identity checking", keypath);
          oldArray = currentArray;
          newArray = array;
        }
      } else {
        oldArray = currentArray;
        newArray = array;
      }
      newIndices = mapOldToNewIndex(oldArray, newArray);
      this.smartUpdate(keypath, array, newIndices, currentArray.length !== array.length);
    }
    function stringify(item) {
      return JSON.stringify(item);
    }
    function getComparatorFunction(comparator) {
      if (comparator === true) {
        return stringify;
      }
      if (typeof comparator === "string") {
        if (!comparators[comparator]) {
          comparators[comparator] = function(item) {
            return item[comparator];
          };
        }
        return comparators[comparator];
      }
      if (typeof comparator === "function") {
        return comparator;
      }
      throw new Error("The `compare` option must be a function, or a string representing an identifying field (or `true` to use JSON.stringify)");
    }
    var register = Viewmodel$register;
    function Viewmodel$register(keypath, dependant) {
      var group = arguments[2] === undefined ? "default" : arguments[2];
      var mapping,
          depsByKeypath,
          deps;
      if (dependant.isStatic) {
        return ;
      }
      if (mapping = this.mappings[keypath.firstKey]) {
        mapping.register(keypath, dependant, group);
      } else {
        depsByKeypath = this.deps[group] || (this.deps[group] = {});
        deps = depsByKeypath[keypath.str] || (depsByKeypath[keypath.str] = []);
        deps.push(dependant);
        if (!keypath.isRoot) {
          register__updateDependantsMap(this, keypath, group);
        }
      }
    }
    function register__updateDependantsMap(viewmodel, keypath, group) {
      var map,
          parent,
          keypathStr;
      while (!keypath.isRoot) {
        map = viewmodel.depsMap[group] || (viewmodel.depsMap[group] = {});
        parent = map[keypath.parent.str] || (map[keypath.parent.str] = []);
        keypathStr = keypath.str;
        if (parent["_" + keypathStr] === undefined) {
          parent["_" + keypathStr] = 0;
          parent.push(keypath);
        }
        parent["_" + keypathStr] += 1;
        keypath = keypath.parent;
      }
    }
    var release = Viewmodel$release;
    function Viewmodel$release() {
      return this.captureGroups.pop();
    }
    var reset = Viewmodel$reset;
    function Viewmodel$reset(data) {
      this.data = data;
      this.clearCache("");
    }
    var set__default = Viewmodel$set;
    function Viewmodel$set(keypath, value) {
      var options = arguments[2] === undefined ? {} : arguments[2];
      var mapping,
          computation,
          wrapper,
          keepExistingWrapper;
      if (!options.noMapping) {
        if (mapping = this.mappings[keypath.firstKey]) {
          return mapping.set(keypath, value);
        }
      }
      computation = this.computations[keypath.str];
      if (computation) {
        if (computation.setting) {
          return ;
        }
        computation.set(value);
        value = computation.get();
      }
      if (isEqual(this.cache[keypath.str], value)) {
        return ;
      }
      wrapper = this.wrapped[keypath.str];
      if (wrapper && wrapper.reset) {
        keepExistingWrapper = wrapper.reset(value) !== false;
        if (keepExistingWrapper) {
          value = wrapper.get();
        }
      }
      if (!computation && !keepExistingWrapper) {
        resolveSet(this, keypath, value);
      }
      if (!options.silent) {
        this.mark(keypath);
      } else {
        this.clearCache(keypath.str);
      }
    }
    function resolveSet(viewmodel, keypath, value) {
      var wrapper,
          parentValue,
          wrapperSet,
          valueSet;
      wrapperSet = function() {
        if (wrapper.set) {
          wrapper.set(keypath.lastKey, value);
        } else {
          parentValue = wrapper.get();
          valueSet();
        }
      };
      valueSet = function() {
        if (!parentValue) {
          parentValue = createBranch(keypath.lastKey);
          viewmodel.set(keypath.parent, parentValue, {silent: true});
        }
        parentValue[keypath.lastKey] = value;
      };
      wrapper = viewmodel.wrapped[keypath.parent.str];
      if (wrapper) {
        wrapperSet();
      } else {
        parentValue = viewmodel.get(keypath.parent);
        if (wrapper = viewmodel.wrapped[keypath.parent.str]) {
          wrapperSet();
        } else {
          valueSet();
        }
      }
    }
    var smartUpdate = Viewmodel$smartUpdate;
    var implicitOption = {implicit: true},
        noCascadeOption = {noCascade: true};
    function Viewmodel$smartUpdate(keypath, array, newIndices) {
      var _this = this;
      var dependants,
          oldLength,
          i;
      oldLength = newIndices.length;
      newIndices.forEach(function(newIndex, oldIndex) {
        if (newIndex === -1) {
          _this.mark(keypath.join(oldIndex), noCascadeOption);
        }
      });
      this.set(keypath, array, {silent: true});
      if (dependants = this.deps["default"][keypath.str]) {
        dependants.filter(canShuffle).forEach(function(d) {
          return d.shuffle(newIndices, array);
        });
      }
      if (oldLength !== array.length) {
        this.mark(keypath.join("length"), implicitOption);
        for (i = newIndices.touchedFrom; i < array.length; i += 1) {
          this.mark(keypath.join(i));
        }
        for (i = array.length; i < oldLength; i += 1) {
          this.mark(keypath.join(i), noCascadeOption);
        }
      }
    }
    function canShuffle(dependant) {
      return typeof dependant.shuffle === "function";
    }
    var teardown__default = Viewmodel$teardown;
    function Viewmodel$teardown() {
      var _this = this;
      var unresolvedImplicitDependency;
      Object.keys(this.cache).forEach(function(keypath) {
        return _this.clearCache(keypath);
      });
      while (unresolvedImplicitDependency = this.unresolvedImplicitDependencies.pop()) {
        unresolvedImplicitDependency.teardown();
      }
    }
    var unregister = Viewmodel$unregister;
    function Viewmodel$unregister(keypath, dependant) {
      var group = arguments[2] === undefined ? "default" : arguments[2];
      var mapping,
          deps,
          index;
      if (dependant.isStatic) {
        return ;
      }
      if (mapping = this.mappings[keypath.firstKey]) {
        return mapping.unregister(keypath, dependant, group);
      }
      deps = this.deps[group][keypath.str];
      index = deps.indexOf(dependant);
      if (index === -1) {
        throw new Error("Attempted to remove a dependant that was no longer registered! This should not happen. If you are seeing this bug in development please raise an issue at https://github.com/RactiveJS/Ractive/issues - thanks");
      }
      deps.splice(index, 1);
      if (keypath.isRoot) {
        return ;
      }
      unregister__updateDependantsMap(this, keypath, group);
    }
    function unregister__updateDependantsMap(viewmodel, keypath, group) {
      var map,
          parent;
      while (!keypath.isRoot) {
        map = viewmodel.depsMap[group];
        parent = map[keypath.parent.str];
        parent["_" + keypath.str] -= 1;
        if (!parent["_" + keypath.str]) {
          removeFromArray(parent, keypath);
          parent["_" + keypath.str] = undefined;
        }
        keypath = keypath.parent;
      }
    }
    var Viewmodel = function(options) {
      var adapt = options.adapt;
      var data = options.data;
      var ractive = options.ractive;
      var computed = options.computed;
      var mappings = options.mappings;
      var key;
      var mapping;
      this.ractive = ractive;
      this.adaptors = adapt;
      this.onchange = options.onchange;
      this.cache = {};
      this.cacheMap = create(null);
      this.deps = {
        computed: create(null),
        "default": create(null)
      };
      this.depsMap = {
        computed: create(null),
        "default": create(null)
      };
      this.patternObservers = [];
      this.specials = create(null);
      this.wrapped = create(null);
      this.computations = create(null);
      this.captureGroups = [];
      this.unresolvedImplicitDependencies = [];
      this.changes = [];
      this.implicitChanges = {};
      this.noCascade = {};
      this.data = data;
      this.mappings = create(null);
      for (key in mappings) {
        this.map(getKeypath(key), mappings[key]);
      }
      if (data) {
        for (key in data) {
          if ((mapping = this.mappings[key]) && mapping.getValue() === undefined) {
            mapping.setValue(data[key]);
          }
        }
      }
      for (key in computed) {
        if (mappings && key in mappings) {
          fatal("Cannot map to a computed property ('%s')", key);
        }
        this.compute(getKeypath(key), computed[key]);
      }
      this.ready = true;
    };
    Viewmodel.prototype = {
      adapt: adapt__default,
      applyChanges: applyChanges,
      capture: capture,
      clearCache: clearCache,
      compute: compute,
      get: get__default,
      init: viewmodel_prototype_init,
      map: map__default,
      mark: mark,
      merge: merge,
      register: register,
      release: release,
      reset: reset,
      set: set__default,
      smartUpdate: smartUpdate,
      teardown: teardown__default,
      unregister: unregister
    };
    function HookQueue(event) {
      this.hook = new Hook(event);
      this.inProcess = {};
      this.queue = {};
    }
    HookQueue.prototype = {
      constructor: HookQueue,
      begin: function(ractive) {
        this.inProcess[ractive._guid] = true;
      },
      end: function(ractive) {
        var parent = ractive.parent;
        if (!parent || !this.inProcess[parent._guid]) {
          fire(this, ractive);
        } else {
          getChildQueue(this.queue, parent).push(ractive);
        }
        delete this.inProcess[ractive._guid];
      }
    };
    function getChildQueue(queue, ractive) {
      return queue[ractive._guid] || (queue[ractive._guid] = []);
    }
    function fire(hookQueue, ractive) {
      var childQueue = getChildQueue(hookQueue.queue, ractive);
      hookQueue.hook.fire(ractive);
      while (childQueue.length) {
        fire(hookQueue, childQueue.shift());
      }
      delete hookQueue.queue[ractive._guid];
    }
    var getComputationSignatures__pattern = /\$\{([^\}]+)\}/g;
    function getComputationSignatures(ractive, computed) {
      var signatures = {},
          key;
      for (key in computed) {
        signatures[key] = getComputationSignature(ractive, key, computed[key]);
      }
      return signatures;
    }
    function getComputationSignature(ractive, key, signature) {
      var getter,
          setter;
      if (typeof signature === "function") {
        getter = getComputationSignatures__bind(signature, ractive);
      }
      if (typeof signature === "string") {
        getter = createFunctionFromString(ractive, signature);
      }
      if (typeof signature === "object") {
        if (typeof signature.get === "string") {
          getter = createFunctionFromString(ractive, signature.get);
        } else if (typeof signature.get === "function") {
          getter = getComputationSignatures__bind(signature.get, ractive);
        } else {
          fatal("`%s` computation must have a `get()` method", key);
        }
        if (typeof signature.set === "function") {
          setter = getComputationSignatures__bind(signature.set, ractive);
        }
      }
      return {
        getter: getter,
        setter: setter
      };
    }
    function createFunctionFromString(ractive, str) {
      var functionBody,
          hasThis,
          fn;
      functionBody = "return (" + str.replace(getComputationSignatures__pattern, function(match, keypath) {
        hasThis = true;
        return "__ractive.get(\"" + keypath + "\")";
      }) + ");";
      if (hasThis) {
        functionBody = "var __ractive = this; " + functionBody;
      }
      fn = new Function(functionBody);
      return hasThis ? fn.bind(ractive) : fn;
    }
    function getComputationSignatures__bind(fn, context) {
      return /this/.test(fn.toString()) ? fn.bind(context) : fn;
    }
    var constructHook = new Hook("construct");
    var configHook = new Hook("config");
    var initHook = new HookQueue("init");
    var initialise__uid = 0;
    var initialise__registryNames = ["adaptors", "components", "decorators", "easing", "events", "interpolators", "partials", "transitions"];
    var initialise = initialiseRactiveInstance;
    function initialiseRactiveInstance(ractive) {
      var userOptions = arguments[1] === undefined ? {} : arguments[1];
      var options = arguments[2] === undefined ? {} : arguments[2];
      var el,
          viewmodel;
      if (Ractive.DEBUG) {
        welcome();
      }
      initialiseProperties(ractive, options);
      defineProperty(ractive, "data", {get: deprecateRactiveData});
      constructHook.fire(ractive, userOptions);
      initialise__registryNames.forEach(function(name) {
        ractive[name] = object__extend(create(ractive.constructor[name] || null), userOptions[name]);
      });
      viewmodel = new Viewmodel({
        adapt: getAdaptors(ractive, ractive.adapt, userOptions),
        data: dataConfigurator.init(ractive.constructor, ractive, userOptions),
        computed: getComputationSignatures(ractive, object__extend(create(ractive.constructor.prototype.computed), userOptions.computed)),
        mappings: options.mappings,
        ractive: ractive,
        onchange: function() {
          return runloop.addRactive(ractive);
        }
      });
      ractive.viewmodel = viewmodel;
      viewmodel.init();
      config.init(ractive.constructor, ractive, userOptions);
      configHook.fire(ractive);
      initHook.begin(ractive);
      if (ractive.template) {
        var cssIds = undefined;
        if (options.cssIds || ractive.cssId) {
          cssIds = options.cssIds ? options.cssIds.slice() : [];
          if (ractive.cssId) {
            cssIds.push(ractive.cssId);
          }
        }
        ractive.fragment = new Fragment({
          template: ractive.template,
          root: ractive,
          owner: ractive,
          cssIds: cssIds
        });
      }
      initHook.end(ractive);
      if (el = getElement(ractive.el)) {
        var promise = ractive.render(el, ractive.append);
        if (Ractive.DEBUG_PROMISES) {
          promise["catch"](function(err) {
            warnOnceIfDebug("Promise debugging is enabled, to help solve errors that happen asynchronously. Some browsers will log unhandled promise rejections, in which case you can safely disable promise debugging:\n  Ractive.DEBUG_PROMISES = false;");
            warnIfDebug("An error happened during rendering", {ractive: ractive});
            err.stack && logIfDebug(err.stack);
            throw err;
          });
        }
      }
    }
    function getAdaptors(ractive, protoAdapt, userOptions) {
      var adapt,
          magic,
          modifyArrays;
      protoAdapt = protoAdapt.map(lookup);
      adapt = ensureArray(userOptions.adapt).map(lookup);
      adapt = initialise__combine(protoAdapt, adapt);
      magic = "magic" in userOptions ? userOptions.magic : ractive.magic;
      modifyArrays = "modifyArrays" in userOptions ? userOptions.modifyArrays : ractive.modifyArrays;
      if (magic) {
        if (!environment__magic) {
          throw new Error("Getters and setters (magic mode) are not supported in this browser");
        }
        if (modifyArrays) {
          adapt.push(magicArrayAdaptor);
        }
        adapt.push(magicAdaptor);
      }
      if (modifyArrays) {
        adapt.push(arrayAdaptor);
      }
      return adapt;
      function lookup(adaptor) {
        if (typeof adaptor === "string") {
          adaptor = findInViewHierarchy("adaptors", ractive, adaptor);
          if (!adaptor) {
            fatal(missingPlugin(adaptor, "adaptor"));
          }
        }
        return adaptor;
      }
    }
    function initialise__combine(a, b) {
      var c = a.slice(),
          i = b.length;
      while (i--) {
        if (!~c.indexOf(b[i])) {
          c.push(b[i]);
        }
      }
      return c;
    }
    function initialiseProperties(ractive, options) {
      ractive._guid = "r-" + initialise__uid++;
      ractive._subs = create(null);
      ractive._config = {};
      ractive._twowayBindings = create(null);
      ractive._animations = [];
      ractive.nodes = {};
      ractive._liveQueries = [];
      ractive._liveComponentQueries = [];
      ractive._boundFunctions = [];
      if (options.component) {
        ractive.parent = options.parent;
        ractive.container = options.container || null;
        ractive.root = ractive.parent.root;
        ractive.component = options.component;
        options.component.instance = ractive;
        ractive._inlinePartials = options.inlinePartials;
      } else {
        ractive.root = ractive;
        ractive.parent = ractive.container = null;
      }
    }
    function deprecateRactiveData() {
      throw new Error("Using `ractive.data` is no longer supported - you must use the `ractive.get()` API instead");
    }
    function ComplexParameter(component, template, callback) {
      this.parentFragment = component.parentFragment;
      this.callback = callback;
      this.fragment = new Fragment({
        template: template,
        root: component.root,
        owner: this
      });
      this.update();
    }
    ComplexParameter.prototype = {
      bubble: function() {
        if (!this.dirty) {
          this.dirty = true;
          runloop.addView(this);
        }
      },
      update: function() {
        this.callback(this.fragment.getValue());
        this.dirty = false;
      },
      rebind: function(oldKeypath, newKeypath) {
        this.fragment.rebind(oldKeypath, newKeypath);
      },
      unbind: function() {
        this.fragment.unbind();
      }
    };
    var createInstance = function(component, Component, attributes, yieldTemplate, partials) {
      var instance,
          parentFragment,
          ractive,
          fragment,
          container,
          inlinePartials = {},
          data = {},
          mappings = {},
          ready,
          resolvers = [];
      parentFragment = component.parentFragment;
      ractive = component.root;
      partials = partials || {};
      object__extend(inlinePartials, partials);
      partials.content = yieldTemplate || [];
      inlinePartials[""] = partials.content;
      if (Component.defaults.el) {
        warnIfDebug("The <%s/> component has a default `el` property; it has been disregarded", component.name);
      }
      fragment = parentFragment;
      while (fragment) {
        if (fragment.owner.type === YIELDER) {
          container = fragment.owner.container;
          break;
        }
        fragment = fragment.parent;
      }
      if (attributes) {
        Object.keys(attributes).forEach(function(key) {
          var attribute = attributes[key],
              parsed,
              resolver;
          if (typeof attribute === "string") {
            parsed = parseJSON(attribute);
            data[key] = parsed ? parsed.value : attribute;
          } else if (attribute === 0) {
            data[key] = true;
          } else if (isArray(attribute)) {
            if (isSingleInterpolator(attribute)) {
              mappings[key] = {
                origin: component.root.viewmodel,
                keypath: undefined
              };
              resolver = createResolver(component, attribute[0], function(keypath) {
                if (keypath.isSpecial) {
                  if (ready) {
                    instance.set(key, keypath.value);
                  } else {
                    data[key] = keypath.value;
                    delete mappings[key];
                  }
                } else {
                  if (ready) {
                    instance.viewmodel.mappings[key].resolve(keypath);
                  } else {
                    mappings[key].keypath = keypath;
                  }
                }
              });
            } else {
              resolver = new ComplexParameter(component, attribute, function(value) {
                if (ready) {
                  instance.set(key, value);
                } else {
                  data[key] = value;
                }
              });
            }
            resolvers.push(resolver);
          } else {
            throw new Error("erm wut");
          }
        });
      }
      instance = create(Component.prototype);
      initialise(instance, {
        el: null,
        append: true,
        data: data,
        partials: partials,
        magic: ractive.magic || Component.defaults.magic,
        modifyArrays: ractive.modifyArrays,
        adapt: ractive.adapt
      }, {
        parent: ractive,
        component: component,
        container: container,
        mappings: mappings,
        inlinePartials: inlinePartials,
        cssIds: parentFragment.cssIds
      });
      ready = true;
      component.resolvers = resolvers;
      return instance;
    };
    function createResolver(component, template, callback) {
      var resolver;
      if (template.r) {
        resolver = createReferenceResolver(component, template.r, callback);
      } else if (template.x) {
        resolver = new ExpressionResolver(component, component.parentFragment, template.x, callback);
      } else if (template.rx) {
        resolver = new ReferenceExpressionResolver(component, template.rx, callback);
      }
      return resolver;
    }
    function isSingleInterpolator(template) {
      return template.length === 1 && template[0].t === INTERPOLATOR;
    }
    function propagateEvents(component, eventsDescriptor) {
      var eventName;
      for (eventName in eventsDescriptor) {
        if (eventsDescriptor.hasOwnProperty(eventName)) {
          propagateEvent(component.instance, component.root, eventName, eventsDescriptor[eventName]);
        }
      }
    }
    function propagateEvent(childInstance, parentInstance, eventName, proxyEventName) {
      if (typeof proxyEventName !== "string") {
        fatal("Components currently only support simple events - you cannot include arguments. Sorry!");
      }
      childInstance.on(eventName, function() {
        var event,
            args;
        if (arguments.length && arguments[0] && arguments[0].node) {
          event = Array.prototype.shift.call(arguments);
        }
        args = Array.prototype.slice.call(arguments);
        fireEvent(parentInstance, proxyEventName, {
          event: event,
          args: args
        });
        return false;
      });
    }
    var updateLiveQueries__default = function(component) {
      var ancestor,
          query;
      ancestor = component.root;
      while (ancestor) {
        if (query = ancestor._liveComponentQueries["_" + component.name]) {
          query.push(component.instance);
        }
        ancestor = ancestor.parent;
      }
    };
    var Component_prototype_init = Component$init;
    function Component$init(options, Component) {
      var parentFragment,
          root;
      if (!Component) {
        throw new Error("Component \"" + this.name + "\" not found");
      }
      parentFragment = this.parentFragment = options.parentFragment;
      root = parentFragment.root;
      this.root = root;
      this.type = COMPONENT;
      this.name = options.template.e;
      this.index = options.index;
      this.indexRefBindings = {};
      this.yielders = {};
      this.resolvers = [];
      createInstance(this, Component, options.template.a, options.template.f, options.template.p);
      propagateEvents(this, options.template.v);
      if (options.template.t1 || options.template.t2 || options.template.o) {
        warnIfDebug("The \"intro\", \"outro\" and \"decorator\" directives have no effect on components", {ractive: this.instance});
      }
      updateLiveQueries__default(this);
    }
    var Component_prototype_rebind = Component$rebind;
    function Component$rebind(oldKeypath, newKeypath) {
      var query;
      this.resolvers.forEach(rebind);
      for (var k in this.yielders) {
        if (this.yielders[k][0]) {
          rebind(this.yielders[k][0]);
        }
      }
      if (query = this.root._liveComponentQueries["_" + this.name]) {
        query._makeDirty();
      }
      function rebind(x) {
        x.rebind(oldKeypath, newKeypath);
      }
    }
    var Component_prototype_render = Component$render;
    function Component$render() {
      var instance = this.instance;
      instance.render(this.parentFragment.getNode());
      this.rendered = true;
      return instance.fragment.detach();
    }
    var Component_prototype_toString = Component$toString;
    function Component$toString() {
      return this.instance.fragment.toString();
    }
    var Component_prototype_unbind = Component$unbind;
    var Component_prototype_unbind__teardownHook = new Hook("teardown");
    function Component$unbind() {
      var instance = this.instance;
      this.resolvers.forEach(methodCallers__unbind);
      removeFromLiveComponentQueries(this);
      instance.fragment.unbind();
      instance.viewmodel.teardown();
      if (instance.fragment.rendered && instance.el.__ractive_instances__) {
        removeFromArray(instance.el.__ractive_instances__, instance);
      }
      Component_prototype_unbind__teardownHook.fire(instance);
    }
    function removeFromLiveComponentQueries(component) {
      var instance,
          query;
      instance = component.root;
      do {
        if (query = instance._liveComponentQueries["_" + component.name]) {
          query._remove(component);
        }
      } while (instance = instance.parent);
    }
    var Component_prototype_unrender = Component$unrender;
    function Component$unrender(shouldDestroy) {
      this.shouldDestroy = shouldDestroy;
      this.instance.unrender();
    }
    var Component = function(options, Constructor) {
      this.init(options, Constructor);
    };
    Component.prototype = {
      detach: Component_prototype_detach,
      find: Component_prototype_find,
      findAll: Component_prototype_findAll,
      findAllComponents: Component_prototype_findAllComponents,
      findComponent: Component_prototype_findComponent,
      findNextNode: Component_prototype_findNextNode,
      firstNode: Component_prototype_firstNode,
      init: Component_prototype_init,
      rebind: Component_prototype_rebind,
      render: Component_prototype_render,
      toString: Component_prototype_toString,
      unbind: Component_prototype_unbind,
      unrender: Component_prototype_unrender
    };
    var Component__default = Component;
    var Comment = function(options) {
      this.type = COMMENT;
      this.value = options.template.c;
    };
    Comment.prototype = {
      detach: detach__default,
      firstNode: function() {
        return this.node;
      },
      render: function() {
        if (!this.node) {
          this.node = document.createComment(this.value);
        }
        return this.node;
      },
      toString: function() {
        return "<!--" + this.value + "-->";
      },
      unrender: function(shouldDestroy) {
        if (shouldDestroy) {
          this.node.parentNode.removeChild(this.node);
        }
      }
    };
    var Yielder = function(options) {
      var container,
          component;
      this.type = YIELDER;
      this.container = container = options.parentFragment.root;
      this.component = component = container.component;
      this.container = container;
      this.containerFragment = options.parentFragment;
      this.parentFragment = component.parentFragment;
      var name = this.name = options.template.n || "";
      var template = container._inlinePartials[name];
      if (!template) {
        warnIfDebug("Could not find template for partial \"" + name + "\"", {ractive: options.root});
        template = [];
      }
      this.fragment = new Fragment({
        owner: this,
        root: container.parent,
        template: template,
        pElement: this.containerFragment.pElement
      });
      if (!isArray(component.yielders[name])) {
        component.yielders[name] = [this];
      } else {
        component.yielders[name].push(this);
      }
      runloop.scheduleTask(function() {
        if (component.yielders[name].length > 1) {
          throw new Error("A component template can only have one {{yield" + (name ? " " + name : "") + "}} declaration at a time");
        }
      });
    };
    Yielder.prototype = {
      detach: function() {
        return this.fragment.detach();
      },
      find: function(selector) {
        return this.fragment.find(selector);
      },
      findAll: function(selector, query) {
        return this.fragment.findAll(selector, query);
      },
      findComponent: function(selector) {
        return this.fragment.findComponent(selector);
      },
      findAllComponents: function(selector, query) {
        return this.fragment.findAllComponents(selector, query);
      },
      findNextNode: function() {
        return this.containerFragment.findNextNode(this);
      },
      firstNode: function() {
        return this.fragment.firstNode();
      },
      getValue: function(options) {
        return this.fragment.getValue(options);
      },
      render: function() {
        return this.fragment.render();
      },
      unbind: function() {
        this.fragment.unbind();
      },
      unrender: function(shouldDestroy) {
        this.fragment.unrender(shouldDestroy);
        removeFromArray(this.component.yielders[this.name], this);
      },
      rebind: function(oldKeypath, newKeypath) {
        this.fragment.rebind(oldKeypath, newKeypath);
      },
      toString: function() {
        return this.fragment.toString();
      }
    };
    var Doctype = function(options) {
      this.declaration = options.template.a;
    };
    Doctype.prototype = {
      init: noop,
      render: noop,
      unrender: noop,
      teardown: noop,
      toString: function() {
        return "<!DOCTYPE" + this.declaration + ">";
      }
    };
    var Fragment_prototype_init = Fragment$init;
    function Fragment$init(options) {
      var _this = this;
      this.owner = options.owner;
      this.parent = this.owner.parentFragment;
      this.root = options.root;
      this.pElement = options.pElement;
      this.context = options.context;
      this.index = options.index;
      this.key = options.key;
      this.registeredIndexRefs = [];
      this.cssIds = "cssIds" in options ? options.cssIds : this.parent ? this.parent.cssIds : null;
      this.items = options.template.map(function(template, i) {
        return createItem({
          parentFragment: _this,
          pElement: options.pElement,
          template: template,
          index: i
        });
      });
      this.value = this.argsList = null;
      this.dirtyArgs = this.dirtyValue = true;
      this.bound = true;
    }
    function createItem(options) {
      if (typeof options.template === "string") {
        return new Text(options);
      }
      switch (options.template.t) {
        case YIELDER:
          return new Yielder(options);
        case INTERPOLATOR:
          return new Interpolator(options);
        case SECTION:
          return new Section(options);
        case TRIPLE:
          return new Triple(options);
        case ELEMENT:
          var constructor = undefined;
          if (constructor = getComponent(options.parentFragment.root, options.template.e)) {
            return new Component__default(options, constructor);
          }
          return new Element(options);
        case PARTIAL:
          return new Partial(options);
        case COMMENT:
          return new Comment(options);
        case DOCTYPE:
          return new Doctype(options);
        default:
          throw new Error("Something very strange happened. Please file an issue at https://github.com/ractivejs/ractive/issues. Thanks!");
      }
    }
    var Fragment_prototype_rebind = Fragment$rebind;
    function Fragment$rebind(oldKeypath, newKeypath) {
      if (!this.owner || this.owner.hasContext) {
        assignNewKeypath(this, "context", oldKeypath, newKeypath);
      }
      this.items.forEach(function(item) {
        if (item.rebind) {
          item.rebind(oldKeypath, newKeypath);
        }
      });
    }
    var Fragment_prototype_render = Fragment$render;
    function Fragment$render() {
      var result;
      if (this.items.length === 1) {
        result = this.items[0].render();
      } else {
        result = document.createDocumentFragment();
        this.items.forEach(function(item) {
          result.appendChild(item.render());
        });
      }
      this.rendered = true;
      return result;
    }
    var Fragment_prototype_toString = Fragment$toString;
    function Fragment$toString(escape) {
      if (!this.items) {
        return "";
      }
      return this.items.map(escape ? toEscapedString : Fragment_prototype_toString__toString).join("");
    }
    function Fragment_prototype_toString__toString(item) {
      return item.toString();
    }
    function toEscapedString(item) {
      return item.toString(true);
    }
    var Fragment_prototype_unbind = Fragment$unbind;
    function Fragment$unbind() {
      if (!this.bound) {
        return ;
      }
      this.items.forEach(unbindItem);
      this.bound = false;
    }
    function unbindItem(item) {
      if (item.unbind) {
        item.unbind();
      }
    }
    var Fragment_prototype_unrender = Fragment$unrender;
    function Fragment$unrender(shouldDestroy) {
      if (!this.rendered) {
        throw new Error("Attempted to unrender a fragment that was not rendered");
      }
      this.items.forEach(function(i) {
        return i.unrender(shouldDestroy);
      });
      this.rendered = false;
    }
    var Fragment = function(options) {
      this.init(options);
    };
    Fragment.prototype = {
      bubble: prototype_bubble,
      detach: Fragment_prototype_detach,
      find: Fragment_prototype_find,
      findAll: Fragment_prototype_findAll,
      findAllComponents: Fragment_prototype_findAllComponents,
      findComponent: Fragment_prototype_findComponent,
      findNextNode: prototype_findNextNode,
      firstNode: prototype_firstNode,
      getArgsList: getArgsList,
      getNode: getNode,
      getValue: prototype_getValue,
      init: Fragment_prototype_init,
      rebind: Fragment_prototype_rebind,
      registerIndexRef: function(idx) {
        var idxs = this.registeredIndexRefs;
        if (idxs.indexOf(idx) === -1) {
          idxs.push(idx);
        }
      },
      render: Fragment_prototype_render,
      toString: Fragment_prototype_toString,
      unbind: Fragment_prototype_unbind,
      unregisterIndexRef: function(idx) {
        var idxs = this.registeredIndexRefs;
        idxs.splice(idxs.indexOf(idx), 1);
      },
      unrender: Fragment_prototype_unrender
    };
    var prototype_reset = Ractive$reset;
    var shouldRerender = ["template", "partials", "components", "decorators", "events"],
        resetHook = new Hook("reset");
    function Ractive$reset(data) {
      var promise,
          wrapper,
          changes,
          i,
          rerender;
      data = data || {};
      if (typeof data !== "object") {
        throw new Error("The reset method takes either no arguments, or an object containing new data");
      }
      if ((wrapper = this.viewmodel.wrapped[""]) && wrapper.reset) {
        if (wrapper.reset(data) === false) {
          this.viewmodel.reset(data);
        }
      } else {
        this.viewmodel.reset(data);
      }
      changes = config.reset(this);
      i = changes.length;
      while (i--) {
        if (shouldRerender.indexOf(changes[i]) > -1) {
          rerender = true;
          break;
        }
      }
      if (rerender) {
        var component = undefined;
        this.viewmodel.mark(rootKeypath);
        if (component = this.component) {
          component.shouldDestroy = true;
        }
        this.unrender();
        if (component) {
          component.shouldDestroy = false;
        }
        if (this.fragment.template !== this.template) {
          this.fragment.unbind();
          this.fragment = new Fragment({
            template: this.template,
            root: this,
            owner: this
          });
        }
        promise = this.render(this.el, this.anchor);
      } else {
        promise = runloop.start(this, true);
        this.viewmodel.mark(rootKeypath);
        runloop.end();
      }
      resetHook.fire(this, data);
      return promise;
    }
    var resetPartial = function(name, partial) {
      var promise,
          collection = [];
      function collect(source, dest, ractive) {
        if (ractive && ractive.partials[name])
          return ;
        source.forEach(function(item) {
          if (item.type === PARTIAL && item.getPartialName() === name) {
            dest.push(item);
          }
          if (item.fragment) {
            collect(item.fragment.items, dest, ractive);
          }
          if (isArray(item.fragments)) {
            collect(item.fragments, dest, ractive);
          } else if (isArray(item.items)) {
            collect(item.items, dest, ractive);
          } else if (item.type === COMPONENT && item.instance) {
            collect(item.instance.fragment.items, dest, item.instance);
          }
          if (item.type === ELEMENT) {
            if (isArray(item.attributes)) {
              collect(item.attributes, dest, ractive);
            }
            if (isArray(item.conditionalAttributes)) {
              collect(item.conditionalAttributes, dest, ractive);
            }
          }
        });
      }
      collect(this.fragment.items, collection);
      this.partials[name] = partial;
      promise = runloop.start(this, true);
      collection.forEach(function(item) {
        item.value = undefined;
        item.setValue(name);
      });
      runloop.end();
      return promise;
    };
    var resetTemplate = Ractive$resetTemplate;
    function Ractive$resetTemplate(template) {
      var transitionsEnabled,
          component;
      templateConfigurator.init(null, this, {template: template});
      transitionsEnabled = this.transitionsEnabled;
      this.transitionsEnabled = false;
      if (component = this.component) {
        component.shouldDestroy = true;
      }
      this.unrender();
      if (component) {
        component.shouldDestroy = false;
      }
      this.fragment.unbind();
      this.fragment = new Fragment({
        template: this.template,
        root: this,
        owner: this
      });
      this.render(this.el, this.anchor);
      this.transitionsEnabled = transitionsEnabled;
    }
    var reverse = makeArrayMethod("reverse");
    var prototype_set = Ractive$set;
    function Ractive$set(keypath, value) {
      var map,
          promise;
      promise = runloop.start(this, true);
      if (isObject(keypath)) {
        map = keypath;
        for (keypath in map) {
          if (map.hasOwnProperty(keypath)) {
            value = map[keypath];
            set(this, keypath, value);
          }
        }
      } else {
        set(this, keypath, value);
      }
      runloop.end();
      return promise;
    }
    function set(ractive, keypath, value) {
      keypath = getKeypath(normalise(keypath));
      if (keypath.isPattern) {
        getMatchingKeypaths(ractive, keypath).forEach(function(keypath) {
          ractive.viewmodel.set(keypath, value);
        });
      } else {
        ractive.viewmodel.set(keypath, value);
      }
    }
    var shift = makeArrayMethod("shift");
    var prototype_sort = makeArrayMethod("sort");
    var splice = makeArrayMethod("splice");
    var subtract = Ractive$subtract;
    function Ractive$subtract(keypath, d) {
      return add(this, keypath, d === undefined ? -1 : -d);
    }
    var prototype_teardown = Ractive$teardown;
    var prototype_teardown__teardownHook = new Hook("teardown");
    function Ractive$teardown() {
      var promise;
      this.fragment.unbind();
      this.viewmodel.teardown();
      if (this.fragment.rendered && this.el.__ractive_instances__) {
        removeFromArray(this.el.__ractive_instances__, this);
      }
      this.shouldDestroy = true;
      promise = this.fragment.rendered ? this.unrender() : utils_Promise.resolve();
      prototype_teardown__teardownHook.fire(this);
      this._boundFunctions.forEach(deleteFunctionCopy);
      return promise;
    }
    function deleteFunctionCopy(bound) {
      delete bound.fn[bound.prop];
    }
    var toggle = Ractive$toggle;
    function Ractive$toggle(keypath) {
      var _this = this;
      if (typeof keypath !== "string") {
        throw new TypeError(badArguments);
      }
      var changes = undefined;
      if (/\*/.test(keypath)) {
        changes = {};
        getMatchingKeypaths(this, getKeypath(normalise(keypath))).forEach(function(keypath) {
          changes[keypath.str] = !_this.viewmodel.get(keypath);
        });
        return this.set(changes);
      }
      return this.set(keypath, !this.get(keypath));
    }
    var toHTML = Ractive$toHTML;
    function Ractive$toHTML() {
      return this.fragment.toString(true);
    }
    var Ractive_prototype_unrender = Ractive$unrender;
    var unrenderHook = new Hook("unrender");
    function Ractive$unrender() {
      var promise,
          shouldDestroy;
      if (!this.fragment.rendered) {
        warnIfDebug("ractive.unrender() was called on a Ractive instance that was not rendered");
        return utils_Promise.resolve();
      }
      promise = runloop.start(this, true);
      shouldDestroy = !this.component || this.component.shouldDestroy || this.shouldDestroy;
      while (this._animations[0]) {
        this._animations[0].stop();
      }
      this.fragment.unrender(shouldDestroy);
      removeFromArray(this.el.__ractive_instances__, this);
      unrenderHook.fire(this);
      runloop.end();
      return promise;
    }
    var unshift = makeArrayMethod("unshift");
    var Ractive_prototype_update = Ractive$update;
    var updateHook = new Hook("update");
    function Ractive$update(keypath) {
      var promise;
      keypath = getKeypath(keypath) || rootKeypath;
      promise = runloop.start(this, true);
      this.viewmodel.mark(keypath);
      runloop.end();
      updateHook.fire(this, keypath);
      return promise;
    }
    var updateModel__default = Ractive$updateModel;
    function Ractive$updateModel(keypath, cascade) {
      var values,
          key,
          bindings;
      if (typeof keypath === "string" && !cascade) {
        bindings = this._twowayBindings[keypath];
      } else {
        bindings = [];
        for (key in this._twowayBindings) {
          if (!keypath || getKeypath(key).equalsOrStartsWith(keypath)) {
            bindings.push.apply(bindings, this._twowayBindings[key]);
          }
        }
      }
      values = consolidate(this, bindings);
      return this.set(values);
    }
    function consolidate(ractive, bindings) {
      var values = {},
          checkboxGroups = [];
      bindings.forEach(function(b) {
        var oldValue,
            newValue;
        if (b.radioName && !b.element.node.checked) {
          return ;
        }
        if (b.checkboxName) {
          if (!checkboxGroups[b.keypath.str] && !b.changed()) {
            checkboxGroups.push(b.keypath);
            checkboxGroups[b.keypath.str] = b;
          }
          return ;
        }
        oldValue = b.attribute.value;
        newValue = b.getValue();
        if (arrayContentsMatch(oldValue, newValue)) {
          return ;
        }
        if (!isEqual(oldValue, newValue)) {
          values[b.keypath.str] = newValue;
        }
      });
      if (checkboxGroups.length) {
        checkboxGroups.forEach(function(keypath) {
          var binding,
              oldValue,
              newValue;
          binding = checkboxGroups[keypath.str];
          oldValue = binding.attribute.value;
          newValue = binding.getValue();
          if (!arrayContentsMatch(oldValue, newValue)) {
            values[keypath.str] = newValue;
          }
        });
      }
      return values;
    }
    var proto__default = {
      add: prototype_add,
      animate: animate__default,
      detach: prototype_detach,
      find: prototype_find,
      findAll: prototype_findAll,
      findAllComponents: prototype_findAllComponents,
      findComponent: prototype_findComponent,
      findContainer: findContainer,
      findParent: findParent,
      fire: prototype_fire,
      get: prototype_get,
      insert: insert,
      merge: prototype_merge,
      observe: observe,
      observeOnce: observeOnce,
      off: off,
      on: on,
      once: once,
      pop: pop,
      push: push,
      render: prototype_render,
      reset: prototype_reset,
      resetPartial: resetPartial,
      resetTemplate: resetTemplate,
      reverse: reverse,
      set: prototype_set,
      shift: shift,
      sort: prototype_sort,
      splice: splice,
      subtract: subtract,
      teardown: prototype_teardown,
      toggle: toggle,
      toHTML: toHTML,
      toHtml: toHTML,
      unrender: Ractive_prototype_unrender,
      unshift: unshift,
      update: Ractive_prototype_update,
      updateModel: updateModel__default
    };
    var wrap__default = function(method, superMethod, force) {
      if (force || needsSuper(method, superMethod)) {
        return function() {
          var hasSuper = ("_super" in this),
              _super = this._super,
              result;
          this._super = superMethod;
          result = method.apply(this, arguments);
          if (hasSuper) {
            this._super = _super;
          }
          return result;
        };
      } else {
        return method;
      }
    };
    function needsSuper(method, superMethod) {
      return typeof superMethod === "function" && /_super/.test(method);
    }
    var unwrapExtended = unwrap;
    function unwrap(Child) {
      var options = {};
      while (Child) {
        addRegistries(Child, options);
        addOtherOptions(Child, options);
        if (Child._Parent !== Ractive) {
          Child = Child._Parent;
        } else {
          Child = false;
        }
      }
      return options;
    }
    function addRegistries(Child, options) {
      registries.forEach(function(r) {
        addRegistry(r.useDefaults ? Child.prototype : Child, options, r.name);
      });
    }
    function addRegistry(target, options, name) {
      var registry,
          keys = Object.keys(target[name]);
      if (!keys.length) {
        return ;
      }
      if (!(registry = options[name])) {
        registry = options[name] = {};
      }
      keys.filter(function(key) {
        return !(key in registry);
      }).forEach(function(key) {
        return registry[key] = target[name][key];
      });
    }
    function addOtherOptions(Child, options) {
      Object.keys(Child.prototype).forEach(function(key) {
        if (key === "computed") {
          return ;
        }
        var value = Child.prototype[key];
        if (!(key in options)) {
          options[key] = value._method ? value._method : value;
        } else if (typeof options[key] === "function" && typeof value === "function" && options[key]._method) {
          var result = undefined,
              needsSuper = value._method;
          if (needsSuper) {
            value = value._method;
          }
          result = wrap__default(options[key]._method, value);
          if (needsSuper) {
            result._method = result;
          }
          options[key] = result;
        }
      });
    }
    var extend__default = extend__extend;
    function extend__extend() {
      for (var _len = arguments.length,
          options = Array(_len),
          _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }
      if (!options.length) {
        return extendOne(this);
      } else {
        return options.reduce(extendOne, this);
      }
    }
    function extendOne(Parent) {
      var options = arguments[1] === undefined ? {} : arguments[1];
      var Child,
          proto;
      if (options.prototype instanceof Ractive) {
        options = unwrapExtended(options);
      }
      Child = function(options) {
        if (!(this instanceof Child))
          return new Child(options);
        initialise(this, options);
      };
      proto = create(Parent.prototype);
      proto.constructor = Child;
      defineProperties(Child, {
        defaults: {value: proto},
        extend: {
          value: extend__extend,
          writable: true,
          configurable: true
        },
        _Parent: {value: Parent}
      });
      config.extend(Parent, proto, options);
      dataConfigurator.extend(Parent, proto, options);
      if (options.computed) {
        proto.computed = object__extend(create(Parent.prototype.computed), options.computed);
      }
      Child.prototype = proto;
      return Child;
    }
    var getNodeInfo = function(node) {
      var info = {},
          priv,
          indices;
      if (!node || !(priv = node._ractive)) {
        return info;
      }
      info.ractive = priv.root;
      info.keypath = priv.keypath.str;
      info.index = {};
      if (indices = findIndexRefs(priv.proxy.parentFragment)) {
        info.index = findIndexRefs.resolve(indices);
      }
      return info;
    };
    var Ractive,
        properties;
    Ractive = function(options) {
      if (!(this instanceof Ractive))
        return new Ractive(options);
      initialise(this, options);
    };
    properties = {
      DEBUG: {
        writable: true,
        value: true
      },
      DEBUG_PROMISES: {
        writable: true,
        value: true
      },
      extend: {value: extend__default},
      getNodeInfo: {value: getNodeInfo},
      parse: {value: parse},
      Promise: {value: utils_Promise},
      svg: {value: svg},
      magic: {value: environment__magic},
      VERSION: {value: "0.7.1"},
      adaptors: {
        writable: true,
        value: {}
      },
      components: {
        writable: true,
        value: {}
      },
      decorators: {
        writable: true,
        value: {}
      },
      easing: {
        writable: true,
        value: easing__default
      },
      events: {
        writable: true,
        value: {}
      },
      interpolators: {
        writable: true,
        value: interpolators
      },
      partials: {
        writable: true,
        value: {}
      },
      transitions: {
        writable: true,
        value: {}
      }
    };
    defineProperties(Ractive, properties);
    Ractive.prototype = object__extend(proto__default, defaults);
    Ractive.prototype.constructor = Ractive;
    Ractive.defaults = Ractive.prototype;
    var FUNCTION = "function";
    if (typeof Date.now !== FUNCTION || typeof String.prototype.trim !== FUNCTION || typeof Object.keys !== FUNCTION || typeof Array.prototype.indexOf !== FUNCTION || typeof Array.prototype.forEach !== FUNCTION || typeof Array.prototype.map !== FUNCTION || typeof Array.prototype.filter !== FUNCTION || typeof window !== "undefined" && typeof window.addEventListener !== FUNCTION) {
      throw new Error("It looks like you're attempting to use Ractive.js in an older browser. You'll need to use one of the 'legacy builds' in order to continue - see http://docs.ractivejs.org/latest/legacy-builds for more information.");
    }
    return Ractive;
  }));
})(require("process"));
