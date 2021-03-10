import { Box, Typography } from '@material-ui/core';

import { useStyles } from '../../theme/styles/pages/drop/dropDashboardStyles';

const DropDashboard = () => {
  const classes = useStyles();

  return (
    <Box className={classes.mainContainer}>
      <Typography variant='body2' className={classes.lightText}>
        Coming Soon
      </Typography>
    </Box>
  );
};

export default DropDashboard;
