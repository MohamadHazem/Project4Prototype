import {Col, Row, Card, Container} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import project4BackendAxios from "../../configs/project4BackendConfig"
import { useUserHook } from "../../hooks/useUserHook"
import EditProfileComponent from "../EditProfile";

export default function Profile({update, add, onSelectCar}){

const userHook = useUserHook()
const [userInfos,setUserInfos]= useState([]);
const [updated,setUpdated]= useState(false);

useEffect (()=>{
  if (userHook.user === null) {return }
 project4BackendAxios.get ('/profile', {
  headers: {
      authorization: `Bearer ${userHook.user.token}`
  }
}
).then (res=>{
    setUserInfos (res.data.userinfo)
  })
  setUpdated(false)
},[updated,userHook.user])


  return (
<Container>
<Row className="mt-3 text-center">
  <Col>
    <h1>Profile Page</h1>
  </Col>
</Row>

<Row>

{userInfos.map((prof) => {
 return(
 <Card>
  <Card.Img variant="top" className = 'center' height='200px' width='200px' src={prof.profilePic || "https://www.thesprucepets.com/thmb/j86Zss9kZEIXa54FcOQaR7eCmfY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ricky-kharawala-adK3Vu70DEQ-unsplash-0fd4bcb628bd49c88d8a023130132a7f.jpg"} />
   <Card.Body>
    <Col>
     <Row>
       <Col className = 'mt-3 justify-content-center'>
         <div>Username: {prof.username}</div>
         <div>Full Name: {prof.fullName}</div>
         <div>Email: {prof.email}</div>
         <div>Contact Number: {prof.contactNo}</div>
         <div>Address: {prof.address}</div>
       </Col>
       <Col>
         <EditProfileComponent 
         username={prof.username}
         fullName={prof.fullName}
         email={prof.email}
         contactNo={prof.contactNo}
         address={prof.address}
         pic={prof.profilePic}
         setupdated={setUpdated}
         id={prof._id}
         />
       </Col>
     </Row>
     </Col>
   </Card.Body>
 </Card>
)})}
</Row>
  </Container>



  );
}