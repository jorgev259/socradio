import { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import { initiateSocket, disconnectSocket, subscribeToStation } from './Socket'

import styles from './css/NewPlayer.module.scss'

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
  const { audio, ref: audioRef, playing, loading } = useAudioRef()
  const [station, setStation] = useState(props.station)
  const [volume, setVolumeState] = useState(0.5)
  const [open, setOpen] = useState(false)
  const [song, setSong] = useState({
    album: 'The Best Videogame Music 24/7',
    title: '',
    artist: ''
  })

  useEffect(() => {
    if (audio) {
      audio.src = `https://play.squid-radio.net/${station}`
      audio.load()
      audio.play()
    }
    initiateSocket()
    subscribeToStation(station, msg => setSong(msg))

    return () => {
      disconnectSocket()
    }
    // eslint-disable-next-line
  }, [station])

  function defaultBackground (ev) {
    ev.target.src = `/images/logo/soc_${station}.png`
  }

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

  return (
    <Container fluid className='p-0 h-100 d-flex align-items-center justify-content-center flex-column'>
        <audio ref={audioRef} preload='none' id='erplayer-audio' src='https://play.squid-radio.net/clouds' volume={volume} />
       <div className={styles.background}>
         <div className={styles.effect}></div>
          <img src={`https://squid-radio.net/covers/${song.album}.jpg`} onError={defaultBackground} alt='' />
        </div>

        <Row className={classnames(styles.content)}>
                   <Col xs='auto'>
                     <div className={styles.station}>
                       <img src={`/images/station/station_${station}.png`} alt='' />
                      </div>
                   </Col>
                   <Col xs='auto' >
                     <Row style={{ height: `${2 / 5 * 100}%` }}>
                       <Col>
                         <span style={{ fontSize: '50px', verticalAlign: 'middle' }}>{song.artist}</span>
                       </Col>
                     </Row>
                     <Row style={{ height: `${2 / 5 * 100}%`, verticalAlign: 'middle' }}>
                       <Col>
                         <span style={{ fontSize: '50px' }}>{song.title}</span>
                       </Col>
                     </Row>
                     <Row style={{ height: `${1 / 5 * 100}%`, verticalAlign: 'middle' }}>
                       <Col>
                         <span style={{ fontSize: '25px' }}>{song.album}</span>
                       </Col>
                     </Row>
                    </Col>
                    </Row>

                    <Row className='mt-4'>
                      <Col>
                        <div onClick={setPlay} className={classnames(styles.playpause, { [styles.playing]: playing })}>
                          <label htmlFor={styles.playpause} tabIndex={1}></label>
                        </div>
                      </Col>
                    </Row>
    </Container>
  )
}
