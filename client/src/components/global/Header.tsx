import { categoriesData } from '@/utils/utils';
import { ActionIcon, Button, TextInput, Popover, Indicator } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { CaretDown, Funnel, MagnifyingGlass, ShoppingCart, User } from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useState } from 'react';

const logo =
  process.env.APP_LOGO_1 ||
  'https://res.cloudinary.com/dzfc0ty7q/image/upload/v1690636674/green-app/logo/Horizontal_Logo_trmqf9.png';

interface IProps {}

interface IState {
  selectedCategory: string | null;
}

type CategoryItem = {
  title: string;
  image: string;
};

export const Header = ({}: IProps) => {
  const [state, setState] = useSetState<IState>({
    selectedCategory: null,
  });

  const handleSelectCategory = (category: string | null) => {
    setState({ selectedCategory: category });
  };
  return (
    <div className="w-full p-6 px-8 flex items-center justify-between">
      <div id="logo">
        <Image loading={'lazy'} height={60} width={180} src={logo} alt="Logo" />
      </div>
      <div id="search">
        <TextInput
          placeholder="Search Products, categories ..."
          leftSectionWidth={'150'}
          leftSection={
            <Popover position="bottom-start" withArrow arrowPosition="center" closeOnClickOutside>
              <Popover.Target>
                <Button
                  variant="transparent"
                  size="sm"
                  rightSection={<CaretDown size={14} weight="bold" className="!text-green-dark-1" />}
                  className="!text-sm !text-gray-700 !h-6 !mr-1.5 !border !border-r !rounded-none !border-r-gray-300"
                >
                  {state.selectedCategory || 'All Categories'}
                </Button>
              </Popover.Target>
              <Popover.Dropdown p={4}>
                <ul>
                  <li>
                    <Button
                      variant="transparent"
                      radius={6}
                      className="!text-sm !text-gray-600 !justify-start border hover:bg-green-light-2 !w-full"
                      leftSection={<Funnel size={16} weight="bold" className="!text-green-dark-1" />}
                      classNames={{
                        inner: '!w-full !justify-start',
                      }}
                      onClick={() => handleSelectCategory(null)}
                    >
                      All
                    </Button>
                  </li>
                  {categoriesData.map((item: CategoryItem) => {
                    return (
                      <li key={item.title}>
                        <Button
                          variant="transparent"
                          radius={6}
                          className="!text-sm !text-gray-600 !justify-start border hover:bg-green-light-2 !w-full"
                          leftSection={
                            <Image height={20} width={20} src={item.image} alt={item.title} className="rounded-full" />
                          }
                          classNames={{
                            inner: '!w-full !justify-start',
                          }}
                          onClick={() => handleSelectCategory(item.title)}
                        >
                          {item.title}
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </Popover.Dropdown>
            </Popover>
          }
          rightSection={
            <ActionIcon variant="transparent">
              <MagnifyingGlass size={18} weight="bold" className="!text-gray-900" />
            </ActionIcon>
          }
          classNames={{
            input: '!w-[500px]',
            section: '!flex !justify-start',
          }}
          radius={'md'}
        />
      </div>
      <div id="actions" className="flex gap-x-6">
        <ActionIcon variant="transparent" className="text-gray-700">
          <User size={20} weight="bold" />
        </ActionIcon>

        <Indicator inline label={0} size={14} color="red">
          <ActionIcon variant="transparent" className="text-gray-700">
            <ShoppingCart size={20} weight="bold" />
          </ActionIcon>
        </Indicator>
      </div>
    </div>
  );
};
