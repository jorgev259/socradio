import React from 'react'
import { useRoutes } from 'hookrouter'
import Radio from './Radio'
import Small from './Small'

// import 'bootstrap/dist/css/bootstrap.min.css'

const routes = {
  '/': () => <Radio />,
  '/clouds': () => <Radio />,
  '/persona': () => <Radio />,
  '/anime': () => <Radio />,
  '/woomy': () => <Radio />,
  '/sonic': () => <Radio />,
  '/arms': () => <Radio />,
  '/small': () => <Small />
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
