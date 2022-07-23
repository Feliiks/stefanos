import React, { useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { Button } from "@mui/material"

const AbonnementDetail = ({ subId, name, created_at, facturationType, deleteSub }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        deleteSub(subId)
        setShow(false)
    }

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
                    <Button variant="contained" color="error" onClick={() => setShow(true)}> Résilier </Button>
                </Col>
            </Row>
            <Modal show={show} onHide={() => setShow(false)} style={{ color: "#000" }}>
                <Modal.Header closeButton>
                    <Modal.Title>Résilier l'abonnement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Ce compte perdra immédiatement tous les avantages liés à cet abonnement.
                </Modal.Body>
                <Modal.Footer>
                    <Button className="me-3" variant="outlined" onClick={() => setShow(false)}>
                        Annuler
                    </Button>
                    <Button variant="contained" color="error" onClick={handleClose}>
                        Résilier
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AbonnementDetail