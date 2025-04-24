import { useEffect, useState } from "react";

export default function Progress() {
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("progressGoals");
    if (stored) {
      setGoals(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem("progressGoals", JSON.stringify(goals));
  }, [goals]);

  const toggleGoalStatus = (id) => {
    const updated = goals.map((goal) =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updated);
  };

  const filteredGoals = goals.filter((goal) => {
    if (filter === "completed") return goal.completed;
    if (filter === "pending") return !goal.completed;
    return true;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Track Your Progress</h2>

      <div className="mb-4 flex gap-2">
        <button onClick={() => setFilter("all")} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">All</button>
        <button onClick={() => setFilter("completed")} className="px-3 py-1 bg-green-200 rounded hover:bg-green-300">Completed</button>
        <button onClick={() => setFilter("pending")} className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300">Pending</button>
      </div>

      <ul className="space-y-2">
        {filteredGoals.map((goal) => (
          <li
            key={goal.id}
            className={`flex items-center gap-2 p-2 rounded border shadow-sm ${
              goal.completed ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={() => toggleGoalStatus(goal.id)}
            />
            <span className={goal.completed ? "line-through text-gray-500" : ""}>
              {goal.text}
            </span>
          </li>
        ))}
        {filteredGoals.length === 0 && (
          <p className="text-gray-500 italic">No goals found.</p>
        )}
      </ul>
    </div>
  );
}