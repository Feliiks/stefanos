import React from 'react'
import { MDBFooter } from "mdbreact";
import { Container } from 'react-bootstrap'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import ImgLogo from '../../assets/Stefanos_logo_full_white_yellow-1.png'
import { BsSnapchat } from 'react-icons/bs'




const Footer = () => {
    return (
        <MDBFooter className='text-center text-lg-start text-muted' style={{borderTop: "1px solid rgba(255, 255, 255, 0.1)"}}>
            <Container>
                <section className="text-light">
                    <div className='container text-center text-md-start mt-5'>
                        <div className='row mt-3'>
                            <div className='col-md-4 col-lg-4 col-xl-4 mx-auto mb-4 border-end d-flex align-items-center justify-content-center justify-content-lg-start'>
                                <img src={ImgLogo} alt="logo" style={{ maxHeight: "25px" }} />
                            </div>

                            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-4 border-end'>
                                <h6 className='text-uppercase fw-bold mb-2'>Liens utiles</h6>
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

                            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 d-flex flex-column align-items-center align-items-lg-end'>
                                <h6 className='text-uppercase fw-bold mb-2'>Nos réseaux</h6>
                                <div className="d-flex">
                                    <a href="https://twitter.com/StefanosBetting" target="_blank" rel="noreferrer">
                                        <TwitterIcon />
                                    </a>
                                    <a href="https://www.instagram.com/stefanosaces/" target="_blank" rel="noreferrer" className="ms-2 me-2">
                                        <InstagramIcon />
                                    </a>
                                    <BsSnapchat size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
            <div className='text-center p-2 text-danger' style={{color: "#24b387", fontSize: "14px" }}>
                Jouer comporte des risques : Endettement, isolement, dépendance. Pour être aidé, appelez le 09-74-75-13-13 (Appel non surtaxé)
            </div>
            <div className='text-center p-2 text-light' style={{color: "#fff", borderTop: "1px solid rgba(255, 255, 255, 0.1)"}}>
                © 2022 Copyright Stefanos - Développé par <a href="https://www.fiverr.com/ludovic_sbr" target="_blank" rel="noreferrer">Ludovic Sbr</a>
            </div>
        </MDBFooter>
    )
}

export default Footer