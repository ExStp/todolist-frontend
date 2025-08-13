import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { TasksService, type TaskSchema } from "../api";
import { CreateTaskForm, TaskSearchForm, TasksList } from "../features";
import { useState, useEffect } from "react";

export const TasksPage = () => {
    const [searchForm, setSearchForm] = useState({ title: "", is_done: "" });
    const [debouncedSearch, setDebouncedSearch] = useState(searchForm);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchForm);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchForm]);

    const tasksQuery = useQuery<TaskSchema[]>({
        queryKey: ["tasks", debouncedSearch],
        queryFn: () =>
            TasksService.tasksSearchGet(
                debouncedSearch.is_done === ""
                    ? undefined
                    : debouncedSearch.is_done === "true",
                debouncedSearch.title || undefined
            ),
    });

    return (
        <Stack spacing={2}>
            <TaskSearchForm searchForm={searchForm} setSearchForm={setSearchForm} />
            <CreateTaskForm />
            <TasksList tasksQuery={tasksQuery} />
        </Stack>
    );
};
