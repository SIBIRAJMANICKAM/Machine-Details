import React from 'react';
import '../styles/MachineDetails.css';  // Import the custom CSS file

export const MachineDetails = () => {
  // Mock data
  const machine = {
    id: '123456789',  // Example machine ID
    name: 'Machine X',
    description: 'High-performance machine designed for industrial use.',
    website: 'https://machine-x.example.com',
    supportMail: 'support@machine-x.example.com',
    supportContact: '+1234567890',
    establishmentYear: 2005,
    numberOfMachines: 50,
    machineMake: 'XYZ Corporation',  // Example machine make
    photo: 'https://via.placeholder.com/150' // URL of the machine's photo
  };

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
          <img src={machine.photo} className="card-img" alt={machine.name} />
          <div className="card-body">
            <h5 className="card-title">{machine.name}</h5>
            <p className="card-text"><strong>Description:</strong> {machine.description}</p>
            <p className="card-text"><strong>Website:</strong> <a href={machine.website} target="_blank" rel="noopener noreferrer">{machine.website}</a></p>
            <p className="card-text"><strong>Support Mail:</strong> {machine.supportMail}</p>
            <p className="card-text"><strong>Support Contact:</strong> {machine.supportContact}</p>
            <p className="card-text"><strong>Year of Establishment:</strong> {machine.establishmentYear}</p>
            <p className="card-text"><strong>Number of Machines:</strong> {machine.numberOfMachines}</p>
            <p className="card-text"><strong>Machine Make:</strong> {machine.machineMake}</p>
            <p className="card-text"><strong>Machine ID:</strong> {machine.id}</p>
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
