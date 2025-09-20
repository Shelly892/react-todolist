function TodoItem({
  todo,
  isEditing,
  editText,
  onToggleComplete,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange,
}) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSaveEdit();
    } else if (e.key === "Escape") {
      onCancelEdit();
    }
  };

  return (
    <div
      className={`border-b border-gray-200 pb-3 last:border-b-0 last:pb-0 transition-all ${
        isEditing ? "bg-yellow-50 border-yellow-200 rounded-lg p-3" : "p-2"
      } ${todo.completed ? "opacity-75" : ""}`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggleComplete(todo.id)}
          disabled={isEditing}
          className={`rounded-full w-6 h-6 flex items-center justify-center border-2 transition-all ${
            isEditing ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
          } ${
            todo.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-green-400 hover:bg-green-50"
          }`}
          title={isEditing ? "Finish editing first" : "Toggle completion"}
        >
          {todo.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <div className="flex-1">
          {isEditing ? (
            // editing mode
            <div className="space-y-3">
              <input
                type="text"
                value={editText}
                onChange={(e) => onEditTextChange(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full border border-blue-300 bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
                placeholder="Edit your todo..."
              />
              <div className="flex gap-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors"
                  onClick={onSaveEdit}
                >
                  ✓ Save
                </button>
                <button
                  className="bg-gray-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-600 transition-colors"
                  onClick={onCancelEdit}
                >
                  ✕ Cancel
                </button>
              </div>
            </div>
          ) : (
            // display mode
            <div>
              <p
                className={`text-lg cursor-pointer hover:bg-gray-50 rounded px-2 py-1 transition-colors ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800 font-medium"
                }`}
                onDoubleClick={() => onStartEdit(todo.id, todo.text)}
                title="Double-click to edit"
              >
                {todo.text}
              </p>
              <div className="text-xs text-gray-400 mt-1 px-2 space-y-1">
                <p>Created: {new Date(todo.createdAt).toLocaleString()}</p>
                {todo.updatedAt && (
                  <p>Updated: {new Date(todo.updatedAt).toLocaleString()}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* edit button */}
        {!isEditing && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">ID: {todo.id}</span>

            <button
              onClick={() => onStartEdit(todo.id, todo.text)}
              className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1 rounded transition-all"
              title="Edit this todo"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>

            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-all"
              title="Delete this todo"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
