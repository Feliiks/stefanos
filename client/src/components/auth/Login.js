import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import BtnGoogle from "../../assets/btn_google_signin.png"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = (e) => {
        e.preventDefault()
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
                            className="error"
                            placeholder="Adresse email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Text className="text-danger">
                            Identifiants incorrects. Réessayez.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            className="error"
                            placeholder="Mot de passe"
                            onChange={(e) => setPassword(e.target.value)}
                        />
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