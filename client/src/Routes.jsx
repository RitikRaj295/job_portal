import { createBrowserRouter } from "react-router-dom";
import App from "./App"; // layout (Navbar + <Outlet />)
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse";
import Profileuser from "./components/Profileuser";
import Jobdescription from "./components/Jobdescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "browse", element: <Browse /> },
      { path: "jobs", element: <Jobs /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "profile", element: <Profileuser /> },
      { path: "/description/:id", element: <Jobdescription /> },
      { path: "/admin/companies", element: <Companies /> },
      { path: "/admin/companies/create", element: <CompanyCreate /> },
      { path: "/admin/companies/:id", element: <CompanySetup /> },
      { path: "/admin/jobs", element: <AdminJobs /> },
      { path: "/admin/jobs/create", element: <PostJob /> },
      { path: "/admin/jobs/:id/applicants", element: <Applicants /> },
    ],
  },
]);

export default Router;
