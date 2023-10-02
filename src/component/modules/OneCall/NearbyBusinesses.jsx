import React, { useEffect } from "react";
import { useState } from "react";
// import { AppImages } from "../Asset/images/image";
// import Footer from "./Footer";
// import Loading from "./basic/Loading";

import axios from "axios";
import Footer from "../../Footer.jsx";
import Loading from "../../basic/Loading.jsx";
import { AppImages } from "../../../Asset/images/image.js";
import SimpleModal from "../../basic/SimpleModal.jsx";
import AppToastContainer from "../../basic/AppToast.jsx";
import { toast } from "react-toastify";


const NearByBusinesses = () => {

  const [showLoader, setShowLoader] = useState(true);

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  async function getLocation() {
    let lsLoc = localStorage.getItem('user.location')
    if(lsLoc) {
      lsLoc = JSON.parse(lsLoc)
      const now = Date.now()
      // use saved location only for 1 hour
      if(now - lsLoc.time <= 3.6e+6) {
        return lsLoc.data 
      }
    }
    
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          localStorage.setItem('user.location', JSON.stringify({
            time: Date.now(),
            data: { lat, lng }
          }))
          resolve({ lat, lng })
        },
        error => reject(error)
      )
    })
  }

  useEffect(() => {
    getLocation().then(res => {
      setLocation({
        latitude: res.lat,
        longitude: res.lng 
      })
      fetchData(res.lat, res.lng)
    }).catch(e => {
      console.log(e)
      toast.error(
        "Please enable your location. If unallowed already, please enable it in your browser's site settings",
        { autoClose: 4000 }
      )
      setShowLoader(false)
    })
  }, []);

  const [dataa, setData] = useState("");
  const fetchData = async (lat , lng) => {
    setShowLoader(true);
    const latitude = lat; 
    const longitude = lng ;
    console.log("latitude",lat, "longitude", lng)
    axios
      .get(
        `https://7b7xlap5jvkahyo5himfrzqy640qnadr.lambda-url.eu-west-1.on.aws/markers/nearby/of-any-category?lat=${latitude}&lng=${longitude}&dlink=1`
      )
      .then((res) => {
        const result = res.data;
        console.log("Resulttttt", result);
        setData(result.data?.markers);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };
  console.log(
    "Apii",
    `https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/markers/nearby?lat=${location?.latitude}&lng=${location?.longitude}&radius=100&type=mobile`
  );  

  return (
    <>
      {showLoader && <Loading />}
      {location.latitude === null && location.longitude === null ? (
        <div className="text-center mt-5 text-[16px] font-semibold">
          <p>Please allow location access to proceed further.</p>
        </div>
      ) : (
        <div className="container mx-auto px-auto flex flex-col w-full justify-center mb-[40px] md:mx-[3%]">
          <div className="flex flex-wrap">
            {dataa === "" ? (
              <Loading />
            ) : (
              dataa?.map((item, index) => (
                <div key={index} className="w-full md:w-1/5 px-1 my-2">
                  <a href={item?.dynamic_link}>
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

                      <div className="p-2 md:p-2 mt-[18px]">
                        <div className="flex flex-row justify-between">
                          <div className="text-lg font-medium mb-1 w-[74%]">
                            {item.name.replace(/name-/gi, "").slice(0, 17)}
                          </div>
                          {item.distance ? (
                            <div className="text-sm mb-2 bg-blue text-white h-[20px] text-[14px] md:text-[13px] rounded-md px-2">
                              {/* 1 {item.distanceUnit} */}
                              {item.distance < 1
                                ? `${item.distance * 1000}` + " m"
                                : `${item.distance}` + " km"}
                            </div>
                          ) : null}
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
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <Footer />
      <AppToastContainer />
    </>
  );
};

export default NearByBusinesses;