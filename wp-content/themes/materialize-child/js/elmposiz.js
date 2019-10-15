//JavaScript code to get some parameters of a html element in page - http://coursesweb.net/javascript/
// slc = CSS selector that represents the element
function elmPosiz(slc){
  var me = this;
  var elm = document.querySelector(slc); //element represented by slc
  me.win_w, me.win_h; //window width and height
  me.top, me.left, me.width, me.height; //position and size of elm
  me.min_visible =50; //minimum percentage for elm visible in viewport
  me.in_view; //true if elm in viewport; else false
  me.visibleX; //percentage of elm width visible in viewport, on X axis
  me.visibleY; //percentage of elm height visible in viewport, on Y axis
  me.listen; //for function executed on window resize and scrolling page

  //sets window size {w:width, h:height}
  var winSize = function(){
    var re ={};
    if(self.innerHeight){
      re.h = self.innerHeight;
      re.w = self.innerWidth;
    } else if(document.documentElement && document.documentElement.clientHeight){
      re.h = document.documentElement.clientHeight;
      re.w = document.documentElement.Width;
    } else if(document.body){
      re.h = document.body.clientHeight;
      re.w = document.body.clientWidth;
    }
    me.win_w=re.w; me.win_h=re.h;
  }

  //sets position and size of elm: {x:left, y:top, w:width, h:height}
  function posSize(elm){
    function getOffset(object,offset){if(!object)return;offset.x+=object.offsetLeft;offset.y+=object.offsetTop;getOffset(object.offsetParent,offset);}
    function getScrolled(object,scrolled){if(!object)return;scrolled.x+=object.scrollLeft;scrolled.y+=object.scrollTop;if(object.tagName.toLowerCase()!='html')getScrolled(object.parentNode,scrolled);}
    function getZoomFactor(){var factor=1;if(document.body.getBoundingClientRect){var rect=document.body.getBoundingClientRect();var physicalW=rect.right-rect.left;var logicalW=document.body.offsetWidth;factor=Math.round((physicalW/logicalW)*100)/100;}
    return factor;}
    var re={x:0,y:0,w:0,h:0};if(elm.getBoundingClientRect){var rect=elm.getBoundingClientRect();var x=rect.left;var y=rect.top;var w=rect.right-rect.left;var h=rect.bottom-rect.top;if(navigator.appName.toLowerCase()=='microsoft internet explorer'){x-=document.documentElement.clientLeft;y-=document.documentElement.clientTop;var zoomFactor=getZoomFactor();if(zoomFactor!=1){x=Math.round(x/zoomFactor);y=Math.round(y/zoomFactor);w=Math.round(w/zoomFactor);h=Math.round(h/zoomFactor);}}
    re={x:Math.round(x),y:Math.round(y),w:Math.round(w),h:Math.round(h)};}
    else{var offset={x:0,y:0};getOffset(elm,offset);var scrolled={x:0,y:0};getScrolled(elm.parentNode,scrolled);var x=offset.x-scrolled.x;var y=offset.y-scrolled.y;var w=elm.offsetWidth;var h=elm.offsetHeight;re={x:Math.round(x),y:Math.round(y),w:Math.round(w),h:Math.round(h)};}
    me.top=re.y; me.left=re.x; me.width=re.w; me.height=re.h;
  }

  //sets the visibleX property; the visible percent of elm width in viewport
  var getVisibleX = function(){
    if(me.left >=0) var re = Math.max(0, Math.min(100, (me.win_w - me.left)*100/me.width));
    else var re = Math.max(0, Math.min(100, (me.width + me.left)*100/me.width));
    me.visibleX = re.toFixed(2);
  }

  //sets the visibleY property; the visible percent of elm height in viewport
  var getVisibleY = function(){
    if(me.top >=0) var re = Math.max(0, Math.min(100, (me.win_h - me.top)*100/me.height));
    else var re = Math.max(0, Math.min(100, (me.height + me.top)*100/me.height));
    me.visibleY = re.toFixed(2);
  }

  //sets the in_view property - true if elm is in viewport with minimum percentage; else false
  var setInView = function(elm){
    me.in_view = (me.visibleY >=me.min_visible && me.visibleX >=me.min_visible) ?true :false;
  }

  //calls functions that set properties
  function construct(){
    winSize();
    posSize(elm);
    getVisibleX();
    getVisibleY();
    setInView(elm);
    if(typeof me.listen=='function') me.listen();
  }

  if(elm){
    construct();

    // when Resize browser, re-set properties
    window.addEventListener('resize', construct);

    // when scrolling page, re-set properties
    window.addEventListener('scroll', construct);

    //execute listen after 250 miliseconds if it is a function
    window.setTimeout(function(){ if(typeof me.listen=='function') me.listen();}, 250);
  }
}