import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Message from "../Components/Message"
import { Link,useParams,useSearchParams,useNavigate } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import Image from "react-bootstrap/Image"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { addToCartHandler,removeFromCartHandler } from '../Actions/CartActions'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'

const CartScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const qty = searchParams.get("qty")
    const { id } = useParams()
    
    const { cartItems } = useSelector(state => state.cart)
    // if (cartItems) {
    //     console.log(cartItems)
    // }
    useEffect(() => {
        if (id && qty) {
            dispatch(addToCartHandler(id,qty))
        }
    }, [dispatch, id, qty])
    
    const removeCartItem = (idx) => {
        dispatch(removeFromCartHandler(idx))
    }
    const navigateToShipping = () => {
        navigate("/signin?redirect=shipping")
    }
  return (
    <>
     <Row>
              <Col md={8}>
                  <h1>Shopping Cart</h1>
                  {cartItems?.length === 0 ? <Message text="Your Cart is empty" optional="go back" /> : (
                      <ListGroup>
                          {cartItems?.map(items => {
                              return (
                                  <ListGroupItem key={items.product}>
                                      <Row>
                                          <Col md={2}>
                                              <Image src={items.image} fluid rounded alt={items.name } />
                                          </Col>
                                          <Col md={3}>
                                              <Link to={`/product/${items.product}`}>{ items.name}</Link>
                                          </Col>
                                          <Col md={2}>
                                              ${items.price}
                                          </Col>
                                          <Col md={2}>
                                              <Form.Select value={items.qty} className="px-3" onChange={(e)=>{dispatch( addToCartHandler(items.product,Number(e.target.value)))}}>
                                                  {
                                                      [...Array(cartItems?.[0].countInStock).keys()].map(x => {
                                                          return(
                                                              <option value={x+1} key={x+1} >{x+1 }</option>
                                                          )
                                                      })
                                                  }
                                              </Form.Select>
                                          </Col>
                                          <Col md={2}>
                                              <Button type="button" variant="light"><i className='fas fa-trash' onClick={()=>removeCartItem(items.product)}></i></Button>
                                          </Col>
                                      </Row>
                                  </ListGroupItem>
                              )
                          })}
                      </ListGroup>
                  )}
              </Col>  
              <Col md={4}>
                  <Card>
                      <ListGroup variant="flush">
                          <ListGroupItem>
                              <h2>Subtotal ({cartItems?.reduce((acc, item) => acc + Number(item.qty), 0)}) items </h2>
                              ${cartItems?.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
                          </ListGroupItem>
                          <ListGroupItem>
                              <Row>
                                   <Button type="button" disabled={cartItems?.length===0} onClick={navigateToShipping}>Proceed to checkout</Button>
                              </Row>
                          </ListGroupItem>
                      </ListGroup>
                  </Card>
              </Col>
              
      </Row>
    </>
  )
}

export default CartScreen
