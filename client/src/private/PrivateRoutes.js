import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import React from 'react'


const LoggedIn = ({ children }) => {
    let user = useSelector((state) => state.user.value)

    return user ? children : <Navigate to="/auth" />
}

const LoggedOut = ({ children }) => {
    let user = useSelector((state) => state.user.value)

    return !user ? children : <Navigate to="/mon-compte" />
}


const Subscriber = ({ children }) => {
    let user = useSelector((state) => state.user.value)

    return user && (user.user_subscriptions.some(el => el.subscription.mode === "subscription") > 0 || user.user.admin) ? children : <Navigate to="/" />
}

const SubscriberGC = ({ children }) => {
    let user = useSelector((state) => state.user.value)

    return user && (user.user_subscriptions.some(el => el.subscription.event && new Date(el.subscription.event.starts) <= new Date(Date.now())) > 0 || user.user.admin) ? children : <Navigate to="/" />
}

const IsAdmin = ({ children }) => {
    let user = useSelector((state) => state.user.value)

    return user && user.user.admin ? children : <Navigate to="/" />
}


export {
    LoggedIn,
    LoggedOut,
    Subscriber,
    SubscriberGC,
    IsAdmin
}