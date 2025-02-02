import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import Footer from "./components/Footer";
import Settings from "./components/Settings";
import FinanceTracker from "./components/FinanceTracker";
import TaskManagement from "./Pages/TaskManagement";

const routes = createBrowserRouter([
  {
    path: "/taskSchedly/",
    element: <RootLayout />,
    children:[
      {
        path:'TaskManagement',
        element: <TaskManagement />
      },
      {
        path:'FinanceTracker',
        element: <FinanceTracker />
      },
      {
        path:'Settings',
        element: <Settings />
      }
    ]
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
