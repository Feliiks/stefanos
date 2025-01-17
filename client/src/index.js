import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import store from './lib/store'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();
