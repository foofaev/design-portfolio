/* ****************************************************************************************************************** */

import * as React from 'react';
import { WrappedFieldProps, Field } from 'redux-form';

import CustomInput, { CustomInputProps } from './CustomInput';

/* ****************************************************************************************************************** */
type FieldProps = CustomInputProps & { className?: string };

/* ****************************************************************************************************************** */
type InputProps = WrappedFieldProps & FieldProps;

/* eslint-disable react/jsx-props-no-spreading */
/* ****************************************************************************************************************** */
const TextField: React.FC<InputProps> = (props: InputProps & WrappedFieldProps) => {
  const {
    className,
    input: { value, onChange },
    meta: { touched, error, invalid },
    inputProps = {},
    formControlProps = {},
    ...rest
  } = props;
  return (
    <CustomInput
      formControlProps={{
        fullWidth: true,
        ...formControlProps,
      }}
      error={touched && invalid}
      inputProps={{
        ...inputProps,
        value,
        onChange,
        inputProps: {
          'aria-label': touched && error,
        },
      }}
      {...rest}
    />
  );
};

/* ****************************************************************************************************************** */
export default ({ id, required = false, ...rest }: FieldProps & { required?: boolean }) => (
  <Field name={id} required={required} component={TextField} props={{ ...rest, id }} />
);

/* ****************************************************************************************************************** */
