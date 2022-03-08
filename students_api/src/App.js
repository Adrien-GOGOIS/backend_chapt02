import "./App.css";

import { Switch, BrowserRouter, Link, Route } from "react-router-dom";

import Home from "./views/Home";
import Message from "./views/Message";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/message" component={Message} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
