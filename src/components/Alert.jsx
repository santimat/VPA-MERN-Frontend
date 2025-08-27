import { useEffect } from "react";

// Access to message from props object aplying destructuration
export const Alert = ({ alert, onClose }) => {
    // if alert is empty

    const { msg, error } = alert || {};

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.();
        }, 3000);

        return () => clearTimeout(timer);
    }, [alert]);

    if (!alert?.msg) return null;

    return (
        <>
            <div
                className={`${
                    error
                        ? "from-red-400 to-red-600"
                        : "from-green-400 to-green-600"
                } bg-gradient-to-br p-2 rounded-xl text-center font-lg font-bold text-white `}
            >
                {msg}
            </div>
        </>
    );
};
