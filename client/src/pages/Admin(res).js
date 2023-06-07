import React, { useState } from 'react'
import {ListGroup, Col } from 'react-bootstrap';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
import UserInfo from '../components/modals/UserInfo';
import UserManage from '../components/modals/UserManage';
import {Row} from 'react-bootstrap'
import {VscAccount} from "react-icons/vsc"
import {RiFolderAddFill} from "react-icons/ri"
import {IoBagAdd} from "react-icons/io5"
import {AiOutlineUser} from "react-icons/ai"
import { Tab } from 'react-bootstrap';

const Admin = () => {
  const [typeVisible, setTypeVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)
  const [usersVisible, setUsersVisible] = useState(false)
  const [infoVisible, setInfoVisible] = useState(false)
  return (
    <Tab.Container>
      <Col md={3}>
      <Row style={{display:"flex"}}>
      <ListGroup className='mt-4'>
        <ListGroup.Item style={{cursor:'pointer'}} action onClick={() => setInfoVisible(true)} >
          <VscAccount/>
            Account information
        </ListGroup.Item>
        <ListGroup.Item style={{cursor:'pointer'}} action onClick={() => setTypeVisible(true)}>
          <RiFolderAddFill/>
            Add type
        </ListGroup.Item>
        <ListGroup.Item style={{cursor:'pointer'}} action onClick={() =>setDeviceVisible(true)}>
          <IoBagAdd/>
            Add device
        </ListGroup.Item>
        <ListGroup.Item style={{cursor:'pointer'}} action onClick={() => setUsersVisible(true)} >
          <AiOutlineUser/>
            Users managing
        </ListGroup.Item>
      </ListGroup>
    </Row>
      </Col>
      <Col md={9}>
        <Tab.Content>
          <Tab.Pane>

          </Tab.Pane>
          <Tab.Pane>

          </Tab.Pane>
          <Tab.Pane>

          </Tab.Pane>
          <Tab.Pane>

          </Tab.Pane>
        </Tab.Content>
        <CreateType show={typeVisible} onHide={() => setTypeVisible}/>
        <CreateDevice show={deviceVisible}  onHide={() =>setDeviceVisible}/>
        <UserInfo show={infoVisible} onHide={() => setInfoVisible}/>
        <UserManage show={usersVisible} onHide={() =>setUsersVisible}/>
      </Col>
    </Tab.Container>
  )
}

export default Admin;