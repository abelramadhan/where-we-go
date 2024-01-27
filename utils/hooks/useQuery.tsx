'use client';

import { useEffect, useState } from 'react';

type UseQueryProps<Type, Params> = {
  queryFn: (input: Params) => Promise<Type>;
  initialParams: Params;
  isLazy?: boolean;
};

const useQuery = <Type, Params>(props: UseQueryProps<Type, Params>) => {
  const [params, setParams] = useState<Params>(props.initialParams);
  const [data, setData] = useState<Type | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const fetchData = async (newParams: Params) => {
    try {
      setLoading(true);
      const res = await props.queryFn(newParams);
      setData(res);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = (newParams: Params) => {
    if (props.isLazy) {
      setParams(newParams);
    } else {
      fetchData(newParams);
    }
  };

  useEffect(() => {
    !props.isLazy && fetchData(params);
  }, [params]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useQuery;
