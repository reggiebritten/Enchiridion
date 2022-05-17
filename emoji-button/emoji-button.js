/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/emoji-button@0.6.0/dist/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */


!(function (e, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
    ? define(n)
    : ((e = e || self).EmojiButton = n());
})(this, function () {
  "use strict";
  !(function (e, n) {
    void 0 === n && (n = {});
    var a = n.insertAt;
    if (e && "undefined" != typeof document) {
      var t = document.head || document.getElementsByTagName("head")[0],
        i = document.createElement("style");
      (i.type = "text/css"),
        "top" === a && t.firstChild
          ? t.insertBefore(i, t.firstChild)
          : t.appendChild(i),
        i.styleSheet
          ? (i.styleSheet.cssText = e)
          : i.appendChild(document.createTextNode(e));
    }
  })(
    ".emoji-picker {\n  margin: 0 0.5em;\n  border: 1px solid #999999;\n  border-radius: 5px;\n  box-shadow: 0px 0px 3px 1px #CCCCCC;\n  background: #FFFFFF;\n  width: 20.5rem;\n  }\n\n.emoji-picker__content {\n  padding: 0.5em;\n}\n\n.emoji-picker__preview {\n  height: 2em;\n  padding: 0.5em;\n  border-top: 1px solid #999999;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.emoji-picker__preview-emoji {\n  font-size: 2em;\n  margin-right: 0.25em;\n}\n\n.emoji-picker__preview-name {\n  color: #666666;\n  font-size: 0.85em;\n  overflow-wrap: break-word;\n  word-break: break-all;\n}\n\n.emoji-picker__tabs {\n  margin: 0;\n  padding: 0;\n  display: flex;\n}\n\n.emoji-picker__tab {\n  list-style: none;\n  display: inline-block;\n  padding: 0 0.5em;\n  cursor: pointer;\n  flex-grow: 1;\n  text-align: center;\n}\n\n.emoji-picker__tab.active {\n  border-bottom: 3px solid #4F81E5;\n  color: #4F81E5;\n}\n\n.emoji-picker__tab-body {\n  display: none;\n  margin-top: 0.5em;\n}\n\n.emoji-picker__tab-body h2 {\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  color: #333333;\n  margin: 0;\n}\n\n.emoji-picker__tab-body.active {\n  display: block;\n}\n\n.emoji-picker__emojis {\n  height: 18rem;\n  overflow-y: scroll;\n  display: flex;\n  flex-wrap: wrap;\n  align-content: flex-start;\n  width: calc(1.3rem * 1.5 * 10);\n  margin: auto;\n}\n\n.emoji-picker__emoji {\n  background: transparent;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 1.24rem;\n  width: 1.5em;\n  height: 1.5em;\n  padding: 0;\n  margin: 0;\n}\n\n.emoji-picker__emoji:hover {\n  background: #E8F4F9;\n}\n\n.emoji-picker__search-container {\n  margin: 0.5em;\n  position: relative;\n  height: 2em;\n  display: flex;\n}\n\n.emoji-picker__search-container input {\n  box-sizing: border-box;\n  width: 100%;\n  border-radius: 5px;\n  border: 1px solid #CCCCCC;\n  padding-right: 2em;\n}\n\n.emoji-picker__search-icon {\n  position: absolute;\n  color: #CCCCCC;\n  width: 1em;\n  height: 1em;\n  right: 0.75em;\n  top: calc(50% - 0.5em);\n}\n\n.emoji-picker__search-not-found {\n  color: #666666;\n  text-align: center;\n  margin-top: 2em;\n}\n\n.emoji-picker__search-not-found-icon {\n  font-size: 3em;\n}\n\n.emoji-picker__search-not-found h2 {\n  margin: 0.5em 0;\n  font-size: 1em;\n}\n"
  );
  for (
    var e,
      n =
        ((function (e) {
          var n = Object.prototype.hasOwnProperty,
            a = "~";
          function t() {}
          function i(e, n, a) {
            (this.fn = e), (this.context = n), (this.once = a || !1);
          }
          function r(e, n, t, r, o) {
            if ("function" != typeof t)
              throw new TypeError("The listener must be a function");
            var c = new i(t, r || e, o),
              l = a ? a + n : n;
            return (
              e._events[l]
                ? e._events[l].fn
                  ? (e._events[l] = [e._events[l], c])
                  : e._events[l].push(c)
                : ((e._events[l] = c), e._eventsCount++),
              e
            );
          }
          function o(e, n) {
            0 == --e._eventsCount ? (e._events = new t()) : delete e._events[n];
          }
          function c() {
            (this._events = new t()), (this._eventsCount = 0);
          }
          Object.create &&
            ((t.prototype = Object.create(null)),
            new t().__proto__ || (a = !1)),
            (c.prototype.eventNames = function () {
              var e,
                t,
                i = [];
              if (0 === this._eventsCount) return i;
              for (t in (e = this._events))
                n.call(e, t) && i.push(a ? t.slice(1) : t);
              return Object.getOwnPropertySymbols
                ? i.concat(Object.getOwnPropertySymbols(e))
                : i;
            }),
            (c.prototype.listeners = function (e) {
              var n = a ? a + e : e,
                t = this._events[n];
              if (!t) return [];
              if (t.fn) return [t.fn];
              for (var i = 0, r = t.length, o = new Array(r); i < r; i++)
                o[i] = t[i].fn;
              return o;
            }),
            (c.prototype.listenerCount = function (e) {
              var n = a ? a + e : e,
                t = this._events[n];
              return t ? (t.fn ? 1 : t.length) : 0;
            }),
            (c.prototype.emit = function (e, n, t, i, r, o) {
              var c = a ? a + e : e;
              if (!this._events[c]) return !1;
              var l,
                s,
                F = this._events[c],
                f = arguments.length;
              if (F.fn) {
                switch (
                  (F.once && this.removeListener(e, F.fn, void 0, !0), f)
                ) {
                  case 1:
                    return F.fn.call(F.context), !0;
                  case 2:
                    return F.fn.call(F.context, n), !0;
                  case 3:
                    return F.fn.call(F.context, n, t), !0;
                  case 4:
                    return F.fn.call(F.context, n, t, i), !0;
                  case 5:
                    return F.fn.call(F.context, n, t, i, r), !0;
                  case 6:
                    return F.fn.call(F.context, n, t, i, r, o), !0;
                }
                for (s = 1, l = new Array(f - 1); s < f; s++)
                  l[s - 1] = arguments[s];
                F.fn.apply(F.context, l);
              } else {
                var m,
                  g = F.length;
                for (s = 0; s < g; s++)
                  switch (
                    (F[s].once && this.removeListener(e, F[s].fn, void 0, !0),
                    f)
                  ) {
                    case 1:
                      F[s].fn.call(F[s].context);
                      break;
                    case 2:
                      F[s].fn.call(F[s].context, n);
                      break;
                    case 3:
                      F[s].fn.call(F[s].context, n, t);
                      break;
                    case 4:
                      F[s].fn.call(F[s].context, n, t, i);
                      break;
                    default:
                      if (!l)
                        for (m = 1, l = new Array(f - 1); m < f; m++)
                          l[m - 1] = arguments[m];
                      F[s].fn.apply(F[s].context, l);
                  }
              }
              return !0;
            }),
            (c.prototype.on = function (e, n, a) {
              return r(this, e, n, a, !1);
            }),
            (c.prototype.once = function (e, n, a) {
              return r(this, e, n, a, !0);
            }),
            (c.prototype.removeListener = function (e, n, t, i) {
              var r = a ? a + e : e;
              if (!this._events[r]) return this;
              if (!n) return o(this, r), this;
              var c = this._events[r];
              if (c.fn)
                c.fn !== n ||
                  (i && !c.once) ||
                  (t && c.context !== t) ||
                  o(this, r);
              else {
                for (var l = 0, s = [], F = c.length; l < F; l++)
                  (c[l].fn !== n ||
                    (i && !c[l].once) ||
                    (t && c[l].context !== t)) &&
                    s.push(c[l]);
                s.length
                  ? (this._events[r] = 1 === s.length ? s[0] : s)
                  : o(this, r);
              }
              return this;
            }),
            (c.prototype.removeAllListeners = function (e) {
              var n;
              return (
                e
                  ? ((n = a ? a + e : e), this._events[n] && o(this, n))
                  : ((this._events = new t()), (this._eventsCount = 0)),
                this
              );
            }),
            (c.prototype.off = c.prototype.removeListener),
            (c.prototype.addListener = c.prototype.on),
            (c.prefixed = a),
            (c.EventEmitter = c),
            (e.exports = c);
        })((e = { exports: {} }), e.exports),
        e.exports),
      a = "undefined" != typeof window && "undefined" != typeof document,
      t = ["Edge", "Trident", "Firefox"],
      i = 0,
      r = 0;
    r < t.length;
    r += 1
  )
    if (a && navigator.userAgent.indexOf(t[r]) >= 0) {
      i = 1;
      break;
    }
  var o =
    a && window.Promise
      ? function (e) {
          var n = !1;
          return function () {
            n ||
              ((n = !0),
              window.Promise.resolve().then(function () {
                (n = !1), e();
              }));
          };
        }
      : function (e) {
          var n = !1;
          return function () {
            n ||
              ((n = !0),
              setTimeout(function () {
                (n = !1), e();
              }, i));
          };
        };
  function c(e) {
    return e && "[object Function]" === {}.toString.call(e);
  }
  function l(e, n) {
    if (1 !== e.nodeType) return [];
    var a = e.ownerDocument.defaultView.getComputedStyle(e, null);
    return n ? a[n] : a;
  }
  function s(e) {
    return "HTML" === e.nodeName ? e : e.parentNode || e.host;
  }
  function F(e) {
    if (!e) return document.body;
    switch (e.nodeName) {
      case "HTML":
      case "BODY":
        return e.ownerDocument.body;
      case "#document":
        return e.body;
    }
    var n = l(e),
      a = n.overflow,
      t = n.overflowX,
      i = n.overflowY;
    return /(auto|scroll|overlay)/.test(a + i + t) ? e : F(s(e));
  }
  var f = a && !(!window.MSInputMethodContext || !document.documentMode),
    m = a && /MSIE 10/.test(navigator.userAgent);
  function g(e) {
    return 11 === e ? f : 10 === e ? m : f || m;
  }
  function _(e) {
    if (!e) return document.documentElement;
    for (
      var n = g(10) ? document.body : null, a = e.offsetParent || null;
      a === n && e.nextElementSibling;

    )
      a = (e = e.nextElementSibling).offsetParent;
    var t = a && a.nodeName;
    return t && "BODY" !== t && "HTML" !== t
      ? -1 !== ["TH", "TD", "TABLE"].indexOf(a.nodeName) &&
        "static" === l(a, "position")
        ? _(a)
        : a
      : e
      ? e.ownerDocument.documentElement
      : document.documentElement;
  }
  function p(e) {
    return null !== e.parentNode ? p(e.parentNode) : e;
  }
  function d(e, n) {
    if (!(e && e.nodeType && n && n.nodeType)) return document.documentElement;
    var a = e.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING,
      t = a ? e : n,
      i = a ? n : e,
      r = document.createRange();
    r.setStart(t, 0), r.setEnd(i, 0);
    var o,
      c,
      l = r.commonAncestorContainer;
    if ((e !== l && n !== l) || t.contains(i))
      return "BODY" === (c = (o = l).nodeName) ||
        ("HTML" !== c && _(o.firstElementChild) !== o)
        ? _(l)
        : l;
    var s = p(e);
    return s.host ? d(s.host, n) : d(e, p(n).host);
  }
  function u(e) {
    var n =
        "top" ===
        (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top")
          ? "scrollTop"
          : "scrollLeft",
      a = e.nodeName;
    if ("BODY" === a || "HTML" === a) {
      var t = e.ownerDocument.documentElement;
      return (e.ownerDocument.scrollingElement || t)[n];
    }
    return e[n];
  }
  function h(e, n) {
    var a = "x" === n ? "Left" : "Top",
      t = "Left" === a ? "Right" : "Bottom";
    return (
      parseFloat(e["border" + a + "Width"], 10) +
      parseFloat(e["border" + t + "Width"], 10)
    );
  }
  function w(e, n, a, t) {
    return Math.max(
      n["offset" + e],
      n["scroll" + e],
      a["client" + e],
      a["offset" + e],
      a["scroll" + e],
      g(10)
        ? parseInt(a["offset" + e]) +
            parseInt(t["margin" + ("Height" === e ? "Top" : "Left")]) +
            parseInt(t["margin" + ("Height" === e ? "Bottom" : "Right")])
        : 0
    );
  }
  function b(e) {
    var n = e.body,
      a = e.documentElement,
      t = g(10) && getComputedStyle(a);
    return { height: w("Height", n, a, t), width: w("Width", n, a, t) };
  }
  var v = function (e, n) {
      if (!(e instanceof n))
        throw new TypeError("Cannot call a class as a function");
    },
    y = (function () {
      function e(e, n) {
        for (var a = 0; a < n.length; a++) {
          var t = n[a];
          (t.enumerable = t.enumerable || !1),
            (t.configurable = !0),
            "value" in t && (t.writable = !0),
            Object.defineProperty(e, t.key, t);
        }
      }
      return function (n, a, t) {
        return a && e(n.prototype, a), t && e(n, t), n;
      };
    })(),
    k = function (e, n, a) {
      return (
        n in e
          ? Object.defineProperty(e, n, {
              value: a,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[n] = a),
        e
      );
    },
    E =
      Object.assign ||
      function (e) {
        for (var n = 1; n < arguments.length; n++) {
          var a = arguments[n];
          for (var t in a)
            Object.prototype.hasOwnProperty.call(a, t) && (e[t] = a[t]);
        }
        return e;
      };
  function C(e) {
    return E({}, e, { right: e.left + e.width, bottom: e.top + e.height });
  }
  function D(e) {
    var n = {};
    try {
      if (g(10)) {
        n = e.getBoundingClientRect();
        var a = u(e, "top"),
          t = u(e, "left");
        (n.top += a), (n.left += t), (n.bottom += a), (n.right += t);
      } else n = e.getBoundingClientRect();
    } catch (e) {}
    var i = {
        left: n.left,
        top: n.top,
        width: n.right - n.left,
        height: n.bottom - n.top,
      },
      r = "HTML" === e.nodeName ? b(e.ownerDocument) : {},
      o = r.width || e.clientWidth || i.right - i.left,
      c = r.height || e.clientHeight || i.bottom - i.top,
      s = e.offsetWidth - o,
      F = e.offsetHeight - c;
    if (s || F) {
      var f = l(e);
      (s -= h(f, "x")), (F -= h(f, "y")), (i.width -= s), (i.height -= F);
    }
    return C(i);
  }
  function x(e, n) {
    var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
      t = g(10),
      i = "HTML" === n.nodeName,
      r = D(e),
      o = D(n),
      c = F(e),
      s = l(n),
      f = parseFloat(s.borderTopWidth, 10),
      m = parseFloat(s.borderLeftWidth, 10);
    a && i && ((o.top = Math.max(o.top, 0)), (o.left = Math.max(o.left, 0)));
    var _ = C({
      top: r.top - o.top - f,
      left: r.left - o.left - m,
      width: r.width,
      height: r.height,
    });
    if (((_.marginTop = 0), (_.marginLeft = 0), !t && i)) {
      var p = parseFloat(s.marginTop, 10),
        d = parseFloat(s.marginLeft, 10);
      (_.top -= f - p),
        (_.bottom -= f - p),
        (_.left -= m - d),
        (_.right -= m - d),
        (_.marginTop = p),
        (_.marginLeft = d);
    }
    return (
      (t && !a ? n.contains(c) : n === c && "BODY" !== c.nodeName) &&
        (_ = (function (e, n) {
          var a =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            t = u(n, "top"),
            i = u(n, "left"),
            r = a ? -1 : 1;
          return (
            (e.top += t * r),
            (e.bottom += t * r),
            (e.left += i * r),
            (e.right += i * r),
            e
          );
        })(_, n)),
      _
    );
  }
  function B(e) {
    if (!e || !e.parentElement || g()) return document.documentElement;
    for (var n = e.parentElement; n && "none" === l(n, "transform"); )
      n = n.parentElement;
    return n || document.documentElement;
  }
  function j(e, n, a, t) {
    var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
      r = { top: 0, left: 0 },
      o = i ? B(e) : d(e, n);
    if ("viewport" === t)
      r = (function (e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          a = e.ownerDocument.documentElement,
          t = x(e, a),
          i = Math.max(a.clientWidth, window.innerWidth || 0),
          r = Math.max(a.clientHeight, window.innerHeight || 0),
          o = n ? 0 : u(a),
          c = n ? 0 : u(a, "left");
        return C({
          top: o - t.top + t.marginTop,
          left: c - t.left + t.marginLeft,
          width: i,
          height: r,
        });
      })(o, i);
    else {
      var c = void 0;
      "scrollParent" === t
        ? "BODY" === (c = F(s(n))).nodeName &&
          (c = e.ownerDocument.documentElement)
        : (c = "window" === t ? e.ownerDocument.documentElement : t);
      var f = x(c, o, i);
      if (
        "HTML" !== c.nodeName ||
        (function e(n) {
          var a = n.nodeName;
          if ("BODY" === a || "HTML" === a) return !1;
          if ("fixed" === l(n, "position")) return !0;
          var t = s(n);
          return !!t && e(t);
        })(o)
      )
        r = f;
      else {
        var m = b(e.ownerDocument),
          g = m.height,
          _ = m.width;
        (r.top += f.top - f.marginTop),
          (r.bottom = g + f.top),
          (r.left += f.left - f.marginLeft),
          (r.right = _ + f.left);
      }
    }
    var p = "number" == typeof (a = a || 0);
    return (
      (r.left += p ? a : a.left || 0),
      (r.top += p ? a : a.top || 0),
      (r.right -= p ? a : a.right || 0),
      (r.bottom -= p ? a : a.bottom || 0),
      r
    );
  }
  function O(e, n, a, t, i) {
    var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf("auto")) return e;
    var o = j(a, t, r, i),
      c = {
        top: { width: o.width, height: n.top - o.top },
        right: { width: o.right - n.right, height: o.height },
        bottom: { width: o.width, height: o.bottom - n.bottom },
        left: { width: n.left - o.left, height: o.height },
      },
      l = Object.keys(c)
        .map(function (e) {
          return E({ key: e }, c[e], {
            area: ((n = c[e]), n.width * n.height),
          });
          var n;
        })
        .sort(function (e, n) {
          return n.area - e.area;
        }),
      s = l.filter(function (e) {
        var n = e.width,
          t = e.height;
        return n >= a.clientWidth && t >= a.clientHeight;
      }),
      F = s.length > 0 ? s[0].key : l[0].key,
      f = e.split("-")[1];
    return F + (f ? "-" + f : "");
  }
  function z(e, n, a) {
    var t =
      arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
    return x(a, t ? B(n) : d(n, a), t);
  }
  function M(e) {
    var n = e.ownerDocument.defaultView.getComputedStyle(e),
      a = parseFloat(n.marginTop || 0) + parseFloat(n.marginBottom || 0),
      t = parseFloat(n.marginLeft || 0) + parseFloat(n.marginRight || 0);
    return { width: e.offsetWidth + t, height: e.offsetHeight + a };
  }
  function L(e) {
    var n = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return n[e];
    });
  }
  function N(e, n, a) {
    a = a.split("-")[0];
    var t = M(e),
      i = { width: t.width, height: t.height },
      r = -1 !== ["right", "left"].indexOf(a),
      o = r ? "top" : "left",
      c = r ? "left" : "top",
      l = r ? "height" : "width",
      s = r ? "width" : "height";
    return (
      (i[o] = n[o] + n[l] / 2 - t[l] / 2),
      (i[c] = a === c ? n[c] - t[s] : n[L(c)]),
      i
    );
  }
  function T(e, n) {
    return Array.prototype.find ? e.find(n) : e.filter(n)[0];
  }
  function S(e, n, a) {
    return (
      (void 0 === a
        ? e
        : e.slice(
            0,
            (function (e, n, a) {
              if (Array.prototype.findIndex)
                return e.findIndex(function (e) {
                  return e[n] === a;
                });
              var t = T(e, function (e) {
                return e[n] === a;
              });
              return e.indexOf(t);
            })(e, "name", a)
          )
      ).forEach(function (e) {
        e.function &&
          console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
        var a = e.function || e.fn;
        e.enabled &&
          c(a) &&
          ((n.offsets.popper = C(n.offsets.popper)),
          (n.offsets.reference = C(n.offsets.reference)),
          (n = a(n, e)));
      }),
      n
    );
  }
  function P(e, n) {
    return e.some(function (e) {
      var a = e.name;
      return e.enabled && a === n;
    });
  }
  function A(e) {
    for (
      var n = [!1, "ms", "Webkit", "Moz", "O"],
        a = e.charAt(0).toUpperCase() + e.slice(1),
        t = 0;
      t < n.length;
      t++
    ) {
      var i = n[t],
        r = i ? "" + i + a : e;
      if (void 0 !== document.body.style[r]) return r;
    }
    return null;
  }
  function H(e) {
    var n = e.ownerDocument;
    return n ? n.defaultView : window;
  }
  function I(e, n, a, t) {
    (a.updateBound = t),
      H(e).addEventListener("resize", a.updateBound, { passive: !0 });
    var i = F(e);
    return (
      (function e(n, a, t, i) {
        var r = "BODY" === n.nodeName,
          o = r ? n.ownerDocument.defaultView : n;
        o.addEventListener(a, t, { passive: !0 }),
          r || e(F(o.parentNode), a, t, i),
          i.push(o);
      })(i, "scroll", a.updateBound, a.scrollParents),
      (a.scrollElement = i),
      (a.eventsEnabled = !0),
      a
    );
  }
  function W() {
    var e, n;
    this.state.eventsEnabled &&
      (cancelAnimationFrame(this.scheduleUpdate),
      (this.state =
        ((e = this.reference),
        (n = this.state),
        H(e).removeEventListener("resize", n.updateBound),
        n.scrollParents.forEach(function (e) {
          e.removeEventListener("scroll", n.updateBound);
        }),
        (n.updateBound = null),
        (n.scrollParents = []),
        (n.scrollElement = null),
        (n.eventsEnabled = !1),
        n)));
  }
  function q(e) {
    return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }
  function R(e, n) {
    Object.keys(n).forEach(function (a) {
      var t = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(a) &&
        q(n[a]) &&
        (t = "px"),
        (e.style[a] = n[a] + t);
    });
  }
  var V = a && /Firefox/i.test(navigator.userAgent);
  function U(e, n, a) {
    var t = T(e, function (e) {
        return e.name === n;
      }),
      i =
        !!t &&
        e.some(function (e) {
          return e.name === a && e.enabled && e.order < t.order;
        });
    if (!i) {
      var r = "`" + n + "`",
        o = "`" + a + "`";
      console.warn(
        o +
          " modifier is required by " +
          r +
          " modifier in order to work, be sure to include it before " +
          r +
          "!"
      );
    }
    return i;
  }
  var Y = [
      "auto-start",
      "auto",
      "auto-end",
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-end",
      "bottom",
      "bottom-start",
      "left-end",
      "left",
      "left-start",
    ],
    X = Y.slice(3);
  function G(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      a = X.indexOf(e),
      t = X.slice(a + 1).concat(X.slice(0, a));
    return n ? t.reverse() : t;
  }
  var K = {
    FLIP: "flip",
    CLOCKWISE: "clockwise",
    COUNTERCLOCKWISE: "counterclockwise",
  };
  function J(e, n, a, t) {
    var i = [0, 0],
      r = -1 !== ["right", "left"].indexOf(t),
      o = e.split(/(\+|\-)/).map(function (e) {
        return e.trim();
      }),
      c = o.indexOf(
        T(o, function (e) {
          return -1 !== e.search(/,|\s/);
        })
      );
    o[c] &&
      -1 === o[c].indexOf(",") &&
      console.warn(
        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
      );
    var l = /\s*,\s*|\s+/,
      s =
        -1 !== c
          ? [
              o.slice(0, c).concat([o[c].split(l)[0]]),
              [o[c].split(l)[1]].concat(o.slice(c + 1)),
            ]
          : [o];
    return (
      (s = s.map(function (e, t) {
        var i = (1 === t ? !r : r) ? "height" : "width",
          o = !1;
        return e
          .reduce(function (e, n) {
            return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(n)
              ? ((e[e.length - 1] = n), (o = !0), e)
              : o
              ? ((e[e.length - 1] += n), (o = !1), e)
              : e.concat(n);
          }, [])
          .map(function (e) {
            return (function (e, n, a, t) {
              var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                r = +i[1],
                o = i[2];
              if (!r) return e;
              if (0 === o.indexOf("%")) {
                var c = void 0;
                switch (o) {
                  case "%p":
                    c = a;
                    break;
                  case "%":
                  case "%r":
                  default:
                    c = t;
                }
                return (C(c)[n] / 100) * r;
              }
              if ("vh" === o || "vw" === o)
                return (
                  (("vh" === o
                    ? Math.max(
                        document.documentElement.clientHeight,
                        window.innerHeight || 0
                      )
                    : Math.max(
                        document.documentElement.clientWidth,
                        window.innerWidth || 0
                      )) /
                    100) *
                  r
                );
              return r;
            })(e, i, n, a);
          });
      })).forEach(function (e, n) {
        e.forEach(function (a, t) {
          q(a) && (i[n] += a * ("-" === e[t - 1] ? -1 : 1));
        });
      }),
      i
    );
  }
  var Q = {
      placement: "bottom",
      positionFixed: !1,
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function () {},
      onUpdate: function () {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn: function (e) {
            var n = e.placement,
              a = n.split("-")[0],
              t = n.split("-")[1];
            if (t) {
              var i = e.offsets,
                r = i.reference,
                o = i.popper,
                c = -1 !== ["bottom", "top"].indexOf(a),
                l = c ? "left" : "top",
                s = c ? "width" : "height",
                F = {
                  start: k({}, l, r[l]),
                  end: k({}, l, r[l] + r[s] - o[s]),
                };
              e.offsets.popper = E({}, o, F[t]);
            }
            return e;
          },
        },
        offset: {
          order: 200,
          enabled: !0,
          fn: function (e, n) {
            var a = n.offset,
              t = e.placement,
              i = e.offsets,
              r = i.popper,
              o = i.reference,
              c = t.split("-")[0],
              l = void 0;
            return (
              (l = q(+a) ? [+a, 0] : J(a, r, o, c)),
              "left" === c
                ? ((r.top += l[0]), (r.left -= l[1]))
                : "right" === c
                ? ((r.top += l[0]), (r.left += l[1]))
                : "top" === c
                ? ((r.left += l[0]), (r.top -= l[1]))
                : "bottom" === c && ((r.left += l[0]), (r.top += l[1])),
              (e.popper = r),
              e
            );
          },
          offset: 0,
        },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function (e, n) {
            var a = n.boundariesElement || _(e.instance.popper);
            e.instance.reference === a && (a = _(a));
            var t = A("transform"),
              i = e.instance.popper.style,
              r = i.top,
              o = i.left,
              c = i[t];
            (i.top = ""), (i.left = ""), (i[t] = "");
            var l = j(
              e.instance.popper,
              e.instance.reference,
              n.padding,
              a,
              e.positionFixed
            );
            (i.top = r), (i.left = o), (i[t] = c), (n.boundaries = l);
            var s = n.priority,
              F = e.offsets.popper,
              f = {
                primary: function (e) {
                  var a = F[e];
                  return (
                    F[e] < l[e] &&
                      !n.escapeWithReference &&
                      (a = Math.max(F[e], l[e])),
                    k({}, e, a)
                  );
                },
                secondary: function (e) {
                  var a = "right" === e ? "left" : "top",
                    t = F[a];
                  return (
                    F[e] > l[e] &&
                      !n.escapeWithReference &&
                      (t = Math.min(
                        F[a],
                        l[e] - ("right" === e ? F.width : F.height)
                      )),
                    k({}, a, t)
                  );
                },
              };
            return (
              s.forEach(function (e) {
                var n =
                  -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
                F = E({}, F, f[n](e));
              }),
              (e.offsets.popper = F),
              e
            );
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent",
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function (e) {
            var n = e.offsets,
              a = n.popper,
              t = n.reference,
              i = e.placement.split("-")[0],
              r = Math.floor,
              o = -1 !== ["top", "bottom"].indexOf(i),
              c = o ? "right" : "bottom",
              l = o ? "left" : "top",
              s = o ? "width" : "height";
            return (
              a[c] < r(t[l]) && (e.offsets.popper[l] = r(t[l]) - a[s]),
              a[l] > r(t[c]) && (e.offsets.popper[l] = r(t[c])),
              e
            );
          },
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function (e, n) {
            var a;
            if (!U(e.instance.modifiers, "arrow", "keepTogether")) return e;
            var t = n.element;
            if ("string" == typeof t) {
              if (!(t = e.instance.popper.querySelector(t))) return e;
            } else if (!e.instance.popper.contains(t))
              return (
                console.warn(
                  "WARNING: `arrow.element` must be child of its popper element!"
                ),
                e
              );
            var i = e.placement.split("-")[0],
              r = e.offsets,
              o = r.popper,
              c = r.reference,
              s = -1 !== ["left", "right"].indexOf(i),
              F = s ? "height" : "width",
              f = s ? "Top" : "Left",
              m = f.toLowerCase(),
              g = s ? "left" : "top",
              _ = s ? "bottom" : "right",
              p = M(t)[F];
            c[_] - p < o[m] && (e.offsets.popper[m] -= o[m] - (c[_] - p)),
              c[m] + p > o[_] && (e.offsets.popper[m] += c[m] + p - o[_]),
              (e.offsets.popper = C(e.offsets.popper));
            var d = c[m] + c[F] / 2 - p / 2,
              u = l(e.instance.popper),
              h = parseFloat(u["margin" + f], 10),
              w = parseFloat(u["border" + f + "Width"], 10),
              b = d - e.offsets.popper[m] - h - w;
            return (
              (b = Math.max(Math.min(o[F] - p, b), 0)),
              (e.arrowElement = t),
              (e.offsets.arrow =
                (k((a = {}), m, Math.round(b)), k(a, g, ""), a)),
              e
            );
          },
          element: "[x-arrow]",
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function (e, n) {
            if (P(e.instance.modifiers, "inner")) return e;
            if (e.flipped && e.placement === e.originalPlacement) return e;
            var a = j(
                e.instance.popper,
                e.instance.reference,
                n.padding,
                n.boundariesElement,
                e.positionFixed
              ),
              t = e.placement.split("-")[0],
              i = L(t),
              r = e.placement.split("-")[1] || "",
              o = [];
            switch (n.behavior) {
              case K.FLIP:
                o = [t, i];
                break;
              case K.CLOCKWISE:
                o = G(t);
                break;
              case K.COUNTERCLOCKWISE:
                o = G(t, !0);
                break;
              default:
                o = n.behavior;
            }
            return (
              o.forEach(function (c, l) {
                if (t !== c || o.length === l + 1) return e;
                (t = e.placement.split("-")[0]), (i = L(t));
                var s = e.offsets.popper,
                  F = e.offsets.reference,
                  f = Math.floor,
                  m =
                    ("left" === t && f(s.right) > f(F.left)) ||
                    ("right" === t && f(s.left) < f(F.right)) ||
                    ("top" === t && f(s.bottom) > f(F.top)) ||
                    ("bottom" === t && f(s.top) < f(F.bottom)),
                  g = f(s.left) < f(a.left),
                  _ = f(s.right) > f(a.right),
                  p = f(s.top) < f(a.top),
                  d = f(s.bottom) > f(a.bottom),
                  u =
                    ("left" === t && g) ||
                    ("right" === t && _) ||
                    ("top" === t && p) ||
                    ("bottom" === t && d),
                  h = -1 !== ["top", "bottom"].indexOf(t),
                  w =
                    !!n.flipVariations &&
                    ((h && "start" === r && g) ||
                      (h && "end" === r && _) ||
                      (!h && "start" === r && p) ||
                      (!h && "end" === r && d)),
                  b =
                    !!n.flipVariationsByContent &&
                    ((h && "start" === r && _) ||
                      (h && "end" === r && g) ||
                      (!h && "start" === r && d) ||
                      (!h && "end" === r && p)),
                  v = w || b;
                (m || u || v) &&
                  ((e.flipped = !0),
                  (m || u) && (t = o[l + 1]),
                  v &&
                    (r = (function (e) {
                      return "end" === e ? "start" : "start" === e ? "end" : e;
                    })(r)),
                  (e.placement = t + (r ? "-" + r : "")),
                  (e.offsets.popper = E(
                    {},
                    e.offsets.popper,
                    N(e.instance.popper, e.offsets.reference, e.placement)
                  )),
                  (e = S(e.instance.modifiers, e, "flip")));
              }),
              e
            );
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
          flipVariations: !1,
          flipVariationsByContent: !1,
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function (e) {
            var n = e.placement,
              a = n.split("-")[0],
              t = e.offsets,
              i = t.popper,
              r = t.reference,
              o = -1 !== ["left", "right"].indexOf(a),
              c = -1 === ["top", "left"].indexOf(a);
            return (
              (i[o ? "left" : "top"] =
                r[a] - (c ? i[o ? "width" : "height"] : 0)),
              (e.placement = L(n)),
              (e.offsets.popper = C(i)),
              e
            );
          },
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function (e) {
            if (!U(e.instance.modifiers, "hide", "preventOverflow")) return e;
            var n = e.offsets.reference,
              a = T(e.instance.modifiers, function (e) {
                return "preventOverflow" === e.name;
              }).boundaries;
            if (
              n.bottom < a.top ||
              n.left > a.right ||
              n.top > a.bottom ||
              n.right < a.left
            ) {
              if (!0 === e.hide) return e;
              (e.hide = !0), (e.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === e.hide) return e;
              (e.hide = !1), (e.attributes["x-out-of-boundaries"] = !1);
            }
            return e;
          },
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function (e, n) {
            var a = n.x,
              t = n.y,
              i = e.offsets.popper,
              r = T(e.instance.modifiers, function (e) {
                return "applyStyle" === e.name;
              }).gpuAcceleration;
            void 0 !== r &&
              console.warn(
                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
              );
            var o = void 0 !== r ? r : n.gpuAcceleration,
              c = _(e.instance.popper),
              l = D(c),
              s = { position: i.position },
              F = (function (e, n) {
                var a = e.offsets,
                  t = a.popper,
                  i = a.reference,
                  r = Math.round,
                  o = Math.floor,
                  c = function (e) {
                    return e;
                  },
                  l = r(i.width),
                  s = r(t.width),
                  F = -1 !== ["left", "right"].indexOf(e.placement),
                  f = -1 !== e.placement.indexOf("-"),
                  m = n ? (F || f || l % 2 == s % 2 ? r : o) : c,
                  g = n ? r : c;
                return {
                  left: m(
                    l % 2 == 1 && s % 2 == 1 && !f && n ? t.left - 1 : t.left
                  ),
                  top: g(t.top),
                  bottom: g(t.bottom),
                  right: m(t.right),
                };
              })(e, window.devicePixelRatio < 2 || !V),
              f = "bottom" === a ? "top" : "bottom",
              m = "right" === t ? "left" : "right",
              g = A("transform"),
              p = void 0,
              d = void 0;
            if (
              ((d =
                "bottom" === f
                  ? "HTML" === c.nodeName
                    ? -c.clientHeight + F.bottom
                    : -l.height + F.bottom
                  : F.top),
              (p =
                "right" === m
                  ? "HTML" === c.nodeName
                    ? -c.clientWidth + F.right
                    : -l.width + F.right
                  : F.left),
              o && g)
            )
              (s[g] = "translate3d(" + p + "px, " + d + "px, 0)"),
                (s[f] = 0),
                (s[m] = 0),
                (s.willChange = "transform");
            else {
              var u = "bottom" === f ? -1 : 1,
                h = "right" === m ? -1 : 1;
              (s[f] = d * u), (s[m] = p * h), (s.willChange = f + ", " + m);
            }
            var w = { "x-placement": e.placement };
            return (
              (e.attributes = E({}, w, e.attributes)),
              (e.styles = E({}, s, e.styles)),
              (e.arrowStyles = E({}, e.offsets.arrow, e.arrowStyles)),
              e
            );
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right",
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function (e) {
            var n, a;
            return (
              R(e.instance.popper, e.styles),
              (n = e.instance.popper),
              (a = e.attributes),
              Object.keys(a).forEach(function (e) {
                !1 !== a[e] ? n.setAttribute(e, a[e]) : n.removeAttribute(e);
              }),
              e.arrowElement &&
                Object.keys(e.arrowStyles).length &&
                R(e.arrowElement, e.arrowStyles),
              e
            );
          },
          onLoad: function (e, n, a, t, i) {
            var r = z(i, n, e, a.positionFixed),
              o = O(
                a.placement,
                r,
                n,
                e,
                a.modifiers.flip.boundariesElement,
                a.modifiers.flip.padding
              );
            return (
              n.setAttribute("x-placement", o),
              R(n, { position: a.positionFixed ? "fixed" : "absolute" }),
              a
            );
          },
          gpuAcceleration: void 0,
        },
      },
    },
    Z = (function () {
      function e(n, a) {
        var t = this,
          i =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        v(this, e),
          (this.scheduleUpdate = function () {
            return requestAnimationFrame(t.update);
          }),
          (this.update = o(this.update.bind(this))),
          (this.options = E({}, e.Defaults, i)),
          (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
          (this.reference = n && n.jquery ? n[0] : n),
          (this.popper = a && a.jquery ? a[0] : a),
          (this.options.modifiers = {}),
          Object.keys(E({}, e.Defaults.modifiers, i.modifiers)).forEach(
            function (n) {
              t.options.modifiers[n] = E(
                {},
                e.Defaults.modifiers[n] || {},
                i.modifiers ? i.modifiers[n] : {}
              );
            }
          ),
          (this.modifiers = Object.keys(this.options.modifiers)
            .map(function (e) {
              return E({ name: e }, t.options.modifiers[e]);
            })
            .sort(function (e, n) {
              return e.order - n.order;
            })),
          this.modifiers.forEach(function (e) {
            e.enabled &&
              c(e.onLoad) &&
              e.onLoad(t.reference, t.popper, t.options, e, t.state);
          }),
          this.update();
        var r = this.options.eventsEnabled;
        r && this.enableEventListeners(), (this.state.eventsEnabled = r);
      }
      return (
        y(e, [
          {
            key: "update",
            value: function () {
              return function () {
                if (!this.state.isDestroyed) {
                  var e = {
                    instance: this,
                    styles: {},
                    arrowStyles: {},
                    attributes: {},
                    flipped: !1,
                    offsets: {},
                  };
                  (e.offsets.reference = z(
                    this.state,
                    this.popper,
                    this.reference,
                    this.options.positionFixed
                  )),
                    (e.placement = O(
                      this.options.placement,
                      e.offsets.reference,
                      this.popper,
                      this.reference,
                      this.options.modifiers.flip.boundariesElement,
                      this.options.modifiers.flip.padding
                    )),
                    (e.originalPlacement = e.placement),
                    (e.positionFixed = this.options.positionFixed),
                    (e.offsets.popper = N(
                      this.popper,
                      e.offsets.reference,
                      e.placement
                    )),
                    (e.offsets.popper.position = this.options.positionFixed
                      ? "fixed"
                      : "absolute"),
                    (e = S(this.modifiers, e)),
                    this.state.isCreated
                      ? this.options.onUpdate(e)
                      : ((this.state.isCreated = !0), this.options.onCreate(e));
                }
              }.call(this);
            },
          },
          {
            key: "destroy",
            value: function () {
              return function () {
                return (
                  (this.state.isDestroyed = !0),
                  P(this.modifiers, "applyStyle") &&
                    (this.popper.removeAttribute("x-placement"),
                    (this.popper.style.position = ""),
                    (this.popper.style.top = ""),
                    (this.popper.style.left = ""),
                    (this.popper.style.right = ""),
                    (this.popper.style.bottom = ""),
                    (this.popper.style.willChange = ""),
                    (this.popper.style[A("transform")] = "")),
                  this.disableEventListeners(),
                  this.options.removeOnDestroy &&
                    this.popper.parentNode.removeChild(this.popper),
                  this
                );
              }.call(this);
            },
          },
          {
            key: "enableEventListeners",
            value: function () {
              return function () {
                this.state.eventsEnabled ||
                  (this.state = I(
                    this.reference,
                    this.options,
                    this.state,
                    this.scheduleUpdate
                  ));
              }.call(this);
            },
          },
          {
            key: "disableEventListeners",
            value: function () {
              return W.call(this);
            },
          },
        ]),
        e
      );
    })();
  (Z.Utils = ("undefined" != typeof window ? window : global).PopperUtils),
    (Z.placements = Y),
    (Z.Defaults = Q);
  var $ = "hidePicker",
    ee = "emoji",
    ne = "showTabs",
    ae = "hideTabs",
    te = "showSearchResults",
    ie = "showPreview",
    re = "hidePreview";
  function oe(e, n) {
    for (var a = 0; a < n.length; a++) {
      var t = n[a];
      (t.enumerable = t.enumerable || !1),
        (t.configurable = !0),
        "value" in t && (t.writable = !0),
        Object.defineProperty(e, t.key, t);
    }
  }
  function ce(e, n, a) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = a),
      e
    );
  }
  function le(e) {
    for (var n = 1; n < arguments.length; n++) {
      var a = null != arguments[n] ? arguments[n] : {},
        t = Object.keys(a);
      "function" == typeof Object.getOwnPropertySymbols &&
        (t = t.concat(
          Object.getOwnPropertySymbols(a).filter(function (e) {
            return Object.getOwnPropertyDescriptor(a, e).enumerable;
          })
        )),
        t.forEach(function (n) {
          ce(e, n, a[n]);
        });
    }
    return e;
  }
  function se(e, n) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, n) {
        var a = [],
          t = !0,
          i = !1,
          r = void 0;
        try {
          for (
            var o, c = e[Symbol.iterator]();
            !(t = (o = c.next()).done) &&
            (a.push(o.value), !n || a.length !== n);
            t = !0
          );
        } catch (e) {
          (i = !0), (r = e);
        } finally {
          try {
            t || null == c.return || c.return();
          } finally {
            if (i) throw r;
          }
        }
        return a;
      })(e, n) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      })()
    );
  }
  var Fe = function () {},
    fe = {},
    me = {},
    ge = { mark: Fe, measure: Fe };
  try {
    "undefined" != typeof window && (fe = window),
      "undefined" != typeof document && (me = document),
      "undefined" != typeof MutationObserver && MutationObserver,
      "undefined" != typeof performance && (ge = performance);
  } catch (e) {}
  var _e = (fe.navigator || {}).userAgent,
    pe = void 0 === _e ? "" : _e,
    de = fe,
    ue = me,
    he = ge,
    we =
      (de.document,
      !!ue.documentElement &&
        !!ue.head &&
        "function" == typeof ue.addEventListener &&
        "function" == typeof ue.createElement),
    be = (~pe.indexOf("MSIE") || pe.indexOf("Trident/"), "fa"),
    ve = "svg-inline--fa",
    ye = "data-fa-i2svg",
    ke =
      ((function () {
        try {
          process.env.NODE_ENV;
        } catch (e) {
          return !1;
        }
      })(),
      {
        GROUP: "group",
        SWAP_OPACITY: "swap-opacity",
        PRIMARY: "primary",
        SECONDARY: "secondary",
      }),
    Ee = de.FontAwesomeConfig || {};
  if (ue && "function" == typeof ue.querySelector) {
    [
      ["data-family-prefix", "familyPrefix"],
      ["data-replacement-class", "replacementClass"],
      ["data-auto-replace-svg", "autoReplaceSvg"],
      ["data-auto-add-css", "autoAddCss"],
      ["data-auto-a11y", "autoA11y"],
      ["data-search-pseudo-elements", "searchPseudoElements"],
      ["data-observe-mutations", "observeMutations"],
      ["data-mutate-approach", "mutateApproach"],
      ["data-keep-original-source", "keepOriginalSource"],
      ["data-measure-performance", "measurePerformance"],
      ["data-show-missing-icons", "showMissingIcons"],
    ].forEach(function (e) {
      var n = se(e, 2),
        a = n[0],
        t = n[1],
        i = (function (e) {
          return "" === e || ("false" !== e && ("true" === e || e));
        })(
          (function (e) {
            var n = ue.querySelector("script[" + e + "]");
            if (n) return n.getAttribute(e);
          })(a)
        );
      null != i && (Ee[t] = i);
    });
  }
  var Ce = le(
    {},
    {
      familyPrefix: be,
      replacementClass: ve,
      autoReplaceSvg: !0,
      autoAddCss: !0,
      autoA11y: !0,
      searchPseudoElements: !1,
      observeMutations: !0,
      mutateApproach: "async",
      keepOriginalSource: !0,
      measurePerformance: !1,
      showMissingIcons: !0,
    },
    Ee
  );
  Ce.autoReplaceSvg || (Ce.observeMutations = !1);
  var De = le({}, Ce);
  de.FontAwesomeConfig = De;
  var xe = de || {};
  xe.___FONT_AWESOME___ || (xe.___FONT_AWESOME___ = {}),
    xe.___FONT_AWESOME___.styles || (xe.___FONT_AWESOME___.styles = {}),
    xe.___FONT_AWESOME___.hooks || (xe.___FONT_AWESOME___.hooks = {}),
    xe.___FONT_AWESOME___.shims || (xe.___FONT_AWESOME___.shims = []);
  var Be = xe.___FONT_AWESOME___,
    je = [];
  we &&
    ((ue.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(
      ue.readyState
    ) ||
      ue.addEventListener("DOMContentLoaded", function e() {
        ue.removeEventListener("DOMContentLoaded", e),
          1,
          je.map(function (e) {
            return e();
          });
      }));
  "undefined" != typeof global &&
    void 0 !== global.process &&
    global.process.emit;
  var Oe = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
  var ze = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  function Me() {
    for (var e = 12, n = ""; e-- > 0; ) n += ze[(62 * Math.random()) | 0];
    return n;
  }
  function Le(e) {
    return ""
      .concat(e)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function Ne(e) {
    return Object.keys(e || {}).reduce(function (n, a) {
      return n + "".concat(a, ": ").concat(e[a], ";");
    }, "");
  }
  function Te(e) {
    return (
      e.size !== Oe.size ||
      e.x !== Oe.x ||
      e.y !== Oe.y ||
      e.rotate !== Oe.rotate ||
      e.flipX ||
      e.flipY
    );
  }
  function Se(e) {
    var n = e.transform,
      a = e.containerWidth,
      t = e.iconWidth,
      i = { transform: "translate(".concat(a / 2, " 256)") },
      r = "translate(".concat(32 * n.x, ", ").concat(32 * n.y, ") "),
      o = "scale("
        .concat((n.size / 16) * (n.flipX ? -1 : 1), ", ")
        .concat((n.size / 16) * (n.flipY ? -1 : 1), ") "),
      c = "rotate(".concat(n.rotate, " 0 0)");
    return {
      outer: i,
      inner: { transform: "".concat(r, " ").concat(o, " ").concat(c) },
      path: { transform: "translate(".concat((t / 2) * -1, " -256)") },
    };
  }
  var Pe = { x: 0, y: 0, width: "100%", height: "100%" };
  function Ae(e) {
    var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return (
      e.attributes && (e.attributes.fill || n) && (e.attributes.fill = "black"),
      e
    );
  }
  function He(e) {
    var n = e.icons,
      a = n.main,
      t = n.mask,
      i = e.prefix,
      r = e.iconName,
      o = e.transform,
      c = e.symbol,
      l = e.title,
      s = e.extra,
      F = e.watchable,
      f = void 0 !== F && F,
      m = t.found ? t : a,
      g = m.width,
      _ = m.height,
      p = "fa-w-".concat(Math.ceil((g / _) * 16)),
      d = [
        De.replacementClass,
        r ? "".concat(De.familyPrefix, "-").concat(r) : "",
        p,
      ]
        .filter(function (e) {
          return -1 === s.classes.indexOf(e);
        })
        .concat(s.classes)
        .join(" "),
      u = {
        children: [],
        attributes: le({}, s.attributes, {
          "data-prefix": i,
          "data-icon": r,
          class: d,
          role: s.attributes.role || "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 ".concat(g, " ").concat(_),
        }),
      };
    f && (u.attributes[ye] = ""),
      l &&
        u.children.push({
          tag: "title",
          attributes: {
            id: u.attributes["aria-labelledby"] || "title-".concat(Me()),
          },
          children: [l],
        });
    var h = le({}, u, {
        prefix: i,
        iconName: r,
        main: a,
        mask: t,
        transform: o,
        symbol: c,
        styles: s.styles,
      }),
      w =
        t.found && a.found
          ? (function (e) {
              var n,
                a = e.children,
                t = e.attributes,
                i = e.main,
                r = e.mask,
                o = e.transform,
                c = i.width,
                l = i.icon,
                s = r.width,
                F = r.icon,
                f = Se({ transform: o, containerWidth: s, iconWidth: c }),
                m = { tag: "rect", attributes: le({}, Pe, { fill: "white" }) },
                g = l.children ? { children: l.children.map(Ae) } : {},
                _ = {
                  tag: "g",
                  attributes: le({}, f.inner),
                  children: [
                    Ae(
                      le(
                        {
                          tag: l.tag,
                          attributes: le({}, l.attributes, f.path),
                        },
                        g
                      )
                    ),
                  ],
                },
                p = { tag: "g", attributes: le({}, f.outer), children: [_] },
                d = "mask-".concat(Me()),
                u = "clip-".concat(Me()),
                h = {
                  tag: "mask",
                  attributes: le({}, Pe, {
                    id: d,
                    maskUnits: "userSpaceOnUse",
                    maskContentUnits: "userSpaceOnUse",
                  }),
                  children: [m, p],
                },
                w = {
                  tag: "defs",
                  children: [
                    {
                      tag: "clipPath",
                      attributes: { id: u },
                      children: ((n = F), "g" === n.tag ? n.children : [n]),
                    },
                    h,
                  ],
                };
              return (
                a.push(w, {
                  tag: "rect",
                  attributes: le(
                    {
                      fill: "currentColor",
                      "clip-path": "url(#".concat(u, ")"),
                      mask: "url(#".concat(d, ")"),
                    },
                    Pe
                  ),
                }),
                { children: a, attributes: t }
              );
            })(h)
          : (function (e) {
              var n = e.children,
                a = e.attributes,
                t = e.main,
                i = e.transform,
                r = Ne(e.styles);
              if ((r.length > 0 && (a.style = r), Te(i))) {
                var o = Se({
                  transform: i,
                  containerWidth: t.width,
                  iconWidth: t.width,
                });
                n.push({
                  tag: "g",
                  attributes: le({}, o.outer),
                  children: [
                    {
                      tag: "g",
                      attributes: le({}, o.inner),
                      children: [
                        {
                          tag: t.icon.tag,
                          children: t.icon.children,
                          attributes: le({}, t.icon.attributes, o.path),
                        },
                      ],
                    },
                  ],
                });
              } else n.push(t.icon);
              return { children: n, attributes: a };
            })(h),
      b = w.children,
      v = w.attributes;
    return (
      (h.children = b),
      (h.attributes = v),
      c
        ? (function (e) {
            var n = e.prefix,
              a = e.iconName,
              t = e.children,
              i = e.attributes,
              r = e.symbol;
            return [
              {
                tag: "svg",
                attributes: { style: "display: none;" },
                children: [
                  {
                    tag: "symbol",
                    attributes: le({}, i, {
                      id:
                        !0 === r
                          ? ""
                              .concat(n, "-")
                              .concat(De.familyPrefix, "-")
                              .concat(a)
                          : r,
                    }),
                    children: t,
                  },
                ],
              },
            ];
          })(h)
        : (function (e) {
            var n = e.children,
              a = e.main,
              t = e.mask,
              i = e.attributes,
              r = e.styles,
              o = e.transform;
            if (Te(o) && a.found && !t.found) {
              var c = { x: a.width / a.height / 2, y: 0.5 };
              i.style = Ne(
                le({}, r, {
                  "transform-origin": ""
                    .concat(c.x + o.x / 16, "em ")
                    .concat(c.y + o.y / 16, "em"),
                })
              );
            }
            return [{ tag: "svg", attributes: i, children: n }];
          })(h)
    );
  }
  var Ie = function () {},
    We =
      (De.measurePerformance && he && he.mark && he.measure,
      function (e, n, a, t) {
        var i,
          r,
          o,
          c = Object.keys(e),
          l = c.length,
          s =
            void 0 !== t
              ? (function (e, n) {
                  return function (a, t, i, r) {
                    return e.call(n, a, t, i, r);
                  };
                })(n, t)
              : n;
        for (
          void 0 === a ? ((i = 1), (o = e[c[0]])) : ((i = 0), (o = a));
          i < l;
          i++
        )
          o = s(o, e[(r = c[i])], r, e);
        return o;
      });
  var qe = Be.styles,
    Re = Be.shims,
    Ve = function () {
      var e = function (e) {
        return We(
          qe,
          function (n, a, t) {
            return (n[t] = We(a, e, {})), n;
          },
          {}
        );
      };
      e(function (e, n, a) {
        return n[3] && (e[n[3]] = a), e;
      }),
        e(function (e, n, a) {
          var t = n[2];
          return (
            (e[a] = a),
            t.forEach(function (n) {
              e[n] = a;
            }),
            e
          );
        });
      var n = "far" in qe;
      We(
        Re,
        function (e, a) {
          var t = a[0],
            i = a[1],
            r = a[2];
          return (
            "far" !== i || n || (i = "fas"),
            (e[t] = { prefix: i, iconName: r }),
            e
          );
        },
        {}
      );
    };
  Ve();
  Be.styles;
  function Ue(e, n, a) {
    if (e && e[n] && e[n][a]) return { prefix: n, iconName: a, icon: e[n][a] };
  }
  function Ye(e) {
    var n = e.tag,
      a = e.attributes,
      t = void 0 === a ? {} : a,
      i = e.children,
      r = void 0 === i ? [] : i;
    return "string" == typeof e
      ? Le(e)
      : "<"
          .concat(n, " ")
          .concat(
            (function (e) {
              return Object.keys(e || {})
                .reduce(function (n, a) {
                  return n + "".concat(a, '="').concat(Le(e[a]), '" ');
                }, "")
                .trim();
            })(t),
            ">"
          )
          .concat(r.map(Ye).join(""), "</")
          .concat(n, ">");
  }
  function Xe(e) {
    (this.name = "MissingIcon"),
      (this.message = e || "Icon unavailable"),
      (this.stack = new Error().stack);
  }
  (Xe.prototype = Object.create(Error.prototype)),
    (Xe.prototype.constructor = Xe);
  var Ge = { fill: "currentColor" },
    Ke = { attributeType: "XML", repeatCount: "indefinite", dur: "2s" },
    Je =
      (le({}, Ge, {
        d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z",
      }),
      le({}, Ke, { attributeName: "opacity" }));
  le({}, Ge, { cx: "256", cy: "364", r: "28" }),
    le({}, Ke, { attributeName: "r", values: "28;14;28;28;14;28;" }),
    le({}, Je, { values: "1;0;1;1;0;1;" }),
    le({}, Ge, {
      opacity: "1",
      d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z",
    }),
    le({}, Je, { values: "1;0;0;0;0;1;" }),
    le({}, Ge, {
      opacity: "0",
      d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z",
    }),
    le({}, Je, { values: "0;0;1;1;0;0;" }),
    Be.styles;
  function Qe(e) {
    var n = e[0],
      a = e[1],
      t = se(e.slice(4), 1)[0];
    return {
      found: !0,
      width: n,
      height: a,
      icon: Array.isArray(t)
        ? {
            tag: "g",
            attributes: {
              class: "".concat(De.familyPrefix, "-").concat(ke.GROUP),
            },
            children: [
              {
                tag: "path",
                attributes: {
                  class: "".concat(De.familyPrefix, "-").concat(ke.SECONDARY),
                  fill: "currentColor",
                  d: t[0],
                },
              },
              {
                tag: "path",
                attributes: {
                  class: "".concat(De.familyPrefix, "-").concat(ke.PRIMARY),
                  fill: "currentColor",
                  d: t[1],
                },
              },
            ],
          }
        : { tag: "path", attributes: { fill: "currentColor", d: t } },
    };
  }
  Be.styles;
  var Ze =
    'svg:not(:root).svg-inline--fa {\n  overflow: visible;\n}\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.225em;\n}\n.svg-inline--fa.fa-w-1 {\n  width: 0.0625em;\n}\n.svg-inline--fa.fa-w-2 {\n  width: 0.125em;\n}\n.svg-inline--fa.fa-w-3 {\n  width: 0.1875em;\n}\n.svg-inline--fa.fa-w-4 {\n  width: 0.25em;\n}\n.svg-inline--fa.fa-w-5 {\n  width: 0.3125em;\n}\n.svg-inline--fa.fa-w-6 {\n  width: 0.375em;\n}\n.svg-inline--fa.fa-w-7 {\n  width: 0.4375em;\n}\n.svg-inline--fa.fa-w-8 {\n  width: 0.5em;\n}\n.svg-inline--fa.fa-w-9 {\n  width: 0.5625em;\n}\n.svg-inline--fa.fa-w-10 {\n  width: 0.625em;\n}\n.svg-inline--fa.fa-w-11 {\n  width: 0.6875em;\n}\n.svg-inline--fa.fa-w-12 {\n  width: 0.75em;\n}\n.svg-inline--fa.fa-w-13 {\n  width: 0.8125em;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-15 {\n  width: 0.9375em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-w-17 {\n  width: 1.0625em;\n}\n.svg-inline--fa.fa-w-18 {\n  width: 1.125em;\n}\n.svg-inline--fa.fa-w-19 {\n  width: 1.1875em;\n}\n.svg-inline--fa.fa-w-20 {\n  width: 1.25em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-border {\n  height: 1.5em;\n}\n.svg-inline--fa.fa-li {\n  width: 2em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: 0.25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -0.0667em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit;\n}\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em;\n}\n\n.fa-pull-left {\n  float: left;\n}\n\n.fa-pull-right {\n  float: right;\n}\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: 0.3em;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear;\n}\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-flip-both {\n  -webkit-filter: none;\n          filter: none;\n}\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: #fff;\n}\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse {\n  color: #fff;\n}';
  function $e() {
    De.autoAddCss &&
      !tn &&
      (!(function (e) {
        if (e && we) {
          var n = ue.createElement("style");
          n.setAttribute("type", "text/css"), (n.innerHTML = e);
          for (
            var a = ue.head.childNodes, t = null, i = a.length - 1;
            i > -1;
            i--
          ) {
            var r = a[i],
              o = (r.tagName || "").toUpperCase();
            ["STYLE", "LINK"].indexOf(o) > -1 && (t = r);
          }
          ue.head.insertBefore(n, t);
        }
      })(
        (function () {
          var e = be,
            n = ve,
            a = De.familyPrefix,
            t = De.replacementClass,
            i = Ze;
          if (a !== e || t !== n) {
            var r = new RegExp("\\.".concat(e, "\\-"), "g"),
              o = new RegExp("\\--".concat(e, "\\-"), "g"),
              c = new RegExp("\\.".concat(n), "g");
            i = i
              .replace(r, ".".concat(a, "-"))
              .replace(o, "--".concat(a, "-"))
              .replace(c, ".".concat(t));
          }
          return i;
        })()
      ),
      (tn = !0));
  }
  function en(e) {
    var n = e.prefix,
      a = void 0 === n ? "fa" : n,
      t = e.iconName;
    if (t) return Ue(an.definitions, a, t) || Ue(Be.styles, a, t);
  }
  var nn,
    an = new ((function () {
      function e() {
        !(function (e, n) {
          if (!(e instanceof n))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.definitions = {});
      }
      var n, a, t;
      return (
        (n = e),
        (a = [
          {
            key: "add",
            value: function () {
              for (
                var e = this, n = arguments.length, a = new Array(n), t = 0;
                t < n;
                t++
              )
                a[t] = arguments[t];
              var i = a.reduce(this._pullDefinitions, {});
              Object.keys(i).forEach(function (n) {
                (e.definitions[n] = le({}, e.definitions[n] || {}, i[n])),
                  (function e(n, a) {
                    var t = (
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : {}
                      ).skipHooks,
                      i = void 0 !== t && t,
                      r = Object.keys(a).reduce(function (e, n) {
                        var t = a[n];
                        return (
                          t.icon ? (e[t.iconName] = t.icon) : (e[n] = t), e
                        );
                      }, {});
                    "function" != typeof Be.hooks.addPack || i
                      ? (Be.styles[n] = le({}, Be.styles[n] || {}, r))
                      : Be.hooks.addPack(n, r),
                      "fas" === n && e("fa", a);
                  })(n, i[n]),
                  Ve();
              });
            },
          },
          {
            key: "reset",
            value: function () {
              this.definitions = {};
            },
          },
          {
            key: "_pullDefinitions",
            value: function (e, n) {
              var a = n.prefix && n.iconName && n.icon ? { 0: n } : n;
              return (
                Object.keys(a).map(function (n) {
                  var t = a[n],
                    i = t.prefix,
                    r = t.iconName,
                    o = t.icon;
                  e[i] || (e[i] = {}), (e[i][r] = o);
                }),
                e
              );
            },
          },
        ]) && oe(n.prototype, a),
        t && oe(n, t),
        e
      );
    })())(),
    tn = !1,
    rn =
      ((nn = function (e) {
        var n =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          a = n.transform,
          t = void 0 === a ? Oe : a,
          i = n.symbol,
          r = void 0 !== i && i,
          o = n.mask,
          c = void 0 === o ? null : o,
          l = n.title,
          s = void 0 === l ? null : l,
          F = n.classes,
          f = void 0 === F ? [] : F,
          m = n.attributes,
          g = void 0 === m ? {} : m,
          _ = n.styles,
          p = void 0 === _ ? {} : _;
        if (e) {
          var d,
            u,
            h = e.prefix,
            w = e.iconName,
            b = e.icon;
          return (
            (d = le({ type: "icon" }, e)),
            (u = function () {
              return (
                $e(),
                De.autoA11y &&
                  (s
                    ? (g["aria-labelledby"] = ""
                        .concat(De.replacementClass, "-title-")
                        .concat(Me()))
                    : ((g["aria-hidden"] = "true"), (g.focusable = "false"))),
                He({
                  icons: {
                    main: Qe(b),
                    mask: c
                      ? Qe(c.icon)
                      : { found: !1, width: null, height: null, icon: {} },
                  },
                  prefix: h,
                  iconName: w,
                  transform: le({}, Oe, t),
                  symbol: r,
                  title: s,
                  extra: { attributes: g, styles: p, classes: f },
                })
              );
            }),
            Object.defineProperty(d, "abstract", { get: u }),
            Object.defineProperty(d, "html", {
              get: function () {
                return d.abstract.map(function (e) {
                  return Ye(e);
                });
              },
            }),
            Object.defineProperty(d, "node", {
              get: function () {
                if (we) {
                  var e = ue.createElement("div");
                  return (e.innerHTML = d.html), e.children;
                }
              },
            }),
            d
          );
        }
      }),
      function (e) {
        var n =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          a = (e || {}).icon ? e : en(e || {}),
          t = n.mask;
        return (
          t && (t = (t || {}).icon ? t : en(t || {})),
          nn(a, le({}, n, { mask: t }))
        );
      });
  an.add(
    {
      prefix: "far",
      iconName: "building",
      icon: [
        448,
        512,
        [],
        "f1ad",
        "M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z",
      ],
    },
    {
      prefix: "fas",
      iconName: "cat",
      icon: [
        512,
        512,
        [],
        "f6be",
        "M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z",
      ],
    },
    {
      prefix: "fas",
      iconName: "coffee",
      icon: [
        640,
        512,
        [],
        "f0f4",
        "M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z",
      ],
    },
    {
      prefix: "far",
      iconName: "flag",
      icon: [
        512,
        512,
        [],
        "f024",
        "M336.174 80c-49.132 0-93.305-32-161.913-32-31.301 0-58.303 6.482-80.721 15.168a48.04 48.04 0 0 0 2.142-20.727C93.067 19.575 74.167 1.594 51.201.104 23.242-1.71 0 20.431 0 48c0 17.764 9.657 33.262 24 41.562V496c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-83.443C109.869 395.28 143.259 384 199.826 384c49.132 0 93.305 32 161.913 32 58.479 0 101.972-22.617 128.548-39.981C503.846 367.161 512 352.051 512 335.855V95.937c0-34.459-35.264-57.768-66.904-44.117C409.193 67.309 371.641 80 336.174 80zM464 336c-21.783 15.412-60.824 32-102.261 32-59.945 0-102.002-32-161.913-32-43.361 0-96.379 9.403-127.826 24V128c21.784-15.412 60.824-32 102.261-32 59.945 0 102.002 32 161.913 32 43.271 0 96.32-17.366 127.826-32v240z",
      ],
    },
    {
      prefix: "far",
      iconName: "frown",
      icon: [
        496,
        512,
        [],
        "f119",
        "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z",
      ],
    },
    {
      prefix: "fas",
      iconName: "futbol",
      icon: [
        512,
        512,
        [],
        "f1e3",
        "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-48 0l-.003-.282-26.064 22.741-62.679-58.5 16.454-84.355 34.303 3.072c-24.889-34.216-60.004-60.089-100.709-73.141l13.651 31.939L256 139l-74.953-41.525 13.651-31.939c-40.631 13.028-75.78 38.87-100.709 73.141l34.565-3.073 16.192 84.355-62.678 58.5-26.064-22.741-.003.282c0 43.015 13.497 83.952 38.472 117.991l7.704-33.897 85.138 10.447 36.301 77.826-29.902 17.786c40.202 13.122 84.29 13.148 124.572 0l-29.902-17.786 36.301-77.826 85.138-10.447 7.704 33.897C442.503 339.952 456 299.015 456 256zm-248.102 69.571l-29.894-91.312L256 177.732l77.996 56.527-29.622 91.312h-96.476z",
      ],
    },
    {
      prefix: "fas",
      iconName: "history",
      icon: [
        512,
        512,
        [],
        "f1da",
        "M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z",
      ],
    },
    {
      prefix: "far",
      iconName: "lightbulb",
      icon: [
        352,
        512,
        [],
        "f0eb",
        "M176 80c-52.94 0-96 43.06-96 96 0 8.84 7.16 16 16 16s16-7.16 16-16c0-35.3 28.72-64 64-64 8.84 0 16-7.16 16-16s-7.16-16-16-16zM96.06 459.17c0 3.15.93 6.22 2.68 8.84l24.51 36.84c2.97 4.46 7.97 7.14 13.32 7.14h78.85c5.36 0 10.36-2.68 13.32-7.14l24.51-36.84c1.74-2.62 2.67-5.7 2.68-8.84l.05-43.18H96.02l.04 43.18zM176 0C73.72 0 0 82.97 0 176c0 44.37 16.45 84.85 43.56 115.78 16.64 18.99 42.74 58.8 52.42 92.16v.06h48v-.12c-.01-4.77-.72-9.51-2.15-14.07-5.59-17.81-22.82-64.77-62.17-109.67-20.54-23.43-31.52-53.15-31.61-84.14-.2-73.64 59.67-128 127.95-128 70.58 0 128 57.42 128 128 0 30.97-11.24 60.85-31.65 84.14-39.11 44.61-56.42 91.47-62.1 109.46a47.507 47.507 0 0 0-2.22 14.3v.1h48v-.05c9.68-33.37 35.78-73.18 52.42-92.16C335.55 260.85 352 220.37 352 176 352 78.8 273.2 0 176 0z",
      ],
    },
    {
      prefix: "fas",
      iconName: "music",
      icon: [
        512,
        512,
        [],
        "f001",
        "M511.99 32.01c0-21.71-21.1-37.01-41.6-30.51L150.4 96c-13.3 4.2-22.4 16.5-22.4 30.5v261.42c-10.05-2.38-20.72-3.92-32-3.92-53.02 0-96 28.65-96 64s42.98 64 96 64 96-28.65 96-64V214.31l256-75.02v184.63c-10.05-2.38-20.72-3.92-32-3.92-53.02 0-96 28.65-96 64s42.98 64 96 64 96-28.65 96-64l-.01-351.99z",
      ],
    },
    {
      prefix: "fas",
      iconName: "search",
      icon: [
        512,
        512,
        [],
        "f002",
        "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z",
      ],
    },
    {
      prefix: "far",
      iconName: "smile",
      icon: [
        496,
        512,
        [],
        "f118",
        "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z",
      ],
    }
  );
  var on = rn({ prefix: "far", iconName: "building" }).html,
    cn = rn({ prefix: "fas", iconName: "cat" }).html,
    ln = rn({ prefix: "fas", iconName: "coffee" }).html,
    sn = rn({ prefix: "far", iconName: "flag" }).html,
    Fn = rn({ prefix: "fas", iconName: "futbol" }).html,
    fn = rn({ prefix: "far", iconName: "frown" }).html,
    mn = rn({ prefix: "fas", iconName: "history" }).html,
    gn = rn({ prefix: "far", iconName: "lightbulb" }).html,
    _n = rn({ prefix: "fas", iconName: "music" }).html,
    pn = rn({ prefix: "fas", iconName: "search" }).html,
    dn = rn({ prefix: "far", iconName: "smile" }).html;
  function un(e, n) {
    var a = document.createElement(e);
    return n && (a.className = n), a;
  }
  function hn(e) {
    for (; e.firstChild; ) e.removeChild(e.firstChild);
  }
  var wn = "emoji-picker__preview",
    bn = "emoji-picker__preview-emoji",
    vn = "emoji-picker__preview-name";
  var yn = [
      "Smileys & People",
      "Animals & Nature",
      "Food & Drink",
      "Activities",
      "Travel & Places",
      "Objects",
      "Symbols",
      "Flags"
    ];
    var kn = [
      {
        "e": "😀",
        "n": "grinning face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "😃",
        "n": "grinning face with big eyes",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😄",
        "n": "grinning face with smiling eyes",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😁",
        "n": "beaming face with smiling eyes",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😆",
        "n": "grinning squinting face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😅",
        "n": "grinning face with sweat",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤣",
        "n": "rolling on the floor laughing",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "😂",
        "n": "face with tears of joy",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙂",
        "n": "slightly smiling face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🙃",
        "n": "upside-down face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "😉",
        "n": "winking face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😊",
        "n": "smiling face with smiling eyes",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😇",
        "n": "smiling face with halo",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🥰",
        "n": "smiling face with hearts",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "😍",
        "n": "smiling face with heart-eyes",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤩",
        "n": "star-struck",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "😘",
        "n": "face blowing a kiss",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😗",
        "n": "kissing face",
        "c":0,
        "v": "1.0"
      },
      // {
      //   "e": "☺️",
      //   "n": "smiling face",
      //   "c":0,
      //   "v": "0.6"
      // },
      {
        "e": "😚",
        "n": "kissing face with closed eyes",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😙",
        "n": "kissing face with smiling eyes",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🥲",
        "n": "smiling face with tear",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "😋",
        "n": "face savoring food",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😛",
        "n": "face with tongue",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "😜",
        "n": "winking face with tongue",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤪",
        "n": "zany face",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "😝",
        "n": "squinting face with tongue",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤑",
        "n": "money-mouth face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🤗",
        "n": "hugging face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🤭",
        "n": "face with hand over mouth",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🤫",
        "n": "shushing face",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🤔",
        "n": "thinking face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🤐",
        "n": "zipper-mouth face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🤨",
        "n": "face with raised eyebrow",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "😐",
        "n": "neutral face",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "😑",
        "n": "expressionless face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "😶",
        "n": "face without mouth",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "😏",
        "n": "smirking face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😒",
        "n": "unamused face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙄",
        "n": "face with rolling eyes",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "😬",
        "n": "grimacing face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🤥",
        "n": "lying face",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "😌",
        "n": "relieved face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😔",
        "n": "pensive face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😪",
        "n": "sleepy face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤤",
        "n": "drooling face",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "😴",
        "n": "sleeping face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "😷",
        "n": "face with medical mask",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤒",
        "n": "face with thermometer",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🤕",
        "n": "face with head-bandage",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🤢",
        "n": "nauseated face",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🤮",
        "n": "face vomiting",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🤧",
        "n": "sneezing face",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🥵",
        "n": "hot face",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🥶",
        "n": "cold face",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🥴",
        "n": "woozy face",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "😵",
        "n": "knocked-out face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤯",
        "n": "exploding head",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🤠",
        "n": "cowboy hat face",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🥳",
        "n": "partying face",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🥸",
        "n": "disguised face",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "😎",
        "n": "smiling face with sunglasses",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🤓",
        "n": "nerd face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🧐",
        "n": "face with monocle",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "😕",
        "n": "confused face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "😟",
        "n": "worried face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🙁",
        "n": "slightly frowning face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "☹️",
        "n": "frowning face",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "😮",
        "n": "face with open mouth",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "😯",
        "n": "hushed face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "😲",
        "n": "astonished face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😳",
        "n": "flushed face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🥺",
        "n": "pleading face",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "😦",
        "n": "frowning face with open mouth",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "😧",
        "n": "anguished face",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "😨",
        "n": "fearful face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😰",
        "n": "anxious face with sweat",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😥",
        "n": "sad but relieved face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😢",
        "n": "crying face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😭",
        "n": "loudly crying face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😱",
        "n": "face screaming in fear",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😖",
        "n": "confounded face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😣",
        "n": "persevering face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😞",
        "n": "disappointed face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😓",
        "n": "downcast face with sweat",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😩",
        "n": "weary face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😫",
        "n": "tired face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🥱",
        "n": "yawning face",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "😤",
        "n": "face with steam from nose",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😡",
        "n": "pouting face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😠",
        "n": "angry face",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤬",
        "n": "face with symbols on mouth",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "😈",
        "n": "smiling face with horns",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "👿",
        "n": "angry face with horns",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💀",
        "n": "skull",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "☠️",
        "n": "skull and crossbones",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "💩",
        "n": "pile of poo",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤡",
        "n": "clown face",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "👹",
        "n": "ogre",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👺",
        "n": "goblin",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👻",
        "n": "ghost",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👽",
        "n": "alien",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👾",
        "n": "alien monster",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤖",
        "n": "robot",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "😺",
        "n": "grinning cat",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😸",
        "n": "grinning cat with smiling eyes",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😹",
        "n": "cat with tears of joy",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😻",
        "n": "smiling cat with heart-eyes",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😼",
        "n": "cat with wry smile",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😽",
        "n": "kissing cat",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙀",
        "n": "weary cat",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😿",
        "n": "crying cat",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "😾",
        "n": "pouting cat",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙈",
        "n": "see-no-evil monkey",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙉",
        "n": "hear-no-evil monkey",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙊",
        "n": "speak-no-evil monkey",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💋",
        "n": "kiss mark",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💌",
        "n": "love letter",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💘",
        "n": "heart with arrow",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💝",
        "n": "heart with ribbon",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💖",
        "n": "sparkling heart",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💗",
        "n": "growing heart",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💓",
        "n": "beating heart",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💞",
        "n": "revolving hearts",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💕",
        "n": "two hearts",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💟",
        "n": "heart decoration",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "❣️",
        "n": "heart exclamation",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "💔",
        "n": "broken heart",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "❤️",
        "n": "red heart",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🧡",
        "n": "orange heart",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "💛",
        "n": "yellow heart",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💚",
        "n": "green heart",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💙",
        "n": "blue heart",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💜",
        "n": "purple heart",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤎",
        "n": "brown heart",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🖤",
        "n": "black heart",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🤍",
        "n": "white heart",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "💯",
        "n": "hundred points",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💢",
        "n": "anger symbol",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💥",
        "n": "collision",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💫",
        "n": "dizzy",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💦",
        "n": "sweat droplets",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💨",
        "n": "dashing away",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🕳️",
        "n": "hole",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "💣",
        "n": "bomb",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💬",
        "n": "speech balloon",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👁️‍🗨️",
        "n": "eye in speech bubble",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "🗨️",
        "n": "left speech bubble",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "🗯️",
        "n": "right anger bubble",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "💭",
        "n": "thought balloon",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "💤",
        "n": "zzz",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👋",
        "n": "waving hand",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤚",
        "n": "raised back of hand",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🖐️",
        "n": "hand with fingers splayed",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "✋",
        "n": "raised hand",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🖖",
        "n": "vulcan salute",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "👌",
        "n": "OK hand",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤌",
        "n": "pinched fingers",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "🤏",
        "n": "pinching hand",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "✌️",
        "n": "victory hand",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤞",
        "n": "crossed fingers",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🤟",
        "n": "love-you gesture",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🤘",
        "n": "sign of the horns",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🤙",
        "n": "call me hand",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "👈",
        "n": "backhand index pointing left",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👉",
        "n": "backhand index pointing right",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👆",
        "n": "backhand index pointing up",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🖕",
        "n": "middle finger",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "👇",
        "n": "backhand index pointing down",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "☝️",
        "n": "index pointing up",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👍",
        "n": "thumbs up",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👎",
        "n": "thumbs down",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "✊",
        "n": "raised fist",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👊",
        "n": "oncoming fist",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤛",
        "n": "left-facing fist",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🤜",
        "n": "right-facing fist",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "👏",
        "n": "clapping hands",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙌",
        "n": "raising hands",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👐",
        "n": "open hands",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤲",
        "n": "palms up together",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🤝",
        "n": "handshake",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🙏",
        "n": "folded hands",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "✍️",
        "n": "writing hand",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "💅",
        "n": "nail polish",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤳",
        "n": "selfie",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "💪",
        "n": "flexed biceps",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🦾",
        "n": "mechanical arm",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🦿",
        "n": "mechanical leg",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🦵",
        "n": "leg",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🦶",
        "n": "foot",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "👂",
        "n": "ear",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🦻",
        "n": "ear with hearing aid",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "👃",
        "n": "nose",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🧠",
        "n": "brain",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🫀",
        "n": "anatomical heart",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "🫁",
        "n": "lungs",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "🦷",
        "n": "tooth",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🦴",
        "n": "bone",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "👀",
        "n": "eyes",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👁️",
        "n": "eye",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "👅",
        "n": "tongue",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👄",
        "n": "mouth",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👶",
        "n": "baby",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🧒",
        "n": "child",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "👦",
        "n": "boy",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👧",
        "n": "girl",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🧑",
        "n": "person",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "👱",
        "n": "person blond hair",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👨",
        "n": "man",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🧔",
        "n": "person beard",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "👨‍🦰",
        "n": "man red hair",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "👨‍🦱",
        "n": "man curly hair",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "👨‍🦳",
        "n": "man white hair",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "👨‍🦲",
        "n": "man bald",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "👩",
        "n": "woman",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👩‍🦰",
        "n": "woman red hair",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🧑‍🦰",
        "n": "person red hair",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👩‍🦱",
        "n": "woman curly hair",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🧑‍🦱",
        "n": "person curly hair",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👩‍🦳",
        "n": "woman white hair",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🧑‍🦳",
        "n": "person white hair",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👩‍🦲",
        "n": "woman bald",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🧑‍🦲",
        "n": "person bald",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👱‍♀️",
        "n": "woman blond hair",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👱‍♂️",
        "n": "man blond hair",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧓",
        "n": "older person",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "👴",
        "n": "old man",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👵",
        "n": "old woman",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙍",
        "n": "person frowning",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙍‍♂️",
        "n": "man frowning",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🙍‍♀️",
        "n": "woman frowning",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🙎",
        "n": "person pouting",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙎‍♂️",
        "n": "man pouting",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🙎‍♀️",
        "n": "woman pouting",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🙅",
        "n": "person gesturing NO",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙅‍♂️",
        "n": "man gesturing NO",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🙅‍♀️",
        "n": "woman gesturing NO",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🙆",
        "n": "person gesturing OK",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙆‍♂️",
        "n": "man gesturing OK",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🙆‍♀️",
        "n": "woman gesturing OK",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "💁",
        "n": "person tipping hand",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💁‍♂️",
        "n": "man tipping hand",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "💁‍♀️",
        "n": "woman tipping hand",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🙋",
        "n": "person raising hand",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙋‍♂️",
        "n": "man raising hand",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🙋‍♀️",
        "n": "woman raising hand",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧏",
        "n": "deaf person",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🧏‍♂️",
        "n": "deaf man",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🧏‍♀️",
        "n": "deaf woman",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🙇",
        "n": "person bowing",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🙇‍♂️",
        "n": "man bowing",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🙇‍♀️",
        "n": "woman bowing",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤦",
        "n": "person facepalming",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🤦‍♂️",
        "n": "man facepalming",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤦‍♀️",
        "n": "woman facepalming",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤷",
        "n": "person shrugging",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🤷‍♂️",
        "n": "man shrugging",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤷‍♀️",
        "n": "woman shrugging",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍⚕️",
        "n": "health worker",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍⚕️",
        "n": "man health worker",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍⚕️",
        "n": "woman health worker",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍🎓",
        "n": "student",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🎓",
        "n": "man student",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍🎓",
        "n": "woman student",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍🏫",
        "n": "teacher",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🏫",
        "n": "man teacher",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍🏫",
        "n": "woman teacher",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍⚖️",
        "n": "judge",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍⚖️",
        "n": "man judge",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍⚖️",
        "n": "woman judge",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍🌾",
        "n": "farmer",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🌾",
        "n": "man farmer",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍🌾",
        "n": "woman farmer",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍🍳",
        "n": "cook",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🍳",
        "n": "man cook",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍🍳",
        "n": "woman cook",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍🔧",
        "n": "mechanic",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🔧",
        "n": "man mechanic",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍🔧",
        "n": "woman mechanic",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍🏭",
        "n": "factory worker",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🏭",
        "n": "man factory worker",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍🏭",
        "n": "woman factory worker",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍💼",
        "n": "office worker",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍💼",
        "n": "man office worker",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍💼",
        "n": "woman office worker",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍🔬",
        "n": "scientist",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🔬",
        "n": "man scientist",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍🔬",
        "n": "woman scientist",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍💻",
        "n": "technologist",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍💻",
        "n": "man technologist",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍💻",
        "n": "woman technologist",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍🎤",
        "n": "singer",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🎤",
        "n": "man singer",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍🎤",
        "n": "woman singer",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍🎨",
        "n": "artist",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🎨",
        "n": "man artist",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍🎨",
        "n": "woman artist",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍✈️",
        "n": "pilot",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍✈️",
        "n": "man pilot",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍✈️",
        "n": "woman pilot",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍🚀",
        "n": "astronaut",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🚀",
        "n": "man astronaut",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍🚀",
        "n": "woman astronaut",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧑‍🚒",
        "n": "firefighter",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🚒",
        "n": "man firefighter",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍🚒",
        "n": "woman firefighter",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👮",
        "n": "police officer",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👮‍♂️",
        "n": "man police officer",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👮‍♀️",
        "n": "woman police officer",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🕵️",
        "n": "detective",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "🕵️‍♂️",
        "n": "man detective",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🕵️‍♀️",
        "n": "woman detective",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "💂",
        "n": "guard",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💂‍♂️",
        "n": "man guard",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "💂‍♀️",
        "n": "woman guard",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🥷",
        "n": "ninja",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "👷",
        "n": "construction worker",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👷‍♂️",
        "n": "man construction worker",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👷‍♀️",
        "n": "woman construction worker",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤴",
        "n": "prince",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "👸",
        "n": "princess",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👳",
        "n": "person wearing turban",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👳‍♂️",
        "n": "man wearing turban",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👳‍♀️",
        "n": "woman wearing turban",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👲",
        "n": "person with skullcap",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🧕",
        "n": "woman with headscarf",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🤵",
        "n": "person in tuxedo",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🤵‍♂️",
        "n": "man in tuxedo",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "🤵‍♀️",
        "n": "woman in tuxedo",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "👰",
        "n": "person with veil",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👰‍♂️",
        "n": "man with veil",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "👰‍♀️",
        "n": "woman with veil",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "🤰",
        "n": "pregnant woman",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🤱",
        "n": "breast-feeding",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "👩‍🍼",
        "n": "woman feeding baby",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "👨‍🍼",
        "n": "man feeding baby",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "🧑‍🍼",
        "n": "person feeding baby",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "👼",
        "n": "baby angel",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🎅",
        "n": "Santa Claus",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🤶",
        "n": "Mrs. Claus",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🧑‍🎄",
        "n": "mx claus",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "🦸",
        "n": "superhero",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🦸‍♂️",
        "n": "man superhero",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🦸‍♀️",
        "n": "woman superhero",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🦹",
        "n": "supervillain",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🦹‍♂️",
        "n": "man supervillain",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🦹‍♀️",
        "n": "woman supervillain",
        "c":0,
        "v": "11.0"
      },
      {
        "e": "🧙",
        "n": "mage",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧙‍♂️",
        "n": "man mage",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧙‍♀️",
        "n": "woman mage",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧚",
        "n": "fairy",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧚‍♂️",
        "n": "man fairy",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧚‍♀️",
        "n": "woman fairy",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧛",
        "n": "vampire",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧛‍♂️",
        "n": "man vampire",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧛‍♀️",
        "n": "woman vampire",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧜",
        "n": "merperson",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧜‍♂️",
        "n": "merman",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧜‍♀️",
        "n": "mermaid",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧝",
        "n": "elf",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧝‍♂️",
        "n": "man elf",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧝‍♀️",
        "n": "woman elf",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧞",
        "n": "genie",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧞‍♂️",
        "n": "man genie",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧞‍♀️",
        "n": "woman genie",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧟",
        "n": "zombie",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧟‍♂️",
        "n": "man zombie",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧟‍♀️",
        "n": "woman zombie",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "💆",
        "n": "person getting massage",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💆‍♂️",
        "n": "man getting massage",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "💆‍♀️",
        "n": "woman getting massage",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "💇",
        "n": "person getting haircut",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "💇‍♂️",
        "n": "man getting haircut",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "💇‍♀️",
        "n": "woman getting haircut",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🚶",
        "n": "person walking",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🚶‍♂️",
        "n": "man walking",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🚶‍♀️",
        "n": "woman walking",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧍",
        "n": "person standing",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🧍‍♂️",
        "n": "man standing",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🧍‍♀️",
        "n": "woman standing",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🧎",
        "n": "person kneeling",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🧎‍♂️",
        "n": "man kneeling",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🧎‍♀️",
        "n": "woman kneeling",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🧑‍🦯",
        "n": "person with white cane",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🦯",
        "n": "man with white cane",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "👩‍🦯",
        "n": "woman with white cane",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🧑‍🦼",
        "n": "person in motorized wheelchair",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🦼",
        "n": "man in motorized wheelchair",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "👩‍🦼",
        "n": "woman in motorized wheelchair",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🧑‍🦽",
        "n": "person in manual wheelchair",
        "c":0,
        "v": "12.1"
      },
      {
        "e": "👨‍🦽",
        "n": "man in manual wheelchair",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "👩‍🦽",
        "n": "woman in manual wheelchair",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "🏃",
        "n": "person running",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🏃‍♂️",
        "n": "man running",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🏃‍♀️",
        "n": "woman running",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "💃",
        "n": "woman dancing",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🕺",
        "n": "man dancing",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🕴️",
        "n": "person in suit levitating",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "👯",
        "n": "people with bunny ears",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👯‍♂️",
        "n": "men with bunny ears",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👯‍♀️",
        "n": "women with bunny ears",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧖",
        "n": "person in steamy room",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧖‍♂️",
        "n": "man in steamy room",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧖‍♀️",
        "n": "woman in steamy room",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧗",
        "n": "person climbing",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧗‍♂️",
        "n": "man climbing",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧗‍♀️",
        "n": "woman climbing",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🤺",
        "n": "person fencing",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🏇",
        "n": "horse racing",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "⛷️",
        "n": "skier",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "🏂",
        "n": "snowboarder",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🏌️",
        "n": "person golfing",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "🏌️‍♂️",
        "n": "man golfing",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🏌️‍♀️",
        "n": "woman golfing",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🏄",
        "n": "person surfing",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🏄‍♂️",
        "n": "man surfing",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🏄‍♀️",
        "n": "woman surfing",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🚣",
        "n": "person rowing boat",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🚣‍♂️",
        "n": "man rowing boat",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🚣‍♀️",
        "n": "woman rowing boat",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🏊",
        "n": "person swimming",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🏊‍♂️",
        "n": "man swimming",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🏊‍♀️",
        "n": "woman swimming",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "⛹️",
        "n": "person bouncing ball",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "⛹️‍♂️",
        "n": "man bouncing ball",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "⛹️‍♀️",
        "n": "woman bouncing ball",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🏋️",
        "n": "person lifting weights",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "🏋️‍♂️",
        "n": "man lifting weights",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🏋️‍♀️",
        "n": "woman lifting weights",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🚴",
        "n": "person biking",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🚴‍♂️",
        "n": "man biking",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🚴‍♀️",
        "n": "woman biking",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🚵",
        "n": "person mountain biking",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🚵‍♂️",
        "n": "man mountain biking",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🚵‍♀️",
        "n": "woman mountain biking",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤸",
        "n": "person cartwheeling",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🤸‍♂️",
        "n": "man cartwheeling",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤸‍♀️",
        "n": "woman cartwheeling",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤼",
        "n": "people wrestling",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🤼‍♂️",
        "n": "men wrestling",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤼‍♀️",
        "n": "women wrestling",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤽",
        "n": "person playing water polo",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🤽‍♂️",
        "n": "man playing water polo",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤽‍♀️",
        "n": "woman playing water polo",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤾",
        "n": "person playing handball",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🤾‍♂️",
        "n": "man playing handball",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤾‍♀️",
        "n": "woman playing handball",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤹",
        "n": "person juggling",
        "c":0,
        "v": "3.0"
      },
      {
        "e": "🤹‍♂️",
        "n": "man juggling",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🤹‍♀️",
        "n": "woman juggling",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🧘",
        "n": "person in lotus position",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧘‍♂️",
        "n": "man in lotus position",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🧘‍♀️",
        "n": "woman in lotus position",
        "c":0,
        "v": "5.0"
      },
      {
        "e": "🛀",
        "n": "person taking bath",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🛌",
        "n": "person in bed",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🧑‍🤝‍🧑",
        "n": "people holding hands",
        "c":0,
        "v": "12.0"
      },
      {
        "e": "👭",
        "n": "women holding hands",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "👫",
        "n": "woman and man holding hands",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👬",
        "n": "men holding hands",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "💏",
        "n": "kiss",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👩‍❤️‍💋‍👨",
        "n": "kiss woman, man",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👨‍❤️‍💋‍👨",
        "n": "kiss man, man",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👩‍❤️‍💋‍👩",
        "n": "kiss woman, woman",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "💑",
        "n": "couple with heart",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👩‍❤️‍👨",
        "n": "couple with heart woman, man",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👨‍❤️‍👨",
        "n": "couple with heart man, man",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👩‍❤️‍👩",
        "n": "couple with heart woman, woman",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👪",
        "n": "family",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👨‍👩‍👦",
        "n": "family man, woman, boy",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👨‍👩‍👧",
        "n": "family man, woman, girl",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👨‍👩‍👧‍👦",
        "n": "family man, woman, girl, boy",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👨‍👩‍👦‍👦",
        "n": "family man, woman, boy, boy",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👨‍👩‍👧‍👧",
        "n": "family man, woman, girl, girl",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👨‍👨‍👦",
        "n": "family man, man, boy",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👨‍👨‍👧",
        "n": "family man, man, girl",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👨‍👨‍👧‍👦",
        "n": "family man, man, girl, boy",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👨‍👨‍👦‍👦",
        "n": "family man, man, boy, boy",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👨‍👨‍👧‍👧",
        "n": "family man, man, girl, girl",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👩‍👩‍👦",
        "n": "family woman, woman, boy",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👩‍👩‍👧",
        "n": "family woman, woman, girl",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👩‍👩‍👧‍👦",
        "n": "family woman, woman, girl, boy",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👩‍👩‍👦‍👦",
        "n": "family woman, woman, boy, boy",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👩‍👩‍👧‍👧",
        "n": "family woman, woman, girl, girl",
        "c":0,
        "v": "2.0"
      },
      {
        "e": "👨‍👦",
        "n": "family man, boy",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👨‍👦‍👦",
        "n": "family man, boy, boy",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👨‍👧",
        "n": "family man, girl",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👨‍👧‍👦",
        "n": "family man, girl, boy",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👨‍👧‍👧",
        "n": "family man, girl, girl",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍👦",
        "n": "family woman, boy",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍👦‍👦",
        "n": "family woman, boy, boy",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍👧",
        "n": "family woman, girl",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍👧‍👦",
        "n": "family woman, girl, boy",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "👩‍👧‍👧",
        "n": "family woman, girl, girl",
        "c":0,
        "v": "4.0"
      },
      {
        "e": "🗣️",
        "n": "speaking head",
        "c":0,
        "v": "0.7"
      },
      {
        "e": "👤",
        "n": "bust in silhouette",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "👥",
        "n": "busts in silhouette",
        "c":0,
        "v": "1.0"
      },
      {
        "e": "🫂",
        "n": "people hugging",
        "c":0,
        "v": "13.0"
      },
      {
        "e": "👣",
        "n": "footprints",
        "c":0,
        "v": "0.6"
      },
      {
        "e": "🐵",
        "n": "monkey face",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐒",
        "n": "monkey",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🦍",
        "n": "gorilla",
        "c":1,
        "v": "3.0"
      },
      {
        "e": "🦧",
        "n": "orangutan",
        "c":1,
        "v": "12.0"
      },
      {
        "e": "🐶",
        "n": "dog face",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐕",
        "n": "dog",
        "c":1,
        "v": "0.7"
      },
      {
        "e": "🦮",
        "n": "guide dog",
        "c":1,
        "v": "12.0"
      },
      {
        "e": "🐕‍🦺",
        "n": "service dog",
        "c":1,
        "v": "12.0"
      },
      {
        "e": "🐩",
        "n": "poodle",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐺",
        "n": "wolf",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🦊",
        "n": "fox",
        "c":1,
        "v": "3.0"
      },
      {
        "e": "🦝",
        "n": "raccoon",
        "c":1,
        "v": "11.0"
      },
      {
        "e": "🐱",
        "n": "cat face",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐈",
        "n": "cat",
        "c":1,
        "v": "0.7"
      },
      {
        "e": "🐈‍⬛",
        "n": "black cat",
        "c":1,
        "v": "13.0"
      },
      {
        "e": "🦁",
        "n": "lion",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐯",
        "n": "tiger face",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐅",
        "n": "tiger",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐆",
        "n": "leopard",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐴",
        "n": "horse face",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐎",
        "n": "horse",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🦄",
        "n": "unicorn",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🦓",
        "n": "zebra",
        "c":1,
        "v": "5.0"
      },
      {
        "e": "🦌",
        "n": "deer",
        "c":1,
        "v": "3.0"
      },
      {
        "e": "🦬",
        "n": "bison",
        "c":1,
        "v": "13.0"
      },
      {
        "e": "🐮",
        "n": "cow face",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐂",
        "n": "ox",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐃",
        "n": "water buffalo",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐄",
        "n": "cow",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐷",
        "n": "pig face",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐖",
        "n": "pig",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐗",
        "n": "boar",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐽",
        "n": "pig nose",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐏",
        "n": "ram",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐑",
        "n": "ewe",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐐",
        "n": "goat",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐪",
        "n": "camel",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐫",
        "n": "two-hump camel",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🦙",
        "n": "llama",
        "c":1,
        "v": "11.0"
      },
      {
        "e": "🦒",
        "n": "giraffe",
        "c":1,
        "v": "5.0"
      },
      {
        "e": "🐘",
        "n": "elephant",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🦣",
        "n": "mammoth",
        "c":1,
        "v": "13.0"
      },
      {
        "e": "🦏",
        "n": "rhinoceros",
        "c":1,
        "v": "3.0"
      },
      {
        "e": "🦛",
        "n": "hippopotamus",
        "c":1,
        "v": "11.0"
      },
      {
        "e": "🐭",
        "n": "mouse face",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐁",
        "n": "mouse",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐀",
        "n": "rat",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐹",
        "n": "hamster",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐰",
        "n": "rabbit face",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐇",
        "n": "rabbit",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐿️",
        "n": "chipmunk",
        "c":1,
        "v": "0.7"
      },
      {
        "e": "🦫",
        "n": "beaver",
        "c":1,
        "v": "13.0"
      },
      {
        "e": "🦔",
        "n": "hedgehog",
        "c":1,
        "v": "5.0"
      },
      {
        "e": "🦇",
        "n": "bat",
        "c":1,
        "v": "3.0"
      },
      {
        "e": "🐻",
        "n": "bear",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐻‍❄️",
        "n": "polar bear",
        "c":1,
        "v": "13.0"
      },
      {
        "e": "🐨",
        "n": "koala",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐼",
        "n": "panda",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🦥",
        "n": "sloth",
        "c":1,
        "v": "12.0"
      },
      {
        "e": "🦦",
        "n": "otter",
        "c":1,
        "v": "12.0"
      },
      {
        "e": "🦨",
        "n": "skunk",
        "c":1,
        "v": "12.0"
      },
      {
        "e": "🦘",
        "n": "kangaroo",
        "c":1,
        "v": "11.0"
      },
      {
        "e": "🦡",
        "n": "badger",
        "c":1,
        "v": "11.0"
      },
      {
        "e": "🐾",
        "n": "paw prints",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🦃",
        "n": "turkey",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐔",
        "n": "chicken",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐓",
        "n": "rooster",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐣",
        "n": "hatching chick",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐤",
        "n": "baby chick",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐥",
        "n": "front-facing baby chick",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐦",
        "n": "bird",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐧",
        "n": "penguin",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🕊️",
        "n": "dove",
        "c":1,
        "v": "0.7"
      },
      {
        "e": "🦅",
        "n": "eagle",
        "c":1,
        "v": "3.0"
      },
      {
        "e": "🦆",
        "n": "duck",
        "c":1,
        "v": "3.0"
      },
      {
        "e": "🦢",
        "n": "swan",
        "c":1,
        "v": "11.0"
      },
      {
        "e": "🦉",
        "n": "owl",
        "c":1,
        "v": "3.0"
      },
      {
        "e": "🦤",
        "n": "dodo",
        "c":1,
        "v": "13.0"
      },
      {
        "e": "🪶",
        "n": "feather",
        "c":1,
        "v": "13.0"
      },
      {
        "e": "🦩",
        "n": "flamingo",
        "c":1,
        "v": "12.0"
      },
      {
        "e": "🦚",
        "n": "peacock",
        "c":1,
        "v": "11.0"
      },
      {
        "e": "🦜",
        "n": "parrot",
        "c":1,
        "v": "11.0"
      },
      {
        "e": "🐸",
        "n": "frog",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐊",
        "n": "crocodile",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐢",
        "n": "turtle",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🦎",
        "n": "lizard",
        "c":1,
        "v": "3.0"
      },
      {
        "e": "🐍",
        "n": "snake",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐲",
        "n": "dragon face",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐉",
        "n": "dragon",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🦕",
        "n": "sauropod",
        "c":1,
        "v": "5.0"
      },
      {
        "e": "🦖",
        "n": "T-Rex",
        "c":1,
        "v": "5.0"
      },
      {
        "e": "🐳",
        "n": "spouting whale",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐋",
        "n": "whale",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🐬",
        "n": "dolphin",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🦭",
        "n": "seal",
        "c":1,
        "v": "13.0"
      },
      {
        "e": "🐟",
        "n": "fish",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐠",
        "n": "tropical fish",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐡",
        "n": "blowfish",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🦈",
        "n": "shark",
        "c":1,
        "v": "3.0"
      },
      {
        "e": "🐙",
        "n": "octopus",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐚",
        "n": "spiral shell",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐌",
        "n": "snail",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🦋",
        "n": "butterfly",
        "c":1,
        "v": "3.0"
      },
      {
        "e": "🐛",
        "n": "bug",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐜",
        "n": "ant",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🐝",
        "n": "honeybee",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🪲",
        "n": "beetle",
        "c":1,
        "v": "13.0"
      },
      {
        "e": "🐞",
        "n": "lady beetle",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🦗",
        "n": "cricket",
        "c":1,
        "v": "5.0"
      },
      {
        "e": "🪳",
        "n": "cockroach",
        "c":1,
        "v": "13.0"
      },
      {
        "e": "🕷️",
        "n": "spider",
        "c":1,
        "v": "0.7"
      },
      {
        "e": "🕸️",
        "n": "spider web",
        "c":1,
        "v": "0.7"
      },
      {
        "e": "🦂",
        "n": "scorpion",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🦟",
        "n": "mosquito",
        "c":1,
        "v": "11.0"
      },
      {
        "e": "🪰",
        "n": "fly",
        "c":1,
        "v": "13.0"
      },
      {
        "e": "🪱",
        "n": "worm",
        "c":1,
        "v": "13.0"
      },
      {
        "e": "🦠",
        "n": "microbe",
        "c":1,
        "v": "11.0"
      },
      {
        "e": "💐",
        "n": "bouquet",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🌸",
        "n": "cherry blossom",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "💮",
        "n": "white flower",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🏵️",
        "n": "rosette",
        "c":1,
        "v": "0.7"
      },
      {
        "e": "🌹",
        "n": "rose",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🥀",
        "n": "wilted flower",
        "c":1,
        "v": "3.0"
      },
      {
        "e": "🌺",
        "n": "hibiscus",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🌻",
        "n": "sunflower",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🌼",
        "n": "blossom",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🌷",
        "n": "tulip",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🌱",
        "n": "seedling",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🪴",
        "n": "potted plant",
        "c":1,
        "v": "13.0"
      },
      {
        "e": "🌲",
        "n": "evergreen tree",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🌳",
        "n": "deciduous tree",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🌴",
        "n": "palm tree",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🌵",
        "n": "cactus",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🌾",
        "n": "sheaf of rice",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🌿",
        "n": "herb",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "☘️",
        "n": "shamrock",
        "c":1,
        "v": "1.0"
      },
      {
        "e": "🍀",
        "n": "four leaf clover",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🍁",
        "n": "maple leaf",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🍂",
        "n": "fallen leaf",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🍃",
        "n": "leaf fluttering in wind",
        "c":1,
        "v": "0.6"
      },
      {
        "e": "🍇",
        "n": "grapes",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍈",
        "n": "melon",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍉",
        "n": "watermelon",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍊",
        "n": "tangerine",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍋",
        "n": "lemon",
        "c":2,
        "v": "1.0"
      },
      {
        "e": "🍌",
        "n": "banana",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍍",
        "n": "pineapple",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🥭",
        "n": "mango",
        "c":2,
        "v": "11.0"
      },
      {
        "e": "🍎",
        "n": "red apple",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍏",
        "n": "green apple",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍐",
        "n": "pear",
        "c":2,
        "v": "1.0"
      },
      {
        "e": "🍑",
        "n": "peach",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍒",
        "n": "cherries",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍓",
        "n": "strawberry",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🫐",
        "n": "blueberries",
        "c":2,
        "v": "13.0"
      },
      {
        "e": "🥝",
        "n": "kiwi fruit",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🍅",
        "n": "tomato",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🫒",
        "n": "olive",
        "c":2,
        "v": "13.0"
      },
      {
        "e": "🥥",
        "n": "coconut",
        "c":2,
        "v": "5.0"
      },
      {
        "e": "🥑",
        "n": "avocado",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🍆",
        "n": "eggplant",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🥔",
        "n": "potato",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🥕",
        "n": "carrot",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🌽",
        "n": "ear of corn",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🌶️",
        "n": "hot pepper",
        "c":2,
        "v": "0.7"
      },
      {
        "e": "🫑",
        "n": "bell pepper",
        "c":2,
        "v": "13.0"
      },
      {
        "e": "🥒",
        "n": "cucumber",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🥬",
        "n": "leafy green",
        "c":2,
        "v": "11.0"
      },
      {
        "e": "🥦",
        "n": "broccoli",
        "c":2,
        "v": "5.0"
      },
      {
        "e": "🧄",
        "n": "garlic",
        "c":2,
        "v": "12.0"
      },
      {
        "e": "🧅",
        "n": "onion",
        "c":2,
        "v": "12.0"
      },
      {
        "e": "🍄",
        "n": "mushroom",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🥜",
        "n": "peanuts",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🌰",
        "n": "chestnut",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍞",
        "n": "bread",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🥐",
        "n": "croissant",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🥖",
        "n": "baguette bread",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🫓",
        "n": "flatbread",
        "c":2,
        "v": "13.0"
      },
      {
        "e": "🥨",
        "n": "pretzel",
        "c":2,
        "v": "5.0"
      },
      {
        "e": "🥯",
        "n": "bagel",
        "c":2,
        "v": "11.0"
      },
      {
        "e": "🥞",
        "n": "pancakes",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🧇",
        "n": "waffle",
        "c":2,
        "v": "12.0"
      },
      {
        "e": "🧀",
        "n": "cheese wedge",
        "c":2,
        "v": "1.0"
      },
      {
        "e": "🍖",
        "n": "meat on bone",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍗",
        "n": "poultry leg",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🥩",
        "n": "cut of meat",
        "c":2,
        "v": "5.0"
      },
      {
        "e": "🥓",
        "n": "bacon",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🍔",
        "n": "hamburger",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍟",
        "n": "french fries",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍕",
        "n": "pizza",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🌭",
        "n": "hot dog",
        "c":2,
        "v": "1.0"
      },
      {
        "e": "🥪",
        "n": "sandwich",
        "c":2,
        "v": "5.0"
      },
      {
        "e": "🌮",
        "n": "taco",
        "c":2,
        "v": "1.0"
      },
      {
        "e": "🌯",
        "n": "burrito",
        "c":2,
        "v": "1.0"
      },
      {
        "e": "🫔",
        "n": "tamale",
        "c":2,
        "v": "13.0"
      },
      {
        "e": "🥙",
        "n": "stuffed flatbread",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🧆",
        "n": "falafel",
        "c":2,
        "v": "12.0"
      },
      {
        "e": "🥚",
        "n": "egg",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🍳",
        "n": "cooking",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🥘",
        "n": "shallow pan of food",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🍲",
        "n": "pot of food",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🫕",
        "n": "fondue",
        "c":2,
        "v": "13.0"
      },
      {
        "e": "🥣",
        "n": "bowl with spoon",
        "c":2,
        "v": "5.0"
      },
      {
        "e": "🥗",
        "n": "green salad",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🍿",
        "n": "popcorn",
        "c":2,
        "v": "1.0"
      },
      {
        "e": "🧈",
        "n": "butter",
        "c":2,
        "v": "12.0"
      },
      {
        "e": "🧂",
        "n": "salt",
        "c":2,
        "v": "11.0"
      },
      {
        "e": "🥫",
        "n": "canned food",
        "c":2,
        "v": "5.0"
      },
      {
        "e": "🍱",
        "n": "bento box",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍘",
        "n": "rice cracker",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍙",
        "n": "rice ball",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍚",
        "n": "cooked rice",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍛",
        "n": "curry rice",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍜",
        "n": "steaming bowl",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍝",
        "n": "spaghetti",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍠",
        "n": "roasted sweet potato",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍢",
        "n": "oden",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍣",
        "n": "sushi",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍤",
        "n": "fried shrimp",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍥",
        "n": "fish cake with swirl",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🥮",
        "n": "moon cake",
        "c":2,
        "v": "11.0"
      },
      {
        "e": "🍡",
        "n": "dango",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🥟",
        "n": "dumpling",
        "c":2,
        "v": "5.0"
      },
      {
        "e": "🥠",
        "n": "fortune cookie",
        "c":2,
        "v": "5.0"
      },
      {
        "e": "🥡",
        "n": "takeout box",
        "c":2,
        "v": "5.0"
      },
      {
        "e": "🦀",
        "n": "crab",
        "c":2,
        "v": "1.0"
      },
      {
        "e": "🦞",
        "n": "lobster",
        "c":2,
        "v": "11.0"
      },
      {
        "e": "🦐",
        "n": "shrimp",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🦑",
        "n": "squid",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🦪",
        "n": "oyster",
        "c":2,
        "v": "12.0"
      },
      {
        "e": "🍦",
        "n": "soft ice cream",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍧",
        "n": "shaved ice",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍨",
        "n": "ice cream",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍩",
        "n": "doughnut",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍪",
        "n": "cookie",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🎂",
        "n": "birthday cake",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍰",
        "n": "shortcake",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🧁",
        "n": "cupcake",
        "c":2,
        "v": "11.0"
      },
      {
        "e": "🥧",
        "n": "pie",
        "c":2,
        "v": "5.0"
      },
      {
        "e": "🍫",
        "n": "chocolate bar",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍬",
        "n": "candy",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍭",
        "n": "lollipop",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍮",
        "n": "custard",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍯",
        "n": "honey pot",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍼",
        "n": "baby bottle",
        "c":2,
        "v": "1.0"
      },
      {
        "e": "🥛",
        "n": "glass of milk",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "☕",
        "n": "hot beverage",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🫖",
        "n": "teapot",
        "c":2,
        "v": "13.0"
      },
      {
        "e": "🍵",
        "n": "teacup without handle",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍶",
        "n": "sake",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍾",
        "n": "bottle with popping cork",
        "c":2,
        "v": "1.0"
      },
      {
        "e": "🍷",
        "n": "wine glass",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍸",
        "n": "cocktail glass",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍹",
        "n": "tropical drink",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍺",
        "n": "beer mug",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🍻",
        "n": "clinking beer mugs",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🥂",
        "n": "clinking glasses",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🥃",
        "n": "tumbler glass",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🥤",
        "n": "cup with straw",
        "c":2,
        "v": "5.0"
      },
      {
        "e": "🧋",
        "n": "bubble tea",
        "c":2,
        "v": "13.0"
      },
      {
        "e": "🧃",
        "n": "beverage box",
        "c":2,
        "v": "12.0"
      },
      {
        "e": "🧉",
        "n": "mate",
        "c":2,
        "v": "12.0"
      },
      {
        "e": "🧊",
        "n": "ice",
        "c":2,
        "v": "12.0"
      },
      {
        "e": "🥢",
        "n": "chopsticks",
        "c":2,
        "v": "5.0"
      },
      {
        "e": "🍽️",
        "n": "fork and knife with plate",
        "c":2,
        "v": "0.7"
      },
      {
        "e": "🍴",
        "n": "fork and knife",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🥄",
        "n": "spoon",
        "c":2,
        "v": "3.0"
      },
      {
        "e": "🔪",
        "n": "kitchen knife",
        "c":2,
        "v": "0.6"
      },
      {
        "e": "🏺",
        "n": "amphora",
        "c":2,
        "v": "1.0"
      },
      {
        "e": "🌍",
        "n": "globe showing Europe-Africa",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌎",
        "n": "globe showing Americas",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌏",
        "n": "globe showing Asia-Australia",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌐",
        "n": "globe with meridians",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🗺️",
        "n": "world map",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🗾",
        "n": "map of Japan",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🧭",
        "n": "compass",
        "c":3,
        "v": "11.0"
      },
      {
        "e": "🏔️",
        "n": "snow-capped mountain",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "⛰️",
        "n": "mountain",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌋",
        "n": "volcano",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🗻",
        "n": "mount fuji",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏕️",
        "n": "camping",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🏖️",
        "n": "beach with umbrella",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🏜️",
        "n": "desert",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🏝️",
        "n": "desert island",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🏞️",
        "n": "national park",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🏟️",
        "n": "stadium",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🏛️",
        "n": "classical building",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🏗️",
        "n": "building construction",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🧱",
        "n": "brick",
        "c":3,
        "v": "11.0"
      },
      {
        "e": "🪨",
        "n": "rock",
        "c":3,
        "v": "13.0"
      },
      {
        "e": "🪵",
        "n": "wood",
        "c":3,
        "v": "13.0"
      },
      {
        "e": "🛖",
        "n": "hut",
        "c":3,
        "v": "13.0"
      },
      {
        "e": "🏘️",
        "n": "houses",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🏚️",
        "n": "derelict house",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🏠",
        "n": "house",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏡",
        "n": "house with garden",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏢",
        "n": "office building",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏣",
        "n": "Japanese post office",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏤",
        "n": "post office",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🏥",
        "n": "hospital",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏦",
        "n": "bank",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏨",
        "n": "hotel",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏩",
        "n": "love hotel",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏪",
        "n": "convenience store",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏫",
        "n": "school",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏬",
        "n": "department store",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏭",
        "n": "factory",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏯",
        "n": "Japanese castle",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏰",
        "n": "castle",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "💒",
        "n": "wedding",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🗼",
        "n": "Tokyo tower",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🗽",
        "n": "Statue of Liberty",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "⛪",
        "n": "church",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🕌",
        "n": "mosque",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🛕",
        "n": "hindu temple",
        "c":3,
        "v": "12.0"
      },
      {
        "e": "🕍",
        "n": "synagogue",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "⛩️",
        "n": "shinto shrine",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🕋",
        "n": "kaaba",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "⛲",
        "n": "fountain",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "⛺",
        "n": "tent",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌁",
        "n": "foggy",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌃",
        "n": "night with stars",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🏙️",
        "n": "cityscape",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌄",
        "n": "sunrise over mountains",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌅",
        "n": "sunrise",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌆",
        "n": "cityscape at dusk",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌇",
        "n": "sunset",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌉",
        "n": "bridge at night",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "♨️",
        "n": "hot springs",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🎠",
        "n": "carousel horse",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🎡",
        "n": "ferris wheel",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🎢",
        "n": "roller coaster",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "💈",
        "n": "barber pole",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🎪",
        "n": "circus tent",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚂",
        "n": "locomotive",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚃",
        "n": "railway car",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚄",
        "n": "high-speed train",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚅",
        "n": "bullet train",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚆",
        "n": "train",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚇",
        "n": "metro",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚈",
        "n": "light rail",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚉",
        "n": "station",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚊",
        "n": "tram",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚝",
        "n": "monorail",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚞",
        "n": "mountain railway",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚋",
        "n": "tram car",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚌",
        "n": "bus",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚍",
        "n": "oncoming bus",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🚎",
        "n": "trolleybus",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚐",
        "n": "minibus",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚑",
        "n": "ambulance",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚒",
        "n": "fire engine",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚓",
        "n": "police car",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚔",
        "n": "oncoming police car",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🚕",
        "n": "taxi",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚖",
        "n": "oncoming taxi",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚗",
        "n": "automobile",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚘",
        "n": "oncoming automobile",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🚙",
        "n": "sport utility vehicle",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🛻",
        "n": "pickup truck",
        "c":3,
        "v": "13.0"
      },
      {
        "e": "🚚",
        "n": "delivery truck",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚛",
        "n": "articulated lorry",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚜",
        "n": "tractor",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🏎️",
        "n": "racing car",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🏍️",
        "n": "motorcycle",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🛵",
        "n": "motor scooter",
        "c":3,
        "v": "3.0"
      },
      {
        "e": "🦽",
        "n": "manual wheelchair",
        "c":3,
        "v": "12.0"
      },
      {
        "e": "🦼",
        "n": "motorized wheelchair",
        "c":3,
        "v": "12.0"
      },
      {
        "e": "🛺",
        "n": "auto rickshaw",
        "c":3,
        "v": "12.0"
      },
      {
        "e": "🚲",
        "n": "bicycle",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🛴",
        "n": "kick scooter",
        "c":3,
        "v": "3.0"
      },
      {
        "e": "🛹",
        "n": "skateboard",
        "c":3,
        "v": "11.0"
      },
      {
        "e": "🛼",
        "n": "roller skate",
        "c":3,
        "v": "13.0"
      },
      {
        "e": "🚏",
        "n": "bus stop",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🛣️",
        "n": "motorway",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🛤️",
        "n": "railway track",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🛢️",
        "n": "oil drum",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "⛽",
        "n": "fuel pump",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚨",
        "n": "police car light",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚥",
        "n": "horizontal traffic light",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚦",
        "n": "vertical traffic light",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🛑",
        "n": "stop sign",
        "c":3,
        "v": "3.0"
      },
      {
        "e": "🚧",
        "n": "construction",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "⚓",
        "n": "anchor",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "⛵",
        "n": "sailboat",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🛶",
        "n": "canoe",
        "c":3,
        "v": "3.0"
      },
      {
        "e": "🚤",
        "n": "speedboat",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🛳️",
        "n": "passenger ship",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "⛴️",
        "n": "ferry",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🛥️",
        "n": "motor boat",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🚢",
        "n": "ship",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "✈️",
        "n": "airplane",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🛩️",
        "n": "small airplane",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🛫",
        "n": "airplane departure",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🛬",
        "n": "airplane arrival",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🪂",
        "n": "parachute",
        "c":3,
        "v": "12.0"
      },
      {
        "e": "💺",
        "n": "seat",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🚁",
        "n": "helicopter",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚟",
        "n": "suspension railway",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚠",
        "n": "mountain cableway",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🚡",
        "n": "aerial tramway",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🛰️",
        "n": "satellite",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🚀",
        "n": "rocket",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🛸",
        "n": "flying saucer",
        "c":3,
        "v": "5.0"
      },
      {
        "e": "🛎️",
        "n": "bellhop bell",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🧳",
        "n": "luggage",
        "c":3,
        "v": "11.0"
      },
      {
        "e": "⌛",
        "n": "hourglass done",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "⏳",
        "n": "hourglass not done",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "⌚",
        "n": "watch",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "⏰",
        "n": "alarm clock",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "⏱️",
        "n": "stopwatch",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "⏲️",
        "n": "timer clock",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🕰️",
        "n": "mantelpiece clock",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🕛",
        "n": "twelve o’clock",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🕧",
        "n": "twelve-thirty",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🕐",
        "n": "one o’clock",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🕜",
        "n": "one-thirty",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🕑",
        "n": "two o’clock",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🕝",
        "n": "two-thirty",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🕒",
        "n": "three o’clock",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🕞",
        "n": "three-thirty",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🕓",
        "n": "four o’clock",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🕟",
        "n": "four-thirty",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🕔",
        "n": "five o’clock",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🕠",
        "n": "five-thirty",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🕕",
        "n": "six o’clock",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🕡",
        "n": "six-thirty",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🕖",
        "n": "seven o’clock",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🕢",
        "n": "seven-thirty",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🕗",
        "n": "eight o’clock",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🕣",
        "n": "eight-thirty",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🕘",
        "n": "nine o’clock",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🕤",
        "n": "nine-thirty",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🕙",
        "n": "ten o’clock",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🕥",
        "n": "ten-thirty",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🕚",
        "n": "eleven o’clock",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🕦",
        "n": "eleven-thirty",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌑",
        "n": "new moon",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌒",
        "n": "waxing crescent moon",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🌓",
        "n": "first quarter moon",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌔",
        "n": "waxing gibbous moon",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌕",
        "n": "full moon",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌖",
        "n": "waning gibbous moon",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🌗",
        "n": "last quarter moon",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🌘",
        "n": "waning crescent moon",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🌙",
        "n": "crescent moon",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌚",
        "n": "new moon face",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🌛",
        "n": "first quarter moon face",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌜",
        "n": "last quarter moon face",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌡️",
        "n": "thermometer",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "☀️",
        "n": "sun",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌝",
        "n": "full moon face",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🌞",
        "n": "sun with face",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🪐",
        "n": "ringed planet",
        "c":3,
        "v": "12.0"
      },
      {
        "e": "⭐",
        "n": "star",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌟",
        "n": "glowing star",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌠",
        "n": "shooting star",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌌",
        "n": "milky way",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "☁️",
        "n": "cloud",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "⛅",
        "n": "sun behind cloud",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "⛈️",
        "n": "cloud with lightning and rain",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌤️",
        "n": "sun behind small cloud",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌥️",
        "n": "sun behind large cloud",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌦️",
        "n": "sun behind rain cloud",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌧️",
        "n": "cloud with rain",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌨️",
        "n": "cloud with snow",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌩️",
        "n": "cloud with lightning",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌪️",
        "n": "tornado",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌫️",
        "n": "fog",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌬️",
        "n": "wind face",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "🌀",
        "n": "cyclone",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌈",
        "n": "rainbow",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌂",
        "n": "closed umbrella",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "☂️",
        "n": "umbrella",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "☔",
        "n": "umbrella with rain drops",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "⛱️",
        "n": "umbrella on ground",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "⚡",
        "n": "high voltage",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "❄️",
        "n": "snowflake",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "☃️",
        "n": "snowman",
        "c":3,
        "v": "0.7"
      },
      {
        "e": "⛄",
        "n": "snowman without snow",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "☄️",
        "n": "comet",
        "c":3,
        "v": "1.0"
      },
      {
        "e": "🔥",
        "n": "fire",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "💧",
        "n": "droplet",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🌊",
        "n": "water wave",
        "c":3,
        "v": "0.6"
      },
      {
        "e": "🎃",
        "n": "jack-o-lantern",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎄",
        "n": "Christmas tree",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎆",
        "n": "fireworks",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎇",
        "n": "sparkler",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🧨",
        "n": "firecracker",
        "c":4,
        "v": "11.0"
      },
      {
        "e": "✨",
        "n": "sparkles",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎈",
        "n": "balloon",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎉",
        "n": "party popper",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎊",
        "n": "confetti ball",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎋",
        "n": "tanabata tree",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎍",
        "n": "pine decoration",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎎",
        "n": "Japanese dolls",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎏",
        "n": "carp streamer",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎐",
        "n": "wind chime",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎑",
        "n": "moon viewing ceremony",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🧧",
        "n": "red envelope",
        "c":4,
        "v": "11.0"
      },
      {
        "e": "🎀",
        "n": "ribbon",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎁",
        "n": "wrapped gift",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎗️",
        "n": "reminder ribbon",
        "c":4,
        "v": "0.7"
      },
      {
        "e": "🎟️",
        "n": "admission tickets",
        "c":4,
        "v": "0.7"
      },
      {
        "e": "🎫",
        "n": "ticket",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎖️",
        "n": "military medal",
        "c":4,
        "v": "0.7"
      },
      {
        "e": "🏆",
        "n": "trophy",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🏅",
        "n": "sports medal",
        "c":4,
        "v": "1.0"
      },
      {
        "e": "🥇",
        "n": "1st place medal",
        "c":4,
        "v": "3.0"
      },
      {
        "e": "🥈",
        "n": "2nd place medal",
        "c":4,
        "v": "3.0"
      },
      {
        "e": "🥉",
        "n": "3rd place medal",
        "c":4,
        "v": "3.0"
      },
      {
        "e": "⚽",
        "n": "soccer ball",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "⚾",
        "n": "baseball",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🥎",
        "n": "softball",
        "c":4,
        "v": "11.0"
      },
      {
        "e": "🏀",
        "n": "basketball",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🏐",
        "n": "volleyball",
        "c":4,
        "v": "1.0"
      },
      {
        "e": "🏈",
        "n": "american football",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🏉",
        "n": "rugby football",
        "c":4,
        "v": "1.0"
      },
      {
        "e": "🎾",
        "n": "tennis",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🥏",
        "n": "flying disc",
        "c":4,
        "v": "11.0"
      },
      {
        "e": "🎳",
        "n": "bowling",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🏏",
        "n": "cricket game",
        "c":4,
        "v": "1.0"
      },
      {
        "e": "🏑",
        "n": "field hockey",
        "c":4,
        "v": "1.0"
      },
      {
        "e": "🏒",
        "n": "ice hockey",
        "c":4,
        "v": "1.0"
      },
      {
        "e": "🥍",
        "n": "lacrosse",
        "c":4,
        "v": "11.0"
      },
      {
        "e": "🏓",
        "n": "ping pong",
        "c":4,
        "v": "1.0"
      },
      {
        "e": "🏸",
        "n": "badminton",
        "c":4,
        "v": "1.0"
      },
      {
        "e": "🥊",
        "n": "boxing glove",
        "c":4,
        "v": "3.0"
      },
      {
        "e": "🥋",
        "n": "martial arts uniform",
        "c":4,
        "v": "3.0"
      },
      {
        "e": "🥅",
        "n": "goal net",
        "c":4,
        "v": "3.0"
      },
      {
        "e": "⛳",
        "n": "flag in hole",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "⛸️",
        "n": "ice skate",
        "c":4,
        "v": "0.7"
      },
      {
        "e": "🎣",
        "n": "fishing pole",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🤿",
        "n": "diving mask",
        "c":4,
        "v": "12.0"
      },
      {
        "e": "🎽",
        "n": "running shirt",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎿",
        "n": "skis",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🛷",
        "n": "sled",
        "c":4,
        "v": "5.0"
      },
      {
        "e": "🥌",
        "n": "curling stone",
        "c":4,
        "v": "5.0"
      },
      {
        "e": "🎯",
        "n": "direct hit",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🪀",
        "n": "yo-yo",
        "c":4,
        "v": "12.0"
      },
      {
        "e": "🪁",
        "n": "kite",
        "c":4,
        "v": "12.0"
      },
      {
        "e": "🎱",
        "n": "pool 8 ball",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🔮",
        "n": "crystal ball",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🪄",
        "n": "magic wand",
        "c":4,
        "v": "13.0"
      },
      {
        "e": "🧿",
        "n": "nazar amulet",
        "c":4,
        "v": "11.0"
      },
      {
        "e": "🎮",
        "n": "video game",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🕹️",
        "n": "joystick",
        "c":4,
        "v": "0.7"
      },
      {
        "e": "🎰",
        "n": "slot machine",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎲",
        "n": "game die",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🧩",
        "n": "puzzle piece",
        "c":4,
        "v": "11.0"
      },
      {
        "e": "🧸",
        "n": "teddy bear",
        "c":4,
        "v": "11.0"
      },
      {
        "e": "🪅",
        "n": "piñata",
        "c":4,
        "v": "13.0"
      },
      {
        "e": "🪆",
        "n": "nesting dolls",
        "c":4,
        "v": "13.0"
      },
      {
        "e": "♠️",
        "n": "spade suit",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "♥️",
        "n": "heart suit",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "♦️",
        "n": "diamond suit",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "♣️",
        "n": "club suit",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "♟️",
        "n": "chess pawn",
        "c":4,
        "v": "11.0"
      },
      {
        "e": "🃏",
        "n": "joker",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🀄",
        "n": "mahjong red dragon",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎴",
        "n": "flower playing cards",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🎭",
        "n": "performing arts",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🖼️",
        "n": "framed picture",
        "c":4,
        "v": "0.7"
      },
      {
        "e": "🎨",
        "n": "artist palette",
        "c":4,
        "v": "0.6"
      },
      {
        "e": "🧵",
        "n": "thread",
        "c":4,
        "v": "11.0"
      },
      {
        "e": "🪡",
        "n": "sewing needle",
        "c":4,
        "v": "13.0"
      },
      {
        "e": "🧶",
        "n": "yarn",
        "c":4,
        "v": "11.0"
      },
      {
        "e": "🪢",
        "n": "knot",
        "c":4,
        "v": "13.0"
      },
      {
        "e": "👓",
        "n": "glasses",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🕶️",
        "n": "sunglasses",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🥽",
        "n": "goggles",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🥼",
        "n": "lab coat",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🦺",
        "n": "safety vest",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "👔",
        "n": "necktie",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "👕",
        "n": "t-shirt",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "👖",
        "n": "jeans",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🧣",
        "n": "scarf",
        "c":5,
        "v": "5.0"
      },
      {
        "e": "🧤",
        "n": "gloves",
        "c":5,
        "v": "5.0"
      },
      {
        "e": "🧥",
        "n": "coat",
        "c":5,
        "v": "5.0"
      },
      {
        "e": "🧦",
        "n": "socks",
        "c":5,
        "v": "5.0"
      },
      {
        "e": "👗",
        "n": "dress",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "👘",
        "n": "kimono",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🥻",
        "n": "sari",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "🩱",
        "n": "one-piece swimsuit",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "🩲",
        "n": "briefs",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "🩳",
        "n": "shorts",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "👙",
        "n": "bikini",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "👚",
        "n": "woman’s clothes",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "👛",
        "n": "purse",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "👜",
        "n": "handbag",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "👝",
        "n": "clutch bag",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🛍️",
        "n": "shopping bags",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🎒",
        "n": "backpack",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🩴",
        "n": "thong sandal",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "👞",
        "n": "man’s shoe",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "👟",
        "n": "running shoe",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🥾",
        "n": "hiking boot",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🥿",
        "n": "flat shoe",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "👠",
        "n": "high-heeled shoe",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "👡",
        "n": "woman’s sandal",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🩰",
        "n": "ballet shoes",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "👢",
        "n": "woman’s boot",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "👑",
        "n": "crown",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "👒",
        "n": "woman’s hat",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🎩",
        "n": "top hat",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🎓",
        "n": "graduation cap",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🧢",
        "n": "billed cap",
        "c":5,
        "v": "5.0"
      },
      {
        "e": "🪖",
        "n": "military helmet",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "⛑️",
        "n": "rescue worker’s helmet",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "📿",
        "n": "prayer beads",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "💄",
        "n": "lipstick",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "💍",
        "n": "ring",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "💎",
        "n": "gem stone",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🔇",
        "n": "muted speaker",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🔈",
        "n": "speaker low volume",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🔉",
        "n": "speaker medium volume",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🔊",
        "n": "speaker high volume",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📢",
        "n": "loudspeaker",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📣",
        "n": "megaphone",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📯",
        "n": "postal horn",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🔔",
        "n": "bell",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🔕",
        "n": "bell with slash",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🎼",
        "n": "musical score",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🎵",
        "n": "musical note",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🎶",
        "n": "musical notes",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🎙️",
        "n": "studio microphone",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🎚️",
        "n": "level slider",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🎛️",
        "n": "control knobs",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🎤",
        "n": "microphone",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🎧",
        "n": "headphone",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📻",
        "n": "radio",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🎷",
        "n": "saxophone",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🪗",
        "n": "accordion",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "🎸",
        "n": "guitar",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🎹",
        "n": "musical keyboard",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🎺",
        "n": "trumpet",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🎻",
        "n": "violin",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🪕",
        "n": "banjo",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "🥁",
        "n": "drum",
        "c":5,
        "v": "3.0"
      },
      {
        "e": "🪘",
        "n": "long drum",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "📱",
        "n": "mobile phone",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📲",
        "n": "mobile phone with arrow",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "☎️",
        "n": "telephone",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📞",
        "n": "telephone receiver",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📟",
        "n": "pager",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📠",
        "n": "fax machine",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🔋",
        "n": "battery",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🔌",
        "n": "electric plug",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "💻",
        "n": "laptop",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🖥️",
        "n": "desktop computer",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🖨️",
        "n": "printer",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "⌨️",
        "n": "keyboard",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🖱️",
        "n": "computer mouse",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🖲️",
        "n": "trackball",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "💽",
        "n": "computer disk",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "💾",
        "n": "floppy disk",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "💿",
        "n": "optical disk",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📀",
        "n": "dvd",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🧮",
        "n": "abacus",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🎥",
        "n": "movie camera",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🎞️",
        "n": "film frames",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "📽️",
        "n": "film projector",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🎬",
        "n": "clapper board",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📺",
        "n": "television",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📷",
        "n": "camera",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📸",
        "n": "camera with flash",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "📹",
        "n": "video camera",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📼",
        "n": "videocassette",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🔍",
        "n": "magnifying glass tilted left",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🔎",
        "n": "magnifying glass tilted right",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🕯️",
        "n": "candle",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "💡",
        "n": "light bulb",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🔦",
        "n": "flashlight",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🏮",
        "n": "red paper lantern",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🪔",
        "n": "diya lamp",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "📔",
        "n": "notebook with decorative cover",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📕",
        "n": "closed book",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📖",
        "n": "open book",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📗",
        "n": "green book",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📘",
        "n": "blue book",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📙",
        "n": "orange book",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📚",
        "n": "books",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📓",
        "n": "notebook",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📒",
        "n": "ledger",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📃",
        "n": "page with curl",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📜",
        "n": "scroll",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📄",
        "n": "page facing up",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📰",
        "n": "newspaper",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🗞️",
        "n": "rolled-up newspaper",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "📑",
        "n": "bookmark tabs",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🔖",
        "n": "bookmark",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🏷️",
        "n": "label",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "💰",
        "n": "money bag",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🪙",
        "n": "coin",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "💴",
        "n": "yen banknote",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "💵",
        "n": "dollar banknote",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "💶",
        "n": "euro banknote",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "💷",
        "n": "pound banknote",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "💸",
        "n": "money with wings",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "💳",
        "n": "credit card",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🧾",
        "n": "receipt",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "💹",
        "n": "chart increasing with yen",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "✉️",
        "n": "envelope",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📧",
        "n": "e-mail",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📨",
        "n": "incoming envelope",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📩",
        "n": "envelope with arrow",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📤",
        "n": "outbox tray",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📥",
        "n": "inbox tray",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📦",
        "n": "package",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📫",
        "n": "closed mailbox with raised flag",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📪",
        "n": "closed mailbox with lowered flag",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📬",
        "n": "open mailbox with raised flag",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "📭",
        "n": "open mailbox with lowered flag",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "📮",
        "n": "postbox",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🗳️",
        "n": "ballot box with ballot",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "✏️",
        "n": "pencil",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "✒️",
        "n": "black nib",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🖋️",
        "n": "fountain pen",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🖊️",
        "n": "pen",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🖌️",
        "n": "paintbrush",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🖍️",
        "n": "crayon",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "📝",
        "n": "memo",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "💼",
        "n": "briefcase",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📁",
        "n": "file folder",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📂",
        "n": "open file folder",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🗂️",
        "n": "card index dividers",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "📅",
        "n": "calendar",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📆",
        "n": "tear-off calendar",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🗒️",
        "n": "spiral notepad",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🗓️",
        "n": "spiral calendar",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "📇",
        "n": "card index",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📈",
        "n": "chart increasing",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📉",
        "n": "chart decreasing",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📊",
        "n": "bar chart",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📋",
        "n": "clipboard",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📌",
        "n": "pushpin",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📍",
        "n": "round pushpin",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📎",
        "n": "paperclip",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🖇️",
        "n": "linked paperclips",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "📏",
        "n": "straight ruler",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "📐",
        "n": "triangular ruler",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "✂️",
        "n": "scissors",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🗃️",
        "n": "card file box",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🗄️",
        "n": "file cabinet",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🗑️",
        "n": "wastebasket",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🔒",
        "n": "locked",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🔓",
        "n": "unlocked",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🔏",
        "n": "locked with pen",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🔐",
        "n": "locked with key",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🔑",
        "n": "key",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🗝️",
        "n": "old key",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🔨",
        "n": "hammer",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🪓",
        "n": "axe",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "⛏️",
        "n": "pick",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "⚒️",
        "n": "hammer and pick",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🛠️",
        "n": "hammer and wrench",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🗡️",
        "n": "dagger",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "⚔️",
        "n": "crossed swords",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🔫",
        "n": "water pistol",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🪃",
        "n": "boomerang",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "🏹",
        "n": "bow and arrow",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🛡️",
        "n": "shield",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🪚",
        "n": "carpentry saw",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "🔧",
        "n": "wrench",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🪛",
        "n": "screwdriver",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "🔩",
        "n": "nut and bolt",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "⚙️",
        "n": "gear",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🗜️",
        "n": "clamp",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "⚖️",
        "n": "balance scale",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🦯",
        "n": "white cane",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "🔗",
        "n": "link",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "⛓️",
        "n": "chains",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🪝",
        "n": "hook",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "🧰",
        "n": "toolbox",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🧲",
        "n": "magnet",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🪜",
        "n": "ladder",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "⚗️",
        "n": "alembic",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🧪",
        "n": "test tube",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🧫",
        "n": "petri dish",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🧬",
        "n": "dna",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🔬",
        "n": "microscope",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🔭",
        "n": "telescope",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "📡",
        "n": "satellite antenna",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "💉",
        "n": "syringe",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🩸",
        "n": "drop of blood",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "💊",
        "n": "pill",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🩹",
        "n": "adhesive bandage",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "🩺",
        "n": "stethoscope",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "🚪",
        "n": "door",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🛗",
        "n": "elevator",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "🪞",
        "n": "mirror",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "🪟",
        "n": "window",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "🛏️",
        "n": "bed",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🛋️",
        "n": "couch and lamp",
        "c":5,
        "v": "0.7"
      },
      {
        "e": "🪑",
        "n": "chair",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "🚽",
        "n": "toilet",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🪠",
        "n": "plunger",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "🚿",
        "n": "shower",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🛁",
        "n": "bathtub",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🪤",
        "n": "mouse trap",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "🪒",
        "n": "razor",
        "c":5,
        "v": "12.0"
      },
      {
        "e": "🧴",
        "n": "lotion bottle",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🧷",
        "n": "safety pin",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🧹",
        "n": "broom",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🧺",
        "n": "basket",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🧻",
        "n": "roll of paper",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🪣",
        "n": "bucket",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "🧼",
        "n": "soap",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🪥",
        "n": "toothbrush",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "🧽",
        "n": "sponge",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🧯",
        "n": "fire extinguisher",
        "c":5,
        "v": "11.0"
      },
      {
        "e": "🛒",
        "n": "shopping cart",
        "c":5,
        "v": "3.0"
      },
      {
        "e": "🚬",
        "n": "cigarette",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "⚰️",
        "n": "coffin",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🪦",
        "n": "headstone",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "⚱️",
        "n": "funeral urn",
        "c":5,
        "v": "1.0"
      },
      {
        "e": "🗿",
        "n": "moai",
        "c":5,
        "v": "0.6"
      },
      {
        "e": "🪧",
        "n": "placard",
        "c":5,
        "v": "13.0"
      },
      {
        "e": "🏧",
        "n": "ATM sign",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🚮",
        "n": "litter in bin sign",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🚰",
        "n": "potable water",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "♿",
        "n": "wheelchair symbol",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🚹",
        "n": "men’s room",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🚺",
        "n": "women’s room",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🚻",
        "n": "restroom",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🚼",
        "n": "baby symbol",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🚾",
        "n": "water closet",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🛂",
        "n": "passport control",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🛃",
        "n": "customs",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🛄",
        "n": "baggage claim",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🛅",
        "n": "left luggage",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "⚠️",
        "n": "warning",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🚸",
        "n": "children crossing",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "⛔",
        "n": "no entry",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🚫",
        "n": "prohibited",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🚳",
        "n": "no bicycles",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🚭",
        "n": "no smoking",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🚯",
        "n": "no littering",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🚱",
        "n": "non-potable water",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🚷",
        "n": "no pedestrians",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "📵",
        "n": "no mobile phones",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🔞",
        "n": "no one under eighteen",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "☢️",
        "n": "radioactive",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "☣️",
        "n": "biohazard",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "⬆️",
        "n": "up arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "↗️",
        "n": "up-right arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "➡️",
        "n": "right arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "↘️",
        "n": "down-right arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⬇️",
        "n": "down arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "↙️",
        "n": "down-left arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⬅️",
        "n": "left arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "↖️",
        "n": "up-left arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "↕️",
        "n": "up-down arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "↔️",
        "n": "left-right arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "↩️",
        "n": "right arrow curving left",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "↪️",
        "n": "left arrow curving right",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⤴️",
        "n": "right arrow curving up",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⤵️",
        "n": "right arrow curving down",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔃",
        "n": "clockwise vertical arrows",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔄",
        "n": "counterclockwise arrows button",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🔙",
        "n": "BACK arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔚",
        "n": "END arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔛",
        "n": "ON! arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔜",
        "n": "SOON arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔝",
        "n": "TOP arrow",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🛐",
        "n": "place of worship",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "⚛️",
        "n": "atom symbol",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🕉️",
        "n": "om",
        "c":6,
        "v": "0.7"
      },
      {
        "e": "✡️",
        "n": "star of David",
        "c":6,
        "v": "0.7"
      },
      {
        "e": "☸️",
        "n": "wheel of dharma",
        "c":6,
        "v": "0.7"
      },
      {
        "e": "☯️",
        "n": "yin yang",
        "c":6,
        "v": "0.7"
      },
      {
        "e": "✝️",
        "n": "latin cross",
        "c":6,
        "v": "0.7"
      },
      {
        "e": "☦️",
        "n": "orthodox cross",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "☪️",
        "n": "star and crescent",
        "c":6,
        "v": "0.7"
      },
      {
        "e": "☮️",
        "n": "peace symbol",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🕎",
        "n": "menorah",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🔯",
        "n": "dotted six-pointed star",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♈",
        "n": "Aries",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♉",
        "n": "Taurus",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♊",
        "n": "Gemini",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♋",
        "n": "Cancer",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♌",
        "n": "Leo",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♍",
        "n": "Virgo",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♎",
        "n": "Libra",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♏",
        "n": "Scorpio",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♐",
        "n": "Sagittarius",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♑",
        "n": "Capricorn",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♒",
        "n": "Aquarius",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♓",
        "n": "Pisces",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⛎",
        "n": "Ophiuchus",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔀",
        "n": "shuffle tracks button",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🔁",
        "n": "repeat button",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🔂",
        "n": "repeat single button",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "▶️",
        "n": "play button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⏩",
        "n": "fast-forward button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⏭️",
        "n": "next track button",
        "c":6,
        "v": "0.7"
      },
      {
        "e": "⏯️",
        "n": "play or pause button",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "◀️",
        "n": "reverse button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⏪",
        "n": "fast reverse button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⏮️",
        "n": "last track button",
        "c":6,
        "v": "0.7"
      },
      {
        "e": "🔼",
        "n": "upwards button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⏫",
        "n": "fast up button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔽",
        "n": "downwards button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⏬",
        "n": "fast down button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⏸️",
        "n": "pause button",
        "c":6,
        "v": "0.7"
      },
      {
        "e": "⏹️",
        "n": "stop button",
        "c":6,
        "v": "0.7"
      },
      {
        "e": "⏺️",
        "n": "record button",
        "c":6,
        "v": "0.7"
      },
      {
        "e": "⏏️",
        "n": "eject button",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🎦",
        "n": "cinema",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔅",
        "n": "dim button",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🔆",
        "n": "bright button",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "📶",
        "n": "antenna bars",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "📳",
        "n": "vibration mode",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "📴",
        "n": "mobile phone off",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♀️",
        "n": "female sign",
        "c":6,
        "v": "4.0"
      },
      {
        "e": "♂️",
        "n": "male sign",
        "c":6,
        "v": "4.0"
      },
      {
        "e": "⚧️",
        "n": "transgender symbol",
        "c":6,
        "v": "13.0"
      },
      {
        "e": "✖️",
        "n": "multiply",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "➕",
        "n": "plus",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "➖",
        "n": "minus",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "➗",
        "n": "divide",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "♾️",
        "n": "infinity",
        "c":6,
        "v": "11.0"
      },
      {
        "e": "‼️",
        "n": "double exclamation mark",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⁉️",
        "n": "exclamation question mark",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "❓",
        "n": "red question mark",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "❔",
        "n": "white question mark",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "❕",
        "n": "white exclamation mark",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "❗",
        "n": "red exclamation mark",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "〰️",
        "n": "wavy dash",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "💱",
        "n": "currency exchange",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "💲",
        "n": "heavy dollar sign",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⚕️",
        "n": "medical symbol",
        "c":6,
        "v": "4.0"
      },
      {
        "e": "♻️",
        "n": "recycling symbol",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⚜️",
        "n": "fleur-de-lis",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "🔱",
        "n": "trident emblem",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "📛",
        "n": "name badge",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔰",
        "n": "Japanese symbol for beginner",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⭕",
        "n": "hollow red circle",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "✅",
        "n": "check mark button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "☑️",
        "n": "check box with check",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "✔️",
        "n": "check mark",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "❌",
        "n": "cross mark",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "❎",
        "n": "cross mark button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "➰",
        "n": "curly loop",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "➿",
        "n": "double curly loop",
        "c":6,
        "v": "1.0"
      },
      {
        "e": "〽️",
        "n": "part alternation mark",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "✳️",
        "n": "eight-spoked asterisk",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "✴️",
        "n": "eight-pointed star",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "❇️",
        "n": "sparkle",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "©️",
        "n": "copyright",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "®️",
        "n": "registered",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "™️",
        "n": "trade mark",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "#️⃣",
        "n": "keycap #",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "*️⃣",
        "n": "keycap *",
        "c":6,
        "v": "2.0"
      },
      {
        "e": "0️⃣",
        "n": "keycap 0",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "1️⃣",
        "n": "keycap 1",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "2️⃣",
        "n": "keycap 2",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "3️⃣",
        "n": "keycap 3",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "4️⃣",
        "n": "keycap 4",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "5️⃣",
        "n": "keycap 5",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "6️⃣",
        "n": "keycap 6",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "7️⃣",
        "n": "keycap 7",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "8️⃣",
        "n": "keycap 8",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "9️⃣",
        "n": "keycap 9",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔟",
        "n": "keycap 10",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔠",
        "n": "input latin uppercase",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔡",
        "n": "input latin lowercase",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔢",
        "n": "input numbers",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔣",
        "n": "input symbols",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔤",
        "n": "input latin letters",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🅰️",
        "n": "A button (blood type)",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🆎",
        "n": "AB button (blood type)",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🅱️",
        "n": "B button (blood type)",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🆑",
        "n": "CL button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🆒",
        "n": "COOL button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🆓",
        "n": "FREE button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "ℹ️",
        "n": "information",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🆔",
        "n": "ID button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "Ⓜ️",
        "n": "circled M",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🆕",
        "n": "NEW button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🆖",
        "n": "NG button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🅾️",
        "n": "O button (blood type)",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🆗",
        "n": "OK button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🅿️",
        "n": "P button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🆘",
        "n": "SOS button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🆙",
        "n": "UP! button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🆚",
        "n": "VS button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🈁",
        "n": "Japanese “here” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🈂️",
        "n": "Japanese “service charge” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🈷️",
        "n": "Japanese “monthly amount” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🈶",
        "n": "Japanese “not free of charge” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🈯",
        "n": "Japanese “reserved” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🉐",
        "n": "Japanese “bargain” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🈹",
        "n": "Japanese “discount” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🈚",
        "n": "Japanese “free of charge” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🈲",
        "n": "Japanese “prohibited” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🉑",
        "n": "Japanese “acceptable” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🈸",
        "n": "Japanese “application” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🈴",
        "n": "Japanese “passing grade” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🈳",
        "n": "Japanese “vacancy” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "㊗️",
        "n": "Japanese “congratulations” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "㊙️",
        "n": "Japanese “secret” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🈺",
        "n": "Japanese “open for business” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🈵",
        "n": "Japanese “no vacancy” button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔴",
        "n": "red circle",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🟠",
        "n": "orange circle",
        "c":6,
        "v": "12.0"
      },
      {
        "e": "🟡",
        "n": "yellow circle",
        "c":6,
        "v": "12.0"
      },
      {
        "e": "🟢",
        "n": "green circle",
        "c":6,
        "v": "12.0"
      },
      {
        "e": "🔵",
        "n": "blue circle",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🟣",
        "n": "purple circle",
        "c":6,
        "v": "12.0"
      },
      {
        "e": "🟤",
        "n": "brown circle",
        "c":6,
        "v": "12.0"
      },
      {
        "e": "⚫",
        "n": "black circle",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⚪",
        "n": "white circle",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🟥",
        "n": "red square",
        "c":6,
        "v": "12.0"
      },
      {
        "e": "🟧",
        "n": "orange square",
        "c":6,
        "v": "12.0"
      },
      {
        "e": "🟨",
        "n": "yellow square",
        "c":6,
        "v": "12.0"
      },
      {
        "e": "🟩",
        "n": "green square",
        "c":6,
        "v": "12.0"
      },
      {
        "e": "🟦",
        "n": "blue square",
        "c":6,
        "v": "12.0"
      },
      {
        "e": "🟪",
        "n": "purple square",
        "c":6,
        "v": "12.0"
      },
      {
        "e": "🟫",
        "n": "brown square",
        "c":6,
        "v": "12.0"
      },
      {
        "e": "⬛",
        "n": "black large square",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "⬜",
        "n": "white large square",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "◼️",
        "n": "black medium square",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "◻️",
        "n": "white medium square",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "◾",
        "n": "black medium-small square",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "◽",
        "n": "white medium-small square",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "▪️",
        "n": "black small square",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "▫️",
        "n": "white small square",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔶",
        "n": "large orange diamond",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔷",
        "n": "large blue diamond",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔸",
        "n": "small orange diamond",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔹",
        "n": "small blue diamond",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔺",
        "n": "red triangle pointed up",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔻",
        "n": "red triangle pointed down",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "💠",
        "n": "diamond with a dot",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔘",
        "n": "radio button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔳",
        "n": "white square button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🔲",
        "n": "black square button",
        "c":6,
        "v": "0.6"
      },
      {
        "e": "🏁",
        "n": "chequered flag",
        "c":7,
        "v": "0.6"
      },
      {
        "e": "🚩",
        "n": "triangular flag",
        "c":7,
        "v": "0.6"
      },
      {
        "e": "🎌",
        "n": "crossed flags",
        "c":7,
        "v": "0.6"
      },
      {
        "e": "🏴",
        "n": "black flag",
        "c":7,
        "v": "1.0"
      },
      {
        "e": "🏳️",
        "n": "white flag",
        "c":7,
        "v": "0.7"
      },
      {
        "e": "🏳️‍🌈",
        "n": "rainbow flag",
        "c":7,
        "v": "4.0"
      },
      {
        "e": "🏳️‍⚧️",
        "n": "transgender flag",
        "c":7,
        "v": "13.0"
      },
      {
        "e": "🏴‍☠️",
        "n": "pirate flag",
        "c":7,
        "v": "11.0"
      },
      {
        "e": "🇦🇨",
        "n": "flag Ascension Island",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇩",
        "n": "flag Andorra",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇪",
        "n": "flag United Arab Emirates",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇫",
        "n": "flag Afghanistan",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇬",
        "n": "flag Antigua & Barbuda",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇮",
        "n": "flag Anguilla",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇱",
        "n": "flag Albania",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇲",
        "n": "flag Armenia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇴",
        "n": "flag Angola",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇶",
        "n": "flag Antarctica",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇷",
        "n": "flag Argentina",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇸",
        "n": "flag American Samoa",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇹",
        "n": "flag Austria",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇺",
        "n": "flag Australia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇼",
        "n": "flag Aruba",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇽",
        "n": "flag Åland Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇦🇿",
        "n": "flag Azerbaijan",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇦",
        "n": "flag Bosnia & Herzegovina",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇧",
        "n": "flag Barbados",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇩",
        "n": "flag Bangladesh",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇪",
        "n": "flag Belgium",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇫",
        "n": "flag Burkina Faso",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇬",
        "n": "flag Bulgaria",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇭",
        "n": "flag Bahrain",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇮",
        "n": "flag Burundi",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇯",
        "n": "flag Benin",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇱",
        "n": "flag St. Barthélemy",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇲",
        "n": "flag Bermuda",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇳",
        "n": "flag Brunei",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇴",
        "n": "flag Bolivia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇶",
        "n": "flag Caribbean Netherlands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇷",
        "n": "flag Brazil",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇸",
        "n": "flag Bahamas",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇹",
        "n": "flag Bhutan",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇻",
        "n": "flag Bouvet Island",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇼",
        "n": "flag Botswana",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇾",
        "n": "flag Belarus",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇧🇿",
        "n": "flag Belize",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇦",
        "n": "flag Canada",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇨",
        "n": "flag Cocos (Keeling) Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇩",
        "n": "flag Congo - Kinshasa",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇫",
        "n": "flag Central African Republic",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇬",
        "n": "flag Congo - Brazzaville",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇭",
        "n": "flag Switzerland",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇮",
        "n": "flag Côte d’Ivoire",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇰",
        "n": "flag Cook Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇱",
        "n": "flag Chile",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇲",
        "n": "flag Cameroon",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇳",
        "n": "flag China",
        "c":7,
        "v": "0.6"
      },
      {
        "e": "🇨🇴",
        "n": "flag Colombia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇵",
        "n": "flag Clipperton Island",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇷",
        "n": "flag Costa Rica",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇺",
        "n": "flag Cuba",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇻",
        "n": "flag Cape Verde",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇼",
        "n": "flag Curaçao",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇽",
        "n": "flag Christmas Island",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇾",
        "n": "flag Cyprus",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇨🇿",
        "n": "flag Czechia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇩🇪",
        "n": "flag Germany",
        "c":7,
        "v": "0.6"
      },
      {
        "e": "🇩🇬",
        "n": "flag Diego Garcia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇩🇯",
        "n": "flag Djibouti",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇩🇰",
        "n": "flag Denmark",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇩🇲",
        "n": "flag Dominica",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇩🇴",
        "n": "flag Dominican Republic",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇩🇿",
        "n": "flag Algeria",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇪🇦",
        "n": "flag Ceuta & Melilla",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇪🇨",
        "n": "flag Ecuador",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇪🇪",
        "n": "flag Estonia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇪🇬",
        "n": "flag Egypt",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇪🇭",
        "n": "flag Western Sahara",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇪🇷",
        "n": "flag Eritrea",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇪🇸",
        "n": "flag Spain",
        "c":7,
        "v": "0.6"
      },
      {
        "e": "🇪🇹",
        "n": "flag Ethiopia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇪🇺",
        "n": "flag European Union",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇫🇮",
        "n": "flag Finland",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇫🇯",
        "n": "flag Fiji",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇫🇰",
        "n": "flag Falkland Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇫🇲",
        "n": "flag Micronesia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇫🇴",
        "n": "flag Faroe Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇫🇷",
        "n": "flag France",
        "c":7,
        "v": "0.6"
      },
      {
        "e": "🇬🇦",
        "n": "flag Gabon",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇧",
        "n": "flag United Kingdom",
        "c":7,
        "v": "0.6"
      },
      {
        "e": "🇬🇩",
        "n": "flag Grenada",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇪",
        "n": "flag Georgia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇫",
        "n": "flag French Guiana",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇬",
        "n": "flag Guernsey",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇭",
        "n": "flag Ghana",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇮",
        "n": "flag Gibraltar",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇱",
        "n": "flag Greenland",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇲",
        "n": "flag Gambia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇳",
        "n": "flag Guinea",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇵",
        "n": "flag Guadeloupe",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇶",
        "n": "flag Equatorial Guinea",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇷",
        "n": "flag Greece",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇸",
        "n": "flag South Georgia & South Sandwich Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇹",
        "n": "flag Guatemala",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇺",
        "n": "flag Guam",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇼",
        "n": "flag Guinea-Bissau",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇬🇾",
        "n": "flag Guyana",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇭🇰",
        "n": "flag Hong Kong SAR China",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇭🇲",
        "n": "flag Heard & McDonald Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇭🇳",
        "n": "flag Honduras",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇭🇷",
        "n": "flag Croatia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇭🇹",
        "n": "flag Haiti",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇭🇺",
        "n": "flag Hungary",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇮🇨",
        "n": "flag Canary Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇮🇩",
        "n": "flag Indonesia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇮🇪",
        "n": "flag Ireland",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇮🇱",
        "n": "flag Israel",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇮🇲",
        "n": "flag Isle of Man",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇮🇳",
        "n": "flag India",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇮🇴",
        "n": "flag British Indian Ocean Territory",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇮🇶",
        "n": "flag Iraq",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇮🇷",
        "n": "flag Iran",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇮🇸",
        "n": "flag Iceland",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇮🇹",
        "n": "flag Italy",
        "c":7,
        "v": "0.6"
      },
      {
        "e": "🇯🇪",
        "n": "flag Jersey",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇯🇲",
        "n": "flag Jamaica",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇯🇴",
        "n": "flag Jordan",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇯🇵",
        "n": "flag Japan",
        "c":7,
        "v": "0.6"
      },
      {
        "e": "🇰🇪",
        "n": "flag Kenya",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇰🇬",
        "n": "flag Kyrgyzstan",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇰🇭",
        "n": "flag Cambodia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇰🇮",
        "n": "flag Kiribati",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇰🇲",
        "n": "flag Comoros",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇰🇳",
        "n": "flag St. Kitts & Nevis",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇰🇵",
        "n": "flag North Korea",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇰🇷",
        "n": "flag South Korea",
        "c":7,
        "v": "0.6"
      },
      {
        "e": "🇰🇼",
        "n": "flag Kuwait",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇰🇾",
        "n": "flag Cayman Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇰🇿",
        "n": "flag Kazakhstan",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇱🇦",
        "n": "flag Laos",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇱🇧",
        "n": "flag Lebanon",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇱🇨",
        "n": "flag St. Lucia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇱🇮",
        "n": "flag Liechtenstein",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇱🇰",
        "n": "flag Sri Lanka",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇱🇷",
        "n": "flag Liberia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇱🇸",
        "n": "flag Lesotho",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇱🇹",
        "n": "flag Lithuania",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇱🇺",
        "n": "flag Luxembourg",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇱🇻",
        "n": "flag Latvia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇱🇾",
        "n": "flag Libya",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇦",
        "n": "flag Morocco",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇨",
        "n": "flag Monaco",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇩",
        "n": "flag Moldova",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇪",
        "n": "flag Montenegro",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇫",
        "n": "flag St. Martin",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇬",
        "n": "flag Madagascar",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇭",
        "n": "flag Marshall Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇰",
        "n": "flag North Macedonia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇱",
        "n": "flag Mali",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇲",
        "n": "flag Myanmar (Burma)",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇳",
        "n": "flag Mongolia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇴",
        "n": "flag Macao SAR China",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇵",
        "n": "flag Northern Mariana Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇶",
        "n": "flag Martinique",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇷",
        "n": "flag Mauritania",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇸",
        "n": "flag Montserrat",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇹",
        "n": "flag Malta",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇺",
        "n": "flag Mauritius",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇻",
        "n": "flag Maldives",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇼",
        "n": "flag Malawi",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇽",
        "n": "flag Mexico",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇾",
        "n": "flag Malaysia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇲🇿",
        "n": "flag Mozambique",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇳🇦",
        "n": "flag Namibia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇳🇨",
        "n": "flag New Caledonia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇳🇪",
        "n": "flag Niger",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇳🇫",
        "n": "flag Norfolk Island",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇳🇬",
        "n": "flag Nigeria",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇳🇮",
        "n": "flag Nicaragua",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇳🇱",
        "n": "flag Netherlands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇳🇴",
        "n": "flag Norway",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇳🇵",
        "n": "flag Nepal",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇳🇷",
        "n": "flag Nauru",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇳🇺",
        "n": "flag Niue",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇳🇿",
        "n": "flag New Zealand",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇴🇲",
        "n": "flag Oman",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇦",
        "n": "flag Panama",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇪",
        "n": "flag Peru",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇫",
        "n": "flag French Polynesia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇬",
        "n": "flag Papua New Guinea",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇭",
        "n": "flag Philippines",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇰",
        "n": "flag Pakistan",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇱",
        "n": "flag Poland",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇲",
        "n": "flag St. Pierre & Miquelon",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇳",
        "n": "flag Pitcairn Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇷",
        "n": "flag Puerto Rico",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇸",
        "n": "flag Palestinian Territories",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇹",
        "n": "flag Portugal",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇼",
        "n": "flag Palau",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇵🇾",
        "n": "flag Paraguay",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇶🇦",
        "n": "flag Qatar",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇷🇪",
        "n": "flag Réunion",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇷🇴",
        "n": "flag Romania",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇷🇸",
        "n": "flag Serbia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇷🇺",
        "n": "flag Russia",
        "c":7,
        "v": "0.6"
      },
      {
        "e": "🇷🇼",
        "n": "flag Rwanda",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇦",
        "n": "flag Saudi Arabia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇧",
        "n": "flag Solomon Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇨",
        "n": "flag Seychelles",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇩",
        "n": "flag Sudan",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇪",
        "n": "flag Sweden",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇬",
        "n": "flag Singapore",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇭",
        "n": "flag St. Helena",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇮",
        "n": "flag Slovenia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇯",
        "n": "flag Svalbard & Jan Mayen",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇰",
        "n": "flag Slovakia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇱",
        "n": "flag Sierra Leone",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇲",
        "n": "flag San Marino",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇳",
        "n": "flag Senegal",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇴",
        "n": "flag Somalia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇷",
        "n": "flag Suriname",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇸",
        "n": "flag South Sudan",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇹",
        "n": "flag São Tomé & Príncipe",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇻",
        "n": "flag El Salvador",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇽",
        "n": "flag Sint Maarten",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇾",
        "n": "flag Syria",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇸🇿",
        "n": "flag Eswatini",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇦",
        "n": "flag Tristan da Cunha",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇨",
        "n": "flag Turks & Caicos Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇩",
        "n": "flag Chad",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇫",
        "n": "flag French Southern Territories",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇬",
        "n": "flag Togo",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇭",
        "n": "flag Thailand",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇯",
        "n": "flag Tajikistan",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇰",
        "n": "flag Tokelau",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇱",
        "n": "flag Timor-Leste",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇲",
        "n": "flag Turkmenistan",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇳",
        "n": "flag Tunisia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇴",
        "n": "flag Tonga",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇷",
        "n": "flag Turkey",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇹",
        "n": "flag Trinidad & Tobago",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇻",
        "n": "flag Tuvalu",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇼",
        "n": "flag Taiwan",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇹🇿",
        "n": "flag Tanzania",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇺🇦",
        "n": "flag Ukraine",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇺🇬",
        "n": "flag Uganda",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇺🇲",
        "n": "flag U.S. Outlying Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇺🇳",
        "n": "flag United Nations",
        "c":7,
        "v": "4.0"
      },
      {
        "e": "🇺🇸",
        "n": "flag United States",
        "c":7,
        "v": "0.6"
      },
      {
        "e": "🇺🇾",
        "n": "flag Uruguay",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇺🇿",
        "n": "flag Uzbekistan",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇻🇦",
        "n": "flag Vatican City",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇻🇨",
        "n": "flag St. Vincent & Grenadines",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇻🇪",
        "n": "flag Venezuela",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇻🇬",
        "n": "flag British Virgin Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇻🇮",
        "n": "flag U.S. Virgin Islands",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇻🇳",
        "n": "flag Vietnam",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇻🇺",
        "n": "flag Vanuatu",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇼🇫",
        "n": "flag Wallis & Futuna",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇼🇸",
        "n": "flag Samoa",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇽🇰",
        "n": "flag Kosovo",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇾🇪",
        "n": "flag Yemen",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇾🇹",
        "n": "flag Mayotte",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇿🇦",
        "n": "flag South Africa",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇿🇲",
        "n": "flag Zambia",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🇿🇼",
        "n": "flag Zimbabwe",
        "c":7,
        "v": "2.0"
      },
      {
        "e": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        "n": "flag England",
        "c":7,
        "v": "5.0"
      },
      {
        "e": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        "n": "flag Scotland",
        "c":7,
        "v": "5.0"
      },
      {
        "e": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
        "n": "flag Wales",
        "c":7,
        "v": "5.0"
      }
    ]
  ;
  kn = kn.filter(function(x){
    return Number(x.v) <= 12.0
  })

  function En(e, n, a) {
    return (
      n in e
        ? Object.defineProperty(e, n, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[n] = a),
      e
    );
  }
  function Cn(e, n) {
    var a = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var t = Object.getOwnPropertySymbols(e);
      n &&
        (t = t.filter(function (n) {
          return Object.getOwnPropertyDescriptor(e, n).enumerable;
        })),
        a.push.apply(a, t);
    }
    return a;
  }
  function Dn(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) {
          for (var n = 0, a = new Array(e.length); n < e.length; n++)
            a[n] = e[n];
          return a;
        }
      })(e) ||
      (function (e) {
        if (
          Symbol.iterator in Object(e) ||
          "[object Arguments]" === Object.prototype.toString.call(e)
        )
          return Array.from(e);
      })(e) ||
      (function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      })()
    );
  }
  var xn = "emojiPicker.recent";
  function Bn() {
    let detaultIcons = [
      {
          "e": "⭐",
          "n": "star",
          "c": 3,
          "v": "0.6",
          "key": "star"
      },
      {
          "e": "📁",
          "n": "file folder",
          "c": 5,
          "v": "0.6",
          "key": "file folder"
      },
      {
          "e": "🗺️",
          "n": "world map",
          "c": 3,
          "v": "0.7",
          "key": "world map"
      },
      {
          "e": "☠️",
          "n": "skull and crossbones",
          "c": 0,
          "v": "1.0",
          "key": "skull and crossbones"
      },
      {
          "e": "🚪",
          "n": "door",
          "c": 5,
          "v": "0.6",
          "key": "door"
      },
      {
          "e": "🏰",
          "n": "castle",
          "c": 3,
          "v": "0.6",
          "key": "castle"
      },
      {
          "e": "📖",
          "n": "open book",
          "c": 5,
          "v": "0.6",
          "key": "open book"
      },
      {
          "e": "🎒",
          "n": "backpack",
          "c": 5,
          "v": "0.6",
          "key": "backpack"
      },
      {
          "e": "🔥",
          "n": "fire",
          "c": 3,
          "v": "0.6",
          "key": "fire"
      },
      {
          "e": "🧙",
          "n": "mage",
          "c": 0,
          "v": "5.0",
          "key": "mage"
      },
      {
          "e": "💰",
          "n": "money bag",
          "c": 5,
          "v": "0.6",
          "key": "money bag"
      },
      {
          "e": "🛠️",
          "n": "hammer and wrench",
          "c": 5,
          "v": "0.7",
          "key": "hammer and wrench"
      },
      {
          "e": "🧪",
          "n": "test tube",
          "c": 5,
          "v": "11.0",
          "key": "test tube"
      },
      {
          "e": "🛡️",
          "n": "shield",
          "c": 5,
          "v": "0.7",
          "key": "shield"
      },
      {
          "e": "🗡️",
          "n": "dagger",
          "c": 5,
          "v": "0.7",
          "key": "dagger"
      },
      {
          "e": "⚡",
          "n": "high voltage",
          "c": 3,
          "v": "0.6",
          "key": "high voltage"
      },
      {
          "e": "♟️",
          "n": "chess pawn",
          "c": 4,
          "v": "11.0",
          "key": "chess pawn"
      },
      {
          "e": "⛵",
          "n": "sailboat",
          "c": 3,
          "v": "0.6",
          "key": "sailboat"
      },
      {
          "e": "👤",
          "n": "bust in silhouette",
          "c": 0,
          "v": "0.6",
          "key": "bust in silhouette"
      },
      {
          "e": "🧑",
          "n": "person",
          "c": 0,
          "v": "5.0",
          "key": "person"
      }
  ]//[game.settings.get("enchiridion", "defaultIcons")]

  
    //console.log([...new Set()])
    return detaultIcons.reverse().concat(JSON.parse(localStorage.getItem(xn))).filter((v,i,a)=>a.findIndex(t=>(t.n === v.n))===i);
  }
  function jn(e) {
    var n = Bn(),
      a = (function (e) {
        for (var n = 1; n < arguments.length; n++) {
          var a = null != arguments[n] ? arguments[n] : {};
          n % 2
            ? Cn(a, !0).forEach(function (n) {
                En(e, n, a[n]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a))
            : Cn(a).forEach(function (n) {
                Object.defineProperty(
                  e,
                  n,
                  Object.getOwnPropertyDescriptor(a, n)
                );
              });
        }
        return e;
      })({}, e, { key: e.n });
    localStorage.setItem(
      xn,
      JSON.stringify(
        [a]
          .concat(
            Dn(
              n.filter(function (e) {
                return e.key !== a.key;
              })
            )
          )
          .slice(0, 100)
      )
    );
  }
  var On = "emoji-picker__emoji";
  var zn = "emoji-picker__emojis";
  function Mn(e, n) {
    var a = un("div", zn);
    return (

      e?.forEach(function (e) {
        return a.appendChild(
          (function (e, n) {
            var a = un("button", On);
            return (
              (a.innerHTML = e.e),
              a.addEventListener("click", function () {
                jn(e), n.emit(ee, e.e), n.emit($);
              }),
              a.addEventListener("mouseover", function () {
                return n.emit(ie, e);
              }),
              a.addEventListener("mouseout", function () {
                return n.emit(re);
              }),
              a
            );
          })(e, n)
        );
      }),
      a
    );
  }
  var Ln = "emoji-picker__search-container",
    Nn = "emoji-picker__search",
    Tn = "emoji-picker__search-icon",
    Sn = "emoji-picker__search-not-found",
    Pn = "emoji-picker__search-not-found-icon";
  var An = "active",
    Hn = "emoji-picker__tabs-container",
    In = "emoji-picker__tabs",
    Wn = "emoji-picker__tab",
    qn = "emoji-picker__tab-body",
    Rn = {};
  kn.forEach(function (e) {
    var n = Rn[yn[e.c]];
    n || (n = Rn[yn[e.c]] = []), n.push(e);
  });
  var Vn = {
    "Smileys & People": dn,
    "Animals & Nature": cn,
    "Food & Drink": ln,
    Activities: Fn,
    "Travel & Places": on,
    Objects: gn,
    Symbols: _n,
    Flags: sn,
  };
  function Un(e) {
    function n(e, n) {
      var a = un("li", Wn);
      return (
        a.addEventListener("click", function () {
          return (function (e) {
            o.children[i].classList.remove(An),
              t.children[i].classList.remove(An),
              (i = e),
              o.children[i].classList.add(An),
              t.children[i].classList.add(An);
          })(e);
        }),
        (a.innerHTML = n),
        a
      );
    }
    var a = un("div", Hn),
      t = un("ul", In),
      i = 0,
      r = n(0, mn);
      r.classList.add(An)
    t.appendChild(r),
      Object.keys(Vn).forEach(function (e, a) {
        var r = n(a + 1, Vn[e]);
        /*a + 1 === i && r.classList.add(An),*/ t.appendChild(r);
      }),
      a.appendChild(t);
    var o = un("div"),
      c = un("div", qn),
      l = un("h2");
    return (
      (l.innerHTML = "Defaults & Recently Used"),

      c.appendChild(l),
      c.appendChild(Mn(Bn(), e)),
      c.classList.add(An),
      o.appendChild(c),
      Object.keys(Vn).forEach(function (n, a) {
        var t = un("div", qn);
        a + 1 === i && t.classList.add(An);
        var r = un("h2");
        (r.innerHTML = n),
          t.appendChild(r),
          t.appendChild(Mn(Rn[n], e)),
          o.appendChild(t);
      }),
      a.appendChild(o),
      a
    );
  }
  var Yn = "emoji-picker",
    Xn = "emoji-picker__content";
  return function (e, a) {
    var t,
      i,
      r = !1,
      o = new n();

    function c(n) {
      for (var a = n.target; a; ) {
        if (a === t || a === e) return;
        a = a.parentElement;
      }
      l();
    }
    function l() {
      (r = !1),
        document.body.removeChild(t),
        i.destroy(),
        document.removeEventListener("click", c),
        document.removeEventListener("keydown", s);
    }
    function s(e) {
      "Escape" === e.key && l();
    }
    function F() {
      t = un("div", Yn);
      var n = un("div", Xn),
        a = (function (e) {
          var n = un("div", Ln),
            a = un("input", Nn);
          (a.placeholder = "Search"),
            n.appendChild(a),
            a.addEventListener("keydown", function (n) {
              "Escape" === n.key &&
                "" !== a.value &&
                (n.stopPropagation(), (a.value = ""), e.emit(ne));
            }),
            a.addEventListener("keyup", function () {
              if (a.value) {
                e.emit(ae);
                var n = kn.filter(function (e) {
                  return e.n.includes(a.value)
                  //return e.n.filter(function (e) {
                  //  return e.indexOf(a.value) >= 0;
                  //}).length;
                });
                if (n.length) e.emit(re), e.emit(te, Mn(n, e));
                else {
                  var t = un("div", Sn),
                    i = un("div", Pn);
                  (i.innerHTML = fn), t.appendChild(i);
                  var r = un("h2");
                  (r.innerHTML = "No emojis found"),
                    t.appendChild(r),
                    e.emit(te, t);
                }
              } else e.emit(ne);
            });
          var t = un("span", Tn);
          return (
            (t.innerHTML = pn),
            n.appendChild(t),
            setTimeout(function () {
              return a.focus();
            }),
            n
          );
        })(o);
      t.appendChild(a), t.appendChild(n);
      var r = Un(o);
      n.appendChild(r),
        o.on(ae, function () {
          n.contains(r) && n.removeChild(r);
        }),
        o.on(ne, function () {
          n.contains(r) || (hn(n), n.appendChild(r));
        }),
        o.on(te, function (e) {
          hn(n), n.appendChild(e);
        }),
        t.appendChild(
          (function (e) {
            var n = un("div", wn),
              a = un("div", bn);
            n.appendChild(a);
            var t = un("div", vn);
            return (
              n.appendChild(t),
              e.on(ie, function (e) {
                (a.innerHTML = e.e), (t.innerHTML = e.n/*[0]*/);
              }),
              e.on(re, function () {
                (a.innerHTML = ""), (t.innerHTML = "");
              }),
              n
            );
          })(o)
        ),
        document.body.appendChild(t),
        document.addEventListener("click", c),
        document.addEventListener("keydown", s),
        (i = new Z(e, t, { placement: "right-start" }));
    }
    o.on($, l),
      o.on(ee, a),
      //(e.innerHTML = dn),
      e.addEventListener("click", function () {
        (r = !r) ? F() : l();
      });
  };
});
//# sourceMappingURL=/sm/52c57c8ae8e405c2b478eb53cac736d13094011c31f78454700821f1a7497690.map
