import {Col, Row, Container} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import project4BackendAxios from "../../configs/project4BackendConfig"
import Cars from "../Cars";

export default function Home(){

  const [cars,setCars]= useState([]);

  useEffect (()=>{
    project4BackendAxios.get('/').then (res=>{
      setCars (res.data.car)
    })
  }, [])

  return (
    <Container>
      <Row className="mt-3 text-center">
        <Col>
          <h1>Car Encyclopedia</h1>
        </Col>
      </Row>
      <Row className="mt-3">
        <Cars cars={cars} />
      </Row>  
    </Container>
  );
}