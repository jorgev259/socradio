
/* global $, gradient, AudioContext, requestAnimationFrame */
var gainNode, highPass, lowPass, ctx, WIDTH, HEIGHT

window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext

$(document).ready(function () {
  setTimeout(function () {
    function visualize () {
      WIDTH = canvas.width
      HEIGHT = canvas.height

      var visualSetting = 'frequencybars'
      console.log(visualSetting)

      if (visualSetting === 'sinewave') {
        analyser.fftSize = 2048
        var bufferLength = analyser.fftSize
        console.log(bufferLength)
        var dataArray = new Uint8Array(bufferLength)

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)

        var draw = function () {
          drawVisual = requestAnimationFrame(draw)

          analyser.getByteTimeDomainData(dataArray)

          canvasCtx.fillStyle = 'rgb(200, 200, 200)'
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

          canvasCtx.lineWidth = 2
          canvasCtx.strokeStyle = 'rgb(0, 0, 0)'

          canvasCtx.beginPath()

          var sliceWidth = WIDTH * 1.0 / bufferLength
          var x = 0

          for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128.0
            var y = v * HEIGHT / 2

            if (i === 0) {
              canvasCtx.moveTo(x, y)
            } else {
              canvasCtx.lineTo(x, y)
            }

            x += sliceWidth
          }

          canvasCtx.lineTo(canvas.width, canvas.height / 2)
          canvasCtx.stroke()
        }

        draw()
      } else if (visualSetting === 'frequencybars') {
        analyser.fftSize = 128
        var bufferLengthAlt = analyser.frequencyBinCount
        console.log(bufferLengthAlt)
        var dataArrayAlt = new Uint8Array(bufferLengthAlt)

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)

        var drawAlt = function () {
          drawVisual = requestAnimationFrame(drawAlt)

          analyser.getByteFrequencyData(dataArrayAlt)
          canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)
          canvasCtx.fillStyle = '#0000'
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

          var barWidth = (WIDTH / bufferLengthAlt) * 2
          var barHeight
          var x = 0

          for (var i = 0; i < bufferLengthAlt; i++) {
            barHeight = dataArrayAlt[i]

            //   canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
            canvasCtx.fillStyle = '#ee4236'
            canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2)
            x += barWidth + 1
            //    x += barWidth;
          }
        }

        drawAlt()
      } else if (visualSetting === 'off') {
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)
        canvasCtx.fillStyle = 'red'
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)
      } else if (visualSetting === 'caps') {
        analyser.fftSize = 256

        renderFrame()
      }
    }

    var audio = document.getElementById('audio-player')
    ctx = new AudioContext()

    var analyser = ctx.createAnalyser()
    analyser.minDecibels = -80
    analyser.maxDecibels = -15
    analyser.smoothingTimeConstant = 0.85
    var audioSrc = ctx.createMediaElementSource(audio)
    gainNode = ctx.createGain()
    highPass = ctx.createBiquadFilter()
    highPass.type = 'highshelf'
    highPass.frequency.setTargetAtTime(15000, ctx.currentTime, 1)
    highPass.gain.setTargetAtTime(6, ctx.currentTime, 1)
    lowPass = ctx.createBiquadFilter()
    lowPass.type = 'lowshelf'
    lowPass.frequency.setTargetAtTime(800, ctx.currentTime, 1)
    lowPass.gain.setTargetAtTime(-3, ctx.currentTime, 1)
    gainNode.gain.setTargetAtTime(0.1, ctx.currentTime, 0.5)
    audioSrc.connect(highPass)
    highPass.connect(lowPass)
    lowPass.connect(analyser)
    analyser.connect(gainNode)
    gainNode.connect(ctx.destination)
    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

    // frequencyBinCount tells you how many values you'll receive from the analyser
    // var frequencyData = new Uint8Array(analyser.frequencyBinCount)
    // we're ready to receive some data!
    var canvas = document.getElementById('canvas')
    var canvasCtx = canvas.getContext('2d')
    // var intendedWidth = document.getElementById('canvas').clientWidth
    var intendedHeight = document.getElementById('playerControls').clientHeight
    canvas.style.height = intendedHeight + 'px'
    var drawVisual
    var meterWidth = 10
    var cwidth = 300
    var cheight = 150
    // var gap = 2 // gap between meters
    // var totalWidth = meterWidth + gap
    var capHeight = 2
    var capStyle = '#000'
    var meterNum = 300 / 12
    var capYPositionArray = []
    var gradient = canvasCtx.createLinearGradient(0, 0, 0, 200)
    gradient.addColorStop(0, '#000')
    gradient.addColorStop(1, '#ee4236')
    // loop
    function renderFrame () {
      var array = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(array)
      var step = Math.floor(array.length / meterNum) // sample limited data from the total array
      canvasCtx.clearRect(0, 0, cwidth, cheight)
      for (var i = 0; i < meterNum; i++) {
        var value = array[i * step]
        if (capYPositionArray.length < Math.round(meterNum)) {
          capYPositionArray.push(value)
        };
        canvasCtx.fillStyle = capStyle
        // draw the cap, with transition effect
        if (value < capYPositionArray[i]) {
          canvasCtx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight)
        } else {
          canvasCtx.fillRect(i * 12, cheight - value, meterWidth, capHeight)
          capYPositionArray[i] = value
        };
        canvasCtx.fillStyle = gradient // set the filllStyle to gradient for a better look
        canvasCtx.fillRect(i * 12 /* meterWidth+gap */, cheight - value + capHeight, meterWidth, cheight) // the meter
      }
      requestAnimationFrame(renderFrame)
    }
    visualize()
    highPass.frequency.setTargetAtTime(16000, ctx.currentTime, 1)
    lowPass.frequency.setTargetAtTime(800, ctx.currentTime, 1)
    highPass.gain.setTargetAtTime(3, ctx.currentTime, 1)
    lowPass.gain.setTargetAtTime(-3, ctx.currentTime, 1)
    setTimeout(function () {
      if (!session) {
        audio.play()
      }
      gainNode.gain.setTargetAtTime(1, ctx.currentTime, 0.1)
    }, 2500)
  })
}, 5000)

function newSpectrum () {
  var audio = document.getElementById('audio-player')
  var ctx = new AudioContext()
  var analyser = ctx.createAnalyser()
  var audioSrc = ctx.createMediaElementSource(audio)
  // we have to connect the MediaElementSource with the analyser
  audioSrc.connect(analyser)
  analyser.connect(ctx.destination)
  // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
  // analyser.fftSize = 64;
  // frequencyBinCount tells you how many values you'll receive from the analyser
  // var frequencyData = new Uint8Array(analyser.frequencyBinCount)

  // we're ready to receive some data!
  var canvas = document.getElementById('canvas')
  var cwidth = canvas.width
  var cheight = canvas.height - 2
  var meterWidth = 10 // width of the meters in the spectrum
  // var gap = 2 // gap between meters
  var capHeight = 2
  var capStyle = '#fff'
  var meterNum = 300 / (10 + 2) // count of the meters
  var capYPositionArray = [] /// /store the vertical position of hte caps for the preivous frame
  ctx = canvas.getContext('2d')
  var gradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(1, '#0f0')
  gradient.addColorStop(0.5, '#ff0')
  gradient.addColorStop(0, '#f00')
  // loop
  function renderFrame () {
    var array = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(array)
    var step = Math.round(array.length / meterNum) // sample limited data from the total array
    ctx.clearRect(0, 0, cwidth, cheight)
    for (var i = 0; i < meterNum; i++) {
      var value = array[i * step]
      if (capYPositionArray.length < Math.round(meterNum)) {
        capYPositionArray.push(value)
      };
      ctx.fillStyle = capStyle
      // draw the cap, with transition effect
      if (value < capYPositionArray[i]) {
        ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight)
      } else {
        ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight)
        capYPositionArray[i] = value
      };
      ctx.fillStyle = gradient // set the filllStyle to gradient for a better look
      ctx.fillRect(i * 12 /* meterWidth+gap */, cheight - value + capHeight, meterWidth, cheight) // the meter
    }
    requestAnimationFrame(renderFrame)
  }
  renderFrame()
  audio.play()
}
