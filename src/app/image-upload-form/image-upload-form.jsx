import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { fetchUserMovieImageList } from "../../features/movies";
import MyflixAPIService from "../../services/myflixAPI.service";

const ImageUploadForm = ({ userId, movieId, token }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const inputRef = useRef(null);

  const wait = (msec) =>
    new Promise((resolve, _) => {
      setTimeout(resolve, msec);
    });

  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  const handleChange = async (event) => {
    event.preventDefault();
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const hadnleUploadClick = async (event) => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const response = await MyflixAPIService.uploadUserMovieImage(
      userId,
      movieId,
      formData,
      token
    );
    if (response.$metadata.httpStatusCode === 200) {
      alert("Image uploaded successfully!");
      setFile("");
      resetFileInput();
      await wait(6000);
      dispatch(fetchUserMovieImageList({ userId, movieId, token }));
    }
  };

  return (
    <>
      <Col className="d-flex align-items-start">
        <Form.Group controlId="formFile" className="me-2">
          <Form.Control
            type="file"
            accept=".jpg, .jpeg, .png"
            ref={inputRef}
            onChange={handleChange}
          />
        </Form.Group>
        <Button onClick={hadnleUploadClick}>Upload</Button>
      </Col>
    </>
  );
};

export default ImageUploadForm;
