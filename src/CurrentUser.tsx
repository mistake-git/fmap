import React, { createContext, useEffect, useState, useContext } from "react";
import auth from "./plugins/firebase";
import UserModel from "./models/UserModel";
import UsersRepository from "./repositories/UsersRepository";
import { AuthContext } from './Auth'
import { useDispatch } from "react-redux";
import { updateMessage, updateOpen, updateSeverity } from "./actions/FlashActions";

const CurrentUserContext = createContext<any | null>(null);

const CurrentUserProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState<UserModel | null >(null);
  const { firebaseAuthUser } = useContext(AuthContext)
  const dispatch = useDispatch()

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
          dispatch(updateMessage('サーバーに接続できませんでした。もう一度やり直してください'))
          dispatch(updateSeverity('error'))
          dispatch(updateOpen(true))
        })
        const firebaseAuthUser = user
        firebaseAuthUser
          ?.getIdToken(true)
          .then((idToken) => {
            console.log(idToken)
            localStorage.setItem('id-token', idToken)
          })
          .catch((error) => {
            console.log(error)
          })
      });
    }
  }, [firebaseAuthUser, props, dispatch]);
  
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
