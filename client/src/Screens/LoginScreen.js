import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {useNavigate,useSearchParams,Link} from "react-router-dom"
import { Form, Button,Row,Col } from "react-bootstrap"
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import {userLoginHandler} from "../Actions/UsersAction"


const LoginScreen = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading, error, loginDetails } = useSelector(state => state.loginDetails)
    const {userDetail } = useSelector(state => state.signupDetails)
    const [searchParams] = useSearchParams()
   
    const redirectLink =  searchParams.get("redirect")
    const redirect = redirectLink? redirectLink: ""
    const handleSubmit = (e) => {
          e.preventDefault()
        dispatch(userLoginHandler(email, password))
    }

    useEffect(() => {
        if (loginDetails?.token || userDetail?.token) {
            navigate(`/${redirect}`)
        }
    },[redirect,loginDetails?.token, userDetail?.token])
   
  return (
      <>
          {
              loading ? <Loader /> : error && <Message text={error} variant="danger"/>
          }
          <Form onSubmit={handleSubmit}>
              <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e)=>{setEmail(e.target.value)} } />
              </Form.Group>
              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value) } />
              </Form.Group>
              <Button type="submit" variant="info rounded" className="mt-2">Signin</Button>
          </Form>
          <Row>
              <Col>
                  New costomer ? <Link to={redirect?`/signup?redirect=${redirect}`:"/signup"}>Register</Link>
              </Col>
          </Row>
      </>
  )
}

export default LoginScreen