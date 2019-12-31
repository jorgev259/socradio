import React from 'React'
import '../css/SwapBG.css'
import { FiImage } from 'react-icons/fi'

export default class Config extends React.Component {
  render () {
    return (
      <div className='config-btn' onClick={this.props.handleBG}>
        <FiImage
          id='swapBG'
          style={{
            height: '30px',
            width: '30px'
          }}
        />
      </div>
    )
  }
}
