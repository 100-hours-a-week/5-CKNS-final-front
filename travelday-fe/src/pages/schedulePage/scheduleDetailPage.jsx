import React from 'react';
import { useLocation } from 'react-router-dom';

const ScheduleDetail = () => {
  const location = useLocation();
  const { schedule } = location.state;

  return (
    <div>
      <h1>{schedule.title}</h1>
      <p>{schedule.date}</p>
    </div>
  );
};

export default ScheduleDetail;
