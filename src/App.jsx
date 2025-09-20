// import "./App.css";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [editingId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
  };
  const handleToggleComplete = (id) => {
    const toggleTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(toggleTodo);
  };
  const handleDelete = (id) => {
    if (editingId === id) {
      setEditId(null);
      setEditText("");
    }
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleStartEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };
  const handleSaveEdit = () => {
    if (editText.trim()) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingId
          ? {
              ...todo,
              text: editText.trim(),
              updatedAt: new Date().toISOString(),
            }
          : todo
      );

      setTodos(updatedTodos);
    }
    setEditId(null);
    setEditText("");
  };
  const handleCancelEdit = () => {
    setEditId(null);
    setEditText("");
  };
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all todos?")) {
      setTodos([]);
      setEditId(null);
      setEditText("");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Title */}
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold mb-2">My Todo List</h1>
          <p className="text-gray-600">Manage your daily tasks</p>
        </div>
        {/* Input */}
        <TodoInput onAddTodo={handleAddTodo} />
        {/* TodoList */}
        <TodoList
          todos={todos}
          editingId={editingId}
          editText={editText}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
          onStartEdit={handleStartEdit}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
          onEditTextChange={setEditText}
          onClearAll={handleClearAll}
        />
        <TodoStats todos={todos} />
      </div>
    </div>
  );
}
export default App;
