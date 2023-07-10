import { useEffect, useState } from "react";
import Footer from "../../Footer.jsx";
import Header from "../../Header.jsx";
import { useSearchParams } from "react-router-dom";
import { osName } from "react-device-detect";
import { createLog } from "../../../utils/helpers.js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from "axios";
import { AppImages } from "../../../Asset/images/image.js";


function PostPublishScreen() {
    const [searchParams] = useSearchParams()
    const [slides, setSlides] = useState([])
    const [category, setCategory] = useState(null)
    const i = searchParams.get("i")
    const userId = i?.split("-")[0] ?? null 
    const queryId = i?.split("-")[1] ?? null 
    const options = {
        googlePlayAppUrl: "https://play.google.com/store/apps/details?id=com.plabesk.onecall&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
        appStoreAppUrl: "https://apps.apple.com/us/app/one-call-app/id1524346082",
        baseVideoUrl: "https://www.youtube.com/embed/dZVvz_mX_Ro"
    }
    const activeLink = osName === "iOS" ? options.appStoreAppUrl : options.googlePlayAppUrl
    async function log(tag, value = {}) {
        return createLog(tag, {
            page: "post_publish_screen",
            userId,
            queryId,
            ...value 
        })
    }
    useEffect(() => {
        if(userId && queryId) {
            log("page_load")
        }
        if(queryId && slides.length === 0) {
            axios.get(`https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/post/get-ad?query_id=${queryId}&v=2`).then(({ data }) => {
                if(data.data?.image_urls && Array.isArray(data.data?.image_urls) && data.data?.image_urls.length > 0) {
                    setSlides(data.data.image_urls.map(item => ({
                        imageUrl: item 
                    })))
                }
                if(data.data?.category) {
                    setCategory(data.data?.category)
                }
            })
        }
    }, [])
    return (  
        <div className="relative min-h-[100vh] bg-slate-50">
            <Header />

            <main className="pb-[11rem]">
                <div className="my-4 mx-4">
                    <h1 className="text-center text-[17px]">Your request has been published on One Call App. Download One Call App now to view your request.</h1>
                </div>
                <div className="">
                    <Swiper
                        modules={[Navigation, Pagination]}
                    >
                        { slides.length === 0 
                            ?  <SwiperSlide>
                                    <div className="w-full max-h-[350px]">
                                        <a href={activeLink} target="_blank">
                                            <div className="h-[350px] relative bg-white">
                                                <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[24px] p-4">{category ?? "One Call"}</p>
                                            </div>
                                        </a>
                                    </div>
                                </SwiperSlide>
                            : slides.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <div className="w-full max-h-[350px]">
                                        <a href={activeLink} target="_blank">
                                            <img 
                                                src={slide.imageUrl} 
                                                alt="slide" 
                                                className="object-fit w-full h-[350px]"
                                            />
                                        </a>
                                    </div>
                                </SwiperSlide>
                            )) 
                        }
                    </Swiper>
                </div>
            </main>

            <div className="absolute bottom-0 w-full h-[11rem]">
                <Footer 
                    onAppStoreClick={e => log("clicked_on_download_app_btn", { btnType: "appstore",})} 
                    onGooglePlayClick={e => log("clicked_on_download_app_btn", { btnType: "playstore",})} 
                />
            </div>
        </div>
    );
}

export default PostPublishScreen;