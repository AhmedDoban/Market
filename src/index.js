import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app'

 import "../node_modules/bootstrap/dist/css/bootstrap.css";
 import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
// import "../node_modules/react-toastify/dist/ReactToastify.css";

reactDom.render(
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    ,document.querySelector("#root"));


