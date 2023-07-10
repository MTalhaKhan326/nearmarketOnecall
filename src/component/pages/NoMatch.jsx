import { useEffect } from "react";
import { AppImages } from "../../Asset/images/image.js";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx";
import { useLocation } from "react-router-dom";

function NoMatch() {
    const location = useLocation()

    useEffect(() => {
        document.title = 'Page Not Found'
    }, [])
    return (  
        <div className="relative min-h-[100vh] bg-slate-50">
            <Header />

            <main className="pb-[11rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80vw] ">
                <div className="flex items-center md:justify-center">
                    <img src={AppImages.pageNotFound} alt="" className="w-[70px] svg-blue mx-2 p-2 border-2 rounded" />
                    <div>
                        <p className="text-[32px] text-blue"><strong>404</strong></p>
                        <p className="text-[22px] text-blue">Page Not Found</p>
                    </div>
                </div>
            </main>
            
            <div className="absolute bottom-0 w-full h-[11rem]">
                <Footer />
            </div>
        </div>
    );
}

export default NoMatch;