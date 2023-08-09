import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { MenuList, MenuItem, MenuButton, Menu } from "@chakra-ui/menu";
import { BellIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/Chatlogic";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Avatar, Tooltip } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import ChatIcon from "@material-ui/icons/Chat";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ProfileModal from "./miscellaneous/ProfileModal";
import SideDrawer from "./miscellaneous/SideDrawer";
import { useHistory } from "react-router-dom";
import NotificationBadge, { Effect } from "react-notification-badge";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const history = useHistory();
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.tokens}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      w={{ base: "100%", md: "31%" }}
      height="80%"
      borderRadius="lg"
      borderWidth="1px"
      ml="5%"
      bg="#2e2c52"
      color="white"
      boxShadow="-1px 4px 20px -6px rgba(0, 0, 0, 0.75)"
      border="none"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="flex-end"
        alignItems="center"
        padding="12px"
      >
        <div style={{ marginRight: "39%" }}>
          <ProfileModal user={user}>
            <Avatar src={user.pic} cursor="pointer" />
          </ProfileModal>
        </div>

        <SideDrawer>
          <IconButton>
            <Tooltip label="New chat">
              <ChatIcon style={{ color: "#a9baf9" }} />
            </Tooltip>
          </IconButton>
        </SideDrawer>

        <GroupChatModal>
          <Tooltip label="Group">
            <IconButton style={{ display: "flex" }}>
              <GroupAddIcon style={{ color: "#a9baf9", fontSize: "30px" }} />
            </IconButton>
          </Tooltip>
        </GroupChatModal>
        <Menu>
          <MenuButton p={1}>
            <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            />

            <BellIcon fontSize="3xl" m={1} color="#a9baf9" />
          </MenuButton>
          <MenuList pl={2} color="black" fontSize="18px">
            {!notification.length && "No New Messages"}
            {notification.map((notif) => (
              <MenuItem
                key={notif._id}
                onClick={() => {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n) => n !== notif));
                }}
              >
                {notif.chat.isGroupChat
                  ? `New Message in ${notif.chat.chatName}`
                  : `New Message from ${getSender(user, notif.chat.users)}`}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <IconButton onClick={logoutHandler}>
          <Tooltip label="Logout">
            <ExitToAppIcon style={{ color: "#a9baf9" }} />
          </Tooltip>
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        bg="#3e3d63"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
