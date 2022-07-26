import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ImgLogo from "../../assets/Stefanos_logo_full_white_yellow-1.png"
import { HashLink } from 'react-router-hash-link'

const Logo = () => {
    return (
        <HashLink to="/#welcome" className="text-decoration-none">
            <Navbar.Brand className="d-flex align-items-center">
                <img src={ImgLogo} alt="logo" style={{ maxHeight: "25px" }} />
            </Navbar.Brand>
        </HashLink>
    )
}

export default Logo