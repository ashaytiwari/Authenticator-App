import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { PulseLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import navbarLinks from '@/constants/json/navbar-links';

import { userLogout } from '@/services/auth';

import styles from './Navbar.module.scss';

const Navbar = () => {

  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [displayMobileMenuControls, setDisplayMobileMenuControls] = useState(false);

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

  function renderNavbarControls() {
    return (
      <div className={styles.navbarControls}>
        {renderNavbarLinks()}
        {renderLogoutControl()}
      </div>
    );
  }

  function renderMobileNavbar() {

    const menuControlAttributes = {
      className: styles.menuControl,
      onClick() {
        setDisplayMobileMenuControls((_displayControls) => !_displayControls);
      }
    };

    return (
      <div className={styles.mobileNavbarContainer}>
        <div className={styles.mobileNavbar}>
          <label className={styles.logoTitle}>Auth <span>App</span></label>
          <button {...menuControlAttributes}><FontAwesomeIcon icon={faBars} /></button>
        </div>
        {displayMobileMenuControls === true && renderNavbarControls()}
      </div>
    );
  }

  function renderDesktopNavbar() {
    return (
      <div className={styles.desktopNavbar}>
        <label className={styles.logoTitle}>Auth <span>App</span></label>
        {renderNavbarControls()}
      </div>
    );
  }

  return (
    <div className={styles.navbarMain}>
      {renderMobileNavbar()}
      {renderDesktopNavbar()}
    </div>
  );

};

export default Navbar;