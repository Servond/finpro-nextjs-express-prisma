'use client';

import { useQuery } from '@tanstack/react-query';

const Page = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
        res.json(),
      ),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map((todo: any) => (
        <div key={todo.id}>{todo.id}</div>
      ))}
    </div>
  );
};

export default Page;
