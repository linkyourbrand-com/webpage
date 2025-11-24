'use client';
import { useState, MouseEvent } from 'react';
import CreateEventForm from '@/components/createEvent/CreateEventForm';
import './eventdropdown.css';

export default function CreateEventDropdown() {
  const [isOpen, setOpen] = useState(false);

  const toggleDown = () => setOpen(prev => !prev);

  const stopProp = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDown} type="button" className="btn btn-primary">
        Create Event
      </button>

      {isOpen && (
        <div className="dropdown-content p-3" onClick={stopProp}>
          <CreateEventForm onSubmit={() => console.log("submitted")} />
        </div>
      )}
    </div>
  );
}
