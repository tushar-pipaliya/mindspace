import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: '700px',
    borderRadius: '20px',
    margin: theme.spacing(2),
  },

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
      <BootstrapDialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <div className="w-full">

            {/* Header */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-7 flex-col sm:flex-row">

              <h1 className="text-5xl sm:text-6xl">
                {dataView.mood}
              </h1>

              <div className="break-words">
                <h5 className="font-semibold text-lg sm:text-xl">
                  {dataView.activity}
                </h5>

                <p className="text-sm text-gray-500">
                  {entryDate}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 text-gray-700">
              <p className="text-sm sm:text-base leading-7 whitespace-pre-wrap break-words">
                {dataView.desc}
              </p>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

export default ViewCard;