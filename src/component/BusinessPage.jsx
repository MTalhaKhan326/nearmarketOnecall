import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppImages } from "../Asset/images/image";
import Footer from "./Footer";
import Header from "./Header";
import data from "./Data";
import Loading from "./basic/Loading";
import WebHeader from "./WebHeader";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const BusinessPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showLoader, setShowLoader] = useState(false);
  const searchdata = searchParams.get("q");
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");
  // const { searchdata , latitude , longitude } = useParams();
  console.log("Search", searchdata, "latitudee",latitude, "longitudee",longitude)
  const [dataa, setData] = useState('');
  const [formFields, setFormFields] = useState({ search: searchdata });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("search", formFields.search);
  };
   const fetchData = async () => {
     setShowLoader(true);
     axios
       .get(
         `https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/markers/nearby?lat=${latitude}8&lng=${longitude}&type=${formFields.search}&radius=2&page_no=1`
       )
       .then((res) => {
         const result = res.data;
         setData(result.data?.markers);
       })
       .finally(() => {
         setShowLoader(false);
       });
     if (formFields.search !== searchdata) {
       setSearchParams({ q: formFields.search, lat: latitude, lng: longitude });
     }
   };

   
 useEffect(() => {
   fetchData();
 }, []);
  console.log("dataaa",dataa)
    const handleButtonClick = (phone) => {
      console.log("phoneee",phone)
      window.location.href = `tel:${phone}`;
    };

  return (
    <>
      <div className="block md:hidden">
        <Header />
        <form onSubmit={onSubmit}>
          <div className="flex mt-2 md:mt-2 items-center w-[100%]">
            <input
              type="text"
              placeholder="Search..."
              value={formFields.search}
              className="px-4 py-2 w-full border border-gray-300 rounded-l-lg focus:outline-none"
              onChange={(e) => {
                setFormFields(() => ({ search: e.target.value }));
              }}
            />
            <button
              className="px-4 py-2 bg-gray-200 text-white rounded-r-lg justify-center items-center"
              onClick={() => fetchData()}
            >
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
      <div className="hidden md:block mx-[3%]">
        <form onSubmit={onSubmit} className="my-4">
          <div className="flex flex-row">
            <Link to={`/`}>
              <div className="w-[20%] sm:w-[200px] bg-white rounded-3xl sm:rounded-3xl">
                <img src={AppImages.logo} alt="" />
              </div>
            </Link>
            <div className="flex mt-2 md:mt-2 items-center w-[40%]">
              <input
                type="text"
                placeholder="Search..."
                value={formFields.search}
                className="px-4 py-2 w-full border border-gray-300 rounded-l-lg focus:outline-none"
                onChange={(e) => {
                  setFormFields(() => ({ search: e.target.value }));
                }}
              />
              <button
                className="px-4 py-2 bg-gray-200 text-white rounded-r-lg justify-center items-center"
                onClick={() => fetchData()}
              >
                <img
                  src={AppImages.search}
                  alt=""
                  srcset=""
                  className="w-[27px] h-[27px]"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* </div> */}
      {showLoader && <Loading />}
      <div className="container mx-auto px-auto flex flex-col w-full justify-center mb-[40px] md:mx-[3%]">
        <div className="flex flex-wrap">
          {dataa === "" ? (
            <Loading />
          ) : (
            dataa.map((item, index) => (
              <div key={index} className="w-full md:w-1/5 px-1 my-2">
                <div className="rounded-xl border border-gray-300">
                  <div className="h-48 md:h-52 bg-slate-200 rounded-t-xl flex justify-center items-center">
                    {item.photo_urls === "NA" ? (
                      <div className="text-[22px] font-bold text-gray-700">
                        {item.name
                          .replace(/name-/gi, "")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    ) : (
                      <img
                        src={item.photo_urls}
                        alt="image"
                        className="h-full w-full object-cover rounded-t-xl"
                      />
                    )}
                  </div>
                  {/* <a href={item.phone}> */}
                  <div
                    className="absolute rounded-full bg-green-500 w-9 h-9 mt-[-17px] ml-[85%] md:ml-[200px] cursor-pointer"
                    onClick={() => handleButtonClick(item.phone)}
                  >
                    <img
                      src={AppImages.phone}
                      alt=""
                      srcset=""
                      className="rounded-full w-[60%] ml-[6px] mt-[6px] text-white"
                      style={{ filter: "brightness(5) invert(1)" }}
                    />
                  </div>
                  {/* </a> */}
                  <div className="p-2 md:p-2 mt-[18px]">
                    <div className="flex flex-row justify-between">
                      <div className="text-lg font-medium mb-1 w-[74%]">
                        {item.name.replace(/name-/gi, "").slice(0, 17)}
                      </div>
                      {item.distance ? (<div className="text-sm mb-2 bg-blue text-white h-[20px] text-[14px] md:text-[13px] rounded-md px-2">
                        {/* 1 {item.distanceUnit} */}
                        {item.distance < 1
                          ? `${item.distance * 1000}` + " m"
                          : `${item.distance}` + " km"}
                      </div>):(null)}
                      
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <img
                        src={AppImages.mapIcon}
                        alt=""
                        className="mr-1 w-7 h-7"
                      />
                      <div>
                        <a
                          href={`https://www.google.com/maps/?q=${item.address}`}
                          target="_blank"
                          className="text-blue-400 ml-2"
                        >
                          <span>{item.address.slice(0, 12)}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BusinessPage;
