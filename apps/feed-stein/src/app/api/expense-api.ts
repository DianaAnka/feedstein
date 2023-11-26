import { useMutation } from 'react-query';

import baseAPI from './base-api';

export function getUserExpense() {
  return baseAPI.get('/expense');
}

export function useGetUserExpense() {
  return useMutation<unknown, unknown>(getUserExpense);
}
