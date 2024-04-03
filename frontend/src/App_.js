import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/Table';
import Graph from './components/Graph';
import Filter from './components/Filter';
import FileUploadButton from './components/FileUploadButton';

const App = () => {
  const [loading, setLoading] = useState(true); // State to track loading status
  const [passengers, setPassengers] = useState([]);
  const [filteredPassengers, setFilteredPassengers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/passengers');
      setPassengers(response.data);
      setFilteredPassengers(response.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Set loading to false if there's an error
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

  // Render loading indicator if loading is true
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Filter onFilter={handleFilter} />
      <Table data={filteredPassengers} />
      <Graph data={filteredPassengers} />
    </div>
  );
};

export default App;