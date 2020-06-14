import React from 'react'
import axios from 'axios'
import { FiSkipForward, FiCheck, FiX } from 'react-icons/fi'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default class SongSkip extends React.Component {
  state = { voting: false, voted: false, votes: 0, needed: 0 }
  componentDidUpdate () {
    if (this.props.socket && !this.socket) {
      this.socket = this.props.socket
      this.socket.on('skip_start', data => {
        if (data.station === this.props.station) this.setState({ voting: true, voted: false })
      })

      this.socket.on('skip_end', data => {
        if (data.station === this.props.station) this.setState({ voting: false })
      })

      this.socket.on('skip_vote', data => {
        if (data.station === this.props.station) this.setState({ votes: data.votes, needed: data.needed })
      })
    }
  }

  handleStartVote = () => {
    axios.post('https://api.squid-radio.net/skip', { station: this.props.station })
  }

  handleVote = (vote) => {
    this.socket.emit('skip_vote', { station: this.props.station, vote: vote })
    this.setState({ voted: true })
  }

  render () {
    return (
      <div className='config-list'>
        <div className='config-row'>
          {this.state.voting ? <VoteActive onHandleVote={this.handleVote} socket={this.socket} station={this.props.station} needed={this.state.needed} voted={this.state.voted} votes={this.state.votes} /> : null}
          <div className='config-icon' onClick={this.state.voting ? null : this.handleStartVote}>
            {this.state.voting ? (
              <CountdownCircleTimer
                isPlaying
                durationSeconds={30}
                size={55}
                strokeWidth={5}
                trailColor='#f44336'
                renderTime={value => {
                  return value
                }}
                colors={[
                  ['#ffffff']
                ]}
              />
            ) : (
              <FiSkipForward
                id='SongSkip'
                style={{
                  height: '30px',
                  width: '30px'
                }}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export class VoteActive extends React.Component {
  render () {
    return (
      <div style={{
        display: 'flex',
        position: 'fixed',
        right: '75px',
        bottom: '145px',
        height: '85px',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <div
          className='config-label'
          style={{
            display: this.props.voted ? 'flex' : 'block',
            padding: '10px',
            textAlign: 'center'
          }}
        >
          {this.props.voted ? (
            <div style={{ display: 'inline-table' }}>Voting progress: {this.props.votes} / {this.props.needed}</div>
          ) : (
            <>
              <div>Want to skip the current song?</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', marginTop: '10px' }}>
                <div className='config-icon inverse' style={{ marginRight: '10px' }}>
                  <FiX
                    id='SongSkip'
                    style={{
                      height: '30px',
                      width: '30px'
                    }}

                    onClick={() => this.props.onHandleVote(false)}
                  />
                </div>
                <div className='config-icon inverse'>
                  <FiCheck
                    id='SongSkip'
                    style={{
                      height: '30px',
                      width: '30px'
                    }}

                    onClick={() => this.props.onHandleVote(true)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}
