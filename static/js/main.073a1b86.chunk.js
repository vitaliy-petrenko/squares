(this.webpackJsonpsquares=this.webpackJsonpsquares||[]).push([[0],{25:function(t,e,n){t.exports=n(38)},30:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var r,i,a,o,c,u,s,l,p,f,m=n(0),h=n.n(m),w=n(13),b=n.n(w),v=(n(30),n(7)),x=n.n(v),y=n(15),d=n.n(y),O=n(8),g=n.n(O),j=n(11),E=n(12),k=n(5),C=n(3),_=n.n(C),A=n(21),S=n(22),I=n(4),M=(n(33),n(2)),z=n(6),R=n(16),W=(n(18),n(14)),P=n(9),q=x.a.maxCellSize,L=x.a.minCellSize,N=parseInt(q),H=parseInt(L),G=function(t){return new Promise((function(e){setTimeout(e,t)}))},D=function(){var t=window,e=t.innerHeight;return{viewportWidth:t.innerWidth,viewportHeight:e}},T=function(){var t=function(){var t=D();return t.viewportWidth>t.viewportHeight}();return{minColumns:t?8:7,minRows:t?7:8}},X=function(){return{MIN_CELL_SIZE:H,MAX_CELL_SIZE:N}},Z=function(){var t=X().MIN_CELL_SIZE,e={minColumns:12,minRows:11},n=e.minColumns,r=e.minRows,i=D(),a=i.viewportHeight;return i.viewportWidth<=t*n||a<=t*r},B=function(t){var e=t.viewportWidth,n=t.viewportHeight,r=X(),i=r.MIN_CELL_SIZE,a=r.MAX_CELL_SIZE,o=Z()?T():{minColumns:12,minRows:11},c=o.minColumns,u=o.minRows,s=Math.min(n/u,e/c);s<i&&(s=i),s>a&&(s=a);var l=Math.round(e/s),p=Math.round(n/s);return l>25?l=25:l<c?l=c:l%2||l++,p>25?p=25:p<u?p=u:p%2||p--,console.log(l,p),{columns:l,rows:p}},Y=function(t){var e=t.columns,n=t.rows;return Object(z.a)({},Symbol.asyncIterator,Object(W.a)(_.a.mark((function t(){var r,i,a,o,c,u,s,l,p,f,m,h,w;return _.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=-1,i=0,a=0,o=0,c=e,u=n,s={x:1,y:0},l=function(){return s.x},p=function(){return s.y},f=function t(){var e=r+l(),n=i+p();if(0===p()){if(a===c)return null;if(e>=c)return s={x:0,y:1},o++,t();if(e<a)return s={x:0,y:-1},u--,t()}if(0===l()){if(o===u)return null;if(n>=u)return s={x:-1,y:0},c--,t();if(n<o)return s={x:1,y:0},a++,t()}return{nextX:e,nextY:n}};case 2:if(m=f()){t.next=6;break}return t.abrupt("break",13);case 6:return h=m.nextX,w=m.nextY,r=h,i=w,t.next=11,[{column:r,row:i}];case 11:t.next=2;break;case 13:case"end":return t.stop()}}),t)}))))},J=function(t){var e=t.columns,n=t.rows,r=t.cell,i=t.vectors,a=t.minColumn,o=t.minRow,c=t.maxColumn,u=t.maxRow;return Object(z.a)({},Symbol.asyncIterator,Object(W.a)(_.a.mark((function t(){var s,l,p,f,m,h,w,b,v;return _.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=[r],l=a||0,p=c?c-1:e-1,f=o||0,m=u?u-1:n-1,h=Object(P.uniqWith)(i.filter((function(t){return!(t.x===t.y&&0===t.x)})),P.isEqual),w=[Object(E.a)({},r)],b=function(){var t=[];h.forEach((function(e){s.forEach((function(n){var i=n.column,a=n.row;if(-1===e.x&&i<=r.column||1===e.x&&i>=r.column||-1===e.y&&a<=r.row||1===e.y&&a>=r.row){var o={column:i+e.x,row:a+e.y};if(w.find((function(t){var e=t.column,n=t.row;return e===o.column&&n===o.row})))return;w.push(o),t.push(o)}}))}));var e=Object(P.uniqWith)(t.filter((function(t){var e=t.column,n=t.row;return e>=l&&n>=f&&e<=p&&n<=m})),P.isEqual);return e.length?e:null},t.next=4,[Object(E.a)({},r)];case 4:if(v=b()){t.next=8;break}return t.abrupt("break",13);case 8:return t.next=10,v;case 10:s=v,t.next=4;break;case 13:case"end":return t.stop()}}),t)}))))},$=function(t,e,n){var r,i,a,o,c,u;return _.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:r=!0,i=!1,s.prev=2,o=Object(R.a)(t);case 4:return s.next=6,_.a.awrap(o.next());case 6:return c=s.sent,r=c.done,s.next=10,_.a.awrap(c.value);case 10:if(u=s.sent,r){s.next=22;break}if(!n(u)){s.next=16;break}return s.abrupt("break",22);case 16:if(!(e>0)){s.next=19;break}return s.next=19,_.a.awrap(G(e));case 19:r=!0,s.next=4;break;case 22:s.next=28;break;case 24:s.prev=24,s.t0=s.catch(2),i=!0,a=s.t0;case 28:if(s.prev=28,s.prev=29,r||null==o.return){s.next=33;break}return s.next=33,_.a.awrap(o.return());case 33:if(s.prev=33,!i){s.next=36;break}throw a;case 36:return s.finish(33);case 37:return s.finish(28);case 38:case"end":return s.stop()}}),null,null,[[2,24,28,38],[29,,33,37]])},F=function(t){return t[function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=e-.5+Math.random()*(t-e+1);return Math.round(n)}(t.length-1)]},K=n(24),Q=function(){var t=new Map,e=function(e){var n=t.get(e);if(n)return n;var r=K.a.search(e).map((function(t){return t.native}));return console.log(e,r),t.set(e,r),r};return function(t){return F(t.map(e).flat())}}();!function(t){t[t.initial=0]="initial",t[t.application=1]="application",t[t.snake=2]="snake"}(f||(f={}));var U=(r=M.l.struct,i=function(){function t(){var e=this;Object(A.a)(this,t),Object(k.a)(this,"columns",a,this),Object(k.a)(this,"rows",o,this),Object(k.a)(this,"viewportSize",c,this),Object(k.a)(this,"isMobile",u,this),Object(k.a)(this,"view",s,this),Object(k.a)(this,"grid",l,this),Object(k.a)(this,"cells",p,this),this.menuPosition={column:0,row:0},this.pagePosition={column:0,row:0},this.initialAnimationWasShown=!1,this.isAnimationRun=!1,this.initWasRequested=!1,this.isMobile=Z(),this.init(),window.addEventListener("resize",Object(P.debounce)((function(){e.viewportSize=D()}),500)),Object(M.m)((function(){return e.viewportSize}),(function(){e.isMobile=Z(),e.init()}))}return Object(S.a)(t,[{key:"initGrid",value:function(){var t=[];this.cells.clear();for(var e=0;e<this.rows;e++){t.push([]);for(var n=0;n<this.columns;n++){var r="".concat(e,"-").concat(n);t[e].push(r),this.cells.set(r,{attributes:{}})}}this.grid=t}},{key:"init",value:function(){var t,e,n;return _.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(!this.isAnimationRun){r.next=3;break}return this.initWasRequested=!0,r.abrupt("return");case 3:if(t=B(this.viewportSize),e=t.columns,n=t.rows,this.columns=e,this.rows=n,this.initGrid(),this.initialAnimationWasShown){r.next=11;break}return r.next=10,_.a.awrap(G(1e3));case 10:this.showInitialAnimation();case 11:case"end":return r.stop()}}),null,this)}},{key:"startAnimation",value:function(){this.isAnimationRun=!0}},{key:"stopAnimation",value:function(){this.isAnimationRun=!1,this.initWasRequested&&this.init(),this.initWasRequested=!1}},{key:"showInitialAnimation",value:function(){var t,e,n,r,i,a,o,c,u,s,l,p,f,m,h,w=this;return _.a.async((function(b){for(;;)switch(b.prev=b.next){case 0:return this.startAnimation(),t=this.columns,e=this.rows,n=this.grid,r=this.isMobile,i=1,a=r?15:10,o=Math.floor(t/2),c=Math.floor(e/2),u=n[c][o],s=this.getCell(u),"\u270b",l=Y({columns:t,rows:e}),b.next=5,_.a.awrap($(l,a,(function(t){t.forEach((function(t){var e=t.column,r=t.row,i=n[r][e],a=w.getCell(i);et(a,u===i?"\u270b":Q(["snow","happy","santa","gift","family","beer","coffee","cup tea","glass wine","celebration","orange fruit"]))}))})));case 5:return this.initialAnimationWasShown=!0,b.next=8,_.a.awrap(G(300));case 8:if(p=function(r){var s;return _.a.async((function(l){for(;;)switch(l.prev=l.next){case 0:return s=J({columns:t,rows:e,cell:{column:o,row:c},vectors:r,minColumn:i,minRow:i,maxColumn:t-i,maxRow:e-i}),l.next=3,_.a.awrap($(s,2.5*a,(function(t){t.forEach((function(t){var e=t.column,r=t.row,i=n[r][e],a=w.getCell(i);u!==i&&tt(a)}))})));case 3:case"end":return l.stop()}}))},b.t0=!r,!b.t0){b.next=13;break}return b.next=13,_.a.awrap(p([{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}]));case 13:return b.next=15,_.a.awrap(p([{x:-1,y:1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:1,y:1},{x:0,y:1}]));case 15:return V(s,{isHello:!0}),f=performance.now(),b.next=19,_.a.awrap(G(400));case 19:return m=Y({columns:t,rows:e}),b.next=22,_.a.awrap($(m,20,(function(t){var e=!1;if(t.forEach((function(t){var r=t.column,a=t.row,o=n[a][r],c=w.getCell(o);tt(c),e=a===i&&r===i-1})),e)return!0})));case 22:if(!((h=parseInt(g.a.helloAnimationTime)-(performance.now()-f))>0)){b.next=26;break}return b.next=26,_.a.awrap(G(h));case 26:tt(s),this.stopAnimation();case 28:case"end":return b.stop()}}),null,this)}},{key:"getCell",value:function(t){return this.cells.get(t)}},{key:"square",get:function(){return this.columns*this.rows}}]),t}(),a=Object(I.a)(i.prototype,"columns",[M.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),o=Object(I.a)(i.prototype,"rows",[M.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),c=Object(I.a)(i.prototype,"viewportSize",[r],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return D()}}),u=Object(I.a)(i.prototype,"isMobile",[M.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),s=Object(I.a)(i.prototype,"view",[M.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return f.initial}}),l=Object(I.a)(i.prototype,"grid",[M.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),p=Object(I.a)(i.prototype,"cells",[M.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new Map}}),Object(I.a)(i.prototype,"initGrid",[M.d],Object.getOwnPropertyDescriptor(i.prototype,"initGrid"),i.prototype),Object(I.a)(i.prototype,"init",[M.d],Object.getOwnPropertyDescriptor(i.prototype,"init"),i.prototype),Object(I.a)(i.prototype,"startAnimation",[M.d],Object.getOwnPropertyDescriptor(i.prototype,"startAnimation"),i.prototype),Object(I.a)(i.prototype,"stopAnimation",[M.d],Object.getOwnPropertyDescriptor(i.prototype,"stopAnimation"),i.prototype),Object(I.a)(i.prototype,"showInitialAnimation",[M.d],Object.getOwnPropertyDescriptor(i.prototype,"showInitialAnimation"),i.prototype),Object(I.a)(i.prototype,"square",[M.e],Object.getOwnPropertyDescriptor(i.prototype,"square"),i.prototype),Object(I.a)(i.prototype,"getCell",[function(t,e,n){return{configurable:!0,get:function(){var t=n.value.bind(this);return Object.defineProperty(this,e,{value:t,configurable:!0,writable:!0}),t}}}],Object.getOwnPropertyDescriptor(i.prototype,"getCell"),i.prototype),i),V=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];t.attributes=n?Object(E.a)({},t.attributes,{},e):Object(E.a)({},e)},tt=function(t){t.attributes={}},et=function(t,e){return V(t,{isEmoji:!0,content:e},!1)},nt=function(){return new U},rt=h.a.createContext(null),it=function(t){var e=t.children,n=Object(j.b)(nt);return h.a.createElement(rt.Provider,{value:n},e)},at=function(){var t=h.a.useContext(rt);if(!t)throw new Error("useGrid must be used within a GridProvider.");return t},ot=Object(j.a)((function(t){var e,n=t.id,r=(0,at().getCell)(n).attributes,i=r.content,a=r.isHello,o=r.isEmoji,c=r.isText;return o?e=a?h.a.createElement(ct,{content:i,className:g.a.isHello}):h.a.createElement(ct,{content:i}):c&&(e=h.a.createElement(ut,{content:i})),h.a.createElement("div",{className:g.a.cell},e)})),ct=function(t){var e=t.content,n=t.className;return h.a.createElement("div",{className:d()(g.a.cellEmoji,n)},e)},ut=function(t){var e=t.content;return h.a.createElement("div",{className:g.a.cellText},e)},st=ot,lt=Object(j.a)((function(){var t=at().grid;return h.a.createElement("div",{className:x.a.grid},t.map((function(t,e){return h.a.createElement(pt,{key:e},t.map((function(t,e){return h.a.createElement(ft,{key:e},h.a.createElement(st,{id:t}))})))})))})),pt=function(t){var e=t.children;return h.a.createElement("div",{className:x.a.row},e)},ft=function(t){var e=t.children;return h.a.createElement("div",{className:d()(x.a.col)},e)},mt=lt,ht=n(23),wt=function(t){return function(e){var n=Object(ht.a)({},e);return h.a.createElement(it,null,h.a.createElement(t,n))}}(mt),bt=function(){return h.a.createElement(wt,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));b.a.render(h.a.createElement(bt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},7:function(t,e,n){t.exports={minCellSize:"40px",maxCellSize:"100px",grid:"Grid_grid__24j1p",row:"Grid_row__2rajf",col:"Grid_col__1SX7O"}},8:function(t,e,n){t.exports={helloAnimationTime:"1200",cell:"Cell_cell__2Y63x",cellEmoji:"Cell_cellEmoji__210BA",isHello:"Cell_isHello__3Leu3","hello-animation":"Cell_hello-animation__zIPad"}}},[[25,1,2]]]);
//# sourceMappingURL=main.073a1b86.chunk.js.map