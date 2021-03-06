/* ****************************************************************************************************************** */

import React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import CustomInput, { CustomInputProps } from '../../../components/CustomInput';

/* ****************************************************************************************************************** */
interface FormInputProps extends WrappedFieldInputProps { value: string }
interface FormMetaProps extends WrappedFieldMetaProps { error?: string | Error }

export interface WrappedFieldProps {
    input: FormInputProps;
    meta: FormMetaProps;
}

type InputProps = WrappedFieldProps & CustomInputProps & { className: string };

/* ****************************************************************************************************************** */
const PasswordField: React.FC<InputProps> = (props: InputProps) => {
  const {
    className,
    input: { value, onChange },
    meta: { touched, error },
  } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  return (
    <CustomInput
      id="pass"
      formControlProps={{
        fullWidth: true,
      }}
      error={!!error}
      inputProps={{
        placeholder: 'Пароль...',
        type: showPassword ? 'text' : 'password',
        value,
        onChange,
        inputProps: {
          'aria-label': touched && error ? error.toString() : undefined, /* TODO: had to use undefined for type compatibility */
        },
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon className={className} />
          </InputAdornment>
        ),
        endAdornment: !error && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
        autoComplete: 'off',
      }}
    />
  );
};

/* ****************************************************************************************************************** */
export default PasswordField;

/* ****************************************************************************************************************** */
