import React from 'react'
export default class Flute extends React.Component {
  state={ gifs: [] }
  componentDidMount () {
    this.timeout = setInterval(() => {
      const gifs = this.state.gifs
      const random = randomIntFromInterval(1, 9)
      const randomSize = randomIntFromInterval(100, 250)
      const randomWidth = Math.random() * window.screen.width
      const randomHeight = Math.random() * window.screen.height
      gifs.push({ gif: random, top: randomHeight, left: randomWidth, size: randomSize })
      this.setState({ gifs: gifs })
    }, 10 * 1000)
  }

  render () {
    return (
      <div style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 3, left: 0 }}>
        {
          this.state.gifs.map((e, i) => <img style={{ height: e.size, left: e.left, top: e.top, position: 'absolute' }} key={i} src={`images/flute/${e.gif}.gif`} />)
        }
      </div>
    )
  }
}

function randomIntFromInterval (min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
