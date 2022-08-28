import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Pronostic from './Pronostic'
import {useNavigate} from 'react-router-dom';
import ReactLoading from 'react-loading'
import { Button } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram'
import moment from 'moment'
import EventService from '../../services/event.service'
import PronosticService from '../../services/pronostic.service'

const GrandChelem = () => {
    const [event, setEvent] = useState(null)
    const navigate = useNavigate();
    const [pronostics, setPronostics] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        EventService.getAll()
            .then(res => {
                setEvent(res.data.events_list[0])

                if (new Date(res.data.events_list[0].starts) >= new Date(Date.now())) {
                    return navigate('/')
                }
            })
        .catch(err => {
            setEvent(null)
        })
    }, [navigate])

    useEffect( () => {
        setLoading(true)
        PronosticService.getGrandChelem()
            .then(res => {
                setPronostics(res.data.finalResults)
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
    }, [])

    return (
        <Container fluid className="pronostics">
            <Row className="title">
                <div className="filter position-absolute" />
                <Col className="d-flex align-items-center pt-4 pb-4" style={{zIndex: "1"}}>
                    <Container className="p-0">
                        <Row>
                            <Col lg={6}>
                                <span>PRONOSTICS</span>
                                <h2>
                                    { event ? event.tournament : "AUCUN TOURNOI EN COURS" }
                                </h2>
                                {
                                    event ?
                                        <p>
                                            DU { moment(new Date(event.starts)).format('DD/MM/YYYY') } AU { moment(new Date(event.ends)).format('DD/MM/YYYY') }
                                        </p>
                                        : null
                                }
                            </Col>
                            <Col lg={6} className="d-flex justify-content-lg-end align-items-center pb-3">
                                <a href="https://t.me/+WyoF9Q4ybo9jOGI0" target="_blank" rel="noreferrer">
                                    <Button variant="contained" startIcon={<TelegramIcon />}>
                                        Suivre
                                    </Button>
                                </a>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            {
                !loading ?
                    <Container>
                        <Row className="pt-5 pb-5">
                            {
                                pronostics[0] ?
                                    pronostics
                                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                    .map(el => (
                                        <Pronostic
                                            key={el.created_at}
                                            title={el.title}
                                            image={el.image}
                                            content={el.content}
                                            created_at={el.created_at}
                                        />
                                    ))
                                    : <p> Aucun pronostic trouvé. </p>
                            }
                        </Row>
                    </Container>
                    :
                    <Container className="d-flex flex-column align-items-center justify-content-center" style={{height: "500px"}}>
                        <ReactLoading className="mx-auto" type="bars" color="white" height={50} width={50} />
                        <p className="mx-auto text-center"> Chargement en cours... </p>
                    </Container>
            }
        </Container>
    )
}

export default GrandChelem