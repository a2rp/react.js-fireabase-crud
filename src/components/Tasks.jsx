import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PreviewIcon from "@mui/icons-material/Preview";
import styles from "../app.module.scss";

const Tasks = ({ tasks, handleDelete, handleUpdate, handleView }) => (
  <TableContainer component={Paper} className={styles.tableWrap}>
    <Table sx={{ minWidth: 760 }} size="medium">
      <TableHead><TableRow><TableCell>Task id</TableCell><TableCell>Task name</TableCell><TableCell>Created at</TableCell><TableCell>Updated at</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead>
      <TableBody>{tasks.length > 0 ? tasks.map((row) => <TableRow key={row.id}>
        <TableCell className={styles.idCell}>{row.id}</TableCell><TableCell>{row.data?.taskName || "-"}</TableCell><TableCell>{row.data?.createdAt || "-"}</TableCell><TableCell>{row.data?.updatedAt || "-"}</TableCell>
        <TableCell align="right"><div className={styles.actions}><Button size="small" variant="outlined" startIcon={<PreviewIcon />} onClick={() => handleView(row)}>View</Button><Button size="small" variant="outlined" startIcon={<EditNoteIcon />} onClick={() => handleUpdate(row)}>Update</Button><Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(row.id)}>Delete</Button></div></TableCell>
      </TableRow>) : <TableRow><TableCell colSpan={5} className={styles.emptyCell}>No tasks added yet. Create your first task above.</TableCell></TableRow>}</TableBody>
    </Table>
  </TableContainer>
);
export default Tasks;
