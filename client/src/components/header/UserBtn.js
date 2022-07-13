import React from 'react'
import { Button, NavDropdown } from 'react-bootstrap'
import { Link } from "react-router-dom";

import { RiUser3Line } from 'react-icons/ri'

const UserBtn = ({ user, logoutUser }) => {
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
                title={user.user.username} id="navbarScrollingDropdown"
            >
                <NavDropdown.Item style={{ fontFamily: "Open Sans" }}>
                    <Link to="/mon-compte" style={{ textDecoration: "none" }}>
                        Mon compte
                    </Link>
                </NavDropdown.Item>
                { user && user.user.admin ?
                    <NavDropdown.Item style={{ fontFamily: "Open Sans" }}>
                        <Link to="/admin" style={{ textDecoration: "none" }}>
                            Administration
                        </Link>
                    </NavDropdown.Item>
                    :
                    null
                }
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutUser} style={{ fontFamily: "Open Sans" }}>
                    Déconnexion
                </NavDropdown.Item>
            </NavDropdown>
        )

    }
}

export default UserBtn