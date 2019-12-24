import React from 'react'
import { useRoutes } from 'hookrouter'

const routes = {
  '/': () => (
    <video autoPlay muted loop id='myBG'>
      <source src='images/bg/fire_logo.mp4' type='video/mp4' />
    </video>
  ),
  '/persona': () => (
    <div
      id='myBG'
      style={{
        backgroundImage: 'url("images/bg/persona_2.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    />
  ),
  '/weekly': () => (
    <div
      id='myBG'
      style={{
        backgroundImage: 'url("images/bg/weekly.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    />
  )
}

const Background = () => {
  const routeResult = useRoutes(routes)

  return routeResult || <div />
}

export default Background
