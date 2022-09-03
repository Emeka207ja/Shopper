import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutHandler } from '../Actions/UsersAction';
import {useNavigate} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from "react-router-bootstrap"

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {loginDetails} = useSelector(state=>state.loginDetails)
  const { userDetail } = useSelector(state => state.signupDetails)
  
  const logoutHandler = () => {
    dispatch(userLogoutHandler())
    navigate("/signin")
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navBar">
      <Container>
        <LinkContainer to="/">
           <Navbar.Brand>Shopper</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
         
         
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link  >Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link > <i className="fa-solid fa-cart-arrow-down me-1"></i>Cart</Nav.Link>
            </LinkContainer>
            <NavDropdown title={loginDetails?.token ? loginDetails?.name : userDetail?.token ? userDetail.name : "Access"} id="collasible-nav-dropdown">
              {
                loginDetails?.token || userDetail?.token ? (
                  <NavDropdown.Item> <i className="fa-solid fa-user me-1"></i><span onClick={logoutHandler}>Logout</span></NavDropdown.Item>
                ) : (
                      <LinkContainer to="/signup">
                        <NavDropdown.Item> <i className="fa-solid fa-user me-1"></i>Signup</NavDropdown.Item>
                      </LinkContainer>
                   )
              }
             
              {
                loginDetails?.token || userDetail?.token? (
                    <LinkContainer to={`/profile/${loginDetails?.id || userDetail?.id}`}>
                        <NavDropdown.Item><i className="fa-solid fa-user me-1"></i>
                          Profile
                      </NavDropdown.Item>
                  </LinkContainer>
                ) : (
                      <LinkContainer to="/signin">
                          <NavDropdown.Item><i className="fa-solid fa-user me-1"></i>
                              Signin
                          </NavDropdown.Item>
                      </LinkContainer>
                   )
              }
              {/* {
                userDetail?.token && (
                    <LinkContainer to={`/profile/${userDetail?.id}`}>
                        <NavDropdown.Item><i className="fa-solid fa-user me-1"></i>
                          Profile
                      </NavDropdown.Item>
                  </LinkContainer>
                )
              } */}
              
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
        </Nav>
          <Nav className="">
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search products"
                        className="me-2 rounded-4"
                        aria-label="Search"
                    />
                    <Button variant="outline-success" className="rounded-4">Search</Button>
               </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
