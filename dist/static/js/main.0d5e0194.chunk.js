(this.webpackJsonpsocradio_web_react=this.webpackJsonpsocradio_web_react||[]).push([[0],{149:function(t,e){},158:function(t,e,a){},161:function(t,e,a){"use strict";a.r(e);var n,c=a(38),s=a.n(c),i=a(21),o=a(22),r=a(6),l=a(0),j=a(177),u=a(178),d=a(179),b=a(5),O=a.n(b),x=a(41),f=a(82),p=a.n(f),h=function(){n=p()("https://".concat(window.location.hostname),{path:"/api/socket.io"}),console.log("Connecting socket...")},m=function(){console.log("Disconnecting socket..."),n&&n.disconnect()},g=function(t,e){n.on(t,e)},_=a(175),y=a(180),v=a(83),w=a.n(v),N=a(85),S=a.n(N),k=a(1),z=Object(_.a)({root:{color:"white",display:"flex",flexDirection:"row"}});function C(t){var e=z();return Object(k.jsxs)("div",{className:e.root,children:[Object(k.jsx)(w.a,{className:"mx-3"}),Object(k.jsx)(y.a,{min:0,max:1,step:.01,value:t.value,onChange:t.handleChange,"aria-labelledby":"continuous-slider"}),Object(k.jsx)(S.a,{className:"mx-3"})]})}var E=a(43),F=a.n(E);function q(t){var e=Object(l.useState)(0),a=Object(r.a)(e,2),n=a[0],c=a[1],s=Object(l.useState)(0),i=Object(r.a)(s,2),j=i[0],u=i[1],d=Object(l.useRef)(null),b=Object(l.useRef)(null),x=Object(l.useState)(!1),f=Object(r.a)(x,2),p=f[0],h=f[1],m=Object(l.useRef)(null),g=j>n;function _(){u(b.current.scrollWidth),c(d.current.clientWidth)}Object(l.useEffect)((function(){t.text&&d.current&&b.current&&window.addEventListener("resize",_)}),[t.text,d.current,b.current]),Object(l.useEffect)((function(){p&&h(!1)}),[p]);var y=3*t.text.length/12;return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("div",{ref:d,className:O()(F.a.calc),children:Object(k.jsxs)("span",{ref:b,children:[t.text," - "]})}),Object(k.jsx)("div",{ref:m,className:O()(F.a.marquee,Object(o.a)({},F.a.active,g)),onTransitionEnd:function(){return h(!p)},style:{transitionDuration:"".concat(p?0:y,"s"),transform:"translate(-".concat(p||!g?0:j,"px)")},children:g?"".concat(t.text," - ").concat(t.text," - ").concat(t.text):t.text})]})}var J=a(8),I=a.n(J);function V(t){var e=function(){var t=Object(l.useState)(null),e=Object(r.a)(t,2),a=e[0],n=e[1],c=Object(l.useState)(!1),s=Object(r.a)(c,2),i=s[0],o=s[1],j=Object(l.useState)(!0),u=Object(r.a)(j,2),d=u[0],b=u[1];return{audio:a,ref:Object(l.useCallback)((function(t){null!==t&&(t.onplay=function(){return o(!0)},t.onpause=function(){return o(!1)},t.onloadstart=function(){return b(!0)},t.waiting=function(){return b(!0)},t.onloadeddata=function(){return b(!1)},t.canplay=function(){return b(!1)},t.playing=function(){return b(!1)},n(t))}),[]),playing:i,loading:d}}(),a=e.audio,n=e.ref,c=e.playing,s=Object(x.a)("https://".concat(window.location.hostname,"/api/meta")),b=Object(r.a)(s,1)[0].data,f=Object(l.useState)(.5),p=Object(r.a)(f,2),_=p[0],y=p[1],v=Object(l.useState)({album:"The Best Videogame Music 24/7",title:"",artist:""}),w=Object(r.a)(v,2),N=w[0],S=w[1];return Object(l.useEffect)((function(){return a&&(a.src="https://play.sittingonclouds.net/".concat(t.station),a.load(),a.play()),h(),g(t.station,(function(t){return S(t)})),function(){m()}}),[t.station]),Object(k.jsxs)(j.a,{className:O()(I.a.player,"text-center px-2 px-md-0 h-100 d-flex align-items-center justify-content-center flex-column"),children:[Object(k.jsx)("audio",{ref:n,preload:"none",id:"erplayer-audio",src:"https://play.sittingonclouds.net/".concat(t.station),volume:_}),Object(k.jsxs)("div",{className:I.a.background,children:[Object(k.jsx)("div",{className:I.a.effect}),Object(k.jsx)("img",{src:"https://".concat(window.location.hostname,"/covers/").concat(N.album,".jpg"),onError:function(e){e.target.src="/images/logo/soc_".concat(t.station,".png")},alt:""})]}),Object(k.jsx)(u.a,{className:O()(I.a.content,"justify-content-center my-1 w-100"),children:t.icon&&Object(k.jsx)(d.a,{xs:"auto",children:Object(k.jsx)("div",{className:I.a.station,children:Object(k.jsx)("img",{src:"/images/station/station_".concat(t.station,".png"),alt:""})})})}),Object(k.jsx)(u.a,{className:O()(I.a.content,"justify-content-center w-100"),children:Object(k.jsxs)(d.a,{xs:"auto",children:[Object(k.jsx)(u.a,{style:{height:"".concat(60,"%"),fontSize:"24px"},children:Object(k.jsx)(d.a,{className:I.a.data,children:Object(k.jsx)(q,{text:"".concat(N.artist," - ").concat(N.title)})})}),Object(k.jsx)(u.a,{style:{height:"".concat(40,"%"),fontSize:"16px"},children:Object(k.jsx)(d.a,{className:I.a.data,children:Object(k.jsx)(q,{text:N.album})})})]})}),Object(k.jsx)(u.a,{className:"my-1",children:Object(k.jsx)(d.a,{children:Object(k.jsx)("span",{className:I.a.stations,children:b&&Object.keys(b).filter((function(t){return"undefined"!==t})).map((function(e,a,n){return Object(k.jsxs)(l.Fragment,{children:[e===t.station?Object(k.jsx)("span",{className:I.a.current,children:e}):Object(k.jsx)(i.A,{disabled:!0,href:"".concat(t.base,"/").concat(e),children:e}),n.length-1!==a&&" - "]},e)}))})})}),Object(k.jsx)(u.a,{className:"mt-1 w-100 justify-content-center",children:Object(k.jsx)(d.a,{xs:12,md:4,children:Object(k.jsxs)(u.a,{className:"justify-content-center",children:[Object(k.jsx)(d.a,{md:12,children:Object(k.jsx)(C,{handleChange:function(t,e){a.volume=e,y(e)},value:_})}),Object(k.jsx)(d.a,{xs:"auto",className:"mt-3",children:Object(k.jsx)("div",{onClick:function(){c?a.pause():(a.load(),a.play())},className:O()(I.a.playpause,Object(o.a)({},I.a.playing,c)),children:Object(k.jsx)("label",{htmlFor:I.a.playpause,tabIndex:1})})})]})})})]})}var A=a(7),R=a.n(A);function T(t){var e=function(){var t=Object(l.useState)(null),e=Object(r.a)(t,2),a=e[0],n=e[1],c=Object(l.useState)(!1),s=Object(r.a)(c,2),i=s[0],o=s[1],j=Object(l.useState)(!0),u=Object(r.a)(j,2),d=u[0],b=u[1];return{audio:a,ref:Object(l.useCallback)((function(t){null!==t&&(t.onplay=function(){return o(!0)},t.onpause=function(){return o(!1)},t.onloadstart=function(){return b(!0)},t.waiting=function(){return b(!0)},t.onloadeddata=function(){return b(!1)},t.canplay=function(){return b(!1)},t.playing=function(){return b(!1)},n(t))}),[]),playing:i,loading:d}}(),a=e.audio,n=e.ref,c=e.playing,s=Object(x.a)("https://".concat(window.location.hostname,"/api/meta")),b=Object(r.a)(s,1)[0].data,f=Object(l.useState)(.5),p=Object(r.a)(f,2),_=p[0],y=p[1],v=Object(l.useState)({album:"The Best Videogame Music 24/7",title:"",artist:""}),w=Object(r.a)(v,2),N=w[0],S=w[1];return Object(l.useEffect)((function(){return a&&(a.src="https://play.sittingonclouds.net/".concat(t.station),a.load(),a.play()),h(),g(t.station,(function(t){return S(t)})),function(){m()}}),[t.station]),Object(k.jsxs)(j.a,{className:O()(R.a.player,"text-center px-2 px-md-0 h-100 d-flex align-items-center justify-content-center flex-column"),children:[Object(k.jsx)("audio",{ref:n,preload:"none",id:"erplayer-audio",src:"https://play.sittingonclouds.net/".concat(t.station),volume:_}),Object(k.jsxs)("div",{className:R.a.background,children:[Object(k.jsx)("div",{className:R.a.effect}),Object(k.jsx)("img",{src:"https://".concat(window.location.hostname,"/covers/").concat(N.album,".jpg"),onError:function(e){e.target.src="/images/logo/soc_".concat(t.station,".png")},alt:""})]}),Object(k.jsx)(u.a,{className:O()(R.a.content,"justify-content-center my-2 w-100"),children:Object(k.jsx)(d.a,{xs:"auto",children:Object(k.jsx)("div",{className:R.a.station,children:Object(k.jsx)("img",{src:"/images/station/station_".concat(t.station,".png"),alt:""})})})}),Object(k.jsx)(u.a,{className:O()(R.a.content,"justify-content-center w-100"),children:Object(k.jsxs)(d.a,{xs:"auto",children:[Object(k.jsx)(u.a,{style:{height:"".concat(40,"%"),fontSize:"45px"},children:Object(k.jsx)(d.a,{className:R.a.data,children:Object(k.jsx)(q,{text:N.artist})})}),Object(k.jsx)(u.a,{style:{height:"".concat(40,"%"),fontSize:"45px"},children:Object(k.jsx)(d.a,{className:R.a.data,children:Object(k.jsx)(q,{text:N.title})})}),Object(k.jsx)(u.a,{style:{height:"".concat(20,"%"),fontSize:"25px"},children:Object(k.jsx)(d.a,{className:R.a.data,children:Object(k.jsx)(q,{text:N.album})})})]})}),Object(k.jsx)(u.a,{className:"my-4",children:Object(k.jsx)(d.a,{children:Object(k.jsxs)("span",{className:R.a.stations,children:["Available stations: ",Object(k.jsx)("br",{className:"d-block d-md-none"}),b&&Object.keys(b).filter((function(t){return"undefined"!==t})).map((function(e,a,n){return Object(k.jsxs)(l.Fragment,{children:[e===t.station?Object(k.jsx)("span",{className:R.a.current,children:e}):Object(k.jsx)(i.A,{disabled:!0,href:"/".concat(e),children:e}),n.length-1!==a&&" - "]},e)}))]})})}),Object(k.jsx)(u.a,{className:"mt-4 w-100 justify-content-center",children:Object(k.jsx)(d.a,{xs:12,md:4,children:Object(k.jsxs)(u.a,{className:"justify-content-center",children:[Object(k.jsx)(d.a,{md:12,children:Object(k.jsx)(C,{handleChange:function(t,e){a.volume=e,y(e)},value:_})}),Object(k.jsx)(d.a,{xs:"auto",className:"mt-3",children:Object(k.jsx)("div",{onClick:function(){c?a.pause():(a.load(),a.play())},className:O()(R.a.playpause,Object(o.a)({},R.a.playing,c)),children:Object(k.jsx)("label",{htmlFor:R.a.playpause,tabIndex:1})})})]})})})]})}var Z=a(86),B=(a(158),a(159),{"/board":function(){return Object(k.jsx)(V,{station:"clouds",icon:!1,base:"/board"})},"/board/:station":function(t){var e=t.station;return Object(k.jsx)(V,{station:e,icon:!1,base:"/board"})},"/widget":function(){return Object(k.jsx)(V,{station:"clouds",icon:!0,base:"/widget"})},"/widget/:station":function(t){var e=t.station;return Object(k.jsx)(V,{station:e,icon:!0,base:"/widget"})},"/":function(){return Object(k.jsx)(T,{station:"clouds"})},"/:station":function(t){var e=t.station;return Object(k.jsx)(T,{station:e})}}),D=function(){var t=Object(i.useRoutes)(B);return Object(k.jsx)(Z.a,{children:t})||Object(k.jsx)("script",{children:window.location.href="/404.html"})};s.a.render(Object(k.jsx)(D,{}),document.getElementById("root"))},43:function(t,e,a){t.exports={marquee:"marquee_marquee__1MS_n",calc:"marquee_calc__Tmz0p",active:"marquee_active__fKjlF"}},7:function(t,e,a){t.exports={player:"player_player__3tV8g",current:"player_current__mOoWV",stations:"player_stations__1tZXQ",background:"player_background__2a6F5",effect:"player_effect__3GAgQ",station:"player_station__z1nJz",content:"player_content__2HaZS",data:"player_data__2_vJs",playpause:"player_playpause__3uP9O",playing:"player_playing__N2IaC"}},8:function(t,e,a){t.exports={player:"widget_player__1r28i",current:"widget_current__1zF5V",stations:"widget_stations__3kOEF",background:"widget_background__1yy9P",effect:"widget_effect__2nXGx",station:"widget_station__2iPJJ",content:"widget_content__3Gh7b",data:"widget_data__vI8h8",playpause:"widget_playpause__1b3Zg",playing:"widget_playing__20bZ1"}}},[[161,1,2]]]);
//# sourceMappingURL=main.0d5e0194.chunk.js.map