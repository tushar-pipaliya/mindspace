import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
}));

function ViewCard({ dataView, entryDate }) {
  const [open, setOpen] = useState(false);

  if (!dataView) return null;

  return (
    <>
      {/* Trigger */}
      <p
        className="text-blue-500 hover:underline cursor-pointer font-medium"
        onClick={() => setOpen(true)}
      >
        View Full
      </p>

      {/* Dialog */}
      <BootstrapDialog open={open} onClose={() => setOpen(false)}>
        {/* Close Icon */}
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <div className='w-140'>
          <DialogContent>
            {/* SAME WIDTH & STRUCTURE */}
            <div className="w-full">
              <div className="flex items-center gap-7">
                <h1 className="text-4xl">{dataView.mood}</h1>

                <div>
                  <h5 className="font-semibold">{dataView.activity}</h5>
                  <p className="text-sm text-gray-500">{entryDate}</p>
                </div>
              </div>

              <div className="mt-6 text-gray-700 ">
                <p className='m-h-60'>{dataView.desc}</p>
              </div>
            </div>
          </DialogContent>
        </div>
      </BootstrapDialog>
    </>
  );
}

export default ViewCard;
