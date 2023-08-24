'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';

import { userSignup } from '@/services/auth';

import SecureInputField from '@/components/generics/secure-input-field/SecureInputField';
import Spinner from '@/components/generics/spinner/Spinner';

import loginCoverImage from '@/assets/images/login-cover-image.png';

import styles from './page.module.scss';

function SignupPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validate() { },
    onSubmit: handleSubmitForm
  });
  const formikValues = formik.values;

  async function handleSubmitForm() {
    setLoading(true);

    const response = await userSignup(formikValues);

    if (response!.data.statusCode === 200) {
      router.push('/login');
    }

    setLoading(false);
  }

  function renderAlreadyHaveAnAccountSection() {

    const signInControlAttributes = {
      href: '/login',
      className: styles.loginControl
    };

    return (
      <label className={styles.alreadyHaveAnAccountLabel}>
        Already have an account? <Link {...signInControlAttributes}>Login</Link>
      </label>
    );
  }

  function renderSignupForm() {

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

    const nameControlAttributes = {
      placeholder: 'Enter Name',
      name: 'username',
      type: 'text',
      value: formikValues.username,
      className: styles.formControls,
      onChange: formik.handleChange
    };

    const emailControlAttributes = {
      placeholder: 'Enter email',
      name: 'email',
      type: 'email',
      value: formikValues.email,
      className: styles.formControls,
      onChange: formik.handleChange
    };

    const secureInputFieldControlAttributes = {
      placeholder: 'Password',
      name: 'password',
      className: styles.passwordField,
      value: formikValues.password,
      onChange: formik.handleChange
    };

    return (
      <div className={styles.signupForm}>
        <div className={styles.formHeadingSection}>
          <h2 className={styles.heading}>Create Your Account 🚀</h2>
          <label className={styles.subHeading}>Join us and unlock a world of possibilities</label>
        </div>
        <div className={styles.signupFormContainer}>
          <input {...nameControlAttributes} />
          <input {...emailControlAttributes} />
          <SecureInputField {...secureInputFieldControlAttributes} />
          <button {...singInControlAttributes} type='button'>Create Account</button>
        </div>
      </div>
    );
  }

  function renderSignupFormSection() {

    return (
      <div id={styles.signupFormSection}>
        {renderAlreadyHaveAnAccountSection()}
        {renderSignupForm()}
      </div>
    );

  }

  function renderSignupCoverImageSection() {

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
      <div id={styles.signupCoverImageSection}>
        <Image {...loginCoverImageAttributes} />
      </div>
    );

  }

  return (
    <div id={styles.signupPageMain}>
      {renderSignupCoverImageSection()}
      {renderSignupFormSection()}
    </div>
  );

}

export default SignupPage;