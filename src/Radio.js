/* global MediaMetadata */
import React from 'react'
import $ from 'jquery'
import io from 'socket.io-client'
import Snowfall from 'react-snowfall'

import './css/glitch.css'
import './css/player.css'
import './css/main.css'
import './css/material.css'
import './css/font.css'

import anime from 'animejs/lib/anime.es.js'

import 'dat.gui'
import Background from './js/background'
import Record from './js/Record'

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

export default class Radio extends React.Component {
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
    if (data !== null) {
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
    }
  })

  streamDelay = 0

  componentDidMount () {
    const spin = anime({
      targets: '#record',
      rotate: '1turn',
      loop: true,
      duration: 1100,
      easing: 'linear',
      autoplay: false
    })

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
      spin.pause()
      // stopRecord()
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
      spin.play()
    }.bind(this)

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
  }

  render () {
    return (
      <>
        <Background />
        <div id='titlepara' className='slidepara headerpara' style={{ height: '100%' }}>
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
                    <Record station={this.state.station} />
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
        <Snowfall style={{ zIndex: 999 }} snowflakeCount={50} />
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
