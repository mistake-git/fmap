import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Test from "./pages/Test";
import Posts from "./pages/posts/Posts";
import PostsShow from "./pages/posts/PostsShow";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id" component={PostsShow} />
          <Route exact path="/test" component={Test} />
        </AuthProvider>
      </Switch>
    </Router>
  );
};

export default App;
