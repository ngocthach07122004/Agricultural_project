import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import About from "../pages/About";
import Profile from "../pages/UserProfile";
<<<<<<< HEAD
import Menu from "../pages/Menu";
=======
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import Schedule from "../pages/Schedule"; // Import trang Schedule

>>>>>>> 82708c8 (Cập nhật các trang mới như Dashboard, Lên lịch và Cài đặt. Đồng thời xóa một số thứ khác...)
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
<<<<<<< HEAD
      {
        index: true,
        element: <Home />,
      },
      { path: "signin/", element: <Signin /> },
      { path: "signup/", element: <Signup /> },
      { path: "about/", element: <About /> },
      { path: "profile/", element: <Profile /> },
      { path: "menu/", element: <Menu /> },
=======
      { index: true, element: <Home /> },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      { path: "about", element: <About /> },
      { path: "profile", element: <Profile /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "settings", element: <Settings /> },
      { path: "schedule", element: <Schedule /> }, // Thêm route cho Schedule
>>>>>>> 82708c8 (Cập nhật các trang mới như Dashboard, Lên lịch và Cài đặt. Đồng thời xóa một số thứ khác...)
    ],
  },
]);

export default router;
