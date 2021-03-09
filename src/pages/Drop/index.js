import { Fragment, useState } from 'react';
import { Box, Typography, Collapse } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { useStyles } from '../../theme/styles/pages/drop/dropStyles';

const Drop = () => {
  const classes = useStyles();
  const [expand, setExpand] = useState(true);

  const handleToggle = () => {
    setExpand(!expand);
  };

  return (
    <Fragment>
      <Collapse in={expand}>
        <h5>Drop</h5>
      </Collapse>
      <Box className={classes.collapse} onClick={handleToggle}>
        <ExpandLessIcon />
        <Typography variant='body2' className={classes.triggerText}>
          Drop Dashboard
        </Typography>
      </Box>
      <Collapse in={!expand}>
        <h5>Drop Dashboard</h5>
      </Collapse>
    </Fragment>
  );
};

export default Drop;
