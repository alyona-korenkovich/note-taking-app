import { ERROR_GLOBAL } from '../const/errors';
import { useState } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);

  const request = async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
        headers.Accept = 'application/json';
      }
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();

      if (!response.ok) {
        if (data.message === 'Token expired') {
        } else {
          throw new Error(data.message || ERROR_GLOBAL);
        }
      }

      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  return { request, loading };
};
