'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';

import messages from '@/constants/messages';

import { resetPassword } from '@/services/auth';

import Spinner from '@/components/generics/spinner/Spinner';
import SecureInputField from '@/components/generics/secure-input-field/SecureInputField';

import lockAuthImage from '@/assets/images/lock-auth-image.png';

import styles from './page.module.scss';

function ResetPassword() {

  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: () => { },
    onSubmit: handleResetPassword
  });
  const formikValues = formik.values;

  useEffect(() => {

    const _token = searchParams.get('token') || '';
    setToken(_token);

  }, []);

  async function handleResetPassword() {

    if (formikValues.password !== formikValues.confirmPassword) {
      return toast.error(messages.passwordAndConfirmPasswordDidNotMatched);
    }

    if (token.length === 0) {
      return toast.error(messages.invalidToken);
    }

    setLoading(true);

    const params = {
      password: formikValues.password,
      token
    };

    const response = await resetPassword(params);

    if (response?.data.statusCode === 200) {
      router.push('/login');
    }

    setLoading(false);

  }

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