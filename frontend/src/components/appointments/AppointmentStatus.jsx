import React, { useState } from 'react';

const AppointmentStatus = ({ currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const statuses = [
    { value: 'pending', label: '🟡 Pending' },
    { value: 'confirmed', label: '🟢 Confirmed' },
    { value: 'cancelled', label: '🔴 Cancelled' },
  ];

  const handleStatusChange = (newStatus) => {
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1 rounded text-sm font-medium ${
          currentStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
          currentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}
      >
        Change Status ▾
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
          <div className="py-1">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  status.value === currentStatus ? 'bg-blue-50 font-semibold' : ''
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentStatus;