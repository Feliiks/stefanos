import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Link to="/">
            <Navbar.Brand style={{ fontSize: "48px" }}>
                LOGO
            </Navbar.Brand>
        </Link>
    )
}

export default Logo