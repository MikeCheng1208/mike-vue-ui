var MikeUi=function(h,e){"use strict";var x=document.createElement("style");x.textContent=`*,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.absolute,[absolute=\"\"]{position:absolute}.relative,[relative=\"\"]{position:relative}.left-0,[left-0=\"\"]{left:0}.top-30px,[top-30px=\"\"]{top:30px}.block,[block=\"\"]{display:block}.h-auto,[h-auto=\"\"]{height:auto}.h-full,[h-full=\"\"]{height:100%}.w-full,[w-full=\"\"]{width:100%}[h-30px=\"\"]{height:30px}.flex{display:flex}.flex-col{flex-direction:column}.cursor-pointer,[cursor-pointer=\"\"]{cursor:pointer}.b-1px,.border{border-width:1px}[border~=\"0px\"]{border-width:0}[border~=x-1px]{border-left-width:1px;border-right-width:1px}[border~=b-1px]{border-bottom-width:1px}[border~=gray-4]{--un-border-opacity:1;border-color:rgba(156,163,175,var(--un-border-opacity))}[border~=solid]{border-style:solid}.bg-white,[bg-white=\"\"]{--un-bg-opacity:1;background-color:rgba(255,255,255,var(--un-bg-opacity))}.hover\\:bg-gray-1:hover,[hover\\:bg-gray-1=\"\"]:hover{--un-bg-opacity:1;background-color:rgba(243,244,246,var(--un-bg-opacity))}.py-5px,[py-5px=\"\"]{padding-top:5px;padding-bottom:5px}.pl-10px,[pl-10px=\"\"]{padding-left:10px}.text-14px,[text-14px=\"\"]{font-size:14px}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:"";content:none}table{border-collapse:collapse;border-spacing:0}*[data-v-ab1eec80]{box-sizing:border-box}*[data-v-38a75e1e]{padding:0;margin:0;box-sizing:border-box}.vue-pure-table[data-v-38a75e1e]{border:1px solid #e0e0e0;border-radius:5px;width:100%}#columns[data-v-38a75e1e]{display:flex;justify-content:space-between;align-items:center;height:45px;border-bottom:1px solid #e0e0e0}.table_columns[data-v-38a75e1e]{height:100%;display:flex;justify-content:center;align-items:center;border-right:1px solid #e0e0e0}.table_columns[data-v-38a75e1e]:last-child{border:0px}.flex-col[data-v-38a75e1e]{flex-direction:column}.flex-col>li[data-v-38a75e1e]{display:flex;justify-content:center;align-items:center;width:100%;border-bottom:1px solid #e0e0e0}.flex-col>li[data-v-38a75e1e]:last-child{border-bottom:0px}.flex-col>li>ul[data-v-38a75e1e]{width:100%;display:flex;justify-content:space-between;align-items:center;height:68px}.flex-col>li>ul>li[data-v-38a75e1e]{height:100%;display:flex;justify-content:center;align-items:center}
`,document.head.appendChild(x);const C="",F="";function S(n){return e.getCurrentScope()?(e.onScopeDispose(n),!0):!1}function _(n){return typeof n=="function"?n():e.unref(n)}const k=typeof window<"u",w=()=>{},A=L();function L(){var n;return k&&((n=window==null?void 0:window.navigator)==null?void 0:n.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent)}function g(n){var a;const o=_(n);return(a=o==null?void 0:o.$el)!=null?a:o}const E=k?window:void 0;function y(...n){let a,o,r,i;if(typeof n[0]=="string"||Array.isArray(n[0])?([o,r,i]=n,a=E):[a,o,r,i]=n,!a)return w;Array.isArray(o)||(o=[o]),Array.isArray(r)||(r=[r]);const f=[],c=()=>{f.forEach(l=>l()),f.length=0},u=(l,p,t,s)=>(l.addEventListener(p,t,s),()=>l.removeEventListener(p,t,s)),d=e.watch(()=>[g(a),_(i)],([l,p])=>{c(),l&&f.push(...o.flatMap(t=>r.map(s=>u(l,t,s,p))))},{immediate:!0,flush:"post"}),b=()=>{d(),c()};return S(b),b}let v=!1;function V(n,a,o={}){const{window:r=E,ignore:i=[],capture:f=!0,detectIframe:c=!1}=o;if(!r)return;A&&!v&&(v=!0,Array.from(r.document.body.children).forEach(t=>t.addEventListener("click",w)));let u=!0;const d=t=>i.some(s=>{if(typeof s=="string")return Array.from(r.document.querySelectorAll(s)).some(m=>m===t.target||t.composedPath().includes(m));{const m=g(s);return m&&(t.target===m||t.composedPath().includes(m))}}),l=[y(r,"click",t=>{const s=g(n);if(!(!s||s===t.target||t.composedPath().includes(s))){if(t.detail===0&&(u=!d(t)),!u){u=!0;return}a(t)}},{passive:!0,capture:f}),y(r,"pointerdown",t=>{const s=g(n);s&&(u=!t.composedPath().includes(s)&&!d(t))},{passive:!0}),c&&y(r,"blur",t=>{setTimeout(()=>{var s;const m=g(n);((s=r.document.activeElement)==null?void 0:s.tagName)==="IFRAME"&&!(m!=null&&m.contains(r.document.activeElement))&&a(t)},0)})].filter(Boolean);return()=>l.forEach(t=>t())}const D="",B=(n,a)=>{const o=n.__vccOpts||n;for(const[r,i]of a)o[r]=i;return o},z={relative:"","w-full":"","h-30px":""},M=["value"],I={key:0,absolute:"","top-30px":"","left-0":"","bg-white":"","w-full":"","h-auto":"",border:"0px x-1px gray-4 solid"},P=["onClick"],j=B({__name:"MEmailInput",props:{modelValue:{type:String,default:""},options:{type:Object,default:()=>({})}},emits:["update:modelValue"],setup(n,{emit:a}){const o=n,r=e.ref(null),i=e.ref(!1),f=e.ref(!1);V(r,l=>{i.value=!1});const c=e.computed(()=>o.options.suffix?o.options.suffix.map(l=>o.modelValue.split("@")[0]+l):[]),u=l=>{a("update:modelValue",l)},d=()=>{i.value=o.modelValue.length!==0},b=l=>{f.value=!0,i.value=!1,u(l),setTimeout(()=>{f.value=!1},300)};return e.watch(()=>o.modelValue,()=>{f.value||(i.value=o.modelValue.length!==0)}),(l,p)=>(e.openBlock(),e.createElementBlock("div",z,[e.createElementVNode("input",{ref_key:"inputRef",ref:r,"w-full":"","h-full":"","pl-10px":"",value:n.modelValue,onInput:p[0]||(p[0]=t=>u(t.target.value)),onFocus:d},null,40,M),i.value?(e.openBlock(),e.createElementBlock("ul",I,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(c.value,t=>(e.openBlock(),e.createElementBlock("li",{key:t,border:"0px b-1px gray-4 solid"},[e.createElementVNode("a",{"cursor-pointer":"","w-full":"",block:"","py-5px":"","pl-10px":"","text-14px":"","hover:bg-gray-1":"",onClick:s=>b(t)},e.toDisplayString(t),9,P)]))),128))])):e.createCommentVNode("",!0)]))}},[["__scopeId","data-v-ab1eec80"]]),W="",q={class:"vue-pure-table"},O={id:"columns"},N={id:"rows",class:"flex-col"},T={key:0},$=B({__name:"MPureTable",props:{columns:{type:Array,default:()=>[]},rows:{type:Array,default:()=>[]}},setup(n){const a=n,o=e.useSlots(),r=e.computed(()=>a.columns.map(c=>c.field)),i=e.computed(()=>a.rows.map(c=>{const u=[];return Object.keys(c).forEach((d,b)=>{r.value[b]&&u.push(c[r.value[b]])}),u})),f=c=>Object.keys(o).includes(c);return(c,u)=>(e.openBlock(),e.createElementBlock("div",q,[e.createElementVNode("ul",O,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(a.columns,d=>(e.openBlock(),e.createElementBlock("li",{key:d.label,class:"table_columns",style:e.normalizeStyle(d.style)},e.toDisplayString(d.label),5))),128))]),e.createElementVNode("ul",N,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(i.value,(d,b)=>(e.openBlock(),e.createElementBlock("li",{key:b},[e.createElementVNode("ul",null,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(d,(l,p)=>(e.openBlock(),e.createElementBlock("li",{key:l.id,style:e.normalizeStyle(a.columns[p].style)},[f(a.columns[p].field)?e.renderSlot(c.$slots,a.columns[p].field,{key:1,data:{rowData:l,rowTarget:i.value[b]}},void 0,!0):(e.openBlock(),e.createElementBlock("p",T,e.toDisplayString(l),1))],4))),128))])]))),128))])]))}},[["__scopeId","data-v-38a75e1e"]]);return h.MEmailInput=j,h.MPureTable=$,Object.defineProperty(h,Symbol.toStringTag,{value:"Module"}),h}({},Vue);
