import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


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

    return user && user.subscriber ? children : <Navigate to="/" />
}

const SubscriberGC = ({ children }) => {
    let user = useSelector((state) => state.user.value)

    return user && user.subscriber ? children : <Navigate to="/" />
}

const IsAdmin = ({ children }) => {
    let user = useSelector((state) => state)

    return user && user.user.admin ? children : <Navigate to="/" />
}


export {
    LoggedIn,
    LoggedOut,
    Subscriber,
    SubscriberGC,
    IsAdmin
}