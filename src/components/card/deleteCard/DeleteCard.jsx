import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteCard({ deleteCardInView }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>

      <span onClick={handleClickOpen} className="cursor-pointer"><DeleteIcon className='text-red-500 ' /></span>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Entry"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently delete this journal entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className='!bg-gray-500 !text-white !capitalize !text-sm'>Cancle</Button>
          <Button onClick={deleteCardInView} autoFocus className='!bg-red-500 !text-white !text-sm !capitalize !font-medium' >Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteCard






