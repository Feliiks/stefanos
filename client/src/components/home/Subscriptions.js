import React from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { Button } from "@mui/material"

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Subscriptions = ({ subscriptionTypes, createCheckoutSession }) => {
    return (
        <Row style={{ background: "rgb(0, 30, 60)" }} id="subscriptions">
            <Col>
                <Container>
                    <Row className="section subscriptions d-flex justify-content-center">
                        <Col className="d-flex flex-column justify-content-center" lg={4}>
                            <span className="fw-bold" style={{ color: "rgb(51, 153, 255)" }}>Abonnements</span>
                            <h2 className="section-title mx-auto">
                                Tous ce dont vous avez besoin <span style={{ color: "rgb(51, 153, 255)" }}>en un seul clic</span>
                            </h2>
                        </Col>
                        {
                            subscriptionTypes ? subscriptionTypes.map(el => (
                                <Col lg={4} key={el._id} className="mb-3">
                                    <Card className="sub-card shadow mx-auto overflow-hidden p-3" style={{ width: '17rem' }}>
                                        <Card.Body className="d-flex align-items-center justify-content-center" style={{ height: "75px"}}>
                                            <Card.Title className="text-uppercase fw-bold text-center m-0 p-0"> { el.name } </Card.Title>
                                        </Card.Body>
                                        <Card.Body className="d-flex align-items-center justify-content-center">
                                            <span style={{ fontWeight: "bold", fontSize: "20px", marginRight: "5px"}}> {el.price ? el.price / 100 : ".."}€</span>
                                            <span style={{ color: "#d9d9d9", fontSize: "16px", fontStyle: "italic"}}> {el.event ? " / tournoi" : " / mois"} </span>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush mb-3" style={{ border: "none"}}>
                                            <ListGroup.Item style={{ background: "none", color: "#d7d7d7"}}> <CheckCircleIcon fontSize="small" color="info" /> {el.advantages[0]} </ListGroup.Item>
                                            <ListGroup.Item style={{ background: "none", color: "#d7d7d7"}}> <CheckCircleIcon fontSize="small" color="info" /> {el.advantages[1]} </ListGroup.Item>
                                            <ListGroup.Item style={{ background: "none", color: "#d7d7d7"}}> <CheckCircleIcon fontSize="small" color="info" /> {el.advantages[2]} </ListGroup.Item>
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
                            )) : <p> Oups! Une erreur est survenue. </p>
                        }
                    </Row>
                </Container>
            </Col>
        </Row>
    )
}

export default Subscriptions