import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const UpdateTask = ({ showUpdateTaskDialog, setShowUpdateTaskDialog, taskToBeUpdated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    if (!taskToBeUpdated?.id) return;
    setTaskName(taskToBeUpdated.data?.taskName || "");
    setTaskDescription(taskToBeUpdated.data?.taskDescription || "");
  }, [taskToBeUpdated]);

  useEffect(() => { setOpen(showUpdateTaskDialog); }, [showUpdateTaskDialog]);

  const handleClose = () => { setOpen(false); setShowUpdateTaskDialog(false); };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!taskToBeUpdated?.id) return;
    try {
      setIsLoading(true);
      await updateDoc(doc(db, "tasks", taskToBeUpdated.id), { taskName: taskName.trim(), taskDescription: taskDescription.trim(), updatedAt: new Date().toISOString() });
      toast.success("Task updated successfully.");
      handleClose();
    } catch (error) { toast.error(error.message || "Unable to update the task."); }
    finally { setIsLoading(false); }
  };

  return <Dialog fullWidth open={open} onClose={handleClose} PaperProps={{ component: "form", onSubmit: handleSubmit }}>
    <DialogTitle>Update task</DialogTitle><DialogContent><TextField sx={{ marginTop: "15px" }} size="small" autoFocus required label="Task name" fullWidth value={taskName} onChange={(event) => setTaskName(event.target.value.replace(/[^a-zA-Z ]/gi, "").slice(0, 20))} /><TextField sx={{ marginTop: "15px" }} size="small" required label="Task description" fullWidth multiline rows={5} value={taskDescription} onChange={(event) => setTaskDescription(event.target.value.slice(0, 200))} /></DialogContent><DialogActions>{isLoading ? <CircularProgress size={25} /> : <><Button color="error" variant="outlined" onClick={handleClose}>Cancel</Button><Button type="submit" variant="contained">Save changes</Button></>}</DialogActions>
  </Dialog>;
};
export default UpdateTask;
