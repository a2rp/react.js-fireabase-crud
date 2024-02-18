import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PreviewIcon from "@mui/icons-material/Preview";

const Tasks = (props) => {
    const [tasks, setTasks] = useState("");
    useEffect(() => {
        setTasks(props.tasks);
    }, [props.tasks]);

    return (
        <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
            <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#000" }}>
                        <TableCell sx={{ color: "#fff" }}>id</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Task name</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Created at</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Updated at</TableCell>
                        <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.length > 0
                        ? tasks.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.data.taskName}</TableCell>
                                <TableCell>{row.data.createdAt}</TableCell>
                                <TableCell>{row.data.updatedAt}</TableCell>
                                <TableCell>
                                    <div style={{ display: "flex", gap: "15px" }}>
                                        <Button size="small" variant="contained" color="secondary" startIcon={<PreviewIcon />}
                                            onClick={event => props.handleView(row)}
                                        >View</Button>
                                        <Button size="small" variant="outlined" startIcon={<EditNoteIcon />}
                                            onClick={event => props.handleUpdate(row)}
                                        >Update</Button>
                                        <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />}
                                            onClick={() => props.handleDelete(row.id)}
                                        >Delete</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                        : <TableRow>
                            <TableCell colSpan="5"><h1 style={{ color: "orangered" }}>No task added.</h1></TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Tasks
