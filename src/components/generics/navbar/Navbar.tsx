import React from 'react';
import { Caveat } from 'next/font/google';

import styles from './Navbar.module.scss';

const caveat = Caveat({
  weight: 'variable',
  subsets: ['latin']
});

const Navbar = () => {

  return (
    <div className={`${caveat.className} ${styles.navbarMain}`}>
      <h2 className={styles.logoTitle}>Authenticator <span>App</span></h2>
      <div className={styles.navbarControls}>

      </div>
    </div>
  );

};

export default Navbar;