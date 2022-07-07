import React from 'react'
import { MDBFooter } from "mdbreact";
import { Container } from 'react-bootstrap'
import { AiFillTwitterCircle } from 'react-icons/ai'




const Footer = () => {
    return (
        <MDBFooter className='text-center text-lg-start text-muted' style={{ background: "#00503C"}}>
            <Container>
                <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom text-light'>
                    <div className='me-5 d-none d-lg-block'>
                        <span>Restez connecté avec nous via nos réseaux sociaux :</span>
                    </div>
                    <div>
                        <a href='/' className='me-4 text-reset'>
                            <AiFillTwitterCircle size={30} />
                        </a>
                        <a href='/' className='me-4 text-reset'>
                            <AiFillTwitterCircle size={30} />
                        </a>
                        <a href='/' className='me-4 text-reset'>
                            <AiFillTwitterCircle size={30} />
                        </a>
                        <a href='/' className='me-4 text-reset'>
                            <AiFillTwitterCircle size={30} />
                        </a>
                    </div>
                </section>

                <section className="text-light">
                    <div className='container text-center text-md-start mt-5'>
                        <div className='row mt-3'>
                            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    STEFANOS
                                </h6>
                                <p>
                                    Logo
                                </p>
                            </div>

                            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Liens utiles</h6>
                                <p>
                                    <a href='/' className='text-reset'>
                                        Mentions légales
                                    </a>
                                </p>
                                <p>
                                    <a href='/' className='text-reset'>
                                        Mentions légales
                                    </a>
                                </p>
                                <p>
                                    <a href='/' className='text-reset'>
                                        Mentions légales
                                    </a>
                                </p>
                            </div>

                            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                                <p>
                                     Renseigner ici adresse
                                </p>
                                <p>
                                    Renseigner ici email
                                </p>
                                <p>
                                    Renseigner ici téléphone
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
                <div className='text-center p-2 text-light' style={{ background: '#003326' }}>
                    © 2022 Copyright Stefanos - Développé par Ludovic Sbr
                </div>
        </MDBFooter>
    )
}

export default Footer