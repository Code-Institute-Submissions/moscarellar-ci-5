import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";


const PostMeme = () => {
  const [image, setImage] = useState(null);
  const [upperText, setUpperText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const history = useHistory();

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    setImage(imageFile);
  };

  const handleUpperTextChange = (event) => {
    setUpperText(event.target.value);
  };

  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("upperText", upperText);
    formData.append("bottomText", bottomText);

    try {
      const response = await axiosReq(formData);
      const data = response.data;
      alert("Meme posted successfully.");
      history.push(`/posts/${data.id}`);
    } catch (error) {
      alert("Error posting meme: " + error.message);
    }

    setImage(null);
    setUpperText("");
    setBottomText("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-3">
          <Form.Group>
            <Form.Label>Select an image:</Form.Label>
            <Form.Control type="file" onChange={handleImageUpload} />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col className="py-3">
          <Form.Group>
            <Form.Label>Upper text:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter upper text"
              value={upperText}
              onChange={handleUpperTextChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col className="py-3">
          <Form.Group>
            <Form.Label>Bottom text:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter bottom text"
              value={bottomText}
              onChange={handleBottomTextChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col className="py-3">
          <Button type="submit">Post Meme</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PostMeme;
