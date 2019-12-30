import React from 'react'
import $ from 'jquery'

export default class Record extends React.Component {
  componentDidMount () {
    var recordWidth = $('#split1').width()
    $(window).resize(function () {
      if (recordWidth === $('#split1').width()) {
        return
      }
      resizePlayerEffect()
    })

    function resizePlayerEffect () {
      recordWidth = $('#split1').width()
      var posLeft = $('#recordDiv').position().left
      if (posLeft !== 0) {
        var left = ($('#playerCardImage').width() - $('#recordDiv').width()) - 1
        $('#recordDiv').css({ right: '-' + left + 'px', left: left + 'px' })
      }
    }

    $(document).ready(() => {
      resizePlayerEffect()
      console.log($('#record').webkitAnimationPlayState)
    })
  }

  render () {
    return (
      <div className='split' id='recordDiv' style={{ right: '-183px', left: '183px' }}>
        <img alt='record' id='record' className='record' src={`/images/record/record_${this.props.station}.png`} />
      </div>
    )
  }
}
