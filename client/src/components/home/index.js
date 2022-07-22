import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import Welcome from './Welcome'
import About from './About'
import Subscriptions from './Subscriptions'
import Results from './Results'
import Contact from './Contact'
import api from '../../utils/api'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const user = useSelector((state) => state.user.value)
    const [subscriptionTypes, setSubscriptionTypes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/subscriptions/types").then(res => {
            setSubscriptionTypes(res.data.subscriptionTypes)
        }).catch(err => {
            console.log(err.message)
        })
    }, [])

    const createCheckoutSession = async (subscription) => {
        try {
            if (!user) {
                navigate("/auth")
            } else if (user && !user.user_subscriptions.some(el => el.subscription._id === subscription.id) > 0) {
                let session = await api.post("/payments/checkout-session", {
                    price_id: subscription.price,
                    subscription_id: subscription._id,
                    mode: subscription.mode,
                    username: user.user.username
                })

                return window.location.href = session.data.url
            } else {
                navigate("/mon-compte")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <Container fluid className="home">
            <Welcome />
            <About />
            <Subscriptions
                subscriptionTypes={subscriptionTypes}
                createCheckoutSession={createCheckoutSession}
            />
            <Results />
            <Contact />
        </Container>
    )
}

export default Home