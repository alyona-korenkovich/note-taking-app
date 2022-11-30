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
      <nav className={styles.navigation}>
        <Link className={styles.navigation_login} href="/login">
          Log in
        </Link>
        <Link className={styles.navigation_signup} href="/signup">
          Try for free
        </Link>
      </nav>
      <main>
        <h1>Welcome to Note-taking app!</h1>
        <div className={styles.description_wrapper}>
          <h2>
            Keep everything important, capture ideas, stay organized and productive with this
            note-taking app!
          </h2>
        </div>
        <button className={styles.signup_button}>Try for free</button>
      </main>
      <Image className={styles.image} src={image} alt="illustration" />
    </div>
  );
};

export default Index;
