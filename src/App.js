/* global MediaMetadata */
import React from 'react'
import $ from 'jquery'
import io from 'socket.io-client'

import './css/glitch.css'
import './css/player.css'
import './css/main.css'
import './css/material.css'
import './css/font.css'

import 'dat.gui'
import Background from './js/background'

function androidMetadata (data) {
  if ('mediaSession' in navigator) {
    const albumURL = `https://squid-radio.net/covers/${data.album}.jpg`
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

const placeholders = [
  "Riku's radio extravaganza",
  "Kobayashi's homemade playlist",
  "Ayanami's Anime Socks",
  "Ritsu's tightly locked treasure"
]

export default class App extends React.Component {
  station = window.location.pathname.replace('/', '')
  state = {
    station: this.station === '' ? 'clouds' : this.station,
    songData: {
      album: 'Press the Play button to start the radio',
      title: placeholders[Math.floor(Math.random() * placeholders.length)]
    },
    started: false
  }

  socket = io('https://api.squid-radio.net')

  emitter = this.socket.on(this.state.station, (data) => {
    console.log(data)
    this.setState({ songData: data })
    if (this.state.started) {
      setTimeout(data => {
        androidMetadata(data)

        const newArt = `https://squid-radio.net/covers/${data.album}.jpg`

        $('.glitch').addClass('glitch_img')
        $('.glitch_sec').attr('src', this.state.currentArt)
        $('.glitch_primary').attr('src', newArt)
        setTimeout(() => {
          $('.glitch').removeClass('glitch_img')
          this.setState({ currentArt: newArt })
        }, 1.5 * 1000)
      }, this.streamDelay, data)
    }
  })

  streamDelay = 0

  componentDidMount () {
    var audio = document.getElementById('audio-player')

    $('.muted').click(function () {
      audio.muted = !audio.muted
      return false
    })

    // VOLUME BAR
    // volume bar event
    var volumeDrag = false
    $('.volume').on('mousedown', function (e) {
      volumeDrag = true
      audio.muted = false
      $('.sound').removeClass('muted')
      updateVolume(e.pageX)
    })
    $(document).on('mouseup', function (e) {
      if (volumeDrag) {
        volumeDrag = false
        updateVolume(e.pageX)
      }
    })
    $(document).on('mousemove', function (e) {
      if (volumeDrag) {
        updateVolume(e.pageX)
      }
    })
    var updateVolume = function (x, vol) {
      var volume = $('.volume')
      var percentage
      // if only volume have specificed
      // then direct update volume
      if (vol) {
        percentage = vol * 100
      } else {
        var position = x - volume.offset().left
        percentage = 100 * position / volume.width()
      }

      if (percentage > 100) {
        percentage = 100
      }
      if (percentage < 0) {
        percentage = 0
      }

      // update volume bar and video volume
      $('.volumeBar').css('width', percentage + '%')
      audio.volume = percentage / 100

      // change sound icon based on volume
      if (audio.volume === 0) {
        $('.sound').removeClass('sound2').addClass('muted')
      } else if (audio.volume > 0.5) {
        $('.sound').removeClass('muted').addClass('sound2')
      } else {
        $('.sound').removeClass('muted').removeClass('sound2')
      }
    }

    // var volSlider = document.getElementById('volbar')

    audio.onpause = function () {
      $('#playPauseIcon').html('play_arrow')
      stopRecord()
    }
    audio.onplay = function () {
      if (!this.state.started) {
        // startSpectrum()
        let currentArt = `images/logo/soc_${this.state.station}.png`
        $('#cardTitle').text(this.state.songData.title)
        $('#cardArtist').text(this.state.songData.artist)
        $('#cardAlbum').text(this.state.songData.album)

        androidMetadata(this.state.songData)

        const newArt = `https://squid-radio.net/covers/${this.state.songData.album}.jpg`

        $('.glitch').addClass('glitch_img')
        $('.glitch_sec').attr('src', currentArt)
        $('.glitch_primary').attr('src', newArt)
        setTimeout(() => {
          $('.glitch').removeClass('glitch_img')
          currentArt = newArt
        }, 1.5 * 1000)
      }
      this.setState({ started: true })
      if (this.streamDelay === 0) {
        setTimeout(function () {
          this.streamDelay = 3000
          console.log('delay = ' + this.streamDelay)
        }, 2000)
        console.log('delay = ' + this.streamDelay)
      }
      $('#playPauseIcon').html('pause')
      startRecord()
      clearInterval(recordAngle)
    }.bind(this)

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

    $(document).ready(resizePlayerEffect())

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
    }, false)

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
  }

  render () {
    return (
      <>
        <Background />

        <div id='titlepara' className='slidepara headerpara' style={{ height: '100%' }}>
          <div className='container'>
            <div className='row'>
              <div className='col s12 m10 offset-m1' id='TooHotCard'>
                <div className='card z-depth-5' style={{ borderRadius: '20px' }} id='TooHotPlayer'>
                  <div className='card-image' id='playerCardImage'>
                    <video
                      id='audio-player' className='responsive-video' autoPlay crossOrigin='anonymous' preload='auto'
                      samesite='None' secure='true'
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}
                    >
                      <source src={`https://play.squid-radio.net/${this.state.station}?cache_ts=${new Date().getTime()}`} type='audio/mpeg' />
                    </video>
                    <div className='col s10 m8 l6' id='artDiv' style={{ paddingLeft: 0 }}>
                      <div className='split rotate-reverse-center' id='recordDiv' style={{ right: '-183px', left: '183px' }}>
                        <img alt='record' id='record' className='record rotate-center' src={`images/record/record_${this.state.station}.png`} style={{ opacity: 1 }} />
                      </div>
                      <div
                        className='active splitimg' id='split1'
                        style={{ backgroundColor: 'rgb(51, 51, 51)', height: '100%', borderRadius: '20px 0 0' }}
                      >
                        <div id='albutwt' style={{ height: '100%', width: '100%' }}>
                          <img alt='' className='glitch glitch_sec' src={`images/logo/soc_${this.state.station}.png`} />
                          <img alt='' className='glitch glitch_primary' src={`images/logo/soc_${this.state.station}.png`} />
                          <img alt='' className='glitch glitch_sec' src={`images/logo/soc_${this.state.station}.png`} />
                          <img alt='' className='glitch glitch_primary' src={`images/logo/soc_${this.state.station}.png`} />
                        </div>

                      </div>
                    </div>
                    <a
                      href='#'
                      id='cardFABPlay'
                      className='btn-floating z-depth-5 btn-large halfway-fab waves-effect waves-light red card-button'
                      style={{ zIndex: 2 }} accessKey='p'
                    >
                      <i className='material-icons card-icon' id='playPauseIcon'>
                        play_arrow
                      </i>
                    </a>
                  </div>
                  <div className='card-content black-text z-depth-5 left-align' id='playerControls'>
                    <canvas id='canvas' className='equaliser' />
                    <div className='row'>
                      <div className='col s12'>
                        <span className='card-title playerText truncate' id='cardTitle'>{this.state.songData.title}</span>
                      </div>
                      <div className='col s7'>
                        <p className='playerText truncate' id='cardArtist'>{this.state.songData.artist}</p>
                      </div>
                      <div className='right'>
                        <div className='switch'>
                          <div className='volume' title='Set volume'> <span className='volumeBar' /></div>

                        </div>
                      </div>
                      <div className='col s7'>
                        <p className='playerText truncate' id='cardAlbum'>{this.state.songData.album}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src='wp-content\themes\materialize-child\js\materializemod.js' />
        <script
          src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js'
          integrity='sha256-ABVkpwb9K9PxubvRrHMkk6wmWcIHUE9eBxNZLXYQ84k=' crossOrigin='anonymous'
        />

        <script src='%PUBLIC_URL%/js\sweetalert2.min.js' />
        <script src='wp-content\themes\materialize-child\js\elmposiz.js' />
        <script src='%PUBLIC_URL%/js\localforage.min.js' />
        <script
          src='https://code.jquery.com/ui/1.12.1/jquery-ui.min.js'
          integrity='sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=' crossOrigin='anonymous'
        />
        <script src='wp-content\themes\materialize-child\js\nginxws.js' />
        <script src='https://cdn.rawgit.com/jschr/textillate/master/assets/jquery.lettering.js' />
        <script src='https://cdn.rawgit.com/jschr/textillate/master/jquery.textillate.js' />
      </>
    )
  }
}
