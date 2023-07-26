import { openBlock as u, createElementBlock as c, renderSlot as r } from "vue";
const d = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, _] of t)
    n[o] = _;
  return n;
}, l = {
  name: "MyInput",
  props: {
    modelValue: String
  },
  methods: {
    updateValue(e) {
      this.$emit("update:modelValue", e);
    }
  }
}, p = ["value"];
function f(e, t, n, o, _, s) {
  return u(), c("input", {
    value: n.modelValue,
    onInput: t[0] || (t[0] = (a) => s.updateValue(a.target.value))
  }, null, 40, p);
}
const y = /* @__PURE__ */ d(l, [["render", f], ["__scopeId", "data-v-0f7cd7c3"]]);
const i = {};
function m(e, t) {
  return u(), c("button", null, [
    r(e.$slots, "default", {}, void 0, !0)
  ]);
}
const I = /* @__PURE__ */ d(i, [["render", m], ["__scopeId", "data-v-18c1631d"]]);
export {
  I as MButton,
  y as MInput
};
