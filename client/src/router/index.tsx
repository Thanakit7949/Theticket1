import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../views/Login";
import HomeAdmin from "../views/Admin/HomeAdmin";
import HomeUser from "../views/User/HomeUser";
import CouponConditions from "../views/User/CouponConditions";
import ConcertBus from "../views/User/detailconcert/ConcertBus";
import ConcertGot7 from "../views/User/detailconcert/ConcertGot7";
import ConcertHypen from "../views/User/detailconcert/ConcertHypen";
import ConcertPixxie from  "../views/User/detailconcert/ConcertPixxie";
import ConcertLykn from  "../views/User/detailconcert/ConcertLykn";
import ConcertDetail from "../views/User/ConcertDetail";
import SportDetail from "../views/User/SportDetail";


function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home-admin" element={<HomeAdmin />} />
      <Route path="/home-user" element={<HomeUser />} />
      <Route path="/concert-bus" element={<ConcertBus />} />
      <Route path="/concert-got7" element={<ConcertGot7 />} />
      <Route path="/concert-hypen" element={<ConcertHypen />} />
      <Route path="/concert-pixxie" element={<ConcertPixxie />} />
      <Route path="/concert-lykn" element={<ConcertLykn />} />
      <Route path="/coupon-conditions" element={<CouponConditions />} />
      <Route path="/concert-detail" element={<ConcertDetail />} />
      <Route path="/sport-detail" element={<SportDetail />} />
    </Routes>
  );
}

export default AppRouter;
