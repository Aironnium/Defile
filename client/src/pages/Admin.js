import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Tabs, Tab, FormControl, Form, Button, Dropdown, Col, Table } from 'react-bootstrap'
import { Context } from '../index'
import jwt_decode from 'jwt-decode'
import { createDevice, createType } from '../http/deviceAPI'
import { fetchTypes, fetchDevices} from '../http/deviceAPI';
import { fetchUsers } from '../http/userAPI'
import {observer} from 'mobx-react-lite';
import { check, registration } from '../http/userAPI';

const Admin = observer(() => {

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchDevices().then(data => device.setDevices(data.rows))
      }, [])

    useEffect(()=>{
        fetchUsers().then(data => user.setUsers(data))
    },[])

    const [typeValue, setTypeValue] = useState('')

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)    
    const [users, setUsers] = useState()

    const {device} = useContext(Context)
    const {user} = useContext(Context)
    const [info, setInfo] = useState([])
    const addInfo = () =>{
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    } 
    const removeInfo = (number) =>{
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) =>{
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const addType = () => {
        createType({name: typeValue}).then(data => {
            setTypeValue('')
        })
    }

    const addDevice=()=>{
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData)
    }

    function UserInformation(){
        const token = localStorage.getItem('token')
        const decodedToken = jwt_decode(token)
    }

    const selectFile=e=>{
        setFile(e.target.files[0])
    }
    return (
    <Container className='py-4 mt-5'>
        <Row className='justify-content-center' >
            <Tabs justify-variant="pills" defaultActiveKey="tab-1" className="mb-1 p-0" >
                <Tab eventKey="tab-1" title="User Information">
                    <h2 className='mt-3'>User Information</h2>
                    <Form className='mt-3' style={{display:'flex'}}>
                        <Col md={5}>
                            <h3>First name</h3>
                            <h4>{user.firstname}</h4>
                           
                        </Col>
                        <Col md={5}>
                        
                        </Col>
                    </Form>
                </Tab>
                <Tab eventKey="tab-2" title="Add Device" >
                <h2 className='mt-3' >Add device</h2>
                    <Form style={{display:"flex"}}>
                    <Col md={5} >
                        <Form>
                            <Dropdown className='mt-3'>
                                <Dropdown.Toggle variant={'dark'}>{device.selectedType.name || "Choose type"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {device.types.map(type=>
                                        <Dropdown.Item onClick={()=>device.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>    
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            <FormControl
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                className='mt-3'
                                placeholder='Enter a name of device'
                            /> 
                            <FormControl
                                value={price}
                                onChange={e=>setPrice(Number(e.target.value))}
                                className='mt-3'
                                placeholder='Enter a price of device'
                                type="number"
                            />  
                            <FormControl
                                className='mt-3'
                                type="file"
                                onChange={selectFile}
                            />   
                        </Form>
                        <hr/>
                        <Button variant="outline-success" className='mt-3' onClick={addDevice}>Add new device</Button>                
                    </Col>
                    <Col md={5} style={{marginLeft:"5%"}}>
                        <Button variant="outline-dark" className='mt-3' onClick={addInfo}>Add new property</Button>
                        {info.map(i =>
                        <Row key={i.number}>
                            <Col md={4} className='mt-3'>
                                <FormControl
                                    value={i.title}
                                    onChange={(e)=>changeInfo('title', e.target.value, i.number)}
                                    placeholder='enter a title of property'
                                />
                            </Col>
                            <Col md={4} className='mt-3'>
                                <FormControl
                                    value={i.description}
                                    onChange={(e)=>changeInfo('description', e.target.value, i.number)}
                                    placeholder='enter a description of property'
                                />
                            </Col>
                            <Col md={4} className='mt-3'>
                                <Button variant={'outline-danger'} onClick={() => removeInfo(i.number)}>Delete</Button>
                            </Col>
                        </Row>   
                        )}
                    </Col> 
                    </Form>

                </Tab>
                <Tab eventKey="tab-3" title="Add Type">
                    <h2 className='mt-3'>Add Type</h2>
                    <Col md={5}>
                        <Form className='mt-3'>
                            <FormControl
                                value={typeValue}
                                onChange={e => setTypeValue(e.target.value)}
                                placeholder={"Enter name of type"}
                            />
                        </Form>
                        <Button variant="outline-success" onClick={addType} className='mt-3'>Add new type</Button>
                    </Col>
                </Tab>
                <Tab eventKey="tab-4" title="Users Managing">
                    <h2 className='mt-3'>Users managing</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                                {/* {users.map(user => (
                                    <tr>
                                        <th key={user.id}>{user.id}</th>
                                        <th key={user.id}>{user.firstname}</th>
                                        <th key={user.id}>{user.lastname}</th>
                                        <th key={user.id}>{user.email}</th>
                                        <th key={user.id}>{user.phone}</th>
                                        <th key={user.id}>{user.gender}</th>
                                        <th key={user.id}>{user.role}</th>
                                    </tr>
                                ))} */}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </Row>
    </Container>
  )
})

export default Admin