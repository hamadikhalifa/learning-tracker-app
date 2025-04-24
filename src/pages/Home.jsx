export default function Home() {
  return (
    <div className="text-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Welcome to the Learning Tracker App</h1>
      <p className="text-lg text-gray-700 max-w-xl mx-auto">
        Track your progress and stay on top of your learning goals. Whether you're mastering a new topic, 
        setting goals, or reviewing your progress—this app keeps everything organized and accessible.
      </p>
      <div className="mt-6">
        <img
          src="/learning-tracker-logo.png"
          alt="Learning Tracker"
          className="mx-auto w-40 h-40 opacity-90"
        />
      </div>
    </div>
  );
}