import React, { useContext, useState } from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Login =  observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate()


  const signIn = async () => {
    try{
      let data;
      data = await login(email,password)
      user.setUser(data)
      user.setIsAuth(true)
      history.push(SHOP_ROUTE)
    }
    catch (e){
      alert(e.response.data.message)
    }
  }

  return (
    <Container 
      className='d-flex justify-content-center align-items-center'
      style={{height: window.innerHeight-50, marginTop:"2.6%"}}
    >
      <Card style={{width:600 }} className="p-5">
        <h2 className='m-auto'>Authorisation</h2>
        <Form className='d-flex flex-column'>
          <Form.Control
            className="mt-3"
            placeholder='Enter E-mail'
            value={email}
            onChange={e =>setEmail(e.target.value)}
          />
            <Form.Control
            className="mt-3"
            placeholder='Enter password'
            value={password}
            onChange={e =>setPassword(e.target.value)}
            type="password"
          />
          <Form className="d-flex justify-content-between mt-3 pl-3 pr-3">
            <div>
              Not registered? <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
            </div>
            <Button 
            onClick={signIn}
            variant={"outline-dark"}>
              Log in
            </Button>
          </Form>
        </Form>
      </Card>
    </Container>
  )
})

export default Login;