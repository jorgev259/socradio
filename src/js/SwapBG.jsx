import React from 'React'
import { FiImage } from 'react-icons/fi'

export default class SwapBG extends React.Component {
  render () {
    return (
      <div className='config-list'>
        <div className='config-row' onClick={this.props.onHandleBG}>
          <div className='config-icon'>
            <FiImage
              id='swapBG'
              style={{
                height: '30px',
                width: '30px'
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}
