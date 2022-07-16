import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Pronostic from './Pronostic'
import api from '../../utils/api'

const GrandChelem = () => {
    const [event, setEvent] = useState(null)

    useEffect(() => {
        api.get("/events")
        .then(res => {
            setEvent(res.data.events_list[0])
        })
        .catch(err => {
            setEvent(null)
        })
    }, [])
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
                            PRONOSTICS
                        </span>
                        <h2>
                            { event ? event.tournament : "AUCUN TOURNOI EN COURS" }
                        </h2>
                        {
                            event ?
                                <p>
                                    DU { new Date(event.starts).toLocaleDateString("fr-Fr") } AU { new Date(event.ends).toLocaleDateString("fr-Fr") }
                                </p>
                            : null
                        }
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

export default GrandChelem