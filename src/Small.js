/* global Audio, MediaMetadata */
import { Component } from 'react';
import styles from './css/small.module.css'
import io from 'socket.io-client'
import anime from 'animejs/lib/anime.es.js'
import { Container } from 'reactstrap'
import $ from 'jquery'

const placeholders = [
  "Riku's radio extravaganza",
  "Kobayashi's homemade playlist",
  "Ayanami's Anime Socks",
  "Ritsu's tightly locked treasure"
]

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

export default class Small extends Component {
  state = {
    songData: {
      album: 'Press the Play button to start the radio',
      title: placeholders[Math.floor(Math.random() * placeholders.length)]
    },
    currentArt: `/images/logo/soc_${this.props.station}.png`,
    min: false,
    maxWidth: 800
  }

  minTimeout = null

  startSocket = (cb = null) => {
    this.socket = io('https://api.squid-radio.net')
    this.socket.on(this.props.station, this.handleSong)
    this.socket.emit('station', { station: this.props.station })
    this.startAudio()

    if (cb) cb()
  }

  startAudio = () => {
    this.audio = new Audio(`https://play.squid-radio.net/${this.props.station}?cache_ts=${new Date().getTime()}`)
    this.audio.onpause = () => {
      this.setState({ playing: false })
      this.spin.pause()
      anime({
        targets: '.vinyl',
        rotate: '180deg',
        duration: 2000,
        easing: 'easeOutBack',
        autoplay: true
      })
    }
    this.audio.onplay = () => {
      if (!this.state.started) {
        androidMetadata(this.state.songData)

        const newArt = `https://squid-radio.net/covers/${this.state.songData.album}.jpg`

        setTimeout(() => {
          this.setState({ currentArt: newArt })
        }, 1.5 * 1000)
      }

      this.setState({ started: true })
      this.setState({ playing: true })
    }
    this.audio.onended = () => {
      console.log('Stream Ended. Restarting')
      this.startAudio()
    }
    this.audio.loop = false
    this.audio.play()
    this.audio.volume = 1
  }

  handlePlay = () => {
    if (this.state.playing) this.audio.pause()
    else {
      this.audio.load()
      this.audio.play()
      this.audio.volume = 1
    }
  }

  handleSong = data => {
    console.log(data)
    if (data !== null) {
      if (this.state.started) {
        this.setState({ songData: data, min: false })
        androidMetadata(data)

        const newArt = `https://squid-radio.net/covers/${data.album}.jpg`
        setTimeout(() => {
          this.setState({ currentArt: newArt })
        }, 1.5 * 1000)

        clearTimeout(this.minTimeout)

        this.cycleHide()
      }
    }
  }

  cycleHide () {
    clearTimeout(this.minTimeout)
    this.minTimeout = setTimeout(() => this.setState({ min: !this.state.min }, this.cycleHide), !this.state.min ? 50 * 1000 : 20 * 1000)
  }

  componentDidMount () {
    this.spin = anime({
      targets: `.${styles.vinyl}`,
      rotate: '1turn',
      loop: true,
      duration: 1500,
      easing: 'linear',
      autoplay: true
    })
    this.startSocket()
    setInterval(() => this.setState({ maxWidth: $(`.${styles['music-player']}`).outerWidth() }), 1000)
  }

  render () {
    return (
      <Container fluid>
        <div className={joinClasses('music-player-container', this.state.min ? 'min' : '')}>
          <div className={joinClasses('music-player')}>
            <div className={styles['song-data']}>
              <h1 className={styles['artist-name']}>{this.state.songData.artist}</h1>
              <h2 className={styles['song-title']}>{this.state.songData.title}</h2>
              <h3 className={styles['album-title']}>{this.state.songData.album}</h3>
            </div>
          </div>
          <div className={styles['album-container']}>
            <div className={styles['album-box']} style={{ left: this.state.min ? `-${this.state.maxWidth - 5}px` : null }}>
              <div
                style={{ backgroundImage: `url("https://squid-radio.net/covers/${this.state.songData.album}.jpg"), url("/images/logo/soc_${this.props.station}.png")` }}
                className={joinClasses('album-art')}
              />
              <div className={styles.vinyl} style={{ backgroundImage: `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/83141/vinyl.png"), url("/images/station/station_${this.props.station}.png")` }} />
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

function joinClasses (...classes) {
  return classes.map(c => styles[c] || c).join(' ')
}
