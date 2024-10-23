import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "../views/Login"

const Router: React.FC = () => {
   

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />}>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router