import React from "react";
// import { useSelector } from "react-redux";
import Header from "./GalleriaHeader";
import Footer from "./GalleriaFooter";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { AppImages } from "../Asset/images/image";

const GalleriaPropertyTable = () => {
    const [formData, setFormData]= useState([])
//   const formData = useSelector((state) => state.form.formData);
useEffect(() => {
  document.title = "GalleriaProperties";
}, []);
 useEffect(()=>{
       const fetchData = async () => {
         try {
           const result = await axios.get(
             "https://bdfqeanazekq5kvfeebnua4h2m0guswz.lambda-url.eu-west-1.on.aws/galleria/property/posts"
           );
           console.log("Resulttt", result.data.data);
           setFormData(result?.data.data)
         } catch (error) {
           console.error("Error fetching data:", error);
         }
       };

       fetchData();

 },[])
 console.log("fprmData", formData)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);

    return formattedDate;
  };
   const deleteItem = async (item) => {
     console.log("Itemxxxxxxxx", item._id.toString());
     const id = item._id.toString();
     const result = await axios.delete(
       `https://bdfqeanazekq5kvfeebnua4h2m0guswz.lambda-url.eu-west-1.on.aws/galleria/post/delete?_id=${id}`
     );
     
     console.log("Result", result);
    //  setData(result1.data.data);
   };

  return (
    <>
      <Header />

      <div className="w-full h-full flex flex-col items-center justify-center">
        <table className="w-full max-w-screen-md bg-white">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="px-4 py-2">Post</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {formData?.map((data) => (
              <tr key={data?._id} className="border-b">
                <td className="px-4 py-2">{data?.post}</td>
                <td className="px-4 py-2">{data?.id}</td>
                <td className="px-4 py-2">{formatDate(data?.date)}</td>
                {/* <td>
                  <div
                    className="bg-primary w-[30px] rounded-lg mr-2 cursor-pointer hover:bg-black"
                    onClick={() => deleteItem(data)}
                  >
                    <img src={AppImages.del} className="w-[30px] p-2" />
                  </div>
                </td> */}
                {/* <td>
                  <div
                    className="bg-primary w-[30px] rounded-lg mr-2 cursor-pointer hover:bg-black"
                    // onClick={() => deleteItem(item)}
                  >
                    <img src={AppImages.edit} className="w-[30px] p-2" />
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`/galleria/form`}>
          <button className="form-button rounded-md my-5 md:text-[17px] text-[14px] py-1 px-2 w-[80px] md:px-2 md:w-[130px] md:h-[45px] bg-[#009bfb] hover:bg-lightBlue-600 text-white">
            Create Post
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default GalleriaPropertyTable;
