import React, { createContext, useEffect, useState, useContext } from "react";
import auth from "./plugins/firebase";
import UserModel from "./models/UserModel";
import UsersRepository from "./repositories/UsersRepository";
import { AuthContext } from './Auth'
import { User } from "firebase";

const CurrentUserContext = createContext<any | null>(null);

const CurrentUserProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState<UserModel | null >(null);
  const { firebaseAuthUser } = useContext(AuthContext)

  useEffect(() => {
    if (firebaseAuthUser !== null) {
      auth.onAuthStateChanged((user) => {
        UsersRepository.getUser(user?.uid)
        .then((results) => {
          console.log(results)
          setCurrentUser(results)
        })
        .catch((data) =>{
          console.log(data.user)
          const message = 'サーバーに接続できませんでした。もう一度やり直してください'
          const severity = 'error'
          props.handleFlash(message, severity)
        })
      });
    }
  }, []);
  
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: currentUser
      }}
    >
      {props.children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserProvider };
