// "use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import jwtDecode from 'jwt-decode';

// const Profile: React.FC = () => {
//   const [userData, setUserData] = useState<any>(null);
//   const [points, setPoints] = useState<number>(0);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           const decoded: any = jwtDecode(token);
//           const userId = decoded.userId;

//           const userResponse = await axios.get(`http://localhost:3000/api/users/${userId}`);
//           setUserData(userResponse.data);

//           const pointsResponse = await axios.get(`http://localhost:3000/api/points/${userId}`);
//           setPoints(pointsResponse.data.pointsBalance);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
//           <p>{userData.username}</p>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//           <p>{userData.email}</p>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
//           <p>{userData.firstname}</p>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
//           <p>{userData.lastname}</p>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Points</label>
//           <p>{points}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
