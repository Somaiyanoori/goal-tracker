import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validations/RegisterSchema.jsx";
export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState("");
    const{register, handleSubmit, reset, formState:{errors, isValid, isSubmitting}}=useForm({
        mode:"onTouched",
        resolver: yupResolver(registerSchema),
    })
    function onSubmit(data){
        console.log("REGISTER SUBMIT:",{
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        });
        reset();
        setSuccess("Registration Successful!");
    }
    function handleReset(){
        reset();
        setShowPassword(false);
        setSuccess("");
    }
    return(
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {success && <div className="success">{success}</div>}
            <div className="field">
                <label htmlFor="reg-fullname">Full Name</label>
                <input
                    type="text" 
                    id="reg-fullname"
                    name="fullName"
                    placeholder="Your full name"
                    {...register("fullName")}
                    autoComplete="name"
                />
                {errors.fullName && <div className="error">{errors.fullName.message}</div>}
            </div>
            <div className="field">
                <label htmlFor="reg-email">Email</label>
                <input
                    type="email" 
                    id="reg-email"
                    name="email"
                    placeholder="Your email address"
                    {...register("email")}
                    autoComplete="email"
                />
                {errors.email && <div className="error">{errors.email.message}</div>}
            </div>
            <div className="field">
                <label htmlFor="reg-password">Password</label>
                <input 
                    type={showPassword? "text" : "password"}
                    id="reg-password"
                    name="password"
                    placeholder="••••••••"
                    {...register("password")}
                    autoComplete="password"
                />
            </div>
            <div className="helpRow">
                <div className="row small" style={{cursor:"pointer"}}>
                    <input className="checkbox"
                        type="checkbox"
                        checked={showPassword}
                        onChange={(e)=>setShowPassword(e.target.checked)}
                    />
                    Show Password
                </div>
                <span className="small">Min 8 characters & 1 number</span>
            </div>
            {errors.password && <div className="errors">{errors.password.message}</div>}
            <div className="field">
                <label htmlFor="reg-confirm-password">Confrim Password</label>
                <input 
                    type={showPassword ? "text": "password"}
                    id="reg-confirm-password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    autoComplete="new-password"
                />
            </div>
            {errors.confirmPassword && <div className="errors">{errors.confirmPassword.message}</div>}
            <div className="field">
                <label className="row small">
                    <input type="checkbox" {...register("terms")}/> 
                    I agree to the Terms & Conditions
                </label>
            </div>
            {errors.terms && <div className="errors">{errors.terms.message}</div>}
            <div className="actions">
                <button className="primary" type="submit" disabled={!isValid || isSubmitting}>
                    Create Acoount
                </button>
                <button className="ghost" onClick={handleReset} type="button">Reset</button>
            </div>
        </form>
    )
}