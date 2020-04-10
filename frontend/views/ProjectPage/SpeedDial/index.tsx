import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormSubmitHandler } from 'redux-form';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { Project, ProjectInput, AsyncActionFunction1 } from '../../../types';

import DeleteDialog from './DeleteDialog';

import styles from './styles';

const useStyles = makeStyles(styles);

const actions = [
  { icon: <EditIcon />, name: 'Редактировать' },
  { icon: <DeleteForeverIcon />, name: 'Удалить навсегда' },
];

export type ProjectSpeedDialProps = {
  hidden: boolean;
  project: Project;
  removeProject: AsyncActionFunction1<Project, string>;
  updateProject: FormSubmitHandler<{ project: ProjectInput }>;
};

function ProjectSpeedDial({ hidden, removeProject, updateProject, project }: ProjectSpeedDialProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleDeleteClick = (): void => {
    setOpenDeleteDialog(true);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <SpeedDial
        ariaLabel="Редактировать проект"
        className={classes.root}
        hidden={false}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          icon={<DeleteForeverIcon />}
          tooltipTitle="Удалить навсегда"
          tooltipOpen
          onClick={handleDeleteClick}
        />
      </SpeedDial>
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        removeProject={removeProject}
        project={project}
      />
    </>
  );
}

export default ProjectSpeedDial;
