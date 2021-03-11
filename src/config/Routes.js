import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { Claim, Drop } from '../pages';
import { Navbar } from '../components';
import { useStyles } from '../theme/styles/layout';

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
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Navbar />
      <Container className={classes.innerContainer} maxWidth='xs'>
        <Switch>
          {routes.map(_route => (
            <Route exact {..._route} key={_route.path} />
          ))}
          <Route exact component={() => <Redirect to={redirectRoute} />} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default Routes;
