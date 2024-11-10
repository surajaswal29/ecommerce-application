'use client';
import React from 'react';
import { Footer, Header } from '@/components';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default MainLayout;
