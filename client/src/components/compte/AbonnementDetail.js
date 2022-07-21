import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'

const AbonnementDetail = ({ subId, name, created_at, facturationType, deleteSub, show, setShow }) => {
    console.log(subId)
    return (
        <Row className="abonnement-detail mb-3 pb-3 d-flex align-items-center mx-auto">
            <Col lg={6} className="d-flex flex-column align-items-center align-items-lg-start">
                <h4>
                    { name }
                    { subId }
                </h4>
            </Col>
            <Col lg={3} className="d-flex flex-column align-items-center">
                <p className="p-0 m-0 text-center" style={{ fontSize: "12px" }}>
                    Depuis : { new Date(created_at).toLocaleDateString("fr-Fr") }
                    <br />
                    Type : { facturationType }
                </p>
            </Col>
            <Col lg={3} className="d-flex flex-column align-items-center">
                <Button variant="danger" onClick={() => deleteSub(subId)}> RESILIER </Button>
            </Col>
        </Row>
    )
}

export default AbonnementDetail