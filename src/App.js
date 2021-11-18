import './App.css';
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Feed from "./Components/Feed";
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
import { Switch , Route , BrowserRouter as Router , Redirect , Link} from "react-router-dom";
import { AuthProvider } from './Context/AuthContext';
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <PrivateRoute path="/profile/:id" component={Profile}/>
            <PrivateRoute path="/" component={Feed}/>
            
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
