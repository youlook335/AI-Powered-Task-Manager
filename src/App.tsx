import { useState, useEffect } from "react";
import {
  addTask,
  getTasks,
  deleteTask,
  uploadFile,
} from "./services/TaskService";
import { FiPlus, FiTrash, FiUpload } from "react-icons/fi";

interface Task {
  id: string;
  text: string;
  link?: string;
  file?: string;
  createdAt: Date;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState<string>("");
  const [taskLink, setTaskLink] = useState<string>("");
  const [taskFile, setTaskFile] = useState<File | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data: Task[] = await getTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!taskText.trim() && !taskLink.trim() && !taskFile) return;

    let fileUrl: string | null = null;
    if (taskFile) {
      fileUrl = await uploadFile(taskFile);
    }

    await addTask({
      text: taskText,
      link: taskLink,
      file: fileUrl || undefined,
      createdAt: new Date(),
    });
    setTaskText("");
    setTaskLink("");
    setTaskFile(null);
    loadTasks();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-5 h-screen flex flex-col">
        <h2 className="text-xl font-bold mb-4">📁 Categories</h2>
        <ul>
          <li className="mb-2 hover:text-blue-400 cursor-pointer">All Tasks</li>
          <li className="mb-2 hover:text-blue-400 cursor-pointer">In Progress</li>
          <li className="mb-2 hover:text-blue-400 cursor-pointer">Completed</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <h2 className="text-3xl font-bold mb-5">📝 AI Task Manager</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter Task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="p-2 border rounded bg-gray-800 border-gray-700 text-white w-full"
          />
          <input
            type="url"
            placeholder="Enter Link (optional)"
            value={taskLink}
            onChange={(e) => setTaskLink(e.target.value)}
            className="p-2 border rounded bg-gray-800 border-gray-700 text-white w-full"
          />
          <div className="relative w-full">
            <input
              type="file"
              onChange={(e) => setTaskFile(e.target.files ? e.target.files[0] : null)}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="bg-gray-700 text-white flex items-center justify-center p-2 rounded cursor-pointer hover:bg-gray-600"
            >
              <FiUpload className="mr-2" /> Upload File
            </label>
          </div>
        </div>

        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition flex items-center mb-4"
          onClick={handleAddTask}
        >
          <FiPlus className="mr-2" /> Add Task
        </button>

        <ul className="space-y-3">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="bg-gray-800 p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{t.text}</p>
                {t.link && (
                  <a href={t.link} target="_blank" className="text-blue-400 block" rel="noopener noreferrer">
                    🔗 {t.link}
                  </a>
                )}
                {t.file && (
                  <a href={t.file} target="_blank" className="text-green-400 block" rel="noopener noreferrer">
                    📎 Download File
                  </a>
                )}
              </div>
              <button
                className="bg-red-600 px-2 py-1 rounded hover:bg-red-500 flex items-center"
                onClick={() => handleDeleteTask(t.id)}
              >
                <FiTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
