import { useState } from "react";

import { Form } from "../../components/Form";
import { PatientsList } from "../../components/PatientsList";

export const AdministratePatient = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <button
                    type="button"
                    className="bg-indigo-600 text-white font-bold uppercase mb-10 mx-10 p-3 rounded-xl md:hidden"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Hide form" : "Show form"}
                </button>
                <div
                    className={`md:w-1/2 lg:w-2/5 px-3 ${
                        !showForm && "hidden"
                    } md:block`}
                >
                    <Form setShowForm={setShowForm} />
                </div>
                <div className="md:w-1/2 lg:w-3/5">
                    <PatientsList />
                </div>
            </div>
        </>
    );
};
