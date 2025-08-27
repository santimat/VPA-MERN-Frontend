// Componentes from react router dom to create routes
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import { AuthLayout } from "./layout/AuthLayout";
import { AdminLayout } from "./layout/AdminLayout";

// Pages
import { Register } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { ConfirmAccount } from "./pages/Auth/ConfirmAccount";
import { NewPassword } from "./pages/Auth/NewPassword";
import { AdministratePatient } from "./pages/Private/AdministratePatient";
import { EditProfile } from "./pages/Private/EditProfile";
import { ChangePassword } from "./pages/Private/ChangePassword";

// State global provider
import { AuthProvider } from "./context/AuthProvider";
import { PatientsProvider } from "./context/PatientsProvider";

export function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <PatientsProvider>
                    <Routes>
                        {/* path will be the url */}
                        {/* element will be the component to render */}
                        <Route path="/" element={<AuthLayout />}>
                            {/* This will be a index route */}
                            <Route index element={<Login />} />
                            {/* Load routes */}
                            {/* this will be /register path */}
                            <Route path="register" element={<Register />} />
                            <Route
                                path="forgot-password"
                                element={<ForgotPassword />}
                            />
                            <Route
                                path="forgot-password/:token"
                                element={<NewPassword />}
                            />
                            <Route
                                // route confirm with dynamic param
                                path="confirm/:token"
                                element={<ConfirmAccount />}
                            />
                        </Route>

                        {/* Provide patients as global state */}
                        {/* Private routes group */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<AdministratePatient />} />
                            <Route path="profile" element={<EditProfile />} />
                            <Route
                                path="change-password"
                                element={<ChangePassword />}
                            />
                        </Route>
                    </Routes>
                </PatientsProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}
