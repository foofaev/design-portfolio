/* ****************************************************************************************************************** */

import React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps, Field } from 'redux-form';

import CustomInput, { CustomInputProps } from './CustomInput';

/* ****************************************************************************************************************** */
type FieldProps = CustomInputProps & { className?: string };
interface FormInputProps extends WrappedFieldInputProps { value: string }
interface FormMetaProps extends WrappedFieldMetaProps { error?: string }

export interface WrappedFieldProps {
    input: FormInputProps;
    meta: FormMetaProps;
}
/* ****************************************************************************************************************** */
type InputProps = WrappedFieldProps & FieldProps;

/* eslint-disable react/jsx-props-no-spreading */
/* ****************************************************************************************************************** */
const TextField: React.FC<InputProps> = (props: InputProps & WrappedFieldProps) => {
  const {
    className,
    input: { value, onChange },
    meta: { touched, error = '', invalid },
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
