function VideoSection({ videoUrl }) {
    return (  
        <div>
            <iframe
            className="w-[100%] h-[200px] sm:h-[300px] border-[100%] border-2"
            src={videoUrl}
            title="YouTube video player"
            ></iframe>
        </div>
    );
}

export default VideoSection;