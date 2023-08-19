'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import loginCoverImage from '@/assets/images/login-cover-image.png';

import styles from './page.module.scss';

function LoginPage() {

  function renderRegisterNowLinkControl() {

    const registerNowControlAttributes = {
      href: '/signup',
      className: styles.registerNowControl
    };

    return (
      <label className={styles.registerNowLabel}>
        Don't have an account? <Link {...registerNowControlAttributes}>Register Now</Link>
      </label>
    );
  }

  function renderLoginForm() {

    const singInControlAttributes = {
      className: 'application-themed-button'
    };

    return (
      <div className={styles.loginForm}>
        <div className={styles.formHeadingSection}>
          <h2 className={styles.heading}>Hey, hello 👋</h2>
          <label className={styles.subHeading}>Welcome back you have been missed</label>
        </div>
        <div className={styles.loginFormContainer}>
          <button {...singInControlAttributes}>Sign in</button>
        </div>
      </div>
    );
  }

  function renderLoginFormSection() {

    return (
      <div id={styles.loginFormSection}>
        {renderRegisterNowLinkControl()}
        {renderLoginForm()}
      </div>
    );

  }

  function renderLoginCoverImageSection() {

    const loginCoverImageStyle = {
      width: '100%',
      height: 'auto'
    };

    const loginCoverImageAttributes = {
      src: loginCoverImage,
      alt: 'login-cover-image',
      style: loginCoverImageStyle
    };

    return (
      <div id={styles.loginCoverImageSection}>
        <Image {...loginCoverImageAttributes} />
      </div>
    );

  }

  return (
    <div id={styles.loginPageMain}>
      {renderLoginFormSection()}
      {renderLoginCoverImageSection()}
    </div>
  );

}

export default LoginPage;