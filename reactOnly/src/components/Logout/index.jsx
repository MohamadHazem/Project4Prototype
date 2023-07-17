import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserHook } from "../../hooks/useUserHook";
import { Col, Container, Row } from "react-bootstrap";

export default function Logout() {
    const navigate = useNavigate()
    const [loggedOut, setLoggedOut] = useState(false)
    const userHook = useUserHook()

    useEffect(() => {
        userHook.removeUser()
        setLoggedOut(true)
        setTimeout(() => navigate('/'), 5000) 
    }, [])

    return (
        <div>
            {!loggedOut  
            ? ''
            : <Container>
                <Row className="mt-3 text-center">
                    <Col>
                        <h1>Logout from account</h1>
                    </Col>
                </Row>
                <Row className="mt-3 text-center">
                    <Col>
                        <p>You have successfully logged out.</p>
                        <p>Thank you and see you again!</p>
                        <p className="mt-5">You'll be redirected to Home page</p>
                    </Col>
                </Row>
            </Container>
            }
        </div>
    )
}