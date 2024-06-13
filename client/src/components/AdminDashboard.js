import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
export const AdminDashboard = () => {
  const [getMachine, setMachine] = useState([]);
  console.log(getMachine);

  const getd = async () => {
    try {
      const response = await fetch('http://localhost:5000/getData', {
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

  return (
    <div className="mt-5">
      <div className="container">
      <div className="add_btn mt-2">
      <NavLink to="/add-details"><button className="btn btn-danger">Add data</button></NavLink>
        </div>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">MACHINE NAME</th>
              <th scope="col">YEAR OF ESTABLISHMENT</th>
              <th scope="col">NO OF MACHINES</th>
              <th scope="col">Machine Make</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {getMachine.map((element, id) => (
              <tr key={id}>
                <th scope="row">{id + 1}</th>
                <td>{element.machineName}</td>
                <td>{element.establishmentYear}</td>
                <td>{element.numberOfMachines}</td>
                <td>{element.machineMake}</td>
                <td className="d-flex justify-content-evenly">
                  <NavLink to={`view/${element._id}`}><button className="btn btn-success">view</button></NavLink>
                  <NavLink to={`edit/${element._id}`}><button className="btn btn-warning">update</button></NavLink>
                  <button className="btn btn-danger">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
