import { useParams } from "react-router-dom";
import Header from "../../Header.jsx";
import Footer from "../../Footer.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingModal from "../../basic/LoadingModal.jsx";

function PostListScreen() {
    const params = useParams()
    const encoded_user_id = params.user_id 
    let userId
    try {
        userId = atob(encoded_user_id)
        userId = userId.replace(/[^0-9]/gi, "")
        userId = userId.length === 0 ? null : userId 
    } catch(e) {}
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const [isLoadingPosts, setIsLoadingPosts] = useState(false)
    useEffect(() => {
        if(userId) {
            setIsLoadingPosts(true)
            fetchPosts(userId)
                .then(res => {
                    if(res?.posts) {
                        setData(res.posts ?? [])
                        setCount(res.count ?? 0)
                    }
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    setIsLoadingPosts(false)
                })
        }
    }, [userId])
    async function fetchPosts(userId) {
        try {
            const url = new URL(`https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/post/fetch/latest/user-id`)
            url.searchParams.set("user_id", userId.toString())
            const res = await axios.get(url)
            if(res.data.status == 200) {
                return { posts: res.data.data.posts, count: res.data.data.count }
            }
            return null 
        } catch(e) {
            return null 
        }
    }
    
    return (  
        <>
            <div className="relative min-h-[100vh] bg-slate-50">
                
                <Header />

                <main className="pb-[11rem]">
                    <div className="my-4">
                        <h1 className="text-center text-[20px]">Your Today's Posts</h1>
                    </div>
                    <div>
                        { !userId ? <Center>
                            <img src="https://static.thenounproject.com/png/5256120-200.png" alt="invalid" className="w-20 block mx-auto my-0" />
                            <h2 className="text-black">Invalid Link</h2>
                        </Center>
                        : data?.length > 0 ? 
                            <>
                                <ul>
                                    {data.map((post, index) => (
                                        <li key={index}>
                                            <PostCard post={post} />
                                        </li>
                                    ))}
                                </ul>
                                <h4 className="mx-3 text-[13px] text-right">Showing {data.length} of {count}</h4>
                            </>
                            : !isLoadingPosts ?  <Center>
                                <img src="https://static.thenounproject.com/png/2504020-200.png" alt="no results" className="w-20 block mx-auto my-0" />
                                <h2 className="text-gray-600">No Results</h2>
                            </Center>
                            : <></>
                        }
                    </div>
                </main>

                <div className="absolute bottom-0 w-full h-[11rem]">
                    <Footer />
                </div>
            </div>

            {isLoadingPosts && <LoadingModal />}

        </>
    );
}

function PostCard({ post }) {
    return (  
        <div className="my-2 mx-2 p-2 border-2 border-slate-200 rounded bg-white">
            <h2 className="text-[14px] text-gray-500">#{post.id}</h2>
            <div className="py-6">
                <p className="">{post.title}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-[12px] text-gray-400">{post.formatted_datetime ?? ""}</div>
                <button role="button" className="border-2 px-4 rounded-lg bg-gray-600 text-white active:bg-gray-500 no-select">Contact</button>
            </div>
        </div>
    );
}

function Center({ children }) {
    return (
        <div className="relative h-[40vh]">
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                {children}
            </div>
        </div>
    )
}

export default PostListScreen;