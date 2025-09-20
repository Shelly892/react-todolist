import TodoItem from "./TodoItem";

function TodoList({
  todos,
  editingId,
  editText,
  onToggleComplete,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange,
  onClearAll,
}) {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
      {/* list heading */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Your Todos:</h3>
        {todos.length > 0 && (
          <button
            onClick={onClearAll}
            className="bg-red-500 rounded-lg font-medium text-white px-4 py-2 hover:bg-red-600 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* list info */}
      <p className="text-gray-500 mb-4">
        Todos you've created: {todos.length}
        {editingId && (
          <span className="text-blue-600 ml-2">(Editing mode active)</span>
        )}
      </p>

      {/* content */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          // empty
          <div className="text-center py-8">
            <p className="text-gray-400 italic mb-2">
              No todos yet. Add one above!
            </p>
            <p className="text-xs text-gray-500">
              Double-click any todo to edit it!
            </p>
          </div>
        ) : (
          // render todo List
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editingId === todo.id}
              editText={editText}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onStartEdit={onStartEdit}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
              onEditTextChange={onEditTextChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
