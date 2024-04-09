import React, { useState } from 'react';
import CreateP from '../components/CreateServicee';

function EditModal({ editedService, updateService, setEditedService, setServices }) {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditedService(null); // Reset editedService
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      {/* Use 'overflow-y-auto' to allow vertical scrolling */}
      <div className=" p-8 rounded-lg w-full sm:w-auto  flex flex-col items-center overflow-y-auto max-h-[80vh]">
        {/* Set width to 'full' on small screens and 'auto' on larger screens */}
        <button onClick={handleCloseModal} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800">
          Close
        </button>
        <CreateP
          initialData={editedService}
          setServices={setServices}
          setShowCreateForm={handleCloseModal}
          updateService={updateService}
        />
      </div>
    </div>
  );
}

export default EditModal;
