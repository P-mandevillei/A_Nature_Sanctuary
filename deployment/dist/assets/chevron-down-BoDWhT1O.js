import{r as s}from"./index-DqVyQ7DI.js";function v(t,e){let r=JSON.parse(localStorage.getItem(t));r||(r=e);const[o,n]=s.useState(r);return[o,c=>{n(c),localStorage.setItem(t,JSON.stringify(c))}]}/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),f=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,o)=>o?o.toUpperCase():r.toLowerCase()),l=t=>{const e=f(t);return e.charAt(0).toUpperCase()+e.slice(1)},u=(...t)=>t.filter((e,r,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===r).join(" ").trim(),g=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var h={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=s.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:n="",children:a,iconNode:c,...i},d)=>s.createElement("svg",{ref:d,...h,width:e,height:e,stroke:t,strokeWidth:o?Number(r)*24/Number(e):r,className:u("lucide",n),...!a&&!g(i)&&{"aria-hidden":"true"},...i},[...c.map(([p,m])=>s.createElement(p,m)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=(t,e)=>{const r=s.forwardRef(({className:o,...n},a)=>s.createElement(w,{ref:a,iconNode:e,className:u(`lucide-${C(l(t))}`,`lucide-${t}`,o),...n}));return r.displayName=l(t),r};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],y=S("chevron-down",A);export{y as C,v as u};
