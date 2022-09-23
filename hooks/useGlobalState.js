import { useContext } from "react";
import { AuthContext } from "../context/DataProvider";

const useGlobalState = () => {
  return useContext(AuthContext);
};

export default useGlobalState;