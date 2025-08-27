// Outlet
import { Outlet } from "react-router-dom";

// This will be a master page
export const AuthLayout = () => {
    return (
        <>
            <main className="container mx-auto h-dvh gap-10 px-8 md:grid md:grid-cols-2 md:items-center">
                {/* Load the routes inside the father route */}
                <Outlet />
            </main>
        </>
    );
};
