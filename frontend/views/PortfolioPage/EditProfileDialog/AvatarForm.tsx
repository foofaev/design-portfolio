/* ****************************************************************************************************************** */
import React from 'react';
import { reduxForm, InjectedFormProps, Form } from 'redux-form';

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
type InputProps = { file: File };

/* ****************************************************************************************************************** */
type Props = InjectedFormProps<InputProps>;

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
const ChangeAvatarForm: React.FC<Props> = ({
  handleSubmit,
  submitting,
  pristine,
  reset,
}: Props) => {
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <ImageUpload avatar />
      </Card>
    </form>
  );
};

/* ****************************************************************************************************************** */
export default reduxForm<InputProps>({
  enableReinitialize: true,
})(ChangeAvatarForm);

/* ****************************************************************************************************************** */
