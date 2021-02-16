import { useState, useEffect, useRef, useCallback } from 'react'

import { Container, Col, Row } from 'reactstrap'
import { MdPlayArrow, MdPause, MdVolumeOff } from 'react-icons/md'
import { initiateSocket, disconnectSocket, subscribeToStation } from './Socket'
import anime from 'animejs/lib/anime.es.js'

import classname from 'classnames'
import styles from './css/main.module.scss'
import './css/roboto.css'

import Background from './js/Background'

const placeholders = [
  "Riku's radio extravaganza",
  "Kobayashi's homemade playlist",
  "Ayanami's Anime Socks",
  "Ritsu's tightly locked treasure"
]

function useAudioRef () {
  const [audio, setAudio] = useState(null)
  const [playing, setPlay] = useState(false)
  const [loading, setLoading] = useState(true)

  const ref = useCallback(node => {
    if (node !== null) {
      node.onplay = () => setPlay(true)
      node.onpause = () => setPlay(false)

      node.onloadstart = () => setLoading(true)
      node.waiting = () => setLoading(true)

      node.onloadeddata = () => setLoading(false)
      node.canplay = () => setLoading(false)
      node.playing = () => setLoading(false)

      setAudio(node)
    }
  }, [])

  return { audio, ref, playing, loading }
}

export default function OldPlayer ({ station }) {
  const recordRef = useRef(null)
  const { audio, ref: audioRef, playing } = useAudioRef()
  const [volume, setVolumeState] = useState(0.5)
  const [song, setSong] = useState({
    album: 'Press the Play button to start the radio',
    title: placeholders[Math.floor(Math.random() * placeholders.length)]
  })

  useEffect(() => {
    if (audio) {
      audio.src = `https://play.squid-radio.net/${station}`
      audio.load()
      if (playing) audio.play()
    }

    initiateSocket()
    subscribeToStation(station, msg => setSong(msg))
    return disconnectSocket
    // eslint-disable-next-line
  }, [station])

  useEffect(() => {
    const spin = anime({
      targets: `.${styles.record} img`,
      rotate: '1turn',
      loop: true,
      duration: 1500,
      easing: 'linear',
      autoplay: false
    })

    recordRef.current = {
      begin: anime({
        targets: `.${styles.record} img`,
        rotate: '180deg',
        duration: 2000,
        easing: 'easeInCubic',
        autoplay: false,
        complete: spin.play
      }),
      end: anime({
        begin: spin.pause,
        targets: `.${styles.record} img`,
        rotate: '360deg',
        duration: 2000,
        easing: 'easeOutBack',
        autoplay: false
      })
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (playing) recordRef.current.begin.play()
    else recordRef.current.end.play()
  }, [playing])

  function setPlay () {
    if (playing) audio.pause()
    else {
      audio.load()
      audio.play()
    }
  }

  function setVolume (value) {
    audio.volume = value
    setVolumeState(value)
  }

  function handleDefaultSrc (ev) {
    ev.target.src = `images/logo/soc_${station}.png`
  }

  return (
    <>
      <audio ref={audioRef} preload='none' src={`https://play.squid-radio.net/${station}`} volume={volume} />
      <Background station={station} />

      <Container className='d-flex'>
        <div className={classname(styles.radio, 'my-auto mx-md-auto')}>
          <Row>
            <Col xs={12} className={classname(styles.images, 'd-flex p-0')}>
              <div className={styles.cover}>
                <img onError={handleDefaultSrc} src={`covers/${song.album}.jpg`} alt='' />
              </div>
              <div className={classname('flex-grow-1', styles.record)}>
                <img src={`/images/record/record_${station}.png`} alt='' />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className={styles.songData}>
              <Row>
                <Col>
                  <span className='text-truncate' id='premidTitle'>{song.title}</span>
                  <p className='text-truncate' id='premidArtist'>{song.artist}</p>
                  <p className='text-truncate' id='premidAlbum'>{song.album}</p>
                </Col>
                <div className={styles.cardPlay}>
                  <i className='card-icon' id='playPauseIcon'>
                    {volume === 0
                      ? <MdVolumeOff onClick={setPlay} />
                      : playing ? <MdPause onClick={setPlay} /> : <MdPlayArrow onClick={setPlay} />}
                  </i>
                </div>
                <Col xs='auto' className='d-flex'>
                  <VolumeBar volume={volume} setVolume={setVolume} />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}

function VolumeBar ({ volume, setVolume }) {
  const [volumeDrag, setDrag] = useState(false)
  const volumeElement = useRef(null)

  function updateVolume (x) {
    let percentage = (x - volumeElement.current.getBoundingClientRect().left) / volumeElement.current.getBoundingClientRect().width
    if (percentage > 1) percentage = 1
    if (percentage < 0) percentage = 0

    setVolume(percentage)
  }

  function mouseUp (e) {
    setDrag(false)
    updateVolume(e.pageX)
  }
  function mouseMove (e) {
    updateVolume(e.pageX)
  }

  useEffect(() => {
    if (volumeDrag) {
      window.addEventListener('mouseup', mouseUp)
      window.addEventListener('mousemove', mouseMove)
    }

    return () => {
      window.removeEventListener('mouseup', mouseUp)
      window.removeEventListener('mousemove', mouseMove)
    }
    // eslint-disable-next-line
  }, [volumeDrag])

  return (
    <div className='align-self-center'>
      <div className='switch'>
        <div
          className={styles.volume} title='Set volume' ref={volumeElement}
          onMouseDown={e => { setDrag(true); updateVolume(e.pageX) }}
        >
          <span style={{ width: `${volume * 100}%` }} className={styles.bar} />
        </div>
      </div>
    </div>
  )
}
