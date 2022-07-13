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
            <Nav.Link>
                <Link to="/abonnements" style={{ textDecoration: "none" }}>
                    ABONNEMENTS
                </Link>
            </Nav.Link>
            {
                user && (user.user_subscriptions.some(el => el.subscription.name === "V.I.P") > 0 || user.user.admin) ?
                    <Nav.Link>
                        <Link to="/pronostics/all" style={{ textDecoration: "none" }}>
                            PRONOSTICS
                        </Link>
                    </Nav.Link>
                : null
            }
            {
                user && (user.user_subscriptions.some(el => el.subscription.name === "Grand Chelem") > 0 || user.user.admin) ?
                    <Nav.Link
                        className="nav-link-grand-chelem"
                    >
                        <Link to="/pronostics/grand-chelem" style={{ textDecoration: "none" }}>
                            GRAND CHELEM
                        </Link>
                    </Nav.Link>
                : null
            }
        </Nav>
    )
}

export default NavBar