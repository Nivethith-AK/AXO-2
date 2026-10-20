import { createContext, useContext } from 'react';

export const SmoothScrollContext = createContext(null);

export const useLenis = () => useContext(SmoothScrollContext);
