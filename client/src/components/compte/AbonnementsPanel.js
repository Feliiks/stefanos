import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import AbonnementDetail from './AbonnementDetail'
import api from '../../utils/api'

const AbonnementsPanel = ({ subscriptions }) => {
    const [show, setShow] = useState(false);

    const deleteSub = async (id) => {
        await api.post("/subscriptions/delete", {
            user_subscription_id: id
        })

        setShow(false)
        window.location.reload(false);
    }

    let subscriptionsList = subscriptions.map(el => (
        <AbonnementDetail
            key={el._id}
            id={el._id}
            name={el.subscription.name}
            description={el.subscription.description}
            created_at={el.created_at}
            facturationType={el.subscription.facturationType}
            deleteSub={deleteSub}
            show={show}
            setShow={setShow}
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
                        { subscriptionsList.length !== 0 ? subscriptionsList : "Aucun abonnement trouvé." }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default AbonnementsPanel