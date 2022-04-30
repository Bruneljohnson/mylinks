import { useCallback, useState } from "react";

const TIMEOUT = (sec) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request Failed! Session Timeout after ${sec} seconds`));
    }, sec * 1000);
  });
};

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [finished, setFinished] = useState(false);

  const sendRequest = useCallback(async (requestConfig, dataGrabber) => {
    setIsLoading(true);
    try {
      const { url, method, headers, body } = requestConfig;
      const response = await Promise.race([
        fetch(url, {
          method: method ?? `GET`,
          body: JSON.stringify(body) ?? null,
          headers: headers ?? {},
        }),
        TIMEOUT(10),
      ]);

      if (!response.ok) throw new Error(`${response.status}`);

      /* HANDLE RESPONSES FROM DELETE REQUESTS */
      let result;
      if (response.status === 204) {
        result = await response.text();
      } else {
        result = await response?.json();
      }

      dataGrabber(result);
      setFinished(true);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    finished,
    sendRequest,
  };
};

export default useHttp;
