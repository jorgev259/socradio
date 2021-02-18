import { useRoutes } from 'hookrouter'
import Widget from './Widget'
import Player from './Player'
import { AudioPlayerProvider } from 'react-use-audio-player'

import './css/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const routes = {
  '/board': () => <Widget station='clouds' icon={false} base='/board' />,
  '/board/:station': ({ station }) => <Widget station={station} icon={false} base='/board' />,
  '/widget': () => <Widget station='clouds' icon base='/widget' />,
  '/widget/:station': ({ station }) => <Widget station={station} icon base='/widget' />,

  '/': () => <Player station='clouds' />,
  '/:station': ({ station }) => <Player station={station} />
}

const App = () => {
  const routeResult = useRoutes(routes)
  return <AudioPlayerProvider>{routeResult}</AudioPlayerProvider> || (
    <script>{(
      window.location.href = '/404.html'
    )}
    </script>
  )
}

export default App
