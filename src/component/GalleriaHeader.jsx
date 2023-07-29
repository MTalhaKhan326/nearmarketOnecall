import { padding, width } from "@mui/system";
import React from "react";
import { AppImages } from "../Asset/images/image";
import Main from "./Main";
import { Link } from "react-router-dom";
const GalleriaHeader = () => {
  function formatDate(date) {
    const options = { day: "numeric", month: "long", year: "numeric" };
   return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  const currentDate = formatDate(new Date());
  return (
    <div>
      <section className="w-[100%] h-[71px] bg-[#000000]">
        <div className="flex flex-row justify-between">
          <div className="w-[80px]">
            {/* <Link to={`/`}> */}
            <img src={AppImages.gallerialogo} alt="" />
            {/* </Link> */}
          </div>
          <div className="text-[#919191] text-[10px] mt-[14px] mr-[15px]">
            {currentDate}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleriaHeader;
