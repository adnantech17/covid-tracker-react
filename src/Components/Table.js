import React from "react";

const Table = ({ data }) => {
  function numberWithCommas(x) {
    if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return x;
  }

  function getSortedData(data) {
    return data.sort(function (a, b) {
      return b.cases - a.cases;
    });
  }

  return (
    <div className="table">
      <tr className="table__data">
        <td>
          <strong>Country</strong>
        </td>
        <td>
          <strong>Cases</strong>
        </td>
      </tr>
      {getSortedData(data).map((country) => (
        <tr className="table__data">
          <td>{country.country}</td>
          <td>{numberWithCommas(country.cases)}</td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
