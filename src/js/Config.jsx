import React from 'react'
import SwapBG from './SwapBG'
import Station from './Station'
import '../css/Config.css'

export default class Config extends React.Component {
  render () {
    return (
      <div className='config'>
        <Station station={this.props.station} onStation={this.props.handleStation} />
        <SwapBG onHandleBG={this.props.handleBG} />
      </div>
    )
  }
}
