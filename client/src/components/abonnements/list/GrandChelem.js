import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

import AboIlu from '../../../assets/ilu-abo.jpg'

const GrandChelem = () => {
    return (
        <Row className="abonnement_detail pt-5 pb-5" style={{ background: '#F3F3F3'}}>
            <Col className="d-flex align-items-center">
                <Container>
                    <Row>
                        <Col lg={5} className="mx-auto d-flex flex-column justify-content-center align-items-center align-items-lg-end">
                            <img src={AboIlu} alt="illustration abonnement" />
                        </Col>
                        <Col lg={5} className="mx-auto d-flex flex-column justify-content-center align-items-center align-items-lg-start pt-4 pt-lg-0">
                            <h3 className="text-center text-lg-start"> ABONNEMENT «GRAND CHELEM» - 19.99€ </h3>
                            <span> Disponible jusqu'au 14/07/2022 ! </span>
                            <p className="text-center text-lg-start">
                                Adflictabantur munimentum trinoctium posset
                                circumstetere quicquam nec commeatus maiora omne
                                gravi quoniam Isauriae adgressuri in hoc Paleas
                                maesti ullum quicquam circumstetere vergentem
                                discrimine adsueti posset neque adgressuri neque
                                quicquam procederet adsueti locum et Isauriae
                                omne adflictabantur.
                            </p>
                            <Button className="login-btn">
                                J'EN PROFITE
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
    )
}

export default GrandChelem