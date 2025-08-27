export const validateForm = (obj) => {
    // Check if any input is empty
    if (Object.values(obj).includes(""))
        return { msg: "All fields are required", error: true };

    // Check if password and repeatPassword are different
    if (obj.repeatPassword && obj.password.trim() !== obj.repeatPassword.trim())
        return { msg: "Passwords are different", error: true };

    // Check if password length is less than 6
    if (obj.password.length < 6)
        return { msg: "Password is too short", error: true };
};
