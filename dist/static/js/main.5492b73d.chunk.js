(this.webpackJsonpsocradio_web_react=this.webpackJsonpsocradio_web_react||[]).push([[0],{117:function(e,a){},120:function(e,a,t){},14:function(e){e.exports=JSON.parse('{"anime":["images/bg/anime/1.jpg"],"arms":["images/bg/arms/minmin-smash-arms-dlc-fighter_feature.jpg"],"clouds":["images/bg/clouds/1.jpg","images/bg/clouds/2.jpg","images/bg/clouds/Inkling.png","images/bg/clouds/Splatoon_Splatoon_2_Nintendo_Switch_Nintendo_Inkling-1178303.png","images/bg/clouds/Splatoon.png","images/bg/clouds/thumb-1920-1025915.png","images/bg/clouds/tumblr_oyzfhrS09j1stbkjno8_1280.png"],"persona":["images/bg/persona/1.jpg","images/bg/persona/2.jpg"],"sonic":["images/bg/sonic/1.jpg","images/bg/sonic/2.jpg","images/bg/sonic/Inkling.png","images/bg/sonic/Splatoon_Splatoon_2_Nintendo_Switch_Nintendo_Inkling-1178303.png","images/bg/sonic/Splatoon.png","images/bg/sonic/thumb-1920-1025915.png","images/bg/sonic/tumblr_oyzfhrS09j1stbkjno8_1280.png"],"woomy":["images/bg/woomy/Inkling.png","images/bg/woomy/Splatoon_Splatoon_2_Nintendo_Switch_Nintendo_Inkling-1178303.png","images/bg/woomy/Splatoon.png","images/bg/woomy/thumb-1920-1025915.png","images/bg/woomy/tumblr_oyzfhrS09j1stbkjno8_1280.png"]}')},142:function(e,a,t){},146:function(e,a,t){},147:function(e,a,t){},148:function(e,a,t){"use strict";t.r(a);var n,r=t(1),i=t.n(r),s=t(68),l=t.n(s),o=t(27),c=t(3),m=t(149),u=t(150),p=t(151),d=t(31),g=t(28),_=t.n(g),y=function(){n=_()("https://api.squid-radio.net"),console.log("Connecting socket...")},b=function(){console.log("Disconnecting socket..."),n&&n.disconnect()},f=function(e,a){n.on(e,a)},v=t(13),h=t(5),E=t.n(h),j=t(4),N=t.n(j),O=(t(120),t(19)),w=t(9),k=t(10),S=t(12),x=t(11),B=t(14),C=t(20),I=function(e){Object(S.a)(t,e);var a=Object(x.a)(t);function t(){return Object(w.a)(this,t),a.apply(this,arguments)}return Object(k.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"config-list"},i.a.createElement("div",{className:"config-row",onClick:this.props.onHandleBG},i.a.createElement("div",{className:"config-icon"},i.a.createElement(C.b,{id:"swapBG",style:{height:"30px",width:"30px"}}))))}}]),t}(i.a.Component),G=t(29);function A(e){var a=e.station,t=Object(r.useState)(!1),n=Object(c.a)(t,2),s=n[0],l=n[1],m=Object(r.useState)([]),u=Object(c.a)(m,2),p=u[0],d=u[1],g=Object(G.a)("https://api.squid-radio.net/meta"),_=Object(c.a)(g,1)[0],y=_.data,b=_.error,v=Object(r.useState)({}),h=Object(c.a)(v,2),E=h[0],j=h[1];return Object(r.useEffect)((function(){y&&d(Object.keys(y))}),[y]),Object(r.useEffect)((function(){p.length>0&&p.forEach((function(e){return f(e,(function(e){var a=E;E[e.source]=e,j(a)}))}))}),[p]),b&&console.log(b),i.a.createElement("div",{className:"config-list"},i.a.createElement("div",{className:"config-row"},i.a.createElement("div",{className:"config-icon",onClick:function(){return l(!s)}},s?i.a.createElement(C.a,{style:{height:"30px",width:"30px"}}):i.a.createElement(C.c,{style:{height:"30px",width:"30px"}}))),s?p.filter((function(e){return e!==a})).map((function(e){return i.a.createElement("div",{className:"config-row",key:e},E[e]&&i.a.createElement("div",{className:"config-label"},"Now Playing: ","".concat(E[e].artist," - ").concat(E[e].title)),i.a.createElement("img",{className:"config-img",alt:"station logo",src:"/images/station/station_".concat(e,".png"),onClick:function(){return Object(o.navigate)("/".concat(e))}}))})):null)}t(142);var q=function(e){Object(S.a)(t,e);var a=Object(x.a)(t);function t(){return Object(w.a)(this,t),a.apply(this,arguments)}return Object(k.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"config"},i.a.createElement(A,{station:this.props.station,onStation:this.props.handleStation}),i.a.createElement(I,{onHandleBG:this.props.handleBG}))}}]),t}(i.a.Component),D=function(e){Object(S.a)(t,e);var a=Object(x.a)(t);function t(){return Object(w.a)(this,t),a.apply(this,arguments)}return Object(k.a)(t,[{key:"render",value:function(){var e=B[this.props.station][this.props.index]||(this.props.index<0?B[this.props.station][B[this.props.station].length-1]:B[this.props.station][0]);switch(e.endsWith(".mp4")?"video":"image"){case"video":return i.a.createElement("video",{className:N.a.BG,autoPlay:!0,muted:!0,loop:!0,id:this.props.id},i.a.createElement("source",{src:e,type:"video/mp4"}));default:return i.a.createElement("div",{className:N.a.BG,id:this.props.id,style:{backgroundImage:'url("'.concat(e,'")')}})}}}]),t}(i.a.Component),z=function(e){Object(S.a)(t,e);var a=Object(x.a)(t);function t(){var e,n;Object(w.a)(this,t);for(var r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return Object(O.a)(n,(e=n=a.call.apply(a,[this].concat(i)),n.state={anim:"stale",bgIndex:Math.floor(Math.random()*B[n.props.station].length)},n.updateBG=function(){"running"!==n.state.anim&&n.setState({anim:"running"},(function(){n.bgdrag.play()}))},e))}return Object(k.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.bgdrag=Object(v.a)({targets:"#".concat(N.a.newBG),duration:1100,translateX:"100%",easing:"spring(1, 80, 10, 0)",autoplay:!1,complete:function(a){var t=e.state.bgIndex;t+1>=B[e.props.station].length?t=0:t++,e.setState({anim:"stale",bgIndex:t},(function(){a.reset()}))}})}},{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(q,{station:this.props.station,handleBG:this.updateBG.bind(this)}),i.a.createElement(D,{id:N.a.currentBG,station:this.props.station,index:this.state.bgIndex}),i.a.createElement(D,{id:N.a.newBG,station:this.props.station,index:this.state.bgIndex+1}))}}]),t}(i.a.Component),M=["Riku's radio extravaganza","Kobayashi's homemade playlist","Ayanami's Anime Socks","Ritsu's tightly locked treasure"];function T(e){var a=e.station,t=Object(r.useRef)(null),n=function(){var e=Object(r.useState)(null),a=Object(c.a)(e,2),t=a[0],n=a[1],i=Object(r.useState)(!1),s=Object(c.a)(i,2),l=s[0],o=s[1],m=Object(r.useState)(!0),u=Object(c.a)(m,2),p=u[0],d=u[1];return{audio:t,ref:Object(r.useCallback)((function(e){null!==e&&(e.onplay=function(){return o(!0)},e.onpause=function(){return o(!1)},e.onloadstart=function(){return d(!0)},e.waiting=function(){return d(!0)},e.onloadeddata=function(){return d(!1)},e.canplay=function(){return d(!1)},e.playing=function(){return d(!1)},n(e))}),[]),playing:l,loading:p}}(),s=n.audio,l=n.ref,o=n.playing,g=Object(r.useState)(.5),_=Object(c.a)(g,2),h=_[0],j=_[1],O=Object(r.useState)({album:"Press the Play button to start the radio",title:M[Math.floor(Math.random()*M.length)]}),w=Object(c.a)(O,2),k=w[0],S=w[1];function x(){o?s.pause():(s.load(),s.play())}return Object(r.useEffect)((function(){return s&&(s.src="https://play.squid-radio.net/".concat(a),s.load(),o&&s.play()),y(),f(a,(function(e){return S(e)})),b}),[a]),Object(r.useEffect)((function(){var e=Object(v.a)({targets:".".concat(N.a.record," img"),rotate:"1turn",loop:!0,duration:1500,easing:"linear",autoplay:!1});t.current={begin:Object(v.a)({targets:".".concat(N.a.record," img"),rotate:"180deg",duration:2e3,easing:"easeInCubic",autoplay:!1,complete:e.play}),end:Object(v.a)({begin:e.pause,targets:".".concat(N.a.record," img"),rotate:"360deg",duration:2e3,easing:"easeOutBack",autoplay:!1})}}),[]),Object(r.useEffect)((function(){o?t.current.begin.play():t.current.end.play()}),[o]),i.a.createElement(i.a.Fragment,null,i.a.createElement("audio",{ref:l,preload:"none",src:"https://play.squid-radio.net/".concat(a),volume:h}),i.a.createElement(z,{station:a}),i.a.createElement(m.a,{className:"d-flex"},i.a.createElement("div",{className:E()(N.a.radio,"my-auto mx-md-auto")},i.a.createElement(u.a,null,i.a.createElement(p.a,{xs:12,className:E()(N.a.images,"d-flex p-0")},i.a.createElement("div",{className:N.a.cover},i.a.createElement("img",{onError:function(e){e.target.src="images/logo/soc_".concat(a,".png")},src:"covers/".concat(k.album,".jpg"),alt:""})),i.a.createElement("div",{className:E()("flex-grow-1",N.a.record)},i.a.createElement("img",{src:"/images/record/record_".concat(a,".png"),alt:""})))),i.a.createElement(u.a,null,i.a.createElement(p.a,{xs:12,className:N.a.songData},i.a.createElement(u.a,null,i.a.createElement(p.a,null,i.a.createElement("span",{className:"text-truncate",id:"premidTitle"},k.title),i.a.createElement("p",{className:"text-truncate",id:"premidArtist"},k.artist),i.a.createElement("p",{className:"text-truncate",id:"premidAlbum"},k.album)),i.a.createElement("div",{className:N.a.cardPlay},i.a.createElement("i",{className:"card-icon",id:"playPauseIcon"},0===h?i.a.createElement(d.c,{onClick:x}):o?i.a.createElement(d.a,{onClick:x}):i.a.createElement(d.b,{onClick:x}))),i.a.createElement(p.a,{xs:"auto",className:"d-flex"},i.a.createElement(P,{volume:h,setVolume:function(e){s.volume=e,j(e)}}))))))))}function P(e){var a=e.volume,t=e.setVolume,n=Object(r.useState)(!1),s=Object(c.a)(n,2),l=s[0],o=s[1],m=Object(r.useRef)(null);function u(e){var a=(e-m.current.getBoundingClientRect().left)/m.current.getBoundingClientRect().width;a>1&&(a=1),a<0&&(a=0),t(a)}function p(e){o(!1),u(e.pageX)}function d(e){u(e.pageX)}return Object(r.useEffect)((function(){return l&&(window.addEventListener("mouseup",p),window.addEventListener("mousemove",d)),function(){window.removeEventListener("mouseup",p),window.removeEventListener("mousemove",d)}}),[l]),i.a.createElement("div",{className:"align-self-center"},i.a.createElement("div",{className:"switch"},i.a.createElement("div",{className:N.a.volume,title:"Set volume",ref:m,onMouseDown:function(e){o(!0),u(e.pageX)}},i.a.createElement("span",{style:{width:"".concat(100*a,"%")},className:N.a.bar}))))}var R=t(8),L=t.n(R),V=t(70),H=t.n(V),J=["Riku's radio extravaganza","Kobayashi's homemade playlist","Ayanami's Anime Socks","Ritsu's tightly locked treasure"];function W(e){if("mediaSession"in navigator){var a="https://squid-radio.net/covers/".concat(e.album,".jpg");navigator.mediaSession.metadata=new MediaMetadata({title:e.title,artist:e.artist,album:e.album,artwork:[{src:a,sizes:"96x96",type:"image/jpg"},{src:a,sizes:"128x128",type:"image/jpg"},{src:a,sizes:"192x192",type:"image/jpg"},{src:a,sizes:"256x256",type:"image/jpg"},{src:a,sizes:"384x384",type:"image/jpg"},{src:a,sizes:"512x512",type:"image/jpg"}]})}}var X=function(e){Object(S.a)(t,e);var a=Object(x.a)(t);function t(){var e,n;Object(w.a)(this,t);for(var r=arguments.length,i=new Array(r),s=0;s<r;s++)i[s]=arguments[s];return Object(O.a)(n,(e=n=a.call.apply(a,[this].concat(i)),n.state={songData:{album:"Press the Play button to start the radio",title:J[Math.floor(Math.random()*J.length)]},currentArt:"/images/logo/soc_".concat(n.props.station,".png"),min:!1,maxWidth:800},n.minTimeout=null,n.startSocket=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;n.socket=_()("https://api.squid-radio.net"),n.socket.on(n.props.station,n.handleSong),n.socket.emit("station",{station:n.props.station}),n.startAudio(),e&&e()},n.startAudio=function(){n.audio=new Audio("https://play.squid-radio.net/".concat(n.props.station,"?cache_ts=").concat((new Date).getTime())),n.audio.onpause=function(){n.setState({playing:!1}),n.spin.pause(),Object(v.a)({targets:".vinyl",rotate:"180deg",duration:2e3,easing:"easeOutBack",autoplay:!0})},n.audio.onplay=function(){if(!n.state.started){W(n.state.songData);var e="https://squid-radio.net/covers/".concat(n.state.songData.album,".jpg");setTimeout((function(){n.setState({currentArt:e})}),1500)}n.setState({started:!0}),n.setState({playing:!0})},n.audio.onended=function(){console.log("Stream Ended. Restarting"),n.startAudio()},n.audio.loop=!1,n.audio.play(),n.audio.volume=1},n.handlePlay=function(){n.state.playing?n.audio.pause():(n.audio.load(),n.audio.play(),n.audio.volume=1)},n.handleSong=function(e){if(console.log(e),null!==e&&n.state.started){n.setState({songData:e,min:!1}),W(e);var a="https://squid-radio.net/covers/".concat(e.album,".jpg");setTimeout((function(){n.setState({currentArt:a})}),1500),clearTimeout(n.minTimeout),n.cycleHide()}},e))}return Object(k.a)(t,[{key:"cycleHide",value:function(){var e=this;clearTimeout(this.minTimeout),this.minTimeout=setTimeout((function(){return e.setState({min:!e.state.min},e.cycleHide)}),this.state.min?2e4:5e4)}},{key:"componentDidMount",value:function(){var e=this;this.spin=Object(v.a)({targets:".".concat(L.a.vinyl),rotate:"1turn",loop:!0,duration:1500,easing:"linear",autoplay:!0}),this.startSocket(),setInterval((function(){return e.setState({maxWidth:H()(".".concat(L.a["music-player"])).outerWidth()})}),1e3)}},{key:"render",value:function(){return i.a.createElement(m.a,{fluid:!0},i.a.createElement("div",{className:F("music-player-container",this.state.min?"min":"")},i.a.createElement("div",{className:F("music-player")},i.a.createElement("div",{className:L.a["song-data"]},i.a.createElement("h1",{className:L.a["artist-name"]},this.state.songData.artist),i.a.createElement("h2",{className:L.a["song-title"]},this.state.songData.title),i.a.createElement("h3",{className:L.a["album-title"]},this.state.songData.album))),i.a.createElement("div",{className:L.a["album-container"]},i.a.createElement("div",{className:L.a["album-box"],style:{left:this.state.min?"-".concat(this.state.maxWidth-5,"px"):null}},i.a.createElement("div",{style:{backgroundImage:'url("https://squid-radio.net/covers/'.concat(this.state.songData.album,'.jpg"), url("/images/logo/soc_').concat(this.props.station,'.png")')},className:F("album-art")}),i.a.createElement("div",{className:L.a.vinyl,style:{backgroundImage:'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/83141/vinyl.png"), url("/images/station/station_'.concat(this.props.station,'.png")')}})))))}}]),t}(i.a.Component);function F(){for(var e=arguments.length,a=new Array(e),t=0;t<e;t++)a[t]=arguments[t];return a.map((function(e){return L.a[e]||e})).join(" ")}t(145),t(146);function K(){var e=Object(r.useState)(!1),a=Object(c.a)(e,2),t=a[0],n=a[1],s=function(){var e=Object(r.useState)(null),a=Object(c.a)(e,2),t=a[0],n=a[1],i=Object(r.useState)(!1),s=Object(c.a)(i,2),l=s[0],o=s[1],m=Object(r.useState)(!0),u=Object(c.a)(m,2),p=u[0],d=u[1];return{audio:t,ref:Object(r.useCallback)((function(e){null!==e&&(e.onplay=function(){return o(!0)},e.onpause=function(){return o(!1)},e.onloadstart=function(){return d(!0)},e.waiting=function(){return d(!0)},e.onloadeddata=function(){return d(!1)},e.canplay=function(){return d(!1)},e.playing=function(){return d(!1)},n(e))}),[]),playing:l,loading:p}}(),l=s.audio,o=s.ref,m=s.playing,u=s.loading,p=Object(r.useState)(.5),d=Object(c.a)(p,2),g=d[0],_=d[1],v=Object(r.useState)("clouds"),h=Object(c.a)(v,2),j=h[0],N=h[1],O=Object(r.useState)({album:"The Best Videogame Music 24/7",title:"",artist:""}),w=Object(c.a)(O,2),k=w[0],S=w[1],x=Object(G.a)("https://api.squid-radio.net/meta"),B=Object(c.a)(x,1)[0],C=B.data,I=B.error;function A(){m?l.pause():(l.load(),l.play())}return Object(r.useEffect)((function(){return l&&(l.src="https://play.squid-radio.net/".concat(j),l.load(),l.play()),y(),f(j,(function(e){return S(e)})),function(){b()}}),[j]),I&&console.log(I),i.a.createElement("div",{className:E()("erplayer  erplayer--card erplayer--inline erplayer-- erplayer-- erplayer--open-",{"erplayer-playlist-open":t}),id:"erplayer-id-e390574"},i.a.createElement("div",{className:"h-100 erplayer-content"},i.a.createElement("div",{className:"h-100 erplayer__container",style:{opacity:1}},i.a.createElement("audio",{ref:o,preload:"none",id:"erplayer-audio",src:"https://play.squid-radio.net/clouds",volume:g}),i.a.createElement("div",{className:"erplayer__bgcolor"}),i.a.createElement("div",{className:"erplayer__background"},i.a.createElement("img",{src:"https://squid-radio.net/covers/".concat(k.album,".jpg"),alt:""})),i.a.createElement("div",{className:"erplayer__wrapper"},i.a.createElement("div",{className:"erplayer__wrapper__container"},i.a.createElement("div",{className:"erplayer__info mb-2"},i.a.createElement("div",{className:"erplayer__info__cover"},i.a.createElement("img",{src:"https://www.squid-radio.net/images/station/station_".concat(j,".png"),alt:""})),i.a.createElement("h3",{className:"erplayer__info__title erplayer-marquee"},i.a.createElement("div",{className:"inner"},[1,2,3,4].map((function(e){return i.a.createElement("span",{className:"mr-3",key:e},k.artist," - ",k.title)})))),i.a.createElement("h4",{className:"erplayer__info__artist erplayer-marquee mt-3"},i.a.createElement("div",{className:"inner"},[1,2,3,4].map((function(e){return i.a.createElement("span",{className:"mr-3",key:e},k.album)}))))),i.a.createElement("div",{className:E()("erplayer__controls mt-4",{"erplayer-playing":m})},i.a.createElement("div",{className:"erplayer__slidercontrol erplayer__slidercontrol--progressbar"},i.a.createElement("span",{className:"erplayer__timer"},"--:--"),i.a.createElement("div",{className:"erplayer__progressbar erplayer__slidercontrol__slider disabled"},i.a.createElement("div",{className:"erplayer__slidercontrol__bar erplayer__playhead",style:{width:"49px"}}),i.a.createElement("div",{className:"erplayer__slidercontrol__bar erplayer__bufferhead",style:{width:"0px"}}),i.a.createElement("div",{className:"erplayer__slidercontrol__trackbar"}),i.a.createElement("input",{type:"range",className:"erplayer__slidercontrol__input",min:"0",max:"1",step:"0.005",defaultValue:"0"})),i.a.createElement("span",{className:"erplayer__duration"})),i.a.createElement("span",{onClick:A,className:"erplayer__btn erplayer__play"},i.a.createElement("i",{className:"erplayer-icon-play"})),i.a.createElement("span",{onClick:A,className:E()("erplayer__btn erplayer__pause",{loading:u}),style:{pointerEvents:"initial"}},i.a.createElement("i",{className:"erplayer-icon-pause",style:{opacity:1}})),i.a.createElement("div",{className:"mt-2 erplayer__slidercontrol erplayer__slidercontrol--volume"},i.a.createElement("span",{className:"erplayer__btn erplayer__mute"},i.a.createElement("i",{className:"erplayer-icon-volume"})),i.a.createElement("div",{className:"erplayer__slidercontrol__slider"},i.a.createElement("div",{className:"erplayer__volume-bar erplayer__slidercontrol__bar",style:{width:"".concat(100*g,"%")}}),i.a.createElement("div",{className:"erplayer__slidercontrol__trackbar"}),i.a.createElement("input",{type:"range",className:"erplayer__volume-input erplayer__slidercontrol__input",min:"0",max:"1",step:"0.01",defaultValue:.5,onChange:function(e){return a=e.target.value,l.volume=a,void _(a);var a}})))))),i.a.createElement("span",{onClick:function(){return n(!t)},className:E()("erplayer__btn erplayer__openplaylist",{open:t})},i.a.createElement("i",{className:"erplayer-icon-menu erplayer-openicon"}),i.a.createElement("i",{className:"erplayer-icon-cancel erplayer-closeicon"})),i.a.createElement("div",{className:E()("erplayer__playlist",{open:t})},i.a.createElement("ul",null,C&&Object.keys(C).map((function(e){return i.a.createElement("li",{key:e},i.a.createElement("span",{className:"erplayer__btn erplayer__playlist__cover",onClick:function(){return N(e)}},i.a.createElement("img",{src:"https://www.squid-radio.net/images/station/station_".concat(e,".png"),alt:"cover"}),i.a.createElement("i",{className:"erplayer-icon-play erplayer-playIcon"}),i.a.createElement("i",{className:"erplayer-icon-pause erplayer-pauseIcon"})),i.a.createElement("h5",null,"string"!==typeof(a=e)?"":a.trim().replace(/^\w/,(function(e){return e.toUpperCase()}))));var a})))))))}t(147);var U={"/":function(){return i.a.createElement(T,{station:"clouds"})},"/small":function(){return i.a.createElement(X,{station:"clouds"})},"/small/:station":function(e){var a=e.station;return i.a.createElement(X,{station:a})},"/widget":function(){return i.a.createElement(K,null)},"/:station":function(e){var a=e.station;return i.a.createElement(T,{station:a})}},Y=function(){return Object(o.useRoutes)(U)||i.a.createElement("script",null,window.location.href="/404.html")};l.a.render(i.a.createElement(Y,null),document.getElementById("root"))},4:function(e,a,t){e.exports={radio:"main_radio__39XAM",cover:"main_cover__3zSiG",record:"main_record__YBa2B",songData:"main_songData__3dCZO",volume:"main_volume__3pcm6",bar:"main_bar__2803L",cardPlay:"main_cardPlay__2KIc-",newBG:"main_newBG__3nCLv",currentBG:"main_currentBG__4Ontj",BG:"main_BG__34uA4"}},72:function(e,a,t){e.exports=t(148)},8:function(e,a,t){e.exports={"music-player-container":"small_music-player-container__v6Jyk","music-player":"small_music-player__2dI1g",min:"small_min__2fwSS","artist-name":"small_artist-name__1t247","song-title":"small_song-title__25zBC","album-title":"small_album-title__rUFDi","album-container":"small_album-container__2boBs","album-box":"small_album-box__yABfT","album-art":"small_album-art__34-6y","song-data":"small_song-data__1nGa_",vinyl:"small_vinyl__3FmlL","music-player-controls":"small_music-player-controls__2aJCa","control-play":"small_control-play__297sV","is-playing":"small_is-playing__2ireB","control-forwards":"small_control-forwards__Ltjip","control-back":"small_control-back__3r1M8"}}},[[72,1,2]]]);
//# sourceMappingURL=main.5492b73d.chunk.js.map