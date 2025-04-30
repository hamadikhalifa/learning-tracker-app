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
    <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Track Your Progress
      </h2>

      {/* Filter Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className="px-4 py-2 rounded-lg shadow-md bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 transition-all"
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className="px-4 py-2 rounded-lg shadow-md bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-400 transition-all"
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className="px-4 py-2 rounded-lg shadow-md bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 transition-all"
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("work")}
          className="px-4 py-2 rounded-lg shadow-md bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition-all"
        >
          Work
        </button>
        <button
          onClick={() => setFilter("personal")}
          className="px-4 py-2 rounded-lg shadow-md bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-400 transition-all"
        >
          Personal
        </button>
        <button
          onClick={resetFilters}
          className="px-4 py-2 rounded-lg shadow-md bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 transition-all"
        >
          Reset Filter
        </button>
        <button
          onClick={clearAllGoals}
          className="px-4 py-2 rounded-lg shadow-md bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-400 transition-all"
        >
          Clear All Goals
        </button>
      </div>

      {/* Pie Chart */}
      <div className="mb-6">
        <Pie data={data} />
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredGoals.map((goal) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`p-4 rounded-lg shadow-md ${
                goal.completed ? "bg-green-100" : "bg-yellow-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-800">{goal.text}</span>
                <button
                  onClick={() => toggleGoalStatus(goal.id)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    goal.completed
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
                >
                  {goal.completed ? "Mark Pending" : "Mark Completed"}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}