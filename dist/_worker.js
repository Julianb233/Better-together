var ta=Object.defineProperty;var Lt=e=>{throw TypeError(e)};var sa=(e,t,a)=>t in e?ta(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var v=(e,t,a)=>sa(e,typeof t!="symbol"?t+"":t,a),dt=(e,t,a)=>t.has(e)||Lt("Cannot "+a);var p=(e,t,a)=>(dt(e,t,"read from private field"),a?a.call(e):t.get(e)),S=(e,t,a)=>t.has(e)?Lt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,a),y=(e,t,a,i)=>(dt(e,t,"write to private field"),i?i.call(e,a):t.set(e,a),a),E=(e,t,a)=>(dt(e,t,"access private method"),a);var _t=(e,t,a,i)=>({set _(r){y(e,t,r,a)},get _(){return p(e,t,i)}});var ps={Stringify:1},L=(e,t)=>{const a=new String(e);return a.isEscaped=!0,a.callbacks=t,a},aa=/[&<>'"]/,xs=async(e,t)=>{let a="";t||(t=[]);const i=await Promise.all(e);for(let r=i.length-1;a+=i[r],r--,!(r<0);r--){let l=i[r];typeof l=="object"&&t.push(...l.callbacks||[]);const n=l.isEscaped;if(l=await(typeof l=="object"?l.toString():l),typeof l=="object"&&t.push(...l.callbacks||[]),l.isEscaped??n)a+=l;else{const o=[a];re(l,o),a=o[0]}}return L(a,t)},re=(e,t)=>{const a=e.search(aa);if(a===-1){t[0]+=e;return}let i,r,l=0;for(r=a;r<e.length;r++){switch(e.charCodeAt(r)){case 34:i="&quot;";break;case 39:i="&#39;";break;case 38:i="&amp;";break;case 60:i="&lt;";break;case 62:i="&gt;";break;default:continue}t[0]+=e.substring(l,r)+i,l=r+1}t[0]+=e.substring(l,r)},us=e=>{const t=e.callbacks;if(!(t!=null&&t.length))return e;const a=[e],i={};return t.forEach(r=>r({phase:ps.Stringify,buffer:a,context:i})),a[0]},gs=async(e,t,a,i,r)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const l=e.callbacks;return l!=null&&l.length?(r?r[0]+=e:r=[e],Promise.all(l.map(o=>o({phase:t,buffer:r,context:i}))).then(o=>Promise.all(o.filter(Boolean).map(d=>gs(d,t,!1,i,r))).then(()=>r[0]))):Promise.resolve(e)},ia=(e,...t)=>{const a=[""];for(let i=0,r=e.length-1;i<r;i++){a[0]+=e[i];const l=Array.isArray(t[i])?t[i].flat(1/0):[t[i]];for(let n=0,o=l.length;n<o;n++){const d=l[n];if(typeof d=="string")re(d,a);else if(typeof d=="number")a[0]+=d;else{if(typeof d=="boolean"||d===null||d===void 0)continue;if(typeof d=="object"&&d.isEscaped)if(d.callbacks)a.unshift("",d);else{const c=d.toString();c instanceof Promise?a.unshift("",c):a[0]+=c}else d instanceof Promise?a.unshift("",d):re(d.toString(),a)}}}return a[0]+=e.at(-1),a.length===1?"callbacks"in a?L(us(L(a[0],a.callbacks))):L(a[0]):xs(a,a.callbacks)},At=Symbol("RENDERER"),bt=Symbol("ERROR_HANDLER"),N=Symbol("STASH"),fs=Symbol("INTERNAL"),ra=Symbol("MEMO"),it=Symbol("PERMALINK"),Ft=e=>(e[fs]=!0,e),hs=e=>({value:t,children:a})=>{if(!a)return;const i={children:[{tag:Ft(()=>{e.push(t)}),props:{}}]};Array.isArray(a)?i.children.push(...a.flat()):i.children.push(a),i.children.push({tag:Ft(()=>{e.pop()}),props:{}});const r={tag:"",props:i,type:""};return r[bt]=l=>{throw e.pop(),l},r},vs=e=>{const t=[e],a=hs(t);return a.values=t,a.Provider=a,Pe.push(a),a},Pe=[],Et=e=>{const t=[e],a=i=>{t.push(i.value);let r;try{r=i.children?(Array.isArray(i.children)?new ks("",{},i.children):i.children).toString():""}finally{t.pop()}return r instanceof Promise?r.then(l=>L(l,l.callbacks)):L(r)};return a.values=t,a.Provider=a,a[At]=hs(t),Pe.push(a),a},je=e=>e.values.at(-1),Ke={title:[],script:["src"],style:["data-href"],link:["href"],meta:["name","httpEquiv","charset","itemProp"]},yt={},Xe="data-precedence",Ge=e=>Array.isArray(e)?e:[e],Ot=new WeakMap,qt=(e,t,a,i)=>({buffer:r,context:l})=>{if(!r)return;const n=Ot.get(l)||{};Ot.set(l,n);const o=n[e]||(n[e]=[]);let d=!1;const c=Ke[e];if(c.length>0){e:for(const[,m]of o)for(const x of c)if(((m==null?void 0:m[x])??null)===(a==null?void 0:a[x])){d=!0;break e}}if(d?r[0]=r[0].replaceAll(t,""):c.length>0?o.push([t,a,i]):o.unshift([t,a,i]),r[0].indexOf("</head>")!==-1){let m;if(i===void 0)m=o.map(([x])=>x);else{const x=[];m=o.map(([u,,f])=>{let h=x.indexOf(f);return h===-1&&(x.push(f),h=x.length-1),[u,h]}).sort((u,f)=>u[1]-f[1]).map(([u])=>u)}m.forEach(x=>{r[0]=r[0].replaceAll(x,"")}),r[0]=r[0].replace(/(?=<\/head>)/,m.join(""))}},ze=(e,t,a)=>L(new q(e,a,Ge(t??[])).toString()),We=(e,t,a,i)=>{if("itemProp"in a)return ze(e,t,a);let{precedence:r,blocking:l,...n}=a;r=i?r??"":void 0,i&&(n[Xe]=r);const o=new q(e,n,Ge(t||[])).toString();return o instanceof Promise?o.then(d=>L(o,[...d.callbacks||[],qt(e,d,n,r)])):L(o,[qt(e,o,n,r)])},la=({children:e,...t})=>{const a=Pt();if(a){const i=je(a);if(i==="svg"||i==="head")return new q("title",t,Ge(e??[]))}return We("title",e,t,!1)},na=({children:e,...t})=>{const a=Pt();return["src","async"].some(i=>!t[i])||a&&je(a)==="head"?ze("script",e,t):We("script",e,t,!1)},oa=({children:e,...t})=>["href","precedence"].every(a=>a in t)?(t["data-href"]=t.href,delete t.href,We("style",e,t,!0)):ze("style",e,t),da=({children:e,...t})=>["onLoad","onError"].some(a=>a in t)||t.rel==="stylesheet"&&(!("precedence"in t)||"disabled"in t)?ze("link",e,t):We("link",e,t,"precedence"in t),ca=({children:e,...t})=>{const a=Pt();return a&&je(a)==="head"?ze("meta",e,t):We("meta",e,t,!1)},bs=(e,{children:t,...a})=>new q(e,a,Ge(t??[])),ma=e=>(typeof e.action=="function"&&(e.action=it in e.action?e.action[it]:void 0),bs("form",e)),ys=(e,t)=>(typeof t.formAction=="function"&&(t.formAction=it in t.formAction?t.formAction[it]:void 0),bs(e,t)),pa=e=>ys("input",e),xa=e=>ys("button",e);const ct=Object.freeze(Object.defineProperty({__proto__:null,button:xa,form:ma,input:pa,link:da,meta:ca,script:na,style:oa,title:la},Symbol.toStringTag,{value:"Module"}));var ua=new Map([["className","class"],["htmlFor","for"],["crossOrigin","crossorigin"],["httpEquiv","http-equiv"],["itemProp","itemprop"],["fetchPriority","fetchpriority"],["noModule","nomodule"],["formAction","formaction"]]),rt=e=>ua.get(e)||e,ws=(e,t)=>{for(const[a,i]of Object.entries(e)){const r=a[0]==="-"||!/[A-Z]/.test(a)?a:a.replace(/[A-Z]/g,l=>`-${l.toLowerCase()}`);t(r,i==null?null:typeof i=="number"?r.match(/^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/)?`${i}`:`${i}px`:i)}},De=void 0,Pt=()=>De,ga=e=>/[A-Z]/.test(e)&&e.match(/^(?:al|basel|clip(?:Path|Rule)$|co|do|fill|fl|fo|gl|let|lig|i|marker[EMS]|o|pai|pointe|sh|st[or]|text[^L]|tr|u|ve|w)/)?e.replace(/([A-Z])/g,"-$1").toLowerCase():e,fa=["area","base","br","col","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],ha=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","download","formnovalidate","hidden","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"],Nt=(e,t)=>{for(let a=0,i=e.length;a<i;a++){const r=e[a];if(typeof r=="string")re(r,t);else{if(typeof r=="boolean"||r===null||r===void 0)continue;r instanceof q?r.toStringToBuffer(t):typeof r=="number"||r.isEscaped?t[0]+=r:r instanceof Promise?t.unshift("",r):Nt(r,t)}}},q=class{constructor(e,t,a){v(this,"tag");v(this,"props");v(this,"key");v(this,"children");v(this,"isEscaped",!0);v(this,"localContexts");this.tag=e,this.props=t,this.children=a}get type(){return this.tag}get ref(){return this.props.ref||null}toString(){var t,a;const e=[""];(t=this.localContexts)==null||t.forEach(([i,r])=>{i.values.push(r)});try{this.toStringToBuffer(e)}finally{(a=this.localContexts)==null||a.forEach(([i])=>{i.values.pop()})}return e.length===1?"callbacks"in e?us(L(e[0],e.callbacks)).toString():e[0]:xs(e,e.callbacks)}toStringToBuffer(e){const t=this.tag,a=this.props;let{children:i}=this;e[0]+=`<${t}`;const r=De&&je(De)==="svg"?l=>ga(rt(l)):l=>rt(l);for(let[l,n]of Object.entries(a))if(l=r(l),l!=="children"){if(l==="style"&&typeof n=="object"){let o="";ws(n,(d,c)=>{c!=null&&(o+=`${o?";":""}${d}:${c}`)}),e[0]+=' style="',re(o,e),e[0]+='"'}else if(typeof n=="string")e[0]+=` ${l}="`,re(n,e),e[0]+='"';else if(n!=null)if(typeof n=="number"||n.isEscaped)e[0]+=` ${l}="${n}"`;else if(typeof n=="boolean"&&ha.includes(l))n&&(e[0]+=` ${l}=""`);else if(l==="dangerouslySetInnerHTML"){if(i.length>0)throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");i=[L(n.__html)]}else if(n instanceof Promise)e[0]+=` ${l}="`,e.unshift('"',n);else if(typeof n=="function"){if(!l.startsWith("on")&&l!=="ref")throw new Error(`Invalid prop '${l}' of type 'function' supplied to '${t}'.`)}else e[0]+=` ${l}="`,re(n.toString(),e),e[0]+='"'}if(fa.includes(t)&&i.length===0){e[0]+="/>";return}e[0]+=">",Nt(i,e),e[0]+=`</${t}>`}},mt=class extends q{toStringToBuffer(e){const{children:t}=this,a=this.tag.call(null,{...this.props,children:t.length<=1?t[0]:t});if(!(typeof a=="boolean"||a==null))if(a instanceof Promise)if(Pe.length===0)e.unshift("",a);else{const i=Pe.map(r=>[r,r.values.at(-1)]);e.unshift("",a.then(r=>(r instanceof q&&(r.localContexts=i),r)))}else a instanceof q?a.toStringToBuffer(e):typeof a=="number"||a.isEscaped?(e[0]+=a,a.callbacks&&(e.callbacks||(e.callbacks=[]),e.callbacks.push(...a.callbacks))):re(a,e)}},ks=class extends q{toStringToBuffer(e){Nt(this.children,e)}},$t=(e,t,...a)=>{t??(t={}),a.length&&(t.children=a.length===1?a[0]:a);const i=t.key;delete t.key;const r=Qe(e,t,a);return r.key=i,r},Ht=!1,Qe=(e,t,a)=>{if(!Ht){for(const i in yt)ct[i][At]=yt[i];Ht=!0}return typeof e=="function"?new mt(e,t,a):ct[e]?new mt(ct[e],t,a):e==="svg"||e==="head"?(De||(De=Et("")),new q(e,t,[new mt(De,{value:e},a)])):new q(e,t,a)},va=({children:e})=>new ks("",{children:e},Array.isArray(e)?e:e?[e]:[]);function s(e,t,a){let i;if(!t||!("children"in t))i=Qe(e,t,[]);else{const r=t.children;i=Array.isArray(r)?Qe(e,t,r):Qe(e,t,[r])}return i.key=a,i}var Ut=(e,t,a)=>(i,r)=>{let l=-1;return n(0);async function n(o){if(o<=l)throw new Error("next() called multiple times");l=o;let d,c=!1,m;if(e[o]?(m=e[o][0][0],i.req.routeIndex=o):m=o===e.length&&r||void 0,m)try{d=await m(i,()=>n(o+1))}catch(x){if(x instanceof Error&&t)i.error=x,d=await t(x,i),c=!0;else throw x}else i.finalized===!1&&a&&(d=await a(i));return d&&(i.finalized===!1||c)&&(i.res=d),i}},ba=Symbol(),ya=async(e,t=Object.create(null))=>{const{all:a=!1,dot:i=!1}=t,l=(e instanceof Ns?e.raw.headers:e.headers).get("Content-Type");return l!=null&&l.startsWith("multipart/form-data")||l!=null&&l.startsWith("application/x-www-form-urlencoded")?wa(e,{all:a,dot:i}):{}};async function wa(e,t){const a=await e.formData();return a?ka(a,t):{}}function ka(e,t){const a=Object.create(null);return e.forEach((i,r)=>{t.all||r.endsWith("[]")?Sa(a,r,i):a[r]=i}),t.dot&&Object.entries(a).forEach(([i,r])=>{i.includes(".")&&(Ca(a,i,r),delete a[i])}),a}var Sa=(e,t,a)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(a):e[t]=[e[t],a]:t.endsWith("[]")?e[t]=[a]:e[t]=a},Ca=(e,t,a)=>{let i=e;const r=t.split(".");r.forEach((l,n)=>{n===r.length-1?i[l]=a:((!i[l]||typeof i[l]!="object"||Array.isArray(i[l])||i[l]instanceof File)&&(i[l]=Object.create(null)),i=i[l])})},Ss=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Aa=e=>{const{groups:t,path:a}=Ea(e),i=Ss(a);return Pa(i,t)},Ea=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(a,i)=>{const r=`@${i}`;return t.push([r,a]),r}),{groups:t,path:e}},Pa=(e,t)=>{for(let a=t.length-1;a>=0;a--){const[i]=t[a];for(let r=e.length-1;r>=0;r--)if(e[r].includes(i)){e[r]=e[r].replace(i,t[a][1]);break}}return e},Ve={},Na=(e,t)=>{if(e==="*")return"*";const a=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const i=`${e}#${t}`;return Ve[i]||(a[2]?Ve[i]=t&&t[0]!==":"&&t[0]!=="*"?[i,a[1],new RegExp(`^${a[2]}(?=/${t})`)]:[e,a[1],new RegExp(`^${a[2]}$`)]:Ve[i]=[e,a[1],!0]),Ve[i]}return null},It=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return t(a)}catch{return a}})}},Ia=e=>It(e,decodeURI),Cs=e=>{const t=e.url,a=t.indexOf("/",t.charCodeAt(9)===58?13:8);let i=a;for(;i<t.length;i++){const r=t.charCodeAt(i);if(r===37){const l=t.indexOf("?",i),n=t.slice(a,l===-1?void 0:l);return Ia(n.includes("%25")?n.replace(/%25/g,"%2525"):n)}else if(r===63)break}return t.slice(a,i)},ja=e=>{const t=Cs(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},be=(e,t,...a)=>(a.length&&(t=be(t,...a)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),As=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),a=[];let i="";return t.forEach(r=>{if(r!==""&&!/\:/.test(r))i+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){a.length===0&&i===""?a.push("/"):a.push(i);const l=r.replace("?","");i+="/"+l,a.push(i)}else i+="/"+r}),a.filter((r,l,n)=>n.indexOf(r)===l)},pt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?It(e,Ps):e):e,Es=(e,t,a)=>{let i;if(!a&&t&&!/[%+]/.test(t)){let n=e.indexOf(`?${t}`,8);for(n===-1&&(n=e.indexOf(`&${t}`,8));n!==-1;){const o=e.charCodeAt(n+t.length+1);if(o===61){const d=n+t.length+2,c=e.indexOf("&",d);return pt(e.slice(d,c===-1?void 0:c))}else if(o==38||isNaN(o))return"";n=e.indexOf(`&${t}`,n+1)}if(i=/[%+]/.test(e),!i)return}const r={};i??(i=/[%+]/.test(e));let l=e.indexOf("?",8);for(;l!==-1;){const n=e.indexOf("&",l+1);let o=e.indexOf("=",l);o>n&&n!==-1&&(o=-1);let d=e.slice(l+1,o===-1?n===-1?void 0:n:o);if(i&&(d=pt(d)),l=n,d==="")continue;let c;o===-1?c="":(c=e.slice(o+1,n===-1?void 0:n),i&&(c=pt(c))),a?(r[d]&&Array.isArray(r[d])||(r[d]=[]),r[d].push(c)):r[d]??(r[d]=c)}return t?r[t]:r},Ta=Es,Ra=(e,t)=>Es(e,t,!0),Ps=decodeURIComponent,Gt=e=>It(e,Ps),ke,D,J,Is,js,wt,Z,as,Ns=(as=class{constructor(e,t="/",a=[[]]){S(this,J);v(this,"raw");S(this,ke);S(this,D);v(this,"routeIndex",0);v(this,"path");v(this,"bodyCache",{});S(this,Z,e=>{const{bodyCache:t,raw:a}=this,i=t[e];if(i)return i;const r=Object.keys(t)[0];return r?t[r].then(l=>(r==="json"&&(l=JSON.stringify(l)),new Response(l)[e]())):t[e]=a[e]()});this.raw=e,this.path=t,y(this,D,a),y(this,ke,{})}param(e){return e?E(this,J,Is).call(this,e):E(this,J,js).call(this)}query(e){return Ta(this.url,e)}queries(e){return Ra(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((a,i)=>{t[i]=a}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await ya(this,e))}json(){return p(this,Z).call(this,"text").then(e=>JSON.parse(e))}text(){return p(this,Z).call(this,"text")}arrayBuffer(){return p(this,Z).call(this,"arrayBuffer")}blob(){return p(this,Z).call(this,"blob")}formData(){return p(this,Z).call(this,"formData")}addValidatedData(e,t){p(this,ke)[e]=t}valid(e){return p(this,ke)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[ba](){return p(this,D)}get matchedRoutes(){return p(this,D)[0].map(([[,e]])=>e)}get routePath(){return p(this,D)[0].map(([[,e]])=>e)[this.routeIndex].path}},ke=new WeakMap,D=new WeakMap,J=new WeakSet,Is=function(e){const t=p(this,D)[0][this.routeIndex][1][e],a=E(this,J,wt).call(this,t);return a?/\%/.test(a)?Gt(a):a:void 0},js=function(){const e={},t=Object.keys(p(this,D)[0][this.routeIndex][1]);for(const a of t){const i=E(this,J,wt).call(this,p(this,D)[0][this.routeIndex][1][a]);i&&typeof i=="string"&&(e[a]=/\%/.test(i)?Gt(i):i)}return e},wt=function(e){return p(this,D)[1]?p(this,D)[1][e]:e},Z=new WeakMap,as),Ba="text/plain; charset=UTF-8",xt=(e,t)=>({"Content-Type":e,...t}),Fe,Oe,z,Se,W,M,qe,Ce,Ae,ce,$e,He,ee,ye,is,Ma=(is=class{constructor(e,t){S(this,ee);S(this,Fe);S(this,Oe);v(this,"env",{});S(this,z);v(this,"finalized",!1);v(this,"error");S(this,Se);S(this,W);S(this,M);S(this,qe);S(this,Ce);S(this,Ae);S(this,ce);S(this,$e);S(this,He);v(this,"render",(...e)=>(p(this,Ce)??y(this,Ce,t=>this.html(t)),p(this,Ce).call(this,...e)));v(this,"setLayout",e=>y(this,qe,e));v(this,"getLayout",()=>p(this,qe));v(this,"setRenderer",e=>{y(this,Ce,e)});v(this,"header",(e,t,a)=>{this.finalized&&y(this,M,new Response(p(this,M).body,p(this,M)));const i=p(this,M)?p(this,M).headers:p(this,ce)??y(this,ce,new Headers);t===void 0?i.delete(e):a!=null&&a.append?i.append(e,t):i.set(e,t)});v(this,"status",e=>{y(this,Se,e)});v(this,"set",(e,t)=>{p(this,z)??y(this,z,new Map),p(this,z).set(e,t)});v(this,"get",e=>p(this,z)?p(this,z).get(e):void 0);v(this,"newResponse",(...e)=>E(this,ee,ye).call(this,...e));v(this,"body",(e,t,a)=>E(this,ee,ye).call(this,e,t,a));v(this,"text",(e,t,a)=>!p(this,ce)&&!p(this,Se)&&!t&&!a&&!this.finalized?new Response(e):E(this,ee,ye).call(this,e,t,xt(Ba,a)));v(this,"json",(e,t,a)=>E(this,ee,ye).call(this,JSON.stringify(e),t,xt("application/json",a)));v(this,"html",(e,t,a)=>{const i=r=>E(this,ee,ye).call(this,r,t,xt("text/html; charset=UTF-8",a));return typeof e=="object"?gs(e,ps.Stringify,!1,{}).then(i):i(e)});v(this,"redirect",(e,t)=>{const a=String(e);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,t??302)});v(this,"notFound",()=>(p(this,Ae)??y(this,Ae,()=>new Response),p(this,Ae).call(this,this)));y(this,Fe,e),t&&(y(this,W,t.executionCtx),this.env=t.env,y(this,Ae,t.notFoundHandler),y(this,He,t.path),y(this,$e,t.matchResult))}get req(){return p(this,Oe)??y(this,Oe,new Ns(p(this,Fe),p(this,He),p(this,$e))),p(this,Oe)}get event(){if(p(this,W)&&"respondWith"in p(this,W))return p(this,W);throw Error("This context has no FetchEvent")}get executionCtx(){if(p(this,W))return p(this,W);throw Error("This context has no ExecutionContext")}get res(){return p(this,M)||y(this,M,new Response(null,{headers:p(this,ce)??y(this,ce,new Headers)}))}set res(e){if(p(this,M)&&e){e=new Response(e.body,e);for(const[t,a]of p(this,M).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const i=p(this,M).headers.getSetCookie();e.headers.delete("set-cookie");for(const r of i)e.headers.append("set-cookie",r)}else e.headers.set(t,a)}y(this,M,e),this.finalized=!0}get var(){return p(this,z)?Object.fromEntries(p(this,z)):{}}},Fe=new WeakMap,Oe=new WeakMap,z=new WeakMap,Se=new WeakMap,W=new WeakMap,M=new WeakMap,qe=new WeakMap,Ce=new WeakMap,Ae=new WeakMap,ce=new WeakMap,$e=new WeakMap,He=new WeakMap,ee=new WeakSet,ye=function(e,t,a){const i=p(this,M)?new Headers(p(this,M).headers):p(this,ce)??new Headers;if(typeof t=="object"&&"headers"in t){const l=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[n,o]of l)n.toLowerCase()==="set-cookie"?i.append(n,o):i.set(n,o)}if(a)for(const[l,n]of Object.entries(a))if(typeof n=="string")i.set(l,n);else{i.delete(l);for(const o of n)i.append(l,o)}const r=typeof t=="number"?t:(t==null?void 0:t.status)??p(this,Se);return new Response(e,{status:r,headers:i})},is),I="ALL",Da="all",La=["get","post","put","delete","options","patch"],Ts="Can not add a route since the matcher is already built.",Rs=class extends Error{},_a="__COMPOSED_HANDLER",Fa=e=>e.text("404 Not Found",404),zt=(e,t)=>{if("getResponse"in e){const a=e.getResponse();return t.newResponse(a.body,a)}return console.error(e),t.text("Internal Server Error",500)},_,j,Ms,F,oe,Ze,et,rs,Bs=(rs=class{constructor(t={}){S(this,j);v(this,"get");v(this,"post");v(this,"put");v(this,"delete");v(this,"options");v(this,"patch");v(this,"all");v(this,"on");v(this,"use");v(this,"router");v(this,"getPath");v(this,"_basePath","/");S(this,_,"/");v(this,"routes",[]);S(this,F,Fa);v(this,"errorHandler",zt);v(this,"onError",t=>(this.errorHandler=t,this));v(this,"notFound",t=>(y(this,F,t),this));v(this,"fetch",(t,...a)=>E(this,j,et).call(this,t,a[1],a[0],t.method));v(this,"request",(t,a,i,r)=>t instanceof Request?this.fetch(a?new Request(t,a):t,i,r):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${be("/",t)}`,a),i,r)));v(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(E(this,j,et).call(this,t.request,t,void 0,t.request.method))})});[...La,Da].forEach(l=>{this[l]=(n,...o)=>(typeof n=="string"?y(this,_,n):E(this,j,oe).call(this,l,p(this,_),n),o.forEach(d=>{E(this,j,oe).call(this,l,p(this,_),d)}),this)}),this.on=(l,n,...o)=>{for(const d of[n].flat()){y(this,_,d);for(const c of[l].flat())o.map(m=>{E(this,j,oe).call(this,c.toUpperCase(),p(this,_),m)})}return this},this.use=(l,...n)=>(typeof l=="string"?y(this,_,l):(y(this,_,"*"),n.unshift(l)),n.forEach(o=>{E(this,j,oe).call(this,I,p(this,_),o)}),this);const{strict:i,...r}=t;Object.assign(this,r),this.getPath=i??!0?t.getPath??Cs:ja}route(t,a){const i=this.basePath(t);return a.routes.map(r=>{var n;let l;a.errorHandler===zt?l=r.handler:(l=async(o,d)=>(await Ut([],a.errorHandler)(o,()=>r.handler(o,d))).res,l[_a]=r.handler),E(n=i,j,oe).call(n,r.method,r.path,l)}),this}basePath(t){const a=E(this,j,Ms).call(this);return a._basePath=be(this._basePath,t),a}mount(t,a,i){let r,l;i&&(typeof i=="function"?l=i:(l=i.optionHandler,i.replaceRequest===!1?r=d=>d:r=i.replaceRequest));const n=l?d=>{const c=l(d);return Array.isArray(c)?c:[c]}:d=>{let c;try{c=d.executionCtx}catch{}return[d.env,c]};r||(r=(()=>{const d=be(this._basePath,t),c=d==="/"?0:d.length;return m=>{const x=new URL(m.url);return x.pathname=x.pathname.slice(c)||"/",new Request(x,m)}})());const o=async(d,c)=>{const m=await a(r(d.req.raw),...n(d));if(m)return m;await c()};return E(this,j,oe).call(this,I,be(t,"*"),o),this}},_=new WeakMap,j=new WeakSet,Ms=function(){const t=new Bs({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,y(t,F,p(this,F)),t.routes=this.routes,t},F=new WeakMap,oe=function(t,a,i){t=t.toUpperCase(),a=be(this._basePath,a);const r={basePath:this._basePath,path:a,method:t,handler:i};this.router.add(t,a,[i,r]),this.routes.push(r)},Ze=function(t,a){if(t instanceof Error)return this.errorHandler(t,a);throw t},et=function(t,a,i,r){if(r==="HEAD")return(async()=>new Response(null,await E(this,j,et).call(this,t,a,i,"GET")))();const l=this.getPath(t,{env:i}),n=this.router.match(r,l),o=new Ma(t,{path:l,matchResult:n,env:i,executionCtx:a,notFoundHandler:p(this,F)});if(n[0].length===1){let c;try{c=n[0][0][0][0](o,async()=>{o.res=await p(this,F).call(this,o)})}catch(m){return E(this,j,Ze).call(this,m,o)}return c instanceof Promise?c.then(m=>m||(o.finalized?o.res:p(this,F).call(this,o))).catch(m=>E(this,j,Ze).call(this,m,o)):c??p(this,F).call(this,o)}const d=Ut(n[0],this.errorHandler,p(this,F));return(async()=>{try{const c=await d(o);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return E(this,j,Ze).call(this,c,o)}})()},rs),lt="[^/]+",Be=".*",Me="(?:|/.*)",we=Symbol(),Oa=new Set(".\\+*[^]$()");function qa(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Be||e===Me?1:t===Be||t===Me?-1:e===lt?1:t===lt?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var me,pe,O,ls,kt=(ls=class{constructor(){S(this,me);S(this,pe);S(this,O,Object.create(null))}insert(t,a,i,r,l){if(t.length===0){if(p(this,me)!==void 0)throw we;if(l)return;y(this,me,a);return}const[n,...o]=t,d=n==="*"?o.length===0?["","",Be]:["","",lt]:n==="/*"?["","",Me]:n.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(d){const m=d[1];let x=d[2]||lt;if(m&&d[2]&&(x===".*"||(x=x.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(x))))throw we;if(c=p(this,O)[x],!c){if(Object.keys(p(this,O)).some(u=>u!==Be&&u!==Me))throw we;if(l)return;c=p(this,O)[x]=new kt,m!==""&&y(c,pe,r.varIndex++)}!l&&m!==""&&i.push([m,p(c,pe)])}else if(c=p(this,O)[n],!c){if(Object.keys(p(this,O)).some(m=>m.length>1&&m!==Be&&m!==Me))throw we;if(l)return;c=p(this,O)[n]=new kt}c.insert(o,a,i,r,l)}buildRegExpStr(){const a=Object.keys(p(this,O)).sort(qa).map(i=>{const r=p(this,O)[i];return(typeof p(r,pe)=="number"?`(${i})@${p(r,pe)}`:Oa.has(i)?`\\${i}`:i)+r.buildRegExpStr()});return typeof p(this,me)=="number"&&a.unshift(`#${p(this,me)}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},me=new WeakMap,pe=new WeakMap,O=new WeakMap,ls),nt,Ue,ns,$a=(ns=class{constructor(){S(this,nt,{varIndex:0});S(this,Ue,new kt)}insert(e,t,a){const i=[],r=[];for(let n=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,d=>{const c=`@\\${n}`;return r[n]=[c,d],n++,o=!0,c}),!o)break}const l=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let n=r.length-1;n>=0;n--){const[o]=r[n];for(let d=l.length-1;d>=0;d--)if(l[d].indexOf(o)!==-1){l[d]=l[d].replace(o,r[n][1]);break}}return p(this,Ue).insert(l,t,i,p(this,nt),a),i}buildRegExp(){let e=p(this,Ue).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const a=[],i=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,l,n)=>l!==void 0?(a[++t]=Number(l),"$()"):(n!==void 0&&(i[Number(n)]=++t),"")),[new RegExp(`^${e}`),a,i]}},nt=new WeakMap,Ue=new WeakMap,ns),Ds=[],Ha=[/^$/,[],Object.create(null)],tt=Object.create(null);function Ls(e){return tt[e]??(tt[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,a)=>a?`\\${a}`:"(?:|/.*)")}$`))}function Ua(){tt=Object.create(null)}function Ga(e){var c;const t=new $a,a=[];if(e.length===0)return Ha;const i=e.map(m=>[!/\*|\/:/.test(m[0]),...m]).sort(([m,x],[u,f])=>m?1:u?-1:x.length-f.length),r=Object.create(null);for(let m=0,x=-1,u=i.length;m<u;m++){const[f,h,g]=i[m];f?r[h]=[g.map(([k])=>[k,Object.create(null)]),Ds]:x++;let b;try{b=t.insert(h,x,f)}catch(k){throw k===we?new Rs(h):k}f||(a[x]=g.map(([k,C])=>{const P=Object.create(null);for(C-=1;C>=0;C--){const[A,R]=b[C];P[A]=R}return[k,P]}))}const[l,n,o]=t.buildRegExp();for(let m=0,x=a.length;m<x;m++)for(let u=0,f=a[m].length;u<f;u++){const h=(c=a[m][u])==null?void 0:c[1];if(!h)continue;const g=Object.keys(h);for(let b=0,k=g.length;b<k;b++)h[g[b]]=o[h[g[b]]]}const d=[];for(const m in n)d[m]=a[n[m]];return[l,d,r]}function he(e,t){if(e){for(const a of Object.keys(e).sort((i,r)=>r.length-i.length))if(Ls(a).test(t))return[...e[a]]}}var te,se,Ie,_s,Fs,os,za=(os=class{constructor(){S(this,Ie);v(this,"name","RegExpRouter");S(this,te);S(this,se);y(this,te,{[I]:Object.create(null)}),y(this,se,{[I]:Object.create(null)})}add(e,t,a){var o;const i=p(this,te),r=p(this,se);if(!i||!r)throw new Error(Ts);i[e]||[i,r].forEach(d=>{d[e]=Object.create(null),Object.keys(d[I]).forEach(c=>{d[e][c]=[...d[I][c]]})}),t==="/*"&&(t="*");const l=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const d=Ls(t);e===I?Object.keys(i).forEach(c=>{var m;(m=i[c])[t]||(m[t]=he(i[c],t)||he(i[I],t)||[])}):(o=i[e])[t]||(o[t]=he(i[e],t)||he(i[I],t)||[]),Object.keys(i).forEach(c=>{(e===I||e===c)&&Object.keys(i[c]).forEach(m=>{d.test(m)&&i[c][m].push([a,l])})}),Object.keys(r).forEach(c=>{(e===I||e===c)&&Object.keys(r[c]).forEach(m=>d.test(m)&&r[c][m].push([a,l]))});return}const n=As(t)||[t];for(let d=0,c=n.length;d<c;d++){const m=n[d];Object.keys(r).forEach(x=>{var u;(e===I||e===x)&&((u=r[x])[m]||(u[m]=[...he(i[x],m)||he(i[I],m)||[]]),r[x][m].push([a,l-c+d+1]))})}}match(e,t){Ua();const a=E(this,Ie,_s).call(this);return this.match=(i,r)=>{const l=a[i]||a[I],n=l[2][r];if(n)return n;const o=r.match(l[0]);if(!o)return[[],Ds];const d=o.indexOf("",1);return[l[1][d],o]},this.match(e,t)}},te=new WeakMap,se=new WeakMap,Ie=new WeakSet,_s=function(){const e=Object.create(null);return Object.keys(p(this,se)).concat(Object.keys(p(this,te))).forEach(t=>{e[t]||(e[t]=E(this,Ie,Fs).call(this,t))}),y(this,te,y(this,se,void 0)),e},Fs=function(e){const t=[];let a=e===I;return[p(this,te),p(this,se)].forEach(i=>{const r=i[e]?Object.keys(i[e]).map(l=>[l,i[e][l]]):[];r.length!==0?(a||(a=!0),t.push(...r)):e!==I&&t.push(...Object.keys(i[I]).map(l=>[l,i[I][l]]))}),a?Ga(t):null},os),ae,Y,ds,Wa=(ds=class{constructor(e){v(this,"name","SmartRouter");S(this,ae,[]);S(this,Y,[]);y(this,ae,e.routers)}add(e,t,a){if(!p(this,Y))throw new Error(Ts);p(this,Y).push([e,t,a])}match(e,t){if(!p(this,Y))throw new Error("Fatal error");const a=p(this,ae),i=p(this,Y),r=a.length;let l=0,n;for(;l<r;l++){const o=a[l];try{for(let d=0,c=i.length;d<c;d++)o.add(...i[d]);n=o.match(e,t)}catch(d){if(d instanceof Rs)continue;throw d}this.match=o.match.bind(o),y(this,ae,[o]),y(this,Y,void 0);break}if(l===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,n}get activeRouter(){if(p(this,Y)||p(this,ae).length!==1)throw new Error("No active router has been determined yet.");return p(this,ae)[0]}},ae=new WeakMap,Y=new WeakMap,ds),Te=Object.create(null),ie,B,xe,Ee,T,V,de,cs,Os=(cs=class{constructor(e,t,a){S(this,V);S(this,ie);S(this,B);S(this,xe);S(this,Ee,0);S(this,T,Te);if(y(this,B,a||Object.create(null)),y(this,ie,[]),e&&t){const i=Object.create(null);i[e]={handler:t,possibleKeys:[],score:0},y(this,ie,[i])}y(this,xe,[])}insert(e,t,a){y(this,Ee,++_t(this,Ee)._);let i=this;const r=Aa(t),l=[];for(let n=0,o=r.length;n<o;n++){const d=r[n],c=r[n+1],m=Na(d,c),x=Array.isArray(m)?m[0]:d;if(x in p(i,B)){i=p(i,B)[x],m&&l.push(m[1]);continue}p(i,B)[x]=new Os,m&&(p(i,xe).push(m),l.push(m[1])),i=p(i,B)[x]}return p(i,ie).push({[e]:{handler:a,possibleKeys:l.filter((n,o,d)=>d.indexOf(n)===o),score:p(this,Ee)}}),i}search(e,t){var o;const a=[];y(this,T,Te);let r=[this];const l=Ss(t),n=[];for(let d=0,c=l.length;d<c;d++){const m=l[d],x=d===c-1,u=[];for(let f=0,h=r.length;f<h;f++){const g=r[f],b=p(g,B)[m];b&&(y(b,T,p(g,T)),x?(p(b,B)["*"]&&a.push(...E(this,V,de).call(this,p(b,B)["*"],e,p(g,T))),a.push(...E(this,V,de).call(this,b,e,p(g,T)))):u.push(b));for(let k=0,C=p(g,xe).length;k<C;k++){const P=p(g,xe)[k],A=p(g,T)===Te?{}:{...p(g,T)};if(P==="*"){const Q=p(g,B)["*"];Q&&(a.push(...E(this,V,de).call(this,Q,e,p(g,T))),y(Q,T,A),u.push(Q));continue}const[R,fe,ne]=P;if(!m&&!(ne instanceof RegExp))continue;const U=p(g,B)[R],ea=l.slice(d).join("/");if(ne instanceof RegExp){const Q=ne.exec(ea);if(Q){if(A[fe]=Q[0],a.push(...E(this,V,de).call(this,U,e,p(g,T),A)),Object.keys(p(U,B)).length){y(U,T,A);const ot=((o=Q[0].match(/\//))==null?void 0:o.length)??0;(n[ot]||(n[ot]=[])).push(U)}continue}}(ne===!0||ne.test(m))&&(A[fe]=m,x?(a.push(...E(this,V,de).call(this,U,e,A,p(g,T))),p(U,B)["*"]&&a.push(...E(this,V,de).call(this,p(U,B)["*"],e,A,p(g,T)))):(y(U,T,A),u.push(U)))}}r=u.concat(n.shift()??[])}return a.length>1&&a.sort((d,c)=>d.score-c.score),[a.map(({handler:d,params:c})=>[d,c])]}},ie=new WeakMap,B=new WeakMap,xe=new WeakMap,Ee=new WeakMap,T=new WeakMap,V=new WeakSet,de=function(e,t,a,i){const r=[];for(let l=0,n=p(e,ie).length;l<n;l++){const o=p(e,ie)[l],d=o[t]||o[I],c={};if(d!==void 0&&(d.params=Object.create(null),r.push(d),a!==Te||i&&i!==Te))for(let m=0,x=d.possibleKeys.length;m<x;m++){const u=d.possibleKeys[m],f=c[d.score];d.params[u]=i!=null&&i[u]&&!f?i[u]:a[u]??(i==null?void 0:i[u]),c[d.score]=!0}}return r},cs),ue,ms,Ya=(ms=class{constructor(){v(this,"name","TrieRouter");S(this,ue);y(this,ue,new Os)}add(e,t,a){const i=As(t);if(i){for(let r=0,l=i.length;r<l;r++)p(this,ue).insert(e,i[r],a);return}p(this,ue).insert(e,t,a)}match(e,t){return p(this,ue).search(e,t)}},ue=new WeakMap,ms),jt=class extends Bs{constructor(e={}){super(e),this.router=e.router??new Wa({routers:[new za,new Ya]})}},Va=e=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},i=(l=>typeof l=="string"?l==="*"?()=>l:n=>l===n?n:null:typeof l=="function"?l:n=>l.includes(n)?n:null)(a.origin),r=(l=>typeof l=="function"?l:Array.isArray(l)?()=>l:()=>[])(a.allowMethods);return async function(n,o){var m;function d(x,u){n.res.headers.set(x,u)}const c=i(n.req.header("origin")||"",n);if(c&&d("Access-Control-Allow-Origin",c),a.origin!=="*"){const x=n.req.header("Vary");x?d("Vary",x):d("Vary","Origin")}if(a.credentials&&d("Access-Control-Allow-Credentials","true"),(m=a.exposeHeaders)!=null&&m.length&&d("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),n.req.method==="OPTIONS"){a.maxAge!=null&&d("Access-Control-Max-Age",a.maxAge.toString());const x=r(n.req.header("origin")||"",n);x.length&&d("Access-Control-Allow-Methods",x.join(","));let u=a.allowHeaders;if(!(u!=null&&u.length)){const f=n.req.header("Access-Control-Request-Headers");f&&(u=f.split(/\s*,\s*/))}return u!=null&&u.length&&(d("Access-Control-Allow-Headers",u.join(",")),n.res.headers.append("Vary","Access-Control-Request-Headers")),n.res.headers.delete("Content-Length"),n.res.headers.delete("Content-Type"),new Response(null,{headers:n.res.headers,status:204,statusText:"No Content"})}await o()}},Ja=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Wt=(e,t=Xa)=>{const a=/\.([a-zA-Z0-9]+?)$/,i=e.match(a);if(!i)return;let r=t[i[1]];return r&&r.startsWith("text")&&(r+="; charset=utf-8"),r},Ka={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Xa=Ka,Qa=(...e)=>{let t=e.filter(r=>r!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const a=t.split("/"),i=[];for(const r of a)r===".."&&i.length>0&&i.at(-1)!==".."?i.pop():r!=="."&&i.push(r);return i.join("/")||"."},qs={br:".br",zstd:".zst",gzip:".gz"},Za=Object.keys(qs),ei="index.html",ti=e=>{const t=e.root??"./",a=e.path,i=e.join??Qa;return async(r,l)=>{var m,x,u,f;if(r.finalized)return l();let n;if(e.path)n=e.path;else try{if(n=decodeURIComponent(r.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(n))throw new Error}catch{return await((m=e.onNotFound)==null?void 0:m.call(e,r.req.path,r)),l()}let o=i(t,!a&&e.rewriteRequestPath?e.rewriteRequestPath(n):n);e.isDir&&await e.isDir(o)&&(o=i(o,ei));const d=e.getContent;let c=await d(o,r);if(c instanceof Response)return r.newResponse(c.body,c);if(c){const h=e.mimes&&Wt(o,e.mimes)||Wt(o);if(r.header("Content-Type",h||"application/octet-stream"),e.precompressed&&(!h||Ja.test(h))){const g=new Set((x=r.req.header("Accept-Encoding"))==null?void 0:x.split(",").map(b=>b.trim()));for(const b of Za){if(!g.has(b))continue;const k=await d(o+qs[b],r);if(k){c=k,r.header("Content-Encoding",b),r.header("Vary","Accept-Encoding",{append:!0});break}}}return await((u=e.onFound)==null?void 0:u.call(e,o,r)),r.body(c)}await((f=e.onNotFound)==null?void 0:f.call(e,o,r)),await l()}},si=async(e,t)=>{let a;t&&t.manifest?typeof t.manifest=="string"?a=JSON.parse(t.manifest):a=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?a=JSON.parse(__STATIC_CONTENT_MANIFEST):a=__STATIC_CONTENT_MANIFEST;let i;t&&t.namespace?i=t.namespace:i=__STATIC_CONTENT;const r=a[e]||e;if(!r)return null;const l=await i.get(r,{type:"stream"});return l||null},ai=e=>async function(a,i){return ti({...e,getContent:async l=>si(l,{manifest:e.manifest,namespace:e.namespace?e.namespace:a.env?a.env.__STATIC_CONTENT:void 0})})(a,i)},ii=e=>ai(e),Le="_hp",ri={Change:"Input",DoubleClick:"DblClick"},li={svg:"2000/svg",math:"1998/Math/MathML"},_e=[],St=new WeakMap,Ne=void 0,ni=()=>Ne,G=e=>"t"in e,ut={onClick:["click",!1]},Yt=e=>{if(!e.startsWith("on"))return;if(ut[e])return ut[e];const t=e.match(/^on([A-Z][a-zA-Z]+?(?:PointerCapture)?)(Capture)?$/);if(t){const[,a,i]=t;return ut[e]=[(ri[a]||a).toLowerCase(),!!i]}},Vt=(e,t)=>Ne&&e instanceof SVGElement&&/[A-Z]/.test(t)&&(t in e.style||t.match(/^(?:o|pai|str|u|ve)/))?t.replace(/([A-Z])/g,"-$1").toLowerCase():t,oi=(e,t,a)=>{var i;t||(t={});for(let r in t){const l=t[r];if(r!=="children"&&(!a||a[r]!==l)){r=rt(r);const n=Yt(r);if(n){if((a==null?void 0:a[r])!==l&&(a&&e.removeEventListener(n[0],a[r],n[1]),l!=null)){if(typeof l!="function")throw new Error(`Event handler for "${r}" is not a function`);e.addEventListener(n[0],l,n[1])}}else if(r==="dangerouslySetInnerHTML"&&l)e.innerHTML=l.__html;else if(r==="ref"){let o;typeof l=="function"?o=l(e)||(()=>l(null)):l&&"current"in l&&(l.current=e,o=()=>l.current=null),St.set(e,o)}else if(r==="style"){const o=e.style;typeof l=="string"?o.cssText=l:(o.cssText="",l!=null&&ws(l,o.setProperty.bind(o)))}else{if(r==="value"){const d=e.nodeName;if(d==="INPUT"||d==="TEXTAREA"||d==="SELECT"){if(e.value=l==null||l===!1?null:l,d==="TEXTAREA"){e.textContent=l;continue}else if(d==="SELECT"){e.selectedIndex===-1&&(e.selectedIndex=0);continue}}}else(r==="checked"&&e.nodeName==="INPUT"||r==="selected"&&e.nodeName==="OPTION")&&(e[r]=l);const o=Vt(e,r);l==null||l===!1?e.removeAttribute(o):l===!0?e.setAttribute(o,""):typeof l=="string"||typeof l=="number"?e.setAttribute(o,l):e.setAttribute(o,l.toString())}}}if(a)for(let r in a){const l=a[r];if(r!=="children"&&!(r in t)){r=rt(r);const n=Yt(r);n?e.removeEventListener(n[0],l,n[1]):r==="ref"?(i=St.get(e))==null||i():e.removeAttribute(Vt(e,r))}}},di=(e,t)=>{t[N][0]=0,_e.push([e,t]);const a=t.tag[At]||t.tag,i=a.defaultProps?{...a.defaultProps,...t.props}:t.props;try{return[a.call(null,i)]}finally{_e.pop()}},$s=(e,t,a,i,r)=>{var l,n;(l=e.vR)!=null&&l.length&&(i.push(...e.vR),delete e.vR),typeof e.tag=="function"&&((n=e[N][1][zs])==null||n.forEach(o=>r.push(o))),e.vC.forEach(o=>{var d;if(G(o))a.push(o);else if(typeof o.tag=="function"||o.tag===""){o.c=t;const c=a.length;if($s(o,t,a,i,r),o.s){for(let m=c;m<a.length;m++)a[m].s=!0;o.s=!1}}else a.push(o),(d=o.vR)!=null&&d.length&&(i.push(...o.vR),delete o.vR)})},ci=e=>{for(;;e=e.tag===Le||!e.vC||!e.pP?e.nN:e.vC[0]){if(!e)return null;if(e.tag!==Le&&e.e)return e.e}},Hs=e=>{var t,a,i,r,l,n;G(e)||((a=(t=e[N])==null?void 0:t[1][zs])==null||a.forEach(o=>{var d;return(d=o[2])==null?void 0:d.call(o)}),(i=St.get(e.e))==null||i(),e.p===2&&((r=e.vC)==null||r.forEach(o=>o.p=2)),(l=e.vC)==null||l.forEach(Hs)),e.p||((n=e.e)==null||n.remove(),delete e.e),typeof e.tag=="function"&&(Re.delete(e),st.delete(e),delete e[N][3],e.a=!0)},Us=(e,t,a)=>{e.c=t,Gs(e,t,a)},Jt=(e,t)=>{if(t){for(let a=0,i=e.length;a<i;a++)if(e[a]===t)return a}},Kt=Symbol(),Gs=(e,t,a)=>{var c;const i=[],r=[],l=[];$s(e,t,i,r,l),r.forEach(Hs);const n=a?void 0:t.childNodes;let o,d=null;if(a)o=-1;else if(!n.length)o=0;else{const m=Jt(n,ci(e.nN));m!==void 0?(d=n[m],o=m):o=Jt(n,(c=i.find(x=>x.tag!==Le&&x.e))==null?void 0:c.e)??-1,o===-1&&(a=!0)}for(let m=0,x=i.length;m<x;m++,o++){const u=i[m];let f;if(u.s&&u.e)f=u.e,u.s=!1;else{const h=a||!u.e;G(u)?(u.e&&u.d&&(u.e.textContent=u.t),u.d=!1,f=u.e||(u.e=document.createTextNode(u.t))):(f=u.e||(u.e=u.n?document.createElementNS(u.n,u.tag):document.createElement(u.tag)),oi(f,u.props,u.pP),Gs(u,f,h))}u.tag===Le?o--:a?f.parentNode||t.appendChild(f):n[o]!==f&&n[o-1]!==f&&(n[o+1]===f?t.appendChild(n[o]):t.insertBefore(f,d||n[o]||null))}if(e.pP&&delete e.pP,l.length){const m=[],x=[];l.forEach(([,u,,f,h])=>{u&&m.push(u),f&&x.push(f),h==null||h()}),m.forEach(u=>u()),x.length&&requestAnimationFrame(()=>{x.forEach(u=>u())})}},mi=(e,t)=>!!(e&&e.length===t.length&&e.every((a,i)=>a[1]===t[i][1])),st=new WeakMap,Ct=(e,t,a)=>{var l,n,o,d,c,m;const i=!a&&t.pC;a&&(t.pC||(t.pC=t.vC));let r;try{a||(a=typeof t.tag=="function"?di(e,t):Ge(t.props.children)),((l=a[0])==null?void 0:l.tag)===""&&a[0][bt]&&(r=a[0][bt],e[5].push([e,r,t]));const x=i?[...t.pC]:t.vC?[...t.vC]:void 0,u=[];let f;for(let h=0;h<a.length;h++){Array.isArray(a[h])&&a.splice(h,1,...a[h].flat());let g=pi(a[h]);if(g){typeof g.tag=="function"&&!g.tag[fs]&&(Pe.length>0&&(g[N][2]=Pe.map(k=>[k,k.values.at(-1)])),(n=e[5])!=null&&n.length&&(g[N][3]=e[5].at(-1)));let b;if(x&&x.length){const k=x.findIndex(G(g)?C=>G(C):g.key!==void 0?C=>C.key===g.key&&C.tag===g.tag:C=>C.tag===g.tag);k!==-1&&(b=x[k],x.splice(k,1))}if(b)if(G(g))b.t!==g.t&&(b.t=g.t,b.d=!0),g=b;else{const k=b.pP=b.props;if(b.props=g.props,b.f||(b.f=g.f||t.f),typeof g.tag=="function"){const C=b[N][2];b[N][2]=g[N][2]||[],b[N][3]=g[N][3],!b.f&&((b.o||b)===g.o||(d=(o=b.tag)[ra])!=null&&d.call(o,k,b.props))&&mi(C,b[N][2])&&(b.s=!0)}g=b}else if(!G(g)&&Ne){const k=je(Ne);k&&(g.n=k)}if(!G(g)&&!g.s&&(Ct(e,g),delete g.f),u.push(g),f&&!f.s&&!g.s)for(let k=f;k&&!G(k);k=(c=k.vC)==null?void 0:c.at(-1))k.nN=g;f=g}}t.vR=i?[...t.vC,...x||[]]:x||[],t.vC=u,i&&delete t.pC}catch(x){if(t.f=!0,x===Kt){if(r)return;throw x}const[u,f,h]=((m=t[N])==null?void 0:m[3])||[];if(f){const g=()=>at([0,!1,e[2]],h),b=st.get(h)||[];b.push(g),st.set(h,b);const k=f(x,()=>{const C=st.get(h);if(C){const P=C.indexOf(g);if(P!==-1)return C.splice(P,1),g()}});if(k){if(e[0]===1)e[1]=!0;else if(Ct(e,h,[k]),(f.length===1||e!==u)&&h.c){Us(h,h.c,!1);return}throw Kt}}throw x}finally{r&&e[5].pop()}},pi=e=>{if(!(e==null||typeof e=="boolean")){if(typeof e=="string"||typeof e=="number")return{t:e.toString(),d:!0};if("vR"in e&&(e={tag:e.tag,props:e.props,key:e.key,f:e.f,type:e.tag,ref:e.props.ref,o:e.o||e}),typeof e.tag=="function")e[N]=[0,[]];else{const t=li[e.tag];t&&(Ne||(Ne=vs("")),e.props.children=[{tag:Ne,props:{value:e.n=`http://www.w3.org/${t}`,children:e.props.children}}])}return e}},Xt=(e,t)=>{var a,i;(a=t[N][2])==null||a.forEach(([r,l])=>{r.values.push(l)});try{Ct(e,t,void 0)}catch{return}if(t.a){delete t.a;return}(i=t[N][2])==null||i.forEach(([r])=>{r.values.pop()}),(e[0]!==1||!e[1])&&Us(t,t.c,!1)},Re=new WeakMap,Qt=[],at=async(e,t)=>{e[5]||(e[5]=[]);const a=Re.get(t);a&&a[0](void 0);let i;const r=new Promise(l=>i=l);if(Re.set(t,[i,()=>{e[2]?e[2](e,t,l=>{Xt(l,t)}).then(()=>i(t)):(Xt(e,t),i(t))}]),Qt.length)Qt.at(-1).add(t);else{await Promise.resolve();const l=Re.get(t);l&&(Re.delete(t),l[1]())}return r},xi=(e,t,a)=>({tag:Le,props:{children:e},key:a,e:t,p:1}),gt=0,zs=1,ft=2,ht=3,vt=new WeakMap,Ws=(e,t)=>!e||!t||e.length!==t.length||t.some((a,i)=>a!==e[i]),ui=void 0,Zt=[],gi=e=>{var n;const t=()=>typeof e=="function"?e():e,a=_e.at(-1);if(!a)return[t(),()=>{}];const[,i]=a,r=(n=i[N][1])[gt]||(n[gt]=[]),l=i[N][0]++;return r[l]||(r[l]=[t(),o=>{const d=ui,c=r[l];if(typeof o=="function"&&(o=o(c[0])),!Object.is(o,c[0]))if(c[0]=o,Zt.length){const[m,x]=Zt.at(-1);Promise.all([m===3?i:at([m,!1,d],i),x]).then(([u])=>{if(!u||!(m===2||m===3))return;const f=u.vC;requestAnimationFrame(()=>{setTimeout(()=>{f===u.vC&&at([m===3?1:0,!1,d],u)})})})}else at([0,!1,d],i)}])},Tt=(e,t)=>{var o;const a=_e.at(-1);if(!a)return e;const[,i]=a,r=(o=i[N][1])[ft]||(o[ft]=[]),l=i[N][0]++,n=r[l];return Ws(n==null?void 0:n[1],t)?r[l]=[e,t]:e=r[l][0],e},fi=e=>{const t=vt.get(e);if(t){if(t.length===2)throw t[1];return t[0]}throw e.then(a=>vt.set(e,[a]),a=>vt.set(e,[void 0,a])),e},hi=(e,t)=>{var o;const a=_e.at(-1);if(!a)return e();const[,i]=a,r=(o=i[N][1])[ht]||(o[ht]=[]),l=i[N][0]++,n=r[l];return Ws(n==null?void 0:n[1],t)&&(r[l]=[e(),t]),r[l][0]},vi=vs({pending:!1,data:null,method:null,action:null}),es=new Set,bi=e=>{es.add(e),e.finally(()=>es.delete(e))},Rt=(e,t)=>hi(()=>a=>{let i;e&&(typeof e=="function"?i=e(a)||(()=>{e(null)}):e&&"current"in e&&(e.current=a,i=()=>{e.current=null}));const r=t(a);return()=>{r==null||r(),i==null||i()}},[e]),ve=Object.create(null),Je=Object.create(null),Ye=(e,t,a,i,r)=>{if(t!=null&&t.itemProp)return{tag:e,props:t,type:e,ref:t.ref};const l=document.head;let{onLoad:n,onError:o,precedence:d,blocking:c,...m}=t,x=null,u=!1;const f=Ke[e];let h;if(f.length>0){const C=l.querySelectorAll(e);e:for(const P of C)for(const A of Ke[e])if(P.getAttribute(A)===t[A]){x=P;break e}if(!x){const P=f.reduce((A,R)=>t[R]===void 0?A:`${A}-${R}-${t[R]}`,e);u=!Je[P],x=Je[P]||(Je[P]=(()=>{const A=document.createElement(e);for(const R of f)t[R]!==void 0&&A.setAttribute(R,t[R]),t.rel&&A.setAttribute("rel",t.rel);return A})())}}else h=l.querySelectorAll(e);d=i?d??"":void 0,i&&(m[Xe]=d);const g=Tt(C=>{if(f.length>0){let P=!1;for(const A of l.querySelectorAll(e)){if(P&&A.getAttribute(Xe)!==d){l.insertBefore(C,A);return}A.getAttribute(Xe)===d&&(P=!0)}l.appendChild(C)}else if(h){let P=!1;for(const A of h)if(A===C){P=!0;break}P||l.insertBefore(C,l.contains(h[0])?h[0]:l.querySelector(e)),h=void 0}},[d]),b=Rt(t.ref,C=>{var R;const P=f[0];if(a===2&&(C.innerHTML=""),(u||h)&&g(C),!o&&!n)return;let A=ve[R=C.getAttribute(P)]||(ve[R]=new Promise((fe,ne)=>{C.addEventListener("load",fe),C.addEventListener("error",ne)}));n&&(A=A.then(n)),o&&(A=A.catch(o)),A.catch(()=>{})});if(r&&c==="render"){const C=Ke[e][0];if(t[C]){const P=t[C],A=ve[P]||(ve[P]=new Promise((R,fe)=>{g(x),x.addEventListener("load",R),x.addEventListener("error",fe)}));fi(A)}}const k={tag:e,type:e,props:{...m,ref:b},ref:b};return k.p=a,x&&(k.e=x),xi(k,l)},yi=e=>{const t=ni(),a=t&&je(t);return a!=null&&a.endsWith("svg")?{tag:"title",props:e,type:"title",ref:e.ref}:Ye("title",e,void 0,!1,!1)},wi=e=>!e||["src","async"].some(t=>!e[t])?{tag:"script",props:e,type:"script",ref:e.ref}:Ye("script",e,1,!1,!0),ki=e=>!e||!["href","precedence"].every(t=>t in e)?{tag:"style",props:e,type:"style",ref:e.ref}:(e["data-href"]=e.href,delete e.href,Ye("style",e,2,!0,!0)),Si=e=>!e||["onLoad","onError"].some(t=>t in e)||e.rel==="stylesheet"&&(!("precedence"in e)||"disabled"in e)?{tag:"link",props:e,type:"link",ref:e.ref}:Ye("link",e,1,"precedence"in e,!0),Ci=e=>Ye("meta",e,void 0,!1,!1),Ys=Symbol(),Ai=e=>{const{action:t,...a}=e;typeof t!="function"&&(a.action=t);const[i,r]=gi([null,!1]),l=Tt(async c=>{const m=c.isTrusted?t:c.detail[Ys];if(typeof m!="function")return;c.preventDefault();const x=new FormData(c.target);r([x,!0]);const u=m(x);u instanceof Promise&&(bi(u),await u),r([null,!0])},[]),n=Rt(e.ref,c=>(c.addEventListener("submit",l),()=>{c.removeEventListener("submit",l)})),[o,d]=i;return i[1]=!1,{tag:vi,props:{value:{pending:o!==null,data:o,method:o?"post":null,action:o?t:null},children:{tag:"form",props:{...a,ref:n},type:"form",ref:n}},f:d}},Vs=(e,{formAction:t,...a})=>{if(typeof t=="function"){const i=Tt(r=>{r.preventDefault(),r.currentTarget.form.dispatchEvent(new CustomEvent("submit",{detail:{[Ys]:t}}))},[]);a.ref=Rt(a.ref,r=>(r.addEventListener("click",i),()=>{r.removeEventListener("click",i)}))}return{tag:e,props:a,type:e,ref:a.ref}},Ei=e=>Vs("input",e),Pi=e=>Vs("button",e);Object.assign(yt,{title:yi,script:wi,style:ki,link:Si,meta:Ci,form:Ai,input:Ei,button:Pi});Et(null);new TextEncoder;var Ni=Et(null),Ii=(e,t,a,i)=>(r,l)=>{const n="<!DOCTYPE html>",o=a?$t(c=>a(c,e),{Layout:t,...l},r):r,d=ia`${L(n)}${$t(Ni.Provider,{value:e},o)}`;return e.html(d)},ji=(e,t)=>function(i,r){const l=i.getLayout()??va;return e&&i.setLayout(n=>e({...n,Layout:l},i)),i.setRenderer(Ii(i,l,e)),r()};const Ti=ji(({children:e})=>s("html",{lang:"en",children:[s("head",{children:[s("meta",{charset:"UTF-8"}),s("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),s("title",{children:"Better Together - Relationship Intelligence Platform"}),s("meta",{name:"description",content:"The world's first AI-powered relationship assistant that talks with you, schedules meaningful experiences for your partner, and intelligently suggests personalized activities to deepen your bond."}),s("meta",{name:"keywords",content:"AI relationship coach, relationship assistant, smart scheduling, couple activities, love languages, relationship psychology, AI dating, partner planning, relationship goals, intelligent suggestions"}),s("meta",{property:"og:title",content:"Better Together - Relationship Intelligence Platform"}),s("meta",{property:"og:description",content:"The world's first AI-powered relationship assistant that talks with you, schedules experiences for your partner, and suggests personalized activities to deepen your bond."}),s("meta",{property:"og:type",content:"website"}),s("meta",{name:"twitter:card",content:"summary_large_image"}),s("link",{rel:"icon",href:"data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💕</text></svg>"}),s("link",{href:"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",rel:"stylesheet"}),s("link",{href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",rel:"stylesheet"}),s("link",{href:"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",rel:"stylesheet"}),s("link",{href:"/static/styles.css",rel:"stylesheet"}),s("style",{children:`
            body { 
              font-family: 'Inter', sans-serif; 
            }
            
            /* Enhanced Animations */
            @keyframes fade-in-up {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes fade-in-left {
              from {
                opacity: 0;
                transform: translateX(-30px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            @keyframes fade-in-right {
              from {
                opacity: 0;
                transform: translateX(30px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            @keyframes slide-in-bottom {
              from {
                opacity: 0;
                transform: translateY(50px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes scale-in {
              from {
                opacity: 0;
                transform: scale(0.9);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-15px) rotate(5deg); }
            }
            
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
              50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.8); }
            }
            
            @keyframes gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            
            /* Animation Classes */
            .animate-fade-in-up {
              animation: fade-in-up 0.8s ease-out forwards;
            }
            
            .animate-fade-in-left {
              animation: fade-in-left 0.8s ease-out forwards;
            }
            
            .animate-fade-in-right {
              animation: fade-in-right 0.8s ease-out forwards;
            }
            
            .animate-slide-in-bottom {
              animation: slide-in-bottom 0.8s ease-out forwards;
            }
            
            .animate-scale-in {
              animation: scale-in 0.6s ease-out forwards;
            }
            
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
            
            .animate-glow {
              animation: glow 2s ease-in-out infinite alternate;
            }
            
            .animate-gradient-shift {
              background-size: 200% 200%;
              animation: gradient-shift 3s ease infinite;
            }
            
            /* Hover Effects */
            .hover-lift {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .hover-lift:hover {
              transform: translateY(-5px) scale(1.02);
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            
            .hover-glow {
              transition: all 0.3s ease;
            }
            
            .hover-glow:hover {
              box-shadow: 0 0 30px rgba(236, 72, 153, 0.5);
              transform: scale(1.05);
            }
            
            /* Loading States */
            .loading-spinner {
              animation: spin 1s linear infinite;
            }
            
            /* Smooth Scrolling */
            html {
              scroll-behavior: smooth;
            }
            
            /* Custom Scrollbar */
            ::-webkit-scrollbar {
              width: 8px;
            }
            
            ::-webkit-scrollbar-track {
              background: #f1f1f1;
            }
            
            ::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #ec4899, #8b5cf6);
              border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, #db2777, #7c3aed);
            }
          `})]}),s("body",{class:"antialiased",children:e})]})),Ri=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics Dashboard | Better Together Business Intelligence</title>
    <meta name="description" content="Comprehensive analytics dashboard for Better Together relationship platform. Track user engagement, partner performance, and business metrics in real-time.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/date-fns@2.29.3/index.min.js"><\/script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        pink: {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d',
                            800: '#9d174d'
                        },
                        purple: {
                            500: '#8b5cf6',
                            600: '#7c3aed',
                            700: '#6d28d9'
                        },
                        slate: {
                            850: '#1a202c',
                            900: '#0f1419'
                        }
                    },
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif']
                    },
                    animation: {
                        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
                        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
                        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite'
                    },
                    keyframes: {
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(30px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' }
                        },
                        slideInRight: {
                            '0%': { opacity: '0', transform: 'translateX(30px)' },
                            '100%': { opacity: '1', transform: 'translateX(0)' }
                        },
                        pulseGlow: {
                            '0%': { boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)' },
                            '100%': { boxShadow: '0 0 30px rgba(236, 72, 153, 0.8)' }
                        },
                        bounceSubtle: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-5px)' }
                        }
                    }
                }
            }
        }
    <\/script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        
        /* iOS 26 Liquid Glass Effects for Dashboard */
        .liquid-glass {
            backdrop-filter: blur(40px) saturate(180%);
            background: linear-gradient(145deg, 
                rgba(255, 255, 255, 0.15) 0%,
                rgba(255, 255, 255, 0.05) 50%,
                rgba(255, 255, 255, 0.1) 100%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 
                0 25px 45px -12px rgba(0, 0, 0, 0.1),
                0 0 0 1px rgba(255, 255, 255, 0.05) inset,
                0 1px 3px rgba(255, 255, 255, 0.2) inset;
        }
        
        .liquid-glass-dark {
            backdrop-filter: blur(40px) saturate(180%);
            background: linear-gradient(145deg, 
                rgba(15, 20, 25, 0.95) 0%,
                rgba(26, 32, 44, 0.90) 50%,
                rgba(15, 20, 25, 0.98) 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 
                0 25px 45px -12px rgba(0, 0, 0, 0.3),
                0 0 0 1px rgba(255, 255, 255, 0.05) inset,
                0 1px 3px rgba(255, 255, 255, 0.1) inset;
        }
        
        .liquid-glass-accent {
            backdrop-filter: blur(30px) saturate(200%);
            background: linear-gradient(145deg, 
                rgba(236, 72, 153, 0.12) 0%,
                rgba(139, 92, 246, 0.08) 50%,
                rgba(236, 72, 153, 0.15) 100%);
            border: 1px solid rgba(236, 72, 153, 0.2);
            box-shadow: 
                0 20px 40px -12px rgba(236, 72, 153, 0.25),
                0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                0 1px 3px rgba(255, 255, 255, 0.3) inset;
        }
        
        /* Dashboard Specific Styles */
        .liquid-hover {
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .liquid-hover:hover {
            transform: translateY(-4px) scale(1.01);
            box-shadow: 
                0 35px 60px -12px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                0 2px 8px rgba(255, 255, 255, 0.4) inset;
        }
        
        .liquid-press {
            transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .liquid-press:active {
            transform: scale(0.98);
            box-shadow: 
                0 10px 25px -8px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        }
        
        .morphing-gradient {
            background: linear-gradient(45deg, 
                rgba(236, 72, 153, 0.8), 
                rgba(139, 92, 246, 0.8),
                rgba(59, 130, 246, 0.8),
                rgba(16, 185, 129, 0.8),
                rgba(236, 72, 153, 0.8));
            background-size: 300% 300%;
            animation: morphGradient 8s ease infinite;
        }
        @keyframes morphGradient {
            0% { background-position: 0% 50%; }
            25% { background-position: 100% 50%; }
            50% { background-position: 50% 100%; }
            75% { background-position: 0% 100%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Dark Mode Gradient Background */
        .dashboard-bg {
            background: linear-gradient(135deg, #0f1419 0%, #1a202c 25%, #2d3748 50%, #1a202c 75%, #0f1419 100%);
            min-height: 100vh;
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(236, 72, 153, 0.5);
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(236, 72, 153, 0.8);
        }
        
        /* Chart Container Styles */
        .chart-container {
            position: relative;
            height: 300px;
            width: 100%;
        }
        
        /* Metric Card Animation */
        .metric-card {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .metric-card:hover {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.05));
            border: 1px solid rgba(236, 72, 153, 0.3);
            transform: translateY(-2px);
        }
        
        /* Feature Status Indicators */
        .status-active { background: linear-gradient(45deg, #10b981, #34d399); }
        .status-beta { background: linear-gradient(45deg, #f59e0b, #fbbf24); }
        .status-planned { background: linear-gradient(45deg, #6b7280, #9ca3af); }
        .status-inactive { background: linear-gradient(45deg, #ef4444, #f87171); }
    </style>
</head>
<body class="dashboard-bg text-white">
    <!-- Navigation - Liquid Glass -->
    <nav class="liquid-glass-dark sticky top-0 z-50 border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="/" class="flex items-center liquid-hover">
                        <span class="text-2xl">💕</span>
                        <span class="ml-2 text-xl font-bold text-white">Better Together</span>
                        <span class="ml-3 text-sm morphing-gradient text-white px-3 py-1 rounded-full font-semibold shadow-lg">Analytics</span>
                    </a>
                </div>
                <div class="hidden md:flex items-center space-x-6">
                    <a href="/dashboard.html" class="text-pink-400 hover:text-pink-300 transition-colors font-medium border-b-2 border-pink-400">Dashboard</a>
                    <a href="/become-sponsor.html" class="text-gray-300 hover:text-white transition-colors font-medium">Partners</a>
                    <a href="/member-rewards.html" class="text-gray-300 hover:text-white transition-colors font-medium">Members</a>
                    <a href="/" class="text-gray-300 hover:text-white transition-colors font-medium">App Home</a>
                    <div class="flex items-center space-x-3">
                        <div class="liquid-glass px-3 py-2 rounded-lg">
                            <span class="text-sm text-gray-300" id="userInfo">Admin User</span>
                        </div>
                        <button id="logoutBtn" class="liquid-glass text-gray-300 px-4 py-2 rounded-lg font-semibold liquid-hover liquid-press">
                            <i class="fas fa-sign-out-alt mr-2"></i>Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Dashboard Header -->
    <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                <div>
                    <h1 class="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
                    <p class="text-xl text-gray-300">Real-time insights into Better Together platform performance</p>
                    <div class="flex items-center mt-4 space-x-4">
                        <div class="flex items-center liquid-glass px-4 py-2 rounded-lg">
                            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                            <span class="text-sm text-gray-200">Live Data</span>
                        </div>
                        <div class="liquid-glass px-4 py-2 rounded-lg">
                            <span class="text-sm text-gray-200">Last updated: <span id="lastUpdated">now</span></span>
                        </div>
                    </div>
                </div>
                <div class="mt-6 lg:mt-0 flex space-x-4">
                    <button class="liquid-glass-accent text-white px-6 py-3 rounded-lg font-semibold liquid-hover liquid-press">
                        <i class="fas fa-download mr-2"></i>Export Report
                    </button>
                    <button class="liquid-glass text-white px-6 py-3 rounded-lg font-semibold liquid-hover liquid-press">
                        <i class="fas fa-cog mr-2"></i>Settings
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Key Metrics Overview -->
    <section class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <!-- Total Users -->
                <div class="metric-card rounded-2xl p-6 liquid-hover">
                    <div class="flex items-center justify-between mb-4">
                        <div class="morphing-gradient w-12 h-12 rounded-full flex items-center justify-center">
                            <i class="fas fa-users text-white text-xl"></i>
                        </div>
                        <span class="text-green-400 text-sm font-semibold">+12.5%</span>
                    </div>
                    <div class="text-3xl font-bold text-white mb-1" id="totalUsers">50,247</div>
                    <div class="text-gray-400 text-sm">Total Active Users</div>
                    <div class="text-xs text-gray-500 mt-2">vs last month</div>
                </div>

                <!-- Engaged Couples -->
                <div class="metric-card rounded-2xl p-6 liquid-hover">
                    <div class="flex items-center justify-between mb-4">
                        <div class="morphing-gradient w-12 h-12 rounded-full flex items-center justify-center">
                            <i class="fas fa-heart text-white text-xl"></i>
                        </div>
                        <span class="text-green-400 text-sm font-semibold">+8.7%</span>
                    </div>
                    <div class="text-3xl font-bold text-white mb-1" id="engagedCouples">25,124</div>
                    <div class="text-gray-400 text-sm">Engaged Couples</div>
                    <div class="text-xs text-gray-500 mt-2">actively using app</div>
                </div>

                <!-- Partner Revenue -->
                <div class="metric-card rounded-2xl p-6 liquid-hover">
                    <div class="flex items-center justify-between mb-4">
                        <div class="morphing-gradient w-12 h-12 rounded-full flex items-center justify-center">
                            <i class="fas fa-dollar-sign text-white text-xl"></i>
                        </div>
                        <span class="text-green-400 text-sm font-semibold">+34.2%</span>
                    </div>
                    <div class="text-3xl font-bold text-white mb-1" id="partnerRevenue">$847K</div>
                    <div class="text-gray-400 text-sm">Partner Revenue</div>
                    <div class="text-xs text-gray-500 mt-2">this month</div>
                </div>

                <!-- App Sessions -->
                <div class="metric-card rounded-2xl p-6 liquid-hover">
                    <div class="flex items-center justify-between mb-4">
                        <div class="morphing-gradient w-12 h-12 rounded-full flex items-center justify-center">
                            <i class="fas fa-mobile-alt text-white text-xl"></i>
                        </div>
                        <span class="text-green-400 text-sm font-semibold">+19.3%</span>
                    </div>
                    <div class="text-3xl font-bold text-white mb-1" id="appSessions">1.2M</div>
                    <div class="text-gray-400 text-sm">Monthly Sessions</div>
                    <div class="text-xs text-gray-500 mt-2">avg 4.8 per user</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Charts Section -->
    <section class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <!-- User Growth Chart -->
                <div class="liquid-glass-dark rounded-2xl p-6 liquid-hover">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-white">User Growth</h3>
                        <div class="flex space-x-2">
                            <button class="text-pink-400 bg-pink-400/20 px-3 py-1 rounded-lg text-sm font-semibold">7D</button>
                            <button class="text-gray-400 hover:text-white px-3 py-1 rounded-lg text-sm">30D</button>
                            <button class="text-gray-400 hover:text-white px-3 py-1 rounded-lg text-sm">90D</button>
                        </div>
                    </div>
                    <div class="chart-container">
                        <canvas id="userGrowthChart"></canvas>
                    </div>
                </div>

                <!-- Revenue Analytics -->
                <div class="liquid-glass-dark rounded-2xl p-6 liquid-hover">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-white">Revenue Analytics</h3>
                        <div class="flex items-center space-x-2">
                            <div class="w-3 h-3 bg-pink-500 rounded-full"></div>
                            <span class="text-sm text-gray-400">Partner Revenue</span>
                        </div>
                    </div>
                    <div class="chart-container">
                        <canvas id="revenueChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Engagement Metrics -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <!-- Feature Usage -->
                <div class="liquid-glass-dark rounded-2xl p-6 liquid-hover">
                    <h3 class="text-xl font-bold text-white mb-6">Feature Usage</h3>
                    <div class="chart-container">
                        <canvas id="featureUsageChart"></canvas>
                    </div>
                </div>

                <!-- Couple Activity -->
                <div class="liquid-glass-dark rounded-2xl p-6 liquid-hover">
                    <h3 class="text-xl font-bold text-white mb-6">Daily Activity</h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <span class="text-gray-300">Morning (6-12pm)</span>
                            <div class="flex items-center">
                                <div class="w-24 bg-gray-700 rounded-full h-2 mr-3">
                                    <div class="bg-pink-500 h-2 rounded-full" style="width: 65%"></div>
                                </div>
                                <span class="text-white font-semibold">65%</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-300">Afternoon (12-6pm)</span>
                            <div class="flex items-center">
                                <div class="w-24 bg-gray-700 rounded-full h-2 mr-3">
                                    <div class="bg-purple-500 h-2 rounded-full" style="width: 45%"></div>
                                </div>
                                <span class="text-white font-semibold">45%</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-300">Evening (6pm-12am)</span>
                            <div class="flex items-center">
                                <div class="w-24 bg-gray-700 rounded-full h-2 mr-3">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 85%"></div>
                                </div>
                                <span class="text-white font-semibold">85%</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-300">Late Night (12-6am)</span>
                            <div class="flex items-center">
                                <div class="w-24 bg-gray-700 rounded-full h-2 mr-3">
                                    <div class="bg-green-500 h-2 rounded-full" style="width: 25%"></div>
                                </div>
                                <span class="text-white font-semibold">25%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Top Partner Categories -->
                <div class="liquid-glass-dark rounded-2xl p-6 liquid-hover">
                    <h3 class="text-xl font-bold text-white mb-6">Top Partners</h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                                    <i class="fas fa-utensils text-white text-sm"></i>
                                </div>
                                <span class="text-gray-300">Dining</span>
                            </div>
                            <span class="text-white font-semibold">342 partners</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                                    <i class="fas fa-plane text-white text-sm"></i>
                                </div>
                                <span class="text-gray-300">Travel</span>
                            </div>
                            <span class="text-white font-semibold">187 partners</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                                    <i class="fas fa-gift text-white text-sm"></i>
                                </div>
                                <span class="text-gray-300">Gifts</span>
                            </div>
                            <span class="text-white font-semibold">156 partners</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                                    <i class="fas fa-spa text-white text-sm"></i>
                                </div>
                                <span class="text-gray-300">Wellness</span>
                            </div>
                            <span class="text-white font-semibold">124 partners</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                                    <i class="fas fa-theater-masks text-white text-sm"></i>
                                </div>
                                <span class="text-gray-300">Entertainment</span>
                            </div>
                            <span class="text-white font-semibold">98 partners</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Feature Status Dashboard -->
    <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-white mb-8">Platform Features Status</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Core Features -->
                <div class="liquid-glass-dark rounded-2xl p-6">
                    <h3 class="text-xl font-bold text-white mb-6 flex items-center">
                        <i class="fas fa-heart text-pink-500 mr-3"></i>
                        Core Relationship Features
                    </h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div class="flex items-center">
                                <div class="w-3 h-3 status-active rounded-full mr-4"></div>
                                <div>
                                    <div class="text-white font-semibold">Relationship Challenges</div>
                                    <div class="text-gray-400 text-sm">Daily activities for couples</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-green-400 font-semibold">87% engagement</div>
                                <div class="text-gray-400 text-sm">12.5K daily active</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div class="flex items-center">
                                <div class="w-3 h-3 status-active rounded-full mr-4"></div>
                                <div>
                                    <div class="text-white font-semibold">Date Night Planner</div>
                                    <div class="text-gray-400 text-sm">Personalized date suggestions</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-green-400 font-semibold">73% usage</div>
                                <div class="text-gray-400 text-sm">8.2K weekly plans</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div class="flex items-center">
                                <div class="w-3 h-3 status-active rounded-full mr-4"></div>
                                <div>
                                    <div class="text-white font-semibold">Communication Tools</div>
                                    <div class="text-gray-400 text-sm">Chat, voice notes, shared calendars</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-green-400 font-semibold">91% active</div>
                                <div class="text-gray-400 text-sm">45K messages/day</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div class="flex items-center">
                                <div class="w-3 h-3 status-active rounded-full mr-4"></div>
                                <div>
                                    <div class="text-white font-semibold">Progress Tracking</div>
                                    <div class="text-gray-400 text-sm">Relationship milestones & goals</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-green-400 font-semibold">65% completion</div>
                                <div class="text-gray-400 text-sm">3.4K goals set</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div class="flex items-center">
                                <div class="w-3 h-3 status-beta rounded-full mr-4"></div>
                                <div>
                                    <div class="text-white font-semibold">AI Relationship Coach</div>
                                    <div class="text-gray-400 text-sm">Personalized advice & insights</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-yellow-400 font-semibold">Beta Testing</div>
                                <div class="text-gray-400 text-sm">500 beta users</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Business Features -->
                <div class="liquid-glass-dark rounded-2xl p-6">
                    <h3 class="text-xl font-bold text-white mb-6 flex items-center">
                        <i class="fas fa-business-time text-blue-500 mr-3"></i>
                        Business & Partner Features
                    </h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div class="flex items-center">
                                <div class="w-3 h-3 status-active rounded-full mr-4"></div>
                                <div>
                                    <div class="text-white font-semibold">Member Rewards Program</div>
                                    <div class="text-gray-400 text-sm">Credits, tiers, exclusive discounts</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-green-400 font-semibold">89% adoption</div>
                                <div class="text-gray-400 text-sm">$2.4K avg spend</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div class="flex items-center">
                                <div class="w-3 h-3 status-active rounded-full mr-4"></div>
                                <div>
                                    <div class="text-white font-semibold">Partner Integration</div>
                                    <div class="text-gray-400 text-sm">API, booking system, analytics</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-green-400 font-semibold">500+ partners</div>
                                <div class="text-gray-400 text-sm">847K revenue</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div class="flex items-center">
                                <div class="w-3 h-3 status-active rounded-full mr-4"></div>
                                <div>
                                    <div class="text-white font-semibold">Local Discovery</div>
                                    <div class="text-gray-400 text-sm">Geo-based partner recommendations</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-green-400 font-semibold">76% usage</div>
                                <div class="text-gray-400 text-sm">15K searches/day</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div class="flex items-center">
                                <div class="w-3 h-3 status-beta rounded-full mr-4"></div>
                                <div>
                                    <div class="text-white font-semibold">Smart Recommendations</div>
                                    <div class="text-gray-400 text-sm">ML-powered partner matching</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-yellow-400 font-semibold">Beta Phase</div>
                                <div class="text-gray-400 text-sm">85% accuracy</div>
                            </div>
                        </div>

                        <div class="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div class="flex items-center">
                                <div class="w-3 h-3 status-planned rounded-full mr-4"></div>
                                <div>
                                    <div class="text-white font-semibold">Enterprise Dashboard</div>
                                    <div class="text-gray-400 text-sm">Partner analytics & reporting</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-gray-400 font-semibold">Q2 2025</div>
                                <div class="text-gray-400 text-sm">Development</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Real-time Activity Feed -->
    <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="liquid-glass-dark rounded-2xl p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-bold text-white flex items-center">
                        <i class="fas fa-pulse text-green-400 mr-3"></i>
                        Live Activity Feed
                    </h3>
                    <div class="flex items-center space-x-2">
                        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span class="text-green-400 text-sm font-semibold">Live</span>
                    </div>
                </div>
                <div class="space-y-3" id="activityFeed">
                    <!-- Activity items will be populated by JavaScript -->
                </div>
            </div>
        </div>
    </section>

    <!-- JavaScript for Dashboard Functionality -->
    <script>
        // Dashboard Data and Functionality
        let charts = {};

        // Initialize Dashboard
        document.addEventListener('DOMContentLoaded', function() {
            // Check authentication (demo purposes - in production use proper auth)
            const isAuthenticated = localStorage.getItem('bt_authenticated') === 'true';
            if (!isAuthenticated && !window.location.search.includes('demo=true')) {
                // Redirect to login page
                window.location.href = '/login.html';
                return;
            }
            
            // Display user info
            const user = JSON.parse(localStorage.getItem('bt_user') || '{}');
            const userInfo = document.getElementById('userInfo');
            if (userInfo && user.name) {
                userInfo.textContent = user.name;
            }
            
            // Logout functionality
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function() {
                    localStorage.removeItem('bt_authenticated');
                    localStorage.removeItem('bt_user');
                    window.location.href = '/login.html';
                });
            }
            
            initializeCharts();
            startRealTimeUpdates();
            updateLastUpdatedTime();
        });

        // Initialize Charts
        function initializeCharts() {
            // User Growth Chart
            const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
            charts.userGrowth = new Chart(userGrowthCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        label: 'Active Users',
                        data: [32000, 35500, 38200, 42100, 45800, 48300, 50247],
                        borderColor: '#ec4899',
                        backgroundColor: 'rgba(236, 72, 153, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#9ca3af'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#9ca3af'
                            }
                        }
                    }
                }
            });

            // Revenue Chart
            const revenueCtx = document.getElementById('revenueChart').getContext('2d');
            charts.revenue = new Chart(revenueCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        label: 'Partner Revenue',
                        data: [425, 468, 523, 587, 634, 721, 847],
                        backgroundColor: [
                            'rgba(236, 72, 153, 0.8)',
                            'rgba(139, 92, 246, 0.8)',
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(16, 185, 129, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(239, 68, 68, 0.8)',
                            'rgba(168, 85, 247, 0.8)'
                        ],
                        borderRadius: 8,
                        borderSkipped: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#9ca3af',
                                callback: function(value) {
                                    return '$' + value + 'K';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#9ca3af'
                            }
                        }
                    }
                }
            });

            // Feature Usage Chart
            const featureCtx = document.getElementById('featureUsageChart').getContext('2d');
            charts.featureUsage = new Chart(featureCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Challenges', 'Date Planner', 'Chat', 'Rewards', 'Discovery'],
                    datasets: [{
                        data: [35, 25, 20, 12, 8],
                        backgroundColor: [
                            '#ec4899',
                            '#8b5cf6',
                            '#3b82f6',
                            '#10b981',
                            '#f59e0b'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#9ca3af',
                                usePointStyle: true,
                                padding: 20
                            }
                        }
                    }
                }
            });
        }

        // Real-time Updates
        function startRealTimeUpdates() {
            // Update activity feed every 3 seconds
            setInterval(updateActivityFeed, 3000);
            
            // Update metrics every 30 seconds
            setInterval(updateMetrics, 30000);
            
            // Update timestamp every minute
            setInterval(updateLastUpdatedTime, 60000);
        }

        // Update Activity Feed
        function updateActivityFeed() {
            const activities = [
                { icon: 'fas fa-heart', color: 'text-pink-400', text: 'New couple joined from San Francisco', time: 'now' },
                { icon: 'fas fa-trophy', color: 'text-yellow-400', text: 'Challenge completed: "Date Night Planning"', time: '2m ago' },
                { icon: 'fas fa-handshake', color: 'text-blue-400', text: 'New partner registered: "Bella Vista Restaurant"', time: '5m ago' },
                { icon: 'fas fa-gift', color: 'text-green-400', text: 'Reward redeemed: 25% off spa package', time: '7m ago' },
                { icon: 'fas fa-star', color: 'text-purple-400', text: 'Couple achieved Silver tier status', time: '12m ago' }
            ];

            const feed = document.getElementById('activityFeed');
            feed.innerHTML = activities.map(activity => 
                '<div class="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors animate-fade-in-up">' +
                    '<div class="morphing-gradient w-10 h-10 rounded-full flex items-center justify-center">' +
                        '<i class="' + activity.icon + ' text-white text-sm"></i>' +
                    '</div>' +
                    '<div class="flex-1">' +
                        '<div class="text-white font-medium">' + activity.text + '</div>' +
                    '</div>' +
                    '<div class="text-gray-400 text-sm">' + activity.time + '</div>' +
                '</div>'
            ).join('');
        }

        // Update Metrics
        function updateMetrics() {
            // Simulate real-time metric updates
            const totalUsers = Math.floor(50247 + Math.random() * 100);
            const engagedCouples = Math.floor(totalUsers * 0.5);
            const partnerRevenue = Math.floor(847 + Math.random() * 10);
            const appSessions = (1.2 + (Math.random() * 0.1 - 0.05)).toFixed(1);

            document.getElementById('totalUsers').textContent = totalUsers.toLocaleString();
            document.getElementById('engagedCouples').textContent = engagedCouples.toLocaleString();
            document.getElementById('partnerRevenue').textContent = '$' + partnerRevenue + 'K';
            document.getElementById('appSessions').textContent = appSessions + 'M';
        }

        // Update Last Updated Time
        function updateLastUpdatedTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            document.getElementById('lastUpdated').textContent = timeString;
        }

        // Smooth scroll to sections
        function scrollToSection(sectionId) {
            document.getElementById(sectionId)?.scrollIntoView({ 
                behavior: 'smooth' 
            });
        }

        // Initialize activity feed on load
        updateActivityFeed();
    <\/script>
</body>
</html>`,Bi=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analytics Login | Better Together</title>
    <meta name="description" content="Secure login to Better Together analytics dashboard. Access real-time business intelligence and relationship platform metrics.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        pink: {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d',
                            800: '#9d174d'
                        },
                        purple: {
                            500: '#8b5cf6',
                            600: '#7c3aed',
                            700: '#6d28d9'
                        },
                        slate: {
                            850: '#1a202c',
                            900: '#0f1419'
                        }
                    },
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif']
                    },
                    animation: {
                        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                        'slide-in-right': 'slideInRight 1s ease-out forwards',
                        'pulse-glow': 'pulseGlow 3s ease-in-out infinite alternate',
                        'float-slow': 'floatSlow 6s ease-in-out infinite',
                        'rotate-slow': 'rotateSlow 20s linear infinite'
                    },
                    keyframes: {
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(40px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' }
                        },
                        slideInRight: {
                            '0%': { opacity: '0', transform: 'translateX(50px)' },
                            '100%': { opacity: '1', transform: 'translateX(0)' }
                        },
                        pulseGlow: {
                            '0%': { boxShadow: '0 0 30px rgba(236, 72, 153, 0.3)' },
                            '100%': { boxShadow: '0 0 60px rgba(236, 72, 153, 0.8)' }
                        },
                        floatSlow: {
                            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                            '50%': { transform: 'translateY(-20px) rotate(5deg)' }
                        },
                        rotateSlow: {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' }
                        }
                    }
                }
            }
        }
    <\/script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        
        /* iOS 26 Liquid Glass Effects */
        .liquid-glass {
            backdrop-filter: blur(40px) saturate(180%);
            background: linear-gradient(145deg, 
                rgba(255, 255, 255, 0.15) 0%,
                rgba(255, 255, 255, 0.05) 50%,
                rgba(255, 255, 255, 0.1) 100%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 
                0 25px 45px -12px rgba(0, 0, 0, 0.1),
                0 0 0 1px rgba(255, 255, 255, 0.05) inset,
                0 1px 3px rgba(255, 255, 255, 0.2) inset;
        }
        
        .liquid-glass-form {
            backdrop-filter: blur(30px) saturate(180%);
            background: linear-gradient(145deg, 
                rgba(255, 255, 255, 0.08) 0%,
                rgba(255, 255, 255, 0.03) 50%,
                rgba(255, 255, 255, 0.12) 100%);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 
                0 30px 60px -12px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.08) inset,
                0 2px 6px rgba(255, 255, 255, 0.15) inset;
        }
        
        .liquid-glass-accent {
            backdrop-filter: blur(25px) saturate(200%);
            background: linear-gradient(145deg, 
                rgba(236, 72, 153, 0.15) 0%,
                rgba(139, 92, 246, 0.10) 50%,
                rgba(236, 72, 153, 0.20) 100%);
            border: 1px solid rgba(236, 72, 153, 0.25);
            box-shadow: 
                0 25px 50px -12px rgba(236, 72, 153, 0.3),
                0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                0 2px 8px rgba(255, 255, 255, 0.25) inset;
        }
        
        /* Advanced Animations */
        .liquid-hover {
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .liquid-hover:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 
                0 40px 80px -12px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.12) inset,
                0 3px 12px rgba(255, 255, 255, 0.4) inset;
        }
        
        .liquid-press {
            transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .liquid-press:active {
            transform: scale(0.96);
            box-shadow: 
                0 15px 30px -8px rgba(0, 0, 0, 0.25),
                0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        }
        
        .morphing-gradient {
            background: linear-gradient(45deg, 
                rgba(236, 72, 153, 0.9), 
                rgba(139, 92, 246, 0.9),
                rgba(59, 130, 246, 0.9),
                rgba(16, 185, 129, 0.9),
                rgba(236, 72, 153, 0.9));
            background-size: 400% 400%;
            animation: morphGradient 8s ease infinite;
        }
        @keyframes morphGradient {
            0% { background-position: 0% 50%; }
            25% { background-position: 100% 50%; }
            50% { background-position: 50% 100%; }
            75% { background-position: 0% 100%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Dynamic Background */
        .login-bg {
            background: linear-gradient(135deg, #0f1419 0%, #1a202c 25%, #2d3748 50%, #1a202c 75%, #0f1419 100%);
            min-height: 100vh;
            position: relative;
            overflow: hidden;
        }
        
        .bg-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.7;
        }
        
        .orb-1 {
            width: 300px;
            height: 300px;
            background: linear-gradient(45deg, #ec4899, #8b5cf6);
            top: 10%;
            left: 15%;
            animation: floatSlow 8s ease-in-out infinite;
        }
        
        .orb-2 {
            width: 200px;
            height: 200px;
            background: linear-gradient(45deg, #3b82f6, #10b981);
            bottom: 20%;
            right: 10%;
            animation: floatSlow 6s ease-in-out infinite reverse;
        }
        
        .orb-3 {
            width: 150px;
            height: 150px;
            background: linear-gradient(45deg, #f59e0b, #ef4444);
            top: 60%;
            left: 70%;
            animation: floatSlow 10s ease-in-out infinite;
        }
        
        /* Input Field Styling */
        .liquid-input {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        .liquid-input:focus {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(236, 72, 153, 0.4);
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.2);
        }
        
        /* Floating Labels */
        .floating-label {
            transition: all 0.3s ease;
            pointer-events: none;
        }
        .liquid-input:focus + .floating-label,
        .liquid-input:not(:placeholder-shown) + .floating-label {
            transform: translateY(-25px) scale(0.85);
            color: #ec4899;
        }
        
        /* Loading Animation */
        .loading-dots {
            display: none;
        }
        .loading .loading-dots {
            display: inline-block;
        }
        .loading .login-text {
            display: none;
        }
        
        @keyframes dots {
            0%, 20% { color: rgba(255,255,255,0.3); }
            50% { color: rgba(255,255,255,1); }
            80%, 100% { color: rgba(255,255,255,0.3); }
        }
        .loading-dots span:nth-child(1) { animation: dots 1.4s linear infinite 0s; }
        .loading-dots span:nth-child(2) { animation: dots 1.4s linear infinite 0.2s; }
        .loading-dots span:nth-child(3) { animation: dots 1.4s linear infinite 0.4s; }
    </style>
</head>
<body class="login-bg text-white">
    <!-- Animated Background Orbs -->
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    <div class="bg-orb orb-3"></div>
    
    <!-- Login Container -->
    <div class="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div class="w-full max-w-md">
            <!-- Logo and Branding -->
            <div class="text-center mb-8 animate-fade-in-up">
                <div class="liquid-glass rounded-2xl p-6 mb-6 liquid-hover">
                    <div class="morphing-gradient w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span class="text-3xl">💕</span>
                    </div>
                    <h1 class="text-2xl font-bold text-white mb-2">Better Together</h1>
                    <p class="text-gray-300 text-sm">Analytics Dashboard</p>
                </div>
            </div>
            
            <!-- Login Form -->
            <div class="liquid-glass-form rounded-2xl p-8 liquid-hover animate-fade-in-up" style="animation-delay: 0.2s;">
                <div class="mb-6">
                    <h2 class="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                    <p class="text-gray-300">Sign in to access your analytics dashboard</p>
                </div>
                
                <form id="loginForm" class="space-y-6">
                    <!-- Email Field -->
                    <div class="relative">
                        <input 
                            type="email" 
                            id="email" 
                            class="liquid-input w-full px-4 py-4 text-white placeholder-transparent rounded-lg focus:outline-none"
                            placeholder="Email address"
                            required
                        >
                        <label for="email" class="floating-label absolute left-4 top-4 text-gray-400 transition-all">
                            <i class="fas fa-envelope mr-2"></i>Email Address
                        </label>
                    </div>
                    
                    <!-- Password Field -->
                    <div class="relative">
                        <input 
                            type="password" 
                            id="password" 
                            class="liquid-input w-full px-4 py-4 text-white placeholder-transparent rounded-lg focus:outline-none pr-12"
                            placeholder="Password"
                            required
                        >
                        <label for="password" class="floating-label absolute left-4 top-4 text-gray-400 transition-all">
                            <i class="fas fa-lock mr-2"></i>Password
                        </label>
                        <button type="button" id="togglePassword" class="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    
                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between text-sm">
                        <label class="flex items-center text-gray-300 cursor-pointer liquid-hover">
                            <input type="checkbox" class="mr-2 rounded liquid-input">
                            Remember me
                        </label>
                        <a href="#" class="text-pink-400 hover:text-pink-300 transition-colors liquid-hover">
                            Forgot password?
                        </a>
                    </div>
                    
                    <!-- Login Button -->
                    <button 
                        type="submit" 
                        id="loginBtn"
                        class="w-full liquid-glass-accent text-white py-4 rounded-lg font-semibold text-lg liquid-hover liquid-press animate-pulse-glow"
                    >
                        <span class="login-text">
                            <i class="fas fa-chart-line mr-2"></i>
                            Access Dashboard
                        </span>
                        <span class="loading-dots">
                            Authenticating<span>.</span><span>.</span><span>.</span>
                        </span>
                    </button>
                </form>
                
                <!-- Demo Login -->
                <div class="mt-8 pt-6 border-t border-gray-600">
                    <div class="text-center">
                        <p class="text-gray-400 text-sm mb-4">Demo Access</p>
                        <button 
                            id="demoLogin"
                            class="liquid-glass text-gray-300 px-6 py-3 rounded-lg font-medium liquid-hover liquid-press"
                        >
                            <i class="fas fa-play mr-2"></i>
                            Try Demo Dashboard
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Security Notice -->
            <div class="mt-6 text-center animate-fade-in-up" style="animation-delay: 0.4s;">
                <div class="liquid-glass rounded-xl p-4">
                    <div class="flex items-center justify-center text-gray-400 text-sm">
                        <i class="fas fa-shield-alt mr-2 text-green-400"></i>
                        <span>Enterprise-grade security with end-to-end encryption</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Success Modal -->
    <div id="successModal" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 hidden">
        <div class="liquid-glass-form rounded-2xl p-8 max-w-sm w-full mx-4 animate-fade-in-up">
            <div class="text-center">
                <div class="morphing-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check text-white text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">Login Successful!</h3>
                <p class="text-gray-300 mb-4">Redirecting to analytics dashboard...</p>
                <div class="flex justify-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Login Form Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const loginForm = document.getElementById('loginForm');
            const loginBtn = document.getElementById('loginBtn');
            const demoBtn = document.getElementById('demoLogin');
            const togglePassword = document.getElementById('togglePassword');
            const passwordInput = document.getElementById('password');
            const successModal = document.getElementById('successModal');
            
            // Toggle Password Visibility
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                const icon = this.querySelector('i');
                icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
            });
            
            // Handle Login Form Submit
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Add loading state
                loginBtn.classList.add('loading');
                loginBtn.disabled = true;
                
                // Simulate authentication
                setTimeout(() => {
                    // Set authentication status
                    localStorage.setItem('bt_authenticated', 'true');
                    localStorage.setItem('bt_user', JSON.stringify({
                        email: document.getElementById('email').value,
                        name: 'Analytics Admin',
                        role: 'admin',
                        loginTime: new Date().toISOString()
                    }));
                    
                    // Show success modal
                    successModal.classList.remove('hidden');
                    
                    // Redirect to dashboard after 2 seconds
                    setTimeout(() => {
                        window.location.href = '/dashboard.html';
                    }, 2000);
                }, 2000);
            });
            
            // Demo Login
            demoBtn.addEventListener('click', function() {
                // Add loading animation
                this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading Demo...';
                this.disabled = true;
                
                // Set demo authentication
                localStorage.setItem('bt_authenticated', 'true');
                localStorage.setItem('bt_user', JSON.stringify({
                    email: 'demo@bettertogether.com',
                    name: 'Demo User',
                    role: 'demo',
                    loginTime: new Date().toISOString()
                }));
                
                // Redirect to dashboard after 1 second
                setTimeout(() => {
                    window.location.href = '/dashboard.html?demo=true';
                }, 1000);
            });
            
            // Floating Label Animation for Inputs
            const inputs = document.querySelectorAll('.liquid-input');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    if (this.value === '') {
                        const label = this.nextElementSibling;
                        if (label && label.classList.contains('floating-label')) {
                            label.style.transform = 'translateY(0) scale(1)';
                            label.style.color = '#9ca3af';
                        }
                    }
                });
            });
            
            // Add subtle parallax effect to background orbs
            document.addEventListener('mousemove', function(e) {
                const orbs = document.querySelectorAll('.bg-orb');
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                orbs.forEach((orb, index) => {
                    const speed = (index + 1) * 0.02;
                    const x = (mouseX - 0.5) * speed * 100;
                    const y = (mouseY - 0.5) * speed * 100;
                    orb.style.transform = \`translate(\${x}px, \${y}px)\`;
                });
            });
        });
    <\/script>
</body>
</html>`,Mi=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Start Your 7-Day Free Trial - Better Together</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://js.stripe.com/v3/"><\/script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body { 
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #FF6B9D 0%, #8B5CF6 50%, #3B82F6 100%);
            min-height: 100vh;
        }
        
        /* Floating hearts animation */
        @keyframes floating-hearts {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-20px) rotate(10deg); opacity: 1; }
        }
        
        .floating-hearts {
            animation: floating-hearts 3s ease-in-out infinite;
        }
        
        /* Premium shimmer effect */
        @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
        }
        
        .premium-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            background-size: 200px 100%;
            animation: shimmer 2s infinite;
        }
        
        /* Pulse for urgency */
        @keyframes urgent-pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 107, 157, 0.7); }
            50% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(255, 107, 157, 0); }
        }
        
        .urgent-pulse {
            animation: urgent-pulse 2s infinite;
        }
        
        /* Plan switching animation */
        .plan-transition {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Loading spinner for Stripe */
        .spinner {
            border: 2px solid #f3f3f3;
            border-top: 2px solid #FF6B9D;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            display: inline-block;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="p-6">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <div class="flex items-center text-white">
                <span class="text-2xl mr-3 floating-hearts">💕</span>
                <span class="text-xl font-semibold">Better Together</span>
            </div>
            <a href="/" class="text-white/80 hover:text-white transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>Back
            </a>
        </div>
    </nav>

    <div class="max-w-5xl mx-auto px-6 pb-12">
        <!-- Clean Hero Section -->
        <div class="text-center mb-12">
            <h1 class="text-5xl font-bold text-white mb-4">
                Start Your <span class="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">7-Day Free Trial</span>
            </h1>
            <p class="text-xl text-white/90 max-w-2xl mx-auto mb-6">
                Transform your relationship in just one week. Cancel anytime.
            </p>
            <div class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block">
                <div class="text-3xl font-bold text-white">$0 for 7 days</div>
                <div class="text-white/80 text-sm">Then choose your plan • Cancel anytime</div>
            </div>
        </div>

        <!-- Main Paywall Card -->
        <div class="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
            <!-- Premium Badge -->
            <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-center py-3">
                <div class="flex items-center justify-center text-white font-semibold">
                    <i class="fas fa-crown mr-2"></i>
                    <span class="premium-shimmer">PREMIUM ACCESS • 7-DAY FREE TRIAL</span>
                </div>
            </div>

            <div class="p-8">
                <!-- Pricing Plans Comparison -->
                <div class="mb-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
                        <i class="fas fa-crown text-yellow-500 mr-3"></i>
                        Choose Your Love Plan
                    </h2>
                    
                    <!-- Plan Selection Tabs -->
                    <div class="flex bg-gray-100 rounded-2xl p-2 mb-6 max-w-md mx-auto">
                        <button id="basicPlanTab" onclick="showPlan('basic')" 
                                class="flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 bg-white shadow-sm text-gray-800">
                            Growing Together
                        </button>
                        <button id="premiumPlanTab" onclick="showPlan('premium')" 
                                class="flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 text-gray-600 hover:text-gray-800">
                            Growing Together+
                        </button>
                    </div>

                    <!-- Feature Comparison Table -->
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
                                        <th class="text-left p-4 font-semibold text-gray-800">Features</th>
                                        <th class="text-center p-4 font-semibold text-gray-800 border-l">
                                            <div class="flex flex-col items-center">
                                                <span class="text-lg mb-1">Growing Together</span>
                                                <span class="text-2xl font-bold text-pink-600">$39</span>
                                                <span class="text-sm text-gray-600">/month for couple</span>
                                            </div>
                                        </th>
                                        <th class="text-center p-4 font-semibold text-gray-800 border-l bg-gradient-to-r from-yellow-50 to-orange-50">
                                            <div class="flex flex-col items-center relative">
                                                <div class="absolute -top-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                    MOST POPULAR
                                                </div>
                                                <span class="text-lg mb-1 mt-2">Growing Together+</span>
                                                <span class="text-2xl font-bold text-purple-600">$69</span>
                                                <span class="text-sm text-gray-600">/month for couple</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-t">
                                        <td class="p-4 font-medium text-gray-800">Scientific Love Assessments</td>
                                        <td class="p-4 text-center border-l">
                                            <div class="flex flex-col items-center">
                                                <i class="fas fa-check text-green-500 text-lg mb-1"></i>
                                                <span class="text-xs text-gray-600">Basic (3 assessments)</span>
                                            </div>
                                        </td>
                                        <td class="p-4 text-center border-l bg-purple-50">
                                            <div class="flex flex-col items-center">
                                                <i class="fas fa-check text-green-500 text-lg mb-1"></i>
                                                <span class="text-xs text-purple-700 font-semibold">Complete (6 assessments)</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-t bg-gray-50">
                                        <td class="p-4 font-medium text-gray-800">AI Relationship Coach</td>
                                        <td class="p-4 text-center border-l">
                                            <div class="flex flex-col items-center">
                                                <i class="fas fa-check text-green-500 text-lg mb-1"></i>
                                                <span class="text-xs text-gray-600">Basic advice</span>
                                            </div>
                                        </td>
                                        <td class="p-4 text-center border-l bg-purple-50">
                                            <div class="flex flex-col items-center">
                                                <i class="fas fa-check text-green-500 text-lg mb-1"></i>
                                                <span class="text-xs text-purple-700 font-semibold">Advanced AI + 24/7 support</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-t">
                                        <td class="p-4 font-medium text-gray-800">Smart Date Planning</td>
                                        <td class="p-4 text-center border-l">
                                            <div class="flex flex-col items-center">
                                                <i class="fas fa-check text-green-500 text-lg mb-1"></i>
                                                <span class="text-xs text-gray-600">Manual planning</span>
                                            </div>
                                        </td>
                                        <td class="p-4 text-center border-l bg-purple-50">
                                            <div class="flex flex-col items-center">
                                                <i class="fas fa-check text-green-500 text-lg mb-1"></i>
                                                <span class="text-xs text-purple-700 font-semibold">Auto-scheduling + booking</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-t bg-gray-50">
                                        <td class="p-4 font-medium text-gray-800">Daily Check-ins & Analytics</td>
                                        <td class="p-4 text-center border-l">
                                            <i class="fas fa-check text-green-500 text-lg"></i>
                                        </td>
                                        <td class="p-4 text-center border-l bg-purple-50">
                                            <i class="fas fa-check text-green-500 text-lg"></i>
                                        </td>
                                    </tr>
                                    <tr class="border-t">
                                        <td class="p-4 font-medium text-gray-800">Relationship Challenges</td>
                                        <td class="p-4 text-center border-l">
                                            <div class="flex flex-col items-center">
                                                <i class="fas fa-check text-green-500 text-lg mb-1"></i>
                                                <span class="text-xs text-gray-600">Basic challenges</span>
                                            </div>
                                        </td>
                                        <td class="p-4 text-center border-l bg-purple-50">
                                            <div class="flex flex-col items-center">
                                                <i class="fas fa-check text-green-500 text-lg mb-1"></i>
                                                <span class="text-xs text-purple-700 font-semibold">Premium + intimacy challenges</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-t bg-gray-50">
                                        <td class="p-4 font-medium text-gray-800">Mobile App Access</td>
                                        <td class="p-4 text-center border-l">
                                            <i class="fas fa-check text-green-500 text-lg"></i>
                                        </td>
                                        <td class="p-4 text-center border-l bg-purple-50">
                                            <i class="fas fa-check text-green-500 text-lg"></i>
                                        </td>
                                    </tr>
                                    <tr class="border-t">
                                        <td class="p-4 font-medium text-gray-800">Priority Customer Support</td>
                                        <td class="p-4 text-center border-l">
                                            <i class="fas fa-times text-red-400 text-lg"></i>
                                        </td>
                                        <td class="p-4 text-center border-l bg-purple-50">
                                            <i class="fas fa-check text-green-500 text-lg"></i>
                                        </td>
                                    </tr>
                                    <tr class="border-t bg-gray-50">
                                        <td class="p-4 font-medium text-gray-800">Advanced Compatibility Analysis</td>
                                        <td class="p-4 text-center border-l">
                                            <i class="fas fa-times text-red-400 text-lg"></i>
                                        </td>
                                        <td class="p-4 text-center border-l bg-purple-50">
                                            <i class="fas fa-check text-green-500 text-lg"></i>
                                        </td>
                                    </tr>
                                    <tr class="border-t">
                                        <td class="p-4 font-medium text-gray-800">Custom Relationship Goals</td>
                                        <td class="p-4 text-center border-l">
                                            <div class="flex flex-col items-center">
                                                <i class="fas fa-check text-green-500 text-lg mb-1"></i>
                                                <span class="text-xs text-gray-600">Up to 5 goals</span>
                                            </div>
                                        </td>
                                        <td class="p-4 text-center border-l bg-purple-50">
                                            <div class="flex flex-col items-center">
                                                <i class="fas fa-check text-green-500 text-lg mb-1"></i>
                                                <span class="text-xs text-purple-700 font-semibold">Unlimited goals</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-t bg-gray-50">
                                        <td class="p-4 font-medium text-gray-800">Monthly Surprise Box</td>
                                        <td class="p-4 text-center border-l">
                                            <i class="fas fa-times text-red-400 text-lg"></i>
                                        </td>
                                        <td class="p-4 text-center border-l bg-purple-50">
                                            <div class="flex flex-col items-center">
                                                <i class="fas fa-check text-green-500 text-lg mb-1"></i>
                                                <span class="text-xs text-purple-700 font-semibold">Curated date ideas & gifts</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Plan Details & Social Proof -->
                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <!-- Left: Selected Plan Benefits -->
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <i class="fas fa-gift text-pink-500 mr-3"></i>
                            <span id="selectedPlanTitle">Growing Together Includes</span>
                        </h2>
                        
                        <div id="planFeatures" class="space-y-4 plan-transition">
                            <!-- Basic Plan Features -->
                            <div id="basicFeatures">
                                <div class="flex items-start mb-4">
                                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                                        <i class="fas fa-check text-white text-xs"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-800">Essential Love Assessments</div>
                                        <div class="text-sm text-gray-600">Love Languages, Attachment Style, Communication Style</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start mb-4">
                                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                                        <i class="fas fa-check text-white text-xs"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-800">AI-Powered Daily Check-ins</div>
                                        <div class="text-sm text-gray-600">Personalized conversation starters & connection tracking</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start mb-4">
                                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                                        <i class="fas fa-check text-white text-xs"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-800">Manual Date Planning</div>
                                        <div class="text-sm text-gray-600">Plan and track date nights with AI suggestions</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start mb-4">
                                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                                        <i class="fas fa-check text-white text-xs"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-800">Basic Relationship Coaching</div>
                                        <div class="text-sm text-gray-600">AI coach with essential growth strategies</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start">
                                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                                        <i class="fas fa-check text-white text-xs"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-800">Relationship Analytics</div>
                                        <div class="text-sm text-gray-600">Track progress, streaks, and relationship health</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Premium Plan Features (Hidden by default) -->
                            <div id="premiumFeatures" class="hidden">
                                <div class="flex items-start mb-4">
                                    <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-1">
                                        <i class="fas fa-crown text-white text-xs"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-800">Complete Assessment Suite</div>
                                        <div class="text-sm text-gray-600">All 6 assessments + advanced compatibility analysis</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start mb-4">
                                    <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-1">
                                        <i class="fas fa-crown text-white text-xs"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-800">Advanced AI Coach</div>
                                        <div class="text-sm text-gray-600">24/7 premium AI coach + priority expert support</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start mb-4">
                                    <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-1">
                                        <i class="fas fa-crown text-white text-xs"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-800">Auto-Scheduling & Booking</div>
                                        <div class="text-sm text-gray-600">AI automatically plans, schedules & books date nights</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start mb-4">
                                    <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-1">
                                        <i class="fas fa-crown text-white text-xs"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-800">Premium Challenges</div>
                                        <div class="text-sm text-gray-600">Exclusive intimacy & connection challenges</div>
                                    </div>
                                </div>
                                
                                <div class="flex items-start">
                                    <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-1">
                                        <i class="fas fa-crown text-white text-xs"></i>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-800">Monthly Surprise Box</div>
                                        <div class="text-sm text-gray-600">Curated date ideas, gifts & relationship tools</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Social Proof & Urgency -->
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <i class="fas fa-users text-blue-500 mr-3"></i>
                            Join 50,000+ Happy Couples
                        </h2>
                        
                        <!-- Stats -->
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <div class="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
                                <div class="text-2xl font-bold text-pink-600">87%</div>
                                <div class="text-sm text-pink-700">Improved Communication</div>
                            </div>
                            <div class="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                                <div class="text-2xl font-bold text-blue-600">94%</div>
                                <div class="text-sm text-blue-700">Relationship Satisfaction</div>
                            </div>
                            <div class="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                                <div class="text-2xl font-bold text-green-600">15+</div>
                                <div class="text-sm text-green-700">Days Average Streak</div>
                            </div>
                            <div class="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                                <div class="text-2xl font-bold text-purple-600">98%</div>
                                <div class="text-sm text-purple-700">Would Recommend</div>
                            </div>
                        </div>

                        <!-- Testimonial -->
                        <div class="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border-l-4 border-pink-500 mb-4">
                            <div class="flex items-center mb-2">
                                <div class="flex text-yellow-400 text-sm">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <span class="text-xs text-gray-600 ml-2">Verified User</span>
                            </div>
                            <p class="text-sm text-gray-700 italic">"We went from barely talking to having deep conversations every night. The 7-day trial convinced us this actually works!"</p>
                            <div class="text-xs text-gray-500 mt-2">— Sarah & Mike, married 8 years</div>
                        </div>

                        <!-- Limited Time Offer -->
                        <div class="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-xl border border-orange-200">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-clock text-orange-600 mr-2"></i>
                                <span class="font-semibold text-orange-800">Limited Time Offer</span>
                            </div>
                            <p class="text-sm text-orange-700">Start your free trial today and get your first month at 50% off!</p>
                        </div>
                    </div>
                </div>

                <!-- Stripe Checkout Form -->
                <div class="border-t pt-8">
                    <div class="max-w-md mx-auto">
                        <h3 class="text-xl font-bold text-gray-800 text-center mb-6">Start Your Free Trial Now</h3>
                        
                        <!-- Plan Selection -->
                        <div class="mb-6">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Select Your Plan</label>
                            <div class="grid grid-cols-2 gap-4">
                                <label class="cursor-pointer">
                                    <input type="radio" name="selectedPlan" value="basic" class="sr-only" checked>
                                    <div class="border-2 border-pink-200 rounded-xl p-4 text-center hover:border-pink-400 transition-colors">
                                        <div class="font-semibold text-gray-800">Growing Together</div>
                                        <div class="text-2xl font-bold text-pink-600">$39</div>
                                        <div class="text-xs text-gray-600">/month</div>
                                    </div>
                                </label>
                                <label class="cursor-pointer">
                                    <input type="radio" name="selectedPlan" value="premium" class="sr-only">
                                    <div class="border-2 border-purple-200 rounded-xl p-4 text-center hover:border-purple-400 transition-colors relative">
                                        <div class="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                                            POPULAR
                                        </div>
                                        <div class="font-semibold text-gray-800 mt-2">Growing Together+</div>
                                        <div class="text-2xl font-bold text-purple-600">$69</div>
                                        <div class="text-xs text-gray-600">/month</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                        <!-- Trial Info -->
                        <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl mb-6 text-center">
                            <div class="text-2xl font-bold text-green-600 mb-1">FREE for 7 days</div>
                            <div class="text-sm text-green-700">Then <span id="selectedPrice">$39</span>/month for both partners • Cancel anytime with one click</div>
                        </div>

                        <!-- Stripe Payment Form -->
                        <form id="payment-form">
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input type="email" id="email" required 
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                            </div>
                            
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input type="text" id="name" required 
                                       class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                            </div>
                            
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                <div id="card-element" class="p-4 border border-gray-300 rounded-lg bg-white">
                                    <!-- Stripe Elements will create form elements here -->
                                </div>
                                <div id="card-errors" role="alert" class="text-red-600 text-sm mt-2"></div>
                            </div>

                            <button type="submit" id="submit-button" 
                                    class="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg urgent-pulse hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                <span id="button-text">
                                    <i class="fas fa-crown mr-2"></i>
                                    Start 7-Day FREE Trial
                                </span>
                                <span id="spinner" class="hidden">
                                    <div class="spinner mr-2"></div>
                                    Processing...
                                </span>
                            </button>
                        </form>

                        <!-- Security & Guarantees -->
                        <div class="mt-6 text-center space-y-3">
                            <div class="flex items-center justify-center text-sm text-gray-600">
                                <i class="fas fa-lock text-green-500 mr-2"></i>
                                <span>Secured by Stripe • SSL Encrypted</span>
                            </div>
                            <div class="flex items-center justify-center text-sm text-gray-600">
                                <i class="fas fa-shield-alt text-blue-500 mr-2"></i>
                                <span>30-Day Money-Back Guarantee</span>
                            </div>
                            <div class="flex items-center justify-center text-sm text-gray-600">
                                <i class="fas fa-times-circle text-red-500 mr-2"></i>
                                <span>Cancel Anytime • No Questions Asked</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- FAQ Section -->
        <div class="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 class="font-semibold text-gray-800 mb-2">How does the 7-day free trial work?</h3>
                    <p class="text-sm text-gray-600">You get full access to all features for 7 days. If you don't cancel before the trial ends, you'll be charged based on your selected plan. You can cancel anytime with one click.</p>
                </div>
                <div>
                    <h3 class="font-semibold text-gray-800 mb-2">What's the difference between the plans?</h3>
                    <p class="text-sm text-gray-600">Growing Together+ includes all premium features like complete assessments, advanced AI coaching, auto-scheduling, and monthly surprise boxes. Growing Together has essential features for couples starting their journey.</p>
                </div>
                <div>
                    <h3 class="font-semibold text-gray-800 mb-2">Do both partners need accounts?</h3>
                    <p class="text-sm text-gray-600">Yes! Better Together is designed for couples. One subscription covers both partners with full access to all relationship tools, AI coaching, and personalized insights.</p>
                </div>
                <div>
                    <h3 class="font-semibold text-gray-800 mb-2">Can I switch plans later?</h3>
                    <p class="text-sm text-gray-600">Absolutely! You can upgrade or downgrade your plan anytime from your account settings. Changes will be reflected in your next billing cycle.</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        let selectedPlan = 'basic';
        
        // Plan switching functionality
        function showPlan(plan) {
            selectedPlan = plan;
            
            // Update tab appearance
            const basicTab = document.getElementById('basicPlanTab');
            const premiumTab = document.getElementById('premiumPlanTab');
            
            if (plan === 'basic') {
                basicTab.classList.add('bg-white', 'shadow-sm', 'text-gray-800');
                basicTab.classList.remove('text-gray-600', 'hover:text-gray-800');
                premiumTab.classList.remove('bg-white', 'shadow-sm', 'text-gray-800');
                premiumTab.classList.add('text-gray-600', 'hover:text-gray-800');
                
                // Update features display
                document.getElementById('basicFeatures').classList.remove('hidden');
                document.getElementById('premiumFeatures').classList.add('hidden');
                document.getElementById('selectedPlanTitle').textContent = 'Growing Together Includes';
                document.getElementById('selectedPrice').textContent = '$39';
                
            } else {
                premiumTab.classList.add('bg-white', 'shadow-sm', 'text-gray-800');
                premiumTab.classList.remove('text-gray-600', 'hover:text-gray-800');
                basicTab.classList.remove('bg-white', 'shadow-sm', 'text-gray-800');
                basicTab.classList.add('text-gray-600', 'hover:text-gray-800');
                
                // Update features display
                document.getElementById('premiumFeatures').classList.remove('hidden');
                document.getElementById('basicFeatures').classList.add('hidden');
                document.getElementById('selectedPlanTitle').textContent = 'Growing Together+ Includes';
                document.getElementById('selectedPrice').textContent = '$69';
            }
            
            // Update radio button selection
            document.querySelector(\`input[value="\${plan}"]\`).checked = true;
        }
        
        // Handle plan selection from radio buttons
        document.querySelectorAll('input[name="selectedPlan"]').forEach(radio => {
            radio.addEventListener('change', function() {
                showPlan(this.value);
            });
        });

        // Initialize Stripe
        const stripe = Stripe('pk_test_your_publishable_key_here'); // Replace with your actual Stripe publishable key
        const elements = stripe.elements();

        // Create card element
        const cardElement = elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
            },
        });

        cardElement.mount('#card-element');

        // Handle form submission
        const form = document.getElementById('payment-form');
        const submitButton = document.getElementById('submit-button');
        const buttonText = document.getElementById('button-text');
        const spinner = document.getElementById('spinner');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            // Disable submit button and show loading
            submitButton.disabled = true;
            buttonText.classList.add('hidden');
            spinner.classList.remove('hidden');

            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            const planType = document.querySelector('input[name="selectedPlan"]:checked').value;

            try {
                // Create subscription with trial
                const response = await fetch('/api/create-subscription', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        name: name,
                        plan_type: planType,
                        stripe_token: 'mock_token_for_demo' // In production, this would be the Stripe token
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    // Redirect to success page or portal
                    alert('Welcome to Better Together! Your 7-day free trial has started.');
                    window.location.href = '/portal';
                } else {
                    throw new Error(data.message || 'Subscription creation failed');
                }
            } catch (error) {
                console.error('Subscription error:', error);
                alert('Failed to start trial: ' + error.message);
            } finally {
                // Re-enable submit button
                submitButton.disabled = false;
                buttonText.classList.remove('hidden');
                spinner.classList.add('hidden');
            }
        });
        
        // Initialize with basic plan
        showPlan('basic');
    <\/script>
</body>
</html>`,Di=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Better Together</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body { 
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #FF6B9D 0%, #8B5CF6 50%, #3B82F6 100%);
            min-height: 100vh;
        }
        
        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .heart-pulse {
            animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        .form-transition {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .input-focus:focus {
            transform: translateY(-1px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="p-6">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <div class="flex items-center text-white">
                <span class="text-2xl mr-3 heart-pulse">💕</span>
                <span class="text-xl font-semibold">Better Together</span>
            </div>
            <a href="/" class="text-white/80 hover:text-white transition-colors">
                <i class="fas fa-home mr-2"></i>Home
            </a>
        </div>
    </nav>

    <div class="max-w-md mx-auto px-6 py-8">
        <!-- Toggle Buttons -->
        <div class="flex bg-white/20 backdrop-blur-sm rounded-2xl p-1 mb-8">
            <button id="loginTab" onclick="showLogin()" 
                    class="flex-1 py-3 px-6 rounded-xl text-white font-semibold transition-all duration-200 bg-white/20">
                <i class="fas fa-sign-in-alt mr-2"></i>Login
            </button>
            <button id="registerTab" onclick="showRegister()" 
                    class="flex-1 py-3 px-6 rounded-xl text-white/70 font-semibold transition-all duration-200 hover:text-white">
                <i class="fas fa-user-plus mr-2"></i>Register
            </button>
        </div>

        <!-- Login Form -->
        <div id="loginForm" class="glass-card rounded-3xl shadow-2xl p-8">
            <div class="text-center mb-8">
                <div class="text-4xl mb-4 heart-pulse">💕</div>
                <h1 class="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                <p class="text-gray-600">Continue your relationship journey</p>
            </div>

            <form id="loginFormData" onsubmit="handleLogin(event)">
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-envelope mr-2 text-pink-500"></i>Email Address
                    </label>
                    <input type="email" id="loginEmail" required 
                           class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent input-focus form-transition"
                           placeholder="your.email@example.com">
                </div>
                
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-lock mr-2 text-purple-500"></i>Password
                    </label>
                    <div class="relative">
                        <input type="password" id="loginPassword" required 
                               class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent input-focus form-transition pr-12"
                               placeholder="••••••••">
                        <button type="button" onclick="togglePassword('loginPassword')" 
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>

                <div class="flex items-center justify-between mb-6">
                    <label class="flex items-center">
                        <input type="checkbox" class="rounded border-gray-300 text-pink-600 focus:ring-pink-500">
                        <span class="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" onclick="showForgotPassword()" class="text-sm text-pink-600 hover:text-pink-700">
                        Forgot password?
                    </a>
                </div>

                <button type="submit" 
                        class="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl">
                    <i class="fas fa-heart mr-2"></i>
                    Sign In to Your Love Journey
                </button>
            </form>

            <!-- Social Login -->
            <div class="mt-6">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div class="mt-4 grid grid-cols-2 gap-4">
                    <button onclick="loginWithGoogle()" 
                            class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                        <i class="fab fa-google text-red-500 mr-2"></i>
                        Google
                    </button>
                    <button onclick="loginWithFacebook()" 
                            class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                        <i class="fab fa-facebook text-blue-600 mr-2"></i>
                        Facebook
                    </button>
                </div>
            </div>
        </div>

        <!-- Register Form -->
        <div id="registerForm" class="glass-card rounded-3xl shadow-2xl p-8 hidden">
            <div class="text-center mb-8">
                <div class="text-4xl mb-4 heart-pulse">💕</div>
                <h1 class="text-2xl font-bold text-gray-800 mb-2">Start Your Journey</h1>
                <p class="text-gray-600">Create your relationship account</p>
            </div>

            <form id="registerFormData" onsubmit="handleRegister(event)">
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-user mr-2 text-blue-500"></i>First Name
                        </label>
                        <input type="text" id="firstName" required 
                               class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent input-focus form-transition"
                               placeholder="Sarah">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-user mr-2 text-blue-500"></i>Last Name
                        </label>
                        <input type="text" id="lastName" required 
                               class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent input-focus form-transition"
                               placeholder="Johnson">
                    </div>
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-envelope mr-2 text-pink-500"></i>Email Address
                    </label>
                    <input type="email" id="registerEmail" required 
                           class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent input-focus form-transition"
                           placeholder="sarah@example.com">
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-phone mr-2 text-green-500"></i>Phone Number (Optional)
                    </label>
                    <input type="tel" id="phoneNumber" 
                           class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent input-focus form-transition"
                           placeholder="+1 (555) 123-4567">
                </div>
                
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-lock mr-2 text-purple-500"></i>Password
                    </label>
                    <div class="relative">
                        <input type="password" id="registerPassword" required 
                               class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent input-focus form-transition pr-12"
                               placeholder="••••••••">
                        <button type="button" onclick="togglePassword('registerPassword')" 
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    <div class="mt-2 text-xs text-gray-500">
                        Must be at least 8 characters with numbers and letters
                    </div>
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-heart mr-2 text-red-500"></i>Relationship Status
                    </label>
                    <select id="relationshipStatus" required 
                            class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent input-focus form-transition">
                        <option value="">Select your status</option>
                        <option value="dating">Dating</option>
                        <option value="engaged">Engaged</option>
                        <option value="married">Married</option>
                        <option value="committed">Committed Relationship</option>
                    </select>
                </div>

                <div class="mb-6">
                    <label class="flex items-start">
                        <input type="checkbox" id="agreeTerms" required class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500">
                        <span class="ml-3 text-sm text-gray-600">
                            I agree to the <a href="#" class="text-pink-600 hover:text-pink-700">Terms of Service</a> 
                            and <a href="#" class="text-pink-600 hover:text-pink-700">Privacy Policy</a>
                        </span>
                    </label>
                </div>

                <div class="mb-6">
                    <label class="flex items-start">
                        <input type="checkbox" id="subscribeNewsletter" class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500">
                        <span class="ml-3 text-sm text-gray-600">
                            Send me relationship tips and exclusive offers (optional)
                        </span>
                    </label>
                </div>

                <button type="submit" 
                        class="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl">
                    <i class="fas fa-heart mr-2"></i>
                    Create My Love Account
                </button>
            </form>

            <!-- Social Register -->
            <div class="mt-6">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">Or sign up with</span>
                    </div>
                </div>

                <div class="mt-4 grid grid-cols-2 gap-4">
                    <button onclick="registerWithGoogle()" 
                            class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                        <i class="fab fa-google text-red-500 mr-2"></i>
                        Google
                    </button>
                    <button onclick="registerWithFacebook()" 
                            class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                        <i class="fab fa-facebook text-blue-600 mr-2"></i>
                        Facebook
                    </button>
                </div>
            </div>
        </div>

        <!-- Forgot Password Form -->
        <div id="forgotPasswordForm" class="glass-card rounded-3xl shadow-2xl p-8 hidden">
            <div class="text-center mb-8">
                <div class="text-4xl mb-4">🔐</div>
                <h1 class="text-2xl font-bold text-gray-800 mb-2">Reset Password</h1>
                <p class="text-gray-600">We'll send you a reset link</p>
            </div>

            <form id="forgotPasswordData" onsubmit="handleForgotPassword(event)">
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-envelope mr-2 text-pink-500"></i>Email Address
                    </label>
                    <input type="email" id="forgotEmail" required 
                           class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent input-focus form-transition"
                           placeholder="your.email@example.com">
                </div>

                <button type="submit" 
                        class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl">
                    <i class="fas fa-paper-plane mr-2"></i>
                    Send Reset Link
                </button>
            </form>

            <div class="mt-6 text-center">
                <button onclick="showLogin()" class="text-pink-600 hover:text-pink-700 text-sm">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Login
                </button>
            </div>
        </div>
    </div>

    <script>
        // Form switching
        function showLogin() {
            document.getElementById('loginForm').classList.remove('hidden');
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('forgotPasswordForm').classList.add('hidden');
            
            document.getElementById('loginTab').classList.add('bg-white/20');
            document.getElementById('loginTab').classList.remove('text-white/70');
            document.getElementById('registerTab').classList.remove('bg-white/20');
            document.getElementById('registerTab').classList.add('text-white/70');
        }

        function showRegister() {
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('registerForm').classList.remove('hidden');
            document.getElementById('forgotPasswordForm').classList.add('hidden');
            
            document.getElementById('registerTab').classList.add('bg-white/20');
            document.getElementById('registerTab').classList.remove('text-white/70');
            document.getElementById('loginTab').classList.remove('bg-white/20');
            document.getElementById('loginTab').classList.add('text-white/70');
        }

        function showForgotPassword() {
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('forgotPasswordForm').classList.remove('hidden');
        }

        // Password visibility toggle
        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const icon = input.nextElementSibling.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        // Form handlers
        async function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (data.success) {
                    // Store auth token
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    // Redirect to dashboard
                    window.location.href = '/portal';
                } else {
                    alert('Login failed: ' + data.message);
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed. Please try again.');
            }
        }

        async function handleRegister(event) {
            event.preventDefault();
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('registerEmail').value,
                phone: document.getElementById('phoneNumber').value,
                password: document.getElementById('registerPassword').value,
                relationshipStatus: document.getElementById('relationshipStatus').value,
                agreeTerms: document.getElementById('agreeTerms').checked,
                subscribeNewsletter: document.getElementById('subscribeNewsletter').checked
            };

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (data.success) {
                    alert('Registration successful! Please check your email to verify your account.');
                    showLogin();
                } else {
                    alert('Registration failed: ' + data.message);
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed. Please try again.');
            }
        }

        async function handleForgotPassword(event) {
            event.preventDefault();
            const email = document.getElementById('forgotEmail').value;

            try {
                const response = await fetch('/api/auth/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (data.success) {
                    alert('Password reset link sent! Check your email.');
                    showLogin();
                } else {
                    alert('Failed to send reset link: ' + data.message);
                }
            } catch (error) {
                console.error('Forgot password error:', error);
                alert('Failed to send reset link. Please try again.');
            }
        }

        // Social login handlers
        function loginWithGoogle() {
            // Implement Google OAuth login
            window.location.href = '/api/auth/google';
        }

        function loginWithFacebook() {
            // Implement Facebook OAuth login  
            window.location.href = '/api/auth/facebook';
        }

        function registerWithGoogle() {
            // Implement Google OAuth registration
            window.location.href = '/api/auth/google?register=true';
        }

        function registerWithFacebook() {
            // Implement Facebook OAuth registration
            window.location.href = '/api/auth/facebook?register=true';
        }
    <\/script>
</body>
</html>`,Li=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Love Dashboard - Better Together</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body { 
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .sidebar-item:hover {
            background: linear-gradient(135deg, #ff6b9d 0%, #8b5cf6 100%);
            transform: translateX(4px);
        }
        
        .metric-card {
            transition: all 0.3s ease;
        }
        
        .metric-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .progress-ring {
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
        }
        
        .mobile-menu-slide {
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
        }
        
        .mobile-menu-slide.open {
            transform: translateX(0);
        }
    </style>
</head>
<body>
    <!-- Mobile Header -->
    <div class="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center">
        <div class="flex items-center">
            <button id="mobileMenuToggle" class="mr-4 text-gray-600">
                <i class="fas fa-bars text-xl"></i>
            </button>
            <div class="flex items-center">
                <span class="text-xl mr-2">💕</span>
                <span class="font-semibold text-gray-800">Better Together</span>
            </div>
        </div>
        <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-semibold" id="userInitials">SJ</span>
            </div>
        </div>
    </div>

    <div class="flex min-h-screen">
        <!-- Sidebar -->
        <div id="sidebar" class="lg:w-64 bg-white shadow-lg lg:relative absolute inset-y-0 left-0 z-50 mobile-menu-slide">
            <div class="p-6 border-b">
                <div class="flex items-center">
                    <span class="text-2xl mr-3">💕</span>
                    <div>
                        <div class="font-semibold text-gray-800">Better Together</div>
                        <div class="text-xs text-gray-500 flex items-center">
                            <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span id="planType">Growing Together+</span>
                        </div>
                    </div>
                </div>
            </div>

            <nav class="p-4">
                <!-- User Profile Section -->
                <div class="mb-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                    <div class="flex items-center mb-3">
                        <div class="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                            <span class="text-white font-semibold" id="sidebarInitials">SJ</span>
                        </div>
                        <div>
                            <div class="font-semibold text-gray-800" id="userName">Sarah Johnson</div>
                            <div class="text-xs text-gray-500" id="userEmail">sarah@example.com</div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                        <span class="text-gray-600">Relationship Health</span>
                        <span class="font-semibold text-green-600" id="healthScore">92%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div class="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style="width: 92%"></div>
                    </div>
                </div>

                <!-- Navigation Items -->
                <div class="space-y-1">
                    <a href="#dashboard" onclick="showSection('dashboard')" class="sidebar-item flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all duration-200 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                        <i class="fas fa-home mr-3"></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="#assessments" onclick="showSection('assessments')" class="sidebar-item flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all duration-200">
                        <i class="fas fa-heart mr-3"></i>
                        <span>Love Assessments</span>
                    </a>
                    <a href="#ai-coach" onclick="showSection('ai-coach')" class="sidebar-item flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all duration-200">
                        <i class="fas fa-robot mr-3"></i>
                        <span>AI Coach</span>
                    </a>
                    <a href="#goals" onclick="showSection('goals')" class="sidebar-item flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all duration-200">
                        <i class="fas fa-bullseye mr-3"></i>
                        <span>Shared Goals</span>
                    </a>
                    <a href="#activities" onclick="showSection('activities')" class="sidebar-item flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all duration-200">
                        <i class="fas fa-calendar-heart mr-3"></i>
                        <span>Activities & Dates</span>
                    </a>
                    <a href="#challenges" onclick="showSection('challenges')" class="sidebar-item flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all duration-200">
                        <i class="fas fa-trophy mr-3"></i>
                        <span>Challenges</span>
                    </a>
                    <a href="#analytics" onclick="showSection('analytics')" class="sidebar-item flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all duration-200">
                        <i class="fas fa-chart-line mr-3"></i>
                        <span>Analytics</span>
                    </a>
                    <a href="#settings" onclick="showSection('settings')" class="sidebar-item flex items-center px-4 py-3 text-gray-700 rounded-lg transition-all duration-200">
                        <i class="fas fa-cog mr-3"></i>
                        <span>Settings</span>
                    </a>
                </div>

                <!-- Partner Section -->
                <div class="mt-8 pt-6 border-t">
                    <div class="mb-4">
                        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Partner</h3>
                    </div>
                    <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                        <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                            <span class="text-white font-semibold">MJ</span>
                        </div>
                        <div>
                            <div class="font-medium text-gray-800">Mike Johnson</div>
                            <div class="text-xs text-gray-500 flex items-center">
                                <div class="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                Online now
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Stats -->
                <div class="mt-6 space-y-3">
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-600">Current Streak</span>
                        <span class="font-semibold text-orange-600">12 days</span>
                    </div>
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-600">Goals Completed</span>
                        <span class="font-semibold text-green-600">8/10</span>
                    </div>
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-600">Date Nights</span>
                        <span class="font-semibold text-purple-600">24 this year</span>
                    </div>
                </div>

                <!-- Logout -->
                <div class="mt-8 pt-6 border-t">
                    <button onclick="logout()" class="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                        <i class="fas fa-sign-out-alt mr-3"></i>
                        <span>Sign Out</span>
                    </button>
                </div>
            </nav>
        </div>

        <!-- Mobile Overlay -->
        <div id="mobileOverlay" class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 hidden"></div>

        <!-- Main Content -->
        <div class="flex-1 lg:ml-0">
            <!-- Dashboard Section -->
            <div id="dashboard-section" class="p-6">
                <!-- Welcome Header -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-800 mb-2">Good morning, Sarah! 💕</h1>
                    <p class="text-gray-600">Your relationship is thriving. Here's what's happening today.</p>
                </div>

                <!-- Key Metrics -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="metric-card glass-card p-6 rounded-2xl shadow-lg">
                        <div class="flex items-center justify-between mb-4">
                            <div class="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
                                <i class="fas fa-heart text-white text-xl"></i>
                            </div>
                            <span class="text-xs text-gray-500">Today</span>
                        </div>
                        <div class="text-2xl font-bold text-gray-800 mb-1">9.2</div>
                        <div class="text-sm text-gray-600">Connection Score</div>
                        <div class="flex items-center mt-2">
                            <i class="fas fa-arrow-up text-green-500 text-xs mr-1"></i>
                            <span class="text-green-500 text-xs">+0.3 from yesterday</span>
                        </div>
                    </div>

                    <div class="metric-card glass-card p-6 rounded-2xl shadow-lg">
                        <div class="flex items-center justify-between mb-4">
                            <div class="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl">
                                <i class="fas fa-fire text-white text-xl"></i>
                            </div>
                            <span class="text-xs text-gray-500">Streak</span>
                        </div>
                        <div class="text-2xl font-bold text-gray-800 mb-1">12</div>
                        <div class="text-sm text-gray-600">Days in a Row</div>
                        <div class="flex items-center mt-2">
                            <i class="fas fa-calendar text-orange-500 text-xs mr-1"></i>
                            <span class="text-orange-500 text-xs">Daily check-ins</span>
                        </div>
                    </div>

                    <div class="metric-card glass-card p-6 rounded-2xl shadow-lg">
                        <div class="flex items-center justify-between mb-4">
                            <div class="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                                <i class="fas fa-bullseye text-white text-xl"></i>
                            </div>
                            <span class="text-xs text-gray-500">Progress</span>
                        </div>
                        <div class="text-2xl font-bold text-gray-800 mb-1">80%</div>
                        <div class="text-sm text-gray-600">Goals Complete</div>
                        <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div class="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style="width: 80%"></div>
                        </div>
                    </div>

                    <div class="metric-card glass-card p-6 rounded-2xl shadow-lg">
                        <div class="flex items-center justify-between mb-4">
                            <div class="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                                <i class="fas fa-trophy text-white text-xl"></i>
                            </div>
                            <span class="text-xs text-gray-500">Total</span>
                        </div>
                        <div class="text-2xl font-bold text-gray-800 mb-1">15</div>
                        <div class="text-sm text-gray-600">Achievements</div>
                        <div class="flex items-center mt-2">
                            <i class="fas fa-star text-yellow-500 text-xs mr-1"></i>
                            <span class="text-yellow-500 text-xs">Latest: Date Night Pro</span>
                        </div>
                    </div>
                </div>

                <!-- Today's Highlights -->
                <div class="grid lg:grid-cols-3 gap-6 mb-8">
                    <!-- Daily Check-in -->
                    <div class="glass-card p-6 rounded-2xl shadow-lg">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-sun text-yellow-500 mr-2"></i>
                            Daily Check-in
                        </h3>
                        <div class="space-y-4">
                            <div class="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                                <div class="text-sm font-medium text-gray-700 mb-2">How connected do you feel today?</div>
                                <div class="flex items-center space-x-2">
                                    <button class="w-8 h-8 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600 transition-colors">8</button>
                                    <div class="flex-1 text-xs text-gray-600">Feeling very connected!</div>
                                </div>
                            </div>
                            <button class="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-700 transition-all">
                                Complete Today's Check-in
                            </button>
                        </div>
                    </div>

                    <!-- Upcoming Activity -->
                    <div class="glass-card p-6 rounded-2xl shadow-lg">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-calendar-heart text-red-500 mr-2"></i>
                            Next Date Night
                        </h3>
                        <div class="space-y-3">
                            <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                                <div class="font-medium text-gray-800">Romantic Dinner</div>
                                <div class="text-sm text-gray-600">Friday, 7:00 PM</div>
                                <div class="text-xs text-blue-600 mt-1">Bella Vista Restaurant</div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                                    Edit Plans
                                </button>
                                <button class="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- AI Suggestion -->
                    <div class="glass-card p-6 rounded-2xl shadow-lg">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                            AI Suggestion
                        </h3>
                        <div class="space-y-3">
                            <div class="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                                <div class="text-sm text-gray-700">
                                    "Since Mike's been stressed at work, try cooking his favorite meal together tonight. It combines quality time with acts of service!"
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="flex-1 bg-yellow-100 text-yellow-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors">
                                    Love It!
                                </button>
                                <button class="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                                    Not Today
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity & Quick Actions -->
                <div class="grid lg:grid-cols-2 gap-6">
                    <!-- Recent Activity -->
                    <div class="glass-card p-6 rounded-2xl shadow-lg">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-between">
                            <span><i class="fas fa-clock text-blue-500 mr-2"></i>Recent Activity</span>
                            <a href="#" class="text-sm text-blue-600 hover:text-blue-700">View All</a>
                        </h3>
                        <div class="space-y-3">
                            <div class="flex items-center p-3 bg-green-50 rounded-lg">
                                <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                <div class="flex-1">
                                    <div class="text-sm font-medium text-gray-800">Completed goal: Weekly Date Night</div>
                                    <div class="text-xs text-gray-500">2 hours ago</div>
                                </div>
                                <i class="fas fa-check text-green-500"></i>
                            </div>
                            <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                                <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                <div class="flex-1">
                                    <div class="text-sm font-medium text-gray-800">Mike completed Love Languages quiz</div>
                                    <div class="text-xs text-gray-500">Yesterday</div>
                                </div>
                                <i class="fas fa-heart text-blue-500"></i>
                            </div>
                            <div class="flex items-center p-3 bg-purple-50 rounded-lg">
                                <div class="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                <div class="flex-1">
                                    <div class="text-sm font-medium text-gray-800">Started 30-Day Connection Challenge</div>
                                    <div class="text-xs text-gray-500">3 days ago</div>
                                </div>
                                <i class="fas fa-trophy text-purple-500"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="glass-card p-6 rounded-2xl shadow-lg">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            <i class="fas fa-zap text-yellow-500 mr-2"></i>Quick Actions
                        </h3>
                        <div class="grid grid-cols-2 gap-3">
                            <button class="p-4 bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 rounded-xl transition-all text-left">
                                <i class="fas fa-calendar-plus text-pink-600 text-xl mb-2"></i>
                                <div class="text-sm font-medium text-gray-800">Plan Date</div>
                            </button>
                            <button class="p-4 bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 rounded-xl transition-all text-left">
                                <i class="fas fa-comment text-blue-600 text-xl mb-2"></i>
                                <div class="text-sm font-medium text-gray-800">Ask AI Coach</div>
                            </button>
                            <button class="p-4 bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 rounded-xl transition-all text-left">
                                <i class="fas fa-bullseye text-green-600 text-xl mb-2"></i>
                                <div class="text-sm font-medium text-gray-800">Set Goal</div>
                            </button>
                            <button class="p-4 bg-gradient-to-r from-purple-100 to-violet-100 hover:from-purple-200 hover:to-violet-200 rounded-xl transition-all text-left">
                                <i class="fas fa-heart text-purple-600 text-xl mb-2"></i>
                                <div class="text-sm font-medium text-gray-800">Send Love</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Other Sections (Hidden by default) -->
            <div id="assessments-section" class="p-6 hidden">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">Love Assessments</h1>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Assessment cards will be dynamically generated -->
                </div>
            </div>

            <div id="ai-coach-section" class="p-6 hidden">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">AI Relationship Coach</h1>
                <!-- AI Coach interface will be here -->
            </div>

            <div id="goals-section" class="p-6 hidden">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">Shared Goals</h1>
                <!-- Goals management interface -->
            </div>

            <div id="activities-section" class="p-6 hidden">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">Activities & Date Nights</h1>
                <!-- Activities management interface -->
            </div>

            <div id="challenges-section" class="p-6 hidden">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">Relationship Challenges</h1>
                <!-- Challenges interface -->
            </div>

            <div id="analytics-section" class="p-6 hidden">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">Relationship Analytics</h1>
                <!-- Analytics dashboard -->
            </div>

            <div id="settings-section" class="p-6 hidden">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">Account Settings</h1>
                <!-- Settings interface -->
            </div>
        </div>
    </div>

    <script>
        // Mobile menu toggle
        document.getElementById('mobileMenuToggle').addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobileOverlay');
            
            sidebar.classList.toggle('open');
            overlay.classList.toggle('hidden');
        });

        document.getElementById('mobileOverlay').addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobileOverlay');
            
            sidebar.classList.remove('open');
            overlay.classList.add('hidden');
        });

        // Section switching
        function showSection(sectionName) {
            // Hide all sections
            const sections = ['dashboard', 'assessments', 'ai-coach', 'goals', 'activities', 'challenges', 'analytics', 'settings'];
            sections.forEach(section => {
                document.getElementById(section + '-section').classList.add('hidden');
            });

            // Show selected section
            document.getElementById(sectionName + '-section').classList.remove('hidden');

            // Update sidebar active state
            document.querySelectorAll('.sidebar-item').forEach(item => {
                item.classList.remove('bg-gradient-to-r', 'from-pink-500', 'to-purple-600', 'text-white');
                item.classList.add('text-gray-700');
            });

            event.target.closest('.sidebar-item').classList.add('bg-gradient-to-r', 'from-pink-500', 'to-purple-600', 'text-white');
            event.target.closest('.sidebar-item').classList.remove('text-gray-700');

            // Close mobile menu if open
            if (window.innerWidth < 1024) {
                document.getElementById('sidebar').classList.remove('open');
                document.getElementById('mobileOverlay').classList.add('hidden');
            }
        }

        // Load user data
        async function loadUserData() {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    window.location.href = '/login';
                    return;
                }

                const response = await fetch('/api/user/profile', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    updateUIWithUserData(userData);
                } else {
                    // Token might be expired
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        }

        function updateUIWithUserData(userData) {
            document.getElementById('userName').textContent = userData.name;
            document.getElementById('userEmail').textContent = userData.email;
            
            const initials = userData.name.split(' ').map(n => n[0]).join('').toUpperCase();
            document.getElementById('userInitials').textContent = initials;
            document.getElementById('sidebarInitials').textContent = initials;
            
            if (userData.subscription) {
                document.getElementById('planType').textContent = userData.subscription.plan_name;
            }
        }

        // Logout function
        function logout() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }

        // Initialize dashboard
        document.addEventListener('DOMContentLoaded', function() {
            loadUserData();
        });
    <\/script>
</body>
</html>`,K=new jt,Bt=()=>{const e=new Date,t=[],a=[];for(let i=11;i>=0;i--){const r=new Date(e.getFullYear(),e.getMonth()-i,1),l=3e4+(11-i)*2e3,n=Math.floor(Math.random()*1e3);t.push({month:r.toLocaleDateString("en-US",{month:"short"}),users:l+n,growth:i===11?0:Math.floor(Math.random()*15)+5})}for(let i=11;i>=0;i--){const r=new Date(e.getFullYear(),e.getMonth()-i,1),l=400+(11-i)*40,n=Math.floor(Math.random()*50);a.push({month:r.toLocaleDateString("en-US",{month:"short"}),revenue:l+n,partners:50+(11-i)*40+Math.floor(Math.random()*20)})}return{userGrowthData:t,revenueData:a,featureUsageData:[{name:"Relationship Challenges",usage:35,engagement:87,users:12500},{name:"Date Night Planner",usage:25,engagement:73,users:8200},{name:"Communication Tools",usage:20,engagement:91,users:45e3},{name:"Member Rewards",usage:12,engagement:89,users:22e3},{name:"Local Discovery",usage:8,engagement:76,users:15e3}]}};K.get("/overview",e=>{const t=new Date,a=Math.random()*.1-.05;return e.json({totalUsers:Math.floor(50247*(1+a)),engagedCouples:Math.floor(25124*(1+a)),partnerRevenue:Math.floor(847*(1+a)),appSessions:Number((1.2*(1+a)).toFixed(1)),growthMetrics:{usersGrowth:"+12.5%",couplesGrowth:"+8.7%",revenueGrowth:"+34.2%",sessionsGrowth:"+19.3%"},lastUpdated:t.toISOString()})});K.get("/users",e=>{const t=Bt();return e.json({growth:t.userGrowthData,demographics:{ageGroups:[{range:"18-24",percentage:15,count:7537},{range:"25-34",percentage:45,count:22611},{range:"35-44",percentage:28,count:14069},{range:"45-54",percentage:10,count:5025},{range:"55+",percentage:2,count:1005}],locations:[{city:"San Francisco",users:8245,percentage:16.4},{city:"New York",users:7521,percentage:15},{city:"Los Angeles",users:6234,percentage:12.4},{city:"Chicago",users:4521,percentage:9},{city:"Seattle",users:3876,percentage:7.7}]},engagement:{dailyActiveUsers:18234,weeklyActiveUsers:32456,monthlyActiveUsers:50247,averageSessionDuration:"12.5 minutes",sessionsPerUser:4.8}})});K.get("/revenue",e=>{const t=Bt();return e.json({monthly:t.revenueData,breakdown:{partnerCommissions:678e3,subscriptions:89e3,premiumFeatures:45e3,other:35e3},topPartners:[{name:"Bella Vista Restaurant",category:"Dining",revenue:25400,growth:"+15%"},{name:"Sunset Spa Resort",category:"Wellness",revenue:18900,growth:"+22%"},{name:"Adventure Tours Co",category:"Activities",revenue:16700,growth:"+8%"},{name:"Fine Jewelry Studio",category:"Gifts",revenue:14200,growth:"+31%"},{name:"Boutique Hotel Chain",category:"Travel",revenue:12800,growth:"+12%"}],metrics:{averageOrderValue:156,conversionRate:3.4,customerLifetimeValue:420,repeatPurchaseRate:68}})});K.get("/features",e=>{const t=Bt();return e.json({usage:t.featureUsageData,adoption:{relationshipChallenges:{totalUsers:12500,completionRate:87,averageTimeSpent:"8.5 minutes",topChallenges:["Date Night Planning","Communication Skills","Shared Goals"]},dateNightPlanner:{totalUsers:8200,plansCreated:15600,executionRate:73,averageRating:4.6},memberRewards:{totalUsers:22e3,creditsEarned:124e4,creditsRedeemed:89e4,redemptionRate:72,averageSpend:2400},communicationTools:{totalUsers:45e3,messagesPerDay:125e3,voiceNotesPerDay:8900,calendarEventsCreated:3400}},heatmap:[{hour:0,activity:15},{hour:1,activity:8},{hour:2,activity:5},{hour:3,activity:3},{hour:4,activity:2},{hour:5,activity:5},{hour:6,activity:25},{hour:7,activity:45},{hour:8,activity:65},{hour:9,activity:72},{hour:10,activity:68},{hour:11,activity:75},{hour:12,activity:85},{hour:13,activity:78},{hour:14,activity:70},{hour:15,activity:65},{hour:16,activity:68},{hour:17,activity:75},{hour:18,activity:88},{hour:19,activity:95},{hour:20,activity:92},{hour:21,activity:85},{hour:22,activity:70},{hour:23,activity:45}]})});K.get("/partners",e=>e.json({summary:{totalPartners:542,activePartners:487,newThisMonth:23,churnRate:2.1},categories:[{name:"Dining",count:342,revenue:425e3,growth:"+15%"},{name:"Travel",count:187,revenue:298e3,growth:"+22%"},{name:"Gifts",count:156,revenue:178e3,growth:"+8%"},{name:"Wellness",count:124,revenue:145e3,growth:"+31%"},{name:"Entertainment",count:98,revenue:89e3,growth:"+12%"},{name:"Activities",count:87,revenue:76e3,growth:"+18%"}],performance:{topPerforming:[{name:"Bella Vista Restaurant",bookings:456,rating:4.8,revenue:25400},{name:"Sunset Spa Resort",bookings:234,rating:4.9,revenue:18900},{name:"Adventure Tours Co",bookings:187,rating:4.7,revenue:16700}],metrics:{averageRating:4.6,bookingConversion:12.4,repeatBookingRate:34,customerSatisfaction:89}},geographic:[{region:"San Francisco Bay",partners:124,revenue:234e3},{region:"New York Metro",partners:98,revenue:187e3},{region:"Los Angeles",partners:87,revenue:156e3},{region:"Chicago",partners:65,revenue:123e3},{region:"Seattle",partners:54,revenue:98e3}]}));K.get("/activity",e=>{const t=[{type:"user_join",icon:"fas fa-heart",color:"text-pink-400",message:"New couple joined from San Francisco",timestamp:new Date},{type:"challenge_complete",icon:"fas fa-trophy",color:"text-yellow-400",message:'Challenge completed: "Date Night Planning"',timestamp:new Date(Date.now()-12e4)},{type:"partner_join",icon:"fas fa-handshake",color:"text-blue-400",message:'New partner registered: "Bella Vista Restaurant"',timestamp:new Date(Date.now()-3e5)},{type:"reward_redeem",icon:"fas fa-gift",color:"text-green-400",message:"Reward redeemed: 25% off spa package",timestamp:new Date(Date.now()-42e4)},{type:"tier_achievement",icon:"fas fa-star",color:"text-purple-400",message:"Couple achieved Silver tier status",timestamp:new Date(Date.now()-72e4)},{type:"date_planned",icon:"fas fa-calendar",color:"text-blue-400",message:"Date night planned: Romantic dinner for two",timestamp:new Date(Date.now()-9e5)},{type:"milestone",icon:"fas fa-medal",color:"text-orange-400",message:"6-month anniversary milestone reached",timestamp:new Date(Date.now()-108e4)},{type:"booking",icon:"fas fa-ticket-alt",color:"text-indigo-400",message:"Spa day booking confirmed",timestamp:new Date(Date.now()-132e4)}];return e.json({activities:t.map(a=>({...a,timeAgo:_i(a.timestamp)}))})});K.get("/system",e=>e.json({health:{status:"healthy",uptime:"99.98%",responseTime:"142ms",errorRate:"0.02%"},infrastructure:{cloudflareEdge:{status:"operational",cacheHitRate:"94.2%",edgeLocations:275},database:{status:"optimal",connectionPool:"87% utilized",queryTime:"23ms average"},api:{status:"healthy",requestsPerSecond:342,peakRPS:1250}},performance:{pageLoadTime:"1.2s",mobileScore:94,desktopScore:98,seoScore:95}}));K.get("/export",e=>{const t={timestamp:new Date().toISOString(),summary:{totalUsers:50247,engagedCouples:25124,partnerRevenue:847e3,appSessions:12e5},features:[{name:"Relationship Challenges",activeUsers:12500,engagement:87},{name:"Date Night Planner",activeUsers:8200,engagement:73},{name:"Communication Tools",activeUsers:45e3,engagement:91},{name:"Member Rewards",activeUsers:22e3,engagement:89},{name:"Local Discovery",activeUsers:15e3,engagement:76}],partners:{total:542,categories:["Dining","Travel","Gifts","Wellness","Entertainment","Activities"],topRevenue:847e3}};return e.header("Content-Type","application/json"),e.header("Content-Disposition","attachment; filename=better-together-analytics.json"),e.json(t)});function _i(e){const a=Math.floor((new Date().getTime()-e.getTime())/(1e3*60));if(a<1)return"now";if(a<60)return`${a}m ago`;const i=Math.floor(a/60);return i<24?`${i}h ago`:`${Math.floor(i/24)}d ago`}function X(){return crypto.randomUUID()}function Fi(e,t){const a=new Date(e),i=new Date(t),r=Math.abs(i.getTime()-a.getTime());return Math.ceil(r/(1e3*60*60*24))}function le(){return new Date().toISOString().split("T")[0]}function $(){return new Date().toISOString()}function Js(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function Ks(e,t){return e.user_1_id===t?e.user_2_id:e.user_1_id}function Oi(e,t,a,i){const d=e/10*100,c=t/10*100,m=Math.min(a*10,100),x=i*100;return Math.round(d*.3+c*.3+m*.2+x*.2)}async function Xs(e,t){return await e.DB.prepare("SELECT * FROM users WHERE email = ?").bind(t).first()}async function ge(e,t){return await e.DB.prepare("SELECT * FROM users WHERE id = ?").bind(t).first()}async function Mt(e,t){return await e.DB.prepare('SELECT * FROM relationships WHERE (user_1_id = ? OR user_2_id = ?) AND status = "active"').bind(t,t).first()}async function qi(e,t,a){const i=le();return await e.DB.prepare("SELECT id FROM daily_checkins WHERE relationship_id = ? AND user_id = ? AND checkin_date = ?").bind(t,a,i).first()!==null}async function Dt(e,t){const a=await e.DB.prepare(`
    SELECT DISTINCT checkin_date 
    FROM daily_checkins 
    WHERE relationship_id = ? 
    ORDER BY checkin_date DESC
    LIMIT 100
  `).bind(t).all();if(!a.results||a.results.length===0)return 0;const i=a.results.map(o=>new Date(o.checkin_date)),r=new Date;r.setHours(0,0,0,0);let l=0,n=new Date(r);for(const o of i)if(o.setHours(0,0,0,0),o.getTime()===n.getTime())l++,n.setDate(n.getDate()-1);else break;return l}async function $i(e,t){const a=le(),i=new Date;i.setDate(i.getDate()+30);const r=i.toISOString().split("T")[0];return(await e.DB.prepare(`
    SELECT * FROM important_dates 
    WHERE relationship_id = ? 
    AND date_value BETWEEN ? AND ?
    ORDER BY date_value ASC
  `).bind(t,a,r).all()).results||[]}async function Hi(e,t,a){const i=[],r=await Dt(e,t);return r===7&&(await ts(e,t,"week_streak",a),i.push("week_streak")),r===30&&(await ts(e,t,"month_streak",a),i.push("month_streak")),i}async function ts(e,t,a,i){try{await e.DB.prepare(`
      INSERT OR IGNORE INTO user_achievements (id, relationship_id, achievement_id, earned_by_user_id)
      VALUES (?, ?, ?, ?)
    `).bind(X(),t,a,i||null).run()}catch(r){console.error("Error awarding achievement:",r)}}async function Ui(e,t,a,i,r,l,n){try{await e.DB.prepare(`
      INSERT INTO notifications (id, user_id, relationship_id, notification_type, title, message, action_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(X(),t,l||null,a,i,r,n||null).run()}catch(o){console.error("Error sending notification:",o)}}async function Qs(e,t){const a=le(),i=new Date;i.setDate(i.getDate()-30);const r=i.toISOString().split("T")[0],l=await e.DB.prepare("SELECT start_date FROM relationships WHERE id = ?").bind(t).first(),n=l!=null&&l.start_date?Fi(l.start_date,a):0,o=await e.DB.prepare(`
    SELECT 
      AVG(connection_score) as avg_connection,
      AVG(relationship_satisfaction) as avg_satisfaction,
      COUNT(*) as checkin_count
    FROM daily_checkins 
    WHERE relationship_id = ? 
    AND checkin_date >= ?
  `).bind(t,r).first(),d=await e.DB.prepare(`
    SELECT COUNT(*) as count 
    FROM activities 
    WHERE relationship_id = ? 
    AND status = 'completed'
    AND completed_date >= ?
  `).bind(t,r).first(),c=await e.DB.prepare(`
    SELECT COUNT(*) as count 
    FROM shared_goals 
    WHERE relationship_id = ? 
    AND status = 'completed'
    AND completion_date >= ?
  `).bind(t,r).first(),m=await Dt(e,t),x=Number((o==null?void 0:o.avg_connection)||0),u=Number((o==null?void 0:o.avg_satisfaction)||0),f=Number((o==null?void 0:o.checkin_count)||0),h=Number((c==null?void 0:c.count)||0)/30,g=Oi(x,u,f,h);return{days_together:n,average_connection_score:x,average_satisfaction_score:u,checkin_streak:m,activities_completed_this_month:Number((d==null?void 0:d.count)||0),goals_completed_this_month:Number((c==null?void 0:c.count)||0),communication_frequency_score:f,overall_health_score:g}}const H=`
<!-- Consistent Navigation - Better Together Branding -->
<nav class="bg-white shadow-sm border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16">
            <div class="flex items-center">
                <a href="/" class="flex items-center hover:scale-105 transition-transform duration-300">
                    <span class="text-xl sm:text-2xl">💕</span>
                    <span class="ml-2 text-lg sm:text-xl font-bold text-gray-900">Better Together</span>
                </a>
            </div>
            <div class="hidden md:flex items-center space-x-6 lg:space-x-8">
                <a href="/#features" class="text-gray-600 hover:text-pink-600 transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105">Features</a>
                <a href="/mobile-ui.html" class="text-gray-600 hover:text-pink-600 transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105">iOS Design</a>
                <a href="/iphone-examples.html" class="text-gray-600 hover:text-pink-600 transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105">Live Examples</a>
                <a href="/member-rewards.html" class="text-gray-600 hover:text-pink-600 transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105">Rewards</a>
                <a href="/#pricing" class="text-gray-600 hover:text-pink-600 transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105">Pricing</a>
                <button class="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base">
                    <span class="flex items-center">
                        <i class="fas fa-heart mr-2 animate-pulse"></i>
                        Start Free Trial
                    </span>
                </button>
            </div>
            <div class="md:hidden">
                <button class="text-gray-600 hover:text-gray-900 p-2" id="mobileMenuButton">
                    <i class="fas fa-bars text-lg"></i>
                </button>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div id="mobileMenu" class="hidden md:hidden pb-4 transform transition-all duration-300">
            <div class="flex flex-col space-y-3 bg-gradient-to-b from-white to-pink-50 p-4 rounded-lg shadow-lg">
                <a href="/#features" class="text-gray-600 hover:text-pink-600 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-pink-50 font-medium">
                    <i class="fas fa-heart mr-3 text-pink-500"></i>Features
                </a>
                <a href="/mobile-ui.html" class="text-gray-600 hover:text-pink-600 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-pink-50 font-medium">
                    <i class="fas fa-mobile-alt mr-3 text-purple-500"></i>iOS Design
                </a>
                <a href="/iphone-examples.html" class="text-gray-600 hover:text-pink-600 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-pink-50 font-medium">
                    <i class="fas fa-play-circle mr-3 text-blue-500"></i>Live Examples
                </a>
                <a href="/member-rewards.html" class="text-gray-600 hover:text-pink-600 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-pink-50 font-medium">
                    <i class="fas fa-gift mr-3 text-green-500"></i>Rewards
                </a>
                <a href="/#pricing" class="text-gray-600 hover:text-pink-600 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-pink-50 font-medium">
                    <i class="fas fa-tag mr-3 text-yellow-500"></i>Pricing
                </a>
                <button class="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-4 rounded-full font-semibold hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300 w-full mt-4">
                    <span class="flex items-center justify-center">
                        <i class="fas fa-heart mr-2 animate-pulse"></i>
                        Start Free Trial
                    </span>
                </button>
            </div>
        </div>
    </div>
</nav>

<!-- Mobile Menu JavaScript -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function() {
                const isHidden = mobileMenu.classList.contains('hidden');
                if (isHidden) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.style.transform = 'translateY(-10px)';
                    mobileMenu.style.opacity = '0';
                    setTimeout(() => {
                        mobileMenu.style.transform = 'translateY(0)';
                        mobileMenu.style.opacity = '1';
                    }, 10);
                } else {
                    mobileMenu.style.transform = 'translateY(-10px)';
                    mobileMenu.style.opacity = '0';
                    setTimeout(() => {
                        mobileMenu.classList.add('hidden');
                    }, 300);
                }
                
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
                }
            });
        }
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu?.querySelectorAll('a');
        if (mobileLinks) {
            mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.style.transform = 'translateY(-10px)';
                    mobileMenu.style.opacity = '0';
                    setTimeout(() => {
                        mobileMenu.classList.add('hidden');
                    }, 300);
                });
            });
        }
        
        // Close mobile menu on resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && mobileMenu) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton?.querySelector('i');
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });
<\/script>
`,Gi=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Coach - Your 24/7 Relationship Expert | Better Together</title>
    <meta name="description" content="Meet your AI relationship coach that provides personalized guidance, solves conflicts, and helps couples grow stronger together 24/7.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d'
                        }
                    }
                }
            }
        }
    <\/script>
</head>
<body class="bg-gray-50">
    ${H}

    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-primary-50 to-purple-50 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="flex justify-center mb-6">
                <div class="bg-primary-100 p-4 rounded-full">
                    <i class="fas fa-robot text-4xl text-primary-600"></i>
                </div>
            </div>
            <h1 class="text-5xl font-bold text-gray-900 mb-6">
                Your AI Relationship Coach
            </h1>
            <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Available 24/7 to guide conversations, resolve conflicts, and help your relationship grow stronger. 
                Get personalized advice based on your unique situation and communication styles.
            </p>
            <div class="flex justify-center space-x-4">
                <button class="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                    <i class="fas fa-comments mr-2"></i>Start Chatting
                </button>
                <button class="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                    <i class="fas fa-play mr-2"></i>See Demo
                </button>
            </div>
        </div>
    </div>

    <!-- How It Works -->
    <div class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">How Your AI Coach Helps Daily</h2>
                <p class="text-xl text-gray-600">Real scenarios from real couples</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Morning Guidance -->
                <div class="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-sun text-2xl text-yellow-600 mr-3"></i>
                        <h3 class="text-xl font-semibold text-gray-900">Morning Guidance</h3>
                    </div>
                    <div class="bg-white p-4 rounded-lg mb-4 shadow-sm">
                        <p class="text-gray-700 italic">
                            "We had a fight last night about money. How should I approach Sarah this morning?"
                        </p>
                    </div>
                    <div class="bg-yellow-100 p-4 rounded-lg">
                        <p class="text-gray-800">
                            <strong>AI Coach:</strong> Start with acknowledging her feelings. Try: "Sarah, I've been thinking about our conversation last night. I know money stress affects us both, and I want to understand your perspective better."
                        </p>
                    </div>
                    <div class="mt-4 flex items-center text-sm text-gray-600">
                        <i class="fas fa-clock mr-2"></i>
                        <span>7:30 AM - Before work conversation</span>
                    </div>
                </div>

                <!-- Conflict Resolution -->
                <div class="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-2xl">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-heart text-2xl text-red-500 mr-3"></i>
                        <h3 class="text-xl font-semibold text-gray-900">Real-Time Support</h3>
                    </div>
                    <div class="bg-white p-4 rounded-lg mb-4 shadow-sm">
                        <p class="text-gray-700 italic">
                            "We're arguing right now about whose turn it is to do dishes. This always escalates!"
                        </p>
                    </div>
                    <div class="bg-red-100 p-4 rounded-lg">
                        <p class="text-gray-800">
                            <strong>AI Coach:</strong> Stop the cycle. Take 3 deep breaths together. This isn't about dishes - it's about feeling appreciated. Try: "Let's pause this and talk about what we both need to feel supported."
                        </p>
                    </div>
                    <div class="mt-4 flex items-center text-sm text-gray-600">
                        <i class="fas fa-bolt mr-2"></i>
                        <span>Instant de-escalation techniques</span>
                    </div>
                </div>

                <!-- Evening Connection -->
                <div class="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-moon text-2xl text-purple-600 mr-3"></i>
                        <h3 class="text-xl font-semibold text-gray-900">Evening Connection</h3>
                    </div>
                    <div class="bg-white p-4 rounded-lg mb-4 shadow-sm">
                        <p class="text-gray-700 italic">
                            "We barely talked today. How can we reconnect before bed?"
                        </p>
                    </div>
                    <div class="bg-purple-100 p-4 rounded-lg">
                        <p class="text-gray-800">
                            <strong>AI Coach:</strong> Try the "3 Things" ritual: Share 3 things - something that went well, something challenging, and something you appreciated about each other today.
                        </p>
                    </div>
                    <div class="mt-4 flex items-center text-sm text-gray-600">
                        <i class="fas fa-heart mr-2"></i>
                        <span>10 PM - Relationship check-in</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- AI Features -->
    <div class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Intelligent Coaching Features</h2>
                <p class="text-xl text-gray-600">Powered by advanced relationship psychology</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-brain text-blue-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Learns Your Style</h3>
                    <p class="text-gray-600">Adapts to how you and your partner communicate best</p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-comments text-green-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Natural Conversation</h3>
                    <p class="text-gray-600">Chat like you would with a close friend who understands relationships</p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-clock text-yellow-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">24/7 Available</h3>
                    <p class="text-gray-600">Get support whenever you need it, day or night</p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-shield-alt text-purple-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Private & Secure</h3>
                    <p class="text-gray-600">Your conversations stay completely confidential</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Conversation Examples -->
    <div class="py-20 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Real AI Conversations</h2>
                <p class="text-xl text-gray-600">See how our AI coach handles real relationship challenges</p>
            </div>

            <div class="space-y-8">
                <!-- Conversation 1 -->
                <div class="bg-gray-50 p-6 rounded-xl">
                    <div class="flex items-start space-x-4 mb-4">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-blue-600"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-gray-800 bg-white p-4 rounded-lg shadow-sm">
                                "My partner never seems to hear what I'm actually saying. We keep having the same arguments over and over. I'm feeling really frustrated and don't know how to break this cycle."
                            </p>
                        </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                        <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-robot text-primary-600"></i>
                        </div>
                        <div class="flex-1">
                            <div class="bg-primary-50 p-4 rounded-lg">
                                <p class="text-gray-800 mb-3">
                                    <strong>AI Coach:</strong> That repetitive cycle is so draining, and your frustration makes complete sense. Let's break this pattern together.
                                </p>
                                <p class="text-gray-800 mb-3">
                                    First, this usually happens when both people feel unheard. Here's a technique that works well:
                                </p>
                                <div class="bg-white p-3 rounded-lg mb-3">
                                    <p class="text-gray-800">
                                        <strong>Next time, try this:</strong><br>
                                        1. Start with "I notice we keep coming back to this. Can we try something different?"<br>
                                        2. Then: "I'd like to understand your perspective first. Can you help me see this from your side?"<br>
                                        3. Listen without planning your response<br>
                                        4. Repeat back what you heard before sharing your view
                                    </p>
                                </div>
                                <p class="text-gray-800">
                                    Would you like me to help you practice how to bring this up, or would you prefer to focus on understanding why these cycles happen?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Conversation 2 -->
                <div class="bg-gray-50 p-6 rounded-xl">
                    <div class="flex items-start space-x-4 mb-4">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-blue-600"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-gray-800 bg-white p-4 rounded-lg shadow-sm">
                                "We've been together for 3 years and things feel... routine. We love each other but the spark seems to be fading. How do we get that excitement back?"
                            </p>
                        </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                        <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-robot text-primary-600"></i>
                        </div>
                        <div class="flex-1">
                            <div class="bg-primary-50 p-4 rounded-lg">
                                <p class="text-gray-800 mb-3">
                                    <strong>AI Coach:</strong> Three years is actually when many couples notice this shift - you're not alone! The good news is that long-term excitement is totally achievable, just different from the early butterflies.
                                </p>
                                <div class="bg-white p-3 rounded-lg mb-3">
                                    <p class="text-gray-800">
                                        <strong>The "spark" evolves through three phases:</strong><br>
                                        🔥 <strong>Passion (0-2 years):</strong> Intense, unpredictable<br>
                                        💚 <strong>Intimacy (2-5 years):</strong> Deep connection, comfort<br>
                                        💎 <strong>Commitment (5+ years):</strong> Chosen love, partnership
                                    </p>
                                </div>
                                <p class="text-gray-800 mb-3">
                                    You're transitioning to phase 2, which can feel less intense but offers something beautiful: deep security plus intentional excitement.
                                </p>
                                <div class="bg-white p-3 rounded-lg mb-3">
                                    <p class="text-gray-800">
                                        <strong>Try this week:</strong><br>
                                        • Plan one "first time" experience together (new restaurant, activity, etc.)<br>
                                        • Ask each other: "What's one thing about me you've discovered recently?"<br>
                                        • Set aside 20 minutes for uninterrupted conversation about dreams/goals
                                    </p>
                                </div>
                                <p class="text-gray-800">
                                    What type of activities used to excite you both in the early days? Let's build on those patterns.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Budget-Aware Coaching -->
    <div class="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Budget-Smart Relationship Coaching</h2>
                <p class="text-xl text-gray-600">Great advice doesn't require spending money</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Free Coaching -->
                <div class="bg-white p-8 rounded-2xl shadow-sm">
                    <div class="flex items-center mb-6">
                        <div class="bg-green-100 p-3 rounded-full mr-4">
                            <i class="fas fa-gift text-green-600 text-xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900">$0 Coaching</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="p-4 bg-green-50 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">Home Date Night Ideas</h4>
                            <p class="text-gray-700">"Cook a meal from your childhood together and share stories from that time"</p>
                        </div>
                        <div class="p-4 bg-green-50 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">Communication Exercises</h4>
                            <p class="text-gray-700">"Try the 20-question game: Ask deeper questions you've never asked before"</p>
                        </div>
                        <div class="p-4 bg-green-50 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">Appreciation Rituals</h4>
                            <p class="text-gray-700">"Write 3 specific things you appreciate about each other every Sunday"</p>
                        </div>
                    </div>
                </div>

                <!-- Budget Coaching -->
                <div class="bg-white p-8 rounded-2xl shadow-sm">
                    <div class="flex items-center mb-6">
                        <div class="bg-blue-100 p-3 rounded-full mr-4">
                            <i class="fas fa-wallet text-blue-600 text-xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900">$20-50 Coaching</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="p-4 bg-blue-50 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">Meaningful Experiences</h4>
                            <p class="text-gray-700">"Visit a local museum during free hours and discuss what art speaks to you both"</p>
                        </div>
                        <div class="p-4 bg-blue-50 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">Growth Activities</h4>
                            <p class="text-gray-700">"Take a couples' online course together ($25) and discuss insights weekly"</p>
                        </div>
                        <div class="p-4 bg-blue-50 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">Adventure Planning</h4>
                            <p class="text-gray-700">"Plan a local hiking trip with a picnic - focus on exploring together"</p>
                        </div>
                    </div>
                </div>

                <!-- Investment Coaching -->
                <div class="bg-white p-8 rounded-2xl shadow-sm">
                    <div class="flex items-center mb-6">
                        <div class="bg-purple-100 p-3 rounded-full mr-4">
                            <i class="fas fa-star text-purple-600 text-xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900">$100+ Coaching</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="p-4 bg-purple-50 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">Professional Growth</h4>
                            <p class="text-gray-700">"Invest in couples therapy sessions when AI coaching identifies deeper patterns to address"</p>
                        </div>
                        <div class="p-4 bg-purple-50 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">Relationship Retreats</h4>
                            <p class="text-gray-700">"Weekend getaway focused on relationship goals and intimate conversations"</p>
                        </div>
                        <div class="p-4 bg-purple-50 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">Skill Building</h4>
                            <p class="text-gray-700">"Enroll in workshops for communication, intimacy, or conflict resolution"</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- CTA Section -->
    <div class="py-20 bg-primary-600">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-4xl font-bold text-white mb-6">
                Start Your AI Coaching Journey Today
            </h2>
            <p class="text-xl text-primary-100 mb-8">
                Join thousands of couples who are growing stronger together with personalized AI guidance
            </p>
            <div class="flex justify-center space-x-4">
                <button class="bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
                    <i class="fas fa-comments mr-2"></i>Start Free Coaching
                </button>
                <button class="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-semibold text-lg">
                    <i class="fas fa-calendar mr-2"></i>Schedule Demo
                </button>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <div class="flex justify-center items-center mb-6">
                    <span class="text-2xl mr-2">💕</span>
                    <span class="text-xl font-bold">Better Together</span>
                </div>
                <p class="mb-6">Building stronger relationships through AI-powered coaching</p>
                <div class="flex justify-center space-x-6">
                    <a href="/ai-coach.html" class="text-primary-400 hover:text-primary-300">AI Coach</a>
                    <a href="/smart-scheduling.html" class="hover:text-white">Smart Scheduling</a>
                    <a href="/intelligent-suggestions.html" class="hover:text-white">Suggestions</a>
                    <a href="/" class="hover:text-white">Home</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Simple interaction handlers
        document.addEventListener('DOMContentLoaded', function() {
            // Add smooth scrolling to internal links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        });
    <\/script>
</body>
</html>`,zi=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iPhone App Design - Better Together Mobile Experience</title>
    <meta name="description" content="See how Better Together looks and feels on iPhone with these realistic mobile UI/UX mockups showing the complete user journey.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d'
                        }
                    },
                    fontFamily: {
                        'sf': ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'system-ui', 'sans-serif']
                    }
                }
            }
        }
    <\/script>
    <style>
        .iphone-frame {
            width: 300px;
            height: 620px;
            background: #1c1c1e;
            border-radius: 45px;
            padding: 12px;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .iphone-screen {
            width: 100%;
            height: 100%;
            background: #000;
            border-radius: 35px;
            position: relative;
            overflow: hidden;
        }
        .iphone-notch {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 140px;
            height: 28px;
            background: #000;
            border-radius: 0 0 16px 16px;
            z-index: 20;
        }
        .screen-content {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #f8fafc;
            padding-top: 35px;
            overflow: hidden;
            font-size: 11px;
        }
        .status-bar {
            position: absolute;
            top: 10px;
            left: 22px;
            right: 22px;
            height: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 10px;
            font-weight: 600;
            color: #000;
            z-index: 21;
        }
        .app-interface {
            height: 100%;
            display: flex;
            flex-direction: column;
            font-size: 11px;
        }
        .mock-input {
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 8px 10px;
            font-size: 10px;
        }
        .chat-bubble-user {
            background: #007AFF;
            color: white;
            margin-left: auto;
            margin-right: 0;
            border-radius: 12px 12px 3px 12px;
            max-width: 70%;
        }
        .chat-bubble-ai {
            background: #e5e7eb;
            color: #1f2937;
            margin-right: auto;
            margin-left: 0;
            border-radius: 12px 12px 12px 3px;
            max-width: 75%;
        }
        .tab-active {
            color: #007AFF;
        }
        .heart-beat {
            animation: heartbeat 2s ease-in-out infinite;
        }
        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        .mobile-text-xs { font-size: 8px; }
        .mobile-text-sm { font-size: 10px; }
        .mobile-text-base { font-size: 11px; }
        .mobile-text-lg { font-size: 12px; }
        .mobile-text-xl { font-size: 14px; }
        .mobile-text-2xl { font-size: 16px; }
        .mobile-text-3xl { font-size: 18px; }
        .mobile-text-4xl { font-size: 20px; }
        
        .mobile-h1 { font-size: 14px; font-weight: bold; }
        .mobile-h2 { font-size: 12px; font-weight: bold; }
        .mobile-h3 { font-size: 11px; font-weight: 600; }
        .mobile-p { font-size: 9px; }
        .mobile-small { font-size: 8px; }
        
        .mobile-px-1 { padding-left: 2px; padding-right: 2px; }
        .mobile-px-2 { padding-left: 4px; padding-right: 4px; }
        .mobile-px-3 { padding-left: 6px; padding-right: 6px; }
        .mobile-px-4 { padding-left: 8px; padding-right: 8px; }
        .mobile-px-6 { padding-left: 12px; padding-right: 12px; }
        .mobile-py-1 { padding-top: 2px; padding-bottom: 2px; }
        .mobile-py-2 { padding-top: 4px; padding-bottom: 4px; }
        .mobile-py-3 { padding-top: 6px; padding-bottom: 6px; }
        .mobile-py-4 { padding-top: 8px; padding-bottom: 8px; }
        
        .mobile-mb-1 { margin-bottom: 2px; }
        .mobile-mb-2 { margin-bottom: 4px; }
        .mobile-mb-3 { margin-bottom: 6px; }
        .mobile-mb-4 { margin-bottom: 8px; }
        .mobile-mb-6 { margin-bottom: 12px; }
        
        .mobile-w-6 { width: 12px; }
        .mobile-h-6 { height: 12px; }
        .mobile-w-8 { width: 16px; }
        .mobile-h-8 { height: 16px; }
        .mobile-w-10 { width: 20px; }
        .mobile-h-10 { height: 20px; }
        
        .mobile-rounded { border-radius: 4px; }
        .mobile-rounded-lg { border-radius: 6px; }
        .mobile-rounded-xl { border-radius: 8px; }
        .mobile-rounded-full { border-radius: 50%; }
        
        .waitlist-form {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
    </style>
</head>
<body class="bg-gray-50 font-sf">
    ${H}

    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-primary-50 to-purple-50 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="flex justify-center mb-6">
                <div class="bg-primary-100 p-4 rounded-full">
                    <i class="fas fa-mobile-alt text-4xl text-primary-600"></i>
                </div>
            </div>
            <h1 class="text-5xl font-bold text-gray-900 mb-6">
                iPhone App Design Preview
            </h1>
            <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Experience how Better Together feels in your pocket. Beautifully designed for iOS with 
                intuitive navigation and seamless AI coaching conversations.
            </p>
            <div class="flex justify-center space-x-4">
                <button class="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                    <i class="fas fa-download mr-2"></i>Download for iOS
                </button>
                <button class="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                    <i class="fas fa-eye mr-2"></i>View Design System
                </button>
            </div>
        </div>
    </div>

    <!-- Main App Screens -->
    <div class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Complete User Journey</h2>
                <p class="text-xl text-gray-600">From onboarding to daily coaching - every interaction designed with care</p>
            </div>

            <!-- Onboarding Flow -->
            <div class="mb-20">
                <h3 class="text-2xl font-bold text-center text-gray-900 mb-12">Onboarding & Setup</h3>
                <div class="flex justify-center space-x-8 flex-wrap gap-8">
                    <!-- Welcome Screen -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-gradient-to-br from-primary-500 to-purple-600 text-white relative">
                                    <div class="absolute inset-0 bg-black opacity-10"></div>
                                    <div class="relative z-10 flex flex-col items-center justify-center h-full mobile-px-6">
                                        <div class="mobile-text-4xl mobile-mb-4 heart-beat">💕</div>
                                        <h1 class="mobile-text-xl font-bold mobile-mb-3 text-center">Welcome to Better Together</h1>
                                        <p class="mobile-text-sm text-center text-white opacity-90 mobile-mb-6">
                                            Your AI relationship coach that grows with your love story
                                        </p>
                                        <div class="w-full space-y-2">
                                            <button class="w-full bg-white text-primary-600 mobile-py-3 mobile-rounded-lg font-semibold mobile-text-sm">
                                                Start Your Journey
                                            </button>
                                            <button class="w-full border border-white text-white mobile-py-3 mobile-rounded-lg font-semibold mobile-text-sm">
                                                I Have an Account
                                            </button>
                                        </div>
                                        <div class="flex space-x-1 mt-4">
                                            <div class="w-1.5 h-1.5 bg-white mobile-rounded-full"></div>
                                            <div class="w-1.5 h-1.5 bg-white opacity-50 mobile-rounded-full"></div>
                                            <div class="w-1.5 h-1.5 bg-white opacity-50 mobile-rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Profile Setup -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-white">
                                    <div class="mobile-px-4 mobile-py-3 border-b border-gray-100">
                                        <div class="flex items-center justify-between">
                                            <button class="text-primary-600 mobile-text-sm font-medium">Back</button>
                                            <h1 class="mobile-h1">Tell us about you</h1>
                                            <span class="text-primary-600 mobile-text-sm font-medium">2/4</span>
                                        </div>
                                    </div>
                                    <div class="flex-1 mobile-px-4 mobile-py-4">
                                        <div class="text-center mobile-mb-4">
                                            <div class="mobile-w-10 mobile-h-10 bg-gray-200 mobile-rounded-full mx-auto mobile-mb-2 flex items-center justify-center">
                                                <i class="fas fa-camera text-gray-500 mobile-text-xs"></i>
                                            </div>
                                            <button class="text-primary-600 mobile-text-xs font-medium">Add Photo</button>
                                        </div>
                                        <div class="space-y-3">
                                            <div>
                                                <label class="block mobile-text-xs font-medium text-gray-700 mobile-mb-1">Your Name</label>
                                                <input type="text" class="mock-input w-full" placeholder="Enter your name" value="Sarah">
                                            </div>
                                            <div>
                                                <label class="block mobile-text-xs font-medium text-gray-700 mobile-mb-1">Your Age</label>
                                                <input type="text" class="mock-input w-full" placeholder="Enter your age" value="28">
                                            </div>
                                            <div>
                                                <label class="block mobile-text-xs font-medium text-gray-700 mobile-mb-1">Love Language</label>
                                                <select class="mock-input w-full">
                                                    <option>Words of Affirmation</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mobile-px-4 mobile-py-3">
                                        <button class="w-full bg-primary-600 text-white mobile-py-3 mobile-rounded-lg mobile-text-sm font-semibold">
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Partner Connection -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-white">
                                    <div class="px-6 py-4 border-b border-gray-100">
                                        <div class="flex items-center justify-between">
                                            <button class="text-primary-600 font-medium">Back</button>
                                            <h1 class="text-lg font-semibold">Connect with Partner</h1>
                                            <span class="text-primary-600 font-medium">4/4</span>
                                        </div>
                                    </div>
                                    <div class="flex-1 px-6 py-8 text-center">
                                        <div class="mb-8">
                                            <div class="flex justify-center items-center mb-6">
                                                <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                                                    <span class="text-2xl">👩‍🦰</span>
                                                </div>
                                                <div class="mx-4">
                                                    <div class="w-8 h-1 bg-primary-300 rounded-full"></div>
                                                </div>
                                                <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <i class="fas fa-user text-gray-400 text-xl"></i>
                                                </div>
                                            </div>
                                            <h2 class="text-xl font-bold text-gray-900 mb-2">Almost Ready!</h2>
                                            <p class="text-gray-600">Send an invitation to your partner to complete your setup</p>
                                        </div>
                                        <div class="space-y-4">
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2 text-left">Partner's Email</label>
                                                <input type="email" class="mock-input w-full" placeholder="partner@email.com" value="mike@email.com">
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2 text-left">Personal Message (Optional)</label>
                                                <textarea class="mock-input w-full h-20 resize-none" placeholder="Hey babe, let's try this relationship app together!">Hey babe, let's try this relationship app together! 💕</textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="px-6 py-4">
                                        <button class="w-full bg-primary-600 text-white py-4 rounded-full font-semibold mb-3">
                                            <i class="fas fa-paper-plane mr-2"></i>Send Invitation
                                        </button>
                                        <button class="w-full text-gray-600 py-3 font-medium">
                                            Skip for now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main App Interface -->
            <div class="mb-20">
                <h3 class="text-2xl font-bold text-center text-gray-900 mb-12">Daily App Experience</h3>
                <div class="flex justify-center space-x-8 flex-wrap gap-8">
                    <!-- Home Dashboard -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-gray-50">
                                    <!-- Header -->
                                    <div class="mobile-px-4 mobile-py-3 bg-white">
                                        <div class="flex items-center justify-between mobile-mb-3">
                                            <div>
                                                <h1 class="mobile-text-lg font-bold text-gray-900">Good Morning, Sarah!</h1>
                                                <p class="mobile-text-xs text-gray-600">Tuesday, Aug 19, 2025</p>
                                            </div>
                                            <div class="flex items-center space-x-2">
                                                <button class="mobile-w-6 mobile-h-6 bg-gray-100 mobile-rounded-full flex items-center justify-center">
                                                    <i class="fas fa-bell text-gray-600" style="font-size: 8px;"></i>
                                                </button>
                                                <div class="mobile-w-6 mobile-h-6 bg-primary-100 mobile-rounded-full flex items-center justify-center">
                                                    <span style="font-size: 8px;">👩‍🦰</span>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Connection Status -->
                                        <div class="flex items-center justify-between bg-primary-50 mobile-px-3 mobile-py-2 mobile-rounded-lg">
                                            <div class="flex items-center">
                                                <div class="flex -space-x-1 mr-2">
                                                    <div class="mobile-w-6 mobile-h-6 bg-primary-500 mobile-rounded-full flex items-center justify-center border border-white">
                                                        <span class="text-white" style="font-size: 7px;">👩‍🦰</span>
                                                    </div>
                                                    <div class="mobile-w-6 mobile-h-6 bg-blue-500 mobile-rounded-full flex items-center justify-center border border-white">
                                                        <span class="text-white" style="font-size: 7px;">👨</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p class="mobile-text-xs font-semibold text-gray-900">Connected with Mike</p>
                                                    <p class="mobile-small text-gray-600">12 day streak</p>
                                                </div>
                                            </div>
                                            <div class="mobile-text-lg">💕</div>
                                        </div>
                                    </div>
                                    
                                    <!-- Quick Actions -->
                                    <div class="mobile-px-4 mobile-py-3">
                                        <h2 class="mobile-h2 text-gray-900 mobile-mb-3">Today's Focus</h2>
                                        <div class="grid grid-cols-2 gap-2">
                                            <button class="bg-white mobile-px-3 mobile-py-3 mobile-rounded-lg text-left">
                                                <div class="mobile-w-6 mobile-h-6 bg-blue-100 mobile-rounded flex items-center justify-center mobile-mb-1">
                                                    <i class="fas fa-comments text-blue-600 mobile-text-xs"></i>
                                                </div>
                                                <p class="font-medium text-gray-900 mobile-text-xs">AI Coach</p>
                                                <p class="mobile-small text-gray-600">Get guidance</p>
                                            </button>
                                            <button class="bg-white mobile-px-3 mobile-py-3 mobile-rounded-lg text-left">
                                                <div class="mobile-w-6 mobile-h-6 bg-green-100 mobile-rounded flex items-center justify-center mobile-mb-1">
                                                    <i class="fas fa-calendar text-green-600 mobile-text-xs"></i>
                                                </div>
                                                <p class="font-medium text-gray-900 mobile-text-xs">Plan Date</p>
                                                <p class="mobile-small text-gray-600">Schedule time</p>
                                            </button>
                                            <button class="bg-white mobile-px-3 mobile-py-3 mobile-rounded-lg text-left">
                                                <div class="mobile-w-6 mobile-h-6 bg-purple-100 mobile-rounded flex items-center justify-center mobile-mb-1">
                                                    <i class="fas fa-heart text-purple-600 mobile-text-xs"></i>
                                                </div>
                                                <p class="font-medium text-gray-900 mobile-text-xs">Check-in</p>
                                                <p class="mobile-small text-gray-600">Share feelings</p>
                                            </button>
                                            <button class="bg-white mobile-px-3 mobile-py-3 mobile-rounded-lg text-left">
                                                <div class="mobile-w-6 mobile-h-6 bg-yellow-100 mobile-rounded flex items-center justify-center mobile-mb-1">
                                                    <i class="fas fa-lightbulb text-yellow-600 mobile-text-xs"></i>
                                                </div>
                                                <p class="font-medium text-gray-900 mobile-text-xs">Suggestions</p>
                                                <p class="mobile-small text-gray-600">New ideas</p>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Recent Activity -->
                                    <div class="px-6 py-4">
                                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent</h2>
                                        <div class="space-y-3">
                                            <div class="bg-white p-4 rounded-xl">
                                                <div class="flex items-start space-x-3">
                                                    <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <i class="fas fa-robot text-primary-600 text-sm"></i>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <p class="text-sm font-medium text-gray-900">AI Coaching Session</p>
                                                        <p class="text-xs text-gray-600 truncate">Discussed communication patterns...</p>
                                                        <p class="text-xs text-gray-500 mt-1">2 hours ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="bg-white p-4 rounded-xl">
                                                <div class="flex items-start space-x-3">
                                                    <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span class="text-sm">👨</span>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <p class="text-sm font-medium text-gray-900">Mike completed check-in</p>
                                                        <p class="text-xs text-gray-600 truncate">Feeling grateful and excited about weekend</p>
                                                        <p class="text-xs text-gray-500 mt-1">Yesterday</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Bottom Navigation -->
                                    <div class="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 safe-area-padding">
                                        <div class="flex justify-around items-center">
                                            <button class="flex flex-col items-center py-2 tab-active">
                                                <i class="fas fa-home text-lg mb-1"></i>
                                                <span class="text-xs font-medium">Home</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-comments text-lg mb-1"></i>
                                                <span class="text-xs">Coach</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-calendar text-lg mb-1"></i>
                                                <span class="text-xs">Plans</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-chart-line text-lg mb-1"></i>
                                                <span class="text-xs">Growth</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-user text-lg mb-1"></i>
                                                <span class="text-xs">Profile</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- AI Chat Interface -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-white">
                                    <!-- Chat Header -->
                                    <div class="px-4 py-3 border-b border-gray-200 bg-white">
                                        <div class="flex items-center space-x-3">
                                            <button class="text-primary-600">
                                                <i class="fas fa-arrow-left"></i>
                                            </button>
                                            <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                                <i class="fas fa-robot text-primary-600 text-sm"></i>
                                            </div>
                                            <div class="flex-1">
                                                <h1 class="font-semibold text-gray-900">AI Coach</h1>
                                                <p class="text-xs text-green-600">Online • Always here for you</p>
                                            </div>
                                            <button class="text-gray-600">
                                                <i class="fas fa-ellipsis-v"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Chat Messages -->
                                    <div class="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
                                        <div class="flex items-end space-x-2">
                                            <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <i class="fas fa-robot text-primary-600 text-xs"></i>
                                            </div>
                                            <div class="chat-bubble-ai max-w-xs px-4 py-3">
                                                <p class="text-sm">Hi Sarah! I noticed you and Mike had a great check-in yesterday. How are you both feeling about your communication lately?</p>
                                            </div>
                                        </div>

                                        <div class="flex items-end space-x-2 justify-end">
                                            <div class="chat-bubble-user max-w-xs px-4 py-3">
                                                <p class="text-sm">Actually, we've been struggling a bit. We had a small argument about planning our weekend and it felt like we weren't really hearing each other.</p>
                                            </div>
                                        </div>

                                        <div class="flex items-end space-x-2">
                                            <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <i class="fas fa-robot text-primary-600 text-xs"></i>
                                            </div>
                                            <div class="chat-bubble-ai max-w-xs px-4 py-3">
                                                <p class="text-sm">I understand that feeling. Those planning disagreements often reflect different needs underneath. Can you tell me what felt most important to you about the weekend plans?</p>
                                            </div>
                                        </div>

                                        <div class="flex items-end space-x-2 justify-end">
                                            <div class="chat-bubble-user max-w-xs px-4 py-3">
                                                <p class="text-sm">I guess I really wanted us to have some quality time together, but I felt like he was more focused on being productive and getting errands done.</p>
                                            </div>
                                        </div>

                                        <div class="flex items-end space-x-2">
                                            <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <i class="fas fa-robot text-primary-600 text-xs"></i>
                                            </div>
                                            <div class="chat-bubble-ai max-w-xs px-4 py-3">
                                                <p class="text-sm">That makes perfect sense! Your love language is Quality Time, so connection feels essential to you. Mike might not have realized how important that togetherness was to you.</p>
                                                <div class="mt-2 p-2 bg-white bg-opacity-50 rounded-lg">
                                                    <p class="text-xs text-gray-700"><strong>💡 Coaching tip:</strong> Try sharing the feeling behind your request next time: "I'd love some quality time with you this weekend - it helps me feel connected to you."</p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Typing indicator -->
                                        <div class="flex items-center space-x-2">
                                            <div class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <i class="fas fa-robot text-primary-600 text-xs"></i>
                                            </div>
                                            <div class="bg-gray-200 px-4 py-3 rounded-2xl">
                                                <div class="flex space-x-1">
                                                    <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                                    <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                                                    <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Message Input -->
                                    <div class="px-4 py-3 border-t border-gray-200 bg-white">
                                        <div class="flex items-center space-x-3">
                                            <button class="text-primary-600">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                            <div class="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
                                                <input type="text" placeholder="Type a message..." class="flex-1 bg-transparent border-none outline-none text-sm" value="That's really helpful advice...">
                                                <button class="text-gray-500 ml-2">
                                                    <i class="fas fa-microphone"></i>
                                                </button>
                                            </div>
                                            <button class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                                                <i class="fas fa-arrow-up text-white text-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Calendar/Planning View -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-gray-50">
                                    <!-- Header -->
                                    <div class="px-6 py-4 bg-white">
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <h1 class="text-xl font-bold text-gray-900">Your Plans</h1>
                                                <p class="text-sm text-gray-600">Couple time & activities</p>
                                            </div>
                                            <button class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                                                <i class="fas fa-plus text-white"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- This Week -->
                                    <div class="px-6 py-4">
                                        <h2 class="text-lg font-semibold text-gray-900 mb-4">This Week</h2>
                                        <div class="space-y-3">
                                            <!-- Today -->
                                            <div class="bg-primary-50 border border-primary-200 p-4 rounded-xl">
                                                <div class="flex items-start space-x-3">
                                                    <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <span class="text-white font-bold text-sm">19</span>
                                                    </div>
                                                    <div class="flex-1">
                                                        <div class="flex items-center justify-between mb-1">
                                                            <p class="font-semibold text-gray-900">Coffee Date</p>
                                                            <span class="text-xs text-primary-600 bg-primary-100 px-2 py-1 rounded-full">Today</span>
                                                        </div>
                                                        <p class="text-sm text-gray-600 mb-2">Blue Bottle Coffee • 3:00 PM</p>
                                                        <div class="flex items-center text-xs text-gray-500">
                                                            <i class="fas fa-robot mr-1"></i>
                                                            <span>AI suggested based on your schedules</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Tomorrow -->
                                            <div class="bg-white p-4 rounded-xl border border-gray-200">
                                                <div class="flex items-start space-x-3">
                                                    <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <span class="text-gray-700 font-bold text-sm">20</span>
                                                    </div>
                                                    <div class="flex-1">
                                                        <div class="flex items-center justify-between mb-1">
                                                            <p class="font-semibold text-gray-900">Cooking Together</p>
                                                            <span class="text-xs text-gray-500">Tomorrow</span>
                                                        </div>
                                                        <p class="text-sm text-gray-600 mb-2">Home • 7:00 PM</p>
                                                        <div class="flex items-center text-xs text-green-600">
                                                            <i class="fas fa-dollar-sign mr-1"></i>
                                                            <span>Budget-friendly • $15</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Weekend -->
                                            <div class="bg-white p-4 rounded-xl border border-gray-200">
                                                <div class="flex items-start space-x-3">
                                                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <span class="text-blue-600 font-bold text-sm">23</span>
                                                    </div>
                                                    <div class="flex-1">
                                                        <div class="flex items-center justify-between mb-1">
                                                            <p class="font-semibold text-gray-900">Hiking Adventure</p>
                                                            <span class="text-xs text-blue-600">Saturday</span>
                                                        </div>
                                                        <p class="text-sm text-gray-600 mb-2">Marin Headlands • 9:00 AM</p>
                                                        <div class="flex items-center justify-between">
                                                            <div class="flex items-center text-xs text-gray-500">
                                                                <i class="fas fa-sun mr-1"></i>
                                                                <span>Perfect weather: 72°F, sunny</span>
                                                            </div>
                                                            <button class="text-xs text-primary-600 font-medium">View details</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- AI Suggestions -->
                                    <div class="px-6 py-4">
                                        <h2 class="text-lg font-semibold text-gray-900 mb-4">AI Suggestions</h2>
                                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                                            <div class="flex items-start space-x-3">
                                                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <i class="fas fa-lightbulb text-purple-600 text-sm"></i>
                                                </div>
                                                <div class="flex-1">
                                                    <p class="font-semibold text-gray-900 mb-1">Museum Date Night</p>
                                                    <p class="text-sm text-gray-600 mb-2">SFMOMA has free evening hours this Thursday. Perfect for your Quality Time love language!</p>
                                                    <div class="flex items-center justify-between">
                                                        <div class="flex items-center text-xs text-gray-500">
                                                            <i class="fas fa-clock mr-1"></i>
                                                            <span>2 hours • Thu 6-8 PM</span>
                                                        </div>
                                                        <button class="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">Add to calendar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Bottom Navigation -->
                                    <div class="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
                                        <div class="flex justify-around items-center">
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-home text-lg mb-1"></i>
                                                <span class="text-xs">Home</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-comments text-lg mb-1"></i>
                                                <span class="text-xs">Coach</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 tab-active">
                                                <i class="fas fa-calendar text-lg mb-1"></i>
                                                <span class="text-xs font-medium">Plans</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-chart-line text-lg mb-1"></i>
                                                <span class="text-xs">Growth</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-user text-lg mb-1"></i>
                                                <span class="text-xs">Profile</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Detailed Feature Screens -->
            <div class="mb-20">
                <h3 class="text-2xl font-bold text-center text-gray-900 mb-12">Advanced Features</h3>
                <div class="flex justify-center space-x-8 flex-wrap gap-8">
                    <!-- Relationship Analytics -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-gray-50">
                                    <!-- Header -->
                                    <div class="px-6 py-4 bg-white">
                                        <div class="flex items-center space-x-3">
                                            <button class="text-primary-600">
                                                <i class="fas fa-arrow-left"></i>
                                            </button>
                                            <div>
                                                <h1 class="text-xl font-bold text-gray-900">Growth Analytics</h1>
                                                <p class="text-sm text-gray-600">Your relationship journey</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Progress Overview -->
                                    <div class="px-6 py-6">
                                        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl mb-6">
                                            <div class="text-center mb-4">
                                                <div class="text-4xl mb-2">📈</div>
                                                <h2 class="text-2xl font-bold text-gray-900">Relationship Health</h2>
                                                <p class="text-sm text-gray-600">Based on check-ins and AI analysis</p>
                                            </div>
                                            <div class="flex justify-center">
                                                <div class="relative w-32 h-32">
                                                    <svg class="transform -rotate-90 w-32 h-32">
                                                        <circle cx="64" cy="64" r="56" stroke="#e5e7eb" stroke-width="8" fill="transparent"></circle>
                                                        <circle cx="64" cy="64" r="56" stroke="#10b981" stroke-width="8" fill="transparent" stroke-dasharray="351.86" stroke-dashoffset="70.37" stroke-linecap="round"></circle>
                                                    </svg>
                                                    <div class="absolute inset-0 flex items-center justify-center">
                                                        <div class="text-center">
                                                            <div class="text-2xl font-bold text-gray-900">85%</div>
                                                            <div class="text-xs text-gray-600">Thriving</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Key Metrics -->
                                        <div class="grid grid-cols-2 gap-4 mb-6">
                                            <div class="bg-white p-4 rounded-xl">
                                                <div class="flex items-center justify-between mb-2">
                                                    <span class="text-sm font-medium text-gray-600">Communication</span>
                                                    <i class="fas fa-comments text-blue-500"></i>
                                                </div>
                                                <div class="text-2xl font-bold text-gray-900 mb-1">92%</div>
                                                <div class="text-xs text-green-600">↑ 8% this month</div>
                                            </div>
                                            <div class="bg-white p-4 rounded-xl">
                                                <div class="flex items-center justify-between mb-2">
                                                    <span class="text-sm font-medium text-gray-600">Connection</span>
                                                    <i class="fas fa-heart text-red-500"></i>
                                                </div>
                                                <div class="text-2xl font-bold text-gray-900 mb-1">88%</div>
                                                <div class="text-xs text-green-600">↑ 12% this month</div>
                                            </div>
                                            <div class="bg-white p-4 rounded-xl">
                                                <div class="flex items-center justify-between mb-2">
                                                    <span class="text-sm font-medium text-gray-600">Quality Time</span>
                                                    <i class="fas fa-clock text-purple-500"></i>
                                                </div>
                                                <div class="text-2xl font-bold text-gray-900 mb-1">76%</div>
                                                <div class="text-xs text-yellow-600">→ Same as last month</div>
                                            </div>
                                            <div class="bg-white p-4 rounded-xl">
                                                <div class="flex items-center justify-between mb-2">
                                                    <span class="text-sm font-medium text-gray-600">Conflict Resolution</span>
                                                    <i class="fas fa-handshake text-green-500"></i>
                                                </div>
                                                <div class="text-2xl font-bold text-gray-900 mb-1">84%</div>
                                                <div class="text-xs text-green-600">↑ 15% this month</div>
                                            </div>
                                        </div>

                                        <!-- AI Insights -->
                                        <div class="bg-white p-4 rounded-xl">
                                            <div class="flex items-center mb-3">
                                                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                                    <i class="fas fa-robot text-primary-600 text-sm"></i>
                                                </div>
                                                <h3 class="font-semibold text-gray-900">AI Insights</h3>
                                            </div>
                                            <div class="space-y-3 text-sm">
                                                <div class="flex items-start space-x-2">
                                                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <p class="text-gray-700"><strong>Strength:</strong> You both excel at expressing appreciation and gratitude</p>
                                                </div>
                                                <div class="flex items-start space-x-2">
                                                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <p class="text-gray-700"><strong>Growth Area:</strong> Consider scheduling more regular quality time together</p>
                                                </div>
                                                <div class="flex items-start space-x-2">
                                                    <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <p class="text-gray-700"><strong>Trend:</strong> Your conflict resolution skills are rapidly improving</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Bottom Navigation -->
                                    <div class="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
                                        <div class="flex justify-around items-center">
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-home text-lg mb-1"></i>
                                                <span class="text-xs">Home</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-comments text-lg mb-1"></i>
                                                <span class="text-xs">Coach</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-calendar text-lg mb-1"></i>
                                                <span class="text-xs">Plans</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 tab-active">
                                                <i class="fas fa-chart-line text-lg mb-1"></i>
                                                <span class="text-xs font-medium">Growth</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-user text-lg mb-1"></i>
                                                <span class="text-xs">Profile</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Check-in Flow -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-gradient-to-br from-purple-50 to-pink-50">
                                    <!-- Header -->
                                    <div class="px-6 py-4">
                                        <div class="flex items-center justify-between mb-6">
                                            <button class="text-gray-600">
                                                <i class="fas fa-times"></i>
                                            </button>
                                            <span class="text-sm font-medium text-gray-600">Daily Check-in</span>
                                            <span class="text-sm font-medium text-primary-600">2/3</span>
                                        </div>
                                        <div class="text-center">
                                            <div class="text-4xl mb-4">💫</div>
                                            <h1 class="text-2xl font-bold text-gray-900 mb-2">How are you feeling today?</h1>
                                            <p class="text-gray-600">Your emotional check-in helps us understand your relationship journey</p>
                                        </div>
                                    </div>

                                    <!-- Emotion Selection -->
                                    <div class="px-6 py-8">
                                        <div class="grid grid-cols-3 gap-4 mb-8">
                                            <button class="bg-white p-4 rounded-2xl text-center shadow-sm border border-primary-200 bg-primary-50">
                                                <div class="text-3xl mb-2">😊</div>
                                                <p class="text-sm font-medium text-gray-900">Happy</p>
                                            </button>
                                            <button class="bg-white p-4 rounded-2xl text-center shadow-sm hover:bg-gray-50">
                                                <div class="text-3xl mb-2">🥰</div>
                                                <p class="text-sm font-medium text-gray-600">Loved</p>
                                            </button>
                                            <button class="bg-white p-4 rounded-2xl text-center shadow-sm hover:bg-gray-50">
                                                <div class="text-3xl mb-2">😌</div>
                                                <p class="text-sm font-medium text-gray-600">Peaceful</p>
                                            </button>
                                            <button class="bg-white p-4 rounded-2xl text-center shadow-sm hover:bg-gray-50">
                                                <div class="text-3xl mb-2">😔</div>
                                                <p class="text-sm font-medium text-gray-600">Sad</p>
                                            </button>
                                            <button class="bg-white p-4 rounded-2xl text-center shadow-sm hover:bg-gray-50">
                                                <div class="text-3xl mb-2">😟</div>
                                                <p class="text-sm font-medium text-gray-600">Anxious</p>
                                            </button>
                                            <button class="bg-white p-4 rounded-2xl text-center shadow-sm hover:bg-gray-50">
                                                <div class="text-3xl mb-2">😤</div>
                                                <p class="text-sm font-medium text-gray-600">Frustrated</p>
                                            </button>
                                        </div>

                                        <!-- Follow-up Question -->
                                        <div class="bg-white p-6 rounded-2xl shadow-sm">
                                            <h3 class="font-semibold text-gray-900 mb-3">What's contributing to this feeling?</h3>
                                            <textarea class="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm resize-none h-20" placeholder="Share what's on your mind... (optional)">Had a great conversation with Mike this morning about our weekend plans. Feeling really connected and excited!</textarea>
                                        </div>
                                    </div>

                                    <!-- Continue Button -->
                                    <div class="px-6 py-6">
                                        <button class="w-full bg-primary-600 text-white py-4 rounded-full font-semibold text-lg mb-4">
                                            Continue
                                        </button>
                                        <button class="w-full text-gray-600 py-2 font-medium">
                                            Skip for now
                                        </button>
                                    </div>

                                    <!-- Progress Indicator -->
                                    <div class="px-6 pb-6">
                                        <div class="flex space-x-2">
                                            <div class="flex-1 h-1 bg-primary-600 rounded-full"></div>
                                            <div class="flex-1 h-1 bg-primary-600 rounded-full"></div>
                                            <div class="flex-1 h-1 bg-gray-300 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Settings & Profile -->
                    <div class="iphone-frame">
                        <div class="iphone-screen">
                            <div class="iphone-notch"></div>
                            <div class="status-bar">
                                <div class="flex items-center space-x-1">
                                    <div class="flex space-x-1">
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                        <div class="w-1 h-1 bg-black rounded-full"></div>
                                    </div>
                                    <span class="ml-2">Verizon</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-wifi text-xs"></i>
                                    <i class="fas fa-battery-three-quarters text-xs"></i>
                                </div>
                            </div>
                            <div class="screen-content">
                                <div class="app-interface bg-gray-50">
                                    <!-- Header -->
                                    <div class="px-6 py-6 bg-white">
                                        <div class="text-center">
                                            <div class="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span class="text-white text-2xl">👩‍🦰</span>
                                            </div>
                                            <h1 class="text-xl font-bold text-gray-900">Sarah Johnson</h1>
                                            <p class="text-sm text-gray-600">Connected with Mike • 47 days</p>
                                        </div>
                                    </div>

                                    <!-- Profile Stats -->
                                    <div class="px-6 py-4">
                                        <div class="grid grid-cols-3 gap-4">
                                            <div class="bg-white p-4 rounded-xl text-center">
                                                <div class="text-2xl font-bold text-primary-600 mb-1">12</div>
                                                <div class="text-xs text-gray-600">Day Streak</div>
                                            </div>
                                            <div class="bg-white p-4 rounded-xl text-center">
                                                <div class="text-2xl font-bold text-green-600 mb-1">8</div>
                                                <div class="text-xs text-gray-600">Dates Planned</div>
                                            </div>
                                            <div class="bg-white p-4 rounded-xl text-center">
                                                <div class="text-2xl font-bold text-blue-600 mb-1">92%</div>
                                                <div class="text-xs text-gray-600">Happiness</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Menu Items -->
                                    <div class="px-6 py-4">
                                        <div class="bg-white rounded-xl overflow-hidden">
                                            <button class="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-user text-blue-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium text-gray-900">Edit Profile</span>
                                                </div>
                                                <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
                                            </button>
                                            <button class="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-heart text-purple-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium text-gray-900">Relationship Settings</span>
                                                </div>
                                                <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
                                            </button>
                                            <button class="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-bell text-green-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium text-gray-900">Notifications</span>
                                                </div>
                                                <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
                                            </button>
                                            <button class="w-full px-4 py-4 flex items-center justify-between">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-shield-alt text-yellow-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium text-gray-900">Privacy & Security</span>
                                                </div>
                                                <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="px-6 py-4">
                                        <div class="bg-white rounded-xl overflow-hidden">
                                            <button class="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-question-circle text-gray-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium text-gray-900">Help & Support</span>
                                                </div>
                                                <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
                                            </button>
                                            <button class="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-info-circle text-gray-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium text-gray-900">About</span>
                                                </div>
                                                <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
                                            </button>
                                            <button class="w-full px-4 py-4 flex items-center justify-between text-red-600">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                                        <i class="fas fa-sign-out-alt text-red-600 text-sm"></i>
                                                    </div>
                                                    <span class="font-medium">Sign Out</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Bottom Navigation -->
                                    <div class="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
                                        <div class="flex justify-around items-center">
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-home text-lg mb-1"></i>
                                                <span class="text-xs">Home</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-comments text-lg mb-1"></i>
                                                <span class="text-xs">Coach</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-calendar text-lg mb-1"></i>
                                                <span class="text-xs">Plans</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 text-gray-600">
                                                <i class="fas fa-chart-line text-lg mb-1"></i>
                                                <span class="text-xs">Growth</span>
                                            </button>
                                            <button class="flex flex-col items-center py-2 tab-active">
                                                <i class="fas fa-user text-lg mb-1"></i>
                                                <span class="text-xs font-medium">Profile</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Design System -->
    <div class="py-20 bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold mb-4">iOS Design System</h2>
                <p class="text-xl text-gray-300">Built following Apple's Human Interface Guidelines</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="bg-gray-800 p-6 rounded-xl">
                    <h3 class="text-lg font-semibold mb-4">Typography</h3>
                    <div class="space-y-2">
                        <div class="text-lg font-bold">San Francisco Pro</div>
                        <div class="text-base font-semibold">Semibold Headings</div>
                        <div class="text-sm font-medium">Medium Labels</div>
                        <div class="text-sm text-gray-300">Regular Body Text</div>
                    </div>
                </div>

                <div class="bg-gray-800 p-6 rounded-xl">
                    <h3 class="text-lg font-semibold mb-4">Color Palette</h3>
                    <div class="space-y-3">
                        <div class="flex items-center space-x-3">
                            <div class="w-6 h-6 bg-blue-500 rounded"></div>
                            <span class="text-sm">Primary Blue (#007AFF)</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="w-6 h-6 bg-primary-600 rounded"></div>
                            <span class="text-sm">Brand Pink (#DB2777)</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="w-6 h-6 bg-green-500 rounded"></div>
                            <span class="text-sm">Success Green (#10B981)</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <div class="w-6 h-6 bg-gray-100 rounded border"></div>
                            <span class="text-sm">Light Gray (#F8FAFC)</span>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-800 p-6 rounded-xl">
                    <h3 class="text-lg font-semibold mb-4">Components</h3>
                    <div class="space-y-2 text-sm">
                        <div>• iOS-native navigation bars</div>
                        <div>• Rounded corner cards (12px)</div>
                        <div>• Tab bar with 5 main sections</div>
                        <div>• Chat bubbles with proper styling</div>
                        <div>• Form inputs with iOS styling</div>
                        <div>• Progress indicators</div>
                    </div>
                </div>

                <div class="bg-gray-800 p-6 rounded-xl">
                    <h3 class="text-lg font-semibold mb-4">Interaction</h3>
                    <div class="space-y-2 text-sm">
                        <div>• Haptic feedback integration</div>
                        <div>• Swipe gestures for navigation</div>
                        <div>• Pull-to-refresh functionality</div>
                        <div>• Smooth animations (0.3s)</div>
                        <div>• Contextual action sheets</div>
                        <div>• Smart keyboard integration</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Call to Action -->
    <div class="py-20 bg-primary-600">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-4xl font-bold text-white mb-6">
                Ready to Experience Better Together?
            </h2>
            <p class="text-xl text-primary-100 mb-8">
                Join the waitlist to be first to download when we launch
            </p>
            
            <!-- Waitlist Form -->
            <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-md mx-auto">
                <h3 class="text-2xl font-bold text-white mb-6">Join the Waitlist</h3>
                <form class="space-y-4">
                    <div>
                        <input type="email" placeholder="Enter your email" class="w-full px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:ring-opacity-50">
                    </div>
                    <div class="text-left">
                        <label class="text-white text-sm font-medium mb-3 block">Preferred Platform:</label>
                        <div class="space-y-2">
                            <label class="flex items-center text-white text-sm">
                                <input type="radio" name="platform" value="ios" class="mr-3 text-primary-600" checked>
                                <i class="fab fa-apple mr-2"></i>
                                iOS (iPhone/iPad) - Coming Q2 2025
                            </label>
                            <label class="flex items-center text-white text-sm">
                                <input type="radio" name="platform" value="android" class="mr-3 text-primary-600">
                                <i class="fab fa-android mr-2"></i>
                                Android - Coming Q3 2025
                            </label>
                            <label class="flex items-center text-white text-sm">
                                <input type="radio" name="platform" value="both" class="mr-3 text-primary-600">
                                <i class="fas fa-mobile-alt mr-2"></i>
                                Both Platforms
                            </label>
                        </div>
                    </div>
                    <button type="submit" class="w-full bg-white text-primary-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
                        <i class="fas fa-rocket mr-2"></i>Join Waitlist
                    </button>
                </form>
                <p class="text-primary-100 text-xs mt-4">
                    Be the first to know when Better Together launches. No spam, just love.
                </p>
            </div>

            <!-- Platform Features -->
            <div class="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                    <div class="flex items-center justify-center mb-4">
                        <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <i class="fab fa-apple text-white text-xl"></i>
                        </div>
                    </div>
                    <h4 class="text-lg font-semibold text-white mb-2">iOS App</h4>
                    <ul class="text-primary-100 text-sm space-y-1">
                        <li>• Native iOS design & animations</li>
                        <li>• Siri integration for quick check-ins</li>
                        <li>• Apple Watch companion app</li>
                        <li>• iMessage integration</li>
                        <li>• iOS 15+ required</li>
                    </ul>
                </div>
                <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                    <div class="flex items-center justify-center mb-4">
                        <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <i class="fab fa-android text-white text-xl"></i>
                        </div>
                    </div>
                    <h4 class="text-lg font-semibold text-white mb-2">Android App</h4>
                    <ul class="text-primary-100 text-sm space-y-1">
                        <li>• Material Design 3 interface</li>
                        <li>• Google Assistant integration</li>
                        <li>• Wear OS companion app</li>
                        <li>• Smart home integrations</li>
                        <li>• Android 8+ required</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <div class="flex justify-center items-center mb-6">
                    <span class="text-2xl mr-2">💕</span>
                    <span class="text-xl font-bold">Better Together</span>
                </div>
                <p class="mb-6">Building stronger relationships through beautiful mobile experiences</p>
                <div class="flex justify-center space-x-6">
                    <a href="/ai-coach.html" class="hover:text-white">AI Coach</a>
                    <a href="/smart-scheduling.html" class="hover:text-white">Smart Scheduling</a>
                    <a href="/intelligent-suggestions.html" class="hover:text-white">Suggestions</a>
                    <a href="/mobile-ui.html" class="text-primary-400 hover:text-primary-300">Mobile Design</a>
                    <a href="/" class="hover:text-white">Home</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Add smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Add interactive hover effects for iPhone mockups
            const iframes = document.querySelectorAll('.iphone-frame');
            iframes.forEach(frame => {
                frame.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.02) translateY(-5px)';
                    this.style.transition = 'transform 0.3s ease';
                });
                
                frame.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) translateY(0)';
                });
            });
        });
    <\/script>
</body>
</html>`,Wi=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart AI Scheduling - Never Miss Date Night Again | Better Together</title>
    <meta name="description" content="AI automatically finds perfect times, books activities, and adds thoughtful reminders to both calendars. Save 5+ hours per week on relationship planning.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d'
                        }
                    }
                }
            }
        }
    <\/script>
</head>
<body class="bg-gray-50 overflow-x-hidden">
    ${H}
                </div>
            </div>
            <!-- Mobile Menu -->
            <div id="mobileMenu" class="hidden md:hidden pb-4">
                <div class="flex flex-col space-y-3">
                    <a href="/ai-coach.html" class="text-gray-600 hover:text-gray-900 transition-colors py-2">AI Coach</a>
                    <a href="/smart-scheduling.html" class="text-primary-600 font-medium py-2">Smart Scheduling</a>
                    <a href="/intelligent-suggestions.html" class="text-gray-600 hover:text-gray-900 transition-colors py-2">Suggestions</a>
                    <a href="/mobile-ui.html" class="text-gray-600 hover:text-gray-900 transition-colors py-2">Mobile Design</a>
                    <a href="/" class="bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors w-full text-center">
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-green-50 to-blue-50 py-12 sm:py-16 lg:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="flex justify-center mb-6">
                <div class="bg-green-100 p-4 rounded-full">
                    <i class="fas fa-calendar-check text-4xl text-green-600"></i>
                </div>
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Never Fight About Scheduling Again
            </h1>
            <p class="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                AI finds perfect times for both of you, books everything automatically, and adds thoughtful reminders. 
                <strong>Save 5+ hours per week</strong> while building stronger connections.
            </p>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <button class="w-full sm:w-auto bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base">
                    <i class="fas fa-magic mr-2"></i>
                    See AI Scheduling Demo
                </button>
                <button class="w-full sm:w-auto border border-green-600 text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors text-sm sm:text-base">
                    <i class="fas fa-clock mr-2"></i>
                    Try Free for 7 Days
                </button>
            </div>
        </div>
    </div>

    <!-- Problem & Solution -->
    <div class="py-12 sm:py-16 lg:py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <!-- Problem -->
                <div>
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Stop the Scheduling Struggle</h2>
                    <div class="space-y-4 mb-8">
                        <div class="flex items-start space-x-4 p-4 bg-red-50 rounded-lg">
                            <i class="fas fa-times-circle text-red-500 mt-1 flex-shrink-0"></i>
                            <div>
                                <h3 class="font-semibold text-red-800">Hours Wasted Planning</h3>
                                <p class="text-red-700 text-sm">Spending weekends researching restaurants, checking calendars, coordinating schedules</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
                            <i class="fas fa-times-circle text-yellow-500 mt-1 flex-shrink-0"></i>
                            <div>
                                <h3 class="font-semibold text-yellow-800">Missed Opportunities</h3>
                                <p class="text-yellow-700 text-sm">Great events sell out while you're "trying to find time"</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                            <i class="fas fa-times-circle text-blue-500 mt-1 flex-shrink-0"></i>
                            <div>
                                <h3 class="font-semibold text-blue-800">Calendar Conflicts</h3>
                                <p class="text-blue-700 text-sm">Double bookings, forgotten commitments, scheduling stress</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Solution -->
                <div>
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">AI Does It All Automatically</h2>
                    <div class="space-y-4">
                        <div class="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                            <i class="fas fa-check-circle text-green-500 mt-1 flex-shrink-0"></i>
                            <div>
                                <h3 class="font-semibold text-green-800">Smart Time Finding</h3>
                                <p class="text-green-700 text-sm">AI analyzes both calendars and finds optimal free time automatically</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                            <i class="fas fa-check-circle text-blue-500 mt-1 flex-shrink-0"></i>
                            <div>
                                <h3 class="font-semibold text-blue-800">Automatic Booking</h3>
                                <p class="text-blue-700 text-sm">Reserves tables, buys tickets, books classes—all with your approval</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                            <i class="fas fa-check-circle text-purple-500 mt-1 flex-shrink-0"></i>
                            <div>
                                <h3 class="font-semibold text-purple-800">Thoughtful Reminders</h3>
                                <p class="text-purple-700 text-sm">Contextual notifications with prep tips and surprise elements</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Live Demo Section -->
    <div class="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">See It In Action</h2>
                <p class="text-lg sm:text-xl text-gray-600">Watch AI schedule a perfect date night in real-time</p>
            </div>

            <!-- Demo Container -->
            <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-3">
                        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span class="text-sm text-gray-500">AI Scheduling Assistant</span>
                </div>

                <!-- Demo Steps -->
                <div class="space-y-6">
                    <!-- Step 1: Request -->
                    <div class="flex items-start space-x-4">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-user text-blue-600"></i>
                        </div>
                        <div class="flex-1">
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <p class="text-gray-800">"Can you plan a romantic dinner for Sarah and me this Friday? Something special since it's our anniversary month."</p>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2: AI Analysis -->
                    <div class="flex items-start space-x-4">
                        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-robot text-green-600"></i>
                        </div>
                        <div class="flex-1">
                            <div class="bg-green-50 p-4 rounded-lg">
                                <p class="text-gray-800 font-medium mb-3">🤖 Analyzing schedules and preferences...</p>
                                <div class="grid sm:grid-cols-2 gap-4 text-sm">
                                    <div class="space-y-2">
                                        <div class="flex items-center"><i class="fas fa-calendar mr-2 text-green-600"></i> Both free Friday 7-10 PM</div>
                                        <div class="flex items-center"><i class="fas fa-map-marker mr-2 text-blue-600"></i> Downtown area preferred</div>
                                        <div class="flex items-center"><i class="fas fa-heart mr-2 text-red-500"></i> Italian cuisine (Sarah's favorite)</div>
                                    </div>
                                    <div class="space-y-2">
                                        <div class="flex items-center"><i class="fas fa-dollar-sign mr-2 text-yellow-600"></i> $80-120 budget range</div>
                                        <div class="flex items-center"><i class="fas fa-cloud mr-2 text-gray-500"></i> Clear weather forecast</div>
                                        <div class="flex items-center"><i class="fas fa-star mr-2 text-purple-600"></i> Anniversary significance</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: AI Recommendation -->
                    <div class="flex items-start space-x-4">
                        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-robot text-green-600"></i>
                        </div>
                        <div class="flex-1">
                            <div class="bg-green-50 p-4 rounded-lg">
                                <p class="text-gray-800 font-medium mb-4">Perfect! I found the ideal evening:</p>
                                
                                <div class="bg-white p-4 rounded-lg border border-green-200 mb-4">
                                    <h4 class="font-bold text-gray-900 mb-2">🍝 Bella Vista Rooftop</h4>
                                    <div class="grid sm:grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p><strong>Time:</strong> Friday 7:30 PM</p>
                                            <p><strong>Table:</strong> Corner window seat</p>
                                            <p><strong>Special:</strong> Anniversary dessert included</p>
                                        </div>
                                        <div>
                                            <p><strong>Rating:</strong> 4.8/5 ⭐⭐⭐⭐⭐</p>
                                            <p><strong>Price:</strong> $95 for two</p>
                                            <p><strong>Ambiance:</strong> Romantic, city views</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-col sm:flex-row gap-3">
                                    <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex-1">
                                        <i class="fas fa-check mr-2"></i>Book This Perfect Evening
                                    </button>
                                    <button class="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
                                        Show Other Options
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4: Confirmation -->
                    <div class="flex items-start space-x-4">
                        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-robot text-green-600"></i>
                        </div>
                        <div class="flex-1">
                            <div class="bg-green-50 p-4 rounded-lg">
                                <p class="text-gray-800 font-medium mb-3">🎉 All set! I've taken care of everything:</p>
                                <div class="space-y-2 text-sm">
                                    <div class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i> Reserved corner table for 7:30 PM</div>
                                    <div class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i> Added to both calendars with prep reminders</div>
                                    <div class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i> Requested anniversary dessert surprise</div>
                                    <div class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i> Sent Sarah a sweet "looking forward to tonight" message</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p class="text-center text-blue-800 font-medium">
                        <i class="fas fa-clock mr-2"></i>Total time saved: 2.5 hours of research and coordination
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Calendar Integration -->
    <div class="py-12 sm:py-16 lg:py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Works With Your Existing Calendars</h2>
                <p class="text-lg sm:text-xl text-gray-600">Seamless integration with all major calendar platforms</p>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
                    <i class="fab fa-google text-4xl text-blue-600 mb-4"></i>
                    <h3 class="font-semibold text-gray-900">Google Calendar</h3>
                    <p class="text-sm text-gray-600 mt-2">Full two-way sync</p>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center">
                    <i class="fab fa-microsoft text-4xl text-purple-600 mb-4"></i>
                    <h3 class="font-semibold text-gray-900">Outlook</h3>
                    <p class="text-sm text-gray-600 mt-2">Enterprise ready</p>
                </div>
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center">
                    <i class="fab fa-apple text-4xl text-gray-700 mb-4"></i>
                    <h3 class="font-semibold text-gray-900">Apple Calendar</h3>
                    <p class="text-sm text-gray-600 mt-2">Native iOS integration</p>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
                    <i class="fas fa-plus text-4xl text-green-600 mb-4"></i>
                    <h3 class="font-semibold text-gray-900">And More</h3>
                    <p class="text-sm text-gray-600 mt-2">15+ integrations</p>
                </div>
            </div>

            <!-- Sample Calendar View -->
            <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
                <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900">This Week - Shared Calendar View</h3>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-7 gap-2 mb-4">
                        <div class="text-center text-sm font-medium text-gray-600 py-2">Sun</div>
                        <div class="text-center text-sm font-medium text-gray-600 py-2">Mon</div>
                        <div class="text-center text-sm font-medium text-gray-600 py-2">Tue</div>
                        <div class="text-center text-sm font-medium text-gray-600 py-2">Wed</div>
                        <div class="text-center text-sm font-medium text-gray-600 py-2">Thu</div>
                        <div class="text-center text-sm font-medium text-gray-600 py-2">Fri</div>
                        <div class="text-center text-sm font-medium text-gray-600 py-2">Sat</div>
                    </div>
                    <div class="grid grid-cols-7 gap-2">
                        <div class="h-24 p-2 text-sm">
                            <div class="text-gray-400">15</div>
                        </div>
                        <div class="h-24 p-2 text-sm">
                            <div class="text-gray-900 font-medium">16</div>
                            <div class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs mt-1">Work mtg</div>
                        </div>
                        <div class="h-24 p-2 text-sm">
                            <div class="text-gray-900 font-medium">17</div>
                            <div class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mt-1">Gym</div>
                        </div>
                        <div class="h-24 p-2 text-sm">
                            <div class="text-gray-900 font-medium">18</div>
                        </div>
                        <div class="h-24 p-2 text-sm">
                            <div class="text-gray-900 font-medium">19</div>
                            <div class="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs mt-1">Date Night ❤️</div>
                        </div>
                        <div class="h-24 p-2 text-sm">
                            <div class="text-gray-900 font-medium">20</div>
                            <div class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mt-1">Cooking Class</div>
                        </div>
                        <div class="h-24 p-2 text-sm">
                            <div class="text-gray-900 font-medium">21</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Smart Features -->
    <div class="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Beyond Basic Scheduling</h2>
                <p class="text-lg sm:text-xl text-gray-600">AI that understands relationships, not just calendars</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Weather Intelligence -->
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-cloud-sun text-blue-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Weather-Smart Planning</h3>
                    <p class="text-gray-600 mb-4">Automatically adjusts outdoor plans based on weather forecasts and suggests indoor alternatives.</p>
                    <div class="bg-blue-50 p-3 rounded-lg text-sm">
                        <p class="text-blue-800"><i class="fas fa-umbrella mr-2"></i>"Rain expected Saturday - switched to indoor rock climbing instead of hiking"</p>
                    </div>
                </div>

                <!-- Stress Level Analysis -->
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-heart-pulse text-green-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Stress-Level Optimization</h3>
                    <p class="text-gray-600 mb-4">Analyzes both partners' schedules to suggest relaxing activities during stressful periods.</p>
                    <div class="bg-green-50 p-3 rounded-lg text-sm">
                        <p class="text-green-800"><i class="fas fa-leaf mr-2"></i>"Detected high work stress - suggesting spa evening instead of party"</p>
                    </div>
                </div>

                <!-- Location Intelligence -->
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-map-marked-alt text-purple-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Location Optimization</h3>
                    <p class="text-gray-600 mb-4">Considers traffic patterns, parking, and commute times to pick optimal locations and timing.</p>
                    <div class="bg-purple-50 p-3 rounded-lg text-sm">
                        <p class="text-purple-800"><i class="fas fa-route mr-2"></i>"Moved dinner 30 min earlier to avoid downtown traffic"</p>
                    </div>
                </div>

                <!-- Budget Awareness -->
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-dollar-sign text-yellow-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Budget-Smart Suggestions</h3>
                    <p class="text-gray-600 mb-4">Tracks spending patterns and suggests activities within your comfort zone.</p>
                    <div class="bg-yellow-50 p-3 rounded-lg text-sm">
                        <p class="text-yellow-800"><i class="fas fa-piggy-bank mr-2"></i>"Found similar restaurant with 30% better value"</p>
                    </div>
                </div>

                <!-- Energy Matching -->
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-battery-three-quarters text-red-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Energy Level Matching</h3>
                    <p class="text-gray-600 mb-4">Suggests high or low-energy activities based on recent schedules and preferences.</p>
                    <div class="bg-red-50 p-3 rounded-lg text-sm">
                        <p class="text-red-800"><i class="fas fa-couch mr-2"></i>"Both had busy weeks - suggesting movie night at home"</p>
                    </div>
                </div>

                <!-- Relationship Milestones -->
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-heart text-pink-600"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Milestone Awareness</h3>
                    <p class="text-gray-600 mb-4">Remembers important dates and automatically plans special celebrations.</p>
                    <div class="bg-pink-50 p-3 rounded-lg text-sm">
                        <p class="text-pink-800"><i class="fas fa-calendar-heart mr-2"></i>"6-month anniversary next week - planning surprise dinner"</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Success Stories -->
    <div class="py-12 sm:py-16 lg:py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Real Results from Real Couples</h2>
                <p class="text-lg sm:text-xl text-gray-600">See how smart scheduling transformed their relationships</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="bg-green-50 p-6 rounded-xl">
                    <div class="flex items-center mb-4">
                        <div class="flex -space-x-1 mr-3">
                            <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                                <span class="text-white text-sm font-bold">M</span>
                            </div>
                            <div class="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center border-2 border-white">
                                <span class="text-white text-sm font-bold">J</span>
                            </div>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-900">Mike & Jessica</p>
                            <p class="text-sm text-gray-600">Together 2 years</p>
                        </div>
                    </div>
                    <blockquote class="text-gray-700 italic mb-4">
                        "We went from constantly arguing about plans to having amazing dates every week. The AI knows us better than we know ourselves!"
                    </blockquote>
                    <div class="bg-white p-3 rounded-lg">
                        <p class="text-green-800 font-medium text-sm">✅ 12 perfect dates planned this month</p>
                        <p class="text-green-800 font-medium text-sm">✅ 8 hours/week saved on planning</p>
                        <p class="text-green-800 font-medium text-sm">✅ 0 scheduling arguments since starting</p>
                    </div>
                </div>

                <div class="bg-blue-50 p-6 rounded-xl">
                    <div class="flex items-center mb-4">
                        <div class="flex -space-x-1 mr-3">
                            <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white">
                                <span class="text-white text-sm font-bold">A</span>
                            </div>
                            <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                <span class="text-white text-sm font-bold">D</span>
                            </div>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-900">Alex & Dana</p>
                            <p class="text-sm text-gray-600">Busy professionals</p>
                        </div>
                    </div>
                    <blockquote class="text-gray-700 italic mb-4">
                        "With our crazy work schedules, we thought weekly dates were impossible. Now we have quality time every single week."
                    </blockquote>
                    <div class="bg-white p-3 rounded-lg">
                        <p class="text-blue-800 font-medium text-sm">✅ 95% success rate finding free time</p>
                        <p class="text-blue-800 font-medium text-sm">✅ $200/month saved vs. using planners</p>
                        <p class="text-blue-800 font-medium text-sm">✅ Relationship satisfaction up 40%</p>
                    </div>
                </div>

                <div class="bg-purple-50 p-6 rounded-xl">
                    <div class="flex items-center mb-4">
                        <div class="flex -space-x-1 mr-3">
                            <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                                <span class="text-white text-sm font-bold">S</span>
                            </div>
                            <div class="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-white">
                                <span class="text-white text-sm font-bold">T</span>
                            </div>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-900">Sam & Taylor</p>
                            <p class="text-sm text-gray-600">Long-distance</p>
                        </div>
                    </div>
                    <blockquote class="text-gray-700 italic mb-4">
                        "The AI coordinates our visits perfectly across time zones and helps us make every moment count when we're together."
                    </blockquote>
                    <div class="bg-white p-3 rounded-lg">
                        <p class="text-purple-800 font-medium text-sm">✅ Perfect visit timing across 3 time zones</p>
                        <p class="text-purple-800 font-medium text-sm">✅ Maximized quality time during visits</p>
                        <p class="text-purple-800 font-medium text-sm">✅ Never missed important virtual dates</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- CTA Section -->
    <div class="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Never Fight About Scheduling Again?
            </h2>
            <p class="text-lg sm:text-xl text-green-100 mb-8">
                Join 50,000+ couples who've saved 5+ hours per week with AI scheduling
            </p>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <button class="w-full sm:w-auto bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
                    <i class="fas fa-magic mr-2"></i>Start Free 7-Day Trial
                </button>
                <button class="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-green-600 transition-colors font-semibold text-lg">
                    <i class="fas fa-calendar mr-2"></i>See Live Demo
                </button>
            </div>
            <p class="text-green-100 text-sm">
                No credit card required • Cancel anytime • 30-day money-back guarantee
            </p>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <div class="flex justify-center items-center mb-6">
                    <span class="text-2xl mr-2">💕</span>
                    <span class="text-xl font-bold">Better Together</span>
                </div>
                <p class="mb-6">Making relationship scheduling effortless with AI</p>
                <div class="flex flex-wrap justify-center gap-6 text-sm">
                    <a href="/ai-coach.html" class="hover:text-white">AI Coach</a>
                    <a href="/smart-scheduling.html" class="text-green-400 hover:text-green-300">Smart Scheduling</a>
                    <a href="/intelligent-suggestions.html" class="hover:text-white">Suggestions</a>
                    <a href="/mobile-ui.html" class="hover:text-white">Mobile Design</a>
                    <a href="/" class="hover:text-white">Home</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {

            // Touch-friendly buttons on mobile
            if (window.innerWidth <= 768) {
                const buttons = document.querySelectorAll('button');
                buttons.forEach(button => {
                    button.style.minHeight = '44px';
                });
            }
        });
    <\/script>
</body>
</html>`,Yi=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI-Powered Personalized Suggestions - Perfect Dates Every Time | Better Together</title>
    <meta name="description" content="AI learns your unique preferences to suggest perfect activities, restaurants, and experiences. Get personalized recommendations that strengthen your relationship bond.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d'
                        }
                    }
                }
            }
        }
    <\/script>
</head>
<body class="bg-gray-50 overflow-x-hidden">
    ${H}

    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-purple-50 to-pink-50 py-12 sm:py-16 lg:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="flex justify-center mb-6">
                <div class="bg-purple-100 p-4 rounded-full">
                    <i class="fas fa-magic text-4xl text-purple-600"></i>
                </div>
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Personalized Just for You Two
            </h1>
            <p class="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                AI learns your unique preferences, relationship dynamics, and past experiences to suggest 
                <strong>perfect activities that strengthen your bond</strong> while staying within your lifestyle.
            </p>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <button class="w-full sm:w-auto bg-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm sm:text-base">
                    <i class="fas fa-brain mr-2"></i>
                    See AI Learning Demo
                </button>
                <button class="w-full sm:w-auto border border-purple-600 text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors text-sm sm:text-base">
                    <i class="fas fa-star mr-2"></i>
                    Get Personalized Preview
                </button>
            </div>
        </div>
    </div>

    <!-- How AI Learns About You -->
    <div class="py-12 sm:py-16 lg:py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">AI That Actually Knows You</h2>
                <p class="text-lg sm:text-xl text-gray-600">Watch how your AI learns and adapts to your unique relationship</p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <!-- Learning Process -->
                <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Your AI Gets Smarter Every Date</h3>
                    <div class="space-y-6">
                        <div class="flex items-start space-x-4">
                            <div class="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-eye text-blue-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">Observes Your Choices</h4>
                                <p class="text-gray-600">Tracks which restaurants you love, activities you enjoy, and experiences that create the best memories.</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-4">
                            <div class="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-brain text-green-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">Learns Your Patterns</h4>
                                <p class="text-gray-600">Understands your relationship dynamics, energy levels, and what activities bring you closer together.</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-4">
                            <div class="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-magic text-purple-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">Predicts What You'll Love</h4>
                                <p class="text-gray-600">Suggests new experiences based on deep understanding of your preferences and relationship goals.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Learning Timeline -->
                <div class="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl">
                    <h4 class="text-lg font-semibold text-gray-900 mb-6">Your AI Learning Journey</h4>
                    <div class="space-y-6">
                        <!-- Week 1 -->
                        <div class="flex items-start space-x-4">
                            <div class="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                            <div>
                                <p class="font-medium text-gray-900">Week 1: Basic Preferences</p>
                                <p class="text-sm text-gray-600">Learns your cuisine preferences, budget range, and activity types</p>
                            </div>
                        </div>
                        <!-- Week 2 -->
                        <div class="flex items-start space-x-4">
                            <div class="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                            <div>
                                <p class="font-medium text-gray-900">Week 2-3: Relationship Dynamics</p>
                                <p class="text-sm text-gray-600">Understands your communication styles and what activities spark connection</p>
                            </div>
                        </div>
                        <!-- Week 4+ -->
                        <div class="flex items-start space-x-4">
                            <div class="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4+</div>
                            <div>
                                <p class="font-medium text-gray-900">Month 1+: Predictive Mastery</p>
                                <p class="text-sm text-gray-600">Anticipates your needs and suggests perfectly tailored experiences</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Budget-Aware Suggestions -->
    <div class="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Perfect Suggestions for Every Budget</h2>
                <p class="text-lg sm:text-xl text-gray-600">AI finds amazing experiences at any price point</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- $0 Budget -->
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="text-center mb-6">
                        <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-leaf text-2xl text-green-600"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900">Free & Meaningful</h3>
                        <p class="text-green-600 font-semibold text-lg">$0</p>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-green-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">🌅 Sunrise Hike & Coffee</h4>
                            <p class="text-sm text-gray-600">Watch the sunrise together at Eagle Point, then make coffee over a camp stove</p>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">🎨 Museum Free Days</h4>
                            <p class="text-sm text-gray-600">Explore the modern art exhibit during resident appreciation hours</p>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">🌙 Stargazing Picnic</h4>
                            <p class="text-sm text-gray-600">Homemade snacks under the stars at Miller Observatory</p>
                        </div>
                    </div>
                    <div class="mt-6 pt-4 border-t border-gray-200">
                        <p class="text-sm text-gray-600"><strong>AI Insight:</strong> "Focus on shared experiences and natural beauty that create lasting memories"</p>
                    </div>
                </div>

                <!-- $50 Budget -->
                <div class="bg-white p-6 rounded-xl shadow-sm border-2 border-blue-200">
                    <div class="text-center mb-6">
                        <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-balance-scale text-2xl text-blue-600"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900">Sweet Spot</h3>
                        <p class="text-blue-600 font-semibold text-lg">~$50</p>
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Most Popular</span>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">🍷 Wine & Paint Night</h4>
                            <p class="text-sm text-gray-600">Local studio class with wine pairings - create art together</p>
                        </div>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">🍜 Cooking Class Date</h4>
                            <p class="text-sm text-gray-600">Learn to make authentic ramen from Chef Martinez</p>
                        </div>
                        <div class="bg-yellow-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">🎭 Local Theater Show</h4>
                            <p class="text-sm text-gray-600">Intimate performance + dinner at the cozy bistro next door</p>
                        </div>
                    </div>
                    <div class="mt-6 pt-4 border-t border-gray-200">
                        <p class="text-sm text-gray-600"><strong>AI Insight:</strong> "Perfect balance of novelty and comfort for regular date nights"</p>
                    </div>
                </div>

                <!-- $150+ Budget -->
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="text-center mb-6">
                        <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-crown text-2xl text-purple-600"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900">Special Occasions</h3>
                        <p class="text-purple-600 font-semibold text-lg">$150+</p>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-purple-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">🚁 City Helicopter Tour</h4>
                            <p class="text-sm text-gray-600">Sunset flight over downtown + rooftop champagne reception</p>
                        </div>
                        <div class="bg-red-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">🏨 Weekend Getaway</h4>
                            <p class="text-sm text-gray-600">Boutique hotel in wine country with couples massage</p>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-900 mb-2">🍾 Chef's Table Experience</h4>
                            <p class="text-sm text-gray-600">Private dining with Michelin-starred chef + wine pairings</p>
                        </div>
                    </div>
                    <div class="mt-6 pt-4 border-t border-gray-200">
                        <p class="text-sm text-gray-600"><strong>AI Insight:</strong> "Reserved for anniversaries and major milestones - maximum impact experiences"</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Personality-Based Matching -->
    <div class="py-12 sm:py-16 lg:py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Matches Your Unique Personalities</h2>
                <p class="text-lg sm:text-xl text-gray-600">AI understands both partners and finds activities you'll both love</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Adventurous + Cautious -->
                <div class="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl">
                    <div class="text-center mb-4">
                        <div class="flex justify-center space-x-2 mb-3">
                            <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                <i class="fas fa-mountain text-white"></i>
                            </div>
                            <div class="text-2xl text-gray-400">+</div>
                            <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                <i class="fas fa-shield-alt text-white"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-gray-900">Adventurer + Cautious</h3>
                    </div>
                    <div class="space-y-3 text-sm">
                        <div class="bg-white p-3 rounded-lg">
                            <p class="font-medium">🧗‍♀️ Indoor Rock Climbing</p>
                            <p class="text-gray-600">Safe thrill with professional instruction</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg">
                            <p class="font-medium">🎨 Art Walk Food Tour</p>
                            <p class="text-gray-600">Gentle exploration with familiar food</p>
                        </div>
                    </div>
                </div>

                <!-- Introverted + Extroverted -->
                <div class="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                    <div class="text-center mb-4">
                        <div class="flex justify-center space-x-2 mb-3">
                            <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                <i class="fas fa-book text-white"></i>
                            </div>
                            <div class="text-2xl text-gray-400">+</div>
                            <div class="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                                <i class="fas fa-users text-white"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-gray-900">Introvert + Extrovert</h3>
                    </div>
                    <div class="space-y-3 text-sm">
                        <div class="bg-white p-3 rounded-lg">
                            <p class="font-medium">📚 Bookstore Café + Small Concert</p>
                            <p class="text-gray-600">Quiet start, social finish</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg">
                            <p class="font-medium">🍷 Wine Tasting for Two</p>
                            <p class="text-gray-600">Intimate with optional group activities</p>
                        </div>
                    </div>
                </div>

                <!-- Creative + Analytical -->
                <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                    <div class="text-center mb-4">
                        <div class="flex justify-center space-x-2 mb-3">
                            <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                <i class="fas fa-palette text-white"></i>
                            </div>
                            <div class="text-2xl text-gray-400">+</div>
                            <div class="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                                <i class="fas fa-calculator text-white"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-gray-900">Creative + Analytical</h3>
                    </div>
                    <div class="space-y-3 text-sm">
                        <div class="bg-white p-3 rounded-lg">
                            <p class="font-medium">🔬 Science Museum + Art Workshop</p>
                            <p class="text-gray-600">Perfect blend of both interests</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg">
                            <p class="font-medium">🏗️ Architecture Walking Tour</p>
                            <p class="text-gray-600">Form meets function exploration</p>
                        </div>
                    </div>
                </div>

                <!-- Active + Relaxed -->
                <div class="bg-gradient-to-br from-yellow-50 to-green-50 p-6 rounded-xl">
                    <div class="text-center mb-4">
                        <div class="flex justify-center space-x-2 mb-3">
                            <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                                <i class="fas fa-running text-white"></i>
                            </div>
                            <div class="text-2xl text-gray-400">+</div>
                            <div class="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                                <i class="fas fa-leaf text-white"></i>
                            </div>
                        </div>
                        <h3 class="font-bold text-gray-900">Active + Relaxed</h3>
                    </div>
                    <div class="space-y-3 text-sm">
                        <div class="bg-white p-3 rounded-lg">
                            <p class="font-medium">🚴‍♂️ Bike Ride + Spa Afternoon</p>
                            <p class="text-gray-600">Activity followed by relaxation</p>
                        </div>
                        <div class="bg-white p-3 rounded-lg">
                            <p class="font-medium">🧘‍♀️ Yoga + Brunch</p>
                            <p class="text-gray-600">Gentle movement and good food</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Real-Time Personalized Demo -->
    <div class="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">See Personalization In Action</h2>
                <p class="text-lg sm:text-xl text-gray-600">Watch AI adapt suggestions based on your relationship profile</p>
            </div>

            <!-- Demo Interface -->
            <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-xl max-w-5xl mx-auto">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-3">
                        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span class="text-sm text-gray-500">AI Personalization Engine</span>
                </div>

                <!-- Demo Scenario Selector -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Choose a couple to see their personalized suggestions:</h3>
                    <div class="grid sm:grid-cols-3 gap-4 mb-6">
                        <button class="couple-btn bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 p-4 rounded-lg text-left transition-colors" data-couple="sarah-mike">
                            <div class="flex items-center space-x-3 mb-2">
                                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span class="text-white text-sm font-bold">S</span>
                                </div>
                                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <span class="text-white text-sm font-bold">M</span>
                                </div>
                            </div>
                            <p class="font-medium text-gray-900">Sarah & Mike</p>
                            <p class="text-sm text-gray-600">Creative + Analytical, $75 budget</p>
                        </button>
                        <button class="couple-btn bg-purple-50 hover:bg-purple-100 border-2 border-transparent p-4 rounded-lg text-left transition-colors" data-couple="alex-jordan">
                            <div class="flex items-center space-x-3 mb-2">
                                <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                    <span class="text-white text-sm font-bold">A</span>
                                </div>
                                <div class="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                                    <span class="text-white text-sm font-bold">J</span>
                                </div>
                            </div>
                            <p class="font-medium text-gray-900">Alex & Jordan</p>
                            <p class="text-sm text-gray-600">Adventurous + Cautious, $120 budget</p>
                        </button>
                        <button class="couple-btn bg-green-50 hover:bg-green-100 border-2 border-transparent p-4 rounded-lg text-left transition-colors" data-couple="emma-david">
                            <div class="flex items-center space-x-3 mb-2">
                                <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                    <span class="text-white text-sm font-bold">E</span>
                                </div>
                                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span class="text-white text-sm font-bold">D</span>
                                </div>
                            </div>
                            <p class="font-medium text-gray-900">Emma & David</p>
                            <p class="text-sm text-gray-600">Introverts, $40 budget</p>
                        </button>
                    </div>
                </div>

                <!-- Demo Results -->
                <div id="demo-results">
                    <!-- Sarah & Mike Results (Default) -->
                    <div id="sarah-mike-results" class="demo-content">
                        <div class="bg-blue-50 p-6 rounded-lg mb-6">
                            <h4 class="font-bold text-blue-900 mb-3">🧠 AI Analysis for Sarah & Mike</h4>
                            <div class="grid sm:grid-cols-2 gap-4 text-sm">
                                <div class="space-y-2">
                                    <p><i class="fas fa-palette mr-2 text-purple-600"></i><strong>Sarah:</strong> Creative, loves art & music</p>
                                    <p><i class="fas fa-clock mr-2 text-blue-600"></i>Free weekends, busy weekdays</p>
                                    <p><i class="fas fa-heart mr-2 text-red-500"></i>Prefers meaningful conversations</p>
                                </div>
                                <div class="space-y-2">
                                    <p><i class="fas fa-calculator mr-2 text-gray-600"></i><strong>Mike:</strong> Analytical, tech enthusiast</p>
                                    <p><i class="fas fa-coffee mr-2 text-brown-600"></i>Coffee lover, morning person</p>
                                    <p><i class="fas fa-dollar-sign mr-2 text-green-600"></i>Budget-conscious, $75 comfort zone</p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div class="bg-white border-2 border-blue-200 p-6 rounded-lg">
                                <div class="flex items-start justify-between mb-4">
                                    <h5 class="font-bold text-gray-900 text-lg">🎨 Interactive Art & Tech Exhibition</h5>
                                    <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Perfect Match</span>
                                </div>
                                <p class="text-gray-600 mb-4">Modern art museum featuring digital installations - combines Sarah's artistic passion with Mike's tech interests</p>
                                <div class="grid sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p class="text-sm"><strong>When:</strong> Saturday 2-5 PM</p>
                                        <p class="text-sm"><strong>Cost:</strong> $60 total</p>
                                        <p class="text-sm"><strong>Location:</strong> Downtown Arts District</p>
                                    </div>
                                    <div>
                                        <p class="text-sm"><strong>Why Perfect:</strong></p>
                                        <p class="text-sm text-gray-600">• Stimulates both creative and analytical minds</p>
                                        <p class="text-sm text-gray-600">• Plenty of conversation starters</p>
                                    </div>
                                </div>
                                <div class="flex gap-3">
                                    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">Book This Experience</button>
                                    <button class="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">See Similar Options</button>
                                </div>
                            </div>

                            <div class="bg-gray-50 p-4 rounded-lg">
                                <p class="text-sm text-gray-700"><strong>AI Insight:</strong> "This suggestion combines both partners' interests while staying within budget. The interactive nature will give Mike technical aspects to analyze while providing Sarah with artistic inspiration for meaningful conversations."</p>
                            </div>
                        </div>
                    </div>

                    <!-- Alex & Jordan Results (Hidden by default) -->
                    <div id="alex-jordan-results" class="demo-content hidden">
                        <div class="bg-purple-50 p-6 rounded-lg mb-6">
                            <h4 class="font-bold text-purple-900 mb-3">🧠 AI Analysis for Alex & Jordan</h4>
                            <div class="grid sm:grid-cols-2 gap-4 text-sm">
                                <div class="space-y-2">
                                    <p><i class="fas fa-mountain mr-2 text-green-600"></i><strong>Alex:</strong> Adventurous, loves new experiences</p>
                                    <p><i class="fas fa-plane mr-2 text-blue-600"></i>Recently tried skydiving, wants thrills</p>
                                    <p><i class="fas fa-users mr-2 text-orange-600"></i>Energetic, social butterfly</p>
                                </div>
                                <div class="space-y-2">
                                    <p><i class="fas fa-shield-alt mr-2 text-blue-600"></i><strong>Jordan:</strong> Cautious, values safety</p>
                                    <p><i class="fas fa-book mr-2 text-purple-600"></i>Prefers familiar environments</p>
                                    <p><i class="fas fa-dollar-sign mr-2 text-green-600"></i>Higher budget for special experiences</p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div class="bg-white border-2 border-purple-200 p-6 rounded-lg">
                                <div class="flex items-start justify-between mb-4">
                                    <h5 class="font-bold text-gray-900 text-lg">🧗‍♀️ Guided Indoor Rock Climbing + Spa</h5>
                                    <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Compromise Winner</span>
                                </div>
                                <p class="text-gray-600 mb-4">Professional climbing gym with certified instructors, followed by couples massage at adjacent spa</p>
                                <div class="grid sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p class="text-sm"><strong>When:</strong> Saturday 4-8 PM</p>
                                        <p class="text-sm"><strong>Cost:</strong> $115 total</p>
                                        <p class="text-sm"><strong>Safety:</strong> Professional instruction</p>
                                    </div>
                                    <div>
                                        <p class="text-sm"><strong>Why Perfect:</strong></p>
                                        <p class="text-sm text-gray-600">• Adventure with safety measures</p>
                                        <p class="text-sm text-gray-600">• Relaxing spa time after activity</p>
                                    </div>
                                </div>
                                <div class="flex gap-3">
                                    <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">Perfect! Book Now</button>
                                    <button class="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">Show Alternatives</button>
                                </div>
                            </div>

                            <div class="bg-gray-50 p-4 rounded-lg">
                                <p class="text-sm text-gray-700"><strong>AI Insight:</strong> "This balances Alex's need for adventure with Jordan's preference for safety. The professional instruction addresses safety concerns while the spa provides relaxation after the thrill - perfect for both personality types."</p>
                            </div>
                        </div>
                    </div>

                    <!-- Emma & David Results (Hidden by default) -->
                    <div id="emma-david-results" class="demo-content hidden">
                        <div class="bg-green-50 p-6 rounded-lg mb-6">
                            <h4 class="font-bold text-green-900 mb-3">🧠 AI Analysis for Emma & David</h4>
                            <div class="grid sm:grid-cols-2 gap-4 text-sm">
                                <div class="space-y-2">
                                    <p><i class="fas fa-book mr-2 text-blue-600"></i><strong>Emma:</strong> Introvert, loves reading</p>
                                    <p><i class="fas fa-home mr-2 text-green-600"></i>Prefers intimate, quiet settings</p>
                                    <p><i class="fas fa-coffee mr-2 text-brown-600"></i>Coffee enthusiast, values deep conversations</p>
                                </div>
                                <div class="space-y-2">
                                    <p><i class="fas fa-leaf mr-2 text-green-600"></i><strong>David:</strong> Also introverted, nature lover</p>
                                    <p><i class="fas fa-camera mr-2 text-purple-600"></i>Photography hobbyist</p>
                                    <p><i class="fas fa-piggy-bank mr-2 text-green-600"></i>Budget-conscious, $40 comfort zone</p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div class="bg-white border-2 border-green-200 p-6 rounded-lg">
                                <div class="flex items-start justify-between mb-4">
                                    <h5 class="font-bold text-gray-900 text-lg">📚 Cozy Bookstore Café + Garden Walk</h5>
                                    <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Introvert Perfect</span>
                                </div>
                                <p class="text-gray-600 mb-4">Browse books at the independent bookstore café, then peaceful walk through the botanical garden</p>
                                <div class="grid sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p class="text-sm"><strong>When:</strong> Sunday 10 AM-1 PM</p>
                                        <p class="text-sm"><strong>Cost:</strong> $35 total</p>
                                        <p class="text-sm"><strong>Vibe:</strong> Quiet, intimate</p>
                                    </div>
                                    <div>
                                        <p class="text-sm"><strong>Why Perfect:</strong></p>
                                        <p class="text-sm text-gray-600">• No crowds, peaceful environment</p>
                                        <p class="text-sm text-gray-600">• Great photo opportunities for David</p>
                                    </div>
                                </div>
                                <div class="flex gap-3">
                                    <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">This Sounds Perfect</button>
                                    <button class="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">More Quiet Options</button>
                                </div>
                            </div>

                            <div class="bg-gray-50 p-4 rounded-lg">
                                <p class="text-sm text-gray-700"><strong>AI Insight:</strong> "This suggestion respects both partners' introverted nature while providing stimulating environments. The bookstore offers conversation topics while the garden provides David photo opportunities and Emma peaceful natural beauty - all within their budget comfort zone."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Continuous Learning -->
    <div class="py-12 sm:py-16 lg:py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Gets Better Every Single Date</h2>
                <p class="text-lg sm:text-xl text-gray-600">Watch your AI relationship intelligence evolve</p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Learning Examples -->
                <div>
                    <h3 class="text-xl font-bold text-gray-900 mb-6">Real Learning Examples</h3>
                    <div class="space-y-6">
                        <div class="flex items-start space-x-4">
                            <div class="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-lightbulb text-blue-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">Learning from Feedback</h4>
                                <p class="text-gray-600 text-sm mb-2">"The Thai restaurant was too spicy for Sarah, but Mike loved it"</p>
                                <div class="bg-green-50 p-3 rounded-lg">
                                    <p class="text-green-800 text-sm"><strong>AI Adaptation:</strong> "Now suggests mild spice levels for Sarah but keeps ethnic cuisines Mike enjoys"</p>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-start space-x-4">
                            <div class="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-chart-line text-purple-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">Pattern Recognition</h4>
                                <p class="text-gray-600 text-sm mb-2">"They seem happiest after outdoor activities followed by quiet dinners"</p>
                                <div class="bg-purple-50 p-3 rounded-lg">
                                    <p class="text-purple-800 text-sm"><strong>AI Adaptation:</strong> "Now prioritizes active-to-calm activity combinations"</p>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-start space-x-4">
                            <div class="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-calendar-alt text-green-600"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">Seasonal Adaptation</h4>
                                <p class="text-gray-600 text-sm mb-2">"Winter dates focused on indoor activities got better ratings"</p>
                                <div class="bg-yellow-50 p-3 rounded-lg">
                                    <p class="text-yellow-800 text-sm"><strong>AI Adaptation:</strong> "Learned their seasonal preferences and weather sensitivity"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Learning Progress Chart -->
                <div class="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                    <h4 class="text-lg font-semibold text-gray-900 mb-6 text-center">Your AI's Learning Progress</h4>
                    
                    <!-- Mock Progress Chart -->
                    <div class="space-y-4">
                        <div>
                            <div class="flex justify-between text-sm mb-2">
                                <span class="text-gray-600">Date Success Rate</span>
                                <span class="text-green-600 font-medium">94%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="bg-green-500 h-3 rounded-full" style="width: 94%"></div>
                            </div>
                        </div>
                        
                        <div>
                            <div class="flex justify-between text-sm mb-2">
                                <span class="text-gray-600">Preference Accuracy</span>
                                <span class="text-blue-600 font-medium">87%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="bg-blue-500 h-3 rounded-full" style="width: 87%"></div>
                            </div>
                        </div>
                        
                        <div>
                            <div class="flex justify-between text-sm mb-2">
                                <span class="text-gray-600">Budget Optimization</span>
                                <span class="text-purple-600 font-medium">91%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="bg-purple-500 h-3 rounded-full" style="width: 91%"></div>
                            </div>
                        </div>
                        
                        <div>
                            <div class="flex justify-between text-sm mb-2">
                                <span class="text-gray-600">Timing Perfect Match</span>
                                <span class="text-red-600 font-medium">89%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="bg-red-500 h-3 rounded-full" style="width: 89%"></div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 p-4 bg-white rounded-lg">
                        <p class="text-center text-gray-700 font-medium">
                            <i class="fas fa-trophy text-yellow-500 mr-2"></i>
                            Your AI has learned from 47 successful dates
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Social Proof -->
    <div class="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Join 50,000+ Happy Couples</h2>
                <p class="text-lg sm:text-xl text-gray-600">See what makes our suggestions so special</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex items-center mb-4">
                        <div class="flex -space-x-1 mr-3">
                            <div class="w-10 h-10 bg-indigo-500 rounded-full border-2 border-white"></div>
                            <div class="w-10 h-10 bg-pink-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-900">Lisa & Carlos</p>
                            <div class="flex text-yellow-400">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                    <blockquote class="text-gray-700 italic mb-4">
                        "The AI suggested a pottery class for our different personalities - I'm creative, he's practical. It was perfect! We made matching mugs and had the best conversations."
                    </blockquote>
                    <p class="text-sm text-gray-500">Together 3 years • Portland, OR</p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex items-center mb-4">
                        <div class="flex -space-x-1 mr-3">
                            <div class="w-10 h-10 bg-blue-500 rounded-full border-2 border-white"></div>
                            <div class="w-10 h-10 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-900">Marcus & Jamie</p>
                            <div class="flex text-yellow-400">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                    <blockquote class="text-gray-700 italic mb-4">
                        "We were stuck in a rut of the same dinner-and-movie dates. The AI introduced us to rock climbing, cooking classes, even swing dancing! Our relationship feels fresh again."
                    </blockquote>
                    <p class="text-sm text-gray-500">Together 5 years • Austin, TX</p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <div class="flex items-center mb-4">
                        <div class="flex -space-x-1 mr-3">
                            <div class="w-10 h-10 bg-purple-500 rounded-full border-2 border-white"></div>
                            <div class="w-10 h-10 bg-red-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-900">Priya & Tom</p>
                            <div class="flex text-yellow-400">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                    <blockquote class="text-gray-700 italic mb-4">
                        "As busy doctors, we barely had time to plan dates. The AI handles everything and always suggests activities that help us decompress from work stress."
                    </blockquote>
                    <p class="text-sm text-gray-500">Together 2 years • Chicago, IL</p>
                </div>
            </div>

            <!-- Stats -->
            <div class="grid sm:grid-cols-4 gap-6 text-center">
                <div class="bg-white p-6 rounded-xl">
                    <div class="text-3xl font-bold text-purple-600 mb-2">96%</div>
                    <p class="text-gray-600">Suggestion Success Rate</p>
                </div>
                <div class="bg-white p-6 rounded-xl">
                    <div class="text-3xl font-bold text-blue-600 mb-2">4.2x</div>
                    <p class="text-gray-600">More Date Variety</p>
                </div>
                <div class="bg-white p-6 rounded-xl">
                    <div class="text-3xl font-bold text-green-600 mb-2">$47</div>
                    <p class="text-gray-600">Average Saved Per Date</p>
                </div>
                <div class="bg-white p-6 rounded-xl">
                    <div class="text-3xl font-bold text-red-600 mb-2">89%</div>
                    <p class="text-gray-600">Report Stronger Bond</p>
                </div>
            </div>
        </div>
    </div>

    <!-- CTA Section -->
    <div class="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready for Perfectly Personalized Date Nights?
            </h2>
            <p class="text-lg sm:text-xl text-purple-100 mb-8">
                Let AI learn what makes your relationship special and suggest experiences you'll both love
            </p>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <button class="w-full sm:w-auto bg-white text-purple-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
                    <i class="fas fa-brain mr-2"></i>Start Personalizing Now
                </button>
                <button class="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-purple-600 transition-colors font-semibold text-lg">
                    <i class="fas fa-magic mr-2"></i>See Demo First
                </button>
            </div>
            <p class="text-purple-100 text-sm">
                Free 7-day trial • No credit card required • Cancel anytime
            </p>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <div class="flex justify-center items-center mb-6">
                    <span class="text-2xl mr-2">💕</span>
                    <span class="text-xl font-bold">Better Together</span>
                </div>
                <p class="mb-6">AI-powered relationship experiences that grow with you</p>
                <div class="flex flex-wrap justify-center gap-6 text-sm">
                    <a href="/ai-coach.html" class="hover:text-white">AI Coach</a>
                    <a href="/smart-scheduling.html" class="hover:text-white">Smart Scheduling</a>
                    <a href="/intelligent-suggestions.html" class="text-purple-400 hover:text-purple-300">Suggestions</a>
                    <a href="/mobile-ui.html" class="hover:text-white">Mobile Design</a>
                    <a href="/" class="hover:text-white">Home</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobileMenuButton');
            const mobileMenu = document.getElementById('mobileMenu');
            
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // Close mobile menu when clicking on links
            const mobileLinks = mobileMenu?.querySelectorAll('a');
            if (mobileLinks) {
                mobileLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileMenu.classList.add('hidden');
                    });
                });
            }

            // Responsive behavior
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 768 && mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            });

            // Touch-friendly buttons on mobile
            if (window.innerWidth <= 768) {
                const buttons = document.querySelectorAll('button');
                buttons.forEach(button => {
                    button.style.minHeight = '44px';
                });
            }

            // Demo couple selection functionality
            const coupleButtons = document.querySelectorAll('.couple-btn');
            const demoContents = document.querySelectorAll('.demo-content');

            coupleButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const coupleId = this.getAttribute('data-couple');
                    
                    // Update button states
                    coupleButtons.forEach(btn => {
                        btn.classList.remove('border-blue-200', 'bg-blue-100');
                        btn.classList.add('border-transparent', 'bg-purple-50', 'hover:bg-purple-100');
                    });
                    this.classList.remove('border-transparent', 'bg-purple-50', 'hover:bg-purple-100');
                    this.classList.add('border-blue-200', 'bg-blue-100');
                    
                    // Show corresponding demo content
                    demoContents.forEach(content => {
                        content.classList.add('hidden');
                    });
                    document.getElementById(coupleId + '-results').classList.remove('hidden');
                });
            });

            // Set Sarah & Mike as default selected
            if (coupleButtons.length > 0) {
                coupleButtons[0].classList.remove('border-transparent', 'bg-purple-50', 'hover:bg-purple-100');
                coupleButtons[0].classList.add('border-blue-200', 'bg-blue-100');
            }
        });
    <\/script>
</body>
</html>`,Vi=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iPhone User Interactions - See Real Couples Using Better Together</title>
    <meta name="description" content="Watch real couples use Better Together on iPhone. See actual AI conversations, scheduling in action, and relationship coaching scenarios with authentic user interactions.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d'
                        }
                    }
                }
            }
        }
    <\/script>
    <style>
        /* iPhone-specific responsive classes */
        .iphone-screen {
            width: 375px;
            height: 812px;
            max-width: 100%;
        }
        @media (max-width: 640px) {
            .iphone-screen {
                width: 100%;
                height: auto;
                min-height: 600px;
            }
        }
        /* Custom animation for typing effect */
        @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
        }
        .typing-animation {
            overflow: hidden;
            white-space: nowrap;
            animation: typing 2s steps(40, end);
        }
        /* Custom styles for interactive elements */
        .interaction-step {
            transition: all 0.3s ease;
        }
        .interaction-step.active {
            transform: scale(1.02);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
    </style>
</head>
<body class="bg-gray-50 overflow-x-hidden">
    ${H}

    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-blue-50 to-purple-50 py-12 sm:py-16 lg:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="flex justify-center mb-6">
                <div class="bg-blue-100 p-4 rounded-full">
                    <i class="fas fa-mobile-alt text-4xl text-blue-600"></i>
                </div>
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                See Real Couples Using Better Together
            </h1>
            <p class="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Watch authentic iPhone interactions showing how couples actually use AI coaching, smart scheduling, 
                and personalized suggestions to <strong>strengthen their relationships daily</strong>.
            </p>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <button class="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base">
                    <i class="fas fa-play mr-2"></i>
                    Start Interactive Demo
                </button>
                <button class="w-full sm:w-auto border border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm sm:text-base">
                    <i class="fas fa-download mr-2"></i>
                    Try on Your iPhone
                </button>
            </div>
        </div>
    </div>

    <!-- Scenario Selector -->
    <div class="py-12 sm:py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose a Real User Scenario</h2>
                <p class="text-lg sm:text-xl text-gray-600">Select a couple to see their authentic iPhone interactions</p>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <!-- Scenario 1: Busy Professionals -->
                <div class="scenario-card cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all" data-scenario="busy-professionals">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-bold">M</span>
                        </div>
                        <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-bold">L</span>
                        </div>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Mike & Lisa</h3>
                    <p class="text-sm text-gray-600 mb-3">Busy professionals, NYC</p>
                    <div class="space-y-2 text-xs">
                        <div class="bg-white p-2 rounded">⏰ "Schedule date night around work"</div>
                        <div class="bg-white p-2 rounded">🤖 AI finds perfect solution</div>
                    </div>
                </div>

                <!-- Scenario 2: New Parents -->
                <div class="scenario-card cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-transparent hover:border-green-400 transition-all" data-scenario="new-parents">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-bold">S</span>
                        </div>
                        <div class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-bold">J</span>
                        </div>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Sarah & James</h3>
                    <p class="text-sm text-gray-600 mb-3">New parents, Austin TX</p>
                    <div class="space-y-2 text-xs">
                        <div class="bg-white p-2 rounded">👶 "Need couple time with baby"</div>
                        <div class="bg-white p-2 rounded">💡 AI suggests solutions</div>
                    </div>
                </div>

                <!-- Scenario 3: Long Distance -->
                <div class="scenario-card cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-transparent hover:border-purple-400 transition-all" data-scenario="long-distance">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-bold">A</span>
                        </div>
                        <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-bold">C</span>
                        </div>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">Alex & Casey</h3>
                    <p class="text-sm text-gray-600 mb-3">Long-distance couple</p>
                    <div class="space-y-2 text-xs">
                        <div class="bg-white p-2 rounded">✈️ "Plan visit across time zones"</div>
                        <div class="bg-white p-2 rounded">📅 Smart scheduling magic</div>
                    </div>
                </div>

                <!-- Scenario 4: Anniversary Planning -->
                <div class="scenario-card cursor-pointer bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-transparent hover:border-yellow-400 transition-all" data-scenario="anniversary">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-bold">D</span>
                        </div>
                        <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                            <span class="text-white font-bold">R</span>
                        </div>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-2">David & Rachel</h3>
                    <p class="text-sm text-gray-600 mb-3">5-year anniversary</p>
                    <div class="space-y-2 text-xs">
                        <div class="bg-white p-2 rounded">💍 "Perfect anniversary surprise"</div>
                        <div class="bg-white p-2 rounded">✨ AI creates magic</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Interactive iPhone Demo Container -->
    <div class="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <!-- Scenario 1: Busy Professionals -->
            <div id="busy-professionals-demo" class="scenario-demo">
                <div class="text-center mb-12">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Mike & Lisa: Busy Professionals in NYC</h2>
                    <p class="text-lg text-gray-600">Watch how AI helps two lawyers with 70-hour work weeks maintain their relationship</p>
                </div>

                <div class="grid lg:grid-cols-2 gap-12 items-start">
                    <!-- iPhone Mockup -->
                    <div class="flex justify-center">
                        <div class="relative iphone-screen bg-black rounded-[3rem] p-3 shadow-2xl">
                            <!-- iPhone Screen -->
                            <div class="bg-white rounded-[2.5rem] h-full overflow-hidden relative">
                                <!-- Status Bar -->
                                <div class="bg-black text-white text-xs px-6 py-2 flex justify-between items-center rounded-t-[2.5rem]">
                                    <span>9:23 AM</span>
                                    <div class="flex items-center space-x-1">
                                        <i class="fas fa-signal"></i>
                                        <i class="fas fa-wifi"></i>
                                        <i class="fas fa-battery-full"></i>
                                    </div>
                                </div>

                                <!-- App Interface -->
                                <div class="h-full bg-white">
                                    <!-- Header -->
                                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                                        <div class="flex items-center justify-between">
                                            <h1 class="text-lg font-semibold">Better Together</h1>
                                            <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                                <i class="fas fa-heart text-sm"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Chat Interface -->
                                    <div class="p-4 space-y-4 h-full overflow-y-auto pb-20" id="chat-container-1">
                                        <!-- Step 1: User message -->
                                        <div class="flex justify-end demo-step" data-step="1" style="display: none;">
                                            <div class="bg-blue-500 text-white p-3 rounded-2xl max-w-xs">
                                                <p class="text-sm">We haven't had a date night in 3 weeks 😔 Lisa's working late again and I'm in court all day tomorrow. Can you help us find some time together?</p>
                                                <span class="text-xs text-blue-200">9:23 AM</span>
                                            </div>
                                        </div>

                                        <!-- Step 2: AI thinking -->
                                        <div class="flex justify-start demo-step" data-step="2" style="display: none;">
                                            <div class="bg-gray-100 p-3 rounded-2xl max-w-xs">
                                                <div class="flex items-center space-x-2">
                                                    <div class="flex space-x-1">
                                                        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
                                                        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                                                    </div>
                                                    <span class="text-xs text-gray-500">Analyzing calendars...</span>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Step 3: AI analysis -->
                                        <div class="flex justify-start demo-step" data-step="3" style="display: none;">
                                            <div class="bg-gray-100 p-3 rounded-2xl max-w-xs">
                                                <p class="text-sm">I found some opportunities! 📊</p>
                                                <div class="mt-2 text-xs space-y-1">
                                                    <div>📅 Both free Thursday 7-9 PM</div>
                                                    <div>📅 Saturday morning slot available</div>
                                                    <div>📍 3 restaurants near Lisa's office</div>
                                                </div>
                                                <span class="text-xs text-gray-500">9:24 AM</span>
                                            </div>
                                        </div>

                                        <!-- Step 4: AI suggestion -->
                                        <div class="flex justify-start demo-step" data-step="4" style="display: none;">
                                            <div class="bg-purple-100 border-l-4 border-purple-500 p-3 rounded-r-2xl max-w-xs">
                                                <h4 class="font-semibold text-purple-900 text-sm">Perfect Solution Found! ✨</h4>
                                                <div class="mt-2 space-y-2">
                                                    <div class="bg-white p-2 rounded-lg">
                                                        <p class="font-medium text-sm">🍝 Romano's Italian Bistro</p>
                                                        <p class="text-xs text-gray-600">Thursday 7:30 PM • 5 min from Lisa's office</p>
                                                        <p class="text-xs text-green-600">Table reserved! ✓</p>
                                                    </div>
                                                    <div class="bg-white p-2 rounded-lg">
                                                        <p class="text-xs">📱 Added to both calendars</p>
                                                        <p class="text-xs">🚗 Uber scheduled for Lisa</p>
                                                        <p class="text-xs">💐 Surprise flowers ordered</p>
                                                    </div>
                                                </div>
                                                <span class="text-xs text-gray-500">9:25 AM</span>
                                            </div>
                                        </div>

                                        <!-- Step 5: User response -->
                                        <div class="flex justify-end demo-step" data-step="5" style="display: none;">
                                            <div class="bg-blue-500 text-white p-3 rounded-2xl max-w-xs">
                                                <p class="text-sm">This is AMAZING! 🤩 You even thought of flowers? Lisa is going to love this. Thank you!</p>
                                                <span class="text-xs text-blue-200">9:26 AM</span>
                                            </div>
                                        </div>

                                        <!-- Step 6: AI follow-up -->
                                        <div class="flex justify-start demo-step" data-step="6" style="display: none;">
                                            <div class="bg-gray-100 p-3 rounded-2xl max-w-xs">
                                                <p class="text-sm">You're welcome! 💕 I also set a reminder for next week to check in about your next date. Building regular couple time is key for busy professionals like you two!</p>
                                                <div class="mt-2 text-xs bg-yellow-50 p-2 rounded">
                                                    <p>💡 <strong>Pro tip:</strong> I noticed you both rate Italian food highly. Want me to find a cooking class you could do together at home next weekend?</p>
                                                </div>
                                                <span class="text-xs text-gray-500">9:27 AM</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Message Input -->
                                    <div class="absolute bottom-0 left-0 right-0 bg-white border-t p-3">
                                        <div class="flex items-center space-x-2">
                                            <input type="text" placeholder="Message..." class="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm">
                                            <button class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                                <i class="fas fa-arrow-up text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Interaction Timeline -->
                    <div class="space-y-6">
                        <div class="bg-white p-6 rounded-xl shadow-sm">
                            <h3 class="text-xl font-semibold text-gray-900 mb-4">What's Happening Behind the Scenes</h3>
                            <div class="space-y-4" id="timeline-1">
                                <div class="timeline-step opacity-50" data-step="1">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span class="text-blue-600 font-bold text-sm">1</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">User Request Analysis</h4>
                                            <p class="text-sm text-gray-600">AI detects frustration and relationship maintenance need</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-step opacity-50" data-step="2">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span class="text-purple-600 font-bold text-sm">2</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">Smart Calendar Integration</h4>
                                            <p class="text-sm text-gray-600">Analyzes both Google Calendars, work patterns, commute times</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-step opacity-50" data-step="3">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <span class="text-green-600 font-bold text-sm">3</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">Personalized Location Intelligence</h4>
                                            <p class="text-sm text-gray-600">Uses previous preferences, location data, and reviews</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-step opacity-50" data-step="4">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                            <span class="text-yellow-600 font-bold text-sm">4</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">Automatic Booking & Coordination</h4>
                                            <p class="text-sm text-gray-600">Reserves table, schedules transport, orders surprise element</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-step opacity-50" data-step="5">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                            <span class="text-red-600 font-bold text-sm">5</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">Calendar Synchronization</h4>
                                            <p class="text-sm text-gray-600">Adds events to both calendars with preparation reminders</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-step opacity-50" data-step="6">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <span class="text-indigo-600 font-bold text-sm">6</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">Proactive Relationship Building</h4>
                                            <p class="text-sm text-gray-600">Suggests next steps and maintains relationship momentum</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Play Button -->
                        <div class="text-center">
                            <button id="play-demo-1" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                <i class="fas fa-play mr-2"></i>Watch This Interaction
                            </button>
                            <p class="text-sm text-gray-600 mt-2">2 minute interactive demo</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Scenario 2: New Parents -->
            <div id="new-parents-demo" class="scenario-demo hidden">
                <div class="text-center mb-12">
                    <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Sarah & James: New Parents Finding Balance</h2>
                    <p class="text-lg text-gray-600">See how AI helps exhausted parents maintain their romantic connection</p>
                </div>

                <div class="grid lg:grid-cols-2 gap-12 items-start">
                    <!-- iPhone Mockup for New Parents -->
                    <div class="flex justify-center">
                        <div class="relative iphone-screen bg-black rounded-[3rem] p-3 shadow-2xl">
                            <div class="bg-white rounded-[2.5rem] h-full overflow-hidden relative">
                                <!-- Status Bar -->
                                <div class="bg-black text-white text-xs px-6 py-2 flex justify-between items-center rounded-t-[2.5rem]">
                                    <span>2:15 AM</span>
                                    <div class="flex items-center space-x-1">
                                        <i class="fas fa-signal"></i>
                                        <i class="fas fa-wifi"></i>
                                        <i class="fas fa-battery-half"></i>
                                    </div>
                                </div>

                                <!-- App Interface -->
                                <div class="h-full bg-white">
                                    <!-- Header -->
                                    <div class="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4">
                                        <div class="flex items-center justify-between">
                                            <h1 class="text-lg font-semibold">Better Together</h1>
                                            <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                                <i class="fas fa-baby text-sm"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Chat Interface -->
                                    <div class="p-4 space-y-4 h-full overflow-y-auto pb-20" id="chat-container-2">
                                        <!-- Step 1: Sarah's late night message -->
                                        <div class="flex justify-end demo-step" data-step="1" style="display: none;">
                                            <div class="bg-green-500 text-white p-3 rounded-2xl max-w-xs">
                                                <p class="text-sm">Up feeding Emma again 😴 James and I barely talk anymore except about diapers and sleep schedules. We're losing ourselves as a couple...</p>
                                                <span class="text-xs text-green-200">2:15 AM</span>
                                            </div>
                                        </div>

                                        <!-- Step 2: AI empathetic response -->
                                        <div class="flex justify-start demo-step" data-step="2" style="display: none;">
                                            <div class="bg-pink-100 p-3 rounded-2xl max-w-xs">
                                                <p class="text-sm">Sarah, this is so normal for new parents ❤️ Let me help you and James reconnect even with Emma's schedule. I have some ideas that work specifically for couples with newborns.</p>
                                                <span class="text-xs text-gray-500">2:16 AM</span>
                                            </div>
                                        </div>

                                        <!-- Step 3: AI suggestions -->
                                        <div class="flex justify-start demo-step" data-step="3" style="display: none;">
                                            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-r-2xl max-w-xs">
                                                <h4 class="font-semibold text-gray-900 text-sm">Baby-Friendly Connection Ideas 👶</h4>
                                                <div class="mt-2 space-y-2">
                                                    <div class="bg-white p-2 rounded">
                                                        <p class="text-xs font-medium">🏠 At-Home Date Night</p>
                                                        <p class="text-xs text-gray-600">During Emma's 7-9 PM sleep window</p>
                                                    </div>
                                                    <div class="bg-white p-2 rounded">
                                                        <p class="text-xs font-medium">☕ Morning Connection Ritual</p>
                                                        <p class="text-xs text-gray-600">15 minutes before Emma wakes</p>
                                                    </div>
                                                    <div class="bg-white p-2 rounded">
                                                        <p class="text-xs font-medium">👨‍👩‍👧 Family Activities</p>
                                                        <p class="text-xs text-gray-600">Bond while including Emma</p>
                                                    </div>
                                                </div>
                                                <span class="text-xs text-gray-500">2:17 AM</span>
                                            </div>
                                        </div>

                                        <!-- Step 4: Specific plan -->
                                        <div class="flex justify-start demo-step" data-step="4" style="display: none;">
                                            <div class="bg-purple-100 p-3 rounded-2xl max-w-xs">
                                                <h4 class="font-semibold text-purple-900 text-sm">This Week's Plan ✨</h4>
                                                <div class="mt-2 space-y-2 text-xs">
                                                    <div class="bg-white p-2 rounded">
                                                        <strong>Tonight:</strong> Order takeout from your favorite Thai place, eat by candlelight after Emma's 7 PM feed
                                                    </div>
                                                    <div class="bg-white p-2 rounded">
                                                        <strong>Tomorrow:</strong> 15-minute coffee together at 6:30 AM (I'll set gentle alarms)
                                                    </div>
                                                    <div class="bg-white p-2 rounded">
                                                        <strong>Weekend:</strong> Baby-wearing walk through the park you loved pre-Emma
                                                    </div>
                                                </div>
                                                <span class="text-xs text-gray-500">2:18 AM</span>
                                            </div>
                                        </div>

                                        <!-- Step 5: Sarah's relieved response -->
                                        <div class="flex justify-end demo-step" data-step="5" style="display: none;">
                                            <div class="bg-green-500 text-white p-3 rounded-2xl max-w-xs">
                                                <p class="text-sm">This gives me hope 🥺 I was worried we'd never be "us" again. James will love the Thai food idea - it's where we had our first date!</p>
                                                <span class="text-xs text-green-200">2:19 AM</span>
                                            </div>
                                        </div>

                                        <!-- Step 6: AI encouragement -->
                                        <div class="flex justify-start demo-step" data-step="6" style="display: none;">
                                            <div class="bg-gray-100 p-3 rounded-2xl max-w-xs">
                                                <p class="text-sm">You two are still "you" - just evolving into an even stronger version! 💕 I've added these plans to both your calendars and will send gentle reminders. Emma is lucky to have parents who prioritize their love.</p>
                                                <div class="mt-2 text-xs bg-green-50 p-2 rounded">
                                                    <p>💡 <strong>New parent tip:</strong> I'll check in weekly with baby-phase appropriate suggestions. This season is temporary, but your love is forever!</p>
                                                </div>
                                                <span class="text-xs text-gray-500">2:20 AM</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Message Input -->
                                    <div class="absolute bottom-0 left-0 right-0 bg-white border-t p-3">
                                        <div class="flex items-center space-x-2">
                                            <input type="text" placeholder="Message..." class="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm">
                                            <button class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                                <i class="fas fa-arrow-up text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- New Parents Timeline -->
                    <div class="space-y-6">
                        <div class="bg-white p-6 rounded-xl shadow-sm">
                            <h3 class="text-xl font-semibold text-gray-900 mb-4">AI Adapts to Life Stages</h3>
                            <div class="space-y-4" id="timeline-2">
                                <div class="timeline-step opacity-50" data-step="1">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                                            <span class="text-pink-600 font-bold text-sm">1</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">Emotional Context Recognition</h4>
                                            <p class="text-sm text-gray-600">Detects new parent exhaustion and relationship strain patterns</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-step opacity-50" data-step="2">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <span class="text-green-600 font-bold text-sm">2</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">Life Stage Optimization</h4>
                                            <p class="text-sm text-gray-600">Adapts suggestions for baby schedules and energy levels</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-step opacity-50" data-step="3">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                            <span class="text-yellow-600 font-bold text-sm">3</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">Realistic Activity Matching</h4>
                                            <p class="text-sm text-gray-600">Only suggests activities that work with newborn constraints</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-step opacity-50" data-step="4">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span class="text-purple-600 font-bold text-sm">4</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">Memory & History Integration</h4>
                                            <p class="text-sm text-gray-600">References pre-baby relationship memories for continuity</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-step opacity-50" data-step="5">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <span class="text-indigo-600 font-bold text-sm">5</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">Gentle Momentum Building</h4>
                                            <p class="text-sm text-gray-600">Small, achievable steps that rebuild connection gradually</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-step opacity-50" data-step="6">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                                            <span class="text-teal-600 font-bold text-sm">6</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">Long-term Relationship Vision</h4>
                                            <p class="text-sm text-gray-600">Maintains hope and perspective during difficult transition periods</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Play Button -->
                        <div class="text-center">
                            <button id="play-demo-2" class="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                <i class="fas fa-play mr-2"></i>Watch This Interaction
                            </button>
                            <p class="text-sm text-gray-600 mt-2">2 minute interactive demo</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional scenarios would follow the same pattern... -->
            
        </div>
    </div>

    <!-- Real Impact Results -->
    <div class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Real Results from iPhone Users</h2>
                <p class="text-lg text-gray-600">These couples saw these improvements in just 30 days</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-calendar-check text-2xl text-blue-600"></i>
                    </div>
                    <div class="text-3xl font-bold text-gray-900 mb-2">3.2x</div>
                    <p class="text-gray-600">More quality time together</p>
                    <p class="text-xs text-gray-500 mt-2">From 2.3 hrs to 7.4 hrs per week</p>
                </div>

                <div class="text-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-heart text-2xl text-green-600"></i>
                    </div>
                    <div class="text-3xl font-bold text-gray-900 mb-2">89%</div>
                    <p class="text-gray-600">Feel more emotionally connected</p>
                    <p class="text-xs text-gray-500 mt-2">Based on daily check-in scores</p>
                </div>

                <div class="text-center">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-clock text-2xl text-purple-600"></i>
                    </div>
                    <div class="text-3xl font-bold text-gray-900 mb-2">6.5 hrs</div>
                    <p class="text-gray-600">Saved per week on planning</p>
                    <p class="text-xs text-gray-500 mt-2">More time for actual connection</p>
                </div>

                <div class="text-center">
                    <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-star text-2xl text-pink-600"></i>
                    </div>
                    <div class="text-3xl font-bold text-gray-900 mb-2">94%</div>
                    <p class="text-gray-600">Say it improved their relationship</p>
                    <p class="text-xs text-gray-500 mt-2">30-day follow-up survey</p>
                </div>
            </div>
        </div>
    </div>

    <!-- CTA Section -->
    <div class="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Experience This on Your iPhone?
            </h2>
            <p class="text-lg sm:text-xl text-blue-100 mb-8">
                Join thousands of couples who are building stronger relationships with AI-powered coaching and smart scheduling
            </p>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <button class="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg">
                    <i class="fab fa-apple mr-2"></i>Try on Your iPhone Now
                </button>
                <button class="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg">
                    <i class="fas fa-play mr-2"></i>Watch More Examples
                </button>
            </div>
            <p class="text-blue-100 text-sm">
                Works on iPhone 12 and later • iOS 15+ required • 7-day free trial
            </p>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <div class="flex justify-center items-center mb-6">
                    <span class="text-2xl mr-2">💕</span>
                    <span class="text-xl font-bold">Better Together</span>
                </div>
                <p class="mb-6">Real couples. Real conversations. Real results.</p>
                <div class="flex flex-wrap justify-center gap-6 text-sm">
                    <a href="/ai-coach.html" class="hover:text-white">AI Coach</a>
                    <a href="/smart-scheduling.html" class="hover:text-white">Smart Scheduling</a>
                    <a href="/intelligent-suggestions.html" class="hover:text-white">Suggestions</a>
                    <a href="/mobile-ui.html" class="hover:text-white">Mobile Design</a>
                    <a href="/iphone-examples.html" class="text-blue-400 hover:text-blue-300">Live Examples</a>
                    <a href="/" class="hover:text-white">Home</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobileMenuButton');
            const mobileMenu = document.getElementById('mobileMenu');
            
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // Close mobile menu when clicking on links
            const mobileLinks = mobileMenu?.querySelectorAll('a');
            if (mobileLinks) {
                mobileLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileMenu.classList.add('hidden');
                    });
                });
            }

            // Responsive behavior
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 768 && mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            });

            // Scenario selection functionality
            const scenarioCards = document.querySelectorAll('.scenario-card');
            const scenarioDemos = document.querySelectorAll('.scenario-demo');

            scenarioCards.forEach(card => {
                card.addEventListener('click', function() {
                    const scenario = this.getAttribute('data-scenario');
                    
                    // Update card states
                    scenarioCards.forEach(c => {
                        c.classList.remove('border-blue-400', 'bg-blue-100');
                        c.classList.add('border-transparent');
                    });
                    this.classList.add('border-blue-400');
                    
                    // Show corresponding demo
                    scenarioDemos.forEach(demo => {
                        demo.classList.add('hidden');
                    });
                    
                    const targetDemo = document.getElementById(scenario + '-demo');
                    if (targetDemo) {
                        targetDemo.classList.remove('hidden');
                    }
                });
            });

            // Interactive demo functionality
            function playDemo(demoNumber) {
                const chatContainer = document.getElementById('chat-container-' + demoNumber);
                const timeline = document.getElementById('timeline-' + demoNumber);
                const steps = chatContainer.querySelectorAll('.demo-step');
                const timelineSteps = timeline.querySelectorAll('.timeline-step');
                
                // Reset all steps
                steps.forEach(step => {
                    step.style.display = 'none';
                    step.classList.remove('active');
                });
                timelineSteps.forEach(step => {
                    step.classList.remove('opacity-100');
                    step.classList.add('opacity-50');
                });
                
                let currentStep = 0;
                
                function showNextStep() {
                    if (currentStep < steps.length) {
                        const step = steps[currentStep];
                        const timelineStep = timelineSteps[currentStep];
                        
                        step.style.display = 'flex';
                        step.classList.add('active');
                        
                        if (timelineStep) {
                            timelineStep.classList.remove('opacity-50');
                            timelineStep.classList.add('opacity-100');
                        }
                        
                        // Scroll chat to bottom
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                        
                        currentStep++;
                        
                        // Different timing for different steps
                        let delay = 2000; // Default 2 seconds
                        if (currentStep === 2) delay = 3000; // AI thinking takes longer
                        if (currentStep === 4) delay = 4000; // Complex suggestions take longer
                        
                        if (currentStep < steps.length) {
                            setTimeout(showNextStep, delay);
                        }
                    }
                }
                
                showNextStep();
            }

            // Play demo buttons
            document.getElementById('play-demo-1')?.addEventListener('click', function() {
                playDemo(1);
                this.innerHTML = '<i class="fas fa-refresh mr-2"></i>Replay Interaction';
            });

            document.getElementById('play-demo-2')?.addEventListener('click', function() {
                playDemo(2);
                this.innerHTML = '<i class="fas fa-refresh mr-2"></i>Replay Interaction';
            });

            // Set default scenario (busy professionals)
            if (scenarioCards.length > 0) {
                scenarioCards[0].click();
            }

            // Touch-friendly buttons on mobile
            if (window.innerWidth <= 768) {
                const buttons = document.querySelectorAll('button');
                buttons.forEach(button => {
                    button.style.minHeight = '44px';
                });
            }
        });
    <\/script>
</body>
</html>`,Ji=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Member Rewards & Savings | Better Together</title>
    <meta name="description" content="Unlock exclusive savings on date nights, getaways, and experiences as you grow your relationship with Better Together. Active couples save up to 50% on what they already love doing together.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        pink: {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d'
                        },
                        purple: {
                            500: '#8b5cf6',
                            600: '#7c3aed',
                            700: '#6d28d9'
                        }
                    },
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif']
                    }
                }
            }
        }
    <\/script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .gradient-bg {
            background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 50%, #ede9fe 100%);
        }
        .floating {
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
    </style>
</head>
<body class="bg-gray-50">
    ${H}

    <!-- Hero Section -->
    <section class="gradient-bg py-16 sm:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <!-- Breadcrumb Badge -->
                <div class="inline-flex items-center px-4 py-2 bg-pink-100 rounded-full text-pink-800 text-sm font-medium mb-8">
                    <i class="fas fa-heart mr-2"></i>
                    Member Exclusive Benefits
                </div>
                
                <!-- Main Headlines -->
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Your Relationship Growth
                    <span class="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                        Rewards You Both
                    </span>
                </h1>
                
                <p class="text-xl sm:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                    The more you use Better Together to strengthen your relationship, the more you save on the experiences you already love sharing
                </p>
                
                <!-- Value Proposition -->
                <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-lg max-w-4xl mx-auto mb-10">
                    <div class="grid md:grid-cols-3 gap-6 text-center">
                        <div class="space-y-3">
                            <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto">
                                <i class="fas fa-calendar-check text-white text-2xl"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900">Stay Connected</h3>
                            <p class="text-gray-600 text-sm">Have daily best friend chats and build your relationship streak</p>
                        </div>
                        <div class="space-y-3">
                            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
                                <i class="fas fa-gift text-white text-2xl"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900">Unlock Rewards</h3>
                            <p class="text-gray-600 text-sm">Earn exclusive discounts on experiences you're planning together</p>
                        </div>
                        <div class="space-y-3">
                            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                                <i class="fas fa-piggy-bank text-white text-2xl"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900">Save Together</h3>
                            <p class="text-gray-600 text-sm">Active couples save $2,400+ annually on date nights and trips</p>
                        </div>
                    </div>
                </div>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button class="w-full sm:w-auto bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-all transform hover:scale-105 shadow-lg">
                        <i class="fas fa-rocket mr-2"></i>
                        Start Earning Rewards
                    </button>
                    <button class="w-full sm:w-auto bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors shadow-md">
                        <i class="fas fa-play mr-2"></i>
                        See How It Works
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- How Member Rewards Work -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    How Your Relationship Activity Earns Rewards
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Better Together partners with top brands to give active couples exclusive access to savings on experiences they're already planning together.
                </p>
            </div>

            <div class="grid md:grid-cols-4 gap-8 mb-16">
                <!-- Step 1 -->
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                        1
                    </div>
                    <h3 class="text-xl font-semibold mb-4 text-gray-900">Use the App Together</h3>
                    <p class="text-gray-600">
                        Have daily best friend chats, plan activities, and engage with your AI coach to build your relationship streak and engagement score.
                    </p>
                </div>
                
                <!-- Step 2 -->
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                        2
                    </div>
                    <h3 class="text-xl font-semibold mb-4 text-gray-900">Earn Reward Tiers</h3>
                    <p class="text-gray-600">
                        Your consistent relationship activities unlock Bronze (Week 2), Silver (Month 1), Gold (Month 3), and Platinum (Month 6) member tiers.
                    </p>
                </div>
                
                <!-- Step 3 -->
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                        3
                    </div>
                    <h3 class="text-xl font-semibold mb-4 text-gray-900">Browse & Save</h3>
                    <p class="text-gray-600">
                        Access your member portal to discover exclusive discounts on restaurants, experiences, gifts, and getaways perfect for couples.
                    </p>
                </div>
                
                <!-- Step 4 -->
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                        4
                    </div>
                    <h3 class="text-xl font-semibold mb-4 text-gray-900">Enjoy & Track</h3>
                    <p class="text-gray-600">
                        Book your discounted experiences directly through the app and track your savings while building amazing memories together.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Member Tier Benefits -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Member Reward Tiers
                </h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    The more connected you become, the better your rewards get
                </p>
            </div>

            <div class="grid md:grid-cols-4 gap-6">
                <!-- Bronze Tier -->
                <div class="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-medal text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2 text-gray-900">Bronze Member</h3>
                        <p class="text-sm text-gray-600 mb-4">2+ weeks of consistent activity</p>
                        <div class="space-y-3 text-left">
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Up to 15% off local dining</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Access to date night deals</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">50 bonus reward credits monthly</span>
                            </div>
                        </div>
                        <div class="mt-6 p-3 bg-orange-50 rounded-lg">
                            <p class="text-orange-800 text-sm font-medium">Avg. Monthly Savings: $120</p>
                        </div>
                    </div>
                </div>

                <!-- Silver Tier -->
                <div class="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-300">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-star text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2 text-gray-900">Silver Member</h3>
                        <p class="text-sm text-gray-600 mb-4">1+ month of active engagement</p>
                        <div class="space-y-3 text-left">
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Up to 25% off dining & activities</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Exclusive weekend getaway deals</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">100 bonus reward credits monthly</span>
                            </div>
                        </div>
                        <div class="mt-6 p-3 bg-gray-50 rounded-lg">
                            <p class="text-gray-800 text-sm font-medium">Avg. Monthly Savings: $240</p>
                        </div>
                    </div>
                </div>

                <!-- Gold Tier -->
                <div class="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 shadow-lg text-white transform scale-105 relative">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div class="bg-white text-yellow-600 px-4 py-1 rounded-full text-sm font-bold">
                            Most Popular
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-crown text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Gold Member</h3>
                        <p class="text-sm text-yellow-100 mb-4">3+ months of relationship growth</p>
                        <div class="space-y-3 text-left">
                            <div class="flex items-center">
                                <i class="fas fa-check text-yellow-200 mr-3"></i>
                                <span class="text-sm">Up to 40% off premium experiences</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-yellow-200 mr-3"></i>
                                <span class="text-sm">Luxury travel partnerships</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-yellow-200 mr-3"></i>
                                <span class="text-sm">200 bonus reward credits monthly</span>
                            </div>
                        </div>
                        <div class="mt-6 p-3 bg-white bg-opacity-20 rounded-lg">
                            <p class="text-white text-sm font-medium">Avg. Monthly Savings: $420</p>
                        </div>
                    </div>
                </div>

                <!-- Platinum Tier -->
                <div class="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-gem text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2 text-gray-900">Platinum Member</h3>
                        <p class="text-sm text-gray-600 mb-4">6+ months of relationship mastery</p>
                        <div class="space-y-3 text-left">
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Up to 60% off luxury experiences</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">Exclusive event invitations</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-3"></i>
                                <span class="text-sm">500 bonus reward credits monthly</span>
                            </div>
                        </div>
                        <div class="mt-6 p-3 bg-purple-50 rounded-lg">
                            <p class="text-purple-800 text-sm font-medium">Avg. Monthly Savings: $680</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Partner Savings -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Where Your Savings Work
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    We've partnered with the brands couples already love to give you exclusive member pricing on experiences that strengthen your bond.
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Date Night Dining -->
                <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200 hover:shadow-lg transition-shadow">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-utensils text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900">Date Night Dining</h3>
                    </div>
                    <p class="text-gray-600 mb-4">
                        Save up to 35% at partner restaurants perfect for meaningful conversations and romantic evenings together.
                    </p>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Local Fine Dining</span>
                            <span class="text-pink-600 font-semibold">UP TO 25% OFF</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Wine & Dine Experiences</span>
                            <span class="text-pink-600 font-semibold">UP TO 30% OFF</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Cooking Classes</span>
                            <span class="text-pink-600 font-semibold">UP TO 35% OFF</span>
                        </div>
                    </div>
                    <div class="mt-6 p-3 bg-white rounded-lg border border-pink-200">
                        <p class="text-pink-800 text-sm"><strong>Real Member:</strong> "We saved $180 on our monthly date nights last year!" - Sarah & Mike</p>
                    </div>
                </div>

                <!-- Weekend Getaways -->
                <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-shadow">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-plane-departure text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900">Romantic Getaways</h3>
                    </div>
                    <p class="text-gray-600 mb-4">
                        Exclusive rates on couple-friendly accommodations, from cozy B&Bs to luxury resorts designed for connection.
                    </p>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Boutique Hotels</span>
                            <span class="text-purple-600 font-semibold">UP TO 40% OFF</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Couples Spa Retreats</span>
                            <span class="text-purple-600 font-semibold">UP TO 45% OFF</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Adventure Packages</span>
                            <span class="text-purple-600 font-semibold">35% OFF</span>
                        </div>
                    </div>
                    <div class="mt-6 p-3 bg-white rounded-lg border border-purple-200">
                        <p class="text-purple-800 text-sm"><strong>Real Member:</strong> "Our Napa Valley weekend cost half what we expected!" - James & Lisa</p>
                    </div>
                </div>

                <!-- Meaningful Gifts -->
                <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-gift text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900">Thoughtful Gifts</h3>
                    </div>
                    <p class="text-gray-600 mb-4">
                        Special pricing on personalized jewelry, custom art, and meaningful keepsakes that celebrate your unique bond.
                    </p>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Custom Jewelry</span>
                            <span class="text-blue-600 font-semibold">UP TO 30% OFF</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Personalized Art</span>
                            <span class="text-blue-600 font-semibold">25% OFF</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Memory Books</span>
                            <span class="text-blue-600 font-semibold">40% OFF</span>
                        </div>
                    </div>
                    <div class="mt-6 p-3 bg-white rounded-lg border border-blue-200">
                        <p class="text-blue-800 text-sm"><strong>Real Member:</strong> "The perfect anniversary gift for $100 less!" - Alex & Jordan</p>
                    </div>
                </div>

                <!-- Experience Adventures -->
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-shadow">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-mountain text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900">Adventure Experiences</h3>
                    </div>
                    <p class="text-gray-600 mb-4">
                        Try new activities together with member discounts on everything from dance lessons to hot air balloon rides.
                    </p>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Dance Lessons</span>
                            <span class="text-green-600 font-semibold">UP TO 30% OFF</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Wine Tours</span>
                            <span class="text-green-600 font-semibold">35% OFF</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Adventure Sports</span>
                            <span class="text-green-600 font-semibold">25% OFF</span>
                        </div>
                    </div>
                    <div class="mt-6 p-3 bg-white rounded-lg border border-green-200">
                        <p class="text-green-800 text-sm"><strong>Real Member:</strong> "Finally tried couples yoga - and saved $60!" - Maya & David</p>
                    </div>
                </div>

                <!-- Home & Wellness -->
                <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 hover:shadow-lg transition-shadow">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-home text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900">Home Together</h3>
                    </div>
                    <p class="text-gray-600 mb-4">
                        Build your shared space with discounts on couple-friendly home goods, wellness products, and tech that brings you closer.
                    </p>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Home Decor</span>
                            <span class="text-yellow-600 font-semibold">UP TO 25% OFF</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Wellness Products</span>
                            <span class="text-yellow-600 font-semibold">30% OFF</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Smart Home Tech</span>
                            <span class="text-yellow-600 font-semibold">20% OFF</span>
                        </div>
                    </div>
                    <div class="mt-6 p-3 bg-white rounded-lg border border-yellow-200">
                        <p class="text-yellow-800 text-sm"><strong>Real Member:</strong> "Our smart home setup cost $200 less!" - Emma & Chris</p>
                    </div>
                </div>

                <!-- Special Occasions -->
                <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-200 hover:shadow-lg transition-shadow">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-calendar-heart text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900">Special Celebrations</h3>
                    </div>
                    <p class="text-gray-600 mb-4">
                        Make your milestones memorable with exclusive access to venues, photographers, and celebration services.
                    </p>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Event Venues</span>
                            <span class="text-red-600 font-semibold">UP TO 20% OFF</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Photography</span>
                            <span class="text-red-600 font-semibold">35% OFF</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Celebration Planning</span>
                            <span class="text-red-600 font-semibold">25% OFF</span>
                        </div>
                    </div>
                    <div class="mt-6 p-3 bg-white rounded-lg border border-red-200">
                        <p class="text-red-800 text-sm"><strong>Real Member:</strong> "Our anniversary dinner saved us $150!" - Ryan & Taylor</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Success Stories -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Real Couples, Real Savings, Real Growth
                </h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    See how Better Together members are strengthening their relationships while saving money on experiences they love
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Success Story 1 -->
                <div class="bg-white rounded-xl p-6 shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                            <span class="text-pink-600 font-bold">S&M</span>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900">Sarah & Michael</h4>
                            <p class="text-sm text-gray-600">Gold Members • 4 months</p>
                        </div>
                    </div>
                    <blockquote class="text-gray-600 mb-4">
                        "We went from arguing about date night costs to actually looking forward to trying new places. The member discounts make it feel guilt-free, and our relationship has never been stronger."
                    </blockquote>
                    <div class="bg-pink-50 p-4 rounded-lg">
                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div class="text-2xl font-bold text-pink-600">$1,840</div>
                                <div class="text-sm text-gray-600">Total Saved</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-pink-600">127</div>
                                <div class="text-sm text-gray-600">Day Streak</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Success Story 2 -->
                <div class="bg-white rounded-xl p-6 shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                            <span class="text-purple-600 font-bold">J&L</span>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900">James & Lisa</h4>
                            <p class="text-sm text-gray-600">Platinum Members • 8 months</p>
                        </div>
                    </div>
                    <blockquote class="text-gray-600 mb-4">
                        "The app helped us identify our communication patterns, and the reward system made it fun to work on them together. Plus we saved enough for an amazing anniversary trip!"
                    </blockquote>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div class="text-2xl font-bold text-purple-600">$3,200</div>
                                <div class="text-sm text-gray-600">Total Saved</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-purple-600">89%</div>
                                <div class="text-sm text-gray-600">Connection Score</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Success Story 3 -->
                <div class="bg-white rounded-xl p-6 shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <span class="text-blue-600 font-bold">A&J</span>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900">Alex & Jordan</h4>
                            <p class="text-sm text-gray-600">Silver Members • 6 weeks</p>
                        </div>
                    </div>
                    <blockquote class="text-gray-600 mb-4">
                        "Even as new members, we're already seeing the benefits. The Bronze tier dining discounts paid for our weekly date nights, and our check-in streak is motivating!"
                    </blockquote>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div class="text-2xl font-bold text-blue-600">$420</div>
                                <div class="text-sm text-gray-600">Total Saved</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-blue-600">42</div>
                                <div class="text-sm text-gray-600">Day Streak</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Reward Credits System -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Reward Credits: Your Flexible Savings Currency
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Earn credits through app activity or purchase additional credits to unlock even more savings on experiences you love.
                </p>
            </div>

            <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
                <!-- How Credits Work -->
                <div class="space-y-6">
                    <h3 class="text-2xl font-semibold text-gray-900 mb-6">How Reward Credits Work</h3>
                    
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-coins text-pink-600"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-2">Earn Through Activity</h4>
                            <p class="text-gray-600">Complete check-ins, reach relationship milestones, and engage with your partner to earn credits automatically.</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-shopping-cart text-purple-600"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-2">Purchase Additional Credits</h4>
                            <p class="text-gray-600">Buy credit packs to unlock more savings opportunities and access premium partner deals.</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-ticket-alt text-blue-600"></i>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-2">Redeem for Savings</h4>
                            <p class="text-gray-600">Use credits to unlock exclusive discounts at partner locations or enhance your existing member tier benefits.</p>
                        </div>
                    </div>

                    <div class="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border border-pink-200">
                        <h4 class="font-semibold text-gray-900 mb-2">💡 Pro Tip</h4>
                        <p class="text-gray-600">Credits never expire! Save them up for special occasions or use them regularly to maximize your relationship experiences.</p>
                    </div>
                </div>

                <!-- Credit Packages -->
                <div class="space-y-6">
                    <h3 class="text-2xl font-semibold text-gray-900 mb-6">Credit Packages</h3>
                    
                    <!-- Starter Pack -->
                    <div class="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-pink-300 transition-colors">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="text-lg font-semibold text-gray-900">Starter Pack</h4>
                            <div class="text-2xl font-bold text-gray-900">$9.99</div>
                        </div>
                        <div class="space-y-2 mb-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">100 Reward Credits</span>
                                <span class="font-medium text-gray-900">$0.10 each</span>
                            </div>
                            <div class="text-sm text-gray-500">Perfect for date night upgrades</div>
                        </div>
                        <button class="w-full bg-gray-100 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                            Purchase Credits
                        </button>
                    </div>

                    <!-- Popular Pack -->
                    <div class="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg p-6 transform scale-105 relative">
                        <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <div class="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                                Best Value
                            </div>
                        </div>
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="text-lg font-semibold">Value Pack</h4>
                            <div class="text-2xl font-bold">$24.99</div>
                        </div>
                        <div class="space-y-2 mb-4">
                            <div class="flex justify-between">
                                <span class="text-pink-100">300 Reward Credits</span>
                                <span class="font-medium">$0.08 each</span>
                            </div>
                            <div class="text-sm text-pink-100">Great for weekend getaways</div>
                        </div>
                        <button class="w-full bg-white text-pink-600 py-2 rounded-lg font-medium hover:bg-pink-50 transition-colors">
                            Purchase Credits
                        </button>
                    </div>

                    <!-- Premium Pack -->
                    <div class="bg-white border-2 border-purple-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                        <div class="flex justify-between items-center mb-4">
                            <h4 class="text-lg font-semibold text-gray-900">Premium Pack</h4>
                            <div class="text-2xl font-bold text-gray-900">$49.99</div>
                        </div>
                        <div class="space-y-2 mb-4">
                            <div class="flex justify-between">
                                <span class="text-gray-600">750 Reward Credits</span>
                                <span class="font-medium text-gray-900">$0.07 each</span>
                            </div>
                            <div class="text-sm text-gray-500">Ideal for luxury experiences</div>
                        </div>
                        <button class="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                            Purchase Credits
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-br from-pink-600 to-purple-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
                Start Growing Your Relationship & Your Savings Today
            </h2>
            <p class="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
                Join thousands of couples who are not only building stronger relationships but also saving money on the experiences that matter most to them.
            </p>
            
            <!-- Member Benefits Summary -->
            <div class="grid md:grid-cols-3 gap-6 mb-10">
                <div class="bg-white bg-opacity-20 rounded-lg p-4">
                    <div class="text-2xl font-bold mb-2">$2,400+</div>
                    <div class="text-pink-100">Average Annual Savings</div>
                </div>
                <div class="bg-white bg-opacity-20 rounded-lg p-4">
                    <div class="text-2xl font-bold mb-2">500+</div>
                    <div class="text-pink-100">Partner Locations</div>
                </div>
                <div class="bg-white bg-opacity-20 rounded-lg p-4">
                    <div class="text-2xl font-bold mb-2">94%</div>
                    <div class="text-pink-100">Member Satisfaction</div>
                </div>
            </div>
            
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button class="w-full sm:w-auto bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-pink-50 transition-all transform hover:scale-105 shadow-lg">
                    <i class="fas fa-heart mr-2"></i>
                    Start Your Free Trial & Earn Rewards
                </button>
                <button class="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors">
                    <i class="fas fa-play mr-2"></i>
                    See Member Success Stories
                </button>
            </div>
            
            <!-- Trust Indicators -->
            <div class="mt-8 text-pink-100">
                <p class="text-sm">
                    <i class="fas fa-shield-alt mr-2"></i>
                    No credit card required • Cancel anytime • Member rewards start immediately
                </p>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8">
                <div class="space-y-4">
                    <div class="flex items-center">
                        <span class="text-2xl">💕</span>
                        <span class="ml-2 text-xl font-bold text-white">Better Together</span>
                    </div>
                    <p class="text-gray-400 leading-relaxed">
                        Strengthening relationships through intelligent connection tracking and exclusive member rewards.
                    </p>
                </div>
                
                <div>
                    <h5 className="font-semibold text-white mb-4">Product</h5>
                    <ul className="space-y-2">
                        <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                        <li><a href="/member-rewards.html" className="text-gray-400 hover:text-white transition-colors">Member Rewards</a></li>
                        <li><a href="/iphone-examples.html" className="text-gray-400 hover:text-white transition-colors">Examples</a></li>
                    </ul>
                </div>
                
                <div>
                    <h5 className="font-semibold text-white mb-4">Support</h5>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Member Portal</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                    </ul>
                </div>
                
                <div>
                    <h5 className="font-semibold text-white mb-4">Business</h5>
                    <ul className="space-y-2">
                        <li><a href="/become-sponsor.html" className="text-gray-400 hover:text-white transition-colors">Become a Partner</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partner Portal</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                <p className="text-gray-400">
                    &copy; 2025 Better Together. Grow stronger together, save smarter together.
                </p>
            </div>
        </div>
    </footer>

    <!-- Interactive JavaScript -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {


            // Smooth scrolling for anchor links
            const anchorLinks = document.querySelectorAll('a[href^="#"]');
            anchorLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const target = document.getElementById(targetId);
                    if (target) {
                        target.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Add hover effects to cards
            const cards = document.querySelectorAll('.bg-white.rounded-xl, .bg-gradient-to-br');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });

            // Animate numbers on scroll (simple version)
            const observerOptions = {
                threshold: 0.5,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe all sections
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.opacity = '0.95';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'all 0.6s ease-out';
                observer.observe(section);
            });
        });
    <\/script>
</body>
</html>
`,Ki=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Partner with Better Together | #1 Couples Platform</title>
    <meta name="description" content="Join 500+ premium brands partnering with Better Together. Access 50,000+ engaged couples actively investing $2.4K+ annually in relationship experiences. Apply now for exclusive partnership opportunities.">
    <meta name="keywords" content="business partnership, couples marketing, relationship platform, B2B partnerships, customer acquisition, couple demographics, engagement marketing">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        pink: {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d',
                            800: '#9d174d'
                        },
                        purple: {
                            500: '#8b5cf6',
                            600: '#7c3aed',
                            700: '#6d28d9'
                        }
                    },
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif']
                    },
                    animation: {
                        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
                        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate'
                    },
                    keyframes: {
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(30px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' }
                        },
                        slideInRight: {
                            '0%': { opacity: '0', transform: 'translateX(30px)' },
                            '100%': { opacity: '1', transform: 'translateX(0)' }
                        },
                        pulseGlow: {
                            '0%': { boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)' },
                            '100%': { boxShadow: '0 0 30px rgba(236, 72, 153, 0.8)' }
                        }
                    }
                }
            }
        }
    <\/script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .gradient-bg {
            background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 25%, #ede9fe 50%, #e0e7ff 75%, #f0f9ff 100%);
        }
        /* iOS 26 Liquid Glass Effects */
        .liquid-glass {
            backdrop-filter: blur(40px) saturate(180%);
            background: linear-gradient(145deg, 
                rgba(255, 255, 255, 0.15) 0%,
                rgba(255, 255, 255, 0.05) 50%,
                rgba(255, 255, 255, 0.1) 100%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 
                0 25px 45px -12px rgba(0, 0, 0, 0.1),
                0 0 0 1px rgba(255, 255, 255, 0.05) inset,
                0 1px 3px rgba(255, 255, 255, 0.2) inset;
        }
        .liquid-glass-dark {
            backdrop-filter: blur(40px) saturate(180%);
            background: linear-gradient(145deg, 
                rgba(0, 0, 0, 0.05) 0%,
                rgba(0, 0, 0, 0.02) 50%,
                rgba(0, 0, 0, 0.08) 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 
                0 25px 45px -12px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.03) inset,
                0 1px 3px rgba(255, 255, 255, 0.1) inset;
        }
        .liquid-glass-accent {
            backdrop-filter: blur(30px) saturate(200%);
            background: linear-gradient(145deg, 
                rgba(236, 72, 153, 0.12) 0%,
                rgba(139, 92, 246, 0.08) 50%,
                rgba(236, 72, 153, 0.15) 100%);
            border: 1px solid rgba(236, 72, 153, 0.2);
            box-shadow: 
                0 20px 40px -12px rgba(236, 72, 153, 0.25),
                0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                0 1px 3px rgba(255, 255, 255, 0.3) inset;
        }
        .glass-effect {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .floating-card {
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-10px) scale(1.02); }
        }
        /* iOS 26 Fluid Animations */
        .liquid-hover {
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .liquid-hover:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 
                0 35px 60px -12px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                0 2px 8px rgba(255, 255, 255, 0.4) inset;
        }
        .liquid-press {
            transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .liquid-press:active {
            transform: scale(0.98);
            box-shadow: 
                0 10px 25px -8px rgba(0, 0, 0, 0.2),
                0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        }
        .morphing-gradient {
            background: linear-gradient(45deg, 
                rgba(236, 72, 153, 0.8), 
                rgba(139, 92, 246, 0.8),
                rgba(59, 130, 246, 0.8),
                rgba(236, 72, 153, 0.8));
            background-size: 300% 300%;
            animation: morphGradient 8s ease infinite;
        }
        @keyframes morphGradient {
            0% { background-position: 0% 50%; }
            33% { background-position: 100% 50%; }
            66% { background-position: 50% 100%; }
            100% { background-position: 0% 50%; }
        }
        .video-thumbnail {
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .video-thumbnail:hover {
            transform: scale(1.05);
        }
        .play-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            background: rgba(236, 72, 153, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            transition: all 0.3s ease;
        }
        .video-thumbnail:hover .play-button {
            background: rgba(236, 72, 153, 1);
            transform: translate(-50%, -50%) scale(1.1);
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation - Liquid Glass -->
    <nav class="liquid-glass sticky top-0 z-50 border-b border-white/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="/" class="flex items-center liquid-hover">
                        <span class="text-2xl">💕</span>
                        <span class="ml-2 text-xl font-bold text-gray-900">Better Together</span>
                        <span class="ml-3 text-sm morphing-gradient text-white px-3 py-1 rounded-full font-semibold shadow-lg">Business</span>
                    </a>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">App Home</a>
                    <a href="/member-rewards.html" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">Member Rewards</a>
                    <a href="#roi-calculator" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">ROI Calculator</a>
                    <a href="#partnership-tiers" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">Partnership Tiers</a>
                    <a href="#book-demo" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">Book Demo</a>
                    <button class="liquid-glass-accent text-white px-6 py-2 rounded-lg font-semibold liquid-hover liquid-press shadow-lg">
                        Partner Portal Login
                    </button>
                </div>
                <div class="md:hidden">
                    <button class="text-gray-600 hover:text-gray-900 p-2" id="mobileMenuButton">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section - Enhanced -->
    <section class="gradient-bg py-20 sm:py-24 overflow-hidden relative">
        <!-- Background Elements -->
        <div class="absolute inset-0">
            <div class="absolute top-20 left-10 text-pink-200 text-6xl opacity-20 floating-card">💼</div>
            <div class="absolute bottom-20 right-10 text-purple-200 text-5xl opacity-20 floating-card" style="animation-delay: -3s;">📈</div>
            <div class="absolute top-1/2 left-1/4 text-blue-200 text-4xl opacity-20 floating-card" style="animation-delay: -1.5s;">🤝</div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div class="text-center">
                <!-- Authority Badge with Live Counter - Liquid Glass -->
                <div class="inline-flex items-center px-6 py-3 liquid-glass rounded-full shadow-lg text-gray-800 text-sm font-semibold mb-8 animate-fade-in-up liquid-hover">
                    <i class="fas fa-crown text-yellow-500 mr-3"></i>
                    <span class="mr-2">Trusted by</span>
                    <span class="text-pink-600 font-bold text-lg" id="partnerCount">500+</span>
                    <span class="ml-1">Premium Brands</span>
                    <div class="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span class="ml-1 text-green-600 text-xs">Live</span>
                </div>
                
                <!-- Main Headlines with Power Words -->
                <h1 class="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight animate-fade-in-up" style="animation-delay: 0.2s;">
                    Turn Engaged Couples Into
                    <span class="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 animate-pulse-glow">
                        Your Best Customers
                    </span>
                </h1>
                
                <p class="text-xl sm:text-2xl text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed font-medium animate-fade-in-up" style="animation-delay: 0.4s;">
                    Partner with the #1 relationship platform to access <strong class="text-pink-600">50,000+ actively engaged couples</strong> who invest an average of <strong class="text-green-600">$2,400+ annually</strong> in meaningful experiences together
                </p>
                
                <!-- Enhanced Value Proposition Cards -->
                <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 animate-fade-in-up" style="animation-delay: 0.6s;">
                    <div class="liquid-glass rounded-2xl p-6 text-center liquid-hover">
                        <div class="w-16 h-16 morphing-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <i class="fas fa-users-heart text-white text-2xl"></i>
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 mb-2">High-Intent Audience</h3>
                        <p class="text-gray-600">87% purchase within 7 days</p>
                        <div class="mt-2 text-2xl font-black text-pink-600">87%</div>
                    </div>
                    
                    <div class="liquid-glass rounded-2xl p-6 text-center liquid-hover">
                        <div class="w-16 h-16 morphing-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <i class="fas fa-chart-line text-white text-2xl"></i>
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 mb-2">Proven Growth</h3>
                        <p class="text-gray-600">Partners see +47% revenue increase</p>
                        <div class="mt-2 text-2xl font-black text-purple-600">+47%</div>
                    </div>
                    
                    <div class="liquid-glass rounded-2xl p-6 text-center liquid-hover">
                        <div class="w-16 h-16 morphing-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <i class="fas fa-rocket text-white text-2xl"></i>
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 mb-2">Fast Setup</h3>
                        <p class="text-gray-600">Live in 48 hours or less</p>
                        <div class="mt-2 text-2xl font-black text-blue-600">48h</div>
                    </div>
                </div>

                <!-- Enhanced CTA Section - Liquid Glass -->
                <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 animate-fade-in-up" style="animation-delay: 0.8s;">
                    <button class="group w-full sm:w-auto liquid-glass-accent text-white px-10 py-4 rounded-xl font-bold text-lg liquid-hover liquid-press shadow-2xl" onclick="scrollToSection('book-demo')">
                        <i class="fas fa-calendar-plus mr-3 group-hover:animate-bounce"></i>
                        Book Your Success Demo
                        <span class="block text-sm font-normal opacity-90">See Your ROI in 15 Minutes</span>
                    </button>
                    <button class="w-full sm:w-auto liquid-glass text-gray-700 px-10 py-4 rounded-xl font-bold text-lg border-2 border-white/30 liquid-hover liquid-press shadow-lg" onclick="scrollToSection('roi-calculator')">
                        <i class="fas fa-calculator mr-3"></i>
                        Calculate Your ROI
                        <span class="block text-sm font-normal text-gray-500">Free Revenue Projection</span>
                    </button>
                </div>

                <!-- Urgency & Scarcity Elements - Liquid Glass -->
                <div class="liquid-glass-dark rounded-xl p-4 max-w-2xl mx-auto animate-fade-in-up liquid-hover" style="animation-delay: 1s;">
                    <div class="flex items-center justify-center space-x-6 text-sm">
                        <div class="flex items-center text-red-600">
                            <i class="fas fa-fire mr-2 animate-pulse"></i>
                            <span class="font-semibold">LIMITED: Only <span id="spotsRemaining">23</span> Q1 spots remaining</span>
                        </div>
                        <div class="flex items-center text-green-600">
                            <i class="fas fa-shield-check mr-2"></i>
                            <span>Revenue Guarantee or Money Back</span>
                        </div>
                        <div class="flex items-center text-blue-600">
                            <i class="fas fa-clock mr-2"></i>
                            <span>5-Minute Application</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Interactive ROI Calculator - Liquid Glass -->
    <section class="py-20 gradient-bg" id="roi-calculator">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Calculate Your Partnership ROI
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    See exactly how much revenue Better Together can generate for your business with our interactive calculator
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 items-start">
                <!-- Calculator Inputs - Liquid Glass -->
                <div class="liquid-glass rounded-2xl p-8 shadow-xl liquid-hover">
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Your Business Details</h3>
                    
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-3">Business Type</label>
                            <select id="businessType" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white">
                                <option value="restaurant">Restaurant / Dining</option>
                                <option value="hotel">Hotel / Accommodation</option>
                                <option value="experience">Activities / Experiences</option>
                                <option value="retail">Retail / Gifts</option>
                                <option value="spa">Spa / Wellness</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-3">Average Order Value</label>
                            <div class="relative">
                                <span class="absolute left-3 top-3 text-gray-500 font-semibold">$</span>
                                <input type="number" id="avgOrderValue" value="150" min="10" max="10000" class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-3">Desired Monthly Customers</label>
                            <input type="range" id="monthlyCustomers" min="10" max="500" value="100" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                            <div class="flex justify-between text-sm text-gray-500 mt-1">
                                <span>10</span>
                                <span class="font-semibold text-pink-600" id="customerCount">100</span>
                                <span>500+</span>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-3">Commission Rate You Can Offer</label>
                            <input type="range" id="commissionRate" min="8" max="25" value="15" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                            <div class="flex justify-between text-sm text-gray-500 mt-1">
                                <span>8%</span>
                                <span class="font-semibold text-purple-600" id="commissionDisplay">15%</span>
                                <span>25%</span>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-3">Repeat Visit Rate</label>
                            <select id="repeatRate" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white">
                                <option value="1.2">20% repeat (1.2x lifetime value)</option>
                                <option value="1.5">50% repeat (1.5x lifetime value)</option>
                                <option value="2.0">High repeat (2.0x lifetime value)</option>
                                <option value="3.0">Very high repeat (3.0x lifetime value)</option>
                            </select>
                        </div>
                    </div>

                    <button class="w-full mt-8 liquid-glass-accent text-white py-4 rounded-lg font-bold text-lg liquid-hover liquid-press" onclick="calculateROI()">
                        <i class="fas fa-calculator mr-2"></i>
                        Calculate My ROI
                    </button>
                </div>

                <!-- ROI Results - Liquid Glass Dark -->
                <div class="liquid-glass-dark text-white rounded-2xl p-8 shadow-2xl liquid-hover">
                    <h3 class="text-2xl font-bold mb-6">Your Projected Results</h3>
                    
                    <div class="space-y-6">
                        <!-- Monthly Revenue -->
                        <div class="liquid-glass-accent rounded-xl p-6">
                            <div class="text-pink-100 text-sm font-medium mb-1">Monthly Revenue</div>
                            <div class="text-4xl font-black" id="monthlyRevenue">$15,000</div>
                            <div class="text-pink-200 text-sm mt-1" id="monthlyDetails">100 customers × $150 avg order</div>
                        </div>

                        <!-- Annual Revenue -->
                        <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6">
                            <div class="text-purple-100 text-sm font-medium mb-1">Annual Revenue Potential</div>
                            <div class="text-4xl font-black" id="annualRevenue">$180,000</div>
                            <div class="text-purple-200 text-sm mt-1" id="annualDetails">Including repeat customers</div>
                        </div>

                        <!-- Commission Cost -->
                        <div class="bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl p-6">
                            <div class="text-gray-300 text-sm font-medium mb-1">Annual Commission Cost</div>
                            <div class="text-3xl font-bold" id="commissionCost">$27,000</div>
                            <div class="text-gray-400 text-sm mt-1">15% commission rate</div>
                        </div>

                        <!-- Net Profit -->
                        <div class="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 border-2 border-green-400">
                            <div class="text-green-100 text-sm font-medium mb-1">Net Additional Profit</div>
                            <div class="text-4xl font-black" id="netProfit">$153,000</div>
                            <div class="text-green-200 text-sm mt-1" id="roiMultiple">5.7x return on investment</div>
                        </div>
                    </div>

                    <div class="mt-8 p-4 bg-yellow-500 bg-opacity-20 rounded-lg border border-yellow-400">
                        <div class="flex items-center text-yellow-200">
                            <i class="fas fa-lightbulb mr-2"></i>
                            <span class="text-sm font-medium">Pro Tip: Most partners see 20-40% higher results than projections due to Better Together's high-quality customer base.</span>
                        </div>
                    </div>

                    <button class="w-full mt-6 liquid-glass-accent text-white py-4 rounded-lg font-bold text-lg liquid-hover liquid-press" onclick="scrollToSection('apply-now')">
                        <i class="fas fa-rocket mr-2"></i>
                        Apply Now - Lock in These Results
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Video Testimonials & Case Studies - Liquid Glass -->
    <section class="py-20 gradient-bg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Real Partners, Real Results
                </h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    See how businesses just like yours are thriving with Better Together partnerships
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Video Testimonial 1 - Liquid Glass -->
                <div class="liquid-glass rounded-2xl shadow-xl overflow-hidden group liquid-hover">
                    <div class="video-thumbnail h-48 morphing-gradient relative">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                        <div class="absolute bottom-4 left-4 text-white">
                            <div class="text-sm opacity-90">Success Story</div>
                            <div class="font-bold">Bella Vista Restaurant</div>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-utensils text-pink-600"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900">Maria Rodriguez</h4>
                                <p class="text-sm text-gray-600">Owner, Bella Vista</p>
                            </div>
                        </div>
                        <blockquote class="text-gray-700 mb-4 italic">
                            "Better Together members became 35% of our weekend revenue in just 3 months. The quality of customers is incredible - they're engaged, spend more, and always return."
                        </blockquote>
                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div class="bg-pink-50 p-3 rounded-lg">
                                <div class="text-2xl font-bold text-pink-600">+73%</div>
                                <div class="text-xs text-gray-600">Revenue Growth</div>
                            </div>
                            <div class="bg-purple-50 p-3 rounded-lg">
                                <div class="text-2xl font-bold text-purple-600">4.9★</div>
                                <div class="text-xs text-gray-600">Customer Rating</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Video Testimonial 2 -->
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                    <div class="video-thumbnail h-48 bg-gradient-to-br from-blue-400 to-indigo-500 relative">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                        <div class="absolute bottom-4 left-4 text-white">
                            <div class="text-sm opacity-90">Case Study</div>
                            <div class="font-bold">Serenity Spa Resort</div>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-spa text-blue-600"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900">David Chen</h4>
                                <p class="text-sm text-gray-600">GM, Serenity Spa Resort</p>
                            </div>
                        </div>
                        <blockquote class="text-gray-700 mb-4 italic">
                            "Our partnership with Better Together transformed our couples packages. We went from 60% to 95% occupancy on weekends. The ROI has been phenomenal."
                        </blockquote>
                        <div class="grid grid-cols-2 gap-4 text-center">
                            <div class="bg-blue-50 p-3 rounded-lg">
                                <div class="text-2xl font-bold text-blue-600">+158%</div>
                                <div class="text-xs text-gray-600">Booking Value</div>
                            </div>
                            <div class="bg-indigo-50 p-3 rounded-lg">
                                <div class="text-2xl font-bold text-indigo-600">95%</div>
                                <div class="text-xs text-gray-600">Weekend Occupancy</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Written Testimonial with Chart -->
                <div class="bg-white rounded-2xl shadow-xl p-6 group hover:shadow-2xl transition-all duration-300">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                            <i class="fas fa-gem text-green-600"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-900">Sarah Williams</h4>
                            <p class="text-sm text-gray-600">Founder, Eternal Jewelry</p>
                        </div>
                    </div>
                    
                    <blockquote class="text-gray-700 mb-6 italic">
                        "As a small jewelry business, Better Together gave us access to couples actively looking for meaningful gifts. We've tripled our custom engagement orders."
                    </blockquote>
                    
                    <!-- Mini Chart -->
                    <div class="mb-6">
                        <canvas id="jewelryChart" width="300" height="150"></canvas>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 text-center">
                        <div class="bg-green-50 p-3 rounded-lg">
                            <div class="text-2xl font-bold text-green-600">+245%</div>
                            <div class="text-xs text-gray-600">Custom Orders</div>
                        </div>
                        <div class="bg-yellow-50 p-3 rounded-lg">
                            <div class="text-2xl font-bold text-yellow-600">$540</div>
                            <div class="text-xs text-gray-600">Avg Order Value</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- View All Success Stories CTA -->
            <div class="text-center mt-12">
                <button class="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-pink-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
                    <i class="fas fa-video mr-2"></i>
                    Watch All Success Stories
                </button>
            </div>
        </div>
    </section>

    <!-- Enhanced Partnership Tiers -->
    <section class="py-20 bg-white" id="partnership-tiers">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Choose Your Partnership Level
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    From local businesses to enterprise brands, we have the perfect partnership tier to accelerate your growth
                </p>
            </div>

            <!-- Partnership Comparison Table -->
            <div class="mb-12 overflow-x-auto">
                <table class="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                    <thead class="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
                        <tr>
                            <th class="px-6 py-4 text-left font-bold">Features</th>
                            <th class="px-6 py-4 text-center font-bold">Featured<br><small class="font-normal opacity-90">Local/Emerging</small></th>
                            <th class="px-6 py-4 text-center font-bold bg-yellow-500 bg-opacity-20 relative">
                                Premium<br><small class="font-normal opacity-90">Established</small>
                                <div class="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">POPULAR</div>
                            </th>
                            <th class="px-6 py-4 text-center font-bold">Elite<br><small class="font-normal opacity-90">Enterprise</small></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 font-semibold text-gray-900">Commission Rate</td>
                            <td class="px-6 py-4 text-center">8-12%</td>
                            <td class="px-6 py-4 text-center bg-yellow-50 font-semibold text-purple-600">12-18%</td>
                            <td class="px-6 py-4 text-center">Custom</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 font-semibold text-gray-900">Monthly Minimum</td>
                            <td class="px-6 py-4 text-center">$500</td>
                            <td class="px-6 py-4 text-center bg-yellow-50 font-semibold text-purple-600">$2,000</td>
                            <td class="px-6 py-4 text-center">$10,000+</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 font-semibold text-gray-900">App Placement</td>
                            <td class="px-6 py-4 text-center">Directory Listing</td>
                            <td class="px-6 py-4 text-center bg-yellow-50 font-semibold text-purple-600">Featured Spots</td>
                            <td class="px-6 py-4 text-center">Premium Placement</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 font-semibold text-gray-900">Account Management</td>
                            <td class="px-6 py-4 text-center">Email Support</td>
                            <td class="px-6 py-4 text-center bg-yellow-50 font-semibold text-purple-600">Dedicated Manager</td>
                            <td class="px-6 py-4 text-center">Strategic Partnership Team</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 font-semibold text-gray-900">Marketing Support</td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-check text-green-500"></i></td>
                            <td class="px-6 py-4 text-center bg-yellow-50"><i class="fas fa-check-double text-purple-600"></i></td>
                            <td class="px-6 py-4 text-center"><i class="fas fa-crown text-yellow-500"></i></td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <!-- Partnership Cards -->
            <div class="grid md:grid-cols-3 gap-8">
                <!-- Featured Partner -->
                <div class="bg-white rounded-2xl shadow-xl border-2 border-gray-200 hover:border-pink-300 transition-all duration-300 group">
                    <div class="p-8">
                        <div class="text-center">
                            <div class="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <i class="fas fa-handshake text-white text-3xl"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-2 text-gray-900">Featured Partner</h3>
                            <p class="text-gray-600 mb-6">Perfect for local businesses ready to grow</p>
                            
                            <div class="space-y-4 text-left mb-8">
                                <div class="flex items-center">
                                    <i class="fas fa-check text-green-500 mr-3"></i>
                                    <span class="text-sm">Up to 15% member discounts</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check text-green-500 mr-3"></i>
                                    <span class="text-sm">Partner directory listing</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check text-green-500 mr-3"></i>
                                    <span class="text-sm">Monthly performance reports</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check text-green-500 mr-3"></i>
                                    <span class="text-sm">Email support (24-48h response)</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check text-green-500 mr-3"></i>
                                    <span class="text-sm">Basic marketing materials</span>
                                </div>
                            </div>

                            <div class="bg-pink-50 p-4 rounded-lg mb-6">
                                <p class="text-pink-800 text-sm font-semibold">Commission: 8-12%</p>
                                <p class="text-pink-600 text-sm">Monthly minimum: $500</p>
                                <p class="text-green-600 text-sm font-bold">Avg ROI: 340%</p>
                            </div>

                            <button class="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition-colors group-hover:scale-105" onclick="selectTier('featured')">
                                Apply as Featured Partner
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Premium Partner - Most Popular -->
                <div class="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-2xl text-white transform scale-105 relative group hover:scale-110 transition-all duration-300">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div class="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                            🏆 MOST POPULAR
                        </div>
                    </div>
                    <div class="p-8">
                        <div class="text-center">
                            <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <i class="fas fa-crown text-white text-3xl"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-2">Premium Partner</h3>
                            <p class="text-pink-100 mb-6">For established brands ready to scale</p>
                            
                            <div class="space-y-4 text-left mb-8">
                                <div class="flex items-center">
                                    <i class="fas fa-check text-yellow-300 mr-3"></i>
                                    <span class="text-sm">Up to 30% exclusive member discounts</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check text-yellow-300 mr-3"></i>
                                    <span class="text-sm">Featured placement in app</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check text-yellow-300 mr-3"></i>
                                    <span class="text-sm">Dedicated account manager</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check text-yellow-300 mr-3"></i>
                                    <span class="text-sm">Advanced analytics dashboard</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check text-yellow-300 mr-3"></i>
                                    <span class="text-sm">Co-marketing campaigns</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check text-yellow-300 mr-3"></i>
                                    <span class="text-sm">Priority customer support (4h response)</span>
                                </div>
                            </div>

                            <div class="bg-white bg-opacity-20 p-4 rounded-lg mb-6">
                                <p class="text-white text-sm font-semibold">Commission: 12-18%</p>
                                <p class="text-pink-100 text-sm">Monthly minimum: $2,000</p>
                                <p class="text-yellow-300 text-sm font-bold">Avg ROI: 520%</p>
                            </div>

                            <button class="w-full bg-white text-pink-600 py-3 rounded-lg font-bold hover:bg-pink-50 transition-colors group-hover:scale-105" onclick="selectTier('premium')">
                                Apply as Premium Partner
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Elite Partner -->
                <div class="bg-white rounded-2xl shadow-xl border-2 border-purple-300 hover:border-purple-500 transition-all duration-300 group">
                    <div class="p-8">
                        <div class="text-center">
                            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <i class="fas fa-diamond text-white text-3xl"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-2 text-gray-900">Elite Partner</h3>
                            <p class="text-gray-600 mb-6">Enterprise solution for market leaders</p>
                            
                            <div class="space-y-4 text-left mb-8">
                                <div class="flex items-center">
                                    <i class="fas fa-check text-green-500 mr-3"></i>
                                    <span class="text-sm">Custom discount structures</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check text-green-500 mr-3"></i>
                                    <span class="text-sm">White-label integration options</span>
                                </div>

                                <div class="flex items-center">
                                    <i class="fas fa-check text-green-500 mr-3"></i>
                                    <span class="text-sm">Strategic partnership team</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check text-green-500 mr-3"></i>
                                    <span class="text-sm">Exclusive member campaigns</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-check text-green-500 mr-3"></i>
                                    <span class="text-sm">24/7 priority support</span>
                                </div>
                            </div>

                            <div class="bg-purple-50 p-4 rounded-lg mb-6">
                                <p class="text-purple-800 text-sm font-semibold">Custom revenue sharing</p>
                                <p class="text-purple-600 text-sm">Enterprise-level minimums</p>
                                <p class="text-green-600 text-sm font-bold">Avg ROI: 750%+</p>
                            </div>

                            <button class="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors group-hover:scale-105" onclick="selectTier('elite')">
                                Schedule Elite Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Book Demo Section -->
    <section class="py-20 bg-gradient-to-br from-pink-600 to-purple-700" id="book-demo">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center text-white mb-16">
                <h2 class="text-4xl md:text-5xl font-bold mb-6">
                    See Better Together in Action
                </h2>
                <p class="text-xl text-pink-100 max-w-3xl mx-auto">
                    Book a personalized demo and see exactly how our platform can drive revenue for your business
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Demo Benefits -->
                <div class="space-y-8">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <i class="fas fa-chart-line text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">See Your Custom ROI Projection</h3>
                            <p class="text-pink-100">Get a personalized revenue forecast based on your business type, location, and customer base.</p>
                        </div>
                    </div>

                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <i class="fas fa-mobile-alt text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">Live Platform Walkthrough</h3>
                            <p class="text-pink-100">Experience our member-facing app and business dashboard to see exactly how partnerships work.</p>
                        </div>
                    </div>

                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <i class="fas fa-users text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">Meet Your Success Team</h3>
                            <p class="text-pink-100">Connect with our partnership specialists who will manage your account and drive your growth.</p>
                        </div>
                    </div>

                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <i class="fas fa-rocket text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-white mb-2">Fast-Track Your Launch</h3>
                            <p class="text-pink-100">Learn how to go live in 48 hours and start seeing results within your first week.</p>
                        </div>
                    </div>

                    <!-- Social Proof -->
                    <div class="bg-white bg-opacity-20 rounded-xl p-6 mt-8">
                        <div class="flex items-center mb-4">
                            <div class="flex -space-x-2 mr-4">
                                <div class="w-8 h-8 bg-pink-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-pink-800">MB</div>
                                <div class="w-8 h-8 bg-purple-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-purple-800">DC</div>
                                <div class="w-8 h-8 bg-blue-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-blue-800">SW</div>
                                <div class="w-8 h-8 bg-green-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-green-800">+47</div>
                            </div>
                            <span class="text-white font-semibold">50+ demos this week</span>
                        </div>
                        <p class="text-pink-100 text-sm italic">"The demo convinced us immediately. We saw exactly how Better Together would impact our bottom line." - Maria R., Bella Vista Restaurant</p>
                    </div>
                </div>

                <!-- Demo Booking Form -->
                <div class="bg-white rounded-2xl p-8 shadow-2xl">
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Book Your Success Demo</h3>
                    
                    <form id="demoBookingForm" class="space-y-4">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                                <input type="text" name="first_name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                                <input type="text" name="last_name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Business Email *</label>
                            <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                            <input type="tel" name="phone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Business Name *</label>
                                <input type="text" name="business_name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Industry *</label>
                                <select name="industry" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                                    <option value="">Select Industry</option>
                                    <option value="restaurant">Restaurant / Dining</option>
                                    <option value="hotel">Hotel / Accommodation</option>
                                    <option value="experience">Activities / Experiences</option>
                                    <option value="retail">Retail / Gifts</option>
                                    <option value="spa">Spa / Wellness</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Preferred Demo Time</label>
                            <select name="demo_time" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                                <option value="">Select Time Preference</option>
                                <option value="morning">Morning (9 AM - 12 PM)</option>
                                <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                                <option value="evening">Evening (5 PM - 8 PM)</option>
                                <option value="flexible">I'm flexible</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">What's your main goal?</label>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input type="radio" name="main_goal" value="increase_revenue" class="text-pink-600 focus:ring-pink-500 mr-2">
                                    <span class="text-sm">Increase revenue and customer base</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="main_goal" value="attract_couples" class="text-pink-600 focus:ring-pink-500 mr-2">
                                    <span class="text-sm">Attract more couples to our business</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="main_goal" value="marketing_support" class="text-pink-600 focus:ring-pink-500 mr-2">
                                    <span class="text-sm">Get marketing support and exposure</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="main_goal" value="learn_more" class="text-pink-600 focus:ring-pink-500 mr-2">
                                    <span class="text-sm">Learn more about the platform</span>
                                </label>
                            </div>
                        </div>

                        <button type="submit" class="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-pink-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
                            <i class="fas fa-calendar-check mr-2"></i>
                            Book My Success Demo Now
                        </button>

                        <p class="text-xs text-gray-500 text-center">
                            We'll contact you within 2 hours to schedule your personalized demo
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Enhanced Application Form -->
    <section class="py-20 bg-white" id="apply-now">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Fast-Track Your Partnership Application
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Complete this intelligent application and get approved in 24-48 hours. Our system pre-qualifies your business for the best partnership tier.
                </p>
                
                <!-- Application Progress -->
                <div class="mt-8 max-w-2xl mx-auto">
                    <div class="flex items-center justify-center space-x-4 text-sm">
                        <div class="flex items-center text-green-600">
                            <i class="fas fa-check-circle mr-2"></i>
                            <span>5-Minute Application</span>
                        </div>
                        <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <div class="flex items-center text-blue-600">
                            <i class="fas fa-clock mr-2"></i>
                            <span>24-48h Review</span>
                        </div>
                        <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <div class="flex items-center text-purple-600">
                            <i class="fas fa-rocket mr-2"></i>
                            <span>48h Launch</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Smart Application Form -->
            <div class="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-2xl border border-pink-200 p-8 lg:p-12">
                <form id="smartApplicationForm" class="space-y-8">
                    <!-- Progress Indicator -->
                    <div class="mb-8">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-medium text-gray-700">Application Progress</span>
                            <span class="text-sm font-medium text-pink-600" id="progressPercentage">0%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-gradient-to-r from-pink-600 to-purple-600 h-2 rounded-full transition-all duration-300" id="progressBar" style="width: 0%"></div>
                        </div>
                    </div>

                    <!-- Section 1: Business Basics -->
                    <div class="application-section" data-section="1">
                        <div class="flex items-center mb-6">
                            <div class="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold mr-3">1</div>
                            <h3 class="text-2xl font-bold text-gray-900">Business Information</h3>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Business Name *</label>
                                <input type="text" name="business_name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all" onkeyup="updateProgress()">
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Industry Category *</label>
                                <select name="industry" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" onchange="updateProgress(); showIndustrySpecific(this.value)">
                                    <option value="">Select Your Industry</option>
                                    <option value="restaurant">🍽️ Restaurant / Dining</option>
                                    <option value="hotel">🏨 Hotel / Accommodation</option>
                                    <option value="experience">🎯 Activities / Experiences</option>
                                    <option value="retail">🛍️ Retail / Gifts</option>
                                    <option value="spa">🧘 Spa / Wellness</option>
                                    <option value="entertainment">🎪 Entertainment</option>
                                    <option value="travel">✈️ Travel / Tourism</option>
                                    <option value="other">🔧 Other</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Website URL *</label>
                                <input type="url" name="website" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="https://www.yourbusiness.com" onkeyup="updateProgress()">
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Business Size</label>
                                <select name="business_size" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" onchange="updateProgress(); suggestTier(this.value)">
                                    <option value="">Select Business Size</option>
                                    <option value="single">Single Location</option>
                                    <option value="multi-local">2-5 Locations</option>
                                    <option value="regional">6-25 Locations</option>
                                    <option value="national">25+ Locations</option>
                                    <option value="enterprise">Enterprise/Franchise</option>
                                </select>
                            </div>
                        </div>

                        <!-- Smart Tier Suggestion -->
                        <div id="tierSuggestion" class="hidden mt-6 p-4 bg-white rounded-lg border-2 border-purple-200">
                            <div class="flex items-center text-purple-600 mb-2">
                                <i class="fas fa-lightbulb mr-2"></i>
                                <span class="font-bold">Recommended Partnership Tier</span>
                            </div>
                            <p id="tierSuggestionText" class="text-gray-700"></p>
                        </div>

                        <div class="mt-6">
                            <label class="block text-sm font-bold text-gray-700 mb-2">Why are couples drawn to your business?</label>
                            <textarea name="couple_appeal" rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="Describe what makes your business special for couples - romantic atmosphere, couples packages, etc." onkeyup="updateProgress()"></textarea>
                        </div>
                    </div>

                    <!-- Section 2: Contact Information -->
                    <div class="application-section border-t border-gray-200 pt-8" data-section="2">
                        <div class="flex items-center mb-6">
                            <div class="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</div>
                            <h3 class="text-2xl font-bold text-gray-900">Contact Details</h3>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Primary Contact Name *</label>
                                <input type="text" name="contact_name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" onkeyup="updateProgress()">
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Job Title / Role</label>
                                <input type="text" name="job_title" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="Owner, Manager, Marketing Director, etc." onkeyup="updateProgress()">
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Business Email *</label>
                                <input type="email" name="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" onkeyup="updateProgress()">
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                                <input type="tel" name="phone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" onkeyup="updateProgress()">
                            </div>
                        </div>

                        <!-- Business Address -->
                        <div class="mt-6">
                            <label class="block text-sm font-bold text-gray-700 mb-2">Business Address</label>
                            <input type="text" name="business_address" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="Street address, City, State, ZIP" onkeyup="updateProgress()">
                        </div>
                    </div>

                    <!-- Section 3: Partnership Details -->
                    <div class="application-section border-t border-gray-200 pt-8" data-section="3">
                        <div class="flex items-center mb-6">
                            <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</div>
                            <h3 class="text-2xl font-bold text-gray-900">Partnership Preferences</h3>
                        </div>
                        
                        <div class="space-y-6">
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-3">Preferred Partnership Tier</label>
                                <div class="grid md:grid-cols-3 gap-4">
                                    <label class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-pink-300 transition-all">
                                        <input type="radio" name="partnership_tier" value="featured" class="text-pink-600 focus:ring-pink-500 mr-3" onchange="updateProgress()">
                                        <div>
                                            <div class="font-bold text-gray-900">Featured Partner</div>
                                            <div class="text-sm text-gray-600">Local/emerging businesses</div>
                                            <div class="text-sm text-pink-600 font-semibold">8-12% commission</div>
                                        </div>
                                    </label>
                                    <label class="flex items-center p-4 border-2 border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 transition-all bg-purple-50">
                                        <input type="radio" name="partnership_tier" value="premium" class="text-purple-600 focus:ring-purple-500 mr-3" onchange="updateProgress()">
                                        <div>
                                            <div class="font-bold text-gray-900">Premium Partner</div>
                                            <div class="text-sm text-gray-600">Established brands</div>
                                            <div class="text-sm text-purple-600 font-semibold">12-18% commission</div>
                                            <div class="text-xs bg-yellow-400 text-gray-900 px-2 py-1 rounded-full font-bold mt-1">POPULAR</div>
                                        </div>
                                    </label>
                                    <label class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300 transition-all">
                                        <input type="radio" name="partnership_tier" value="elite" class="text-indigo-600 focus:ring-indigo-500 mr-3" onchange="updateProgress()">
                                        <div>
                                            <div class="font-bold text-gray-900">Elite Partner</div>
                                            <div class="text-sm text-gray-600">Enterprise/national</div>
                                            <div class="text-sm text-indigo-600 font-semibold">Custom pricing</div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">Maximum discount you can offer</label>
                                    <select name="discount_percentage" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" onchange="updateProgress()">
                                        <option value="">Select discount range</option>
                                        <option value="10-15">Up to 15% off</option>
                                        <option value="15-20">Up to 20% off</option>
                                        <option value="20-25">Up to 25% off</option>
                                        <option value="25-30">Up to 30% off</option>
                                        <option value="30+">30%+ off (Premium/Elite only)</option>
                                        <option value="custom">Custom packages</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">Expected monthly revenue via Better Together</label>
                                    <select name="monthly_volume" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" onchange="updateProgress()">
                                        <option value="">Select expected range</option>
                                        <option value="under-1k">Under $1,000</option>
                                        <option value="1k-5k">$1,000 - $5,000</option>
                                        <option value="5k-10k">$5,000 - $10,000</option>
                                        <option value="10k-25k">$10,000 - $25,000</option>
                                        <option value="25k-50k">$25,000 - $50,000</option>
                                        <option value="50k+">$50,000+ (Elite tier)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 4: Final Details -->
                    <div class="application-section border-t border-gray-200 pt-8" data-section="4">
                        <div class="flex items-center mb-6">
                            <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3">4</div>
                            <h3 class="text-2xl font-bold text-gray-900">Partnership Goals</h3>
                        </div>
                        
                        <div class="space-y-6">
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">What's your primary goal with this partnership?</label>
                                <div class="space-y-3">
                                    <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-pink-50 transition-all">
                                        <input type="radio" name="primary_goal" value="increase_revenue" class="text-pink-600 focus:ring-pink-500 mr-3" onchange="updateProgress()">
                                        <div>
                                            <span class="font-semibold text-gray-900">💰 Increase revenue and customer base</span>
                                            <p class="text-sm text-gray-600">Drive more bookings and higher-value customers</p>
                                        </div>
                                    </label>
                                    <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-pink-50 transition-all">
                                        <input type="radio" name="primary_goal" value="attract_couples" class="text-pink-600 focus:ring-pink-500 mr-3" onchange="updateProgress()">
                                        <div>
                                            <span class="font-semibold text-gray-900">💕 Attract more couples to our business</span>
                                            <p class="text-sm text-gray-600">Focus specifically on the couples market</p>
                                        </div>
                                    </label>
                                    <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-pink-50 transition-all">
                                        <input type="radio" name="primary_goal" value="marketing_support" class="text-pink-600 focus:ring-pink-500 mr-3" onchange="updateProgress()">
                                        <div>
                                            <span class="font-semibold text-gray-900">📢 Get marketing support and exposure</span>
                                            <p class="text-sm text-gray-600">Leverage Better Together's marketing reach</p>
                                        </div>
                                    </label>
                                    <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-pink-50 transition-all">
                                        <input type="radio" name="primary_goal" value="competitive_advantage" class="text-pink-600 focus:ring-pink-500 mr-3" onchange="updateProgress()">
                                        <div>
                                            <span class="font-semibold text-gray-900">🏆 Gain competitive advantage in my market</span>
                                            <p class="text-sm text-gray-600">Be the exclusive Better Together partner in my area</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">How did you hear about Better Together's partnership program?</label>
                                <select name="referral_source" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" onchange="updateProgress()">
                                    <option value="">Please select</option>
                                    <option value="google_search">Google search</option>
                                    <option value="social_media">Social media</option>
                                    <option value="existing_partner">Referred by existing partner</option>
                                    <option value="industry_event">Industry event/conference</option>
                                    <option value="word_of_mouth">Word of mouth</option>
                                    <option value="better_together_outreach">Better Together reached out to me</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Additional information or questions</label>
                                <textarea name="additional_info" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="Tell us anything else about your business, special requests, or questions about the partnership..." onkeyup="updateProgress()"></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Terms and Submit -->
                    <div class="border-t border-gray-200 pt-8">
                        <div class="space-y-4">
                            <div class="flex items-start space-x-3">
                                <input type="checkbox" name="terms_agreement" required class="mt-1 text-pink-600 focus:ring-pink-500" onchange="updateProgress()">
                                <label class="text-sm text-gray-700">
                                    I agree to the <a href="#" class="text-pink-600 hover:underline font-semibold">Better Together Partner Terms & Conditions</a> and understand that this application will be reviewed within 24-48 hours. I authorize Better Together to contact me regarding this partnership opportunity. *
                                </label>
                            </div>
                            
                            <div class="flex items-start space-x-3">
                                <input type="checkbox" name="marketing_consent" class="mt-1 text-pink-600 focus:ring-pink-500" onchange="updateProgress()">
                                <label class="text-sm text-gray-700">
                                    I consent to receive marketing communications, partnership updates, and business growth tips from Better Together. I can unsubscribe at any time.
                                </label>
                            </div>

                            <div class="flex items-start space-x-3">
                                <input type="checkbox" name="data_accuracy" required class="mt-1 text-pink-600 focus:ring-pink-500" onchange="updateProgress()">
                                <label class="text-sm text-gray-700">
                                    I confirm that all information provided is accurate and up-to-date. I understand that false information may result in application rejection. *
                                </label>
                            </div>
                        </div>

                        <!-- Smart Submit Button -->
                        <div class="mt-8 text-center">
                            <button type="submit" id="submitButton" class="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-bold text-xl hover:from-pink-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                                <i class="fas fa-paper-plane mr-3"></i>
                                <span id="submitButtonText">Complete Application (0% complete)</span>
                            </button>

                            <div class="mt-4 grid md:grid-cols-3 gap-4 text-center text-sm text-gray-600">
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-clock text-green-500 mr-2"></i>
                                    <span>24-48 hour review</span>
                                </div>
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-phone text-blue-500 mr-2"></i>
                                    <span>Personal follow-up call</span>
                                </div>
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-rocket text-purple-500 mr-2"></i>
                                    <span>48 hour launch</span>
                                </div>
                            </div>

                            <p class="text-sm text-gray-500 mt-4">
                                🔒 Your information is secure and will only be used for partnership evaluation. We never share your data with third parties.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8">
                <div class="space-y-4">
                    <div class="flex items-center">
                        <span class="text-2xl">💕</span>
                        <span class="ml-2 text-xl font-bold text-white">Better Together</span>
                        <span class="ml-3 text-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full font-semibold">Business</span>
                    </div>
                    <p class="text-gray-400 leading-relaxed">
                        The #1 platform connecting businesses with engaged couples actively investing in their relationships.
                    </p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-white transition-colors">
                            <i class="fab fa-linkedin text-xl"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white transition-colors">
                            <i class="fab fa-twitter text-xl"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white transition-colors">
                            <i class="fab fa-facebook text-xl"></i>
                        </a>
                    </div>
                </div>
                
                <div>
                    <h5 class="font-semibold text-white mb-4">For Partners</h5>
                    <ul class="space-y-2">
                        <li><a href="#partnership-tiers" class="text-gray-400 hover:text-white transition-colors">Partnership Tiers</a></li>
                        <li><a href="#roi-calculator" class="text-gray-400 hover:text-white transition-colors">ROI Calculator</a></li>
                        <li><a href="#book-demo" class="text-gray-400 hover:text-white transition-colors">Book Demo</a></li>
                        <li><a href="#apply-now" class="text-gray-400 hover:text-white transition-colors">Apply Now</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Partner Portal</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Success Stories</a></li>
                    </ul>
                </div>
                
                <div>
                    <h5 class="font-semibold text-white mb-4">For Members</h5>
                    <ul class="space-y-2">
                        <li><a href="/" class="text-gray-400 hover:text-white transition-colors">Better Together App</a></li>
                        <li><a href="/member-rewards.html" class="text-gray-400 hover:text-white transition-colors">Member Rewards</a></li>
                        <li><a href="/iphone-examples.html" class="text-gray-400 hover:text-white transition-colors">iPhone Examples</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                    </ul>
                </div>
                
                <div>
                    <h5 class="font-semibold text-white mb-4">Contact</h5>
                    <ul class="space-y-2">
                        <li class="text-gray-400">
                            <i class="fas fa-envelope mr-2"></i>
                            partnerships@bettertogether.com
                        </li>
                        <li class="text-gray-400">
                            <i class="fas fa-phone mr-2"></i>
                            1-800-COUPLES (268-7537)
                        </li>
                        <li>
                            <a href="#book-demo" class="text-pink-400 hover:text-pink-300 transition-colors">
                                <i class="fas fa-calendar mr-2"></i>
                                Schedule a Partnership Call
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-12 pt-8 text-center">
                <p class="text-gray-400">
                    &copy; 2025 Better Together. Building stronger relationships, growing better businesses.
                </p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script>
        // Dynamic counters
        let partnerCount = 497;
        let spotsRemaining = 23;

        function updateCounters() {
            document.getElementById('partnerCount').textContent = partnerCount + '+';
            document.getElementById('spotsRemaining').textContent = spotsRemaining;
            
            // Simulate real-time updates
            if (Math.random() > 0.95) {
                partnerCount++;
                spotsRemaining--;
                if (spotsRemaining < 10) spotsRemaining = 25; // Reset periodically
            }
        }

        // ROI Calculator Functions
        function calculateROI() {
            const businessType = document.getElementById('businessType').value;
            const avgOrderValue = parseFloat(document.getElementById('avgOrderValue').value) || 150;
            const monthlyCustomers = parseInt(document.getElementById('monthlyCustomers').value) || 100;
            const commissionRate = parseFloat(document.getElementById('commissionRate').value) || 15;
            const repeatRate = parseFloat(document.getElementById('repeatRate').value) || 1.2;

            // Calculate results
            const monthlyRevenue = avgOrderValue * monthlyCustomers;
            const annualRevenue = monthlyRevenue * 12 * repeatRate;
            const commissionCost = annualRevenue * (commissionRate / 100);
            const netProfit = annualRevenue - commissionCost;
            const roiMultiple = netProfit / commissionCost;

            // Update display
            document.getElementById('monthlyRevenue').textContent = '$' + monthlyRevenue.toLocaleString();
            document.getElementById('monthlyDetails').textContent = monthlyCustomers + ' customers × $' + avgOrderValue + ' avg order';
            document.getElementById('annualRevenue').textContent = '$' + Math.round(annualRevenue).toLocaleString();
            document.getElementById('annualDetails').textContent = 'Including ' + Math.round((repeatRate - 1) * 100) + '% repeat customers';
            document.getElementById('commissionCost').textContent = '$' + Math.round(commissionCost).toLocaleString();
            document.getElementById('netProfit').textContent = '$' + Math.round(netProfit).toLocaleString();
            document.getElementById('roiMultiple').textContent = roiMultiple.toFixed(1) + 'x return on investment';
        }

        // Update slider displays
        document.getElementById('monthlyCustomers').addEventListener('input', function() {
            document.getElementById('customerCount').textContent = this.value;
            calculateROI();
        });

        document.getElementById('commissionRate').addEventListener('input', function() {
            document.getElementById('commissionDisplay').textContent = this.value + '%';
            calculateROI();
        });

        // Application Progress Tracking
        function updateProgress() {
            const form = document.getElementById('smartApplicationForm');
            const requiredFields = form.querySelectorAll('[required]');
            const allFields = form.querySelectorAll('input, select, textarea');
            
            let filledRequired = 0;
            let totalFilled = 0;

            requiredFields.forEach(field => {
                if (field.type === 'checkbox' || field.type === 'radio') {
                    if (field.checked) filledRequired++;
                } else if (field.value.trim() !== '') {
                    filledRequired++;
                }
            });

            allFields.forEach(field => {
                if (field.type === 'checkbox' || field.type === 'radio') {
                    if (field.checked) totalFilled++;
                } else if (field.value.trim() !== '') {
                    totalFilled++;
                }
            });

            const progress = Math.round((totalFilled / allFields.length) * 100);
            const requiredProgress = Math.round((filledRequired / requiredFields.length) * 100);
            
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('progressPercentage').textContent = progress + '%';
            
            const submitButton = document.getElementById('submitButton');
            const submitButtonText = document.getElementById('submitButtonText');
            
            if (requiredProgress === 100) {
                submitButton.disabled = false;
                submitButtonText.textContent = 'Submit Partnership Application';
                submitButton.classList.add('animate-pulse-glow');
            } else {
                submitButton.disabled = true;
                submitButtonText.textContent = \`Complete Application (\${progress}% complete)\`;
                submitButton.classList.remove('animate-pulse-glow');
            }
        }

        // Smart tier suggestions
        function suggestTier(businessSize) {
            const suggestion = document.getElementById('tierSuggestion');
            const text = document.getElementById('tierSuggestionText');
            
            let recommendedTier = '';
            switch(businessSize) {
                case 'single':
                    recommendedTier = 'Featured Partner - Perfect for single location businesses looking to grow their couples customer base.';
                    break;
                case 'multi-local':
                    recommendedTier = 'Premium Partner - Ideal for multi-location businesses ready to scale with dedicated support.';
                    break;
                case 'regional':
                case 'national':
                case 'enterprise':
                    recommendedTier = 'Elite Partner - Enterprise solution with custom pricing and dedicated strategic support.';
                    break;
            }
            
            if (recommendedTier) {
                text.textContent = recommendedTier;
                suggestion.classList.remove('hidden');
            }
        }

        // Industry-specific suggestions
        function showIndustrySpecific(industry) {
            // Could add industry-specific fields or suggestions here
            console.log('Industry selected:', industry);
        }

        // Tier selection
        function selectTier(tier) {
            document.querySelector(\`input[name="partnership_tier"][value="\${tier}"]\`).checked = true;
            scrollToSection('apply-now');
            updateProgress();
        }

        // Smooth scrolling
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Form submissions
        document.getElementById('demoBookingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for booking a demo! Our partnership team will contact you within 2 hours to schedule your personalized success demo.');
            this.reset();
        });

        document.getElementById('smartApplicationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message with next steps
            const successMessage = \`
                🎉 Application Submitted Successfully!
                
                What happens next:
                ✅ Review within 24-48 hours
                📞 Personal follow-up call from our team
                🚀 If approved, live within 48 hours
                💰 Start seeing revenue within your first week
                
                We'll email you a confirmation shortly with your application reference number.
            \`;
            
            alert(successMessage);
            this.reset();
            updateProgress();
        });

        // Chart initialization
        function initializeChart() {
            const ctx = document.getElementById('jewelryChart');
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Custom Orders',
                            data: [12, 15, 18, 25, 35, 42],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    display: false
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
            }
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', function() {
            calculateROI();
            updateProgress();
            initializeChart();
            
            // Update counters every 30 seconds
            setInterval(updateCounters, 30000);
            
            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobileMenuButton');
            if (mobileMenuButton) {
                mobileMenuButton.addEventListener('click', function() {
                    console.log('Mobile menu clicked');
                });
            }

            // Animate elements on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe all sections for animation
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.opacity = '0.95';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'all 0.8s ease-out';
                observer.observe(section);
            });
        });
    <\/script>
</body>
</html>
`,w=new jt;w.use("/api/*",Va());w.use("/static/*",ii({root:"./public"}));w.use(Ti);const Xi=e=>{var t;return(t=e.env)!=null&&t.DB?null:e.json({message:"Database functionality is currently unavailable in this demo deployment.",demo:!0,note:"Full functionality available in development environment with D1 database"},503)};w.post("/api/users",async e=>{const t=Xi(e);if(t)return t;try{const{email:a,name:i,nickname:r,phone_number:l,timezone:n,love_language_primary:o,love_language_secondary:d}=await e.req.json();if(!a||!i)return e.json({error:"Email and name are required"},400);if(!Js(a))return e.json({error:"Invalid email format"},400);if(await Xs(e.env,a))return e.json({error:"User already exists with this email"},409);const m=X(),x=$();await e.env.DB.prepare(`
      INSERT INTO users (id, email, name, nickname, phone_number, timezone, love_language_primary, love_language_secondary, created_at, updated_at, last_active_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(m,a,i,r||null,l||null,n||"UTC",o||null,d||null,x,x,x).run();const u=await ge(e.env,m);return e.json({user:u},201)}catch(a){return console.error("Create user error:",a),e.json({error:"Failed to create user"},500)}});w.get("/api/users/:userId",async e=>{try{const t=e.req.param("userId"),a=await ge(e.env,t);return a?e.json({user:a}):e.json({error:"User not found"},404)}catch(t){return console.error("Get user error:",t),e.json({error:"Failed to get user"},500)}});w.put("/api/users/:userId",async e=>{try{const t=e.req.param("userId"),a=await e.req.json();if(!await ge(e.env,t))return e.json({error:"User not found"},404);const r=$(),l=["name","nickname","phone_number","timezone","love_language_primary","love_language_secondary","profile_photo_url"],n=Object.keys(a).filter(c=>l.includes(c)).map(c=>`${c} = ?`).join(", ");if(n.length===0)return e.json({error:"No valid fields to update"},400);const o=Object.keys(a).filter(c=>l.includes(c)).map(c=>a[c]);await e.env.DB.prepare(`
      UPDATE users SET ${n}, updated_at = ? WHERE id = ?
    `).bind(...o,r,t).run();const d=await ge(e.env,t);return e.json({user:d})}catch(t){return console.error("Update user error:",t),e.json({error:"Failed to update user"},500)}});w.post("/api/invite-partner",async e=>{try{const{user_id:t,partner_email:a,relationship_type:i,start_date:r}=await e.req.json();if(!t||!a)return e.json({error:"User ID and partner email are required"},400);if(!Js(a))return e.json({error:"Invalid partner email format"},400);const l=await ge(e.env,t);if(!l)return e.json({error:"User not found"},404);if(await Mt(e.env,t))return e.json({error:"User already has an active relationship"},409);let o=await Xs(e.env,a);if(o){const d=X(),c=$();return await e.env.DB.prepare(`
        INSERT INTO relationships (id, user_1_id, user_2_id, relationship_type, start_date, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, 'active', ?, ?)
      `).bind(d,t,o.id,i||"dating",r||le(),c,c).run(),await Ui(e.env,o.id,"partner_activity","New Relationship Created!",`${l.name} has added you as their partner on Better Together`,d),e.json({message:"Relationship created successfully",relationship_id:d})}else return e.json({message:"Invitation sent! Partner will need to create an account first.",action:"invitation_sent"})}catch(t){return console.error("Invite partner error:",t),e.json({error:"Failed to invite partner"},500)}});w.get("/api/relationships/:userId",async e=>{try{const t=e.req.param("userId"),a=await Mt(e.env,t);if(!a)return e.json({error:"No active relationship found"},404);const i=Ks(a,t),r=await ge(e.env,i);return e.json({relationship:a,partner:r})}catch(t){return console.error("Get relationship error:",t),e.json({error:"Failed to get relationship"},500)}});w.post("/api/checkins",async e=>{try{const{relationship_id:t,user_id:a,connection_score:i,mood_score:r,relationship_satisfaction:l,gratitude_note:n,support_needed:o,highlight_of_day:d}=await e.req.json();if(!t||!a)return e.json({error:"Relationship ID and User ID are required"},400);if(await qi(e.env,t,a))return e.json({error:"Already checked in today"},409);const m=X(),x=le(),u=$();await e.env.DB.prepare(`
      INSERT INTO daily_checkins (
        id, relationship_id, user_id, checkin_date, connection_score, mood_score,
        relationship_satisfaction, gratitude_note, support_needed, highlight_of_day, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(m,t,a,x,i||null,r||null,l||null,n||null,o||null,d||null,u).run();const f=await Hi(e.env,t,a);return e.json({message:"Check-in completed successfully",checkin_id:m,achievements_earned:f})}catch(t){return console.error("Create checkin error:",t),e.json({error:"Failed to create check-in"},500)}});w.get("/api/checkins/:relationshipId",async e=>{try{const t=e.req.param("relationshipId"),a=e.req.query("limit")||"30",i=await e.env.DB.prepare(`
      SELECT c.*, u.name as user_name 
      FROM daily_checkins c
      JOIN users u ON c.user_id = u.id
      WHERE c.relationship_id = ?
      ORDER BY c.checkin_date DESC, c.created_at DESC
      LIMIT ?
    `).bind(t,parseInt(a)).all();return e.json({checkins:i.results||[]})}catch(t){return console.error("Get checkins error:",t),e.json({error:"Failed to get check-ins"},500)}});w.post("/api/goals",async e=>{try{const{relationship_id:t,goal_name:a,goal_description:i,goal_type:r,target_count:l,target_date:n,created_by_user_id:o}=await e.req.json();if(!t||!a||!o)return e.json({error:"Relationship ID, goal name, and creator ID are required"},400);const d=X(),c=$(),m=le();return await e.env.DB.prepare(`
      INSERT INTO shared_goals (
        id, relationship_id, goal_name, goal_description, goal_type,
        target_count, current_progress, status, start_date, target_date,
        created_by_user_id, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, 0, 'active', ?, ?, ?, ?, ?)
    `).bind(d,t,a,i||null,r||"custom",l||null,m,n||null,o,c,c).run(),e.json({message:"Goal created successfully",goal_id:d})}catch(t){return console.error("Create goal error:",t),e.json({error:"Failed to create goal"},500)}});w.get("/api/goals/:relationshipId",async e=>{try{const t=e.req.param("relationshipId"),a=e.req.query("status")||"all";let i=`
      SELECT g.*, u.name as created_by_name
      FROM shared_goals g
      JOIN users u ON g.created_by_user_id = u.id
      WHERE g.relationship_id = ?
    `;const r=[t];a!=="all"&&(i+=" AND g.status = ?",r.push(a)),i+=" ORDER BY g.created_at DESC";const l=await e.env.DB.prepare(i).bind(...r).all();return e.json({goals:l.results||[]})}catch(t){return console.error("Get goals error:",t),e.json({error:"Failed to get goals"},500)}});w.put("/api/goals/:goalId/progress",async e=>{try{const t=e.req.param("goalId"),{progress_increment:a}=await e.req.json();if(a===void 0)return e.json({error:"Progress increment is required"},400);const i=await e.env.DB.prepare("SELECT * FROM shared_goals WHERE id = ?").bind(t).first();if(!i)return e.json({error:"Goal not found"},404);const r=(i.current_progress||0)+a,l=$();let n=i.status,o=null;return i.target_count&&r>=i.target_count&&(n="completed",o=l),await e.env.DB.prepare(`
      UPDATE shared_goals 
      SET current_progress = ?, status = ?, completion_date = ?, updated_at = ?
      WHERE id = ?
    `).bind(r,n,o,l,t).run(),e.json({message:"Goal progress updated",new_progress:r,status:n,completed:n==="completed"})}catch(t){return console.error("Update goal progress error:",t),e.json({error:"Failed to update goal progress"},500)}});w.post("/api/activities",async e=>{try{const{relationship_id:t,activity_name:a,activity_type:i,description:r,location:l,planned_date:n,cost_amount:o,created_by_user_id:d}=await e.req.json();if(!t||!a||!d)return e.json({error:"Relationship ID, activity name, and creator ID are required"},400);const c=X(),m=$();return await e.env.DB.prepare(`
      INSERT INTO activities (
        id, relationship_id, activity_name, activity_type, description,
        location, planned_date, cost_amount, status, created_by_user_id,
        created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'planned', ?, ?, ?)
    `).bind(c,t,a,i||"custom",r||null,l||null,n||null,o||null,d,m,m).run(),e.json({message:"Activity created successfully",activity_id:c})}catch(t){return console.error("Create activity error:",t),e.json({error:"Failed to create activity"},500)}});w.get("/api/activities/:relationshipId",async e=>{try{const t=e.req.param("relationshipId"),a=e.req.query("status")||"all",i=e.req.query("limit")||"50";let r=`
      SELECT a.*, u.name as created_by_name
      FROM activities a
      JOIN users u ON a.created_by_user_id = u.id
      WHERE a.relationship_id = ?
    `;const l=[t];a!=="all"&&(r+=" AND a.status = ?",l.push(a)),r+=" ORDER BY a.planned_date DESC, a.created_at DESC LIMIT ?",l.push(parseInt(i));const n=await e.env.DB.prepare(r).bind(...l).all();return e.json({activities:n.results||[]})}catch(t){return console.error("Get activities error:",t),e.json({error:"Failed to get activities"},500)}});w.put("/api/activities/:activityId/complete",async e=>{try{const t=e.req.param("activityId"),{satisfaction_rating_user1:a,satisfaction_rating_user2:i,notes:r}=await e.req.json(),l=$();return await e.env.DB.prepare(`
      UPDATE activities 
      SET status = 'completed', completed_date = ?, satisfaction_rating_user1 = ?,
          satisfaction_rating_user2 = ?, notes = ?, updated_at = ?
      WHERE id = ?
    `).bind(l,a||null,i||null,r||null,l,t).run(),e.json({message:"Activity marked as completed"})}catch(t){return console.error("Complete activity error:",t),e.json({error:"Failed to complete activity"},500)}});w.post("/api/important-dates",async e=>{try{const{relationship_id:t,date_value:a,event_name:i,event_type:r,description:l,is_recurring:n,recurrence_pattern:o,reminder_days_before:d,created_by_user_id:c}=await e.req.json();if(!t||!a||!i||!c)return e.json({error:"Relationship ID, date, event name, and creator ID are required"},400);const m=X(),x=$();return await e.env.DB.prepare(`
      INSERT INTO important_dates (
        id, relationship_id, date_value, event_name, event_type, description,
        is_recurring, recurrence_pattern, reminder_days_before, created_by_user_id, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(m,t,a,i,r||"custom",l||null,n||!1,o||null,d||7,c,x).run(),e.json({message:"Important date added successfully",date_id:m})}catch(t){return console.error("Add important date error:",t),e.json({error:"Failed to add important date"},500)}});w.get("/api/important-dates/:relationshipId",async e=>{try{const t=e.req.param("relationshipId"),a=e.req.query("upcoming")==="true";let i=`
      SELECT d.*, u.name as created_by_name
      FROM important_dates d
      JOIN users u ON d.created_by_user_id = u.id
      WHERE d.relationship_id = ?
    `;const r=[t];if(a){const n=le(),o=new Date;o.setDate(o.getDate()+60);const d=o.toISOString().split("T")[0];i+=" AND d.date_value BETWEEN ? AND ?",r.push(n,d)}i+=" ORDER BY d.date_value ASC";const l=await e.env.DB.prepare(i).bind(...r).all();return e.json({dates:l.results||[]})}catch(t){return console.error("Get important dates error:",t),e.json({error:"Failed to get important dates"},500)}});w.get("/api/challenges",async e=>{try{const t=e.req.query("category"),a=e.req.query("difficulty");let i="SELECT * FROM challenges WHERE is_template = true";const r=[];t&&(i+=" AND category = ?",r.push(t)),a&&(i+=" AND difficulty_level = ?",r.push(a)),i+=" ORDER BY created_at DESC";const l=await e.env.DB.prepare(i).bind(...r).all();return e.json({challenges:l.results||[]})}catch(t){return console.error("Get challenges error:",t),e.json({error:"Failed to get challenges"},500)}});w.post("/api/challenges/:challengeId/start",async e=>{try{const t=e.req.param("challengeId"),{relationship_id:a}=await e.req.json();if(!a)return e.json({error:"Relationship ID is required"},400);const i=await e.env.DB.prepare("SELECT * FROM challenges WHERE id = ?").bind(t).first();if(!i)return e.json({error:"Challenge not found"},404);const r=X(),l=le(),n=$();let o=null;if(i.duration_days){const d=new Date;d.setDate(d.getDate()+i.duration_days),o=d.toISOString().split("T")[0]}return await e.env.DB.prepare(`
      INSERT INTO challenge_participation (
        id, relationship_id, challenge_id, start_date, target_end_date,
        status, progress_percentage, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, 'active', 0, ?, ?)
    `).bind(r,a,t,l,o,n,n).run(),e.json({message:"Challenge started successfully",participation_id:r})}catch(t){return console.error("Start challenge error:",t),e.json({error:"Failed to start challenge"},500)}});w.get("/api/challenges/participation/:relationshipId",async e=>{try{const t=e.req.param("relationshipId"),a=e.req.query("status")||"all";let i=`
      SELECT cp.*, c.challenge_name, c.challenge_description, c.category, c.difficulty_level
      FROM challenge_participation cp
      JOIN challenges c ON cp.challenge_id = c.id
      WHERE cp.relationship_id = ?
    `;const r=[t];a!=="all"&&(i+=" AND cp.status = ?",r.push(a)),i+=" ORDER BY cp.created_at DESC";const l=await e.env.DB.prepare(i).bind(...r).all();return e.json({participations:l.results||[]})}catch(t){return console.error("Get challenge participation error:",t),e.json({error:"Failed to get challenge participation"},500)}});w.get("/api/dashboard/:userId",async e=>{try{const t=e.req.param("userId"),a=await Mt(e.env,t);if(!a)return e.json({error:"No active relationship found"},404);const i=Ks(a,t),r=await ge(e.env,i),l=await e.env.DB.prepare(`
      SELECT c.*, u.name as user_name 
      FROM daily_checkins c
      JOIN users u ON c.user_id = u.id
      WHERE c.relationship_id = ?
      ORDER BY c.checkin_date DESC
      LIMIT 10
    `).bind(a.id).all(),n=await $i(e.env,a.id),o=await e.env.DB.prepare(`
      SELECT g.*, u.name as created_by_name
      FROM shared_goals g
      JOIN users u ON g.created_by_user_id = u.id
      WHERE g.relationship_id = ? AND g.status = 'active'
      ORDER BY g.created_at DESC
      LIMIT 5
    `).bind(a.id).all(),d=await e.env.DB.prepare(`
      SELECT a.*, u.name as created_by_name
      FROM activities a
      JOIN users u ON a.created_by_user_id = u.id
      WHERE a.relationship_id = ?
      ORDER BY COALESCE(a.completed_date, a.planned_date) DESC
      LIMIT 5
    `).bind(a.id).all(),c=await e.env.DB.prepare(`
      SELECT cp.*, c.challenge_name, c.challenge_description, c.category
      FROM challenge_participation cp
      JOIN challenges c ON cp.challenge_id = c.id
      WHERE cp.relationship_id = ? AND cp.status = 'active'
      ORDER BY cp.created_at DESC
      LIMIT 3
    `).bind(a.id).all(),m=await e.env.DB.prepare(`
      SELECT ua.*, a.achievement_name, a.achievement_description, a.icon_url, a.point_value
      FROM user_achievements ua
      JOIN achievements a ON ua.achievement_id = a.id
      WHERE ua.relationship_id = ?
      ORDER BY ua.earned_date DESC
      LIMIT 10
    `).bind(a.id).all(),x=await Qs(e.env,a.id),u=await Dt(e.env,a.id);return e.json({relationship:{...a,partner:r,days_together:x.days_together},recent_checkins:l.results||[],upcoming_dates:n,active_goals:o.results||[],recent_activities:d.results||[],current_challenges:c.results||[],analytics:x,achievements_earned:m.results||[],checkin_streak:u})}catch(t){return console.error("Get dashboard error:",t),e.json({error:"Failed to get dashboard data"},500)}});w.get("/api/analytics/:relationshipId",async e=>{try{const t=e.req.param("relationshipId"),a=await Qs(e.env,t);return e.json({analytics:a})}catch(t){return console.error("Get analytics error:",t),e.json({error:"Failed to get analytics"},500)}});w.get("/api/notifications/:userId",async e=>{try{const t=e.req.param("userId"),a=e.req.query("limit")||"20",i=e.req.query("unread_only")==="true";let r="SELECT * FROM notifications WHERE user_id = ?";const l=[t];i&&(r+=" AND is_read = false"),r+=" ORDER BY created_at DESC LIMIT ?",l.push(parseInt(a));const n=await e.env.DB.prepare(r).bind(...l).all();return e.json({notifications:n.results||[]})}catch(t){return console.error("Get notifications error:",t),e.json({error:"Failed to get notifications"},500)}});w.put("/api/notifications/:notificationId/read",async e=>{try{const t=e.req.param("notificationId");return await e.env.DB.prepare("UPDATE notifications SET is_read = true WHERE id = ?").bind(t).run(),e.json({message:"Notification marked as read"})}catch(t){return console.error("Mark notification read error:",t),e.json({error:"Failed to mark notification as read"},500)}});w.get("/ai-coach.html",e=>e.html(Gi));w.get("/mobile-ui.html",e=>e.html(zi));w.get("/smart-scheduling.html",e=>e.html(Wi));w.get("/intelligent-suggestions.html",e=>e.html(Yi));w.get("/iphone-examples.html",e=>e.html(Vi));w.get("/member-rewards.html",e=>e.html(Ji));w.get("/become-sponsor.html",e=>e.html(Ki));w.get("/login.html",e=>e.html(Bi));w.get("/dashboard.html",e=>e.html(Ri));w.get("/subscription-boxes.html",async e=>{const{subscriptionBoxesHtml:t}=await Promise.resolve().then(()=>er);return e.html(t)});w.get("/in-app-purchases.html",async e=>{const{inAppPurchasesHtml:t}=await Promise.resolve().then(()=>sr);return e.html(t)});w.get("/intimacy-challenges.html",async e=>{const{intimacyChallengesHtml:t}=await Promise.resolve().then(()=>ir);return e.html(t)});w.get("/premium-pricing.html",async e=>{const{premiumPricingHtml:t}=await Promise.resolve().then(()=>lr);return e.html(t)});w.route("/api/analytics",K);w.get("/login",e=>e.html(Di));w.get("/portal",e=>e.html(Li));w.get("/paywall",e=>e.html(Mi));w.get("/",e=>e.render(s("div",{className:"min-h-screen overflow-x-hidden",children:[s("nav",{className:"bg-white shadow-sm border-b sticky top-0 z-50",children:s("div",{className:"max-w-7xl mx-auto px-3 sm:px-6 lg:px-8",children:[s("div",{className:"flex justify-between items-center h-14 sm:h-16",children:[s("div",{className:"flex items-center",children:[s("span",{className:"text-xl sm:text-2xl",children:"💕"}),s("span",{className:"ml-2 text-lg sm:text-xl font-bold text-gray-900",children:"Better Together"})]}),s("div",{className:"hidden md:flex items-center space-x-6 lg:space-x-8",children:[s("a",{href:"#features",className:"text-gray-600 hover:text-pink-600 transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105",children:"Features"}),s("a",{href:"/mobile-ui.html",className:"text-gray-600 hover:text-pink-600 transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105",children:"iOS Design"}),s("a",{href:"/iphone-examples.html",className:"text-gray-600 hover:text-pink-600 transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105",children:"Live Examples"}),s("a",{href:"/member-rewards.html",className:"text-gray-600 hover:text-pink-600 transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105",children:"Rewards"}),s("a",{href:"/premium-pricing.html",className:"text-gray-600 hover:text-pink-600 transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105",children:"Premium"}),s("button",{className:"bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base",children:s("span",{className:"flex items-center",children:[s("i",{className:"fas fa-crown mr-2 animate-pulse"}),"Get Premium Access"]})})]}),s("div",{className:"md:hidden",children:s("button",{className:"text-gray-600 hover:text-gray-900 p-2",id:"mobileMenuButton",children:s("i",{className:"fas fa-bars text-lg"})})})]}),s("div",{id:"mobileMenu",className:"hidden md:hidden pb-4 transform transition-all duration-300",children:s("div",{className:"flex flex-col space-y-3 bg-gradient-to-b from-white to-pink-50 p-4 rounded-lg shadow-lg",children:[s("a",{href:"#features",className:"text-gray-600 hover:text-pink-600 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-pink-50 font-medium",children:[s("i",{className:"fas fa-heart mr-3 text-pink-500"}),"Features"]}),s("a",{href:"/mobile-ui.html",className:"text-gray-600 hover:text-pink-600 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-pink-50 font-medium",children:[s("i",{className:"fas fa-mobile-alt mr-3 text-purple-500"}),"iOS Design"]}),s("a",{href:"/iphone-examples.html",className:"text-gray-600 hover:text-pink-600 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-pink-50 font-medium",children:[s("i",{className:"fas fa-play-circle mr-3 text-blue-500"}),"Live Examples"]}),s("a",{href:"/member-rewards.html",className:"text-gray-600 hover:text-pink-600 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-pink-50 font-medium",children:[s("i",{className:"fas fa-gift mr-3 text-green-500"}),"Rewards"]}),s("a",{href:"/premium-pricing.html",className:"text-gray-600 hover:text-pink-600 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-pink-50 font-medium",children:[s("i",{className:"fas fa-crown mr-3 text-yellow-500"}),"Premium"]}),s("button",{className:"bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-4 rounded-full font-semibold hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300 w-full mt-4",children:s("span",{className:"flex items-center justify-center",children:[s("i",{className:"fas fa-crown mr-2 animate-pulse"}),"Get Premium Access"]})})]})})]})}),s("section",{className:"relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-12 sm:py-16 lg:py-20 overflow-hidden",children:[s("div",{className:"absolute inset-0 bg-white bg-opacity-50"}),s("div",{className:"absolute top-10 left-4 sm:left-10 text-pink-200 text-4xl sm:text-6xl opacity-30 animate-bounce",children:"💕"}),s("div",{className:"absolute bottom-10 right-4 sm:right-10 text-purple-200 text-3xl sm:text-4xl opacity-30 animate-pulse",children:"💫"}),s("div",{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-100 text-8xl opacity-10 animate-spin",style:"animation-duration: 20s;",children:"✨"}),s("div",{className:"absolute inset-0 pointer-events-none",children:[s("div",{className:"absolute top-20 left-10 text-pink-300 text-2xl opacity-40 animate-bounce",style:"animation-delay: 0s; animation-duration: 3s;",children:"💖"}),s("div",{className:"absolute top-32 right-20 text-purple-300 text-xl opacity-40 animate-bounce",style:"animation-delay: 1s; animation-duration: 4s;",children:"💕"}),s("div",{className:"absolute bottom-40 left-20 text-blue-300 text-lg opacity-40 animate-bounce",style:"animation-delay: 2s; animation-duration: 5s;",children:"💘"}),s("div",{className:"absolute bottom-20 right-32 text-pink-300 text-xl opacity-40 animate-bounce",style:"animation-delay: 1.5s; animation-duration: 3.5s;",children:"💝"})]}),s("div",{className:"relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:s("div",{className:"text-center",children:[s("div",{className:"mb-6 sm:mb-8 animate-fade-in-up",children:s("div",{className:"inline-flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-pink-800 text-xs sm:text-sm font-bold mb-4 sm:mb-6 animate-pulse shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",children:[s("i",{className:"fas fa-crown mr-2 text-yellow-500 animate-pulse"}),"#1 AI Relationship Platform • Trusted by 50,000+ Couples",s("div",{className:"ml-3 w-2 h-2 bg-green-500 rounded-full animate-ping"})]})}),s("h1",{className:"text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight px-2 animate-fade-in-up",style:"animation-delay: 0.2s;",children:["Stop Letting Your Relationship",s("span",{className:"text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 block sm:inline animate-pulse",children:" Drift Apart"})]}),s("h2",{className:"text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 mb-6 sm:mb-8 px-2 animate-fade-in-up",style:"animation-delay: 0.4s;",children:["Your AI Coach Plans, Schedules & Grows Your Love—",s("span",{className:"text-pink-600 font-bold",children:"Automatically"})]}),s("p",{className:"text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-4 animate-fade-in-up",style:"animation-delay: 0.6s;",children:["While other couples spend ",s("strong",{className:"text-red-600 animate-pulse",children:"$300+/month"})," on therapy and still struggle, you get 24/7 personalized relationship coaching, automatic date planning, and proven growth strategies for just ",s("strong",{className:"text-green-600 font-bold animate-pulse",children:"pennies per day"}),"."]}),s("div",{className:"flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-8 px-4 animate-fade-in-up",style:"animation-delay: 0.8s;",children:[s("button",{className:"w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold hover:from-pink-700 hover:to-purple-700 transition-all transform hover:scale-110 hover:shadow-2xl text-sm sm:text-base group relative overflow-hidden animate-glow",children:[s("span",{className:"relative z-10",children:[s("i",{className:"fas fa-crown mr-2 group-hover:animate-bounce"}),"Get Premium Access Now"]}),s("div",{className:"absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"})]}),s("button",{className:"w-full sm:w-auto bg-white text-gray-700 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50 hover:text-pink-700 transition-all transform hover:scale-105 hover:shadow-lg text-sm sm:text-base group hover-lift",children:[s("i",{className:"fas fa-play mr-2 group-hover:text-pink-600 transition-colors"}),"Watch 2-Min Demo"]})]}),s("div",{className:"mb-8 px-4 animate-scale-in",style:"animation-delay: 1s;",children:s("div",{className:"inline-flex items-center bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-full px-6 py-3 text-emerald-700 text-xs sm:text-sm font-bold animate-glow shadow-lg",children:[s("i",{className:"fas fa-crown mr-2 text-emerald-500 animate-pulse"}),"Premium-Only Platform: Save 33% with Annual Billing",s("span",{className:"ml-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs animate-bounce",children:"$240/year"})]})}),s("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600 px-4 animate-slide-in-bottom",style:"animation-delay: 1.2s;",children:[s("div",{className:"flex items-center justify-center sm:justify-start hover-lift p-3 rounded-lg hover:bg-emerald-50 transition-all",children:[s("i",{className:"fas fa-crown text-emerald-500 mr-2 text-lg"}),s("span",{className:"font-semibold",children:"Premium Features Only"})]}),s("div",{className:"flex items-center justify-center hover-lift p-3 rounded-lg hover:bg-blue-50 transition-all",children:[s("i",{className:"fas fa-shield-alt text-blue-500 mr-2 text-lg"}),s("span",{className:"font-semibold",children:"Bank-Level Security"})]}),s("div",{className:"flex items-center justify-center sm:justify-end hover-lift p-3 rounded-lg hover:bg-purple-50 transition-all",children:[s("i",{className:"fas fa-medal text-purple-500 mr-2 text-lg"}),s("span",{className:"font-semibold",children:"30-Day Guarantee"})]})]}),s("div",{className:"mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500",children:[s("div",{className:"flex items-center",children:[s("div",{className:"flex -space-x-1 mr-3",children:[s("div",{className:"w-8 h-8 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-xs",children:"👩"}),s("div",{className:"w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs",children:"👨"}),s("div",{className:"w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-xs",children:"👩"}),s("div",{className:"w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-xs font-bold",children:"+50k"})]}),s("span",{className:"text-xs sm:text-sm",children:"Happy couples already joined"})]}),s("div",{className:"flex items-center",children:[s("div",{className:"flex text-yellow-400 mr-2",children:[s("i",{className:"fas fa-star text-sm"}),s("i",{className:"fas fa-star text-sm"}),s("i",{className:"fas fa-star text-sm"}),s("i",{className:"fas fa-star text-sm"}),s("i",{className:"fas fa-star text-sm"})]}),s("span",{className:"text-xs sm:text-sm",children:"4.9/5 rating"})]})]})]})})]}),s("section",{className:"py-16 bg-white",children:s("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:s("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-8 text-center",children:[s("div",{className:"space-y-2",children:[s("div",{className:"text-3xl font-bold text-pink-600",children:"87%"}),s("div",{className:"text-gray-600",children:"Improved Communication"})]}),s("div",{className:"space-y-2",children:[s("div",{className:"text-3xl font-bold text-purple-600",children:"94%"}),s("div",{className:"text-gray-600",children:"Relationship Satisfaction"})]}),s("div",{className:"space-y-2",children:[s("div",{className:"text-3xl font-bold text-blue-600",children:"15+"}),s("div",{className:"text-gray-600",children:"Days Average Streak"})]}),s("div",{className:"space-y-2",children:[s("div",{className:"text-3xl font-bold text-green-600",children:"98%"}),s("div",{className:"text-gray-600",children:"Would Recommend"})]})]})})}),s("section",{id:"features",className:"py-20 bg-gray-50",children:s("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[s("div",{className:"text-center mb-16",children:[s("h2",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-4",children:"Everything You Need for Relationship Success"}),s("p",{className:"text-xl text-gray-600 max-w-2xl mx-auto",children:"Science-backed features designed to strengthen your connection and build lasting love."})]}),s("div",{className:"grid md:grid-cols-3 gap-8 mb-16",children:[s("div",{className:"bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow",children:[s("div",{className:"w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6",children:s("i",{className:"fas fa-robot text-white text-2xl"})}),s("h3",{className:"text-xl font-semibold mb-4 text-gray-900",children:["AI Relationship Assistant ",s("span",{className:"text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full",children:"Premium"})]}),s("p",{className:"text-gray-600 leading-relaxed",children:"Talk naturally to your AI coach that understands your relationship, suggests personalized experiences, and automatically schedules meaningful activities in both partners' calendars."})]}),s("div",{className:"bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow",children:[s("div",{className:"w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6",children:s("i",{className:"fas fa-calendar-plus text-white text-2xl"})}),s("h3",{className:"text-xl font-semibold mb-4 text-gray-900",children:["Smart Scheduling ",s("span",{className:"text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full",children:"Premium"})]}),s("p",{className:"text-gray-600 leading-relaxed",children:"AI automatically finds optimal times, suggests location-based experiences, and adds personalized activities to your partner's calendar with thoughtful reminders and context."})]}),s("div",{className:"bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow",children:[s("div",{className:"w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6",children:s("i",{className:"fas fa-lightbulb text-white text-2xl"})}),s("h3",{className:"text-xl font-semibold mb-4 text-gray-900",children:["Intelligent Suggestions ",s("span",{className:"text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full",children:"Premium"})]}),s("p",{className:"text-gray-600 leading-relaxed",children:"Get personalized recommendations for date ideas, conversation topics, gifts, and growth opportunities based on your relationship patterns and love languages."})]})]}),s("div",{className:"grid md:grid-cols-2 gap-12 items-center",children:[s("div",{className:"space-y-8",children:[s("div",{className:"flex items-start space-x-4",children:[s("div",{className:"flex-shrink-0 w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center",children:s("i",{className:"fas fa-heart text-pink-600"})}),s("div",{children:[s("h4",{className:"font-semibold text-gray-900 mb-2",children:"Love Language Integration"}),s("p",{className:"text-gray-600",children:"Understand and speak each other's love language with personalized insights and recommendations."})]})]}),s("div",{className:"flex items-start space-x-4",children:[s("div",{className:"flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center",children:s("i",{className:"fas fa-calendar-check text-purple-600"})}),s("div",{children:[s("h4",{className:"font-semibold text-gray-900 mb-2",children:"Smart Reminders"}),s("p",{className:"text-gray-600",children:"Never miss important dates, anniversaries, or special moments with intelligent notifications."})]})]}),s("div",{className:"flex items-start space-x-4",children:[s("div",{className:"flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center",children:s("i",{className:"fas fa-comments text-blue-600"})}),s("div",{children:[s("h4",{className:"font-semibold text-gray-900 mb-2",children:["Daily Best Friend Chats ",s("span",{className:"text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full",children:"Premium"})]}),s("p",{className:"text-gray-600",children:"Simple conversations like talking with your best friend—your AI coach learns how you each show love naturally, then helps your partner express appreciation the way you actually want to receive it."})]})]}),s("div",{className:"flex items-start space-x-4",children:[s("div",{className:"flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center",children:s("i",{className:"fas fa-medal text-green-600"})}),s("div",{children:[s("h4",{className:"font-semibold text-gray-900 mb-2",children:"Achievement System"}),s("p",{className:"text-gray-600",children:"Celebrate milestones together with meaningful badges and rewards that strengthen your bond."})]})]})]}),s("div",{className:"relative",children:s("div",{className:"bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8",children:[s("div",{className:"bg-white rounded-xl p-6 shadow-lg mb-4",children:[s("div",{className:"flex items-center justify-between mb-4",children:[s("h5",{className:"font-semibold text-gray-900",children:"Relationship Health"}),s("span",{className:"text-2xl font-bold text-green-600",children:"87%"})]}),s("div",{className:"w-full bg-gray-200 rounded-full h-3",children:s("div",{className:"bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full",style:{width:"87%"}})}),s("div",{className:"flex justify-between text-sm text-gray-600 mt-2",children:[s("span",{children:"Connection: 9.2/10"}),s("span",{children:"12-day streak"})]})]}),s("div",{className:"grid grid-cols-2 gap-4",children:[s("div",{className:"bg-white rounded-lg p-4 shadow-md",children:[s("div",{className:"text-2xl mb-2",children:"🎯"}),s("div",{className:"text-sm font-medium text-gray-900",children:"Active Goals"}),s("div",{className:"text-lg font-bold text-purple-600",children:"3"})]}),s("div",{className:"bg-white rounded-lg p-4 shadow-md",children:[s("div",{className:"text-2xl mb-2",children:"🏆"}),s("div",{className:"text-sm font-medium text-gray-900",children:"Achievements"}),s("div",{className:"text-lg font-bold text-pink-600",children:"8"})]})]})]})})]})]})}),s("section",{className:"py-20 bg-white",children:s("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[s("div",{className:"text-center mb-16",children:[s("h2",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-4",children:"How Better Together Works"}),s("p",{className:"text-xl text-gray-600 max-w-2xl mx-auto",children:"A simple 4-step process to transform your relationship into a thriving partnership"})]}),s("div",{className:"grid md:grid-cols-4 gap-8 mb-16",children:[s("div",{className:"text-center",children:[s("div",{className:"w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold",children:"1"}),s("h3",{className:"text-xl font-semibold mb-4 text-gray-900",children:"Create Profiles"}),s("p",{className:"text-gray-600",children:"Set up detailed profiles with love languages, preferences, and relationship goals. Invite your partner to join your journey."})]}),s("div",{className:"text-center",children:[s("div",{className:"w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold",children:"2"}),s("h3",{className:"text-xl font-semibold mb-4 text-gray-900",children:"Chat Like Best Friends"}),s("p",{className:"text-gray-600",children:"Have casual daily conversations with your AI coach—just like texting your best friend. It learns how you naturally show love and how your partner wants to receive it."})]}),s("div",{className:"text-center",children:[s("div",{className:"w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold",children:"3"}),s("h3",{className:"text-xl font-semibold mb-4 text-gray-900",children:"Set Goals & Activities"}),s("p",{className:"text-gray-600",children:"Create shared goals, plan date nights, take on challenges, and track your progress together as a team."})]}),s("div",{className:"text-center",children:[s("div",{className:"w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold",children:"4"}),s("h3",{className:"text-xl font-semibold mb-4 text-gray-900",children:"Grow Together"}),s("p",{className:"text-gray-600",children:"Watch your relationship health score improve, earn achievements, and build lasting intimacy through consistent actions."})]})]})]})}),s("section",{className:"py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50",children:s("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[s("div",{className:"text-center mb-16",children:[s("div",{className:"inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full text-indigo-800 text-sm font-medium mb-6",children:[s("i",{className:"fas fa-brain mr-2"}),"AI-Powered Relationship Intelligence"]}),s("h2",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-4",children:"Your Personal AI Relationship Coach"}),s("p",{className:"text-xl text-gray-600 max-w-2xl mx-auto",children:"Talk to your AI assistant like a friend. It learns your relationship patterns and proactively creates meaningful experiences for both partners."})]}),s("div",{className:"grid lg:grid-cols-2 gap-12 items-center mb-16",children:[s("div",{className:"space-y-8",children:[s("div",{className:"bg-white rounded-2xl p-8 shadow-lg",children:[s("div",{className:"flex items-center mb-4",children:[s("div",{className:"w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4",children:s("i",{class:"fas fa-comment-heart text-white text-xl"})}),s("h3",{className:"text-xl font-semibold text-gray-900",children:"Talk Like Best Friends"})]}),s("p",{className:"text-gray-600 mb-4",children:'"I keep buying Sarah flowers but she seems more excited when I help with the dishes. Am I missing something?"'}),s("div",{className:"bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg",children:s("p",{className:"text-sm text-indigo-800",children:[s("strong",{children:"AI Coach:"}),` "Exactly! Sarah's love language is Acts of Service—she feels most loved when you do helpful things, not gifts. I'll remind you about little ways to help her daily. You're already showing love, just not in her 'language' yet!"`]})})]}),s("div",{className:"bg-white rounded-2xl p-8 shadow-lg",children:[s("div",{className:"flex items-center mb-4",children:[s("div",{className:"w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4",children:s("i",{className:"fas fa-calendar-heart text-white text-xl"})}),s("h3",{className:"text-xl font-semibold text-gray-900",children:"Smart Partner Scheduling"})]}),s("p",{className:"text-gray-600 mb-4",children:"AI automatically adds thoughtful activities to your partner's calendar with personalized context and preparation reminders."}),s("div",{className:"space-y-3",children:[s("div",{className:"flex items-center p-3 bg-purple-50 rounded-lg",children:[s("i",{className:"fas fa-heart text-purple-500 mr-3"}),s("div",{className:"flex-1",children:[s("div",{className:"font-medium text-gray-900",children:"Surprise Date Night"}),s("div",{className:"text-sm text-gray-600",children:"Friday 7:00 PM • Bella Vista Restaurant"})]})]}),s("div",{className:"flex items-center p-3 bg-pink-50 rounded-lg",children:[s("i",{className:"fas fa-gift text-pink-500 mr-3"}),s("div",{className:"flex-1",children:[s("div",{className:"font-medium text-gray-900",children:"Preparation Reminder"}),s("div",{className:"text-sm text-gray-600",children:"Friday 5:30 PM • Wear the dress you love"})]})]})]})]})]}),s("div",{className:"bg-white rounded-2xl p-8 shadow-lg",children:[s("h3",{className:"text-2xl font-semibold text-gray-900 mb-6",children:"Intelligent Experience Suggestions"}),s("div",{className:"space-y-6",children:[s("div",{className:"border-l-4 border-blue-500 pl-4",children:[s("h4",{className:"font-semibold text-gray-900 mb-2",children:"Based on Your Patterns"}),s("p",{className:"text-gray-600 text-sm mb-3",children:`"You both rated hiking dates 9/10 and it's been 3 weeks since your last outdoor activity."`}),s("div",{className:"bg-blue-50 p-3 rounded-lg",children:s("p",{className:"text-blue-800 text-sm",children:[s("strong",{children:"Suggestion:"})," Weekend hiking at Blue Ridge Trail + picnic lunch (weather will be perfect Saturday)"]})})]}),s("div",{className:"border-l-4 border-purple-500 pl-4",children:[s("h4",{className:"font-semibold text-gray-900 mb-2",children:"Love Language Optimization"}),s("p",{className:"text-gray-600 text-sm mb-3",children:`"Alex's primary love language is 'Acts of Service' and he's been stressed about work deadlines."`}),s("div",{className:"bg-purple-50 p-3 rounded-lg",children:s("p",{className:"text-purple-800 text-sm",children:[s("strong",{children:"Suggestion:"})," Surprise him by organizing his home office and preparing his favorite meal for when he gets home"]})})]}),s("div",{className:"border-l-4 border-pink-500 pl-4",children:[s("h4",{className:"font-semibold text-gray-900 mb-2",children:"Growth Opportunities"}),s("p",{className:"text-gray-600 text-sm mb-3",children:`"Your communication scores have been lower lately. Here's a research-backed approach."`}),s("div",{className:"bg-pink-50 p-3 rounded-lg",children:s("p",{className:"text-pink-800 text-sm",children:[s("strong",{children:"Suggestion:"}),' Try the "Daily Appreciation" challenge - 5 minutes of gratitude sharing after dinner for 2 weeks']})})]})]})]})]}),s("div",{className:"bg-white rounded-2xl p-8 shadow-lg",children:[s("div",{className:"text-center mb-8",children:s("h3",{className:"text-2xl font-semibold text-gray-900 mb-4",children:"What Makes Our AI Different"})}),s("div",{className:"grid md:grid-cols-3 gap-8",children:[s("div",{className:"text-center",children:[s("div",{className:"w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4",children:s("i",{className:"fas fa-user-check text-white text-2xl"})}),s("h4",{className:"font-semibold text-gray-900 mb-2",children:"Relationship Context"}),s("p",{className:"text-gray-600 text-sm",children:"Understands your unique dynamic, history, preferences, and current relationship phase to provide hyper-personalized suggestions."})]}),s("div",{className:"text-center",children:[s("div",{className:"w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4",children:s("i",{className:"fas fa-sync-alt text-white text-2xl"})}),s("h4",{className:"font-semibold text-gray-900 mb-2",children:"Proactive Planning"}),s("p",{className:"text-gray-600 text-sm",children:"Doesn't wait for you to ask. Notices patterns, anticipates needs, and suggests experiences before relationships hit rough patches."})]}),s("div",{className:"text-center",children:[s("div",{className:"w-16 h-16 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4",children:s("i",{className:"fas fa-heart-pulse text-white text-2xl"})}),s("h4",{className:"font-semibold text-gray-900 mb-2",children:"Emotional Intelligence"}),s("p",{className:"text-gray-600 text-sm",children:"Reads between the lines of your check-ins, recognizes emotional patterns, and suggests interventions that strengthen your bond."})]})]})]})]})}),s("section",{className:"py-20 bg-gray-50",children:s("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[s("div",{className:"text-center mb-16",children:[s("h2",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-4",children:"Complete Feature Set"}),s("p",{className:"text-xl text-gray-600 max-w-2xl mx-auto",children:"Every tool you need to build a thriving, data-driven relationship"})]}),s("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-8",children:[s("div",{className:"bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-500",children:[s("div",{className:"flex items-center mb-4",children:[s("div",{className:"w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4",children:s("i",{className:"fas fa-comment-dots text-indigo-600 text-xl"})}),s("h3",{className:"text-lg font-semibold text-gray-900",children:"AI Conversation Engine"})]}),s("ul",{className:"text-gray-600 space-y-2 text-sm",children:[s("li",{children:"• Natural language relationship coaching"}),s("li",{children:"• Context-aware conversation understanding"}),s("li",{children:"• Personalized advice and suggestions"}),s("li",{children:"• Relationship pattern recognition"}),s("li",{children:"• Proactive intervention recommendations"})]})]}),s("div",{className:"bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500",children:[s("div",{className:"flex items-center mb-4",children:[s("div",{className:"w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4",children:s("i",{className:"fas fa-magic text-purple-600 text-xl"})}),s("h3",{className:"text-lg font-semibold text-gray-900",children:"AI Smart Scheduling"})]}),s("ul",{className:"text-gray-600 space-y-2 text-sm",children:[s("li",{children:"• Automatic calendar integration for both partners"}),s("li",{children:"• Intelligent optimal time-finding"}),s("li",{children:"• Contextual activity suggestions"}),s("li",{children:"• Location-based experience recommendations"}),s("li",{children:"• Preparation reminders and gift ideas"})]})]}),s("div",{className:"bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500",children:[s("div",{className:"flex items-center mb-4",children:[s("div",{className:"w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4",children:s("i",{className:"fas fa-sparkles text-blue-600 text-xl"})}),s("h3",{className:"text-lg font-semibold text-gray-900",children:"Intelligent Experience Suggestions"})]}),s("ul",{className:"text-gray-600 space-y-2 text-sm",children:[s("li",{children:"• Personalized date ideas based on preferences"}),s("li",{children:"• Love language-optimized activities"}),s("li",{children:"• Growth opportunity recommendations"}),s("li",{children:"• Local event and experience discovery"}),s("li",{children:"• Timing optimization for maximum impact"})]})]}),s("div",{className:"bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow",children:[s("div",{className:"flex items-center mb-4",children:[s("div",{className:"w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4",children:s("i",{className:"fas fa-clipboard-check text-green-600 text-xl"})}),s("h3",{className:"text-lg font-semibold text-gray-900",children:"Daily Check-ins"})]}),s("ul",{className:"text-gray-600 space-y-2 text-sm",children:[s("li",{children:"• Connection score (1-10 scale)"}),s("li",{children:"• Mood & satisfaction tracking"}),s("li",{children:"• Gratitude notes & highlights"}),s("li",{children:"• Support needs communication"}),s("li",{children:"• Streak tracking & rewards"})]})]}),s("div",{className:"bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow",children:[s("div",{className:"flex items-center mb-4",children:[s("div",{className:"w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4",children:s("i",{className:"fas fa-heart-circle-plus text-yellow-600 text-xl"})}),s("h3",{className:"text-lg font-semibold text-gray-900",children:"Activity Logs"})]}),s("ul",{className:"text-gray-600 space-y-2 text-sm",children:[s("li",{children:"• Date night planning & tracking"}),s("li",{children:"• Activity satisfaction ratings"}),s("li",{children:"• Location & cost tracking"}),s("li",{children:"• Photo memories"}),s("li",{children:"• Activity type categorization"})]})]}),s("div",{className:"bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow",children:[s("div",{className:"flex items-center mb-4",children:[s("div",{className:"w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4",children:s("i",{className:"fas fa-gamepad text-indigo-600 text-xl"})}),s("h3",{className:"text-lg font-semibold text-gray-900",children:"Gamified System"})]}),s("ul",{className:"text-gray-600 space-y-2 text-sm",children:[s("li",{children:"• Relationship challenges"}),s("li",{children:"• Achievement badges & rewards"}),s("li",{children:"• Streak counters"}),s("li",{children:"• Progress celebrations"}),s("li",{children:"• Motivation through gamification"})]})]}),s("div",{className:"bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow",children:[s("div",{className:"flex items-center mb-4",children:[s("div",{className:"w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4",children:s("i",{className:"fas fa-chart-pie text-red-600 text-xl"})}),s("h3",{className:"text-lg font-semibold text-gray-900",children:"Analytics Dashboard"})]}),s("ul",{className:"text-gray-600 space-y-2 text-sm",children:[s("li",{children:"• Relationship health scoring"}),s("li",{children:"• Trend analysis & insights"}),s("li",{children:"• Communication frequency"}),s("li",{children:"• Goal completion rates"}),s("li",{children:"• Activity satisfaction trends"})]})]}),s("div",{className:"bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow",children:[s("div",{className:"flex items-center mb-4",children:[s("div",{className:"w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mr-4",children:s("i",{className:"fas fa-bell text-cyan-600 text-xl"})}),s("h3",{className:"text-lg font-semibold text-gray-900",children:"Smart Notifications"})]}),s("ul",{className:"text-gray-600 space-y-2 text-sm",children:[s("li",{children:"• Daily check-in reminders"}),s("li",{children:"• Important date alerts"}),s("li",{children:"• Achievement notifications"}),s("li",{children:"• Goal progress updates"}),s("li",{children:"• Partner activity alerts"})]})]}),s("div",{className:"bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow",children:[s("div",{className:"flex items-center mb-4",children:[s("div",{className:"w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4",children:s("i",{className:"fas fa-user-circle text-pink-600 text-xl"})}),s("h3",{className:"text-lg font-semibold text-gray-900",children:"Enhanced User Profiles"})]}),s("ul",{className:"text-gray-600 space-y-2 text-sm",children:[s("li",{children:"• Primary & secondary love languages"}),s("li",{children:"• Relationship preferences & goals"}),s("li",{children:"• Profile photos & nicknames"}),s("li",{children:"• Calendar integration & availability"}),s("li",{children:"• AI learning from interaction patterns"})]})]}),s("div",{className:"bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow",children:[s("div",{className:"flex items-center mb-4",children:[s("div",{className:"w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4",children:s("i",{className:"fas fa-bullseye text-green-600 text-xl"})}),s("h3",{className:"text-lg font-semibold text-gray-900",children:"Goal Tracking"})]}),s("ul",{className:"text-gray-600 space-y-2 text-sm",children:[s("li",{children:"• Weekly, monthly & milestone goals"}),s("li",{children:"• Progress tracking & visualization"}),s("li",{children:"• AI-suggested next steps"}),s("li",{children:"• Custom goal categories"}),s("li",{children:"• Achievement celebrations"})]})]}),s("div",{className:"bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow",children:[s("div",{className:"flex items-center mb-4",children:[s("div",{className:"w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4",children:s("i",{className:"fas fa-shield-halved text-gray-600 text-xl"})}),s("h3",{className:"text-lg font-semibold text-gray-900",children:"Privacy & Security"})]}),s("ul",{className:"text-gray-600 space-y-2 text-sm",children:[s("li",{children:"• End-to-end data encryption"}),s("li",{children:"• Private AI conversations"}),s("li",{children:"• Secure calendar integration"}),s("li",{children:"• GDPR compliant"}),s("li",{children:"• Data export options"})]})]})]})]})}),s("section",{className:"py-20 bg-white",children:s("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[s("div",{className:"text-center mb-16",children:[s("h2",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-4",children:"Relationship Challenges & Activities"}),s("p",{className:"text-xl text-gray-600 max-w-2xl mx-auto",children:"Proven challenges designed by relationship psychologists to strengthen your bond"})]}),s("div",{className:"grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12",children:[s("div",{className:"bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200",children:[s("div",{className:"w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4",children:s("i",{className:"fas fa-seedling text-white text-xl"})}),s("h3",{className:"font-semibold text-gray-900 mb-2",children:"7-Day Gratitude Challenge"}),s("p",{className:"text-sm text-gray-600 mb-3",children:"Express daily appreciation for your partner"}),s("div",{className:"flex items-center justify-between",children:[s("span",{className:"px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full",children:"Beginner"}),s("span",{className:"text-green-600 font-medium",children:"7 days"})]})]}),s("div",{className:"bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200",children:[s("div",{className:"w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4",children:s("i",{className:"fas fa-clock text-white text-xl"})}),s("h3",{className:"font-semibold text-gray-900 mb-2",children:"30-Day Quality Time"}),s("p",{className:"text-sm text-gray-600 mb-3",children:"Dedicated time together every day"}),s("div",{className:"flex items-center justify-between",children:[s("span",{className:"px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full",children:"Intermediate"}),s("span",{className:"text-blue-600 font-medium",children:"30 days"})]})]}),s("div",{className:"bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200",children:[s("div",{className:"w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4",children:s("i",{className:"fas fa-comments text-white text-xl"})}),s("h3",{className:"font-semibold text-gray-900 mb-2",children:"Deep Conversations"}),s("p",{className:"text-sm text-gray-600 mb-3",children:"Meaningful dialogue starters"}),s("div",{className:"flex items-center justify-between",children:[s("span",{className:"px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full",children:"Advanced"}),s("span",{className:"text-purple-600 font-medium",children:"Ongoing"})]})]}),s("div",{className:"bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-6 border border-pink-200",children:[s("div",{className:"w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4",children:s("i",{className:"fas fa-heart-pulse text-white text-xl"})}),s("h3",{className:"font-semibold text-gray-900 mb-2",children:"Weekly Date Nights"}),s("p",{className:"text-sm text-gray-600 mb-3",children:"Regular romantic connections"}),s("div",{className:"flex items-center justify-between",children:[s("span",{className:"px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full",children:"Intermediate"}),s("span",{className:"text-pink-600 font-medium",children:"Weekly"})]})]})]}),s("div",{className:"grid md:grid-cols-3 gap-8",children:[s("div",{className:"text-center",children:[s("div",{className:"w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6",children:s("i",{className:"fas fa-trophy text-white text-2xl"})}),s("h3",{className:"text-xl font-semibold mb-4 text-gray-900",children:"Achievement System"}),s("p",{className:"text-gray-600",children:'Earn badges for milestones like "Week Strong" (7-day streak), "Communication Champion", and "Goal Getter" to celebrate your progress.'})]}),s("div",{className:"text-center",children:[s("div",{className:"w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6",children:s("i",{className:"fas fa-fire text-white text-2xl"})}),s("h3",{className:"text-xl font-semibold mb-4 text-gray-900",children:"Streak Tracking"}),s("p",{className:"text-gray-600",children:"Build momentum with daily check-in streaks, goal completion chains, and activity consistency that strengthens your relationship habits."})]}),s("div",{className:"text-center",children:[s("div",{className:"w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6",children:s("i",{className:"fas fa-star text-white text-2xl"})}),s("h3",{className:"text-xl font-semibold mb-4 text-gray-900",children:"Progress Rewards"}),s("p",{className:"text-gray-600",children:"Unlock new challenges, celebrate relationship milestones, and get personalized insights as you grow stronger together."})]})]})]})}),s("section",{id:"pricing",className:"py-20 bg-white",children:s("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[s("div",{className:"text-center mb-16",children:[s("div",{className:"inline-flex items-center px-6 py-3 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold mb-6",children:[s("i",{className:"fas fa-heart mr-2"}),"Join 50,000+ Couples Growing Stronger"]}),s("h2",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-4",children:"Choose Your Relationship Journey"}),s("p",{className:"text-xl text-gray-600 max-w-2xl mx-auto",children:"Every great relationship is an investment. Choose how you want to grow together and unlock your full potential as a couple."})]}),s("div",{className:"grid md:grid-cols-2 gap-8 max-w-4xl mx-auto",children:[s("div",{className:"bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 relative text-white transform scale-105",children:[s("div",{className:"absolute -top-4 left-1/2 transform -translate-x-1/2",children:s("div",{className:"bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-medium",children:"MOST POPULAR"})}),s("div",{className:"text-center",children:[s("h3",{className:"text-2xl font-semibold mb-2",children:"Better Together Plan"}),s("div",{className:"mb-6",children:[s("span",{className:"text-5xl font-bold",children:"$240"}),s("span",{className:"text-pink-200",children:"/year"}),s("div",{className:"text-lg text-pink-100 mt-2",children:"Just $20/month per person"})]}),s("div",{className:"bg-pink-100 text-pink-800 px-4 py-2 rounded-lg mb-6",children:s("span",{className:"font-bold",children:"Complete relationship transformation"})}),s("ul",{className:"space-y-3 mb-8 text-left",children:[s("li",{className:"flex items-center",children:[s("i",{className:"fas fa-robot text-blue-300 mr-3"}),s("span",{children:"Personal AI Relationship Coach"})]}),s("li",{className:"flex items-center",children:[s("i",{className:"fas fa-heart text-rose-300 mr-3"}),s("span",{children:"Intimacy & Connection Challenges"})]}),s("li",{className:"flex items-center",children:[s("i",{className:"fas fa-calendar-heart text-purple-300 mr-3"}),s("span",{children:"Smart Date Planning"})]}),s("li",{className:"flex items-center",children:[s("i",{className:"fas fa-gamepad text-indigo-300 mr-3"}),s("span",{children:"All Relationship Games"})]}),s("li",{className:"flex items-center",children:[s("i",{className:"fas fa-users text-amber-300 mr-3"}),s("span",{children:"Private Couples Community"})]}),s("li",{className:"flex items-center",children:[s("i",{className:"fas fa-gift text-pink-300 mr-3"}),s("span",{children:"$50 Surprise Credits"})]})]}),s("button",{className:"w-full bg-white text-pink-600 py-4 rounded-lg font-semibold hover:bg-pink-50 transition-colors text-lg",children:"Transform Our Relationship"})]})]}),s("div",{className:"bg-white rounded-2xl border-2 border-gray-300 p-8 relative",children:[s("div",{className:"absolute -top-3 -right-3",children:s("div",{className:"bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium",children:"No Commitment"})}),s("div",{className:"text-center",children:[s("h3",{className:"text-2xl font-semibold text-gray-900 mb-2",children:"Try It Out Plan"}),s("div",{className:"mb-6",children:[s("span",{className:"text-5xl font-bold text-gray-900",children:"$30"}),s("span",{className:"text-gray-600",children:"/month"}),s("div",{className:"text-lg text-gray-600 mt-2",children:"Per person • Explore first"})]}),s("div",{className:"bg-blue-50 text-blue-700 px-4 py-2 rounded-lg mb-6",children:s("span",{className:"font-bold",children:"Perfect for getting started"})}),s("ul",{className:"space-y-3 mb-8 text-left",children:[s("li",{className:"flex items-center",children:[s("i",{className:"fas fa-check text-gray-600 mr-3"}),s("span",{className:"text-gray-600",children:"Essential AI Coach"})]}),s("li",{className:"flex items-center",children:[s("i",{className:"fas fa-check text-gray-600 mr-3"}),s("span",{className:"text-gray-600",children:"Basic Connection Tools"})]}),s("li",{className:"flex items-center",children:[s("i",{className:"fas fa-check text-gray-600 mr-3"}),s("span",{className:"text-gray-600",children:"Simple Date Planning"})]}),s("li",{className:"flex items-center",children:[s("i",{className:"fas fa-check text-gray-600 mr-3"}),s("span",{className:"text-gray-600",children:"Starter Games"})]}),s("li",{className:"flex items-center text-gray-400",children:[s("i",{className:"fas fa-minus text-gray-400 mr-3"}),s("span",{children:"Limited features"})]}),s("li",{className:"flex items-center text-gray-400",children:[s("i",{className:"fas fa-minus text-gray-400 mr-3"}),s("span",{children:"Email support only"})]})]}),s("button",{className:"w-full bg-gray-600 text-white py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-lg",children:"Try It Out First"})]})]})]}),s("div",{className:"text-center mt-12",children:s("a",{href:"/premium-pricing.html",className:"inline-flex items-center text-pink-600 hover:text-pink-700 font-semibold",children:[s("i",{className:"fas fa-gift mr-2"}),"Surprise Your Partner & View Couples Packages",s("i",{className:"fas fa-arrow-right ml-2"})]})})]})}),s("section",{className:"py-20 bg-gradient-to-br from-pink-600 to-purple-700",children:s("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white",children:[s("h2",{className:"text-3xl md:text-4xl font-bold mb-6",children:"Ready to Transform Your Relationship?"}),s("p",{className:"text-xl mb-10 opacity-90 max-w-2xl mx-auto",children:"Join thousands of couples who are building stronger, more connected relationships with Better Together."}),s("div",{className:"flex flex-col sm:flex-row justify-center items-center gap-4",children:[s("button",{className:"w-full sm:w-auto bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-pink-50 transition-all transform hover:scale-105 shadow-lg",children:[s("i",{className:"fas fa-crown mr-2"}),"Get Premium Access"]}),s("button",{className:"w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors",children:[s("i",{className:"fas fa-play mr-2"}),"Watch How It Works"]})]})]})}),s("footer",{className:"bg-gray-900 text-gray-300 py-16",children:s("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[s("div",{className:"grid md:grid-cols-4 gap-8",children:[s("div",{className:"space-y-4",children:[s("div",{className:"flex items-center",children:[s("span",{className:"text-2xl",children:"💕"}),s("span",{className:"ml-2 text-xl font-bold text-white",children:"Better Together"})]}),s("p",{className:"text-gray-400 leading-relaxed",children:"Transforming relationships through intelligent connection tracking and shared growth experiences."}),s("div",{className:"flex space-x-4",children:[s("a",{href:"#",className:"text-gray-400 hover:text-white transition-colors",children:s("i",{className:"fab fa-twitter"})}),s("a",{href:"#",className:"text-gray-400 hover:text-white transition-colors",children:s("i",{className:"fab fa-facebook"})}),s("a",{href:"#",className:"text-gray-400 hover:text-white transition-colors",children:s("i",{className:"fab fa-instagram"})})]})]}),s("div",{children:[s("h5",{className:"font-semibold text-white mb-4",children:"Product"}),s("ul",{className:"space-y-2",children:[s("li",{children:s("a",{href:"#features",className:"text-gray-400 hover:text-white transition-colors",children:"Features"})}),s("li",{children:s("a",{href:"#pricing",className:"text-gray-400 hover:text-white transition-colors",children:"Pricing"})}),s("li",{children:s("a",{href:"/api",className:"text-gray-400 hover:text-white transition-colors",children:"API Docs"})}),s("li",{children:s("a",{href:"#",className:"text-gray-400 hover:text-white transition-colors",children:"Changelog"})})]})]}),s("div",{children:[s("h5",{className:"font-semibold text-white mb-4",children:"Support"}),s("ul",{className:"space-y-2",children:[s("li",{children:s("a",{href:"#",className:"text-gray-400 hover:text-white transition-colors",children:"Help Center"})}),s("li",{children:s("a",{href:"#",className:"text-gray-400 hover:text-white transition-colors",children:"Contact Us"})}),s("li",{children:s("a",{href:"#",className:"text-gray-400 hover:text-white transition-colors",children:"Privacy Policy"})}),s("li",{children:s("a",{href:"#",className:"text-gray-400 hover:text-white transition-colors",children:"Terms of Service"})})]})]}),s("div",{children:[s("h5",{className:"font-semibold text-white mb-4",children:"Business"}),s("ul",{className:"space-y-2",children:[s("li",{children:s("a",{href:"/become-sponsor.html",className:"text-gray-400 hover:text-white transition-colors",children:"Become a Partner"})}),s("li",{children:s("a",{href:"#",className:"text-gray-400 hover:text-white transition-colors",children:"Partner Portal"})}),s("li",{children:s("a",{href:"#",className:"text-gray-400 hover:text-white transition-colors",children:"About Us"})}),s("li",{children:s("a",{href:"#",className:"text-gray-400 hover:text-white transition-colors",children:"Contact"})})]})]})]}),s("div",{className:"border-t border-gray-800 mt-12 pt-8 text-center",children:s("p",{className:"text-gray-400",children:"© 2025 Better Together. Built with 💕 for couples who want to thrive together."})})]})}),s("script",{children:`
          document.addEventListener('DOMContentLoaded', function() {
            // Enhanced Mobile menu toggle with animations
            const mobileMenuButton = document.getElementById('mobileMenuButton');
            const mobileMenu = document.getElementById('mobileMenu');
            
            if (mobileMenuButton && mobileMenu) {
              mobileMenuButton.addEventListener('click', function() {
                const isHidden = mobileMenu.classList.contains('hidden');
                if (isHidden) {
                  mobileMenu.classList.remove('hidden');
                  mobileMenu.style.transform = 'translateY(-10px)';
                  mobileMenu.style.opacity = '0';
                  setTimeout(() => {
                    mobileMenu.style.transform = 'translateY(0)';
                    mobileMenu.style.opacity = '1';
                  }, 10);
                } else {
                  mobileMenu.style.transform = 'translateY(-10px)';
                  mobileMenu.style.opacity = '0';
                  setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                  }, 300);
                }
                
                // Animate hamburger to X
                const icon = this.querySelector('i');
                if (icon) {
                  icon.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
                }
              });
            }

            // Close mobile menu when clicking on a link
            const mobileLinks = mobileMenu?.querySelectorAll('a');
            if (mobileLinks) {
              mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                  mobileMenu.style.transform = 'translateY(-10px)';
                  mobileMenu.style.opacity = '0';
                  setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                  }, 300);
                });
              });
            }

            // Enhanced button interactions
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
              // Add ripple effect
              button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                  ripple.remove();
                }, 600);
              });
              
              // Touch-friendly sizing on mobile
              if (window.innerWidth <= 768) {
                button.style.minHeight = '44px';
              }
            });

            // Enhanced scroll animations
            const observerOptions = {
              threshold: 0.1,
              rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
                }
              });
            }, observerOptions);
            
            // Observe animated elements
            const animatedElements = document.querySelectorAll('[class*="animate-"]');
            animatedElements.forEach(el => {
              // Set initial state for scroll animations
              if (!el.style.animationDelay) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                observer.observe(el);
              }
            });

            // Smooth scrolling for anchor links
            const anchorLinks = document.querySelectorAll('a[href^="#"]');
            anchorLinks.forEach(link => {
              link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                  // Add scroll offset for fixed header
                  const headerHeight = 80;
                  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                  
                  window.scrollTo({ 
                    top: targetPosition,
                    behavior: 'smooth'
                  });
                }
              });
            });

            // Parallax effect for background elements
            window.addEventListener('scroll', function() {
              const scrolled = window.pageYOffset;
              const parallax = document.querySelectorAll('[class*="animate-float"]');
              
              parallax.forEach((element, index) => {
                const speed = (index + 1) * 0.5;
                element.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
              });
            });

            // Close mobile menu on resize
            window.addEventListener('resize', function() {
              if (window.innerWidth >= 768 && mobileMenu) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton?.querySelector('i');
                if (icon) icon.style.transform = 'rotate(0deg)';
              }
            });

            // Add loading states to CTA buttons
            const ctaButtons = document.querySelectorAll('button[class*="bg-gradient"]');
            ctaButtons.forEach(button => {
              button.addEventListener('click', function() {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Getting Started...';
                this.disabled = true;
                
                // Simulate loading (remove in production)
                setTimeout(() => {
                  this.innerHTML = originalText;
                  this.disabled = false;
                }, 2000);
              });
            });
          });
          
          // Add CSS for ripple effect
          const style = document.createElement('style');
          style.textContent = \`
            .ripple {
              position: absolute;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.6);
              transform: scale(0);
              animation: ripple 0.6s linear;
              pointer-events: none;
            }
            
            @keyframes ripple {
              to {
                transform: scale(4);
                opacity: 0;
              }
            }
          \`;
          document.head.appendChild(style);
        `})]})));w.get("/api",e=>e.render(s("div",{className:"min-h-screen bg-gray-50 py-8",children:s("div",{className:"container mx-auto px-4",children:[s("h1",{className:"text-4xl font-bold text-center mb-8 text-gray-800",children:"Better Together API"}),s("div",{className:"bg-white rounded-xl shadow-lg p-8",children:[s("h2",{className:"text-2xl font-bold mb-6 text-gray-800",children:"Available Endpoints"}),s("div",{className:"space-y-6",children:[s("div",{children:[s("h3",{className:"text-xl font-semibold mb-3 text-green-600",children:"Authentication & Users"}),s("ul",{className:"space-y-2 text-gray-600",children:[s("li",{children:[s("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"POST /api/users"})," - Create user account"]}),s("li",{children:[s("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"GET /api/users/:userId"})," - Get user profile"]}),s("li",{children:[s("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"PUT /api/users/:userId"})," - Update user profile"]})]})]}),s("div",{children:[s("h3",{className:"text-xl font-semibold mb-3 text-blue-600",children:"Relationships"}),s("ul",{className:"space-y-2 text-gray-600",children:[s("li",{children:[s("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"POST /api/invite-partner"})," - Invite partner to relationship"]}),s("li",{children:[s("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"GET /api/relationships/:userId"})," - Get relationship details"]})]})]}),s("div",{children:[s("h3",{className:"text-xl font-semibold mb-3 text-purple-600",children:"Daily Check-ins"}),s("ul",{className:"space-y-2 text-gray-600",children:[s("li",{children:[s("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"POST /api/checkins"})," - Submit daily check-in"]}),s("li",{children:[s("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"GET /api/checkins/:relationshipId"})," - Get recent check-ins"]})]})]}),s("div",{children:[s("h3",{className:"text-xl font-semibold mb-3 text-orange-600",children:"Goals & Activities"}),s("ul",{className:"space-y-2 text-gray-600",children:[s("li",{children:[s("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"POST /api/goals"})," - Create shared goal"]}),s("li",{children:[s("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"GET /api/goals/:relationshipId"})," - Get relationship goals"]}),s("li",{children:[s("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"POST /api/activities"})," - Create activity"]}),s("li",{children:[s("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"GET /api/activities/:relationshipId"})," - Get activities"]})]})]}),s("div",{children:[s("h3",{className:"text-xl font-semibold mb-3 text-red-600",children:"Dashboard & Analytics"}),s("ul",{className:"space-y-2 text-gray-600",children:[s("li",{children:[s("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"GET /api/dashboard/:userId"})," - Get complete dashboard data"]}),s("li",{children:[s("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"GET /api/analytics/:relationshipId"})," - Get relationship analytics"]})]})]})]})]})]})})));const ss=new jt,Qi=Object.assign({"/src/index.tsx":w});let Zs=!1;for(const[,e]of Object.entries(Qi))e&&(ss.all("*",t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),ss.notFound(t=>{let a;try{a=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,a)}),Zs=!0);if(!Zs)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");const Zi=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relationship Subscription Boxes - Curated Experiences Delivered | Better Together</title>
    <meta name="description" content="Premium subscription boxes with 60-70% margins. Romance, Adventure, Anniversary, Self-Care & Personalized boxes delivered monthly. AI-curated experiences for couples.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        pink: {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d',
                            800: '#9d174d'
                        },
                        purple: {
                            500: '#8b5cf6',
                            600: '#7c3aed',
                            700: '#6d28d9'
                        }
                    },
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif']
                    },
                    animation: {
                        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
                        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite'
                    }
                }
            }
        }
    <\/script>
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 50%, #fce7f3 100%);
        }
        .box-shadow-custom {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .hover-lift:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .profit-badge {
            background: linear-gradient(45deg, #10b981, #059669);
            color: white;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
        }
    </style>
</head>
<body class="bg-gray-50 font-inter">
    ${H}

    <!-- Hero Section -->
    <section class="gradient-bg py-16 sm:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <!-- Lean Canvas Value Prop Badge -->
                <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-semibold mb-8 shadow-lg">
                    <i class="fas fa-heart mr-2"></i>
                    AI-Curated Relationship Experiences
                </div>
                
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Subscription Boxes That
                    <span class="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                        Strengthen Your Bond
                    </span>
                </h1>
                
                <p class="text-xl sm:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                    Premium curated experiences delivered monthly. Our AI learns your relationship preferences and selects the perfect items to deepen your connection.
                </p>
                
                <!-- Key Metrics Preview -->
                <div class="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                        <div class="text-3xl font-bold text-pink-600 mb-2">60-70%</div>
                        <div class="text-sm text-gray-600">Profit Margins</div>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                        <div class="text-3xl font-bold text-purple-600 mb-2">5 Types</div>
                        <div class="text-sm text-gray-600">Box Categories</div>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                        <div class="text-3xl font-bold text-blue-600 mb-2">$50-120</div>
                        <div class="text-sm text-gray-600">Price Range</div>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button class="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 shadow-lg transition-all duration-300">
                        <i class="fas fa-box-heart mr-2"></i>
                        Start Your Subscription
                    </button>
                    <button class="w-full sm:w-auto bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-colors shadow-lg">
                        <i class="fas fa-play mr-2"></i>
                        See Unboxing Video
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Subscription Box Types -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Choose Your Relationship Experience
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Each box is AI-curated based on your relationship preferences and designed for maximum profit margins while delivering exceptional value.
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <!-- Romance Box -->
                <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 hover-lift transition-all duration-300 box-shadow-custom">
                    <div class="flex items-center justify-between mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-heart text-white text-2xl"></i>
                        </div>
                        <div class="profit-badge">60% Margin</div>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Romance Box</h3>
                    <p class="text-gray-600 mb-6">Premium candle, artisan chocolates, luxury bath bomb, personalized love note card</p>
                    
                    <!-- Cost Breakdown -->
                    <div class="bg-white rounded-lg p-4 mb-6 text-sm">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">COGS:</span>
                            <span class="font-semibold">$15.00</span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">Shipping (1.5 lbs):</span>
                            <span class="font-semibold">$5.00</span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">Packaging & Handling:</span>
                            <span class="font-semibold">$4.25</span>
                        </div>
                        <div class="border-t pt-2 flex justify-between items-center font-bold">
                            <span>Total Cost:</span>
                            <span class="text-red-600">$24.25</span>
                        </div>
                    </div>

                    <div class="text-center">
                        <div class="text-3xl font-bold text-gray-900 mb-2">$60<span class="text-lg font-normal text-gray-600">/month</span></div>
                        <div class="text-green-600 font-semibold mb-4">Profit: $35.75 per box</div>
                        <button class="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                            Subscribe Now
                        </button>
                    </div>
                </div>

                <!-- Adventure Date Box -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover-lift transition-all duration-300 box-shadow-custom">
                    <div class="flex items-center justify-between mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-mountain text-white text-2xl"></i>
                        </div>
                        <div class="profit-badge">62% Margin</div>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Adventure Date Box</h3>
                    <p class="text-gray-600 mb-6">DIY painting kit, picnic blanket, couples game, adventure planning guide</p>
                    
                    <!-- Cost Breakdown -->
                    <div class="bg-white rounded-lg p-4 mb-6 text-sm">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">COGS:</span>
                            <span class="font-semibold">$20.00</span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">Shipping (3.0 lbs):</span>
                            <span class="font-semibold">$8.00</span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">Packaging & Handling:</span>
                            <span class="font-semibold">$4.50</span>
                        </div>
                        <div class="border-t pt-2 flex justify-between items-center font-bold">
                            <span>Total Cost:</span>
                            <span class="text-red-600">$32.50</span>
                        </div>
                    </div>

                    <div class="text-center">
                        <div class="text-3xl font-bold text-gray-900 mb-2">$85<span class="text-lg font-normal text-gray-600">/month</span></div>
                        <div class="text-green-600 font-semibold mb-4">Profit: $52.50 per box</div>
                        <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Subscribe Now
                        </button>
                    </div>
                </div>

                <!-- Anniversary Box -->
                <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 hover-lift transition-all duration-300 box-shadow-custom">
                    <div class="flex items-center justify-between mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-gift text-white text-2xl"></i>
                        </div>
                        <div class="profit-badge">62% Margin</div>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Anniversary Box</h3>
                    <p class="text-gray-600 mb-6">Jewelry piece, wine glass set, gourmet snacks, celebration accessories</p>
                    
                    <!-- Cost Breakdown -->
                    <div class="bg-white rounded-lg p-4 mb-6 text-sm">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">COGS:</span>
                            <span class="font-semibold">$30.00</span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">Shipping (4.0 lbs):</span>
                            <span class="font-semibold">$10.00</span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">Packaging & Handling:</span>
                            <span class="font-semibold">$5.00</span>
                        </div>
                        <div class="border-t pt-2 flex justify-between items-center font-bold">
                            <span>Total Cost:</span>
                            <span class="text-red-600">$45.00</span>
                        </div>
                    </div>

                    <div class="text-center">
                        <div class="text-3xl font-bold text-gray-900 mb-2">$120<span class="text-lg font-normal text-gray-600">/month</span></div>
                        <div class="text-green-600 font-semibold mb-4">Profit: $75.00 per box</div>
                        <button class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                            Subscribe Now
                        </button>
                    </div>
                </div>

                <!-- Self-Care Box -->
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover-lift transition-all duration-300 box-shadow-custom">
                    <div class="flex items-center justify-between mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-leaf text-white text-2xl"></i>
                        </div>
                        <div class="profit-badge">57% Margin</div>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Self-Care Box</h3>
                    <p class="text-gray-600 mb-6">Relationship journal, premium tea set, aromatherapy oils, mindfulness guide</p>
                    
                    <!-- Cost Breakdown -->
                    <div class="bg-white rounded-lg p-4 mb-6 text-sm">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">COGS:</span>
                            <span class="font-semibold">$12.00</span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">Shipping (1.2 lbs):</span>
                            <span class="font-semibold">$5.00</span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">Packaging & Handling:</span>
                            <span class="font-semibold">$4.25</span>
                        </div>
                        <div class="border-t pt-2 flex justify-between items-center font-bold">
                            <span>Total Cost:</span>
                            <span class="text-red-600">$21.25</span>
                        </div>
                    </div>

                    <div class="text-center">
                        <div class="text-3xl font-bold text-gray-900 mb-2">$50<span class="text-lg font-normal text-gray-600">/month</span></div>
                        <div class="text-green-600 font-semibold mb-4">Profit: $28.75 per box</div>
                        <button class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                            Subscribe Now
                        </button>
                    </div>
                </div>

                <!-- Personalized Box -->
                <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 hover-lift transition-all duration-300 box-shadow-custom">
                    <div class="flex items-center justify-between mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-star text-white text-2xl"></i>
                        </div>
                        <div class="profit-badge">62% Margin</div>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Personalized Box</h3>
                    <p class="text-gray-600 mb-6">Custom engraved keepsake, personalized candle, luxury gift wrap, AI-selected items</p>
                    
                    <!-- Cost Breakdown -->
                    <div class="bg-white rounded-lg p-4 mb-6 text-sm">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">COGS:</span>
                            <span class="font-semibold">$25.00</span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">Shipping (2.5 lbs):</span>
                            <span class="font-semibold">$8.00</span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-gray-600">Packaging & Handling:</span>
                            <span class="font-semibold">$4.75</span>
                        </div>
                        <div class="border-t pt-2 flex justify-between items-center font-bold">
                            <span>Total Cost:</span>
                            <span class="text-red-600">$37.75</span>
                        </div>
                    </div>

                    <div class="text-center">
                        <div class="text-3xl font-bold text-gray-900 mb-2">$100<span class="text-lg font-normal text-gray-600">/month</span></div>
                        <div class="text-green-600 font-semibold mb-4">Profit: $62.25 per box</div>
                        <button class="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
                            Subscribe Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Revenue Projections -->
    <section class="py-16 bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Revenue & Profitability Projections</h2>
                <p class="text-xl text-gray-300">Example revenue for 1,000 subscribers per box type</p>
            </div>

            <div class="overflow-x-auto mb-12">
                <table class="w-full bg-gray-800 rounded-lg overflow-hidden">
                    <thead class="bg-gray-700">
                        <tr>
                            <th class="px-6 py-4 text-left">Box Type</th>
                            <th class="px-6 py-4 text-center">Retail Price</th>
                            <th class="px-6 py-4 text-center">Total Cost</th>
                            <th class="px-6 py-4 text-center">Profit Per Box</th>
                            <th class="px-6 py-4 text-center">Monthly Revenue</th>
                            <th class="px-6 py-4 text-center">Monthly Profit</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-700">
                        <tr>
                            <td class="px-6 py-4 font-semibold">Romance Box</td>
                            <td class="px-6 py-4 text-center">$60</td>
                            <td class="px-6 py-4 text-center text-red-400">$24.25</td>
                            <td class="px-6 py-4 text-center text-green-400 font-bold">$35.75</td>
                            <td class="px-6 py-4 text-center font-semibold">$60,000</td>
                            <td class="px-6 py-4 text-center text-green-400 font-bold">$35,750</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 font-semibold">Adventure Date Box</td>
                            <td class="px-6 py-4 text-center">$85</td>
                            <td class="px-6 py-4 text-center text-red-400">$32.50</td>
                            <td class="px-6 py-4 text-center text-green-400 font-bold">$52.50</td>
                            <td class="px-6 py-4 text-center font-semibold">$85,000</td>
                            <td class="px-6 py-4 text-center text-green-400 font-bold">$52,500</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 font-semibold">Anniversary Box</td>
                            <td class="px-6 py-4 text-center">$120</td>
                            <td class="px-6 py-4 text-center text-red-400">$45.00</td>
                            <td class="px-6 py-4 text-center text-green-400 font-bold">$75.00</td>
                            <td class="px-6 py-4 text-center font-semibold">$120,000</td>
                            <td class="px-6 py-4 text-center text-green-400 font-bold">$75,000</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 font-semibold">Self-Care Box</td>
                            <td class="px-6 py-4 text-center">$50</td>
                            <td class="px-6 py-4 text-center text-red-400">$21.25</td>
                            <td class="px-6 py-4 text-center text-green-400 font-bold">$28.75</td>
                            <td class="px-6 py-4 text-center font-semibold">$50,000</td>
                            <td class="px-6 py-4 text-center text-green-400 font-bold">$28,750</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 font-semibold">Personalized Box</td>
                            <td class="px-6 py-4 text-center">$100</td>
                            <td class="px-6 py-4 text-center text-red-400">$37.75</td>
                            <td class="px-6 py-4 text-center text-green-400 font-bold">$62.25</td>
                            <td class="px-6 py-4 text-center font-semibold">$100,000</td>
                            <td class="px-6 py-4 text-center text-green-400 font-bold">$62,250</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="grid md:grid-cols-3 gap-8 text-center">
                <div class="bg-gray-800 rounded-xl p-6">
                    <div class="text-3xl font-bold text-green-400 mb-2">$415,000</div>
                    <div class="text-gray-300">Total Monthly Revenue</div>
                    <div class="text-sm text-gray-400 mt-1">Per 1,000 subscribers each</div>
                </div>
                <div class="bg-gray-800 rounded-xl p-6">
                    <div class="text-3xl font-bold text-green-400 mb-2">$254,250</div>
                    <div class="text-gray-300">Total Monthly Profit</div>
                    <div class="text-sm text-gray-400 mt-1">61% average margin</div>
                </div>
                <div class="bg-gray-800 rounded-xl p-6">
                    <div class="text-3xl font-bold text-blue-400 mb-2">$3.05M</div>
                    <div class="text-gray-300">Annual Profit Potential</div>
                    <div class="text-sm text-gray-400 mt-1">Scalable to millions</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Annual Subscription Benefits -->
    <section class="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Annual Subscription Perks</h2>
                <p class="text-xl text-gray-600">Commit for a year and unlock exclusive benefits that boost customer retention</p>
            </div>

            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Exclusive Annual Benefits</h3>
                    <div class="space-y-4">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-percentage text-white"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">15% Discount</h4>
                                <p class="text-gray-600">Save on all subscription boxes for the entire year</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-crown text-white"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">Custom Engraving</h4>
                                <p class="text-gray-600">Free personalized items and handwritten notes in every box</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-gift text-white"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">Bonus Premium Items</h4>
                                <p class="text-gray-600">Luxury candle or wine opener added to every monthly box</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-calendar-star text-white"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">Special Occasion Box</h4>
                                <p class="text-gray-600">Free anniversary and holiday boxes for committed subscribers</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-qrcode text-white"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-900">Exclusive Content</h4>
                                <p class="text-gray-600">QR codes for curated date ideas and relationship tutorials</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Annual Savings Calculator</h3>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Monthly Romance Box:</span>
                            <span class="font-semibold">$60 × 12 = $720</span>
                        </div>
                        <div class="flex justify-between items-center text-green-600">
                            <span>Annual Discount (15%):</span>
                            <span class="font-semibold">-$108</span>
                        </div>
                        <div class="flex justify-between items-center text-purple-600">
                            <span>Free Special Occasion Boxes:</span>
                            <span class="font-semibold">-$120 value</span>
                        </div>
                        <div class="border-t pt-4 flex justify-between items-center text-xl font-bold">
                            <span>Your Annual Price:</span>
                            <span class="text-green-600">$612</span>
                        </div>
                        <div class="text-center text-gray-600">
                            <span class="font-semibold text-green-600">Save $228</span> compared to monthly billing
                        </div>
                    </div>
                    <button class="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-semibold mt-6 hover:from-pink-700 hover:to-purple-700 transition-all">
                        Subscribe Annually & Save
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Lean Canvas Integration -->
    <section class="py-16 bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Strategic Business Model</h2>
                <p class="text-xl text-gray-300">How subscription boxes integrate with our Lean Canvas strategy</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="bg-gray-800 rounded-xl p-6">
                    <div class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-4">
                        <i class="fas fa-users text-white"></i>
                    </div>
                    <h3 class="text-lg font-bold mb-3">Customer Segments</h3>
                    <ul class="text-sm text-gray-300 space-y-2">
                        <li>• Couples seeking deeper connection</li>
                        <li>• Friend groups supporting relationships</li>
                        <li>• Therapists & relationship coaches</li>
                        <li>• Retail & experience vendors</li>
                    </ul>
                </div>

                <div class="bg-gray-800 rounded-xl p-6">
                    <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                        <i class="fas fa-lightbulb text-white"></i>
                    </div>
                    <h3 class="text-lg font-bold mb-3">Value Proposition</h3>
                    <p class="text-sm text-gray-300">
                        AI-driven relationship guidance + curated physical experiences + calendar reminders + community support = Complete relationship ecosystem
                    </p>
                </div>

                <div class="bg-gray-800 rounded-xl p-6">
                    <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                        <i class="fas fa-dollar-sign text-white"></i>
                    </div>
                    <h3 class="text-lg font-bold mb-3">Revenue Streams</h3>
                    <ul class="text-sm text-gray-300 space-y-2">
                        <li>• Subscription boxes (60-70% margins)</li>
                        <li>• App subscriptions (recurring revenue)</li>
                        <li>• Vendor partnerships & commissions</li>
                        <li>• Premium AI-executed services</li>
                    </ul>
                </div>

                <div class="bg-gray-800 rounded-xl p-6">
                    <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                        <i class="fas fa-star text-white"></i>
                    </div>
                    <h3 class="text-lg font-bold mb-3">Unfair Advantage</h3>
                    <ul class="text-sm text-gray-300 space-y-2">
                        <li>• AI-executed actions for partners</li>
                        <li>• Emotionally intelligent AI</li>
                        <li>• Integrated calendar & reminders</li>
                        <li>• Vendor-curated experiences</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
                Start Building Stronger Relationships Today
            </h2>
            <p class="text-xl mb-8 opacity-90">
                Join thousands of couples already strengthening their bonds with AI-curated experiences
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <button class="w-full sm:w-auto bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                    <i class="fas fa-box-heart mr-2"></i>
                    Choose Your First Box
                </button>
                <button class="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-pink-600 transition-colors">
                    <i class="fas fa-mobile-alt mr-2"></i>
                    Download the App
                </button>
            </div>

            <div class="text-pink-100">
                <p class="text-sm">
                    <i class="fas fa-shield-alt mr-2"></i>
                    30-day money back guarantee • Cancel anytime • Free shipping on annual plans
                </p>
            </div>
        </div>
    </section>

    <!-- JavaScript for Interactive Features -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Add smooth scrolling for anchor links
            const anchorLinks = document.querySelectorAll('a[href^="#"]');
            anchorLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const target = document.getElementById(targetId);
                    if (target) {
                        target.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Add hover effects to subscription boxes
            const boxCards = document.querySelectorAll('.hover-lift');
            boxCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Subscription button interactions
            const subscribeButtons = document.querySelectorAll('button[class*="bg-"]');
            subscribeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Add ripple effect
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 100);
                    
                    // Here you would integrate with subscription service
                    console.log('Subscription button clicked:', this.textContent.trim());
                });
            });

            // Animate numbers on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        if (element.classList.contains('animate-number')) {
                            animateNumber(element);
                            observer.unobserve(element);
                        }
                    }
                });
            }, observerOptions);

            // Observe elements with animation
            const animateElements = document.querySelectorAll('.animate-number');
            animateElements.forEach(el => observer.observe(el));
        });

        function animateNumber(element) {
            const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
            const duration = 1500;
            const start = performance.now();
            
            function update(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const current = Math.floor(progress * target);
                
                if (element.textContent.includes('%')) {
                    element.textContent = current + '%';
                } else if (element.textContent.includes('$')) {
                    element.textContent = '$' + current.toLocaleString();
                } else {
                    element.textContent = current.toLocaleString();
                }
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            
            requestAnimationFrame(update);
        }
    <\/script>
</body>
</html>`,er=Object.freeze(Object.defineProperty({__proto__:null,subscriptionBoxesHtml:Zi},Symbol.toStringTag,{value:"Module"})),tr=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Features & In-App Purchases | Better Together</title>
    <meta name="description" content="Unlock premium relationship features, AI credits, gift purchases, and exclusive content. Strategic monetization with 8 revenue streams and freemium conversion.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        pink: { 50: '#fdf2f8', 100: '#fce7f3', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d' },
                        purple: { 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9' },
                        emerald: { 500: '#10b981', 600: '#059669' }
                    },
                    fontFamily: { 'inter': ['Inter', 'sans-serif'] }
                }
            }
        }
    <\/script>
    <style>
        .gradient-bg { background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 50%, #fce7f3 100%); }
        .profit-badge { background: linear-gradient(45deg, #10b981, #059669); color: white; padding: 4px 12px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
        .popular-badge { background: linear-gradient(45deg, #f59e0b, #d97706); color: white; padding: 6px 16px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; position: absolute; top: -10px; right: 20px; }
        .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
        .price-slash { position: relative; color: #9ca3af; }
        .price-slash::after { content: ''; position: absolute; left: 0; top: 50%; width: 100%; height: 2px; background: #ef4444; transform: rotate(-15deg); }
    </style>
</head>
<body class="bg-gray-50 font-inter">
    ${H}

    <!-- Hero Section -->
    <section class="gradient-bg py-16 sm:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-semibold mb-8 shadow-lg">
                    <i class="fas fa-crown mr-2"></i>
                    Premium Relationship Features
                </div>
                
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Unlock Your Relationship's
                    <span class="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                        Full Potential
                    </span>
                </h1>
                
                <p class="text-xl sm:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                    8 revenue streams designed to enhance your relationship while providing exceptional value through strategic monetization.
                </p>
                
                <!-- Revenue Overview -->
                <div class="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-10">
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                        <div class="text-3xl font-bold text-pink-600 mb-2">8</div>
                        <div class="text-sm text-gray-600">Revenue Streams</div>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                        <div class="text-3xl font-bold text-purple-600 mb-2">$35+</div>
                        <div class="text-sm text-gray-600">ARPU Target</div>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                        <div class="text-3xl font-bold text-blue-600 mb-2">12%</div>
                        <div class="text-sm text-gray-600">Conversion Rate</div>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                        <div class="text-3xl font-bold text-green-600 mb-2">$420+</div>
                        <div class="text-sm text-gray-600">LTV Target</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Subscription Tiers -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Relationship Journey</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">Strategic subscription tiers designed for maximum conversion and user value</p>
            </div>

            <div class="grid lg:grid-cols-4 gap-8 mb-16">
                <!-- Free Tier -->
                <div class="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                    <div class="text-center mb-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Getting Started</h3>
                        <div class="text-4xl font-bold text-gray-900 mb-2">Free</div>
                        <p class="text-gray-600">Perfect for trying out</p>
                    </div>
                    <ul class="space-y-4 mb-8">
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">3 daily check-ins per week</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Basic calendar reminders</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">AI responses (50 words max)</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">1 relationship goal</span></li>
                        <li class="flex items-center text-gray-400"><i class="fas fa-times mr-3"></i><span class="text-sm">No AI-executed actions</span></li>
                        <li class="flex items-center text-gray-400"><i class="fas fa-times mr-3"></i><span class="text-sm">No subscription boxes</span></li>
                    </ul>
                    <button class="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                        Current Plan
                    </button>
                </div>

                <!-- Couple Tier (Popular) -->
                <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border-2 border-pink-200 relative hover-lift transition-all duration-300">
                    <div class="popular-badge">Most Popular</div>
                    <div class="text-center mb-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Growing Together</h3>
                        <div class="text-4xl font-bold text-gray-900 mb-2">
                            $19<span class="text-lg">.99</span>
                            <span class="text-lg font-normal text-gray-600">/month</span>
                        </div>
                        <p class="text-gray-600">
                            <span class="price-slash">$239.88</span> 
                            <span class="text-green-600 font-semibold">$199/year</span>
                        </p>
                    </div>
                    <ul class="space-y-4 mb-8">
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Unlimited daily check-ins</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Advanced AI coach (500 words)</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Smart calendar & reminders</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">5 relationship goals</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">2 AI actions per month</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Romance box (50% off)</span></li>
                    </ul>
                    <button class="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                        Upgrade Now
                    </button>
                    <div class="text-center mt-4">
                        <span class="text-sm text-gray-600">Target ARPU: <span class="font-semibold text-pink-600">$28.49</span></span>
                    </div>
                </div>

                <!-- Premium Tier -->
                <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border-2 border-purple-200 hover-lift transition-all duration-300">
                    <div class="text-center mb-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Thriving Partnership</h3>
                        <div class="text-4xl font-bold text-gray-900 mb-2">
                            $39<span class="text-lg">.99</span>
                            <span class="text-lg font-normal text-gray-600">/month</span>
                        </div>
                        <p class="text-gray-600">
                            <span class="price-slash">$479.88</span> 
                            <span class="text-green-600 font-semibold">$399/year</span>
                        </p>
                    </div>
                    <ul class="space-y-4 mb-8">
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Everything in Couple tier</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Unlimited AI actions</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Advanced analytics</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Personalized coaching</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">All boxes (25% off)</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Dedicated consultant</span></li>
                    </ul>
                    <button class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                        Go Premium
                    </button>
                    <div class="text-center mt-4">
                        <span class="text-sm text-gray-600">Target ARPU: <span class="font-semibold text-purple-600">$58.74</span></span>
                    </div>
                </div>

                <!-- VIP Tier -->
                <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-300 hover-lift transition-all duration-300">
                    <div class="text-center mb-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Relationship Concierge</h3>
                        <div class="text-4xl font-bold text-gray-900 mb-2">
                            $99<span class="text-lg">.99</span>
                            <span class="text-lg font-normal text-gray-600">/month</span>
                        </div>
                        <p class="text-gray-600">
                            <span class="price-slash">$1,199.88</span> 
                            <span class="text-green-600 font-semibold">$999/year</span>
                        </p>
                    </div>
                    <ul class="space-y-4 mb-8">
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Everything in Premium</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Personal concierge</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Custom AI training</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Unlimited premium gifts</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">White-glove service</span></li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i><span class="text-sm">Annual getaway planning</span></li>
                    </ul>
                    <button class="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-colors">
                        VIP Access
                    </button>
                    <div class="text-center mt-4">
                        <span class="text-sm text-gray-600">Target ARPU: <span class="font-semibold text-yellow-600">$145.19</span></span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- AI Credits & Consumables -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Credits & Actions</h2>
                <p class="text-xl text-gray-600">High-frequency purchases that execute actions on behalf of your partner</p>
            </div>

            <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">AI Action Credits</h3>
                    <p class="text-gray-600 mb-8">Let our AI execute romantic actions on your behalf - from ordering flowers to booking dinner reservations. Credits represent 35% of total add-on revenue.</p>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-pink-100">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gray-900 mb-2">10 Credits</div>
                                <div class="text-3xl font-bold text-pink-600 mb-4">$4.99</div>
                                <button class="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors text-sm">
                                    Purchase
                                </button>
                            </div>
                        </div>
                        <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-100 relative">
                            <div class="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">20% Bonus</div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gray-900 mb-2">25 Credits</div>
                                <div class="text-3xl font-bold text-purple-600 mb-4">$9.99</div>
                                <button class="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm">
                                    Purchase
                                </button>
                            </div>
                        </div>
                        <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-100 relative">
                            <div class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">30% Bonus</div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gray-900 mb-2">50 Credits</div>
                                <div class="text-3xl font-bold text-blue-600 mb-4">$17.99</div>
                                <button class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                                    Purchase
                                </button>
                            </div>
                        </div>
                        <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-green-100 relative">
                            <div class="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">40% Bonus</div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gray-900 mb-2">100 Credits</div>
                                <div class="text-3xl font-bold text-green-600 mb-4">$29.99</div>
                                <button class="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm">
                                    Purchase
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 class="text-xl font-bold text-gray-900 mb-6">Credit Usage Examples</h3>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center py-3 border-b">
                            <div class="flex items-center">
                                <i class="fas fa-rose text-pink-500 mr-3"></i>
                                <span class="font-medium">Order Flowers</span>
                            </div>
                            <span class="text-gray-600">5-15 credits</span>
                        </div>
                        <div class="flex justify-between items-center py-3 border-b">
                            <div class="flex items-center">
                                <i class="fas fa-utensils text-purple-500 mr-3"></i>
                                <span class="font-medium">Restaurant Reservation</span>
                            </div>
                            <span class="text-gray-600">3-8 credits</span>
                        </div>
                        <div class="flex justify-between items-center py-3 border-b">
                            <div class="flex items-center">
                                <i class="fas fa-ticket-alt text-blue-500 mr-3"></i>
                                <span class="font-medium">Concert Tickets</span>
                            </div>
                            <span class="text-gray-600">10-25 credits</span>
                        </div>
                        <div class="flex justify-between items-center py-3 border-b">
                            <div class="flex items-center">
                                <i class="fas fa-broom text-green-500 mr-3"></i>
                                <span class="font-medium">House Cleaning Service</span>
                            </div>
                            <span class="text-gray-600">2-5 credits</span>
                        </div>
                        <div class="flex justify-between items-center py-3">
                            <div class="flex items-center">
                                <i class="fas fa-heart text-red-500 mr-3"></i>
                                <span class="font-medium">Custom Love Notes</span>
                            </div>
                            <span class="text-gray-600">1-3 credits</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Gift & Experience Marketplace -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Gift & Experience Marketplace</h2>
                <p class="text-xl text-gray-600">AI-curated gifts and experiences with 25% of total add-on revenue</p>
            </div>

            <div class="grid md:grid-cols-4 gap-8">
                <!-- Flowers & Plants -->
                <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 hover-lift transition-all duration-300">
                    <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-rose text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Flowers & Plants</h3>
                    <div class="profit-badge mb-4 text-center">40-60% Markup</div>
                    <ul class="space-y-2 text-sm text-gray-600 mb-4">
                        <li>• Roses: $29.99-$199.99</li>
                        <li>• Custom Bouquets: $39.99-$299.99</li>
                        <li>• Potted Plants: $19.99-$89.99</li>
                        <li>• Subscription: $49.99/month</li>
                    </ul>
                    <button class="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                        Browse Flowers
                    </button>
                </div>

                <!-- Food & Beverages -->
                <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 hover-lift transition-all duration-300">
                    <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-wine-glass text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Food & Beverages</h3>
                    <div class="profit-badge mb-4 text-center">30-50% Markup</div>
                    <ul class="space-y-2 text-sm text-gray-600 mb-4">
                        <li>• Chocolates: $24.99-$149.99</li>
                        <li>• Wine Selection: $39.99-$399.99</li>
                        <li>• Gift Cards: $25-$500</li>
                        <li>• Meal Delivery: $59.99-$199.99</li>
                    </ul>
                    <button class="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                        Shop Food & Wine
                    </button>
                </div>

                <!-- Jewelry & Accessories -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 hover-lift transition-all duration-300">
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-gem text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Jewelry & Accessories</h3>
                    <div class="profit-badge mb-4 text-center">60-80% Markup</div>
                    <ul class="space-y-2 text-sm text-gray-600 mb-4">
                        <li>• Personalized: $49.99-$999.99</li>
                        <li>• Watches: $199.99-$2,999.99</li>
                        <li>• Keepsakes: $29.99-$199.99</li>
                        <li>• Custom Engraving Available</li>
                    </ul>
                    <button class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        View Jewelry
                    </button>
                </div>

                <!-- Experiences -->
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 hover-lift transition-all duration-300">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-map-marked-alt text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Experiences</h3>
                    <div class="profit-badge mb-4 text-center">20-40% Commission</div>
                    <ul class="space-y-2 text-sm text-gray-600 mb-4">
                        <li>• Concerts: $99.99-$999.99</li>
                        <li>• Spa Packages: $149.99-$799.99</li>
                        <li>• Travel: $299.99-$4,999.99</li>
                        <li>• Adventures: $79.99-$499.99</li>
                    </ul>
                    <button class="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Book Experience
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Premium Features -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Premium Features & Add-Ons</h2>
                <p class="text-xl text-gray-600">12% of add-on revenue from feature upgrades and customizations</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 mb-12">
                <!-- Advanced Calendar -->
                <div class="bg-white rounded-2xl p-8 shadow-lg hover-lift transition-all duration-300">
                    <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                        <i class="fas fa-calendar-alt text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Advanced Calendar Features</h3>
                    <ul class="space-y-3 text-gray-600 mb-6">
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Smart Event Planning - $6.99/month</li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Anniversary Countdown - $3.99 one-time</li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Custom Reminder Tones - $1.99 per pack</li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Multi-Partner Sync - $4.99/month</li>
                    </ul>
                    <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Upgrade Calendar
                    </button>
                </div>

                <!-- Communication Tools -->
                <div class="bg-white rounded-2xl p-8 shadow-lg hover-lift transition-all duration-300">
                    <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
                        <i class="fas fa-comments text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Enhanced Communication</h3>
                    <ul class="space-y-3 text-gray-600 mb-6">
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Love Language Analysis - $9.99 one-time</li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Communication Assessment - $7.99 one-time</li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Conflict Resolution - $4.99 per pack</li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Health Scoring - $8.99/month</li>
                    </ul>
                    <button class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                        Enhance Communication
                    </button>
                </div>

                <!-- Customization -->
                <div class="bg-white rounded-2xl p-8 shadow-lg hover-lift transition-all duration-300">
                    <div class="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-6">
                        <i class="fas fa-palette text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-4">App Customization</h3>
                    <ul class="space-y-3 text-gray-600 mb-6">
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Premium Themes - $3.99 each</li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Custom Colors - $2.99 each</li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Animated Backgrounds - $4.99 per pack</li>
                        <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>Photo Frames - $1.99 per pack</li>
                    </ul>
                    <button class="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                        Customize App
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Revenue Projections -->
    <section class="py-16 bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Revenue Projections & Success Metrics</h2>
                <p class="text-xl text-gray-300">10,000 user scenario with mixed tier distribution</p>
            </div>

            <div class="grid md:grid-cols-2 gap-12 mb-12">
                <div>
                    <h3 class="text-2xl font-bold mb-6">Monthly Revenue Breakdown</h3>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center py-3 border-b border-gray-700">
                            <span>5,000 Free Users</span>
                            <span class="font-bold">$0</span>
                        </div>
                        <div class="flex justify-between items-center py-3 border-b border-gray-700">
                            <span>3,500 Couple Tier ($28.49 ARPU)</span>
                            <span class="font-bold text-green-400">$99,715</span>
                        </div>
                        <div class="flex justify-between items-center py-3 border-b border-gray-700">
                            <span>1,200 Premium Tier ($58.74 ARPU)</span>
                            <span class="font-bold text-green-400">$70,488</span>
                        </div>
                        <div class="flex justify-between items-center py-3 border-b border-gray-700">
                            <span>300 VIP Tier ($145.19 ARPU)</span>
                            <span class="font-bold text-green-400">$43,557</span>
                        </div>
                        <div class="flex justify-between items-center py-3 text-xl font-bold">
                            <span>Total Monthly Revenue</span>
                            <span class="text-green-400">$213,760</span>
                        </div>
                        <div class="flex justify-between items-center py-3 text-xl font-bold">
                            <span>Annual Revenue</span>
                            <span class="text-green-400">$2.56M</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-2xl font-bold mb-6">Add-On Revenue Distribution</h3>
                    <div class="space-y-6">
                        <div class="bg-gray-800 rounded-lg p-4">
                            <div class="flex justify-between items-center mb-2">
                                <span>AI Credits</span>
                                <span class="font-bold">35%</span>
                            </div>
                            <div class="w-full bg-gray-700 rounded-full h-2">
                                <div class="bg-pink-500 h-2 rounded-full" style="width: 35%"></div>
                            </div>
                        </div>
                        <div class="bg-gray-800 rounded-lg p-4">
                            <div class="flex justify-between items-center mb-2">
                                <span>Gifts & Experiences</span>
                                <span class="font-bold">25%</span>
                            </div>
                            <div class="w-full bg-gray-700 rounded-full h-2">
                                <div class="bg-purple-500 h-2 rounded-full" style="width: 25%"></div>
                            </div>
                        </div>
                        <div class="bg-gray-800 rounded-lg p-4">
                            <div class="flex justify-between items-center mb-2">
                                <span>Subscription Boxes</span>
                                <span class="font-bold">20%</span>
                            </div>
                            <div class="w-full bg-gray-700 rounded-full h-2">
                                <div class="bg-blue-500 h-2 rounded-full" style="width: 20%"></div>
                            </div>
                        </div>
                        <div class="bg-gray-800 rounded-lg p-4">
                            <div class="flex justify-between items-center mb-2">
                                <span>Premium Features</span>
                                <span class="font-bold">12%</span>
                            </div>
                            <div class="w-full bg-gray-700 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 12%"></div>
                            </div>
                        </div>
                        <div class="bg-gray-800 rounded-lg p-4">
                            <div class="flex justify-between items-center mb-2">
                                <span>Content & Courses</span>
                                <span class="font-bold">8%</span>
                            </div>
                            <div class="w-full bg-gray-700 rounded-full h-2">
                                <div class="bg-yellow-500 h-2 rounded-full" style="width: 8%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-4 gap-8 text-center">
                <div class="bg-gray-800 rounded-xl p-6">
                    <div class="text-3xl font-bold text-green-400 mb-2">8-12%</div>
                    <div class="text-gray-300">Free to Paid</div>
                    <div class="text-sm text-gray-400">Conversion Rate</div>
                </div>
                <div class="bg-gray-800 rounded-xl p-6">
                    <div class="text-3xl font-bold text-blue-400 mb-2"><5%</div>
                    <div class="text-gray-300">Monthly Churn</div>
                    <div class="text-sm text-gray-400">Target Rate</div>
                </div>
                <div class="bg-gray-800 rounded-xl p-6">
                    <div class="text-3xl font-bold text-purple-400 mb-2">$35+</div>
                    <div class="text-gray-300">ARPU Target</div>
                    <div class="text-sm text-gray-400">Average Revenue</div>
                </div>
                <div class="bg-gray-800 rounded-xl p-6">
                    <div class="text-3xl font-bold text-pink-400 mb-2">$420+</div>
                    <div class="text-gray-300">LTV Target</div>
                    <div class="text-sm text-gray-400">Lifetime Value</div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Unlock Premium Features?</h2>
            <p class="text-xl mb-8 opacity-90">Start with our most popular tier and explore premium relationship tools</p>
            
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button class="w-full sm:w-auto bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                    <i class="fas fa-crown mr-2"></i>
                    Start Growing Together
                </button>
                <button class="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-pink-600 transition-colors">
                    <i class="fas fa-info-circle mr-2"></i>
                    Learn More
                </button>
            </div>
        </div>
    </section>

    <!-- JavaScript -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Purchase button interactions
            const purchaseButtons = document.querySelectorAll('button[class*="bg-"]');
            purchaseButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Add click animation
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 100);
                    
                    // Log purchase intent (integrate with payment system)
                    const buttonText = this.textContent.trim();
                    console.log('Purchase button clicked:', buttonText);
                    
                    // Here you would integrate with Stripe, PayPal, or other payment processor
                    // Example: initiatePayment(buttonText, getPriceFromButton(this));
                });
            });

            // Hover effects for cards
            const cards = document.querySelectorAll('.hover-lift');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        });
    <\/script>
</body>
</html>`,sr=Object.freeze(Object.defineProperty({__proto__:null,inAppPurchasesHtml:tr},Symbol.toStringTag,{value:"Module"})),ar=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intimacy Challenges - Reignite Your Passion | Better Together</title>
    <meta name="description" content="Premium intimacy challenges designed to deepen connection, build trust, and reignite passion. Progressive system with expert-designed content for couples ready to explore.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        rose: { 50: '#fff1f2', 100: '#ffe4e6', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239' },
                        purple: { 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6' },
                        amber: { 500: '#f59e0b', 600: '#d97706', 700: '#b45309' }
                    },
                    fontFamily: { 'inter': ['Inter', 'sans-serif'] },
                    animation: {
                        'pulse-glow': 'pulseGlow 3s ease-in-out infinite alternate',
                        'float': 'float 6s ease-in-out infinite'
                    },
                    keyframes: {
                        pulseGlow: {
                            '0%': { boxShadow: '0 0 20px rgba(244, 63, 94, 0.3)' },
                            '100%': { boxShadow: '0 0 40px rgba(244, 63, 94, 0.6)' }
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-10px)' }
                        }
                    }
                }
            }
        }
    <\/script>
    <style>
        .gradient-bg { background: linear-gradient(135deg, #fff1f2 0%, #fce7f3 30%, #f3e8ff 70%, #ede9fe 100%); }
        .intimacy-glow { box-shadow: 0 0 30px rgba(244, 63, 94, 0.3); }
        .premium-badge { 
            background: linear-gradient(45deg, #be123c, #9f1239); 
            color: white; 
            padding: 6px 16px; 
            border-radius: 9999px; 
            font-size: 0.75rem; 
            font-weight: 700;
            position: absolute;
            top: -10px;
            right: 20px;
            animation: pulse-glow 3s ease-in-out infinite alternate;
        }
        .challenge-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(244, 63, 94, 0.1);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .challenge-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 25px 50px rgba(244, 63, 94, 0.25);
            border-color: rgba(244, 63, 94, 0.3);
        }
        .age-verification {
            backdrop-filter: blur(25px);
            background: rgba(0, 0, 0, 0.8);
        }
        .comfort-zone-indicator {
            position: relative;
            height: 8px;
            background: linear-gradient(90deg, #10b981 0%, #f59e0b 50%, #ef4444 100%);
            border-radius: 4px;
            overflow: hidden;
        }
        .comfort-zone-marker {
            position: absolute;
            width: 4px;
            height: 12px;
            background: white;
            border: 2px solid #374151;
            border-radius: 2px;
            top: -2px;
            transition: left 0.3s ease;
        }
        .privacy-lock {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 8px;
            border-radius: 50%;
            font-size: 0.875rem;
        }
    </style>
</head>
<body class="bg-gray-50 font-inter">
    <!-- Age Verification Modal -->
    <div id="ageVerification" class="fixed inset-0 age-verification flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div class="mb-6">
                <i class="fas fa-shield-alt text-4xl text-rose-600 mb-4"></i>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Age Verification Required</h2>
                <p class="text-gray-600">This content is designed for adults in committed relationships.</p>
            </div>
            <div class="space-y-4">
                <button id="confirmAge" class="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors">
                    I am 18+ and in a committed relationship
                </button>
                <button id="exitPage" class="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                    Take me back to main page
                </button>
            </div>
            <p class="text-xs text-gray-500 mt-4">
                Content is educational and relationship-focused. Privacy and discretion guaranteed.
            </p>
        </div>
    </div>

    <!-- Main Content (Hidden until age verified) -->
    <div id="mainContent" class="hidden">
        ${H}

        <!-- Hero Section -->
        <section class="gradient-bg py-16 sm:py-20 relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-20 left-10 w-32 h-32 bg-rose-300 rounded-full animate-float"></div>
                <div class="absolute bottom-20 right-10 w-24 h-24 bg-purple-300 rounded-full animate-float" style="animation-delay: -2s;"></div>
            </div>
            
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div class="text-center">
                    <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-600 to-purple-600 text-white rounded-full text-sm font-semibold mb-8 shadow-lg intimacy-glow">
                        <i class="fas fa-heart mr-2 animate-pulse"></i>
                        Premium Intimacy Enhancement
                    </div>
                    
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Reignite Your
                        <span class="block text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600">
                            Passionate Connection
                        </span>
                    </h1>
                    
                    <p class="text-xl sm:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                        Expert-designed intimacy challenges that safely guide couples out of their comfort zone to rediscover passion, build deeper trust, and create unforgettable moments together.
                    </p>
                    
                    <!-- Trust & Privacy Indicators -->
                    <div class="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
                        <div class="bg-white bg-opacity-80 rounded-xl p-6 shadow-lg backdrop-blur-sm">
                            <i class="fas fa-lock text-3xl text-rose-600 mb-2"></i>
                            <div class="font-semibold text-gray-900">100% Private</div>
                            <div class="text-sm text-gray-600">End-to-end encryption</div>
                        </div>
                        <div class="bg-white bg-opacity-80 rounded-xl p-6 shadow-lg backdrop-blur-sm">
                            <i class="fas fa-user-md text-3xl text-purple-600 mb-2"></i>
                            <div class="font-semibold text-gray-900">Expert Designed</div>
                            <div class="text-sm text-gray-600">Licensed therapists</div>
                        </div>
                        <div class="bg-white bg-opacity-80 rounded-xl p-6 shadow-lg backdrop-blur-sm">
                            <i class="fas fa-chart-line text-3xl text-blue-600 mb-2"></i>
                            <div class="font-semibold text-gray-900">Progressive</div>
                            <div class="text-sm text-gray-600">Safe boundary expansion</div>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button class="w-full sm:w-auto bg-gradient-to-r from-rose-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-rose-700 hover:to-purple-700 transform hover:scale-105 shadow-lg transition-all duration-300">
                            <i class="fas fa-fire mr-2"></i>
                            Start Intimacy Journey
                        </button>
                        <button class="w-full sm:w-auto bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-colors shadow-lg">
                            <i class="fas fa-play mr-2"></i>
                            See How It Works
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Challenge Categories -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Progressive Challenge Categories</h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">Carefully designed progression system that respects boundaries while encouraging growth</p>
                </div>

                <div class="grid md:grid-cols-3 gap-8 mb-16">
                    <!-- Emotional Intimacy -->
                    <div class="challenge-card rounded-2xl p-8 relative">
                        <div class="privacy-lock">
                            <i class="fas fa-lock"></i>
                        </div>
                        <div class="mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-heart text-white text-2xl"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-2">Emotional Intimacy</h3>
                            <p class="text-gray-600 mb-4">Deep emotional connection and vulnerability exercises</p>
                        </div>
                        
                        <div class="mb-6">
                            <div class="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Comfort Zone</span>
                                <span>Growth Zone</span>
                            </div>
                            <div class="comfort-zone-indicator">
                                <div class="comfort-zone-marker" style="left: 25%;"></div>
                            </div>
                        </div>

                        <div class="space-y-3 mb-6">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-700">• Soul-baring conversations</span>
                                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">SAFE</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-700">• Fear & dream sharing</span>
                                <span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">GROWTH</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-700">• Past relationship healing</span>
                                <span class="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">STRETCH</span>
                            </div>
                        </div>

                        <div class="mb-4">
                            <div class="text-2xl font-bold text-gray-900 mb-1">$14.99<span class="text-lg font-normal text-gray-600">/month</span></div>
                            <div class="text-sm text-gray-600">7-day free trial</div>
                        </div>

                        <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Start Emotional Journey
                        </button>
                    </div>

                    <!-- Physical Connection -->
                    <div class="challenge-card rounded-2xl p-8 relative">
                        <div class="premium-badge">Most Popular</div>
                        <div class="privacy-lock">
                            <i class="fas fa-lock"></i>
                        </div>
                        <div class="mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-fire text-white text-2xl"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-2">Physical Connection</h3>
                            <p class="text-gray-600 mb-4">Sensual exploration and physical intimacy enhancement</p>
                        </div>
                        
                        <div class="mb-6">
                            <div class="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Comfort Zone</span>
                                <span>Adventure Zone</span>
                            </div>
                            <div class="comfort-zone-indicator">
                                <div class="comfort-zone-marker" style="left: 60%;"></div>
                            </div>
                        </div>

                        <div class="space-y-3 mb-6">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-700">• Sensual massage techniques</span>
                                <span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">GROWTH</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-700">• Role-playing scenarios</span>
                                <span class="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">STRETCH</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-700">• Adventure locations</span>
                                <span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">BOLD</span>
                            </div>
                        </div>

                        <div class="mb-4">
                            <div class="text-2xl font-bold text-gray-900 mb-1">$29.99<span class="text-lg font-normal text-gray-600">/month</span></div>
                            <div class="text-sm text-gray-600">Includes expert video guides</div>
                        </div>

                        <button class="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors">
                            Ignite Passion
                        </button>
                    </div>

                    <!-- Adventure & Fantasy -->
                    <div class="challenge-card rounded-2xl p-8 relative">
                        <div class="privacy-lock">
                            <i class="fas fa-lock"></i>
                        </div>
                        <div class="mb-6">
                            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-mask text-white text-2xl"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-2">Adventure & Fantasy</h3>
                            <p class="text-gray-600 mb-4">Creative scenarios and boundary-pushing experiences</p>
                        </div>
                        
                        <div class="mb-6">
                            <div class="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Safe Exploration</span>
                                <span>Wild Adventures</span>
                            </div>
                            <div class="comfort-zone-indicator">
                                <div class="comfort-zone-marker" style="left: 80%;"></div>
                            </div>
                        </div>

                        <div class="space-y-3 mb-6">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-700">• Fantasy exploration games</span>
                                <span class="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">STRETCH</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-700">• Public adventure dares</span>
                                <span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">BOLD</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-700">• Ultimate boundaries</span>
                                <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">EXTREME</span>
                            </div>
                        </div>

                        <div class="mb-4">
                            <div class="text-2xl font-bold text-gray-900 mb-1">$49.99<span class="text-lg font-normal text-gray-600">/month</span></div>
                            <div class="text-sm text-gray-600">VIP expert consultations</div>
                        </div>

                        <button class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                            Explore Fantasies
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Progressive Challenge System -->
        <section class="py-16 bg-gradient-to-br from-rose-50 to-purple-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Progressive Challenges Work</h2>
                    <p class="text-xl text-gray-600">Safe, consensual, and expertly guided boundary expansion</p>
                </div>

                <div class="grid md:grid-cols-4 gap-8 mb-16">
                    <div class="text-center">
                        <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <span class="text-white text-2xl font-bold">1</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-4 text-gray-900">Comfort Assessment</h3>
                        <p class="text-gray-600">
                            Take our comprehensive intimacy assessment to establish your current comfort levels and boundaries.
                        </p>
                    </div>
                    
                    <div class="text-center">
                        <div class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <span class="text-white text-2xl font-bold">2</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-4 text-gray-900">Personalized Path</h3>
                        <p class="text-gray-600">
                            AI creates a custom progression plan that respects boundaries while encouraging growth at your pace.
                        </p>
                    </div>
                    
                    <div class="text-center">
                        <div class="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <span class="text-white text-2xl font-bold">3</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-4 text-gray-900">Guided Challenges</h3>
                        <p class="text-gray-600">
                            Complete expertly designed challenges with built-in safety measures and communication prompts.
                        </p>
                    </div>
                    
                    <div class="text-center">
                        <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <span class="text-white text-2xl font-bold">4</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-4 text-gray-900">Growth & Reflection</h3>
                        <p class="text-gray-600">
                            Reflect on experiences together and unlock new levels of intimacy and connection.
                        </p>
                    </div>
                </div>

                <!-- Expert Testimonials -->
                <div class="bg-white rounded-2xl p-8 shadow-lg backdrop-blur-sm">
                    <div class="text-center mb-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Expert-Designed Content</h3>
                        <p class="text-gray-600">Created by licensed sex therapists and relationship experts</p>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-user-md text-white text-xl"></i>
                            </div>
                            <h4 class="font-semibold text-gray-900 mb-2">Dr. Sarah Martinez</h4>
                            <p class="text-sm text-gray-600">Licensed Sex Therapist, 15+ years</p>
                            <p class="text-xs text-gray-500 mt-2 italic">"Safe exploration is key to lasting intimacy"</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-heart text-white text-xl"></i>
                            </div>
                            <h4 class="font-semibold text-gray-900 mb-2">Dr. Michael Chen</h4>
                            <p class="text-sm text-gray-600">Relationship Coach, Author</p>
                            <p class="text-xs text-gray-500 mt-2 italic">"Boundaries create freedom for growth"</p>
                        </div>
                        <div class="text-center">
                            <div class="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-graduation-cap text-white text-xl"></i>
                            </div>
                            <h4 class="font-semibold text-gray-900 mb-2">Prof. Lisa Thompson</h4>
                            <p class="text-sm text-gray-600">Human Sexuality PhD</p>
                            <p class="text-xs text-gray-500 mt-2 italic">"Research-backed progressive methods"</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Premium Features & Pricing -->
        <section class="py-16 bg-gray-900 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">Premium Intimacy Features</h2>
                    <p class="text-xl text-gray-300">Advanced tools for couples ready to deepen their connection</p>
                </div>

                <div class="grid md:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h3 class="text-2xl font-bold mb-6">Exclusive Premium Content</h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between py-3 border-b border-gray-700">
                                <div class="flex items-center">
                                    <i class="fas fa-video text-rose-500 mr-3"></i>
                                    <span>Expert Video Tutorials</span>
                                </div>
                                <span class="text-gray-400">$19.99/month</span>
                            </div>
                            <div class="flex items-center justify-between py-3 border-b border-gray-700">
                                <div class="flex items-center">
                                    <i class="fas fa-comments text-purple-500 mr-3"></i>
                                    <span>Private Couple Coaching</span>
                                </div>
                                <span class="text-gray-400">$149.99/session</span>
                            </div>
                            <div class="flex items-center justify-between py-3 border-b border-gray-700">
                                <div class="flex items-center">
                                    <i class="fas fa-book text-blue-500 mr-3"></i>
                                    <span>Intimacy Masterclass</span>
                                </div>
                                <span class="text-gray-400">$99.99 one-time</span>
                            </div>
                            <div class="flex items-center justify-between py-3 border-b border-gray-700">
                                <div class="flex items-center">
                                    <i class="fas fa-users text-green-500 mr-3"></i>
                                    <span>Private Couples Community</span>
                                </div>
                                <span class="text-gray-400">$29.99/month</span>
                            </div>
                            <div class="flex items-center justify-between py-3">
                                <div class="flex items-center">
                                    <i class="fas fa-box-heart text-pink-500 mr-3"></i>
                                    <span>Intimacy Challenge Box</span>
                                </div>
                                <span class="text-gray-400">$89.99/month</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8">
                        <h3 class="text-2xl font-bold mb-6 text-center">VIP Intimacy Package</h3>
                        <div class="text-center mb-6">
                            <div class="text-5xl font-bold mb-2">$199<span class="text-2xl font-normal text-gray-400">/month</span></div>
                            <p class="text-gray-300">Complete intimacy transformation program</p>
                        </div>
                        
                        <ul class="space-y-4 mb-8">
                            <li class="flex items-center"><i class="fas fa-check text-green-400 mr-3"></i><span>All challenge categories included</span></li>
                            <li class="flex items-center"><i class="fas fa-check text-green-400 mr-3"></i><span>Weekly expert consultations</span></li>
                            <li class="flex items-center"><i class="fas fa-check text-green-400 mr-3"></i><span>Custom challenge creation</span></li>
                            <li class="flex items-center"><i class="fas fa-check text-green-400 mr-3"></i><span>Priority support & guidance</span></li>
                            <li class="flex items-center"><i class="fas fa-check text-green-400 mr-3"></i><span>Monthly intimacy box delivery</span></li>
                            <li class="flex items-center"><i class="fas fa-check text-green-400 mr-3"></i><span>Couples retreat discounts</span></li>
                        </ul>

                        <button class="w-full bg-gradient-to-r from-rose-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-rose-700 hover:to-purple-700 transition-all transform hover:scale-105">
                            Start VIP Program
                        </button>
                        
                        <div class="text-center mt-4">
                            <span class="text-sm text-gray-400">30-day money back guarantee</span>
                        </div>
                    </div>
                </div>

                <!-- Revenue Breakdown -->
                <div class="grid md:grid-cols-4 gap-8 text-center">
                    <div class="bg-gray-800 rounded-xl p-6">
                        <div class="text-3xl font-bold text-rose-400 mb-2">$89</div>
                        <div class="text-gray-300">Avg Monthly ARPU</div>
                        <div class="text-sm text-gray-400">Per premium user</div>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-6">
                        <div class="text-3xl font-bold text-purple-400 mb-2">78%</div>
                        <div class="text-gray-300">Profit Margin</div>
                        <div class="text-sm text-gray-400">Digital content</div>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-6">
                        <div class="text-3xl font-bold text-blue-400 mb-2">94%</div>
                        <div class="text-gray-300">Retention Rate</div>
                        <div class="text-sm text-gray-400">Premium subscribers</div>
                    </div>
                    <div class="bg-gray-800 rounded-xl p-6">
                        <div class="text-3xl font-bold text-green-400 mb-2">$1,068</div>
                        <div class="text-gray-300">Annual LTV</div>
                        <div class="text-sm text-gray-400">Per couple</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Privacy & Safety -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Privacy & Safety First</h2>
                    <p class="text-xl text-gray-600">Built with the highest standards of security and discretion</p>
                </div>

                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">Advanced Security Features</h3>
                        <div class="space-y-6">
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-shield-alt text-white"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-2">End-to-End Encryption</h4>
                                    <p class="text-gray-600">All content and communications are encrypted with military-grade security.</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-eye-slash text-white"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-2">Anonymous Usage</h4>
                                    <p class="text-gray-600">No personal data shared with third parties. Complete privacy protection.</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-trash text-white"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-2">Self-Destructing Content</h4>
                                    <p class="text-gray-600">Sensitive content automatically expires for added security.</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="flex-shrink-0 w-12 h-12 bg-rose-500 rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-hand-paper text-white"></i>
                                </div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-2">Consent Protocols</h4>
                                    <p class="text-gray-600">Built-in consent verification and boundary respect mechanisms.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl p-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Safety Guidelines</h3>
                        <div class="space-y-4">
                            <div class="bg-white rounded-lg p-4 shadow-sm">
                                <div class="flex items-center mb-2">
                                    <i class="fas fa-heart text-rose-500 mr-2"></i>
                                    <span class="font-semibold text-gray-900">Mutual Consent</span>
                                </div>
                                <p class="text-sm text-gray-600">Both partners must agree to participate in all challenges.</p>
                            </div>
                            <div class="bg-white rounded-lg p-4 shadow-sm">
                                <div class="flex items-center mb-2">
                                    <i class="fas fa-comments text-blue-500 mr-2"></i>
                                    <span class="font-semibold text-gray-900">Open Communication</span>
                                </div>
                                <p class="text-sm text-gray-600">Regular check-ins and safe word protocols included.</p>
                            </div>
                            <div class="bg-white rounded-lg p-4 shadow-sm">
                                <div class="flex items-center mb-2">
                                    <i class="fas fa-pause text-purple-500 mr-2"></i>
                                    <span class="font-semibold text-gray-900">Stop Anytime</span>
                                </div>
                                <p class="text-sm text-gray-600">Immediate pause options for any discomfort or hesitation.</p>
                            </div>
                            <div class="bg-white rounded-lg p-4 shadow-sm">
                                <div class="flex items-center mb-2">
                                    <i class="fas fa-user-md text-green-500 mr-2"></i>
                                    <span class="font-semibold text-gray-900">Expert Support</span>
                                </div>
                                <p class="text-sm text-gray-600">24/7 access to certified relationship counselors.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-gradient-to-r from-rose-600 to-purple-600 text-white">
            <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Reignite Your Passion?</h2>
                <p class="text-xl mb-8 opacity-90">Join thousands of couples who've transformed their intimate connection</p>
                
                <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                    <button class="w-full sm:w-auto bg-white text-rose-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                        <i class="fas fa-fire mr-2"></i>
                        Start Your Journey
                    </button>
                    <button class="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-rose-600 transition-colors">
                        <i class="fas fa-lock mr-2"></i>
                        Privacy Guaranteed
                    </button>
                </div>

                <div class="text-rose-100">
                    <p class="text-sm">
                        <i class="fas fa-shield-alt mr-2"></i>
                        100% private • Expert designed • 30-day guarantee • Cancel anytime
                    </p>
                </div>
            </div>
        </section>
    </div>

    <!-- JavaScript -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Age verification
            const ageVerification = document.getElementById('ageVerification');
            const mainContent = document.getElementById('mainContent');
            const confirmAge = document.getElementById('confirmAge');
            const exitPage = document.getElementById('exitPage');

            confirmAge.addEventListener('click', function() {
                ageVerification.classList.add('hidden');
                mainContent.classList.remove('hidden');
                // Set verification in localStorage (expires in 24 hours)
                localStorage.setItem('intimacyVerified', Date.now() + (24 * 60 * 60 * 1000));
            });

            exitPage.addEventListener('click', function() {
                window.location.href = '/';
            });

            // Check if already verified today
            const verified = localStorage.getItem('intimacyVerified');
            if (verified && Date.now() < parseInt(verified)) {
                ageVerification.classList.add('hidden');
                mainContent.classList.remove('hidden');
            }

            // Comfort zone sliders
            const comfortSliders = document.querySelectorAll('.comfort-zone-marker');
            comfortSliders.forEach(slider => {
                slider.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Add interactive comfort level adjustment
                    console.log('Comfort level adjustment clicked');
                });
            });

            // Challenge card interactions
            const challengeCards = document.querySelectorAll('.challenge-card');
            challengeCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-12px) scale(1.02)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Premium purchase buttons
            const purchaseButtons = document.querySelectorAll('button[class*="bg-"]');
            purchaseButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Add purchase animation
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 100);
                    
                    // Log purchase intent
                    console.log('Intimacy challenge purchase:', this.textContent.trim());
                    
                    // Here you would integrate with payment system
                    // Example: initiateIntimacyPurchase(getPriceFromButton(this));
                });
            });

            // Privacy and safety emphasis
            const privacyElements = document.querySelectorAll('[class*="privacy"], [class*="lock"]');
            privacyElements.forEach(element => {
                element.addEventListener('mouseenter', function() {
                    this.style.color = '#10b981';
                    this.style.transform = 'scale(1.1)';
                });
                element.addEventListener('mouseleave', function() {
                    this.style.color = '';
                    this.style.transform = 'scale(1)';
                });
            });
        });
    <\/script>
</body>
</html>`,ir=Object.freeze(Object.defineProperty({__proto__:null,intimacyChallengesHtml:ar},Symbol.toStringTag,{value:"Module"})),rr=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Better Together Premium - Transform Your Relationship | Better Together</title>
    <meta name="description" content="Join thousands of couples building deeper connections. Premium relationship coaching, smart planning, and exclusive experiences. Gift to your partner or grow together.">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        pink: { 50: '#fdf2f8', 100: '#fce7f3', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d' },
                        purple: { 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6' },
                        emerald: { 500: '#10b981', 600: '#059669', 700: '#047857' }
                    },
                    fontFamily: { 'inter': ['Inter', 'sans-serif'] },
                    animation: {
                        'pulse-glow': 'pulseGlow 3s ease-in-out infinite alternate',
                        'savings-flash': 'savingsFlash 2s ease-in-out infinite'
                    },
                    keyframes: {
                        pulseGlow: {
                            '0%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' },
                            '100%': { boxShadow: '0 0 40px rgba(16, 185, 129, 0.6)' }
                        },
                        savingsFlash: {
                            '0%, 100%': { backgroundColor: '#fef3c7' },
                            '50%': { backgroundColor: '#fde68a' }
                        }
                    }
                }
            }
        }
    <\/script>
    <style>
        .gradient-bg { background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 50%, #fce7f3 100%); }
        .annual-badge { 
            background: linear-gradient(45deg, #10b981, #059669); 
            color: white; 
            padding: 8px 20px; 
            border-radius: 9999px; 
            font-size: 0.875rem; 
            font-weight: 700;
            position: absolute;
            top: -15px;
            right: 30px;
            animation: pulse-glow 3s ease-in-out infinite alternate;
        }
        .savings-highlight {
            animation: savings-flash 2s ease-in-out infinite;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 700;
        }
        .pricing-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 2px solid rgba(16, 185, 129, 0.1);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .pricing-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 25px 50px rgba(16, 185, 129, 0.25);
            border-color: rgba(16, 185, 129, 0.4);
        }
        .partner-selector {
            background: linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%);
            border: 2px solid #e879f9;
            border-radius: 16px;
            padding: 24px;
        }
        .feature-locked {
            opacity: 0.6;
            position: relative;
        }
        .feature-locked::after {
            content: '🔒';
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
    </style>
</head>
<body class="bg-gray-50 font-inter">
    ${H}

    <!-- Hero Section -->
    <section class="gradient-bg py-16 sm:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <div class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-sm font-semibold mb-8 shadow-lg">
                    <i class="fas fa-heart mr-2"></i>
                    Join 50,000+ Couples Building Stronger Bonds
                </div>
                
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Unlock Your Relationship's
                    <span class="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                        Full Potential
                    </span>
                </h1>
                
                <p class="text-xl sm:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                    Transform how you connect, communicate, and create memories together. Get personalized AI coaching, smart date planning, intimate challenges, and tools that help you thrive as a couple.
                </p>
                
                <!-- Relationship Value Showcase -->
                <div class="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto mb-10">
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">What Matters Most to Your Relationship</h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="text-center">
                            <div class="text-pink-600 mb-2 font-semibold">Quality Time Together</div>
                            <div class="text-3xl font-bold text-pink-600 mb-2">3.2x<span class="text-lg"> More</span></div>
                            <div class="text-sm text-gray-500">From 2.3 to 7.4 hours per week</div>
                        </div>
                        <div class="text-center">
                            <div class="text-purple-600 mb-2 font-semibold">Relationship Satisfaction</div>
                            <div class="text-3xl font-bold text-purple-600 mb-2">94%<span class="text-lg"> Better</span></div>
                            <div class="text-sm text-gray-500">Couples report stronger bond</div>
                        </div>
                    </div>
                    <div class="savings-highlight text-center mt-6">
                        <span class="text-2xl font-bold text-pink-800">Your relationship deserves this investment</span>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button class="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 shadow-lg transition-all duration-300">
                        <i class="fas fa-heart mr-2"></i>
                        Start Your Journey Together
                    </button>
                    <button class="w-full sm:w-auto bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-colors shadow-lg">
                        <i class="fas fa-gift mr-2"></i>
                        Gift to Your Partner
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Premium Pricing Plans -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose How You Want to Grow</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">Every couple is unique. Pick the plan that fits your relationship journey and commitment level.</p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 mb-16">
                <!-- Better Together Plan (Most Popular) -->
                <div class="pricing-card rounded-2xl p-8 relative">
                    <div class="annual-badge">MOST POPULAR</div>
                    <div class="text-center mb-8">
                        <div class="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-heart text-white text-2xl"></i>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-900 mb-2">Better Together Plan</h3>
                        <div class="text-5xl font-bold text-pink-600 mb-2">
                            $240<span class="text-2xl font-normal text-gray-600">/year</span>
                        </div>
                        <div class="text-lg text-gray-600 mb-4">
                            Just $20/month per person
                        </div>
                        <div class="savings-highlight text-center">
                            <span class="text-pink-800">Complete relationship transformation</span>
                        </div>
                    </div>

                    <div class="mb-8">
                        <h4 class="font-bold text-gray-900 mb-4 text-center">💕 EVERYTHING YOU NEED TO THRIVE 💕</h4>
                        <ul class="space-y-3">
                            <li class="flex items-center"><i class="fas fa-robot text-blue-500 mr-3"></i><span class="font-semibold">Personal AI Relationship Coach</span> - Your 24/7 relationship guide</li>
                            <li class="flex items-center"><i class="fas fa-heart text-rose-500 mr-3"></i><span class="font-semibold">Intimacy & Connection Challenges</span> - Deepen your bond safely</li>
                            <li class="flex items-center"><i class="fas fa-calendar-heart text-purple-500 mr-3"></i><span class="font-semibold">Smart Date Planning</span> - Never run out of romantic ideas</li>
                            <li class="flex items-center"><i class="fas fa-gamepad text-indigo-500 mr-3"></i><span class="font-semibold">Relationship Games & Activities</span> - Fun ways to connect</li>
                            <li class="flex items-center"><i class="fas fa-headset text-emerald-500 mr-3"></i><span class="font-semibold">Priority Expert Support</span> - Real relationship counselors</li>
                            <li class="flex items-center"><i class="fas fa-gift text-pink-500 mr-3"></i><span class="font-semibold">Surprise Your Partner Credits</span> - $50 for special moments</li>
                            <li class="flex items-center"><i class="fas fa-users text-amber-500 mr-3"></i><span class="font-semibold">Private Couples Community</span> - Connect with thriving couples</li>
                            <li class="flex items-center"><i class="fas fa-star text-purple-500 mr-3"></i><span class="font-semibold">First Access to New Features</span> - Always stay ahead</li>
                        </ul>
                    </div>

                    <button class="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg text-lg">
                        <i class="fas fa-heart mr-2"></i>
                        Transform Our Relationship
                    </button>
                    
                    <div class="text-center mt-4">
                        <span class="text-sm text-gray-600">30-day money back guarantee</span>
                    </div>
                </div>

                <!-- Try It Out Plan -->
                <div class="pricing-card rounded-2xl p-8 relative border-gray-200">
                    <div class="text-center mb-8">
                        <div class="w-20 h-20 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-clock text-white text-2xl"></i>
                        </div>
                        <h3 class="text-3xl font-bold text-gray-900 mb-2">Try It Out Plan</h3>
                        <div class="text-5xl font-bold text-gray-900 mb-2">
                            $30<span class="text-2xl font-normal text-gray-600">/month</span>
                        </div>
                        <div class="text-lg text-gray-600 mb-4">
                            Per person • No commitment
                        </div>
                        <div class="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm">
                            Perfect for exploring our platform
                        </div>
                    </div>

                    <div class="mb-8">
                        <h4 class="font-bold text-gray-900 mb-4 text-center">CORE RELATIONSHIP TOOLS</h4>
                        <ul class="space-y-3">
                            <li class="flex items-center"><i class="fas fa-check text-gray-600 mr-3"></i><span>Essential AI Coach Access</span></li>
                            <li class="flex items-center"><i class="fas fa-check text-gray-600 mr-3"></i><span>Basic Connection Challenges</span></li>
                            <li class="flex items-center"><i class="fas fa-check text-gray-600 mr-3"></i><span>Simple Date Planning Tools</span></li>
                            <li class="flex items-center"><i class="fas fa-check text-gray-600 mr-3"></i><span>Starter Relationship Games</span></li>
                            <li class="flex items-center"><i class="fas fa-check text-gray-600 mr-3"></i><span>Email Support</span></li>
                            <li class="flex items-center text-gray-400"><i class="fas fa-minus text-gray-400 mr-3"></i><span>Limited to basic features</span></li>
                            <li class="flex items-center text-gray-400"><i class="fas fa-minus text-gray-400 mr-3"></i><span>No priority support</span></li>
                            <li class="flex items-center text-gray-400"><i class="fas fa-minus text-gray-400 mr-3"></i><span>No community access</span></li>
                        </ul>
                    </div>

                    <button class="w-full bg-gray-600 text-white py-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors shadow-lg text-lg">
                        <i class="fas fa-clock mr-2"></i>
                        Try It Out First
                    </button>
                    
                    <div class="text-center mt-4">
                        <span class="text-sm text-gray-600">No commitment required</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Premium Add-Ons -->
    <section class="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Make Your Experience Even More Special</h2>
                <p class="text-xl text-gray-600">Optional add-ons to enhance your relationship journey</p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                <!-- Monthly Surprise Box -->
                <div class="bg-white rounded-2xl p-8 shadow-lg border-2 border-emerald-200">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-box-heart text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Monthly Surprise Box</h3>
                        <p class="text-gray-600 mb-4">Curated relationship items, games, and treats delivered to your door</p>
                        <div class="text-4xl font-bold text-emerald-600 mb-2">$49<span class="text-lg font-normal text-gray-600">/month</span></div>
                        <div class="text-sm text-gray-500">Includes shipping • Skip or cancel anytime</div>
                    </div>
                    
                    <ul class="space-y-3 mb-6">
                        <li class="flex items-center"><i class="fas fa-heart text-pink-500 mr-3"></i><span>Romantic date night supplies</span></li>
                        <li class="flex items-center"><i class="fas fa-gamepad text-purple-500 mr-3"></i><span>Fun couple games & activities</span></li>
                        <li class="flex items-center"><i class="fas fa-spa text-blue-500 mr-3"></i><span>Wellness & self-care items</span></li>
                        <li class="flex items-center"><i class="fas fa-gift text-emerald-500 mr-3"></i><span>Surprise treats & keepsakes</span></li>
                    </ul>
                    
                    <button class="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                        Add Surprise Box
                    </button>
                </div>

                <!-- Personal Coaching -->
                <div class="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-user-tie text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Personal Relationship Coach</h3>
                        <p class="text-gray-600 mb-4">One-on-one sessions with certified relationship experts</p>
                        <div class="space-y-2">
                            <div><span class="text-2xl font-bold text-purple-600">$89</span><span class="text-gray-600">/virtual session</span></div>
                            <div><span class="text-2xl font-bold text-purple-600">$149</span><span class="text-gray-600">/in-person session</span></div>
                        </div>
                    </div>
                    
                    <ul class="space-y-3 mb-6">
                        <li class="flex items-center"><i class="fas fa-video text-blue-500 mr-3"></i><span>Video or in-person sessions</span></li>
                        <li class="flex items-center"><i class="fas fa-certificate text-emerald-500 mr-3"></i><span>Licensed relationship therapists</span></li>
                        <li class="flex items-center"><i class="fas fa-calendar text-purple-500 mr-3"></i><span>Flexible scheduling</span></li>
                        <li class="flex items-center"><i class="fas fa-clipboard-list text-pink-500 mr-3"></i><span>Personalized action plans</span></li>
                    </ul>
                    
                    <button class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                        Book a Session
                    </button>
                </div>
            </div>

            <!-- Premium Plus Tier -->
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white max-w-3xl mx-auto">
                <div class="text-center mb-6">
                    <h3 class="text-2xl font-bold mb-2">💎 Better Together Premium Plus</h3>
                    <p class="text-purple-100 mb-4">Get everything plus monthly surprise boxes</p>
                    <div class="text-4xl font-bold mb-2">$289<span class="text-xl font-normal">/year</span></div>
                    <div class="text-purple-100">or $49/month with surprise box included</div>
                </div>
                
                <div class="flex flex-wrap justify-center gap-4 mb-6">
                    <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">All Premium Features</span>
                    <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Monthly Surprise Box</span>
                    <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Save $49/year</span>
                </div>
                
                <button class="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                    <i class="fas fa-crown mr-2"></i>
                    Upgrade to Premium Plus
                </button>
            </div>
        </div>
    </section>

    <!-- Partner Gifting System -->
    <section class="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Surprise Your Partner with Love</h2>
                <p class="text-xl text-gray-600">Give the gift of a stronger relationship. Perfect for anniversaries, birthdays, or "just because" moments.</p>
            </div>

            <div class="partner-selector max-w-4xl mx-auto mb-12">
                <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Ways to Show You Care</h3>
                
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="bg-white rounded-xl p-6 shadow-lg">
                        <div class="text-center mb-6">
                            <i class="fas fa-user-heart text-4xl text-pink-600 mb-4"></i>
                            <h4 class="text-xl font-bold text-gray-900">Gift for Your Partner</h4>
                            <p class="text-gray-600">Show them how much they mean to you</p>
                        </div>
                        
                        <div class="space-y-4 mb-6">
                            <div class="flex justify-between items-center">
                                <span>Better Together Plan:</span>
                                <span class="font-bold text-pink-600">$240/year</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span>Try It Out Plan:</span>
                                <span class="font-bold text-gray-600">$30/month</span>
                            </div>
                            <div class="bg-pink-50 p-3 rounded-lg">
                                <span class="text-pink-800 font-semibold">💝 Includes personal gift message & surprise delivery</span>
                            </div>
                        </div>
                        
                        <button class="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                            Send This Gift
                        </button>
                    </div>

                    <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-300">
                        <div class="text-center mb-6">
                            <i class="fas fa-users-heart text-4xl text-purple-600 mb-4"></i>
                            <h4 class="text-xl font-bold text-gray-900">Couples Journey</h4>
                            <p class="text-gray-600">Start your transformation together</p>
                        </div>
                        
                        <div class="space-y-4 mb-6">
                            <div class="flex justify-between items-center">
                                <span>Better Together for Two:</span>
                                <div>
                                    <span class="line-through text-gray-400">$480</span>
                                    <span class="font-bold text-purple-600 ml-2">$420/year</span>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <span>Try It Out for Two:</span>
                                <span class="font-bold text-gray-600">$55/month</span>
                            </div>
                            <div class="bg-purple-50 p-3 rounded-lg">
                                <span class="text-purple-800 font-semibold">💑 Save $60 when you grow together!</span>
                            </div>
                        </div>
                        
                        <button class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                            Start Our Journey Together
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Premium Features Behind Paywall -->
    <section class="py-16 bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">All Premium Features Included</h2>
                <p class="text-xl text-gray-300">Everything you need for relationship transformation</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Relationship Challenges -->
                <div class="bg-gray-800 rounded-xl p-6 text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-fire text-white text-xl"></i>
                    </div>
                    <h3 class="text-lg font-bold mb-3">Intimacy Challenges</h3>
                    <p class="text-gray-300 text-sm mb-4">Progressive system to deepen physical and emotional connection safely</p>
                    <div class="text-rose-400 font-semibold">🔒 Premium Only</div>
                </div>

                <!-- Smart Scheduling -->
                <div class="bg-gray-800 rounded-xl p-6 text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-calendar-check text-white text-xl"></i>
                    </div>
                    <h3 class="text-lg font-bold mb-3">Smart Scheduling</h3>
                    <p class="text-gray-300 text-sm mb-4">AI-powered date planning and automatic calendar coordination</p>
                    <div class="text-blue-400 font-semibold">🔒 Premium Only</div>
                </div>

                <!-- Relationship Games -->
                <div class="bg-gray-800 rounded-xl p-6 text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-gamepad text-white text-xl"></i>
                    </div>
                    <h3 class="text-lg font-bold mb-3">Relationship Games</h3>
                    <p class="text-gray-300 text-sm mb-4">Interactive games and activities to strengthen your bond</p>
                    <div class="text-purple-400 font-semibold">🔒 Premium Only</div>
                </div>

                <!-- AI Coach Advanced -->
                <div class="bg-gray-800 rounded-xl p-6 text-center">
                    <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-robot text-white text-xl"></i>
                    </div>
                    <h3 class="text-lg font-bold mb-3">Advanced AI Coach</h3>
                    <p class="text-gray-300 text-sm mb-4">Unlimited conversations and personalized relationship guidance</p>
                    <div class="text-emerald-400 font-semibold">🔒 Premium Only</div>
                </div>
            </div>

            <div class="text-center mt-12">
                <div class="bg-red-900 bg-opacity-50 rounded-2xl p-8 max-w-2xl mx-auto">
                    <h3 class="text-2xl font-bold text-red-200 mb-4">⚠️ No Free Tier Available</h3>
                    <p class="text-red-100 mb-6">
                        All relationship transformation features require premium access. We believe in providing complete value rather than limited free experiences.
                    </p>
                    <button class="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105">
                        Start Your Premium Journey
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Annual Benefits Showcase -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Makes Better Together Special</h2>
                <p class="text-xl text-gray-600">The exclusive benefits that come with your commitment to growth</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6">
                    <div class="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-robot text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Personal AI Coach</h3>
                    <p class="text-gray-600 mb-4">24/7 relationship guidance that learns your unique dynamic</p>
                    <div class="text-pink-600 font-semibold">Your relationship bestie</div>
                </div>

                <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6">
                    <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-users text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Private Community</h3>
                    <p class="text-gray-600 mb-4">Exclusive couples forum with expert moderation</p>
                    <div class="text-purple-600 font-semibold">$29/month value</div>
                </div>

                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                    <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-headset text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Priority Expert Support</h3>
                    <p class="text-gray-600 mb-4">Direct access to certified relationship counselors</p>
                    <div class="text-blue-600 font-semibold">Real human experts</div>
                </div>

                <div class="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6">
                    <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-users text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Private Community</h3>
                    <p class="text-gray-600 mb-4">Connect with other thriving couples in our exclusive forum</p>
                    <div class="text-purple-600 font-semibold">Find your tribe</div>
                </div>

                <div class="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6">
                    <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-gift text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">Surprise Credits</h3>
                    <p class="text-gray-600 mb-4">$50 annual credit for spontaneous romantic gestures</p>
                    <div class="text-yellow-600 font-semibold">Keep the spark alive</div>
                </div>

                <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                        <i class="fas fa-star text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">First Access</h3>
                    <p class="text-gray-600 mb-4">Be the first to try new features and relationship tools</p>
                    <div class="text-green-600 font-semibold">Stay ahead of the curve</div>
                </div>
            </div>

            <div class="text-center mt-12">
                <div class="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 max-w-3xl mx-auto">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">What You Get for Your Investment</h3>
                    <div class="grid md:grid-cols-2 gap-6 text-left">
                        <div>
                            <div class="space-y-2">
                                <div class="flex justify-between">
                                    <span>Personal AI Relationship Coach</span>
                                    <span class="font-semibold">$588/year</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Private Community Access</span>
                                    <span class="font-semibold">$348/year</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Priority Expert Support</span>
                                    <span class="font-semibold">$597/year</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="space-y-2">
                                <div class="flex justify-between">
                                    <span>Smart Date Planning Tools</span>
                                    <span class="font-semibold">$396/year</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Surprise Credits</span>
                                    <span class="font-semibold">$50/year</span>
                                </div>
                                <div class="flex justify-between border-t pt-2 font-bold text-lg">
                                    <span>Total Value</span>
                                    <span class="text-pink-600">$1,979</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 text-center">
                        <div class="text-3xl font-bold text-pink-600 mb-2">
                            You Pay: $240 • You Get: $1,979 Value
                        </div>
                        <div class="text-xl text-gray-700">
                            That's <span class="font-bold text-pink-600">724% ROI</span> on your relationship investment!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Build Something Beautiful Together?</h2>
            <p class="text-xl mb-8 opacity-90">Join thousands of couples who chose to invest in their love story</p>
            
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <button class="w-full sm:w-auto bg-white text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg text-lg">
                    <i class="fas fa-heart mr-2"></i>
                    Start Our Journey - Better Together Plan
                </button>
                <button class="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-pink-600 transition-colors">
                    <i class="fas fa-gift mr-2"></i>
                    Surprise My Partner
                </button>
            </div>

            <div class="text-pink-100">
                <p class="text-sm">
                    <i class="fas fa-shield-alt mr-2"></i>
                    30-day happiness guarantee • Everything included • Your relationship deserves this
                </p>
            </div>
        </div>
    </section>

    <!-- JavaScript for Interactive Pricing -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Pricing calculator interactions
            const annualButton = document.querySelector('button[class*="emerald"]');
            const monthlyButton = document.querySelector('button[class*="gray-600"]');
            
            // Savings flash animation
            const savingsElements = document.querySelectorAll('.savings-highlight');
            setInterval(() => {
                savingsElements.forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.animation = null;
                });
            }, 3000);

            // Partner gifting system
            const giftButtons = document.querySelectorAll('button[class*="pink"], button[class*="purple"]');
            giftButtons.forEach(button => {
                button.addEventListener('click', function() {
                    console.log('Partner gift purchase initiated');
                    // Here you would integrate partner gifting flow
                });
            });

            // Premium feature lock indicators
            const lockedFeatures = document.querySelectorAll('.feature-locked');
            lockedFeatures.forEach(feature => {
                feature.addEventListener('click', function() {
                    alert('This feature is available with Premium subscription only!');
                });
            });

            // Annual vs Monthly toggle
            let isAnnual = true;
            const togglePricing = () => {
                const priceElements = document.querySelectorAll('[data-price]');
                priceElements.forEach(el => {
                    const monthlyPrice = el.dataset.monthly;
                    const annualPrice = el.dataset.annual;
                    el.textContent = isAnnual ? annualPrice : monthlyPrice;
                });
                isAnnual = !isAnnual;
            };

            // Hover effects for pricing cards
            const pricingCards = document.querySelectorAll('.pricing-card');
            pricingCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-12px) scale(1.02)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        });
    <\/script>
</body>
</html>`,lr=Object.freeze(Object.defineProperty({__proto__:null,premiumPricingHtml:rr},Symbol.toStringTag,{value:"Module"}));export{ss as default};
