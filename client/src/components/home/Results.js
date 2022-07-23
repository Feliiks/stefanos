import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import TelegramIcon from '@mui/icons-material/Telegram';
import { Chip } from '@mui/material'

const Results = () => {
    return (
        <Row className="section subscriptions d-flex justify-content-center">
            <Col>
                <Container>
                    <Row>
                        <Col className="d-flex flex-column" lg={5}>
                            <span className="fw-bold" style={{ color: "rgb(51, 153, 255)" }}>Résultats</span>
                            <h2 className="section-title">
                                Nous <span style={{ color: "rgb(51, 153, 255)" }}>boostons</span> vos résultats
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={6} className="mb-3">
                            <div className="results-card">
                                <div>
                                    <TelegramIcon className="me-2" color="primary" />
                                    <h3> Retour sur investissement </h3>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <Chip label="Valeur ici" color="secondary" />
                            </div>
                        </Col>
                        <Col lg={3} md={6} className="mb-3">
                            <div className="results-card">
                                <div>
                                    <TelegramIcon className="me-2" color="primary" />
                                    <h3> Ceci est un super titre </h3>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <Chip label="Valeur ici" color="secondary" />
                            </div>
                        </Col>
                        <Col lg={3} md={6} className="mb-3">
                            <div className="results-card">
                                <div>
                                    <TelegramIcon className="me-2" color="primary" />
                                    <h3> Ceci est un super titre </h3>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <Chip label="Valeur ici" color="secondary" />
                            </div>
                        </Col>
                        <Col lg={3} md={6} className="mb-3">
                            <div className="results-card">
                                <div>
                                    <TelegramIcon className="me-2" color="primary" />
                                    <h3> Ceci est un super titre </h3>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <Chip label="Valeur ici" color="secondary" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
    )
}

export default Results