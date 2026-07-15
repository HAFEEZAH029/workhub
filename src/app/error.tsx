'use client';

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-app-primary">Oops! Something went wrong.</h1>
      <p className="mt-4 text-lg text-app-secondary">We encountered an error while loading the page.</p>
      <p className="mt-2 text-app-neutral">Please try again later or contact support if the issue persists.</p>
      <div className="flex items-center justify-center mt-6 gap-10">
        <button
        className="bg-app-primary text-app-tertiary py-2 px-4 rounded-lg font-semibold cursor-pointer hover:bg-app-primary/80 transition-all duration-300"
        onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
        <button
        className="bg-app-secondary text-app-tertiary py-2 px-4 rounded-lg font-semibold cursor-pointer hover:bg-app-secondary/80 transition-all duration-300"
        onClick={() => window.location.href = '/'}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};