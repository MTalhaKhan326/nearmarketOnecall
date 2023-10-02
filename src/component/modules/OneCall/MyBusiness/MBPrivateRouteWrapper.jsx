import { useContext } from "react";
import { MyBusinessContext } from "../contexts/MyBusinessContext.jsx";
import { Navigate, Outlet } from "react-router-dom";
import MBWelcomeScreen from "./MBWelcomeScreen.jsx";

function MBPrivateRouteWrapper() {
  const ctx = useContext(MyBusinessContext)
  if(ctx.env?.business_id || ctx.business?.id) {
    return <Outlet />
  }

  return <Navigate to={"/app/my-business/welcome"} />

  // return <MBWelcomeScreen />
}

export default MBPrivateRouteWrapper;