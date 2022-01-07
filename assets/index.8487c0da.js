/*! 
  author: tcly861204
  email: tcly861204@hotmail.com
  date: 2022/1/7 上午11:56:39
  gitee: https://gitee.com/tcly861204/vite-react-cnode
 */
var K=Object.defineProperty,U=Object.defineProperties;var Y=Object.getOwnPropertyDescriptors;var j=Object.getOwnPropertySymbols;var G=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable;var I=(o,e,n)=>e in o?K(o,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[e]=n,T=(o,e)=>{for(var n in e||(e={}))G.call(e,n)&&I(o,n,e[n]);if(j)for(var n of j(e))Q.call(e,n)&&I(o,n,e[n]);return o},z=(o,e)=>U(o,Y(e));import{P as m,R as t,r as a,S as V,a as Z}from"./vendor.d5ff9d1b.js";const ee=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const y of i.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&s(y)}).observe(document,{childList:!0,subtree:!0});function n(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerpolicy&&(i.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?i.credentials="include":l.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(l){if(l.ep)return;l.ep=!0;const i=n(l);fetch(l.href,i)}};ee();const O=o=>{const{value:e,callback:n}=o;return t.createElement("label",{className:["cui_checkbox",e&&"is-checked"].join(" ")},t.createElement("span",{onClick:s=>{n&&typeof n=="function"&&n(),s.preventDefault()},className:["cui_checkbox__input",e&&"is-checked"].join(" ")},t.createElement("span",{className:"cui_checkbox__inner"}),t.createElement("input",{type:"checkbox","aria-hidden":"false",className:"cui_checkbox__original"})))};O.propTypes={value:m.bool,callback:m.func};const M=function(){return document.addEventListener?function(o,e,n){o&&e&&n&&o.addEventListener(e,n,!1)}:function(o,e,n){o&&e&&n&&o.attachEvent("on"+e,n)}}(),W=function(){return document.removeEventListener?function(o,e,n){o&&e&&o.removeEventListener(e,n,!1)}:function(o,e,n){o&&e&&o.detachEvent("on"+e,n)}}();function X(o){const{columns:e,callback:n,handleSelected:s}=o,l=a.exports.useRef(null),[i,y]=a.exports.useState(!1);a.exports.useEffect(()=>{let c=null,d=null,r=null,E=null,g=null,p=null;const h=function(u){c=u.clientX,g=u.target.parentNode.parentNode.parentNode.parentNode,E=JSON.parse(JSON.stringify(g.getBoundingClientRect())),p=document.createElement("div"),p.className="resize-line",g.appendChild(p),M(document,"mousemove",v),M(document,"mouseup",S)},v=function(u){p.style.left=`${u.clientX-E.left-2}px`,d=u.clientX},S=function(){W(r.target,"mousedown",h),W(document,"mousemove",v),W(document,"mouseup",S),p.parentNode.removeChild(p);const u=r.target.dataset.field;n(u,r.target.offsetWidth+1+(d-c))},k=function(u){u.target.nodeName.toLocaleLowerCase()==="li"&&u.offsetX>8&&u.target.className.includes("__resize")?(u.target.style.cursor="col-resize",r=u,M(u.target,"mousedown",h)):(u.target.nodeName.toLocaleLowerCase()==="li"||u.target.nodeName.toLocaleLowerCase()==="div")&&(u.target.style.cursor="default")};return M(l.current,"mousemove",k),()=>{W(l.current,"mousemove",k)}},[l]);const $=a.exports.useCallback(()=>{y(c=>(c=!c,s&&typeof s=="function"&&s(c),c))},[i,s]);return t.createElement("div",{className:"table-header",ref:l},e.map((c,d)=>{const r=c.width,E={width:`${r}px`,maxWidth:`${r}px`,minWidth:`${r}px`,padding:"0 8px",boxSizing:"border-box"};return t.createElement("li",{className:[`align-${c.headerAlign||c.align||"left"}`,c.resizable&&"__resize"].join(" "),"data-field":c.prop||null,style:c.width?E:{flex:1,padding:"0 8px",boxSizing:"border-box"},key:d},t.createElement("div",null,c.type==="selection"?t.createElement(O,{value:i,callback:$}):c.label))}))}X.propTypes={columns:m.array,callback:m.func,handleSelected:m.func};var B=t.memo(X);function A(o){const{data:e,scrollTop:n,maxRow:s,columns:l,deleteCallback:i}=o,y=e.length>15?15:e.length,$=function(d,r){if(d.component&&d.type!=="delete")return t.createElement(d.component,{index:r});if(d.prop)return t.createElement("div",{className:"cell line-clamp"},e[r][d.prop]);switch(d.type){case"index":return t.createElement("div",{className:"cell"},r+1);case"selection":return t.createElement("div",{className:"cell"},t.createElement(O,{value:e[r]._checked||!1}));case"delete":return d.component?t.createElement(d.component,{index:r,callback:i}):null;default:return null}},c=function(){const d=[];let r=0;const E="cui-bigdata-container",g=e.length;g>s?n<g-s-4?r=n+s+3:r=g:r=e.length;for(let p=n;p<r;p++)d.push(t.createElement("div",{key:p,className:`${E}-row`,style:{transform:`translateY(${p*36}px)`}},l.map((h,v)=>t.createElement("li",{key:v,className:`align-${h.align||"left"}`,style:h.width?{width:`${h.width}px`,maxWidth:`${h.width}px`,minWidth:`${h.width}px`}:{display:1}},$(h,p)))));return d};return t.createElement("div",{className:"table-body",style:{height:`${y*36}px`}},c())}A.propTypes={data:m.array.isRequired,scrollTop:m.number.isRequired,maxRow:m.number.isRequired,columns:m.array,deleteCallback:m.func};const q=o=>{const{data:e,handleSelected:n}=o,s=a.exports.useRef(null),[l,i]=a.exports.useState(o.columns||[]),[y,$]=a.exports.useState(8),[c,d]=a.exports.useState(0),[r,E]=a.exports.useState(0),[g,p]=a.exports.useState([]),[h,v]=a.exports.useState([]),[S,k]=a.exports.useState([]),[u]=a.exports.useState(o.rowHeight||36),[w]=a.exports.useState(o.maxRow||15),[F,P]=a.exports.useState(!1);a.exports.useEffect(()=>{p(l.filter(f=>f.fixed==="left")),v(l.filter(f=>f.fixed==="right")),k(l.filter(f=>!["left","right"].includes(f.fixed)))},[l]),a.exports.useEffect(()=>{const f=setTimeout(()=>{const x=s.current.clientWidth,N=s.current.parentNode.clientWidth;return $(N-x),()=>{clearTimeout(f)}},30)},[e,s]),a.exports.useEffect(()=>{P(e.length>w)},[e,w]);const D=a.exports.useCallback(function(f,x){if(!f)return;const N=l.findIndex(R=>R.prop===f);if(N>=0){const R=[...l];R[N].width=x<20?20:x,i(R)}},[l]),b="cui-bigdata-container",C=a.exports.useMemo(()=>g.reduce((f,x)=>f+(x.width||100),0),[g]),_=a.exports.useMemo(()=>h.reduce((f,x)=>f+(x.width||100),0),[h]),H=((e.length>w?w:e.length)+1)*u,J=function(f){const x=f.currentTarget.scrollTop,N=f.currentTarget.scrollLeft;x!==c&&d(Math.floor(x/u)),N!==r&&E(N)},L=e.length*u;return t.createElement("section",{className:b,style:{height:`${H+2}px`}},t.createElement("section",{className:`${b}-header`},t.createElement("div",{className:`${b}_left`,style:{width:`${C}px`}},t.createElement(B,{columns:g,callback:D,handleSelected:n})),t.createElement("div",{className:`${b}_content`,style:{left:`${C-r}px`,right:`${_+(F?y:0)-r}px`}},t.createElement(B,{handleSelected:n,columns:S,callback:D})),t.createElement("div",{className:`${b}_right`,style:{width:`${_+(F?y:0)}px`,right:0}},t.createElement(B,{columns:h,callback:D}))),t.createElement("section",{className:`${b}-body`,style:{height:`${H-36}px`},onScroll:J,ref:s},t.createElement("div",{className:`${b}_left`,style:{width:`${C}px`,left:`${r}px`,height:`${L}px`}},t.createElement(A,z(T({},o),{maxRow:w,scrollTop:c,columns:g}))),t.createElement("div",{className:`${b}_content`,style:{left:`${C}px`,right:`${_-r}px`,height:`${L}px`}},t.createElement(A,z(T({},o),{maxRow:w,scrollTop:c,columns:S}))),t.createElement("div",{className:`${b}_right`,style:{width:`${_}px`,right:`${0-r}px`,height:`${L}px`}},t.createElement(A,z(T({},o),{maxRow:w,scrollTop:c,columns:h}))),t.createElement("div",{className:`${b}_scroll`,style:{height:`${L}px`}})))};q.propTypes={data:m.array,handleSelected:m.func,columns:m.array,rowHeight:m.number,maxRow:m.number};class te extends a.exports.Component{constructor(e){super(e);this.state={loading:!1,columns:[{type:"selection",align:"center",fixed:"left",width:50},{label:"\u5E8F\u53F7",type:"index",fixed:"left",headerAlign:"center",align:"center",width:60},{label:"\u6807\u9898",prop:"title",fixed:"left",width:180,resizable:!0},{label:"\u59D3\u540D",prop:"name",width:120,resizable:!0},{label:"\u5730\u533A",prop:"region",width:100},{label:"\u521B\u5EFA\u65F6\u95F4",prop:"createTime",width:150,resizable:!0},{label:"\u59D3\u522B",prop:"sex",width:140,resizable:!0},{label:"\u64CD\u4F5C",headerAlign:"center",type:"delete",width:56,resizable:!1,fixed:"right",component:n=>{const{index:s,callback:l}=n;return t.createElement("div",{onClick:()=>{l&&typeof l=="function"&&l(s)},style:{textAlign:"center",fontSize:"13px",cursor:"pointer",color:"#409eff"}},"\u5220\u9664")}}],data:[]}}componentDidMount(){this.setState({loading:!0}),fetch("/vite-react-hooks-bigdata/public/data.json").then(e=>e.json()).then(e=>{e.msg==="OK"&&this.setState({loading:!1,data:e.data.list})})}render(){const{loading:e,columns:n,data:s}=this.state;return t.createElement("section",{style:{padding:"50px"}},t.createElement(V,{spinning:e},t.createElement(q,{columns:n,data:s,deleteCallback:l=>{s.splice(l,1),this.setState({data:s})},handleSelected:l=>{this.setState({data:s.map(i=>(i._checked=l,i))})}})))}}Z.render(t.createElement(t.StrictMode,null,t.createElement(te,null)),document.getElementById("root"));
