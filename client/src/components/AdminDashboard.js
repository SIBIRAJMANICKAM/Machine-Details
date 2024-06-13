import React from "react";

export const AdminDashboard = () => {
  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2">
          <button className="btn btn-danger">Add data</button>
        </div>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">MACHINE NAME</th>
              <th scope="col">YEAR OF ESTABLISHMENT</th>
              <th scope="col">NO OF MACHINES</th>
              <th scope="col">DEPARTMENT</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Philips Healthcare</td>
              <td>2004</td>
              <td>56</td>
              <td>CSE</td>
              <td className="d-flex justify-content-evenly">
                <button className="btn btn-success">view</button>
                <button className="btn btn-warning">update</button>
                <button className="btn btn-danger">delete</button>
             
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};
