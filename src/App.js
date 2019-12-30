import React from 'react'
import { useRoutes } from 'hookrouter'
import Radio from './Radio'
import { Row, Col } from 'react-bootstrap'

const routes = {
  '/': () => <Radio />,
  '/persona': () => <Radio />,
  '/anime': () => <Radio />,
  '/weekly': () => <Radio />
}

const App = () => {
  const routeResult = useRoutes(routes)
  return routeResult || (
    <Row className='justify-content-center h-100' style={{ backgroundColor: '#8ca6f2' }}>
      <Col sm={6} style={{ marginTop: 'auto', marginBottom: 'auto' }}><img src='/images/error.png' style={{ maxWidth: '100%' }} /></Col>
      <Col sm={6} style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', color: 'white' }}><h1>Nothing to see here</h1></Col>
    </Row>
  )
}

export default App
