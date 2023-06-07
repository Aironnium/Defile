import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {useContext, useState} from 'react';
import { ADMIN_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, BASKET_ROUTE} from '../utils/consts';
import { Context } from '../index'
import {SlBasket} from 'react-icons/sl'
import './NavBar.css'
import './Basket.css'
import {observer} from "mobx-react-lite";
import { NavLink, useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';


const NavBar = observer (() => {
  const navigate = useNavigate()
  const {user} = useContext(Context)
  let [basketOpen, setBasketOpen] =useState(false);

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }
  
    return (
    <Navbar bg="light" expand="lg" className='background' >
    <Container fluid>
      <NavLink to={SHOP_ROUTE} className="logo" style={{fontSize:'24px', marginLeft:'3%', fontWeight:'600', fontFamily:'algerian', color:'black' , textDecoration:'none'}}>Defile</NavLink>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        {user.isAuth ?
            <Nav style={{marginLeft:"80%"}}
                className="ml-auto">
                <SlBasket onClick={() => setBasketOpen(basketOpen =!basketOpen)} className={`shop-basket-button ${basketOpen && 'active'}`}/>
                {basketOpen && (
                  <Card className='show-basket' >                    
                    <Button variant='success' to ={BASKET_ROUTE}>Create an order</Button>
                  </Card>
                )}
                
                <NavDropdown title="Account name" id="navbarScrollingDropdown" style={{color:'white', float:'right'}}>
                    <NavDropdown.Item onClick={() => navigate(ADMIN_ROUTE)}>My account</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                        Contacts
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logOut()}>
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        :
            <Nav
            className="ml-auto"
            style={{marginLeft:"80%"}}>
                <NavLink to={LOGIN_ROUTE} style={{color:"white", textDecoration:'none'} }>Login</NavLink>
                <NavLink style={{color:"white", marginLeft:"5%" , textDecoration:'none'}}>Contacts</NavLink>
            </Nav>
        }
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
})

export default NavBar;