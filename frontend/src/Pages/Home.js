import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../component/Authentication/Login";
import Signup from "../component/Authentication/Signup";
import { useHistory } from "react-router-dom";
import "../component/Authentication/CSS File/Login.css";
const Home = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <Container>
      <Box
        boxShadow="-5px -5px 10px rgba(255, 255, 255, 0.05),
        5px 5px 15px rgba(0, 0, 0, 0.5)"
        d="flex"
        justifyContent="center"
        p={3}
        m="14px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        borderColor={"#131419"}
        w="100%"
      >
        <Text fontSize="2xl" textAlign={"center"} color={"white"}>
          Chat App
        </Text>
      </Box>
      <Box
        w="100%"
        p={5}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={"#131419"}
        boxShadow="-5px -5px 10px rgba(255, 255, 255, 0.05),
        5px 5px 15px rgba(0, 0, 0, 0.5)"
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab color={"white"} fontSize="18px">
              Login
            </Tab>
            <Tab color={"white"} fontSize="18px">
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
