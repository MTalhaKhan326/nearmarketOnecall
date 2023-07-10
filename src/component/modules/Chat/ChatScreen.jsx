import { useEffect, useRef, useState } from "react";
import Footer from "../../Footer.jsx";
import Header from "../../Header.jsx";
import { AppImages } from "../../../Asset/images/image.js";
import firebase_service from "../../../utils/firebase_service.js";
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import axios from "axios";

const MessageType = {
    ACTIVE: 'active', // One who is logged in 
    PASSIVE: 'passive' // One who will receive 
}

const MessageStatus = {
    PENDING: 'pending',
    SENT: 'sent',
    FAILED: 'failed',
    DELIVERED: 'delivered'
}

const MessageContentType = {
    TEXT: 'text'
}

function ChatScreen() {
    let isValidChatRef = true 
    const params = useParams()
    let chat_ref = params.chat_ref 
    chat_ref = chat_ref.split("a")
    isValidChatRef = chat_ref.length === 4 && ["0", "1"].includes(chat_ref[3])
    let user_id
    let query_id 
    let passive_user_id 
    let chat_ref_code
    if(isValidChatRef) {
        query_id = chat_ref[0]
        let passed_index = parseInt(chat_ref[3])
        let active_user_index = passed_index === 0 ? 1 : 2 
        let passive_user_index = active_user_index === 1 ? 2 : 1
        user_id = chat_ref[active_user_index]
        passive_user_id = chat_ref[passive_user_index]
    }
    
    if(!query_id || !user_id) {
        isValidChatRef = false 
    }

    if(isValidChatRef) {
        chat_ref_code = chat_ref.slice(0, 3).join("-")
    }

    const messagesEndRef = useRef(null)
    const [chat_id, setChatId] = useState(null)
    const [messages, setMessages] = useState([])
    const [currentMessage, setCurrentMessage] = useState("")

    function loadChatMessages() {
        const q = query(
            collection(firebase_service.db, 'post_chat_messages'),
            where('chat_id', '==', chat_id),
            orderBy('createdAt'),
            limit(50)
        )

        const unsub = onSnapshot(q, snapshot => {
            let msgs = []
            snapshot.forEach(doc => {
                const data = doc.data()
                msgs.push({ 
                    ...data, 
                    id: doc.id,
                    type: data.user_id === user_id ? MessageType.ACTIVE : MessageType.PASSIVE
                })
            })
            console.log(msgs)
            setMessages(msgs)
        })

        return () => unsub()  
    }

    useEffect(() => {
        if(!chat_id && isValidChatRef && chat_ref_code) {
            console.log('GONNA QUERY chat_id')
            const chat = query(
                collection(firebase_service.db, 'post_chats'),
                where('ref_code', "==", chat_ref_code)
            )
            onSnapshot(chat, snapshot => {
                if(snapshot.size !== 0) {
                    const doc = snapshot.docs[0]
                    console.log("chat_id:::", doc.id) 
                    setChatId(doc.id)
                }
            })
        }
    }, [])

    useEffect(() => {
        if(chat_id) {
            loadChatMessages()
        }
    }, [chat_id])

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    function scrollToBottom() {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    async function firebase_add_message(message) {
        const ref = await addDoc(collection(firebase_service.db, "post_chat_messages"), {
            chat_id: chat_id,
            content: message.content,
            type: MessageContentType.TEXT,
            status: MessageStatus.SENT,
            user_id: user_id,
            createdAt: serverTimestamp()
        })
        try {
            axios.post("https://rogvftzrsuaealt3f7htqchmfa0zfumz.lambda-url.eu-west-1.on.aws/post/chat/on", {
                event: "user_sent_message",
                query_id: query_id,
                active_user_id: user_id,
                passive_user_id: passive_user_id,
                source: 'app',
                message: message.content,
                chat_id: chat_id
            })
        } catch(e) {
            console.log('api error')
            console.log(e)
        }
        return ref?.id 
    }
    
    function onSend(e) {
        e.preventDefault()
        const msg = currentMessage?.trim()
        if(!msg || msg.length === 0) {
            return;
        }
        const uuid = Date.now().toString()
        const message = {
            type: MessageType.ACTIVE,
            content: msg,
            status: MessageStatus.PENDING,
            uuid: uuid 
        }
        setMessages(old => ([ ...old, message ]))
        firebase_add_message(message).then(res => {
            setMessages(old => old.map(item => {
                if(item.uuid === uuid) {
                    return { 
                        ...item, 
                        id: res,
                        status: MessageStatus.SENT  
                    }
                }
                return item 
            }))
        })
        setCurrentMessage(null)
    }

    function formatDate(message) {
        if(message.createdAt) {
            let date = message.createdAt.toDate()
            if(date instanceof Date) {
                const month_date = date.getDate()
                const month = date.getMonth()
                let hour = date.getHours()
                hour = hour % 12 
                hour = hour ? hour : 12 
                const minutes = date.getMinutes()
                const ampm = hour >= 12 ? "pm" : "am"
                const now = new Date()
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                let res = ""
                if(now.getDate() !== month_date) {
                    res = `${months[month]} ${month_date}, `
                } else {
                    res = "Today "
                }
                let mins = minutes.toString().length === 1 ? `0${minutes.toString()}` : minutes.toString()
                let hrs = hour.toString().length === 1 ? `0${hour.toString()}` : hour.toString()
                res += `${hrs}:${mins} ${ampm}`
                return res 
            }
        }
        return ""
    }

    return (  
        <div className="relative overflow-hidden">
            <Header />
            
            {isValidChatRef && <main className="box-border">
                <div 
                    id="message-box"
                    className="h-[60vh] overflow-y-auto border-2 border-slate-200 bg-slate-50 rounded m-1"
                >
                    <ul className="relative">
                        { messages && messages.map((message, index) => (
                            <li key={index} className={"flex items-center " + (message.type === MessageType.PASSIVE ? "justify-start" : "justify-end")}>
                                <div className={"inline-flex flex-col max-w-[70%] " + (message.type === MessageType.PASSIVE ? "order-2" : "order-1")}>
                                    <div className={"bg-slate-200 py-2 px-4 rounded-lg mt-3 mb-1 text-black"}>
                                        <span>{message.content}</span>
                                    </div>
                                    <div className={"text-[10px] text-gray-500 " + (message.type === MessageType.PASSIVE ? "text-left ml-2" : "text-right mr-1")}>
                                        {formatDate( message )}
                                    </div>
                                </div>
                                
                                <span className={(message.type === MessageType.PASSIVE ? "order-1" : "order-2") + " block"}>
                                    {
                                        message.type === MessageType.PASSIVE 
                                        ? <img src={AppImages.msgDelivered} alt="delivered" className="w-[15px] svg-green mx-1" />
                                        : message.status === MessageStatus.PENDING
                                        ? <img src={AppImages.msgPending} alt="pending" className="w-[18px] mx-1" />
                                        : message.status === MessageStatus.SENT 
                                        ? <img src={AppImages.msgSent} alt="sent" className="w-[15px] mx-1" />
                                        : message.status === MessageStatus.DELIVERED
                                        ? <img src={AppImages.msgDelivered} alt="delivered" className="w-[15px] svg-green mx-1" />
                                        : message.status === MessageStatus.FAILED
                                        ? <img src={AppImages.msgError} alt="failed" className="w-[15px] svg-red mx-1" />
                                        : <></>
                                    }
                                </span>
                            </li>
                        )) }
                        
                    </ul>
                    <div ref={messagesEndRef} />
                </div>
                <div id="chat-box">
                    <form onSubmit={onSend}>
                        <div className="relative box-border my-2 mx-1 border-2 border-slate-200 rounded bg-slate-50 w-full">
                            <input 
                                type="text" 
                                className=" box-border p-3 block w-[80%] bg-slate-50 outline-none focus:outline-none" 
                                placeholder="Write message.."
                                onChange={e => {
                                    setCurrentMessage(e.target.value)
                                }}
                                value={currentMessage ?? ""}
                            />
                            <button
                                className="absolute right-0 top-[50%] translate-x-[-5%] translate-y-[-50%] py-2 px-4 bg-blue rounded text-white"
                            >SEND</button>
                        </div>
                    </form>
                </div>
            </main>}
            <div className="fixed bottom-0 left-0 w-full">
                <Footer />
            </div>
        </div>
    );
}

export default ChatScreen;