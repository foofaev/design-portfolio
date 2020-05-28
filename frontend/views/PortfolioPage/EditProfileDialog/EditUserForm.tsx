/* ****************************************************************************************************************** */
import React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import Card from '../../../components/Card/Card';
import CardBody from '../../../components/Card/CardBody';
import CardHeader from '../../../components/Card/CardHeader';
import CardFooter from '../../../components/Card/CardFooter';
import CardIcon from '../../../components/Card/CardIcon';
import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';
import TextField from './TextField';

import { UserInput } from '../../../types';

import styles from './styles';

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
type Props = InjectedFormProps<UserInput>;

/* ****************************************************************************************************************** */
const EditUserForm: React.FC<Props> = ({
  handleSubmit,
  submitting,
  pristine,
}: Props) => {
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader color="warning" className={classes.cardHeader} icon>
          <CardIcon color="warning">
            <PersonOutlineOutlinedIcon />
          </CardIcon>
          <p>Редактировать профиль</p>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <TextField id="email" required labelText="Email" inputProps={{ type: 'email' }} />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <TextField id="firstName" required labelText="Имя" inputProps={{ type: 'text' }} />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <TextField id="lastName" required labelText="Фамилия" inputProps={{ type: 'text' }} />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <TextField id="facebookLink" labelText="facebook" inputProps={{ type: 'url' }} />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField id="vkLink" labelText="вконтакте" inputProps={{ type: 'url' }} />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField id="instagramLink" labelText="instagram" inputProps={{ type: 'url' }} />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                labelText="Краткое описание"
                id="about"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: 'text',
                  multiline: true,
                  rows: 5,
                }}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                labelText="Подробное описание"
                id="description"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: 'text',
                  multiline: true,
                  rows: 5,
                }}
              />
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter>
          <Button type="submit" disabled={submitting || pristine} color="inherit" autoFocus>
            Сохранить изменения
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

/* ****************************************************************************************************************** */
export default reduxForm<UserInput>({
  enableReinitialize: true,
})(EditUserForm);

/* ****************************************************************************************************************** */
