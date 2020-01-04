import React from 'react'
import info from './bg.json'
import Config from './Config'
import anime from 'animejs/lib/anime.es.js'

export default class Background extends React.Component {
  spin = {}
  state = {
    anim: 'stale',
    bgIndex: Math.floor(Math.random() * info[this.props.station].length)
  }

  updateBG () {
    const context = this
    let index = this.state.bgIndex
    if (index + 1 >= info[this.props.station].length) index = 0
    else index++
    this.spin.restart()
    this.setState({ anim: 'running', bgIndex: index }, function () {
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

  getType (id, index, z) {
    const bg = info[this.props.station][index] || (index < 0 ? info[this.props.station][info[this.props.station].length - 1] : info[this.props.station][0])
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
        return this.getType('myBG', this.state.bgIndex, 1)

      case 'running': {
        const newBG = this.getType('newBG', this.state.bgIndex, 2)
        const oldBG = this.getType('oldBG', this.state.bgIndex - 1, 1)
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
        <Config station={this.props.station} handleBG={this.updateBG.bind(this)} handleStation={this.props.updateStation} />
        {this.getAnim()}
      </>
    )
  }
}
