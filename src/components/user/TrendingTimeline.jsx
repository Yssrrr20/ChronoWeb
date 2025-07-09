export default function TrendingTimeline() {
  const timePoints = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  return (
    <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700">
      <h2 className="font-semibold text-lg mb-4">Trending Timeline</h2>
      <div className="relative h-12 flex items-center">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-600 transform -translate-y-1/2"></div>
        <div className="relative flex justify-between w-full">
          {timePoints.map((time, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-3 h-3 bg-gray-300 dark:bg-gray-500 rounded-full z-10 border-2 border-white dark:border-gray-800"></div>
              <span className="text-xs text-gray-500 mt-2">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}