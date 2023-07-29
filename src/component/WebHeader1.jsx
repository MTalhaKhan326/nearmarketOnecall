import { padding, width } from "@mui/system";
import React, { useState } from "react";
import { AppImages } from "../Asset/images/image";
import Main from "./Main";
import { Link, useParams } from "react-router-dom";
const WebHeader1 = () => {
   function formatDate(date) {
     const options = { day: "numeric", month: "long", year: "numeric" };
     return new Intl.DateTimeFormat("en-US", options).format(date);
   }
   const currentDate = formatDate(new Date());
  const { searchdata } = useParams();
  const [dataa, setData] = useState();
  const [formFields, setFormFields] = useState({ search: null });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("search", formFields.search);
  };

  return (
    <div className="w-full p-[2vw] flex flex-row">
      <div className="w-full flex flex-row justify-between">
        <Link to={`/`}>
          <div className="w-[150px] sm:w-[40%] bg-white rounded-3xl sm:rounded-3xl">
            <img src={AppImages.logo} alt="" />
          </div>
        </Link>
        <div className="text-[#919191] text-[10px] mt-[14px] mr-[15px]">
          {currentDate}
        </div>
      </div>
    </div>
  );
};

export default WebHeader1;
