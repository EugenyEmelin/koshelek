import{u as O,a as P,Q as L,b as f}from"./QTable-DtXCGswK.js";import{c as D,a as t,h as m,T as Q,g as T,E as w,L as I,M as V,S as h,r as N,I as v,N as y,O as l,P as z,Q as $,R as j,J as i,G as k,U as E,_ as x,F}from"./index-BnyblyMK.js";import{e as U}from"./QBtn-CJX_xDEd.js";import{a as A,d as G}from"./format-DgZPnoQf.js";const S=D({name:"QInnerLoading",props:{...A,...O,showing:Boolean,color:String,size:{type:[String,Number],default:42},label:String,labelClass:String,labelStyle:[String,Array,Object]},setup(e,{slots:a}){const o=T(),r=G(e,o.proxy.$q),{transitionProps:b,transitionStyle:c}=P(e),g=t(()=>"q-inner-loading q--avoid-card-border absolute-full column flex-center"+(r.value===!0?" q-inner-loading--dark":"")),_=t(()=>"q-inner-loading__label"+(e.labelClass!==void 0?` ${e.labelClass}`:""));function s(){const d=[m(U,{size:e.size,color:e.color})];return e.label!==void 0&&d.push(m("div",{class:_.value,style:e.labelStyle},[e.label])),d}function p(){return e.showing===!0?m("div",{class:g.value,style:c.value},a.default!==void 0?a.default():s()):null}return()=>m(Q,b.value,p)}}),J={class:"order-book-header flex row no-wrap justify-between items-center"},M={class:"text-h6 flex row no-wrap"},R={key:0,class:"text-no-wrap"},H={class:"text-weight-light q-ml-xs"},K={class:"static-screen row"},W={class:"col-6 relative-position"},X={class:"col-6 relative-position"},Y=w({__name:"OrderBook",setup(e){const a=I(),o=[{name:"price",label:"Цена",field:"price",align:"left"},{name:"quantity",label:"Кол-во",field:"quantity",align:"left"},{name:"total",label:"",field:"total",align:"left"}],r=t(()=>a.loading),b=t(()=>V[a.currencySymbol].label),c=t(()=>{const n=["price","quantity","total"],u=["price","quantity"];return h.lt.md?u:n}),g={sortBy:"desc",descending:!1,page:1,rowsPerPage:0},_={sortBy:"desc",descending:!1,page:1,rowsPerPage:0},s=N(a.limit),p=[100,500,1e3],d=t(()=>a.getLimitedOrdersList(s.value).asks),C=t(()=>a.getLimitedOrdersList(s.value).bids);function q(n){a.$patch({limit:n}),a.fetchDepthSnapshot(a.currencySymbol,n)}return(n,u)=>(v(),y(E,null,[l("div",J,[l("div",M,[z(h).gt.xs?(v(),y("div",R,"Биржевой стакан —")):$("",!0),l("span",H,j(b.value),1)]),i(L,{modelValue:s.value,"onUpdate:modelValue":[u[0]||(u[0]=B=>s.value=B),q],options:p,label:"Глубина стакана",class:"table-size-select q-ml-xl","transition-show":"scale","transition-hide":"scale",filled:"",dense:""},null,8,["modelValue"])]),l("div",K,[l("div",W,[i(f,{title:"Ордер на покупку",rows:C.value,columns:o,"visible-columns":c.value,pagination:_,loading:r.value,class:"order-table order-table--bids sticky-head","title-class":"table-title table-title--bids",dense:"",flat:"",square:"",bordered:"","hide-pagination":"","hide-no-data":"","virtual-scroll":""},{loading:k(()=>[i(S,{showing:"",color:"primary"})]),_:1},8,["rows","visible-columns","loading"])]),l("div",X,[i(f,{title:"Ордер на продажу",rows:d.value,columns:o,"visible-columns":c.value,pagination:g,loading:r.value,class:"order-table order-table--asks sticky-head","title-class":"table-title table-title--asks",dense:"",flat:"",square:"",bordered:"","hide-pagination":"","hide-no-data":"","virtual-scroll":""},{loading:k(()=>[i(S,{showing:"",color:"primary"})]),_:1},8,["rows","visible-columns","loading"])])])],64))}}),Z=x(Y,[["__scopeId","data-v-a28ca3f1"],["__file","OrderBook.vue"]]),ee=w({name:"OrderBookPage",__name:"order-book.page",setup(e){return(a,o)=>(v(),F(Z))}}),oe=x(ee,[["__file","order-book.page.vue"]]);export{oe as default};