import React from 'react'
import { Col, Row } from 'react-bootstrap'
import AbonnementDetail from './AbonnementDetail'
import api from '../../utils/api'

const AbonnementsPanel = ({ subscriptions, setAlert }) => {
    const deleteSub = async (id) => {
        try {
            let res = await api.delete(`/subscriptions/${id}`)

            setAlert({
                severity: "success",
                message: res.data.message
            })
        } catch (err) {
            console.log(err)
        }
    }

    let subscriptionsList = subscriptions.map(el => (
        <AbonnementDetail
            key={el._id}
            subId={el._id}
            name={el.subscription.name}
            created_at={el.created_at}
            facturationType={el.subscription.mode}
            deleteSub={deleteSub}
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
                        { subscriptionsList[0] ? subscriptionsList : "Aucun abonnement trouvé." }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default AbonnementsPanel