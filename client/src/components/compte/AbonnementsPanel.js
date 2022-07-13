import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import AbonnementDetail from './AbonnementDetail'

const AbonnementsPanel = ({ subscriptions }) => {
    let subscriptionsList = subscriptions.map(el => (
        <AbonnementDetail
            name={el.subscription.name}
            description={el.subscription.description}
            expires={el.expirationDate}
        />
    ))
    return (
        <Row>
            <Col lg={8} className="panel mx-auto mt-4">
                <Row className="title">
                    <h3>
                        ABONNEMENTS
                    </h3>
                </Row>
                <Row>
                    <Col lg={10} className="mx-auto mt-4 mb-4">
                        { subscriptions !== [] ? subscriptionsList : "Aucun abonnement trouvé." }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default AbonnementsPanel