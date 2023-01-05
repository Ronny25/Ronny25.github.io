const u={};function Q(e){u.context=e}function ye(){return{...u.context,id:`${u.context.id}${u.context.count++}-`,count:0}}const we=(e,t)=>e===t,be=Symbol("solid-track"),D={equals:we};let le=ce;const N=1,U=2,re={owned:null,cleanups:null,context:null,owner:null},W={};var w=null;let k=null,g=null,b=null,T=null,Z=0;function P(e,t){const n=g,s=w,i=e.length===0,r=i?re:{owned:null,cleanups:null,context:null,owner:t||s},o=i?e:()=>e(()=>L(()=>z(r)));w=r,g=null;try{return H(o,!0)}finally{g=n,w=s}}function O(e,t){t=t?Object.assign({},D,t):D;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),ue(n,i));return[fe.bind(n),s]}function ee(e,t,n){const s=F(e,t,!0,N);j(s)}function X(e,t,n){const s=F(e,t,!1,N);j(s)}function qe(e,t,n){le=Se;const s=F(e,t,!1,N);s.user=!0,T?T.push(s):j(s)}function oe(e,t,n){n=n?Object.assign({},D,n):D;const s=F(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,j(s),fe.bind(s)}function Ie(e,t,n){let s,i,r;arguments.length===2&&typeof t=="object"||arguments.length===1?(s=!0,i=e,r=t||{}):(s=e,i=t,r=n||{});let o=null,l=W,a=null,c=!1,f="initialValue"in r,A=typeof s=="function"&&oe(s);const d=new Set,[x,$]=(r.storage||O)(r.initialValue),[C,q]=O(void 0),[I,E]=O(void 0,{equals:!1}),[m,S]=O(f?"ready":"unresolved");if(u.context){a=`${u.context.id}${u.context.count++}`;let h;r.ssrLoadFrom==="initial"?l=r.initialValue:u.load&&(h=u.load(a))&&(l=h[0])}function v(h,p,y,B){return o===h&&(o=null,f=!0,(h===l||p===l)&&r.onHydrated&&queueMicrotask(()=>r.onHydrated(B,{value:p})),l=W,K(p,y)),p}function K(h,p){H(()=>{p||$(()=>h),S(p?"errored":"ready"),q(p);for(const y of d.keys())y.decrement();d.clear()},!1)}function Y(){const h=Ae,p=x(),y=C();if(y&&!o)throw y;return g&&!g.user&&h&&ee(()=>{I(),o&&(h.resolved||d.has(h)||(h.increment(),d.add(h)))}),p}function G(h=!0){if(h!==!1&&c)return;c=!1;const p=A?A():s;if(p==null||p===!1){v(o,L(x));return}const y=l!==W?l:L(()=>i(p,{value:x(),refetching:h}));return typeof y!="object"||!(y&&"then"in y)?(v(o,y,void 0,p),y):(o=y,c=!0,queueMicrotask(()=>c=!1),H(()=>{S(f?"refreshing":"pending"),E()},!1),y.then(B=>v(y,B,void 0,p),B=>v(y,void 0,de(B),p)))}return Object.defineProperties(Y,{state:{get:()=>m()},error:{get:()=>C()},loading:{get(){const h=m();return h==="pending"||h==="refreshing"}},latest:{get(){if(!f)return Y();const h=C();if(h&&!o)throw h;return x()}}}),A?ee(()=>G(!1)):G(!1),[Y,{refetch:G,mutate:$}]}function L(e){const t=g;g=null;try{return e()}finally{g=t}}function xe(e){return w===null||(w.cleanups===null?w.cleanups=[e]:w.cleanups.push(e)),e}let Ae;function fe(){const e=k;if(this.sources&&(this.state||e))if(this.state===N||e)j(this);else{const t=b;b=null,H(()=>_(this),!1),b=t}if(g){const t=this.observers?this.observers.length:0;g.sources?(g.sources.push(this),g.sourceSlots.push(t)):(g.sources=[this],g.sourceSlots=[t]),this.observers?(this.observers.push(g),this.observerSlots.push(g.sources.length-1)):(this.observers=[g],this.observerSlots=[g.sources.length-1])}return this.value}function ue(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&H(()=>{for(let i=0;i<e.observers.length;i+=1){const r=e.observers[i],o=k&&k.running;o&&k.disposed.has(r),(o&&!r.tState||!o&&!r.state)&&(r.pure?b.push(r):T.push(r),r.observers&&ae(r)),o||(r.state=N)}if(b.length>1e6)throw b=[],new Error},!1)),t}function j(e){if(!e.fn)return;z(e);const t=w,n=g,s=Z;g=w=e,me(e,e.value,s),g=n,w=t}function me(e,t,n){let s;try{s=e.fn(t)}catch(i){e.pure&&(e.state=N),he(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ue(e,s):e.value=s,e.updatedAt=n)}function F(e,t,n,s=N,i){const r={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:w,context:null,pure:n};return w===null||w!==re&&(w.owned?w.owned.push(r):w.owned=[r]),r}function V(e){const t=k;if(e.state===0||t)return;if(e.state===U||t)return _(e);if(e.suspense&&L(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Z);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===N||t)j(e);else if(e.state===U||t){const i=b;b=null,H(()=>_(e,n[0]),!1),b=i}}function H(e,t){if(b)return e();let n=!1;t||(b=[]),T?n=!0:T=[],Z++;try{const s=e();return Ee(n),s}catch(s){b||(T=null),he(s)}}function Ee(e){if(b&&(ce(b),b=null),e)return;const t=T;T=null,t.length&&H(()=>le(t),!1)}function ce(e){for(let t=0;t<e.length;t++)V(e[t])}function Se(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:V(s)}for(u.context&&Q(),t=0;t<n;t++)V(e[t])}function _(e,t){const n=k;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===N||n?i!==t&&V(i):(i.state===U||n)&&_(i,t))}}function ae(e){const t=k;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=U,s.pure?b.push(s):T.push(s),s.observers&&ae(s))}}function z(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const r=i.pop(),o=n.observerSlots.pop();s<i.length&&(r.sourceSlots[o]=s,i[s]=r,n.observerSlots[s]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)z(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function de(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function he(e){throw e=de(e),e}const ve=Symbol("fallback");function te(e){for(let t=0;t<e.length;t++)e[t]()}function $e(e,t,n={}){let s=[],i=[],r=[],o=0,l=t.length>1?[]:null;return xe(()=>te(r)),()=>{let a=e()||[],c,f;return a[be],L(()=>{let d=a.length,x,$,C,q,I,E,m,S,v;if(d===0)o!==0&&(te(r),r=[],s=[],i=[],o=0,l&&(l=[])),n.fallback&&(s=[ve],i[0]=P(K=>(r[0]=K,n.fallback())),o=1);else if(o===0){for(i=new Array(d),f=0;f<d;f++)s[f]=a[f],i[f]=P(A);o=d}else{for(C=new Array(d),q=new Array(d),l&&(I=new Array(d)),E=0,m=Math.min(o,d);E<m&&s[E]===a[E];E++);for(m=o-1,S=d-1;m>=E&&S>=E&&s[m]===a[S];m--,S--)C[S]=i[m],q[S]=r[m],l&&(I[S]=l[m]);for(x=new Map,$=new Array(S+1),f=S;f>=E;f--)v=a[f],c=x.get(v),$[f]=c===void 0?-1:c,x.set(v,f);for(c=E;c<=m;c++)v=s[c],f=x.get(v),f!==void 0&&f!==-1?(C[f]=i[c],q[f]=r[c],l&&(I[f]=l[c]),f=$[f],x.set(v,f)):r[c]();for(f=E;f<d;f++)f in C?(i[f]=C[f],r[f]=q[f],l&&(l[f]=I[f],l[f](f))):i[f]=P(A);i=i.slice(0,o=d),s=a.slice(0)}return i});function A(d){if(r[f]=d,l){const[x,$]=O(f);return l[f]=$,t(a[f],x)}return t(a[f])}}}let ge=!1;function Ce(){ge=!0}function Me(e,t){if(ge&&u.context){const n=u.context;Q(ye());const s=L(()=>e(t||{}));return Q(n),s}return L(()=>e(t||{}))}function je(e){const t="fallback"in e&&{fallback:()=>e.fallback};return oe($e(()=>e.each,e.children,t||void 0))}function Te(e,t,n){let s=n.length,i=t.length,r=s,o=0,l=0,a=t[i-1].nextSibling,c=null;for(;o<i||l<r;){if(t[o]===n[l]){o++,l++;continue}for(;t[i-1]===n[r-1];)i--,r--;if(i===o){const f=r<s?l?n[l-1].nextSibling:n[r-l]:a;for(;l<r;)e.insertBefore(n[l++],f)}else if(r===l)for(;o<i;)(!c||!c.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[r-1]&&n[l]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(n[l++],t[o++].nextSibling),e.insertBefore(n[--r],f),t[i]=n[r]}else{if(!c){c=new Map;let A=l;for(;A<r;)c.set(n[A],A++)}const f=c.get(t[o]);if(f!=null)if(l<f&&f<r){let A=o,d=1,x;for(;++A<i&&A<r&&!((x=c.get(t[A]))==null||x!==f+d);)d++;if(d>f-l){const $=t[o];for(;l<f;)e.insertBefore(n[l++],$)}else e.replaceChild(n[l++],t[o++])}else o++;else t[o++].remove()}}}const ne="_$DX_DELEGATE";function Ne(e,t,n,s={}){let i;return P(r=>{i=r,t===document?e():ke(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function Be(e,t,n){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return n&&(i=i.firstChild),i}function Oe(e,t=window.document){const n=t[ne]||(t[ne]=new Set);for(let s=0,i=e.length;s<i;s++){const r=e[s];n.has(r)||(n.add(r),t.addEventListener(r,pe))}}function Pe(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function De(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ue(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=r=>i.call(e,n[1],r))}else e.addEventListener(t,n)}function ke(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return R(e,t,s,n);X(i=>R(e,t(),i,n),s)}function Le(e,t,n={}){u.completed=globalThis._$HY.completed,u.events=globalThis._$HY.events,u.load=globalThis._$HY.load,u.gather=i=>ie(t,i),u.registry=new Map,u.context={id:n.renderId||"",count:0},ie(t,n.renderId);const s=Ne(e,t,[...t.childNodes],n);return u.context=null,s}function Ve(e){let t,n;return!u.context||!(t=u.registry.get(n=He()))?e.cloneNode(!0):(u.completed&&u.completed.add(t),u.registry.delete(n),t)}function _e(e){let t=e,n=0,s=[];if(u.context)for(;t;){if(t.nodeType===8){const i=t.nodeValue;if(i==="#")n++;else if(i==="/"){if(n===0)return[t,s];n--}}s.push(t),t=t.nextSibling}return[t,s]}function Re(){u.events&&!u.events.queued&&(queueMicrotask(()=>{const{completed:e,events:t}=u;for(t.queued=!1;t.length;){const[n,s]=t[0];if(!e.has(n))return;pe(s),t.shift()}}),u.events.queued=!0)}function pe(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),u.registry&&!u.done&&(u.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function R(e,t,n,s,i){for(u.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const r=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,r==="string"||r==="number"){if(u.context)return n;if(r==="number"&&(t=t.toString()),o){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=M(e,n,s,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||r==="boolean"){if(u.context)return n;n=M(e,n,s)}else{if(r==="function")return X(()=>{let l=t();for(;typeof l=="function";)l=l();n=R(e,l,n,s)}),()=>n;if(Array.isArray(t)){const l=[],a=n&&Array.isArray(n);if(J(l,t,n,i))return X(()=>n=R(e,l,n,s,!0)),()=>n;if(u.context){if(!l.length)return n;for(let c=0;c<l.length;c++)if(l[c].parentNode)return n=l}if(l.length===0){if(n=M(e,n,s),o)return n}else a?n.length===0?se(e,l,s):Te(e,n,l):(n&&M(e),se(e,l));n=l}else if(t instanceof Node){if(u.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=M(e,n,s,t);M(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function J(e,t,n,s){let i=!1;for(let r=0,o=t.length;r<o;r++){let l=t[r],a=n&&n[r];if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))i=J(e,l,a)||i;else if(typeof l=="function")if(s){for(;typeof l=="function";)l=l();i=J(e,Array.isArray(l)?l:[l],Array.isArray(a)?a:[a])||i}else e.push(l),i=!0;else{const c=String(l);a&&a.nodeType===3&&a.data===c?e.push(a):e.push(document.createTextNode(c))}}return i}function se(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function M(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let r=!1;for(let o=t.length-1;o>=0;o--){const l=t[o];if(i!==l){const a=l.parentNode===e;!r&&!o?a?e.replaceChild(i,l):e.insertBefore(i,n):a&&l.remove()}else r=!0}}else e.insertBefore(i,n);return[i]}function ie(e,t){const n=e.querySelectorAll("*[data-hk]");for(let s=0;s<n.length;s++){const i=n[s],r=i.getAttribute("data-hk");(!t||r.startsWith(t))&&!u.registry.has(r)&&u.registry.set(r,i)}}function He(){const e=u.context;return`${e.id}${e.count++}`}const Fe=(...e)=>(Ce(),Le(...e));export{je as F,_e as a,oe as b,O as c,X as d,De as e,Oe as f,Ve as g,Ue as h,ke as i,Ie as j,qe as k,Me as l,u as m,Ne as n,Fe as o,Re as r,Pe as s,Be as t};
