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

const App: React.FC = () => {

  const handleFlash = (flashMessage: string, flashSeverity: 'success'| 'error'| 'info'| undefined)  =>　{
    setShowFlash(true)
    setMessage(flashMessage)
    setSeverity(flashSeverity)
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowFlash(false);
  };

  const [showFlash, setShowFlash] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<undefined | 'success' | 'error' | 'info'>(undefined);

  return (
    <Router>
      {showFlash &&
        <FlashAlert
        message={message}
        severity={severity}
        handleClose={handleClose}
        />
      }
      <AuthProvider>
        <CurrentUserProvider
          handleFlash={handleFlash}
        >
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
                  handleFlash={handleFlash}
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
                  handleFlash={handleFlash}
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
                  handleFlash={handleFlash}
                  history={history}
                />
              )} 
            />
            <Route exact path="/users" component={Users} />
            <Route exact path="/posts" component={Posts} />
            <Route 
              exact path="/posts/:id/edit" 
              render={({ 
                match,
                history 
              }) => (
                <PostsEdit 
                  match={match} 
                  handleFlash={handleFlash}
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
                  handleFlash={handleFlash}
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
                    handleFlash={handleFlash}
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
                    handleFlash={handleFlash}
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
                    handleFlash={handleFlash}
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