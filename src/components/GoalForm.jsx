import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import {
  TextField,
  MenuItem,
  Button,
  Stack,
  Box,
  useTheme,
  alpha,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { CATEGORIES, GOAL_TYPES } from "../utils/constants";

const getSchema = (t) =>
  yup.object().shape({
    title: yup.string().required(t("validation.title_required")).max(100),
    category: yup.string().required(t("validation.category_required")),
    type: yup.string().required(t("validation.type_required")),
    target: yup
      .number()
      .typeError(t("validation.target_number"))
      .positive()
      .integer()
      .required(t("validation.target_required")),
    startDate: yup.date().required(t("validation.startDate_required")),
    endDate: yup
      .date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      )
      .min(yup.ref("startDate"), t("validation.endDate_min")),
    notes: yup.string().max(500),
  });

const GoalForm = ({ initialData, onSubmit, onCancel, isEdit = false }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getSchema(t)),
    defaultValues: initialData || {
      title: "",
      category: "Personal",
      type: "Daily",
      target: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: null,
      notes: "",
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={3}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label={t("goal_title")}
              required
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label={t("category")}
                required
                error={!!errors.category}
                helperText={errors.category?.message}
              >
                {CATEGORIES.map((c) => (
                  <MenuItem key={c} value={c}>
                    {t(c.toLowerCase())}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label={t("goal_type")}
                required
                error={!!errors.type}
                helperText={errors.type?.message}
              >
                {GOAL_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {t(type.toLowerCase())}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>
        <Controller
          name="target"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="number"
              label={t("target_number")}
              required
              error={!!errors.target}
              helperText={errors.target?.message}
              inputProps={{ min: 1 }}
            />
          )}
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="date"
                label={t("start_date")}
                InputLabelProps={{ shrink: true }}
                required
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ""}
                fullWidth
                type="date"
                label={t("end_date")}
                InputLabelProps={{ shrink: true }}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
              />
            )}
          />
        </Stack>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={3}
              label={t("notes")}
              error={!!errors.notes}
              helperText={errors.notes?.message}
            />
          )}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end" pt={1}>
          <Button onClick={onCancel} sx={{ color: "text.secondary" }}>
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={isEdit ? <SaveRoundedIcon /> : <AddRoundedIcon />}
            sx={{
              px: 4,
              borderRadius: "10px",
              background: isEdit
                ? `linear-gradient(135deg, ${theme.palette.info.dark}, ${theme.palette.info.main})`
                : `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              boxShadow: `0 4px 16px ${alpha(isEdit ? theme.palette.info.main : theme.palette.primary.main, 0.35)}`,
              "&:hover": {
                boxShadow: `0 6px 20px ${alpha(isEdit ? theme.palette.info.main : theme.palette.primary.main, 0.45)}`,
              },
            }}
          >
            {isEdit ? t("save") : t("create_goal")}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default GoalForm;
