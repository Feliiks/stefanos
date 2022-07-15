import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import validator from 'validator'

const GrandChelemPanel = () => {
    const [tournament, setTournament] = useState("0")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        date: false
    })

    useEffect(() => {
        if (submitted) {
            setErrors({
                tournament: tournament === "0",
                date: start > end || validator.isEmpty(start) || validator.isEmpty(end)
            })
        }
    }, [setErrors, submitted, tournament, start, end])

    const startGrandChelem = (e) => {
        e.preventDefault()
        setSubmitted(true)

        try {
            if (start > end || validator.isEmpty(start) || validator.isEmpty(end) || tournament === "0") throw new Error()

            console.log("envoi des données")
        } catch (err) {
            console.log(err)
        }
    }

    const resetForm = () => {
        setTournament("0")
        setStart("")
        setEnd("")
        setSubmitted(false)
        setErrors({
            date: false
        })
    }

    return (
        <Row>
            <Col lg={8} className="panel mx-auto">
                <Row className="title">
                    <h3>
                        GRAND CHELEM
                    </h3>
                </Row>
                <Row>
                    <Form className="form mt-4 mb-4 mx-auto">
                        <Form.Group className="mb-3" controlId="formBasicFrom">
                            <Form.Select
                                aria-label="0"
                                value={tournament}
                                className={ errors.tournament ? "error" : "" }
                                onChange={e => setTournament(e.target.value)}
                            >
                                <option value="0"> Sélectionnez un tournoi </option>
                                <option value="1"> Open d'Australie </option>
                                <option value="2"> Roland Garros </option>
                                <option value="3"> Tournoi de Wimbledon </option>
                                <option value="4"> US Open </option>
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
            </Col>
        </Row>
    )
}

export default GrandChelemPanel