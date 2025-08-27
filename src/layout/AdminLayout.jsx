import { Outlet, Navigate } from "react-router-dom";

// Components
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import useAuth from "../hooks/useAuth";

export const AdminLayout = () => {
    // Get auth state
    const { auth, loading } = useAuth();

    // If loading is true it means that auth verification is in progress
    if (loading) return null;

    return (
        <>
            <Header />
            {auth?._id ? (
                <main className="container mx-auto mt-8">
                    <Outlet />
                </main>
            ) : (
                <Navigate to="/" />
            )}
            <Footer />
        </>
    );
};
