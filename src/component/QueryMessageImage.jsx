function QueryMessageImage({ imageUrl, onClick }) {
    return (  
        <div onClick={onClick}>
            <img
                src={imageUrl}
                alt="Image"
                className=" rounded-md object-cover mb-2"
            />
        </div>
    );
}

export default QueryMessageImage;