import React from 'React'
import axios from 'axios'
import io from 'socket.io-client'
import { FiRadio, FiArrowDown } from 'react-icons/fi'
import { navigate } from 'hookrouter'
// import anime from 'animejs/lib/anime.es.js'

export default class Station extends React.Component {
  state = { open: false, stations: {} }
  socket = io('https://api.squid-radio.net')

  componentDidMount () {
    /* this.spin = anime({
      targets: '.config-item',
      rotate: '1turn',
      duration: 1100,
      easing: 'spring(1, 50, 10, 0)',
      autoplay: false
    }) */
    axios.get('https://api.squid-radio.net/stations')
      .then(res => {
        console.log(res.data)
        const defaultStations = {}
        res.data.forEach(station => { defaultStations[station] = { title: '', artist: '', album: '' } })
        this.setState({ stations: defaultStations }, () => {
          res.data.forEach(station => {
            this.socket.on(station, (data) => {
              if (data !== null) {
                const dataIn = this.state.stations
                dataIn[station] = data
                this.setState({ stations: dataIn })
              }
            })
          })
        })
      })
      .catch(err => {
        console.log('failed to fetch stations')
        console.log(err)
      })
  }

  handleToggle = () => {
    // this.spin.restart()
    this.setState({ open: !this.state.open })
  }

  render () {
    return (
      <div className='config-list'>
        <div className='config-row'>
          <div className='config-icon' onClick={this.handleToggle}>
            {this.state.open ? (
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
        {this.state.open ? (
          Object.keys(this.state.stations).filter(station => station !== this.props.station).map(station =>
            <div className='config-row' key={station}>
              <div className='config-label'>Now Playing: {`${this.state.stations[station].artist} - ${this.state.stations[station].title}`}</div>
              <img className='config-img' alt='station logo' src={`/images/station/station_${station}.png`} onClick={() => this.props.onStation(station, () => navigate(`/${station}`))} />
            </div>
          )
        ) : null}

      </div>
    )
  }
}
