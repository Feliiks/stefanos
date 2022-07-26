import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import TelegramIcon from '@mui/icons-material/Telegram';
import { Chip } from '@mui/material'

const Results = ({ results }) => {
    return (
        <Row className="section subscriptions d-flex justify-content-center" id="results">
            <Col>
                <Container>
                    <Row>
                        <Col className="d-flex flex-column" lg={5}>
                            <span className="fw-bold" style={{ color: "rgb(51, 153, 255)" }}>Résultats</span>
                            <h2 className="section-title">
                                Nous <span style={{ color: "rgb(51, 153, 255)" }}>boostons</span> tes résultats
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        {
                            results ? results.map(el => (
                                <Col lg={3} md={6} className="mb-3" key={el.name}>
                                    <div className="results-card">
                                        <div>
                                            <h3> { el.name } </h3>
                                        </div>
                                        <p>
                                            { el.description }
                                        </p>
                                        <Chip label={el.value} color="primary" />
                                    </div>
                                </Col>
                            )) : <p> Oups! Une erreur est survenue. </p>
                        }
                    </Row>
                </Container>
            </Col>
        </Row>
    )
}

export default Results