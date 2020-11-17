import { User } from "firebase";
import React, { createContext, useEffect, useState } from "react";
import auth from "./plugins/firebase";
import axios from 'axios'

interface IAuthContext {
  currentUser: User | null | undefined;
}

const AuthContext = createContext<IAuthContext>({ currentUser: undefined });


const AuthProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  const [user, setUser] = React.useState('')

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      axios.get(`http://localhost:3000/api/v1/users/${user?.uid}`)
      .then((results) => {
        console.log(results)
        setUser(results.data)
      })
      .catch((data) =>{
        console.log(data)
      })
    });
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
