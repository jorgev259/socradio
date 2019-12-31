import React from 'react'
import info from './bg.json'
import Config from './SwapBG'

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

  updateBG () {
    let index = info[this.station].findIndex(e => e === this.state.background)
    if (index + 1 === info[this.station].length) index = 0
    else index++

    this.setState({ background: info[this.station][index] })
  }

  render () {
    const background = this.state.background
    return (
      <>
        <Config handleBG={this.updateBG.bind(this)} />
        {getType(background)}
      </>
    )
  }
}

function getType (bg) {
  const type = bg.endsWith('.mp4') ? 'video' : 'image'
  switch (type) {
    case 'video':
      return (
        <video autoPlay muted loop id='myBG'>
          <source src={bg} type='video/mp4' />
        </video>
      )

    default:
      return (
        <div
          id='myBG'
          style={{
            backgroundImage: `url("${bg}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
      )
  }
}
