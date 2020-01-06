import React from 'react'
import { useRoutes } from 'hookrouter'
import Radio from './Radio'

const routes = {
  '/': () => <Radio />,
  '/clouds': () => <Radio />,
  '/persona': () => <Radio />,
  '/anime': () => <Radio />,
  '/weekly': () => <Radio />
}

const App = () => {
  const routeResult = useRoutes(routes)
  return routeResult || (
    <script>window.location.href = '/404.html'</script>
  )
}

export default App
