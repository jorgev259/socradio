import React from 'react'
import { useRoutes, navigate } from 'hookrouter'
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
    <div>{navigate('404.html')}</div>
  )
}

export default App
