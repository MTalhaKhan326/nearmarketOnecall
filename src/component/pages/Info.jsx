import { useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import VideoSection from "../VideoSection";

function InfoPage() {
    useEffect(() => {
      document.title = 'Near Market :: Info';
    }, []);
    return (  
        <>
            <Header />
            <div className="my-4 px-2">
                <VideoSection videoUrl={"https://www.youtube.com/embed/aoyl9JSoE2k"} />
            </div>
            <Footer />
        </>
    );
}

export default InfoPage;