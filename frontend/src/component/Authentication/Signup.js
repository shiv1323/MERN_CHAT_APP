import React, { useState } from "react";
import "../Authentication/CSS File/Login.css";
import { Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  // creating state
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [Confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();

  // handling hide and show password
  const handleClick = () => setShow(!show);

  // for handling the image
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "shiv1323");
      fetch("https://api.cloudinary.com/v1_1/shiv1323/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  //   for sumbitting the form
  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !Confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== Confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/user`,
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="input">
        <div className="inputBox">
          <label>
            Name <span className="danger">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            required
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="inputBox">
          <label>
            Email Address <span className="danger">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            required
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputBox">
          <label>
            Password <span className="danger">*</span>
          </label>
          <InputGroup>
            <input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              minLength={8}
              maxLength={20}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement
              width={"4.5rem"}
              onClick={handleClick}
              color={"white"}
              fontSize={"25px"}
              mt={"5px"}
              cursor={"pointer"}
            >
              {show ? <ViewIcon /> : <ViewOffIcon />}
            </InputRightElement>
          </InputGroup>
        </div>
        <div className="inputBox">
          <label>
            Confirm Password <span className="danger">*</span>
          </label>
          <InputGroup>
            <input
              type={show ? "text" : "password"}
              name="Confirmpassword"
              id="Confirmpassword"
              placeholder="Confirm password"
              required
              minLength={8}
              maxLength={20}
              value={Confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement
              width={"4.5rem"}
              onClick={handleClick}
              color={"white"}
              fontSize={"25px"}
              mt={"5px"}
              cursor={"pointer"}
            >
              {show ? <ViewIcon /> : <ViewOffIcon />}
            </InputRightElement>
          </InputGroup>
        </div>
        <div className="inputBox">
          <label>Upload your Picture</label>
          <input
            type="file"
            accept="image/*"
            style={{ paddingTop: "9px" }}
            name="file"
            id="file"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </div>
        <div className="inputBox">
          <Button
            colorScheme="#131419"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={picLoading}
            className="input"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
