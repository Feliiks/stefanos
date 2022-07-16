import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

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

    const subscriptionsList = subscriptionTypes ? subscriptionTypes.filter(el => el.isActive).map(el => (
        <Row className="abonnement_detail pt-5 pb-5" key={el._id}>
            <Col className="d-flex align-items-center">
                <Container>
                    <Row>
                        <Col lg={5} className="mx-auto d-flex flex-column justify-content-center align-items-center align-items-lg-end">
                            <img src={AboIlu} alt="illustration abonnement" />
                        </Col>
                        <Col lg={5} className="mx-auto d-flex flex-column justify-content-center align-items-center align-items-lg-start pt-4 pt-lg-0">
                            <h3 className="text-center text-lg-start"> ABONNEMENT {el.name} - {el.price ? el.price / 100 : ""}€ </h3>
                            {
                                el.event ?
                                    <span> {el.event.tournament} • {new Date(el.event.starts).toLocaleDateString("fr-Fr")} - {new Date(el.event.ends).toLocaleDateString("fr-Fr")} </span>
                                :
                                    <span> Abonnement mensuel </span>
                            }
                            <p className="text-center text-lg-start">
                                { el.description }
                            </p>
                            <Button className="login-btn" onClick={() => createCheckoutSession(el.stripePriceId, el._id, el.mode)}>
                                J'EN PROFITE
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
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

            { subscriptionsList }

        </Container>
    )
}

export default Abonnements