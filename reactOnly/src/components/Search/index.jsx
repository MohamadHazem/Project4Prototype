import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {Col, Row, Container} from "react-bootstrap";
import project4BackendAxios from "../../configs/project4BackendConfig"
import Cars from "../Cars";

export default function Search() {
    const location = useLocation()
    const navigate = useNavigate()
    const searchInput = location?.state?.searchInput
    const [searchTerm, setSearchTerm] = useState('')
    const [cars,setCars]= useState([])

    useEffect(() => {
        if (!searchInput) {
            return
        }
        setSearchTerm(searchInput)
        project4BackendAxios.get (`/search/${searchInput}`).then (res=>{
            setCars (res.data.car)
        })
        navigate(location.pathname, {})
    }, [searchInput])

    return (
        <Container>
            <Row className="mt-3 text-center">
                <Col>
                <h1>Search results for {searchTerm}</h1>
                </Col>
            </Row>
            <Row className="mt-3">
                {cars.length === 0 
                ? <Col className="text-center fw-medium fs-4 mt-5">No matching results</Col>
                : <Cars cars={cars} />
                }
            </Row>  
        </Container>
    );
}