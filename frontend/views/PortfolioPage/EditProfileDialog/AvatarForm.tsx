/* ****************************************************************************************************************** */
import React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import Card from '../../../components/Card/Card';
import CardBody from '../../../components/Card/CardBody';
import CardHeader from '../../../components/Card/CardHeader';
import CardFooter from '../../../components/Card/CardFooter';
import CardIcon from '../../../components/Card/CardIcon';
import CardAvatar from '../../../components/Card/CardAvatar';

import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';
import ImageUpload from '../../../components/FileUpload';

import styles from './styles';

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
