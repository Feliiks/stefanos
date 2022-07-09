import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import BtnGoogle from '../../assets/btn_google_signin.png'

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const signUp = (e) => {
        e.preventDefault()
        console.log(username, email, password, repeatPassword)
    }

    return (
        <Row className="mt-4">
            <Col lg={4} className="auth-panel mx-auto p-3">
                <h3 className="mb-3" style={{ color: "#555555" }}> JE N'AI PAS DE COMPTE </h3>
                <img className="mb-2 google-btn" src={BtnGoogle} alt="btn_google" />
                <span className="mb-2"> OU </span>
                <Form className="form">
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Control
                            type="text"
                            className="error"
                            placeholder="Nom d'utilisateur"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            className="error"
                            placeholder="Adresse email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Text className="text-danger">
                            Adresse email incorrecte.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            className="error"
                            placeholder="Mot de passe"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Text className="text-danger">
                            Les mots de passe ne correspondent pas.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
                        <Form.Control
                            type="password"
                            className="error"
                            placeholder="Répétez mot de passe"
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={(e) => signUp(e)}>
                        INSCRIPTION
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default Register