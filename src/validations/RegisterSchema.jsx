import * as yup from "yup";
export const registerSchema= yup.object({
    fullName: yup
    .string()
    .required("Full Name is Required")
    .min(3, "Name should be at least 3 characters"),

    email:yup
    .string()
    .required("Email is Required")
    .email("Please enter a Valid Email"),

    password:yup
    .string()
    .required("Password is Required")
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must include at least one number")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/\d/, "At least one number")
    .matches(/[@$!%*?&]/, "At least one special character"),

    confirmPassword:yup
    .string()
    .required("Confirm Password is Required")
    .oneOf([yup.ref("password")], "Password do not match"),

    terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms & conditions"),

});
