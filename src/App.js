import React from 'react'
import { useRoutes } from 'hookrouter'
import Radio from './Radio'
import { Row, Col } from 'react-bootstrap'

const routes = {
  '/': () => <Radio />
}

const App = () => {
  const routeResult = useRoutes(routes)
  /*
    <div class="container-fluid h-100">
  <div class="row justify-content-center h-100">

    <div class="col-4 hidden-md-down" id="yellow">
      XXXX
    </div>

    <div class="col-10 col-sm-10 col-md-10 col-lg-8 col-xl-8">
      Form Goes Here
    </div>
  </div>
</div>
 */
  // <img src='images/error.png' />
  return routeResult || (
    <Row className='justify-content-center h-100' style={{ backgroundColor: '#8ca6f2' }}>
      <Col sm={6} style={{ marginTop: 'auto', marginBottom: 'auto' }}><img src='images/error.png' style={{ maxWidth: '100%' }} /></Col>
      <Col sm={6} style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', color: 'white' }}><h1>Nothing to see here</h1></Col>
    </Row>
  )
}

export default App
