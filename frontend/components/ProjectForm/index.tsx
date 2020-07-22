/* ****************************************************************************************************************** */

import React from 'react';
import { connect } from 'react-redux';
import { FormSubmitHandler } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import GridItem from '../Grid/GridItem';
import GridContainer from '../Grid/GridContainer';

import { State, Project, AsyncActionFunction } from '../../types';
import styles from './styles';
import EditImagesForm from './EditImages';
import AddImageForm from './AddImage';

import { addProject } from '../../actions/projects';
import { updateProject } from '../../actions/project';
import { saveProjectImage, updateProjectImageOrd, removeProjectImage } from '../../actions/projectFiles';

/* ****************************************************************************************************************** */
type StateProps = Pick<State, 'projectUpdatingState' | 'projectAddingState'>;

type DispatchProps = {
  updateProject: typeof updateProject;
  addProject: typeof addProject;
  // saveProjectImage: (projectId: string) => FormSubmitHandler<{ file: File }>;
  saveProjectImage: typeof saveProjectImage;
  updateProjectImageOrd: typeof updateProjectImageOrd; // invalid type && change to updateProjectImagesOrd
  removeProjectImage: (data: { fileId: string; projectId: string }) => void;
};

type OwnProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project?: Project;
  create?: boolean;
};

/* ****************************************************************************************************************** */
const mapStateToProps = ({ projectUpdatingState, projectAddingState }: State): StateProps => ({
  projectUpdatingState,
  projectAddingState,
});

/* ****************************************************************************************************************** */
const actionCreators = {
  addProject,
  updateProject,
  saveProjectImage,
  updateProjectImageOrd,
  removeProjectImage,
};

/* ****************************************************************************************************************** */
const connector = connect<StateProps, DispatchProps, OwnProps, State>(mapStateToProps, actionCreators);

/* ****************************************************************************************************************** */

export type ProjectFormProps = StateProps & DispatchProps & OwnProps;

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
const Transition = React.forwardRef(
  (props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) => (
    <Slide direction="up" ref={ref} {...props} /> // eslint-disable-line react/jsx-props-no-spreading
  ),
);

/* ****************************************************************************************************************** */
const ProjectFormDialog: React.FC<ProjectFormProps> = ({
  create,
  open,
  setOpen,
  project,
  projectAddingState,
  projectUpdatingState,
  ...actions
}: ProjectFormProps) => {
  const classes = useStyles();

  const handleClose = (): void => {
    setOpen(false);
  };

  const onSaveImageSubmit = project && actions.saveProjectImage(project.id);

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {!create && project ? `Обновление проекта ${project.title}` : 'Создание нового проекта'}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Сохранить
          </Button>
        </Toolbar>
      </AppBar>
      <GridContainer spacing={2} justify="center">
        <GridItem xs={12} sm={12} md={8} lg={8}>
          {project && project.id && <AddImageForm form="addImageForm" onSubmit={onSaveImageSubmit} />}
          {project && <EditImagesForm projectId={project.id} images={project.files} />}
        </GridItem>
      </GridContainer>
    </Dialog>
  );
};

/* ****************************************************************************************************************** */
export default connector(ProjectFormDialog);

/* ****************************************************************************************************************** */
