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
    .required("Password is required"),
});