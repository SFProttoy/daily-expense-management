import React, { useState } from "react";
import useGlobalState from "../hooks/useGlobalState";

export default function Lists() {
  const { data, setData } = useGlobalState();
  const [indexValue, setIndexValue] = useState(0);

  const handleEditData = (e, index) => {
    const { name, value } = e.target;
    const dataList = [...data];
    dataList[index] = { ...dataList[index], [name]: value };
    localStorage.setItem("dataLocal", JSON.stringify(dataList));
    setData(dataList);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  // delete data
  const deleteData = (id) => {
    const dataList = [...data];
    dataList.splice(id, 1);
    localStorage.setItem("dataLocal", JSON.stringify(dataList));
    setData(dataList);
  };

  return (
    <div className="container mt-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 &&
            data?.map((d, i) => {
              return (
                <React.Fragment key={i}>
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{d.date}</td>
                    <td>{d.type}</td>
                    <td>{d.amount}</td>
                    <td>{d.description}</td>
                    <td className="text-center">
                      <button
                        type="button"
                        aria-hidden="true"
                        className="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => setIndexValue(i)}
                      >
                        Edit
                      </button>
                      {/* Modal */}
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabindex="1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Update Your Data
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <form onSubmit={handleEdit}>
                                <h5 className="">Type</h5>
                                <select
                                  className="mx-auto mt-4 mb-4 w-50"
                                  name="type"
                                  value={data[indexValue]?.type}
                                  onChange={(e) =>
                                    handleEditData(e, indexValue)
                                  }
                                >
                                  <option>Income</option>
                                  <option>Expense</option>
                                </select>
                                <h5>Amount</h5>
                                <input
                                  type="text"
                                  className="form-control mt-4 mb-4 w-50 mx-auto"
                                  id="exampleInputName"
                                  name="amount"
                                  placeholder="Amount"
                                  value={data[indexValue]?.amount}
                                  onChange={(e) =>
                                    handleEditData(e, indexValue)
                                  }
                                  required
                                />

                                <div className="modal-footer">
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                  >
                                    Ok
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteData(i)}
                        className="btn btn-danger ms-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
