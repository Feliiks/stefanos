import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import UserManagement from './UserManagement'

const ManageSubPanel = () => {
    const [username, setUsername] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        userNotFound: false
    })

    useEffect(() => {
        if (submitted) {
            setErrors({
                userNotFound: true
            })
        }
    }, [setErrors, submitted, username])

    const getUser = (e) => {
        e.preventDefault()
        setSubmitted(true)


        console.log(username)
    }

    return (
        <Row>
            <Col lg={8} className="panel mx-auto mt-4">
                <Row className="title">
                    <h3>
                        GERER LES UTILISATEURS
                    </h3>
                </Row>
                <Row>
                    <Col lg={10} className="mx-auto mt-4 mb-2">
                        <Form className="form">
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Control
                                    type="text"
                                    className={ errors.userNotFound ? "error" : "" }
                                    placeholder="Nom d'utilisateur"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                />
                                <Form.Text className="text-danger">
                                    { errors.userNotFound ? "Utilisateur introuvable." : "" }
                                </Form.Text>
                            </Form.Group>

                            <Button variant="success" onClick={(e) => getUser(e)}> VALIDER </Button>
                        </Form>
                        <hr />
                    </Col>

                    <UserManagement />

                </Row>
            </Col>
        </Row>
    )
}

export default ManageSubPanel