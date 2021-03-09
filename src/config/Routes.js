import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Claim, Drop } from '../pages';
import { Navbar } from '../components';

const routes = [
  {
    path: '/claim',
    component: Claim,
  },
  {
    path: '/drop',
    component: Drop,
  },
];

const redirectRoute = '/drop';

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        {routes.map(_route => (
          <Route exact {..._route} key={_route.path} />
        ))}
        <Route exact component={() => <Redirect to={redirectRoute} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
