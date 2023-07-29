// ExcelToJsonConverter.js
import React, { useState } from "react";
import firebase_service from "./utils/firebase_service";
import axios from "axios";
import * as XLSX from "xlsx";

const ExcelToJsonConverter = () => {
  const [selecteddata, setSelectedData] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    lat: "",
    lng: "",
    broadcast_tag: "",
    images: [],
    city: "",
    address: "",
    region: "Punjab",
    country: "Pakistan",
    timezone: "Asia/Karachi",
    category_tags: "",
    source: "",
    status: "Active",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [data, setData] = useState("");
const [jsonData, setJsonData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
//   
  const [submitted, setsubmitted] = useState("");
  const handleSubmit = () => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files.length === 0) {
      // No images selected, prevent form submission
      alert("Please select at least one image.");
      return false;
    }
     if (!selectedFile) {
       console.log("Please select an Excel file.");
       return;
     }

     const reader = new FileReader();

     reader.onload = (event) => {
       const data = event.target.result;
       const workbook = XLSX.read(data, { type: "binary" });
       const firstSheetName = workbook.SheetNames[0];
       const sheetData = XLSX.utils.sheet_to_json(
         workbook.Sheets[firstSheetName]
       );

       setJsonData(sheetData);
       setSelectedData(sheetData)
     };

     reader.readAsBinaryString(selectedFile);
    setsubmitted(1);
    // console.log("SelectedImages",selectedImages)
    console.log("Form Data:", formData);
    // convertImagesToBase64(formData.images);
    // if (selectedImages.length === 0) {
    //   console.log("No images selected!");
    //   return;
    // }

    // const foldername = "/wa-groups-screenshots";
    // firebase_service
    //   .uploadManyFilesOnFirebase({ files: selectedImages, foldername })
    //   .then(async(urls) => {
    //     console.log("Uploaded Image URLs:", urls);
    //     const result1 = await axios.post(
    //     `https://7gxwzm6f2vdpe5562dvm7bg7re0aqtsh.lambda-url.eu-west-1.on.aws/vision?urls=${urls}`
    //   );
    //   console.log(result1)
    //   // setData(result1.data.data);
    //     // You can perform further actions with the uploaded images here.
    //   })
    //   .catch((error) => {
    //     console.error("Error uploading images:", error);
    //   });
  };
  const handleExportToMarkers = async () => {
    // const data = selecteddata.flat(1);
    // setSelectedData();
    console.log("Markersss", jsonData);
    try {
      const response = await axios.post(
        "https://crm-lara-mongo-7azts5zmra-uc.a.run.app/api/markers-import",
        {
          city: formData.city,
          category: formData.category,
          broadcast_tag: formData.broadcast_tag,
          //  address: formData.address,
          //  region: formData.region,
          //  country: formData.country,
          //  timezone: formData.timezone,
          //  status: formData.status,
          lat: formData.lat,
          lng: formData.lng,
          markers: JSON.stringify(jsonData),
          // source: "whatsapp-screenshots-import",
        }
      );

      // Handle the response as needed
      console.log("API Response:", response.data);
      // ... do something with the response ...
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Error:", error.message);
      // ... handle the error ...
    }
  };
  console.log("SelectedDataaa", selecteddata);
  return (
    <div>
      <div className="block md:hidden">{/* <Header /> */}</div>
      <div className="hidden md:block">{/* <WebHeader1 /> */}</div>

      <div className="flex flex-col items-center w-[full]">
        <div className="text-[20px] md:text-[32px] text-[#282d32] font-medium md:text ">
          Post a <span className="font-bold">Form</span>
        </div>
        <form
          // onSubmit={handleSubmit}
          className="text-[#75747c]  mt-[25px] text-[20px] w-[80%] md:w-[60%] mx-auto"
        >
          <div className="flex flex-wrap w-full">
            <div className=" w-full lg:w-1/2 md:mt-7 md:mb-[20px] mt-1">
              <div className="mt-4">
                <div className="text-[15px]">Enter Category</div>
                <input
                  type="text"
                  placeholder="Category"
                  className="form-input border w-full rounded-md px-3 py-3
                  border-[#5e5954]
                  h-[45px]
                  focus:outline-none"
                  onChange={(e) => {
                    setFormData(() => ({
                      ...formData,
                      category: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="mt-4">
                <div className="text-[15px]">City</div>
                <input
                  type="text"
                  placeholder="City"
                  className="form-input border w-full rounded-md px-3 py-3
                  border-[#5e5954]
                  h-[45px]
                  focus:outline-none"
                  onChange={(e) => {
                    setFormData(() => ({
                      ...formData,
                      city: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="mt-4">
                <div className="text-[15px]">Address</div>
                <input
                  type="text"
                  placeholder="Address"
                  className="form-input border w-full rounded-md px-3 py-3
                  border-[#5e5954]
                  h-[45px]
                  focus:outline-none"
                  onChange={(e) => {
                    setFormData(() => ({
                      ...formData,
                      address: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="mt-4">
                <div className="text-[15px]">Region</div>
                <input
                  type="text"
                  placeholder="Region"
                  defaultValue={formData.region}
                  className="form-input border w-full rounded-md px-3 py-3
                  border-[#5e5954]
                  h-[45px]
                  focus:outline-none"
                  onChange={(e) => {
                    setFormData(() => ({
                      ...formData,
                      region: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="mt-4">
                <div className="text-[15px]">Country</div>
                <input
                  type="text"
                  placeholder="Country"
                  className="form-input border w-full rounded-md px-3 py-3
                  border-[#5e5954]
                  h-[45px]
                  focus:outline-none"
                  defaultValue={formData.country}
                  onChange={(e) => {
                    setFormData(() => ({
                      ...formData,
                      country: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="mt-4">
                <div className="text-[15px]">Time Zone</div>
                <input
                  type="text"
                  placeholder="TimeZone"
                  defaultValue={formData.timezone}
                  className="form-input border w-full rounded-md px-3 py-3
                  border-[#5e5954]
                  h-[45px]
                  focus:outline-none"
                  onChange={(e) => {
                    setFormData(() => ({
                      ...formData,
                      timezone: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="mt-4">
                <div className="text-[15px]">Enter lat</div>
                <input
                  type="text"
                  placeholder="Latitude"
                  className="form-input border w-full rounded-md px-3 py-3
                  border-[#5e5954]
                  h-[45px]
                  focus:outline-none"
                  onChange={(e) => {
                    setFormData(() => ({
                      ...formData,
                      lat: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className=" w-full lg:w-1/2 lg:px-2 mt-[9px] sm:mt-[5px] md:mt-[9px] lg:mt-[45px] mb-[10px]">
              <div>
                <div className="text-[15px]">Enter Longitude</div>
                <input
                  type="text"
                  placeholder="Longitude"
                  className="form-input border w-full rounded-md px-3 py-3
                  border-[#5e5954]
                  h-[45px]
                  focus:outline-none"
                  onChange={(e) => {
                    setFormData(() => ({
                      ...formData,
                      lng: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="mt-4">
                <div className="text-[15px]">Enter Broadcast_tagt</div>
                <input
                  type="text"
                  placeholder="Broadcast_tag"
                  className="form-input border w-full rounded-md px-3 py-3
                  border-[#5e5954]
                  h-[45px]
                  focus:outline-none"
                  onChange={(e) => {
                    setFormData(() => ({
                      ...formData,
                      broadcast_tag: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="mt-4">
                <div className="text-[15px]">Category Tags</div>
                <input
                  type="text"
                  placeholder="Category Tags"
                  className="form-input border w-full rounded-md px-3 py-3
                  border-[#5e5954]
                  h-[45px]
                  focus:outline-none"
                  onChange={(e) => {
                    setFormData(() => ({
                      ...formData,
                      category_tags: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="mt-4">
                <div className="text-[15px]">Source</div>
                <input
                  type="text"
                  placeholder="Source"
                  className="form-input border w-full rounded-md px-3 py-3
                  border-[#5e5954]
                  h-[45px]
                  focus:outline-none"
                  onChange={(e) => {
                    setFormData(() => ({
                      ...formData,
                      source: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="mt-4">
                <div className="text-[15px]">Status</div>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-input border w-full rounded-md px-3 py-3 border-[#5e5954] h-[48px] focus:outline-none"
                >
                  <option value="Active">ACTIVE</option>
                  <option value="Invalid">INVALID</option>
                </select>
              </div>
              <div className="mt-4">
                <div className="text-[15px]">Select Excel File</div>
                <input type="file" onChange={handleFileChange} />
              </div>
            </div>
          </div>
        </form>
        <div className="flex flex-row justify-between text-[14px] md:text-[19px]">
          {/* Assuming you have `submitted` and `selectedData` as state variables */}
          {submitted === "" && selecteddata === "" ? (
            <button
              onClick={handleSubmit}
              className="form-button rounded-md mb-5 text-[15px] w-[100px] md:px-2 md:w-[130px] h-[45px] bg-[#009bfb] hover:bg-lightBlue-600 text-white"
            >
              Submit
            </button>
          ) : submitted === 1 && selecteddata === "" ? (
            <div className="text-[18px] font-bold">Loading ....</div>
          ) : (
            <button
              onClick={handleSubmit}
              className="form-button rounded-md mb-5 text-[15px] w-[100px] md:px-2 md:w-[130px] h-[45px] bg-[#009bfb] hover:bg-lightBlue-600 text-white"
            >
              Submit
            </button>
          )}
        </div>
      </div>
      {selecteddata === "" ? (
        <div></div>
      ) : (
        <>
          <div className="flex flex-row justify-between">
            {/* <div>
              {" "}
              <button
                className="rounded-md mb-5 ml-2 text-[13px] py-1 w-[75px] md:px-2 md:w-[105px] bg-[#25ec53] hover:bg-green-400 text-white"
                onClick={handleExportToExcel}
              >
                Export to Excel
              </button>
            </div> */}
            <div>
              <button
                className="rounded-md mb-5 ml-2 text-[13px] py-1 w-[75px] md:px-2 md:w-[105px] bg-[#25ec53] hover:bg-green-400 text-white"
                onClick={handleExportToMarkers}
              >
                Export to Markers
              </button>
            </div>
          </div>

          <table className="w-full  bg-white mb-9 mx-2">
            <thead>
              <tr className="bg-gray-500 text-white">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">PhoneNumber</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Direction</th>
              </tr>
            </thead>
            <tbody>
              {/* {selecteddata?.map((data, index) => (
                <React.Fragment key={index}> */}
              {selecteddata.map((item, innerIndex) => (
                <tr key={item?._id} className="border-b text-center">
                  <td className="px-4 py-2">{item?.Name}</td>
                  <td className="px-4 py-2">{item?.PhoneNumber}</td>
                  <td className="px-4 py-2">{item?.Category}</td>
                  <td className="px-4 py-2">{item?.Location}</td>
                </tr>
              ))}
              {/* </React.Fragment>
              ))} */}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ExcelToJsonConverter;
