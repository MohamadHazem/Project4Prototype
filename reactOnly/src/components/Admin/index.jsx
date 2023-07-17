import {Col, Row, Card, Container} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import project4BackendAxios from "../../configs/project4BackendConfig"
import { useUserHook } from "../../hooks/useUserHook"
import UpdateModalComponent from "../UpdateModal";
import AddModalComponent from "../AddModal";
import RemoveModalComponent from "../RemoveModal";

export default function MyArt({update, add, onSelectCar}){

const userHook = useUserHook()
const [cars,setCars]= useState([]);
const [updated,setUpdated]= useState(false);

useEffect (()=>{
  if (userHook.user === null) {return }
  project4BackendAxios.get('/admin', {
  headers: {
      authorization: `Bearer ${userHook.user.token}`
  }
}
).then (res=>{
    console.log (res.data)
    setCars (res.data.car)
  })
  setUpdated(false)
},[updated,userHook.user])


  return (
<Container>
<Row className="mt-3 text-center">
  <Col>
    <h1>Admin Dashboard</h1>
  </Col>
</Row>

<Row className="text-center">
  <Col>
  <AddModalComponent
     setupdated={setUpdated}
  />
  </Col>
</Row>

<Row>
{cars.map((car) => {
 return(
 <Col md={3} className={"mb-3"}>
 <Card>
   <Card.Img onClick={onSelectCar} variant="top" src={car.img || "https://www.thesprucepets.com/thmb/j86Zss9kZEIXa54FcOQaR7eCmfY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ricky-kharawala-adK3Vu70DEQ-unsplash-0fd4bcb628bd49c88d8a023130132a7f.jpg"} />
   <Card.Body>
     <Row>
       <Col onClick={onSelectCar}>
         <div>
           <div className={`fw-bold`}>RM {car.price}</div>
         </div>
         <div>{car.name}</div>
       </Col>
       <Col>
         <UpdateModalComponent 
         name={car.name}
         price={car.price}
         description={car.description}
         quantity={car.quantity}
         pic={car.img}
         setupdated={setUpdated}
         id={car._id}
         />
        <RemoveModalComponent 
        id={car._id}
        setupdated={setUpdated}
        />
       </Col>
     </Row>
   </Card.Body>
 </Card>
</Col> 
)})}
</Row>
  </Container>



  );
}