import React from 'react'
import { Button } from 'react-bootstrap'

const Welcome = () => {
    return (
        <div className="row welcome_section d-flex align-items-center justify-content-center position-relative">
            <div className="filter" />
            <div className=" col-lg-8 title position-relative d-flex flex-column">
                <h1>
                    STEFANOS
                </h1>
                <h2>
                    LE MEILLEUR SITE DE PRONOSTICS POUR LE PARIS SPORTIF
                </h2>
                <Button className="mx-auto login-btn">
                    CONNEXION
                </Button>
            </div>
        </div>
    )
}

export default Welcome