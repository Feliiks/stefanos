import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import validator from 'validator'
import api from '../../utils/api'

const GrandChelemPanel = () => {
    const [existingEvent, setExistingEvent] = useState(null)
    const [tournament, setTournament] = useState("default")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        date: false
    })
    const [show, setShow] = useState(false)

    useEffect(() => {
        api.get("/events")
            .then(res => {
                setExistingEvent(res.data.events_list[0])
            })
            .catch(err => {
                setExistingEvent(null)
        })
    }, [])

    useEffect(() => {
        if (submitted) {
            setErrors({
                tournament: tournament === "0",
                date: start > end || validator.isEmpty(start) || validator.isEmpty(end)
            })
        }
    }, [setErrors, submitted, tournament, start, end])

    const resetForm = () => {
        setSubmitted(false)
        setTournament("default")
        setStart("")
        setEnd("")
        setErrors({
            date: false
        })
    }

    const startGrandChelem = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        try {
            if (start > end || validator.isEmpty(start) || validator.isEmpty(end) || tournament === "default") throw new Error()

            let res = await api.post("/events", {
                tournament: tournament,
                starts: start,
                ends: end
            })

            resetForm()
            setExistingEvent(res.data.event)
        } catch (err) {
            console.log(err)
        }
    }

    const closeGrandChelem = async (e) => {
        e.preventDefault()
        try {
            await api.delete(`/events/${existingEvent._id}`)

            setExistingEvent(null)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Row>
            <Col lg={8} className="panel mx-auto">
                <Row className="title">
                    <h3>
                        GRAND CHELEM - {existingEvent ? "EN COURS" : "CREATION"}
                    </h3>
                </Row>
                {
                    !existingEvent ?
                        <Row>
                            <Form className="form mt-4 mb-4 mx-auto">
                                <Form.Group className="mb-3" controlId="formBasicFrom">
                                    <Form.Select
                                        aria-label="0"
                                        value={tournament}
                                        className={ errors.tournament ? "error" : "" }
                                        onChange={e => setTournament(e.target.value)}
                                    >
                                        <option value="default"> Sélectionnez un tournoi </option>
                                        <option value="Open d'Australie"> Open d'Australie </option>
                                        <option value="Roland Garros"> Roland Garros </option>
                                        <option value="Tournoi de Wimbledon"> Tournoi de Wimbledon </option>
                                        <option value="US Open"> US Open </option>
                                    </Form.Select>
                                    <Form.Text className="text-danger">
                                        { errors.tournament ? "Vous devez sélectionner un tournoi." : "" }
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicFrom">
                                    <Form.Control
                                        type="date"
                                        className={ errors.date ? "error" : "" }
                                        onChange={(e) => setStart(e.target.value)}
                                        value={start}
                                    />
                                    <Form.Text className="text-danger">
                                        { errors.date ? "Date de début supérieure à la date de fin." : "" }
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicTo">
                                    <Form.Control
                                        type="date"
                                        className={ errors.date ? "error" : "" }
                                        onChange={(e) => setEnd(e.target.value)}
                                        value={end}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-center">
                                    <Button variant="secondary" onClick={(e) => resetForm()}> ANNULER </Button>
                                    <Button variant="success" onClick={(e) => startGrandChelem(e)}> VALIDER </Button>
                                </div>
                            </Form>
                        </Row>
                    :
                        <Row>
                            <Form className="form mt-4 mb-4 mx-auto">
                                <Form.Group className="mb-3" controlId="formBasicFrom">
                                    <Form.Select
                                        aria-label="0"
                                        value={existingEvent.tournament}
                                        disabled
                                    >
                                        <option value="default"> Sélectionnez un tournoi </option>
                                        <option value="Open d'Australie"> Open d'Australie </option>
                                        <option value="Roland Garros"> Roland Garros </option>
                                        <option value="Tournoi de Wimbledon"> Tournoi de Wimbledon </option>
                                        <option value="US Open"> US Open </option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicFrom">
                                    <Form.Control
                                        type="text"
                                        className={ errors.date ? "error" : "" }
                                        onChange={(e) => setStart(e.target.value)}
                                        value={"Début : " + new Date(existingEvent.starts).toLocaleDateString("fr-Fr")}
                                        disabled
                                    />
                                    <Form.Text className="text-danger">
                                        { errors.date ? "Date de début supérieure à la date de fin." : "" }
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicTo">
                                    <Form.Control
                                        type="text"
                                        className={ errors.date ? "error" : "" }
                                        onChange={(e) => setEnd(e.target.value)}
                                        value={"Fin : " + new Date(existingEvent.ends).toLocaleDateString("fr-Fr")}
                                        disabled
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-center">
                                    <Button variant="danger" onClick={() => setShow(true)}> TERMINER </Button>
                                </div>
                            </Form>
                        </Row>
                }
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Terminer l'événement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        L'événement prendra fin et tous les utilisateurs perdront leur abonnement.
                        <br />
                        Confirmer ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Annuler
                        </Button>
                        <Button variant="danger" onClick={closeGrandChelem}>
                            TERMINER
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </Row>
    )
}

export default GrandChelemPanel