import "./App.css";
import React ,{ useState,} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./Auth";
import {UserProvider} from "./User"
import Map from "./pages/Map";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Posts from "./pages/posts/Posts";
import PostsShow from "./pages/posts/PostsShow";
import PostsNew from "./pages/posts/PostsNew";
import Mypage from "./pages/users/MyPage";
import Users from "./pages/users/Users";
import PostsEdit from "./pages/posts/PostsEdit";
import FlashAlert from "./components/layouts/FlashAlert";


const App: React.FC = () => {

  const handleFlash = (flashMessage: string, flashSeverity: any)  =>　{
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
  const [severity, setSeverity] = useState<undefined | 'success' | 'error' >(undefined);

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
        <UserProvider>
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
            </Switch>
          </Switch>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
