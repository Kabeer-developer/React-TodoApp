import React, { useEffect, useState } from "react"

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  })
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter,setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos]);

  function addTodo() {
    if(!text.trim()) return;

    if(editId !== null) {
      setTodos(todos.map(todo => todo.id === editId ? {...todo, text} : todo));
      setEditId(null);
    } else {
      setTodos([...todos, {id : Date.now(), text}]);
    }
    setText("");
  }

  function toggleTodo(id) {
    setTodos(todos.map(todo => todo.id == id ? {...todo, completed: !todo.completed} : todo));
  }

  function editTodo(todo) {
    setText(todo.text);
    setEditId(todo.id);
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const filterTodos = todos.filter(todo => {
    if(filter === "active") return !todo.completed;
    if(filter === "completed") return todo.completed;
    return true;
  });


  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Todo App</h1>
        
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={text} 
            placeholder="Enter Todo" 
            onChange={(e)=> setText(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={addTodo}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <button onClick={() => setFilter("all")} className={`px-2 ${filter==="all" ? "font-bold text-blue-500" : ""}`}> All</button>
          <button onClick={() => setFilter("active")} className={`px-2 ${filter==="active" ? "font-bold text-blue-500" : ""}`}>Active</button>
          <button onClick={() => setFilter("completed")} className={`px-2 ${filter==="completed" ? "font-bold text-blue-500" : ""}`}>Completed</button>
        </div>
        
        <ul>
          {filterTodos.map(todo => (
            <li key={todo.id} className="flex justify-between items-center mb-2 border-b pb-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)}/>

                <span className={`${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.text}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {editTodo(todo)}} className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm">Edit</button>
                <button onClick={() => {deleteTodo(todo.id)}} className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App