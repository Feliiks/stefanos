import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ImgLogo from "../../assets/logo.svg"
import { HashLink } from 'react-router-hash-link'

const Logo = () => {
    return (
        <HashLink to="/#welcome" className="text-decoration-none">
            <Navbar.Brand className="d-flex align-items-center">
                {/*<img src={ImgLogo} alt="logo"/>*/}
                <span className="ms-2 fs-6 fw-bold" style={{ color: "rgb(51, 153, 255)" }}>
                    STEFANOS
                </span>
            </Navbar.Brand>
        </HashLink>
    )
}

export default Logo