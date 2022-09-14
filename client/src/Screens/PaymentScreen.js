import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { useNavigate } from 'react-router-dom'
import { Form,Col,Button,Row } from 'react-bootstrap'
import CheckoutSteps from '../Components/CheckoutSteps'
import {cartPaymentMethod} from "../Actions/CartActions"

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("paystack")
  const { shippingAddress } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping")
    }
  }, [shippingAddress])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(cartPaymentMethod(paymentMethod))
    navigate("/placeorder")
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <h3>Payments</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label></Form.Label>
          <Col>
            {/* <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value= "paypal"
              checked
              onChange={(e)=>setPaymentMethod(e.target.value)}
            /> */}
            <Form.Check
              type="radio"
              checked
              label="PayStack"
              id="PayStack"
              name="paymentMethod"
              value="payStack"
              onChange={(e)=>setPaymentMethod(e.target.value)}
            />
            {/* <Form.Check
              type="radio"
              label="GooglePay"
              id="GooglePay"
              name="paymentMethod"
              value="GooglePay"
              onChange={(e)=>setPaymentMethod(e.target.value)}
            /> */}
          </Col>
       </Form.Group>
        <Button type="submit">Continue</Button>
      </Form>
    </>
  )
}

export default PaymentScreen