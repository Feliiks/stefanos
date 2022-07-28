import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const About = () => {
    return (
        <Row style={{ background: "rgb(0, 30, 60)" }} className="section" id="about">
            <Col>
                <Container>
                    <Row>
                        <span className="fw-bold" style={{ color: 'rgb(51, 153, 255)' }}>A propos</span>
                        <h2 className="section-title">
                            Tu es entre de <span style={{ color: 'rgb(51, 153, 255)' }}>bonnes mains</span>
                        </h2>
                        <Col lg={10} className="mx-auto">
                            <p style={{ fontSize: "16px" }}>
                                Parieur depuis maintenant plus de 6 ans, cela
                                m’a permis d’acquérir beaucoup d’expérience & de
                                connaissances dans différents domaines, notamment
                                le Tennis, le Basket-ball, le Football & bien
                                d’autres.
                                <br />
                                <br />
                                Mon but est de mettre mes connaissances à ton
                                service afin de te faire progresser dans le
                                domaine des paris sportifs afin que tu puisse
                                saisir les meilleurs opportunités sur des
                                marchés précis qui rapportent sur le long terme.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
    )
}

export default About