import React,{useEffect,useState} from "react"
import { Button, Row, Col, Card, Image, ListGroup, ListGroupItem,Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"
import CheckoutSteps from "../Components/CheckoutSteps"
import Message from "../Components/Message"
import { createOrder } from "../Actions/OrderActions"
import Loader from "../Components/Loader"



const PlaceOrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { shippingAddress } = useSelector(state => state.cart)
    const { paymentMethod } = useSelector(state => state.cart)
    const { cartItems } = useSelector(state => state.cart)
    const [id,setId] = useState("")
    const {loading,success,order,error} = useSelector(state=>state.order)
    const addDecimal = (num) => {
        return(Math.round(num*100)/100).toFixed(2)
    }
    const price =  addDecimal(cartItems?.reduce((acc, item) => acc + item.price * item.qty, 0))
    const shipping =  addDecimal(price > 100 ? 0 : 100)
    const tax = addDecimal(Number((0.15 * price).toFixed(2)))
    const totalPrice = addDecimal((Number(price) + Number(shipping) + Number(tax)).toFixed(2))

    // useEffect(() => {
    //     if (order) {
    //     setId(order?._id)
    // }
    // },[order?._id])
    
    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice: price,
            shippingPrice: shipping,
            taxPrice: tax,
            totalPrice
        }))
      
    }
    useEffect(() => {
        if (success) {
            navigate(`/order/${order?._id}`)
        }
    },[success,order?._id,navigate])
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            {loading&& <Loader/>}
            {/* <h2>Place Order</h2> */}
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address : </strong>
                                {shippingAddress?.address}, {shippingAddress?.city},{shippingAddress?.postalCode} { " "},{shippingAddress?.country}
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method : </strong>
                                {paymentMethod}
                                
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {
                                cartItems?.length === 0 ? <Message text="Your have no order" /> : (
                                    <ListGroup variant="flush">
                                        {
                                            cartItems?.map((cart,index) => {
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
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items Price</Col>
                                    <Col>${ price}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${ shipping}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${ tax}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                  <Button className="btn_click" type="submit" disabled={cartItems.length===0} onClick={placeOrder} >Place Order</Button>
                                </Row>
                            </ListGroupItem>
                        </ListGroup>
                       
                   </Card>
                </Col>
            </Row>
        </>
    )
}
export default PlaceOrderScreen