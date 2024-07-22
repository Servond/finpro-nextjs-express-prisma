import { signIn, signOut } from '@/auth';
import { getSession } from '@/utils/actions/authentication';

const Page = async () => {
  const user = await getSession();
  return (
    <div>
      {user ? (
        <div>
          <p>Logged In</p>
          <pre>{JSON.stringify(user, null, '\t')}</pre>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button>Sign Out</button>
          </form>
        </div>
      ) : (
        <div>
          <p>Not logged In</p>
          <form
            action={async () => {
              'use server';
              await signIn();
            }}
          >
            <button>Sign In</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Page;
