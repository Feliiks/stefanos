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
        <Container fluid style={{background: "#212121", color: "#fff"}}>
            <Container className="account">
                <Row className="title mb-5 d-flex justify-content-center justify-content-lg-start">
                    <h2 className="text-center text-lg-start"> ADMINISTRATION </h2>
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
        </Container>
    )
}

export default Admin