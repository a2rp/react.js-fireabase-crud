import React, { useEffect, useRef, useState } from "react";
import { Add, ArrowUpward, Code, Coffee, Email, Favorite, GitHub, LinkedIn, Star } from "@mui/icons-material";
import { Button } from "@mui/material";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import styles from "./app.module.scss";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import UpdateTask from "./components/UpdateTask";
import ViewTask from "./components/ViewTask";
import { db, hasFirebaseConfig } from "./utils/firebase";

const footerLinks = [
  ["Portfolio","https://www.ashishranjan.net/",Code],["GitHub","https://github.com/a2rp",GitHub],["CodePen","https://codepen.io/ash1198",Code],["LinkedIn","https://www.linkedin.com/in/aashishranjan",LinkedIn],["Facebook","https://www.facebook.com/theash.ashish/",Favorite],["YouTube","https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1",Code],["Email","mailto:ash.ranjan09@gmail.com",Email],["Support","https://a2rp-donation-page.netlify.app/",Favorite],["Buy Me a Coffee","https://buymeacoffee.com/a2rp",Coffee],["Patreon","https://patreon.com/a2rp",Star],
];

const App = () => {
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [showUpdateTaskDialog, setShowUpdateTaskDialog] = useState(false);
  const [showViewTaskDialog, setShowViewTaskDialog] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskToBeUpdated, setTaskToBeUpdated] = useState({});
  const [taskToBeViewed, setTaskToBeViewed] = useState({});
  const [showTop, setShowTop] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    if (!hasFirebaseConfig) return undefined;
    const taskQuery = query(collection(db, "tasks"), orderBy("updatedAt", "desc"));
    return onSnapshot(taskQuery, (snapshot) => setTasks(snapshot.docs.map((task) => ({ id: task.id, data: task.data() }))), () => toast.error("Unable to load tasks from Firebase."));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({ title: "Delete this task?", text: `Task id: ${id}`, showCancelButton: true, confirmButtonText: "Delete", confirmButtonColor: "#d33" }).then(async (result) => {
      if (!result.isConfirmed) return;
      try { await deleteDoc(doc(db, "tasks", id)); toast.success("Task deleted successfully."); }
      catch (error) { toast.error(error.message || "Unable to delete the task."); }
    });
  };
  const handleMainScroll = (event) => setShowTop(event.currentTarget.scrollTop > 320);
  const scrollToTop = () => mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  return <div className={styles.container}>
    <header className={styles.header}><a className={styles.brand} href="#top"><img src={`${process.env.PUBLIC_URL}/logo.png`} alt="" /><span><small>FIRESTORE WORKSPACE</small><strong>Task Manager</strong></span></a><span className={styles.headerNote}>Live CRUD workspace</span></header>
    <main id="top" ref={mainRef} className={styles.main} onScroll={handleMainScroll}>
      <section className={styles.intro}><span className={styles.eyebrow}>TASK MANAGEMENT</span><h1>Keep your work moving.</h1><p>Create, review, update, and remove tasks directly from your Firestore collection.</p>{!hasFirebaseConfig && <div className={styles.setupNotice}>Add the Firebase environment values from the README to enable the live task collection.</div>}<Button variant="contained" startIcon={<Add />} disabled={!hasFirebaseConfig} onClick={() => setShowAddTaskDialog(true)}>Add task</Button></section>
      <Tasks tasks={tasks} handleDelete={handleDelete} handleUpdate={(task) => { setTaskToBeUpdated(task); setShowUpdateTaskDialog(true); }} handleView={(task) => { setTaskToBeViewed(task); setShowViewTaskDialog(true); }} />
      <footer className={styles.footer}><p>Copyright &copy; {new Date().getFullYear()} <a href="https://www.ashishranjan.net" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></p><div className={styles.footerLinks}>{footerLinks.map(([label,href,Icon]) => <a key={label} href={href} aria-label={label} title={label} target="_blank" rel="noopener noreferrer"><Icon /></a>)}</div></footer>
    </main>
    <AddTask showAddTaskDialog={showAddTaskDialog} setShowAddTaskDialog={setShowAddTaskDialog} />
    <UpdateTask showUpdateTaskDialog={showUpdateTaskDialog} setShowUpdateTaskDialog={setShowUpdateTaskDialog} taskToBeUpdated={taskToBeUpdated} />
    <ViewTask showViewTaskDialog={showViewTaskDialog} setShowViewTaskDialog={setShowViewTaskDialog} taskToBeViewed={taskToBeViewed} />
    {showTop && <button className={styles.scrollTop} type="button" aria-label="Scroll to top" onClick={scrollToTop}><ArrowUpward /></button>}
    <ToastContainer position="bottom-right" autoClose={2800} />
  </div>;
};
export default App;
