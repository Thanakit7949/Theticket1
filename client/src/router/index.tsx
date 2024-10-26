import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../views/Login";
import HomeAdmin from "../views/Admin/HomeAdmin";
import HomeUser from "../views/User/HomeUser";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home-admin" element={<HomeAdmin />} />
      <Route path="/home-user" element={<HomeUser />} />
    </Routes>
  );
}

export default AppRouter;
