import { getCurrentScope as W, onScopeDispose as x, unref as z, watch as A, ref as I, computed as M, openBlock as h, createElementBlock as y, createElementVNode as E, Fragment as S, renderList as $, toDisplayString as P, createCommentVNode as K, useSlots as q, normalizeStyle as O, renderSlot as G, normalizeClass as H, nextTick as k } from "vue";
function J(n) {
  return W() ? (x(n), !0) : !1;
}
function L(n) {
  return typeof n == "function" ? n() : z(n);
}
const F = typeof window < "u", N = () => {
}, Q = /* @__PURE__ */ U();
function U() {
  var n;
  return F && ((n = window == null ? void 0 : window.navigator) == null ? void 0 : n.userAgent) && /* @__PURE__ */ /iP(ad|hone|od)/.test(window.navigator.userAgent);
}
function V(n) {
  var c;
  const u = L(n);
  return (c = u == null ? void 0 : u.$el) != null ? c : u;
}
const R = F ? window : void 0;
function C(...n) {
  let c, u, e, o;
  if (typeof n[0] == "string" || Array.isArray(n[0]) ? ([u, e, o] = n, c = R) : [c, u, e, o] = n, !c)
    return N;
  Array.isArray(u) || (u = [u]), Array.isArray(e) || (e = [e]);
  const v = [], d = () => {
    v.forEach((s) => s()), v.length = 0;
  }, _ = (s, m, a, f) => (s.addEventListener(m, a, f), () => s.removeEventListener(m, a, f)), i = A(
    () => [V(c), L(o)],
    ([s, m]) => {
      d(), s && v.push(
        ...u.flatMap((a) => e.map((f) => _(s, a, f, m)))
      );
    },
    { immediate: !0, flush: "post" }
  ), g = () => {
    i(), d();
  };
  return J(g), g;
}
let T = !1;
function X(n, c, u = {}) {
  const { window: e = R, ignore: o = [], capture: v = !0, detectIframe: d = !1 } = u;
  if (!e)
    return;
  Q && !T && (T = !0, Array.from(e.document.body.children).forEach((a) => a.addEventListener("click", N)));
  let _ = !0;
  const i = (a) => o.some((f) => {
    if (typeof f == "string")
      return Array.from(e.document.querySelectorAll(f)).some((w) => w === a.target || a.composedPath().includes(w));
    {
      const w = V(f);
      return w && (a.target === w || a.composedPath().includes(w));
    }
  }), s = [
    C(e, "click", (a) => {
      const f = V(n);
      if (!(!f || f === a.target || a.composedPath().includes(f))) {
        if (a.detail === 0 && (_ = !i(a)), !_) {
          _ = !0;
          return;
        }
        c(a);
      }
    }, { passive: !0, capture: v }),
    C(e, "pointerdown", (a) => {
      const f = V(n);
      f && (_ = !a.composedPath().includes(f) && !i(a));
    }, { passive: !0 }),
    d && C(e, "blur", (a) => {
      setTimeout(() => {
        var f;
        const w = V(n);
        ((f = e.document.activeElement) == null ? void 0 : f.tagName) === "IFRAME" && !(w != null && w.contains(e.document.activeElement)) && c(a);
      }, 0);
    })
  ].filter(Boolean);
  return () => s.forEach((a) => a());
}
const D = (n, c) => {
  const u = n.__vccOpts || n;
  for (const [e, o] of c)
    u[e] = o;
  return u;
}, Y = {
  relative: "",
  "w-full": "",
  "h-30px": ""
}, Z = ["value"], ee = {
  key: 0,
  absolute: "",
  "top-30px": "",
  "left-0": "",
  "bg-white": "",
  "w-full": "",
  "h-auto": "",
  border: "0px x-1px gray-4 solid"
}, te = ["onClick"], le = {
  __name: "MEmailInput",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: c }) {
    const u = n, e = I(null), o = I(!1), v = I(!1);
    X(e, (s) => {
      o.value = !1;
    });
    const d = M(() => u.options.suffix ? u.options.suffix.map((s) => u.modelValue.split("@")[0] + s) : []), _ = (s) => {
      c("update:modelValue", s);
    }, i = () => {
      o.value = u.modelValue.length !== 0;
    }, g = (s) => {
      v.value = !0, o.value = !1, _(s), setTimeout(() => {
        v.value = !1;
      }, 300);
    };
    return A(
      () => u.modelValue,
      () => {
        v.value || (o.value = u.modelValue.length !== 0);
      }
    ), (s, m) => (h(), y("div", Y, [
      E("input", {
        ref_key: "inputRef",
        ref: e,
        "w-full": "",
        "h-full": "",
        "pl-10px": "",
        value: n.modelValue,
        border: "1px gray-4 solid",
        onInput: m[0] || (m[0] = (a) => _(a.target.value)),
        onFocus: i
      }, null, 40, Z),
      o.value ? (h(), y("ul", ee, [
        (h(!0), y(S, null, $(d.value, (a) => (h(), y("li", {
          key: a,
          border: "0px b-1px gray-4 solid"
        }, [
          E("a", {
            "cursor-pointer": "",
            "w-full": "",
            block: "",
            "py-5px": "",
            "pl-10px": "",
            "text-14px": "",
            "hover:bg-gray-1": "",
            onClick: (f) => g(a)
          }, P(a), 9, te)
        ]))), 128))
      ])) : K("", !0)
    ]));
  }
}, _e = /* @__PURE__ */ D(le, [["__scopeId", "data-v-5d750eee"]]);
const ne = { class: "vue-pure-table" }, oe = { id: "columns" }, ue = {
  id: "rows",
  class: "flex-col"
}, se = { key: 0 }, ae = {
  __name: "MPureTable",
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    }
  },
  setup(n) {
    const c = n, u = q(), e = M(() => c.columns.map((d) => d.field)), o = M(() => c.rows.map((d) => {
      const _ = [];
      return Object.keys(d).forEach((i, g) => {
        e.value[g] && _.push(d[e.value[g]]);
      }), _;
    })), v = (d) => Object.keys(u).includes(d);
    return (d, _) => (h(), y("div", ne, [
      E("ul", oe, [
        (h(!0), y(S, null, $(c.columns, (i) => (h(), y("li", {
          key: i.label,
          class: "table_columns",
          style: O(i.style)
        }, P(i.label), 5))), 128))
      ]),
      E("ul", ue, [
        (h(!0), y(S, null, $(o.value, (i, g) => (h(), y("li", { key: g }, [
          E("ul", null, [
            (h(!0), y(S, null, $(i, (s, m) => (h(), y("li", {
              key: s.id,
              style: O(c.columns[m].style)
            }, [
              v(c.columns[m].field) ? G(d.$slots, c.columns[m].field, {
                key: 1,
                data: { rowData: s, rowTarget: o.value[g] }
              }, void 0, !0) : (h(), y("p", se, P(s), 1))
            ], 4))), 128))
          ])
        ]))), 128))
      ])
    ]));
  }
}, he = /* @__PURE__ */ D(ae, [["__scopeId", "data-v-38a75e1e"]]);
const re = ["aria-label"], ce = ["value", "disabled", "aria-label", "onInput", "onKeydown", "onFocus", "onClick"], ie = {
  __name: "MPinInput",
  props: {
    // 輸入框數量，預設為 5
    length: {
      type: Number,
      default: 5,
      validator: (n) => n > 0 && n <= 10
    },
    // 是否禁用組件
    disabled: {
      type: Boolean,
      default: !1
    },
    // v-model 綁定值
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: [
    "update:modelValue",
    // v-model 更新事件
    "complete",
    // 輸入完成事件
    "change"
    // 單個輸入框改變事件
  ],
  setup(n, { expose: c, emit: u }) {
    const e = n, o = I([]), v = I(0), d = I([]), _ = () => {
      if (o.value = new Array(e.length).fill(""), e.modelValue) {
        e.modelValue.split("").slice(0, e.length).forEach((r, p) => {
          /^\d$/.test(r) && (o.value[p] = r);
        });
        const l = o.value.findIndex((r) => r === "");
        v.value = l === -1 ? e.length - 1 : l;
      }
    }, i = M(() => o.value.join(""));
    A(
      () => e.length,
      () => {
        _();
      },
      { immediate: !0 }
    ), A(
      () => e.modelValue,
      (t) => {
        t !== i.value && _();
      }
    ), A(i, (t) => {
      u("update:modelValue", t), t.length === e.length && t.split("").every((l) => /^\d$/.test(l)) && u("complete", t);
    });
    const g = (t, l) => {
      t && (d.value[l] = t);
    }, s = (t) => {
      t >= 0 && t < e.length && d.value[t] && (d.value[t].focus(), v.value = t);
    }, m = (t) => /^\d$/.test(t), a = (t, l) => {
      if (e.disabled)
        return;
      const r = t.target.value, p = r.slice(-1);
      if (p && !m(p)) {
        t.target.value = o.value[l];
        return;
      }
      p && m(p) ? (o.value[l] = p, u("change", i.value, l), l < e.length - 1 && k(() => {
        s(l + 1);
      })) : r === "" && (o.value[l] = "", u("change", i.value, l));
    }, f = (t, l) => {
      if (e.disabled)
        return;
      const { key: r } = t;
      if (r === "Backspace") {
        t.preventDefault(), o.value[l] !== "" ? (o.value[l] = "", u("change", i.value, l)) : l > 0 && (o.value[l - 1] = "", u("change", i.value, l - 1), k(() => {
          s(l - 1);
        }));
        return;
      }
      if (r === "Delete") {
        t.preventDefault(), o.value[l] = "", u("change", i.value, l);
        return;
      }
      if (r === "ArrowLeft" && l > 0) {
        t.preventDefault(), s(l - 1);
        return;
      }
      if (r === "ArrowRight" && l < e.length - 1) {
        t.preventDefault(), s(l + 1);
        return;
      }
      if (m(r)) {
        t.preventDefault(), o.value[l] = r, u("change", i.value, l), l < e.length - 1 && k(() => {
          s(l + 1);
        });
        return;
      }
      !/^(Tab|Shift|Control|Alt|Meta|CapsLock)$/.test(r) && !r.startsWith("Arrow") && t.preventDefault();
    }, w = (t) => {
      e.disabled || (v.value = t);
    }, B = (t) => {
      e.disabled || s(t);
    };
    return c({
      focus: (t) => {
        if (typeof t == "number")
          s(t);
        else {
          const l = o.value.findIndex((p) => p === ""), r = l === -1 ? e.length - 1 : l;
          s(r);
        }
      },
      clear: () => {
        o.value = new Array(e.length).fill(""), v.value = 0, k(() => {
          s(0);
        });
      },
      getValue: () => i.value,
      setValue: (t) => {
        if (typeof t != "string")
          return;
        o.value = new Array(e.length).fill(""), t.split("").slice(0, e.length).forEach((b, j) => {
          m(b) && (o.value[j] = b);
        });
        const r = o.value.findIndex((b) => b === ""), p = r === -1 ? e.length - 1 : r;
        k(() => {
          s(p);
        });
      }
    }), (t, l) => (h(), y("div", {
      class: "m-pin-input",
      role: "group",
      "aria-label": `密碼輸入，共 ${n.length} 位數`
    }, [
      (h(!0), y(S, null, $(o.value, (r, p) => (h(), y("input", {
        key: p,
        ref_for: !0,
        ref: (b) => g(b, p),
        value: r,
        type: "text",
        inputmode: "numeric",
        autocomplete: "off",
        maxlength: "1",
        class: H(["m-pin-input__item", {
          "m-pin-input__item--focused": v.value === p,
          "m-pin-input__item--filled": r !== "",
          "m-pin-input__item--disabled": n.disabled
        }]),
        disabled: n.disabled,
        "aria-label": `第 ${p + 1} 位數字`,
        onInput: (b) => a(b, p),
        onKeydown: (b) => f(b, p),
        onFocus: (b) => w(p),
        onClick: (b) => B(p)
      }, null, 42, ce))), 128))
    ], 8, re));
  }
}, ye = /* @__PURE__ */ D(ie, [["__scopeId", "data-v-37a7c5a2"]]);
export {
  _e as MEmailInput,
  ye as MPinInput,
  he as MPureTable
};
