import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import Footer from "./components/Footer";
import Settings from "./components/Settings";
import FinanceTracker from "./components/FinanceTracker";
import TaskManagement from "./Pages/TaskManagement";
import { TaskProvider } from "./Context/TaskProvider";

const routes = createBrowserRouter([
  {
    path: "/taskSchedly/",
    element: <RootLayout />,
    children: [
      {
        path: "TaskManagement",
        element: <TaskManagement />,
      },
      {
        path: "FinanceTracker",
        element: <FinanceTracker />,
      },
      {
        path: "Settings",
        element: <Settings />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <TaskProvider>
        <RouterProvider router={routes} />
      </TaskProvider>
    </>
  );
}

export default App;
