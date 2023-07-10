import { AppBar, Tab, Tabs, useTheme } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AssistanceTabContent from "./AssistanceTabContent.jsx";
import BillingTabContent from "./BillingTabContent.jsx";
import HelpContextProvider from "../contexts/HelpContext.jsx";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </div>
    );
}

function HelpScreen() {
    const theme = useTheme();
    const [searchParams] = useSearchParams()
    const activeTab = searchParams.get('tab')
    const [tab, setTab] = useState(activeTab === 'billing' ? 1 : 0);
    function a11yProps(index) {
        return {
          id: `full-width-tab-${index}`,
          "aria-controls": `full-width-tabpanel-${index}`,
        };
    }
    return ( 
        <HelpContextProvider>
            <div>
                <div className="px-5">
                    <AppBar
                        position="static"
                        sx={{ backgroundColor: "white", borderBottom: "1px solid #707070" }}
                        elevation={0}
                    >
                        <Tabs
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#2b2b2b",
                                },
                            }}
                            value={tab}
                            onChange={() => {
                                if(tab === 1) {
                                    setTab(0)
                                } else if(tab === 0) {
                                    setTab(1)
                                }
                            }}
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs"
                        >
                            <Tab
                                sx={{
                                    textTransform: "none",
                                    color: "#2b2b2b",
                                }}
                                label="Assistance"
                                {...a11yProps(0)}
                            />
                            <Tab
                                sx={{
                                    textTransform: "none",
                                    color: "#2b2b2b",
                                }}
                                label="Billing"
                                {...a11yProps(1)}
                            />
                        </Tabs>
                    </AppBar>
                </div>
                <div>
                    <TabPanel value={tab} index={0} dir={theme.direction}>
                        <AssistanceTabContent />
                    </TabPanel>
                    <TabPanel value={tab} index={1} dir={theme.direction}>
                        <BillingTabContent />
                    </TabPanel>
                </div>
            </div>
        </HelpContextProvider> 
    );
}

export default HelpScreen;