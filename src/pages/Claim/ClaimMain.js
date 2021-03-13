import { useState } from 'react';
import { Box, Typography, Grid } from '@material-ui/core';

import { useStyles } from '../../theme/styles/pages/claim/claimMainStyles';
import { Button, PageAnimation } from '../../components';
import FLASH from '../../assets/FLASH.png';
import DAI from '../../assets/DAI.png';
import XIO from '../../assets/blockzerologo.png';

const tokens = [
  {
    name: 'FLASH',
    img: FLASH,
    width: '20px',
  },
  {
    name: 'DAI',
    img: DAI,
    width: '30px',
  },
  {
    name: 'XIO',
    img: XIO,
    width: '40px',
  },
];

const DropMain = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState(null);

  const handleSelect = value => {
    if (selected !== value) {
      setSelected(value);
    } else {
      setSelected(null);
    }
  };

  return (
    <PageAnimation in={true} reverse={0}>
      <Box className={classes.mainContainer}>
        <Typography variant='body1' className={classes.heading}>
          Available Tokens
        </Typography>
        {tokens.length > 0 ? (
          <Box className={classes.tokenContainer}>
            {tokens.map(token => (
              <Box
                key={token.name}
                className={`${classes.token} ${selected === token.name ? classes.selected : ''}`}
                onClick={() => handleSelect(token.name)}
              >
                <Grid container alignItems='center' spacing={1}>
                  <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <img src={token.img} alt={token.name} width={token.width} />
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: 'left' }}>
                    <Typography variant='body2'>{token.name}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography className={classes.secondaryText} variant='body2'>
            Coming Soon
          </Typography>
        )}
        {tokens.length > 0 ? (
          <Button disabled={!selected}>
            <span>Claim</span>
          </Button>
        ) : null}
      </Box>
    </PageAnimation>
  );
};

export default DropMain;
