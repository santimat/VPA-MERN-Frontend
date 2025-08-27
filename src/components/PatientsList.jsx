import usePatients from "../hooks/usePatients";
import { Patient } from "./Patient";

export const PatientsList = () => {
    // Get state global patients from PatientsProvider context
    const { patients } = usePatients();

    // If there are no patients yet return null to prevent screen flicker
    if (!patients) return null;

    return (
        <>
            {patients.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">
                        Patients list
                    </h2>
                    <p className="text-xl my-5 text-center">
                        Administrate your {""}
                        <span className="text-indigo-600 font-bold">
                            Patients and Appointments
                        </span>
                    </p>
                    <div className="max-h-[622px] overflow-auto bg-white p-2 rounded-lg shadow-xl">
                        {/* Iterates patients */}
                        {patients.map((patient) => (
                            // React require a key when it uses a bucle
                            <Patient key={patient._id} patient={patient} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">
                        There are no patients
                    </h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Start adding patients {""}
                        <span className="text-indigo-600 font-bold">
                            And they will appear here
                        </span>
                    </p>
                </>
            )}
        </>
    );
};
