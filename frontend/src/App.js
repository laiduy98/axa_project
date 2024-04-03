import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/Table';
import Filter from './components/Filter';
import Graph from './components/Graph';
import FileUploadButton from './components/FileUploadButton';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [passengers, setPassengers] = useState([]);
  const [filteredPassengers, setFilteredPassengers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/passengers');
      const parsedData = response.data;
      console.log(response.data)
      console.log(typeof(response.data))
      const cleanedData = parsedData.map(passenger => {
        const cleanedPassenger = {};
        Object.keys(passenger).forEach(key => {
          cleanedPassenger[key] = passenger[key] === "NaN" ? null : passenger[key];
        });
        return cleanedPassenger;
      });
      setPassengers(cleanedData);
      setFilteredPassengers(cleanedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleFilter = (value) => {
    if (!value) {
      setFilteredPassengers(passengers);
    } else {
      const filteredData = passengers.filter((passenger) =>
        passenger.Name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPassengers(filteredData);
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('File uploaded successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <FileUploadButton onFileSelect={handleFileSelect} />
      <p>After select, please press Upload below to upload the file and load it to the db.</p>
      <b>Please reload the page to show the data.</b>
      <button onClick={handleFileUpload}>Upload</button>
      <Filter onFilter={handleFilter} />
      <Graph data={filteredPassengers} />
      <Table data={filteredPassengers} />
    </div>
  );
};

export default App;