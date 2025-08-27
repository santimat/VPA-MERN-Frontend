import { useEffect, useState } from "react";
// useParams allows read url params
import { Link, useParams } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { fetchHelper } from "../../helpers/fetchHelper";

export const ConfirmAccount = () => {
    const { token } = useParams();
    const [alert, setAlert] = useState({});

    // State to show loader
    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const { data } = await fetchHelper({
                    path: `api/veterinarian/confirm/${token}`,
                });

                setAlert({ msg: data.msg });
                setConfirmed(true);
            } catch (error) {
                setAlert({ msg: error.message, error: true });
            }

            // Once fetch is resolved hide loader
            setLoading(false);
        };
        confirmAccount();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Create your account and Administer {""}
                    <span className="text-black">your Patients</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-0 shadow-lg p-5 rounded-xl bg-white">
                {!loading && <Alert alert={alert} />}
                {confirmed && (
                    <Link to={"/"} className="text-center block mt-10">
                        Log in
                    </Link>
                )}
            </div>
        </>
    );
};
