import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import axios from 'axios';

const Acceptance = (props) => {
    const navigate = useNavigate();
   const location = useLocation();
    const [customers, setCustomers] = useState(0);
    const [revenue, setRevenue] = useState(0);
 const[data, setData]= useState('')
   useEffect(() => {
     // Retrieve the data from the query parameter
     const queryData = new URLSearchParams(location.search).get("data");
     if (queryData) {
       // Parse and use the data as needed
       const parsedData = JSON.parse(decodeURIComponent(queryData));
       // Use the parsedData in your component logic
       setData(parsedData);
       setCustomers(parsedData.customers);
       setRevenue(parsedData.revenue)
       console.log(parsedData);
     }
   }, [location.search]);

  //  const Total =
  //    data?.revenue * 1 +
  //    data.revenue * 2 +
  //    data.revenue * 3 +
  //    data.revenue * 7 +
  //    data.revenue * 10;
     const sendSms = async (number) => {
       // closeModal1()
       console.log("Hi")
       const result = await axios.post(
         `https://bdfqeanazekq5kvfeebnua4h2m0guswz.lambda-url.eu-west-1.on.aws/customer/message?email=${data.email}&phone=${data.phone}&revenue=${data.revenue}`
       );
       console.log("Resulttt", result);
       if (result.status === 200) {
        //  closeModal1();
         navigate("/partner");
       }
     };
    
    //  const  data?.customers;
     const customer1 = customers*2;
     const customer2 = customer1 + customers;
     const customer3 = customer2 * 2;
     const customer4 = customer3 * 2;
     const revenues = revenue * 0.10;
     const revenue1 = (revenue *2) ; 
    const revenue2 = revenue1 + revenue; 
    const wholerev = revenue + revenue1 + revenue2;
    const revenue3 = wholerev ; 
    const revenue4 = wholerev * 2 ; 
    const total = revenue + revenue1 + revenue2 + revenue3 + revenue4
  return (
    <div>
      {" "}
      {/* <Header/> */}
      <div className="flex flex-col items-center w-[full] py-3">
        <div className="text-[20px] md:text-[32px] text-[#282d32] font-medium md:text ">
          Request for Market Partner
        </div>
      </div>
      <div className="md:px-[50px] px-2">
        <div className=" flex flex-col">
          <div className="w-full flex flex-row">
            <div className="w-[50%] ">Name :</div>
            <div className="w-[50%] pl-2">{data.name}</div>
          </div>
          <div className="w-full flex flex-row">
            <div className="w-[50%] ">Category :</div>
            <div className="w-[50%] pl-2">{data.category}</div>
          </div>
          <div className="w-full flex flex-row">
            <div className="w-[50%] ">Email :</div>
            <div className="w-[50%] pl-2">{data.email}</div>
          </div>
          <div className="w-full flex flex-row">
            <div className="w-[50%] ">Gender :</div>
            <div className="w-[50%] pl-2">{data.gender}</div>
          </div>
          <div className="w-full flex flex-row">
            <div className="w-[50%] ">Address :</div>
            <div className="w-[50%] pl-2">{data.address}</div>
          </div>
          <div className="w-full flex flex-row">
            <div className="w-[50%] ">PhoneNumber :</div>
            <div className="w-[50%] pl-2">{data.phone}</div>
          </div>

          <div className="w-full flex flex-row">
            <div className="w-[50%] ">Cutomers :</div>
            <div className="w-[50%] pl-2">{customers}</div>
          </div>
          <div className="w-full flex flex-row">
            <div className="w-[50%] ">Revenue :</div>
            <div className="w-[50%] pl-2">{revenue}</div>
          </div>
          <div className="w-full flex flex-row">
            <div className="w-[50%] ">Days :</div>
            <div className="w-[50%] pl-2">{data.days}</div>
          </div>
        </div>
        <div>
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-500 text-white">
                <th className="px-4 py-2">Customers</th>
                <th className="px-4 py-2">Days</th>
                <th className="px-4 py-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">{customers}</td>

                <td className="px-4 py-2">
                  {data.days >= 30
                    ? "1 month"
                    : data.days >= 60
                    ? "2 month"
                    : data.days >= 90
                    ? "3 month"
                    : data.days}
                </td>
                <td className="px-4 py-2">{revenues}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">{customer1}</td>
                <td className="px-4 py-2">
                  {data.days * 2 >= 30
                    ? "1 month"
                    : data.days * 2 >= 60
                    ? "2 months"
                    : data.days * 2 >= 90
                    ? "3 months"
                    : data.days * 2}
                </td>
                <td className="px-4 py-2">{revenue1}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">{customer2}</td>
                <td className="px-4 py-2">
                  {data.days * 3 >= 30
                    ? "1 month"
                    : data.days * 3 >= 60
                    ? "2 months"
                    : data.days * 3 >= 90
                    ? "3 months"
                    : data.days * 3}
                </td>
                <td className="px-4 py-2">{revenue2}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">{customer3}</td>
                <td className="px-4 py-2">2 months</td>
                <td className="px-4 py-2">{revenue3}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">{customer4}</td>
                <td className="px-4 py-2">3 months</td>
                <td className="px-4 py-2">{revenue4}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">{}</td>
                <td className="px-4 py-2">Total</td>
                <td className="px-4 py-2">{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <button
            className="form-button rounded-md mb-5 mt-3 text-[15px] w-[100px]  md:px-2 md:w-[130px] h-[45px] bg-[#009bfb] hover:bg-lightBlue-600 text-white"
            onClick={() => sendSms(data)}
          >
            Submit Request
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Acceptance