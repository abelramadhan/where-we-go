'use client';

import { PropsWithChildren, createContext, useContext, useState } from 'react';

type LoadingContext = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  withLoading: (innerFunction: () => Promise<any>) => Promise<any>;
};

const LoadingContext = createContext<LoadingContext>({
  isLoading: false,
  setLoading: () => {},
  withLoading: async () => {},
});

const LoadingProvider = (props: PropsWithChildren) => {
  const [isLoading, setLoading] = useState(false);

  async function withLoading<T>(innerFunction: () => Promise<T>): Promise<T> {
    setLoading(true);
    const res = await innerFunction();
    setLoading(false);
    return res;
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, withLoading }}>
      {props.children}
      {isLoading && (
        <div className='absolute z-[100] h-[100dvh] w-[100dvw] bg-black/30 flex justify-center items-center'>
          <div className='flex flex-row gap-2 justify-center items-center'>
            <div className='h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 bg-primary rounded-full animate-bounce'></div>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

const useLoading = () => {
  const contextValues = useContext(LoadingContext);

  return { ...contextValues };
};

export { LoadingProvider, useLoading };
