import './App.css';
import {AuthProvider} from './context/AuthContext'
import SigninRoute from './utils/SigninRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Signin from './pages/Signin';
import Settings from './pages/Settings';
import {
HashRouter as Router,
Route,
Switch
} from 'react-router-dom'
import CreateProblem from './pages/CreateProblem';
import CreateBid from './pages/CreateBid';
import Bids from './pages/Bids';
import GetWorkers from './pages/GetWorkers';
import AcceptBid from './pages/AcceptBid';
import Notifications from './pages/Notifications';
import GetReciept from './pages/GetReciept';

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
      <AuthProvider>
        <SigninRoute path = '/' component = {HomePage} exact/>
        <Route path = '/login' component = {LoginPage}/>
        <Route path = '/signin' component = {Signin}/>
        <Route path = '/settings' component = {Settings}/>
        <Route path = '/home/create/problem' component = {CreateProblem}/>
        <Route path = '/home/opportunity/:id' component = {CreateBid}/>
        <Route path = '/home/problems/:id/:available' component = {Bids}/>
        <Route path = '/problem/:problem_id/bidder/:id' component = {AcceptBid}/>
        <Route path = '/home/get/workers/:id' component = {GetWorkers}/>
        <Route path = '/home/get/notifications' component = {Notifications}/>
        <Route path = '/get/reciepts' component = {GetReciept}/>
      </AuthProvider>
      </Switch>
    </Router>
    </div>
  );
  //setup a private route for workers and for users
}

export default App;
