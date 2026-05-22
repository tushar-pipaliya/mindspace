import React from 'react'
import ViewCard from '../viewCard/viewCard';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import DeleteCard from '../deleteCard/deleteCard';



function MainCard({ selectv, deleteCardData, id }) {
  const limitDesc = 50;
  const activityLimit = 20;


  const previewDesc =
    selectv.desc.length > limitDesc
      ? selectv.desc.slice(0, limitDesc) + "..."
      : selectv.desc;


  const previewActivity = selectv.activity.length > activityLimit ? selectv.activity.slice(0, activityLimit) + "..." : selectv.activityLimit;
  const deleteData = () => {
    deleteCardData(id)
  }

  return (
    <div className="bg-white grid grid-cols-1 p-6 gap-3 rounded-xl min-h-60 max-h-60 hover:shadow-xl  duration-300 ">

      {/* Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-3xl">{selectv.mood}</h1>
        <div>
          <h5 className='font-semibold mb-1 text-base '>{previewActivity}</h5>
          <p className='text-xs font-medium text-gray-700'>{selectv.date}</p>
        </div>
      </div>

      {/* Description Preview */}
      <div>
        <p className="text-gray-700 text-sm font-me ">
          {previewDesc}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-end">
        {/* View Details → Full Text */}
        <ViewCard dataView={selectv} entryDate={selectv.date} />

        <DeleteCard deleteCardInView={deleteData}  />
      </div>
    </div>
  );
}

export default MainCard;
