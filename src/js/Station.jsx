import React, { useState, useEffect } from 'react'
import { FiRadio, FiArrowDown } from 'react-icons/fi'
import { navigate } from 'hookrouter'
import useAxios from 'axios-hooks'
import { subscribeToStation } from '../Socket'

export default function Station ({ station }) {
  const [open, setOpen] = useState(false)
  const [stations, setStations] = useState([])
  const [{ data, error }] = useAxios(
    'https://api.squid-radio.net/meta'
  )
  const [songs, setSongs] = useState({})

  useEffect(() => {
    if (data) setStations(Object.keys(data))
  }, [data])

  useEffect(() => {
    if (stations.length > 0) {
      stations.forEach(stationName =>
        subscribeToStation(stationName, msg => {
          const newSong = songs
          songs[msg.source] = msg
          setSongs(newSong)
        })
      )
    }
  }, [stations])

  if (error) console.log(error)

  return (
    <div className='config-list'>
      <div className='config-row'>
        <div className='config-icon' onClick={() => setOpen(!open)}>
          {open ? (
            <FiArrowDown
              style={{
                height: '30px',
                width: '30px'
              }}
            />
          ) : (
            <FiRadio
              style={{
                height: '30px',
                width: '30px'
              }}
            />
          )}
        </div>
      </div>
      {open ? (
        stations.filter(stationName => stationName !== station).map(stationName =>
          <div className='config-row' key={stationName}>
            {songs[stationName] && <div className='config-label'>Now Playing: {`${songs[stationName].artist} - ${songs[stationName].title}`}</div>}
            <img className='config-img' alt='station logo' src={`/images/station/station_${stationName}.png`} onClick={() => navigate(`/${stationName}`)} />
          </div>
        )
      ) : null}

    </div>
  )
}
