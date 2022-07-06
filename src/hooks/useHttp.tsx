import axios from 'axios';

export const useHttp: Function = () => {
  const request = async (url: string, method = 'GET', data = 'null') => {
    const response = await axios(url, { method, data });

    if (response.statusText !== 'OK' && response.statusText !== 'Created') {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    const datas = await response.data;
    return datas;
  };
  return { request };
};
