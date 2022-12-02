import React, { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from './signup.module.scss';
import { useHttp } from '../hooks/http.hook';

import { useRouter } from 'next/router';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import account from '../assets/images/auth_account.png';
import confirm from '../assets/images/auth_confirm.png';
import email from '../assets/images/auth_email.svg';
import password from '../assets/images/auth_password.svg';

import {
  BUTTON_SIGNUP,
  BUTTON_SWITCH_TO_LOGIN,
  ERROR_EMAIL_FORMAT,
  ERROR_MINLENGTH,
  ERROR_MISSING_CONFIRM,
  ERROR_MISSING_EMAIL,
  ERROR_MISSING_NAME,
  ERROR_MISSING_PASSWORD,
  ERROR_NAME_FORMAT,
  ERROR_PASSWORD_MISMATCH,
  FIELD_NAME,
  FIELD_EMAIL,
  FIELD_PASSWORD,
  FIELD_CONFIRM,
  HEADING_SIGNUP,
} from '../const/auth';

import { AuthContext } from '../context/AuthContext';
import { TSignup } from '../types/auth';

const initState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(ERROR_MISSING_NAME)
    .matches(/^[A-Za-z-]*$/, ERROR_NAME_FORMAT)
    .max(40),
  email: yup.string().required(ERROR_MISSING_EMAIL).email(ERROR_EMAIL_FORMAT),
  password: yup.string().required(ERROR_MISSING_PASSWORD).min(8, ERROR_MINLENGTH),
  confirmationPassword: yup
    .string()
    .required(ERROR_MISSING_CONFIRM)
    .oneOf([yup.ref('password'), null], ERROR_PASSWORD_MISMATCH),
});

const Signup = () => {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const router = useRouter();

  const signUpHandler = async (values: TSignup) => {
    try {
      await request('http://localhost:5000/auth/register', 'POST', {
        name: values.name,
        email: values.email,
        password: values.password,
      }).then(async () => {
        const data = await request('http://localhost:5000/auth/login', 'POST', {
          email: values.email,
          password: values.password,
        });
        await auth.login(data.accessToken, data.id);
        await router.push('/notes');
      });
    } catch (e) {}
  };

  const switchToLogin = () => {
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign up</title>
      </Head>
      <h1>{HEADING_SIGNUP}</h1>
      <Formik
        initialValues={initState}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          signUpHandler(values);
        }}
      >
        {(props) => (
          <Form className={styles.form}>
            <div className={styles.form_fields}>
              <div className={styles.form_nameField}>
                <Field
                  className={styles.form_field}
                  name={'name'}
                  type={'name'}
                  placeholder={FIELD_NAME}
                  required
                />
                <Image src={account} alt={'name icon'} />
                <ErrorMessage
                  name="name"
                  render={(msg) => <p className={styles.form_error}>{msg}</p>}
                />
              </div>
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
                  type={'password'}
                  placeholder={FIELD_PASSWORD}
                  required
                />
                <Image
                  className={styles.form_passwordField_password}
                  src={password}
                  alt={'password_icon'}
                />
                <ErrorMessage
                  name="password"
                  render={(msg) => <p className={styles.form_error}>{msg}</p>}
                />
              </div>
              <div className={styles.form_confirmPasswordField}>
                <Field
                  className={styles.form_field}
                  name={'confirmPassword'}
                  type={'password'}
                  placeholder={FIELD_CONFIRM}
                  required
                />
                <Image
                  className={styles.form_passwordField_password}
                  src={confirm}
                  alt={'confirm password icon'}
                />
                <ErrorMessage
                  name="confirmPassword"
                  render={(msg) => <p className={styles.form_error}>{msg}</p>}
                />
              </div>
            </div>
            <div className={styles.form_buttons}>
              <button
                onClick={() => {
                  signUpHandler(props.values);
                }}
                className={styles.button_primary}
                type="submit"
              >
                {BUTTON_SIGNUP}
              </button>
              <button className={styles.button_secondary} onClick={switchToLogin}>
                {BUTTON_SWITCH_TO_LOGIN}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
