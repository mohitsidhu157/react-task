import { Routes, Route } from "react-router-dom";
import { AdminLogin, AdminSignup, UserSignup } from "../pages";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
};

export default PublicRoutes;
