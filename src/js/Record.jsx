import React, { useEffect } from 'react'
import $ from 'jquery'

export default function Record ({ playing, station }) {
  useEffect(() => {
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

    $(document).ready(resizePlayerEffect)
  }, [])

  return (
    <div className='split' id='recordDiv' style={{ right: '-183px', left: '183px' }}>
      <img alt='record' id='record' className='record' src={`/images/record/record_${station}.png`} />
    </div>
  )
}
