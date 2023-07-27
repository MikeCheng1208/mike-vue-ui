import { openBlock as n, createElementBlock as s, renderSlot as g, useSlots as $, computed as b, createElementVNode as m, Fragment as y, renderList as f, normalizeStyle as h, toDisplayString as k } from "vue";
const v = (l, e) => {
  const o = l.__vccOpts || l;
  for (const [r, a] of e)
    o[r] = a;
  return o;
}, M = {
  name: "MyInput",
  props: {
    modelValue: String
  },
  methods: {
    updateValue(l) {
      this.$emit("update:modelValue", l);
    }
  }
}, I = ["value"];
function S(l, e, o, r, a, c) {
  return n(), s("input", {
    value: o.modelValue,
    onInput: e[0] || (e[0] = (t) => c.updateValue(t.target.value))
  }, null, 40, I);
}
const O = /* @__PURE__ */ v(M, [["render", S], ["__scopeId", "data-v-374e983b"]]);
const w = {};
function V(l, e) {
  return n(), s("button", null, [
    g(l.$slots, "default", {}, void 0, !0)
  ]);
}
const j = /* @__PURE__ */ v(w, [["render", V], ["__scopeId", "data-v-af45f728"]]);
const x = { class: "vue-pure-table" }, T = { id: "columns" }, B = {
  id: "rows",
  class: "flex-col"
}, P = { key: 0 }, A = {
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
  setup(l) {
    const e = l, o = $(), r = b(() => e.columns.map((t) => t.field)), a = b(() => e.rows.map((t) => {
      const d = [];
      return Object.keys(t).forEach((u, _) => {
        r.value[_] && d.push(t[r.value[_]]);
      }), d;
    })), c = (t) => Object.keys(o).includes(t);
    return (t, d) => (n(), s("div", x, [
      m("ul", T, [
        (n(!0), s(y, null, f(e.columns, (u) => (n(), s("li", {
          key: u.label,
          class: "table_columns",
          style: h(u.style)
        }, k(u.label), 5))), 128))
      ]),
      m("ul", B, [
        (n(!0), s(y, null, f(a.value, (u, _) => (n(), s("li", { key: _ }, [
          m("ul", null, [
            (n(!0), s(y, null, f(u, (p, i) => (n(), s("li", {
              key: p.id,
              style: h(e.columns[i].style)
            }, [
              c(e.columns[i].field) ? g(t.$slots, e.columns[i].field, {
                key: 1,
                data: { rowData: p, rowTarget: a.value[_] }
              }, void 0, !0) : (n(), s("p", P, k(p), 1))
            ], 4))), 128))
          ])
        ]))), 128))
      ])
    ]));
  }
}, D = /* @__PURE__ */ v(A, [["__scopeId", "data-v-38a75e1e"]]);
export {
  j as MButton,
  O as MInput,
  D as MPureTable
};
