import { Fragment, useState } from 'react';
import { Box, Typography, Collapse } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useStyles } from '../../theme/styles/pages/claim/claimStyles';
import ClaimMain from './ClaimMain';
import ClaimDashboard from './ClaimDashboard';

const Claim = () => {
  const classes = useStyles();
  const [expand, setExpand] = useState(true);

  const handleToggle = () => {
    setExpand(!expand);
  };

  return (
    <Fragment>
      <Collapse in={expand}>
        <ClaimMain />
      </Collapse>
      <Box
        className={`${classes.collapse} ${!expand ? classes.hideBorder : ''}`}
        onClick={handleToggle}
      >
        {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        <Typography variant='body2' className={classes.triggerText}>
          Claim Dashboard
        </Typography>
      </Box>
      <Collapse in={!expand}>
        <ClaimDashboard />
      </Collapse>
    </Fragment>
  );
};

export default Claim;
