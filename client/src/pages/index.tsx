import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import image from '../assets/images/main_image.jpg';
import styles from './index.module.scss';

import type { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Note-taking app</title>
      </Head>
      <nav className={styles.navigation} data-testid="navbar">
        <Link className={styles.navigation_login} href="/login" data-testid="linkToLogin">
          Log in
        </Link>
        <Link className={styles.navigation_signup} href="/signup" data-testid="linkToSignup">
          Try for free
        </Link>
      </nav>
      <main data-testid="mainPageContents">
        <h1 data-testid="mainPageHeading">Welcome to Note-taking app!</h1>
        <div className={styles.description_wrapper}>
          <h2 data-testid="mainPageDescription">
            Keep everything important, capture ideas, stay organized and productive with this
            note-taking app!
          </h2>
        </div>
        <button className={styles.signup_button} data-testid="mainPageButton">
          Try for free
        </button>
      </main>
      <Image className={styles.image} src={image} alt="illustration" data-testid="mainPageImage" />
    </div>
  );
};

export default Index;
