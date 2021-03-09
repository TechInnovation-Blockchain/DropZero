import { useState } from 'react';
import { Box, Grid } from '@material-ui/core';

import { useStyles } from '../../theme/styles/pages/drop/dropMainStyles';
import DropToken from './DropToken';
import DropAmount from './DropAmount';

const DropMain = () => {
  const classes = useStyles();
  const [content, setContent] = useState('token');

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} className={classes.gridItem}>
          {content === 'token' ? (
            <DropToken setContent={setContent} />
          ) : content === 'amount' ? (
            <DropAmount setContent={setContent} />
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DropMain;
