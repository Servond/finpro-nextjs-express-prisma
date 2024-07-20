import { auth, signIn, signOut } from '@/auth';
import { getSession } from '@/utils/actions/authentication';
import Link from 'next/link';

const Page = async () => {
  const user = await getSession();
  console.log(user);
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center space-x-4">
          {user ? (
            <div>
              <h1 className="text-2xl">Welcome {user?.username}</h1>
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <button type="submit">Logout</button>
              </form>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl">Welcome Guest</h1>
              <form
                action={async () => {
                  'use server';
                  await signIn();
                }}
              >
                <button type="submit">Sign in</button>
              </form>
            </div>
          )}

          <button className="px-4 py-2 bg-red-500 text-white rounded-md">
            <Link href="/auth/register">Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
