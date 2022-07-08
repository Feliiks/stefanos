import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import Vip from './list/Vip'
import GrandChelem from './list/GrandChelem'

const Abonnements = () => {
    return (
        <Container fluid className="abonnements">

            <Row className="title">
                <Col className="d-flex align-items-center">
                    <Container className="p-0 mt-5">
                        <span>
                            ABONNEMENTS
                        </span>
                        <h2>
                            DEVENIR MEMBRE
                        </h2>
                        <p>
                            DECOUVREZ NOS ABONNEMENTS ET DEVENEZ MEMBRE POUR ACCEDER A TOUS NOS PRONOSTICS !
                        </p>
                    </Container>
                </Col>
            </Row>

            <Vip />
            <GrandChelem />

        </Container>
    )
}

export default Abonnements