'use client';
import React from 'react';
import { CategoryNav } from '@/components';

const HomeContainer = () => {
  return (
    <div className="flex-1">
      <CategoryNav />
      <div className="w-full flex h-[40rem] p-6">
        <div className="w-8/12 p-4">
          <div className="w-full bg-green-light-2 h-full rounded-lg relative p-6"></div>
        </div>
        <div className="w-4/12 p-4 flex flex-col gap-8">
          <div className="w-full h-1/2 bg-green-light-2 rounded-lg"></div>
          <div className="w-full h-1/2 bg-green-light-2 rounded-lg"></div>
        </div>
      </div>
      <div className="w-full px-10">
        <div className="w-full">
          <h1 className="text-lg text-gray-800 font-medium">Featured Products</h1>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
