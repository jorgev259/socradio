import { useRoutes } from 'hookrouter'
import Radio from './Radio'
import Small from './Small'
import Widget from './Widget'
import Board from './Board'
import New from './New'
import Player from './New2'
import { AudioPlayerProvider } from 'react-use-audio-player'

import './css/global.css'

const routes = {
  '/': () => <Radio station='clouds' />,
  '/small': () => <Small station='clouds' />,
  '/small/:station': ({ station }) => <Small station={station} />,
  '/new': () => <New station='clouds' />,
  '/new/:station': ({ station }) => <New station={station} />,
  '/new2': () => <Player station='clouds' />,
  '/new2/:station': ({ station }) => <Player station={station} />,
  '/board': () => <Board station='clouds' />,
  '/widget': () => <Widget />,
  '/:station': ({ station }) => <Radio station={station} />

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
