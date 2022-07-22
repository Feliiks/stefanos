import React from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { Button } from "@mui/material"

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Subscriptions = ({ subscriptionTypes, createCheckoutSession }) => {
    return (
        <Row style={{ background: "#212121", color: "#fff" }}>
            <Col>
                <Container>
                    <Row className="section subscriptions d-flex justify-content-center">
                        <h2 className="section-title mx-auto text-center"> DEVENIR UN GAGNANT </h2>
                        {
                            subscriptionTypes ? subscriptionTypes.map(el => (
                                <Col lg={4}>
                                    <Card className="sub-card shadow mx-auto overflow-hidden p-4" style={{ width: '18rem' }}>
                                        <Card.Body className="d-flex align-items-center justify-content-center" style={{ height: "75px"}}>
                                            <Card.Title className="text-uppercase fw-bold text-center m-0 p-0"> { el.name } </Card.Title>
                                        </Card.Body>
                                        <Card.Body className="d-flex align-items-center justify-content-center">
                                            <span style={{ fontWeight: "bold", fontSize: "20px", marginRight: "5px"}}> {el.price ? el.price / 100 : ""}€</span>
                                            <span style={{ color: "#d9d9d9", fontSize: "16px", fontStyle: "italic"}}> par mois </span>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush mb-3" style={{ border: "none"}}>
                                            <ListGroup.Item style={{ background: "none", color: "#d7d7d7"}}> <CheckCircleIcon fontSize="small" color="info" /> Un super avantage </ListGroup.Item>
                                            <ListGroup.Item style={{ background: "none", color: "#d7d7d7"}}> <CheckCircleIcon fontSize="small" color="info" /> Un super avantage </ListGroup.Item>
                                            <ListGroup.Item style={{ background: "none", color: "#d7d7d7"}}> <CheckCircleIcon fontSize="small" color="info" /> Un super avantage </ListGroup.Item>
                                        </ListGroup>
                                        <Card.Body className="p-0 d-flex justify-content-center">
                                            <Button variant="contained"
                                                    style={{width: "100%", textTransform: "none", fontWeight: "bold", background: "#1cd8fd"}}
                                                    onClick={() => createCheckoutSession(el)}>
                                                En profiter
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )) : null
                        }
                    </Row>
                </Container>
            </Col>
        </Row>
    )
}

export default Subscriptions