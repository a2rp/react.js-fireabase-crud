import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const ViewTask = ({ showViewTaskDialog, setShowViewTaskDialog, taskToBeViewed }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(showViewTaskDialog), [showViewTaskDialog]);
  const handleClose = () => { setOpen(false); setShowViewTaskDialog(false); };
  return <Dialog fullWidth open={open} onClose={handleClose}><DialogTitle>View task</DialogTitle><DialogContent><TextField sx={{ marginTop: "15px" }} size="small" label="Task name" fullWidth value={taskToBeViewed.data?.taskName || ""} InputProps={{ readOnly: true }} /><TextField sx={{ marginTop: "15px" }} size="small" label="Task description" fullWidth multiline rows={5} value={taskToBeViewed.data?.taskDescription || ""} InputProps={{ readOnly: true }} /></DialogContent><DialogActions><Button variant="outlined" onClick={handleClose}>Close</Button></DialogActions></Dialog>;
};
export default ViewTask;
