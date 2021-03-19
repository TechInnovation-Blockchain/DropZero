import { useState } from 'react';
import { Box, Typography, Grid, Tooltip } from '@material-ui/core';

import { useStyles } from '../../theme/styles/pages/claim/claimMainStyles';
import { Button, PageAnimation } from '../../components';
import FLASH from '../../assets/FLASH.png';
import DAI from '../../assets/DAI.png';
import XIO from '../../assets/blockzerologo.png';
import { trunc } from '../../utils/formattingFunctions';

const tokens = [
  {
    name: 'FLASH',
    img: FLASH,
    width: '20px',
    amount: 123456789264,
  },
  {
    name: 'DAI',
    img: DAI,
    width: '30px',
    amount: 0.144,
  },
  {
    name: 'XIO',
    img: XIO,
    width: '40px',
    amount: 10000,
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
        {tokens.length > 0 ? (
          <>
            <Typography variant='body1' className={classes.heading}>
              Available Tokens
            </Typography>
            <Box className={classes.tokenContainer}>
              {tokens.map(token => (
                <Box
                  key={token.name}
                  className={`${classes.token} ${selected === token.name ? classes.selected : ''}`}
                  onClick={() => handleSelect(token.name)}
                >
                  <Grid container alignItems='center' spacing={1} className={classes.grid}>
                    <Grid item xs={5} style={{ textAlign: 'right' }}>
                      <Tooltip title={token.amount}>
                        <Typography variant='body2'>{trunc(token.amount)}</Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={2} style={{ textAlign: 'center' }}>
                      <img src={token.img} alt={token.name} width={token.width} />
                    </Grid>
                    <Grid item xs={5} style={{ textAlign: 'left' }}>
                      <Typography variant='body2'>{token.name}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <Typography className={classes.secondaryText} variant='body2'>
            No Tokens Available
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
