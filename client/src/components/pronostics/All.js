import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import Pronostic from "./Pronostic"

const All = () => {
    /* const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [date, setDate] = useState("") */

    return (
        <Container fluid className="pronostics">
            <Row className="title">
                <Col className="d-flex align-items-center">
                    <Container className="p-0 mt-5">
                        <span>
                            ESPACE MEMBRES
                        </span>
                        <h2>
                            NOS PRONOSTICS
                        </h2>
                        <p>
                            SUIVEZ LA PUBLICATION DE NOS PRONOSTICS ET COMMENCEZ A PARIER GAGNANT !
                        </p>
                    </Container>
                </Col>
            </Row>
            <Container className="pronostics-list pb-5">
                <Pronostic />
                <Pronostic />
                <Pronostic />
                <Pronostic />
                <Pronostic />
            </Container>

        </Container>
    )
}

export default All