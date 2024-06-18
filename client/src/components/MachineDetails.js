import React, { useEffect, useState } from "react";
import '../styles/MachineDetails.css';  // Import the custom CSS file
import { useParams,NavLink, useNavigate } from 'react-router-dom';

export const MachineDetails = () => {
  const [getMachine, setMachine] = useState({});
  console.log(getMachine);
  const navigate=useNavigate();
  const { id } = useParams();
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
  }, [id]);


  const deleteuser = async (id) => {
    try {
      const res2 = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      });

      if (res2.status === 422) {
        console.log("Error");
        return;
      }
      
      const deletedata = await res2.json();
      console.log(deletedata);

      if (res2.status === 201) {
        alert("User Deleted");
        navigate('/');
      } else {
        console.log("Error", deletedata);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="container">
      <div className="content">
        
        <div className="card">
          {getMachine.machineImage ? (
            <img
              src={`http://localhost:5000/images/${getMachine.machineImage.replace('uploads\\', '')}`}
              alt={getMachine.name}
              style={{ width: '200px', height: '200px', borderRadius: '50px' }}
            />
          ) : (
            <div style={{ width: '50px', height: '50px', borderRadius: '50px', backgroundColor: '#ccc' }} />
          )}
          <div className="card-body">
            <h5 className="card-title">{getMachine.machineName || 'N/A'}</h5>
            <p className="card-text"><strong>Description:</strong> {getMachine.description || 'N/A'}</p>
            <p className="card-text"><strong>Website:</strong> <a href={getMachine.website || '#'} target="_blank" rel="noopener noreferrer">{getMachine.website || 'N/A'}</a></p>
            <p className="card-text"><strong>Support Mail:</strong> {getMachine.supportMail || 'N/A'}</p>
            <p className="card-text"><strong>Support Contact:</strong> {getMachine.supportContact || 'N/A'}</p>
            <p className="card-text"><strong>Year of Establishment:</strong> {getMachine.establishmentYear || 'N/A'}</p>
            <p className="card-text"><strong>Number of Machines:</strong> {getMachine.numberOfMachines || 'N/A'}</p>
            <p className="card-text"><strong>Machine Make:</strong> {getMachine.machineMake || 'N/A'}</p>
            <p className="card-text"><strong>Machine ID:</strong> {getMachine.machineId || 'N/A'}</p>
          </div>
          <div className="d-flex justify-content-evenly">
          <NavLink to={`/edit/${getMachine._id}`}><button className="btn btn-warning">Update</button></NavLink>

          <button onClick={() => { deleteuser(getMachine._id) }} className="btn btn-danger" >Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
