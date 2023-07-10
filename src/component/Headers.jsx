import { padding, width } from "@mui/system";
import React from "react";
import { AppImages } from "../Asset/images/image";
import Main from "./Main";
import { Link } from "react-router-dom";
const Headers = () => {
  return (
    <div>
      <section className="w-[100%] p-2 bg-slate-100">
        {/* <div className="w-[150px] bg-white rounded-3xl sm:rounded-3xl"> */}
        <Link to={`/`}>
          <div className="flex flex-row">
            <div>
              <img src={AppImages.onecall} alt="" />
            </div>
            <div className="text-[22px] font-bold text-gray-500 mt-4">
               OneCall Refferal
            </div>
          </div>
        </Link>
        {/* </div> */}
      </section>
    </div>
  );
};

export default Headers;
