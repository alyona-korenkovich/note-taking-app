import React, { useContext, useState } from 'react';
import styles from './login.module.scss';
import * as Yup from 'yup';

import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useRouter } from 'next/router';

import { Form, Formik, ErrorMessage, Field, FormikHelpers, FormikValues } from 'formik';
import Image from 'next/image';
import { TLogin } from '../types/auth';

import email from '../assets/images/auth_email.svg';
import password from '../assets/images/auth_password.svg';
import show from '../assets/images/auth_show.svg';

const initState = {
  email: '',
  password: '',
};

import {
  BUTTON_LOGIN,
  BUTTON_SWITCH_TO_SIGNUP,
  ERROR_EMAIL_FORMAT,
  ERROR_MISSING_EMAIL,
  ERROR_MISSING_PASSWORD,
  FIELD_EMAIL,
  FIELD_PASSWORD,
  HEADING_LOGIN,
} from '../const/auth';
import Head from 'next/head';

const Login = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const { request } = useHttp();
  const [passwordIsShown, setPasswordIsShown] = useState(false);

  /**
   * Show hidden password by clicking 'show password' icon
   */
  function togglePassword() {
    setPasswordIsShown(!passwordIsShown);
  }

  function switchToSignUp() {
    router.push('/signup');
  }

  /**
   * Send login request to backend
   * @param {TLogin} values - email and password
   * @param {FormikHelpers<FormikValues>} actions - helper functions
   */
  const signInHandler = async (values: TLogin, actions: FormikHelpers<FormikValues>) => {
    try {
      const data = await request('http://localhost:5000/auth/login', 'POST', {
        email: values.email,
        password: values.password,
      });
      auth.login(data.token, data.userId);
      actions.setSubmitting(false);
      await router.push('/notes');
    } catch (e) {}
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{HEADING_LOGIN}</title>
      </Head>
      <h1>{HEADING_LOGIN}</h1>
      <Formik
        initialValues={initState}
        validationSchema={Yup.object().shape({
          email: Yup.string().email(ERROR_EMAIL_FORMAT).required(ERROR_MISSING_EMAIL),
          password: Yup.string().required(ERROR_MISSING_PASSWORD),
        })}
        onSubmit={(values, actions) => {
          signInHandler(values, actions);
        }}
      >
        {(props) => (
          <Form className={styles.form}>
            <div className={styles.form_fields}>
              <div className={styles.form_emailField}>
                <Field
                  className={styles.form_field}
                  name={'email'}
                  type={'email'}
                  placeholder={FIELD_EMAIL}
                  required
                />
                <Image src={email} alt={'email icon'} />
                <ErrorMessage
                  name="email"
                  render={(msg) => <p className={styles.form_error}>{msg}</p>}
                />
              </div>
              <div className={styles.form_passwordField}>
                <Field
                  className={styles.form_field}
                  name={'password'}
                  type={passwordIsShown ? 'text' : 'password'}
                  placeholder={FIELD_PASSWORD}
                  required
                />
                <Image
                  className={styles.form_passwordField_password}
                  src={password}
                  alt={'password_icon'}
                />
                <Image
                  className={styles.form_passwordField_showPassword}
                  src={show}
                  alt={'show password icon'}
                  onClick={togglePassword}
                />
                <ErrorMessage
                  name="password"
                  render={(msg) => <p className={styles.form_error}>{msg}</p>}
                />
              </div>
            </div>
            <div className={styles.form_buttons}>
              {/*@ts-ignore*/}
              <button className={styles.button_primary} onClick={props.handleSubmit}>
                {BUTTON_LOGIN}
              </button>
              <button className={styles.button_secondary} onClick={switchToSignUp}>
                {BUTTON_SWITCH_TO_SIGNUP}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
