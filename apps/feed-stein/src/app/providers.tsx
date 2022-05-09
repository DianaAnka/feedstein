import React, { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';

export interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </QueryClientProvider>
  );
};
