import { createContext, useState, useEffect } from "react";
import { fetchHelper } from "../helpers/fetchHelper";
import useAuth from "../hooks/useAuth";

const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState(null);

    const { auth } = useAuth();

    useEffect(() => {
        // This is to avoid having to refresh to see patients correctly
        if (!auth?._id) return;

        const getPatients = async () => {
            try {
                const { data } = await fetchHelper({
                    path: "api/patient",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "VPA_TOKEN"
                        )}`,
                    },
                });
                // Add patients to global state
                setPatients(data);
            } catch (error) {
                return { alert: { msg: error.msg, error: true } };
            }
        };
        getPatients();
        // Auth as dependency to avoid showing other user's patients
    }, [auth]);

    const savePatient = async (patient) => {
        try {
            const { data } = await fetchHelper({
                path: "api/patient",
                method: "POST",
                content: patient,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "VPA_TOKEN"
                    )}`,
                },
            });
            const { createdAt, updatedAt, ...patientToSave } = patient;
            setPatients([patientToSave, ...patients]);
            return { alert: { msg: data.msg } };
        } catch (e) {
            return { alert: { msg: e.message, error: true } };
        }
    };

    const setEdit = (patient) => {
        setPatient(patient);
    };

    const updatePatient = async (patient) => {
        try {
            const { data } = await fetchHelper({
                path: `api/patient/${patient._id}`,
                method: "PUT",
                content: patient,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "VPA_TOKEN"
                    )}`,
                },
            });
            // Update the patients array
            // if the current patient id is the same as the updated patient id, it's replaced with the new one
            setPatients(
                patients.map((p) => (p._id === patient._id ? patient : p))
            );
            setPatient(null);
            return { alert: { msg: data.msg } };
        } catch (e) {
            return { alert: { msg: e.message, error: true } };
        }
    };

    const deletePatient = async (id) => {
        if (!confirm("Are you sure you want to delete this patient?")) return;

        try {
            const { data } = await fetchHelper({
                path: `api/patient/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "VPA_TOKEN"
                    )}`,
                },
            });
            setPatients(patients.filter((p) => p._id !== id));
            setPatient(null);
            return { alert: { msg: data.msg } };
        } catch (e) {
            return { alert: { msg: e.message, error: true } };
        }
    };

    return (
        <>
            <PatientsContext.Provider
                value={{
                    patients,
                    patient,
                    savePatient,
                    setEdit,
                    updatePatient,
                    deletePatient,
                    setPatients,
                }}
            >
                {children}
            </PatientsContext.Provider>
        </>
    );
};

export default PatientsContext;
