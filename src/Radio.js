import React, { useState, useEffect, useRef, useCallback } from 'react'

import { Container } from 'reactstrap'
import { MdPlayArrow, MdPause, MdVolumeOff } from 'react-icons/md'
import { initiateSocket, disconnectSocket, subscribeToStation } from './Socket'

import './css/player.css'
import './css/main.css'
import './css/material.css'
import './css/font.css'

import './css/animate.min.css'
import './css/material-font.css'
import './css/materialize.min.css'

import './css/roboto.css'

import 'dat.gui'
import Background from './js/Background'
import Record from './js/Record'

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

export default function Radio ({ station }) {
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
  }, [station])

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
    <Container>
      <Background station={station} />
      <audio ref={audioRef} preload='none' src={`https://play.squid-radio.net/${station}`} volume={volume} />
      <div id='titlepara' className='slidepara headerpara' style={{ height: '100%' }}>
        <div className='row'>
          <div className='col s12 m10 offset-m1' id='TooHotCard'>
            <div className='card z-depth-5' style={{ borderRadius: '20px' }} id='TooHotPlayer'>
              <div className='card-image' id='playerCardImage'>
                <div className='col s10 m8 l6' id='artDiv' style={{ paddingLeft: 0 }}>
                  <Record station={station} playing={playing} />
                  <div
                    className='active splitimg' id='split1'
                    style={{ backgroundColor: 'rgb(51, 51, 51)', height: '100%', borderRadius: '20px 0 0' }}
                  >
                    <div id='albutwt' style={{ height: '100%', width: '100%' }}>
                      <img alt='' onError={handleDefaultSrc} src={`images/logo/soc_${station}.png`} />
                    </div>

                  </div>
                </div>
                <div
                  id='cardFABPlay'
                  className='btn-floating z-depth-5 btn-large halfway-fab waves-effect waves-light red card-button'
                  style={{ zIndex: 2 }}
                >
                  <i className='card-icon' id='playPauseIcon'>
                    {volume === 0 ? <MdVolumeOff onClick={setPlay} />
                      : playing ? <MdPause onClick={setPlay} /> : <MdPlayArrow onClick={setPlay} />}
                  </i>
                </div>
              </div>
              <div className='card-content black-text z-depth-5 left-align' id='playerControls'>
                <canvas id='canvas' className='equaliser' />
                <div className='row'>
                  <div className='col s12'>
                    <span className='card-title playerText truncate' id='cardTitle'>{song.title}</span>
                  </div>
                  <div className='col s7'>
                    <p className='playerText truncate' id='cardArtist'>{song.artist}</p>
                  </div>
                  <VolumeBar volume={volume} setVolume={setVolume} />
                  <div className='col s7'>
                    <p className='playerText truncate' id='cardAlbum'>{song.album}</p>
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
    </Container>
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
  }, [volumeDrag])

  return (
    <div className='right'>
      <div className='switch'>
        <div
          className='volume' title='Set volume' ref={volumeElement}
          onMouseDown={e => { setDrag(true); updateVolume(e.pageX) }}
        >
          <span style={{ width: `${volume * 100}%` }} className='volumeBar' />
        </div>
      </div>
    </div>
  )
}
