var MikeUi=function(o,t){"use strict";const M="",u=(e,n)=>{const c=e.__vccOpts||e;for(const[_,l]of n)c[_]=l;return c},a={name:"MyInput",props:{modelValue:String},methods:{updateValue(e){this.$emit("update:modelValue",e)}}},d=["value"];function r(e,n,c,_,l,m){return t.openBlock(),t.createElementBlock("input",{value:c.modelValue,onInput:n[0]||(n[0]=v=>m.updateValue(v.target.value))},null,40,d)}const s=u(a,[["render",r],["__scopeId","data-v-0f7cd7c3"]]),y="",p={};function i(e,n){return t.openBlock(),t.createElementBlock("button",null,[t.renderSlot(e.$slots,"default",{},void 0,!0)])}const f=u(p,[["render",i],["__scopeId","data-v-18c1631d"]]);return o.MButton=f,o.MInput=s,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),o}({},Vue);
