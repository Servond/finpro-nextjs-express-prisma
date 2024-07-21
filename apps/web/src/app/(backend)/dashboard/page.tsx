import { getSession } from '@/utils/actions/authentication';

const Page = async () => {
  const user = await getSession();
  return (
    <div>
      {user ? (
        <div>
          <p>Logged In</p>
          <pre>{JSON.stringify(user, null, '\t')}</pre>
        </div>
      ) : (
        <div>
          <p>Not logged In</p>
        </div>
      )}
    </div>
  );
};

export default Page;
