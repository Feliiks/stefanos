import React, { useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { Button } from "@mui/material"
import moment from "moment"
import CardMembershipIcon from '@mui/icons-material/CardMembership';

const AbonnementDetail = ({ subId, name, created_at, facturationType, paymentIntent, deleteSub }) => {
    const [show, setShow] = useState(false);
    let created_at_format = moment(new Date(created_at))

    const handleClose = () => {
        deleteSub(subId)
        setShow(false)
    }

    return (
        <>
            <Row className="abonnement-detail mb-3 pb-3 d-flex align-items-center mx-auto">
                <Col lg={6} className="d-flex flex-column align-items-center align-items-lg-start mb-2 mb-lg-0">
                    <h4>
                        { name }
                    </h4>
                    <p className="p-0 m-0" style={{ fontSize: "12px" }}> { paymentIntent ? paymentIntent : "Admin" } </p>
                </Col>
                <Col lg={3} className="d-flex flex-lg-column align-items-center align-items-lg-start justify-content-center mb-2 mb-lg-0">
                    <p className="p-0 m-0" style={{ fontSize: "12px" }}>Expire : { created_at_format.add(30, 'days').format('D/MM/YYYY') }</p>
                    <p className="p-0 ms-3 m-lg-0" style={{ fontSize: "12px" }}>Type : {facturationType}</p>
                </Col>
                <Col lg={3} className="d-flex flex-column align-items-center">
                    {
                        facturationType === "subscription" ?
                            <Button variant="contained" color="error" onClick={() => setShow(true)}> Résilier </Button>
                        :
                            <CardMembershipIcon />
                    }
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