'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import messages from '@/constants/messages';

import { verifyEmail } from '@/services/auth';

import verifyingGif from '@/assets/images/verifying.gif';

import styles from './page.module.scss';

function VerifyEmailPage() {

  const searchParams = useSearchParams();

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {

    const _token = searchParams.get('token') || '';
    setToken(_token);

  }, []);

  useEffect(() => {

    if (token.length === 0) {
      return;
    }

    verifyUserEmail();

  }, [token]);

  async function verifyUserEmail() {
    setLoading(true);

    const params = {
      token
    };

    const response = await verifyEmail(params);

    if (response!.data.statusCode === 200) {
      setVerified(true);
    }

    setLoading(false);
  }

  function renderCoverImage() {

    const verifyingCoverImageStyle = {
      width: '100%',
      height: 'auto'
    };

    const verifyingCoverImageAttributes = {
      src: verifyingGif,
      alt: 'verifying-image',
      style: verifyingCoverImageStyle
    };

    return (
      <div className={styles.coverImageWrapper}>
        <Image {...verifyingCoverImageAttributes} />
      </div>
    );

  }

  function renderGoToLoginControl() {

    const goToLoginControlAttributes = {
      href: '/login',
      className: `application-themed-button ${styles.goToLoginControl}`
    };

    return <Link {...goToLoginControlAttributes}>Go to Login</Link>;
  }

  function renderContent() {

    if (loading === true) {
      return <h3 className={styles.verifyingMessage}>Verifying your internal details. Please wait....</h3>;
    }

    let message = messages.eitherUserNotFoundOrTokenGetExpired;

    if (verified === true) {
      message = messages.emailVerifiedSuccessfully;
    }

    return (
      <div className={styles.contentContainer}>
        <h3 className={styles.verifyingMessage}>{message}</h3>
        {renderGoToLoginControl()}
      </div>
    );

  }

  return (
    <div id={styles.verifyEmailMain}>
      {renderCoverImage()}
      {renderContent()}
    </div>
  );
}

export default VerifyEmailPage;