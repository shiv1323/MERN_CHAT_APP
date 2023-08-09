import { Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import ChatsPage from "./Pages/Chatpage";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/chats" component={ChatsPage} />
    </Switch>
  );
}

export default App;
