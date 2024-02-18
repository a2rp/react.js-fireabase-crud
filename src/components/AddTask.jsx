import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const AddTask = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    useEffect(() => {
        if (props.showAddTaskDialog === true) {
            setOpen(true);
        }
    }, [props.showAddTaskDialog]);

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        props.setShowAddTaskDialog(false);
    };

    const handleTaskNameChange = (event) => {
        const value = event.target.value.replace(/[^a-zA-Z ]/gi, "").slice(0, 20);
        setTaskName(value);
    };

    const handleTaskDescriptionChange = (event) => {
        const value = event.target.value.slice(0, 200);
        setTaskDescription(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const taskName = formJson.taskName;
        const taskDescription = formJson.taskDescription;
        const data = {
            taskName: taskName.trim(),
            taskDescription: taskDescription.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        try {
            setIsLoading(true);
            const response = await addDoc(collection(db, 'tasks'), data);
            toast("Created document with id: " + response.id);
            setTaskName("");
            setTaskDescription("");
        } catch (err) {
            toast(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Add task</DialogTitle>
            <DialogContent>
                <TextField
                    sx={{ marginTop: "15px" }}
                    size="small"
                    autoFocus
                    required
                    label="Task name"
                    fullWidth
                    name="taskName"
                    value={taskName}
                    onChange={handleTaskNameChange}
                />
                <TextField
                    sx={{ marginTop: "15px" }}
                    size="small"
                    autoFocus
                    required
                    label="Task description"
                    fullWidth
                    name="taskDescription"
                    value={taskDescription}
                    onChange={handleTaskDescriptionChange}
                    multiline={true}
                    rows={5}
                />
            </DialogContent>
            <DialogActions>
                {isLoading ? <>
                    <CircularProgress />
                </> : <>
                    <Button color="error" variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Submit</Button>
                </>}
            </DialogActions>
        </Dialog>
    )
}

export default AddTask
