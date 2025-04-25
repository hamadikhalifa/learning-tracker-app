import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Progress() {
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState("all");

  // Load goals from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem("progressGoals");
    if (stored) {
      setGoals(JSON.parse(stored));
    }
  }, []);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("progressGoals", JSON.stringify(goals));
  }, [goals]);

  // Toggle the completion status of a goal
  const toggleGoalStatus = (id) => {
    const updated = goals.map((goal) =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updated);
  };

  // Reset the filter to show all goals
  const resetFilters = () => setFilter("all");

  // Clear all goals
  const clearAllGoals = () => setGoals([]);

  // Filter goals based on the selected filter
  const filteredGoals = goals.filter((goal) => {
    if (filter === "completed") return goal.completed;
    if (filter === "pending") return !goal.completed;
    if (filter === "work") return goal.category === "Work";
    if (filter === "personal") return goal.category === "Personal";
    return true;
  });

  // Calculate progress statistics
  const completedCount = goals.filter((g) => g.completed).length;
  const pendingCount = goals.length - completedCount;
  const percentage = goals.length
    ? Math.round((completedCount / goals.length) * 100)
    : 0;

  // Data for the Pie chart
  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Goals",
        data: [completedCount, pendingCount],
        backgroundColor: ["#4ade80", "#facc15"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Track Your Progress</h2>

      {/* Filter Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className="px-3 py-1 bg-green-200 rounded hover:bg-green-300"
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("work")}
          className="px-3 py-1 bg-blue-200 rounded hover:bg-blue-300"
        >
          Work
        </button>
        <button
          onClick={() => setFilter("personal")}
          className="px-3 py-1 bg-pink-200 rounded hover:bg-pink-300"
        >
          Personal
        </button>
        <button
          onClick={resetFilters}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Reset Filter
        </button>
        <button
          onClick={clearAllGoals}
          className="px-3 py-1 bg-red-200 rounded hover:bg-red-300"
        >
          Clear All Goals
        </button>
      </div>

      {/* Progress Chart */}
      <div className="mb-6">
        <p className="mb-2 font-medium">Progress: {percentage}%</p>
        <div className="w-40 h-40">
          <Pie data={data} />
        </div>
      </div>

      {/* Color Legend */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">Color Legend:</h3>
        <ul className="text-sm">
          <li>
            <span className="inline-block w-3 h-3 bg-green-200 mr-2 rounded"></span>{" "}
            Completed
          </li>
          <li>
            <span className="inline-block w-3 h-3 bg-yellow-200 mr-2 rounded"></span>{" "}
            Pending
          </li>
          <li>
            <span className="inline-block w-3 h-3 bg-blue-200 mr-2 rounded"></span>{" "}
            Work
          </li>
          <li>
            <span className="inline-block w-3 h-3 bg-pink-200 mr-2 rounded"></span>{" "}
            Personal
          </li>
        </ul>
      </div>

      {/* Goals List */}
      <ul className="space-y-2">
        <AnimatePresence>
          {filteredGoals.map((goal) => (
            <motion.li
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              layout
              className={`flex items-center gap-2 p-2 rounded border shadow-sm ${
                goal.completed ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoalStatus(goal.id)}
              />
              <span
                className={
                  goal.completed ? "line-through text-gray-500" : ""
                }
              >
                {goal.text}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
        {filteredGoals.length === 0 && (
          <p className="text-gray-500 italic">No goals found.</p>
        )}
      </ul>
    </div>
  );
}