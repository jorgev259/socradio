import React from 'react'
import info from './bg.json'
import Config from './SwapBG'
import anime from 'animejs/lib/anime.es.js'

export default class Background extends React.Component {
  station = window.location.pathname.replace('/', '') || 'clouds'
  spin = {}
  state = {
    anim: 'stale',
    station: this.station,
    oldBackground: '',
    background: info[this.station][Math.floor(Math.random() * info[this.station].length)]
  }

  updateBG () {
    const context = this
    let index = info[this.station].findIndex(e => e === this.state.background)
    if (index + 1 === info[this.station].length) index = 0
    else index++
    this.spin.restart()
    this.setState({ anim: 'running', oldBackground: this.state.background, background: info[this.station][index] }, function () {
      anime({
        targets: '#newBG',
        duration: 4000,
        translateX: '100%',
        easing: 'spring(1, 80, 10, 0)',
        complete: function (anim) {
          context.setState({ anim: 'stale' })
        }
      })
    })
  }

  getType (id, bg, z) {
    const type = bg.endsWith('.mp4') ? 'video' : 'image'
    switch (type) {
      case 'video':
        return (
          <video className='myBG' autoPlay muted loop id={id} style={{ zIndex: z }}>
            <source src={bg} type='video/mp4' />
          </video>
        )

      default:
        return (
          <div
            className='myBG'
            id={id}
            style={{
              zIndex: z,
              backgroundImage: `url("${bg}")`
            }}
          />
        )
    }
  }

  getAnim () {
    switch (this.state.anim) {
      case 'stale':
        return this.getType('myBG', this.state.background, 1)

      case 'running': {
        const newBG = this.getType('newBG', this.state.background, 2)
        const oldBG = this.getType('oldBG', this.state.oldBackground, 1)
        return (
          <>
            {oldBG}
            {newBG}
          </>
        )
      }
    }
  }

  componentDidMount () {
    this.spin = anime({
      targets: '#swapBG',
      rotate: '1turn',
      duration: 1100,
      easing: 'spring(1, 50, 10, 0)',
      autoplay: false
    })
  }

  render () {
    return (
      <>
        <Config handleBG={this.updateBG.bind(this)} />
        {this.getAnim()}
      </>
    )
  }
}
