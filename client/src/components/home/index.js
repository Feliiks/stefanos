import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import Welcome from './Welcome'
import About from './About'
import Subscriptions from './Subscriptions'
import Contact from './Contact'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material'
import SubscriptionService from '../../services/subscription.service'
import ResultService from '../../services/result.service'
import PaymentService from '../../services/payment.service'
import EmailService from '../../services/email.service'

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
        ResultService.getAll().then(res => {
            setResults(res.data.results)
        }).catch(err => {
            console.log(err.message)
        })
    }, [])

    useEffect(() => {
        SubscriptionService.getTypes().then(res => {
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
                const session = await PaymentService.createCheckoutSession(
                    subscription.stripePriceId,
                    subscription._id,
                    subscription.mode,
                    user.user.username
                )

                return window.location.href = session.data.url
            } else {
                navigate("/mon-compte")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const sendMessage = async (email, subject, message) => {
        try {
            let res = await EmailService.create(email, subject, message)

            setAlert({
                severity: "success",
                message: res.data.message
            })
        } catch (err) {
            setAlert({
                severity: "error",
                message: "Une erreur est survenue."
            })
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
            { /* <Results results={results}/> */ }
            <Contact setAlert={setAlert} sendMessage={sendMessage} />
        </Container>
    )
}

export default Home