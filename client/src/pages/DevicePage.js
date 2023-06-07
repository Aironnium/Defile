import React, { useEffect, useState } from 'react'
import { Container, Col, Image, Row, Button, Card } from 'react-bootstrap';
import {AiOutlineStar} from "react-icons/ai"
import {SlBasket} from 'react-icons/sl'
import { useParams } from 'react-router-dom';
import { addToBasket, fetchOneDevice } from '../http/deviceAPI';


const DevicePage = () => {
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()
  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
  }, [])

  const add = () => {
    const formData = new FormData()
    formData.append('deviceId', id)
    addToBasket(formData).then(response => alert(`Товар ` + device.name + ` That product was added to your basket`))
}

  return (
    <Container className={"mt-5"} >
      <Row>
        <Col md={6} style={{marginTop:"5%"}}>
          <Image width={600} height={600} style={{objectFit:'contain'}} src={process.env.REACT_APP_API_URL +  device.img}/>
        </Col>
        <Col md={6} style={{marginTop:"5%"}}>
          <Card>
            <h2>{device.name}</h2>
            <div
               style={{fontFamily:"Berlin Sans FB", fontSize:"24px"}}
            >
              <p>Rating: <AiOutlineStar/> {device.rating}
              <br/>{device.price} $
              <Button variant="success" style={{marginLeft:"5%", fontFamily:"Cascadia Code", fontSize:"24px"}} onClick={add}>
                <SlBasket style={{color:"white"}}/> Buy
              </Button>
              </p>
            </div>
          </Card>
          <h2 className={"mt-3"}>Information</h2>
          <Col className='d-flex flex-column m-3'>
              {device.info.map((info, index) =>
              <Row key={info.id} style={{background: index %2 === 0? 'lightgray':'transparent', padding:10}}>
                {info.title} : {info.description}
              </Row>
              )}
            </Col>
        </Col>
        <h3 className={'mt-4'}>Responses</h3>
            <Card>
              
            </Card>
      </Row>


    </Container>
  )
}

export default DevicePage;