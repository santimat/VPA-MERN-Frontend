import usePatients from "../hooks/usePatients";

export const Patient = ({ patient }) => {
    const { name, email, date, owner, symptoms, _id: id } = patient;

    // get setEdit function from our hook
    const { setEdit, deletePatient } = usePatients();

    // Format date
    const formatDate = (date) => {
        const newDate = new Date(date);
        return new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(
            newDate
        );
    };

    return (
        <div className="mx-5 my-5 bg-gray-200 shadow-xl p-5 rounded-xl">
            <p className="font-bold uppercase text-indigo-700 mb-2">
                Name: {""}
                <span className="font-normal capitalize text-black">
                    {name}
                </span>
            </p>
            <p className="font-bold uppercase text-indigo-700 mb-2">
                Owner: {""}
                <span className="font-normal capitalize text-black">
                    {owner}
                </span>
            </p>
            <p className="font-bold uppercase text-indigo-700 mb-2">
                Email: {""}
                <span className="font-normal text-black normal-case">
                    {email}
                </span>
            </p>
            <p className="font-bold uppercase text-indigo-700 mb-2">
                Symptoms: {""}
                <span className="font-normal normal-case first-letter:uppercase  text-black">
                    {symptoms}
                </span>
            </p>
            <p className="font-bold uppercase text-indigo-700 ">
                Discharge date: {""}
                <span className="font-normal normal-case first-letter:uppercase text-black">
                    {formatDate(date)}
                </span>
            </p>
            <div className="flex justify-between mt-5">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white uppercase font-bold rounded-lg hover:cursor-pointer"
                    onClick={() => setEdit(patient)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-800 text-white uppercase font-bold rounded-lg hover:cursor-pointer"
                    onClick={() => deletePatient(id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};
