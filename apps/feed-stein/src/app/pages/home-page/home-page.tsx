import { Box } from '@chakra-ui/react';
import React from 'react';

export interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = () => {
  return (
    <Box bgColor={'secondary.100'}>
      <h1>Home</h1>
    </Box>
  );
};
