import { FC, ReactNode } from 'react';
import { Alert as MuiAlert } from '@mui/material';
import type { AlertProps as MuiAlertProps } from '@mui/material';

export interface AlertProps extends Omit<MuiAlertProps, 'variant'> {
  children: ReactNode;
  icon?: ReactNode;
}

export const Alert: FC<AlertProps> = ({
  severity = 'info',
  children,
  icon,
  ...props
}) => {
  return (
    <MuiAlert
      severity={severity}
      icon={icon}
      {...props}
      sx={{
        borderRadius: '0.5rem',
        backgroundColor: '#f3f4f6',
        border: '1px solid #e5e7eb',
        '& .MuiAlert-icon': {
          color: '#2DA4A8',
        },
        ...props.sx,
      }}
    >
      {children}
    </MuiAlert>
  );
}; 