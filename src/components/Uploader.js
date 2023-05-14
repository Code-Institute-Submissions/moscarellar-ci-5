import { useState } from 'react'
import styles from "../styles/Uploader.module.css"






// Define a functional component called PictureUploader
const Uploader = ({selectedFile, previewImage, handleFileInputChange, setSelectedFile, setPreviewImage}) => {
 


 // Define a function to handle removing the selected file and preview image
 const handleRemoveImage = () => {
   // Clear the selected file state variable
   setSelectedFile(null)
   // Clear the preview image URL state variable
   setPreviewImage(null)
 }


 // Render the picture uploader component
 return (
   <div>
     {previewImage ? (
       // If a preview image is available, render it and a remove button
       <div>
         <img src={previewImage} alt="Preview" />
         <button onClick={handleRemoveImage}>Remove</button>
       </div>
     ) : (
       // If a preview image is not available, render an input element
       <div>
         <label htmlFor="uploader" className={styles.placeholder}>
           {/* Colar Imagem aqui  */}
           Upload a photo for your MEME
         </label>
         <input
           id="uploader"
           className={styles.inputUploader}
           type="file"
           onChange={handleFileInputChange}
         />
         {selectedFile && <p>{selectedFile.name}</p>}
       </div>
     )}
   </div>
 )
}


// Export the PictureUploader component as the default export of this module
export default Uploader;


