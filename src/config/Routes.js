import { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";

import { Claim, Drop } from "../pages";
import { Navbar, Dialog } from "../components";
import { useStyles } from "../theme/styles/layout";

const routes = [
  {
    path: "/claim",
    component: Claim,
  },
  {
    path: "/drop",
    component: Drop,
  },
];

const redirectRoute = "/claim";

const Routes = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(true);

  return (
    <BrowserRouter>
      <Dialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        btnLink="https://app.dropzero.io/claim"
        linkBtnText="Visit"
        renderContent={
          <Typography variant="body2">
            Any tokens dropped before 20 Oct 2021 can only be claimed through
            legacy app
          </Typography>
        }
      />
      <Navbar />
      <Container className={classes.innerContainer} maxWidth="xs">
        <Switch>
          {routes.map((_route) => (
            <Route exact {..._route} key={_route.path} />
          ))}
          <Route exact component={() => <Redirect to={redirectRoute} />} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default Routes;
