import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from "react-router-dom"

const NavBar = ({ user }) => {
    return (
        <Nav
            className="mx-auto my-2 my-lg-0 text-dark text-uppercase"
            style={{ maxHeight: '100px', fontFamily: "Francois One" }}
            navbarScroll
        >
            <Nav.Link as={Link} to="/abonnements">
                ABONNEMENTS
            </Nav.Link>
            {
                user && (user.user_subscriptions.some(el => el.subscription.name === "V.I.P") > 0 || user.user.admin) ?
                    <Nav.Link as={Link} to="/pronostics/all">
                        PRONOSTICS
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
                        GRAND CHELEM
                    </Nav.Link>
                : null
            }
        </Nav>
    )
}

export default NavBar