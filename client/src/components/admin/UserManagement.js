import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const UserManagement = ({ targetUser,
    subscriptionsList,
    deleteUser,
    makeUserAdmin,
    selectedUserSubscription,
    setSelectedUserSubscription,
    subscriptionTypes,
    userSubscriptions,
    createNewSub,
    selectedSubscriptionId,
    setSelectedSubscriptionId
}) => {
    const [subs, setSubs] = useState([])
    const [aa, setAa] = useState("")

    useEffect(() => {
        let selectedSub = subscriptionTypes.filter(el => el._id === aa)[0]

        setSelectedUserSubscription(selectedSub)
    }, [aa])

    useEffect(() => {
        let res = subscriptionTypes.filter(object1 => {
            return !userSubscriptions.some(object2 => {
                return object1._id === object2.subscription._id;
            })
        })

        setSubs(res)
    }, [subscriptionTypes, userSubscriptions])

    return (
        <>
            <Col lg={10} className="mx-auto mb-2">
                {subscriptionsList}
            </Col>
            {
                subs[0] ?
                    <Col lg={10} className="mx-auto mb-2">
                        <Form className="form mx-auto">
                            <Form.Group className="mb-3" controlId="formBasicFrom">
                                <Form.Select
                                    aria-label="0"
                                    value={aa}
                                    onChange={e => setAa(e.target.value)}
                                >
                                    <option value="default"> Sélectionnez un abonnement </option>
                                    {
                                        subs.map(el => (
                                            <option key={el._id} value={el._id}> {el.name} </option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            {
                                selectedUserSubscription && selectedUserSubscription.mode === "subscription" ?
                                    <Form.Group className="mb-3" controlId="formBasicUsername">
                                        <Form.Label>Id de l'abonnement Stripe</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="sub_"
                                            value={selectedSubscriptionId}
                                            onChange={(e) => setSelectedSubscriptionId(e.target.value)}
                                        />
                                    </Form.Group>
                                    : null
                            }
                            <div className="d-flex justify-content-center">
                                <Button className="mx-auto" variant="success" onClick={createNewSub}> AJOUTER </Button>
                            </div>
                        </Form>
                        <hr />
                    </Col>
                    : null
            }

            <Col lg={10} className="mx-auto mb-4 d-flex justify-content-center">
                <Button variant="danger" onClick={deleteUser}> SUPPRIMER </Button>
                <Button variant="secondary" onClick={makeUserAdmin}> {targetUser.admin ? "RETIRER ADMIN" : "METTRE ADMIN"} </Button>
            </Col>
        </>
    )
}

export default UserManagement