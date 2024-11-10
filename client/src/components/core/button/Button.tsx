import React, { forwardRef } from 'react';
import { ButtonProps, Button as MantineButton } from '@mantine/core';

interface ICustomButtonProps extends ButtonProps {}

export const Button = forwardRef<HTMLButtonElement, ICustomButtonProps>((props, ref) => {
  return <MantineButton ref={ref} {...props} />;
});

Button.displayName = 'Button';
