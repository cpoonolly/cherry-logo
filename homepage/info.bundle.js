!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=2)}([function(t,e,i){"use strict";
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const s=new WeakMap,n=t=>"function"==typeof t&&s.has(t),r=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,o=(t,e,i=null)=>{let s=e;for(;s!==i;){const e=s.nextSibling;t.removeChild(s),s=e}},a={},l={},h=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${h}--\x3e`,d=new RegExp(`${h}|${c}`),u="$lit$";class p{constructor(t,e){this.parts=[],this.element=e;let i=-1,s=0;const n=[],r=e=>{const o=e.content,a=document.createTreeWalker(o,133,null,!1);let l=0;for(;a.nextNode();){i++;const e=a.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const n=e.attributes;let r=0;for(let t=0;t<n.length;t++)n[t].value.indexOf(h)>=0&&r++;for(;r-- >0;){const n=t.strings[s],r=y.exec(n)[2],o=r.toLowerCase()+u,a=e.getAttribute(o).split(d);this.parts.push({type:"attribute",index:i,name:r,strings:a}),e.removeAttribute(o),s+=a.length-1}}"TEMPLATE"===e.tagName&&r(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(h)>=0){const r=e.parentNode,o=t.split(d),a=o.length-1;for(let t=0;t<a;t++)r.insertBefore(""===o[t]?f():document.createTextNode(o[t]),e),this.parts.push({type:"node",index:++i});""===o[a]?(r.insertBefore(f(),e),n.push(e)):e.data=o[a],s+=a}}else if(8===e.nodeType)if(e.data===h){const t=e.parentNode;null!==e.previousSibling&&i!==l||(i++,t.insertBefore(f(),e)),l=i,this.parts.push({type:"node",index:i}),null===e.nextSibling?e.data="":(n.push(e),i--),s++}else{let t=-1;for(;-1!==(t=e.data.indexOf(h,t+1));)this.parts.push({type:"node",index:-1})}}};r(e);for(const t of n)t.parentNode.removeChild(t)}}const m=t=>-1!==t.index,f=()=>document.createComment(""),y=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class g{constructor(t,e,i){this._parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this._parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=r?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let i=0,s=0;const n=t=>{const r=document.createTreeWalker(t,133,null,!1);let o=r.nextNode();for(;i<e.length&&null!==o;){const t=e[i];if(m(t))if(s===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(o.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(o,t.name,t.strings,this.options));i++}else s++,"TEMPLATE"===o.nodeName&&n(o.content),o=r.nextNode();else this._parts.push(void 0),i++}};return n(t),r&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class v{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="";for(let i=0;i<t;i++){const t=this.strings[i],s=y.exec(t);e+=s?t.substr(0,s.index)+s[1]+s[2]+u+s[3]+h:t+c}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const w=t=>null===t||!("object"==typeof t||"function"==typeof t);class b{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new x(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)i+="string"==typeof e?e:String(e);else i+="string"==typeof t?t:String(t)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class x{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===a||w(t)&&t===this.value||(this.value=t,n(t)||(this.committer.dirty=!0))}commit(){for(;n(this.value);){const t=this.value;this.value=a,t(this)}this.value!==a&&this.committer.commit()}}class _{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(f()),this.endNode=t.appendChild(f())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=f()),t._insert(this.endNode=f())}insertAfterPart(t){t._insert(this.startNode=f()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;n(this._pendingValue);){const t=this._pendingValue;this._pendingValue=a,t(this)}const t=this._pendingValue;t!==a&&(w(t)?t!==this.value&&this._commitText(t):t instanceof v?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===l?(this.value=l,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof g&&this.value.template===e)this.value.update(t.values);else{const i=new g(e,t.processor,this.options),s=i._clone();i.update(t.values),this._commitNode(s),this.value=i}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new _(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){o(this.startNode.parentNode,t.nextSibling,this.endNode)}}class S{constructor(t,e,i){if(this.value=void 0,this._pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this._pendingValue=t}commit(){for(;n(this._pendingValue);){const t=this._pendingValue;this._pendingValue=a,t(this)}if(this._pendingValue===a)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=a}}class C extends b{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new P(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class P extends x{}let E=!1;try{const t={get capture(){return E=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class M{constructor(t,e,i){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;n(this._pendingValue);){const t=this._pendingValue;this._pendingValue=a,t(this)}if(this._pendingValue===a)return;const t=this._pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),s&&(this._options=A(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=a}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const A=t=>t&&(E?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const N=new class{handleAttributeExpressions(t,e,i,s){const n=e[0];return"."===n?new C(t,e.slice(1),i).parts:"@"===n?[new M(t,e.slice(1),s.eventContext)]:"?"===n?[new S(t,e.slice(1),i)]:new b(t,e,i).parts}handleTextExpression(t){return new _(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function k(t){let e=T.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},T.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(h);return void 0===(i=e.keyString.get(s))&&(i=new p(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const T=new Map,R=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const V=(t,...e)=>new v(t,e,"html",N),z=133;function O(t,e){const{element:{content:i},parts:s}=t,n=document.createTreeWalker(i,z,null,!1);let r=q(s),o=s[r],a=-1,l=0;const h=[];let c=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===c&&(c=null),e.has(t)&&(h.push(t),null===c&&(c=t)),null!==c&&l++;void 0!==o&&o.index===a;)o.index=null!==c?-1:o.index-l,o=s[r=q(s,r)]}h.forEach(t=>t.parentNode.removeChild(t))}const $=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,z,null,!1);for(;i.nextNode();)e++;return e},q=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(m(e))return i}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const j=(t,e)=>`${t}--${e}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),U=!1);const F=t=>e=>{const i=j(e.type,t);let s=T.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},T.set(i,s));let n=s.stringsArray.get(e.strings);if(void 0!==n)return n;const r=e.strings.join(h);if(void 0===(n=s.keyString.get(r))){const i=e.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(i,t),n=new p(e,i),s.keyString.set(r,n)}return s.stringsArray.set(e.strings,n),n},B=["html","svg"],I=new Set,L=(t,e,i)=>{I.add(i);const s=t.querySelectorAll("style");if(0===s.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,i);const n=document.createElement("style");for(let t=0;t<s.length;t++){const e=s[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}if((t=>{B.forEach(e=>{const i=T.get(j(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),O(t,i)})})})(i),function(t,e,i=null){const{element:{content:s},parts:n}=t;if(null==i)return void s.appendChild(e);const r=document.createTreeWalker(s,z,null,!1);let o=q(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===i&&(a=$(e),i.parentNode.insertBefore(e,i));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=q(n,o);return}o=q(n,o)}}(e,n,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,i),window.ShadyCSS.nativeShadow){const i=e.element.content.querySelector("style");t.insertBefore(i.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(n,e.element.content.firstChild);const t=new Set;t.add(n),O(e,t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
window.JSCompiler_renameProperty=((t,e)=>t);const H={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},W=(t,e)=>e!==t&&(e==e||t==t),Y={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:W},X=Promise.resolve(!0),D=1,J=4,G=8,Z=16,K=32;class Q extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=X,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=Y){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[i]},set(e){const s=this[t];this[i]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=W){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||H,n="function"==typeof s?s:s.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||H.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|K,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=Y){const s=this.constructor,n=s._attributeNameForProperty(t,i);if(void 0!==n){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|G,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=this._updateState&~G}}_attributeToProperty(t,e){if(this._updateState&G)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i._classProperties.get(s)||Y;this._updateState=this._updateState|Z,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~Z}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,n=s._classProperties.get(t)||Y;s._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||this._updateState&Z||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|J;const i=this._updatePromise;this._updatePromise=new Promise((i,s)=>{t=i,e=s});try{await i}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&K}get _hasRequestedUpdate(){return this._updateState&J}get hasUpdated(){return this._updateState&D}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&D||(this._updateState=this._updateState|D,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~J}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}Q.finalized=!0;const tt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;Symbol();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const et=t=>t.flat?t.flat(1/0):function t(e,i=[]){for(let s=0,n=e.length;s<n;s++){const n=e[s];Array.isArray(n)?t(n,i):i.push(n)}return i}(t);class it extends Q{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){et(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?tt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof v&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}it.finalized=!0,it.render=((t,e,i)=>{const s=i.scopeName,n=R.has(e),r=e instanceof ShadowRoot&&U&&t instanceof v,a=r&&!I.has(s),l=a?document.createDocumentFragment():e;if(((t,e,i)=>{let s=R.get(e);void 0===s&&(o(e,e.firstChild),R.set(e,s=new _(Object.assign({templateFactory:k},i))),s.appendInto(e)),s.setValue(t),s.commit()})(t,l,Object.assign({templateFactory:F(s)},i)),a){const t=R.get(l);R.delete(l),t.value instanceof g&&L(l,t.value.template,s),o(e,e.firstChild),e.appendChild(l),R.set(e,t)}!n&&r&&window.ShadyCSS.styleElement(e.host)});customElements.define("cherry-brackets",class extends it{static get properties(){return{currentSlot:{type:Number},color:{type:String},animationDuration:{type:Number}}}constructor(){super(),this.currentSlot=1,this.color="black",this.animationDuration=5}updated(t){t.currentSlot!==this.currentSlot&&this.animateBrackets()}firstUpdated(){let t=this.shadowRoot.getElementById("brackets-content");t.addEventListener("animationstart",()=>console.log("animation started on brackets")),t.addEventListener("animationend",()=>console.log("animation ended on brackets")),this.animateBrackets()}animateBrackets(){let t=this.shadowRoot.getElementById("brackets-content");t.classList.remove("brackets-content-animated"),t.offsetWidth,t.classList.add("brackets-content-animated")}render(){return V`
            <style>
                @keyframes brackets-animation {
                    0% { max-width: calc(100vw); visibility: hidden; }
                    30% { max-width: calc(0vw); visibility: hidden; }
                    100% { max-width: calc(100vw); visibility: visible; }
                }

                .brackets-container {
                    display: flex;
                    animation-name: cherries-rotation;
                    animation-duration: 4s;
                    align-items: center;
                    justify-content: center;
                }

                .bracket {
                    stroke: ${this.color};
                    stroke-width: 5px;
                    fill: none;
                }

                .bracket-left-container, .bracket-right-container {
                    flex-shrink: 1;
                }

                #brackets-content {
                    flex-grow: 1;
                }

                .brackets-content-animated {
                    animation-name: brackets-animation;
                    animation-duration: ${this.animationDuration}s;
                }

                /* SVGs inside webcomponents seems buggy in Firefox... */
                @-moz-document url-prefix() {
                  .bracket-left-container, .bracket-right-container {
                    max-width: 100px;
                  }
                }

            </style>
            <div class="brackets-container">
                <div class="bracket-left-container">
                    <svg width="100%" height="100%" viewbox="0 0 50 100" preserveAspectRatio="none">
                        <path id="bracket-left" class="bracket" d="M 40.00,10.00 C 0.00,10.00 50.00,50.00 10.00,50.00 50.00,50.00 0.00,90.00 40.00,90.00"></path>
                    </svg>
                </div>
                <div id="brackets-content" >
                    <slot name="slot${this.currentSlot}"></slot>
                </div>
                <div class="bracket-right-container">
                    <svg width="100%" height="100%" viewbox="0 0 50 100" preserveAspectRatio="none">
                        <path id="bracket-left" class="bracket" d="M 10.00,10.00 C 50.00,10.00 0.00,50.00 40.00,50.00 0.00,50.00 50.00,90.00 10.00,90.00"></path>
                    </svg>
                </div>
            </div>
        `}});function st(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t}customElements.define("cherry-logo",class extends it{static get properties(){return{spin:{type:Number,reflect:!0},spinCount:{type:Number}}}constructor(){super(),this.spin=!1,this.spinCount=1}onSpinAnimationEnd(){this.spin=!1}render(){return V`
      <style>
          @keyframes cherries-rotation {
              from { transform: rotateY(0deg); }
              to { transform: rotateY(360deg); }
          }
  
          #cherry-logo {
              stroke: red;
              stroke-width: 10px;
              fill: none;
          }

          #cherry-logo.spin {
              transform-origin: center;
              animation-name: cherries-rotation;
              animation-duration: 4s;
              animation-iteration-count: ${this.spinCount};
          }
      </style>
      <svg width="100%" height="100%" viewbox="0 0 256 256">
          <path id="cherry-logo" class=${this.spin?"spin":""} @animationend=${()=>this.onSpinAnimationEnd()} d="M 119.67,88.67 C 119.33,75.33 141.00,50.00 175.00,67.00 162.00,105.00 128.00,108.00 119.67,88.67 Z M 150.25,78.69 C 150.25,78.69 119.56,88.88 119.56,88.88M 113.67,154.33 C 100.00,108.33 119.69,90.33 119.69,89.00M 119.81,89.06 C 119.81,89.06 108.91,110.00 130.91,131.82M 123.12,121.12 C 134.18,111.45 150.73,118.00 154.88,129.31 157.81,143.25 147.25,156.38 135.75,153.00M 110.88,140.38 C 126.75,138.50 138.10,149.15 136.73,162.27 135.12,172.50 128.12,184.25 114.12,185.12 87.00,185.75 80.25,154.62 96.50,145.62"></path>
      </svg>
    `}});class nt{animate(t,e,i){throw new Error("this should be overridden...")}onCanvasResize(t,e,i,s){throw new Error("this should be overriden...")}}function rt(t){switch(t.name){case"orbit":return new ot(t);case"random":return new lt(t);case"freeze":return new ht(t);case"sequence":return new ut(t);case"release":return new at(t);case"custom":return new ct(t);default:return new ot(t)}}class ot extends nt{static validateParams(t,e,i,s,n){if(null==t)throw Error("invalid orbit animation - orbitX is null/undefined");if(null==e)throw Error("invalid orbit animation - orbitY is null/undefined");if(null==i)throw Error("invalid orbit animation - radius is null/undefined");if(null==s)throw Error("invalid orbit animation - xMax is null/undefined");if(null==n)throw Error("invalid orbit animation - yMax is null/undefined")}constructor({orbitX:t,orbitY:e,radius:i,xMax:s,yMax:n}){super(),ot.validateParams(t,e,i,s,n),this.orbitX=t,this.orbitY=e,this.radius=i,this.xMax=s,this.yMax=n}animate(t,e){let{orbitX:i,orbitY:s,radius:n,xMax:r,yMax:o}=this;t.particles.forEach(t=>{t.x+=e*t.dx/1e3,t.y+=e*t.dy/1e3,t.x=Math.min(Math.max(-10,t.x),r+10),t.y=Math.min(Math.max(-10,t.y),o+10);let a=i-t.x,l=s-t.y,h=Math.sqrt(a*a+l*l),c=a/h,d=l/h;t.dx+=h>n?10*c:.5*c,t.dy+=h>n?10*d:.5*d;let u=l/h,p=-1*a/h;t.dx+=u,t.dy+=p})}onCanvasResize(t,e,i,s){this.xMax=i,this.yMax=s,this.orbitX=i*(this.orbitX/t),this.orbitY=s*(this.orbitY/e)}}class at extends nt{constructor(){super()}animate(t,e){t.particles.forEach(t=>{t.x+=e*t.dx/1e3,t.y+=e*t.dy/1e3})}onCanvasResize(){}}class lt extends nt{static validateParams(t,e){if(null==t)throw Error("invalid orbit animation - xMax is null/undefined");if(null==e)throw Error("invalid orbit animation - yMax is null/undefined")}constructor({xMax:t,yMax:e}){super(),lt.validateParams(t,e),this.xMax=t,this.yMax=e}animate(t,e){let{xMax:i,yMax:s}=this;t.particles.forEach(t=>{t.x+=e*t.dx/1e3,t.y+=e*t.dy/1e3,t.x=Math.min(Math.max(-10,t.x),i+10),t.y=Math.min(Math.max(-10,t.y),s+10);let n=st(0,i)-t.x,r=st(0,s)-t.y,o=Math.sqrt(n*n+r*r),a=n/o,l=r/o;t.dx+=100*a,t.dy+=100*l})}onCanvasResize(t,e,i,s){this.xMax=i,this.yMax=s}}class ht extends nt{constructor(){super()}animate(t){t.particles.forEach(t=>{t.dx=0,t.dy=0})}onCanvasResize(){}}class ct extends nt{constructor({onAnimate:t,onCanvasResize:e}){if(super(),!t||!e)throw new Error("custom animation - missing or invalid callbacks");this.onAnimateCallback=t,this.onCanvasResizeCallback=e}animate(t){t.particles.forEach(t=>this.animateParticleCallback(t,dt,currentTime))}onCanvasResize(t,e,i,s){this.onCanvasResize(t,e,i,s)}}class ut extends nt{constructor({animationSequence:t}){if(super(),!t||t.length<=0)throw Error("sequence animation - invalid animation sequence");let e=0;this.animations=[],t.forEach(({animationProps:i,duration:s},n)=>{let r=rt(i);if(this.animations.push({animation:r,atTime:e}),n<t.length-1){if(null==s)throw new Error(`sequence animation - invalid animation #${n+1} in sequence invalid`);e+=s}}),this.timeStarted=null,this.timeElapsed=0,this.indexOfCurrentAnimation=0,this.currenAnimation=this.animations[this.indexOfCurrentAnimation].animation}updateCurrentTime(t){null===this.timeStarted&&(this.timeStarted=t),this.timeElapsed=t-this.timeStarted;for(let t=this.indexOfCurrentAnimation+1;t<this.animations.length&&!(this.timeElapsed<this.animations[t].atTime);t++)this.indexOfCurrentAnimation=t,this.currenAnimation=this.animations[this.indexOfCurrentAnimation].animation}animate(t,e,i){this.updateCurrentTime(i),this.currenAnimation.animate(t,e,i)}onCanvasResize(t,e,i,s){this.currenAnimation.onCanvasResize(t,e,i,s)}}class pt{render(t,e){throw new Error("this should be overridden...")}}class mt extends pt{constructor({color:t,size:e}){super(),this.color=t,this.size=e}render(t,e){let i=t.canvas.width*this.size/1e3;t.fillStyle=this.color,e.particles.forEach(e=>{t.fillRect(e.x,e.y,i,i)})}}class ft extends pt{constructor({colors:t,size:e}){super(),this.colors=t,this.size=e}render(t,e){let i=t.canvas.width*this.size/1e3;t.fillStyle=this.color,e.particles.forEach((e,s)=>{t.fillStyle=this.colors[s%this.colors.length],t.fillRect(e.x,e.y,i,i)})}}class yt extends pt{constructor({customRenderCallback:t}){super(),this.customRenderCallback=t}render(t,e){e.particles.forEach((e,i)=>this.customRenderCallback(t,e,i))}}function gt(t){switch(t.name){case"single-colored-rect":return new mt(t);case"multi-colored-rect":return new ft(t);case"custom":return new yt(t);default:return new mt(t)}}const vt="cherry-swarm-canvas-id";class wt{constructor(t,e){this.x=t,this.y=e,this.dx=0,this.dy=0}}class bt{constructor(t,e,i){this.particles=new Array(i);for(let s=0;s<i;s++)this.particles[s]=new wt(st(0,t),st(0,e))}}customElements.define("cherry-swarm",class extends it{static get properties(){return{particleCount:{type:Number},animationProps:{type:Object,reflect:!0},renderProps:{type:Object,reflect:!0}}}constructor(){super(),this.particleCount=1e3,this.animationProps={name:"orbit",orbitX:0,orbitY:0,radius:50,xMax:0,yMax:0},this.renderProps={name:"single-colored-rect",color:"black",size:3},this.swarm=null,this.lastAnimationFrameTime=null,this.numAnimationUpdates=0,this.animator=null,this.renderer=null,this.width=0,this.height=0,this.onResize()}onResize(){let t=this.width,e=this.height;this.width=Math.max(1,this.shadowRoot.host.clientWidth),this.height=Math.max(1,this.shadowRoot.host.clientHeight),this.animator&&this.animator.onCanvasResize(t,e,this.width,this.height);const i=this.shadowRoot.getElementById(vt);i&&(i.width=this.width,i.height=this.height)}connectedCallback(){super.connectedCallback(),this.swarm=new bt(this.width,this.height,this.particleCount),this.animationProps={name:"orbit",orbitX:Math.floor(this.width/2),orbitY:Math.floor(this.height/2),radius:50,xMax:this.width,yMax:this.height},this.animator=rt(this.animationProps),this.renderer=gt(this.renderProps),requestAnimationFrame(t=>this.updateCherry(t)),window.addEventListener("resize",()=>this.onResize())}updateCherry(t){this.lastAnimationFrameTime||(this.lastAnimationFrameTime=t);const e=this.shadowRoot.getElementById(vt);if(!e)return;const i=t-this.lastAnimationFrameTime,s=e.getContext("2d");s.fillStyle="white",s.fillRect(0,0,this.width,this.height),this.animator.animate(this.swarm,i,t),this.renderer.render(s,this.swarm),this.lastAnimationFrameTime=t,requestAnimationFrame(t=>this.updateCherry(t))}updated(){this.animator=rt(this.animationProps),this.renderer=gt(this.renderProps)}render(){return V`
      <canvas id="${vt}" width="${this.width}" height="${this.height}"></canvas>
    `}})},,function(t,e,i){"use strict";i.r(e);i(0);function s(){return`hsl(0, 100%, ${t=60,e=90,t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t}%)`;var t,e}function n(){let t=document.getElementById("cherry-bg-swarm"),e=t.offsetWidth,i=t.offsetHeight,s=$(window).width()/2,n=$(window).height()/2+$(window).scrollTop();t.animationProps={name:"orbit",orbitX:s,orbitY:n,radius:50,xMax:e,yMax:i}}function r(){$("*[data-scroll-animation]:not(.animated)").each((t,e)=>{let i=$(e);i.offset().top<$(window).scrollTop()+$(window).height()&&(console.log("animating element"),i.addClass("animated"),i.addClass(i.attr("data-scroll-animation")))})}function o(){!function(){let t=document.getElementById("cherry-bg-swarm"),e=[];for(let t=0;t<5;t++)e.push(s());t.renderProps={name:"multi-colored-rect",colors:e,size:10}}(),n()}$(document).ready(()=>{$(".modal").modal(),o(),r(),$(document).scroll(()=>(n(),void r()))})}]);