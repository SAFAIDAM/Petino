import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import ArrowPutton from '../components/ArrowPutton';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AdminServices() {
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null); // State to store the service being edited

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/services')
      .then((result) => setServices(result.data))
      .catch((err) => console.log(err));
  }, []);

  // Function to handle service deletion
  const handleDelete = (id) => {
    // Display confirmation popup
    const isConfirmed = window.confirm('Are you sure you want to delete this service?');
  
    if (isConfirmed) {
      // Make API call to delete service with given id
      axios
        .delete(`http://localhost:8000/api/services/${id}`)
        .then(() => {
          // Update services state by removing the deleted service
          setServices(services.filter((service) => service._id !== id));
          // Show success toast notification
          toast.success('Service deleted successfully.');
        })
        .catch((err) => {
          console.log(err);
          // Show error toast notification if deletion fails
          toast.error('Failed to delete service. Please try again.');
        });
    }
  };
  
  

  
  const cancelEdit = () => {
   
    setService(null);
  };

 
  const handleSubmit = () => {

    console.log('Submitting edited service data:', service);
 
    setService(null);
  };

  const handleChange = (e) => {
  
    setService({
      ...service,
      [e.target.name]: e.target.value
    });
  };


  if (service) {
    return (
      <div>
        <h1>Edit Service</h1>
        {/* Form for editing service details */}
        <form onSubmit={handleSubmit}>
          <label>
            Service Name:
            <input type="text" name="name" value={service.name} onChange={handleChange} />
          </label>
          {/* Add more input fields for other service details */}
          <button type="submit">Save</button>
          <button type="button" onClick={cancelEdit}>Cancel</button>
        </form>
      </div>
    );
  }


  return (
    <div className="">
      <AdminHeader />
      <div className="ml-auto mr-auto">
        <div className="justify-between max-w-6xl p-3 tems-center md:flex mt-11">
          <div className="items-center justify-center gap-6 md:flex md:ml-40">
            <ArrowPutton />
           
          </div>
          <div className="flex items-center justify-center gap">
            <div>
              <h1 className="mt-8 heading-signup">Services Table</h1>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto shadow-md mr-11 ml-11 sm:rounded-lg mt-11">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400 md:min-w-full">
            <thead className="text-xs text-gray-700 uppercase bg-[#FAD0B7] bg:[#FAD0B7] dark:text-[#fac0b7]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr
                  key={service._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img
                      className="rounded-[10px]"
                      src={service.imageURL}
                      alt="Service Image"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {service.username}
                  </td>
                  <td className="px-6 py-4">{service.description}</td>
                  <td className="px-6 py-4">
                    {new Date(service.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(service.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{service.rangePrice}</td>
                  <td className="px-6 py-4">{service.location}</td>
                  <td className="px-6 py-4">{service.email}</td>
                  <td className="px-6 py-4">{service.statut}</td> {/* Add status column */}
                  <td className="px-6 py-4">
                    <button
                      className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="md:flex justify-center h-[2px] bg-[#bcbcbc]"></div>
      <Footer />
    </div>
  );
}

export default AdminServices;
