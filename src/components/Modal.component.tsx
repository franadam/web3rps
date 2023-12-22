import React, { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface ModalProps {
  render?: React.ReactNode;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ render, title, isOpen, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{render}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
