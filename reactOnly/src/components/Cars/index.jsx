import {Col, Row, Card, Button } from "react-bootstrap";
import DetailedPostModalComponent from "../DetailedPostModal";
import { useFavHook } from "../../hooks/useFavHook";
import { useUserHook } from "../../hooks/useUserHook";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Cars({ cars }) {
    const userHook = useUserHook()
    const favHook = useFavHook()

    return (
        <Masonry columnsCount={4} gutter="15px">
            {cars.map((car) => {
            return(
                <Col md={3} key={car._id} style={{ width: "100%" }}>
                    <Card>
                    <Card.Img variant="top" src={car.img || "https://www.thesprucepets.com/thmb/j86Zss9kZEIXa54FcOQaR7eCmfY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ricky-kharawala-adK3Vu70DEQ-unsplash-0fd4bcb628bd49c88d8a023130132a7f.jpg"} />
                    <Card.Body>
                        <Row>
                        <Col>
                            <div>
                            <div className={`fw-bold`}>RM {car.price}</div>
                            </div>
                            <div>{car.name}</div>
                        </Col>
                        <Col>
                        <DetailedPostModalComponent 
                        name={car.name}
                        price={car.price}
                        description={car.description}
                        img={car.img}
                        />
                            { car.quantity > 0 
                            ? !userHook.user 
                                ? ''
                                : <Button onClick={() => favHook.addArtToCart(car._id.toString())}>Add to fav</Button>  
                            : <div>No stock</div>}
                        </Col>
                        </Row>
                    </Card.Body>
                    </Card>
                </Col> 
            )})}
        </Masonry>
    )
}