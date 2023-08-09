import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../component/Chatbox";
import MyChats from "../component/MyChats";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%", background: "#a8bcff" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
