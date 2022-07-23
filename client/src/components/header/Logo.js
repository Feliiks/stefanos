import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ImgLogo from "../../assets/logo.svg"

const Logo = () => {
    return (
        <Link to="/" className="text-decoration-none">
            <Navbar.Brand className="d-flex align-items-center">
                {/*<img src={ImgLogo} alt="logo"/>*/}
                <span className="ms-2 fs-6 fw-bold" style={{ color: "rgb(51, 153, 255)" }}>
                    STEFANOS
                </span>
            </Navbar.Brand>
        </Link>
    )
}

export default Logo