import Home from './pages/home/Home'
import TopBar from './components/topbar/TopBar'
import Settings from './pages/settings/Settings'
import Write from './pages/write/Write'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Single from './pages/single/Single'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from './context/Context'

export default function App() {
  const { user } = useContext(Context)

  return (
      <Router>
        <TopBar />
        <Switch>            
          <Route exact path="/"><Home /></Route>
          <Route path="/register">{ user ? <Home /> : <Register />}</Route>
          <Route path="/login">{ user ? <Home /> : <Login />}</Route>
          <Route path="/logout">{ user ? <Login /> : <Register />}</Route>          
          <Route path="/write">{ user ? <Write /> : <Register />}</Route>
          <Route path="/settings">{ user ? <Settings /> : <Register />}</Route>
          <Route path="/post/:postId"><Single /></Route>                       
        </Switch>
      </Router>
  )
}