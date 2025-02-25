import { FC } from 'react';
import { LinearProgress } from '@mui/material';
import type { LinearProgressProps } from '@mui/material';

export interface ProgressProps extends Omit<LinearProgressProps, 'variant'> {
  value: number;
}

export const Progress: FC<ProgressProps> = ({
  value,
  ...props
}) => {
  return (
    <LinearProgress
      variant="determinate"
      value={value}
      {...props}
      sx={{
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E5F5F5',
        '& .MuiLinearProgress-bar': {
          borderRadius: 2,
          background: 'linear-gradient(90deg, #2DA4A8 0%, #259397 100%)',
        },
        ...props.sx,
      }}
    />
  );
}; 