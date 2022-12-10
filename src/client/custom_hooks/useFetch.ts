import { useEffect, useState } from 'react';
import type { PublicChaanProp, UsersData } from '../../types';

const useFetch = (url: string) => {
  const[isLoading, setIsloading] = useState<boolean>(false);
  const[isError, setIsError] = useState<boolean>(false);
  const[data, setData] = useState<Array<PublicChaanProp | UsersData | Record<string, unknown>>>([]);
  // const[data, setData] = useState<Array<any>>([]);


  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch(error) {
        setIsError(true);
        console.log('error: ', error);
        console.log('error', JSON.stringify(error));

      } finally {
        setIsloading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, isError, data };
};

export default useFetch;