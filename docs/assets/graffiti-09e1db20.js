import{r as a,c as C,j as F,m as H,o as u,d as v,e,g as z,h as i,w as h,v as b,F as D,f as L,n as k,p as N}from"./index-b2a37ce1.js";import{e as P}from"./index-1c0be1fd.js";const W="/elesign/assets/back-e1fb805c.svg",$="/elesign/assets/redo-b80e16b1.svg",q="/elesign/assets/eraser-941873b4.svg",G="/elesign/assets/eraser_active-ad3abe55.svg";const U={class:"graffiti"},M={class:"canvas-wrap"},O={class:"tool"},T={class:"item"},X=e("span",null,"笔的粗细：",-1),j={class:"item"},Q=e("span",null,"笔的颜色：",-1),Y={class:"item"},J=e("span",null,"笔的刷头：",-1),K={class:"img-wrap"},Z=["src","onClick"],ee={class:"item"},se=e("span",null,"橡皮擦：",-1),te=["src"],ne={class:"item"},ae=e("span",null,"橡皮擦大小：",-1),le={class:"item",style:{width:"100%"}},oe=["src"],ie=["src"],ce={key:0,class:"print-img-wrap"},re=["src"],de={class:"tool"},ue={class:"item"},ge={__name:"graffiti",setup(ve){let p=null;const w=a(900),c=a(!1),m=a(10),_=a("#e66465"),g=a(30),y=a([{src:"https://ts4.cn.mm.bing.net/th?id=OIP-C.ndkHHcFds5LRXYqXbAkVowHaFN&w=298&h=209&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"},{src:"https://tse1-mm.cn.bing.net/th/id/OIP-C.oScG36TGIEhRDHdawdrQDwHaDe?w=283&h=164&c=7&r=0&o=5&dpr=1.5&pid=1.7"}]),l=a({img:"",dom:null}),I=(s,t)=>{c.value=!1,l.value.img===s?(l.value.img="",l.value.dom=null):(l.value.img=s,console.log(p,"instance"),l.value.dom=p.ctx.$refs[t][0])},o=a(),S=()=>{var s;(s=o.value)==null||s.redo()},f=a(!1),r=a(""),E=()=>{var s;r.value=(s=o.value)==null?void 0:s.toPng(),f.value=!0,console.log(r.value)},R=()=>{let s=document.createElement("a");s.href=r.value,s.download="涂鸦",s.click()},V=C(()=>{var s;return(s=o.value)==null?void 0:s.isBackwardAble}),A=C(()=>{var s;return(s=o.value)==null?void 0:s.isForwardAble}),B=()=>{var s;(s=o.value)==null||s.backward()},x=()=>{var s;(s=o.value)==null||s.forward()};return F(()=>{p=H(),w.value=document.querySelector(".graffiti").offsetWidth}),(s,t)=>(u(),v("div",U,[e("div",M,[z(i(P),{ref_key:"elesignRef",ref:o,width:w.value,height:"600",canvasStyle:{boxShadow:"0 2px 12px 0 rgba(0,0,0,0.3)",background:"#f1f1f1"},color:l.value.dom||_.value,lineWidth:g.value,isEraser:c.value,eraserSize:m.value,empty:""},null,8,["width","canvasStyle","color","lineWidth","isEraser","eraserSize"])]),e("div",O,[e("div",T,[X,h(e("input",{type:"number","onUpdate:modelValue":t[0]||(t[0]=n=>g.value=n)},null,512),[[b,g.value]])]),e("div",j,[Q,h(e("input",{type:"color","onUpdate:modelValue":t[1]||(t[1]=n=>_.value=n)},null,512),[[b,_.value]])]),e("div",Y,[J,e("span",K,[(u(!0),v(D,null,L(y.value,(n,d)=>(u(),v("img",{class:k({active:l.value.img==="penImg"+d}),key:n.src,src:n.src,alt:"",ref_for:!0,ref:"penImg"+d+"Ref",onClick:pe=>I("penImg"+d,"penImg"+d+"Ref")},null,10,Z))),128))])]),e("div",ee,[se,e("img",{class:"eraser",src:c.value?i(G):i(q),alt:"",onClick:t[2]||(t[2]=n=>c.value=!c.value)},null,8,te)]),e("div",ne,[ae,h(e("input",{type:"number","onUpdate:modelValue":t[3]||(t[3]=n=>m.value=n)},null,512),[[b,m.value]])]),e("div",le,[e("span",{class:k({button:!0,disabled:!i(V)}),onClick:B},[e("img",{src:i(W),alt:""},null,8,oe)],2),e("span",{class:k({button:!0,disabled:!i(A)}),onClick:x},[e("img",{src:i($),alt:""},null,8,ie)],2),e("span",{class:"button",onClick:S},"清屏"),e("span",{class:"button",onClick:E},"打印png")])]),f.value?(u(),v("div",ce,[e("img",{src:r.value,alt:""},null,8,re),e("div",de,[e("div",ue,[e("span",{class:"button",onClick:t[4]||(t[4]=n=>f.value=!1)},"关闭"),e("span",{class:"button",onClick:R},"下载")])])])):N("",!0)]))}};export{ge as default};
