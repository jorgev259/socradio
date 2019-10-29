
/* global $,io,MediaMetadata */
var dataSave = {}
var audio = document.getElementById('audio-player')
let started = false

// var volSlider = document.getElementById('volbar')
var streamDelay = 0

function androidMetadata (data) {
  if ('mediaSession' in navigator) {
    const albumURL = `https://radio.sittingonclouds.net/covers/${data.album}.jpg`
    navigator.mediaSession.metadata = new MediaMetadata({
      title: data.title,
      artist: data.artist,
      album: data.album,
      artwork: [
        { src: albumURL, sizes: '96x96', type: 'image/jpg' },
        { src: albumURL, sizes: '128x128', type: 'image/jpg' },
        { src: albumURL, sizes: '192x192', type: 'image/jpg' },
        { src: albumURL, sizes: '256x256', type: 'image/jpg' },
        { src: albumURL, sizes: '384x384', type: 'image/jpg' },
        { src: albumURL, sizes: '512x512', type: 'image/jpg' }
      ]
    })
  }
}

audio.onpause = function () {
  $('#playPauseIcon').html('play_arrow')
  stopRecord()
}
audio.onplay = function () {
  if (!started) {
    const data = dataSave
    let currentArt = 'images/soc.png'
    $('#cardTitle').text(data.title)
    $('#cardArtist').text(data.artist)
    $('#cardAlbum').text(data.album)

    androidMetadata(data)

    const newArt = `https://radio.sittingonclouds.net/covers/${data.album}.jpg`

    $('.glitch').addClass('glitch_img')
    $('.glitch_sec').attr('src', currentArt)
    $('.glitch_primary').attr('src', newArt)
    setTimeout(() => {
      $('.glitch').removeClass('glitch_img')
      currentArt = newArt
    }, 1.5 * 1000)
  }
  started = true
  if (streamDelay === 0) {
    setTimeout(function () {
      streamDelay = 30000
      console.log('delay = ' + streamDelay)
    }, 2000)
    console.log('delay = ' + streamDelay)
  }
  $('#playPauseIcon').html('pause')
  startRecord()
  clearInterval(recordAngle)
}

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
    dataSave = data
    console.log(data)
    if (started) {
      setTimeout(data => {
        $('#cardTitle').text(data.title)
        $('#cardArtist').text(data.artist)
        $('#cardAlbum').text(data.album)

        androidMetadata(data)

        const newArt = `https://radio.sittingonclouds.net/covers/${data.album}.jpg`

        $('.glitch').addClass('glitch_img')
        $('.glitch_sec').attr('src', currentArt)
        $('.glitch_primary').attr('src', newArt)
        setTimeout(() => {
          $('.glitch').removeClass('glitch_img')
          currentArt = newArt
        }, 1.5 * 1000)
      }, streamDelay, data)
    }
  })
}
connectWs()

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
const placeholders = [
  "Riku's radio extravaganza",
  "Kobayashi's homemade playlist",
  "Ayanami's Anime Socks",
  "Ritsu's tightly locked treasure"
]

$(document).ready(function () {
  /* const para = document.querySelector('body')
  para.onpointermove = (event) => {
    if (!initialized) {
      audio.play()
        .catch(err => console.log(err))
        .finally(() => { initialized = true })
    }
  } */

  resizePlayerEffect()
  $('#audio-player').html(`<source src="https://play.sittingonclouds.net/clouds?cache_ts=${new Date().getTime()}" type="audio/mpeg">`)
  $('#cardTitle').text(placeholders[Math.floor(Math.random() * placeholders.length)])
})

const vdo = document.getElementById('cardFABPlay')
vdo.addEventListener('click', () => {
  if (audio.paused) {
    $('.waves-animation-one, #pause-button, .seek-field, .volume-icon, .volume-field, .info-two').show()
    $('.waves-animation-two').hide()

    $('#audio-player')[0].play()
  } else {
    $('.waves-animation-one, #pause-button, .seek-field, .volume-icon, .volume-field, .info-two').hide()
    $('.waves-animation-two').show()

    audio.pause()
  }
})

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

/* function handleOrientation (event) {
  var absolute = event.absolute
  var alpha = event.alpha
  var beta = event.beta
  var gamma = event.gamma
  console.log(event.alpha)
  console.log(event.beta)
} */
