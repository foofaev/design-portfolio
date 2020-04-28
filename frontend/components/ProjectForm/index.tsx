import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import styles from './styles';
import { Project, AsyncActionFunction1 } from '../../types';

export type ProjectFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project?: Project;
  saveProject?: AsyncActionFunction1<Project>;
  updateProject?: AsyncActionFunction1<Project>;
  edit?: boolean;
  create?: boolean;
};

// title: { type: 'string' },
// ord: { type: 'integer' },
// description: { type: 'string' },
// isVisible: { type: 'boolean' },
// publishedAt: { type: 'string' },

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(
  (props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) => (
    <Slide direction="up" ref={ref} {...props} />
  ),
);

function ProjectFormDialog({ edit, create, open, setOpen, updateProject, saveProject, project }: ProjectFormProps) {
  const classes = useStyles();

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {edit && project ? `Обновление проекта ${project.title}` : 'Создание нового проекта'}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Сохранить
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Default notification ringtone" secondary="Tethys" />
        </ListItem>
      </List>
    </Dialog>
  );
}
export default ProjectFormDialog;
