import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const AdminDashboard = () => {
  const [getMachine, setMachine] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const searchMachines = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/search?query=${query}`, {
        method: 'GET',
      });

      const data = await response.json();
      if (response.status === 200) {
        setMachine(data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert(`Error searching machines: ${error.message}`);
    }
  };

  useEffect(() => {
    getd();
  }, []);

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
        console.log("User Deleted");
        getd();
      } else {
        console.log("Error", deletedata);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMachines(searchQuery);
  };

  return (
    <div className="mt-5">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="add_btn mt-2">
            <NavLink to="/add-details"><button className="btn btn-danger">Add data</button></NavLink>
          </div>
          <form className="d-flex mt-2" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
        <table className="table mt-3">
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
                  <button onClick={() => { deleteuser(element._id) }} className="btn btn-danger">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
  