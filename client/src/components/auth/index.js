import React from 'react'

import { Container } from 'react-bootstrap'
import Login from './Login'
import Register from './Register'

const Auth = () => {
    return (
        <Container className="auth mt-3">
            <h2 className="mx-auto mb-5">
                CONNECTEZ-VOUS POUR ACCEDER A TOUTES LES FONCTIONNALITES DU SITE
            </h2>
            <Login />
            <Register />
        </Container>
    )
}

export default Auth