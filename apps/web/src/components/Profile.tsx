'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from './Dashboard/DashboardPage';
import Referrals from './Referrals';

// Define the UserContextType
type UserContextType = {
  userId: number;
  roleId: number;
  username: string;
  email: string;
  referralCode: string;
  pointsBalance: number;
  profileImage: string | null;
};

const Profile: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserContextType | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'account' | 'dashboard' | 'referrals'>('account');

  const [contactInfo, setContactInfo] = useState({
    firstname: '',
    lastname: '',
    cellphone: '',
    company: '',
    website: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    state: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setProfileImageUrl(userData.profileImage ? `data:image/jpeg;base64,${userData.profileImage}` : null);
          setContactInfo({
            firstname: userData.firstname || '',
            lastname: userData.lastname || '',
            cellphone: userData.cellphone || '',
            company: userData.company || '',
            website: userData.website || '',
            address: userData.address || '',
            city: userData.city || '',
            country: userData.country || '',
            postalCode: userData.postalCode || '',
            state: userData.state || '',
          });
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      }
    };
    fetchUserData();
  }, [router]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('firstname', contactInfo.firstname);
    formData.append('lastname', contactInfo.lastname);
    formData.append('cellphone', contactInfo.cellphone);
    formData.append('company', contactInfo.company);
    formData.append('website', contactInfo.website);
    formData.append('address', contactInfo.address);
    formData.append('city', contactInfo.city);
    formData.append('country', contactInfo.country);
    formData.append('postalCode', contactInfo.postalCode);
    formData.append('state', contactInfo.state);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-red-500 text-white">
        <nav>
          <ul>
            <li className="mb-4">
              <button onClick={() => setActiveSection('account')} className="w-full text-left">Account Details</button>
            </li>
            {user.roleId === 1 && (
              <li className="mb-4">
                <button onClick={() => setActiveSection('dashboard')} className="w-full text-left">Dashboard</button>
              </li>
            )}
            <li className="mb-4">
              <button onClick={() => setActiveSection('referrals')} className="w-full text-left">Referrals</button>
            </li>
            <li className="mb-4">
              <button onClick={() => { localStorage.removeItem('token'); router.push('/'); }} className="w-full text-left">Sign Out</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="w-3/4 p-4">
        {activeSection === 'account' && (
          <>
            <h1 className="text-2xl font-bold mb-4">My Account</h1>
            <form onSubmit={handleSave}>
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Profile Photo</h2>
                {profileImageUrl ? (
                  <img src={profileImageUrl} alt="Profile" className="mb-4 w-32 h-32 object-cover rounded-full" />
                ) : (
                  <p>No profile photo uploaded</p>
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </section>
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input type="text" name="firstname" value={contactInfo.firstname} onChange={handleInputChange} placeholder="First name" className="p-2 border rounded" />
                  <input type="text" name="lastname" value={contactInfo.lastname} onChange={handleInputChange} placeholder="Last name" className="p-2 border rounded" />
                  <input type="text" name="cellphone" value={contactInfo.cellphone} onChange={handleInputChange} placeholder="Cellphone" className="p-2 border rounded" />
                  <input type="text" name="company" value={contactInfo.company} onChange={handleInputChange} placeholder="Company" className="p-2 border rounded" />
                  <input type="text" name="website" value={contactInfo.website} onChange={handleInputChange} placeholder="Website" className="p-2 border rounded col-span-2" />
                </div>
              </section>
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input type="text" name="address" value={contactInfo.address} onChange={handleInputChange} placeholder="Address" className="p-2 border rounded col-span-2" />
                  <input type="text" name="city" value={contactInfo.city} onChange={handleInputChange} placeholder="City" className="p-2 border rounded" />
                  <input type="text" name="country" value={contactInfo.country} onChange={handleInputChange} placeholder="Country" className="p-2 border rounded" />
                  <input type="text" name="postalCode" value={contactInfo.postalCode} onChange={handleInputChange} placeholder="Postal code" className="p-2 border rounded" />
                  <input type="text" name="state" value={contactInfo.state} onChange={handleInputChange} placeholder="State" className="p-2 border rounded" />
                </div>
              </section>
              <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded">Save Profile</button>
            </form>
          </>
        )}
        {activeSection === 'dashboard' && (
          <>
            <h1 className="text-2xl font-bold mb-4"></h1>
            <Dashboard />
          </>
        )}
        {activeSection === 'referrals' && (
          <>
            <h1 className="text-2xl font-bold mb-4"></h1>
            <Referrals />
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
