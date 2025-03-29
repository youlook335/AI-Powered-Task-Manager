import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(); // 🔹 Firebase Storage Init

// 🔹 File Upload Function
export const uploadFile = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, `tasks/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// 🔹 Add New Task
export const addTask = async (task) => {
  await addDoc(collection(db, "tasks"), task);
};

// 🔹 Get All Tasks
export const getTasks = async () => {
  const snapshot = await getDocs(collection(db, "tasks"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 🔹 Update Task
export const updateTask = async (taskId, newData) => {
  await updateDoc(doc(db, "tasks", taskId), newData);
};

// 🔹 Delete Task
export const deleteTask = async (taskId) => {
  await deleteDoc(doc(db, "tasks", taskId));
};
