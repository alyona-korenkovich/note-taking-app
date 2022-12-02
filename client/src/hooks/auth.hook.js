import { useState, useEffect, useCallback } from 'react';
import { TOKEN } from '../const/localStorage';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      TOKEN,
      JSON.stringify({
        id: id,
        accessToken: jwtToken,
      }),
    );
  }, []);

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(TOKEN);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(TOKEN));
    if (data && data.accessToken) {
      login(data.accessToken, data.id);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
