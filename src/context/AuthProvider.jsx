import { useState, useEffect, createContext } from "react";
import { fetchHelper } from "../helpers/fetchHelper";

const AuthContext = createContext();

// This allows states to be accessed from anywhere of our project
export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    // State global
    const [auth, setAuth] = useState(null);

    const token = localStorage.getItem("VPA_TOKEN");

    // "useEffect" is executed at least once when the component is ready
    useEffect(() => {
        const authenticateUser = async () => {
            // Dont authenticate if there is no token
            if (!token) return setLoading(false);

            try {
                const { data } = await fetchHelper({
                    path: "api/veterinarian/profile",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setAuth(data);
            } catch (error) {
                console.log(error.message);
                setAuth(null);
            }

            setLoading(false);
        };
        authenticateUser();
    }, []);

    const logOut = () => {
        localStorage.removeItem("VPA_TOKEN");
        setAuth(null);
    };

    const updateProfile = async (profile) => {
        try {
            const { data } = await fetchHelper({
                path: `api/veterinarian/profile/${profile._id}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                content: profile,
            });
            setAuth(data.profile);
            return { alert: { msg: data.msg } };
        } catch (error) {
            return { alert: { msg: error.message, error: true } };
        }
    };

    const updatePassword = async (password) => {
        try {
            const { data } = await fetchHelper({
                path: `api/veterinarian/update-password`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                content: password,
            });
            return { alert: { msg: data.msg } };
        } catch (error) {
            return { alert: { msg: error.message, error: true } };
        }
    };

    return (
        <AuthContext.Provider
            // Object with the values that will be accessed globally
            value={{
                auth,
                setAuth,
                loading,
                logOut,
                updateProfile,
                updatePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
