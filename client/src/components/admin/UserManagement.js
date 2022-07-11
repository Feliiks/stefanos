import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import AbonnementDetail from '../compte/AbonnementDetail'

const UserManagement = () => {
    return (
        <Row>
            <Col lg={10} className="mx-auto mb-2">
                {/*
                    On boucle sur tous les abonnements puis sur tous les abonnements
                    de l'user. Si un abonnement match, on renseigne les infos sinon on
                    le marque "non abonné".
                */}
                <AbonnementDetail />
                <AbonnementDetail />
            </Col>
            <Col lg={10} className="mx-auto mb-4 d-flex justify-content-center">
                <Button variant="danger"> SUPPRIMER </Button>
                <Button variant="secondary"> METTRE ADMIN </Button>
            </Col>
        </Row>
    )
}

export default UserManagement