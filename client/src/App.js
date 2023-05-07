import Home from "./pages/home/Home";
import "./app.scss"
// import {BrowserRouter, Route, Routes} from "react-router-dom"
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { DarkContext } from "./context/darkModeContext";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import Navbar from "./components/navbar/Navbar";
// import LeftBar from "./components/leftBar/LeftBar";
// import RightBar from "./components/rightBar/RightBar";
function App() {
  const queryClient = new QueryClient()
  const { dark } = useContext(DarkContext)
  const { currentUser } = useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />
    }
    return children
  }
  const Layout = () => {
    return (
      <>
        {/* <Navbar />
        <div style={{display: "flex"}}> */}
        {/* <LeftBar/> */}
        <QueryClientProvider client={queryClient}>

          <Outlet />
        </QueryClientProvider>

        {/* <RightBar/> */}
        {/* </div> */}
      </>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },

  ]);
  return (
    <div className={dark ? "app dark" : "app"}>
      <RouterProvider router={router} />
      {/* <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
          </Routes>
        </BrowserRouter> */}
    </div>
  );
}

export default App;
