"use client";

export default function Spinner({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <>
      {/* option 1 */}
      <div className="flex items-center justify-center">
        <div
          className={`animate-spin rounded-full border-solid border-violet-600 border-t-transparent ${sizeClasses[size]}`}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>

      {/* option 2 */}
      {/* <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      </div> */}

      {/* option 3 */}
      {/* <div className="flex space-x-2 justify-center items-center h-screen">
        <div className="h-3 w-3 bg-violet-600 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 bg-violet-600 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 bg-violet-600 rounded-full animate-pulse"></div>
      </div> */}

      {/* option 4 */}
      {/* <div className="w-full h-1 bg-gray-200 fixed top-0 left-0">
        <div className="h-full bg-violet-600 animate-progress"></div>
      </div> */}

      {/* option 5 */}
      {/* <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div> */}
    </>
  );
}
