/* ****************************************************************************************************************** */
import React from 'react';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import InputLabel, { InputLabelProps } from '@material-ui/core/InputLabel';
import Input, { InputProps } from '@material-ui/core/Input';

import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check';

import styles from './styles';

/* ****************************************************************************************************************** */
export type CustomInputProps = {
  labelText?: React.ReactNode;
  labelProps?: InputLabelProps;
  id: string;
  inputProps?: InputProps;
  formControlProps?: FormControlProps;
  inputRootCustomClasses?: string;
  error?: boolean;
  success?: boolean;
  white?: boolean;
};

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
const CustomInput: React.FC<CustomInputProps> = (props: CustomInputProps) => {
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
  } = props;
  const classes = useStyles();
  const labelClasses = cn({
    [` ${classes.labelRootError}`]: error,
    [` ${classes.labelRootSuccess}`]: success && !error,
  });
  const underlineClasses = cn({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white,
  });
  const marginTop = cn(inputRootCustomClasses);
  const inputClasses = cn({
    [classes.input]: true,
    [classes.whiteInput]: white,
  });
  const formControlClasses = formControlProps
    ? cn(formControlProps.className, classes.formControl)
    : classes.formControl;

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText ? (
        <InputLabel className={`${classes.labelRoot} ${labelClasses}`} htmlFor={id} {...labelProps}>
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
      />
      {error && <Clear className={`${classes.feedback} ${classes.labelRootError}`} />}
      {success && <Check className={`${classes.feedback} ${classes.labelRootSuccess}`} />}
    </FormControl>
  );
};

/* ****************************************************************************************************************** */
export default CustomInput;

/* ****************************************************************************************************************** */
