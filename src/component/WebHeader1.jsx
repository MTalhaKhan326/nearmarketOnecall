import { padding, width } from "@mui/system";
import React, { useState } from "react";
import { AppImages } from "../Asset/images/image";
import Main from "./Main";
import { Link, useParams } from "react-router-dom";
const WebHeader1 = () => {
  const { searchdata } = useParams();
  const [dataa, setData] = useState();
  const [formFields, setFormFields] = useState({ search: null });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("search", formFields.search);
  };

  return (
    <div className="w-[100%] p-[2vw] flex flex-row">
      <Link to={`/`}>
        <div className="w-[20%] sm:w-[200px] bg-white rounded-3xl sm:rounded-3xl">
          <img src={AppImages.logo} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default WebHeader1;
