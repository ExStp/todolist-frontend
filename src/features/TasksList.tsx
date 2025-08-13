import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField
} from "@mui/material";
import { useMutation, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import {
    TasksService,
    type TaskPutSchema,
    type TaskSchema,
} from "../api";
import { DeleteModal, SnackbarAlert } from "../shared";

interface Props {
    tasksQuery: UseQueryResult<TaskSchema[], Error>;
}

export const TasksList = ({ tasksQuery }: Props) => {
    const queryClient = useQueryClient();

    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>({
        open: false,
        message: "",
        severity: "success",
    });

    const updateTaskMutation = useMutation({
        mutationFn: (updatedTask: TaskPutSchema & { id: number }) =>
            TasksService.idTasksIdPut(updatedTask.id, updatedTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (id: number) => TasksService.idTasksIdDelete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            setDeleteDialog({ open: false, itemId: null });
            setSnackbar({
                open: true,
                message: "Задача успешно удалена",
                severity: "success",
            });
        },
        onError: () => {
            setSnackbar({
                open: true,
                message: "Ошибка при удалении задачи",
                severity: "error",
            });
        },
    });

    const [editId, setEditId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        itemId: number | null;
    }>({
        open: false,
        itemId: null,
    });

    const startEditing = (task: TaskSchema) => {
        setEditId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description ?? "");
    };

    const saveEditing = (task: TaskSchema) => {
        updateTaskMutation.mutate({
            ...task,
            title: editTitle,
            description: editDescription,
        });
        setEditId(null);
    };

    const toggleDone = (task: TaskSchema) => {
        updateTaskMutation.mutate({
            ...task,
            is_done: !task.is_done,
        });
    };

    const confirmDelete = (itemId: number) => {
        setDeleteDialog({ open: true, itemId });
    };

    if (tasksQuery.isLoading) return <div>Загрузка...</div>;
    if (tasksQuery.error) return <div>Ошибка загрузки</div>;
    if (!tasksQuery.data?.length) return <div>Задачи не найдены</div>;

    return (
        <>
            <List>
                {tasksQuery.data?.map((task) => (
                    <ListItem key={task.id} divider>
                        <Checkbox
                            checked={task.is_done}
                            onChange={() => toggleDone(task)}
                            tabIndex={-1}
                            disableRipple
                        />
                        {editId === task.id ? (
                            <>
                                <TextField
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    size="small"
                                    sx={{ mr: 1, flexGrow: 1 }}
                                />
                                <TextField
                                    value={editDescription}
                                    onChange={(e) =>
                                        setEditDescription(e.target.value)
                                    }
                                    size="small"
                                    sx={{ mr: 1, flexGrow: 2 }}
                                />
                            </>
                        ) : (
                            <ListItemText
                                primary={task.title}
                                secondary={task.description ?? "Нет описания"}
                                sx={{
                                    textDecoration: task.is_done
                                        ? "line-through"
                                        : "none",
                                    color: task.is_done
                                        ? "text.disabled"
                                        : "text.primary",
                                }}
                            />
                        )}
                        {editId === task.id ? (
                            <IconButton
                                edge="end"
                                aria-label="save"
                                onClick={() => saveEditing(task)}
                            >
                                <SaveIcon />
                            </IconButton>
                        ) : (
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => startEditing(task)}
                            >
                                <EditIcon />
                            </IconButton>
                        )}
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => confirmDelete(task.id)}
                            color="error"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <DeleteModal
                title="Удалить задачу?"
                text="Вы уверены, что хотите удалить эту задачу? Это действие необратимо."
                deleteDialog={deleteDialog}
                setDeleteDialog={setDeleteDialog}
                onDelete={() => deleteTaskMutation.mutate(deleteDialog.itemId!)}
            />
            <SnackbarAlert snackbar={snackbar} setSnackbar={setSnackbar} />
        </>
    );
};
