import './App.css';
import { Route, Switch, BrowserRouter, } from 'react-router-dom'
import Signup from './views/Signup'
import Login from './views/Login'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/signup'>
          <Signup></Signup>
        </Route>
        <Route path='/login'>
          <Login></Login>
        </Route>
        <Route path='/admin'></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;


