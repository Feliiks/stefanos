import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import * as PrivateRoutes from "./private/PrivateRoutes"

import Header from './components/header'
import Footer from './components/footer'

import Home from './components/home'
import PronosticsAll from './components/pronostics/All'
import PronosticsGrandChelem from './components/pronostics/GrandChelem'

import Auth from './components/auth'
import Request from './components/auth/password-recovery/Request'
import Update from './components/auth/password-recovery/Update'

import Compte from "./components/compte"
import Admin from './components/admin'

import Payment from './components/payment'
import NotFound from './components/others/NotFound'

import { useDispatch } from 'react-redux'
import AuthService from './services/auth.service'


const App = () => {
    const [sessionToken] = useState(localStorage.getItem("sessionToken"))

    const dispatch = useDispatch()

    useEffect(() => {
        AuthService.getSession(dispatch, sessionToken)
            .then(() => console.log("Connecté !"))
            .catch((err) => console.log("Erreur lors de la connexion."))
    }, [dispatch, sessionToken])

    return (
        <BrowserRouter>

            <Header />

            <Routes>
                <Route path="/" exact element={<Home />} />

                <Route
                    path="/pronostics/all"
                    element={
                        <PrivateRoutes.Subscriber>
                            <PronosticsAll />
                        </PrivateRoutes.Subscriber>
                    }
                />
                <Route
                    path="/pronostics/grand-chelem"
                    element={
                        <PrivateRoutes.SubscriberGC>
                            <PronosticsGrandChelem />
                        </PrivateRoutes.SubscriberGC>
                    }
                />

                <Route path="/auth"
                       element={
                           <PrivateRoutes.LoggedOut>
                               <Auth />
                           </PrivateRoutes.LoggedOut>
                       }
                />

                <Route
                    path="/auth/password-recovery"
                    element={<Request />}

                />

                <Route
                    path="/auth/password-recovery/update/:token"
                    element={<Update />}

                />

                <Route path="/mon-compte"
                       element={
                           <PrivateRoutes.LoggedIn>
                               <Compte />
                           </PrivateRoutes.LoggedIn>
                       }
                />

                <Route path="/admin"
                       element={
                           <PrivateRoutes.IsAdmin>
                               <Admin />
                           </PrivateRoutes.IsAdmin>
                       }
                />

                <Route path="/payment/:status/:session_id" exact element={<Payment />} />

                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App;
