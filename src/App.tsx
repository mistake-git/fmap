import "./App.css";
import React ,{ useState,} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./Auth";
import {CurrentUserProvider} from "./CurrentUser"
import Map from "./pages/Map";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Posts from "./pages/posts/Posts";
import PostsShow from "./pages/posts/PostsShow";
import PostsNew from "./pages/posts/PostsNew";
import Mypage from "./pages/users/MyPage";
import Users from "./pages/users/Users";
import PostsEdit from "./pages/posts/PostsEdit";
import FlashAlert from "./components/layouts/FlashAlert";
import PasswordEdit from "./pages/users/PasswordEdit";
import NotFound from "./pages/NotFound";
import Rankings from "./pages/rankings/Rankings";
import Feed from "./pages/users/Feed";
import Notifications from "./pages/Notifications";
import Contact from "./pages/Contact";

const App: React.FC = () => {


  return (
    <Router>

      <FlashAlert/>
      
      <AuthProvider>
        <CurrentUserProvider>
          <Switch>
            <Route exact path="/" component={Map} />
            <Route 
              exact path="/signin" 
              render={({ 
                match,
                history 
              }) => (
                <SignIn 
                  match={match} 
                  history={history}
                />
              )} 
            />
            <Route 
              exact path="/contact" 
              render={({ 
                match,
                history 
              }) => (
                <Contact
                  match={match} 
                  history={history}
                />
              )} 
            />
            <Route 
              exact path="/signup" 
              render={({ 
                match,
                history 
              }) => (
                <SignUp 
                  match={match} 
                  history={history}
                />
              )} 
            />
            <Route 
              exact path="/password" 
              render={({ 
                match,
                history 
              }) => (
                <PasswordEdit 
                  match={match} 
                  history={history}
                />
              )} 
            />
            <Route exact path="/users" component={Users} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/feed" component={Feed} />
            <Route 
              exact path="/notifications" 
              render={({ 
                match,
                history 
              }) => (
                <Notifications 
                  match={match}
                  history={history}
                />
              )} 
            />
            <Route 
              exact path="/posts/:id/edit" 
              render={({ 
                match,
                history 
              }) => (
                <PostsEdit 
                  match={match} 
                  history={history}
                />
              )} 
            />
            <Route 
              exact path="/mypages/:id" 
              render={({ 
                match,
                history 
              }) => (
                <Mypage 
                  match={match} 
                  history={history}
                />
              )} 
            />
            <Switch>
              <Route 
                exact path="/posts/new" 
                render={({ 
                  match,
                  history 
                }) => (
                  <PostsNew
                    match={match} 
                    history={history}
                  />
                )} 
              />
              <Route 
                exact path="/posts/:id" 
                render={({ 
                  match,
                  history 
                }) => (
                  <PostsShow 
                    match={match} 
                    history={history}
                  />
                )} 
              />
              <Route 
                exact path="/posts/:id/rankings" 
                render={({ 
                  match,
                  history 
                }) => (
                  <Rankings 
                    match={match} 
                    history={history}
                  />
                )} 
              />
            </Switch>
            <Route component={NotFound} />
          </Switch>
        </CurrentUserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
