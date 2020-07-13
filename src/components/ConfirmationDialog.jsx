import React from 'react';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function ConfirmationDialog({ open, onClose }) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A vehicle is already assigned for this planet. 
            Are you sure you want to select this planet and add an 
            additional vehicle for this planet?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose(false)} color="secondary">
            No
          </Button>
          <Button onClick={onClose(true)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}