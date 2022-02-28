import { useState, useEffect, useCallback, Fragment } from 'react'
import { Container, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import useAxios from 'axios-hooks'
import { initiateSocket, disconnectSocket, subscribeToStation } from './Socket'
import Slider from './js/Slider'
import Marquee from './js/Marquee'
import { A } from 'hookrouter'

import styles from './css/player.module.scss'

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

export default function Player (props) {
  const { audio, ref: audioRef, playing } = useAudioRef()
  const [{ data }] = useAxios('https://squid-radio.net/api/meta')
  const [volume, setVolumeState] = useState(0.5)
  const [song, setSong] = useState({
    album: 'The Best Videogame Music 24/7',
    title: '',
    artist: ''
  })

  useEffect(() => {
    if (audio) {
      audio.src = `https://play.sittingonclouds.net/${props.station}`
      audio.load()
      audio.play()
    }
    initiateSocket()
    subscribeToStation(props.station, msg => setSong(msg))

    return () => {
      disconnectSocket()
    }
    // eslint-disable-next-line
  }, [props.station])

  function defaultBackground (ev) {
    ev.target.src = `/images/logo/soc_${props.station}.png`
  }

  function setPlay () {
    if (playing) audio.pause()
    else {
      audio.load()
      audio.play()
    }
  }

  function setVolume (ev, value) {
    audio.volume = value
    setVolumeState(value)
  }

  return (
    <Container className={classnames(styles.player, 'text-center px-2 px-md-0 h-100 d-flex align-items-center justify-content-center flex-column')}>
      <audio ref={audioRef} preload='none' id='erplayer-audio' src={`https://play.sittingonclouds.net/${props.station}`} volume={volume} />
      <div className={styles.background}>
        <div className={styles.effect} />
        <img src={`https://squid-radio.net/covers/${song.album}.jpg`} onError={defaultBackground} alt='' />
      </div>

      <Row className={classnames(styles.content, 'justify-content-center my-2 w-100')}>
        <Col xs='auto'>
          <div className={styles.station}>
            <img src={`/images/station/station_${props.station}.png`} alt='' />
          </div>
        </Col>
      </Row>
      <Row className={classnames(styles.content, 'justify-content-center w-100')}>
        <Col xs='auto'>
          <Row style={{ height: `${2 / 5 * 100}%`, fontSize: '45px' }}>
            <Col className={styles.data}>
              <Marquee text={song.artist} />
            </Col>
          </Row>
          <Row style={{ height: `${2 / 5 * 100}%`, fontSize: '45px' }}>
            <Col className={styles.data}>
              <Marquee text={song.title} />
            </Col>
          </Row>
          <Row style={{ height: `${1 / 5 * 100}%`, fontSize: '25px' }}>
            <Col className={styles.data}>
              <Marquee text={song.album} />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className='my-4'>
        <Col>
          <span className={styles.stations}>Available stations: <br className='d-block d-md-none' />
            {data &&
          Object.keys(data).filter(s => s !== 'undefined').map((stationName, i, arr) => (
            <Fragment key={stationName}>
              {stationName === props.station
                ? <span className={styles.current}>{stationName}</span>
                : <A disabled href={`/${stationName}`}>{stationName}</A>}
              {arr.length - 1 !== i && ' - '}
            </Fragment>
          ))}
          </span>
        </Col>
      </Row>

      <Row className='mt-4 w-100 justify-content-center'>
        <Col xs={12} md={4}>
          <Row className='justify-content-center'>
            <Col md={12}>
              <Slider handleChange={setVolume} value={volume} />
            </Col>
            <Col xs='auto' className='mt-3'>
              <div onClick={setPlay} className={classnames(styles.playpause, { [styles.playing]: playing })}>
                <label htmlFor={styles.playpause} tabIndex={1} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
