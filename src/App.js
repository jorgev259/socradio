import React from 'react'
import { useRoutes } from 'hookrouter'
import Radio from './Radio'
import Small from './Small'

const routes = {
  '/': () => <Radio />,
  '/clouds': () => <Radio />,
  '/persona': () => <Radio />,
  '/anime': () => <Radio />,
  '/woomy': () => <Radio />,
  '/sonic': () => <Radio />,
  '/arms': () => <Radio />,
  '/small': () => <Small station='clouds' />,
  '/small/:station': ({ station }) => <Small station={station} />
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
