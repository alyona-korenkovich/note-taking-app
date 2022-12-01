import { useState, useEffect, useCallback } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    console.log(jwtToken, id);
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        id: id,
        accessToken: jwtToken,
      }),
    );
  }, []);

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.accessToken) {
      login(data.accessToken, data.id);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
