import React from 'react'
import { Container, Row } from 'react-bootstrap'
import InformationsPanel from './InformationsPanel'
import AbonnementsPanel from './AbonnementsPanel'
import { useSelector } from 'react-redux'

const Compte = () => {
    const user = useSelector((state) => state.user.value)

    return (
        <Container className="account">
            <Row className="title mb-5 d-flex justify-content-center justify-content-lg-start">
                <h2 className="text-center text-lg-start"> MON COMPTE </h2>
            </Row>
            <InformationsPanel />
            <AbonnementsPanel />
        </Container>
    )
}

export default Compte