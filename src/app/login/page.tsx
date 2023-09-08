'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';

import { userLogin } from '@/services/auth';

import SecureInputField from '@/components/generics/secure-input-field/SecureInputField';
import Spinner from '@/components/generics/spinner/Spinner';

import loginCoverImage from '@/assets/images/login-cover-image.png';

import styles from './page.module.scss';

function LoginPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: () => { },
    onSubmit: handleSubmitForm
  });
  const formikValues = formik.values;

  async function handleSubmitForm() {
    setLoading(true);

    const response = await userLogin(formikValues);

    if (response!.data.statusCode === 200) {
      router.push('/profile');
    }

    setLoading(false);
  }

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

  function renderPasswordFieldContainer() {

    const secureInputFieldControlAttributes = {
      placeholder: 'Password',
      name: 'password',
      className: styles.passwordField,
      value: formikValues.password,
      onChange: formik.handleChange
    };

    const forgotPasswordControlAttributes = {
      href: '/forgotPassword',
      className: styles.forgotPasswordLink
    };

    return (
      <div className={styles.passwordFieldContainer}>
        <SecureInputField {...secureInputFieldControlAttributes} />
        <Link {...forgotPasswordControlAttributes}>Forgot Password?</Link>
      </div>
    );
  }

  function renderLoginForm() {

    if (loading === true) {
      return (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      );
    }

    const singInControlAttributes = {
      className: 'application-themed-button',
      onClick() {
        formik.handleSubmit();
      }
    };

    const emailControlAttributes = {
      placeholder: 'Enter email',
      name: 'email',
      value: formikValues.email,
      className: styles.emailControl,
      onChange: formik.handleChange
    };

    return (
      <div className={styles.loginForm}>
        <div className={styles.formHeadingSection}>
          <h2 className={styles.heading}>Hey, hello 👋</h2>
          <label className={styles.subHeading}>Welcome back you have been missed</label>
        </div>
        <div className={styles.loginFormContainer}>
          <input {...emailControlAttributes} />
          {renderPasswordFieldContainer()}
          <button {...singInControlAttributes} type='button'>Sign in</button>
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