(this.webpackJsonpsquares=this.webpackJsonpsquares||[]).push([[0],{28:function(e,t,n){e.exports=n(41)},33:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var r,i,a,o,c,u,l,s,f,m,p,h=n(0),w=n.n(h),b=n(14),v=n.n(b),d=(n(33),n(9)),y=n.n(d),x=n(10),g=n.n(x),j=n(6),O=n.n(j),k=n(13),C=n(3),E=n.n(C),_=n(7),P=n(5),A=n(16),M=n(4),D=(n(36),n(2)),W=n(23),z=n(8),R=n(17),q=(n(22),n(15)),S=n(11),I=y.a.minCellSize,G=parseInt(I),H=function(e){return new Promise((function(t){setTimeout(t,e)}))},N=function(){var e=window,t=e.innerHeight;return{viewportWidth:e.innerWidth,viewportHeight:t}},L=function(){var e=N();return e.viewportWidth<e.viewportHeight},T=function(){var e=B(),t=e.minColumns,n=e.minRows,r=N(),i=r.viewportHeight;return r.viewportWidth<=G*t||i<=G*n},B=function(){return{minColumns:11,minRows:11}},X=function(e){var t=e.viewportWidth,n=e.viewportHeight,r=T()?{minColumns:7,minRows:7}:B(),i=r.minColumns,a=r.minRows,o=Math.min(n/a,t/i);o<G&&(o=G);var c=Math.round(t/o),u=Math.round(n/o);return c>=25?c=25:c<=i?c=i:c%2||c++,u>=25?u=25:u<=a?u=a:u%2||u--,{columns:c,rows:u}},Y=function(e){var t=e.columns,n=e.rows;return Object(z.a)({},Symbol.asyncIterator,Object(q.a)(E.a.mark((function e(){var r,i,a,o,c,u,l,s,f,m,p,h,w;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=-1,i=0,a=0,o=0,c=t,u=n,l={x:1,y:0},s=function(){return l.x},f=function(){return l.y},m=function e(){var t=r+s(),n=i+f();if(0===f()){if(a===c)return null;if(t>=c)return l={x:0,y:1},o++,e();if(t<a)return l={x:0,y:-1},u--,e()}if(0===s()){if(o===u)return null;if(n>=u)return l={x:-1,y:0},c--,e();if(n<o)return l={x:1,y:0},a++,e()}return{nextX:t,nextY:n}};case 2:if(p=m()){e.next=6;break}return e.abrupt("break",13);case 6:return h=p.nextX,w=p.nextY,r=h,i=w,e.next=11,[{column:r,row:i}];case 11:e.next=2;break;case 13:case"end":return e.stop()}}),e)}))))},J=function(e){var t=e.columns,n=e.rows,r=e.cell,i=e.vectors,a=e.minColumn,o=e.minRow,c=e.maxColumn,u=e.maxRow;return Object(z.a)({},Symbol.asyncIterator,Object(q.a)(E.a.mark((function e(){var l,s,f,m,p,h,w,b,v;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l=[r],s=a||0,f=c?c-1:t-1,m=o||0,p=u?u-1:n-1,h=Object(S.uniqWith)(i.filter((function(e){return!(e.x===e.y&&0===e.x)})),S.isEqual),w=[Object(W.a)({},r)],b=function(){var e=[];h.forEach((function(t){l.forEach((function(n){var i=n.column,a=n.row;if(-1===t.x&&i<=r.column||1===t.x&&i>=r.column||-1===t.y&&a<=r.row||1===t.y&&a>=r.row){var o={column:i+t.x,row:a+t.y};if(w.find((function(e){var t=e.column,n=e.row;return t===o.column&&n===o.row})))return;w.push(o),e.push(o)}}))}));var t=Object(S.uniqWith)(e.filter((function(e){var t=e.column,n=e.row;return t>=s&&n>=m&&t<=f&&n<=p})),S.isEqual);return t.length?t:null},e.next=4,[Object(W.a)({},r)];case 4:if(v=b()){e.next=8;break}return e.abrupt("break",13);case 8:return e.next=10,v;case 10:l=v,e.next=4;break;case 13:case"end":return e.stop()}}),e)}))))},U=function(e,t,n){var r,i,a,o,c,u;return E.a.async((function(l){for(;;)switch(l.prev=l.next){case 0:r=!0,i=!1,l.prev=2,o=Object(R.a)(e);case 4:return l.next=6,E.a.awrap(o.next());case 6:return c=l.sent,r=c.done,l.next=10,E.a.awrap(c.value);case 10:if(u=l.sent,r){l.next=22;break}if(!n(u)){l.next=16;break}return l.abrupt("break",22);case 16:if(!(t>0)){l.next=19;break}return l.next=19,E.a.awrap(H(t));case 19:r=!0,l.next=4;break;case 22:l.next=28;break;case 24:l.prev=24,l.t0=l.catch(2),i=!0,a=l.t0;case 28:if(l.prev=28,l.prev=29,r||null==o.return){l.next=33;break}return l.next=33,E.a.awrap(o.return());case 33:if(l.prev=33,!i){l.next=36;break}throw a;case 36:return l.finish(33);case 37:return l.finish(28);case 38:case"end":return l.stop()}}),null,null,[[2,24,28,38],[29,,33,37]])},F=function(e){return{row:Math.floor(e.length/2),column:Math.floor(e[0].length/2)}},K=function(e){return e[function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=t-.5+Math.random()*(e-t+1);return Math.round(n)}(e.length-1)]},V=n(27),$=function(){var e=new Map,t=function(t){var n=e.get(t);if(n)return n;var r=V.a.search(t).map((function(e){return e.native}));return e.set(t,r),r};return function(e){return K(e.map(t).flat())}}(),Q=n(20),Z=n(19),ee=n(21),te=function e(){Object(P.a)(this,e)},ne=function e(t){Object(P.a)(this,e),this.color=t},re=function e(t){Object(P.a)(this,e),this.content=t},ie=function(e){function t(){return Object(P.a)(this,t),Object(Q.a)(this,Object(Z.a)(t).apply(this,arguments))}return Object(ee.a)(t,e),t}(re),ae=function e(t){Object(P.a)(this,e),this.content=t};!function(e){e[e.initial=0]="initial",e[e.application=1]="application",e[e.snake=2]="snake"}(p||(p={}));var oe=(r=D.l.struct,i=function(){function e(){var t=this;Object(P.a)(this,e),Object(_.a)(this,"columns",a,this),Object(_.a)(this,"rows",o,this),Object(_.a)(this,"viewportSize",c,this),Object(_.a)(this,"isMobile",u,this),Object(_.a)(this,"isPortrait",l,this),Object(_.a)(this,"grid",s,this),Object(_.a)(this,"view",f,this),Object(_.a)(this,"cells",m,this),this.initialAnimationWasShown=!1,this.isAnimationRun=!1,this.initWasRequested=!1,this.clearCell=function(e){e.model=new te},this.init(),this.showInitialAnimation=this.withAnimationDecorator(this.showInitialAnimation),window.addEventListener("resize",Object(S.debounce)((function(){t.viewportSize=N()}),500)),Object(D.m)((function(){return t.viewportSize}),(function(){t.isMobile=T(),t.isPortrait=L(),t.init()}))}return Object(A.a)(e,[{key:"startAnimation",value:function(){this.isAnimationRun=!0}},{key:"stopAnimation",value:function(){this.isAnimationRun=!1,this.initWasRequested&&this.init(),this.initWasRequested=!1}},{key:"showInitialAnimation",value:function(){var e,t,n,r,i,a,o,c,u,l,s,f,m,p,h,w,b,v,d,y=this;return E.a.async((function(x){for(;;)switch(x.prev=x.next){case 0:return e=this.columns,t=this.rows,n=this.grid,r=this.isMobile,i=1,a=r?15:8,o=this.middleCell,c=o.column,u=o.row,l=n[u][c],s=this.getCellData(l),f="\u270b",m=Y({columns:e,rows:t}),x.next=4,E.a.awrap(U(m,a,(function(e){e.forEach((function(e){var t=e.column,r=e.row,i=n[r][t],a=y.getCellData(i);l===i?s.model=new re(f):a.model=new re($(["snow","happy","santa","gift","family","beer","coffee","cup tea","glass wine","celebration","orange fruit"]))}))})));case 4:return x.next=6,E.a.awrap(H(300));case 6:if(p=function(r){var o;return E.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return o=J({columns:e,rows:t,cell:{column:c,row:u},vectors:r,minColumn:i,minRow:i,maxColumn:e-i,maxRow:t-i}),s.next=3,E.a.awrap(U(o,2.5*a,(function(e){e.forEach((function(e){var t=e.column,r=e.row,i=n[r][t],a=y.getCellData(i);l!==i&&y.clearCell(a)}))})));case 3:case"end":return s.stop()}}))},x.t0=!r,!x.t0){x.next=11;break}return x.next=11,E.a.awrap(p([{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}]));case 11:return x.next=13,E.a.awrap(p([{x:-1,y:1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:1,y:1},{x:0,y:1}]));case 13:return s.model=new ie(f),h=performance.now(),w=parseInt(O.a.helloAnimationTime),x.next=18,E.a.awrap(H(.9*w));case 18:return b={columns:e,rows:t,cell:{column:c,row:this.rows-1},vectors:[{x:0,y:-1},{x:1,y:0},{x:-1,y:0}]},v=J(b),x.next=21,E.a.awrap(U(v,20,(function(e){e.forEach((function(e){var t=e.column,r=e.row,i=n[r][t],a=y.getCellData(i);y.clearCell(a)}))})));case 21:if(!((d=w-(performance.now()-h))>0)){x.next=25;break}return x.next=25,E.a.awrap(H(d));case 25:return this.clearCell(s),x.next=28,E.a.awrap(this.place404());case 28:return x.next=30,E.a.awrap(this.showInitialAnimation());case 30:case"end":return x.stop()}}),null,this)}},{key:"getCellData",value:function(e){return this.cells.get(e)}},{key:"place404",value:function(){var e,t,n,r,i,a,o,c,u=this;return E.a.async((function(l){for(;;)switch(l.prev=l.next){case 0:return e="#5a2f8e",t="transparent",n="#267479",r=this.isMobile&&this.isPortrait?[[e,t,e],[e,e,e],[t,t,e],[n,n,n],[n,t,n],[n,n,n],[e,t,e],[e,e,e],[t,t,e]]:[[e,t,e,n,n,n,e,t,e],[e,e,e,n,t,n,e,e,e],[t,t,e,n,n,n,t,t,e]],i=r[0].length,a=J({columns:i,rows:r.length,cell:{column:0,row:0},vectors:[{x:0,y:1},{x:1,y:1},{x:1,y:0}]}),o=this.middleCell,c=function(e){var t=e.row,n=e.column;return u.grid[t+o.row-F(r).row][n+o.column-F(r).column]},l.next=5,E.a.awrap(U(a,100,(function(e){e.forEach((function(e){var t=e.column,n=e.row,i=c({column:t,row:n}),a=u.getCellData(i);r[n][t]&&(a.model=new ne(r[n][t]))}))})));case 5:return l.next=7,E.a.awrap(H(500));case 7:return l.next=9,E.a.awrap(U(a,40,(function(e){e.forEach((function(e){var t=e.column,n=e.row;u.clearCell(u.getCellData(c({column:t,row:n})))}))})));case 9:case"end":return l.stop()}}),null,this)}},{key:"initGrid",value:function(){var e=[];this.cells.clear();for(var t=0;t<this.rows;t++){e.push([]);for(var n=0;n<this.columns;n++){var r="".concat(t,"-").concat(n);e[t].push(r),this.cells.set(r,{model:new te})}}this.grid=e}},{key:"init",value:function(){var e,t,n;return E.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(!this.isAnimationRun){r.next=3;break}return this.initWasRequested=!0,r.abrupt("return");case 3:if(e=X(this.viewportSize),t=e.columns,n=e.rows,this.columns=t,this.rows=n,this.initGrid(),this.initialAnimationWasShown){r.next=11;break}return r.next=10,E.a.awrap(H(1e3));case 10:this.showInitialAnimation();case 11:case"end":return r.stop()}}),null,this)}},{key:"withAnimationDecorator",value:function(e){var t=this;return function(){var n,r,i,a=arguments;return E.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:for(t.startAnimation(),n=a.length,r=new Array(n),i=0;i<n;i++)r[i]=a[i];return o.next=4,E.a.awrap(e.apply(t,r));case 4:t.stopAnimation();case 5:case"end":return o.stop()}}))}}},{key:"middleCell",get:function(){return F(this.grid)}},{key:"square",get:function(){return this.columns*this.rows}},{key:"menuPosition",get:function(){return function(e){var t=e.columns,n=e.rows,r=e.isMobile,i=e.isPortrait;return!r||r&&!i?{column:t-1,row:1,vector:{x:0,y:1}}:{column:1,row:n-1,vector:{x:1,y:0}}}({columns:this.columns,rows:this.rows,isMobile:this.isMobile,isPortrait:this.isPortrait})}},{key:"pageLeftCornerPosition",get:function(){return{column:0,row:0}}}]),e}(),a=Object(M.a)(i.prototype,"columns",[D.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),o=Object(M.a)(i.prototype,"rows",[D.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),c=Object(M.a)(i.prototype,"viewportSize",[r],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return N()}}),u=Object(M.a)(i.prototype,"isMobile",[D.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return T()}}),l=Object(M.a)(i.prototype,"isPortrait",[D.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return L()}}),s=Object(M.a)(i.prototype,"grid",[D.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),f=Object(M.a)(i.prototype,"view",[D.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return p.initial}}),m=Object(M.a)(i.prototype,"cells",[D.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new Map}}),Object(M.a)(i.prototype,"middleCell",[D.e],Object.getOwnPropertyDescriptor(i.prototype,"middleCell"),i.prototype),Object(M.a)(i.prototype,"square",[D.e],Object.getOwnPropertyDescriptor(i.prototype,"square"),i.prototype),Object(M.a)(i.prototype,"menuPosition",[D.e],Object.getOwnPropertyDescriptor(i.prototype,"menuPosition"),i.prototype),Object(M.a)(i.prototype,"pageLeftCornerPosition",[D.e],Object.getOwnPropertyDescriptor(i.prototype,"pageLeftCornerPosition"),i.prototype),Object(M.a)(i.prototype,"getCellData",[function(e,t,n){return{configurable:!0,get:function(){var e=n.value.bind(this);return Object.defineProperty(this,t,{value:e,configurable:!0,writable:!0}),e}}}],Object.getOwnPropertyDescriptor(i.prototype,"getCellData"),i.prototype),Object(M.a)(i.prototype,"initGrid",[D.d],Object.getOwnPropertyDescriptor(i.prototype,"initGrid"),i.prototype),i),ce=function(){return new oe},ue=w.a.createContext(null),le=function(e){var t=e.children,n=Object(k.b)(ce);return w.a.createElement(ue.Provider,{value:n},t)},se=function(){var e=w.a.useContext(ue);if(!e)throw new Error("useGrid must be used within a GridProvider.");return e},fe=Object(k.a)((function(e){var t,n=e.id,r=(0,se().getCellData)(n).model;return r instanceof re&&(t=w.a.createElement(me,r)),r instanceof ie&&(t=w.a.createElement(pe,r)),r instanceof ae&&(t=w.a.createElement(he,r)),r instanceof ne&&(t=w.a.createElement(we,r)),w.a.createElement(w.a.Fragment,null,t)})),me=function(e){var t=e.content;return w.a.createElement("div",{className:g()(O.a.cell,O.a.cellEmoji)},t)},pe=function(e){var t=e.content;return w.a.createElement("div",{className:g()(O.a.cell,O.a.cellEmoji,O.a.cellHelloEmoji)},t)},he=function(e){var t=e.content;return w.a.createElement("div",{className:g()(O.a.cell,O.a.cellText)},t)},we=function(e){var t=e.color,n={};return n.background=t,w.a.createElement("div",{className:g()(O.a.cell),style:n})},be=fe,ve=function(e,t,n){return function(r){function i(){var t,n;Object(P.a)(this,i);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(Q.a)(this,(t=Object(Z.a)(i)).call.apply(t,[this].concat(a)))).render=function(){return w.a.createElement(e,n.props)},n}return Object(ee.a)(i,r),Object(A.a)(i,[{key:"componentDidMount",value:function(){var e=this.element;e&&e.classList.add(n)}},{key:"componentWillUnmount",value:function(){var e=this.element;e&&e.classList.remove(n)}},{key:"shouldComponentUpdate",value:function(){return!1}},{key:"element",get:function(){return document.querySelector(t)||null}}]),i}(w.a.Component)},de=Object(k.a)((function(){var e=se().grid;return w.a.createElement("div",{className:y.a.grid},e.map((function(e,t){return w.a.createElement(ye,{key:t},e.map((function(e,t){return w.a.createElement(xe,{key:t},w.a.createElement(be,{id:e}))})))})))})),ye=function(e){var t=e.children;return w.a.createElement("div",{className:y.a.row},t)},xe=function(e){var t=e.children;return w.a.createElement("div",{className:g()(y.a.col)},t)},ge=ve(de,"html",y.a.gridWrapper),je=n(26),Oe=function(e){return function(t){var n=Object(je.a)({},t);return w.a.createElement(le,null,w.a.createElement(e,n))}}(ge),ke=function(){return w.a.createElement(Oe,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));v.a.render(w.a.createElement(ke,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},6:function(e,t,n){e.exports={helloAnimationTime:"1400",cell:"Cell_cell__2Y63x",cellEmoji:"Cell_cellEmoji__210BA",cellHelloEmoji:"Cell_cellHelloEmoji__Khd3i","hello-animation":"Cell_hello-animation__zIPad",cellMenu:"Cell_cellMenu__2IVHi"}},9:function(e,t,n){e.exports={minCellSize:"40px",gridWrapper:"Grid_gridWrapper__Rwaf7",grid:"Grid_grid__24j1p",row:"Grid_row__2rajf",col:"Grid_col__1SX7O"}}},[[28,1,2]]]);
//# sourceMappingURL=main.4f6e822b.chunk.js.map