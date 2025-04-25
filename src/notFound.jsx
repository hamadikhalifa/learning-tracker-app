import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-pink-200 to-purple-200 overflow-hidden px-4">
      {/* Floating background shape */}
      <motion.div
        className="absolute w-96 h-96 bg-pink-300 opacity-30 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      {/* 404 Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center p-8 bg-white bg-opacity-70 backdrop-blur-md rounded-3xl shadow-xl max-w-md"
      >
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-5xl font-bold text-red-600 mb-2">404</h1>
        <p className="text-lg text-gray-700 mb-6">Oops! Page not found.</p>
        <Link
          to="/"
          className="inline-block bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-600 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;