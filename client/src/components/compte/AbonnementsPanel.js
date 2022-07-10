import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import AbonnementDetail from './AbonnementDetail'

const AbonnementsPanel = () => {
    return (
        <Row>
            <Col lg={8} className="panel mx-auto mt-4">
                <Row className="title">
                    <h3>
                        ABONNEMENTS
                    </h3>
                </Row>
                <Row className="abonnements-list">
                    <Col lg={10} className="mx-auto mt-4 mb-4">
                        <AbonnementDetail />
                        <AbonnementDetail />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default AbonnementsPanel