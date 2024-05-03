import { useEffect } from 'react'
import { useRoutes } from "react-router-dom"
import routes from "./routes"
import { useDispatch } from 'react-redux'
import { getUserInfo } from './redux/actions/userActions'

const App = () => {
  const route = useRoutes(routes)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  return route
}

export default App
