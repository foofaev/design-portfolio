/* ****************************************************************************************************************** */

import React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';

import CustomInput, { CustomInputProps } from '../../../components/CustomInput';

/* ****************************************************************************************************************** */
interface FormInputProps extends WrappedFieldInputProps { value: string }
interface FormMetaProps extends WrappedFieldMetaProps { error?: string | Error }

export interface WrappedFieldProps {
    input: FormInputProps;
    meta: FormMetaProps;
}
/* ****************************************************************************************************************** */
type InputProps = WrappedFieldProps & CustomInputProps & { className: string };

/* ****************************************************************************************************************** */
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
          'aria-label': touched && error ? error.toString() : undefined, /* TODO: had to use undefined for type compatibility */
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
