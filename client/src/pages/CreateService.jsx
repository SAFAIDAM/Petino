
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import CreateServiceForm from '../components/CreateServicee'
  import { useSelector } from 'react-redux';


  function CreateService() {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editedService, setEditedService] = useState(null);

    const userId = useSelector(state => state.user);

    

    return (
      <div>
        
        <CreateServiceForm setServices={setServices} setShowCreateForm={setShowCreateForm} />
        {error && <p>Error: {error}</p>}
        
      
        {editedService && (
          <div>
            <h2>Edit Service</h2>
            <CreateServiceForm
              initialData={editedService}
              setServices={setServices}
              setShowCreateForm={setShowCreateForm}
              updateService={updateService} 
              userId={userId} // Pass userId as a prop
/>

            
          </div>
        )}
        
      </div>
    );
  }

  export default CreateService




