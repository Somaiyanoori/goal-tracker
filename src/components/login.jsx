import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/LoginSchema.jsx";
export default function LoginForm({ onSwitchToRegister }) {
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState("");
    const {
        register, handleSubmit, reset, formState: { errors, isValid, isSubmitting }
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(loginSchema),
    });
    function onSubmit(data) {
        console.log("LOGIN SUBMIT:", {
            email: data.email,
            password: data.password,
        });
        reset();
        setSuccess("Login Successful!");
    }
    function handleReset() {
        reset();
        setShowPassword(false);
        setSuccess("");
    }
    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {success && <div className="success">{success}</div>}
            <div className="field">
                <label htmlFor="login-email">Email</label>
                <input
                    type="email"
                    id="login-email"
                    placeholder="you@example.com"
                    {...register("email")}
                    autoComplete="email"
                />
                {errors.email && <div className="error">{errors.email.message}</div>}
            </div>
            <div className="field">
                <label htmlFor="login-password">Password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    placeholder="••••••••"
                    {...register("password")}
                    autoComplete="current-password"
                />
            </div>
            <div className="helpRow">
                <div className="row small" style={{ cursor: "pointer" }}>
                    <input
                        className="checkbox"
                        type="checkbox"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    Show Password
                </div>
                <span className="small">Min 6 characters</span>
            </div>
            {errors.password && <div className="error">{errors.password.message}</div>}
            <div className="actions">
                <button
                    className="primary"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                >
                    Login
                </button>
                <button
                    className="ghost"
                    type="button"
                    onClick={handleReset}
                >
                    Reset
                </button>
                <p className="small" style={{ margin: 0 }}>
                    Don't have an account?{" "}
                    <button
                        className="ghost"
                        type="button"
                        onClick={onSwitchToRegister}
                    >
                        Create One
                    </button>
                </p>
            </div>
        </form>
    );
}