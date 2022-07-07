import React from 'react'
import { Container } from 'react-bootstrap'

import Welcome from './Welcome'

const Home = () => {
    return (
        <Container fluid className="home">
            <Welcome />
        </Container>
    )
}

export default Home