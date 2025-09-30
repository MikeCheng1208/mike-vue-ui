import { getCurrentScope as j, onScopeDispose as W, unref as z, watch as V, ref as k, computed as E, openBlock as g, createElementBlock as h, createElementVNode as w, Fragment as $, renderList as A, toDisplayString as M, createCommentVNode as J, useSlots as q, normalizeStyle as L, renderSlot as U, normalizeClass as N, nextTick as S, withDirectives as G, vModelText as H } from "vue";
function Q(e) {
  return j() ? (W(e), !0) : !1;
}
function x(e) {
  return typeof e == "function" ? e() : z(e);
}
const R = typeof window < "u", F = () => {
}, X = /* @__PURE__ */ Y();
function Y() {
  var e;
  return R && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && /* @__PURE__ */ /iP(ad|hone|od)/.test(window.navigator.userAgent);
}
function T(e) {
  var c;
  const o = x(e);
  return (c = o == null ? void 0 : o.$el) != null ? c : o;
}
const B = R ? window : void 0;
function D(...e) {
  let c, o, t, l;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([o, t, l] = e, c = B) : [c, o, t, l] = e, !c)
    return F;
  Array.isArray(o) || (o = [o]), Array.isArray(t) || (t = [t]);
  const f = [], m = () => {
    f.forEach((r) => r()), f.length = 0;
  }, v = (r, a, n, i) => (r.addEventListener(a, n, i), () => r.removeEventListener(a, n, i)), d = V(
    () => [T(c), x(l)],
    ([r, a]) => {
      m(), r && f.push(
        ...o.flatMap((n) => t.map((i) => v(r, n, i, a)))
      );
    },
    { immediate: !0, flush: "post" }
  ), y = () => {
    d(), m();
  };
  return Q(y), y;
}
let O = !1;
function Z(e, c, o = {}) {
  const { window: t = B, ignore: l = [], capture: f = !0, detectIframe: m = !1 } = o;
  if (!t)
    return;
  X && !O && (O = !0, Array.from(t.document.body.children).forEach((n) => n.addEventListener("click", F)));
  let v = !0;
  const d = (n) => l.some((i) => {
    if (typeof i == "string")
      return Array.from(t.document.querySelectorAll(i)).some((b) => b === n.target || n.composedPath().includes(b));
    {
      const b = T(i);
      return b && (n.target === b || n.composedPath().includes(b));
    }
  }), r = [
    D(t, "click", (n) => {
      const i = T(e);
      if (!(!i || i === n.target || n.composedPath().includes(i))) {
        if (n.detail === 0 && (v = !d(n)), !v) {
          v = !0;
          return;
        }
        c(n);
      }
    }, { passive: !0, capture: f }),
    D(t, "pointerdown", (n) => {
      const i = T(e);
      i && (v = !n.composedPath().includes(i) && !d(n));
    }, { passive: !0 }),
    m && D(t, "blur", (n) => {
      setTimeout(() => {
        var i;
        const b = T(e);
        ((i = t.document.activeElement) == null ? void 0 : i.tagName) === "IFRAME" && !(b != null && b.contains(t.document.activeElement)) && c(n);
      }, 0);
    })
  ].filter(Boolean);
  return () => r.forEach((n) => n());
}
const C = (e, c) => {
  const o = e.__vccOpts || e;
  for (const [t, l] of c)
    o[t] = l;
  return o;
}, ee = {
  relative: "",
  "w-full": "",
  "h-30px": ""
}, te = ["value"], le = {
  key: 0,
  absolute: "",
  "top-30px": "",
  "left-0": "",
  "bg-white": "",
  "w-full": "",
  "h-auto": "",
  border: "0px x-1px gray-4 solid"
}, ae = ["onClick"], ne = {
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
  setup(e, { emit: c }) {
    const o = e, t = k(null), l = k(!1), f = k(!1);
    Z(t, (r) => {
      l.value = !1;
    });
    const m = E(() => o.options.suffix ? o.options.suffix.map((r) => o.modelValue.split("@")[0] + r) : []), v = (r) => {
      c("update:modelValue", r);
    }, d = () => {
      l.value = o.modelValue.length !== 0;
    }, y = (r) => {
      f.value = !0, l.value = !1, v(r), setTimeout(() => {
        f.value = !1;
      }, 300);
    };
    return V(
      () => o.modelValue,
      () => {
        f.value || (l.value = o.modelValue.length !== 0);
      }
    ), (r, a) => (g(), h("div", ee, [
      w("input", {
        ref_key: "inputRef",
        ref: t,
        "w-full": "",
        "h-full": "",
        "pl-10px": "",
        value: e.modelValue,
        border: "1px gray-4 solid",
        onInput: a[0] || (a[0] = (n) => v(n.target.value)),
        onFocus: d
      }, null, 40, te),
      l.value ? (g(), h("ul", le, [
        (g(!0), h($, null, A(m.value, (n) => (g(), h("li", {
          key: n,
          border: "0px b-1px gray-4 solid"
        }, [
          w("a", {
            "cursor-pointer": "",
            "w-full": "",
            block: "",
            "py-5px": "",
            "pl-10px": "",
            "text-14px": "",
            "hover:bg-gray-1": "",
            onClick: (i) => y(n)
          }, M(n), 9, ae)
        ]))), 128))
      ])) : J("", !0)
    ]));
  }
}, Ve = /* @__PURE__ */ C(ne, [["__scopeId", "data-v-7a0cd896"]]);
const ue = { class: "vue-pure-table" }, oe = { id: "columns" }, se = {
  id: "rows",
  class: "flex-col"
}, re = { key: 0 }, ie = {
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
  setup(e) {
    const c = e, o = q(), t = E(() => c.columns.map((m) => m.field)), l = E(() => c.rows.map((m) => {
      const v = [];
      return Object.keys(m).forEach((d, y) => {
        t.value[y] && v.push(m[t.value[y]]);
      }), v;
    })), f = (m) => Object.keys(o).includes(m);
    return (m, v) => (g(), h("div", ue, [
      w("ul", oe, [
        (g(!0), h($, null, A(c.columns, (d) => (g(), h("li", {
          key: d.label,
          class: "table_columns",
          style: L(d.style)
        }, M(d.label), 5))), 128))
      ]),
      w("ul", se, [
        (g(!0), h($, null, A(l.value, (d, y) => (g(), h("li", { key: y }, [
          w("ul", null, [
            (g(!0), h($, null, A(d, (r, a) => (g(), h("li", {
              key: r.id,
              style: L(c.columns[a].style)
            }, [
              f(c.columns[a].field) ? U(m.$slots, c.columns[a].field, {
                key: 1,
                data: { rowData: r, rowTarget: l.value[y] }
              }, void 0, !0) : (g(), h("p", re, M(r), 1))
            ], 4))), 128))
          ])
        ]))), 128))
      ])
    ]));
  }
}, $e = /* @__PURE__ */ C(ie, [["__scopeId", "data-v-947644cc"]]);
const ce = ["aria-label"], de = ["value", "disabled", "aria-label", "onInput", "onKeydown", "onFocus", "onClick"], pe = {
  __name: "MPinInput",
  props: {
    // 輸入框數量，預設為 5
    length: {
      type: Number,
      default: 5,
      validator: (e) => e > 0 && e <= 10
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
  setup(e, { expose: c, emit: o }) {
    const t = e, l = k([]), f = k(0), m = k([]), v = () => {
      if (l.value = new Array(t.length).fill(""), t.modelValue) {
        t.modelValue.split("").slice(0, t.length).forEach((p, _) => {
          /^\d$/.test(p) && (l.value[_] = p);
        });
        const s = l.value.findIndex((p) => p === "");
        f.value = s === -1 ? t.length - 1 : s;
      }
    }, d = E(() => l.value.join(""));
    V(
      () => t.length,
      () => {
        v();
      },
      { immediate: !0 }
    ), V(
      () => t.modelValue,
      (u) => {
        u !== d.value && v();
      }
    ), V(d, (u) => {
      o("update:modelValue", u), u.length === t.length && u.split("").every((s) => /^\d$/.test(s)) && o("complete", u);
    });
    const y = (u, s) => {
      u && (m.value[s] = u);
    }, r = (u) => {
      u >= 0 && u < t.length && m.value[u] && (m.value[u].focus(), f.value = u);
    }, a = (u) => /^\d$/.test(u), n = (u, s) => {
      if (t.disabled)
        return;
      const p = u.target.value, _ = p.slice(-1);
      if (_ && !a(_)) {
        u.target.value = l.value[s];
        return;
      }
      _ && a(_) ? (l.value[s] = _, o("change", d.value, s), s < t.length - 1 && S(() => {
        r(s + 1);
      })) : p === "" && (l.value[s] = "", o("change", d.value, s));
    }, i = (u, s) => {
      if (t.disabled)
        return;
      const { key: p } = u;
      if (p === "Backspace") {
        u.preventDefault(), l.value[s] !== "" ? (l.value[s] = "", o("change", d.value, s)) : s > 0 && (l.value[s - 1] = "", o("change", d.value, s - 1), S(() => {
          r(s - 1);
        }));
        return;
      }
      if (p === "Delete") {
        u.preventDefault(), l.value[s] = "", o("change", d.value, s);
        return;
      }
      if (p === "ArrowLeft" && s > 0) {
        u.preventDefault(), r(s - 1);
        return;
      }
      if (p === "ArrowRight" && s < t.length - 1) {
        u.preventDefault(), r(s + 1);
        return;
      }
      if (a(p)) {
        u.preventDefault(), l.value[s] = p, o("change", d.value, s), s < t.length - 1 && S(() => {
          r(s + 1);
        });
        return;
      }
      !/^(Tab|Shift|Control|Alt|Meta|CapsLock)$/.test(p) && !p.startsWith("Arrow") && u.preventDefault();
    }, b = (u) => {
      t.disabled || (f.value = u);
    }, P = (u) => {
      t.disabled || r(u);
    };
    return c({
      focus: (u) => {
        if (typeof u == "number")
          r(u);
        else {
          const s = l.value.findIndex((_) => _ === ""), p = s === -1 ? t.length - 1 : s;
          r(p);
        }
      },
      clear: () => {
        l.value = new Array(t.length).fill(""), f.value = 0, S(() => {
          r(0);
        });
      },
      getValue: () => d.value,
      setValue: (u) => {
        if (typeof u != "string")
          return;
        l.value = new Array(t.length).fill(""), u.split("").slice(0, t.length).forEach((I, K) => {
          a(I) && (l.value[K] = I);
        });
        const p = l.value.findIndex((I) => I === ""), _ = p === -1 ? t.length - 1 : p;
        S(() => {
          r(_);
        });
      }
    }), (u, s) => (g(), h("div", {
      class: "m-pin-input",
      role: "group",
      "aria-label": `密碼輸入，共 ${e.length} 位數`
    }, [
      (g(!0), h($, null, A(l.value, (p, _) => (g(), h("input", {
        key: _,
        ref_for: !0,
        ref: (I) => y(I, _),
        value: p,
        type: "text",
        inputmode: "numeric",
        autocomplete: "off",
        maxlength: "1",
        class: N(["m-pin-input__item", {
          "m-pin-input__item--focused": f.value === _,
          "m-pin-input__item--filled": p !== "",
          "m-pin-input__item--disabled": e.disabled
        }]),
        disabled: e.disabled,
        "aria-label": `第 ${_ + 1} 位數字`,
        onInput: (I) => n(I, _),
        onKeydown: (I) => i(I, _),
        onFocus: (I) => b(_),
        onClick: (I) => P(_)
      }, null, 42, de))), 128))
    ], 8, ce));
  }
}, Ae = /* @__PURE__ */ C(pe, [["__scopeId", "data-v-5aece818"]]);
const fe = { class: "m-input-tags__container" }, me = ["aria-label"], ve = ["title"], _e = ["aria-label", "disabled", "onClick"], ge = ["placeholder", "disabled", "aria-label"], he = {
  __name: "MInputTags",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
      validator: (e) => Array.isArray(e) && e.every((c) => typeof c == "string")
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    maxTags: {
      type: Number,
      default: null,
      validator: (e) => e === null || typeof e == "number" && e > 0
    },
    maxTagLength: {
      type: Number,
      default: 150,
      validator: (e) => typeof e == "number" && e > 0
    },
    placeholder: {
      type: String,
      default: "輸入後按 Enter 新增標籤"
    }
  },
  emits: [
    "update:modelValue",
    // v-model 雙向綁定
    "add",
    // 新增標籤時觸發 (tag: string)
    "remove",
    // 移除標籤時觸發 (tag: string, index: number)
    "limit-reached"
    // 達到數量上限時觸發
  ],
  setup(e, { expose: c, emit: o }) {
    const t = e, l = k([]), f = k(""), m = k(null), v = E(() => t.maxTags !== null && l.value.length >= t.maxTags);
    E(() => !t.disabled && !v.value), V(() => t.modelValue, (a) => {
      JSON.stringify(a) !== JSON.stringify(l.value) && (l.value = [...a]);
    }, { immediate: !0, deep: !0 }), V(l, (a) => {
      o("update:modelValue", a);
    }, { deep: !0 });
    const d = (a) => {
      const n = a.trim();
      if (n) {
        if (v.value) {
          o("limit-reached");
          return;
        }
        n.length > t.maxTagLength || (l.value.push(n), o("add", n), f.value = "");
      }
    }, y = (a) => {
      a.key === "Enter" && (a.preventDefault(), d(f.value));
    }, r = (a) => {
      if (a < 0 || a >= l.value.length)
        return;
      const n = l.value[a];
      l.value.splice(a, 1), o("remove", n, a);
    };
    return c({
      // 聚焦輸入框
      focus: () => {
        var a;
        (a = m.value) == null || a.focus();
      },
      // 清空所有標籤
      clear: () => {
        l.value = [], o("update:modelValue", []);
      },
      // 程式化新增標籤
      addTag: (a) => {
        d(a);
      },
      // 程式化移除標籤
      removeTag: (a) => {
        r(a);
      },
      // 取得所有標籤（回傳副本）
      getTags: () => [...l.value]
    }), (a, n) => (g(), h("div", {
      class: N(["m-input-tags", { "m-input-tags--disabled": e.disabled }]),
      role: "group",
      "aria-label": "標籤輸入"
    }, [
      w("div", fe, [
        (g(!0), h($, null, A(l.value, (i, b) => (g(), h("div", {
          key: b,
          class: "m-input-tags__tag",
          role: "listitem",
          "aria-label": `標籤: ${i}`
        }, [
          w("span", {
            class: "m-input-tags__tag-text",
            title: i
          }, M(i), 9, ve),
          w("button", {
            type: "button",
            class: "m-input-tags__tag-remove",
            "aria-label": `移除標籤 ${i}`,
            disabled: e.disabled,
            onClick: (P) => r(b)
          }, " × ", 8, _e)
        ], 8, me))), 128)),
        G(w("input", {
          ref_key: "inputRef",
          ref: m,
          "onUpdate:modelValue": n[0] || (n[0] = (i) => f.value = i),
          type: "text",
          class: "m-input-tags__input",
          placeholder: v.value ? "已達標籤數量上限" : e.placeholder,
          disabled: e.disabled || v.value,
          "aria-label": e.placeholder,
          onKeydown: y
        }, null, 40, ge), [
          [H, f.value]
        ])
      ])
    ], 2));
  }
}, Ee = /* @__PURE__ */ C(he, [["__scopeId", "data-v-82d29b24"]]);
export {
  Ve as MEmailInput,
  Ee as MInputTags,
  Ae as MPinInput,
  $e as MPureTable
};
