import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import InformationsPanel from './InformationsPanel'
import AbonnementsPanel from './AbonnementsPanel'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Compte = () => {
    const user = useSelector((state) => state.user.value)
    const [alert, setAlert] = useState({
        severity: '',
        message: ''
    })

    useEffect(() => {
        if (alert.message) {
            setTimeout(() => {
                setAlert({
                    severity: "",
                    message: ""
                })
            }, 5000)
        }
    })

    return (
        <Container className="account">
            <Row className="title mb-4">
                <Col className="d-flex flex-column align-items-center align-items-md-start">
                    <h2 className="text-center text-lg-start"> Compte </h2>
                    <p> Gestion de compte et des abonnements. </p>
                </Col>
            </Row>
            {
                alert.message !== "" ? <Alert severity={alert.severity} onClose={() => setAlert({severity: '', message: ''})} className="alert"> {alert.message} </Alert> : null
            }
            <InformationsPanel
                setAlert={setAlert}
                user={user}
            />
            <AbonnementsPanel
                setAlert={setAlert}
                subscriptions={user.user_subscriptions}
            />
        </Container>
    )
}

export default Compte