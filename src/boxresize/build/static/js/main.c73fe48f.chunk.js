(this["webpackJsonpbox-resize"]=this["webpackJsonpbox-resize"]||[]).push([[0],[,,,,,,,,,,,,,,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var i=n(0),c=n(1),r=n.n(c),o=n(8),a=n.n(o),s=(n(14),n(4)),u=n(6),h=n(2),b=20;function x(t,e){return t>=50&&e>=50}function j(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+(t()+t())}function l(){for(var t="#",e=0;e<6;e++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}function d(t){var e=t.isAdding,n=t.x1,c=t.y1,r=t.x2,o=t.y2;if(n>r){var a=[r,n];n=a[0],r=a[1]}if(c>o){var s=[o,c];c=s[0],o=s[1]}var u=r-n,h=o-c,b=x(u,h)?"black":"red";return e?Object(i.jsx)("rect",{id:"dragbox",x:n,y:c,width:u,height:h,style:{fill:"transparent",stroke:b,strokeDasharray:"4 2"}}):Object(i.jsx)(i.Fragment,{})}n(15);function f(t){var e=t.x,n=t.y,c=t.width,r=t.height,o=t.fill,a="\n    ".concat(e+c-5,",").concat(n+r-5,"\n    ").concat(e+c-25,",").concat(n+r-5,"\n    ").concat(e+c-5,",").concat(n+r-25,"\n    ");return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("rect",{className:"box",x:e,y:n,width:c,height:r,fill:o}),Object(i.jsx)("polygon",{points:a,fill:"white"})]})}var v=n.p+"static/media/BoxTrash.bea85dd6.svg",O=(n(16),function(t){var e=t.className;return Object(i.jsxs)("g",{id:"trash",className:e,children:[Object(i.jsx)("rect",{x:0,y:0,width:80,height:80}),Object(i.jsx)("image",{x:0,y:0,width:80,height:80,href:v})]})});function g(t){var e=t.visible;t.windowWidth;return Object(i.jsx)(O,{className:e?"visible":"invisible"})}function y(t){var e=t.windowWidth,n=t.windowHeight,c=t.version,r=.99*e,o=.01*e,a=function(t){return n+t};return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("text",{fontSize:11,x:o,y:a(-46),textAnchor:"start",children:"R-Drag : Create box"}),Object(i.jsx)("text",{fontSize:11,x:o,y:a(-34),textAnchor:"start",children:"L-Drag on Box : Box Shift"}),Object(i.jsx)("text",{fontSize:11,x:o,y:a(-22),textAnchor:"start",children:"L-Drag on Tip : Box Resize"}),Object(i.jsx)("text",{fontSize:11,x:o,y:a(-10),textAnchor:"start",children:"DBL L-Click : Bring to front"}),Object(i.jsxs)("text",{fontSize:13,x:r,y:a(-10),textAnchor:"end",children:["Box Resize ",c,"@goodseog.yoo"]})]})}n(17);function w(){var t=Object(c.useState)([]),e=Object(h.a)(t,2),n=e[0],r=e[1],o=Object(c.useState)(!1),a=Object(h.a)(o,2),v=a[0],O=a[1],w=Object(c.useState)({x:0,y:0}),m=Object(h.a)(w,2),p=m[0],S=m[1],X=Object(c.useState)({x:0,y:0}),Y=Object(h.a)(X,2),M=Y[0],k=Y[1],z=Object(c.useState)(!1),B=Object(h.a)(z,2),D=B[0],E=B[1],A=Object(c.useState)(-1),F=Object(h.a)(A,2),L=F[0],T=F[1],C=Object(c.useState)(!1),N=Object(h.a)(C,2),W=N[0],H=N[1],R=Object(c.useState)(!1),I=Object(h.a)(R,2),J=I[0],P=I[1],U=Object(c.useState)(-1),q=Object(h.a)(U,2),G=q[0],K=q[1],Q=Object(c.useState)(0),V=Object(h.a)(Q,2),Z=V[0],$=V[1],_=Object(c.useState)(0),tt=Object(h.a)(_,2),et=tt[0],nt=tt[1],it=function(){$(window.innerWidth),nt(window.innerHeight)};function ct(t){var e,n=t.changeedTouches[0];switch(t.type){case"touchstart":e="mousedown";break;case"touchend":e="mouseup";break;case"touchmove":e="mousemove";break;default:return}var i=document.createEvent("MouseEvent"),c=void 0===rt(n.clientX,n.clientY)?2:0;i.initMouseEvent(e,!0,!0,window,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,c,null),n.target.dispatchEvent(i),t.preventDefault()}function rt(t,e){for(var i=n.length-1;i>=0;i--)if(n[i].x<t&&t<n[i].x+n[i].width&&n[i].y<e&&e<n[i].y+n[i].height){var c=n[i].x+n[i].width-b-5,r=n[i].y+n[i].height-b-5;return[i,c<t&&r<e&&t<c+b+5&&e<r+b+5]}return[void 0,!1]}return Object(c.useEffect)((function(){return it(),window.addEventListener("resize",it),function(){return window.removeEventListener("resize",it)}}),[]),Object(i.jsxs)("svg",{className:"App",onTouchStart:ct,onTouchMove:ct,onTouchEnd:ct,onDoubleClick:function(t){if(0===t.button){var e=rt(t.clientX,t.clientY),i=Object(h.a)(e,1)[0];-1<(c=i)&&c<n.length-1&&r((function(t){var e=Object(u.a)(t),n=e.splice(c,1);return e.concat(n)}))}var c},onMouseDown:function(t){if(0===t.button){var e=rt(t.clientX,t.clientY),n=Object(h.a)(e,2),i=n[0],c=n[1];void 0!==i&&(c?(P(!0),K(i)):(E(!0),T(i),S({x:t.clientX,y:t.clientY}),k({x:t.clientX,y:t.clientY})))}2===t.button&&(O(!0),S({x:t.clientX,y:t.clientY}),k({x:t.clientX,y:t.clientY}))},onMouseMove:function(t){var e,n,i;J&&(e=G,n=t.movementX,i=t.movementY,r((function(t){return t.map((function(t,c){return c===e?Object(s.a)(Object(s.a)({},t),{},{width:Math.max(t.width+n,50),height:Math.max(t.height+i,50)}):t}))}))),D&&function(t,e,n){r((function(i){return i.map((function(i,c){return c===t?Object(s.a)(Object(s.a)({},i),{},{x:i.x+e,y:i.y+n}):i}))}))}(L,t.movementX,t.movementY),v&&k({x:t.clientX,y:t.clientY}),D&&(p.x!==t.clientX||p.y!==t.clientY)&&H(!0)},onMouseUp:function(t){var e;0===t.button&&(D&&t.clientX<=80&&t.clientY<=80&&(e=L,r((function(t){var n=Object(u.a)(t);return n.splice(e,1),n}))),E(!1),H(!1),P(!1)),2===t.button&&(O(!1),function(t,e,n,i){if(t>n){var c=[n,t];t=c[0],n=c[1]}if(e>i){var o=[i,e];e=o[0],i=o[1]}var a=n-t,s=i-e;x(a,s)&&r((function(n){var i={key:j(),x:t,y:e,width:a,height:s,fill:l()};return[].concat(Object(u.a)(n),[i])}))}(p.x,p.y,t.clientX,t.clientY))},children:[n.map((function(t){return Object(i.jsx)(f,{x:t.x,y:t.y,width:t.width,height:t.height,fill:t.fill},t.key)})),Object(i.jsx)(g,{visible:W,windowWidth:Z}),Object(i.jsx)(y,{windowWidth:Z,windowHeight:et,version:"v0.8.1"}),Object(i.jsx)(d,{isAdding:v,x1:p.x,y1:p.y,x2:M.x,y2:M.y})]})}var m=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(e){var n=e.getCLS,i=e.getFID,c=e.getFCP,r=e.getLCP,o=e.getTTFB;n(t),i(t),c(t),r(t),o(t)}))};a.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(w,{})}),document.getElementById("root")),m()}],[[18,1,2]]]);
//# sourceMappingURL=main.c73fe48f.chunk.js.map