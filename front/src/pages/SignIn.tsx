import React, { useContext, useEffect } from "react";
import SignInForm from '../components/auth/SignInForm';
import AuthTemplate from '../components/layouts/AuthTemplate';
import { AuthContext } from "../Auth";


export default function SiginIn(props: any) {

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // if logged in, redirect to home
    currentUser && props.history.push("/");
  }, [currentUser]);

  return (
    <AuthTemplate　title="ログイン">
       <SignInForm/>
    </AuthTemplate>
  );
}