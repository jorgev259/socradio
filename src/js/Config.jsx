import { Component } from 'react'
import SwapBG from './SwapBG'
import Station from './Station'
import '../css/Config.css'
// import SongSkip from './SongSkip'

export default class Config extends Component {
  render () {
    return (
      <div className='config'>
        {/* <SongSkip socket={this.props.socket} station={this.props.station} /> */}
        <Station station={this.props.station} onStation={this.props.handleStation} />
        <SwapBG onHandleBG={this.props.handleBG} />
      </div>
    )
  }
}
