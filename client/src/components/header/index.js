import React from 'react'
import {
    Container,
    Navbar,
} from 'react-bootstrap'

import Logo from './Logo'
import NavBar from './NavBar'
import UserBtn from './UserBtn'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../utils/api'
import { logout } from '../../reducers/user.reducer'

const Header = () => {
    let user = useSelector(state => state.user.value)

    const dispatch = useDispatch()

    const logoutUser = async () => {
        try {
            await api.post("http://localhost:5000/users/logout", {
                user_id: user.user._id
            })

            dispatch(logout())
        } catch (err) {

        }

    }

    return (
        <Navbar expand="lg" fixed="top" style={{ background: '#FAFAFA' }} className="p-0">
            <Container style={{ borderBottom: '1px solid #DFDFDF' }}>
                <Logo />
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <NavBar user={user} />
                    <UserBtn user={user} logoutUser={logoutUser} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header