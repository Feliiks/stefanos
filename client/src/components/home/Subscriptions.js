import React from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { Button } from "react-bootstrap"

import imgg from "../../assets/website-bg.jpg"

const Subscriptions = ({ subscriptionTypes, createCheckoutSession }) => {
    return (
        <Container>
            <Row className="subscriptions">
                <h2 className="section-title mx-auto text-center"> DEVENIR UN GAGNANT </h2>
                {
                    subscriptionTypes ? subscriptionTypes.map(el => (
                        <Col className="mx-auto">
                            <Card className="shadow mx-auto overflow-hidden" style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={imgg} />
                                <Card.Body className="d-flex align-items-center justify-content-center" style={{height: "75px"}}>
                                    <Card.Title className="text-uppercase fw-bold text-center m-0 p-0"> { el.name } </Card.Title>
                                </Card.Body>
                                <Card.Body className="d-flex align-items-center justify-content-center" style={{background: "#cecece", height: "50px"}}>
                                    <span className="fw-bold"> {el.price ? el.price / 100 : ""}€ / MOIS</span>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item> Un super avantage </ListGroup.Item>
                                    <ListGroup.Item> Un super avantage </ListGroup.Item>
                                    <ListGroup.Item> Un super avantage </ListGroup.Item>
                                </ListGroup>
                                <Card.Body className="p-0">
                                    <Button className="sub-btn" onClick={() => createCheckoutSession(el)}>
                                        EN PROFITER
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )) : null
                }
            </Row>
        </Container>
    )
}

export default Subscriptions