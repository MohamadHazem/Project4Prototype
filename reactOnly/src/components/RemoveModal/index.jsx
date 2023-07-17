import React, { useState, useEffect, useRef } from "react";
import project4BackendAxios from "../../configs/project4BackendConfig"
import { Form, Container, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useUserHook } from "../../hooks/useUserHook"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'


function RemoveModalComponent (props) {
    
    const [modal, setModal] = useState(false);
    const toggle = ()=> setModal(!modal);

const navigate = useNavigate()
    const userHook = useUserHook()
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
      if (userHook.user) {
          navigate('/admin')
      }
  }, [userHook.user])

async function remove(e) {
  e.preventDefault()
  setErrorMessage('')
  try {
      const res = await project4BackendAxios.delete('/admin', {
        data: {id: props.id},
        headers: {
            authorization: `Bearer ${userHook.user.token}`
        }
    })
      if (res.status === 200) {
          props.setupdated (true)
          toggle()      
      }
  } catch (err) {
    console.log(e);
      if (err.response.status === 400 && err.response.data.message === 'Failed to update') {
          setErrorMessage('Failed to update')
      }
  }
}

    return (
     <div>
        <Button onClick={toggle}>
          Remove
        </Button>
        <Modal isOpen={modal} toggle={toggle} {...props}>
          <ModalHeader toggle={toggle}>{props.name}</ModalHeader>
          <ModalBody>
           <Container>
           <Row className="mt-3 text-center">
                <Col>
                    <h1>Remove</h1>
                </Col>
            </Row>
          <Row className="mt-3 justify-content-center">
                <Col xs={6} className="text-center justify-content-center">
                    <Form className="border border-dark-subtle pt-5 pb-4 ps-4 pe-4" onSubmit={remove}>
                        <Row><p>Confirm Remove ID: {props.id}?</p></Row>
                        <Button variant="primary" type="submit" className="fw-medium mb-3">
                            Remove
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

  export default RemoveModalComponent