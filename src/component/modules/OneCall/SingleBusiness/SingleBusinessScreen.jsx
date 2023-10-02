import { useContext, useEffect, useState } from "react";
import { LAMBDA_API_BUSINESS_PORTAL_URL, MyBusinessContext } from "../contexts/MyBusinessContext.jsx";
import { MdOutlineEdit, MdOutlinePhone } from "react-icons/md"
import { BsBriefcase } from "react-icons/bs"
import { RiMapPin2Line } from "react-icons/ri"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SimpleModal from "../../../basic/SimpleModal.jsx";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { AppImages } from "../../../../Asset/images/image.js";
import { toast } from "react-toastify";
import AppToastContainer from "../../../basic/AppToast.jsx";

function SingleBusinessScreen() {
  const [searchParams] = useSearchParams()
  const businessId = searchParams.get('marker_id')
  const [isFetchingBusiness, setIsFetchingBusiness] = useState(false)
  const [business, setBusiness] = useState(null)
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  async function fetchBusinessById(id) {
    try {
      let res = await axios.get(LAMBDA_API_BUSINESS_PORTAL_URL + "/marker/get-by-id?id=" + id)
      console.log(res.data)
      if(res.data?.status === 200 && res.data?.data?.marker) {
        return res.data?.data?.marker 
      }
      return null 
    } catch(e) {
      return null 
    }
  }

  useEffect(() => {
    if(!business && businessId) {
      setIsFetchingBusiness(true)
      fetchBusinessById(businessId).then(res => {
        if(res) {
          setBusiness(res)
        }
      }).catch(e => {
        toast.error("Something went wrong fetching business!")
      }).finally(() => {
        setIsFetchingBusiness(false)
      })
    }
  }, [])

  if(isFetchingBusiness) {
    return <>
      <div className="relative h-screen">
        <img src={AppImages.loading} className="w-[50px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
      </div>
    </>
  }
  
  return ( 
    <>
      <AppToastContainer />
      <div className="p-4">
        <div>
          <div>
            <div className="flex justify-between items-center">
              <div className="font-semibold text-lg">{business?.name}</div>
              {/* <div className="bg-[#D6F3FFAA] rounded-full p-2">
                <MdOutlineEdit color="#000" />
              </div> */}
            </div>

            <div className="flex items-start my-1">
              <div className="flex-[0_0_10%]">
                <BsBriefcase />
              </div>
              <div>{business?.type}</div>
            </div>

            <div className="flex items-start my-1">
              <div className="flex-[0_0_10%]">
                <MdOutlinePhone />
              </div>
              <div>{business?.phone}</div>
            </div>

            <div className="flex items-start my-1">
              <div className="flex-[0_0_10%]">
                <RiMapPin2Line />
              </div>
              <div>{business?.address}</div>
            </div>
          </div>

          <div className="my-2">
            <ul className="flex items-center gap-2 overflow-x-auto">
              {business?.photo_urls ? [business?.photo_urls].map((img, ind) => (
                <li 
                  key={'bi-ind-' + ind} 
                  onClick={() => {
                    setSelectedImage(img)
                  }}
                > 
                  <img src={img} className="min-w-[100px] h-[70px] object-cover rounded-lg" />
                </li>
              )) : <></>}
            </ul>
          </div>

          <div className="border-b-[1px] border-slate-200 my-4"></div>

          <div>
            <Tabs selectedTabClassName="border-b-2 border-[#24ACE3] text-black font-semibold">
              <TabList className={"flex items-center gap-6 border-b-2 mb-4"}>
                <Tab className={"border-0 bg-transparent cursor-pointer outline-none py-2 px-2 "}>Products</Tab>
                <Tab className={"border-0 bg-transparent cursor-pointer outline-none py-2 px-2 "}>Services</Tab>
                <Tab className={"border-0 bg-transparent cursor-pointer outline-none py-2 px-2 "}>Offers</Tab>
              </TabList>

              <TabPanel>
                
              </TabPanel>
              <TabPanel>
                
              </TabPanel>
              <TabPanel>
                <Tabs selectedTabClassName="bg-[#24ACE355] rounded-lg py-1 font-semibold outline-none">
                  <TabList className={"flex items-center justify-between border-b-0 mb-4"}>
                    <Tab className={"flex-[0_0_20%] text-center"}>All</Tab>
                    <Tab className={"flex-[0_0_20%] text-center"}>Recent</Tab>
                    <Tab className={"flex-[0_0_20%] text-center"}>Commit</Tab>
                    <Tab className={"flex-[0_0_20%] text-center"}>Closed</Tab>
                  </TabList>
                  <TabPanel>
                    
                  </TabPanel>
                  <TabPanel>
                    
                  </TabPanel>
                  <TabPanel>
                    
                  </TabPanel>
                  <TabPanel>
                    
                  </TabPanel>
                </Tabs>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
      {/* <SimpleModal 
        isOpen={selectedImage != null}
        onClose={() => setSelectedImage(null)}
      >
        <div className="max-h-[80vh] max-w-[80vw]">
          <div>
            <img src={selectedImage} />
          </div>
          <div className="flex items-center justify-between my-2">
            <div onClick={() => {
              setImages(images => (images.filter(img => img !== selectedImage)))
              setSelectedImage(null)
            }}>Delete</div>
            <div>Set as cover</div>
          </div>
        </div>
      </SimpleModal> */}
    </> 
  );
}

export default SingleBusinessScreen;