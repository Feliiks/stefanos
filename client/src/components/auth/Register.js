import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import validator from "validator"

import BtnGoogle from '../../assets/btn_google_signin.png'
import api from '../../utils/api'
import { login } from '../../reducers/user.reducer'
import { useDispatch } from 'react-redux'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        repeatPassword: false
    })

    const dispatch = useDispatch()

    useEffect(() => {
        if (submitted) {
            setErrors({
                email: !validator.isEmail(email),
                password: !validator.isStrongPassword(password),
                repeatPassword: password !== repeatPassword
            })
        }
    }, [setErrors, submitted, email, password, repeatPassword])

    const signUp = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        try {
            if (!validator.isEmail(email) || !validator.isStrongPassword(password) || password !== repeatPassword) throw new Error()

            let res = await api.post("/users", {
                username: email,
                password: password
            })

            if (res.status !== 201) throw new Error()

            dispatch(login({
                user: res.data.result,
                token: res.data.token
            }))

        } catch (err) {
            setErrors({
                ...errors,
                credentials: true
            })
        }
    }
    return (
        <Row className="mt-4">
            <Col lg={4} className="auth-panel mx-auto p-4">
                <h3 className="mb-3" style={{ color: "#555555" }}> JE N'AI PAS DE COMPTE </h3>
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
                            { errors.credentials ? "Ce compte existe déjà." : "" }
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            className={ errors.password || errors.repeatPassword ? "error" : "" }
                            placeholder="Mot de passe"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <Form.Text className="text-danger d-block">
                            { errors.password ? "Le mot de passe n'est pas assez sécurisé." : "" }
                        </Form.Text>
                        <Form.Text className="text-danger d-block">
                            { errors.repeatPassword ? "Les mots de passe ne correspondent pas." : "" }
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

                    <Button className="mx-auto" variant="primary" type="submit" onClick={(e) => signUp(e)}>
                        INSCRIPTION
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default Register