import React from 'react'
import { useRoutes } from 'hookrouter'
import Radio from './Radio'
import Small from './Small'
import Widget from './Widget'

const routes = {
  '/': () => <Radio station='clouds' />,
  '/small': () => <Small station='clouds' />,
  '/small/:station': ({ station }) => <Small station={station} />,
  '/widget': () => <Widget />,
  '/:station': ({ station }) => <Radio station={station} />

}

const App = () => {
  const routeResult = useRoutes(routes)
  return routeResult || (
    <script>{(
      window.location.href = '/404.html'
    )}
    </script>
  )
}

export default App
