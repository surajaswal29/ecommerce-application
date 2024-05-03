import Home from "../pages/Home/Home"
import Layout from "../pages/Layout"
import userRoutes from "./userRoutes"

const routes = [
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "contact",
    element: <div>Contact</div>,
  },
  {
    path: "user",
    children: userRoutes,
  },
]

export default routes
