import React, { createContext, useEffect, useState } from "react";
import auth from "./plugins/firebase";
import UserModel from "./models/UserModel";
import { myHttpClient } from "./plugins/axios";


const UserContext = createContext<any | null>(null);

const UserProvider = (props: any) => {
  const [user, setUser] = useState<UserModel | null >(null);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      myHttpClient.get(`/users/${user?.uid}`)
      .then((results) => {
        console.log(results)
        setUser(results.data)
      })
      .catch((data) =>{
        console.log(data.user)
      })
    });
  }, []);
  
  return (
    <UserContext.Provider
      value={{
        user: user
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
