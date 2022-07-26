import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { Button } from '@mui/material'
import api from '../../utils/api'
import validator from 'validator'

const Contact = ({ setAlert }) => {
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState({
        email: false,
        subject: false,
        message: false
    })
    const [submitted, setSubmitted] = useState(false)

    const resetForm = () => {
        setEmail("")
        setSubject("")
        setMessage("")
        setErrors({
            email: false,
            subject: false,
            message: false
        })
    }

    useEffect(() => {
        if (submitted) {
            setErrors({
                email: !validator.isEmail(email),
                subject: validator.isEmpty(subject),
                message: validator.isEmpty(message)
            })
        }
    }, [setErrors, submitted, email, subject, message])

    const sendMessage = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        try {
            if (!validator.isEmail(email) || validator.isEmpty(subject) || validator.isEmpty(message)) throw new Error()

            let res = await api.post("/emails/contact", {
                email: email,
                subject: subject,
                message: message
            })

            resetForm()
            setSubmitted(false)
            setAlert({
                severity: "success",
                message: res.data.message
            })
        } catch (err) {
            setSubmitted(false)
            setAlert({
                severity: "error",
                message: "Une erreur est survenue."
            })
        }
    }

    return (
        <Row style={{ background: "rgb(0, 30, 60)" }} id="contact">
            <Col>
                <Container>
                    <Row className="section d-flex justify-content-center align-items-center">
                        <Col className="d-flex flex-column justify-content-center mx-auto" lg={4}>
                            <span className="fw-bold" style={{ color: "rgb(51, 153, 255)" }}>Contact</span>
                            <h2 className="section-title mx-auto mb-1">
                                Nous sommes là pour <span style={{ color: "rgb(51, 153, 255)" }}>toi</span>
                            </h2>
                            <p className="mb-3 mb-lg-0">
                                Si tu as une quelconque question, n'hésite pas
                                à nous contacter via le formulaire ci-contre.
                            </p>
                        </Col>
                        <Col lg={5} className="mx-auto">
                            <Form className="form mx-auto">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        type="email"
                                        className={ errors.email ? "error" : "" }
                                        placeholder="Adresse email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                    <Form.Text className="text-danger">
                                        { errors.email ? "Adresse email incorrecte." : "" }
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                        type="text"
                                        className={ errors.subject ? "error" : "" }
                                        placeholder="Sujet"
                                        onChange={(e) => setSubject(e.target.value)}
                                        value={subject}
                                    />
                                    <Form.Text className="text-danger">
                                        { errors.subject ? "Sujet obligatoire." : "" }
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        className={ errors.message ? "error" : "" }
                                        placeholder="Message"
                                        onChange={(e) => setMessage(e.target.value)}
                                        value={message}
                                    />
                                    <Form.Text className="text-danger">
                                        { errors.message ? "Message obligatoire." : "" }
                                    </Form.Text>
                                </Form.Group>

                                <div className="d-flex justify-content-center">
                                    <Button variant="contained" type="submit" onClick={(e) => sendMessage(e)}>
                                        Envoyer
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
    )
}

export default Contact