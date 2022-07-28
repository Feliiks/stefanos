import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Welcome = () => {
    return (
        <Row className="welcome_section d-flex align-items-center justify-content-center position-relative" id="welcome">
            <div className="filter" />
            <Col lg={8} className="title position-relative d-flex flex-column">
                <h1>
                    STEFANOS
                </h1>
                <h2>
                    SITE DE PRONOSTICS POUR LE PARIS SPORTIF
                </h2>
            </Col>
        </Row>
    )
}

export default Welcome