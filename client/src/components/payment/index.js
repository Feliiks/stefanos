import React, { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import { Navigate, useParams } from 'react-router-dom'
import Logo from "../../assets/Stefanos_logo_full_white_yellow-1.png"
import PaymentService from '../../services/payment.service'

const Payment = () => {
    let { status, session_id } = useParams()
    let [ session, setSession ] = useState({})

    useEffect(() => {
        PaymentService.getCheckoutSession(session_id)
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
                    <img src={Logo} height={40} alt="logo" />
                    <br />
                    <h3 className="text-center fw-bold"> Merci pour ton achat ! </h3>
                    <p className="text-center">
                        Nous allons t'envoyer un mail avec toutes les informations relatives à ta commande.
                        <br />
                        <br />
                        Tu peux désormais accéder à l'ensemble de nos pronostics.
                    </p>
                </Col>
            </Container>
        )
    } else if (status === "canceled") {
        return (
            <Container style={{ paddingTop: "150px", paddingBottom: "100px"}}>
                <Col lg={5} className="panel mx-auto d-flex align-items-center flex-column p-3">
                    <img src={Logo} height={50} alt="logo" />
                    <br />
                    <h3 className="text-center fw-bold"> Ton achat n'a pas abouti ! </h3>
                    <p className="text-center"> La transaction n'a pas pu être complétée. <br /> Essaye de nouveau ou contacte l'administrateur. </p>
                </Col>
            </Container>
        )
    } else {
        return <Navigate to="/" />
    }
}

export default Payment