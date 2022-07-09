import React from 'react'
import {
    Container,
    Navbar,
} from 'react-bootstrap'

import Logo from './Logo'
import NavBar from './NavBar'
import UserBtn from './UserBtn'

const Header = ({ user }) => {
    return (
        <Navbar expand="lg" fixed="top" style={{ background: '#FAFAFA' }} className="p-0">
            <Container style={{ borderBottom: '1px solid #DFDFDF' }}>
                <Logo />
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <NavBar user={user} />
                    <UserBtn user={user} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header