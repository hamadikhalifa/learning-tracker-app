import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals"));
    if (storedGoals) setGoals(storedGoals);
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
    };

    setGoals([...goals, newGoal]);
    setGoal("");
    setCategory("Personal");
    toast.success("Goal added successfully!");
  };

  const handleDeleteGoal = (id) => {
    const updatedGoals = goals.filter((g) => g.id !== id);
    setGoals(updatedGoals);
    toast.info("Goal removed");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
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
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Add
          </button>
        </form>

        <ul className="space-y-4">
        <AnimatePresence>
  {goals.map((goal) => (
    <motion.li
      key={goal.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className={`flex justify-between items-center p-4 rounded-lg shadow ${categoryColors[goal.category]}`}
    >
      <span>{goal.text}</span>
      <button
        onClick={() => handleDeleteGoal(goal.id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </motion.li>
  ))}
</AnimatePresence>
        </ul>
      </div>
    </div>
  );
}