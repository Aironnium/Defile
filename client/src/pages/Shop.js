import React, { useContext, useEffect } from 'react'
import { Col, Container, Form } from 'react-bootstrap'
import DeviceList from '../components/DeviceList';
import TypeBar from '../components/TypeBar';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchTypes, fetchDevices } from '../http/deviceAPI';
import Pages from '../components/Pages';

const Shop = observer(() => {
  const {device} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchDevices(null, 1, 22  ).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
  })
}, [])

useEffect(() => {
  fetchDevices(device.selectedType.id, device.page, 22).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
  })
}, [device.page, device.selectedType,])

  return (
    <Container>
      <Form className='mt-5 d-flex'>
        <Col md={3} style={{marginTop:"3%"}}>
          <TypeBar/>
        </Col>
        <Col md={9} style={{marginLeft:'4%', marginTop:"3%"}}>
          <h2 style={{marginLeft:"1%"}}>{device.selectedType.name}</h2>
          <DeviceList/>
          <Pages />
        </Col>
      </Form>
    </Container>
  )
})

export default Shop;