import React from 'react'
import { Button, NavDropdown } from 'react-bootstrap'
import { Link } from "react-router-dom";

const UserBtn = ({ user }) => {
    if (!user) {
        return (
            <Link to="/login">
                <Button className="login-btn" style={{ height: "35px", width: "150px", padding: 0, fontSize: "16px" }}>
                    Connexion
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