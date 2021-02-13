import { useState, useCallback, useEffect, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/erplayer.css'
import classname from 'classnames'
import axios from 'axios'
import { initiateSocket, disconnectSocket, subscribeToStation } from './Socket'
import { Container, Row, Col } from 'reactstrap'

const defaultStations = { sonic: { album: 'Sonic the Hedgehog Café Selection', date: '2017', track: '18/31', disc: '1/1', kind: '{audio=2;video=0;midi=0}', year: '2017', artist: 'Marlon Saunders, Dred Foxx', decoder: 'FFMPEG', title: 'Unknown From M.E.', label: 'SEGA', filename: '/home/rikumax/radio/music/Games/Sonic the Hedgehog/Sonic the Hedgehog Café Selection/18. Unknown From M.E..mp3', publisher: 'SEGA', temporary: 'false', source: 'sonic', tracknumber: '18/31', initial_uri: '/home/rikumax/radio/music/Games/Sonic the Hedgehog/Sonic the Hedgehog Café Selection/18. Unknown From M.E..mp3', playlist_length: '1995', url: 'http://sittingonclouds.net', status: 'playing', discnumber: '1/1', 'release date': 'Jun 23, 2017', albumartist: 'SEGA', on_air: '2021/02/07 23:52:19', rid: '16', comment: 'https://amzn.to/2CNO65U', genre: 'Game Soundtrack', playlist_position: '0', album_artist: 'SEGA' }, persona: { replaygain_track_peak: '0.999939', album: 'PERSONA SUPER LIVE P-SOUND BOMB !!!! 2017 ～港の犯行を目撃せよ!～', track: '6', date: '2018', disc: '1', disctotal: '2', kind: '{audio=2;video=0;midi=0}', artist: 'Lyn & 川村ゆみ & 平田志穂子 & Lotus Juice', decoder: 'FFMPEG', title: '/ Tokyo Emergency', filename: '/home/rikumax/radio/music/Games/Persona/PERSONA SUPER LIVE P-SOUND BOMB!!!! 2017 ~Minato no Hankou wo Mokugekiseyo!~ [FLAC]/Disc 1/1-06 Tokyo Emergency.flac', temporary: 'false', source: 'persona', tracknumber: '6', initial_uri: '/home/rikumax/radio/music/Games/Persona/PERSONA SUPER LIVE P-SOUND BOMB!!!! 2017 ~Minato no Hankou wo Mokugekiseyo!~ [FLAC]/Disc 1/1-06 Tokyo Emergency.flac', playlist_length: '2960', status: 'playing', discnumber: '1', replaygain_track_gain: '-7.44 dB', replaygain_album_gain: '-9.15 dB', albumartist: 'Atlus', on_air: '2021/02/07 23:53:25', tracktotal: '22', rid: '27', replaygain_album_peak: '1.000000', genre: 'Game', playlist_position: '2', album_artist: 'Atlus' }, woomy: { composer: 'Ryo Nagamatsu', album: 'Splatoon 2 ORIGINAL SOUNDTRACK -Octotune-', date: '2018', track: '16/52', disc: '1/2', kind: '{audio=2;video=0;midi=0}', year: '2018', artist: 'Dedf1sh', decoder: 'FFMPEG', title: '#14 crush', label: 'KADOKAWA', filename: '/home/rikumax/radio/music/Games/Splatoon/Splatoon 2 ORIGINAL SOUNDTRACK -Octotune-/Disc 1/1.16 #14 crush.mp3', publisher: 'KADOKAWA', temporary: 'false', source: 'woomy', tracknumber: '16/52', initial_uri: '/home/rikumax/radio/music/Games/Splatoon/Splatoon 2 ORIGINAL SOUNDTRACK -Octotune-/Disc 1/1.16 #14 crush.mp3', playlist_length: '268', url: 'http://sittingonclouds.net', status: 'playing', discnumber: '1/2', 'release date': 'Jul 18, 2018', albumartist: 'KADOKAWA', on_air: '2021/02/07 23:52:32', rid: '21', comment: 'http://sittingonclouds.net', genre: 'Game Soundtrack', playlist_position: '0', album_artist: 'KADOKAWA' }, clouds: { replaygain_track_peak: '0.988708', composer: 'Hitoshi Sakimoto', album: 'FINAL FANTASY TACTICS A2 Grimoire of the Rift Original Soundtrack', track: '12', date: '2007/11/28', disc: '1', disctotal: '2', kind: '{audio=2;video=0;midi=0}', catalog: 'SQEX-10102~3', artist: 'Basiscape', decoder: 'FFMPEG', title: 'Luso', filename: "/home/rikumax/radio/music/Games/Final Fantasy/Side Game Series' Soundtracks & Other Albums/Final Fantasy Tactics A2 Grimoire of the Rift Original Soundtrack/Disc 1/12 - Luso.flac", temporary: 'false', source: 'clouds', tracknumber: '12', initial_uri: "/home/rikumax/radio/music/Games/Final Fantasy/Side Game Series' Soundtracks & Other Albums/Final Fantasy Tactics A2 Grimoire of the Rift Original Soundtrack/Disc 1/12 - Luso.flac", playlist_length: '35793', status: 'playing', discnumber: '1', replaygain_track_gain: '-6.98 dB', replaygain_album_gain: '-6.02 dB', albumartist: 'Hitoshi Sakimoto, Masaharu Iwata, Mitsuhiro Kaneda, Kimihiro Abe, Noriyuki Kamikura', on_air: '2021/02/07 23:53:14', tracktotal: '29', rid: '12', replaygain_album_peak: '0.988770', genre: '', comment: 'Music Composed, Arranged & Produced\r\nby Hitoshi Sakimoto (Basiscape)\r\n\r\nexcept\tDisc 01-01: Composed by Nobuo Uematsu\r\nDisc 01-27: Composed by Kaori Oogoshi (SuperSweep)\r\nDisc 02-10: Composed by Ayako Sasou (SuperSweep)\r\nDisc 02-42: Composed by Mitsuhiro Kaneda (Basiscape)\r\n\r\nArranger: Masaharu Iwata (Basiscape), Mitsuhiro Kaneda (Basiscape), Kimihiro Abe (Basiscape), Noriyuki Kamikura (Basiscape)\r\n\r\n\r\n- Track 01-23 was printed as being from "Ritz" in the booklet but the official website later corrected it.\r\n\r\n- Track 02-03 is originally from the save/load menu theme of Final Fantasy Tactics Advance North American/Europe version.\r\n\r\n- The "Disc 02-42" part is a typo in the booklet itself (there are only 27 tracks on disc 2).　', playlist_position: '2', album_artist: 'Hitoshi Sakimoto, Masaharu Iwata, Mitsuhiro Kaneda, Kimihiro Abe, Noriyuki Kamikura' } }

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
  const [stations, setStations] = useState(defaultStations)
  const { audio, ref: audioRef, playing, loading } = useAudioRef()
  const [volume, setVolumeState] = useState(0.5)
  const [station, setStation] = useState('clouds')
  const [song, setSong] = useState({
    album: 'The Best Videogame Music 24/7',
    title: '',
    artist: ''
  })

  useEffect(() => {
    axios.get('/api/meta').then(res => setStations(res.data))
  }, [])

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

  function setPlay () {
    if (playing) audio.pause()
    else {
      audio.load()
      audio.play()
    }
  }

  /* function setVolume (value) {
    audio.volume = value
    setVolumeState(value)
  } */

  function defaultBackground (ev) {
    ev.target.src = `/images/logo/soc_${station}.png`
  }

  return (
      <div className={classname('erplayer  erplayer--card erplayer--inline erplayer-- erplayer-- erplayer--open-', { 'erplayer-playlist-open': open })} id='erplayer-id-e390574'>
      <div className='h-100 erplayer-content'>
        <div className='h-100 erplayer__container' style={{ opacity: 1 }}>
          <audio ref={audioRef} preload='none' id='erplayer-audio' src='https://play.squid-radio.net/clouds' volume={volume} />
          <div className='erplayer__background'>
            <img src={`https://squid-radio.net/covers/${song.album}.jpg`} onError={defaultBackground} alt='' />
            </div>
          <div className='erplayer__wrapper p-0'>
            <Container fluid className='erplayer__wrapper__container h-100'>
            <Row className='h-100'>
                 <Col className='m-auto' md={10}>
              {!open
                ? (

                 <Row className={classname('d-flex justify-content-center', { open: !open })}>
                   <Col xs='auto'>
                     <div className='erplayer__info__cover my-0' style={{ height: '200px', width: 'auto' }}><img src={`/images/station/station_${station}.png`} alt='' /></div>
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
                  )
                : (
            <Row>
            <Col>
              {stations && (Object.keys(stations).map(stationName => (
                <Fragment key={stationName}>
                  <span style={{ width: '80px', height: '80px' }} className='erplayer__btn erplayer__playlist__cover' onClick={() => setStation(stationName)}>
                    <img src={`/images/station/station_${stationName}.png`} alt='cover' /><i className='erplayer-icon-play erplayer-playIcon' />
                  </span>
                  <h5 className='my-auto' style={{ height: '80px' }}>{capitalize(stationName)}</h5>
                </Fragment>
              )))}
            </Col>
          </Row>
                  )}
                      </Col>
                 </Row>
            </Container>

          </div>

          <span onClick={() => setOpen(!open)} className={classname('erplayer__btn erplayer__openplaylist', { open })}><i className='erplayer-icon-menu erplayer-openicon' /><i className='erplayer-icon-cancel erplayer-closeicon' /></span>
        </div>
      </div>
      </div>

  )
}
