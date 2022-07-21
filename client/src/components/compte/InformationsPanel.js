import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import validator from 'validator'
import api from '../../utils/api'

const InformationsPanel = ({ user, setAlert }) => {
    const [email, setEmail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repeatNewPassword, setRepeatNewPassword] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        email: false,
        currentPassword: false,
        newPassword: false,
        repeatNewPassword: false,
        existing: false,
        badPassword: false
    })
    const [selectedOption, setSelectedOption] = useState("1")
    const form = useRef()

    useEffect(() => {
        if (submitted) {
            setErrors({
                email: !validator.isEmail(email),
                currentPassword: !validator.isStrongPassword(currentPassword),
                newPassword: !validator.isStrongPassword(newPassword),
                repeatNewPassword: newPassword !== repeatNewPassword,
                existing: false,
                badPassword: false
            })
        }
    }, [setErrors, submitted, email, currentPassword, newPassword, repeatNewPassword])

    const update = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        try {
            if (user.user.googleId) throw new Error(

            )
            if (selectedOption === "1") {
                if (!validator.isEmail(email)) throw new Error()

                let res = await api.put(`/users/username/${user.user._id}`, {
                    new_username: email
                })

                resetForm()
                setAlert({
                    severity: "success",
                    message: res.data.message
                })
            } else {
                if (!validator.isStrongPassword(currentPassword) || !validator.isStrongPassword(newPassword) || newPassword !== repeatNewPassword) throw new Error()

                let res = await api.put(`/users/password/${user.user._id}`, {
                    current_password: currentPassword,
                    new_password: newPassword
                })

                resetForm()
                setAlert({
                    severity: "success",
                    message: res.data.message
                })
            }
        } catch (err) {
            setAlert({
                severity: "error",
                message: "Une erreur est survenue."
            })

            if (selectedOption === "1") {
                setErrors({
                    ...errors,
                    existing: true
                })
            } else {
                setErrors({
                    ...errors,
                    badPassword: true
                })
            }
        }
    }

    const resetForm = () => {
        setEmail("")
        setCurrentPassword("")
        setNewPassword("")
        setRepeatNewPassword("")
        setSubmitted(false)
        setErrors({
            email: false,
            currentPassword: false,
            newPassword: false,
            repeatNewPassword: false,
            existing: false,
            badPassword: false,
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

                {
                    !user.user.googleId ?
                        <Row>
                            <Form.Select className="form mt-4 mx-auto" value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
                                <option value="1"> Que voulez-vous modifier ? </option>
                                <option value="1"> Adresse mail </option>
                                <option value="2"> Mot de passe </option>
                            </Form.Select>
                            {
                                selectedOption === "1" ?
                                    <Form className="form mt-2 mb-4 mx-auto" ref={form}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control
                                                type="email"
                                                className={ errors.email || errors.existing ? "error" : "" }
                                                placeholder="Nouvelle adresse email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                            />
                                            <Form.Text className="text-danger d-block">
                                                { errors.email ? "Adresse email incorrecte." : "" }
                                            </Form.Text>
                                            <Form.Text className="text-danger d-block">
                                                { errors.existing ? "Adresse email indisponible." : "" }
                                            </Form.Text>
                                        </Form.Group>
                                        <div className="d-flex justify-content-center">
                                            <Button variant="secondary" onClick={resetForm}> ANNULER </Button>
                                            <Button variant="success" onClick={update}> CHANGER </Button>
                                        </div>
                                    </Form>
                                    :
                                    <Form className="form mt-3 mb-4 mx-auto" ref={form}>
                                        <Form.Group className="mb-3" controlId="formBasicCurrentPassword">
                                            <Form.Control
                                                type="password"
                                                className={ errors.badPassword || errors.currentPassword ? "error" : "" }
                                                placeholder="Mot de passe actuel"
                                                autoComplete="new-password"
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                value={currentPassword}
                                            />
                                            <Form.Text className="text-danger d-block">
                                                { errors.badPassword || errors.currentPassword ? "Mot de passe incorrect." : "" }
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Control
                                                type="password"
                                                className={ errors.newPassword || errors.repeatNewPassword ? "error" : "" }
                                                placeholder="Nouveau mot de passe"
                                                autoComplete="new-password"
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
                                                autoComplete="new-password"
                                                onChange={(e) => setRepeatNewPassword(e.target.value)}
                                                value={repeatNewPassword}
                                            />
                                        </Form.Group>
                                        <div className="d-flex justify-content-center">
                                            <Button variant="secondary" onClick={resetForm}> ANNULER </Button>
                                            <Button variant="success" onClick={update}> CHANGER </Button>
                                        </div>
                                    </Form>
                            }
                        </Row>
                    :
                        <Row>
                            <Form.Select className="form mt-4 mx-auto" value="1" disabled>
                                <option value="1"> Connecté avec Google </option>
                            </Form.Select>
                                <Form className="form mt-3 mb-4 mx-auto" ref={form}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Adresse email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={user.user.username}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Mot de passe</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value="__________"
                                            disabled
                                        />
                                    </Form.Group>
                                </Form>
                        </Row>
                }
            </Col>
        </Row>
    )
}

export default InformationsPanel