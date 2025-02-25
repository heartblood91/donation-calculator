import { FC } from 'react';
import { RadioGroup as MuiRadioGroup, Radio, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import type { RadioGroupProps as MuiRadioGroupProps } from '@mui/material';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps extends Omit<MuiRadioGroupProps, 'children'> {
  label?: string;
  options: RadioOption[];
}

export const RadioGroup: FC<RadioGroupProps> = ({
  label,
  options,
  ...props
}) => {
  return (
    <FormControl component="fieldset">
      {label && (
        <FormLabel
          component="legend"
          sx={{
            color: '#374151',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '0.25rem',
            '&.Mui-focused': {
              color: '#2DA4A8',
            },
          }}
        >
          {label}
        </FormLabel>
      )}
      <MuiRadioGroup {...props}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                size="small"
                sx={{
                  padding: '0.25rem',
                  '& .MuiSvgIcon-root': {
                    fontSize: '1rem',
                  },
                  '&.Mui-checked': {
                    color: '#2DA4A8',
                  },
                }}
              />
            }
            label={option.label}
            sx={{
              margin: 0,
              padding: '0.25rem',
              borderRadius: '0.5rem',
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem',
                marginLeft: '0.25rem',
              },
              '&:hover': {
                backgroundColor: '#f3f4f6',
              },
            }}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
}; 