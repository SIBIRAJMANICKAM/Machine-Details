import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const AddDetails = () => {
    const [formData, setFormData] = useState({
        machineName: '',
        description: '',
        website: '',
        supportMail: '',
        supportContact: '',
        establishmentYear: '',
        numberOfMachines: '',
        machineImage: null,
        machineMake: '',
        machineId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            machineImage: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData object
        const formDataToSend = new FormData();
        formDataToSend.append('machineName', formData.machineName);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('website', formData.website);
        formDataToSend.append('supportMail', formData.supportMail);
        formDataToSend.append('supportContact', formData.supportContact);
        formDataToSend.append('establishmentYear', formData.establishmentYear);
        formDataToSend.append('numberOfMachines', formData.numberOfMachines);
        formDataToSend.append('machineMake', formData.machineMake);
        formDataToSend.append('machineId', formData.machineId);
        formDataToSend.append('machineImage', formData.machineImage);

        try {
            const response = await fetch('http://localhost:5000/add-details', {
                method: 'POST',
                body: formDataToSend, // Send FormData object
            });

            if(response.status===201)
            alert('Machine details submitted successfully!');
            else
            {
                const data=await response.json();
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            alert(`Error submitting machine details: ${error.message}`);
        }
    };

    return (
        <div className='container'>
            <NavLink to="/">Home</NavLink>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="machineName">Machine Name</label>
                    <input type="text" className="form-control" id="machineName" name="machineName" value={formData.machineName} onChange={handleChange} placeholder="Enter machine name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Enter description"></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input type="url" className="form-control" id="website" name="website" value={formData.website} onChange={handleChange} placeholder="Enter website URL" />
                </div>

                <div className="form-group">
                    <label htmlFor="supportMail">Support Mail</label>
                    <input type="email" className="form-control" id="supportMail" name="supportMail" value={formData.supportMail} onChange={handleChange} placeholder="Enter support email" />
                </div>

                <div className="form-group">
                    <label htmlFor="supportContact">Support Contact</label>
                    <input type="text" className="form-control" id="supportContact" name="supportContact" value={formData.supportContact} onChange={handleChange} placeholder="Enter support contact" />
                </div>

                <div className="form-group">
                    <label htmlFor="establishmentYear">Year of Establishment</label>
                    <input type="number" className="form-control" id="establishmentYear" name="establishmentYear" value={formData.establishmentYear} onChange={handleChange} placeholder="Enter year of establishment" />
                </div>

                <div className="form-group">
                    <label htmlFor="numberOfMachines">Number of Machines</label>
                    <input type="number" className="form-control" id="numberOfMachines" name="numberOfMachines" value={formData.numberOfMachines} onChange={handleChange} placeholder="Enter number of machines" />
                </div>

                <div className="form-group">
                    <label htmlFor="machineImage">Upload Image</label>
                    <input type="file" className="form-control-file" id="machineImage" name="machineImage" onChange={handleFileChange} accept="image/*" />
                    <small id="imageHelp" className="form-text text-muted">Upload an image for the machine.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="machineMake">Machine Make</label>
                    <input type="text" className="form-control" id="machineMake" name="machineMake" value={formData.machineMake} onChange={handleChange} placeholder="Enter machine make" />
                </div>

                <div className="form-group">
                    <label htmlFor="machineId">Machine ID</label>
                    <input type="text" className="form-control" id="machineId" name="machineId" value={formData.machineId} onChange={handleChange} placeholder="Enter machine ID" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};
