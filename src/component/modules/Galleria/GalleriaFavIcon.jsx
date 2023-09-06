import { useEffect } from "react";
import { AppImages } from "../../../Asset/images/image.js";

function GalleriaFavIcon() {
  useEffect(() => {
    // Create a new favicon link element
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = AppImages.galleriaDesignsFavIcon32x32; // Replace with your favicon path

    // Find existing favicon link element (if any)
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (existingFavicon) {
      // Replace the existing favicon link with the new one
      document.head.removeChild(existingFavicon);
    }

    // Append the new favicon link to the head
    document.head.appendChild(link);

    // Clean up on component unmount
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  return (  
    <></>
  );
}

export default GalleriaFavIcon;