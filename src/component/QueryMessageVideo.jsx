function QueryMessageVideo({ videoUrl }) {
    return (  
        <div>
            <video controls className="mb-2 rounded-md w-full h-[150px]">
                <source src={videoUrl} type="video/mp4" />
            </video>
        </div>
    );
}

export default QueryMessageVideo;