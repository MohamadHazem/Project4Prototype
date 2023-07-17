import { useEffect, useState } from "react";
import { Container, Row, Col, Card, CloseButton, Button, Modal } from "react-bootstrap";
import { useUserHook } from "../../hooks/useUserHook";
import project4BackendAxios from "../../configs/project4BackendConfig"
import { useNavigate } from "react-router-dom";
import { useFavHook } from "../../hooks/useFavHook";

export default function Fav() {
    
    const [unavailableFavItems, setUnavailableFavItems] = useState([])
    const userHook = useUserHook()
    const favHook = useFavHook()
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setUnavailableFavItems([])
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (unavailableFavItems.length === 0) {
            return
        }
        handleShow()
    }, [unavailableFavItems])

    async function onDeleteClickHandler(carId) {
        try {
            const res = await project4BackendAxios.delete('/fav', {
                data: {carId: carId},
                headers: {
                    authorization: `Bearer ${userHook.user.token}`
                }
            })
            if (res.status === 200) {
                favHook.setFavUpdated(true)
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Container>
            <Row className="mt-3 text-center">
                <Col>
                    <h1>Favorites</h1>
                </Col>
            </Row>
            <Row className="mt-3 fw-medium fs-5">
                <Col md={8} className="text-center">Car</Col>
                <Col md={1} className="text-end">Admin</Col>
                <Col md={2} className="text-end">Price</Col>
            </Row>
            <Row>
                {favHook.fav.length === 0
                ? <Card className="mt-5 border-dark text-center">
                    <Card.Body>
                        <p className="fw-medium fs-3">No items in fav</p>
                    </Card.Body>
                </Card> 
                : favHook.fav.map(favItem => {
                    return (
                        <Card className="mt-3 border-dark" key={favItem._id}>
                            <Card.Body>
                                <Row>
                                    <Col md={4}>
                                        <Card.Img src={favItem.img} />
                                    </Col>
                                    <Col md={4}>
                                        <p><span className="fw-medium">Name:</span><br/>{favItem.name}</p>
                                        <p><span className="fw-medium">Description:</span><br/>{favItem.description}</p>
                                    </Col>
                                    <Col md={1} className="text-end">{favItem.createdBy.user.fullName}</Col>
                                    <Col md={2} className="text-end pe-0">RM {favItem.price}</Col>
                                    <Col md={1} className="d-flex justify-content-end"><CloseButton onClick={() => onDeleteClickHandler(favItem._id.toString())} /></Col>
                                </Row>
                            </Card.Body>
                        </Card>                        
                    )
                })}
            </Row>
            {favHook.fav.length === 0 ? ''
            : <Row className="mt-4 text-end">
                <Col>
                    <p className="fs-4"><span className="fw-bold">Total</span> RM {favHook.cart.reduce((t, c) => t + c.price, 0)}</p>
                </Col>
            </Row>
            }
            <Modal 
                size="lg"
                centered
                show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Car no longer available</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    We are deeply sorry, however it seems the following {'car(s)'} are no longer available. Please remove them before proceeding.
                    <Container>
                        {unavailableFavItems.map((favItem) => {
                            return (
                                <Card className="mt-3 border-dark" key={favItem._id}>
                                    <Card.Body>
                                        <Row>
                                            <Col md={4}>
                                                <Card.Img src={favItem.img} />
                                            </Col>
                                            <Col md={8}>
                                                <p><span className="fw-medium">Name:</span><br/>{favItem.name}</p>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>                        
                            )
                        })}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Okay
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}