import { FC, ReactNode } from 'react';
import { Card as MuiCard, CardContent as MuiCardContent, CardHeader as MuiCardHeader } from '@mui/material';
import type { CardProps as MuiCardProps } from '@mui/material';

export interface CardProps extends MuiCardProps {
  title?: string;
  subheader?: string;
  headerIcon?: ReactNode;
  children: ReactNode;
}

export const Card: FC<CardProps> = ({
  title,
  subheader,
  headerIcon,
  children,
  ...props
}) => {
  return (
    <MuiCard
      {...props}
      sx={{
        border: '1px solid #e5e7eb',
        borderRadius: '0.75rem',
        boxShadow: 'none',
        ...props.sx,
      }}
    >
      {(title || headerIcon) && (
        <MuiCardHeader
          title={title}
          subheader={subheader}
          avatar={headerIcon}
          sx={{
            padding: '0.75rem 1rem',
            '& .MuiCardHeader-avatar': {
              marginRight: '0.75rem',
            },
            '& .MuiCardHeader-title': {
              fontSize: '1.125rem',
              fontWeight: 500,
              color: '#1f2937',
            },
            '& .MuiCardHeader-subheader': {
              fontSize: '0.875rem',
              color: '#6b7280',
            },
          }}
        />
      )}
      <MuiCardContent sx={{ padding: '0.75rem 1rem', '&:last-child': { paddingBottom: '0.75rem' } }}>
        {children}
      </MuiCardContent>
    </MuiCard>
  );
}; 