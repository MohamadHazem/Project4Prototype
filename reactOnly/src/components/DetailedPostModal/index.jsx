import React, { useState } from "react";
import {Col, Row, Container, Card} from "react-bootstrap";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'


function DetailedPostModalComponent (props) {
    
    const [modal, setModal] = useState(false);
    const toggle = ()=> setModal(!modal);
  
    return (
     <div>
        <Button onClick={toggle}>
          Details
        </Button>
        <Modal isOpen={modal} toggle={toggle} {...props}>
          <ModalHeader toggle={toggle}>Details</ModalHeader>
          <ModalBody>
           <Container>
           <Row className="mb-2 text-center fw-medium">
                <Col>
                {props.name}
                </Col>
            </Row>
            <Row>
              <Col>
                <Card.Img variant="top" src={props.img || "https://www.thesprucepets.com/thmb/j86Zss9kZEIXa54FcOQaR7eCmfY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ricky-kharawala-adK3Vu70DEQ-unsplash-0fd4bcb628bd49c88d8a023130132a7f.jpg"} />
                    <Col>
                      <div>
                        <div className={`fw-bold`}>RM {props.price}</div>
                      </div>
                      <div>{props.description}</div>
                    </Col>
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

  export default DetailedPostModalComponent