import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import VolumeDown from '@material-ui/icons/VolumeDown'
import VolumeUp from '@material-ui/icons/VolumeUp'

const useStyles = makeStyles({
  root: {
    color: 'white',
    display: 'flex',
    flexDirection: 'row'
  }
})

export default function ContinuousSlider (props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <VolumeDown className='mx-3' />
      <Slider min={0} max={1} step={0.01} value={props.value} onChange={props.handleChange} aria-labelledby='continuous-slider' />
      <VolumeUp className='mx-3' />
    </div>
  )
}
