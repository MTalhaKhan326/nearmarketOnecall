import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

function MBHome() {
  return (  
    <>
      <div className="my-4">
        <Tabs selectedTabClassName=" text-[#24ACE3] font-semibold">
          <TabList className={"flex items-center gap-6 border-b-2 mb-4 overflow-x-auto scrollbar-hide"}>
            <Tab className={"border-0 bg-transparent cursor-pointer outline-none py-2 px-2 "}>Dashboard</Tab>
            <Tab className={"border-0 bg-transparent cursor-pointer outline-none py-2 px-2 "}>Profile</Tab>
            <Tab className={"border-0 bg-transparent cursor-pointer outline-none py-2 px-2 "}>Leads</Tab>
            <Tab className={"border-0 bg-transparent cursor-pointer outline-none py-2 px-2 "}>Offer</Tab>
            <Tab className={"border-0 bg-transparent cursor-pointer outline-none py-2 px-2 "}>Audience</Tab>
          </TabList>
          <TabPanel>
            {/* Dashboard content */}
            <div>
              <div className="m-3">
                <div className="flex justify-between px-4 py-6 rounded-lg bg-[#C1F8FC]">
                  <div className="">
                    <h2 className="text-[16px] font-semibold">Offers Posted</h2>
                    <p className="text-[12px]">20 offers posted in the last 7 days</p>
                  </div>
                  <div>
                    <p className="text-[12px] bg-gray-50 px-3 rounded-md">Last 7 days</p>
                  </div>
                </div>
              </div>

              <div className="m-3">
                <div className="flex justify-between px-4 py-6 rounded-lg bg-[#ABEED4]">
                  <div className="">
                    <h2 className="text-[16px] font-semibold">Audience</h2>
                    <p className="text-[12px]">20 audience in the last 7 days</p>
                  </div>
                  <div>
                    <p className="text-[12px] bg-gray-50 px-3 rounded-md">Last 7 days</p>
                  </div>
                </div>
              </div>

              <div className="m-3">
                <div className="flex justify-between px-4 py-6 rounded-lg bg-[#FAEFA3]">
                  <div className="">
                    <h2 className="text-[16px] font-semibold">Leads</h2>
                    <p className="text-[12px]">20 leads in the last 7 days</p>
                  </div>
                  <div>
                    <p className="text-[12px] bg-gray-50 px-3 rounded-md">Last 7 days</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <ComingSoon />
          </TabPanel>
          <TabPanel>
            <ComingSoon />
          </TabPanel>
          <TabPanel>
            <ComingSoon />
          </TabPanel>
          <TabPanel>
            <ComingSoon />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}

function ComingSoon() {
  return <div className="mx-auto my-8 text-center">
    <p>
      <span className="bg-yellow-500 px-3 py-2 text-white">Coming</span><span className="bg-black text-yellow-500 px-3 py-2">Soon</span>
    </p>
  </div>
}

export default MBHome;