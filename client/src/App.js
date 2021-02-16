import { useRoutes } from 'hookrouter'
import Small from './Small'
import Widget from './Widget'
import Board from './Board'
import Player from './Player'
import { AudioPlayerProvider } from 'react-use-audio-player'

import './css/global.css'

const routes = {
  '/small': () => <Small station='clouds' />,
  '/small/:station': ({ station }) => <Small station={station} />,

  '/board': () => <Board station='clouds' />,
  '/widget': () => <Widget />,

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
