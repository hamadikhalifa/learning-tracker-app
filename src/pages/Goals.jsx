import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  PlusCircle,
  CheckCircle,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react";

const categoryColors = {
  Work: "bg-blue-100 text-blue-800",
  Personal: "bg-green-100 text-green-800",
  Study: "bg-yellow-100 text-yellow-800",
  Other: "bg-gray-200 text-gray-800",
};

export default function Goals() {
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("Personal");
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("goals"));
    if (stored) setGoals(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (goal.trim() === "") {
      toast.error("Please enter a goal");
      return;
    }

    const newGoal = {
      id: Date.now(),
      text: goal,
      category,
      completed: false,
    };

    setGoals([...goals, newGoal]);
    setGoal("");
    setCategory("Personal");
    toast.success("Goal added!");
  };

  const toggleComplete = (id) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, completed: !g.completed } : g
      )
    );
  };

  const handleDeleteGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    toast.info("Goal deleted");
  };

  const filteredGoals = goals.filter((g) => {
    if (filter === "Completed") return g.completed;
    if (filter === "Pending") return !g.completed;
    return true;
  });

  const sortedGoals = [...filteredGoals].sort((a, b) => {
    if (sort === "Newest") return b.id - a.id;
    if (sort === "Oldest") return a.id - b.id;
    if (sort === "A-Z") return a.text.localeCompare(b.text);
    if (sort === "Z-A") return b.text.localeCompare(a.text);
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Goals</h2>

        <form onSubmit={handleAddGoal} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter your goal"
            className="border px-3 py-2 rounded w-full"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option>Personal</option>
            <option>Work</option>
            <option>Study</option>
            <option>Other</option>
          </select>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
          >
            <PlusCircle size={18} />
            Add
          </button>
        </form>

        {/* Filters & Sorting */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className="mr-2 font-medium text-gray-700 flex items-center gap-2">
              <Filter size={16} />
              Filter:
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="ml-2 border px-2 py-1 rounded"
              >
                <option>All</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
            </label>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <SortAsc size={16} />
              Sort:
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="ml-2 border px-2 py-1 rounded"
              >
                <option>Newest</option>
                <option>Oldest</option>
                <option>A-Z</option>
                <option>Z-A</option>
              </select>
            </label>
          </motion.div>
        </div>

        <ul className="space-y-4">
          <AnimatePresence>
            {sortedGoals.map((goal) => (
              <motion.li
                key={goal.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`flex justify-between items-center p-4 rounded-lg shadow ${categoryColors[goal.category]} ${
                  goal.completed ? "opacity-60 line-through" : ""
                }`}
              >
                <span>{goal.text}</span>
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => toggleComplete(goal.id)}
                    className="text-green-600 hover:text-green-800"
                    title="Toggle complete"
                  >
                    <CheckCircle size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete goal"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}