import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Asset from "../../components/Asset";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function PostMeme() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    image: "",
    textTop: "",
    textBottom: "",
  });
  const { image, textTop, textBottom } = postData;
  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { image, is_owner } = data;

        is_owner ? setPostData({ image }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChangeImage = (files) => {
    setPostData({
      ...postData,
      image: files[0],
    });
  };

  const handleChangeTextTop = (event) => {
    setPostData({
      ...postData,
      textTop: event.target.value,
    });
  };

  const handleChangeTextBottom = (event) => {
    setPostData({
      ...postData,
      textBottom: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (image) {
      formData.append("image", image);
    }

    if (textTop) {
      formData.append("text_top", textTop);
    }

    if (textBottom) {
      formData.append("text_bottom", textBottom);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Top Text</Form.Label>
        <Form.Control
          type="text"
          name="textTop"
          value={textTop}
          onChange={handleChangeTextTop}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Bottom Text</Form.Label>
        <Form.Control
          type="text"
          name="textBottom"
          value={textBottom}
          onChange={handleChangeTextBottom}
        />
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostMeme;