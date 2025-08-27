// Custom hook

// To extract data
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    // useContext is to access to values of an context
    return useContext(AuthContext);
};

export default useAuth;
