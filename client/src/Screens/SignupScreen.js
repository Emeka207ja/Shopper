import React, { useState,useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { Form, Button } from "react-bootstrap"
import { useNavigate,useSearchParams } from 'react-router-dom'
import {userSignupHandler} from "../Actions/UsersAction"
import Message from '../Components/Message'
import Loader from '../Components/Loader'

const SignupScreen = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [searchParam] = useSearchParams()

    const dispatch = useDispatch();
    const { userDetail, loading, error } = useSelector(state => state.signupDetails)
    const navigate = useNavigate()

    const redirectLink = searchParam.get("redirect");
    const redirect = redirectLink?redirectLink: ""
    
    const signupHandler = (e) => {
        e.preventDefault();
        dispatch(userSignupHandler(name, email, password))
        setName("");
        setEmail("");
        setPassword("");
        navigate(`/${redirect}`)
    }
    useEffect(() => {
        if (userDetail?.token) {
           navigate(`/${redirect}`)
       }
   },[userDetail?.token,redirect])
  return (
      <>
          <Form className="py-3" onSubmit={signupHandler}>
              {
                  loading ? <Loader /> : error && <Message text={error } variant="danger" />
              }
              <Form.Group controlId="name">
                  <Form.Label> fullname</Form.Label>
                  <Form.Control type="text" placeholder="Asiwe bright nnaemmeka" value={ name} onChange={(e)=>setName(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                  <Form.Label> email address</Form.Label>
                  <Form.Control type="email" placeholder="example@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                  <Form.Label> password</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
              </Form.Group>
              <Button type="submit" variant="info rounded" className="mt-2 form-control">Signup</Button>
          </Form>
      </>
  )
}

export default SignupScreen