import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { registerReducer } from '../components/auth/register/reducer';
//це підключити, коли буде готовий логін
import { restorePasswordReducer } from '../components/auth/restorePassword/reducer';
//редюсери для логіна
import { authentication } from '../components/auth/loginUser/_reducers/authentication.reducer';
//import { users } from '../components/auth/loginUser/_reducers/users.reducer';
//import { alert } from '../components/auth/loginUser/_reducers/alert.reducer';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createBrowserHistory({ basename: baseUrl });

export default function configureStore(history, initialState) {
  //redusers живуть окремим життям в окремому файлі разом з middleware   
  const reducers = {
    register: registerReducer,
    restore: restorePasswordReducer,
    authentication: authentication,
    //users: users,
    //alert: alert
  };
  
  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
