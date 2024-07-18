import { signIn, signOut } from '@/auth';

const Page = async () => {
  return (
    <div>
      <h1>SIGN IN HERE</h1>
      <form
        action={async () => {
          'use server';
          await signIn();
        }}
      >
        <button type="submit">Sign In</button>
      </form>

      <h1>SIGN OUT HERE</h1>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Page;
