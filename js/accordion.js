/*!
 * Accordion v3.1.1
 * Simple accordion created in pure Javascript.
 * https://github.com/michu2k/Accordion
 *
 * Copyright (c) Michał Strumpf
 * Published under MIT License
 */
"use strict";
!(function (e) {
  var t = 0,
    n = function e(n, i) {
      var s = this,
        r = this,
        o = !1;
      if (Array.isArray(n))
        return (
          !!n.length &&
          n.map(function (t) {
            return new e(t, i);
          })
        );
      var a = {
        init: function () {
          var e = this;
          this.options = Object.assign(
            {
              duration: 600,
              ariaEnabled: !0,
              collapse: !0,
              showMultiple: !1,
              openOnInit: [],
              elementClass: "ac",
              triggerClass: "ac-trigger",
              panelClass: "ac-panel",
              activeClass: "is-active",
              beforeOpen: function () {},
              onOpen: function () {},
              beforeClose: function () {},
              onClose: function () {},
            },
            i
          );
          var s = this.options,
            o = s.elementClass,
            a = s.openOnInit,
            c = "string" == typeof n;
          (this.container = c ? document.querySelector(n) : n),
            (this.elements = Array.from(this.container.childNodes).filter(
              function (e) {
                return e.classList && e.classList.contains(o);
              }
            )),
            (this.firstElement = this.elements[0]),
            (this.lastElement = this.elements[this.elements.length - 1]),
            (this.currFocusedIdx = 0),
            this.elements.map(function (n, i) {
              return (
                n.classList.add("js-enabled"),
                e.generateIDs(n),
                e.setARIA(n),
                e.setTransition(n),
                t++,
                a.includes(i) ? e.showElement(n, !1) : e.closeElement(n, !1)
              );
            }),
            r.attachEvents();
        },
        setTransition: function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = this.options,
            i = n.duration,
            s = n.panelClass,
            r = e.querySelector(".".concat(s)),
            o = c("transitionDuration");
          r.style[o] = t ? null : "".concat(i, "ms");
        },
        generateIDs: function (e) {
          var n = this.options,
            i = n.triggerClass,
            s = n.panelClass,
            r = e.querySelector(".".concat(i)),
            o = e.querySelector(".".concat(s));
          e.setAttribute("id", "ac-".concat(t)),
            r.setAttribute("id", "ac-trigger-".concat(t)),
            o.setAttribute("id", "ac-panel-".concat(t));
        },
        removeIDs: function (e) {
          var t = this.options,
            n = t.triggerClass,
            i = t.panelClass,
            s = e.querySelector(".".concat(n)),
            r = e.querySelector(".".concat(i));
          e.removeAttribute("id"),
            s.removeAttribute("id"),
            r.removeAttribute("id");
        },
        setARIA: function (e) {
          var n = this.options,
            i = n.ariaEnabled,
            s = n.triggerClass,
            r = n.panelClass;
          if (i) {
            var o = e.querySelector(".".concat(s)),
              a = e.querySelector(".".concat(r));
            o.setAttribute("role", "button"),
              o.setAttribute("aria-controls", "ac-panel-".concat(t)),
              o.setAttribute("aria-disabled", !1),
              o.setAttribute("aria-expanded", !1),
              a.setAttribute("role", "region"),
              a.setAttribute("aria-labelledby", "ac-trigger-".concat(t));
          }
        },
        updateARIA: function (e, t) {
          var n = t.ariaExpanded,
            i = t.ariaDisabled,
            s = this.options,
            r = s.ariaEnabled,
            o = s.triggerClass;
          if (r) {
            var a = e.querySelector(".".concat(o));
            a.setAttribute("aria-expanded", n),
              a.setAttribute("aria-disabled", i);
          }
        },
        removeARIA: function (e) {
          var t = this.options,
            n = t.ariaEnabled,
            i = t.triggerClass,
            s = t.panelClass;
          if (n) {
            var r = e.querySelector(".".concat(i)),
              o = e.querySelector(".".concat(s));
            r.removeAttribute("role"),
              r.removeAttribute("aria-controls"),
              r.removeAttribute("aria-disabled"),
              r.removeAttribute("aria-expanded"),
              o.removeAttribute("role"),
              o.removeAttribute("aria-labelledby");
          }
        },
        focus: function (e, t) {
          e.preventDefault();
          var n = this.options.triggerClass;
          t.querySelector(".".concat(n)).focus();
        },
        focusFirstElement: function (e) {
          this.focus(e, this.firstElement), (this.currFocusedIdx = 0);
        },
        focusLastElement: function (e) {
          this.focus(e, this.lastElement),
            (this.currFocusedIdx = this.elements.length - 1);
        },
        focusNextElement: function (e) {
          var t = this.currFocusedIdx + 1;
          if (t > this.elements.length - 1) return this.focusFirstElement(e);
          this.focus(e, this.elements[t]), (this.currFocusedIdx = t);
        },
        focusPrevElement: function (e) {
          var t = this.currFocusedIdx - 1;
          if (t < 0) return this.focusLastElement(e);
          this.focus(e, this.elements[t]), (this.currFocusedIdx = t);
        },
        showElement: function (e) {
          var t =
              !(arguments.length > 1 && void 0 !== arguments[1]) ||
              arguments[1],
            n = this.options,
            i = n.panelClass,
            s = n.activeClass,
            r = n.collapse,
            o = n.beforeOpen,
            a = e.querySelector(".".concat(i)),
            c = a.scrollHeight;
          e.classList.add(s),
            t && o(e),
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                a.style.height = t ? "".concat(c, "px") : "auto";
              });
            }),
            this.updateARIA(e, { ariaExpanded: !0, ariaDisabled: !r });
        },
        closeElement: function (e) {
          var t =
              !(arguments.length > 1 && void 0 !== arguments[1]) ||
              arguments[1],
            n = this.options,
            i = n.panelClass,
            s = n.activeClass,
            r = n.beforeClose,
            o = e.querySelector(".".concat(i)),
            a = o.scrollHeight;
          e.classList.remove(s),
            t
              ? (r(e),
                requestAnimationFrame(function () {
                  (o.style.height = "".concat(a, "px")),
                    requestAnimationFrame(function () {
                      o.style.height = 0;
                    });
                }),
                this.updateARIA(e, { ariaExpanded: !1, ariaDisabled: !1 }))
              : (o.style.height = 0);
        },
        toggleElement: function (e) {
          var t = this.options,
            n = t.activeClass,
            i = t.collapse,
            s = e.classList.contains(n);
          if (!s || i) return s ? this.closeElement(e) : this.showElement(e);
        },
        closeElements: function () {
          var e = this,
            t = this.options,
            n = t.activeClass;
          t.showMultiple ||
            this.elements.map(function (t, i) {
              t.classList.contains(n) &&
                i != e.currFocusedIdx &&
                e.closeElement(t);
            });
        },
        handleClick: function (e) {
          var t = this,
            n = e.currentTarget;
          this.elements.map(function (i, s) {
            i.contains(n) &&
              "A" !== e.target.nodeName &&
              ((t.currFocusedIdx = s),
              t.closeElements(),
              t.focus(e, i),
              t.toggleElement(i));
          });
        },
        handleKeydown: function (e) {
          var t = 38,
            n = 40,
            i = 36,
            s = 35;
          switch (e.keyCode) {
            case t:
              return this.focusPrevElement(e);
            case n:
              return this.focusNextElement(e);
            case i:
              return this.focusFirstElement(e);
            case s:
              return this.focusLastElement(e);
            default:
              return null;
          }
        },
        handleTransitionEnd: function (e) {
          if ("height" === e.propertyName) {
            var t = this.options,
              n = t.onOpen,
              i = t.onClose,
              s = e.currentTarget,
              r = parseInt(s.style.height),
              o = this.elements.find(function (e) {
                return e.contains(s);
              });
            r > 0 ? ((s.style.height = "auto"), n(o)) : i(o);
          }
        },
      };
      (this.attachEvents = function () {
        if (!o) {
          var e = a.options,
            t = e.triggerClass,
            n = e.panelClass;
          (a.handleClick = a.handleClick.bind(a)),
            (a.handleKeydown = a.handleKeydown.bind(a)),
            (a.handleTransitionEnd = a.handleTransitionEnd.bind(a)),
            a.elements.map(function (e) {
              var i = e.querySelector(".".concat(t)),
                s = e.querySelector(".".concat(n));
              i.addEventListener("click", a.handleClick),
                i.addEventListener("keydown", a.handleKeydown),
                s.addEventListener(
                  "webkitTransitionEnd",
                  a.handleTransitionEnd
                ),
                s.addEventListener("transitionend", a.handleTransitionEnd);
            }),
            (o = !0);
        }
      }),
        (this.detachEvents = function () {
          if (o) {
            var e = a.options,
              t = e.triggerClass,
              n = e.panelClass;
            a.elements.map(function (e) {
              var i = e.querySelector(".".concat(t)),
                s = e.querySelector(".".concat(n));
              i.removeEventListener("click", a.handleClick),
                i.removeEventListener("keydown", a.handleKeydown),
                s.removeEventListener(
                  "webkitTransitionEnd",
                  a.handleTransitionEnd
                ),
                s.removeEventListener("transitionend", a.handleTransitionEnd);
            }),
              (o = !1);
          }
        }),
        (this.toggle = function (e) {
          var t = a.elements.find(function (t, n) {
            return n === e;
          });
          t && a.toggleElement(t);
        }),
        (this.open = function (e) {
          var t = a.elements.find(function (t, n) {
            return n === e;
          });
          t && a.showElement(t);
        }),
        (this.openAll = function () {
          a.elements.map(function (e) {
            return a.showElement(e, !1);
          });
        }),
        (this.close = function (e) {
          var t = a.elements.find(function (t, n) {
            return n === e;
          });
          t && a.closeElement(t);
        }),
        (this.closeAll = function () {
          a.elements.map(function (e) {
            return a.closeElement(e, !1);
          });
        }),
        (this.destroy = function () {
          s.detachEvents(),
            s.openAll(),
            a.elements.map(function (e) {
              a.removeIDs(e), a.removeARIA(e), a.setTransition(e, !0);
            }),
            (o = !0);
        });
      var c = function (e) {
          return "string" == typeof document.documentElement.style[e]
            ? e
            : ((e = l(e)), (e = "webkit".concat(e)));
        },
        l = function (e) {
          return e.charAt(0).toUpperCase() + e.slice(1);
        };
      a.init();
    };
  "undefined" != typeof module && void 0 !== module.exports
    ? (module.exports = n)
    : (e.Accordion = n);
})(window);