'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useFormik } from 'formik';

import lockAuthImage from '@/assets/images/lock-auth-image.png';

import styles from './page.module.scss';

function ForgotPassword() {

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate: () => { },
    onSubmit: () => { }
  });
  const formikValues = formik.values;

  function renderLockAuthImage() {

    const lockAuthImageStyle = {
      width: '25%',
      height: 'auto'
    };

    const lockAuthImageAttributes = {
      src: lockAuthImage,
      alt: 'lock-auth-image',
      style: lockAuthImageStyle
    };

    return (
      <div className={styles.lockAuthImageWrapper}>
        <Image {...lockAuthImageAttributes} />
      </div>
    );
  }

  function renderForgotPasswordForm() {

    const emailControlAttributes = {
      type: 'email',
      name: 'email',
      placeholder: 'Email address',
      value: formikValues.email,
      onChange: formik.handleChange
    };

    const sendRequestControlAttributes = {
      className: 'application-themed-button',
      onClick() { }
    };

    const backToLoginControlAttributes = {
      href: '/login',
      className: styles.backToLoginControl
    };

    return (
      <div className={styles.forgotPasswordForm}>
        <h3 className={styles.formHeading}>Forgot your password?</h3>
        <p className={styles.formText}>Please enter the email address associated with your account and We will email you a link to reset your password.</p>
        <input {...emailControlAttributes} />
        <button {...sendRequestControlAttributes}>Send Request</button>
        <Link {...backToLoginControlAttributes}>Back to <span>Login</span></Link>
      </div>
    );
  }

  return (
    <div id={styles.forgotPasswordMain}>
      <div id={styles.forgotPasswordCard}>
        {renderLockAuthImage()}
        {renderForgotPasswordForm()}
      </div>
    </div>
  );
}

export default ForgotPassword;