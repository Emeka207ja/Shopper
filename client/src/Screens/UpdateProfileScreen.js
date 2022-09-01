import React,{useState,useEffect} from 'react'
import { Button, Form,Row,Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import axios from "axios"
import Message from '../Components/Message'
import Loader from "../Components/Loader"
import {updateProfileHandler,fetchProfileHandler} from "../Actions/UsersAction"

const UpdateProfileScreen = () => {
  
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const { loading, success, error } = useSelector(state => state.updateProfile)
    const { userDetail } = useSelector(state => state.fetchProfile)
    const { id } = useParams()
    console.log("id",id)
    const fetchUserProfile = async () => {
        const { data } = await axios.get(`/api/users/fetchprofile/${id}`)
        console.log(data)
            if (data) {
                setName(data.name)
                setEmail(data.email)
            }
        }
    useEffect(() => {
        fetchUserProfile()
     }, [id])

    const ProfileUpdateHandler =(e)=> {
        e.preventDefault();
        // dispatch(updateProfileHandler(name,email,password,9))
        dispatch(updateProfileHandler(name,email,password,id))
    }

    if(userDetail){
        console.log("user",userDetail)
    }
  return (
      <>
          <Row>
              <Col md={3}>
                    {
                        loading ? <Loader /> : error ? <Message text={error} variant="danger" /> : success && <Message text={ success.message} variant="info" />
                    }
                    <Form onSubmit={ProfileUpdateHandler}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password } onChange={(e)=>setPassword(e.target.value)} />
                        </Form.Group>
                        <Button type="submit" variant="info rounded" className="mt-2">Update</Button>
                    </Form>
              </Col>
              <Col md={9}>
                  <h2>My orders</h2>
              </Col>
         </Row>
      </>
  )
}

export default UpdateProfileScreen