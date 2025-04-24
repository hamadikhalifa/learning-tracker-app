import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

export default function Topics() {
  const [progress, setProgress] = useState({});

  const topics = [
    { id: 1, title: "React Basics", description: "Components, props, and state.", color: "bg-blue-100" },
    { id: 2, title: "React Router", description: "Navigation and dynamic routes.", color: "bg-green-100" },
    { id: 3, title: "State Management", description: "useState, useReducer, and Context API.", color: "bg-yellow-100" },
    { id: 4, title: "API Integration", description: "Fetching and displaying data.", color: "bg-purple-100" },
  ];

  useEffect(() => {
    const storedProgress = localStorage.getItem("topicProgress");
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("topicProgress", JSON.stringify(progress));
  }, [progress]);

  const handleStart = (id) => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        [id]: prev[id] >= 100 ? 100 : (prev[id] || 0) + 25,
      };
      toast.success("Progress updated!");
      return updated;
    });
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Topics to Explore</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`p-6 rounded-2xl shadow border ${topic.color} transition-all`}
          >
            <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
            <p className="text-gray-700 mb-4">{topic.description}</p>

            <div className="h-3 bg-gray-300 rounded-full mb-2">
              <div
                className="h-3 bg-blue-600 rounded-full transition-all"
                style={{ width: `${progress[topic.id] || 0}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {progress[topic.id] || 0}% Complete
            </p>

            <button
              onClick={() => handleStart(topic.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}