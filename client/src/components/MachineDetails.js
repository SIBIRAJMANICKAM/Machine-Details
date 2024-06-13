import React, { useEffect, useState } from "react";
import '../styles/MachineDetails.css';  // Import the custom CSS file
import { useParams } from 'react-router-dom';

export const MachineDetails = () => {
  const [getMachine, setMachine] = useState([]);
  console.log(getMachine);

  const {id}=useParams();
  console.log(id);

  const getd = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getmachine/${id}/`, {
        method: 'GET',
      });

      const data = await response.json();
      if (response.status === 201) {
        setMachine(data);
        console.log('Machine details got successfully!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert(`Error getting machine details: ${error.message}`);
    }
  };

  useEffect(() => {
    getd();
  }, []);



  

  const handleUpdate = () => {
    // Handle update logic here, e.g., redirect to edit page or modal
    console.log('Update button clicked');
  };

  const handleDelete = () => {
    // Handle delete logic here, e.g., show confirmation dialog
    console.log('Delete button clicked');
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Welcome Soorya</h1>
        <div className="card">
        <img 
               src={`http://localhost:5000/images/${(getMachine.machineImage).replace('uploads\\', '')}`}  
                alt={getMachine.name} 
                style={{ width: '50px', height: '50px', borderRadius:'50px' }} 
                />
                
          <div className="card-body">
            <h5 className="card-title">{getMachine.name}</h5>
            <p className="card-text"><strong>Description:</strong> {getMachine.description}</p>
            <p className="card-text"><strong>Website:</strong> <a href={getMachine.website} target="_blank" rel="noopener noreferrer">{getMachine.website}</a></p>
            <p className="card-text"><strong>Support Mail:</strong> {getMachine.supportMail}</p>
            <p className="card-text"><strong>Support Contact:</strong> {getMachine.supportContact}</p>
            <p className="card-text"><strong>Year of Establishment:</strong> {getMachine.establishmentYear}</p>
            <p className="card-text"><strong>Number of Machines:</strong> {getMachine.numberOfMachines}</p>
            <p className="card-text"><strong>Machine Make:</strong> {getMachine.machineMake}</p>
            <p className="card-text"><strong>Machine ID:</strong> {getMachine.id}</p>
          </div>
          <div className="d-flex justify-content-evenly">
            <button className="btn btn-warning" onClick={handleUpdate}>Update</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
