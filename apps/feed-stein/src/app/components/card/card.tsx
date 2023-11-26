import { Box, Text } from '@chakra-ui/react';

export interface CardProps {
  name: string;
  amount: number;
}

export const Card: React.FC<CardProps> = ({ name, amount }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} my={2}>
      <Text fontWeight="bold">{name}</Text>
      <Text>Amount: {amount}</Text>
    </Box>
  );
};

export default Card;
