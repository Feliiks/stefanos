import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import * as PrivateRoutes from "./private/PrivateRoutes"

import Header from './components/header'
import Footer from './components/footer'

import Home from './components/home'
import Abonnements from './components/abonnements'
import PronosticsAll from './components/pronostics/All'
import PronosticsGrandChelem from './components/pronostics/GrandChelem'

import Auth from './components/auth'

import Compte from "./components/compte"
import Admin from './components/admin'

import NotFound from './components/others/NotFound'


const App = () => {
    const [user, setUser] = useState(null)

    return (
        <BrowserRouter>

            <Header user={user} />

            <Routes>
                <Route path="/" exact element={<Home />} />

                <Route path="/abonnements" exact element={<Abonnements />} />

                <Route
                    path="/pronostics/all"
                    element={
                        <PrivateRoutes.Subscriber user={user}>
                            <PronosticsAll />
                        </PrivateRoutes.Subscriber>
                    }
                />
                <Route
                    path="/pronostics/grand-chelem"
                    element={
                        <PrivateRoutes.SubscriberGC user={user}>
                            <PronosticsGrandChelem />
                        </PrivateRoutes.SubscriberGC>
                    }
                />

                <Route path="/auth"
                       element={
                           <PrivateRoutes.LoggedOut user={user}>
                               <Auth />
                           </PrivateRoutes.LoggedOut>
                       }
                />

                <Route path="/compte"
                       element={
                           <PrivateRoutes.LoggedIn user={user}>
                               <Compte />
                           </PrivateRoutes.LoggedIn>
                       }
                />

                <Route path="/admin"
                       element={
                           <PrivateRoutes.IsAdmin user={user}>
                               <Admin />
                           </PrivateRoutes.IsAdmin>
                       }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App;
