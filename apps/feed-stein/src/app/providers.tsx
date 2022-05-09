import React, { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

export interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
