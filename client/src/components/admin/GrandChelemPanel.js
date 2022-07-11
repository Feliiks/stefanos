import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import validator from 'validator'

const GrandChelemPanel = () => {
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        date: false
    })

    useEffect(() => {
        if (submitted) {
            setErrors({
                date: start > end
            })
        }
    }, [setErrors, submitted, start, end])

    const startGrandChelem = (e) => {
        e.preventDefault()
        setSubmitted(true)


        console.log(start, end)
    }

    const resetForm = () => {
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
                    <Form className="form mt-4 mb-4">
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Control
                                type="date"
                                className={ errors.date ? "error" : "" }
                                placeholder="Nouveau nom d'utilisateur"
                                onChange={(e) => setStart(e.target.value)}
                                value={start}
                            />
                            <Form.Text className="text-danger">
                                { errors.date ? "Date de début supérieure à la date de fin." : "" }
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="date"
                                className={ errors.date ? "error" : "" }
                                placeholder="Nouvelle adresse email"
                                onChange={(e) => setEnd(e.target.value)}
                                value={end}
                            />
                        </Form.Group>

                        <div>
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