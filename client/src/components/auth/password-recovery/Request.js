import React, { useEffect, useState } from 'react'

import { Col, Container, Form, Row } from 'react-bootstrap'
import { Alert, Button } from '@mui/material'
import validator from 'validator'
import UserService from '../../../services/user.service'

const Request = () => {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        email: false,
        existing: false
    })
    const [alert, setAlert] = useState({
        severity: '',
        message: ''
    })

    useEffect(() => {
        if (alert.message) {
            setTimeout(() => {
                setAlert({
                    severity: "",
                    message: ""
                })
            }, 5000)
        }
    })

    useEffect(() => {
        if (submitted) {
            setErrors({
                email: !validator.isEmail(email),
                existing: false
            })
        }
    }, [setErrors, submitted, email])

    const sendRequest = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        try {
            if (!validator.isEmail(email)) throw new Error()

            let res = await UserService.passwordRecovery(email)

            setAlert({
                severity: "success",
                message: res.data.message
            })

        } catch (err) {
            setErrors({
                ...errors,
                existing: true
            })
            setAlert({
                severity: "error",
                message: "Une erreur est survenue."
            })
        }
    }

    return (
        <Container fluid style={{background: "#0A1929", color: "#fff"}}>
            {
                alert.message !== "" ? <Alert severity={alert.severity} onClose={() => setAlert({severity: '', message: ''})} className="alert"> {alert.message} </Alert> : null
            }
            <Container className="auth mt-3">
                <Row>
                    <Col lg={4} className="auth-panel mx-auto p-4">
                        <span className="mb-2 fs-4"> Récupération du mot de passe </span>
                        <p className="mb-3"> Renseignez votre adresse email afin de recevoir votre lien de récupération. </p>
                        <Form className="form mx-auto">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    className={ errors.email || errors.credentials ? "error" : "" }
                                    placeholder="Adresse email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <Form.Text className="text-danger">
                                    { errors.email ? "Adresse email incorrecte." : "" }
                                </Form.Text>
                                <Form.Text className="text-danger">
                                    { errors.credentials ? "Identifiants incorrects. Réessayez." : "" }
                                </Form.Text>
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button variant="contained" type="submit" onClick={(e) => sendRequest(e)}>
                                    Envoyer
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Request