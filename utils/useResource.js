import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const useResource = (resourceUrl) => {
  const [resource, setResource] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get(resourceUrl)
        .then((res) => setResource(res.data))
        .catch((err) => console.log(err.response));
    })();
  }, [resourceUrl]);

  return resource;
};
