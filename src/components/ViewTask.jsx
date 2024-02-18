import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'

const ViewTask = (props) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (props.showViewTaskDialog === true) {
            setOpen(true);
        }
    }, [props.showViewTaskDialog]);

    const handleClose = () => {
        setOpen(false);
        props.setShowViewTaskDialog(false);
    };

    return (
        <>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>View task</DialogTitle>
                <DialogContent>
                    <TextField
                        sx={{ marginTop: "15px" }}
                        size="small"
                        autoFocus
                        required
                        label="Task name"
                        fullWidth
                        name="taskName"
                        value={props.taskToBeViewed.data?.taskName}
                    />
                    <TextField
                        sx={{ marginTop: "15px" }}
                        size="small"
                        autoFocus
                        required
                        label="Task description"
                        fullWidth
                        name="taskDescription"
                        value={props.taskToBeViewed.data?.taskDescription}
                        multiline={true}
                        rows={5}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ViewTask
