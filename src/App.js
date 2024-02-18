import React, { useEffect, useState } from "react";
import styles from "./app.module.scss";
import { Button } from "@mui/material";
import AddTask from "./components/AddTask";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore"
import { db } from './utils/firebase'
import Tasks from "./components/Tasks";
import Swal from "sweetalert2";
import UpdateTask from "./components/UpdateTask";
import ViewTask from "./components/ViewTask";

const App = () => {
    const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
    const [showUpdateTaskDialog, setShowUpdateTaskDialog] = useState(false);
    const [showViewTaskDialog, setShowViewTaskDialog] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskToBeUpdated, setTaskToBeUpdated] = useState({});
    const [taskToBeViewed, setTaskToBeViewed] = useState({});

    // get all tasks
    const getAllTasks = async () => {
        const taskColRef = query(collection(db, 'tasks'), orderBy('updatedAt', 'desc'))
        onSnapshot(taskColRef, (snapshot) => {
            setTasks(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    };
    useEffect(() => {
        getAllTasks();
    }, []);

    // delete a task
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Do you want to delete task with id: " + id,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't delete`
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTask(id);
            } else if (result.isDenied) {
                Swal.fire("Not deleted", "", "info");
            }
        });
    }
    const deleteTask = async (id) => {
        try {
            const taskDocRef = doc(db, 'tasks', id);
            const response = await deleteDoc(taskDocRef);
            toast(`Item with id: ${id} deleted successfully`);
        } catch (err) {
            toast(err);
        }
    };

    // update task
    const handleUpdate = (task) => {
        setTaskToBeUpdated(task);
        setShowUpdateTaskDialog(true);
    };

    // view task
    const handleView = (task) => {
        setTaskToBeViewed(task);
        setShowViewTaskDialog(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.appName}>a2rp: react.js firebase task manager crud application</div>
            </div>
            <div className={styles.main}>
                <Button variant="contained"
                    onClick={() => setShowAddTaskDialog(true)}
                >
                    <AddIcon /> Add task
                </Button>
                <AddTask
                    showAddTaskDialog={showAddTaskDialog}
                    setShowAddTaskDialog={setShowAddTaskDialog}
                />
                <UpdateTask
                    showUpdateTaskDialog={showUpdateTaskDialog}
                    setShowUpdateTaskDialog={setShowUpdateTaskDialog}
                    taskToBeUpdated={taskToBeUpdated}
                />
                <ViewTask
                    showViewTaskDialog={showViewTaskDialog}
                    setShowViewTaskDialog={setShowViewTaskDialog}
                    taskToBeViewed={taskToBeViewed}
                />

                {/* all tasks */}
                <Tasks tasks={tasks} handleDelete={handleDelete} handleUpdate={handleUpdate} handleView={handleView} />
            </div>

            <ToastContainer />
        </div>
    )
}

export default App
