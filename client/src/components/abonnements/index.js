import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'

import { useSelector } from 'react-redux'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom';
import AboIlu from '../../assets/ilu-abo.jpg'

const Abonnements = () => {
    const user = useSelector((state) => state.user.value)
    const [subscriptionTypes, setSubscriptionTypes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/subscriptions/types").then(res => {
            setSubscriptionTypes(res.data.subscriptionTypes)
        }).catch(err => {
            console.log(err.message)
        })
    }, [])

    const createCheckoutSession = async (priceId, subscriptionId, mode) => {
        try {
            if (!user) {
                navigate("/auth")
            } else if (user && !user.user_subscriptions.some(el => el.subscription._id === subscriptionId) > 0) {
                let session = await api.post("/payments/checkout-session", {
                    price_id: priceId,
                    subscription_id: subscriptionId,
                    mode: mode,
                    username: user.user.username
                })

                return window.location.href = session.data.url
            } else {
                navigate("/mon-compte")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const subscriptionsList = subscriptionTypes ? subscriptionTypes.map(el => (
        <Col lg={6} className="d-flex align-items-center justify-content-center" key={el._id}>
            <Card className="mx-auto" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={el.image} />
                <Card.Body>
                    <Card.Title>{el.name}</Card.Title>
                    <Card.Text style={{height: "150px"}}>
                        {el.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {
                        el.event ?
                            <ListGroup.Item>{new Date(el.event.starts).toLocaleDateString("fr-Fr")} - {new Date(el.event.ends).toLocaleDateString("fr-Fr")}</ListGroup.Item>
                            :
                            <ListGroup.Item>Abonnement mensuel</ListGroup.Item>
                    }

                    <ListGroup.Item>{el.price ? el.price / 100 : ""}€</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Button className="login-btn" onClick={() => createCheckoutSession(el.stripePriceId, el._id, el.mode)}>
                        J'EN PROFITE
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )) : null

    return (
        <Container fluid className="abonnements">

            <Row className="title">
                <Col className="d-flex align-items-center">
                    <Container className="p-0 mt-5">
                        <span>
                            ABONNEMENTS
                        </span>
                        <h2>
                            DEVENIR MEMBRE
                        </h2>
                        <p>
                            DECOUVREZ NOS ABONNEMENTS ET DEVENEZ MEMBRE POUR ACCEDER A TOUS NOS PRONOSTICS !
                        </p>
                    </Container>
                </Col>
            </Row>

            <Container className="p-5">
                <Row>
                    { subscriptionsList }
                </Row>
            </Container>

        </Container>
    )
}

export default Abonnements