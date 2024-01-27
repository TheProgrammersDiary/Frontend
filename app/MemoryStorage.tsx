"use client"

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function MemoryStorage ({
  children
}: {
  children: React.ReactNode
}) {
  const [csrf, setCsrf] = useState(null);
  const [loginType, setLoginType] = useState(null);
  
  return (
    <AppContext.Provider value={{ csrf, setCsrf, loginType, setLoginType }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};