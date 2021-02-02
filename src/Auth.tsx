import { User } from "firebase";
import React, { createContext, useEffect, useState } from "react";
import auth from "./plugins/firebase";

interface IAuthContext {
  firebaseAuthUser: User | null | undefined;
}

const AuthContext = createContext<IAuthContext>({ firebaseAuthUser: undefined });

const AuthProvider = (props: any) => {
  const [firebaseAuthUser, setFirebaseAuthUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setFirebaseAuthUser(user);
    });
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        firebaseAuthUser: firebaseAuthUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
