import * as yup from "yup";
export const loginSchema = yup.object({
    email:yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),

    password:yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must include at least one number")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/\d/, "At least one number")
    .matches(/[@$!%*?&]/, "At least one special character")
    .required("Password is required"),
});