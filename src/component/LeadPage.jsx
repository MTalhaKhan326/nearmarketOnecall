import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";

function LeadPage() {
    useEffect(() => {
        document.title = 'Near Market :: Lead Details';
    }, []);
    return (  
        <>
            <Header />
            <Main />
        </>
    );
}

export default LeadPage;