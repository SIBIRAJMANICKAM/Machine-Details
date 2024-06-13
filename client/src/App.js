
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import { Header } from './components/Header';
import { AdminDashboard } from './components/AdminDashboard.js';
import { AddDetails } from './components/AddDetails.js';
import {Route, Routes }from "react-router-dom";
import { EditDetails } from './components/EditDetails.js';
import { MachineDetails } from './components/MachineDetails.js';
function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route exact path="/" Component={AdminDashboard}/>
      <Route exact path="/add-details" Component={AddDetails}/>
      <Route exact path="/edit/:id" Component={EditDetails}/>
      <Route exact path="/view/:id" Component={MachineDetails}/>
    </Routes>
    </>
  );
}

export default App;
