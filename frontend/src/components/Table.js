import React from 'react';

const Table = ({ data }) => {
  return (
    <div>
      <h2>Passenger Data</h2>
      <table>
        <thead>
          <tr>
            <th>PassengerId</th>
            <th>Survived</th>
            <th>Pclass</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Age</th>
            <th>SibSp</th>
            <th>Parch</th>
            <th>Ticket</th>
            <th>Fare</th>
            <th>Cabin</th>
            <th>Embarked</th>
          </tr>
        </thead>
        <tbody>
          {data.map((passenger) => (
            <tr key={passenger.PassengerId}>
              <td>{passenger.PassengerId}</td>
              <td>{passenger.Survived}</td>
              <td>{passenger.Pclass}</td>
              <td>{passenger.Name}</td>
              <td>{passenger.Sex}</td>
              <td>{passenger.Age}</td>
              <td>{passenger.SibSp}</td>
              <td>{passenger.Parch}</td>
              <td>{passenger.Ticket}</td>
              <td>{passenger.Fare}</td>
              <td>{passenger.Cabin}</td>
              <td>{passenger.Embarked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;