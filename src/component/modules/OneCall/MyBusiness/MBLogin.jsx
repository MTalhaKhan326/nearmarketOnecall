import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyBusinessContext } from "../contexts/MyBusinessContext.jsx";
import FlutterInterface from "../../../../utils/flutter_interface.js";

function MBLogin() {
  const ctx = useContext(MyBusinessContext)
  return (  
    <div>
      <h1>Login</h1>
      <button
        onClick={() => {
          FlutterInterface.goToLoginScreen().then(res => console.log(res))
        }}
      >TEST</button>
    </div>
  );
}

export default MBLogin;