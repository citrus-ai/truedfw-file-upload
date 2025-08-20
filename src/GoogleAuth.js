import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleAuth = ({ onSignIn }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const login = useGoogleLogin({
    onSuccess: codeResponse => {
      onSignIn(codeResponse.access_token);
      setIsSignedIn(true);
    },
    scope: 'https://www.googleapis.com/auth/drive',
  });

  return (
    <div>
      {isSignedIn ? (
        <p>You are now signed in!</p>
      ) : (
        <button className="btn btn-primary" onClick={() => login()}>
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;