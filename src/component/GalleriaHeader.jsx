import { padding, width } from "@mui/system";
import React from "react";
import { AppImages } from "../Asset/images/image";
import Main from "./Main";
import { Link } from "react-router-dom";
const GalleriaHeader = () => {
  return (
    <div>
      <section className="w-[100%] h-[71px] bg-[#000000]">
        <div className="flex flex-row justify-between">
          <div className="w-[80px] sm:rounded-3xl">
            {/* <Link to={`/`}> */}
            <img src={AppImages.gallerialogo} alt="" />
            {/* </Link> */}
          </div>
          <div className="text-[#919191] text-[10px] mt-[14px] mr-[15px]">
            10 July, 2023
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleriaHeader;
