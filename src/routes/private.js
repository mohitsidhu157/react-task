import { Routes, Route } from "react-router-dom";
import { routes } from "src/constants/routes";
import { AdminDashboard, UserDashboard } from "src/pages";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path={routes.ADMIN_DASHBOARD} element={<AdminDashboard />} />
      <Route path={routes.USER_DASHBOARD} element={<UserDashboard />} />
    </Routes>
  );
};

export default PrivateRoutes;
