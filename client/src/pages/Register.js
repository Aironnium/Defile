import React, { useContext, useState } from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, SHOP_ROUTE} from '../utils/consts';
import { NavLink} from 'react-router-dom';
import { registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Register = observer(() => {
  const {user} = useContext(Context)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate()

  const signUp = async () => {
    try{
      let data;
      data = await registration(firstname,lastname, phone, gender, email, password)
      user.setUser(data)
      user.setIsAuth(true)
      history(SHOP_ROUTE)
    }
    catch(e){
      alert(e.response.data.message)
    }
  }
  return (
        <Container 
          className='d-flex justify-content-center align-items-center'
          style={{height: window.innerHeight-50 , marginTop:"2.6%"}}
        >
          <Card style={{width:600}} className="p-5">
            <h2 className='m-auto'>Registration</h2>
            <Form className='d-flex flex-column'>
            <Form.Control
                className="mt-3"
                placeholder='Enter First name'
                value={firstname}
                onChange={e =>setFirstname(e.target.value)}
              />
                <Form.Control
                className="mt-3"
                placeholder='Enter Last name'
                value={lastname}
                onChange={e =>setLastname(e.target.value)}
              />
                <Form.Control
                className="mt-3"
                placeholder='Enter Phone'
                value={phone}
                onChange={e =>setPhone(e.target.value)}
              />
               <Form.Control
                className="mt-3"
                placeholder='Enter Gender'
                value={gender}
                onChange={e =>setGender(e.target.value)}
              />
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
                type='password'
              />
               <Form.Control
                className="mt-3"
                placeholder='Confirm password'
                type='password'
              />
              <Form className="d-flex justify-content-between mt-3 pl-3 pr-3">
                <div>
                  Have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                </div>
                <Button 
                onClick={() => signUp()}
                variant={"outline-dark"}>
                  Sign up
                </Button>
              </Form>
            </Form>
          </Card>    
        </Container>
  )
})

export default Register
//konogiornogiovanna