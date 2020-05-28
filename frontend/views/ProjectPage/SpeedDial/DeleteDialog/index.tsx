import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Project } from '../../../../types';

type DeleteAlertDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project: Project;
  removeProject: ({ project }: { project: Project }) => void;
};

const DeleteAlertDialog: React.FC<DeleteAlertDialogProps> = ({
  open,
  setOpen,
  project,
  removeProject,
}: DeleteAlertDialogProps) => {
  const history = useHistory();
  const handleClose = (): void => {
    setOpen(false);
  };
  const handleClick = (): void => {
    removeProject({ project });
    history.push('/');
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Вы уверены, что хотите удалить проект ${project.title}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Эта операция не обратима, все изображения проекта тоже будут удалены.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Оставить
          </Button>
          <Button onClick={handleClick} color="primary" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAlertDialog;
