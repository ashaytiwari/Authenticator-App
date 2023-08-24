import React from 'react';

import { BounceLoader } from 'react-spinners';

import { ISpinnerProps } from '@/interfaces/uiInterfaces/common';

import styles from './Spinner.module.scss';

const Spinner: React.FC<ISpinnerProps> = (props) => {

  const { fullscreen } = props;

  let spinnerContainerClassName = styles.spinnerContainer;

  if (fullscreen === true) {
    spinnerContainerClassName += ` ${styles.fullscreen}`;
  }

  return (
    <div className={spinnerContainerClassName}>
      <BounceLoader size={75} color='#49b5c9' />
    </div>
  );
};

export default Spinner;