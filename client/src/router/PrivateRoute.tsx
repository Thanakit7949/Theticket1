import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute: React.FunctionComponent = () => {
    // const token: any = Cookies.get("token") ?? ""
    const owner_id: any =  ""

    if (!owner_id) {
        return <Navigate to="/login" state={{ from: {} }} />
    }

    return <Outlet />
}

export default PrivateRoute