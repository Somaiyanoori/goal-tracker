import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations/LoginSchema.jsx";

import {
    Box,
    TextField,
    Button,
    Typography,
    FormControlLabel,
    Checkbox,
    Alert,
    Stack,
} from "@mui/material";

export default function LoginForm({ onSwitchToRegister }) {
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(loginSchema),
    });

    function onSubmit(data) {
        console.log("LOGIN SUBMIT:", {
            email: data.email,
            password: data.password,
            remember: data.remember,
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
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 8,
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: "background.paper",
            }}
        >
            <Stack spacing={2}>
                <Typography variant="h5" fontWeight={600} textAlign="center">
                    Login
                </Typography>
                {success && <Alert severity="success">{success}</Alert>}
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    autoComplete="email"
                />
                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    autoComplete="current-password"
                />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                            />
                        }
                        label="Show Password"
                    />
                    <FormControlLabel
                        control={<Checkbox {...register("remember")} />}
                        label="Remember Me"
                    />
                </Box>
                <Typography variant="caption" color="text.secondary">
                    Min 8 characters, at least one lowercase, uppercase, number, and special character.
                </Typography>
                <Stack spacing={1}>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        fullWidth
                    >
                        Login
                    </Button>
                    <Button
                        variant="outlined"
                        type="button"
                        onClick={handleReset}
                        fullWidth
                    >
                        Reset
                    </Button>
                </Stack>
                <Typography variant="body2" textAlign="center">
                    Don't have an account?{" "}
                    <Button size="small" onClick={onSwitchToRegister}>
                        Create One
                    </Button>
                </Typography>
            </Stack>
        </Box>
    );
}