import { auth, signIn, signOut } from '@/auth';
import Link from 'next/link';

const Page = async () => {
  const user = await auth();
  console.log('Auth user:', user);
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center space-x-4">
          {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md"> */}
          {/* <Link href="/auth/login">Sign In</Link> */}
          <form
            action={async () => {
              'use server';
              await signIn();
            }}
          >
            <button type="submit">Sign in</button>
          </form>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button type="submit">Logout</button>
          </form>
          {/* </button> */}
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">
            <Link href="/auth/register">Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
