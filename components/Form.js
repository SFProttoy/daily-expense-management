import { useEffect } from "react";
import useGlobalState from "../hooks/useGlobalState";

export default function Form() {
  const { userData, setUserData, data, setData } = useGlobalState();

  const handleForm = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataList = [...data];
    dataList.push(userData);
    localStorage.setItem("dataLocal", JSON.stringify(dataList));
    setData(dataList);
    setUserData({
      type: "",
      amount: "",
      date: "",
      description: "",
    });
    e.target.reset();
  };

  useEffect(() => {
    let dataLocal = JSON.parse(localStorage.getItem("dataLocal")) || [];
    setData(dataLocal);
  }, [setData]);

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h5 className="">Type</h5>
        <select
          className="mx-auto mt-4 mb-4 w-50"
          name="type"
          onChange={handleForm}
          required
        >
          <option selected disabled value="">
            Select
          </option>
          <option>Income</option>
          <option>Expense</option>
        </select>
        <h5>Amount</h5>
        <input
          type="text"
          className="form-control mt-4 mb-4 w-50"
          id="exampleInputName"
          name="amount"
          placeholder="Amount"
          onChange={handleForm}
          required
        />
        <h5>Date</h5>
        <p>(MM/DD/YYYY)</p>
        <input
          type="text"
          className="form-control mt-4 mb-4 w-50"
          id="exampleInputName"
          name="date"
          onChange={handleForm}
          placeholder="01/30/2000"
        />

        <h5>Description</h5>
        <textarea
          type="text"
          className="form-control mt-4 mb-4 w-50"
          id="exampleInputName"
          name="description"
          placeholder="Description"
          onChange={handleForm}
          required
        />
        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
}
