import React from 'react'
import { NavDropdown } from 'react-bootstrap'

const UserBtn = () => {
    return (
        /*<Button variant="success" href="/login">
            Connexion
        </Button>*/
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

export default UserBtn