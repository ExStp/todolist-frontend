import { Alert, Snackbar } from "@mui/material";

type Props = {
    snackbar: {
        open: boolean;
        message: string;
        severity: "success" | "error";
    }, setSnackbar: React.Dispatch<React.SetStateAction<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>>
}

export const SnackbarAlert = ({ snackbar, setSnackbar }: Props) => {
    return <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
        <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
        >
            {snackbar.message}
        </Alert>
    </Snackbar>
}