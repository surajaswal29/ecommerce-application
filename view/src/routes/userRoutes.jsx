import Register from "../components/User/Register"
import Login from "../components/User/Login"
import Auth from "../pages/User/Auth"
import OTPVerify from "../components/User/OTPVerify"
import Profile from "../pages/User/Profile"
import Layout from "../pages/Layout"

const userRoutes = [
  {
    path: "register",
    element: (
      <Auth title={"Create an account"}>
        <Register />
      </Auth>
    ),
  },
  {
    path: "verify-otp",
    element: (
      <Auth title={"Verify Your Account"}>
        <OTPVerify />
      </Auth>
    ),
  },
  {
    path: "login",
    element: (
      <Auth title={"Login to your account"}>
        <Login />
      </Auth>
    ),
  },
  {
    path: "profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
]

export default userRoutes
