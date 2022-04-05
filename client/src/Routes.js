import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

const MyRoutes = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/"  element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;