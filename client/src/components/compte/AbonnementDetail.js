import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'

const AbonnementDetail = ({ id, name, created_at, facturationType, deleteSub, show, setShow }) => {
    return (
        <>
            <Row className="abonnement-detail mb-3 pb-3 d-flex align-items-center mx-auto">
                <Col lg={6} className="d-flex flex-column align-items-center align-items-lg-start">
                    <h4>
                        { name }
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
                    <Button variant="danger" onClick={() => setShow(true)}> RESILIER </Button>
                </Col>
            </Row>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Résiliation de l'abonnement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Ce compte perdra immédiatement l'accès aux pronostics.
                    <br />
                    Confirmer ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={() => deleteSub(id)}>
                        Résilier
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AbonnementDetail