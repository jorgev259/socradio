import React from 'react'
import info from './bg.json'

/* const routes = {
  '/': () => (
    <video autoPlay muted loop id='myBG'>
      <source src='images/bg/fire_logo.mp4' type='video/mp4' />
    </video>
  ),
  '/persona': () => (
    <div
      id='myBG'
      style={{
        backgroundImage: 'url("images/bg/persona_2.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    />
  ),
  '/anime': () => (
    <div
      id='myBG'
      style={{
        backgroundImage: 'url("images/bg/persona_2.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    />
  ),
  '/weekly': () => (
    <div
      id='myBG'
      style={{
        backgroundImage: 'url("images/bg/weekly.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    />
  )
} */

export default class Background extends React.Component {
  station = window.location.pathname.replace('/', '') || 'clouds'
  state = { station: this.station, background: info[this.station][Math.floor(Math.random() * info[this.station].length)] }

  render () {
    const type = this.state.background.endsWith('.mp4') ? 'video' : 'image'
    switch (type) {
      case 'video':
        return (
          <video autoPlay muted loop id='myBG'>
            <source src={this.state.background} type='video/mp4' />
          </video>
        )

      default:
        return (
          <div
            id='myBG'
            style={{
              backgroundImage: `url("${this.state.background}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            }}
          />
        )
    }
  }
}
