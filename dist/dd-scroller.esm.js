import DDEvent from 'dd-event';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

if (typeof document !== 'undefined' && !document.scrollingElement) {
    var judged_1 = false;
    var element_1 = null;
    var scrollingElement = function () {
        if (judged_1)
            return element_1;
        if (!document.documentElement)
            return element_1;
        if (document.body.scrollTop) {
            judged_1 = true;
            return (element_1 = document.body);
        }
        var iframe = document.createElement('iframe');
        iframe.style.height = '1px';
        document.documentElement.appendChild(iframe);
        if (!iframe.contentWindow)
            return element_1;
        var doc = iframe.contentWindow.document;
        doc.write('<!DOCTYPE html><div style="height:9999em">x</div>');
        doc.close();
        if (!doc.documentElement)
            return element_1;
        var isCompliant = doc.documentElement.scrollHeight > doc.body.scrollHeight;
        iframe.parentNode.removeChild(iframe);
        judged_1 = true;
        return (element_1 = isCompliant ? document.documentElement : document.body);
    };
    Object.defineProperty(document, 'scrollingElement', {
        get: scrollingElement,
    });
}

var HAS_WINDOW = typeof window !== undefined;
var windowIsLoaded = false;
HAS_WINDOW &&
    window.addEventListener('load', function onload() {
        windowIsLoaded = true;
        window.removeEventListener('load', onload, false);
    }, false);
var loadWindow = function () {
    if (windowIsLoaded)
        return Promise.resolve();
    return new Promise(function (resolve) {
        window.addEventListener('load', function onload() {
            window.removeEventListener('load', onload, false);
            resolve();
        }, false);
    });
};
function error(message) {
    return new Error("[dd-scroller] " + message);
}

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

function LinearEasing (x) {
  return x;
}

var src = function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};

var easings = {
    ease: [0.25, 0.1, 0.25, 1.0],
    linear: [0.0, 0.0, 1.0, 1.0],
    'ease-in': [0.42, 0.0, 1.0, 1.0],
    'ease-out': [0.0, 0.0, 0.58, 1.0],
    'ease-in-out': [0.42, 0.0, 0.58, 1.0],
};

// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
var supportsPassive = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        },
    });
    window.addEventListener('test', null, opts);
    window.removeEventListener('test', null, opts);
}
catch (e) { }
function isBodyElement(el) {
    return el.tagName.toLowerCase() === 'body';
}
function getContainerDimension(el) {
    if (isBodyElement(el)) {
        var documentElement = document.documentElement;
        return {
            // width: window.innerWidth,
            // height: window.innerHeight,
            width: documentElement.clientWidth,
            height: documentElement.clientWidth,
        };
    }
    else {
        return {
            width: el.clientWidth,
            height: el.clientHeight,
        };
    }
}
function $(selectorOrElement) {
    if (typeof selectorOrElement !== 'string')
        return selectorOrElement;
    return document.querySelector(selectorOrElement);
}
function cumulativeOffset(element) {
    var top = 0;
    var left = 0;
    var el = element;
    while (el) {
        top += el.offsetTop || 0;
        left += el.offsetLeft || 0;
        el = el.offsetParent;
    }
    return {
        top: top,
        left: left,
    };
}
function on(element, events, handler, opts) {
    if (opts === void 0) { opts = { passive: false }; }
    if (!Array.isArray(events))
        events = [events];
    for (var i = 0; i < events.length; i++) {
        element.addEventListener(events[i], handler, supportsPassive ? opts : false);
    }
}
function off(element, events, handler) {
    if (!Array.isArray(events))
        events = [events];
    for (var i = 0; i < events.length; i++) {
        element.removeEventListener(events[i], handler);
    }
}
function error$1(message) {
    return new Error("[dd-scroll] " + message);
}

var defaultSettings = {
    get container() {
        return document.scrollingElement;
    },
    duration: 500,
    easing: 'ease',
    cancelable: true,
};
var abortEvents = [
    'mousedown',
    'wheel',
    'DOMMouseScroll',
    'mousewheel',
    'keyup',
    'touchmove',
];
function scroll(diffX, diffY, options, _computedValues) {
    if (options === void 0) { options = {}; }
    var $container;
    var initialX;
    var initialY;
    var targetX;
    var targetY;
    var _options = Object.assign({}, defaultSettings, options);
    var container = _options.container, duration = _options.duration, easing = _options.easing, cancelable = _options.cancelable, onProgoress = _options.onProgoress, onCancel = _options.onCancel, onDone = _options.onDone;
    var x = diffX !== 0;
    var y = diffY !== 0;
    if (_computedValues) {
        $container = _computedValues.$container;
        initialX = _computedValues.initialX;
        initialY = _computedValues.initialY;
        targetX = _computedValues.targetX;
        targetY = _computedValues.targetY;
    }
    else {
        $container = $(container);
        if (!$container)
            throw error$1('missing container ' + container);
        initialX = $container.scrollLeft;
        initialY = $container.scrollTop;
        targetX = initialX + diffX;
        targetY = initialY + diffY;
    }
    // compute overflow and adjust values
    var scrollWidth = $container.scrollWidth, scrollHeight = $container.scrollHeight;
    var _a = getContainerDimension($container), width = _a.width, height = _a.height;
    var overflowX = targetX + width - scrollWidth;
    var overflowY = targetY + height - scrollHeight;
    if (overflowX > 0) {
        diffX -= overflowX;
        targetX -= overflowX;
    }
    if (overflowY > 0) {
        diffY -= overflowY;
        targetY -= overflowY;
    }
    //
    // Setup Temporary values
    //
    var doneResolver;
    var timeStart = 0;
    var timeElapsed;
    var callbackValues = {
        container: $container,
        progress: 0,
        aborted: false,
        abortEventSource: null,
    };
    var result = {
        cancel: canceller,
        promise: new Promise(function (resolve) {
            doneResolver = resolve;
        }),
        plans: {
            x: diffX,
            y: diffY,
        },
    };
    //
    // processes
    //
    if (!diffY && !diffX)
        return initialAbort();
    // setup easings
    var easingValues;
    if (!easing) {
        easingValues = easings.ease;
    }
    else if (typeof easing === 'string') {
        easingValues = easings[_options.easing];
    }
    else {
        easingValues = easing;
    }
    var easingFn = src.apply(src, easingValues);
    on($container, abortEvents, abortFn, { passive: true });
    window.requestAnimationFrame(step);
    return result;
    //
    // inner methods
    //
    function doneResolve() {
        doneResolver();
    }
    function canceller(e, checkCancelable) {
        if (e === void 0) { e = null; }
        if (checkCancelable === void 0) { checkCancelable = false; }
        if (checkCancelable && !cancelable)
            return;
        off($container, abortEvents, abortFn);
        callbackValues.abortEventSource = e;
        callbackValues.aborted = true;
        onCancel && onCancel(callbackValues);
    }
    function abortFn(e) {
        canceller(e, true);
    }
    function initialAbort(e) {
        if (e === void 0) { e = null; }
        canceller(e);
        doneResolve();
        return result;
    }
    function step(timestamp) {
        if (callbackValues.aborted)
            return done();
        if (!timeStart)
            timeStart = timestamp;
        timeElapsed = timestamp - timeStart;
        var progress = Math.min(timeElapsed / duration, 1);
        progress = easingFn(progress);
        callbackValues.progress = progress;
        topLeft(initialY + diffY * progress, initialX + diffX * progress);
        onProgoress && onProgoress(callbackValues);
        timeElapsed < duration ? window.requestAnimationFrame(step) : done();
    }
    function topLeft(top, left) {
        if (y)
            $container.scrollTop = top;
        if (x)
            $container.scrollLeft = left;
    }
    function done() {
        if (!callbackValues.aborted)
            topLeft(targetY, targetX);
        timeStart = 0;
        off($container, abortEvents, abortFn);
        callbackValues.progress = 1;
        if (!callbackValues.aborted && onDone)
            onDone(callbackValues);
    }
}

function scrollBy(diffX, diffY, options) {
    return scroll(diffX, diffY, options);
}

function scrollTo(_a, options) {
    var x = _a.x, y = _a.y;
    if (options === void 0) { options = {}; }
    var container = options.container || defaultSettings.container;
    var $container = $(container);
    if (!$container)
        throw error$1('missing container ' + container);
    var initialY = $container.scrollTop;
    var initialX = $container.scrollLeft;
    if (x === undefined)
        x = initialX;
    if (y === undefined)
        y = initialY;
    var diffX = x - initialX;
    var diffY = y - initialY;
    return scroll(diffX, diffY, options, {
        $container: $container,
        initialX: initialX,
        initialY: initialY,
        targetX: x,
        targetY: y,
    });
}

var scrollToElementSettingsDefaults = {
    offset: 0,
    x: false,
    y: true,
};
function scrollToElement(target, options) {
    //
    // Setup Options
    //
    if (options === void 0) { options = {}; }
    var _options = Object.assign({}, scrollToElementSettingsDefaults, options);
    var x = _options.x, y = _options.y;
    var offsetSource = _options.offset;
    var offset = typeof offsetSource === 'number'
        ? { x: offsetSource, y: offsetSource }
        : offsetSource;
    //
    // Setup Elements
    //
    var $target = $(target);
    if (!$target)
        throw error$1('missing element ' + target);
    var container = _options.container || defaultSettings.container;
    var $container = $(container);
    if (!$container)
        throw error$1('missing container ' + container);
    var cumulativeOffsetContainer = cumulativeOffset($container);
    var cumulativeOffsetTarget = cumulativeOffset($target);
    var initialY = $container.scrollTop;
    var initialX = $container.scrollLeft;
    var targetY = cumulativeOffsetTarget.top - cumulativeOffsetContainer.top + offset.y;
    var targetX = cumulativeOffsetTarget.left - cumulativeOffsetContainer.left + offset.x;
    var diffX = x ? targetX - initialX : 0;
    var diffY = y ? targetY - initialY : 0;
    return scroll(diffX, diffY, _options, {
        $container: $container,
        initialX: initialX,
        initialY: initialY,
        targetX: targetX,
        targetY: targetY,
    });
}

function scrollToSide(targets, options) {
    var sides = typeof targets === 'string' ? [targets] : targets;
    var position = {};
    var hasRight = sides.includes('right');
    var hasBottom = sides.includes('bottom');
    if (sides.includes('top')) {
        position.y = 0;
    }
    else if (sides.includes('left')) {
        position.x = 0;
    }
    if (hasRight || hasBottom) {
        var container = (options && options.container) || defaultSettings.container;
        var $container = $(container);
        if (!$container)
            throw error$1('missing container ' + container);
        if (hasRight)
            position.x = $container.scrollWidth;
        if (hasBottom)
            position.y = $container.scrollHeight;
    }
    return scrollTo(position, options);
}
function scrollToTop(options) {
    return scrollToSide('top', options);
}
function scrollToRight(options) {
    return scrollToSide('right', options);
}
function scrollToBottom(options) {
    return scrollToSide('bottom', options);
}
function scrollToLeft(options) {
    return scrollToSide('left', options);
}

var e_1, _a;
var ScrollerState;
(function (ScrollerState) {
    ScrollerState["Pending"] = "pending";
    ScrollerState["Ready"] = "ready";
    ScrollerState["Running"] = "running";
    ScrollerState["Destroyed"] = "destroyed";
})(ScrollerState || (ScrollerState = {}));
var DEFAULT_SCROLL_START_JUDGE_PX = 0;
var DEFAULT_SCROLLING_JUDGE_INTERVAL = 500;
var DEFAULT_BASE_AXIS = 'y';
var scrollerObservableKeys = [
    'state',
    'isPending',
    'isReady',
    'isRunning',
    'isDestroyed',
    'containerWidth',
    'containerHeight',
    'scrollWidth',
    'scrollHeight',
    'scrollTop',
    'scrollLeft',
    'scrollRight',
    'scrollBottom',
    'lastAxis',
    'lastDirection',
    'lastYDirection',
    'lastXDirection',
    'nowScrolling',
];
var Scroller = /** @class */ (function (_super) {
    __extends(Scroller, _super);
    function Scroller(setting) {
        if (setting === void 0) { setting = {}; }
        var _this = _super.call(this) || this;
        _this.scrollStartJudgePx = DEFAULT_SCROLL_START_JUDGE_PX;
        _this.scrollingJudgeInterval = DEFAULT_SCROLLING_JUDGE_INTERVAL;
        _this.baseAxis = DEFAULT_BASE_AXIS;
        _this._isDocumentElement = false;
        _this._isBodyElement = false;
        _this._isRootElement = false;
        _this._state = ScrollerState.Pending;
        _this._containerWidth = 0;
        _this._containerHeight = 0;
        _this._scrollWidth = 0;
        _this._scrollHeight = 0;
        _this._scrollTop = 0;
        _this._scrollRight = 0;
        _this._scrollBottom = 0;
        _this._scrollLeft = 0;
        _this._lastYDirection = 'top';
        _this._lastXDirection = 'left';
        _this._nowScrolling = false;
        _this._readyResolvers = [];
        _this._scrollingJudgeTimerId = null;
        _this._startX = 0;
        _this._startY = 0;
        _this._tickedX = 0;
        _this._tickedY = 0;
        _this._lastTotalX = 0;
        _this._lastTotalY = 0;
        _this._scrollToResult = null;
        _this._observers = [];
        var convertedSetting = typeof setting === 'string' || (HAS_WINDOW && setting instanceof Element)
            ? (setting = { el: setting })
            : setting;
        if (convertedSetting.scrollStartJudgePx !== undefined)
            _this.scrollStartJudgePx = convertedSetting.scrollStartJudgePx;
        if (convertedSetting.scrollingJudgeInterval !== undefined)
            _this.scrollingJudgeInterval = convertedSetting.scrollingJudgeInterval;
        if (convertedSetting.baseAxis)
            _this.baseAxis = convertedSetting.baseAxis;
        _this._lastAxis = _this.baseAxis;
        _this._lastDirection = _this._lastAxis === 'y' ? 'top' : 'left';
        // for SSR
        if (!HAS_WINDOW)
            return _this;
        // Skip auto setup when missing scrolling element.
        _this.setElement(convertedSetting.el);
        return _this;
    }
    Object.defineProperty(Scroller.prototype, "el", {
        get: function () {
            return this._el;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "isPending", {
        get: function () {
            return this._state === ScrollerState.Pending;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "isReady", {
        get: function () {
            return this._state === ScrollerState.Ready;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "isRunning", {
        get: function () {
            return this._state === ScrollerState.Running;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "isDestroyed", {
        get: function () {
            return this._state === ScrollerState.Destroyed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "containerWidth", {
        get: function () {
            return this._containerWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "containerHeight", {
        get: function () {
            return this._containerHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "scrollWidth", {
        get: function () {
            return this._scrollWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "scrollHeight", {
        get: function () {
            return this._scrollHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "scrollTop", {
        get: function () {
            return this._scrollTop;
        },
        set: function (scrollTop) {
            if (!this.el)
                return;
            this.el.scrollTop = scrollTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "scrollRight", {
        get: function () {
            return this._scrollRight;
        },
        set: function (scrollRight) {
            if (!this.el)
                return;
            this.el.scrollLeft = this._scrollWidth - this._containerWidth - scrollRight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "scrollBottom", {
        get: function () {
            return this._scrollBottom;
        },
        set: function (scrollBottom) {
            if (!this.el)
                return;
            this.el.scrollTop =
                this._scrollHeight - this._containerHeight - scrollBottom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "scrollLeft", {
        get: function () {
            return this._scrollLeft;
        },
        set: function (scrollLeft) {
            if (!this.el)
                return;
            this.el.scrollLeft = scrollLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "nowScrolling", {
        get: function () {
            return this._nowScrolling;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "lastAxis", {
        get: function () {
            return this._lastAxis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "lastDirection", {
        get: function () {
            return this._lastDirection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "lastYDirection", {
        get: function () {
            return this._lastYDirection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "lastXDirection", {
        get: function () {
            return this._lastXDirection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroller.prototype, "lastPayload", {
        get: function () {
            return {
                top: this._scrollTop,
                left: this._scrollLeft,
                bottom: this._scrollBottom,
                right: this._scrollRight,
                axis: this._lastAxis,
                direction: this._lastDirection,
                directionX: this._lastXDirection,
                directionY: this._lastYDirection,
                tickedX: this._tickedX,
                tickedY: this._tickedY,
                totalX: this._lastTotalX,
                totalY: this._lastTotalY,
            };
        },
        enumerable: true,
        configurable: true
    });
    Scroller.prototype.setElement = function (el) {
        this.stop();
        var _el;
        if (typeof el === 'string') {
            _el = document.querySelector(el);
        }
        else {
            _el = el || document.scrollingElement;
        }
        if (!_el)
            throw error('missing scrolling element ' + el);
        this._el = _el;
        this._isDocumentElement = this._el.constructor === HTMLHtmlElement;
        this._isBodyElement = this._el.constructor === HTMLBodyElement;
        this._isRootElement = this._isDocumentElement || this._isBodyElement;
        this._eventTarget =
            this._isDocumentElement || this._isBodyElement ? window : this._el;
        this._setup();
    };
    Scroller.prototype.ready = function () {
        var _this = this;
        this._checkDestroyed();
        if (!this.isPending)
            return Promise.resolve();
        return new Promise(function (resolve) { return _this._readyResolvers.push(resolve); });
    };
    Scroller.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._checkDestroyed();
                        if (this.isRunning)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        this._startListeners();
                        this._setState(ScrollerState.Running);
                        return [2 /*return*/];
                }
            });
        });
    };
    Scroller.prototype.stop = function () {
        this._checkDestroyed();
        if (!this.isRunning)
            return;
        this._stopListeners();
        this._setState(ScrollerState.Ready);
    };
    Scroller.prototype.destroy = function () {
        if (this.isDestroyed)
            return;
        this.stop();
        this.cancel();
        this._readyResolvers = [];
        this._observers = [];
        delete this._el;
        delete this._eventTarget;
        delete this._scrollListener;
        delete this._resizeListener;
        delete this._resizeObserver;
        delete this._scrollToResult;
        this._setState(ScrollerState.Destroyed);
        this.offAll();
    };
    Scroller.prototype.cancel = function () {
        if (!this._scrollToResult)
            return;
        this._scrollToResult.cancel();
        this._clearScrollToResult();
    };
    Scroller.prototype.update = function () {
        this._update();
    };
    Scroller.prototype.toJSON = function () {
        var e_2, _a;
        var json = {};
        try {
            for (var scrollerObservableKeys_1 = __values(scrollerObservableKeys), scrollerObservableKeys_1_1 = scrollerObservableKeys_1.next(); !scrollerObservableKeys_1_1.done; scrollerObservableKeys_1_1 = scrollerObservableKeys_1.next()) {
                var key = scrollerObservableKeys_1_1.value;
                json[key] = this[key];
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (scrollerObservableKeys_1_1 && !scrollerObservableKeys_1_1.done && (_a = scrollerObservableKeys_1.return)) _a.call(scrollerObservableKeys_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return json;
    };
    Scroller.prototype.toString = function () {
        return JSON.stringify(this.toJSON());
    };
    Scroller.prototype.observe = function (observer) {
        var _this = this;
        if (!this._observers.includes(observer)) {
            this._observers.push(observer);
        }
        this._syncToObserver(observer);
        var unobserve = function () {
            _this.unobserve(observer);
        };
        return unobserve;
    };
    Scroller.prototype.unobserve = function (observer) {
        var index = this._observers.indexOf(observer);
        if (index !== -1) {
            this._observers.splice(index, 1);
        }
    };
    Scroller.prototype._setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loadWindow()];
                    case 1:
                        _a.sent();
                        this._update();
                        this._setState(ScrollerState.Ready);
                        this.start();
                        this.emit('ready');
                        this._readyResolvers.forEach(function (resolve) { return resolve(); });
                        this._readyResolvers = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    Scroller.prototype._setState = function (state) {
        if (this._state !== state) {
            this._state = state;
            this._syncToObservers([
                'state',
                'isPending',
                'isReady',
                'isRunning',
                'isDestroyed',
            ]);
            this.emit('changeState', state);
        }
    };
    Scroller.prototype._checkDestroyed = function () {
        if (this.isDestroyed)
            throw error('already destroyed.');
    };
    Scroller.prototype._update = function (width, height) {
        this._updateContainerSize(width, height);
        this._updateScrollSize();
        this._updateScrollPositions();
    };
    Scroller.prototype._updateContainerSize = function (width, height) {
        if (width === void 0) { width = this._isBodyElement
            ? // ? window.innerWidth
                document.documentElement.clientWidth
            : this.el.clientWidth; }
        if (height === void 0) { height = this._isBodyElement
            ? // ? window.innerHeight
                document.documentElement.clientHeight
            : this.el.clientHeight; }
        var _a = this, _containerWidth = _a._containerWidth, _containerHeight = _a._containerHeight;
        this._containerWidth = width;
        this._containerHeight = height;
        if (width !== _containerWidth || height !== _containerHeight) {
            this._syncToObservers(['containerWidth', 'containerHeight']);
            this.emit('resize', { width: width, height: height });
        }
    };
    Scroller.prototype._updateScrollSize = function () {
        var _a = this, _scrollWidth = _a._scrollWidth, _scrollHeight = _a._scrollHeight;
        this._scrollWidth = this.el.scrollWidth;
        this._scrollHeight = this.el.scrollHeight;
        if (_scrollWidth !== this._scrollWidth ||
            _scrollHeight !== this._scrollHeight) {
            this._syncToObservers(['scrollWidth', 'scrollHeight']);
        }
    };
    Scroller.prototype._updateScrollPositions = function () {
        this._scrollTop = this.el.scrollTop;
        this._scrollLeft = this.el.scrollLeft;
        // advanced values
        this._scrollBottom =
            this._scrollHeight - this._scrollTop - this._containerHeight;
        this._scrollRight =
            this._scrollWidth - this._scrollLeft - this._containerWidth;
        this._syncToObservers([
            'scrollTop',
            'scrollRight',
            'scrollBottom',
            'scrollLeft',
        ]);
    };
    Scroller.prototype._startListeners = function () {
        var _this = this;
        this._stopListeners();
        this._scrollListener = function () {
            _this._onScroll();
        };
        this._eventTarget.addEventListener('scroll', this._scrollListener, false);
        if (this._isRootElement) {
            this._resizeListener = function () {
                _this._onResize();
            };
            window.addEventListener('resize', this._resizeListener, false);
        }
        else {
            this._resizeObserver = new ResizeObserver(function (entries) {
                var e_3, _a;
                try {
                    for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                        var entry = entries_1_1.value;
                        var _b = entry.contentRect, width = _b.width, height = _b.height;
                        _this._onResize(width, height);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            });
            this._resizeObserver.observe(this._el);
        }
    };
    Scroller.prototype._stopListeners = function () {
        if (this._scrollListener) {
            this._eventTarget.removeEventListener('scroll', this._scrollListener, false);
            delete this._scrollListener;
        }
        if (this._resizeListener) {
            if (this._isDocumentElement) {
                window.removeEventListener('resize', this._resizeListener, false);
                delete this._resizeListener;
            }
        }
        if (this._resizeObserver) {
            this._resizeObserver.unobserve(this._el);
            this._resizeObserver.disconnect();
            delete this._resizeObserver;
        }
    };
    Scroller.prototype._clearScrollingJudgeTimer = function () {
        if (this._scrollingJudgeTimerId !== null) {
            clearTimeout(this._scrollingJudgeTimerId);
            this._scrollingJudgeTimerId = null;
        }
    };
    Scroller.prototype._onResize = function (width, height) {
        this._update(width, height);
    };
    Scroller.prototype._triggerScrollTick = function (event) {
        var _nowScrolling = this._nowScrolling;
        if (event === 'scrollStart') {
            this._startX = this._scrollLeft;
            this._startY = this._scrollTop;
            this._lastTotalX = 0;
            this._lastTotalY = 0;
            this._nowScrolling = true;
        }
        else if (event === 'scrollEnd') {
            this._nowScrolling = false;
        }
        if (_nowScrolling !== this._nowScrolling) {
            this._syncToObservers('nowScrolling');
        }
        this.emit(event, this.lastPayload);
    };
    Scroller.prototype._onScroll = function () {
        var _this = this;
        // remenber before values
        var _a = this, _scrollTop = _a._scrollTop, _scrollLeft = _a._scrollLeft, _lastAxis = _a._lastAxis, _lastDirection = _a._lastDirection, _lastXDirection = _a._lastXDirection, _lastYDirection = _a._lastYDirection;
        // ,,,and next update values
        this._updateScrollPositions();
        // calicurate scrolled ammount at (ticked time)
        var tickedX = this._scrollLeft - _scrollLeft;
        var tickedY = this._scrollTop - _scrollTop;
        this._tickedX = tickedX;
        this._tickedY = tickedY;
        // update axis
        if (tickedX === tickedY) {
            this._lastAxis = this.baseAxis;
        }
        else {
            this._lastAxis = Math.abs(tickedX) > Math.abs(tickedY) ? 'x' : 'y';
        }
        // update directions
        if (_scrollTop < this._scrollTop) {
            this._lastYDirection = 'bottom';
        }
        else if (_scrollTop > this._scrollTop) {
            this._lastYDirection = 'top';
        }
        if (_scrollLeft < this._scrollLeft) {
            this._lastXDirection = 'right';
        }
        else if (_scrollLeft > this._scrollLeft) {
            this._lastXDirection = 'left';
        }
        this._lastDirection =
            this._lastAxis === 'y' ? this._lastYDirection : this._lastXDirection;
        // judge scroll end by before axis and directions
        var axisIsChanged = this._lastAxis !== _lastAxis;
        var lastXDirectionIsChanged = this._lastXDirection !== _lastXDirection;
        var lastYDirectionIsChanged = this._lastYDirection !== _lastYDirection;
        var lastDirectionIsChanged = this._lastDirection !== _lastDirection;
        if (axisIsChanged) {
            this.emit('changeAxis', this._lastAxis);
        }
        if (lastXDirectionIsChanged) {
            this.emit('changeLastXDirection', this._lastXDirection);
        }
        if (lastYDirectionIsChanged) {
            this.emit('changeLastYDirection', this._lastYDirection);
        }
        if (lastDirectionIsChanged) {
            this.emit('changeLastDirection', this._lastDirection);
        }
        if (axisIsChanged ||
            lastXDirectionIsChanged ||
            lastYDirectionIsChanged ||
            lastDirectionIsChanged) {
            this._syncToObservers([
                'lastAxis',
                'lastDirection',
                'lastYDirection',
                'lastXDirection',
            ]);
        }
        if (this._nowScrolling) {
            if (axisIsChanged ||
                (_lastAxis === 'y' && lastYDirectionIsChanged) ||
                (_lastAxis === 'x' && lastXDirectionIsChanged)) {
                // emit scroll end & start(both)
                this._triggerScrollTick('scrollEnd');
            }
            else {
                // add scroll ammounts
                this._lastTotalX = this._scrollLeft - this._startX;
                this._lastTotalY = this._scrollTop - this._startY;
                this._triggerScrollTick('scroll');
            }
        }
        // judge scroll start
        if (!this._nowScrolling) {
            this._triggerScrollTick('scrollStart');
        }
        this._clearScrollingJudgeTimer();
        this._scrollingJudgeTimerId = window.setTimeout(function () {
            _this._triggerScrollTick('scrollEnd');
        }, this.scrollingJudgeInterval);
    };
    Scroller.prototype._clearScrollToResult = function () {
        if (!this._scrollToResult)
            return;
        this._scrollToResult = null;
    };
    Scroller.prototype._syncToObserver = function (observer, keys) {
        if (keys === void 0) { keys = scrollerObservableKeys; }
        var e_4, _a;
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                observer[key] = this[key];
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    Scroller.prototype._syncToObservers = function (keys) {
        var e_5, _a;
        if (this._observers.length === 0)
            return;
        keys = typeof keys === 'string' ? [keys] : keys;
        try {
            for (var _b = __values(this._observers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var observer = _c.value;
                this._syncToObserver(observer, keys);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    Scroller.scrollerObservableKeys = scrollerObservableKeys;
    Scroller.States = ScrollerState;
    return Scroller;
}(DDEvent));
var prototypeMappings = [
    { key: 'by', i: 2, f: scrollBy },
    { key: 'to', i: 1, f: scrollTo },
    { key: 'toElement', i: 1, f: scrollToElement },
    { key: 'toSide', i: 1, f: scrollToSide },
    { key: 'toTop', i: 0, f: scrollToTop },
    { key: 'toRight', i: 0, f: scrollToRight },
    { key: 'toBottom', i: 0, f: scrollToBottom },
    { key: 'toLeft', i: 0, f: scrollToLeft },
];
var _loop_1 = function (define) {
    var key = define.key;
    var optioinsIndex = define.i;
    var func = define.f;
    var isElement = key === 'toElement';
    Scroller.prototype[key] = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var self = this;
        var options = __assign({}, args[optioinsIndex]);
        options.container = self.el;
        if (isElement) {
            if (options.x === undefined)
                options.x = this.baseAxis === 'x';
            if (options.y === undefined)
                options.y = this.baseAxis === 'y';
        }
        var createdArgs = __spread(args);
        createdArgs[optioinsIndex] = options;
        this._scrollToResult = func.apply(void 0, __spread(createdArgs));
        this._scrollToResult.promise.then(function () {
            _this._clearScrollToResult();
        });
        return this._scrollToResult;
    };
};
try {
    for (var prototypeMappings_1 = __values(prototypeMappings), prototypeMappings_1_1 = prototypeMappings_1.next(); !prototypeMappings_1_1.done; prototypeMappings_1_1 = prototypeMappings_1.next()) {
        var define = prototypeMappings_1_1.value;
        _loop_1(define);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (prototypeMappings_1_1 && !prototypeMappings_1_1.done && (_a = prototypeMappings_1.return)) _a.call(prototypeMappings_1);
    }
    finally { if (e_1) throw e_1.error; }
}

export default Scroller;
export { ScrollerState, scrollBy, scrollTo, scrollToElement, scrollToSide, scrollToElementSettingsDefaults, scrollToTop, scrollToRight, scrollToBottom, scrollToLeft };
