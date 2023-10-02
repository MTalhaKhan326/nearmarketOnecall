import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppToastContainer() {
  return <ToastContainer 
    hideProgressBar={true}
    autoClose={2000}
    closeOnClick
    position="top-right"
  />
}

export default AppToastContainer;

