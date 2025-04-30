import { useState, useEffect } from "react";
import { BookOpen, Server, RefreshCw, Globe } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Topics() {
  const [progress, setProgress] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Topics data
  const topics = [
    {
      id: 1,
      title: "React Basics",
      description: "Components, props, and state.",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: 2,
      title: "React Router",
      description: "Navigation and dynamic routes.",
      icon: <Globe className="h-6 w-6 text-green-600" />,
      color: "bg-green-50 border-green-200",
    },
    {
      id: 3,
      title: "State Management",
      description: "useState, useReducer, and Context API.",
      icon: <RefreshCw className="h-6 w-6 text-yellow-600" />,
      color: "bg-yellow-50 border-yellow-200",
    },
    {
      id: 4,
      title: "API Integration",
      description: "Fetching and displaying data.",
      icon: <Server className="h-6 w-6 text-purple-600" />,
      color: "bg-purple-50 border-purple-200",
    },
  ];

  // Load progress from localStorage
  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem("topicProgress");
      if (storedProgress) setProgress(JSON.parse(storedProgress));
    } catch (error) {
      console.error("Failed to load progress from localStorage:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("topicProgress", JSON.stringify(progress));
      } catch (error) {
        console.error("Failed to save progress to localStorage:", error);
      }
    }
  }, [progress, isInitialized]);

  // Handle progress update
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
    <div className="px-4 py-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Page Heading */}
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Topics to Explore
      </h2>

      {/* Topics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`p-6 rounded-2xl border shadow-md transition-all hover:shadow-xl hover:scale-105 ${topic.color}`}
          >
            {/* Topic Header */}
            <div className="flex items-center gap-3 mb-4">
              {topic.icon}
              <h3 className="text-xl font-semibold">{topic.title}</h3>
            </div>

            {/* Topic Description */}
            <p className="text-gray-700 mb-4">{topic.description}</p>

            {/* Progress Bar */}
            <div className="h-3 bg-gray-300 rounded-full mb-2">
              <div
                className="h-3 bg-blue-600 rounded-full transition-all"
                style={{ width: `${progress[topic.id] || 0}%` }}
              />
            </div>

            {/* Progress Percentage */}
            <p className="text-sm text-gray-600 mb-3">
              {progress[topic.id] || 0}% Complete
            </p>

            {/* Start Learning Button */}
            <button
              onClick={() => handleStart(topic.id)}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              aria-label={`Start learning ${topic.title}`}
            >
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}