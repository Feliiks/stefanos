import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import GrandChelemPanel from './GrandChelemPanel'
import ManageSubPanel from './ManageSubPanel'
import { Alert } from '@mui/material'

const Admin = () => {
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
                    <h2 className="text-center text-lg-start"> Administration </h2>
                    <p> Gestion des événements et des utilisateurs. </p>
                </Col>
            </Row>
            {
                alert.message !== "" ? <Alert severity={alert.severity} onClose={() => setAlert({severity: '', message: ''})} className="alert"> {alert.message} </Alert> : null
            }
            <GrandChelemPanel
                setAlert={setAlert}
            />
            <ManageSubPanel
                setAlert={setAlert}
            />
        </Container>
    )
}

export default Admin