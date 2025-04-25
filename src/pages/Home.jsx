import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-blue-100 via-white to-indigo-100 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      
      {/* Subtle Background Image */}
      <img
        src="/illustrations/online_learning.svg"
        alt="Illustration of online learning"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-5 pointer-events-none z-0"
        loading="lazy"
      />

      {/* Main Content */}
      <div className="z-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-blue-800 drop-shadow mb-4"
        >
          Welcome to the Learning Tracker App
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-700 max-w-xl mx-auto"
        >
          Track your progress and stay on top of your learning goals. Whether you're mastering a new topic, 
          setting goals, or reviewing your progress—this app keeps everything organized and accessible.
        </motion.p>

        {/* Icon Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2103/2103292.png"
            alt="Learning Tracker Icon"
            className="mx-auto w-40 h-40 hover:scale-105 transition-transform duration-300 drop-shadow-lg"
            loading="lazy"
          />
        </motion.div>
      </div>
    </div>
  );
}