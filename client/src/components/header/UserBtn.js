import React from 'react'
import { Button, NavDropdown } from 'react-bootstrap'
import { Link } from "react-router-dom";

import { RiUser3Line } from 'react-icons/ri'

const UserBtn = ({ user }) => {
    if (!user) {
        return (
            <Link to="/auth">
                <Button className="login-navbar-btn">
                    <RiUser3Line className="me-2" /> ME CONNECTER
                </Button>
            </Link>
        )
    } else {
        return (
            <NavDropdown
                style={{ fontFamily: "Francois One", color: "#000000" }}
                title="Feliiks" id="navbarScrollingDropdown"
            >
                <NavDropdown.Item style={{ fontFamily: "Open Sans" }} href="/account">Mon compte</NavDropdown.Item>
                <NavDropdown.Item style={{ fontFamily: "Open Sans" }} href="/admin">Administration</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item style={{ fontFamily: "Open Sans" }}>
                    Déconnexion
                </NavDropdown.Item>
            </NavDropdown>
        )

    }
}

export default UserBtn