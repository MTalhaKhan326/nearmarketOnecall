import { uuidv4 } from "@firebase/util";
import { createContext, useState } from "react";
import { Outlet } from "react-router";

export const MessageTypes = {
  TEXT: 'text',
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video'
}

export const CreateOfferContext = createContext({
  messages: [],
  setMessages: (msgs) => {},
  addMessage: (msg) => {},
  removeMessage: (id) => {},
  addTextMessage: (text) => {}
})

function CreateOfferContextProvider() {
  // Message array
  // - Single message structure
  // -- type: text, image, audio, video
  // -- content: string | url
  // -- file: File object for image, audio, video
  // -- date: Date object 
  // -- id: string (dont append while adding message)
  const [messages, setMessages] = useState([])
  
  const value = {
    messages,
    setMessages,
    addMessage: (msg) => setMessages([...messages, msg]),
    removeMessage: (id) => setMessages(msgs => msgs.filter(msg => msg?.id !== id)),
    addTextMessage: (text) => value.addMessage({
      type: MessageTypes.TEXT,
      content: text,
      date: new Date(),
      id: uuidv4()
    })
  }

  return (  
    <CreateOfferContext.Provider value={value}>
      <Outlet />
    </CreateOfferContext.Provider>
  );
}

export default CreateOfferContextProvider;
