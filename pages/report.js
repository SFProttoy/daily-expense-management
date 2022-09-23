import Link from "next/link";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useGlobalState from "../hooks/useGlobalState";

export default function Report() {
  const { data, setData } = useGlobalState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const searchList = [];
  let totalIncome = 0;
  let totalExpense = 0;
  const [dataList, setDataList] = useState("");

  const searchData = () => {
    const fromDate = new Date(startDate).getTime();
    const toDate = new Date(endDate).getTime();

    for (const i = 0; i < data.length; i++) {
      const betweenDate = new Date(data[i]?.date).getTime();
      if (betweenDate > fromDate && betweenDate < toDate) {
        searchList.push(data[i]);
      }
    }
    setDataList(searchList);
  };

  useEffect(() => {
    let dataLocal = JSON.parse(localStorage.getItem("dataLocal")) || [];
    setData(dataLocal);
  }, [setData]);
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h1>Daily Expense Management</h1>
        <div>
          <Link href="/">
            <a className="text-success text fs-2 text-decoration-none">Back</a>
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-evenly">
        <DatePicker
          className="mx-auto mt-4 mb-4 w-50"
          placeholderText="Select Dates"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          name="StartDate"
          selectsStart
          startDate={startDate}
          minDate={new Date()}
        />
        <DatePicker
          className="mx-auto mt-4 mb-4 w-50"
          placeholderText="Select Dates"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
        <div className="mt-3">
          <button onClick={searchData} className="btn btn-success">
            search
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-around mt-5">
        <div>
          <h5>Income List</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Amount</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length > 0 ? (
                dataList.map((d, i) => {
                  if (d.type === "Income") {
                    totalIncome = totalIncome + parseInt(d.amount);
                  }
                  return (
                    <React.Fragment key={i}>
                      {d.type === "Income" && (
                        <tr>
                          <td>{d.amount}</td>
                          <td>{d.description}</td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <h2>Not Found Any Data!</h2>
              )}
            </tbody>
            <h5 className="mt-3">Total Income : {totalIncome}</h5>
          </table>
        </div>
        <div>
          <h5>Expense List</h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Amount</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length > 0 ? (
                dataList.map((d, i) => {
                  if (d.type === "Expense") {
                    totalExpense = totalExpense + parseInt(d.amount);
                  }
                  return (
                    <React.Fragment key={i}>
                      {d.type === "Expense" && (
                        <tr>
                          <td>{d.amount}</td>
                          <td>{d.description}</td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <h2>Not Found Any Data!</h2>
              )}
            </tbody>
            <h5 className="mt-3">Total Expense : {totalExpense}</h5>
          </table>
        </div>
      </div>
      <h2 className="mt-4 text-center">
        Total Remaining Balance: {totalIncome - totalExpense}
      </h2>
    </div>
  );
}
