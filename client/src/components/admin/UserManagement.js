import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
                                <Button className="mx-auto" variant="contained" color="success" onClick={createNewSub}> Ajouter </Button>
                            </div>
                        </Form>
                        <hr />
                    </Col>
                    : null
            }

            <Col lg={10} className="mx-auto mb-4 d-flex justify-content-center">
                <Button variant="outlined" color="error" onClick={deleteUser} startIcon={<DeleteIcon />}>
                    Supprimer
                </Button>
                <Button variant="outlined" onClick={makeUserAdmin}> {targetUser.admin ? "Retirer admin" : "Mettre admin"} </Button>
            </Col>
        </>
    )
}

export default UserManagement