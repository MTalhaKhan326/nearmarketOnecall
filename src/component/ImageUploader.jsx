import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("images[]", image);
    });

    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    const apiEndpoint = "YOUR_API_ENDPOINT";

    axios.post( 'https://bdfqeanazekq5kvfeebnua4h2m0guswz.lambda-url.eu-west-1.on.aws/image/excel', formData)
      .then((response) => {
        console.log("Images uploaded successfully!", response);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;
