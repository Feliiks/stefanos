import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'

import Home from './components/home'
import Abonnements from './components/abonnements'
import PronosticsAll from './components/pronostics/All'
import PronosticsGrandChelem from './components/pronostics/GrandChelem'

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/abonnements" exact element={<Abonnements />} />
                <Route path="/pronostics/all" exact element={<PronosticsAll />} />
                <Route path="/pronostics/grand-chelem" exact element={<PronosticsGrandChelem />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
