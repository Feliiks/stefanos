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

import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    let user = useSelector(state => state.user.value)

    const dispatch = useDispatch()

    const logoutUser = async () => {
        try {
            await api.post("/users/logout", {
                user_id: user.user._id
            })

            dispatch(logout())
        } catch (err) {

        }

    }

    return (
        <Navbar
            expand="lg"
            fixed="top"
            className="p-0"
            style={{ background: "rgba(10, 25, 41, 0.72)", boxShadow: "rgb(19 47 76) 0px -1px 1px inset", backdropFilter: "blur(20px)" }}>
            <Container style={{minHeight: "60px" }}>
                <Logo />
                <Navbar.Toggle aria-controls="navbarScroll" style={{ color: "#fff" }}>
                    <MenuIcon />
                </Navbar.Toggle>
                <Navbar.Collapse id="navbarScroll">
                    <NavBar user={user} />
                    <UserBtn user={user} logoutUser={logoutUser} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header