import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validations/RegisterSchema.jsx";

import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
  Stack,
} from "@mui/material";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(registerSchema),
  });

  function onSubmit(data) {
    console.log("REGISTER SUBMIT:", {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
    reset();
    setSuccess("Registration Successful!");
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
        maxWidth: 450,
        mx: "auto",
        mt: 8,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" textAlign="center" fontWeight={600}>
          Register
        </Typography>
        {success && <Alert severity="success">{success}</Alert>}
        {/* FULL NAME */}
        <TextField
          label="Full Name"
          fullWidth
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          autoComplete="name"
        />
        {/* EMAIL */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          autoComplete="email"
        />
        {/* PASSWORD */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          autoComplete="new-password"
        />
        {/* SHOW PASSWORD */}
        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
          }
          label="Show Password"
        />
        {/* PASSWORD HINT */}
        <Typography variant="caption" color="text.secondary">
          Min 8 characters & at least 1 number
        </Typography>
        {/* CONFIRM PASSWORD */}
        <TextField
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          autoComplete="new-password"
        />
        {/* TERMS */}
        <FormControlLabel
          control={<Checkbox {...register("terms")} />}
          label="I agree to the Terms & Conditions"
        />
        {errors.terms && (
          <Typography variant="caption" color="error">
            {errors.terms.message}
          </Typography>
        )}
        {/* ACTIONS */}
        <Stack spacing={1}>
          <Button
            variant="contained"
            type="submit"
            disabled={!isValid || isSubmitting}
            fullWidth
          >
            Create Account
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
      </Stack>
    </Box>
  );
}