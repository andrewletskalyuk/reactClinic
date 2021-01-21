import './App.css';
import React, { Component, Suspense } from 'react';
import MenuNavbar from './components/menu/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProgressSpinner from './components/common/eclipse';

const Register = React.lazy(() => import('./components/auth/register'));
const Home = React.lazy(() => import('./components/home/Home'));
const Confirm = React.lazy(()=> import('./components/auth/confirm'));
const CompleteRegister = React.lazy(()=> import('./components/auth/completeRegister/CompleteRegister'));
const Restore = React.lazy(() => import('./components/auth/restorePassword/scenes/RestorePasswordPage'));
const CompleteRestore = React.lazy(() => import('./components/auth/restorePasswordProcess/RestorePasswordProcess'));
const GoogleMap = React.lazy(()=> import('./components/googlemap/GoogleMap'));
const Appointments = React.lazy(()=> import('./components/appointments/Appointments'));
const LoginPage = React.lazy(() => import('./components/auth/loginUser/LoginPage/LoginPage'));
const LoggedUser = React.lazy(() => import('./components/auth/loginUser/LoginPage/LoggedUser'));
class App extends Component {
  
  render() {
    return (
      // <Suspense fallback={<p>Завантаження...</p>}>
      <Suspense fallback={<ProgressSpinner/>}>
        <div className="container">
          <MenuNavbar />
        </div>
        <div>
          <Switch>
            <Route exact path='/'>                      <Home />      </Route>
            <Route exact path='/register' render={() => <Register />} />
            <Route exact path='/location' render={() => <GoogleMap />} />
            <Route exact path='/completeregister' render={() => <CompleteRegister/>} />
            <Route exact path='/confirm-email'    render={(url) => <Confirm { ...url}/>}/>
            <Route exact path='/restorepassword'  render={() => <Restore/>}/>
            <Route exact path='/completerestore'  render={() => <CompleteRestore/>}/>
            <Route exact path='/login'            render={() => <LoginPage/>}/>
            <Route exact path='/appointments'     render={() => <Appointments/>} />
            <Route exact path='/loggeduser'       render={() => <LoggedUser/> }  />
          </Switch>
        </div>
      </Suspense>
    );
  }
}

export default App;
