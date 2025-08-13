import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type Props = {
    title: string
    text?: string
    deleteDialog: {
        open: boolean,
        itemId: number | null
    },
    setDeleteDialog: React.Dispatch<React.SetStateAction<{
        open: boolean,
        itemId: number | null
    }>>,
    onDelete: () => void
}

export const DeleteModal = ({ deleteDialog, setDeleteDialog, onDelete }: Props) => {
    return <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, itemId: null })}
    >
        <DialogTitle>Удалить задачу?</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Вы уверены, что хотите удалить эту задачу? Это действие необратимо.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, itemId: null })}>
                Отмена
            </Button>
            <Button
                onClick={onDelete}
                color="error"
                variant="contained"
            >
                Удалить
            </Button>
        </DialogActions>
    </Dialog>
}