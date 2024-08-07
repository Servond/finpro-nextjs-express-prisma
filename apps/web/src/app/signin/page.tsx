'use client';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
// import { login } from '@/_middlewares/auth.middleware';
import { useAppDispatch } from '@/lib/hooks';
import { LoginAction } from './login.action';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError('');

  //   try {
  //     // // const res = await login({
  //     //   email,
  //     //   password,
  //     // })(dispatch);
  //     // const { token } = response.data;
  //     // Store token in local storage
  //     // localStorage.setItem('token', response.data.token);
  //     // Redirect to dashboard or home page after successful login
  //     // if (res) router.push('/dashboard');
  //     // if (res) {
  //     //   localStorage.setItem('token', res);
  //     //   router.push('/');
  //     // }
  //   } catch (err: any) {
  //     let message = '';
  //     if (err instanceof AxiosError) {
  //       message = err.response?.data;
  //     } else {
  //       message = err.message;
  //     }

  //     console.error(message);
  //     setError(err.message);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = LoginAction(email, password);

      await response;
    } catch (error) {
      return error;
    } finally {
      router.push('/');
      router.refresh();
    }
  };
  return (
    <div className="mx-auto my-10 2xl:my-52 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <form
          onSubmit={handleSubmit}
          className="w-96 p-6 bg-white rounded shadow-md"
        >
          <h1 className="text-2xl font-bold sm:text-3xl">Login</h1>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Dont have an account?
              <a className="underline text-yellow-600" href="/register">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { login } from '@/services/authservice';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Assume we have a login function that sets the token in local storage
//     const token = await login({ email, password });
//     if (token) {
//       localStorage.setItem('token', token);
//       router.push('/');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;

// src/app/auth/signin/page.tsx
// 'use client';

// import { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { useRouter } from 'next/navigation';
// import { login } from '@/_middlewares/auth.middleware';
// import { useAppDispatch } from '@/lib/hooks';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const token = await login({
//         email,
//         password,
//       })(dispatch);

//       // Store token in local storage
//       localStorage.setItem('token', token);
//       router.push('/');
//     } catch (err: any) {
//       let message = '';
//       if (err instanceof AxiosError) {
//         message = err.response?.data;
//       } else {
//         message = err.message;
//       }

//       console.error(message);
//       setError(message);
//     }
//   };

//   return (
//     <div className="mx-auto my-10 2xl:my-52 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-lg text-center">
//         <form
//           onSubmit={handleSubmit}
//           className="w-96 p-6 bg-white rounded shadow-md"
//         >
//           <h1 className="text-2xl font-bold sm:text-3xl">Login</h1>
//           {error && <p className="text-red-500">{error}</p>}
//           <div className="mb-4">
//             <label className="block mb-1" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full p-2 bg-blue-500 text-white rounded"
//           >
//             Login
//           </button>
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-gray-500">
//               Dont have an account?
//               <a className="underline text-yellow-600" href="/register">
//                 Sign up
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
