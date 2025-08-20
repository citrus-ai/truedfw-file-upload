import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleAuth = ({ onSignIn }) => {
  const login = useGoogleLogin({
    onSuccess: codeResponse => onSignIn(codeResponse.access_token),
    scope: 'https://www.googleapis.com/auth/drive',
  });

  return (
    <button className="btn btn-primary" onClick={() => login()}>
      Sign in with Google
    </button>
  );
};

export default GoogleAuth;
