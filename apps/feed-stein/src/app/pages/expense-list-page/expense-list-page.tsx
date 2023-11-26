import React, { useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { useGetUserExpense } from '../../api/expense-api';
import { HomeLayout } from '../../layouts/home-layout';
import Card from '../../components/card/card';

export interface ExpenseListPageProps {}

export const ExpenseListPage: React.FC<ExpenseListPageProps> = () => {
  const { mutate: getUserExpense } = useGetUserExpense();

  useEffect(() => {
    getUserExpense();
  }, []);

  //TODO get expenses from api
  const cards = [
    { name: 'test', amount: 0 },
    { name: 'test', amount: 0 },
    { name: 'test', amount: 0 },
    { name: 'test', amount: 0 },
    { name: 'test', amount: 0 },
    { name: 'test', amount: 0 },
    { name: 'test', amount: 0 },
    { name: 'test', amount: 0 },
    { name: 'test', amount: 0 },
    { name: 'test', amount: 0 },
    { name: 'test', amount: 0 },
  ];

  return (
    <HomeLayout description="My Expenses">
      <SimpleGrid columns={3} spacing={5}>
        {cards.map((card, index) => (
          <Card key={index} name={card.name} amount={card.amount} />
        ))}
      </SimpleGrid>
    </HomeLayout>
  );
};
