import React, { useEffect, useState } from 'react'
import validator from 'validator'
import jwt from "jwt-decode"
import { useNavigate, useParams } from 'react-router-dom'

import { Col, Container, Form, Row } from 'react-bootstrap'
import { Alert, Button } from '@mui/material'
import api from '../../../utils/api'

const Update = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        password: false,
        repeatPassword: false
    })
    const [alert, setAlert] = useState({
        severity: '',
        message: ''
    })
    const token = useParams().token
    const storedToken = localStorage.getItem("passwordToken")


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
                password: !validator.isStrongPassword(password),
                repeatPassword: password !== repeatPassword
            })
        }
    }, [setErrors, submitted, password, repeatPassword])

    const sendNewPassword = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        try {
            if (!validator.isStrongPassword(password) || password !== repeatPassword) throw new Error()

            if (!storedToken || token !== storedToken) throw new Error()

            let payload = await jwt(token)

            await api.put(`/users/password/${payload._id}`, {
                new_password: password
            })

            localStorage.removeItem("passwordToken")

            return navigate("/auth")

        } catch (err) {
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
                        <p className="mb-3"> Renseignez votre nouveau mot de passe. </p>
                        <Form className="form mx-auto">
                            <Form.Group className="mb-2" controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    className={ errors.password || errors.credentials ? "error" : "" }
                                    placeholder="Mot de passe"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <Form.Text className="text-danger">
                                    { errors.password ? "Mot de passe incorrect." : "" }
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
                                <Form.Control
                                    type="password"
                                    className={ errors.repeatPassword ? "error" : "" }
                                    placeholder="Répétez mot de passe"
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    value={repeatPassword}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button variant="contained" type="submit" onClick={(e) => sendNewPassword(e)}>
                                    Confirmer
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Update