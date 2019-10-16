
/* global $,jQuery,io,Materialize */
var audio128 = 'https://stream.toohotradio.net/128'
var audio320 = 'https://stream.toohotradio.net/320'
var audio = document.getElementById('audio-player')

audio.onvolumechange = function () {
  console.log('The volume has been changed!')
}

// var volSlider = document.getElementById('volbar')
var streamDelay = 0
$(document).ready(function () {
  var isAndroid = /Android/i.test(navigator.userAgent)
  if (isAndroid) {
    $('.mobileApps').show()
    $('.googlePlay').show()
  }
  var isApple = /iPhone|iPad|iPod/i.test(navigator.userAgent)
  if (isApple) {
    $('.mobileApps').show()
    $('.appleStore').show()
  }

  /* function androidMetadata (data) {
    if ('mediaSession' in navigator) {
      var art = 'https://toohotradio.net/resize' + data.art.substr(6)
      var imgtype = 'image/' + data.art.substr(-3)
      setTimeout(function () {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: stripslashes(data.title),
          artist: stripslashes(data.artist),
          album: stripslashes(data.album),
          artwork: [
            { src: art + '?w=96', sizes: '96x96', type: imgtype },
            { src: art + '?w=128', sizes: '128x128', type: imgtype },
            { src: art + '?w=192', sizes: '192x192', type: imgtype },
            { src: art + '?w=256', sizes: '256x256', type: imgtype },
            { src: art + '?w=384', sizes: '384x384', type: imgtype },
            { src: art + '?w=512', sizes: '512x512', type: imgtype }
          ]
        })
      }, streamDelay)
    }
  } */
})
jQuery(document).ready(function () {
  if (checkCookie('shoutbox') === false) {
    setCookie('shoutbox', 1, 365)
  }
  if (getCookie('shoutbox') < 4) {
    setCookie('shoutbox', Number(getCookie('shoutbox')) + 1, 365)
    var options = [
      {
        selector: '#map',
        offset: 0,
        callback: function () {
          $('.tap-target').tapTarget('open')
          setTimeout(function () { $('.tap-target').tapTarget('close') }, 5000)
        }
      }
    ]
    Materialize.scrollFire(options)
  }
})
// setTimeout(function(){$('.tap-targetplay').tapTarget('open');drop();}, 1000);
// setTimeout(function(){$('.tap-targetplay').tapTarget('close');}, 5000);
// setTimeout(function(){map.setZoom(2);}, 1600);
// setTimeout(function(){checkCookie();}, 500);
// setTimeout(function(){addStation();}, 3000);

audio.onpause = function () {
  console.log('play')
  $('#playPauseIcon').html('play_arrow')
  recordAngle = setInterval(function () { stopRecord() }, 1)
}
audio.onplay = function () {
  console.log('pause')
  if (streamDelay === 0) {
    setTimeout(function () {
      streamDelay = 30000
      console.log('delay = ' + streamDelay)
    }, 2000)
    console.log('delay = ' + streamDelay)
  }
  $('#playPauseIcon').html('pause')
  clearInterval(recordAngle)
  startRecord()
}

// helper function: log message to screen
/* function log (msg) {
  var data = JSON.parse(msg)
  console.log(data)
  if (data.type === 'toast') {
    Materialize.toast(data.msg, data.time, data.class)
  } else {
    swal({
      position: data.position,
      toast: true,
      type: 'success',
      title: data.msg,
      showConfirmButton: false,
      timer: data.time
    })
  }
} */
function setCookie (cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}
function getCookie (cname) {
  var name = cname + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
function checkCookie (cname) {
  var cookie = getCookie(cname)
  if (cookie !== '') {
    return cookie
  } else {
    return false
  }
}

/* function toastIt () {
  var myJSON = JSON.stringify($('#shout').serialize())
  console.log(myJSON)
  ws.send(myJSON)
  // document.getElementById("shout").reset();
} */

// var delay = 0
var stringAlbum, stringTitle, stringArtist
$('.tlt').on('outAnimationEnd.tlt', function (event) {
  var tar = $('.tlt').index(event.target)
  console.log(tar)
  if (tar === 0) {
    $('#cardTitle').text(stringTitle)
    $('#cardArtist').text(stringArtist)
    $('#cardAlbum').text(stringAlbum)
    $('.tlt').eq(tar).textillate('in')
  }
  if (tar > 0) {
    $('.tlt').eq(tar - 1).textillate('out')
  }
})
$('.tlt').on('inAnimationEnd.tlt', function (event) {
  var tar = 1 + $('.tlt').index(event.target)
  console.log(tar)
  $('.tlt').eq(tar).textillate('in')
})

function connectWs () {
  var socket = io('https://api.sittingonclouds.net')
  let currentArt = 'images/soc.png'
  socket.on('metadata', function (data) {
    console.log(data)
    stringAlbum = data.album
    stringTitle = data.title
    stringArtist = data.artist
    // $('#cardAlbum').textillate('out');
    $('#cardTitle').text(stringTitle)
    $('#cardArtist').text(stringArtist)
    $('#cardAlbum').text(stringAlbum)

    const newArt = `https://radio.sittingonclouds.net/covers/${stringAlbum}.jpg`

    $('.glitch').addClass('glitch_img')
    $('.glitch_sec').attr('src', currentArt)
    $('.glitch_primary').attr('src', newArt)
    setTimeout(() => {
      $('.glitch').removeClass('glitch_img')
      currentArt = newArt

      clearTimeout(switchPic)
    }, 1.5 * 1000)
  })
}
connectWs()

/* function stripslashes (str) {
  return str.replace(/\\'/g, '\'').replace(/\"/g, '"').replace(/\\\\/g, '\\').replace(/\\0/g, '\0')
} */

// var isTouch = ('ontouchstart' in window) || (navigator.msMaxTouchPoints || navigator.maxTouchPoints) > 2

var recordWidth = $('#split1').width()
$(window).resize(function () {
  if (recordWidth === $('#split1').width()) {
    return
  }
  resizePlayerEffect()
})
function resizePlayerEffect () {
  recordWidth = $('#split1').width()
  var posLeft = $('#recordDiv').position().left
  if (posLeft !== 0) {
    var left = ($('#playerCardImage').width() - $('#recordDiv').width()) - 1
    $('#recordDiv').css({ right: '-' + left + 'px', left: left + 'px' })
  }
}
$(document).ready(function () {
  $('#play-button').click(function () {
    if ($(this).hasClass('unchecked')) {
      $(this)
        .addClass('play-active')
        .removeClass('play-inactive')
        .removeClass('unchecked')
      $('.info-two')
        .addClass('info-active')
      $('#pause-button')
        .addClass('scale-animation-active')
      $('.waves-animation-one, #pause-button, .seek-field, .volume-icon, .volume-field, .info-two').show()
      $('.waves-animation-two').hide()
      $('#pause-button')
        .children('.icon')
        .addClass('icon-pause')
        .removeClass('icon-play')
      setTimeout(function () {
        $('.info-one').hide()
      }, 400)
      audio.play()
      //    audio.currentTime = 0;
    } else {
      $(this)
        .removeClass('play-active')
        .addClass('play-inactive')
        .addClass('unchecked')
      $('#pause-button')
        .children('.icon')
        .addClass('icon-pause')
        .removeClass('icon-play')
      $('.info-two')
        .removeClass('info-active')
      $('.waves-animation-one, #pause-button, .seek-field, .volume-icon, .volume-field, .info-two').hide()
      $('.waves-animation-two').show()
      setTimeout(function () {
        $('.info-one').show()
      }, 150)
      audio.pause()
      //     audio.currentTime = 0;
    }
  })
  $('#pause-button').click(function () {
    $(this).children('.icon')
      .toggleClass('icon-pause')
      .toggleClass('icon-play')

    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  })
  $('#play-button').click(function () {
    setTimeout(function () {
      $('#play-button').children('.icon')
        .toggleClass('icon-play')
        .toggleClass('icon-cancel')
    }, 350)
  })
  $('.like').click(function () {
    $('.icon-heart').toggleClass('like-active')
  })
})

var switchPic

$.fn.rotationInfo = function () {
  var el = $(this)
  var tr = el.css('-webkit-transform') || el.css('-moz-transform') || el.css('-ms-transform') || el.css('-o-transform') || ''
  var info = { rad: 0, deg: 0 }
  if (tr === tr.match('matrix\\((.*)\\)')) {
    tr = tr[1].split(',')
    if (typeof tr[0] !== 'undefined' && typeof tr[1] !== 'undefined') {
      info.rad = Math.atan2(tr[1], tr[0])
      info.deg = parseFloat((info.rad * 180 / Math.PI).toFixed(1))
    }
  }
  return info
}
var recordAngle
function stopRecord () {
  var angle = $('#record').rotationInfo().deg
  if (angle < -5 || angle > 5) {
    return
  }
  $('#record').removeClass('rotate-center'); $('#record').addClass('rotate-reverse-stop'); $('#recordDiv').removeClass('rotate-reverse-center')
  clearInterval(recordAngle)
}

function startRecord () {
  resizePlayerEffect()
  $('.record').css('opacity', 1)
  var posLeft = $('#recordDiv').position().left
  if (posLeft === 0) {
    var left = ($('#playerCardImage').width() - $('#recordDiv').width()) - 1
    $('#recordDiv').css({ right: '-' + left + 'px', left: left + 'px' })
    setTimeout(function () { startRecord() }, 3500)
  } else {
    $('#record').removeClass('rotate-reverse-stop'); $('#record').addClass('rotate-center'); $('#recordDiv').addClass('rotate-reverse-center')
  }
}
/* function recordTest () {
  if (audio.paused) {
    audio.play()
    startRecord()
  } else {
    audio.pause()
    stop
  }
} */
function hdAudio () {
  audio.crossOrigin = 'anonymous'
  audio.src = audio320
  audio.crossOrigin = 'anonymous'
  audio.load()
  audio.crossOrigin = 'anonymous'
  audio.play()
}
$('#hqAudio').click(function () {
  var thisCheck = $(this)
  if (thisCheck.is(':checked')) {
    hdAudio()
  } else {
    audio.crossOrigin = 'anonymous'
    audio.src = audio128
    audio.crossOrigin = 'anonymous'
    audio.load()
    audio.crossOrigin = 'anonymous'
    audio.play()
  }
})

function recordTest () {
  if (audio.paused) {
    audio.play()
    startRecord()
  } else {
    audio.pause()
    stopRecord()
  }
}

/* function handleOrientation (event) {
  var absolute = event.absolute
  var alpha = event.alpha
  var beta = event.beta
  var gamma = event.gamma
  console.log(event.alpha)
  console.log(event.beta)
} */
