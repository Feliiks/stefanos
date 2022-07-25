import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { Button } from '@mui/material'
import { HashLink } from "react-router-hash-link"

const NavBar = ({ user }) => {
    return (
        <Nav
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', fontWeight: "700", color: "#fff" }}
            navbarScroll
        >
            <Nav.Link as={HashLink} to="/#about">
                <Button
                    variant="text"
                    style={{ color: "#fff" }}
                >A propos</Button>
            </Nav.Link>
            <Nav.Link as={HashLink} to="/#subscriptions">
                <Button
                    variant="text"
                    style={{ color: "#fff" }}
                >Abonnements</Button>
            </Nav.Link>
            <Nav.Link as={HashLink} to="/#results">
                <Button
                    variant="text"
                    style={{ color: "#fff" }}
                >Résultats</Button>
            </Nav.Link>
            <Nav.Link as={HashLink} to="/#contact">
                <Button
                    variant="text"
                    style={{ color: "#fff" }}
                >Contact</Button>
            </Nav.Link>
            {
                user && (user.user_subscriptions.some(el => el.subscription.mode === "subscription") > 0 || user.user.admin) ?
                    <Nav.Link as={Link} to="/pronostics/all">
                        <Button
                            variant="text"
                            style={{ color: "#fff" }}
                        >Pronostics</Button>
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
                        <Button
                            variant="text"
                            style={{ color: "#fff" }}
                        >
                            Grand Chelem
                        </Button>
                    </Nav.Link>
                : null
            }
        </Nav>
    )
}

export default NavBar