import React, { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import LogoLoad from '../components/LogoLoad/LogoLoad';
import PageError from './404/PageError';

const Home = lazy(() => import('./HomePage/HomePage'));
const FavoritePage = lazy(() => import('./FavoritePage/FavoritePage'));

const Router = (): React.JSX.Element => (
  <Routes>
    <Route
      path=""
      element={
        <Suspense
          fallback={
            <main>
              <LogoLoad />
            </main>
          }
        >
          <Header />
          <Outlet />
        </Suspense>
      }
    >
      <Route path="/" element={<Home />} />
      <Route path="/favorite" element={<FavoritePage />} />
      <Route path="*" element={<PageError />} />
    </Route>
  </Routes>
);

export default Router;
