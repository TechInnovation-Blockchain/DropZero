import { Box, Typography, Grid } from '@material-ui/core';

import { useStyles } from '../../theme/styles/pages/drop/dropDashboardStyles';

const DropDashboard = () => {
  const classes = useStyles();

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant='body2' className={classes.lightText}>
            Coming Soon
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DropDashboard;
