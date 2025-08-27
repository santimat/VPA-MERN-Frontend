import { useState, useEffect } from "react";

import useAuth from "../hooks/useAuth";
import { Alert } from "./Alert";
import usePatients from "../hooks/usePatients";

export const Form = ({ setShowForm }) => {
    const { auth } = useAuth();

    const { savePatient, patient, updatePatient } = usePatients();

    const initialForm = {
        name: "",
        owner: "",
        email: "",
        date: "",
        symptoms: "",
    };
    const [form, setForm] = useState(initialForm);
    const [alert, setAlert] = useState({});

    useEffect(() => {
        if (patient) {
            setForm(patient);
        }
    }, [patient]);

    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(form).includes(""))
            return setAlert({ msg: "All fields are required", error: true });

        const { alert } = !patient
            ? await savePatient({ ...form, veterinarian: auth._id })
            : await updatePatient(form);

        if (alert.error) {
            return setAlert({ msg: alert.msg, error: true });
        }
        setAlert({ msg: alert.msg });
        setForm(initialForm);
        setTimeout(() => {
            setShowForm(false);
        }, 1000);
    };

    return (
        <>
            <h2 className="font-black text-3xl text-center">
                Patients administator
            </h2>
            <p className="text-xl my-5 text-center">
                Add your patients and {""}
                <span className="text-indigo-600 font-bold">
                    Administrate them
                </span>
            </p>
            <div className="bg-white p-2 px-5 mb-10 lg:mb-0 shadow-md rounded-lg">
                <Alert alert={alert} onClose={() => setAlert({})} />

                <form className="py-3" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="text-gray-700 uppercase font-bold"
                        >
                            Pet name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Pet name"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                            onChange={handleInput}
                            name="name"
                            value={form.name}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="owner"
                            className="text-gray-700 uppercase font-bold"
                        >
                            Owner name
                        </label>
                        <input
                            id="owner"
                            type="text"
                            placeholder="Owner name"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                            onChange={handleInput}
                            name="owner"
                            value={form.owner}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="text-gray-700 uppercase font-bold"
                        >
                            Owner email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Owner email"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                            onChange={handleInput}
                            name="email"
                            value={form.email}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="date"
                            className="text-gray-700 uppercase font-bold"
                        >
                            Discharge date
                        </label>
                        <input
                            id="date"
                            type="date"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                            onChange={handleInput}
                            name="date"
                            value={form.date?.substring(0, 10)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="symptoms"
                            className="text-gray-700 uppercase font-bold"
                        >
                            Symptoms
                        </label>
                        <textarea
                            id="symptoms"
                            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg resize-none overflow-x-auto"
                            rows="3"
                            onChange={handleInput}
                            name="symptoms"
                            value={form.symptoms}
                        />
                    </div>

                    <input
                        type="submit"
                        value={patient ? "Save changes" : "Add patient"}
                        className="bg-indigo-600 w-full p-3 text-white rounded-lg uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    );
};
