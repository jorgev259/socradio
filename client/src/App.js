import { useRoutes } from 'hookrouter'
import Widget from './Widget'
import Player from './Player'
import { AudioPlayerProvider } from 'react-use-audio-player'

import './css/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const routes = {
  '/board': () => <Widget station='clouds' icon={false} />,
  '/board/:station': ({ station }) => <Widget station={station} icon={false} />,
  '/widget': () => <Widget station='clouds' icon />,
  '/widget/:station': ({ station }) => <Widget station={station} icon />,

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
