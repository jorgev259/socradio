
/* global $,moment,elmPosiz,jQuery,io,MediaMetadata,Materialize */
var schedTarget
var audio128 = 'https://stream.toohotradio.net/128'
var audio320 = 'https://stream.toohotradio.net/320'
var audio = document.getElementById('audio-player')
function scheduleTZ () {
  $('.showtimestamps').each(function () {
    var b = moment.unix($(this).data('start'))
    var c = moment.unix($(this).data('end'))
    var d = b.format('LT'); var e = c.format('LT')
    c.format('dddd') !== $(this).data('day') && (e !== '00:00' && $('#' + $(this).data('day') + 'schedule').text($(this).data('day') + ' - ' + c.format('dddd')), e += ' (' + c.format('dddd') + ')'), $(this).text(d + ' - ' + e)
  })
}
function scheduleResizer () {
  var scheduleSize = new elmPosiz('#schedulePopout')
  var minheight = scheduleSize.height * 1.1
  $('#scheduleParallax').velocity({ height: minheight + 'px' }, 800, 'easeInSine')
  if (Number(($('#schedulePopout').height() / $('#schedulePopout li').height()).toFixed()) === 7) {
    $('#schedulePopout').velocity('scroll', { duration: 800, offset: -50 }, { easing: 'spring' })
  } else {
    $(schedTarget).velocity('scroll', { duration: 800, offset: -50 }, { easing: 'spring' })
  }
}


audio.onvolumechange = function () {
  console.log('The volume has been changed!')
}

var volSlider = document.getElementById('volbar')
var streamDelay = 0
$(document).ready(function () {
  scheduleTZ()

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
  var newAlbum = 0
  albumArt(1)
  function androidMetadata (data) {
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
  }
})
jQuery(document).ready(function () {
  $('.schedulePopout').click(function (event) {
    schedTarget = event.target
    setTimeout(function () { scheduleResizer() }, 800)
  })
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
          drop()
          setTimeout(function () { $('.tap-target').tapTarget('close') }, 5000)
        }
      }
    ]
    Materialize.scrollFire(options)
  }
  setTimeout(function () { scheduleResizer() }, 500)
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
function log (msg) {
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
}
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
var newColour
function swatcher () {
  $('.swatch').click(function (e) {
    newColour = event.target.classList.item(1)
    setCookie('2HTCL', newColour, 365)
    $('.swatch').removeClass('swatch-selected')
    $(this).addClass('swatch-selected')
    var post_data = { action: 'colour' }
    conn.publish('colour', newColour)
  })
}
function toastIt () {
  var myJSON = JSON.stringify($('#shout').serialize())
  console.log(myJSON)
  ws.send(myJSON)
  // document.getElementById("shout").reset();
}

var delay = 0
var conn, stringAlbum, stringTitle, stringArtist
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
  socket.on('metadata', function (data) {
    console.log(data)
    stringAlbum = data.album
    stringTitle = data.title
    stringArtist = data.artist
    // $('#cardAlbum').textillate('out');
    $('#cardTitle').text(stringTitle)
    $('#cardArtist').text(stringArtist)
    $('#cardAlbum').text(stringAlbum)

    const art = `https://radio.sittingonclouds.net/covers/${stringAlbum}.jpg`
    $('#albutwt').attr('src', art)
    $('#split1').img = art
    clearTimeout(switchPic)
    albumArt(1)
  })
}
connectWs()

async function addChatname () {
  var username = getCookie('2HTUN')
  if (username !== '') {
    shoutboxPopup()
  } else {
    const { value: chatname } = await swal({
      title: 'Enter your name to join the chat',
      input: 'text',
      inputPlaceholder: 'Enter name',
      showCancelButton: true,
      reverseButtons: true,
      inputValidator: (value) => {
        return !value && 'You need to write something!'
      }
    })
  }
}
function stripslashes (str) {
  return str.replace(/\\'/g, '\'').replace(/\"/g, '"').replace(/\\\\/g, '\\').replace(/\\0/g, '\0')
}
function chattPost () {
  var msg = $('#chatmsgin').val()
  if (msg.length === 0) {
    return
  }
  var message = stripslashes(msg)
  conn.publish('chat', message)
  $('#chatmsgin').val('')
}
var inChat = 0
function timeUpdate () {
  $('.time').each(function (i, el) {
    var timestamp = $(this).closest('li').data('timestamp')
    var time = moment.unix(timestamp)
    $(this).text(time.fromNow())
  })
}
function chatSubscribe () {
  inChat = 1
  conn.subscribe('chat', function (topic, data) {
    if (data[0] === 'joinedRoom') {
      var time = moment.unix(data.timestamp)
      var chatmsg = '<li class="center-block" data-timestamp="' + data.timestamp + '"><div class="chip center-align z-height-5" style="height:100%;"><img src="/wp-content/themes/materialize-child/img/' + data.avatar + '" class="circle" style="height:100%;">' + data.user + ' has joined the chat<br/>' + time.calendar() + '</div></li>'
      $(chatmsg).hide().appendTo('#chatwin').fadeIn(1200)
      $('#message-display').animate({ scrollTop: $('#message-display').prop('scrollHeight') }, 2000)
      return
    }
    if (data[0] === 'leftRoom') {
      var time = moment.unix(data.timestamp)
      var chatmsg = '<li class="center-block" data-timestamp="' + data.timestamp + '"><div class="chip center-align z-height-5" style="height:100%;"><img src="/wp-content/themes/materialize-child/img/' + data.avatar + '" class="circle" style="height:100%;">' + data.user + ' has left the chat<br/>' + time.calendar() + '</div></li>'
      $(chatmsg).hide().appendTo('#chatwin').fadeIn(1200)
      $('#message-display').animate({ scrollTop: $('#message-display').prop('scrollHeight') }, 2000)
      return
    }
    if (data[0] === 'yourPost') {
      var time = moment.unix(data.timestamp)
      var message = stripslashes(data.message)
      var time = moment.unix(data.timestamp)
      var chatmsg = '<li class="out" data-timestamp="' + data.timestamp + '"><div class="message ' + data.class + '"><div><span class="left time">' + time.fromNow() + '</span><span class="right name">' + data.user + '</span></div><br><div class="left">' + message + '</div></div></li>'
      $(chatmsg).hide().appendTo('#chatwin').fadeIn(1200)
      $('#message-display').animate({ scrollTop: $('#message-display').prop('scrollHeight') }, 2000)
      return
    }
    if (data[0] === 'colour') {
      $('.' + data.user).switchClass(data.oldclass, data.newclass, 3000)
      return
    }
    if (data[0] === 'welcome') {
      var time = moment.unix(data.timestamp)
      var message = stripslashes(data.message)
      var chatmsg = '<li class="center-block"><div class="chip center-align z-height-5" style="height:100%;">' + message + '</div></li>'
      $(chatmsg).hide().appendTo('#chatwin').fadeIn(1200)
      $('#message-display').animate({ scrollTop: $('#message-display').prop('scrollHeight') }, 2000)
      return
    }
    if (data[0] === 'chatmsg') {
      var time = moment.unix(data.timestamp)
      var message = stripslashes(data.message)
      var chatmsg = '<li class="in" data-timestamp="' + data.timestamp + '"><div class="avatar ' + data.class + '"><img src="/wp-content/themes/materialize-child/img/' + data.avatar + '" class="circle responsive-img"></div><div class="message ' + data.class + '"><div><span class="left name">' + data.user + '</span><span class="right time">' + time.fromNow() + '</span></div><br><div class="left">' + message + '</div></div></li>'
      $(chatmsg).hide().appendTo('#chatwin').fadeIn(1200)
      $('#message-display').animate({ scrollTop: $('#message-display').prop('scrollHeight') }, 2000)
      return
    }
    if (data[0] === 'history') {
      var time = moment.unix(data.timestamp)
      var message = stripslashes(data.message)
      var chatmsg = '<li class="in" data-timestamp="' + data.timestamp + '"><div class="avatar ' + data.class + '"><img src="/wp-content/themes/materialize-child/img/' + data.avatar + '" class="circle responsive-img"></div><div class="message ' + data.class + '"><div><span class="left name">' + data.user + '</span><span class="right time">' + time.fromNow() + '</span></div><br><div class="left">' + message + '</div></div></li>'
      $(chatmsg).hide().appendTo('#chatwin').fadeIn(100)
      $('#message-display').animate({ scrollTop: $('#message-display').prop('scrollHeight') }, 10)
    }
  })
}
var isTouch = ('ontouchstart' in window) || (navigator.msMaxTouchPoints || navigator.maxTouchPoints) > 2
var chatStatus
function minimiseChat () {
  $('#chat').velocity('transition.perspectiveUpOut', { duration: 2000 })
  $('.fabAudio').velocity('transition.perspectiveUpIn', { duration: 1500 })
  $('body').removeClass('noscroll')
  chatStatus = 'minimised'
}
function quitChat () {
  conn.unsubscribe('chat')
  $('#chat').velocity('transition.perspectiveUpOut', { duration: 2000 })
  $('.fabAudio').velocity('transition.perspectiveUpIn', { duration: 1500 })
  $('body').removeClass('noscroll')
  $('#chatwin').html('')
  chatStatus = 'quit'
  inChat = 0
}
var shoutSettings = false
function closeShoutSettings () {
  if (shoutSettings === false) {
    return
  }
  $('#shoutSettings').velocity('transition.perspectiveUpOut', { duration: 1500 })
  $('#shoutBox').velocity('transition.perspectiveUpIn', { duration: 1500, delay: 1500 })
  shoutSettings = false
}
function openShoutSettings () {
  if (shoutSettings === true) {
    return
  }
  $('#shoutBox').velocity('transition.perspectiveUpOut', { duration: 1500 })
  $('#shoutSettings').velocity('transition.perspectiveUpIn', { duration: 1500, delay: 1500 })
  swatcher()
  shoutSettings = true
}
var windowObjectReference = null
$('.popOutChat').click(function (e) {
  shoutboxPopup()
})
function shoutboxPopup () {
  if (windowObjectReference === null || windowObjectReference.closed) {
    var h = window.outerHeight * 0.75
    var w = h * 0.8
    var l = (window.outerWidth - w) * 0.9
    var t = window.outerHeight * 0.1
    windowObjectReference = window.open('/shoutbox/', 'shoutbox', 'resizable=yes,scrollbars=yes,top=' + t + ',left=' + l + ',height=' + h + ',width=' + w)
  } else {
    windowObjectReference.focus()
  }
}
function receiveMessage (event) {
  // Do we trust the sender of this message?
  // if (event.origin !== "http://example.com:8080")
  //  return;

  // event.source is window.opener
  // event.data is "hello there!"
  console.log(event)
  console.log(event.data)
  console.log(event.origin)
  // Assuming you've verified the origin of the received message (which
  // you must do in any case), a convenient idiom for replying to a
  // message is to call postMessage on event.source and provide
  // event.origin as the targetOrigin.
}

function startChat () {
  FB.getLoginStatus(function (response) {
    console.log(response)
    if (response.status === 'connected') {
      $('#menuCard').show()
      swal({ type: 'success', title: 'Logged in!', text: 'Logged in successfully', timer: 1500, showCancelButton: false })
      $.ajax('/fbloggg.php', {
        type: 'GET',
        success: function (data) {
          if (data === 0) {
            addUsername()
          }
        }
      })
    } else {
      $('#fbCard').show()
    }
  })
}
function ajaxUsername () {
  var name = x[0].value
  $.ajax('/fbloggg.php?newuser=' + name, {
    type: 'GET',
    success: function (data) {
      return data
    }
  })
}
var x
async function addUsername () {
  setTimeout(function () {
    x = document.getElementsByClassName('swal2-input')
    x[0].addEventListener('keyup', ajaxUsername)
  }, 500)
  const { value: chatname } = await swal({
    title: 'Enter your name to join the chat',
    input: 'text',
    inputPlaceholder: 'Enter name',
    showCancelButton: true,
    reverseButtons: true,
    inputValidator: (value) => {
      return !value && 'You need to write something!'
    }
  })
  if (chatname) {
    setCookie('2HTUN', chatname, 365)
    shoutboxPopup()
  }
}
async function swalTest () {
  swal({
    title: 'Submit email to run ajax request',
    input: 'email',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    showLoaderOnConfirm: true,
    preConfirm: (email) => {
      return ajaxUsername().then((data) => {
        if (data === 1) {
          swal.showValidationError('This email is already taken.')
        }
      })
    },
    allowOutsideClick: () => !swal.isLoading()
  }).then((result) => {
    if (result.value) {
      swal({
        type: 'success',
        title: 'Ajax request finished!',
        html: 'Submitted email: ' + result.value
      })
    }
  })
}

var recordWidth = $('#split1').width()
var recordWidthTimer
$(window).resize(function () {
  if (recordWidth === $('#split1').width()) {
    return
  }
  clearTimeout(recordWidthTimer)
  recordWidthTimer = setTimeout(function () { resizePlayerEffect() }, 500)
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

function CreateSeekBar () {
  var seekbar = document.getElementById('audioSeekBar')
  seekbar.min = 0
  seekbar.max = audio.duration
  seekbar.value = 0
}

function EndofAudio () {
  document.getElementById('audioSeekBar').value = 0
}

function audioSeekBar () {
  var seekbar = document.getElementById('audioSeekBar')
  audio.currentTime = seekbar.value
}

function SeekBar () {
  var seekbar = document.getElementById('audioSeekBar')
  seekbar.value = audio.currentTime
}
var switchPic
function albumArt (pic) {

}
$.fn.rotationInfo = function () {
  var el = $(this)
  var tr = el.css('-webkit-transform') || el.css('-moz-transform') || el.css('-ms-transform') || el.css('-o-transform') || ''
  var info = { rad: 0, deg: 0 }
  if (tr = tr.match('matrix\\((.*)\\)')) {
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
function recordTest () {
  if (audio.paused) {
    audio.play()
    startRecord()
  } else {
    audio.pause()
    recordAngle = setInterval(function () { stopRecord() }, 1)
  }
}
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
$('#bassboost').click(function () {
  var thisCheck = $(this)
  if (thisCheck.is(':checked')) {
    highPass.frequency.setTargetAtTime(1800, ctx.currentTime, 2)
    lowPass.frequency.setTargetAtTime(800, ctx.currentTime, 2)
    highPass.gain.setTargetAtTime(1, ctx.currentTime, 2)
    lowPass.gain.setTargetAtTime(3, ctx.currentTime, 2)
    gainNode.gain.setTargetAtTime(0.8, ctx.currentTime, 10)
  } else {
    highPass.frequency.setTargetAtTime(1800, ctx.currentTime, 2)
    lowPass.frequency.setTargetAtTime(800, ctx.currentTime, 2)
    highPass.gain.setTargetAtTime(3, ctx.currentTime, 2)
    lowPass.gain.setTargetAtTime(-3, ctx.currentTime, 2)
    gainNode.gain.setTargetAtTime(1, ctx.currentTime, 10)
  }
})

function handleOrientation (event) {
  var absolute = event.absolute
  var alpha = event.alpha
  var beta = event.beta
  var gamma = event.gamma
  console.log(event.alpha)
  console.log(event.beta)
}
