import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'

import Home from './components/home'
import Abonnements from './components/abonnements'

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/abonnements" exact element={<Abonnements />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
