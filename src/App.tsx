import { Button } from "../src/components/ui/button";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center  dark:bg-gray-900">
      <div className="max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Investment Dashboard</h1>
        <p className="text-gray-700 dark:text-gray-300">
          This project is an investment management dashboard built with modern web technologies. 
          It provides features such as adding, viewing, and analyzing investments with a dynamic ROI trend chart.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tech Stack</h2>
        <ul className="text-gray-700 dark:text-gray-300 space-y-1">
          <li>⚡ React 19 + Vite</li>
          <li>🌍 i18next for internationalization</li>
          <li>🎨 Tailwind CSS + ShadCN UI</li>
          <li>📊 Recharts for data visualization</li>
          <li>📦 Redux Toolkit + RTK Query</li>
          <li>📝 React Hook Form + Yup for form handling</li>
        </ul>

        <Button asChild className="mt-4">
          <a href="https://github.com/Phaxe/vite-practice" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </Button>
      </div>
    </div>
  );
};

export default App;
