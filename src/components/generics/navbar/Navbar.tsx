import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { PulseLoader } from 'react-spinners';

import navbarLinks from '@/constants/json/navbar-links';

import styles from './Navbar.module.scss';
import { userLogout } from '@/services/auth';

const Navbar = () => {

  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {

    setLoading(true);

    const response = await userLogout();

    if (response!.data.statusCode === 200) {
      router.push('/login');
    }

    setLoading(false);

  }

  function renderNavbarLink(item: any, index: number) {

    let navbarLinkClassName = styles.navbarLink;

    if (item.path === pathname) {
      navbarLinkClassName += ` ${styles.active}`;
    }

    const linkControlAttributes = {
      href: item.path,
      className: navbarLinkClassName,
      key: index
    };

    return (
      <Link {...linkControlAttributes}>{item.label}</Link>
    );
  }

  function renderNavbarLinks() {

    return (
      <div className={styles.navbarLinksContainer}>
        {
          navbarLinks.map((item, index) => (
            renderNavbarLink(item, index)
          ))
        }
      </div>
    );
  }

  function renderLogoutControl() {

    let contentNode: React.ReactNode = 'Logout';

    if (loading === true) {

      const pulseLoaderAttributes = {
        color: '#fff',
        size: 8
      };

      contentNode = <PulseLoader {...pulseLoaderAttributes} />;
    }

    const logoutButtonControlAttributes = {
      className: 'application-themed-button',
      disabled: loading, // disable logout button only when loading is enabled
      onClick: handleLogout
    };

    return <button {...logoutButtonControlAttributes}>{contentNode}</button>;
  }

  return (
    <div className={styles.navbarMain}>
      <label className={styles.logoTitle}>Auth <span>App</span></label>
      <div className={styles.navbarControls}>
        {renderNavbarLinks()}
        {renderLogoutControl()}
      </div>
    </div>
  );

};

export default Navbar;