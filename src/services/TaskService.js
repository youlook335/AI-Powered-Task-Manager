import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// 🔹 Add New Task
export const addTask = async (task) => {
  await addDoc(collection(db, "tasks"), task);
};

// 🔹 Get All Tasks
export const getTasks = async () => {
  const snapshot = await getDocs(collection(db, "tasks"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 🔹 Delete Task
export const deleteTask = async (taskId) => {
  await deleteDoc(doc(db, "tasks", taskId));
};

export const addTask = async (task) => {
    await addDoc(collection(db, "tasks"), {
      text: task.text || "",
      link: task.link || "",
      createdAt: new Date(),
    });
  };
  