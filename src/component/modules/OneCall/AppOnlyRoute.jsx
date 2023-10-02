import { Outlet } from "react-router-dom";
import { isMobileOS } from "../../../utils/helpers.js";

function AppOnlyRoute() {
  const isMobile = isMobileOS()
  
  if(!isMobile) {
    return (
      <div>
        <h1>Not accessable</h1>
      </div>
    )
  }
  
  return <Outlet />
}

export default AppOnlyRoute;