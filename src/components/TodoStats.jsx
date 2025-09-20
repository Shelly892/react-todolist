function TodoStats({ todos }) {
  // stats
  const total = todos.length;
  const pending = todos.filter((todo) => !todo.completed).length;
  const completed = todos.filter((todo) => todo.completed).length;

  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
      <h3 className="font-bold text-lg mb-4">Statistics:</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* intotal */}
        <div className="bg-blue-50 rounded-lg p-4 text-center border-l-4 border-blue-500">
          <p className="text-2xl font-bold text-blue-600">{total}</p>
          <p className="text-sm text-blue-600">Total Tasks</p>
        </div>

        {/* pending */}
        <div className="bg-orange-50 rounded-lg p-4 text-center border-l-4 border-orange-500">
          <p className="text-2xl font-bold text-orange-600">{pending}</p>
          <p className="text-sm text-orange-600">Pending</p>
        </div>

        {/* completed */}
        <div className="bg-green-50 rounded-lg p-4 text-center border-l-4 border-green-500">
          <p className="text-2xl font-bold text-green-600">{completed}</p>
          <p className="text-sm text-green-600">Completed</p>
        </div>
      </div>
    </div>
  );
}

export default TodoStats;
