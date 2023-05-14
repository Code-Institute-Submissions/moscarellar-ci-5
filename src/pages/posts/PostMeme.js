import React, {useState} from "react";
import styles from "../../styles/PostMeme.module.css"
import Uploader from "../../components/Uploader";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";


const PostMeme = ({ profession }) => {
  const [postMeme, setPostMeme] = useState({
    imgUrl:
      'https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg',
    text: '',
  })
 
  // Initialize state variables for the selected file and preview image
 const [selectedFile, setSelectedFile] = useState(null)
 const [previewImage, setPreviewImage] = useState(null)
 const [errors, setErrors] = useState({});
 const history = useHistory();


 // Define a function to handle file input changes
 const handleFileInputChange = (event) => {
   // Get the selected file from the input event
   const file = event.target.files[0]
   // Update the selected file state variable
   setSelectedFile(file)
   // Set the preview image URL using the file object
   setPreviewImage(URL.createObjectURL(file))
 }
 
  console.log(postMeme)
 
 
  const onChangeText = (event) => {
    const value = event.target.value
    setPostMeme({ ...postMeme, text: value })
  }

  const onSubmitMeme = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", postMeme.text);
    formData.append("image", selectedFile);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };
 
  return (
    <div className={styles.postMemePage}>
      <div className={styles.imageWrapper}>
        {/* <img src={postMeme.imgUrl} /> */}
        <Uploader selectedFile={selectedFile} previewImage={previewImage} handleFileInputChange={handleFileInputChange}/>
        <p>{postMeme.text}</p>
      </div>
      <input
        className={styles.input}
        value={postMeme.text}
        onChange={onChangeText}
      />
      <button onClick={onSubmitMeme} className={styles.createMemeButton}>Create Meme</button>
      </div>
  )
 }
 
 
 export default PostMeme