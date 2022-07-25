import React from 'react'
import { MDBFooter } from "mdbreact";
import { Container } from 'react-bootstrap'
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Telegram } from '@mui/icons-material'




const Footer = () => {
    return (
        <MDBFooter className='text-center text-lg-start text-muted' style={{borderTop: "1px solid rgba(255, 255, 255, 0.1)"}}>
            <Container>
                <section className="text-light">
                    <div className='container text-center text-md-start mt-5'>
                        <div className='row mt-3'>
                            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 border-end'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    STEFANOS
                                </h6>
                                <p>
                                    Logo
                                </p>
                            </div>

                            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 border-end'>
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
                                <h6 className='text-uppercase fw-bold mb-4'>Nos réseaux</h6>
                                <p>
                                     <TwitterIcon />
                                </p>
                                <p>
                                    <TelegramIcon />
                                </p>
                                <p>
                                    <TelegramIcon />
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
                <div className='text-center p-2 text-light' style={{background: "#0A1929", color: "#fff", borderTop: "1px solid rgba(255, 255, 255, 0.1)"}}>
                    © 2022 Copyright Stefanos - Développé par Ludovic Sbr
                </div>
        </MDBFooter>
    )
}

export default Footer