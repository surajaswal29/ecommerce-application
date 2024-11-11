import React from 'react';
import { Button } from '@/components';
import { categoriesData } from '@/utils/utils';

type Props = {};

export const CategoryNav = (props: Props) => {
  return (
    <div className="w-full flex items-center justify-center bg-gray-100">
      {categoriesData.map((item) => {
        return (
          <Button
            key={item.title}
            variant="transparent"
            className="!text-gray-800 !p-3 !px-6 hover:bg-green-light-1 rounded-none !h-auto"
          >
            {item.title}
          </Button>
        );
      })}
    </div>
  );
};
