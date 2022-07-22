import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
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
        <Container fluid style={{background: "#212121", color: "#fff"}}>
            <Container className="account">
                <Row className="title mb-5 d-flex justify-content-center justify-content-lg-start">
                    <h2 className="text-center text-lg-start"> MON COMPTE </h2>
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
        </Container>
    )
}

export default Compte