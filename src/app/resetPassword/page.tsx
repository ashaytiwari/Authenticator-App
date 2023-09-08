'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { useFormik } from 'formik';

import lockAuthImage from '@/assets/images/lock-auth-image.png';

import styles from './page.module.scss';
import Spinner from '@/components/generics/spinner/Spinner';
import SecureInputField from '@/components/generics/secure-input-field/SecureInputField';

function ResetPassword() {

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
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

  function renderResetPasswordForm() {

    if (loading === true) {
      return (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      );
    }

    const passwordControlAttributes = {
      placeholder: 'Password',
      name: 'password',
      value: formikValues.password,
      onChange: formik.handleChange
    };

    const confirmPasswordControlAttributes = {
      placeholder: 'Confirm Password',
      name: 'confirmPassword',
      value: formikValues.confirmPassword,
      onChange: formik.handleChange
    };

    const resetPasswordControlAttributes = {
      className: 'application-themed-button',
      onClick() {
        formik.handleSubmit();
      }
    };

    return (
      <div className={styles.resetPasswordForm}>
        <h3 className={styles.formHeading}>Create new password</h3>
        <p className={styles.formText}>Your new password must be unique and different from previous passwords.</p>
        <SecureInputField {...passwordControlAttributes} />
        <SecureInputField {...confirmPasswordControlAttributes} />
        <button {...resetPasswordControlAttributes} type='button'>Reset Password</button>
      </div>
    );
  }

  return (
    <div id={styles.resetPasswordMain}>
      <div id={styles.resetPasswordCard}>
        {renderLockAuthImage()}
        {renderResetPasswordForm()}
      </div>
    </div>
  );
}

export default ResetPassword;