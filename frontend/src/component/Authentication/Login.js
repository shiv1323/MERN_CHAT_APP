import React, { useState } from "react";
import "../Authentication/CSS File/Login.css";
import { Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const toast = useToast();

  // creating state
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  // handling hide and show password
  const handleClick = () => setShow(!show);

  //   for sumbitting the form
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(!loading);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/user/login`,
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
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
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <div className="input">
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
          <Button
            colorScheme="#131419"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            className="input"
          >
            Sign Up
          </Button>
        </div>
        <div className="inputBox">
          <Button
            colorScheme="#131419"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={() => {
              setEmail("guest@example.com");
              setPassword("1234567@12");
            }}
            className="input"
          >
            Get Guest User Credentials
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
