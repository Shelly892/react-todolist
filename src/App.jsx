import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Error loading todos", error);
      return [];
    }
  });
  const [newTodo, setNewTodo] = useState("");

  //edit feature
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos)); //object->json
    } catch (error) {
      console.error("Error saved to localStorage", error);
    }
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTodos([...todos, todo]);
      setNewTodo("");
    }
  };

  // handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };
  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    // 先清理编辑状态，再删除
    if (editId === id) {
      setEditId(null);
      setEditText("");
    }
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to delete all todos?")) {
      setTodos([]);
      setEditId(null);
      setEditText("");
    }
  };

  const startEditing = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTodos(
        todos.map((todo) =>
          editId === todo.id
            ? {
                ...todo, //复制当前对象的所有属性
                text: editText.trim(),
                updatedAt: new Date().toISOString(),
              }
            : todo
        )
      );
    }
    setEditId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen max-w-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold mb-2">My Todo List</h1>
          <p className="text-gray-600">Manage your daily tasks</p>
        </div>

        {/* new task */}
        <div className="bg-white rounded-lg mx-4 mb-10 py-10 shadow-md">
          <div className="text-left ml-5">
            <h3 className="font-bold text-lg">Add New Task</h3>
            <div className="flex justify-between mr-5 gap-5 items-center mt-3">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your new task here..."
                className="flex-1 border rounded-md border-gray-500 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              />
              <button
                onClick={addTodo}
                className="bg-blue-500 rounded-md font-bold font-medium text-white px-3 py-1 hover:bg-blue-800 transition-colors"
              >
                Add Task
              </button>
            </div>
            <div className="text-gray-500 text-sm mt-5">
              <p>you're typing: "{newTodo}"</p>
              <p>Characters: {newTodo.length}</p>
            </div>
          </div>
        </div>

        {/* your todos */}
        <div className="bg-white rounded-lg mx-4 mb-10 py-10 shadow-md">
          <div className="text-left ml-5">
            <div className="flex justify-between mr-5">
              <h3 className="font-bold text-lg">Your Todos:</h3>
              {todos.length > 0 && (
                <button
                  onClick={clearAll}
                  className="bg-red-500 rounded-md font-bold font-medium text-white py-1 px-3 hover:bg-red-800 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="mt-3">
              <p className="text-gray-500 mb-5">
                Todos you've created: {todos.length}
                {editId && <span className="text-blue-600"> (Editing) </span>}
              </p>
              {todos.length === 0 ? (
                <p className="text-gray-500 italic">
                  No todos yet. Add one above!
                </p>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`border-b border-gray-200 flex mr-5 mt-3 pb-2 p-2 ${
                      editId === todo.id ? "bg-amber-50" : null
                    }`}
                  >
                    <div className="flex items-center w-full gap-3">
                      <button
                        onClick={() => toggleComplete(todo.id)}
                        disabled={editId === todo.id}
                        className={`rounded-full w-5 h-5 border-2 transition-all ${
                          todo.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : "border border-gray-400 hover:border-green-400 hover:bg-green-50"
                        } ${
                          editId === todo.id
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:scale-110"
                        }`}
                        title={
                          editId === todo.id
                            ? "Finish editing first"
                            : "Complete this task"
                        }
                      >
                        {/* Checkmark icon when completed */}
                        {todo.completed && (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>

                      {todo.id === editId ? (
                        <div className="flex-1">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => {
                              setEditText(e.target.value);
                            }}
                            onKeyPress={handleEditKeyPress}
                            className="border border-blue-300 bg-white rounded-md w-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                          />
                          <div className="flex gap-6 mt-3">
                            <button
                              className="bg-green-500 rounded-md px-3 py-0.5 text-white"
                              onClick={saveEdit}
                            >
                              Save
                            </button>
                            <button
                              className="bg-gray-500 rounded-md px-3 py-0.5 text-white"
                              onClick={cancelEdit}
                            >
                              cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1">
                          <p
                            className={` text-lg px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                              todo.completed
                                ? "line-through text-gray-500"
                                : "font-semibold"
                            } `}
                            onDoubleClick={() =>
                              startEditing(todo.id, todo.text)
                            }
                            title="Double click to edit this todo"
                          >
                            {todo.text}
                          </p>
                          <p
                            className={`text-xs px-3 ${
                              todo.completed
                                ? "font-light text-gray-300"
                                : "font-light text-gray-500 "
                            }`}
                          >
                            Created: {new Date(todo.createdAt).toLocaleString()}
                          </p>
                          {todo.updatedAt && (
                            <p
                              className={`text-xs px-3 ${
                                todo.completed
                                  ? "font-light text-gray-300"
                                  : "font-light text-gray-500 "
                              }`}
                            >
                              Updated:{" "}
                              {new Date(todo.updatedAt).toLocaleString()}
                            </p>
                          )}
                          {/* <p>
                            {todo.updatedAt
                              ? "updatedAt: " +
                                new Date(todo.updatedAt).toLocaleString()
                              : null}
                          </p> */}
                        </div>
                      )}

                      <div className="flex items-center gap-2 ml-3">
                        <span className="text-gray-400 text-sm">
                          ID:{todo.id}
                        </span>
                        <button
                          onClick={() => startEditing(todo.id, todo.text)}
                          className="text-blue-500 hover:text-blue-800 hover:bg-blue-50 p-1 rounded transition-all"
                          title="Click to edit this todo"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-all"
                          title="Delete this todo"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* statistics */}
        <div className="bg-white rounded-lg mx-4 mb-10 py-10 shadow-md">
          <div className="ml-5">
            <h3 className="text-left font-bold text-lg">Statistics:</h3>
            <div className="grid md:grid-cols-3 sm:grid-cols-1 mr-5 gap-5 mt-3">
              <div className="bg-blue-100 rounded-sm px-3 py-5 text-center border-l-4 border-blue-500">
                <p className="font-bold text-2xl text-blue-800">
                  {todos.length}
                </p>
                <p className="text-blue-800">Total Tasks</p>
              </div>
              <div className="bg-orange-100 rounded-sm px-3 py-5 text-center border-l-4 border-orange-500">
                <p className="font-bold text-2xl text-orange-800">
                  {todos.filter((todo) => !todo.completed).length}
                </p>
                <p className="text-orange-800">Pending</p>
              </div>
              <div className="bg-green-100 rounded-sm px-3 py-5 text-center border-l-4 border-green-500">
                <p className="font-bold text-2xl text-green-800">
                  {todos.filter((todo) => todo.completed).length}
                </p>
                <p className="text-green-800">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
