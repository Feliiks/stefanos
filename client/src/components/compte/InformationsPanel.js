import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import validator from 'validator'

const InformationsPanel = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repeatNewPassword, setRepeatNewPassword] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        email: false,
        newPassword: false,
        repeatNewPassword: false
    })
    const form = useRef()

    useEffect(() => {
        if (submitted) {
            setErrors({
                email: !validator.isEmail(email),
                newPassword: !validator.isEmpty(newPassword) && !validator.isStrongPassword(newPassword),
                repeatNewPassword: !validator.isEmpty(newPassword) && newPassword !== repeatNewPassword
            })
        }
    }, [setErrors, submitted, email, newPassword, repeatNewPassword])

    const update = (e) => {
        e.preventDefault()
        setSubmitted(true)


        console.log(email, newPassword, repeatNewPassword)
    }

    const resetForm = () => {
        setEmail("")
        setNewPassword("")
        setRepeatNewPassword("")
        setSubmitted(false)
        setErrors({
            email: false,
            newPassword: false,
            repeatNewPassword: false
        })
    }

    return (
        <Row>
            <Col lg={8} className="panel mx-auto">
                <Row className="title">
                    <h3>
                        INFORMATIONS
                    </h3>
                </Row>
                <Row>
                    <Form className="form mt-4 mb-4" ref={form}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                className={ errors.email ? "error" : "" }
                                placeholder="Nouvelle adresse email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <Form.Text className="text-danger">
                                { errors.email ? "Adresse email incorrecte." : "" }
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                className={ errors.newPassword || errors.repeatNewPassword ? "error" : "" }
                                placeholder="Nouveau mot de passe"
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                            />
                            <Form.Text className="text-danger d-block">
                                { errors.newPassword ? "Le mot de passe n'est pas assez sécurisé." : "" }
                            </Form.Text>
                            <Form.Text className="text-danger d-block">
                                { errors.repeatNewPassword ? "Les mots de passe ne correspondent pas." : "" }
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
                            <Form.Control
                                type="password"
                                className={ errors.repeatNewPassword ? "error" : "" }
                                placeholder="Répétez nouveau mot de passe"
                                onChange={(e) => setRepeatNewPassword(e.target.value)}
                                value={repeatNewPassword}
                            />
                        </Form.Group>
                        <div>
                            <Button variant="secondary" onClick={() => resetForm()}> ANNULER </Button>
                            <Button variant="success" onClick={(e) => update(e)}> CHANGER </Button>
                        </div>
                    </Form>
                </Row>
            </Col>
        </Row>
    )
}

export default InformationsPanel