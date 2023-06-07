import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import Image  from 'react-bootstrap/Image';
import {AiOutlineStar} from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    return (
        <Col md={3}>
            <Card style={{width:200, cursor:'pointer'}} border={"light"} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Image width={200} height={250} style={{objectFit:'contain', marginLeft:'auto', marginRight:'auto'}} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className='mt-2 d-flex justify-content-between align-items-center'>
                    <div>
                        {device.name}
                    </div>
                    <div className='d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <AiOutlineStar/>
                    </div>
                </div>
                <div className='d-flex align-items-center' >
                    <Button className='mt-2' variant='success'>{device.price} $</Button>
                </div>
                <br/>
            </Card>
        </Col>
  )
}

export default DeviceItem