import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Pronostic from "./Pronostic"
import api from '../../utils/api'
import ReactLoading from 'react-loading';


const All = () => {
    const [pronostics, setPronostics] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        setLoading(true)
        api.get("/pronostics/all").then(res => {
            setPronostics(res.data.finalResults)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }, [])

    if (!loading) {
        return (
            <Container fluid className="pronostics">
                <Row className="title">
                    <div className="filter" />
                    <Col className="d-flex align-items-center" style={{zIndex: "1"}}>
                        <Container className="p-0">
                        <span>
                            PRONOSTICS
                        </span>
                            <h2>
                                TOUS NOS PRONOSTICS
                            </h2>
                            <p>
                                SUIVEZ LA PUBLICATION DE NOS PRONOSTICS ET COMMENCEZ A PARIER GAGNANT !
                            </p>
                        </Container>
                    </Col>
                </Row>

                <Container>
                    <Row className="pt-5 pb-5">
                        {
                            pronostics[0] ?
                                pronostics
                                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                    .map(el => (
                                        <Pronostic
                                            key={el.title}
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

            </Container>
        )
    }  else {
        return (
            <Container fluid className="pronostics">
                <Row className="title">
                    <div className="filter" />
                    <Col className="d-flex align-items-center" style={{zIndex: "1"}}>
                        <Container className="p-0">
                        <span>
                            PRONOSTICS
                        </span>
                            <h2>
                                TOUS NOS PRONOSTICS
                            </h2>
                            <p>
                                SUIVEZ LA PUBLICATION DE NOS PRONOSTICS ET COMMENCEZ A PARIER GAGNANT !
                            </p>
                        </Container>
                    </Col>
                </Row>
                <Container className="d-flex flex-column align-items-center justify-content-center" style={{height: "500px"}}>
                    <ReactLoading className="mx-auto" type="bars" color="black" height={50} width={50} />
                    <p className="mx-auto text-center"> Chargement en cours... </p>
                </Container>
            </Container>
        )
    }
}

export default All