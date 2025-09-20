import { useState } from "react";

const TodoInput = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState("");
  const handleSubmit = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim());
      setNewTodo("");
    }
  };
  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
      <h3 className="font-bold text-lg mb-4">Add New Task:</h3>
      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder="Type your new task here..."
          className="flex-1 border rounded-lg border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 rounded-lg font-medium text-white px-6 py-3 hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Add Task
        </button>
      </div>
      <div className="text-gray-500 text-sm mt-4">
        <p>You're typing: "{newTodo}"</p>
        <p>Characters: {newTodo.length}</p>
      </div>
    </div>
  );
};

export default TodoInput;
