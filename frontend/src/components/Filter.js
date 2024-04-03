import React, { useState } from 'react';

const Filter = ({ onFilter }) => {
  const [filterValue, setFilterValue] = useState('');

  const handleChange = (e) => {
    setFilterValue(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter value by Name"
        value={filterValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;