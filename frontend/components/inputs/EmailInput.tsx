/* ****************************************************************************************************************** */

import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';

import CustomInput, { CustomInputProps } from './CustomInput';

/* ****************************************************************************************************************** */
type InputProps = WrappedFieldProps & CustomInputProps & { className: string };

const EmailField: React.FC<InputProps> = (props: InputProps) => {
  const {
    className,
    input: { value, onChange },
    meta: { touched, error },
  } = props;
  return (
    <CustomInput
      id="email"
      formControlProps={{
        fullWidth: true,
      }}
      error={!!error}
      inputProps={{
        placeholder: 'Email...',
        type: 'email',
        value,
        onChange,
        inputProps: {
          'aria-label': touched && error,
        },
        startAdornment: (
          <InputAdornment position="start">
            <Email className={className} />
          </InputAdornment>
        ),
      }}
    />
  );
};

/* ****************************************************************************************************************** */
export default EmailField;

/* ****************************************************************************************************************** */
