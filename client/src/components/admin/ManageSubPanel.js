import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

import UserManagement from './UserManagement'
import validator from 'validator'
import api from '../../utils/api'
import AbonnementDetail from '../compte/AbonnementDetail'

const ManageSubPanel = () => {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({
        email: false
    })

    const [targetUser, setTargetUser] = useState({})

    const [userSubscriptions, setUserSubscriptions] = useState([])
    const [selectedUserSubscription, setSelectedUserSubscription] = useState({})
    const [selectedSubscriptionId, setSelectedSubscriptionId] = useState("")
    const [subscriptionTypes, setSubscriptionTypes] = useState([])

    const [show, setShow] = useState(false);

    useEffect(() => {
        api.get("/subscriptions/types").then(res => {
            setSubscriptionTypes(res.data.subscriptionTypes)
        }).catch(err => {
            console.log(err.message)
        })
    }, [])

    const getUser = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTargetUser({})
        setUserSubscriptions([])

        try {
            if (validator.isEmpty(email)) throw new Error()

            let user = await api.get(`/users/${email}`)
            let userSubscriptions = await api.get(`/subscriptions/${user.data.user._id}`)

            setTargetUser(user.data.user)
            setUserSubscriptions(userSubscriptions.data.user_subscriptions)

            setErrors({
                email: false
            })
        } catch (err) {
            setErrors({
                email: true
            })
        }
    }

    const createNewSub = async () => {
        try {
            if (selectedUserSubscription === "default") throw new Error()

            await api.post("/subscriptions", {
                username: targetUser.username,
                subscription_id: selectedUserSubscription._id,
                stripe_subscription_id: selectedSubscriptionId
            })

            window.location.reload(false)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteSub = async (id) => {
        await api.delete(`/subscriptions/${id}`)

        setShow(false)
        window.location.reload(false)
    }

    const deleteUser = async () => {
        try {
            if (validator.isEmpty(email)) throw new Error()

            await api.delete(`/users/${targetUser._id}`)

            window.location.reload(false)
        } catch (err) {
            console.log(err)
        }
    }

    const makeUserAdmin = async () => {
        try {
            if (validator.isEmpty(email)) throw new Error()

            await api.put(`/users/admin/${targetUser._id}`)

            window.location.reload(false)
        } catch (err) {
            console.log(err)
        }
    }

    let subscriptionsList = userSubscriptions[0] ? userSubscriptions.map(el => (
        <AbonnementDetail
            key={el._id}
            id={el._id}
            name={el.subscription.name}
            created_at={el.created_at}
            facturationType={el.subscription.mode}
            deleteSub={deleteSub}
            show={show}
            setShow={setShow}
        />
    )) : <p className="text-center"> Utilisateur non abonné. </p>

    return (
    <>
        <Row>
            <Col lg={8} className="panel mx-auto mt-4">
                <Row className="title">
                    <h3>
                        GERER LES UTILISATEURS
                    </h3>
                </Row>
                <Row>
                    <Col lg={10} className="mx-auto mt-4 mb-2">
                        <Form className="form mx-auto">
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Control
                                    type="text"
                                    className={ errors.email ? "error" : "" }
                                    placeholder="Nom d'utilisateur"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <Form.Text className="text-danger">
                                    { errors.email ? "Utilisateur introuvable." : "" }
                                </Form.Text>
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button className="mx-auto" variant="success" onClick={(e) => getUser(e)}> VALIDER </Button>
                            </div>
                        </Form>
                        <hr />
                    </Col>
                    {
                        targetUser._id ?
                            <UserManagement
                                subscriptionsList={subscriptionsList}
                                deleteUser={deleteUser}
                                makeUserAdmin={makeUserAdmin}
                                targetUser={targetUser}
                                selectedUserSubscription={selectedUserSubscription}
                                setSelectedUserSubscription={setSelectedUserSubscription}
                                subscriptionTypes={subscriptionTypes}
                                userSubscriptions={userSubscriptions}
                                createNewSub={createNewSub}
                                selectedSubscriptionId={selectedSubscriptionId}
                                setSelectedSubscriptionId={setSelectedSubscriptionId}
                            />
                            : null
                    }
                </Row>
            </Col>
        </Row>
    </>
    )
}

export default ManageSubPanel