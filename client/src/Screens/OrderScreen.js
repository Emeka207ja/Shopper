import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from 'react-router-dom'
import PaystackPop from '@paystack/inline-js'
import {Row,Col,ListGroup,ListGroupItem,Card,Image,Button,Form} from "react-bootstrap"
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import {getOrder,getPaystackClientId,orderPay} from "../Actions/OrderActions"


const OrderScreen = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const { loading, orderItems, error } = useSelector(state => state.getOrder)
    const { clientId,paypalError } = useSelector(state => state.getPaypalClientId)
    const {success } = useSelector(state => state.orderPay)
    console.log("paypal",clientId)
    console.log("id",clientId)
    useEffect(() => {
        dispatch(getOrder(id))
         dispatch(getPaystackClientId())

        if (success) {
            dispatch(getOrder(id))
        }
       
    }, [dispatch, id,success])
//  "pk_live_82ff0bcc3993f2d072dcd4fd326cfd1d4287aba9"
    // useEffect(() => {
    //      dispatch(getPaystackClientId())
    // }, [dispatch])
    
    const paymentHandler = (e) => {
        e.preventDefault()
        const paystack = new PaystackPop()
        paystack.newTransaction({
            key:clientId,
            amount: orderItems?.totalPrice * 100,
            email: orderItems?.user.email,
            firstname: orderItems?.user.name,
            onSuccess(transaction) {
                dispatch(orderPay(id,
                    transaction,
                    orderItems?.user.email)
                )
                // dispatch(getOrder(id))
                console.log(transaction)
            },
            onCancel() {
                console.log("cancelled")
            }
        })
    }
   
  return (
    <>
          {
              loading ? <Loader /> : error ? <Message text={error} variant="danger" /> : <div>
                  <h2 className="order_id">Order:{id}</h2>
                  <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                                  <h2>Shipping</h2>
                                  <p>Name: {orderItems?.user.name}</p>
                                 <p>Email:  <a href={`mailto:${orderItems?.user.email}`}>{orderItems?.user.email}</a></p>
                            <p>
                                <strong>Address : </strong>
                                {orderItems?.shippingAddress?.address}, {orderItems?.shippingAddress?.city},{orderItems?.shippingAddress?.postalCode} { " "},{orderItems?.shippingAddress?.country}
                            </p>
                            <p>
                                      {orderItems?.isDelivered ? <Message text={ `deivererd on ${orderItems?.deliveredAt}`} variant="success" />:<Message text="Not Delivered" variant="danger"/>}
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method : </strong>
                                {orderItems?.paymentMethod}
                                
                            </p>
                            <p>
                                      {orderItems?.isPaid ? <Message text={ `paid on ${orderItems?.paidAt}`} variant="success" />:<Message text="Not Paid" variant="danger"/>}
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {
                                orderItems?.cartItems?.length === 0 ? <Message text="Your have no order" /> : (
                                    <ListGroup variant="flush">
                                        {
                                           orderItems?.orderItems?.map((cart,index) => {
                                                return (
                                                    <ListGroupItem key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={cart.image} alt={cart.name } fluid rounded />
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/product/${cart.product}`}>
                                                                    {cart.name}
                                                                </Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {cart.qty} x {cart.price} = $ {(cart.qty*cart.price).toFixed(2)} 
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                )
                            }
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <div className= "placeorder_card">
                        {/* <ListGroup variant="flush">
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items Price</Col>
                                          <Col>{orderItems?.itemsPrice }</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${orderItems?.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${ orderItems?.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>${orderItems?.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {
                                    !orderItems?.isPaid &&( <Row>
                                    <Button type="submit" className="btn_click" onClick={paymentHandler}>Pay with Paystack</Button>
                                </Row>)
                                }
                            </ListGroupItem>
                        </ListGroup> */}
                              <h5>Order Summary</h5>
                        <Row>
                            <Row>
                                <Col><h5>Items Price</h5></Col>
                                <Col><h5>{orderItems?.itemsPrice }</h5></Col>
                            </Row>
                            <Row>
                                <Col><h5>Shipping</h5></Col>
                                <Col><h5>${orderItems?.shippingPrice}</h5></Col>
                            </Row>
                            <Row>
                                <Col><h5>Tax</h5></Col>
                                <Col><h5>${ orderItems?.taxPrice}</h5></Col>
                            </Row>
                            <Row>
                                <Col><h5>Total Price</h5></Col>
                                <Col><h5>${orderItems?.totalPrice}</h5></Col>
                            </Row>
                            <Row>
                            <Col>
                                {
                                    !orderItems?.isPaid &&( <Row>
                                        <button type="submit" className="btn_click" onClick={paymentHandler}>Pay with Paystack</button>
                                    </Row>)
                                }
                            </Col>
                            </Row>
                        </Row>
                   </div>
                </Col>
            </Row>
              </div>
              
      }
    </>
  )
}

export default OrderScreen