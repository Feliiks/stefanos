import React, { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import { Navigate, useParams } from 'react-router-dom'
import Logo from "../../assets/logo.svg"
import api from '../../utils/api'

const Payment = () => {
    let { status, session_id } = useParams()
    let [ session, setSession ] = useState({})

    useEffect(() => {
        api.get(`/payments/checkout-session/${session_id}`)
            .then(res => {
                setSession(res.data.session)
                window.location.reload(false);
            }).catch(err => {
                console.log(err)
            })
    }, [session_id])

    if (status === "success") {
        return (
            <Container style={{ paddingTop: "150px", paddingBottom: "100px"}}>
                <Col lg={5}
                     className="panel mx-auto d-flex align-items-center flex-column p-3"
                >
                    <img src={Logo} height={100} alt="logo" />
                    <h3 className="text-center fw-bold"> Merci pour votre achat ! </h3>
                    <p className="text-center">
                        Un email va vous être envoyé avec l'ensemble des informations relatives à votre commande.
                        <br />
                        <br />
                        Vous pouvez désormais accéder à l'ensemble de nos pronostics.
                    </p>
                </Col>
            </Container>
        )
    } else if (status === "canceled") {
        return (
            <Container style={{ paddingTop: "150px", paddingBottom: "100px"}}>
                <Col lg={5} className="panel mx-auto d-flex align-items-center flex-column p-3">
                    <img src={Logo} height={100} alt="logo" />
                    <h3 className="text-center fw-bold"> Votre achat n'a pas abouti ! </h3>
                    <p className="text-center"> La transaction n'a pas pu être complétée. <br /> Essayez de nouveau ou contactez l'administrateur. </p>
                </Col>
            </Container>
        )
    } else {
        return <Navigate to="/" />
    }
}

export default Payment