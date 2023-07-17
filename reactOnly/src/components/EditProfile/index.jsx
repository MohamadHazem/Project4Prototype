import React, { useState, useEffect, useRef } from "react";
import project4BackendAxios from "../../configs/project4BackendConfig"
import { Form, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useUserHook } from "../../hooks/useUserHook"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'


function EditProfileComponent (props) {
    
    const [modal, setModal] = useState(false);
    const toggle = ()=> setModal(!modal);

const navigate = useNavigate()
    const userHook = useUserHook()
    const [formInput, setFormInput] = useState({
        username: '',
        fullName: '',
        email: '',
        contactNo: ''
    })
    const [errorMessage, setErrorMessage] = useState('')
    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    useEffect(() => {
      if (userHook.user) {
          navigate('/profile')
      }
  }, [userHook.user])

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
    }, (err, result) => {
        if (result.event === 'success') {
            setFormInput((prevState) => ({...prevState, profilePic: result.info.secure_url,}))
        }   
    })
}, [])


function onFormChangeHandler(e) {
  let value
  if (e.target.name === 'admin') {
      value = !!e.target.checked
  } else {
      value = e.target.value
  }
  setFormInput((prevState) => ({...prevState, [e.target.name]: value,}))
}

async function onFormSubmitHandler(e) {
  e.preventDefault()
  setErrorMessage('')
  try {
      const res = await project4BackendAxios.put('/profile', {data: formInput ,id: props.id,}, 
      {
        headers: {
            authorization: `Bearer ${userHook.user.token}`
        }
    }
      )
      if (res.status === 200) {
        console.log(formInput)
        navigate('/profile')
          props.setupdated (true)
          toggle()      
      }
  } catch (err) {
      if (err.response.status === 400 && err.response.data.message === 'Failed to update') {
          setErrorMessage('Failed to update')
      }
  }
}

    return (
     <div>
        <Button onClick={toggle}>
          Edit Profile
        </Button>
        <Modal isOpen={modal} toggle={toggle} {...props}>
          <ModalHeader toggle={toggle}>{props.username}</ModalHeader>
          <ModalBody>
           <Container>
           <Row className="mt-3 text-center">
                <Col>
                    <h1>Edit Profile</h1>
                </Col>
            </Row>
          <Row className="mt-3 justify-content-center">
                <Col xs={6} className="text-center justify-content-center">
                    <Form className="border border-dark-subtle pt-5 pb-4 ps-4 pe-4" onSubmit={onFormSubmitHandler}>
                        <div className="d-flex justify-content-center mb-3">
                        </div>
                        {errorMessage !== '' 
                        ? <div>
                            <p className="text-danger fw-bold">{errorMessage}</p>
                        </div>
                        : ''}
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Control type="text" placeholder={props.username} name="username" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFullName">
                            <Form.Control type="text" placeholder={props.fullName} name="fullName" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Control type="email" placeholder={props.email} name="email" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formContactNo">
                            <Form.Control type="phone" placeholder={props.contactNo} name="contactNo" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Control type="text" placeholder={props.address} name="address" required onChange={onFormChangeHandler}/>
                        </Form.Group>
                        <div className="mb-3 d-flex justify-content-start">
                            <div className="me-3">
                                <Button variant="secondary" type="button" onClick={() => widgetRef.current.open()}>Upload Art Image</Button>
                            </div>
                            
                            {formInput?.artImage && <div>
                                    <img src={formInput.artImage} style={{width: 200, height: 200}} alt={'Art Img'}/>
                                </div>}
                        </div>
                        <Button variant="primary" type="submit" className="fw-medium mb-3">
                            Edit Profile
                        </Button>
                    </Form>
                </Col>
            </Row>
            </Container>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>
      </div>
    );
  }

  export default EditProfileComponent