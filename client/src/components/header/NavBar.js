import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from "react-router-dom"

const NavBar = ({ user }) => {
    return (
        <Nav
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', fontWeight: "700", color: "#fff" }}
            navbarScroll
        >
            <Nav.Link as={Link} to="/">
                A propos
            </Nav.Link>
            <Nav.Link as={Link} to="/">
                Abonnements
            </Nav.Link>
            <Nav.Link as={Link} to="/">
                Résultats
            </Nav.Link>
            <Nav.Link as={Link} to="/">
                Contact
            </Nav.Link>
            {
                user && (user.user_subscriptions.some(el => el.subscription.mode === "subscription") > 0 || user.user.admin) ?
                    <Nav.Link as={Link} to="/pronostics/all">
                        Pronostics
                    </Nav.Link>
                : null
            }
            {
                user && (user.user_subscriptions.some(el => el.subscription.event && new Date(el.subscription.event.starts) <= new Date(Date.now())) > 0 || user.user.admin) ?
                    <Nav.Link
                        as={Link}
                        to="/pronostics/grand-chelem"
                        className="nav-link-grand-chelem"
                    >
                        Grand Chelem
                    </Nav.Link>
                : null
            }
        </Nav>
    )
}

export default NavBar