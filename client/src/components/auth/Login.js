import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import api from "../../utils/api"

import { useDispatch } from 'react-redux'
import { login } from '../../reducers/user.reducer'

import BtnGoogle from "../../assets/btn_google_signin.png"
import validator from 'validator'

import { Navigate } from 'react-router'
import { gapi } from 'gapi-script';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        credentials: false
    })
    const [googleTokenId, setGoogleTokenId] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {
        if (submitted) {
            setErrors({
                email: !validator.isEmail(email),
                password: !validator.isStrongPassword(password),
                credentials: false
            })
        }
    }, [setErrors, submitted, email, password])

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "714637265219-g5leq30s9fjgbkqrhadth8p64csc2k0k.apps.googleusercontent.com",
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const signIn = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        try {
            if (!validator.isEmail(email) || !validator.isStrongPassword(password)) throw new Error()

            let res = await api.post("/users/login", {
                username: email,
                password: password
            })

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

    const loginWithGoogle = async (googleId) => {
        try {
            let res = await api.post("/users/login/google", {
                googleId: googleId
            })

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
        <Row>
            <Col lg={4} className="auth-panel mx-auto p-4">
                <h3 className="mb-3"> J'AI DEJA UN COMPTE </h3>
                <GoogleLogin
                    className="mb-2"
                    clientId="714637265219-g5leq30s9fjgbkqrhadth8p64csc2k0k.apps.googleusercontent.com"
                    onSuccess={(res) => loginWithGoogle(res.googleId)}
                    onFailure={() => alert("Google Error.")}
                    cookiePolicy={"single_host_origin"}
                />
                <span className="mb-2"> OU </span>
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

                    <Form.Group className="mb-1" controlId="formBasicPassword">
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

                    <span className="password mb-3"> Mot de passe oublié ? </span>

                    <Button className="mx-auto" variant="primary" type="submit" onClick={(e) => signIn(e)}>
                        CONNEXION
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default Login