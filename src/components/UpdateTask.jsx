import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const UpdateTask = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [task, setTask] = useState({});
    const [id, setId] = useState("");
    const [taskName, setTaskName] = useState(task.data?.taskName);
    const [taskDescription, setTaskDescription] = useState(task.data?.taskDescription);
    const [taskCompleted, setTaskCompleted] = useState(task.data?.taskCompleted);

    useEffect(() => {
        if (props.taskToBeUpdated.length === 0) return;

        setTask(props.taskToBeUpdated);
        setId(props.taskToBeUpdated.id);
        setTaskName(props.taskToBeUpdated.data?.taskName);
        setTaskDescription(props.taskToBeUpdated.data?.taskDescription);
        setTaskCompleted(props.taskToBeUpdated.data?.taskCompleted);
    }, [props.taskToBeUpdated]);

    useEffect(() => {
    }, [task]);

    useEffect(() => {
        if (props.showUpdateTaskDialog === true) {
            setOpen(true);
        }
    }, [props.showUpdateTaskDialog]);

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        props.setShowUpdateTaskDialog(false);
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
        const data = {
            taskName: taskName.trim(),
            taskDescription: taskDescription.trim(),
            completed: false,
            updatedAt: new Date().toISOString(),
        };
        try {
            setIsLoading(true);
            const taskDocRef = doc(db, 'tasks', id);
            const response = await updateDoc(taskDocRef, data);;
            toast("Updated document with id: " + response.id);
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
            <DialogTitle>Update task</DialogTitle>
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

export default UpdateTask
