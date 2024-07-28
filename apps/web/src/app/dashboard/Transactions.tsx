import React from 'react';
import { Transaction } from '../../types';

interface TransactionsProps {
  transactions: Transaction[];
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>Transaction Amount: {transaction.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
