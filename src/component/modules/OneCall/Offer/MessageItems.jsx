import { useCallback, useState } from "react";

export function SingleMessageWrapper({ children, dateTime, messageId, onClick }) {
  return (  
    <div className="mb-2 w-full" data-messageid={messageId} onClick={onClick}>
      {children}
      {dateTime ? <MessageDateTime dateTime={dateTime} /> : <></>}
    </div>
  );
}

export function MessageDateTime({ dateTime }) {
  const getHours = useCallback((dt) => {
    let h = dt.getHours() % 12
    h = h ? h : 12
    return h.toString().length === 1 ? `0${h}` : h.toString()
  })
  const getMinutes = useCallback((dt) => {
    let m = dt.getMinutes().toString()
    return m.length === 1 ? `0${m}` : m
  })
  const getMonthAbbr = useCallback((dt) => {
    const arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return arr[dt.getMonth()]
  })
  const getDate = useCallback((dt) => {
    const d = dt.getDate().toString()
    return d.length === 1 ? `0${d}` : d
  })
  const getYear = useCallback((dt) => {
    const y = dt.getFullYear()
    const now = new Date()
    return y === now.getFullYear() ? "" : y.toString()
  })
  const getAMPM = useCallback((dt) => {
    return dt.getHours() > 12 ? "pm" : "am"
  })
  if(dateTime instanceof Date) {
    const today = new Date()
    const time = dateTime
    
    if(today-time < 3.6e+6) {
      dateTime = getHours(dateTime) + ":" + getMinutes(dateTime) + " " + getAMPM(dateTime)
    } else {
      const yr = getYear(dateTime)
      dateTime = getDate(dateTime) + " " + getMonthAbbr(dateTime) + (yr ? ` ${yr}` : '') + ", " +  getHours(dateTime) + ":" + getMinutes(dateTime) + " " + getAMPM(dateTime)
    }
  }
  return (  
    <div className="text-right text-gray-500 text-[10px] mx-2 my-1">{dateTime}</div>
  );
}

export function SingleTextMessage({ text, dateTime, messageId, onClick }) {
  return (  
    <SingleMessageWrapper dateTime={dateTime} messageId={messageId} onClick={onClick}>
      <div className="flex flex-row justify-end">
        <div className="px-4 py-1 border-[1px] border-slate-200 bg-slate-50 inline-block rounded-lg">
          <span>{text}</span>
        </div>
      </div>
    </SingleMessageWrapper>
  );
}

export function SingleImageMessage({ imageUrl, dateTime }) {
  const [isLoaded, setIsLoaded] = useState(false)
  return (  
    <SingleMessageWrapper dateTime={dateTime}>
      <div className="flex flex-col items-end">
        <div className={(isLoaded ? "hidden" : "block") + " bg-gray-200 animate-pulse w-[200px] h-[100px] rounded-lg"}></div>
        <img 
          className={"max-h-[200px] max-w-[80%] inline-block rounded-lg" + (isLoaded ? " block" : " hidden")}
          src={imageUrl} 
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </SingleMessageWrapper>
  );
}

export function SingleAudioMessage({ audioUrl, dateTime }) {
  return (  
    <SingleMessageWrapper dateTime={dateTime}>
      <div className="flex flex-col items-end">
        <audio 
          src={audioUrl}
          controls
          controlsList="nodownload noplaybackrate"
        >
        </audio>
      </div>
    </SingleMessageWrapper>
  );
}

