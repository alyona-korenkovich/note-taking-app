import Head from 'next/head';
import '../styles/app.css';

import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/auth.hook';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;

  if (!ready) {
    return <>Loading..</>;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" crossOrigin="use-credentials" href="/site.webmanifest" />
        <title>Note-taking app</title>
      </Head>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
