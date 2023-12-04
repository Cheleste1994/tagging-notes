import React from 'react';
import LogoLoad from '../../components/LogoLoad/LogoLoad';
import mainStyles from '../HomePage/Home.module.scss';

export default function PageError(): JSX.Element {
  return (
    <>
      <main className={mainStyles.main} data-testid="page-404">
        <LogoLoad />
        <div>
          <span>Page not found!</span>
        </div>
      </main>
    </>
  );
}
