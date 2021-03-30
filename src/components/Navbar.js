import { Box, Typography, Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import BlockZeroLogo from '../assets/blockzerologo.png';
import { useStyles } from '../theme/styles/components/navbarStyles';
import { useTheme } from '../hooks';

const Navbar = () => {
  const classes = useStyles();
  const { toggleThemeF } = useTheme();

  return (
    <Box className={classes.mainContainer}>
      <Grid item xs={4} style={{ textAlign: 'center' }}>
        <NavLink
          to='/claim'
          className={classes.navlink}
          activeClassName={classes.activeNavlink}
          exact
        >
          <Typography variant='body2' className={classes.navTypography}>
            Claim
          </Typography>
        </NavLink>
      </Grid>
      <Grid item xs={2} style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
        <Box className={classes.logo} onClick={toggleThemeF}>
          <img src={BlockZeroLogo} alt='blockzero logo' />
        </Box>
      </Grid>
      <Grid item xs={4} style={{ textAlign: 'center' }}>
        <NavLink
          to='/drop'
          className={classes.navlink}
          activeClassName={classes.activeNavlink}
          exact
        >
          <Typography variant='body2' className={classes.navTypography}>
            Drop
          </Typography>
        </NavLink>
      </Grid>
    </Box>
  );
};

export default Navbar;
