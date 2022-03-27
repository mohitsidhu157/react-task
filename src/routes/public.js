import { Routes, Route } from "react-router-dom";
import { routes } from "src/constants/routes";
import { AdminLogin, AdminSignup, UserLogin, UserSignup } from "../pages";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={routes.USER_SIGNUP} element={<UserSignup />} />
      <Route path={routes.ADMIN_SIGNUP} element={<AdminSignup />} />
      <Route path={routes.ADMIN_LOGIN} element={<AdminLogin />} />
      <Route path={routes.USER_LOGIN} element={<UserLogin />} />
    </Routes>
  );
};

export default PublicRoutes;
