/* ****************************************************************************************************************** */
import React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';

import Button from '@material-ui/core/Button';

import Card from '../Card/Card';
import CardFooter from '../Card/CardFooter';
import ImageUpload from '../Inputs/FileUpload';

/* ****************************************************************************************************************** */
type InputProps = { file: File };

/* ****************************************************************************************************************** */
type Props = InjectedFormProps<InputProps>;

/* ****************************************************************************************************************** */
const AddImageForm: React.FC<Props> = ({ handleSubmit, submitting, pristine }: Props) => (
  <form onSubmit={handleSubmit}>
    <Card>
      <Field name="file" type="file" required component={ImageUpload} />
      <CardFooter>
        <Button type="submit" disabled={submitting || pristine} color="inherit" autoFocus>
          Добавить изображение
        </Button>
      </CardFooter>
    </Card>
  </form>
);

/* ****************************************************************************************************************** */
export default reduxForm<InputProps>({})(AddImageForm);

/* ****************************************************************************************************************** */
