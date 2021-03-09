import { Fragment, useState } from 'react';
import { Box, Typography, Collapse } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useStyles } from '../../theme/styles/pages/drop/dropStyles';
import DropMain from './DropMain';
import DropDashboard from './DropDashboard';

const Drop = () => {
  const classes = useStyles();
  const [expand, setExpand] = useState(true);

  const handleToggle = () => {
    setExpand(!expand);
  };

  return (
    <Fragment>
      <Collapse in={expand}>
        <DropMain />
      </Collapse>
      <Box className={classes.collapse} onClick={handleToggle}>
        {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        <Typography variant='body2' className={classes.triggerText}>
          Drop Dashboard
        </Typography>
      </Box>
      <Collapse in={!expand}>
        <DropDashboard />
      </Collapse>
    </Fragment>
  );
};

export default Drop;
