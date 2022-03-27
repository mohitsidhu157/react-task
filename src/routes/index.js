import PrivateRoutes from "./private";
import PublicRoutes from "./public";
import { GlobalContext } from "src/context";
import { useContext } from "react";

const Routes = () => {
  const { globalState } = useContext(GlobalContext);
  return globalState.isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
