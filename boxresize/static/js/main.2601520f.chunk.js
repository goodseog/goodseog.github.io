(this["webpackJsonpbox-resize"]=this["webpackJsonpbox-resize"]||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){},16:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var i=n(0),c=n(1),r=n.n(c),o=n(7),a=n.n(o),u=(n(14),n(4)),s=n(8),h=n(2),x=20;function f(t,e){return t>=100&&e>=100}function j(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+(t()+t())}function b(){for(var t="#",e=0;e<6;e++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}function l(t){var e=t.isDragging,n=t.x1,c=t.y1,r=t.x2,o=t.y2;if(n>r){var a=[r,n];n=a[0],r=a[1]}if(c>o){var u=[o,c];c=u[0],o=u[1]}var s=r-n,h=o-c,x=f(s,h)?"black":"red";return e?Object(i.jsx)("rect",{id:"dragbox",x:n,y:c,width:s,height:h,style:{fill:"transparent",stroke:x,strokeDasharray:"4 2"}}):Object(i.jsx)(i.Fragment,{})}n(15);function d(t){var e=t.x,n=t.y,c=t.width,r=t.height,o=t.fill,a="\n    ".concat(e+c-5,",").concat(n+r-5,"\n    ").concat(e+c-25,",").concat(n+r-5,"\n    ").concat(e+c-5,",").concat(n+r-25,"\n    ");return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("rect",{className:"box",x:e,y:n,width:c,height:r,fill:o}),Object(i.jsx)("polygon",{points:a,fill:"white"})]})}function O(t){var e=t.windowWidth,n=t.windowHeight,c=.99*e,r=.01*e,o=function(t){return n+t};return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("text",{fontSize:11,x:r,y:o(-46),textAnchor:"start",children:"R-Drag : Create box"}),Object(i.jsx)("text",{fontSize:11,x:r,y:o(-34),textAnchor:"start",children:"L-Drag on Box : Box Shift"}),Object(i.jsx)("text",{fontSize:11,x:r,y:o(-22),textAnchor:"start",children:"L-Drag on Tip : Box Resize"}),Object(i.jsx)("text",{fontSize:11,x:r,y:o(-10),textAnchor:"start",children:"DBL L-Click : Bring to front"}),Object(i.jsx)("text",{fontSize:13,x:c,y:o(-10),textAnchor:"end",children:"Box Resize@goodseog.yoo"})]})}n(16);function g(){var t=Object(c.useState)([]),e=Object(h.a)(t,2),n=e[0],r=e[1],o=Object(c.useState)(!1),a=Object(h.a)(o,2),g=a[0],y=a[1],v=Object(c.useState)({x:0,y:0}),w=Object(h.a)(v,2),m=w[0],S=w[1],p=Object(c.useState)({x:0,y:0}),z=Object(h.a)(p,2),D=z[0],M=z[1],X=Object(c.useState)(!1),Y=Object(h.a)(X,2),k=Y[0],B=Y[1],F=Object(c.useState)(-1),L=Object(h.a)(F,2),A=L[0],C=L[1],E=Object(c.useState)(!1),H=Object(h.a)(E,2),R=H[0],T=H[1],W=Object(c.useState)(-1),I=Object(h.a)(W,2),J=I[0],N=I[1],P=Object(c.useState)(0),U=Object(h.a)(P,2),q=U[0],G=U[1],K=Object(c.useState)(0),Q=Object(h.a)(K,2),V=Q[0],Z=Q[1],$=function(){G(window.innerWidth),Z(window.innerHeight)};function _(t,e){for(var i=n.length-1;i>=0;i--)if(n[i].x<t&&t<n[i].x+n[i].width&&n[i].y<e&&e<n[i].y+n[i].height)return i}return Object(c.useEffect)((function(){return $(),window.addEventListener("resize",$),function(){return window.removeEventListener("resize",$)}}),[]),Object(i.jsxs)("svg",{className:"App",onDoubleClick:function(t){if(0===t.button){var e=_(t.clientX,t.clientY);-1<(i=e)&&i<n.length-1&&r((function(t){var e=t.slice(0,i).concat(t.slice(i+1));return e.push(t[i]),e}))}var i},onMouseDown:function(t){if(0===t.button){var e=_(t.clientX,t.clientY);if(void 0!==e&&-1!==e){var i=n[e].x+n[e].width-x-5,c=i+x+5,r=n[e].y+n[e].height-x-5,o=r+x+5;i<t.clientX&&t.clientX<c&&r<t.clientY&&t.clientY<o?(T(!0),N(e)):(B(!0),C(e))}}2===t.button&&(y(!0),S({x:t.clientX,y:t.clientY}),M({x:t.clientX,y:t.clientY}))},onMouseMove:function(t){var e,n,i;R&&(e=J,n=t.movementX,i=t.movementY,r((function(t){return t.map((function(t,c){return c===e?Object(u.a)(Object(u.a)({},t),{},{width:Math.max(t.width+n,100),height:Math.max(t.height+i,100)}):t}))}))),k&&function(t,e,n){r((function(i){return i.map((function(i,c){return c===t?Object(u.a)(Object(u.a)({},i),{},{x:i.x+e,y:i.y+n}):i}))}))}(A,t.movementX,t.movementY),g&&M({x:t.clientX,y:t.clientY})},onMouseUp:function(t){0===t.button&&(B(!1),T(!1)),2===t.button&&(y(!1),function(t,e,n,i){if(t>n){var c=[n,t];t=c[0],n=c[1]}if(e>i){var o=[i,e];e=o[0],i=o[1]}var a=n-t,u=i-e;f(a,u)&&r((function(n){var i={key:j(),x:t,y:e,width:a,height:u,fill:b()};return[].concat(Object(s.a)(n),[i])}))}(m.x,m.y,t.clientX,t.clientY))},children:[n.map((function(t){return Object(i.jsx)(d,{x:t.x,y:t.y,width:t.width,height:t.height,fill:t.fill},t.key)})),Object(i.jsx)(O,{windowWidth:q,windowHeight:V}),Object(i.jsx)(l,{isDragging:g,x1:m.x,y1:m.y,x2:D.x,y2:D.y})]})}var y=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(e){var n=e.getCLS,i=e.getFID,c=e.getFCP,r=e.getLCP,o=e.getTTFB;n(t),i(t),c(t),r(t),o(t)}))};a.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(g,{})}),document.getElementById("root")),y()}},[[17,1,2]]]);
//# sourceMappingURL=main.2601520f.chunk.js.map