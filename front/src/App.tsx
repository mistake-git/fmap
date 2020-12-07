import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./Auth";
import Map from "./pages/Map";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Posts from "./pages/posts/Posts";
import PostsShow from "./pages/posts/PostsShow";
import PostsNew from "./pages/posts/PostsNew";
import Mypage from "./pages/users/MyPage";
import Users from "./pages/users/Users";
import PostsEdit from "./pages/posts/PostsEdit";


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
        　<Route exact path="/" component={Map} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id/edit" component={PostsEdit} />
          <Route exact path="/mypages/:id" component={Mypage} />
          <Switch>
            <Route exact path="/posts/new" component={PostsNew} />
            <Route exact path="/posts/:id" component={PostsShow} />
          </Switch>
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
