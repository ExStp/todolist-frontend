import { Stack, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

interface Props {
    searchForm: { title: string; is_done: string };
    setSearchForm: React.Dispatch<React.SetStateAction<{ title: string; is_done: string }>>;
};

export const TaskSearchForm = ({ searchForm, setSearchForm }: Props) => {
    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 2 }}
        >
            <TextField
                label="Название"
                value={searchForm.title}
                onChange={(e) =>
                    setSearchForm((prev) => ({ ...prev, title: e.target.value }))
                }
                size="small"
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="status-label">Статус</InputLabel>
                <Select
                    labelId="status-label"
                    value={searchForm.is_done}
                    onChange={(e) =>
                        setSearchForm((prev) => ({ ...prev, is_done: e.target.value }))
                    }
                >
                    <MenuItem value="">Все</MenuItem>
                    <MenuItem value="true">Выполнено</MenuItem>
                    <MenuItem value="false">Не выполнено</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
};
