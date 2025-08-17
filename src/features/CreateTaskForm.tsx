import { Button, Stack, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TasksService, type TaskPostSchema } from "../api";
import { SnackbarAlert } from "../shared/components";

export const CreateTaskForm = () => {
    const queryClient = useQueryClient();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>({
        open: false,
        message: "",
        severity: "success",
    });
    const [form, setForm] = useState<TaskPostSchema>({
        title: "",
        description: "",
    });

    const createTaskMutation = useMutation({
        mutationFn: (newTask: TaskPostSchema) =>
            TasksService.tasksPost(newTask),
        onSuccess: () => {
            // обновляем список задач после создания
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            setForm({ title: "", description: "" });
        },
    });

    const handleChange =
        (field: keyof TaskPostSchema) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setForm((prev) => ({ ...prev, [field]: e.target.value }));
            };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        createTaskMutation.mutate(form, {
            onSuccess: () => {
                setSnackbar({
                    open: true,
                    message: "Задача успешно создана",
                    severity: "success",
                });
            },
            onError: () => {
                setSnackbar({
                    open: true,
                    message: "Ошибка при создании задачи",
                    severity: "error",
                });
            }
        });
    };

    return (
        <>
            <Stack
                component="form"
                onSubmit={handleSubmit}
                direction={isSmallScreen ? "column" : "row"}
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{
                    width: "100%",
                    "& .MuiTextField-root, & .MuiButton-root": {
                        height: 56,
                    },
                }}
            >
                <TextField
                    label="Название"
                    value={form.title}
                    onChange={handleChange("title")}
                    required
                    inputProps={{ minLength: 5, maxLength: 50 }}
                    fullWidth
                />
                <TextField
                    label="Описание"
                    value={form.description ?? ""}
                    onChange={handleChange("description")}
                    rows={isSmallScreen ? 3 : 1}
                    inputProps={{ maxLength: 500 }}
                    fullWidth
                />
                <Button sx={{ minWidth: "100px" }} type="submit" variant="contained" fullWidth={isSmallScreen}>
                    Создать
                </Button>
            </Stack>

            <SnackbarAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </>
    );
};
