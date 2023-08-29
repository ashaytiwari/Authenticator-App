'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { userLogout } from '@/services/auth';

function ProfilePage() {

  const router = useRouter();

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
      <button {...logoutButtonAttributes}>Logout</button>
    </div>
  );
}

export default ProfilePage;