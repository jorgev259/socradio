import { Component } from 'react';
import info from './bg.json'
import Config from './Config'
import styles from '../css/main.module.scss'
import anime from 'animejs/lib/anime.es.js'

class ItemBG extends Component {
  render () {
    const bg = info[this.props.station][this.props.index] || (this.props.index < 0 ? info[this.props.station][info[this.props.station].length - 1] : info[this.props.station][0])
    const type = bg.endsWith('.mp4') ? 'video' : 'image'
    switch (type) {
      case 'video':
        return (
          <video className={styles.BG} autoPlay muted loop id={this.props.id}>
            <source src={bg} type='video/mp4' />
          </video>
        )

      default:
        return (
          <div
            className={styles.BG}
            id={this.props.id}
            style={{
              backgroundImage: `url("${bg}")`
            }}
          />
        )
    }
  }
}

export default class Background extends Component {
  state = {
    anim: 'stale',
    bgIndex: Math.floor(Math.random() * info[this.props.station].length)
  }

  updateBG = () => {
    if (this.state.anim === 'running') return

    this.setState({ anim: 'running' }, () => {
      this.bgdrag.play()
    })
  }

  componentDidMount () {
    this.bgdrag = anime({
      targets: `#${styles.newBG}`,
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
        <Config station={this.props.station} handleBG={this.updateBG.bind(this)} />
        <ItemBG id={styles.currentBG} station={this.props.station} index={this.state.bgIndex} />
        <ItemBG id={styles.newBG} station={this.props.station} index={this.state.bgIndex + 1} />
      </>
    )
  }
}
