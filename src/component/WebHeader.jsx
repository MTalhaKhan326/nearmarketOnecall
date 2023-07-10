import { padding, width } from "@mui/system";
import React, { useState } from "react";
import { AppImages } from "../Asset/images/image";
import Main from "./Main";
import { useParams } from "react-router-dom";
const WebHeader = () => {
    const { searchdata } = useParams();
    const [dataa, setData] = useState();
    const [formFields, setFormFields] = useState({ search: null });

    const onSubmit = async (e) => {
      e.preventDefault();
      console.log("search", formFields.search);
    };

  return (
    <div className="w-[100%] p-[2vw] flex flex-row">
      <form onSubmit={onSubmit}>    
      <div className="w-[20%] sm:w-[200px] bg-white rounded-3xl sm:rounded-3xl">
        <img src={AppImages.logo} alt="" />
      </div>
      <div className="flex mt-2 md:mt-2 items-center w-[80%]">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 w-full border border-gray-300 rounded-l-lg focus:outline-none"
          onChange={(e) => {
            setFormFields(() => ({ search: e.target.value }));
          }}
        />
        <button className="px-4 py-2 bg-gray-200 text-white rounded-r-lg justify-center items-center">
          <img
            src={AppImages.search}
            alt=""
            srcset=""
            className="w-[27px] h-[27px]"
          />
        </button>
      </div>
      </form>
    </div>
  );
};

export default WebHeader;
