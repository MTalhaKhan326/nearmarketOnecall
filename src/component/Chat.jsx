import React from 'react'
import QueryMessageText from './QueryMessageText';
import QueryMessageImage from './QueryMessageImage';
import QueryMessageAudio from './QueryMessageAudio';
import QueryMessageVideo from './QueryMessageVideo';

const Chat = ({ queryMessages = [] }) => {
  
  return (
    <div
      className="border-[1px] border-[#288fcc] p-[5px] rounded-[5px] bg-[#288fcc11] overflow-y-auto"
      style={{ maxHeight: "60vh" }}
    >
      {queryMessages?.map((item) => (
        <div key={item.id}>
          {(item.type.toLowerCase() === "text" && (
            <QueryMessageText text={item.content} />
          )) ||
            (item.type.toLowerCase() === "image" && (
              <QueryMessageImage imageUrl={item.content} />
            )) ||
            (item.type.toLowerCase() === "audio" && (
              <QueryMessageAudio audioUrl={item.content} />
            )) ||
            (item.type.toLowerCase() === "video" && (
              <QueryMessageVideo videoUrl={item.content} />
            ))}
        </div>
      ))}
    </div>
  );
}

export default Chat