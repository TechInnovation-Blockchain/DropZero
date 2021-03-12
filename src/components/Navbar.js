import { Box, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import BlockZeroLogo from '../assets/blockzerologo.png';
import { useStyles } from '../theme/styles/components/navbarStyles';
import { toggleTheme } from '../redux';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Box className={classes.mainContainer}>
      <NavLink to='/drop' className={classes.navlink} activeClassName={classes.activeNavlink} exact>
        <Typography variant='body2' className={classes.navTypography}>
          Drop
        </Typography>
      </NavLink>
      <Box className={classes.logo} onClick={handleThemeToggle}>
        <img src={BlockZeroLogo} alt='blockzero logo' width='40px' />
      </Box>
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
    </Box>
  );
};

export default Navbar;
