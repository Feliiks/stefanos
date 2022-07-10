import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import BtnGoogle from "../../assets/btn_google_signin.png"
import validator from 'validator'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        credentials: false
    })

    useEffect(() => {
        if (submitted) {
            setErrors({
                email: !validator.isEmail(email),
                password: !validator.isStrongPassword(password),
                credentials: false
            })
        }
    }, [setErrors, submitted, email, password])

    const signIn = (e) => {
        e.preventDefault()
        setSubmitted(true)

        console.log(email, password)
    }

    return (
        <Row>
            <Col lg={4} className="auth-panel mx-auto p-3">
                <h3 className="mb-3"> J'AI DEJA UN COMPTE </h3>
                <img className="mb-2 google-btn" src={BtnGoogle} alt="btn_google" />
                <span className="mb-2"> OU </span>
                <Form className="form">
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

                    <Form.Group className="mb-3" controlId="formBasicPassword">
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

                    <Button variant="primary" type="submit" onClick={(e) => signIn(e)}>
                        CONNEXION
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default Login