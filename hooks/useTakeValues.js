import { useState } from "react";

const useTakeValues = () => {
  const initialState = {
    type: "",
    amount: "",
    date: "",
    description: "",
  };

  const [userData, setUserData] = useState(initialState);

  const [data, setData] = useState("");
  return {
    data,
    setData,
    userData,
    setUserData,
  };
};

export default useTakeValues;
