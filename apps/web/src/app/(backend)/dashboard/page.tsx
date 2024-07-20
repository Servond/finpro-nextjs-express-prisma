import { signIn, signOut } from '@/auth';
import Link from 'next/link';

const Page = async () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            <Link href="/auth/login">Sign In</Link>
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">
            <Link href="/auth/register">Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
