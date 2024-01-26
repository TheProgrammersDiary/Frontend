"use client"

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function CsrfProvider ({
  children
}: {
  children: React.ReactNode
}) {
  const [csrf, setCsrf] = useState(null);
  
  return (
    <AppContext.Provider value={{ csrf, setCsrf }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};