import React from 'react'
import { Nav } from 'react-bootstrap'

const NavBar = () => {
    return (
        <Nav
            className="mx-auto my-2 my-lg-0 text-dark text-uppercase"
            style={{ maxHeight: '100px', fontFamily: "Francois One" }}
            navbarScroll
        >
            <Nav.Link href="/abonnements">ABONNEMENTS</Nav.Link>
            <Nav.Link href="/pronostics/all">PRONOSTICS</Nav.Link>
            <Nav.Link
                className="nav-link-grand-chelem"
                href="/pronostics/grand-chelem">
                GRAND CHELEM
            </Nav.Link>
        </Nav>
    )
}

export default NavBar