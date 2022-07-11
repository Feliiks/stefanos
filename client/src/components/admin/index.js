import React from 'react'
import { Container, Row } from 'react-bootstrap'

import GrandChelemPanel from './GrandChelemPanel'
import ManageSubPanel from './ManageSubPanel'

const Admin = () => {
    return (
        <Container className="account">
            <Row className="title mb-5 d-flex justify-content-center justify-content-lg-start">
                <h2 className="text-center text-lg-start"> ADMINISTRATION </h2>
            </Row>
            <GrandChelemPanel />
            <ManageSubPanel />
        </Container>
    )
}

export default Admin