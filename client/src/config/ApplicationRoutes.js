import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// pages
import AuthPage from '../pages/Auth/AuthPage';
import EventsPage from '../pages/Events';
import BookingsPage from '../pages/Bookings';
import UserProfilePage from '../pages/UserProfile';
import NotFound from '../pages/Error/NotFound';
import NotAuthorized from '../pages/Error/NotAuthorized';
import ServerError from '../pages/Error/ServerError';
// context
import { AuthContext } from '../context/auth-context';
// components
import MainNavigation from '../components/Navigation/MainNavigation';
// styles
import * as S from './styles';

const ApplicationRoutes = () => {
  const { user } = useContext(AuthContext);

  const PrivateRoute = ({ component: Component, user }) => (
    <Route
      render={(props) =>
        user.token ? (
          <Component user={user} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              //   state: {
              //     from: 'root',
              //   },
            }}
          />
        )
      }
    />
  );
  return (
    <Router>
      <S.GlobalStyle />
      <div className='App'>
        <MainNavigation />
        <S.MainContent>
          <Switch>
            <Route path='/events' component={EventsPage} />
            <PrivateRoute
              path='/bookings'
              user={user}
              component={BookingsPage}
            />
            <PrivateRoute
              path='/user/:name'
              user={user}
              component={UserProfilePage}
            />
            <Route path='/404' component={NotFound} />
            <Route path='/403' component={NotAuthorized} />
            <Route path='/500' component={ServerError} />
            {!user.token ? (
              <>
                <Route path='/login' component={AuthPage} />
                <Redirect exact from='/' to='/login' />
              </>
            ) : (
              <Redirect exact from='/' to='/events' />
            )}
            <Redirect from='/login' to='events' />
          </Switch>
        </S.MainContent>
      </div>
    </Router>
  );
};

export default ApplicationRoutes;
