import { useState, Fragment, useRef, useEffect } from 'react'
import classnames from 'classnames'
import styles from '../css/marquee.module.scss'

export default function Marquee (props) {
  const [boxWidth, setBoxWidth] = useState(0)
  const [textWidth, setTextWidth] = useState(0)
  const boxRef = useRef(null)
  const textRef = useRef(null)

  const [reset, setReset] = useState(false)
  const transRef = useRef(null)

  const overflowed = textWidth > boxWidth
  function handleResize () {
    setTextWidth(textRef.current.scrollWidth)
    setBoxWidth(boxRef.current.clientWidth)
  }

  useEffect(() => {
    if (props.text && boxRef.current && textRef.current) window.addEventListener('resize', handleResize)
  }, [props.text, boxRef.current, textRef.current])

  useEffect(() => { if (reset) setReset(false) }, [reset])

  const duration = props.text.length * 3 / 12

  return (
    <>
      <div ref={boxRef} className={classnames(styles.calc)}><span ref={textRef}>{props.text} - </span></div>
      <div
        ref={transRef} className={classnames(styles.marquee, { [styles.active]: overflowed })}
        onTransitionEnd={() => setReset(!reset)} style={{
          transitionDuration: `${reset ? 0 : duration}s`,
          transform: `translate(-${reset || !overflowed ? 0 : textWidth}px)`
        }}
      >
        {overflowed ? `${props.text} - ${props.text} - ${props.text}` : props.text}
      </div>
    </>
  )
}
