(this.webpackJsonpsocradio_web_react=this.webpackJsonpsocradio_web_react||[]).push([[0],{112:function(e,t){},115:function(e,t,a){},138:function(e,t,a){},141:function(e,t,a){},142:function(e,t,a){"use strict";a.r(t);var n,s=a(70),r=a.n(s),i=a(31),c=a(4),l=a(2),o=a(143),u=a(144),d=a(145),p=a(33),j=a(32),m=a.n(j),b=function(){n=m()("/api"),console.log("Connecting socket...")},y=function(){console.log("Disconnecting socket..."),n&&n.disconnect()},_=function(e,t){n.on(e,t)},g=a(14),h=a(5),O=a.n(h),f=a(6),x=a.n(f),v=(a(115),a(10)),N=a(11),k=a(13),S=a(12),w=a(16),A=a(24),C=a(1),B=function(e){Object(k.a)(a,e);var t=Object(S.a)(a);function a(){return Object(v.a)(this,a),t.apply(this,arguments)}return Object(N.a)(a,[{key:"render",value:function(){return Object(C.jsx)("div",{className:"config-list",children:Object(C.jsx)("div",{className:"config-row",onClick:this.props.onHandleBG,children:Object(C.jsx)("div",{className:"config-icon",children:Object(C.jsx)(A.b,{id:"swapBG",style:{height:"30px",width:"30px"}})})})})}}]),a}(l.Component),G=a(22);function E(e){var t=e.station,a=Object(l.useState)(!1),n=Object(c.a)(a,2),s=n[0],r=n[1],o=Object(l.useState)([]),u=Object(c.a)(o,2),d=u[0],p=u[1],j=Object(G.a)("/api/meta"),m=Object(c.a)(j,1)[0],b=m.data,y=m.error,g=Object(l.useState)({}),h=Object(c.a)(g,2),O=h[0],f=h[1];return Object(l.useEffect)((function(){b&&p(Object.keys(b))}),[b]),Object(l.useEffect)((function(){d.length>0&&d.forEach((function(e){return _(e,(function(e){var t=O;O[e.source]=e,f(t)}))}))}),[d]),y&&console.log(y),Object(C.jsxs)("div",{className:"config-list",children:[Object(C.jsx)("div",{className:"config-row",children:Object(C.jsx)("div",{className:"config-icon",onClick:function(){return r(!s)},children:s?Object(C.jsx)(A.a,{style:{height:"30px",width:"30px"}}):Object(C.jsx)(A.c,{style:{height:"30px",width:"30px"}})})}),s?d.filter((function(e){return e!==t})).map((function(e){return Object(C.jsxs)("div",{className:"config-row",children:[O[e]&&Object(C.jsxs)("div",{className:"config-label",children:["Now Playing: ","".concat(O[e].artist," - ").concat(O[e].title)]}),Object(C.jsx)("img",{className:"config-img",alt:"station logo",src:"/images/station/station_".concat(e,".png"),onClick:function(){return Object(i.navigate)("/".concat(e))}})]},e)})):null]})}a(138);var I=function(e){Object(k.a)(a,e);var t=Object(S.a)(a);function a(){return Object(v.a)(this,a),t.apply(this,arguments)}return Object(N.a)(a,[{key:"render",value:function(){return Object(C.jsxs)("div",{className:"config",children:[Object(C.jsx)(E,{station:this.props.station,onStation:this.props.handleStation}),Object(C.jsx)(B,{onHandleBG:this.props.handleBG})]})}}]),a}(l.Component),D=function(e){Object(k.a)(a,e);var t=Object(S.a)(a);function a(){return Object(v.a)(this,a),t.apply(this,arguments)}return Object(N.a)(a,[{key:"render",value:function(){var e=w[this.props.station][this.props.index]||(this.props.index<0?w[this.props.station][w[this.props.station].length-1]:w[this.props.station][0]);switch(e.endsWith(".mp4")?"video":"image"){case"video":return Object(C.jsx)("video",{className:x.a.BG,autoPlay:!0,muted:!0,loop:!0,id:this.props.id,children:Object(C.jsx)("source",{src:e,type:"video/mp4"})});default:return Object(C.jsx)("div",{className:x.a.BG,id:this.props.id,style:{backgroundImage:'url("'.concat(e,'")')}})}}}]),a}(l.Component),M=function(e){Object(k.a)(a,e);var t=Object(S.a)(a);function a(){var e;Object(v.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={anim:"stale",bgIndex:Math.floor(Math.random()*w[e.props.station].length)},e.updateBG=function(){"running"!==e.state.anim&&e.setState({anim:"running"},(function(){e.bgdrag.play()}))},e}return Object(N.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.bgdrag=Object(g.a)({targets:"#".concat(x.a.newBG),duration:1100,translateX:"100%",easing:"spring(1, 80, 10, 0)",autoplay:!1,complete:function(t){var a=e.state.bgIndex;a+1>=w[e.props.station].length?a=0:a++,e.setState({anim:"stale",bgIndex:a},(function(){t.reset()}))}})}},{key:"render",value:function(){return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(I,{station:this.props.station,handleBG:this.updateBG.bind(this)}),Object(C.jsx)(D,{id:x.a.currentBG,station:this.props.station,index:this.state.bgIndex}),Object(C.jsx)(D,{id:x.a.newBG,station:this.props.station,index:this.state.bgIndex+1})]})}}]),a}(l.Component),P=["Riku's radio extravaganza","Kobayashi's homemade playlist","Ayanami's Anime Socks","Ritsu's tightly locked treasure"];function F(e){var t=e.station,a=Object(l.useRef)(null),n=function(){var e=Object(l.useState)(null),t=Object(c.a)(e,2),a=t[0],n=t[1],s=Object(l.useState)(!1),r=Object(c.a)(s,2),i=r[0],o=r[1],u=Object(l.useState)(!0),d=Object(c.a)(u,2),p=d[0],j=d[1];return{audio:a,ref:Object(l.useCallback)((function(e){null!==e&&(e.onplay=function(){return o(!0)},e.onpause=function(){return o(!1)},e.onloadstart=function(){return j(!0)},e.waiting=function(){return j(!0)},e.onloadeddata=function(){return j(!1)},e.canplay=function(){return j(!1)},e.playing=function(){return j(!1)},n(e))}),[]),playing:i,loading:p}}(),s=n.audio,r=n.ref,i=n.playing,j=Object(l.useState)(.5),m=Object(c.a)(j,2),h=m[0],f=m[1],v=Object(l.useState)({album:"Press the Play button to start the radio",title:P[Math.floor(Math.random()*P.length)]}),N=Object(c.a)(v,2),k=N[0],S=N[1];function w(){i?s.pause():(s.load(),s.play())}return Object(l.useEffect)((function(){return s&&(s.src="https://play.squid-radio.net/".concat(t),s.load(),i&&s.play()),b(),_(t,(function(e){return S(e)})),y}),[t]),Object(l.useEffect)((function(){var e=Object(g.a)({targets:".".concat(x.a.record," img"),rotate:"1turn",loop:!0,duration:1500,easing:"linear",autoplay:!1});a.current={begin:Object(g.a)({targets:".".concat(x.a.record," img"),rotate:"180deg",duration:2e3,easing:"easeInCubic",autoplay:!1,complete:e.play}),end:Object(g.a)({begin:e.pause,targets:".".concat(x.a.record," img"),rotate:"360deg",duration:2e3,easing:"easeOutBack",autoplay:!1})}}),[]),Object(l.useEffect)((function(){i?a.current.begin.play():a.current.end.play()}),[i]),Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)("audio",{ref:r,preload:"none",src:"https://play.squid-radio.net/".concat(t),volume:h}),Object(C.jsx)(M,{station:t}),Object(C.jsx)(o.a,{className:"d-flex",children:Object(C.jsxs)("div",{className:O()(x.a.radio,"my-auto mx-md-auto"),children:[Object(C.jsx)(u.a,{children:Object(C.jsxs)(d.a,{xs:12,className:O()(x.a.images,"d-flex p-0"),children:[Object(C.jsx)("div",{className:x.a.cover,children:Object(C.jsx)("img",{onError:function(e){e.target.src="images/logo/soc_".concat(t,".png")},src:"covers/".concat(k.album,".jpg"),alt:""})}),Object(C.jsx)("div",{className:O()("flex-grow-1",x.a.record),children:Object(C.jsx)("img",{src:"/images/record/record_".concat(t,".png"),alt:""})})]})}),Object(C.jsx)(u.a,{children:Object(C.jsx)(d.a,{xs:12,className:x.a.songData,children:Object(C.jsxs)(u.a,{children:[Object(C.jsxs)(d.a,{children:[Object(C.jsx)("span",{className:"text-truncate",id:"premidTitle",children:k.title}),Object(C.jsx)("p",{className:"text-truncate",id:"premidArtist",children:k.artist}),Object(C.jsx)("p",{className:"text-truncate",id:"premidAlbum",children:k.album})]}),Object(C.jsx)("div",{className:x.a.cardPlay,children:Object(C.jsx)("i",{className:"card-icon",id:"playPauseIcon",children:0===h?Object(C.jsx)(p.c,{onClick:w}):i?Object(C.jsx)(p.a,{onClick:w}):Object(C.jsx)(p.b,{onClick:w})})}),Object(C.jsx)(d.a,{xs:"auto",className:"d-flex",children:Object(C.jsx)(T,{volume:h,setVolume:function(e){s.volume=e,f(e)}})})]})})})]})})]})}function T(e){var t=e.volume,a=e.setVolume,n=Object(l.useState)(!1),s=Object(c.a)(n,2),r=s[0],i=s[1],o=Object(l.useRef)(null);function u(e){var t=(e-o.current.getBoundingClientRect().left)/o.current.getBoundingClientRect().width;t>1&&(t=1),t<0&&(t=0),a(t)}function d(e){i(!1),u(e.pageX)}function p(e){u(e.pageX)}return Object(l.useEffect)((function(){return r&&(window.addEventListener("mouseup",d),window.addEventListener("mousemove",p)),function(){window.removeEventListener("mouseup",d),window.removeEventListener("mousemove",p)}}),[r]),Object(C.jsx)("div",{className:"align-self-center",children:Object(C.jsx)("div",{className:"switch",children:Object(C.jsx)("div",{className:x.a.volume,title:"Set volume",ref:o,onMouseDown:function(e){i(!0),u(e.pageX)},children:Object(C.jsx)("span",{style:{width:"".concat(100*t,"%")},className:x.a.bar})})})})}var R=a(9),q=a.n(R),K=a(72),z=a.n(K),L=["Riku's radio extravaganza","Kobayashi's homemade playlist","Ayanami's Anime Socks","Ritsu's tightly locked treasure"];function U(e){if("mediaSession"in navigator){var t="https://squid-radio.net/covers/".concat(e.album,".jpg");navigator.mediaSession.metadata=new MediaMetadata({title:e.title,artist:e.artist,album:e.album,artwork:[{src:t,sizes:"96x96",type:"image/jpg"},{src:t,sizes:"128x128",type:"image/jpg"},{src:t,sizes:"192x192",type:"image/jpg"},{src:t,sizes:"256x256",type:"image/jpg"},{src:t,sizes:"384x384",type:"image/jpg"},{src:t,sizes:"512x512",type:"image/jpg"}]})}}var H=function(e){Object(k.a)(a,e);var t=Object(S.a)(a);function a(){var e;Object(v.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={songData:{album:"Press the Play button to start the radio",title:L[Math.floor(Math.random()*L.length)]},currentArt:"/images/logo/soc_".concat(e.props.station,".png"),min:!1,maxWidth:800},e.minTimeout=null,e.startSocket=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e.socket=m()("/api"),e.socket.on(e.props.station,e.handleSong),e.socket.emit("station",{station:e.props.station}),e.startAudio(),t&&t()},e.startAudio=function(){e.audio=new Audio("https://play.squid-radio.net/".concat(e.props.station,"?cache_ts=").concat((new Date).getTime())),e.audio.onpause=function(){e.setState({playing:!1}),e.spin.pause(),Object(g.a)({targets:".vinyl",rotate:"180deg",duration:2e3,easing:"easeOutBack",autoplay:!0})},e.audio.onplay=function(){if(!e.state.started){U(e.state.songData);var t="https://squid-radio.net/covers/".concat(e.state.songData.album,".jpg");setTimeout((function(){e.setState({currentArt:t})}),1500)}e.setState({started:!0}),e.setState({playing:!0})},e.audio.onended=function(){console.log("Stream Ended. Restarting"),e.startAudio()},e.audio.loop=!1,e.audio.play(),e.audio.volume=1},e.handlePlay=function(){e.state.playing?e.audio.pause():(e.audio.load(),e.audio.play(),e.audio.volume=1)},e.handleSong=function(t){if(console.log(t),null!==t&&e.state.started){e.setState({songData:t,min:!1}),U(t);var a="https://squid-radio.net/covers/".concat(t.album,".jpg");setTimeout((function(){e.setState({currentArt:a})}),1500),clearTimeout(e.minTimeout),e.cycleHide()}},e}return Object(N.a)(a,[{key:"cycleHide",value:function(){var e=this;clearTimeout(this.minTimeout),this.minTimeout=setTimeout((function(){return e.setState({min:!e.state.min},e.cycleHide)}),this.state.min?2e4:5e4)}},{key:"componentDidMount",value:function(){var e=this;this.spin=Object(g.a)({targets:".".concat(q.a.vinyl),rotate:"1turn",loop:!0,duration:1500,easing:"linear",autoplay:!0}),this.startSocket(),setInterval((function(){return e.setState({maxWidth:z()(".".concat(q.a["music-player"])).outerWidth()})}),1e3)}},{key:"render",value:function(){return Object(C.jsx)(o.a,{fluid:!0,children:Object(C.jsxs)("div",{className:V("music-player-container",this.state.min?"min":""),children:[Object(C.jsx)("div",{className:V("music-player"),children:Object(C.jsxs)("div",{className:q.a["song-data"],children:[Object(C.jsx)("h1",{className:q.a["artist-name"],children:this.state.songData.artist}),Object(C.jsx)("h2",{className:q.a["song-title"],children:this.state.songData.title}),Object(C.jsx)("h3",{className:q.a["album-title"],children:this.state.songData.album})]})}),Object(C.jsx)("div",{className:q.a["album-container"],children:Object(C.jsxs)("div",{className:q.a["album-box"],style:{left:this.state.min?"-".concat(this.state.maxWidth-5,"px"):null},children:[Object(C.jsx)("div",{style:{backgroundImage:'url("https://squid-radio.net/covers/'.concat(this.state.songData.album,'.jpg"), url("/images/logo/soc_').concat(this.props.station,'.png")')},className:V("album-art")}),Object(C.jsx)("div",{className:q.a.vinyl,style:{backgroundImage:'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/83141/vinyl.png"), url("/images/station/station_'.concat(this.props.station,'.png")')}})]})})]})})}}]),a}(l.Component);function V(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return t.map((function(e){return q.a[e]||e})).join(" ")}a(45),a(46);function J(){var e=Object(l.useState)(!1),t=Object(c.a)(e,2),a=t[0],n=t[1],s=function(){var e=Object(l.useState)(null),t=Object(c.a)(e,2),a=t[0],n=t[1],s=Object(l.useState)(!1),r=Object(c.a)(s,2),i=r[0],o=r[1],u=Object(l.useState)(!0),d=Object(c.a)(u,2),p=d[0],j=d[1];return{audio:a,ref:Object(l.useCallback)((function(e){null!==e&&(e.onplay=function(){return o(!0)},e.onpause=function(){return o(!1)},e.onloadstart=function(){return j(!0)},e.waiting=function(){return j(!0)},e.onloadeddata=function(){return j(!1)},e.canplay=function(){return j(!1)},e.playing=function(){return j(!1)},n(e))}),[]),playing:i,loading:p}}(),r=s.audio,i=s.ref,o=s.playing,u=s.loading,d=Object(l.useState)(.5),p=Object(c.a)(d,2),j=p[0],m=p[1],g=Object(l.useState)("clouds"),h=Object(c.a)(g,2),f=h[0],x=h[1],v=Object(l.useState)({album:"The Best Videogame Music 24/7",title:"",artist:""}),N=Object(c.a)(v,2),k=N[0],S=N[1],w=Object(G.a)("/api/meta"),A=Object(c.a)(w,1)[0],B=A.data,E=A.error;function I(){o?r.pause():(r.load(),r.play())}return Object(l.useEffect)((function(){return r&&(r.src="https://play.squid-radio.net/".concat(f),r.load(),r.play()),b(),_(f,(function(e){return S(e)})),function(){y()}}),[f]),E&&console.log(E),Object(C.jsx)("div",{className:O()("erplayer  erplayer--card erplayer--inline erplayer-- erplayer-- erplayer--open-",{"erplayer-playlist-open":a}),id:"erplayer-id-e390574",children:Object(C.jsx)("div",{className:"h-100 erplayer-content",children:Object(C.jsxs)("div",{className:"h-100 erplayer__container",style:{opacity:1},children:[Object(C.jsx)("audio",{ref:i,preload:"none",id:"erplayer-audio",src:"https://play.squid-radio.net/clouds",volume:j}),Object(C.jsx)("div",{className:"erplayer__bgcolor"}),Object(C.jsx)("div",{className:"erplayer__background",children:Object(C.jsx)("img",{src:"https://squid-radio.net/covers/".concat(k.album,".jpg"),alt:""})}),Object(C.jsx)("div",{className:"erplayer__wrapper",children:Object(C.jsxs)("div",{className:"erplayer__wrapper__container",children:[Object(C.jsxs)("div",{className:"erplayer__info mb-2",children:[Object(C.jsx)("div",{className:"erplayer__info__cover",children:Object(C.jsx)("img",{src:"https://www.squid-radio.net/images/station/station_".concat(f,".png"),alt:""})}),Object(C.jsx)("h3",{className:"erplayer__info__title erplayer-marquee",children:Object(C.jsx)("div",{className:"inner",children:[1,2,3,4].map((function(e){return Object(C.jsxs)("span",{className:"mr-3",children:[k.artist," - ",k.title]},e)}))})}),Object(C.jsx)("h4",{className:"erplayer__info__artist erplayer-marquee mt-3",children:Object(C.jsx)("div",{className:"inner",children:[1,2,3,4].map((function(e){return Object(C.jsx)("span",{className:"mr-3",children:k.album},e)}))})})]}),Object(C.jsxs)("div",{className:O()("erplayer__controls mt-4",{"erplayer-playing":o}),children:[Object(C.jsxs)("div",{className:"erplayer__slidercontrol erplayer__slidercontrol--progressbar",children:[Object(C.jsx)("span",{className:"erplayer__timer",children:"--:--"}),Object(C.jsxs)("div",{className:"erplayer__progressbar erplayer__slidercontrol__slider disabled",children:[Object(C.jsx)("div",{className:"erplayer__slidercontrol__bar erplayer__playhead",style:{width:"49px"}}),Object(C.jsx)("div",{className:"erplayer__slidercontrol__bar erplayer__bufferhead",style:{width:"0px"}}),Object(C.jsx)("div",{className:"erplayer__slidercontrol__trackbar"}),Object(C.jsx)("input",{type:"range",className:"erplayer__slidercontrol__input",min:"0",max:"1",step:"0.005",defaultValue:"0"})]}),Object(C.jsx)("span",{className:"erplayer__duration"})]}),Object(C.jsx)("span",{onClick:I,className:"erplayer__btn erplayer__play",children:Object(C.jsx)("i",{className:"erplayer-icon-play"})}),Object(C.jsx)("span",{onClick:I,className:O()("erplayer__btn erplayer__pause",{loading:u}),style:{pointerEvents:"initial"},children:Object(C.jsx)("i",{className:"erplayer-icon-pause",style:{opacity:1}})}),Object(C.jsxs)("div",{style:{position:"absolute",bottom:"3px",right:"3px",zIndex:100},className:"mt-2 erplayer__slidercontrol erplayer__slidercontrol--volume",children:[Object(C.jsx)("span",{className:"erplayer__btn erplayer__mute",children:Object(C.jsx)("i",{className:"erplayer-icon-volume"})}),Object(C.jsxs)("div",{className:"erplayer__slidercontrol__slider",children:[Object(C.jsx)("div",{className:"erplayer__volume-bar erplayer__slidercontrol__bar",style:{width:"".concat(100*j,"%")}}),Object(C.jsx)("div",{className:"erplayer__slidercontrol__trackbar"}),Object(C.jsx)("input",{type:"range",className:"erplayer__volume-input erplayer__slidercontrol__input",min:"0",max:"1",step:"0.01",defaultValue:.5,onChange:function(e){return t=e.target.value,r.volume=t,void m(t);var t}})]})]})]})]})}),Object(C.jsxs)("span",{onClick:function(){return n(!a)},className:O()("erplayer__btn erplayer__openplaylist",{open:a}),children:[Object(C.jsx)("i",{className:"erplayer-icon-menu erplayer-openicon"}),Object(C.jsx)("i",{className:"erplayer-icon-cancel erplayer-closeicon"})]}),Object(C.jsx)("div",{className:O()("erplayer__playlist",{open:a}),children:Object(C.jsx)("ul",{children:B&&Object.keys(B).map((function(e){return Object(C.jsxs)("li",{children:[Object(C.jsxs)("span",{className:"erplayer__btn erplayer__playlist__cover",onClick:function(){return x(e)},children:[Object(C.jsx)("img",{src:"https://www.squid-radio.net/images/station/station_".concat(e,".png"),alt:"cover"}),Object(C.jsx)("i",{className:"erplayer-icon-play erplayer-playIcon"}),Object(C.jsx)("i",{className:"erplayer-icon-pause erplayer-pauseIcon"})]}),Object(C.jsx)("h5",{children:(t=e,"string"!==typeof t?"":t.trim().replace(/^\w/,(function(e){return e.toUpperCase()})))})]},e);var t}))})})]})})})}function W(){var e=Object(l.useState)(!1),t=Object(c.a)(e,2),a=t[0],n=t[1],s=function(){var e=Object(l.useState)(null),t=Object(c.a)(e,2),a=t[0],n=t[1],s=Object(l.useState)(!1),r=Object(c.a)(s,2),i=r[0],o=r[1],u=Object(l.useState)(!0),d=Object(c.a)(u,2),p=d[0],j=d[1];return{audio:a,ref:Object(l.useCallback)((function(e){null!==e&&(e.onplay=function(){return o(!0)},e.onpause=function(){return o(!1)},e.onloadstart=function(){return j(!0)},e.waiting=function(){return j(!0)},e.onloadeddata=function(){return j(!1)},e.canplay=function(){return j(!1)},e.playing=function(){return j(!1)},n(e))}),[]),playing:i,loading:p}}(),r=s.audio,i=s.ref,o=s.playing,u=s.loading,d=Object(l.useState)(.5),p=Object(c.a)(d,2),j=p[0],m=p[1],g=Object(l.useState)("clouds"),h=Object(c.a)(g,2),f=h[0],x=h[1],v=Object(l.useState)({album:"The Best Videogame Music 24/7",title:"",artist:""}),N=Object(c.a)(v,2),k=N[0],S=N[1],w=Object(G.a)("/api/meta"),A=Object(c.a)(w,1)[0],B=A.data,E=A.error;function I(){o?r.pause():(r.load(),r.play())}return Object(l.useEffect)((function(){return r&&(r.src="https://play.squid-radio.net/".concat(f),r.load(),r.play()),b(),_(f,(function(e){return S(e)})),function(){y()}}),[f]),E&&console.log(E),Object(C.jsx)("div",{className:O()("erplayer  erplayer--card erplayer--inline erplayer-- erplayer-- erplayer--open-",{"erplayer-playlist-open":a}),id:"erplayer-id-e390574",children:Object(C.jsx)("div",{className:"h-100 erplayer-content",children:Object(C.jsxs)("div",{className:"h-100 erplayer__container",style:{opacity:1},children:[Object(C.jsx)("audio",{ref:i,preload:"none",id:"erplayer-audio",src:"https://play.squid-radio.net/clouds",volume:j}),Object(C.jsx)("div",{className:"erplayer__bgcolor"}),Object(C.jsx)("div",{className:"erplayer__background",children:Object(C.jsx)("img",{src:"https://squid-radio.net/covers/".concat(k.album,".jpg"),alt:""})}),Object(C.jsx)("div",{className:"erplayer__wrapper py-3",children:Object(C.jsxs)("div",{className:"erplayer__wrapper__container h-100 w-100",children:[Object(C.jsxs)("div",{className:"erplayer__info",children:[Object(C.jsx)("h3",{className:"erplayer__info__title erplayer-marquee m-0",children:Object(C.jsx)("div",{className:"inner",children:[1,2,3,4].map((function(e){return Object(C.jsxs)("span",{className:"mr-3",children:[k.artist," - ",k.title]},e)}))})}),Object(C.jsx)("h4",{className:"erplayer__info__artist erplayer-marquee mt-3",children:Object(C.jsx)("div",{className:"inner",children:[1,2,3,4].map((function(e){return Object(C.jsx)("span",{className:"mr-3",children:k.album},e)}))})})]}),Object(C.jsxs)("div",{className:O()("erplayer__controls mt-4",{"erplayer-playing":o}),children:[Object(C.jsxs)("div",{className:"erplayer__slidercontrol erplayer__slidercontrol--progressbar",children:[Object(C.jsx)("span",{className:"erplayer__timer",children:"--:--"}),Object(C.jsxs)("div",{className:"erplayer__progressbar erplayer__slidercontrol__slider disabled",children:[Object(C.jsx)("div",{className:"erplayer__slidercontrol__bar erplayer__playhead",style:{width:"49px"}}),Object(C.jsx)("div",{className:"erplayer__slidercontrol__bar erplayer__bufferhead",style:{width:"0px"}}),Object(C.jsx)("div",{className:"erplayer__slidercontrol__trackbar"}),Object(C.jsx)("input",{type:"range",className:"erplayer__slidercontrol__input",min:"0",max:"1",step:"0.005",defaultValue:"0"})]})]}),Object(C.jsx)("span",{onClick:I,className:"erplayer__btn erplayer__play",children:Object(C.jsx)("i",{className:"erplayer-icon-play"})}),Object(C.jsx)("span",{onClick:I,className:O()("erplayer__btn erplayer__pause",{loading:u}),style:{pointerEvents:"initial"},children:Object(C.jsx)("i",{className:"erplayer-icon-pause",style:{opacity:1}})}),Object(C.jsxs)("div",{style:{position:"absolute",bottom:"3px",right:"3px",zIndex:100},className:"mt-2 erplayer__slidercontrol erplayer__slidercontrol--volume",children:[Object(C.jsx)("span",{className:"erplayer__btn erplayer__mute",children:Object(C.jsx)("i",{className:"erplayer-icon-volume"})}),Object(C.jsxs)("div",{className:"erplayer__slidercontrol__slider",children:[Object(C.jsx)("div",{className:"erplayer__volume-bar erplayer__slidercontrol__bar",style:{width:"".concat(100*j,"%")}}),Object(C.jsx)("div",{className:"erplayer__slidercontrol__trackbar"}),Object(C.jsx)("input",{type:"range",className:"erplayer__volume-input erplayer__slidercontrol__input",min:"0",max:"1",step:"0.01",defaultValue:.5,onChange:function(e){return t=e.target.value,r.volume=t,void m(t);var t}})]})]})]})]})}),Object(C.jsxs)("span",{onClick:function(){return n(!a)},className:O()("erplayer__btn erplayer__openplaylist",{open:a}),children:[Object(C.jsx)("i",{className:"erplayer-icon-menu erplayer-openicon"}),Object(C.jsx)("i",{className:"erplayer-icon-cancel erplayer-closeicon"})]}),Object(C.jsx)("div",{className:O()("erplayer__playlist",{open:a}),children:Object(C.jsx)("ul",{children:B&&Object.keys(B).map((function(e){return Object(C.jsxs)("li",{children:[Object(C.jsxs)("span",{className:"erplayer__btn erplayer__playlist__cover",onClick:function(){return x(e)},children:[Object(C.jsx)("img",{src:"https://www.squid-radio.net/images/station/station_".concat(e,".png"),alt:"cover"}),Object(C.jsx)("i",{className:"erplayer-icon-play erplayer-playIcon"}),Object(C.jsx)("i",{className:"erplayer-icon-pause erplayer-pauseIcon"})]}),Object(C.jsx)("h5",{children:(t=e,"string"!==typeof t?"":t.trim().replace(/^\w/,(function(e){return e.toUpperCase()})))})]},e);var t}))})})]})})})}var X=a(23),Y=a.n(X),Q={sonic:{album:"Sonic the Hedgehog Caf\xe9 Selection",date:"2017",track:"18/31",disc:"1/1",kind:"{audio=2;video=0;midi=0}",year:"2017",artist:"Marlon Saunders, Dred Foxx",decoder:"FFMPEG",title:"Unknown From M.E.",label:"SEGA",filename:"/home/rikumax/radio/music/Games/Sonic the Hedgehog/Sonic the Hedgehog Caf\xe9 Selection/18. Unknown From M.E..mp3",publisher:"SEGA",temporary:"false",source:"sonic",tracknumber:"18/31",initial_uri:"/home/rikumax/radio/music/Games/Sonic the Hedgehog/Sonic the Hedgehog Caf\xe9 Selection/18. Unknown From M.E..mp3",playlist_length:"1995",url:"http://sittingonclouds.net",status:"playing",discnumber:"1/1","release date":"Jun 23, 2017",albumartist:"SEGA",on_air:"2021/02/07 23:52:19",rid:"16",comment:"https://amzn.to/2CNO65U",genre:"Game Soundtrack",playlist_position:"0",album_artist:"SEGA"},persona:{replaygain_track_peak:"0.999939",album:"PERSONA SUPER LIVE P-SOUND BOMB !!!! 2017 \uff5e\u6e2f\u306e\u72af\u884c\u3092\u76ee\u6483\u305b\u3088!\uff5e",track:"6",date:"2018",disc:"1",disctotal:"2",kind:"{audio=2;video=0;midi=0}",artist:"Lyn & \u5ddd\u6751\u3086\u307f & \u5e73\u7530\u5fd7\u7a42\u5b50 & Lotus Juice",decoder:"FFMPEG",title:"/ Tokyo Emergency",filename:"/home/rikumax/radio/music/Games/Persona/PERSONA SUPER LIVE P-SOUND BOMB!!!! 2017 ~Minato no Hankou wo Mokugekiseyo!~ [FLAC]/Disc 1/1-06 Tokyo Emergency.flac",temporary:"false",source:"persona",tracknumber:"6",initial_uri:"/home/rikumax/radio/music/Games/Persona/PERSONA SUPER LIVE P-SOUND BOMB!!!! 2017 ~Minato no Hankou wo Mokugekiseyo!~ [FLAC]/Disc 1/1-06 Tokyo Emergency.flac",playlist_length:"2960",status:"playing",discnumber:"1",replaygain_track_gain:"-7.44 dB",replaygain_album_gain:"-9.15 dB",albumartist:"Atlus",on_air:"2021/02/07 23:53:25",tracktotal:"22",rid:"27",replaygain_album_peak:"1.000000",genre:"Game",playlist_position:"2",album_artist:"Atlus"},woomy:{composer:"Ryo Nagamatsu",album:"Splatoon 2 ORIGINAL SOUNDTRACK -Octotune-",date:"2018",track:"16/52",disc:"1/2",kind:"{audio=2;video=0;midi=0}",year:"2018",artist:"Dedf1sh",decoder:"FFMPEG",title:"#14 crush",label:"KADOKAWA",filename:"/home/rikumax/radio/music/Games/Splatoon/Splatoon 2 ORIGINAL SOUNDTRACK -Octotune-/Disc 1/1.16 #14 crush.mp3",publisher:"KADOKAWA",temporary:"false",source:"woomy",tracknumber:"16/52",initial_uri:"/home/rikumax/radio/music/Games/Splatoon/Splatoon 2 ORIGINAL SOUNDTRACK -Octotune-/Disc 1/1.16 #14 crush.mp3",playlist_length:"268",url:"http://sittingonclouds.net",status:"playing",discnumber:"1/2","release date":"Jul 18, 2018",albumartist:"KADOKAWA",on_air:"2021/02/07 23:52:32",rid:"21",comment:"http://sittingonclouds.net",genre:"Game Soundtrack",playlist_position:"0",album_artist:"KADOKAWA"},clouds:{replaygain_track_peak:"0.988708",composer:"Hitoshi Sakimoto",album:"FINAL FANTASY TACTICS A2 Grimoire of the Rift Original Soundtrack",track:"12",date:"2007/11/28",disc:"1",disctotal:"2",kind:"{audio=2;video=0;midi=0}",catalog:"SQEX-10102~3",artist:"Basiscape",decoder:"FFMPEG",title:"Luso",filename:"/home/rikumax/radio/music/Games/Final Fantasy/Side Game Series' Soundtracks & Other Albums/Final Fantasy Tactics A2 Grimoire of the Rift Original Soundtrack/Disc 1/12 - Luso.flac",temporary:"false",source:"clouds",tracknumber:"12",initial_uri:"/home/rikumax/radio/music/Games/Final Fantasy/Side Game Series' Soundtracks & Other Albums/Final Fantasy Tactics A2 Grimoire of the Rift Original Soundtrack/Disc 1/12 - Luso.flac",playlist_length:"35793",status:"playing",discnumber:"1",replaygain_track_gain:"-6.98 dB",replaygain_album_gain:"-6.02 dB",albumartist:"Hitoshi Sakimoto, Masaharu Iwata, Mitsuhiro Kaneda, Kimihiro Abe, Noriyuki Kamikura",on_air:"2021/02/07 23:53:14",tracktotal:"29",rid:"12",replaygain_album_peak:"0.988770",genre:"",comment:'Music Composed, Arranged & Produced\r\nby Hitoshi Sakimoto (Basiscape)\r\n\r\nexcept\tDisc 01-01: Composed by Nobuo Uematsu\r\nDisc 01-27: Composed by Kaori Oogoshi (SuperSweep)\r\nDisc 02-10: Composed by Ayako Sasou (SuperSweep)\r\nDisc 02-42: Composed by Mitsuhiro Kaneda (Basiscape)\r\n\r\nArranger: Masaharu Iwata (Basiscape), Mitsuhiro Kaneda (Basiscape), Kimihiro Abe (Basiscape), Noriyuki Kamikura (Basiscape)\r\n\r\n\r\n- Track 01-23 was printed as being from "Ritz" in the booklet but the official website later corrected it.\r\n\r\n- Track 02-03 is originally from the save/load menu theme of Final Fantasy Tactics Advance North American/Europe version.\r\n\r\n- The "Disc 02-42" part is a typo in the booklet itself (there are only 27 tracks on disc 2).\u3000',playlist_position:"2",album_artist:"Hitoshi Sakimoto, Masaharu Iwata, Mitsuhiro Kaneda, Kimihiro Abe, Noriyuki Kamikura"}};function Z(){var e=Object(l.useState)(!1),t=Object(c.a)(e,2),a=t[0],n=t[1],s=Object(l.useState)(Q),r=Object(c.a)(s,2),i=r[0],p=r[1],j=function(){var e=Object(l.useState)(null),t=Object(c.a)(e,2),a=t[0],n=t[1],s=Object(l.useState)(!1),r=Object(c.a)(s,2),i=r[0],o=r[1],u=Object(l.useState)(!0),d=Object(c.a)(u,2),p=d[0],j=d[1];return{audio:a,ref:Object(l.useCallback)((function(e){null!==e&&(e.onplay=function(){return o(!0)},e.onpause=function(){return o(!1)},e.onloadstart=function(){return j(!0)},e.waiting=function(){return j(!0)},e.onloadeddata=function(){return j(!1)},e.canplay=function(){return j(!1)},e.playing=function(){return j(!1)},n(e))}),[]),playing:i,loading:p}}(),m=j.audio,g=j.ref,h=(j.playing,j.loading,Object(l.useState)(.5)),f=Object(c.a)(h,2),x=f[0],v=(f[1],Object(l.useState)("clouds")),N=Object(c.a)(v,2),k=N[0],S=N[1],w=Object(l.useState)({album:"The Best Videogame Music 24/7",title:"",artist:""}),A=Object(c.a)(w,2),B=A[0],G=A[1];return Object(l.useEffect)((function(){Y.a.get("/api/meta").then((function(e){return p(e.data)}))}),[]),Object(l.useEffect)((function(){return m&&(m.src="https://play.squid-radio.net/".concat(k),m.load(),m.play()),b(),_(k,(function(e){return G(e)})),function(){y()}}),[k]),Object(C.jsx)("div",{className:O()("erplayer  erplayer--card erplayer--inline erplayer-- erplayer-- erplayer--open-",{"erplayer-playlist-open":a}),id:"erplayer-id-e390574",children:Object(C.jsx)("div",{className:"h-100 erplayer-content",children:Object(C.jsxs)("div",{className:"h-100 erplayer__container",style:{opacity:1},children:[Object(C.jsx)("audio",{ref:g,preload:"none",id:"erplayer-audio",src:"https://play.squid-radio.net/clouds",volume:x}),Object(C.jsx)("div",{className:"erplayer__background",children:Object(C.jsx)("img",{src:"https://squid-radio.net/covers/".concat(B.album,".jpg"),onError:function(e){e.target.src="/images/logo/soc_".concat(k,".png")},alt:""})}),Object(C.jsx)("div",{className:"erplayer__wrapper p-0",children:Object(C.jsx)(o.a,{fluid:!0,className:"erplayer__wrapper__container h-100",children:Object(C.jsx)(u.a,{className:"h-100",children:Object(C.jsx)(d.a,{className:"m-auto",md:10,children:a?Object(C.jsx)(u.a,{children:Object(C.jsx)(d.a,{children:i&&Object.keys(i).map((function(e){return Object(C.jsxs)(l.Fragment,{children:[Object(C.jsxs)("span",{style:{width:"80px",height:"80px"},className:"erplayer__btn erplayer__playlist__cover",onClick:function(){return S(e)},children:[Object(C.jsx)("img",{src:"/images/station/station_".concat(e,".png"),alt:"cover"}),Object(C.jsx)("i",{className:"erplayer-icon-play erplayer-playIcon"})]}),Object(C.jsx)("h5",{className:"my-auto",style:{height:"80px"},children:(t=e,"string"!==typeof t?"":t.trim().replace(/^\w/,(function(e){return e.toUpperCase()})))})]},e);var t}))})}):Object(C.jsxs)(u.a,{className:O()("d-flex justify-content-center",{open:!a}),children:[Object(C.jsx)(d.a,{xs:"auto",children:Object(C.jsx)("div",{className:"erplayer__info__cover my-0",style:{height:"200px",width:"auto"},children:Object(C.jsx)("img",{src:"/images/station/station_".concat(k,".png"),alt:""})})}),Object(C.jsxs)(d.a,{xs:"auto",children:[Object(C.jsx)(u.a,{style:{height:"".concat(40,"%")},children:Object(C.jsx)(d.a,{children:Object(C.jsx)("span",{style:{fontSize:"50px",verticalAlign:"middle"},children:B.artist})})}),Object(C.jsx)(u.a,{style:{height:"".concat(40,"%"),verticalAlign:"middle"},children:Object(C.jsx)(d.a,{children:Object(C.jsx)("span",{style:{fontSize:"50px"},children:B.title})})}),Object(C.jsx)(u.a,{style:{height:"".concat(20,"%"),verticalAlign:"middle"},children:Object(C.jsx)(d.a,{children:Object(C.jsx)("span",{style:{fontSize:"25px"},children:B.album})})})]})]})})})})}),Object(C.jsxs)("span",{onClick:function(){return n(!a)},className:O()("erplayer__btn erplayer__openplaylist",{open:a}),children:[Object(C.jsx)("i",{className:"erplayer-icon-menu erplayer-openicon"}),Object(C.jsx)("i",{className:"erplayer-icon-cancel erplayer-closeicon"})]})]})})})}var $=a(73),ee=a(15),te=a.n(ee);function ae(e){var t=function(){var e=Object(l.useState)(null),t=Object(c.a)(e,2),a=t[0],n=t[1],s=Object(l.useState)(!1),r=Object(c.a)(s,2),i=r[0],o=r[1],u=Object(l.useState)(!0),d=Object(c.a)(u,2),p=d[0],j=d[1];return{audio:a,ref:Object(l.useCallback)((function(e){null!==e&&(e.onplay=function(){return o(!0)},e.onpause=function(){return o(!1)},e.onloadstart=function(){return j(!0)},e.waiting=function(){return j(!0)},e.onloadeddata=function(){return j(!1)},e.canplay=function(){return j(!1)},e.playing=function(){return j(!1)},n(e))}),[]),playing:i,loading:p}}(),a=t.audio,n=t.ref,s=t.playing,r=(t.loading,Object(l.useState)(e.station)),i=Object(c.a)(r,2),p=i[0],j=(i[1],Object(l.useState)(.5)),m=Object(c.a)(j,2),g=m[0],h=(m[1],Object(l.useState)(!1)),f=Object(c.a)(h,2),x=(f[0],f[1],Object(l.useState)({album:"The Best Videogame Music 24/7",title:"",artist:""})),v=Object(c.a)(x,2),N=v[0],k=v[1];return Object(l.useEffect)((function(){return a&&(a.src="https://play.squid-radio.net/".concat(p),a.load(),a.play()),b(),_(p,(function(e){return k(e)})),function(){y()}}),[p]),Object(C.jsxs)(o.a,{fluid:!0,className:"p-0 h-100 d-flex align-items-center justify-content-center flex-column",children:[Object(C.jsx)("audio",{ref:n,preload:"none",id:"erplayer-audio",src:"https://play.squid-radio.net/clouds",volume:g}),Object(C.jsxs)("div",{className:te.a.background,children:[Object(C.jsx)("div",{className:te.a.effect}),Object(C.jsx)("img",{src:"https://squid-radio.net/covers/".concat(N.album,".jpg"),onError:function(e){e.target.src="/images/logo/soc_".concat(p,".png")},alt:""})]}),Object(C.jsxs)(u.a,{className:O()(te.a.content),children:[Object(C.jsx)(d.a,{xs:"auto",children:Object(C.jsx)("div",{className:te.a.station,children:Object(C.jsx)("img",{src:"/images/station/station_".concat(p,".png"),alt:""})})}),Object(C.jsxs)(d.a,{xs:"auto",children:[Object(C.jsx)(u.a,{style:{height:"".concat(40,"%")},children:Object(C.jsx)(d.a,{children:Object(C.jsx)("span",{style:{fontSize:"50px",verticalAlign:"middle"},children:N.artist})})}),Object(C.jsx)(u.a,{style:{height:"".concat(40,"%"),verticalAlign:"middle"},children:Object(C.jsx)(d.a,{children:Object(C.jsx)("span",{style:{fontSize:"50px"},children:N.title})})}),Object(C.jsx)(u.a,{style:{height:"".concat(20,"%"),verticalAlign:"middle"},children:Object(C.jsx)(d.a,{children:Object(C.jsx)("span",{style:{fontSize:"25px"},children:N.album})})})]})]}),Object(C.jsx)(u.a,{className:"mt-4",children:Object(C.jsx)(d.a,{children:Object(C.jsx)("div",{onClick:function(){s?a.pause():(a.load(),a.play())},className:O()(te.a.playpause,Object($.a)({},te.a.playing,s)),children:Object(C.jsx)("label",{htmlFor:te.a.playpause,tabIndex:1})})})})]})}var ne=a(74),se=(a(141),{"/":function(){return Object(C.jsx)(F,{station:"clouds"})},"/small":function(){return Object(C.jsx)(H,{station:"clouds"})},"/small/:station":function(e){var t=e.station;return Object(C.jsx)(H,{station:t})},"/new":function(){return Object(C.jsx)(Z,{station:"clouds"})},"/new/:station":function(e){var t=e.station;return Object(C.jsx)(Z,{station:t})},"/new2":function(){return Object(C.jsx)(ae,{station:"clouds"})},"/new2/:station":function(e){var t=e.station;return Object(C.jsx)(ae,{station:t})},"/board":function(){return Object(C.jsx)(W,{station:"clouds"})},"/widget":function(){return Object(C.jsx)(J,{})},"/:station":function(e){var t=e.station;return Object(C.jsx)(F,{station:t})}}),re=function(){var e=Object(i.useRoutes)(se);return Object(C.jsx)(ne.a,{children:e})||Object(C.jsx)("script",{children:window.location.href="/404.html"})};r.a.render(Object(C.jsx)(re,{}),document.getElementById("root"))},15:function(e,t,a){e.exports={background:"NewPlayer_background__mUwPY",effect:"NewPlayer_effect__3yW_a",station:"NewPlayer_station__1JuJB",content:"NewPlayer_content__pG4pp",playpause:"NewPlayer_playpause__2rdnr",playing:"NewPlayer_playing__2xg-G"}},16:function(e){e.exports=JSON.parse('{"anime":["images/bg/anime/1.jpg"],"arms":["images/bg/arms/minmin-smash-arms-dlc-fighter_feature.jpg"],"clouds":["images/bg/clouds/1.jpg","images/bg/clouds/2.jpg","images/bg/clouds/Inkling.png","images/bg/clouds/Splatoon_Splatoon_2_Nintendo_Switch_Nintendo_Inkling-1178303.png","images/bg/clouds/Splatoon.png","images/bg/clouds/thumb-1920-1025915.png","images/bg/clouds/tumblr_oyzfhrS09j1stbkjno8_1280.png"],"persona":["images/bg/persona/1.jpg","images/bg/persona/2.jpg"],"sonic":["images/bg/sonic/1.jpg","images/bg/sonic/2.jpg","images/bg/sonic/Inkling.png","images/bg/sonic/Splatoon_Splatoon_2_Nintendo_Switch_Nintendo_Inkling-1178303.png","images/bg/sonic/Splatoon.png","images/bg/sonic/thumb-1920-1025915.png","images/bg/sonic/tumblr_oyzfhrS09j1stbkjno8_1280.png"],"woomy":["images/bg/woomy/Inkling.png","images/bg/woomy/Splatoon_Splatoon_2_Nintendo_Switch_Nintendo_Inkling-1178303.png","images/bg/woomy/Splatoon.png","images/bg/woomy/thumb-1920-1025915.png","images/bg/woomy/tumblr_oyzfhrS09j1stbkjno8_1280.png"]}')},46:function(e,t,a){},6:function(e,t,a){e.exports={radio:"main_radio__39XAM",cover:"main_cover__3zSiG",record:"main_record__YBa2B",songData:"main_songData__3dCZO",volume:"main_volume__3pcm6",bar:"main_bar__2803L",cardPlay:"main_cardPlay__2KIc-",newBG:"main_newBG__3nCLv",currentBG:"main_currentBG__4Ontj",BG:"main_BG__34uA4"}},9:function(e,t,a){e.exports={"music-player-container":"small_music-player-container__v6Jyk","music-player":"small_music-player__2dI1g",min:"small_min__2fwSS","artist-name":"small_artist-name__1t247","song-title":"small_song-title__25zBC","album-title":"small_album-title__rUFDi","album-container":"small_album-container__2boBs","album-box":"small_album-box__yABfT","album-art":"small_album-art__34-6y","song-data":"small_song-data__1nGa_",vinyl:"small_vinyl__3FmlL","music-player-controls":"small_music-player-controls__2aJCa","control-play":"small_control-play__297sV","is-playing":"small_is-playing__2ireB","control-forwards":"small_control-forwards__Ltjip","control-back":"small_control-back__3r1M8"}}},[[142,1,2]]]);
//# sourceMappingURL=main.ab22ed14.chunk.js.map