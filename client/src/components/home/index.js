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
import { Alert } from '@mui/material'

const Home = () => {
    const user = useSelector((state) => state.user.value)
    const [subscriptionTypes, setSubscriptionTypes] = useState([])
    const [results, setResults] = useState([])
    const navigate = useNavigate();
    const [alert, setAlert] = useState({
        severity: '',
        message: ''
    })

    useEffect(() => {
        if (alert.message) {
            setTimeout(() => {
                setAlert({
                    severity: "",
                    message: ""
                })
            }, 5000)
        }
    })

    useEffect(() => {
        api.get("/results/all").then(res => {
            setResults(res.data.results)
        }).catch(err => {
            console.log(err.message)
        })
    }, [])

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
            } else if (user && !user.user_subscriptions.some(el => el.subscription._id === subscription._id) > 0) {
                let session = await api.post("/payments/checkout-session", {
                    price_id: subscription.stripePriceId,
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
            {
                alert.message !== "" ? <Alert severity={alert.severity} onClose={() => setAlert({severity: '', message: ''})} className="alert"> {alert.message} </Alert> : null
            }
            <Welcome />
            <About />
            <Subscriptions
                subscriptionTypes={subscriptionTypes}
                createCheckoutSession={createCheckoutSession}
            />
            <Results results={results} />
            <Contact setAlert={setAlert} />
        </Container>
    )
}

export default Home