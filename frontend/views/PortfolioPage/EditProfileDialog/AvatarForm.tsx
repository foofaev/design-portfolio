/* ****************************************************************************************************************** */
import React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';

import Button from '@material-ui/core/Button';

import Card from '../../../components/Card/Card';
import CardFooter from '../../../components/Card/CardFooter';
import ImageUpload from '../../../components/FileUpload';

/* ****************************************************************************************************************** */
type InputProps = { avatar: File };
type OwnProps = { imageUrl?: string };

/* ****************************************************************************************************************** */
type Props = InjectedFormProps<InputProps, OwnProps> & OwnProps;

/* ****************************************************************************************************************** */
const ChangeAvatarForm: React.FC<Props> = ({ handleSubmit, submitting, pristine, imageUrl }: Props) => (
  <form onSubmit={handleSubmit}>
    <Card>
      <Field name="avatar" type="file" props={{ avatar: true, imageUrl }} required component={ImageUpload} />
      <CardFooter>
        <Button type="submit" disabled={submitting || pristine} color="inherit" autoFocus>
          Сохранить аватар
        </Button>
      </CardFooter>
    </Card>
  </form>
);

/* ****************************************************************************************************************** */
export default reduxForm<InputProps, OwnProps>({
  enableReinitialize: true,
})(ChangeAvatarForm);

/* ****************************************************************************************************************** */
