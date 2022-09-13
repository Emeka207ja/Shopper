import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import {useNavigate} from "react-router-dom"
import {cartShippingAddress} from "../Actions/CartActions"
import { Form, Button } from "react-bootstrap"
import CheckoutSteps from '../Components/CheckoutSteps'

const ShippingScreen = () => {
   const {shippingAddress} = useSelector(state=>state.cart)
  const [address,setAddress] = useState("")
  const [city,setCity] = useState("")
  const [postalCode,setPostalCode] = useState("")
  const [country, setCountry] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(cartShippingAddress({ address, city, postalCode, country }))
    navigate("/payment")
  }

  useEffect(() => {
    if (shippingAddress) {
      setAddress(shippingAddress.address)
      setCity(shippingAddress.city)
      setPostalCode(shippingAddress.postalCode)
      setCountry(shippingAddress.country)
    }
  },[shippingAddress])
  return (
    <div>
      <CheckoutSteps step1 step2/>
      <h2>Shipping</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={address} onChange={(e)=>setAddress(e.target.value) } />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control type="text" value={city} onChange={(e)=>setCity(e.target.value) } />
        </Form.Group>
        <Form.Group>
          <Form.Label>Postal-code</Form.Label>
          <Form.Control type="text" value={postalCode} onChange={(e)=>setPostalCode(e.target.value) } />
        </Form.Group>
        <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" value={country} onChange={(e)=>setCountry(e.target.value) } />
        </Form.Group>
        <Button type="submit" className="form-control mt-2 bg-primary rounded">Continue</Button>
     </Form>
    </div>
  )
}

export default ShippingScreen
