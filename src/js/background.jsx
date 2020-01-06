import React from 'react'
import info from './bg.json'
import Config from './Config'
import anime from 'animejs/lib/anime.es.js'

class ItemBG extends React.Component {
  render () {
    const bg = info[this.props.station][this.props.index] || (this.props.index < 0 ? info[this.props.station][info[this.props.station].length - 1] : info[this.props.station][0])
    const type = bg.endsWith('.mp4') ? 'video' : 'image'
    switch (type) {
      case 'video':
        return (
          <video className='myBG' autoPlay muted loop id={this.props.id}>
            <source src={bg} type='video/mp4' />
          </video>
        )

      default:
        return (
          <div
            className='myBG'
            id={this.props.id}
            style={{
              backgroundImage: `url("${bg}")`
            }}
          />
        )
    }
  }
}

export default class Background extends React.Component {
  spin = {}
  state = {
    anim: 'stale',
    bgIndex: Math.floor(Math.random() * info[this.props.station].length)
  }

  updateBG = () => {
    if (this.state.anim === 'running') return

    this.spin.play()
    this.setState({ anim: 'running' }, () => {
      this.bgdrag.play()
    })
  }

  componentDidMount () {
    this.spin = anime({
      targets: '#swapBG',
      rotate: '1turn',
      duration: 1100,
      easing: 'spring(1, 50, 10, 0)',
      autoplay: false
    })

    this.bgdrag = anime({
      targets: '#newBG',
      duration: 1100,
      translateX: '100%',
      easing: 'spring(1, 80, 10, 0)',
      autoplay: false,
      complete: (anim) => {
        let index = this.state.bgIndex
        if (index + 1 >= info[this.props.station].length) index = 0
        else index++
        this.setState({ anim: 'stale', bgIndex: index }, () => {
          anim.reset()
        })
      }
    })
  }

  render () {
    return (
      <>
        <Config station={this.props.station} handleBG={this.updateBG.bind(this)} handleStation={this.props.updateStation} />
        <ItemBG id='currentBG' station={this.props.station} index={this.state.bgIndex} />
        <ItemBG id='newBG' station={this.props.station} index={this.state.bgIndex + 1} />
      </>
    )
  }
}
