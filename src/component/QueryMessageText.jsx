function QueryMessageText({ text }) {
    return (  
        <div className="flex justify-between items-start bg-[#d9e8fb] mt-[5px] mb-[10px] px-[10px] py-[10px] rounded-[10px]">
            <div>
                <p className='text-[14px] text-black'>{text}</p>
            </div>
        </div>
    );
}

export default QueryMessageText;