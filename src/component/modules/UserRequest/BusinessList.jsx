import axios from "axios";
import { useState } from "react";
import { useEffect, useReducer } from "react";
import { AppImages } from "../../../Asset/images/image";
import { arrayUniqueByKey, removeSpecialCharacters } from "../../../utils/helpers";
import { RequestState } from "../../../utils/RequestState";
import Loading from "../../basic/Loading";

const markerInitialState = {
    data: [],
    currentPage: 0,
    requestState: RequestState.IDLE
}

const markerReducer = (state, action) => {
    switch(action.type) {
        case "data": 
            const { markers } = action.data 
            return {
                requestState: RequestState.COMPLETED,
                data: arrayUniqueByKey(markers, 'phone'),
                currentPage: 1,
            }
        case "request_state": 
            return {...state, requestState: action.payload}
        case "next_page":
            return {
                requestState: RequestState.COMPLETED,
                data: [...state.data, ...arrayUniqueByKey(action.data.markers, 'phone')],
                currentPage: state.currentPage + 1,
            }
        default: 
            return state
    }
}

function BusinessList({ queryId, totalCount }) {
    const [markers, setMarkers] = useReducer(markerReducer, markerInitialState)
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)

    useEffect(() => {
        if(queryId && markers.requestState === RequestState.IDLE) {
            axios.get(`https://b3i2xui1e5.execute-api.eu-west-1.amazonaws.com/broadcast/sent_to?query_id=${queryId}&v=2&page=1`)
                .then(res => {
                    if(res.data.status === 200) {
                        setMarkers({type: 'data', data: {
                            markers: res.data.data.markers
                        }})
                    }
                }).finally(() => {
                    setMarkers({type: 'request_state', data: RequestState.COMPLETED})
                })
        }
    }, [])

    const getNextPageContent = () => {
        setIsFetchingNextPage(true)
        axios.get(`https://b3i2xui1e5.execute-api.eu-west-1.amazonaws.com/broadcast/sent_to?query_id=${queryId}&v=2&page=${markers.currentPage + 1}`)
            .then(res => {
                if(res.data.status === 200) {
                    setMarkers({type: 'next_page', data: {
                        markers: res.data.data.markers
                    }})
                }
            }).finally(() => {
                setMarkers({type: 'request_state', data: RequestState.COMPLETED})
                setIsFetchingNextPage(false)
            })
    }

    let totalPages = 0
    if(markers.data.length > 0) {
        totalPages = Math.ceil(totalCount / 20)
    }

    return (  
        <div className="overflow-y-auto border-2 rounded border-[#288fcc]">
            {markers.requestState === RequestState.IDLE ? <Loading /> : 
            <>
                <ul>
                    {markers.data.map((item, index) => (
                        <li key={index} data-markerid={item.id} data-markerphone={item.phone}>
                            <div className={`p-2 ${index %2 === 0 ? 'bg-[#288fcc33]' : 'bg-[#288fcc55]'}`}>
                                <div className="flex justify-between items-center flex-wrap">
                                    <div className="flex-1">{removeSpecialCharacters(item.name).replace("name-", "")}</div>
                                    <div onClick={() => window.open(`tel:${item.phone}`, '_blank')}>
                                        <img 
                                            className="border rounded-full p-[2px] border-[#20C997] w-[25px]"
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAACHklEQVR4nN1VMWgUURBdL0qwULGxkv1z4SCWBrFReyFNOgW100YUo4X1dkYQi4Pcmzux0UJlg2ijCBYWmuzMekVACxMDFsZOtEkVoifzdzcmR2Cje4U41fJ2Z96fP/PeBsF/GZS2T5PyE6e4F77l4wMt7oSvkXKPBEukWCbhH5Tw5GCKpxhzglVSfhj0olpjsTnsFDMk+EmKk9Wq93o7SLlLyl/C19hfwI3F5rBhTvl+pfokPGFX4xRnNhNHNaf80TqpROAUbRL+agXXwTge8rjNRPlUNQLhF6ScbMRIcSUrjhuVinsCxYwTLPSRviTh98Egoi582c+g2zlUYF4LfaR/HSOzOECClY3bEgouedIUYwMhccI3SbFWT1tHPWm3s4+Ev5Ng7ki3s6syweibu3uc4rNTzB+cu73bsLriQr6+7eBVtLM/p562zjnFU7OVkaRzoryLhMdNuU7wyMTnMcWtzD54NkxbxwrctsuTC3+wg+V5V0tJSHgq96OowELh86T8LV/bT074XVYcd4wwsxWOzbvKDbIX1UjxwHuQ4HoBN6S51ykukuAxKZ7Zs4lxs61geVuqt6F6kqwTtuTSJDuYYMk6Kf32dwJP+btVzBfbtVWYQZoL57OaCP4kXMLjfoiKNdMJpRhdfxnHQ6HyWe+4gtVtDXmraNj9m04EK/lwF5xw6nWSbVLqdPpwMBDFJzyZb8xzUp6u/jP6l+MXO9pQRTZk46AAAAAASUVORK5CYII=" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center justify-between m-2 text-[12px]">
                    <p>Showing {markers.data.length} of {totalCount} results</p>
                    {
                        markers.currentPage < totalPages &&
                        <>
                            {isFetchingNextPage ? 
                                <div className="py-1">
                                    <img src={AppImages.loading} className="w-[20px]" />
                                </div> : 
                                <p 
                                    className="bg-gray-200 px-4 rounded-full py-1 font-bold cursor-pointer"
                                    onClick={() => getNextPageContent()}
                                >
                                    Load More
                                </p>
                            }
                        </>
                    }
                </div>
            </>
                
            }
        </div>
    );
}

export default BusinessList;