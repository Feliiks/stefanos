import React, { useEffect, useRef, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import validator from 'validator'
import { Button } from '@mui/material'
import UserService from '../../services/user.service'

const InformationsPanel = ({ user, setAlert }) => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repeatNewPassword, setRepeatNewPassword] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        email: false,
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
                newPassword: !validator.isStrongPassword(newPassword),
                repeatNewPassword: newPassword !== repeatNewPassword,
                existing: false,
                badPassword: false
            })
        }
    }, [setErrors, submitted, email, newPassword, repeatNewPassword])

    const updateEmail = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        try {
            if (user.user.googleId) throw new Error()

            if (!validator.isEmail(email)) throw new Error()

            let res = await UserService.updateEmail(user.user._id, email)

            resetForm()
            setAlert({
                severity: "success",
                message: res.data.message
            })
        } catch (err) {
            setAlert({
                severity: "error",
                message: "Une erreur est survenue."
            })
            setErrors({
                ...errors,
                existing: true
            })
        }
    }

    const updatePassword = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        try {
            if (user.user.googleId) throw new Error()

            if (!validator.isStrongPassword(newPassword) || newPassword !== repeatNewPassword) throw new Error()

            let res = await UserService.updatePassword(user.user._id, newPassword)

            resetForm()
            setAlert({
                severity: "success",
                message: res.data.message
            })
        } catch (err) {
            setAlert({
                severity: "error",
                message: "Une erreur est survenue."
            })
            setErrors({
                ...errors,
                badPassword: true
            })
        }
    }

    const resetForm = () => {
        setEmail("")
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
                                            <Button variant="outlined" onClick={resetForm}>Annuler</Button>
                                            <Button variant="contained" onClick={updateEmail}>Modifier</Button>

                                        </div>
                                    </Form>
                                    :
                                    <Form className="form mt-3 mb-4 mx-auto" ref={form}>

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
                                            <Button variant="outlined" onClick={resetForm}>Annuler</Button>
                                            <Button variant="contained" onClick={updatePassword}>Modifier</Button>
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