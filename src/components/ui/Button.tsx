import { FC, ReactNode } from 'react';
import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'contained' | 'outlined' | 'text';
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  children,
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      {...props}
      sx={{
        borderRadius: '0.5rem',
        textTransform: 'none',
        backgroundColor: variant === 'contained' ? '#2DA4A8' : undefined,
        '&:hover': {
          backgroundColor: variant === 'contained' ? '#259397' : undefined,
        },
        ...props.sx,
      }}
    >
      {children}
    </MuiButton>
  );
}; 