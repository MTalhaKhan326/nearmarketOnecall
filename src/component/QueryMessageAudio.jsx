function QueryMessageAudio({ audioUrl }) {
    return (  
        <div className="mb-2">
            <audio controls className="w-full">
                <source src={audioUrl} type="audio/mp3" />
            </audio>
        </div>
    );
}

export default QueryMessageAudio;