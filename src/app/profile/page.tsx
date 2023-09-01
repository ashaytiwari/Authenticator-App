'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { userLogout } from '@/services/auth';
import { getMyProfile } from '@/services/users';

import Navbar from '@/components/generics/navbar/Navbar';

function ProfilePage() {

  const router = useRouter();

  useEffect(() => {
    loadMyProfile();
  }, []);

  async function loadMyProfile() {
    const response = await getMyProfile();
  }

  async function handleLogout() {

    const response = await userLogout();

    if (response!.data.statusCode === 200) {
      router.push('/login');
    }

  }

  const logoutButtonAttributes = {
    className: 'application-themed-button',
    onClick: handleLogout
  };

  return (
    <div>
      <Navbar />
    </div>
  );
}

export default ProfilePage;