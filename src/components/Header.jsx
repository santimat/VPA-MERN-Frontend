import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePatients from "../hooks/usePatients";
export const Header = () => {
    const { logOut } = useAuth();
    const { setPatients } = usePatients();
    return (
        <header className="py-10 bg-indigo-600">
            <div className="container mx-auto flex flex-col gap-5 lg:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-indigo-200 text-center">
                    <span className="text-white">Veterinarian</span> patients
                    administrator
                </h1>

                <nav className="flex flex-col lg:flex-row gap-4 mt-5 lg:mt-0 text-center">
                    <Link
                        to="/admin"
                        className="text-white text-lg uppercase font-bold"
                    >
                        Patients
                    </Link>
                    <Link
                        to="/admin/profile"
                        className="text-white text-lg uppercase font-bold"
                    >
                        Profile
                    </Link>

                    <button
                        type="button"
                        className="text-white text-lg uppercase font-bold hover:cursor-pointer"
                        onClick={() => {
                            setPatients([]);
                            logOut();
                        }}
                    >
                        Log out
                    </button>
                </nav>
            </div>
        </header>
    );
};
