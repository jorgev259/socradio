import React, { useState, useCallback, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/erplayer.css'
import classname from 'classnames'
import useAxios from 'axios-hooks'
import { initiateSocket, disconnectSocket, subscribeToStation } from './Socket'

function capitalize (s) {
  if (typeof s !== 'string') return ''
  return s.trim().replace(/^\w/, (c) => c.toUpperCase())
}

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

export default function Radio () {
  const [open, setOpen] = useState(false)
  const { audio, ref: audioRef, playing, loading } = useAudioRef()
  const [volume, setVolumeState] = useState(0.5)
  const [station, setStation] = useState('clouds')
  const [song, setSong] = useState({
    album: 'The Best Videogame Music 24/7',
    title: '',
    artist: ''
  })

  const [{ data: stations, error }] = useAxios(
    'https://api.squid-radio.net/meta'
  )

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

  if (error) console.log(error)

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
    <div className={classname('erplayer  erplayer--card erplayer--inline erplayer-- erplayer-- erplayer--open-', { 'erplayer-playlist-open': open })} id='erplayer-id-e390574'>
      <div className='h-100 erplayer-content'>
        <div className='h-100 erplayer__container' style={{ opacity: 1 }}>
          <audio ref={audioRef} preload='none' id='erplayer-audio' src='https://play.squid-radio.net/clouds' volume={volume} />
          <div className='erplayer__bgcolor' />
          <div className='erplayer__background'><img src={`https://squid-radio.net/covers/${song.album}.jpg`} alt='' /></div>
          <div className='erplayer__wrapper'>
            <div className='erplayer__wrapper__container'>
              <div className='erplayer__info mb-2'>
                <div className='erplayer__info__cover'><img src={`https://www.squid-radio.net/images/station/station_${station}.png`} alt='' /></div>
                <h3 className='erplayer__info__title erplayer-marquee'>
                  <div className='inner'>
                    {[1, 2, 3, 4].map(i => <span className='mr-3' key={i}>{song.artist} - {song.title}</span>)}
                  </div>
                </h3>
                <h4 className='erplayer__info__artist erplayer-marquee mt-3'>
                  <div className='inner'>
                    {[1, 2, 3, 4].map(i => <span className='mr-3' key={i}>{song.album}</span>)}
                  </div>
                </h4>
              </div>
              <div className={classname('erplayer__controls mt-4', { 'erplayer-playing': playing })}>
                <div className='erplayer__slidercontrol erplayer__slidercontrol--progressbar'>
                  <span className='erplayer__timer'>--:--</span>
                  <div className='erplayer__progressbar erplayer__slidercontrol__slider disabled'>
                    <div className='erplayer__slidercontrol__bar erplayer__playhead' style={{ width: '49px' }} />
                    <div className='erplayer__slidercontrol__bar erplayer__bufferhead' style={{ width: '0px' }} />
                    <div className='erplayer__slidercontrol__trackbar' />
                    <input type='range' className='erplayer__slidercontrol__input' min='0' max='1' step='0.005' defaultValue='0' />
                  </div>
                  <span className='erplayer__duration' />
                </div>

                <span onClick={setPlay} className='erplayer__btn erplayer__play'><i className='erplayer-icon-play' /></span>
                <span onClick={setPlay} className={classname('erplayer__btn erplayer__pause', { loading })} style={{ pointerEvents: 'initial' }}><i className='erplayer-icon-pause' style={{ opacity: 1 }} /></span>

                <div className='mt-2 erplayer__slidercontrol erplayer__slidercontrol--volume'>
                  <span className='erplayer__btn erplayer__mute'><i className='erplayer-icon-volume' /></span>
                  <div className='erplayer__slidercontrol__slider'>
                    <div className='erplayer__volume-bar erplayer__slidercontrol__bar' style={{ width: `${volume * 100}%` }} />
                    <div className='erplayer__slidercontrol__trackbar' />
                    <input type='range' className='erplayer__volume-input erplayer__slidercontrol__input' min='0' max='1' step='0.01' defaultValue={0.5} onChange={ev => setVolume(ev.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <span onClick={() => setOpen(!open)} className={classname('erplayer__btn erplayer__openplaylist', { open })}><i className='erplayer-icon-menu erplayer-openicon' /><i className='erplayer-icon-cancel erplayer-closeicon' /></span>

          <div className={classname('erplayer__playlist', { open })}>
            <ul>
              {stations && (Object.keys(stations).map(stationName => (
                <li key={stationName}>
                  <span className='erplayer__btn erplayer__playlist__cover' onClick={() => setStation(stationName)}>
                    <img src={`https://www.squid-radio.net/images/station/station_${stationName}.png`} alt='cover' /><i className='erplayer-icon-play erplayer-playIcon' />
                    <i className='erplayer-icon-pause erplayer-pauseIcon' />
                  </span>
                  <h5>{capitalize(stationName)}</h5>
                </li>
              )))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
