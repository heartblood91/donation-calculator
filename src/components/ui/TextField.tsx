import { FC } from 'react';
import { TextField as MuiTextField } from '@mui/material';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
  variant?: 'outlined' | 'standard' | 'filled';
}

export const TextField: FC<TextFieldProps> = ({ 
  variant = 'outlined',
  size = 'small',
  fullWidth = true,
  ...props 
}) => {
  return (
    <MuiTextField
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...props}
      InputProps={{
        ...props.InputProps,
        sx: {
          '& input[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
          },
          borderRadius: '0.5rem',
          ...props.InputProps?.sx,
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '42px',
          '&.Mui-focused fieldset': {
            borderColor: '#2DA4A8',
            borderWidth: '2px',
          },
        },
        '& .MuiInputLabel-root': {
          transform: 'translate(14px, 11px) scale(1)',
          '&.Mui-focused, &.MuiFormLabel-filled': {
            transform: 'translate(14px, -9px) scale(0.75)',
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#2DA4A8',
        },
        '& .MuiFormHelperText-root': {
          marginLeft: 0,
          marginTop: '4px',
          fontSize: '0.875rem',
          fontStyle: 'italic',
          color: '#6B7280',
        },
        ...props.sx,
      }}
    />
  );
}; 