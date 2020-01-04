import React from 'React'
import { FiImage } from 'react-icons/fi'

export default class SwapBG extends React.Component {
  render () {
    return (
      <div className='config-item' onClick={this.props.onHandleBG}>
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
