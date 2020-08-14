/* ****************************************************************************************************************** */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import { Project } from '../../../types';

import DeleteDialog from './DeleteDialog';
import EditProjectDialog from '../../../components/ProjectForm';

import styles from './styles';

/* ****************************************************************************************************************** */
const useStyles = makeStyles(styles);

/* ****************************************************************************************************************** */
export type ProjectSpeedDialProps = {
  hidden: boolean;
  project: Project;
  removeProject: ({ project }: { project: Project }) => void;
};

/* ****************************************************************************************************************** */
const ProjectSpeedDial: React.FC<ProjectSpeedDialProps> = ({
  // hidden,
  removeProject,
  // updateProject,
  project,
}: ProjectSpeedDialProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const handleDeleteClick = (): void => {
    setOpenDeleteDialog(true);
  };

  const handleEditClick = (): void => {
    setOpenEditDialog(true);
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
        <SpeedDialAction
          icon={<EditIcon />}
          tooltipTitle="Редактировать"
          tooltipOpen
          onClick={handleEditClick}
        />
      </SpeedDial>
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        removeProject={removeProject}
        project={project}
      />
      <EditProjectDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        project={project}
      />
    </>
  );
};

/* ****************************************************************************************************************** */
export default ProjectSpeedDial;

/* ****************************************************************************************************************** */
