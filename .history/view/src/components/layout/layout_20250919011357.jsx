import React from 'react';
import { Outlet } from 'react-router';
import Footer from './footer/footer';
import Header from './header/header';

import { useAuth } from '../../hooks/use-auth';
import { useData } from '../../hooks/use-data';
import EccomAppLoaderGif from '../layout/loader/EccomAppLoader';

const Layout = () => {
  // console.log(props);

  const { loading: authLoading } = useAuth((state) => state.user);
  const { loading: dataLoading } = useData((state) => state.user);

  return (
    <>
      {authLoading || dataLoading ? (
        <EccomAppLoaderGif />
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
