/* ****************************************************************************************************************** */

import * as React from 'react';
import { WrappedFieldProps, Field } from 'redux-form';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import CustomInput, { CustomInputProps } from '../../../components/CustomInput';

/* ****************************************************************************************************************** */
type InputProps = WrappedFieldProps & CustomInputProps;

/* ****************************************************************************************************************** */
const PasswordField: React.FC<InputProps> = (props: InputProps) => {
  const {
    input: { value, onChange },
    meta: { touched, error },
    labelText,
    id,
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
      id={id}
      formControlProps={{
        fullWidth: true,
      }}
      error={!!error}
      success={!error && touched}
      labelText={labelText}
      inputProps={{
        type: showPassword ? 'text' : 'password',
        value,
        onChange,
        inputProps: {
          'aria-label': touched && error,
        },
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
export default ({ id, ...rest }: CustomInputProps) => (
  <Field name={id} required component={PasswordField} props={{ ...rest, id }} />
);

/* ****************************************************************************************************************** */
