import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

const Welcome = () => {
    return (
        <Row className="welcome_section d-flex align-items-center justify-content-center position-relative">
            <div className="filter" />
            <Col lg={8} className="title position-relative d-flex flex-column">
                <h1>
                    STEFANOS
                </h1>
                <h2>
                    LE MEILLEUR SITE DE PRONOSTICS POUR LE PARIS SPORTIF
                </h2>
                <Button className="mx-auto login-btn">
                    CONNEXION
                </Button>
            </Col>
        </Row>
    )
}

export default Welcome