import { Box, Container, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface HomeLayoutProps {
  children: ReactNode;
  description?: string;
}

export const HomeLayout: React.FC<HomeLayoutProps> = ({
  children,
  description,
}) => {
  return (
    <Box p={4}>
      <Container maxW="xl" centerContent>
        <Heading as="h1" mb={4}>
          {description}
        </Heading>
        {children}
      </Container>
    </Box>
  );
};
