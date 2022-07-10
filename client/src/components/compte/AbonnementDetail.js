import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

const AbonnementDetail = () => {
    return (
        <Row className="abonnement-detail mb-3 pb-2 d-flex align-items-center">
            <Col lg={7} className="d-flex flex-column align-items-center align-items-lg-start">
                <h4>
                    ABONNEMENT V.I.P
                </h4>
                <p>
                    Le meilleur abonnement de tous les temps.
                </p>
            </Col>
            <Col lg={5} className="d-flex flex-column align-items-center">
                <div className="d-flex">
                    <Button variant="success"> PROLONGER </Button>
                    <Button variant="danger"> RESILIER </Button>
                </div>
                <p className="p-0 m-0" style={{ fontSize: "12px" }}>
                    Expire : 14/07/2022
                </p>
            </Col>
        </Row>
    )
}

export default AbonnementDetail