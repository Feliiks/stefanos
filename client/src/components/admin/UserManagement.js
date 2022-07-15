import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

const UserManagement = ({ targetUser, subscriptionsList, deleteUser, makeUserAdmin }) => {
    return (
        <Row>
            <Col lg={10} className="mx-auto mb-2">
                {subscriptionsList}
            </Col>
            <Col lg={10} className="mx-auto mb-4 d-flex justify-content-center">
                <Button variant="danger" onClick={deleteUser}> SUPPRIMER </Button>
                <Button variant="secondary" onClick={makeUserAdmin}> {targetUser.admin ? "RETIRER ADMIN" : "METTRE ADMIN"} </Button>
            </Col>
        </Row>
    )
}

export default UserManagement