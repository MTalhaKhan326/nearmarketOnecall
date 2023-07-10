import { Navigate, useParams } from "react-router-dom";
import LoadingModal from "../../basic/LoadingModal.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import SimpleModal from "../../basic/SimpleModal.jsx";

function ShortUrlScreen() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [path, setPath] = useState(null)
    const [error, setError] = useState(null)
    const API_BASE_URL = "https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws"

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${API_BASE_URL}/short-urls/decode?id=${id}`).then(({ data }) => {
            if(data.status === 200 && data.data?.long_url) {
                const url = new URL(data.data.long_url)
                setPath(url.pathname + url.search)
                axios.post(`${API_BASE_URL}/short-urls/update-visit-count`, { id: data.data?.id })
            } else {
                setError('Something went wrong')
            }
        })
        .catch(e => {
            setError('Something went wrong')
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    if(path) {
        return <Navigate to={path} />
    }

    // if(error) {
    //     return <Navigate to="/not-found" />
    // }

    return (  
        <div className="relative">
            {error && <SimpleModal  />}
            {isLoading && !error && <LoadingModal />}
        </div>
    );
}

export default ShortUrlScreen;