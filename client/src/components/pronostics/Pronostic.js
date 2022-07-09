import React from 'react'
import { Col, Row } from 'react-bootstrap'

import siteBg from "../../assets/website-bg.jpg"

const Pronostic = () => {
    return (
        <Row className="pronostic">
            <Col lg={8} className="mx-auto border-bottom border-default pb-3 pt-4">
                <h3>
                    TITRE
                </h3>
                <p>
                    Adflictabantur munimentum trinoctium posset
                    circumstetere quicquam nec commeatus maiora omne
                    gravi quoniam Isauriae adgressuri in hoc Paleas
                    maesti ullum quicquam circumstetere vergentem
                    discrimine adsueti posset neque adgressuri neque
                    quicquam procederet adsueti locum et Isauriae
                    omne adflictabantur.
                </p>
                <a href="https://www.google.com" target="_blank" rel="noreferrer">
                    <div className="image">
                        <img src={siteBg} alt="zzzz" />
                    </div>
                </a>
                <p className="pt-2 mb-0">
                    Publié le 09/07/2022 à 00:00:00
                </p>
            </Col>
        </Row>
    )
}

export default Pronostic