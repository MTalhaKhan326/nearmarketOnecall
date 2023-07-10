import axios from "axios";
import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { convertMySqlDateToReadable, formatNumberAsReadable, titleCase } from "../../utils/helpers";
import { RequestState } from "../../utils/RequestState";
import Footer from "../Footer";
import Header from "../Header";
import BusinessList from "../modules/UserRequest/BusinessList";
import RequestSummary from "../modules/UserRequest/RequestSummary";

const statsInitialState = {
    category: null,
    date: null,
    totalCount: null,
    viewedCount: null,
    requestState: RequestState.IDLE
}

const statsReducer = (state, action) => {
    switch(action.type) {
        case "data": 
        const { query, totalCount, viewedCount } = action.data 
            return {
                category: titleCase(query.category),
                date: convertMySqlDateToReadable(query.datetime),
                totalCount: formatNumberAsReadable(totalCount),
                viewedCount: formatNumberAsReadable(viewedCount),
                requestState: RequestState.COMPLETED
            }
        case "request_state":
            return {...state, requestState: action.data}
        default: 
            return state 
    }
} 

function UserRequestPage() {
    const [stats, setStats] = useReducer(statsReducer, statsInitialState)
    
    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get('i') ? parseInt(atob(searchParams.get('i') ?? "")) : null
    const isValidId = !isNaN(id) && id >= 0

    useEffect(() => {
        if(isValidId && stats.requestState === RequestState.IDLE) { 
            axios.get(`https://b3i2xui1e5.execute-api.eu-west-1.amazonaws.com//near-market/u/query?query_id=${id}&v=2`)
                .then(res => {
                    if(res.data.status === 200) {
                        setStats({type: 'data', data: res.data.data})
                    }
                }).finally(() => {
                    setStats({type: 'request_state', data: RequestState.COMPLETED})
                })
        }

        
    }, [])

    return (  
        <>
            <Header />
            <div className="p-2">
                { !isValidId ? <h2>Not a valid url</h2> : 
                    <>
                        <h2 className="font-semibold my-2">Request Stats:</h2>
                        <RequestSummary 
                            category={stats.category}
                            date={stats.date}
                            totalCount={stats.totalCount}
                            viewedCount={stats.viewedCount}
                        />
                        {/* <div className="flex justify-end my-2">
                            <button className="bg-[#288fcc] text-white px-4 py-[4px] text-[14px] rounded">
                                Load Request
                            </button>
                        </div> */}
                        <h2 className="font-semibold my-2">List of Businesses:</h2>
                        <BusinessList 
                            queryId={id} 
                            totalCount={stats.totalCount ? Number(stats.totalCount.replace(/[,]/g, "")) : 0}
                        />
                    </>
                }
            </div>
            <Footer />
        </>
    );
}

export default UserRequestPage;