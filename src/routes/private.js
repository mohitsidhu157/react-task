import { Routes, Route } from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={() => <p>Dashboard</p>} />
    </Routes>
  );
};

export default PrivateRoutes;
