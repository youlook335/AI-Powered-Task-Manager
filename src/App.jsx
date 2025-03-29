import { useState, useEffect } from "react";
import { addTask, getTasks } from "./services/TaskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [taskLink, setTaskLink] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!taskText.trim() && !taskLink.trim()) return;
    await addTask({ text: taskText, link: taskLink });
    setTaskText("");
    setTaskLink("");
    loadTasks();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-5">
      <h2 className="text-3xl font-bold mb-5">📝 AI Task Manager</h2>
      
      <input
        type="text"
        placeholder="Enter Task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-white"
      />
      <input
        type="url"
        placeholder="Enter Link (optional)"
        value={taskLink}
        onChange={(e) => setTaskLink(e.target.value)}
        className="w-full p-2 border rounded bg-gray-800 border-gray-700 text-white mt-2"
      />
      <button
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition mt-3"
        onClick={handleAddTask}
      >
        Add Task
      </button>

      <ul className="mt-5 w-full max-w-md">
        {tasks.map((t) => (
          <li key={t.id} className="bg-gray-800 p-2 my-2 rounded">
            <p>{t.text}</p>
            {t.link && (
              <a href={t.link} target="_blank" className="text-blue-400">
                {t.link}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
