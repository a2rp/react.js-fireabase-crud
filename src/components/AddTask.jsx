import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../utils/firebase";

const AddTask = ({ showAddTaskDialog, setShowAddTaskDialog }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => setOpen(showAddTaskDialog), [showAddTaskDialog]);

  const handleClose = () => { setOpen(false); setShowAddTaskDialog(false); };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await addDoc(collection(db, "tasks"), { taskName: taskName.trim(), taskDescription: taskDescription.trim(), completed: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      toast.success(`Task ${response.id} created successfully.`);
      setTaskName(""); setTaskDescription(""); handleClose();
    } catch (error) { toast.error(error.message || "Unable to create the task."); }
    finally { setIsLoading(false); }
  };

  return <Dialog fullWidth open={open} onClose={handleClose} PaperProps={{ component: "form", onSubmit: handleSubmit }}>
    <DialogTitle>Add task</DialogTitle><DialogContent><TextField sx={{ marginTop: "15px" }} size="small" autoFocus required label="Task name" fullWidth value={taskName} onChange={(event) => setTaskName(event.target.value.replace(/[^a-zA-Z ]/gi, "").slice(0, 20))} /><TextField sx={{ marginTop: "15px" }} size="small" required label="Task description" fullWidth multiline rows={5} value={taskDescription} onChange={(event) => setTaskDescription(event.target.value.slice(0, 200))} /></DialogContent><DialogActions>{isLoading ? <CircularProgress size={25} /> : <><Button color="error" variant="outlined" onClick={handleClose}>Cancel</Button><Button type="submit" variant="contained" disabled={!taskName.trim() || !taskDescription.trim()}>Create task</Button></>}</DialogActions>
  </Dialog>;
};
export default AddTask;
